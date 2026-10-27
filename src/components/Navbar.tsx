"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Code2,
  Menu,
  X,
  WifiOff,
  Layers3,
} from "lucide-react";
import { Logo } from "./ui";

export default function Navbar() {
  const pathname = usePathname();
  const [mobile, setMobile] = useState(false);
  const [products, setProducts] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 15);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    setMobile(false);
    setProducts(false);
  }, [pathname]);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node))
        setProducts(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProducts(false);
        setMobile(false);
      }
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <>
      <div className="announcement">
        <span className="announcement-badge">BUILT FOR KENYA</span>
        <span>Your next integration just got simpler.</span>
        <Link href="/developers/">
          Meet the PawaTax API <ArrowUpRight size={13} />
        </Link>
      </div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <nav
          className="nav container"
          aria-label="Main navigation"
          ref={navRef}
        >
          <Logo />
          <div className={`nav-links ${mobile ? "mobile-open" : ""}`}>
            <Link
              href="/"
              className={pathname === "/" ? "active" : ""}
              aria-current={pathname === "/" ? "page" : undefined}
              onClick={() => {
                setMobile(false);
                setProducts(false);
              }}
            >
              Home
            </Link>
            <div className="product-nav">
              <button
                className={pathname.startsWith("/products") ? "active" : ""}
                aria-expanded={products}
                aria-controls="product-menu"
                onClick={() => setProducts(!products)}
              >
                Products{" "}
                <ChevronDown size={13} className={products ? "rotated" : ""} />
              </button>
              {products && (
                <div className="nav-dropdown" id="product-menu">
                  <Link href="/products/">
                    <Layers3 />
                    <span>
                      <strong>The platform</strong>
                      <small>One connection. Every checkout.</small>
                    </span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <Link href="/products/api/">
                    <Code2 />
                    <span>
                      <strong>Invoicing API</strong>
                      <small>From JSON to fiscal receipt.</small>
                    </span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <Link href="/products/offline-sdk/">
                    <WifiOff />
                    <span>
                      <strong>
                        Offline SDK <b className="mini-badge">UPCOMING</b>
                      </strong>
                      <small>Keep going beyond the connection.</small>
                    </span>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              )}
            </div>
            <Link
              className={pathname.startsWith("/developers") ? "active" : ""}
              href="/developers/"
            >
              Developers
            </Link>
            <Link
              className={pathname === "/pricing/" ? "active" : ""}
              href="/pricing/"
            >
              Pricing
            </Link>
            <Link
              className={pathname === "/company/" ? "active" : ""}
              href="/company/"
            >
              Company
            </Link>
            <div className="mobile-actions">
              <button onClick={() => dialog.current?.showModal()}>
                Sign In
              </button>
              <Link href="/developers/">
                Start Building <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="nav-actions">
            <button
              className="sign-in"
              onClick={() => dialog.current?.showModal()}
            >
              Sign In <ArrowUpRight size={13} />
            </button>
            <Link className="button button-small" href="/developers/">
              Start Building <ArrowUpRight size={15} />
            </Link>
          </div>
          <button
            className="menu-button"
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </nav>
      </header>
      <dialog
        ref={dialog}
        className="access-dialog"
        aria-labelledby="early-access-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close dialog"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <span className="dialog-icon">
          <Code2 />
        </span>
        <EyebrowLocal />
        <h2 id="early-access-title">
          A little early.
          <br />A lot to build.
        </h2>
        <p>
          The merchant portal is in private development. Explore the integration
          guide or prepare a brief for early access.
        </p>
        <Link
          className="button"
          href="/contact/"
          onClick={() => dialog.current?.close()}
        >
          Explore early access <ArrowRight size={16} />
        </Link>
        <Link
          className="text-link"
          href="/developers/"
          onClick={() => dialog.current?.close()}
        >
          Read the developer guide <ArrowUpRight size={16} />
        </Link>
      </dialog>
    </>
  );
}
function EyebrowLocal() {
  return <div className="eyebrow">PAWATAX EARLY ACCESS</div>;
}
