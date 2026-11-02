"use client";
import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCheck,
  Code2,
  Copy,
  LoaderCircle,
  Play,
  Terminal,
  Wifi,
  WifiOff,
} from "lucide-react";
import { baseUrls, languages, invoiceExample, invoiceResponse, type Language, type SigningMode } from "@/lib/integration";
export function Highlight({ code }: { code: string }) {
  return (
    <>
      {code.split("\n").map((line, i) => (
        <span className="code-line" key={i}>
          <span className="line-number" aria-hidden="true">
            {i + 1}
          </span>
          <span>
            {line
              .split(
                /("[^"\n]*"|'[^'\n]*'|\b(?:const|await|import|from|new|return|POST|GET|true|false)\b|\b\d+(?:\.\d+)?\b)/g,
              )
              .map((token, j) => (
                <span
                  key={j}
                  className={
                    /^['"]/.test(token)
                      ? "syntax-string"
                      : /^(const|await|import|from|new|return|POST|GET|true|false)$/.test(
                            token,
                          )
                        ? "syntax-keyword"
                        : /^\d/.test(token)
                          ? "syntax-number"
                          : undefined
                  }
                >
                  {token}
                </span>
              ))}
          </span>
        </span>
      ))}
    </>
  );
}
export default function ApiDemo({ large = false, mode = "cloud" }: { large?: boolean; mode?: SigningMode }) {
  const instanceId = useId();
  const [language, setLanguage] = useState<Language>("cURL");
  const [phase, setPhase] = useState<"request" | "sending" | "response">(
    "request",
  );
  const [copiedCode, setCopiedCode] = useState("");
  const [copyError, setCopyError] = useState(false);
  const code = phase === "response" ? invoiceResponse(mode) : invoiceExample(language, mode);
  const copied = copiedCode === code;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );
  const run = () => {
    if (timer.current) clearTimeout(timer.current);
    setPhase("sending");
    timer.current = setTimeout(() => setPhase("response"), 1100);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        code,
      );
      setCopiedCode(code);
      setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopiedCode(""), 1800);
    } catch {
      setCopyError(true);
      setCopiedCode("");
    }
  };
  return (
    <div className={`api-demo ${large ? "api-demo-large" : ""}`}>
      <div className="demo-top">
        <div className="demo-dots">
          <i />
          <i />
          <i />
        </div>
        <span>
          <Terminal size={13} /> your next integration
        </span>
        <span className="demo-tag">{mode === "cloud" ? "CLOUD API" : "WINDOWS LOCAL"}</span>
      </div>
      <div className="demo-tabs" role="tablist" aria-label="Code language">
        {languages.map((l) => (
          <button
            key={l}
            role="tab"
            aria-selected={language === l}
            aria-controls={`${instanceId}-code`}
            id={`${instanceId}-tab-${l.replace(".", "")}`}
            tabIndex={language === l ? 0 : -1}
            onKeyDown={(event) => {
              const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
              if (!keys.includes(event.key)) return;
              event.preventDefault();
              const index = languages.indexOf(l);
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? languages.length - 1
                    : (index +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        languages.length) %
                      languages.length;
              setLanguage(languages[next]);
              setPhase("request");
              if (timer.current) clearTimeout(timer.current);
              event.currentTarget.parentElement
                ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
                [next]?.focus();
            }}
            onClick={() => {
              setLanguage(l);
              setPhase("request");
              if (timer.current) clearTimeout(timer.current);
            }}
            className={l === language ? "selected" : ""}
          >
            {l}
          </button>
        ))}
        <button
          className="copy-button"
          onClick={copy}
          aria-label={copied ? "Code copied" : "Copy code"}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>
      </div>
      <div className="endpoint">
        <span>POST</span>
        <code>/v1/invoices</code>
        <span className="endpoint-lock">
          X-API-Key <span>↗</span>
        </span>
      </div>
      <div
        className={`code-container ${phase === "sending" ? "code-sending" : ""}`}
        id={`${instanceId}-code`}
        role="tabpanel"
        aria-labelledby={`${instanceId}-tab-${language.replace(".", "")}`}
        tabIndex={0}
      >
        <pre>
          <code>
            <Highlight
              code={code}
            />
          </code>
        </pre>
        {phase === "response" && (
          <div className="response-success">
            <CheckCheck size={16} />
            <span>201 Created</span>
            <span>Response excerpt</span>
          </div>
        )}
      </div>
      <div className="demo-bottom">
        <span aria-live="polite">
          <span className="status-dot" />{" "}
          {phase === "sending"
            ? "Processing example…"
            : phase === "response"
              ? "Example complete"
              : "Ready when you are"}
        </span>
        <button
          onClick={phase === "response" ? () => setPhase("request") : run}
          disabled={phase === "sending"}
        >
          {phase === "sending" ? (
            <LoaderCircle className="spin" size={13} />
          ) : phase === "response" ? (
            <Code2 size={13} />
          ) : (
            <Play size={11} fill="currentColor" />
          )}
          {phase === "response" ? "View request" : "Run example"}
          <ArrowRight size={13} />
        </button>
      </div>
      <span className="demo-disclaimer">
        Interactive example · No live API request
        <br />
        {mode === "cloud" ? "Development cloud: " : "Activated merchant PC: "}{baseUrls[mode]}
        {language === "PowerShell" && <><br />Windows PowerShell: paste the whole block. Use JSON Unicode escapes for non-ASCII text on PowerShell 5.1.</>}
        {copyError && <span role="status"> Copy unavailable. Select the code to copy it.</span>}
      </span>
    </div>
  );
}
export function ReceiptPreview() {
  return (
    <div className="receipt-preview">
      <div className="receipt-head">
        <span className="receipt-check">
          <Check size={13} />
        </span>
        <span>Invoice, meet fiscal.</span>
      </div>
      <div className="receipt-body">
        <div>
          <span className="receipt-label">CU INVOICE NO</span>
          <strong>INV-1042</strong>
          <span className="receipt-amount">KES 300.00</span>
        </div>
        <Image
          className="receipt-qr"
          src="/demo-receipt-qr.svg"
          width={76}
          height={76}
          alt="Receipt QR code"
        />
      </div>
      <dl className="receipt-fiscal-bits">
        <div>
          <dt>Receipt ref</dt>
          <dd>REF-1042</dd>
        </div>
      </dl>
      <Link className="receipt-footer" href="/products/api/#receipt-output">
        <span className="receipt-footer-label">
          <span className="status-dot" /> View receipt details
        </span>
        <ArrowRight size={12} />
      </Link>
    </div>
  );
}
export function OfflineDemo() {
  const [online, setOnline] = useState(true);
  const [queued, setQueued] = useState(0);
  const [sent, setSent] = useState(0);
  const [created, setCreated] = useState(0);
  return (
    <div className="offline-demo">
      <div className="offline-demo-top">
        <span className="mono">LOCAL SIGNING SIMULATOR</span>
        <button
          className={`connection-toggle ${online ? "online" : ""}`}
          aria-pressed={online}
          aria-label="Internet connection"
          onClick={() => {
            if (!online) {
              setSent(value => value + queued);
              setQueued(0);
            }
            setOnline(!online);
          }}
        >
          {online ? <Wifi size={16} /> : <WifiOff size={16} />}{" "}
          {online ? "Online" : "Offline"}
          <span className="toggle-track">
            <i />
          </span>
        </button>
      </div>
      <div className="offline-demo-center">
        <div className={`offline-orb ${online ? "" : "is-offline"}`}>
          {online ? <Wifi size={42} /> : <WifiOff size={42} />}
        </div>
        <h3>
          {online ? "Connected. Ready to sync." : "No connection? Keep going."}
        </h3>
        <p>
          {online
            ? "Sign locally in either mode. Disconnect to see the sync queue grow."
            : "Already-signed invoices wait locally for cloud acknowledgement."}
        </p>
        <button
          className="button"
          onClick={() => {
            setCreated(value => value + 1);
            if (online) setSent(value => value + 1);
            else setQueued(value => value + 1);
          }}
        >
          Sign sample invoice <ArrowRight size={16} />
        </button>
      </div>
      <p className="small-note" aria-live="polite">{created} sample invoices signed locally; {queued} awaiting sync; {sent} cloud acknowledged.</p>
      <div className="offline-counters">
        <div>
          <strong>{queued.toString().padStart(2, "0")}</strong>
          <span>AWAITING CLOUD SYNC</span>
        </div>
        <ArrowRight />
        <div>
          <strong>{sent.toString().padStart(2, "0")}</strong>
          <span>CLOUD ACKNOWLEDGED</span>
        </div>
      </div>
      <p className="small-note">
        Illustration only: no fiscal invoices are created or sent. Real sync retries
        use backoff; cloud acknowledgement is separate from manual KRA submission.
      </p>
    </div>
  );
}
