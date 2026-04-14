import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Mic, Globe, AlertCircle, Scale, BookOpen, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Message = { role: "user" | "assistant"; content: string; timestamp: Date };

const suggestions = [
  "What are my rights if police arrest me?",
  "My landlord is not returning my deposit, what should I do?",
  "How can I file an FIR in India?",
  "What are my rights at the workplace?",
  "Can police search my house without a warrant?",
];

const legalResponses: Record<string, string> = {
  "What are my rights if police arrest me?": `## 📋 Legal Explanation

Every person arrested in India is entitled to fundamental protections under the Constitution and the Code of Criminal Procedure. These rights exist to prevent abuse of power and ensure fair treatment during the legal process.

## ⚖️ Applicable Law

- **Article 22(1) & 22(2)** of the Constitution of India — Right to be informed of grounds of arrest and right to consult a lawyer
- **Section 50, CrPC** — Person arrested to be informed of grounds of arrest and right to bail
- **Section 41, CrPC** — Conditions for arrest without warrant by police
- **Section 57, CrPC** — Person arrested not to be detained more than 24 hours without magistrate's order
- **Article 20(3)** — Protection against self-incrimination
- **Section 304, CrPC** — Right to free legal aid
- **D.K. Basu v. State of West Bengal (1997)** — Supreme Court guidelines on arrest procedures

## ✅ What You Should Do

1. **Stay calm** — Do not resist arrest, but clearly ask for the reason
2. **Demand written grounds** — The officer must communicate the grounds of arrest
3. **Contact a lawyer immediately** — This is your constitutional right under Article 22(1)
4. **Do not sign anything** without your lawyer present
5. **Inform family** — You have the right to have someone informed of your arrest
6. **Note badge numbers** of arresting officers
7. **File complaint** if rights are violated — approach the Magistrate or Human Rights Commission

## 📖 Legal References

| Section | Description |
|---------|-------------|
| Article 21 | Right to Life and Personal Liberty |
| Article 22 | Protection against arrest and detention |
| CrPC Section 41 | When police may arrest without warrant |
| CrPC Section 50 | Right to know grounds of arrest |
| CrPC Section 57 | 24-hour production before Magistrate |
| Article 20(3) | Right against self-incrimination |`,

  "My landlord is not returning my deposit, what should I do?": `## 📋 Legal Explanation

Security deposit disputes are one of the most common tenant-landlord conflicts in India. The law provides multiple remedies depending on your state's Rent Control Act and the terms of your rental agreement.

## ⚖️ Applicable Law

- **Transfer of Property Act, 1882** — Section 108 defines rights and liabilities of lessees
- **State Rent Control Acts** — Vary by state (e.g., Delhi Rent Control Act, Karnataka Rent Act)
- **Consumer Protection Act, 2019** — Applicable if deposit is treated as service dispute
- **Section 80, CPC** — Mandatory legal notice before filing civil suit against government bodies
- **Order XXXVII, CPC** — Summary suit procedure for recovery of money

## ✅ What You Should Do

1. **Send a formal legal notice** to your landlord demanding return within 30 days
2. **Document everything** — rental agreement, deposit receipts, property photos, communications
3. **File a complaint** at Consumer Forum if unresolved (fees as low as ₹100)
4. **Approach Rent Controller** under your state's Rent Control Act
5. **File a civil suit** for recovery under Order XXXVII of CPC (summary suit)
6. **Consider Lok Adalat** — free, fast, and legally binding settlements

## 📖 Legal References

| Section | Description |
|---------|-------------|
| TPA Section 108 | Rights and liabilities of lessor and lessee |
| CPC Section 80 | Notice before suit against government |
| CPC Order XXXVII | Summary suit for money recovery |
| Consumer Protection Act 2019 | Consumer dispute redressal |`,

  "How can I file an FIR in India?": `## 📋 Legal Explanation

An FIR (First Information Report) is the first step in the criminal justice process. It is a written document prepared by police upon receiving information about a cognizable offence. Police are legally bound to register an FIR — refusal is a punishable offence.

## ⚖️ Applicable Law

- **Section 154, CrPC** — Information in cognizable cases (FIR registration)
- **Section 154(3), CrPC** — Remedy if police refuse to register FIR
- **Section 156(3), CrPC** — Magistrate's power to order investigation
- **Section 166A, CrPC** — Mandatory registration for certain offences
- **Lalita Kumari v. State of UP (2014)** — Supreme Court mandated compulsory FIR registration

## ✅ What You Should Do

1. **Visit the nearest police station** with jurisdiction over the incident area
2. **Narrate the incident clearly** — include date, time, place, accused details, witnesses
3. **Get it written and read carefully** before signing
4. **Obtain a free copy** — your right under Section 154(2) CrPC
5. **If police refuse:** Write to the SP under Section 154(3) or approach Magistrate under Section 156(3)
6. **Use Zero FIR provision** — file at ANY police station regardless of jurisdiction
7. **File online** via National/State Police Complaint Portal

## 📖 Legal References

| Section | Description |
|---------|-------------|
| CrPC Section 154 | Mandatory FIR registration for cognizable offences |
| CrPC Section 154(2) | Right to free copy of FIR |
| CrPC Section 154(3) | Complaint to SP if police refuse FIR |
| CrPC Section 156(3) | Magistrate can order FIR registration |
| Lalita Kumari (2014) | SC: FIR registration is mandatory |`,

  "What are my rights at the workplace?": `## 📋 Legal Explanation

Indian labour laws provide comprehensive protection to employees covering wages, safety, harassment, and termination. Recent codification under the Labour Codes has modernized these protections.

## ⚖️ Applicable Law

- **Minimum Wages Act, 1948** — Ensures minimum pay standards
- **Payment of Wages Act, 1936** — Timely wage payment
- **Equal Remuneration Act, 1976** — Equal pay for equal work
- **Sexual Harassment of Women at Workplace Act, 2013 (POSH)** — ICC mandate
- **Factories Act, 1948** — Workplace safety standards
- **Industrial Disputes Act, 1947** — Protection against wrongful termination
- **Maternity Benefit Act, 1961** — 26 weeks paid maternity leave

## ✅ What You Should Do

1. **Document all violations** — maintain records of pay slips, communications, incidents
2. **Report harassment** to the Internal Complaints Committee (ICC) — mandatory under POSH Act
3. **Contact Labour Commissioner** for wage disputes
4. **File complaint at Labour Court** for wrongful termination
5. **Approach National Commission for Women** for gender-specific issues
6. **Consult a labour lawyer** for complex disputes

## 📖 Legal References

| Section | Description |
|---------|-------------|
| POSH Act 2013 | Mandatory ICC for 10+ employees |
| IDA Section 25F | Conditions for retrenchment |
| Maternity Benefit Act | 26 weeks paid leave |
| Equal Remuneration Act | Equal pay regardless of gender |
| EPF Act 1952 | Provident fund entitlements |`,

  "Can police search my house without a warrant?": `## 📋 Legal Explanation

The right to privacy of one's home is a fundamental right under Article 21. While search warrants are generally required, Indian law carves out specific exceptions where warrantless searches are permissible under strict procedural safeguards.

## ⚖️ Applicable Law

- **Article 21** — Right to Life and Personal Liberty (includes right to privacy)
- **Section 93, CrPC** — Search warrant by Magistrate
- **Section 165, CrPC** — Search without warrant by investigating officer
- **Section 100, CrPC** — Procedure for search including witness requirements
- **Section 47, CrPC** — Search for person wrongfully confined
- **Section 51(2), CrPC** — Search of women only by women
- **NDPS Act, 1985** — Special search provisions for narcotics

## ✅ What You Should Do

1. **Ask to see the search warrant** — read it carefully for scope and validity
2. **Demand two independent witnesses** from the locality (Section 100 CrPC)
3. **Insist on a search list** — all seized items must be documented and signed
4. **Women's right** — female members can only be searched by a female officer
5. **Do not obstruct** but clearly state any objections
6. **Note down badge numbers** and details of officers
7. **File complaint** if procedure is violated — approach Magistrate or file writ petition

## 📖 Legal References

| Section | Description |
|---------|-------------|
| Article 21 | Right to privacy (K.S. Puttaswamy, 2017) |
| CrPC Section 93 | Search warrant by Magistrate |
| CrPC Section 165 | Warrantless search with safeguards |
| CrPC Section 100 | Search procedure and witnesses |
| CrPC Section 51(2) | Female search by female officer |`,
};

const defaultResponse = `## 📋 Legal Explanation

Your query relates to fundamental rights and legal protections available under Indian law. Every citizen is guaranteed certain rights under the Constitution of India and various statutes.

## ⚖️ Applicable Law

- **Part III, Constitution of India** — Fundamental Rights (Articles 14-32)
- **Article 32 & 226** — Right to Constitutional Remedies
- **Legal Services Authorities Act, 1987** — Free legal aid
- **Section 304, CrPC** — State-provided legal counsel

## ✅ What You Should Do

1. **Document your situation** thoroughly with all relevant details
2. **Consult a qualified lawyer** for case-specific advice
3. **Contact District Legal Services Authority (DLSA)** for free legal aid
4. **File appropriate complaint** with relevant authority
5. **Preserve all evidence** — documents, communications, witnesses

## 📖 Legal References

| Section | Description |
|---------|-------------|
| Article 14 | Right to Equality |
| Article 19 | Freedom of Speech & Expression |
| Article 21 | Right to Life and Personal Liberty |
| Article 32 | Right to Constitutional Remedies |
| NALSA Act 1987 | Free legal aid eligibility |`;

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

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim(), timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const response = legalResponses[text.trim()] || defaultResponse;

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response, timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 2500);
  };

  const analyzeCase = () => {
    if (!caseInput.trim()) return;
    setCaseAnalyzing(true);
    setCaseResult(null);
    setTimeout(() => {
      setCaseResult(`## 📝 Issue Summary
${caseInput.trim()}

## ⚠️ Legal Risk Level
**Medium** — This situation involves potential legal implications that should be addressed promptly to avoid escalation.

## ⚖️ Applicable Laws
- Article 21 — Right to Life and Personal Liberty
- Relevant sections of IPC/BNS based on the nature of the issue
- Consumer Protection Act, 2019 (if applicable)
- State-specific regulations may apply

## ✅ Suggested Action
1. **Gather all documentation** — contracts, communications, evidence
2. **Send a formal legal notice** to the concerned party
3. **File a complaint** with the appropriate authority (Police/Consumer Forum/Labour Court)
4. **Consult a qualified lawyer** for personalized legal strategy
5. **Consider mediation** through Lok Adalat for faster resolution

## 📖 Legal References
| Section | Description |
|---------|-------------|
| Article 21 | Right to Life and Personal Liberty |
| CPC Section 80 | Legal notice requirement |
| Consumer Protection Act 2019 | Consumer redressal |`);
      setCaseAnalyzing(false);
    }, 3000);
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
                {isTyping && (
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
