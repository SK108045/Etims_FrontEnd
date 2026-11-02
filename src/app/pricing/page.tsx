import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { CTA, PageHero, SectionTitle } from "@/components/ui";
import { PricingCards } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start with 10 production invoices free, then pay KES 1.50 per successfully issued invoice with PawaTax.",
};

const faqs = [
  {
    q: "How does Developer pricing work?",
    a: "There is no setup fee and no monthly fee. Your first 10 production invoices are free. After that, individual developers pay KES 1.50 for each invoice PawaTax successfully issues.",
  },
  {
    q: "What counts as a billable invoice?",
    a: "A successfully issued production fiscal invoice counts toward usage. Validation errors, failed requests and safe idempotent retries are not separate billable invoices.",
  },
  {
    q: "Do I pay just to test the integration?",
    a: "No. You can explore the documentation and browser-based examples without creating fiscal invoices. Your first 10 production invoices are also free when you are ready to go live.",
  },
  {
    q: "Is the Windows Local API included?",
    a: "Yes. The Windows x64 Local runtime uses the same branch API key and is included for supported developer integrations. It can issue locally while offline and synchronize completed invoices when connectivity returns.",
  },
  {
    q: "What if I have multiple merchants or higher volume?",
    a: "Talk to us. Business and Enterprise pricing is shaped around invoice volume, merchant and branch count, rollout requirements and support needs rather than forcing every integration into the individual developer rate.",
  },
];

export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="SIMPLE FROM INVOICE ONE"
        title={
          <>
            Start free.
            <br />
            <span>Pay as you issue.</span>
          </>
        }
        copy="No setup fee. No monthly fee for individual developers. Your first 10 production invoices are free, then it’s KES 1.50 per successfully issued invoice."
      />
      <section className="pricing-page container">
        <PricingCards />
        <p className="pricing-note">
          Developer usage is charged on successfully issued production invoices,
          not failed requests or safe retries. Business and Enterprise pricing
          is quoted separately for larger rollouts and higher volume.
        </p>
      </section>
      <section className="faq-section container">
        <SectionTitle
          eyebrow="STRAIGHT ANSWERS"
          title="No pricing gymnastics."
        />
        {faqs.map((f) => (
          <details className="faq-item" key={f.q}>
            <summary>
              {f.q}
              <Plus />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
      <CTA />
    </>
  );
}
