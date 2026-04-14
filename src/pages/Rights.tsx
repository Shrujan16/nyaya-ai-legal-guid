import { Shield, Scale, Users, BookOpen, Heart, Home, Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const rights = [
  {
    icon: Scale,
    title: "Right to Equality",
    article: "Articles 14–18",
    description:
      "All citizens are equal before the law. The State shall not discriminate on grounds of religion, race, caste, sex, or place of birth. Untouchability is abolished and its practice is punishable.",
  },
  {
    icon: BookOpen,
    title: "Right to Freedom",
    article: "Articles 19–22",
    description:
      "Citizens enjoy freedom of speech and expression, assembly, association, movement, residence, and profession. Protection against arbitrary arrest and detention is guaranteed.",
  },
  {
    icon: Users,
    title: "Right Against Exploitation",
    article: "Articles 23–24",
    description:
      "Human trafficking and forced labour are prohibited. Children below 14 years cannot be employed in factories, mines, or hazardous occupations.",
  },
  {
    icon: Heart,
    title: "Right to Freedom of Religion",
    article: "Articles 25–28",
    description:
      "Every person has the right to freely profess, practice, and propagate religion. Religious communities can manage their own affairs and establish institutions.",
  },
  {
    icon: GraduationCap,
    title: "Cultural & Educational Rights",
    article: "Articles 29–30",
    description:
      "Minorities have the right to conserve their language, script, and culture. They can establish and administer educational institutions of their choice.",
  },
  {
    icon: Shield,
    title: "Right to Constitutional Remedies",
    article: "Article 32",
    description:
      'Called the "heart and soul" of the Constitution by Dr. Ambedkar. Citizens can approach the Supreme Court directly for enforcement of fundamental rights through writs.',
  },
  {
    icon: Home,
    title: "Right to Property",
    article: "Article 300A",
    description:
      "No person shall be deprived of their property except by authority of law. While no longer a fundamental right, it remains a constitutional right with legal protections.",
  },
  {
    icon: Briefcase,
    title: "Consumer Rights",
    article: "Consumer Protection Act, 2019",
    description:
      "Consumers have the right to safety, information, choice, redressal, and education. Complaints can be filed online through the National Consumer Helpline (1800-11-4000).",
  },
];

const Rights = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold">Know Your Rights</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Understanding your legal rights is the first step to protecting them. Here are the fundamental rights
          guaranteed to every Indian citizen.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {rights.map((r, i) => (
          <Card
            key={r.title}
            className="border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <r.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold">{r.title}</h3>
                  <span className="text-xs font-medium text-primary">{r.article}</span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Disclaimer:</strong> The information provided here is for general
          awareness purposes only. It does not constitute legal advice. For specific legal matters, please
          consult a qualified legal professional.
        </p>
      </div>
    </div>
  );
};

export default Rights;
