import Link from "next/link";
import { ArrowUpRight, BookOpen, Braces, Code2, FileJson, KeyRound, Receipt, WifiOff } from "lucide-react";
import ApiDemo from "./ApiDemo";
import CodeBlock from "./CodeBlock";
import FiscalReceiptExample from "./FiscalReceiptExample";
import DocsSearch from "./DocsSearch";
import { invoiceJson, invoiceResponse } from "@/lib/integration";

const fields = [
  ["external_id", "string, required", "Unique sale reference per branch, up to 100 characters. Reuse it for retries."],
  ["currency", "string", "KES. No currency conversion is performed."],
  ["customer", "object", "Customer name and PIN; use NA for a walk-in customer without a PIN."],
  ["items", "array, required", "1 to 500 invoice lines."],
  ["items[].item_code", "string, required", "Your product or service code."],
  ["items[].name", "string, required", "Product or service description."],
  ["items[].quantity", "number, required", "Positive quantity, up to six decimal places."],
  ["items[].unit_price", "number, required", "Non-negative unit price, up to two decimal places."],
  ["items[].tax_code", "string", "A to E, default A. Interpreted by the registered fiscal engine."],
  ["items[].discount_rate / discount_amount", "number, optional", "Use a rate from 0 to 100 or an amount, not both."],
  ["payment_method", "string", "cash, credit, cash/credit, bank_check, debit_card, mobile_money or other."],
];
const endpoints = [
  ["POST /v1/invoices", "Cloud + Local", "Sign and save an invoice on its assigned signing owner."],
  ["GET /v1/branch", "Cloud + Local", "Read the key's assigned merchant, branch, device and environment."],
  ["GET /v1/invoices", "Cloud + Local", "List invoices with limit and offset. Cloud maximum 100; Local maximum 500."],
  ["GET /v1/invoices/{id}", "Cloud + Local", "Read the original invoice. Local also returns a top-level synced boolean."],
  ["GET /v1/requests/{request_id}", "Cloud", "Inspect a retained request after an interrupted response."],
  ["GET /v1/status", "Local", "Read activation, pending_sync, recovery_pending and last_sync_error."],
  ["GET /v1/invoices/{id}/qr", "Local", "Read the original receipt QR image as PNG."],
  ["POST /v1/sync", "Local", "Send {} to attempt cloud sync now. Inspect both synced and pending counts."],
];
const errors = [
  ["401", "Invalid or revoked cloud key, or a key not accepted by the local installation."],
  ["409 IDEMPOTENCY_CONFLICT", "The reference was already used with different invoice details."],
  ["409 LOCAL_SIGNER_REQUIRED", "This branch signs only on its activated Windows PC. Use port 17500."],
  ["415 / 422", "JSON content type required / invoice validation failed."],
  ["428", "The branch needs verified desktop credentials."],
  ["429", "Cloud per-key rate limit exceeded; default 60 requests per minute."],
  ["503", "Service unavailable or signing outcome uncertain. Retain the reference and request ID."],
];

export default function Docs() {
  return (
    <div className="docs-layout container">
      <aside className="docs-sidebar">
        <DocsSearch />
        <div className="docs-version"><span>v1</span> CLOUD + WINDOWS LOCAL</div>
        <div className="docs-label">GET STARTED</div>
        <a href="#quickstart"><BookOpen /> Quickstart</a>
        <a href="#authentication"><KeyRound /> API keys</a>
        <a href="#environments"><Code2 /> Choose a base URL</a>
        <div className="docs-label">API REFERENCE</div>
        <a href="#api-reference"><Braces /> Create an invoice</a>
        <a href="#response"><FileJson /> Invoice response</a>
        <a href="#endpoints"><Braces /> Read and sync</a>
        <a href="#receipt-output"><Receipt /> Receipt output</a>
        <a href="#integration-notes"><Code2 /> Errors and retries</a>
        <div className="docs-label">WINDOWS RUNTIME</div>
        <Link href="/products/offline-sdk/#setup"><WifiOff /> Activation guide <ArrowUpRight size={12} /></Link>
      </aside>
      <article className="docs-main">
        <div className="docs-breadcrumb">Documentation / Integration guide</div>
        <h1>Your API key. Your invoice.</h1>
        <p className="docs-lead">Send one JSON request from your POS, ERP or backend. PawaTax resolves the registered branch and device from the API key, signs the invoice and saves it for review.</p>
        <div className="docs-notice"><FileJson /><p><strong>Signed is a separate step from KRA acceptance.</strong> HTTP 201 means the invoice is signed and saved. It appears in the dashboard with <code>kra_status: pending_submission</code>. A portal user reviews it and chooses Send to KRA.</p></div>

        <section className="docs-section" id="quickstart">
          <h2>Your first invoice.</h2>
          <div className="docs-steps">
            <div><span>01</span><h3>Copy a branch API key</h3><p>In the portal, open Developer Access for a branch with captured device credentials.</p></div>
            <div><span>02</span><h3>Send the sale</h3><p>Choose your terminal below. Replace YOUR_API_KEY and use a unique external_id.</p></div>
            <div><span>03</span><h3>Review in the dashboard</h3><p>Keep the returned invoice ID. KRA transmission is a manual portal action.</p></div>
          </div>
          <ApiDemo large />
          <p>The cURL tab is for Bash. The PowerShell tab sends readable JSON through standard input to one <code>curl.exe</code> request. Application examples include the complete payload; Node.js, Python and PHP read <code>PAWATAX_API_KEY</code> from your process environment.</p>
        </section>

        <section className="docs-section" id="authentication">
          <h2>One key selects the branch.</h2>
          <p>Use <code>X-API-Key</code> on every request. No account login, access-token exchange or branch lookup is needed before creating an invoice. The key fixes the merchant, branch, existing registered device, credential fingerprint and environment.</p>
          <CodeBlock label="Request headers" code={'X-API-Key: YOUR_API_KEY\nContent-Type: application/json'} />
          <p>Generate and revoke integration keys in Developer Access. To view a retained key again, choose View API key and enter the signed-in account password. Older hash-only keys require a matching retained copy; otherwise create a replacement and reactivate the same Windows installation without resetting fiscal state.</p>
          <p>Keep keys out of source control and public browser bundles. Use your backend or native POS HTTP client. The Local API rejects browser Origin requests by default. Legacy Bearer authentication remains supported.</p>
        </section>

        <section className="docs-section" id="environments">
          <h2>Same request. The right signing location.</h2>
          <div className="docs-table-scroll"><table className="docs-table"><thead><tr><th>MODE</th><th>BASE URL</th><th>SIGNING OWNER</th></tr></thead><tbody>
            <tr><td>Cloud development</td><td><code>http://127.0.0.1:17400</code></td><td>PawaTax gateway; requires connectivity.</td></tr>
            <tr><td>Windows Local</td><td><code>http://127.0.0.1:17500</code></td><td>The activated merchant PC, online and offline.</td></tr>
            <tr><td>Planned public cloud</td><td><code>https://api.pawatax.co.ke</code></td><td>Use only once your hosted gateway is configured and reachable.</td></tr>
          </tbody></table></div>
          <p>These localhost addresses point to the computer making the request. For a deployed cloud gateway, use its actual HTTPS origin. This website is documentation; its Vercel URL does not host the fiscal API.</p>
          <p>Activating Windows Local makes the branch <code>local_sdk</code> owned. Cloud API and portal invoice creation then return <code>409 LOCAL_SIGNER_REQUIRED</code>. Always use that PC for signing, even with internet. The <Link href="/products/offline-sdk/#setup">Windows setup guide</Link> covers activation.</p>
          <p>Use the environment that issued the device credentials. A Production device cannot become a Sandbox device by changing a URL or request field.</p>
        </section>

        <section className="docs-section" id="api-reference">
          <h2><span className="method-label">POST</span> /v1/invoices</h2>
          <p>The same body works with Cloud and Windows Local. Device serial, SDC, merchant and branch identity are resolved from the key; do not submit replacement fiscal credentials.</p>
          <CodeBlock label="Invoice JSON" code={invoiceJson} />
          <div className="docs-table-scroll"><table className="docs-table"><thead><tr><th>FIELD</th><th>TYPE</th><th>RULE</th></tr></thead><tbody>{fields.map(([field, type, rule]) => <tr key={field}><td><code>{field}</code></td><td>{type}</td><td>{rule}</td></tr>)}</tbody></table></div>
          <p>Use decimal amounts with at most two decimal places. Tax treatment follows the registered engine; a product name does not select a tax rate. On a Production device, even a sale called &quot;demo&quot; creates a fiscal invoice and advances its counter.</p>
        </section>

        <section className="docs-section" id="response">
          <h2>201 Created. Signed and saved.</h2>
          <p>This response excerpt uses fictitious values. The complete response also includes buyer, line items, totals, receipt verification URL and timestamps.</p>
          <CodeBlock label="Cloud response excerpt" code={invoiceResponse("cloud")} />
          <p><code>data.id</code> is the identifier for later reads. <code>request_id</code> identifies the retained operation. Repeating the same sale returns the original invoice with <code>replayed: true</code>. Local reads return <code>{'{"data": {...}, "synced": true}'}</code>; synced means the cloud acknowledged the import, not that KRA accepted it.</p>
        </section>

        <section className="docs-section" id="endpoints">
          <h2>Read history. Check status. Sync.</h2>
          <div className="docs-table-scroll"><table className="docs-table"><thead><tr><th>ROUTE</th><th>AVAILABLE ON</th><th>PURPOSE</th></tr></thead><tbody>{endpoints.map(([route, mode, purpose]) => <tr key={route}><td><code>{route}</code></td><td>{mode}</td><td>{purpose}</td></tr>)}</tbody></table></div>
          <p>Use the API key with these routes. Local history also supports <code>q</code> search and <code>sync=all|pending|synced</code>. The cloud gateway serves its machine-readable contract at <code>/openapi.json</code>.</p>
        </section>

        <section className="docs-section" id="receipt-output">
          <h2>Build the receipt from issued data.</h2>
          <p>Use <code>invoice_number</code>, <code>receipt_no</code>, <code>receipt_signature</code>, totals and <code>created_at</code> from the returned invoice. Encode the returned <code>qr_url</code> as a QR image. The registered device identity is available from <code>GET /v1/branch</code>.</p>
          <FiscalReceiptExample />
          <p className="receipt-output-note">Illustrative receipt layout, not a fiscal document. Windows Local also retains the original QR PNG at <code>GET /v1/invoices/{'{id}'}/qr</code>. In the tray viewer, Preview receipt opens the receipt and QR directly, including offline.</p>
        </section>

        <section className="docs-section" id="integration-notes">
          <h2>Retry the sale, keep its identity.</h2>
          <p><code>external_id</code> provides duplicate protection across keys for the same branch. An optional <code>Idempotency-Key</code> header adds an explicit retry key. Reuse the same reference and payload after timeouts, lost responses or service restarts. Changed data with an existing reference returns 409. Never switch to cloud signing to recover a local timeout.</p>
          <CodeBlock label="Error response" code={'{\n  "error": {\n    "code": "IDEMPOTENCY_CONFLICT",\n    "message": "This idempotency key or external_id was already used with a different invoice."\n  }\n}'} />
          <div className="docs-table-scroll"><table className="docs-table"><thead><tr><th>HTTP / CODE</th><th>MEANING</th></tr></thead><tbody>{errors.map(([code, meaning]) => <tr key={code}><td><code>{code}</code></td><td>{meaning}</td></tr>)}</tbody></table></div>
          <p>An uncertain fiscal operation requires recovery using its retained state. Keep the original reference and request ID; do not clear journals or reset counters to force another signature. Windows Local journals signing results and sync work for crash recovery.</p>
          <p>Already-signed local invoices use a separate authenticated import, <code>POST /v1/desktop/sync</code>, managed internally by the runtime. They never pass through cloud <code>POST /v1/invoices</code> for signing again.</p>
        </section>
        <div className="docs-related">
          <Link href="/products/offline-sdk/#setup"><WifiOff size={20} /><h3>Activate Windows Local <ArrowUpRight size={13} /></h3><p>One registered branch. One PC. Same invoice JSON.</p></Link>
          <Link href="/contact/"><Code2 size={20} /><h3>Plan your rollout <ArrowUpRight size={13} /></h3><p>Discuss branch ownership and your POS integration.</p></Link>
        </div>
      </article>
    </div>
  );
}
