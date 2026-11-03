import Link from "next/link";
import {
  ArrowUpRight,
  Braces,
  Building2,
  Check,
  Code2,
  FileCheck2,
  History,
  KeyRound,
  Receipt,
  Users,
  WifiOff,
} from "lucide-react";
import { Button, Eyebrow, SectionTitle } from "./ui";
import ApiDemo from "./ApiDemo";

export function Features() {
  const items = [
    {
      icon: Braces,
      title: "An API that speaks your language.",
      body: "Send JSON. Receive fiscal invoice data. A straightforward REST API that fits the stack you already use.",
      className: "feature-api",
      detail: (
        <div className="feature-endpoint">
          <span>POST</span>
          <code>/v1/invoices</code>
          <ArrowUpRight size={17} />
        </div>
      ),
    },
    {
      icon: FileCheck2,
      title: "From sale to fiscal receipt.",
      body: "Invoice numbers, receipt signatures and QR data. The details your checkout needs, in one response.",
      className: "feature-receipt",
      detail: (
        <div className="mini-receipt">
          <span>
            <Check size={13} /> Invoice generated
          </span>
          <span>
            <Check size={13} /> Receipt data returned
          </span>
          <span>
            <Check size={13} /> Ready for your customer
          </span>
        </div>
      ),
    },
    {
      icon: Building2,
      title: "One platform. Many businesses.",
      body: "Support multiple merchants and branches with a single integration.",
      className: "",
      detail: null,
    },
    {
      icon: KeyRound,
      title: "The right key. The right branch.",
      body: "Separate API credentials keep each merchant branch’s access distinct.",
      className: "",
      detail: null,
    },
    {
      icon: History,
      title: "Every invoice, in view.",
      body: "Find previously generated invoices and receipts in your merchant history.",
      className: "",
      detail: null,
    },
    {
      icon: Users,
      title: "Customers, connected.",
      body: "Keep customer details within the merchant accounts they belong to.",
      className: "",
      detail: null,
    },
  ];
  return (
    <section className="section container features-section" id="features">
      <SectionTitle
        eyebrow="THE TOOLS BEHIND THE TRANSACTION"
        title={
          <>
            Serious infrastructure.
            <br />
            <span className="muted-heading">Refreshingly simple.</span>
          </>
        }
        copy="Everything you need to build fiscal invoicing into your software."
      />
      <div className="feature-grid">
        {items.map(({ icon: Icon, title, body, className, detail }, i) => (
          <article
            className={`feature-card ${className}`}
            key={title}
            data-reveal
            style={
              { "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties
            }
          >
            <span className="feature-icon">
              <Icon size={23} strokeWidth={1.5} />
            </span>
            <h3>{title}</h3>
            <p>{body}</p>
            {detail}
          </article>
        ))}
      </div>
    </section>
  );
}
export function DeveloperSection() {
  return (
    <section className="developer-section">
      <div className="container developer-grid">
        <div data-reveal>
          <Eyebrow dark>DEVELOPER EXPERIENCE, DONE RIGHT</Eyebrow>
          <h2>
            Built for developers.
            <br />
            <span>And their next big thing.</span>
          </h2>
          <p>
            If your application can make an HTTP request, it can integrate with
            PawaTax. No stack switch. No unnecessary detours.
          </p>
          <div className="dev-pills">
            <span>
              <Check size={13} /> RESTful API
            </span>
            <span>
              <Check size={13} /> JSON responses
            </span>
            <span>
              <Check size={13} /> X-API-Key authentication
            </span>
            <span>
              <Check size={13} /> Multi-tenant
            </span>
          </div>
          <Button href="/developers/sandbox/" light>
            Start in the sandbox
          </Button>
          <div className="dev-footnote">
            <Code2 size={16} /> Your stack. Your checkout. Our fiscal layer.
          </div>
        </div>
        <div className="developer-code" data-reveal>
          <ApiDemo large mode="sandbox" />
        </div>
      </div>
    </section>
  );
}
export function HowItWorks() {
  return (
    <section className="section container how-section">
      <div className="how-intro" data-reveal>
        <SectionTitle
          eyebrow="THREE STEPS. THAT’S THE FLOW."
          title={
            <>
              A little code.
              <br />A lot less complexity.
            </>
          }
        />
        <Link className="text-link" href="/developers/">
          Explore the integration guide <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="steps">
        {[
          {
            n: "01",
            title: "Connect your software.",
            text: "Set up a merchant integration and obtain the API credentials for your branch.",
            icon: KeyRound,
          },
          {
            n: "02",
            title: "Send the sale.",
            text: "Submit invoice data from your POS, ERP or application as a normal JSON request.",
            icon: Braces,
          },
          {
            n: "03",
            title: "Signed, saved, ready to review.",
            text: "Get signed invoice and receipt data. Review in the portal and send to KRA manually.",
            icon: Receipt,
          },
        ].map(({ n, title, text, icon: Icon }) => (
          <article className="step" key={n} data-reveal>
            <div className="step-top">
              <span>{n}</span>
              <Icon size={20} />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function PricingCards() {
  const tiers = [
    {
      name: "Developer",
      label: "For individual developers",
      price: "KES 1.50 / invoice",
      body: "Start with 10 production invoices on us. After that, pay only when PawaTax successfully issues an invoice.",
      items: [
        "First 10 production invoices free",
        "No setup fee or monthly fee",
        "Failed requests & safe retries are free",
        "Online API + Windows Local API",
      ],
      cta: "Start building",
      href: "/developers/",
      featured: true,
    },
    {
      name: "Business",
      label: "For growing software teams",
      price: "Custom",
      body: "For higher-volume integrations, multiple merchants and teams that want rollout support.",
      items: [
        "Volume-based pricing",
        "Multiple merchants & branches",
        "Integration and rollout support",
        "Online + offline workflows",
      ],
      cta: "Talk to us",
      href: "/contact/?interest=business",
      featured: false,
    },
    {
      name: "Enterprise",
      label: "For platforms at scale",
      price: "Let’s talk",
      body: "Shape PawaTax around your transaction volume, branch footprint and support requirements.",
      items: [
        "High-volume commercial terms",
        "Multi-branch rollout planning",
        "Priority integration support",
        "Custom deployment requirements",
      ],
      cta: "Contact Sales",
      href: "/contact/?interest=enterprise",
      featured: false,
    },
  ];
  return (
    <div className="pricing-grid">
      {tiers.map((t) => (
        <article
          className={`pricing-card ${t.featured ? "pricing-featured" : ""}`}
          key={t.name}
          data-reveal
        >
          {t.featured && (
            <span className="pricing-label">
              10 PRODUCTION INVOICES FREE <ArrowUpRight size={13} />
            </span>
          )}
          <div className="pricing-tier">
            <h3>{t.name}</h3>
            <span>{t.label}</span>
          </div>
          <strong className="pricing-price">{t.price}</strong>
          <p>{t.body}</p>
          <ul>
            {t.items.map((item) => (
              <li key={item}>
                <Check size={15} />
                {item}
              </li>
            ))}
          </ul>
          <Button href={t.href} secondary={!t.featured}>
            {t.cta}
          </Button>
        </article>
      ))}
    </div>
  );
}
export function PricingPreview() {
  return (
    <section className="section container">
      <div className="split-heading">
        <SectionTitle
          eyebrow="PRICING WITHOUT THE CEREMONY"
          title={
            <>
              Start free.
              <br />
              <span className="muted-heading">Pay when you issue.</span>
            </>
          }
          copy="Your first 10 production invoices are free. After that, individual developers pay KES 1.50 per successfully issued invoice — no setup fee and no monthly fee."
        />
        <Link href="/pricing/" className="text-link">
          See pricing <ArrowUpRight size={17} />
        </Link>
      </div>
      <PricingCards />
    </section>
  );
}
export function OfflineBanner() {
  return (
    <section className="offline-banner container" data-reveal>
      <div className="offline-banner-icon">
        <WifiOff size={25} />
        <span />
      </div>
      <div>
        <span className="mono tiny">WINDOWS LOCAL RUNTIME</span>
        <h3>The sale shouldn’t stop when the signal does.</h3>
        <p>
          Sign invoices on the merchant Windows PC, online or offline.
          Completed invoices sync to the dashboard when connected.
        </p>
      </div>
      <Link href="/products/offline-sdk/" className="text-link">
        Explore offline <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
