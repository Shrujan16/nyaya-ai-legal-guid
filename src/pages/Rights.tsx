import { Shield, UserCheck, Home, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const rights = [
  {
    icon: Shield,
    title: "Police Rights",
    description:
      "You have the right to remain silent, the right to a lawyer, and must be produced before a magistrate within 24 hours of arrest.",
  },
  {
    icon: UserCheck,
    title: "Women Safety Laws",
    description:
      "Women have the right to file complaints at any police station and cannot be arrested at night except under special circumstances.",
  },
  {
    icon: Home,
    title: "Tenant Rights",
    description:
      "Tenants have the right to a fair agreement and protection against unlawful eviction without notice.",
  },
  {
    icon: Briefcase,
    title: "Employment Rights",
    description:
      "Employees have the right to fair wages, safe working conditions, and protection against harassment.",
  },
];

const Rights = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold">Know Your Rights</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Learn about your legal rights in simple language. Awareness is the first step to justice.
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
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Knowing your rights empowers you to take action confidently.
        </p>
      </div>
    </div>
  );
};

export default Rights;
