import {
  Shield, UserCheck, Home, Briefcase, Scale, Heart, BookOpen,
  Users, Baby, GraduationCap, Leaf, HandHeart, AlertTriangle,
  FileText, Globe, Accessibility, Landmark, Vote, Megaphone
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const rights = [
  // Fundamental Rights (Part III of Constitution)
  {
    icon: Scale,
    title: "Right to Equality (Articles 14-18)",
    description:
      "Equality before law, prohibition of discrimination on grounds of religion, race, caste, sex or place of birth. Abolition of untouchability and titles.",
    category: "Fundamental Rights",
  },
  {
    icon: Megaphone,
    title: "Right to Freedom (Articles 19-22)",
    description:
      "Freedom of speech and expression, assembly, association, movement, residence, and profession. Protection against arbitrary arrest — must be produced before a magistrate within 24 hours.",
    category: "Fundamental Rights",
  },
  {
    icon: AlertTriangle,
    title: "Right Against Exploitation (Articles 23-24)",
    description:
      "Prohibition of human trafficking, forced labor (begar), and employment of children below 14 years in factories, mines, and hazardous occupations.",
    category: "Fundamental Rights",
  },
  {
    icon: Heart,
    title: "Right to Freedom of Religion (Articles 25-28)",
    description:
      "Freedom of conscience and free profession, practice, and propagation of religion. Freedom to manage religious affairs and attend religious instruction.",
    category: "Fundamental Rights",
  },
  {
    icon: BookOpen,
    title: "Cultural & Educational Rights (Articles 29-30)",
    description:
      "Right of minorities to conserve their culture, language, and script. Right of minorities to establish and administer educational institutions.",
    category: "Fundamental Rights",
  },
  {
    icon: FileText,
    title: "Right to Constitutional Remedies (Article 32)",
    description:
      "Right to move the Supreme Court for enforcement of fundamental rights through writs — Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto.",
    category: "Fundamental Rights",
  },
  {
    icon: GraduationCap,
    title: "Right to Education (Article 21A)",
    description:
      "Free and compulsory education for all children aged 6 to 14 years. The RTE Act 2009 mandates neighborhood schools and prohibits capitation fees.",
    category: "Fundamental Rights",
  },
  {
    icon: Shield,
    title: "Right to Privacy (Article 21)",
    description:
      "Recognized as a fundamental right by the Supreme Court in K.S. Puttaswamy v. Union of India (2017). Covers data privacy, bodily autonomy, and personal choices.",
    category: "Fundamental Rights",
  },
  // Criminal / Police Rights
  {
    icon: Shield,
    title: "Rights During Arrest",
    description:
      "Right to know grounds of arrest (Section 50 CrPC), right to inform a friend/relative (Section 50A), right to legal aid, right to be produced before magistrate within 24 hours (Section 57 CrPC), and right against self-incrimination (Article 20(3)).",
    category: "Criminal Rights",
  },
  {
    icon: Shield,
    title: "Rights of the Accused",
    description:
      "Right to fair trial, presumption of innocence until proven guilty, right to be defended by a lawyer of choice, right to free legal aid under Article 39A, and right to speedy trial (Hussainara Khatoon case).",
    category: "Criminal Rights",
  },
  {
    icon: Shield,
    title: "FIR & Police Complaint Rights",
    description:
      "Police cannot refuse to register an FIR for cognizable offences (Section 154 CrPC). Zero FIR can be filed at any police station regardless of jurisdiction. E-FIR facility available in many states.",
    category: "Criminal Rights",
  },
  // Women's Rights
  {
    icon: UserCheck,
    title: "Protection Against Domestic Violence",
    description:
      "Protection of Women from Domestic Violence Act 2005 provides right to reside in shared household, protection orders, monetary relief, and custody orders.",
    category: "Women's Rights",
  },
  {
    icon: UserCheck,
    title: "Workplace Harassment Protection (POSH Act)",
    description:
      "Sexual Harassment of Women at Workplace Act 2013 mandates Internal Complaints Committee (ICC) in every organization with 10+ employees. Complaints must be resolved within 90 days.",
    category: "Women's Rights",
  },
  {
    icon: UserCheck,
    title: "Maternity Benefits",
    description:
      "Maternity Benefit (Amendment) Act 2017 provides 26 weeks of paid maternity leave for first two children, crèche facility mandatory for establishments with 50+ employees.",
    category: "Women's Rights",
  },
  {
    icon: UserCheck,
    title: "Women's Safety Laws",
    description:
      "Women cannot be arrested between sunset and sunrise except in exceptional circumstances. Female accused must be searched by a female officer. Dowry Prohibition Act 1961 makes giving/taking dowry a criminal offence.",
    category: "Women's Rights",
  },
  // Property & Tenant Rights
  {
    icon: Home,
    title: "Tenant Rights",
    description:
      "Right to fair rent agreement, protection against unlawful eviction, right to essential services, and right to receive rent receipts. Model Tenancy Act 2021 provides framework for dispute resolution.",
    category: "Property Rights",
  },
  {
    icon: Landmark,
    title: "Property Rights",
    description:
      "Right to acquire, hold, and dispose of property (Article 300A). Hindu Succession (Amendment) Act 2005 gives daughters equal coparcenary rights. RERA 2016 protects homebuyers.",
    category: "Property Rights",
  },
  // Employment Rights
  {
    icon: Briefcase,
    title: "Employment Rights",
    description:
      "Right to fair wages (Minimum Wages Act), equal pay for equal work, safe working conditions (Factories Act), protection against wrongful termination, and social security benefits (EPF, ESI).",
    category: "Employment Rights",
  },
  {
    icon: Briefcase,
    title: "Right Against Workplace Discrimination",
    description:
      "Equal Remuneration Act 1976 prohibits discrimination in wages. Rights of Persons with Disabilities Act 2016 mandates 4% reservation in government jobs and accessibility provisions.",
    category: "Employment Rights",
  },
  // Consumer Rights
  {
    icon: Users,
    title: "Consumer Rights",
    description:
      "Consumer Protection Act 2019 provides right to safety, right to be informed, right to choose, right to be heard, right to seek redressal, and right to consumer education. E-commerce rules included.",
    category: "Consumer Rights",
  },
  // Children's Rights
  {
    icon: Baby,
    title: "Children's Rights",
    description:
      "POCSO Act 2012 protects children from sexual offences. Juvenile Justice Act 2015 ensures care and protection. Right to Education Act guarantees free education. Child Labour Act prohibits employment of children.",
    category: "Children's Rights",
  },
  // Environmental Rights
  {
    icon: Leaf,
    title: "Environmental Rights",
    description:
      "Right to clean environment under Article 21 (M.C. Mehta v. Union of India). National Green Tribunal Act 2010 provides specialized forum. Right to clean air, water, and noise-free environment.",
    category: "Environmental Rights",
  },
  // Digital Rights
  {
    icon: Globe,
    title: "Digital & Cyber Rights",
    description:
      "IT Act 2000 provides framework for cybercrime redressal. Right to data privacy, protection against cyber fraud, identity theft, and online harassment. Digital Personal Data Protection Act 2023.",
    category: "Digital Rights",
  },
  // RTI
  {
    icon: FileText,
    title: "Right to Information (RTI Act 2005)",
    description:
      "Every citizen can seek information from public authorities. Response must be given within 30 days. ₹10 application fee. First appeal within 30 days, second appeal to Information Commission.",
    category: "Transparency Rights",
  },
  // Senior Citizens
  {
    icon: HandHeart,
    title: "Senior Citizens' Rights",
    description:
      "Maintenance and Welfare of Parents and Senior Citizens Act 2007 mandates children to provide maintenance. Right to property protection, old age homes, and healthcare facilities.",
    category: "Senior Citizens",
  },
  // Disability Rights
  {
    icon: Accessibility,
    title: "Rights of Persons with Disabilities",
    description:
      "Rights of Persons with Disabilities Act 2016 provides 21 recognized disabilities, 4% reservation in government jobs, accessibility mandates, and free education up to 18 years.",
    category: "Disability Rights",
  },
  // Voting Rights
  {
    icon: Vote,
    title: "Voting & Electoral Rights",
    description:
      "Universal adult suffrage under Article 326. Right to vote at 18 years. NOTA option available. Right to free and fair elections. Model Code of Conduct during elections.",
    category: "Electoral Rights",
  },
];

const categories = [...new Set(rights.map((r) => r.category))];

const Rights = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">Know Your Rights</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          A comprehensive guide to your legal rights as an Indian citizen. Awareness is the first step to justice.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="mt-12">
          <h2 className="font-heading text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <Scale className="h-5 w-5" />
            {category}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rights
              .filter((r) => r.category === category)
              .map((r, i) => (
                <Card
                  key={r.title}
                  className="border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                        <r.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-semibold leading-tight">{r.title}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{r.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}

      <div className="mt-16 rounded-2xl border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          ⚖️ Knowing your rights empowers you to take action confidently. This information is for awareness only — please consult a qualified lawyer for legal advice.
        </p>
      </div>
    </div>
  );
};

export default Rights;
