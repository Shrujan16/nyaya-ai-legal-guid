import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What are my rights if my landlord refuses to return my security deposit?",
  "How do I file a consumer complaint online?",
  "What is the process for getting a mutual divorce?",
  "Can my employer terminate me without notice?",
];

const dummyResponses: Record<string, string> = {
  default: `That's a great legal question! Here's what I can tell you:

**General Guidance:**
Under Indian law, your rights are protected by various statutes and constitutional provisions. The specific answer depends on the jurisdiction and circumstances involved.

**Recommended Steps:**
1. Document all relevant facts and communications
2. Consult the applicable statute or regulation
3. Consider seeking formal legal counsel for complex matters
4. You may also approach the relevant legal aid authority for free assistance

**Important Note:** This is general information and should not be construed as legal advice. For specific cases, please consult a qualified advocate.`,
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: dummyResponses.default },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-primary">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold">How can I help you today?</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Ask me any legal question in plain language. I'll do my best to provide helpful information.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-xl border bg-card p-4 text-left text-sm text-muted-foreground transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <Card
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-none ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border bg-card"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </Card>
                {m.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                  <Bot className="h-4 w-4" />
                </div>
                <Card className="rounded-2xl border bg-card px-4 py-3 shadow-none">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                  </div>
                </Card>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-background py-4">
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
            placeholder="Type your legal question..."
            className="rounded-xl"
          />
          <Button type="submit" size="icon" className="shrink-0 rounded-xl" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          NyayaAI provides general information only. Always consult a qualified lawyer for specific legal matters.
        </p>
      </div>
    </div>
  );
};

export default Chat;
