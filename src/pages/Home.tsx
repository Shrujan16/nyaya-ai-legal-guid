import { Link } from "react-router-dom";
import {
  MessageSquare, FileText, Shield, ArrowRight, Scale, Bot, Zap,
  Globe, Home as HomeIcon, AlertTriangle, Briefcase, Sparkles,
  CheckCircle2, Search, BookOpen, Users, Award, ChevronRight,
  Mic, ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Bot,
    title: "AI Legal Chat",
    description: "Get structured legal analysis with Indian law references — IPC, CrPC, Constitution and more.",
    link: "/chat",
  },
  {
    icon: FileText,
    title: "Document Generator",
    description: "Generate professional legal drafts — rental agreements, FIRs, complaint letters — instantly.",
    link: "/documents",
  },
  {
    icon: Shield,
    title: "Rights Awareness",
    description: "Explore your fundamental rights as an Indian citizen with clear, actionable explanations.",
    link: "/rights",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Access legal guidance in English and Hindi with seamless language switching.",
    link: "/chat",
  },
  {
    icon: Mic,
    title: "Voice Input",
    description: "Speak your legal question naturally — AI converts your voice to text for analysis.",
    link: "/chat",
  },
  {
    icon: ClipboardList,
    title: "Case Analysis Mode",
    description: "Describe your situation and get structured risk assessment with suggested legal actions.",
    link: "/chat",
  },
];

const stats = [
  { value: "10,000+", label: "Legal Queries Answered", icon: MessageSquare },
  { value: "5,000+", label: "Documents Generated", icon: FileText },
  { value: "98%", label: "User Satisfaction", icon: Award },
  { value: "50+", label: "Legal Topics Covered", icon: BookOpen },
];

const useCases = [
  {
    icon: HomeIcon,
    tag: "Tenant Issue",
    title: "Landlord not returning deposit",
    problem: "A tenant's landlord refuses to return the ₹50,000 security deposit after moving out, citing false damage claims.",
    solution: "NyayaAI guided the tenant to send a legal notice under Section 80 CPC, file a Consumer Forum complaint, and provided a demand letter template citing Transfer of Property Act.",
  },
  {
    icon: AlertTriangle,
    tag: "Police Case",
    title: "What happens if I get arrested?",
    problem: "A young professional was detained by police without being told the reason and was denied access to a lawyer.",
    solution: "NyayaAI explained rights under Article 22, Section 50 CrPC (grounds of arrest), the 24-hour magistrate rule under Section 57, and D.K. Basu guidelines.",
  },
  {
    icon: Briefcase,
    tag: "Workplace Issue",
    title: "Facing harassment at work",
    problem: "An employee faced persistent workplace harassment but didn't know the legal process or where to report it.",
    solution: "NyayaAI outlined the POSH Act 2013 provisions, the ICC complaint process, Section 354A IPC applicability, and provided complaint letter templates.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Ask Your Question",
    description: "Type or speak your legal question in simple language — no legal jargon needed.",
    icon: Search,
  },
  {
    step: "02",
    title: "AI Analyzes Indian Laws",
    description: "Our AI scans relevant sections of IPC, CrPC, Constitution, and 100+ Indian statutes.",
    icon: BookOpen,
  },
  {
    step: "03",
    title: "Get Structured Guidance",
    description: "Receive a clear breakdown with Legal Explanation, Applicable Laws, and Action Steps.",
    icon: CheckCircle2,
  },
];

const lawyers = [
  { name: "Adv. Priya Sharma", exp: "12 years", specialization: "Criminal Law", rating: "4.9" },
  { name: "Adv. Rahul Mehra", exp: "8 years", specialization: "Property & Tenant Law", rating: "4.8" },
  { name: "Adv. Sneha Patel", exp: "15 years", specialization: "Employment & Labour Law", rating: "4.9" },
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_50%_/_0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <Zap className="h-4 w-4 text-primary" />
            India's AI-Powered Legal Assistant
          </div>
          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Legal Help Made Simple
            <br />
            <span className="bg-gradient-to-r from-primary to-[hsl(230_80%_60%)] bg-clip-text text-transparent">
              with AI
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Understand your rights, get instant legal guidance with Indian law citations, and generate professional legal documents — all powered by artificial intelligence.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2 rounded-xl px-8 text-base shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02]">
              <Link to="/chat">
                <MessageSquare className="h-5 w-5" />
                Ask a Legal Question
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 rounded-xl px-8 text-base transition-transform hover:scale-[1.02]">
              <Link to="/rights">
                <Shield className="h-5 w-5" />
                Know Your Rights
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="border-y bg-card px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Trusted by thousands</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <s.icon className="mb-2 h-5 w-5 text-primary/60" />
                <div className="font-heading text-3xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> AI-powered legal insights</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Built for Indian law</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Supports multiple legal topics</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <SectionBadge text="How It Works" />
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">Three Simple Steps</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Getting legal guidance has never been easier. No appointments, no fees, no jargon.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {howItWorks.map((s, i) => (
              <div key={s.step} className="group relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary shadow-sm transition-transform group-hover:scale-110">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="font-heading text-4xl font-extrabold text-primary/10">{s.step}</span>
                <h3 className="mt-1 font-heading text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                {i < howItWorks.length - 1 && (
                  <ChevronRight className="absolute -right-4 top-8 hidden h-5 w-5 text-primary/30 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="border-y bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionBadge text="Features" />
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">Everything You Need</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Powerful legal tools designed for everyday people, not just lawyers.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Card
                key={f.title}
                className="group border bg-card shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1"
              >
                <CardContent className="flex flex-col p-6">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary transition-transform group-hover:scale-110">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-sm font-bold">{f.title}</h3>
                  <p className="mt-1.5 flex-1 text-xs text-muted-foreground leading-relaxed">{f.description}</p>
                  <Link
                    to={f.link}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:underline"
                  >
                    Try Now <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real-Life Use Cases */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <SectionBadge text="Real-Life Use Cases" />
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">See How NyayaAI Helps</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Real problems, real solutions — powered by AI and Indian law.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {useCases.map((uc) => (
              <Card key={uc.title} className="overflow-hidden border shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1">
                <CardContent className="flex flex-col p-0">
                  <div className="bg-gradient-to-r from-primary to-[hsl(230,80%,60%)] px-5 py-4">
                    <div className="flex items-center gap-2 text-primary-foreground/80">
                      <uc.icon className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{uc.tag}</span>
                    </div>
                    <h3 className="mt-1.5 font-heading text-sm font-bold text-primary-foreground">{uc.title}</h3>
                  </div>
                  <div className="space-y-3 p-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-destructive">Problem</p>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{uc.problem}</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-3 w-3" /> AI Solution
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{uc.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Find a Lawyer */}
      <section className="border-y bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <SectionBadge text="Find a Lawyer" />
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">Connect with Legal Experts</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Need professional help? Browse verified lawyers specializing in Indian law.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {lawyers.map((l) => (
              <Card key={l.name} className="border shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] hover:-translate-y-1">
                <CardContent className="p-5 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-sm font-bold">{l.name}</h3>
                  <p className="mt-0.5 text-xs text-primary font-medium">{l.specialization}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{l.exp} experience · ⭐ {l.rating}</p>
                  <Button size="sm" className="mt-4 w-full rounded-lg text-xs">
                    Connect with Lawyer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-primary to-[hsl(230_80%_60%)] p-10 text-center text-primary-foreground shadow-xl shadow-primary/20 md:p-14">
          <Scale className="mx-auto mb-4 h-10 w-10 opacity-80" />
          <h2 className="font-heading text-2xl font-bold md:text-3xl">Ready to Get Legal Help?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/80">
            Start a conversation with our AI assistant and get structured legal guidance with Indian law citations.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 rounded-xl px-8 text-base font-semibold transition-transform hover:scale-[1.02]">
            <Link to="/chat">Ask NyayaAI Now</Link>
          </Button>
        </div>
      </section>

      {/* Powered by AI */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-[var(--card-shadow)] md:p-10">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-heading text-lg font-bold">Powered by AI</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            NyayaAI uses artificial intelligence to simplify complex Indian legal information into easy-to-understand guidance for everyone.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div>
              <span className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                <Scale className="h-5 w-5 text-primary" /> NyayaAI
              </span>
              <p className="mt-2 max-w-xs text-xs text-muted-foreground leading-relaxed">
                India's AI-powered legal assistant. Simplifying law for everyday people.
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Platform</h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Link to="/chat" className="text-xs text-muted-foreground hover:text-primary transition-colors">AI Chat</Link>
                  <Link to="/documents" className="text-xs text-muted-foreground hover:text-primary transition-colors">Documents</Link>
                  <Link to="/rights" className="text-xs text-muted-foreground hover:text-primary transition-colors">Your Rights</Link>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Legal</h4>
                <div className="mt-3 flex flex-col gap-2">
                  <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                  <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-[11px] text-muted-foreground">
            This platform provides general legal information and does not constitute legal advice. Please consult a qualified lawyer for specific legal matters.
          </div>
        </div>
      </footer>
    </div>
  );
};

const SectionBadge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-full border bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
    {text}
  </span>
);

export default Home;
