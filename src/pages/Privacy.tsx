import { Scale } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => (
  <div className="mx-auto max-w-3xl px-4 py-16">
    <h1 className="font-heading text-3xl font-bold">Privacy Policy</h1>
    <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

    <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
      <section>
        <h2 className="mb-3 font-heading text-lg font-bold text-foreground">1. Introduction</h2>
        <p>NyayaAI ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our AI-powered legal information platform.</p>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg font-bold text-foreground">2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="mt-2 ml-4 list-disc space-y-1">
          <li>Questions and queries you submit to our AI assistant</li>
          <li>Documents you generate using our platform</li>
          <li>Basic usage analytics (pages visited, features used)</li>
          <li>Device and browser information for performance optimization</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg font-bold text-foreground">3. How We Use Your Information</h2>
        <ul className="ml-4 list-disc space-y-1">
          <li>To provide AI-powered legal information and guidance</li>
          <li>To generate legal document drafts as requested</li>
          <li>To improve our AI models and service quality</li>
          <li>To ensure platform security and prevent misuse</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg font-bold text-foreground">4. Data Security</h2>
        <p>We implement industry-standard security measures to protect your data. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg font-bold text-foreground">5. Data Retention</h2>
        <p>Chat conversations are processed in real-time and are not permanently stored on our servers. Generated documents are created on-demand and can be downloaded by the user.</p>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg font-bold text-foreground">6. Third-Party Services</h2>
        <p>We may use third-party AI services to power our legal assistance features. These services process your queries to generate responses but do not retain personal information beyond the session.</p>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg font-bold text-foreground">7. Your Rights</h2>
        <p>Under applicable Indian data protection laws, you have the right to access, correct, or delete your personal information. Contact us for any data-related requests.</p>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg font-bold text-foreground">8. Contact</h2>
        <p>For privacy-related concerns, please contact us at <span className="font-medium text-primary">privacy@nyayaai.in</span></p>
      </section>
    </div>

    <div className="mt-12 rounded-xl border bg-muted/50 p-4 text-center text-xs text-muted-foreground">
      This platform provides general legal information and does not constitute legal advice.
    </div>
  </div>
);

export default Privacy;
