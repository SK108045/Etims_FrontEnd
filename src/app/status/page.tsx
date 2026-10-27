import type { Metadata } from "next";
import {
  Activity,
  Braces,
  LayoutDashboard,
  WifiOff,
  Globe,
} from "lucide-react";
import { PageHero } from "@/components/ui";
export const metadata: Metadata = {
  title: "System Status",
  description:
    "PawaTax website preview availability and production status information.",
};
export default function Status() {
  return (
    <>
      <PageHero
        eyebrow="A CLEAR VIEW OF THE PLATFORM"
        title={
          <>
            Good infrastructure.
            <br />
            <span>Clear communication.</span>
          </>
        }
        copy="You’re viewing the PawaTax website preview. Live API monitoring will be connected before public production access."
      />
      <section className="status-panel">
        <div className="status-heading">
          <Activity size={27} />
          <div>
            <h2>Preview environment</h2>
            <p>No live service telemetry is connected to this page.</p>
          </div>
        </div>
        {[
          {
            icon: Globe,
            name: "Marketing website",
            status: "Preview available",
          },
          {
            icon: Braces,
            name: "Invoicing API",
            status: "Production status not connected",
          },
          {
            icon: LayoutDashboard,
            name: "Merchant portal",
            status: "Private development",
          },
          { icon: WifiOff, name: "Offline SDK", status: "In development" },
        ].map(({ icon: Icon, name, status }) => (
          <div className="status-row" key={name}>
            <span>
              <Icon size={18} />
              {name}
            </span>
            <strong>{status}</strong>
          </div>
        ))}
        <p>
          These labels describe this preview and the product roadmap. They are
          not uptime measurements, an incident feed or a service-level
          commitment.
        </p>
      </section>
    </>
  );
}
