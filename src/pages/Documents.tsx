import { useState } from "react";
import { FileText, Home, AlertTriangle, Download, ArrowLeft, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type DocType = "rental" | "complaint" | "fir" | null;

const commonFields = [
  { id: "yourName", label: "Your Name", placeholder: "e.g. Amit Verma" },
  { id: "otherParty", label: "Other Party Name", placeholder: "e.g. Rajesh Kumar / XYZ Pvt. Ltd." },
  { id: "address", label: "Address", placeholder: "e.g. 42, MG Road, Bengaluru" },
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

    if (selected === "rental") {
      setGenerated(`RENTAL AGREEMENT

This Rental Agreement is executed on ${new Date().toLocaleDateString("en-IN")} between:

LANDLORD: ${other}
TENANT: ${name}

PROPERTY: ${addr}

TERMS & CONDITIONS:

1. The monthly rent shall be payable on or before the 5th of every month as mutually agreed.

2. A security deposit has been paid by the Tenant, refundable at the end of the tenancy after deducting any dues or damages.

3. The duration of this agreement is 11 months, commencing from ${new Date().toLocaleDateString("en-IN")}.

4. The Tenant shall use the premises solely for residential purposes.

5. The Tenant shall not sublet or transfer the premises without the Landlord's written consent.

6. Either party may terminate this agreement by providing 30 days' written notice.

7. The Landlord shall be responsible for structural repairs; the Tenant shall maintain day-to-day upkeep.

8. Any disputes shall be resolved through mutual discussion or through the appropriate civil court.


LANDLORD: ____________________          TENANT: ____________________
Signature                                Signature

WITNESS 1: ____________________          WITNESS 2: ____________________`);
    } else if (selected === "complaint") {
      setGenerated(`To,
The Police Officer,

Subject: Complaint regarding ${issue}

I, ${name}, would like to bring to your attention that ${issue}. I request you to kindly take necessary action.

Thanking you,
${name}`);
    } else if (selected === "fir") {
      setGenerated(`FIRST INFORMATION REPORT (FIR) DRAFT

Date: ${new Date().toLocaleDateString("en-IN")}

To,
The Station House Officer,
[Police Station Name]
${addr}

Subject: Request to register FIR

Respected Sir/Madam,

I, ${name}, residing at ${addr}, wish to report the following incident:

${issue}

The above incident involves ${other}.

I request you to kindly register an FIR and take necessary legal action as per the provisions of the law.

I am willing to cooperate fully with the investigation.

Yours faithfully,
${name}
Contact: ____________________`);
    }

    toast({ title: "Document Generated!", description: "Your document is ready. You can copy or download it." });
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
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Generated Document</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-xl bg-muted p-6 font-mono text-sm leading-relaxed">
              {generated}
            </pre>
            <p className="mt-4 text-xs text-muted-foreground">
              Documents are AI-generated drafts and may require verification.
            </p>
            <div className="mt-6 flex gap-3">
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
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selected) {
    const title = selected === "rental" ? "Rental Agreement" : selected === "complaint" ? "Complaint Letter" : "FIR Draft";
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Button variant="ghost" className="mb-4 gap-2" onClick={() => { setSelected(null); setForm({}); setDetails(""); }}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <h1 className="font-heading text-2xl font-bold">{title} Generator</h1>
        <p className="mt-2 text-muted-foreground">Fill in the details below to generate your document.</p>

        <div className="mt-8 space-y-5">
          {commonFields.map((f) => (
            <div key={f.id}>
              <Label htmlFor={f.id}>{f.label}</Label>
              <Input
                id={f.id}
                placeholder={f.placeholder}
                value={form[f.id] || ""}
                onChange={(e) => update(f.id, e.target.value)}
                className="mt-1.5 rounded-xl"
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
              className="mt-1.5 min-h-[120px] rounded-xl"
            />
          </div>
          <Button onClick={generate} size="lg" className="w-full rounded-xl">
            Generate Document
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold">Legal Document Generator</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Generate basic legal documents instantly using AI. Just fill in simple details and get ready-to-use drafts.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <Card
          className="cursor-pointer border transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          onClick={() => setSelected("rental")}
        >
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary">
              <Home className="h-7 w-7" />
            </div>
            <h3 className="font-heading text-lg font-semibold">Rental Agreement</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Generate a standard rental/lease agreement between landlord and tenant.
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer border transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          onClick={() => setSelected("complaint")}
        >
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h3 className="font-heading text-lg font-semibold">Complaint Letter</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Draft a formal complaint letter for disputes or grievances.
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer border transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          onClick={() => setSelected("fir")}
        >
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary">
              <FileWarning className="h-7 w-7" />
            </div>
            <h3 className="font-heading text-lg font-semibold">FIR Draft</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Draft a First Information Report for filing with the police.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 text-center text-xs text-muted-foreground">
        Documents are AI-generated drafts and may require verification.
      </div>
    </div>
  );
};

export default Documents;
