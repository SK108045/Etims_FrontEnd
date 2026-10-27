import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
export const metadata: Metadata = {
  title: "Privacy — Website Preview",
  description:
    "How this PawaTax website preview handles example data and integration briefs.",
};
export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="CLEAR ABOUT YOUR DATA"
        title={
          <>
            Privacy,
            <br />
            <span>without the fine-print maze.</span>
          </>
        }
        copy="Data handling for this website preview. Updated 27 October 2026."
      />
      <article className="legal-content container">
        <div className="legal-notice">
          This page describes the behavior implemented in this website preview.
          A full platform privacy policy will be provided before production
          account onboarding.
        </div>
        <h2>The interactive examples</h2>
        <p>
          API examples and the offline connection simulator run in your browser.
          They use sample data and do not send requests to a production fiscal
          API. They do not issue invoices.
        </p>
        <h2>Your integration brief</h2>
        <p>
          The contact form creates a text brief in memory in your browser
          session. Submitting the form does not send your details to PawaTax.
          You can download the brief to your device; it is then handled like any
          other local file you choose to keep or share. Leaving or refreshing
          the page clears the in-memory form result.
        </p>
        <h2>Website delivery</h2>
        <p>
          The site’s hosting provider may process normal request information to
          deliver the website and protect its infrastructure. This application
          does not implement advertising trackers or analytics cookies. Fonts
          are requested from Google Fonts, which receives the network
          information necessary to deliver those font files.
        </p>
        <h2>Future platform accounts</h2>
        <p>
          Merchant accounts, production API access and SDK onboarding are
          outside this website preview. Their data handling, retention and
          account controls will need to be documented before they are enabled
          here.
        </p>
        <h2>Questions and integration planning</h2>
        <p>
          Visit the <Link href="/contact/">integration brief page</Link> to
          record your requirements. This preview does not currently provide a
          message delivery channel.
        </p>
      </article>
    </>
  );
}
