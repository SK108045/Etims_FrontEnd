import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Logo } from "./ui";
export default function Footer() {
  const groups = [
    {
      title: "PRODUCTS",
      links: [
        ["Invoicing API", "/products/api/"],
        ["Offline SDK", "/products/offline-sdk/"],
        ["Merchant Platform", "/products/"],
      ],
    },
    {
      title: "DEVELOPERS",
      links: [
        ["Documentation", "/developers/"],
        ["API Reference", "/developers/#api-reference"],
        ["System Status", "/status/"],
      ],
    },
    {
      title: "COMPANY",
      links: [
        ["About PawaTax", "/company/"],
        ["Contact", "/contact/"],
        ["Privacy", "/privacy/"],
        ["Terms", "/terms/"],
      ],
    },
  ];
  return (
    <footer className="footer container">
      <div className="footer-main">
        <div className="footer-brand">
          <Logo />
          <p>
            The fiscal layer for
            <br />
            whatever you’re building.
          </p>
          <span className="made-in">
            <span>🇰🇪</span> Built for Kenya. Built for builders.
          </span>
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
          <Code2 size={14} /> Less friction. More possibility.
        </span>
      </div>
      <p className="disclaimer">
        PawaTax is an independent software platform and is not affiliated with
        or endorsed by the Kenya Revenue Authority.
      </p>
    </footer>
  );
}
