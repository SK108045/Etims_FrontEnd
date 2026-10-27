import type { Metadata } from "next";
import { Braces, WifiOff } from "lucide-react";
import { Button, CTA, Eyebrow, PageHero } from "@/components/ui";
import IntegrationFlow from "@/components/IntegrationFlow";
import { Features, HowItWorks } from "@/components/Sections";
export const metadata: Metadata = {
  title: "The Platform",
  description:
    "Connect web, Android, desktop, ERP and e-commerce software to fiscal invoicing with PawaTax.",
};
export default function Products() {
  return (
    <>
      <PageHero
        eyebrow="YOUR SOFTWARE. ONE FISCAL LAYER."
        title={
          <>
            Good software deserves
            <br />
            <span>a simpler integration.</span>
          </>
        }
        copy="From an Android POS on the counter to an ERP in the cloud. Give your software a clear path to fiscal invoicing."
      >
        <div className="button-row">
          <Button href="/developers/">Start Building</Button>
          <Button href="/contact/" secondary>
            Talk integration
          </Button>
        </div>
      </PageHero>
      <div className="container product-topology">
        <IntegrationFlow />
      </div>
      <section className="section container product-pair">
        <article className="product-card" data-reveal>
          <Braces size={35} strokeWidth={1.3} />
          <Eyebrow>THE ONLINE CONNECTION</Eyebrow>
          <h2>
            Your JSON.
            <br />
            Now fiscal.
          </h2>
          <p>
            The PawaTax REST API connects your application to the fiscal
            invoicing workflow. Send invoice data and get invoice numbers,
            receipt signatures and QR information back.
          </p>
          <Button href="/products/api/">Explore the API</Button>
        </article>
        <article className="product-card product-card-sdk" data-reveal>
          <WifiOff size={35} strokeWidth={1.3} />
          <Eyebrow>UPCOMING · THE OFFLINE CONNECTION</Eyebrow>
          <h2>
            Less signal.
            <br />
            Same ambition.
          </h2>
          <p>
            We’re developing an SDK for applications that need to keep working
            through connection gaps. Explore the local queue and reconnect
            experience we’re designing.
          </p>
          <Button href="/products/offline-sdk/" secondary>
            Meet the offline SDK
          </Button>
        </article>
      </section>
      <Features />
      <HowItWorks />
      <CTA />
    </>
  );
}
