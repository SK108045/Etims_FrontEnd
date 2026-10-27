import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
export const metadata: Metadata = {
  title: "Terms — Website Preview",
  description:
    "Scope and availability of the PawaTax marketing website and illustrative API demos.",
};
export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="A FEW CLEAR BOUNDARIES"
        title={
          <>
            The details
            <br />
            <span>behind the preview.</span>
          </>
        }
        copy="Website preview information. Updated 27 October 2026."
      />
      <article className="legal-content container">
        <div className="legal-notice">
          These notes explain this demonstration website. They are not a final
          subscription agreement or production platform terms of service.
        </div>
        <h2>What this website provides</h2>
        <p>
          This site introduces PawaTax and illustrates the intended developer
          experience. Its interactive code snippets, response values, invoice
          references and QR visuals are sample content. They do not represent a
          real customer invoice or create a valid fiscal document.
        </p>
        <h2>Product availability</h2>
        <p>
          The invoicing API is described according to the supplied product
          architecture. Production access requires onboarding and verification
          of the live API contract. The offline SDK is in development; its
          release date, supported platforms and final behavior are not
          announced.
        </p>
        <h2>Pricing and commercial terms</h2>
        <p>
          Developer and Business prices are coming soon. Enterprise requirements
          can be outlined in an integration brief. Displayed plan descriptions
          are previews, and no purchase, payment or subscription is created on
          this website.
        </p>
        <h2>Accounts and enquiries</h2>
        <p>
          The sign-in control displays early access information. It does not
          authenticate an account. The brief form creates a downloadable text
          file locally and does not send an enquiry or register an email
          subscription.
        </p>
        <h2>Independent software platform</h2>
        <p>
          PawaTax is an independent software platform and is not affiliated with
          or endorsed by the Kenya Revenue Authority. This website does not
          provide tax or legal advice.
        </p>
        <h2>Before production use</h2>
        <p>
          Confirm the API contract, service availability, applicable commercial
          terms and platform privacy policy with the PawaTax team before
          connecting real merchant data. Explore the{" "}
          <Link href="/developers/">developer guide</Link> to prepare your
          integration requirements.
        </p>
      </article>
    </>
  );
}
