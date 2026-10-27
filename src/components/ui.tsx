import Link from "next/link";
import { ArrowUpRight, ArrowRight, Zap } from "lucide-react";
import type { ReactNode } from "react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`logo ${light ? "logo-light" : ""}`}
      aria-label="PawaTax home"
    >
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill="currentColor" />
        <path
          d="M12 29V10h10c7 0 10 9 4 13-2 1-5 1-7 1l4-6h-5v11z"
          fill="#d6f590"
        />
        <path d="m25 25-5 8h5l5-8z" fill="#d6f590" />
      </svg>
      <span>
        PawaTax<span className="logo-dot">.</span>
      </span>
    </Link>
  );
}
export function Button({
  href,
  children,
  secondary = false,
  light = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : ""} ${light ? "button-lime" : ""} ${className}`}
    >
      {children}
      {secondary ? <ArrowUpRight size={17} /> : <ArrowRight size={17} />}
    </Link>
  );
}
export function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>
      <span />
      {children}
    </div>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  copy,
  centered = false,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`section-heading ${centered ? "text-center" : ""}`}
      data-reveal
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}
export function CTA() {
  return (
    <section className="cta-section container" data-reveal>
      <div className="cta-orbit orbit-one" />
      <div className="cta-orbit orbit-two" />
      <div className="cta-copy">
        <Eyebrow dark>LESS FRICTION. MORE BUILDING.</Eyebrow>
        <h2>
          Build eTIMS into your product,
          <br />
          <span>not around it.</span>
        </h2>
        <p>A simpler path from application code to fiscal invoicing.</p>
        <div className="button-row">
          <Button href="/developers/" light>
            Start Building
          </Button>
          <Link className="text-link light-link" href="/developers/">
            Read the docs <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="cta-mark" aria-hidden="true">
        <Zap strokeWidth={1.3} />
      </div>
    </section>
  );
}
export function PageHero({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero container">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{copy}</p>
      {children}
    </section>
  );
}
