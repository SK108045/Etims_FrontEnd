import Link from "next/link";
import { ArrowUpRight, BookOpen, Box, Braces, Code2, FileJson, KeyRound, Receipt, WifiOff } from "lucide-react";
import ApiDemo from "./ApiDemo";
import CodeBlock from "./CodeBlock";
import FiscalReceiptExample from "./FiscalReceiptExample";
import DocsSearch from "./DocsSearch";
import TaxCodeReference from "./TaxCodeReference";
import { invoiceExample, invoiceJson, invoiceResponse, productCommand, policyCommand, webhookVerification } from "@/lib/integration";

const fields = [
  ["external_id", "string, required", "Unique sale reference per branch, up to 100 characters. Reuse it for retries."],
  ["currency", "string", "KES. No currency conversion is performed."],
  ["customer", "object", "Customer name and PIN; use NA for a walk-in customer without a PIN."],
  ["items", "array, required", "1 to 500 invoice lines."],
  ["items[].item_code", "string, required", "Exact branch-scoped SKU, including a numeric SKU returned by POST /v1/products."],
  ["items[].name", "string, required", "Product or service description."],
  ["items[].quantity", "number, required", "Positive quantity, up to six decimal places."],
  ["items[].unit_price", "number, required", "Non-negative unit price, up to two decimal places."],
  ["items[].tax_code", "string, optional", "A Exempt; B 16% VAT; C Zero-rated; D Non-VAT; E 8% VAT. Explicit code, then saved SKU tax, then A."],
  ["items[].classification_code", "string, optional", "Enabled KRA category: explicit code, saved SKU, configured default, otherwise classification required."],
  ["items[].quantity_unit / package_unit", "string, optional", "KRA unit codes, such as NO / OU. Saved SKU units are reused when omitted."],
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
  ["GET /v1/reference/tax-codes", "Cloud + Sandbox + Local", "Enabled tax names, rates and registry version."],
  ["GET /v1/reference/item-classifications?q=paint%20brush", "Cloud + Sandbox + Local", "Search valid KRA classifications."],
  ["GET /v1/reference/item-units", "Cloud + Sandbox + Local", "Read valid quantity and package unit codes."],
  ["GET /v1/products?q=brush&limit=100&offset=0", "Cloud + Sandbox + Local", "Read saved SKU mappings for the key's exact branch/workspace."],
  ["POST /v1/products", "Cloud + Sandbox + Local", "Create/update a product; HTTP 200. Omit item_code to allocate a numeric SKU."],
  ["GET /v1/products/next-sku", "Cloud + Sandbox + Local", "Preview the next number; reserved: false. Final allocation occurs on save."],
  ["GET / POST /v1/branch/classification-policy", "Cloud + Sandbox + Local", "Read or configure this branch's default/strict classification policy."],
  ["GET /v1/request-logs", "Cloud + Sandbox + Local", "Read sanitized API activity for the assigned branch."],
];
const errors = [
  ["401", "Invalid or revoked cloud key, or a key not accepted by the local installation."],
  ["409 IDEMPOTENCY_CONFLICT", "The reference was already used with different invoice details."],
  ["409 LOCAL_SIGNER_REQUIRED", "This branch signs only on its activated Windows PC. Use port 17500."],
  ["415 / 422", "JSON content type required / invoice validation failed."],
  ["422 ITEM_CLASSIFICATION_REQUIRED", "Select a category or configure an automatic branch default."],
  ["422 ITEM_CLASSIFICATION_REVIEW_REQUIRED", "Correct a legacy SKU mapping before issuing a production invoice."],
  ["409 LOCAL_SKU_ALLOCATION_REQUIRED", "Allocate automatic product SKUs on the paired Windows PC, not the cloud."],
  ["503 TAX_CONSISTENCY_REVIEW_REQUIRED", "Retained fiscal totals disagree. Keep the reference; review the existing operation without re-signing."],
  ["428", "The branch needs verified desktop credentials."],
  ["429", "Cloud per-key rate limit exceeded; default 60 requests per minute."],
  ["503", "Service unavailable or signing outcome uncertain. Retain the reference and request ID."],
];

export default function Docs() {
  return (
    <div className="docs-layout container">
      <aside className="docs-sidebar">
        <DocsSearch />
        <div className="docs-version"><span>v1</span> SANDBOX + CLOUD + LOCAL</div>
        <div className="docs-label">GET STARTED</div>
        <a href="#quickstart"><BookOpen /> Quickstart</a>
        <a href="#sandbox"><Box /> Developer sandbox</a>
        <a href="#authentication"><KeyRound /> API keys</a>
        <a href="#environments"><Code2 /> Choose a base URL</a>
        <div className="docs-label">API REFERENCE</div>
        <a href="#api-reference"><Braces /> Create an invoice</a>
        <a href="#response"><FileJson /> Invoice response</a>
        <a href="#products"><Box /> Products &amp; classification</a>
        <a href="#tax-codes"><Receipt /> Tax codes A–E</a>
        <a href="#kra-submission"><Receipt /> KRA submission queue</a>
        <a href="#webhooks"><Code2 /> Signed webhooks</a>
        <a href="#usage"><FileJson /> Logs &amp; usage</a>
        <a href="#endpoints"><Braces /> Read and sync</a>
        <a href="#receipt-output"><Receipt /> Receipt output</a>
        <a href="#integration-notes"><Code2 /> Errors and retries</a>
        <div className="docs-label">WINDOWS RUNTIME</div>
        <Link href="/products/offline-sdk/#setup"><WifiOff /> Activation guide <ArrowUpRight size={12} /></Link>
      </aside>
      <article className="docs-main">
        <div className="docs-breadcrumb">Documentation / Integration guide</div>
        <h1>Your API key. Your invoice.</h1>
        <p className="docs-lead">Send one JSON request from your POS, ERP or backend. Your API key resolves the assigned branch and device. Start with a simulated sandbox invoice, then use the same request format with a live cloud or Windows Local branch.</p>
        <div className="docs-notice"><FileJson /><p><strong>Use a test key while building.</strong> Sandbox returns simulated results with <code>kra_status: not_applicable</code>. Live HTTP 201 means signed and saved, separate from KRA acceptance. Submission is manual by default; a branch can explicitly enable automatic KRA submission.</p></div>

        <section className="docs-section" id="quickstart">
          <h2>Your first invoice.</h2>
          <div className="docs-steps">
            <div><span>01</span><h3>Create a sandbox key</h3><p>Sign in to your user portal, open Sandbox and choose Create sandbox &amp; API key. No KRA onboarding is needed.</p></div>
            <div><span>02</span><h3>Send the sale</h3><p>Choose your terminal below. Replace pawa_test_YOUR_API_KEY and use a unique external_id.</p></div>
            <div><span>03</span><h3>Inspect your test receipt</h3><p>Open Sandbox invoices &amp; receipts, then Preview receipt. Test invoices never go to KRA.</p></div>
          </div>
          <ApiDemo large mode="sandbox" />
          <p>The cURL tab is for Bash. The PowerShell tab sends readable JSON through standard input to one <code>curl.exe</code> request. Application examples include the complete payload; Node.js, Python and PHP read <code>PAWATAX_API_KEY</code> from your process environment.</p>
        </section>

        <section className="docs-section" id="sandbox">
          <h2>Sandbox lives in your user portal.</h2>
          <p>Existing merchants use their normal PawaTax login. New users without a KRA PIN can choose <strong>Create Account &gt; Testing first - no KRA PIN yet</strong>. Open <strong>Sandbox</strong> in the sidebar and choose <strong>Create sandbox &amp; API key</strong>.</p>
          <p>A <code>pawa_test_*</code> key selects an internal test merchant, virtual branch and device. It makes no KRA calls, registers no real device and uses no production credentials or counters. Test history stays separate from live invoices.</p>
          <p>The API origin and <code>/v1/invoices</code> contract are shared with cloud live. Your key selects the provider; no sandbox flag or KRA Sandbox URL is needed. Test receipts are marked <strong>SANDBOX / NOT A KRA FISCAL RECEIPT</strong> and their QR codes point to PawaTax.</p>
          <Link className="text-link" href="/developers/sandbox/">Sandbox walkthrough, code and retry checks <ArrowUpRight size={16} /></Link>
        </section>

        <section className="docs-section" id="authentication">
          <h2>One key selects the branch.</h2>
          <p>Use <code>X-API-Key</code> on every request. No account login, access-token exchange or branch lookup is needed before creating an invoice. The key selects the merchant, branch, device and environment: a virtual test device for pawa_test_* and a verified registered device for pawa_live_*.</p>
          <CodeBlock label="Request headers" code={'X-API-Key: YOUR_API_KEY\nContent-Type: application/json'} />
          <p>Generate and revoke test keys in Sandbox, and live branch keys in Developer Access. To view a retained key again, choose View API key and enter the signed-in account password. Older hash-only keys require a matching retained copy; otherwise create a replacement and reactivate the same Windows installation without resetting fiscal state.</p>
          <p>Keep keys out of source control and public browser bundles. Use your backend or native POS HTTP client. The Local API rejects browser Origin requests by default. Legacy Bearer authentication remains supported.</p>
        </section>

        <section className="docs-section" id="environments">
          <h2>Same request. The right signing location.</h2>
          <div className="docs-table-scroll"><table className="docs-table"><thead><tr><th>MODE</th><th>BASE URL</th><th>SIGNING OWNER</th></tr></thead><tbody>
            <tr><td>PawaTax Sandbox / pawa_test_*</td><td><code>http://127.0.0.1:17400</code></td><td>Internal simulation, with no KRA or native signing.</td></tr>
            <tr><td>Live cloud development / pawa_live_*</td><td><code>http://127.0.0.1:17400</code></td><td>PawaTax gateway; requires connectivity.</td></tr>
            <tr><td>Windows Local</td><td><code>http://127.0.0.1:17500</code></td><td>The activated merchant PC, online and offline.</td></tr>
            <tr><td>Planned public cloud</td><td><code>https://api.pawatax.co.ke</code></td><td>Use only once your hosted gateway is configured and reachable.</td></tr>
          </tbody></table></div>
          <p>These localhost addresses point to the computer making the request. For a deployed cloud gateway, use its actual HTTPS origin. This website is documentation; its Vercel URL does not host the fiscal API.</p>
          <p>Activating Windows Local makes the branch <code>local_sdk</code> owned. Cloud API and portal invoice creation then return <code>409 LOCAL_SIGNER_REQUIRED</code>. Always use that PC for signing, even with internet. The <Link href="/products/offline-sdk/#setup">Windows setup guide</Link> covers activation.</p>
          <p>Use a fresh pawa_test_* key for the internal sandbox. Changing a URL or request field cannot turn a production device into a test device. Test keys cannot activate Windows Local; use a live key for its registered device.</p>
        </section>

        <section className="docs-section" id="api-reference">
          <h2><span className="method-label">POST</span> /v1/invoices</h2>
          <p>The same body structure works with Sandbox, Cloud and Windows Local. Device serial, SDC, merchant and branch identity are resolved from the key; do not submit replacement fiscal credentials.</p>
          <CodeBlock label="Invoice JSON" code={invoiceJson} />
          <div className="docs-table-scroll"><table className="docs-table"><thead><tr><th>FIELD</th><th>TYPE</th><th>RULE</th></tr></thead><tbody>{fields.map(([field, type, rule]) => <tr key={field}><td><code>{field}</code></td><td>{type}</td><td>{rule}</td></tr>)}</tbody></table></div>
          <p>Prices include VAT. The example explicitly classifies a new SKU as General Goods so it works before a default is configured. Once the SKU or automatic default is saved, classification_code can be omitted. On a production device, even a sale called &quot;demo&quot; creates a fiscal invoice and advances its counter.</p>
        </section>

        <section className="docs-section" id="response">
          <h2>201 Created. Inspect the environment.</h2>
          <p>This response excerpt uses fictitious values. The complete response also includes buyer, line items, totals, receipt verification URL and timestamps.</p>
          <CodeBlock label="Sandbox response excerpt" code={invoiceResponse("sandbox")} />
          <p>Sandbox signatures and numbers are simulated, <code>environment</code> is <code>sandbox</code> and <code>kra_status</code> is <code>not_applicable</code>. Its B-coded example includes VAT 34.48. The live A-coded example below is exempt and returns VAT zero:</p>
          <CodeBlock label="Live cloud response excerpt" code={invoiceResponse("cloud")} />
          <p><code>data.id</code> is the identifier for later reads. <code>request_id</code> identifies the retained operation. Repeating the same sale returns the original invoice with <code>replayed: true</code>. Local reads return <code>{'{"data": {...}, "synced": true}'}</code>; synced means the cloud acknowledged the import, not that KRA accepted it.</p>
        </section>

        <section className="docs-section" id="products">
          <h2>Save the SKU. Reuse its classification.</h2>
          <p><code>item_code</code> identifies the product within one branch/workspace. Names never identify SKUs. Use <code>POST /v1/products</code> to create or update a mapping; it does not issue an invoice or consume a fiscal number.</p>
          <CodeBlock label="Bash / create a product with an automatic numeric SKU" code={productCommand} />
          <p>HTTP 200 returns the saved product and its <code>item_code</code>. Omit that field to allocate 1, 2, 3… server-side, independently per branch or sandbox workspace. Custom codes remain supported. Existing SKUs are never renumbered. Use the returned code on invoices; the next-SKU preview does not reserve it.</p>
          <p>In the portal, <strong>Products / Items</strong> reads the same backend store. Re-enter the page or press Refresh after an API update, and choose the workspace assigned to that key. A branch named &quot;SANDBOX&quot; in the live branch list is separate from the internal sandbox workspace.</p>
          <h3>Choose defaults or require a category.</h3>
          <p>Quick defaults are <strong>General Goods 99010000</strong>, <strong>General Services 99020000</strong> and <strong>Goods or Services 99030000</strong>. Search <code>GET /v1/reference/item-classifications?q=paint%20brush</code> for a more specific category.</p>
          <CodeBlock label="Bash / use General Goods automatically for new SKUs" code={policyCommand} />
          <p>Use <code>{'{"mode":"require_classification"}'}</code> for strict mode. Resolution stays <strong>explicit classification → saved SKU → enabled default → ITEM_CLASSIFICATION_REQUIRED</strong>. Strict mode ignores the default for new SKUs. Legacy mappings marked Needs classification review require an explicit correction before production use; signed history is unchanged.</p>
          <p>A product save requires a valid <code>classification_code</code>. Optional product fields are <code>tax_code</code>, <code>quantity_unit</code> and <code>package_unit</code>. Invoice tax overrides the saved SKU tax; otherwise its tax and units are reused. Categories do not determine tax treatment.</p>
          <p>For local-owned branches, allocate automatic SKUs at port 17500. Cloud changes with explicit SKUs and policies reach the paired PC through configuration sync; offline invoices use the last received configuration.</p>
        </section>

        <section className="docs-section" id="tax-codes">
          <h2>Tax codes A–E. One verified model.</h2>
          <TaxCodeReference />
          <p><strong>E is enabled as 8% VAT</strong> in Cloud, Sandbox and Windows Local. B and E prices include VAT. Line tax is rounded to two decimals using midpoint-to-even rounding before summation; discounts reduce the inclusive amount first. Fetch the current registry with <code>GET /v1/reference/tax-codes</code>.</p>
          <CodeBlock label="Bash / sandbox E example — KES 250 total, KES 18.52 VAT" code={invoiceExample("cURL", "sandbox", "E")} />
          <p>Use issued <code>tot_amt</code> and <code>tax_amt</code> for receipts and accounting. Native signed totals are authoritative; do not calculate a replacement from the letter. Mismatches require review. Existing idempotent responses remain unchanged, and the portal separately flags historical reporting discrepancies without changing signed invoices.</p>
        </section>

        <section className="docs-section" id="kra-submission">
          <h2>Queue KRA submission separately from signing.</h2>
          <p>In Invoices &amp; Receipts, select pending invoices and choose Submit selected to KRA. For API submission, use the production branch key on the cloud gateway. Windows synchronization imports the original signed invoice first.</p>
          <CodeBlock label="POST /v1/kra/batches — HTTP 202 queues work" code={'{\n  "invoice_ids": ["INVOICE_ID_FROM_RESPONSE"],\n  "confirm": true\n}'} />
          <p>Read progress with <code>GET /v1/kra/batches</code> and <code>GET /v1/kra/batches/{'{id}'}</code>. Select earlier pending invoices too; the queue preserves fiscal order per branch. Other branches can continue if one is blocked. Temporary network/429/5xx failures retry across days and restarts, with waits capped at one hour plus jitter. Business rejections and changed artifacts require review.</p>
          <CodeBlock label="POST /v1/branch/submission-mode — explicit opt-in" code={'{\n  "mode": "automatic",\n  "confirm": true\n}'} />
          <p>Automatic mode applies to pending and future completed production invoices, including Windows imports. Return to <code>{'{"mode":"manual"}'}</code> to stop automatic enqueueing; already-authorized jobs continue. <code>POST /v1/kra/batches/{'{id}'}/retry</code> with <code>{'{"confirm":true}'}</code> retries eligible retained jobs without re-signing. Internal sandbox rejects KRA submission and automatic mode.</p>
          <p>Keep <code>status: signed</code> separate from <code>kra_status</code>: pending_submission, queued, transmitting, retrying, partial_receipt_pending, transmitted, failed or needs_review. Sandbox uses not_applicable. Only acknowledged submission becomes transmitted; a local <code>synced: true</code> is a cloud import acknowledgement.</p>
        </section>

        <section className="docs-section" id="webhooks">
          <h2>Receive signed invoice events.</h2>
          <p>Register <code>POST /v1/webhooks</code> with <code>{'{"url":"https://merchant.example/pawatax"}'}</code> on the cloud gateway, or use Developer Access. Save its signing secret when first returned; endpoint lists and logs exclude secrets.</p>
          <p>Events are <code>invoice.signed</code>, <code>invoice.kra_queued</code>, <code>invoice.kra_transmitted</code> and <code>invoice.kra_failed</code>. Each includes id, type, timestamp, api_version, invoice_id, merchant_pin, tenant_id, branch_id, environment and status data. Windows signed events arrive after cloud import; sandbox signed events stay simulated.</p>
          <CodeBlock label="Python / verify the exact raw HTTP body before processing" code={webhookVerification} />
          <p>Reject stale timestamps (for example over five minutes), use a constant-time signature comparison and deduplicate <code>event.id</code> in the same transaction as processing. Return 2xx after durable acceptance. Delivery is at least once and ordered per endpoint. Failed deliveries retry up to 12 attempts; inspect <code>GET /v1/webhooks/deliveries</code> and manually retry retained failures with <code>POST /v1/webhooks/{'{delivery_id}'}/retry</code> and <code>{'{}'}</code>. URLs must be public HTTPS; private/KRA targets and redirects are blocked.</p>
        </section>

        <section className="docs-section" id="usage">
          <h2>Inspect logs and production usage.</h2>
          <p><code>GET /v1/request-logs</code> shows request ID, endpoint, status, latency, environment and sanitized request/response data. Keys, credentials and webhook secrets are excluded. Logs are also available in Developer Access and Windows Local.</p>
          <p><code>GET /v1/usage</code> returns account-wide free allowance and monthly estimates; <code>GET /v1/usage/records?limit=50&amp;offset=0</code> returns auditable records for the key&apos;s branch. Optional <code>period=YYYY-MM</code> selects a Nairobi billing month. These usage routes run on the cloud gateway.</p>
          <p>The first <strong>10 successful production invoices per account, across all branches, are free for the account lifetime</strong>. Further successful invoices cost <strong>KES 1.50 each</strong>. Sandbox, rejected/failed requests and duplicate/idempotent retries do not count. Windows usage appears after sync, with the original issue month. KRA retries never create another charge. Amounts are estimates; payment collection is separate.</p>
        </section>

        <section className="docs-section" id="endpoints">
          <h2>Read history. Check status. Sync.</h2>
          <div className="docs-table-scroll"><table className="docs-table"><thead><tr><th>ROUTE</th><th>AVAILABLE ON</th><th>PURPOSE</th></tr></thead><tbody>{endpoints.map(([route, mode, purpose]) => <tr key={route}><td><code>{route}</code></td><td>{mode}</td><td>{purpose}</td></tr>)}</tbody></table></div>
          <p>Sandbox supports the cloud invoice, branch and retained-request routes. Windows-only status, QR PNG and sync routes require an activated live installation. Use the API key with these routes. Local history also supports <code>q</code> search and <code>sync=all|pending|synced</code>. The cloud gateway serves its machine-readable contract at <code>/openapi.json</code>.</p>
        </section>

        <section className="docs-section" id="receipt-output">
          <h2>Build the receipt from issued data.</h2>
          <p>Use <code>invoice_number</code>, <code>receipt_no</code>, <code>receipt_signature</code>, totals and <code>created_at</code> from the returned invoice. Encode the returned <code>qr_url</code> as a QR image. The registered device identity is available from <code>GET /v1/branch</code>.</p>
          <p>For sandbox invoices, use the returned PawaTax <code>qr_url</code> or Preview receipt in Sandbox invoices &amp; receipts. The test page and its scannable SVG carry the sandbox notice. The live layout example below is illustrative.</p>
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
