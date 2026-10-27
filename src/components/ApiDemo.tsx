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
const languages = ["cURL", "Node.js", "Python", "PHP"] as const;
type Language = (typeof languages)[number];
const examples: Record<Language, string> = {
  cURL: `curl -X POST https://api.pawatax.com/v1/invoices \\\n  -H "Authorization: Bearer pawa_test_…" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "receipt_no": "INV-1042",\n    "customer": { "name": "Demo Customer", "pin": "NA" },\n    "items": [{\n      "name": "Paint Brush",\n      "quantity": 2,\n      "unit_price": 150.00\n    }]\n  }'`,
  "Node.js": `const response = await fetch(\n  "https://api.pawatax.com/v1/invoices", {\n    method: "POST",\n    headers: {\n      Authorization: \`Bearer \${process.env.PAWATAX_API_KEY}\`,\n      "Content-Type": "application/json"\n    },\n    body: JSON.stringify(invoice)\n  }\n);\n\nconst fiscalInvoice = await response.json();`,
  Python: `import os\nimport requests\n\nresponse = requests.post(\n    "https://api.pawatax.com/v1/invoices",\n    headers={\n        "Authorization": f"Bearer {os.environ['PAWATAX_API_KEY']}"\n    },\n    json=invoice\n)\n\nfiscal_invoice = response.json()`,
  PHP: `$client = new GuzzleHttp\\Client();\n\n$response = $client->post(\n  'https://api.pawatax.com/v1/invoices', [\n    'headers' => [\n      'Authorization' => 'Bearer ' . getenv('PAWATAX_API_KEY')\n    ],\n    'json' => $invoice\n  ]\n);\n\n$fiscalInvoice = json_decode($response->getBody());`,
};
const responseCode = `{\n  "status": "success",\n  "invoice_number": "KRACU0100544492/1042",\n  "receipt_signature": "CTQOVY2POPW5LIQN",\n  "qr_code": "generated"\n}`;
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
export default function ApiDemo({ large = false }: { large?: boolean }) {
  const instanceId = useId();
  const [language, setLanguage] = useState<Language>("cURL");
  const [phase, setPhase] = useState<"request" | "sending" | "response">(
    "request",
  );
  const [copied, setCopied] = useState(false);
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
        phase === "response" ? responseCode : examples[language],
      );
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
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
        <span className="demo-tag">SANDBOX</span>
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
          Bearer auth <span>↗</span>
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
              code={phase === "response" ? responseCode : examples[language]}
            />
          </code>
        </pre>
        {phase === "response" && (
          <div className="response-success">
            <CheckCheck size={16} />
            <span>200 OK</span>
            <span>Sample response</span>
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
        Illustrative sandbox · No live API request
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
        <span className="receipt-demo">DEMO</span>
      </div>
      <div className="receipt-body">
        <div>
          <span className="receipt-label">CU INVOICE NO</span>
          <strong>DEMO-INV-1042</strong>
          <span className="receipt-amount">KES 300.00</span>
        </div>
        <Image
          className="receipt-qr"
          src="/demo-receipt-qr.svg"
          width={76}
          height={76}
          alt="Demo receipt QR code — not a valid fiscal receipt"
        />
      </div>
      <dl className="receipt-fiscal-bits">
        <div>
          <dt>Receipt ref</dt>
          <dd>DEMO-REF-1042</dd>
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
  return (
    <div className="offline-demo">
      <div className="offline-demo-top">
        <span className="mono">CONNECTION SIMULATOR</span>
        <button
          className={`connection-toggle ${online ? "online" : ""}`}
          onClick={() => {
            if (!online) {
              setSent(sent + queued);
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
            ? "Switch to offline, queue a few invoices, then reconnect."
            : "Your example invoices stay in the local queue."}
        </p>
        <button
          className="button"
          onClick={() => (online ? setSent(sent + 1) : setQueued(queued + 1))}
        >
          Create sample invoice <ArrowRight size={16} />
        </button>
      </div>
      <div className="offline-counters">
        <div>
          <strong>{queued.toString().padStart(2, "0")}</strong>
          <span>QUEUED LOCALLY</span>
        </div>
        <ArrowRight />
        <div>
          <strong>{sent.toString().padStart(2, "0")}</strong>
          <span>EXAMPLE SYNCED</span>
        </div>
      </div>
      <p className="small-note">
        Interactive concept demo. The offline SDK is in development. No invoices
        are submitted.
      </p>
    </div>
  );
}
