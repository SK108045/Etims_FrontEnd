import type { Metadata } from "next";
import { Info, HardDrive, RefreshCw, Smartphone } from "lucide-react";
import { Button, CTA, Eyebrow, PageHero } from "@/components/ui";
import { OfflineDemo } from "@/components/ApiDemo";
export const metadata: Metadata = {
  title: "Offline SDK — In Development",
  description:
    "Explore the PawaTax offline SDK roadmap for devices and checkout software that need to work through connectivity gaps.",
};
export default function SDK() {
  return (
    <>
      <PageHero
        eyebrow="OFFLINE SDK · IN DEVELOPMENT"
        title={
          <>
            A little less connection.
            <br />
            <span>A lot more continuity.</span>
          </>
        }
        copy="Your ambition doesn’t stop at the edge of a network. We’re building an offline SDK for checkout software that needs to keep going through connection gaps."
      >
        <div className="button-row">
          <Button href="/contact/?interest=offline-sdk">
            Register your interest
          </Button>
        </div>
        <p className="small-note">
          Planned product. Platform support and release details will be
          announced.
        </p>
      </PageHero>
      <OfflineDemo />
      <div className="roadmap-note">
        <Info size={18} />
        <p>
          <strong>A look at what we’re building.</strong> This simulator
          demonstrates the intended queue-and-reconnect experience. It is not a
          downloadable SDK, and queued example invoices are not fiscalised.
          Fiscal processing requires a connection.
        </p>
      </div>
      <section className="two-col-section container">
        <div data-reveal>
          <Eyebrow>DESIGNED FOR THE REAL WORLD</Eyebrow>
          <h2>
            Because the next sale
            <br />
            can happen anywhere.
          </h2>
          <p>
            Mobile counters. Desktop checkouts. Retail on the move. Connectivity
            looks different for every business, and our offline roadmap starts
            with that reality.
          </p>
          <p>
            Tell us about your operating system, hardware and connection
            patterns to help shape the SDK.
          </p>
          <div className="button-row">
            <Button href="/contact/?interest=offline-sdk" secondary>
              Share your use case
            </Button>
          </div>
        </div>
        <div className="principle-list">
          {[
            {
              icon: HardDrive,
              title: "Local queue, by design",
              text: "Planned: keep invoice payloads available locally during connection gaps.",
            },
            {
              icon: RefreshCw,
              title: "Reconnect and continue",
              text: "Planned: submit queued invoice data for fiscal processing when connectivity returns.",
            },
            {
              icon: Smartphone,
              title: "Built around your devices",
              text: "Android, desktop and other client environments are part of our research. Final support is to be confirmed.",
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
      <CTA />
    </>
  );
}
