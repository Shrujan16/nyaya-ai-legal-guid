import { Link } from "react-router-dom";
import {
  MessageSquare, FileText, Shield, ArrowRight, Scale, Bot, Zap,
  Mic, Globe, Home as HomeIcon, AlertTriangle, Briefcase, Sparkles,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Bot,
    title: "AI Legal Chat",
    description: "Ask legal questions in plain language and get instant, easy-to-understand answers with Indian law references.",
    link: "/chat",
  },
  {
    icon: FileText,
    title: "Document Generator",
    description: "Generate professional legal documents like rental agreements and complaint letters in minutes.",
    link: "/documents",
  },
  {
    icon: Shield,
    title: "Rights Awareness",
    description: "Explore your fundamental legal rights as an Indian citizen with clear, concise explanations.",
    link: "/rights",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Access legal guidance in English and Hindi with easy language toggle for better accessibility.",
    link: "/chat",
  },
];

const stats = [
  { value: "10,000+", label: "Legal Queries Answered" },
  { value: "5,000+", label: "Documents Generated" },
  { value: "98%", label: "User Satisfaction" },
  { value: "50+", label: "Legal Topics Covered" },
];

const useCases = [
  {
    icon: HomeIcon,
    tag: "Tenant Issue",
    title: "Landlord not returning deposit",
    problem: "A tenant's landlord refuses to return the ₹50,000 security deposit after moving out, citing false damage claims.",
    solution: "NyayaAI guided the tenant to send a legal notice under Section 80 CPC, file a complaint at the Consumer Forum, and provided a ready-to-use demand letter template.",
  },
  {
    icon: AlertTriangle,
    tag: "Police Case",
    title: "What happens if I get arrested?",
    problem: "A young professional was detained by police without being informed of the charges and was denied access to a lawyer.",
    solution: "NyayaAI explained rights under Article 22 of the Constitution, Section 50 CrPC (right to know grounds of arrest), and the 24-hour magistrate production rule.",
  },
  {
    icon: Briefcase,
    tag: "Workplace Issue",
    title: "Facing harassment at work",
    problem: "An employee faced persistent workplace harassment but didn't know the legal process or where to report it.",
    solution: "NyayaAI outlined the POSH Act 2013 provisions, guided on filing an ICC complaint, and provided template complaint letters with relevant legal sections.",
  },
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_50%_/_0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            <Zap className="h-4 w-4 text-primary" />
            AI-Powered Legal Assistant for India
          </div>
          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Legal Help Made Simple
            <br />
            <span className="bg-gradient-to-r from-primary to-[hsl(230_80%_60%)] bg-clip-text text-transparent">
              with AI
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-foreground/80">
            Understand your rights, get instant legal guidance, and generate legal documents — all in one place.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            NyayaAI is your personal AI legal assistant designed for everyday people in India. Whether you are facing a legal issue, need help drafting documents, or want to understand your rights, NyayaAI provides simple, fast, and accessible support.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2 rounded-xl px-8 text-base shadow-lg shadow-primary/25">
              <Link to="/chat">
                <MessageSquare className="h-5 w-5" />
                Ask a Question
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 rounded-xl px-8 text-base">
              <Link to="/rights">
                <Shield className="h-5 w-5" />
                Know Your Rights
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card px-4 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-heading text-3xl font-bold text-primary">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Badge text="Features" />
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
              Everything You Need
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Access powerful legal tools designed for everyday people, not just lawyers.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Card
                key={f.title}
                className="group border bg-card shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="flex flex-col p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-base font-semibold">{f.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{f.description}</p>
                  <Link
                    to={f.link}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real-Life Use Cases */}
      <section className="border-y bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Badge text="Real-Life Use Cases" />
            <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">
              See How NyayaAI Helps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Real problems, real solutions — powered by AI and Indian law.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {useCases.map((uc, i) => (
              <Card
                key={uc.title}
                className="overflow-hidden border bg-card shadow-[var(--card-shadow)] transition-all duration-300 hover:shadow-[var(--card-shadow-hover)]"
              >
                <CardContent className="flex flex-col p-0">
                  <div className="bg-gradient-to-r from-primary to-[hsl(230,80%,60%)] px-6 py-4">
                    <div className="flex items-center gap-2 text-primary-foreground">
                      <uc.icon className="h-5 w-5" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{uc.tag}</span>
                    </div>
                    <h3 className="mt-2 font-heading text-lg font-bold text-primary-foreground">{uc.title}</h3>
                  </div>
                  <div className="space-y-4 p-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-destructive">Problem</p>
                      <p className="mt-1 text-sm text-muted-foreground">{uc.problem}</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-3.5 w-3.5" /> AI Solution
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{uc.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-primary to-[hsl(230_80%_60%)] p-10 text-center text-primary-foreground shadow-xl shadow-primary/20 md:p-16">
          <Scale className="mx-auto mb-4 h-10 w-10 opacity-80" />
          <h2 className="font-heading text-2xl font-bold md:text-3xl">Ready to Get Legal Help?</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            Start a conversation with our AI assistant and get answers to your legal questions instantly.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8 rounded-xl px-8 text-base font-semibold">
            <Link to="/chat">Ask NyayaAI Now</Link>
          </Button>
        </div>
      </section>

      {/* Powered by AI */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-8 text-center shadow-[var(--card-shadow)] md:p-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-heading text-xl font-bold md:text-2xl">Powered by AI</h3>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            NyayaAI uses artificial intelligence to simplify complex Indian legal information into easy-to-understand guidance for everyone.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <span className="flex items-center gap-2 font-heading font-semibold text-foreground">
            <Scale className="h-4 w-4 text-primary" /> NyayaAI
          </span>
          <span>This AI provides general legal information and does not replace professional legal advice.</span>
        </div>
      </footer>
    </div>
  );
};

const Badge = ({ text }: { text: string }) => (
  <span className="inline-flex items-center rounded-full border bg-accent px-3 py-1 text-xs font-semibold text-primary">
    {text}
  </span>
);

export default Home;
