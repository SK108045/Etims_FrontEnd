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
  Layers3,
  Monitor,
  Receipt,
  ShoppingBag,
  Store,
  Users,
  Utensils,
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
              <Check size={13} /> Bearer authentication
            </span>
            <span>
              <Check size={13} /> Multi-tenant
            </span>
          </div>
          <Button href="/developers/" light>
            Get into the docs
          </Button>
          <div className="dev-footnote">
            <Code2 size={16} /> Your stack. Your checkout. Our fiscal layer.
          </div>
        </div>
        <div className="developer-code" data-reveal>
          <ApiDemo large />
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
            title: "Make it fiscal.",
            text: "Get fiscal invoice information and receipt data back for your customer.",
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
export function UseCases() {
  const cases = [
    {
      icon: Monitor,
      title: "POS developers",
      text: "Add fiscal invoicing to the checkout experience you’ve already built.",
    },
    {
      icon: Layers3,
      title: "ERP platforms",
      text: "Connect business operations to fiscal invoice processing.",
    },
    {
      icon: Store,
      title: "Retail systems",
      text: "Give every store and branch its own place in one integration.",
    },
    {
      icon: Utensils,
      title: "Restaurants",
      text: "Bring invoice and receipt data into your hospitality software.",
    },
    {
      icon: ShoppingBag,
      title: "E-commerce",
      text: "Turn the online sale into a fiscal invoice from your backend.",
    },
    {
      icon: Braces,
      title: "Custom software",
      text: "Built something different? All you need is an HTTP request.",
    },
  ];
  return (
    <section className="use-cases section">
      <div className="container">
        <SectionTitle
          eyebrow="BUILD YOUR WAY"
          title={
            <>
              Built for whatever
              <br />
              you’re building.
            </>
          }
          centered
          copy="From the neighbourhood shop to the next great platform."
        />
        <div className="use-case-grid">
          {cases.map(({ icon: Icon, title, text }) => (
            <Link
              href="/products/"
              className="use-case"
              key={title}
              data-reveal
            >
              <Icon size={24} strokeWidth={1.4} />
              <h3>{title}</h3>
              <p>{text}</p>
              <ArrowUpRight className="case-arrow" size={17} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function PricingCards() {
  const tiers = [
    {
      name: "Developer",
      label: "For your first integration",
      price: "Coming soon",
      body: "Start exploring the API and plan your integration.",
      items: [
        "Developer integration guide",
        "Example requests & responses",
        "Explore the fiscal workflow",
      ],
      cta: "Explore the docs",
      href: "/developers/",
    },
    {
      name: "Business",
      label: "For your everyday operations",
      price: "Coming soon",
      body: "For software that powers merchants and branches.",
      items: [
        "Fiscal invoice processing",
        "Merchant & branch accounts",
        "Invoice & customer history",
      ],
      cta: "Register your interest",
      href: "/contact/?interest=business",
    },
    {
      name: "Enterprise",
      label: "For your bigger picture",
      price: "Let’s talk",
      body: "Plan for your platform, your volume and your rollout.",
      items: [
        "Discuss your API volume",
        "Plan a multi-branch rollout",
        "Talk through integration needs",
      ],
      cta: "Contact Sales",
      href: "/contact/?interest=enterprise",
    },
  ];
  return (
    <div className="pricing-grid">
      {tiers.map((t, i) => (
        <article
          className={`pricing-card ${i === 1 ? "pricing-featured" : ""}`}
          key={t.name}
          data-reveal
        >
          {i === 1 && (
            <span className="pricing-label">
              BUILT TO GROW WITH YOU <ArrowUpRight size={13} />
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
          <Button href={t.href} secondary={i !== 1}>
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
          eyebrow="A PLAN FOR YOUR NEXT CHAPTER"
          title={
            <>
              Simple pricing.
              <br />
              <span className="muted-heading">Room to grow.</span>
            </>
          }
          copy="We’re shaping plans around real businesses. Final pricing is on the way."
        />
        <Link href="/pricing/" className="text-link">
          Explore plans <ArrowUpRight size={17} />
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
        <span className="mono tiny">ON THE ROADMAP</span>
        <h3>The sale shouldn’t stop when the signal does.</h3>
        <p>
          Meet the offline SDK we’re building for connected and disconnected
          devices.
        </p>
      </div>
      <Link href="/products/offline-sdk/" className="text-link">
        Explore offline <ArrowUpRight size={17} />
      </Link>
    </section>
  );
}
