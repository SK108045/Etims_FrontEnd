import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Monitor,
  Smartphone,
  Zap,
} from "lucide-react";
import { Button, CTA, SectionTitle } from "@/components/ui";
import ApiDemo, { ReceiptPreview } from "@/components/ApiDemo";
import IntegrationFlow from "@/components/IntegrationFlow";
import {
  DeveloperSection,
  Features,
  HowItWorks,
  OfflineBanner,
  PricingPreview,
  UseCases,
} from "@/components/Sections";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid-background" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <Link href="/products/api/" className="hero-badge">
              <span>
                <Zap size={12} fill="currentColor" /> YOUR SOFTWARE. NOW FISCAL.
              </span>
              <ArrowUpRight size={14} />
            </Link>
            <h1>
              eTIMS integration. <br />
              <span className="headline-accent">
                Simplified.
                <svg
                  viewBox="0 0 390 17"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M3 10C105-1 230 0 385 8M20 15C147 5 260 5 372 12" />
                </svg>
              </span>
            </h1>
            <p>
              Connect your POS, ERP or app to fiscal invoicing with one simple API.
            </p>
            <div className="button-row">
              <Button href="/developers/">Start Building</Button>
              <Button href="/developers/" secondary>
                View API Docs
              </Button>
            </div>
            <div className="hero-trust">
              <span>
                <Check size={13} /> Your stack, supported
              </span>
              <span>
                <Check size={13} /> Built for Kenya
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-topline">
              <span className="mono">
                <span className="status-dot" /> SIMPLE INPUT. FISCAL OUTPUT.
              </span>
              <span className="coordinate">01 / API</span>
            </div>
            <ApiDemo />
            <div className="hero-receipt">
              <div className="receipt-connector">
                <ArrowDown size={16} />
              </div>
              <ReceiptPreview />
            </div>
            <div className="visual-caption">
              <span>
                Less plumbing.
                <br />
                <strong>More possibility.</strong>
              </span>
              <svg viewBox="0 0 85 60" aria-hidden="true">
                <path d="M5 48C34 55 68 36 68 7m-9 9 9-10 9 9" />
              </svg>
            </div>
          </div>
        </div>
        <div className="container hero-bottom">
          <span>ONE FISCAL LAYER. ANY WAY YOU BUILD.</span>
          <div>
            <span>
              <Monitor size={17} /> Web & Desktop
            </span>
            <span>
              <Smartphone size={17} /> Android & POS
            </span>
            <span>
              <Code2 size={17} /> Your favourite stack
            </span>
            <span>
              <Zap size={17} /> Online + offline roadmap
            </span>
          </div>
        </div>
      </section>
      <section className="section container integration-section">
        <div className="split-heading">
          <SectionTitle
            eyebrow="CONNECTED BY DESIGN"
            title={
              <>
                One API.
                <br />
                <span className="muted-heading">Every checkout.</span>
              </>
            }
          />
          <p className="section-side-copy">
            Your software sends normal JSON. PawaTax handles the fiscal workflow
            and returns the data your receipt needs.
            <Link href="/products/" className="text-link">
              Meet your new fiscal layer <ArrowUpRight size={16} />
            </Link>
          </p>
        </div>
        <IntegrationFlow />
        <div className="flow-caption">
          <span>
            <Check size={13} /> No changes to the way you build
          </span>
          <span>
            <Check size={13} /> Merchant and branch isolation
          </span>
          <span>
            <Check size={13} /> Receipt-ready responses
          </span>
        </div>
      </section>
      <Features />
      <OfflineBanner />
      <DeveloperSection />
      <HowItWorks />
      <UseCases />
      <PricingPreview />
      <CTA />
    </>
  );
}
