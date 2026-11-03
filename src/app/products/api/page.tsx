import type { Metadata } from "next";
import { FileCheck2, KeyRound, Building2 } from "lucide-react";
import { Button, CTA, Eyebrow, PageHero } from "@/components/ui";
import ApiDemo from "@/components/ApiDemo";
import FiscalReceiptExample from "@/components/FiscalReceiptExample";
import { Features, HowItWorks } from "@/components/Sections";
export const metadata: Metadata = {
  title: "Invoicing API",
  description:
    "Test with pawa_test keys in your user portal, then use the same invoice JSON and REST contract with a live registered branch.",
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
        copy="One API key and your invoice JSON. PawaTax resolves the registered branch and device, signs the invoice immediately and saves it in the dashboard for review and manual KRA submission."
      >
        <div className="button-row">
          <Button href="/developers/sandbox/">Start in the sandbox</Button>
          <Button href="/developers/#api-reference" secondary>
            API reference
          </Button>
        </div>
      </PageHero>
      <div className="api-product-visual">
        <ApiDemo large mode="sandbox" />
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
            Your application submits the sale through POST /v1/invoices. PawaTax
            signs and saves it, then returns the data your software needs for a receipt.
          </p>
          <p>
            Start with a pawa_test_* key from Sandbox inside your user portal.
            The same cloud endpoint simulates invoices without KRA calls, real
            device registration or production counters. Replace the key with
            pawa_live_* for an onboarded cloud branch when ready.
          </p>
          <p>
            For a Windows Local branch, use port 17500 with the same request JSON.
            Its activated PC remains the signing owner while online or offline;
            cloud creation is blocked for that branch.
          </p>
        </div>
        <div className="principle-list">
          {[
            {
              icon: KeyRound,
              title: "Authenticate by branch",
              text: "Send X-API-Key. The key selects the existing merchant, branch, device and environment.",
            },
            {
              icon: FileCheck2,
              title: "Return the receipt essentials",
              text: "Receive HTTP 201 with the signed invoice, signature and verification URL. KRA acceptance is a later step.",
            },
            {
              icon: Building2,
              title: "Retry without signing twice",
              text: "Use a unique external_id per sale. Retrying the same invoice returns its original fiscal result.",
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
      <section
        className="two-col-section container receipt-output-section"
        id="receipt-output"
      >
        <div data-reveal>
          <Eyebrow>THE RECEIPT, MADE CONCRETE</Eyebrow>
          <h2>
            What your receipt
            <br />
            <span className="muted-heading">can look like.</span>
          </h2>
          <p>
            Control unit details and QR data, together in one readable receipt
            block. Your software can present them in the receipt experience
            you’ve built for your customers.
          </p>
          <ul className="receipt-output-fields">
            <li>CU serial number</li>
            <li>CU invoice number</li>
            <li>Receipt reference</li>
            <li>Date and QR code</li>
          </ul>
          <div className="button-row">
            <Button href="/developers/#receipt-output" secondary>
              Explore receipt output
            </Button>
          </div>
        </div>
        <FiscalReceiptExample />
      </section>
      <Features />
      <HowItWorks />
      <CTA />
    </>
  );
}
