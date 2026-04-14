import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Mic, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What are my rights if police arrest me?",
  "My landlord is not returning my deposit, what should I do?",
  "How can I file an FIR in India?",
  "What are my rights at the workplace?",
  "Can police search my house without a warrant?",
];

const legalResponses: Record<string, string> = {
  "What are my rights if police arrest me?": `**Under Article 22 of the Indian Constitution**, every arrested person has the following fundamental rights:

1. **Right to Know the Grounds of Arrest** — As per **Section 50 of CrPC**, the police officer must inform the person of the full particulars of the offence.

2. **Right to Remain Silent** — You are not obligated to answer any questions beyond your name and address. Anything you say can be used against you in court.

3. **Right to Legal Counsel** — Under **Article 22(1)**, you have the right to consult and be defended by a legal practitioner of your choice immediately upon arrest.

4. **Right to be Produced Before a Magistrate** — Under **Section 57 of CrPC** and **Article 22(2)**, you must be presented before the nearest magistrate within **24 hours** of arrest.

5. **Right Against Self-Incrimination** — **Article 20(3)** protects you from being compelled to be a witness against yourself.

6. **Right to Free Legal Aid** — Under **Section 304 of CrPC** and **Article 39A**, if you cannot afford a lawyer, the state must provide one.

⚠️ *This is general legal information based on Indian law and should not be treated as professional legal advice.*`,

  "My landlord is not returning my deposit, what should I do?": `**Under the Rent Control Acts** (which vary by state), tenants have strong protections regarding security deposits:

**Step 1: Send a Legal Notice**
Under **Section 80 of the Civil Procedure Code (CPC)**, send a formal legal notice to your landlord demanding the return of your deposit within 30 days.

**Step 2: Document Everything**
- Keep copies of your rental agreement
- Photographs of the property condition at move-out
- Receipts of deposit payment
- Any communication with the landlord

**Step 3: File a Complaint**
- **Consumer Forum**: File a complaint under the **Consumer Protection Act, 2019** if the deposit is treated as a service dispute.
- **Civil Court**: File a suit for recovery of money under **Order XXXVII of CPC** (summary suit).
- **Rent Controller**: Approach the Rent Controller under your state's Rent Control Act.

**Step 4: Mediation**
Many courts now encourage **Lok Adalat** settlements which are faster and cost-effective.

💡 *Typical timeline: Legal notice (30 days) → Filing (if unresolved) → Resolution (3-6 months)*

⚠️ *This is general legal information and should not replace professional legal advice.*`,

  "How can I file an FIR in India?": `**Filing an FIR (First Information Report)** is your right under **Section 154 of CrPC**:

**What is an FIR?**
An FIR is the first step in the criminal justice process. It is a written document prepared by the police when they receive information about the commission of a **cognizable offence**.

**Steps to File an FIR:**

1. **Visit the Nearest Police Station** — Go to the police station that has jurisdiction over the area where the incident occurred.

2. **Provide Details** — Narrate the incident clearly including:
   - Date, time, and place of the incident
   - Description of the accused (if known)
   - Names of witnesses
   - Details of the offence

3. **Get It Written** — The officer in charge **must** register your FIR. Under **Section 154(1) of CrPC**, they cannot refuse if it's a cognizable offence.

4. **Read & Sign** — Read the FIR carefully before signing. You are entitled to a **free copy** under **Section 154(2)**.

**If Police Refuse to File:**
- Send a written complaint to the **Superintendent of Police (SP)** under **Section 154(3)**.
- Approach the **Judicial Magistrate** under **Section 156(3) of CrPC**.
- File a complaint on the **National/State Police Portal** online.

📌 *Zero FIR: You can file an FIR at ANY police station regardless of jurisdiction under the Zero FIR provision.*

⚠️ *This is general legal information and does not replace professional legal advice.*`,

  "What are my rights at the workplace?": `**Under Indian Labour Laws**, employees have several protected rights:

**1. Right to Fair Wages**
- **Minimum Wages Act, 1948** ensures minimum pay
- **Payment of Wages Act, 1936** ensures timely payment
- **Equal Remuneration Act, 1976** — Equal pay for equal work regardless of gender

**2. Right Against Harassment**
- **Sexual Harassment of Women at Workplace Act, 2013 (POSH Act)** mandates every employer with 10+ employees to constitute an **Internal Complaints Committee (ICC)**
- **Section 354A IPC** criminalizes sexual harassment

**3. Right to Safe Working Conditions**
- **Factories Act, 1948** and **Occupational Safety, Health and Working Conditions Code, 2020** ensure safe work environment

**4. Right to Leave and Benefits**
- Earned leave, sick leave, and casual leave as per state Shops & Establishments Act
- **Maternity Benefit Act, 1961** — 26 weeks paid maternity leave
- **Employees' Provident Fund (EPF)** and **ESI** benefits

**5. Right Against Wrongful Termination**
- **Industrial Disputes Act, 1947** — Workers in establishments with 100+ employees cannot be terminated without government permission
- **Section 25F** requires 1 month's notice or pay in lieu

**Where to Complain:**
- Labour Commissioner's office
- Labour Court / Industrial Tribunal
- National Commission for Women (for harassment cases)

⚠️ *This information is for general guidance and does not replace professional legal advice.*`,

  "Can police search my house without a warrant?": `**Under Indian Law**, your home is protected from arbitrary searches:

**General Rule: Warrant Required**
Under **Section 93 of CrPC**, a police officer generally needs a **search warrant** issued by a Magistrate to search your house.

**Exceptions — When NO Warrant is Needed:**

1. **Section 165 CrPC** — If a police officer has reasonable grounds to believe that evidence may be destroyed or removed, they can search without a warrant but must:
   - Record reasons in writing
   - Send a copy to the nearest Magistrate
   - Conduct the search in the presence of **two independent witnesses**

2. **NDPS Act, 1985** — Narcotics officers can search without warrant under specific provisions

3. **Section 47 CrPC** — Police can enter any house to arrest a person if they have reason to believe the person is inside

**Your Rights During a Search:**

✅ **Right to see the warrant** — Ask to see and read the search warrant
✅ **Right to witnesses** — Search must be conducted before at least **two respectable inhabitants** of the locality
✅ **Right to a search list** — Under **Section 100 CrPC**, a list of all seized items must be prepared and signed
✅ **Right to female officer** — A woman can only be searched by another woman under **Section 51(2) CrPC**
✅ **Right against damage** — Unreasonable damage to property during search is actionable

⚠️ *This is general legal information under Indian law and does not constitute professional legal advice.*`,
};

const defaultResponse = `**Under Indian Law**, your query relates to important legal provisions that protect citizen rights.

Based on the **Constitution of India** and relevant statutes:

1. **Fundamental Rights (Part III)** — Articles 14-32 guarantee equality, freedom, and protection against exploitation.

2. **Right to Legal Remedy** — Under **Article 32** and **Article 226**, you can approach the Supreme Court or High Court for enforcement of fundamental rights.

3. **Legal Aid** — Under **Section 304 of CrPC** and the **Legal Services Authorities Act, 1987**, free legal aid is available to eligible persons.

I recommend consulting a qualified legal professional for advice specific to your situation. You can also contact your nearest **District Legal Services Authority (DLSA)** for free legal assistance.

⚠️ *This is AI-generated general legal information and should not replace professional legal advice.*`;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
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

    const response = legalResponses[text.trim()] || defaultResponse;

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">NyayaAI Legal Assistant</h2>
            <p className="text-xs text-muted-foreground">Powered by AI · Indian Law</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-lg text-xs"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          >
            <Globe className="h-3.5 w-3.5" />
            {language === "en" ? "English" : "हिंदी"}
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-lg text-xs">
            <Mic className="h-3.5 w-3.5" />
            Voice
          </Button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[hsl(230,80%,60%)] text-primary-foreground shadow-lg shadow-primary/25">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold">AI Legal Assistant</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Ask any legal question in simple language and get easy-to-understand guidance with Indian law references.
            </p>
            <Badge variant="secondary" className="mt-3">
              References IPC, CrPC, Constitution & more
            </Badge>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="group rounded-xl border bg-card p-4 text-left text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-accent hover:shadow-md"
                >
                  <span className="text-xs font-medium text-primary">Ask →</span>
                  <p className="mt-1">{s}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[hsl(230,80%,60%)] text-primary-foreground shadow-sm">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <Card
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground shadow-primary/20"
                      : "border bg-card shadow-[var(--card-shadow)]"
                  }`}
                >
                  <div
                    className="whitespace-pre-wrap [&>strong]:font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: m.content
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\n/g, "<br/>"),
                    }}
                  />
                </Card>
                {m.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-sm">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[hsl(230,80%,60%)] text-primary-foreground shadow-sm">
                  <Bot className="h-4 w-4" />
                </div>
                <Card className="rounded-2xl border bg-card px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
                    </div>
                    <span className="text-xs text-muted-foreground">AI is thinking...</span>
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
            placeholder={language === "en" ? "Type your legal question..." : "अपना कानूनी सवाल टाइप करें..."}
            className="rounded-xl shadow-sm"
          />
          <Button type="submit" size="icon" className="shrink-0 rounded-xl shadow-sm" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          This AI provides general legal information and does not replace professional legal advice.
        </p>
      </div>
    </div>
  );
};

export default Chat;
