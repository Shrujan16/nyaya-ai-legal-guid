import { useState } from "react";
import { FileText, Home, AlertTriangle, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type DocType = "rental" | "complaint" | null;

const rentalFields = [
  { id: "landlordName", label: "Landlord Name", placeholder: "e.g. Rajesh Kumar" },
  { id: "tenantName", label: "Tenant Name", placeholder: "e.g. Priya Sharma" },
  { id: "address", label: "Property Address", placeholder: "e.g. 42, MG Road, Bengaluru" },
  { id: "rent", label: "Monthly Rent (₹)", placeholder: "e.g. 25000" },
  { id: "deposit", label: "Security Deposit (₹)", placeholder: "e.g. 75000" },
  { id: "duration", label: "Lease Duration", placeholder: "e.g. 11 months" },
];

const complaintFields = [
  { id: "complainantName", label: "Your Name", placeholder: "e.g. Amit Verma" },
  { id: "respondentName", label: "Respondent / Company Name", placeholder: "e.g. XYZ Electronics Pvt. Ltd." },
  { id: "subject", label: "Subject of Complaint", placeholder: "e.g. Defective product not replaced" },
];

const Documents = () => {
  const [selected, setSelected] = useState<DocType>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [details, setDetails] = useState("");
  const [generated, setGenerated] = useState<string | null>(null);
  const { toast } = useToast();

  const update = (id: string, val: string) => setForm((p) => ({ ...p, [id]: val }));

  const generate = () => {
    if (selected === "rental") {
      setGenerated(`RENTAL AGREEMENT

This Rental Agreement is executed on ${new Date().toLocaleDateString("en-IN")} between:

LANDLORD: ${form.landlordName || "___________"}
TENANT: ${form.tenantName || "___________"}

PROPERTY: ${form.address || "___________"}

TERMS & CONDITIONS:

1. The monthly rent shall be ₹${form.rent || "___"} payable on or before the 5th of every month.

2. The Tenant has deposited ₹${form.deposit || "___"} as security deposit, refundable at the end of the tenancy after deducting any dues or damages.

3. The duration of this agreement is ${form.duration || "___"}, commencing from ${new Date().toLocaleDateString("en-IN")}.

4. The Tenant shall use the premises solely for residential purposes.

5. The Tenant shall not sublet or transfer the premises without the Landlord's written consent.

6. Either party may terminate this agreement by providing 30 days' written notice.

7. The Landlord shall be responsible for structural repairs; the Tenant shall maintain day-to-day upkeep.

8. Any disputes shall be resolved through mutual discussion or through the appropriate civil court.


LANDLORD: ____________________          TENANT: ____________________
Signature                                Signature

WITNESS 1: ____________________          WITNESS 2: ____________________`);
    } else {
      setGenerated(`COMPLAINT LETTER

Date: ${new Date().toLocaleDateString("en-IN")}

To,
The Manager / Grievance Officer
${form.respondentName || "___________"}

Subject: ${form.subject || "Formal Complaint"}

Dear Sir/Madam,

I, ${form.complainantName || "___________"}, am writing this letter to formally register my complaint regarding the above-mentioned subject.

${details || "I request you to kindly look into this matter and take appropriate action at the earliest. I have attached relevant documents for your reference."}

I have previously attempted to resolve this issue through your customer service department but have not received a satisfactory response.

I request the following:
1. Immediate acknowledgment of this complaint
2. Investigation into the matter within 15 working days
3. Appropriate resolution or compensation as per applicable consumer protection laws

If this matter is not resolved within a reasonable timeframe, I shall be compelled to approach the Consumer Disputes Redressal Forum under the Consumer Protection Act, 2019.

I look forward to your prompt response.

Yours faithfully,
${form.complainantName || "___________"}
Contact: ____________________
Email: ____________________`);
    }

    toast({ title: "Document Generated!", description: "Your document is ready. You can copy or download it." });
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
                  a.download = selected === "rental" ? "rental_agreement.txt" : "complaint_letter.txt";
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
    const fields = selected === "rental" ? rentalFields : complaintFields;
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Button variant="ghost" className="mb-4 gap-2" onClick={() => { setSelected(null); setForm({}); setDetails(""); }}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <h1 className="font-heading text-2xl font-bold">
          {selected === "rental" ? "Rental Agreement Generator" : "Complaint Letter Generator"}
        </h1>
        <p className="mt-2 text-muted-foreground">Fill in the details below to generate your document.</p>

        <div className="mt-8 space-y-5">
          {fields.map((f) => (
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
          {selected === "complaint" && (
            <div>
              <Label htmlFor="details">Complaint Details</Label>
              <Textarea
                id="details"
                placeholder="Describe your issue in detail..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="mt-1.5 min-h-[120px] rounded-xl"
              />
            </div>
          )}
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
        <h1 className="font-heading text-3xl font-bold">Document Generator</h1>
        <p className="mt-3 text-muted-foreground">
          Choose a document type below and fill in the required information.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
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
              Draft a formal complaint letter for consumer disputes or grievances.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documents;
