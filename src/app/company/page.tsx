import type { Metadata } from "next";
import { CTA, Eyebrow, PageHero } from "@/components/ui";
export const metadata: Metadata = {
  title: "About",
  description:
    "PawaTax is building a simpler fiscal invoicing layer for software developers in Kenya.",
};
export default function Company() {
  return (
    <>
      <PageHero
        eyebrow="BUILT FOR KENYA. BUILT FOR BUILDERS."
        title={
          <>
            More time for the product.
            <br />
            <span>Less time on the plumbing.</span>
          </>
        }
        copy="We’re building the fiscal infrastructure that lets developers get back to what they do best: creating software that moves businesses forward."
      />
      <section className="company-manifesto container" data-reveal>
        <Eyebrow dark>WHY PAWATAX EXISTS</Eyebrow>
        <h2>
          A great checkout should be about the customer.
          <br />
          <span>The infrastructure should just make it possible.</span>
        </h2>
        <p>
          For software teams, fiscal invoicing is one part of a much bigger
          product. PawaTax brings that connection into a straightforward API, so
          every team doesn’t have to solve the same integration problem alone.
        </p>
        <p>
          We’re starting with eTIMS integration in Kenya. Our focus is simple: a
          developer experience that respects your time, your stack and the
          businesses counting on your software.
        </p>
      </section>
      <section className="company-values container">
        {[
          {
            n: "01",
            title: "Simple at the surface.",
            text: "Infrastructure can be complex. The interface your team works with should be clear, predictable and easy to reason about.",
          },
          {
            n: "02",
            title: "Built around real businesses.",
            text: "Different devices, multiple branches and imperfect connections. Our roadmap starts with the way software is actually used.",
          },
          {
            n: "03",
            title: "Honest about the details.",
            text: "We distinguish what’s available from what we’re developing. Clear documentation and straightforward product communication are part of the work.",
          },
        ].map((v) => (
          <article className="company-value" key={v.n} data-reveal>
            <span>{v.n} / OUR APPROACH</span>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </article>
        ))}
      </section>
      <CTA />
    </>
  );
}
