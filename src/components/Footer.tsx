import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Radio,
} from "lucide-react";
import { Logo } from "./ui";

export default function Footer() {
  const groups = [
    {
      title: "PRODUCT",
      links: [
        ["Invoicing API", "/products/api/"],
        ["Windows Local API", "/products/offline-sdk/"],
        ["Pricing", "/pricing/"],
        ["System Status", "/status/"],
      ],
    },
    {
      title: "BUILD",
      links: [
        ["Developer Docs", "/developers/"],
        ["Developer Sandbox", "/developers/sandbox/"],
        ["API Reference", "/developers/#api-reference"],
        ["Integration Guide", "/developers/#quickstart"],
        ["Contact", "/contact/"],
      ],
    },
    {
      title: "COMPANY",
      links: [
        ["About PawaTax", "/company/"],
        ["Privacy", "/privacy/"],
        ["Terms", "/terms/"],
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <span className="footer-kicker">
              <i /> BUILD WITH PAWATAX
            </span>
            <h2>
              Your software handles the sale.
              <br />
              <span>We handle the fiscal layer.</span>
            </h2>
          </div>
          <div className="footer-cta-actions">
            <Link href="/developers/" className="footer-primary">
              Read the docs <ArrowRight size={16} />
            </Link>
            <Link href="/pricing/" className="footer-secondary">
              See pricing <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <Logo />
            <p>
              eTIMS infrastructure for POS, ERP and commerce software.
              One API online, one local runtime when connectivity disappears.
            </p>
            <div className="footer-signals">
              <span>
                <Radio size={13} /> API + LOCAL RUNTIME
              </span>
              <span className="made-in">🇰🇪 Built in Kenya</span>
            </div>
          </div>

          {groups.map((g) => (
            <div className="footer-column" key={g.title}>
              <h3>{g.title}</h3>
              {g.links.map(([label, href]) => (
                <Link href={href} key={label}>
                  {label}
                  <ArrowUpRight size={12} />
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PawaTax. All rights reserved.</span>
          <span>
            <Code2 size={14} /> API-first. Offline-ready.
          </span>
        </div>

        <p className="disclaimer">
          PawaTax is an independent software platform and is not affiliated with
          or endorsed by the Kenya Revenue Authority.
        </p>
      </div>
    </footer>
  );
}
