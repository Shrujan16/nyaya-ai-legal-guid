import { useState } from "react";
import { FileText, Home, AlertTriangle, Download, ArrowLeft, FileWarning, Badge as BadgeIcon, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type DocType = "rental" | "complaint" | "fir" | null;

const commonFields = [
  { id: "yourName", label: "Your Name", placeholder: "e.g. Amit Verma" },
  { id: "otherParty", label: "Other Party Name", placeholder: "e.g. Rajesh Kumar / XYZ Pvt. Ltd." },
  { id: "address", label: "Address", placeholder: "e.g. 42, MG Road, Bengaluru" },
];

const docCards = [
  { type: "rental" as const, icon: Home, title: "Rental Agreement", desc: "Generate a standard rental/lease agreement between landlord and tenant." },
  { type: "complaint" as const, icon: AlertTriangle, title: "Complaint Letter", desc: "Draft a formal complaint letter for disputes or grievances." },
  { type: "fir" as const, icon: FileWarning, title: "FIR Draft", desc: "Draft a First Information Report for filing with the police." },
];

const Documents = () => {
  const [selected, setSelected] = useState<DocType>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [details, setDetails] = useState("");
  const [generated, setGenerated] = useState<string | null>(null);
  const { toast } = useToast();

  const update = (id: string, val: string) => setForm((p) => ({ ...p, [id]: val }));

  const generate = () => {
    const name = form.yourName || "[Your Name]";
    const other = form.otherParty || "[Other Party Name]";
    const addr = form.address || "[Address]";
    const issue = details || "[describe issue briefly]";
    const date = new Date().toLocaleDateString("en-IN");

    if (selected === "rental") {
      setGenerated(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    RENTAL AGREEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Date: ${date}
Reference No: RA/${new Date().getFullYear()}/${Math.floor(Math.random() * 9000) + 1000}

────────────────────────────────────────────────

PARTIES:

LANDLORD:    ${other}
TENANT:      ${name}
PROPERTY:    ${addr}

────────────────────────────────────────────────

TERMS & CONDITIONS:

1. RENT — The monthly rent shall be payable on or before the 5th of every month as mutually agreed.

2. SECURITY DEPOSIT — A security deposit has been paid by the Tenant, refundable at the end of the tenancy after deducting any dues or damages.

3. DURATION — This agreement is valid for 11 months, commencing from ${date}.

4. USAGE — The Tenant shall use the premises solely for residential purposes.

5. SUBLETTING — The Tenant shall not sublet or transfer the premises without the Landlord's written consent.

6. TERMINATION — Either party may terminate this agreement by providing 30 days' written notice.

7. MAINTENANCE — The Landlord shall be responsible for structural repairs; the Tenant shall maintain day-to-day upkeep.

8. DISPUTES — Any disputes shall be resolved through mutual discussion or through the appropriate civil court as per the Rent Control Act applicable in the state.

────────────────────────────────────────────────

SIGNATURES:

LANDLORD: ____________________     TENANT: ____________________

WITNESS 1: ____________________    WITNESS 2: ____________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    } else if (selected === "complaint") {
      setGenerated(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                  COMPLAINT LETTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Date: ${date}
Reference No: CL/${new Date().getFullYear()}/${Math.floor(Math.random() * 9000) + 1000}

────────────────────────────────────────────────

To,
The Officer In-Charge,
[Police Station / Authority Name]
${addr}

Subject: Formal Complaint Regarding ${issue}

────────────────────────────────────────────────

Respected Sir/Madam,

I, ${name}, residing at ${addr}, hereby submit this formal complaint to bring to your attention the following matter:

DETAILS OF COMPLAINT:

${issue}

The above matter involves ${other}.

I humbly request your good office to look into this matter and take necessary action as deemed appropriate under the applicable laws.

I am willing to provide any additional information or documentation that may be required for the investigation.

────────────────────────────────────────────────

Yours faithfully,

${name}
Date: ${date}
Contact: ____________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    } else if (selected === "fir") {
      setGenerated(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FIRST INFORMATION REPORT (FIR) DRAFT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Date: ${date}
Reference: Under Section 154 of CrPC

────────────────────────────────────────────────

To,
The Station House Officer,
[Police Station Name]
${addr}

Subject: Request to Register FIR Under Section 154 CrPC

────────────────────────────────────────────────

Respected Sir/Madam,

I, ${name}, residing at ${addr}, hereby request you to register a First Information Report regarding the following cognizable offence:

INCIDENT DETAILS:

${issue}

ACCUSED / INVOLVED PARTY:
${other}

APPLICABLE SECTIONS:
[To be determined by the investigating officer based on the nature of the offence under IPC/BNS]

────────────────────────────────────────────────

I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that filing a false FIR is a punishable offence under Section 182 of IPC.

I request you to kindly register the FIR and initiate investigation at the earliest. As per Section 154(2) of CrPC, I am entitled to receive a free copy of this FIR.

I am willing to cooperate fully with the investigation.

────────────────────────────────────────────────

Yours faithfully,

${name}
Date: ${date}
Contact: ____________________
ID Proof: ____________________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    }

    toast({ title: "Document Generated!", description: "Your AI-generated legal draft is ready." });
  };

  const getDownloadName = () => {
    if (selected === "rental") return "rental_agreement.txt";
    if (selected === "fir") return "fir_draft.txt";
    return "complaint_letter.txt";
  };

  if (generated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Button variant="ghost" className="mb-4 gap-2" onClick={() => setGenerated(null)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <Card className="shadow-[var(--card-shadow)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading">Generated Document</CardTitle>
              <Badge variant="secondary" className="gap-1">
                <BadgeIcon className="h-3 w-3" /> AI-Generated Legal Draft
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-xl bg-muted p-6 font-mono text-sm leading-relaxed">
              {generated}
            </pre>
            <p className="mt-4 text-xs text-muted-foreground">
              ⚠️ This is an AI-generated draft and may require verification by a legal professional.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(generated);
                  toast({ title: "Copied to clipboard!" });
                }}
                variant="outline"
                className="rounded-xl"
              >
                Copy Text
              </Button>
              <Button
                onClick={() => {
                  const blob = new Blob([generated], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = getDownloadName();
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="gap-2 rounded-xl"
              >
                <Download className="h-4 w-4" /> Download as TXT
              </Button>
              <Button
                variant="outline"
                className="gap-2 rounded-xl"
                onClick={() => toast({ title: "PDF Download", description: "PDF export coming soon!" })}
              >
                <FileDown className="h-4 w-4" /> Download as PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selected) {
    const doc = docCards.find(d => d.type === selected)!;
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Button variant="ghost" className="mb-4 gap-2" onClick={() => { setSelected(null); setForm({}); setDetails(""); }}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
            <doc.icon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold">{doc.title} Generator</h1>
            <p className="text-sm text-muted-foreground">Fill in the details below to generate your document.</p>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {commonFields.map((f) => (
            <div key={f.id}>
              <Label htmlFor={f.id}>{f.label}</Label>
              <Input
                id={f.id}
                placeholder={f.placeholder}
                value={form[f.id] || ""}
                onChange={(e) => update(f.id, e.target.value)}
                className="mt-1.5 rounded-xl shadow-sm"
              />
            </div>
          ))}
          <div>
            <Label htmlFor="details">Description of Issue</Label>
            <Textarea
              id="details"
              placeholder="Describe the issue in detail..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-1.5 min-h-[120px] rounded-xl shadow-sm"
            />
          </div>
          <Button onClick={generate} size="lg" className="w-full rounded-xl shadow-lg shadow-primary/20">
            Generate Document
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4 gap-1">
          <BadgeIcon className="h-3 w-3" /> AI-Powered
        </Badge>
        <h1 className="font-heading text-3xl font-bold">Legal Document Generator</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Generate basic legal documents instantly using AI. Just fill in simple details and get ready-to-use drafts.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {docCards.map((dc) => (
          <Card
            key={dc.type}
            className="cursor-pointer border shadow-[var(--card-shadow)] transition-all hover:shadow-[var(--card-shadow-hover)]"
            onClick={() => setSelected(dc.type)}
          >
            <CardContent className="flex flex-col items-center p-8 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary">
                <dc.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-lg font-semibold">{dc.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{dc.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center text-xs text-muted-foreground">
        Documents are AI-generated drafts and may require verification by a legal professional.
      </div>
    </div>
  );
};

export default Documents;
