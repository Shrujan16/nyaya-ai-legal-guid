import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Mic, Globe, AlertCircle, Scale, BookOpen, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

type Message = { role: "user" | "assistant"; content: string; timestamp: Date };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/legal-chat`;

const suggestions = [
  "What are my rights if police arrest me?",
  "My landlord is not returning my deposit, what should I do?",
  "How can I file an FIR in India?",
  "What are my rights at the workplace?",
  "Can police search my house without a warrant?",
];

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || `Error ${resp.status}`);
    return;
  }

  if (!resp.body) {
    onError("No response stream");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  // Final flush
  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [mode, setMode] = useState<"chat" | "case">("chat");
  const [caseInput, setCaseInput] = useState("");
  const [caseResult, setCaseResult] = useState<string | null>(null);
  const [caseAnalyzing, setCaseAnalyzing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { role: "user", content: text.trim(), timestamp: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && !last.content.includes("📋")) {
          // Still streaming, update last
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant" as const, content: assistantSoFar, timestamp: new Date() }];
      });
    };

    const chatHistory = newMessages.map((m) => ({ role: m.role, content: m.content }));
    if (language === "hi") {
      chatHistory[chatHistory.length - 1].content += "\n\n(Please respond in Hindi, keeping legal terms in English)";
    }

    await streamChat({
      messages: chatHistory,
      onDelta: (chunk) => upsertAssistant(chunk),
      onDone: () => setIsTyping(false),
      onError: (err) => {
        toast.error(err);
        setIsTyping(false);
      },
    });
  };

  const analyzeCase = async () => {
    if (!caseInput.trim() || caseAnalyzing) return;
    setCaseAnalyzing(true);
    setCaseResult(null);

    let result = "";
    const casePrompt = `Analyze this legal situation and provide a structured response with:
1. Issue Summary
2. Legal Risk Level (Low/Medium/High) with explanation
3. Applicable Laws (specific Indian law sections)
4. Suggested Action (numbered steps)
5. Legal References table

Situation: ${caseInput.trim()}`;

    await streamChat({
      messages: [{ role: "user", content: casePrompt }],
      onDelta: (chunk) => {
        result += chunk;
        setCaseResult(result);
      },
      onDone: () => setCaseAnalyzing(false),
      onError: (err) => {
        toast.error(err);
        setCaseAnalyzing(false);
      },
    });
  };

  const formatTime = (d: Date) => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const renderMarkdown = (text: string) => {
    return text
      .replace(/## (.*)/g, '<h3 class="mt-4 mb-2 text-sm font-bold text-foreground">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\| (.*?) \| (.*?) \|/g, (_, c1, c2) => {
        if (c1.trim().startsWith("---")) return "";
        return `<div class="flex gap-2 text-xs py-1 border-b border-border/50"><span class="font-semibold text-primary min-w-[140px]">${c1.trim()}</span><span class="text-muted-foreground">${c2.trim()}</span></div>`;
      })
      .replace(/^\d+\.\s(.*)/gm, '<li class="ml-4 list-decimal text-xs leading-relaxed">$1</li>')
      .replace(/^- (.*)/gm, '<li class="ml-4 list-disc text-xs leading-relaxed">$1</li>')
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-4xl flex-col px-4">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[hsl(230,80%,60%)] text-primary-foreground shadow-md">
            <Scale className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold">NyayaAI Legal Assistant</h2>
            <p className="text-xs text-muted-foreground">AI-Powered · Indian Law · Structured Analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={language === "en" ? "default" : "outline"}
            size="sm"
            className="h-7 rounded-lg px-2 text-xs"
            onClick={() => setLanguage("en")}
          >
            EN
          </Button>
          <Button
            variant={language === "hi" ? "default" : "outline"}
            size="sm"
            className="h-7 rounded-lg px-2 text-xs"
            onClick={() => setLanguage("hi")}
          >
            हिं
          </Button>
          <Button variant="outline" size="sm" className="h-7 gap-1 rounded-lg px-2 text-xs">
            <Mic className="h-3 w-3" /> Voice
          </Button>
        </div>
      </div>

      {/* Mode tabs */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as "chat" | "case")} className="mt-3">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat" className="gap-1.5 text-xs">
            <Bot className="h-3.5 w-3.5" /> AI Legal Chat
          </TabsTrigger>
          <TabsTrigger value="case" className="gap-1.5 text-xs">
            <ClipboardList className="h-3.5 w-3.5" /> Case Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="case" className="mt-4">
          <Card className="p-5 shadow-[var(--card-shadow)]">
            <h3 className="flex items-center gap-2 font-heading text-base font-bold">
              <AlertCircle className="h-4 w-4 text-primary" /> Case Analysis Mode
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Describe your legal situation and get a structured analysis with risk assessment.
            </p>
            <Textarea
              placeholder={language === "en" ? "Describe your situation in detail..." : "अपनी स्थिति का विस्तार से वर्णन करें..."}
              value={caseInput}
              onChange={(e) => setCaseInput(e.target.value)}
              className="mt-3 min-h-[100px] rounded-xl"
            />
            <Button onClick={analyzeCase} disabled={!caseInput.trim() || caseAnalyzing} className="mt-3 w-full rounded-xl">
              {caseAnalyzing ? "AI is analyzing your case..." : "Analyze My Case"}
            </Button>
            {caseResult && (
              <div className="mt-4 rounded-xl border bg-muted/50 p-4">
                <div className="prose-sm text-sm" dangerouslySetInnerHTML={{ __html: renderMarkdown(caseResult) }} />
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="flex-1 overflow-hidden">
          {/* Spacer to maintain flex layout */}
        </TabsContent>
      </Tabs>

      {/* Chat messages area - only shown in chat mode */}
      {mode === "chat" && (
        <>
          <div className="flex-1 overflow-y-auto py-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[hsl(230,80%,60%)] text-primary-foreground shadow-lg shadow-primary/25">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h2 className="font-heading text-2xl font-bold">
                  {language === "en" ? "AI Legal Assistant" : "AI कानूनी सहायक"}
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  {language === "en"
                    ? "Ask any legal question and get structured analysis with Indian law references."
                    : "कोई भी कानूनी सवाल पूछें और भारतीय कानून संदर्भों के साथ विश्लेषण प्राप्त करें।"}
                </p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary" className="text-xs">IPC</Badge>
                  <Badge variant="secondary" className="text-xs">CrPC</Badge>
                  <Badge variant="secondary" className="text-xs">Constitution</Badge>
                  <Badge variant="secondary" className="text-xs">Labour Laws</Badge>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="group rounded-xl border bg-card p-4 text-left text-sm text-muted-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-accent hover:shadow-md"
                    >
                      <span className="text-xs font-semibold text-primary">Ask →</span>
                      <p className="mt-1">{s}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-3 animate-fade-in ${m.role === "user" ? "justify-end" : ""}`}>
                    {m.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[hsl(230,80%,60%)] text-primary-foreground shadow-sm">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div className="max-w-[85%]">
                      <Card
                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          m.role === "user"
                            ? "bg-primary text-primary-foreground shadow-primary/20"
                            : "border bg-card shadow-[var(--card-shadow)]"
                        }`}
                      >
                        {m.role === "assistant" ? (
                          <div className="prose-sm [&_h3]:text-foreground" dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                        ) : (
                          <div className="whitespace-pre-wrap">{m.content}</div>
                        )}
                      </Card>
                      <p className={`mt-1 text-[10px] text-muted-foreground ${m.role === "user" ? "text-right" : ""}`}>
                        {formatTime(m.timestamp)}
                      </p>
                    </div>
                    {m.role === "user" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-sm">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
                  <div className="flex gap-3 animate-fade-in">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[hsl(230,80%,60%)] text-primary-foreground shadow-sm">
                      <Bot className="h-4 w-4" />
                    </div>
                    <Card className="rounded-2xl border bg-card px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {language === "en" ? "AI is analyzing your case..." : "AI आपके मामले का विश्लेषण कर रहा है..."}
                        </span>
                      </div>
                    </Card>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t bg-background py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === "en" ? "Type your legal question..." : "अपना कानूनी सवाल टाइप करें..."}
                className="rounded-xl shadow-sm"
              />
              <Button type="submit" size="icon" className="shrink-0 rounded-xl shadow-sm" disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              This AI provides general legal information and does not replace professional legal advice.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
