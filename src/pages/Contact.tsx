import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", category: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Your message has been sent successfully!");
  };

  if (submitted) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4 py-16 animate-fade-in">
        <Card className="max-w-lg w-full text-center shadow-lg">
          <CardContent className="py-16 space-y-4">
            <CheckCircle className="mx-auto h-16 w-16 text-primary" />
            <h2 className="text-2xl font-bold font-heading">Thank You!</h2>
            <p className="text-muted-foreground">
              We've received your message and will get back to you within 24–48 hours.
            </p>
            <Button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", category: "", message: "" }); }}>
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 space-y-12 animate-fade-in">
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-bold font-heading text-primary">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a legal query or feedback? Reach out to us and our team will respond promptly.
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-3">
        {[
          { icon: Mail, title: "Email Us", detail: "support@nyayaai.com" },
          { icon: Phone, title: "Call Us", detail: "+91 98765 43210" },
          { icon: MapPin, title: "Visit Us", detail: "New Delhi, India" },
        ].map((item) => (
          <Card key={item.title} className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="py-8 space-y-3">
              <item.icon className="mx-auto h-8 w-8 text-primary" />
              <h3 className="font-semibold font-heading">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading">Send Us a Message</CardTitle>
          <CardDescription>Fill in the form below and we'll get back to you shortly.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="legal-query">Legal Query</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="bug-report">Bug Report</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea id="message" placeholder="Describe your legal query or feedback..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>

            <Button type="submit" className="w-full gap-2">
              <Send className="h-4 w-4" /> Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Contact;
