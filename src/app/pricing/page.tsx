import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { CTA, PageHero, SectionTitle } from "@/components/ui";
import { PricingCards } from "@/components/Sections";
export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore the upcoming Developer, Business and Enterprise plans for PawaTax.",
};
const faqs = [
  {
    q: "Are these plans available today?",
    a: "Final plans and prices have not been published. This is a preview of how we’re thinking about different integration needs. Explore the developer guide now, or prepare an integration brief to register your interest.",
  },
  {
    q: "What will pricing be based on?",
    a: "We’re considering API usage, invoices processed, number of branches and enterprise volume. These are potential billing dimensions, rather than final plan limits or commitments.",
  },
  {
    q: "Can I integrate multiple merchants?",
    a: "The platform architecture supports multiple merchant accounts and branches, with per-branch API credentials. Talk to us about the shape of your integration before planning a rollout.",
  },
  {
    q: "Is the offline SDK included?",
    a: "The offline SDK is in development. Availability, supported platforms and commercial details will be confirmed when the product is ready.",
  },
  {
    q: "Can I try the API examples?",
    a: "Yes. The interactive examples across this site run locally in your browser. They demonstrate the request and response shape without sending real data or creating fiscal invoices.",
  },
];
export default function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="A PLAN FOR YOUR NEXT CHAPTER"
        title={
          <>
            Simple pricing.
            <br />
            <span>Room to grow.</span>
          </>
        }
        copy="From your first integration to your next branch. We’re shaping plans around real businesses, and final pricing is on the way."
      />
      <section className="pricing-page container">
        <PricingCards />
        <p className="pricing-note">
          Potential billing dimensions include API usage, invoices processed,
          branches and enterprise volume. Final prices, limits and availability
          are not yet announced.
        </p>
      </section>
      <section className="faq-section container">
        <SectionTitle
          eyebrow="A FEW THINGS TO KNOW"
          title="Good questions. Clear answers."
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
