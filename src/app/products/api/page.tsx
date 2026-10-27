import type { Metadata } from "next";
import { FileCheck2, KeyRound, Building2 } from "lucide-react";
import { Button, CTA, Eyebrow, PageHero } from "@/components/ui";
import ApiDemo from "@/components/ApiDemo";
import { Features, HowItWorks } from "@/components/Sections";
export const metadata: Metadata = {
  title: "Invoicing API",
  description:
    "Send invoice data through a straightforward REST API and receive fiscal invoice and receipt information.",
};
export default function ApiPage() {
  return (
    <>
      <PageHero
        eyebrow="PAWATAX INVOICING API"
        title={
          <>
            From your checkout.
            <br />
            <span>To a fiscal invoice.</span>
          </>
        }
        copy="One REST endpoint connects your software to fiscal processing. Work in your own stack, send normal JSON, and build the receipt experience your customers need."
      >
        <div className="button-row">
          <Button href="/developers/#quickstart">Read the quickstart</Button>
          <Button href="/developers/#api-reference" secondary>
            API reference
          </Button>
        </div>
      </PageHero>
      <div className="api-product-visual">
        <ApiDemo large />
      </div>
      <section className="two-col-section container">
        <div data-reveal>
          <Eyebrow>KEEP THE INTERFACE SIMPLE</Eyebrow>
          <h2>
            The sale is yours.
            <br />
            <span className="muted-heading">The fiscal layer is ours.</span>
          </h2>
          <p>
            Your application submits the invoice. PawaTax handles the fiscal
            workflow and returns the information needed to generate a receipt in
            your software.
          </p>
          <p>
            Keep your checkout, your business logic and your customer
            experience. Add the fiscal connection behind the scenes.
          </p>
        </div>
        <div className="principle-list">
          {[
            {
              icon: KeyRound,
              title: "Authenticate by branch",
              text: "Use a Bearer API key associated with the right merchant branch.",
            },
            {
              icon: FileCheck2,
              title: "Return the receipt essentials",
              text: "Work with fiscal invoice numbers, receipt signatures and QR data.",
            },
            {
              icon: Building2,
              title: "Keep merchant accounts distinct",
              text: "Build for multiple businesses with separate merchant and branch contexts.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div className="principle" key={title} data-reveal>
              <Icon />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Features />
      <HowItWorks />
      <CTA />
    </>
  );
}
