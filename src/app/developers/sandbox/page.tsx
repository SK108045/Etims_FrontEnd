import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Box } from "lucide-react";
import { Button, PageHero } from "@/components/ui";
import ApiDemo from "@/components/ApiDemo";
import CodeBlock from "@/components/CodeBlock";
import { invoiceResponse } from "@/lib/integration";

export const metadata: Metadata = {
  title: "Developer Sandbox",
  description: "Create a pawa_test API key inside your PawaTax user portal. Test invoice validation, retries, history and sandbox receipt QR codes using the same REST contract as live.",
};

const reads = `# All commands below use Bash / cURL.
# Replace the API key and the returned identifiers before running.
curl "http://127.0.0.1:17400/v1/branch" \\
  --header "X-API-Key: pawa_test_YOUR_API_KEY"

curl "http://127.0.0.1:17400/v1/invoices?limit=50&offset=0" \\
  --header "X-API-Key: pawa_test_YOUR_API_KEY"

curl "http://127.0.0.1:17400/v1/invoices/INVOICE_ID_FROM_RESPONSE" \\
  --header "X-API-Key: pawa_test_YOUR_API_KEY"

curl "http://127.0.0.1:17400/v1/requests/REQUEST_ID_FROM_RESPONSE" \\
  --header "X-API-Key: pawa_test_YOUR_API_KEY"`;

const errors = [
  ["401", "Invalid or revoked key. Copy an active pawa_test_* key from the portal."],
  ["404", "Invoice or request not found within the key's assigned test branch."],
  ["409 IDEMPOTENCY_CONFLICT", "The external_id or idempotency key was reused with different details."],
  ["409", "A supplied environment or identity conflicts with the assigned test branch."],
  ["422 INVALID_INVOICE", "Invalid fields, tax code, currency, quantities, prices or discounts."],
  ["429", "Per-key request limit exceeded. Default: 60 authenticated requests per minute."],
];

export default function SandboxGuide() {
  return (
    <>
      <PageHero
        eyebrow="DEVELOPER SANDBOX"
        title={<>Build the integration.<br /><span>Keep every sale a test.</span></>}
        copy="Test your POS or ERP inside your existing PawaTax user portal. A pawa_test_* key selects an internal simulation with its own virtual branch, counters and invoice history. No KRA registration or device credentials are needed."
      >
        <div className="button-row">
          <Button href="#portal-setup">Get your test key</Button>
          <Button href="#first-request" secondary>See the code</Button>
        </div>
      </PageHero>
      <article className="container sdk-guide">
        <div className="docs-notice"><Box /><p><strong>PawaTax Sandbox makes no KRA calls.</strong> It uses no production device credentials or fiscal counters. It is the internal developer sandbox, separate from the KRA Sandbox websites.</p></div>

        <section className="docs-section" id="portal-setup">
          <h2>Start inside your user portal.</h2>
          <ol className="sdk-setup-steps">
            <li><strong>Sign in normally.</strong> Open your PawaTax portal. For a locally running gateway, use <code>http://127.0.0.1:17400/portal</code>. Existing merchants use the same account and login.</li>
            <li><strong>New to PawaTax?</strong> Choose Create Account, then <strong>Testing first - no KRA PIN yet</strong>. Enter your name, email and a password of at least 10 characters. You enter the same user portal.</li>
            <li><strong>Open Sandbox in the sidebar.</strong> Choose <strong>Create sandbox &amp; API key</strong>. PawaTax assigns a test merchant, Branch 01 and a virtual device automatically.</li>
            <li><strong>Copy the pawa_test_* key.</strong> Use it with the examples below. To view it again, confirm your account password. You can revoke a test key from the portal.</li>
          </ol>
          <p>Live keys stay in Developer Access under the same login. Test invoices appear under Sandbox invoices &amp; receipts and remain separate from live history and revenue.</p>
        </section>

        <section className="docs-section" id="first-request">
          <h2>One request. The same invoice contract.</h2>
          <p>Replace <code>pawa_test_YOUR_API_KEY</code> with your full test key. The cURL tab is for Bash; choose PowerShell for Windows terminals. Application examples read <code>PAWATAX_API_KEY</code> from your process environment. Each example includes the complete invoice body.</p>
          <ApiDemo large mode="sandbox" />
          <p>The API key selects the test merchant, branch, device and environment. Send no sandbox flag or replacement fiscal identity. Use the same gateway origin and <code>POST /v1/invoices</code> path as the live cloud API.</p>
          <p>Here, localhost means the computer running the PawaTax gateway. For a hosted gateway, replace the origin with its actual HTTPS URL. <code>https://api.pawatax.co.ke</code> is planned; this documentation website does not host the API or portal.</p>
          <CodeBlock label="201 Created / illustrative sandbox response excerpt" code={invoiceResponse("sandbox")} />
          <p>The full response also includes the buyer, line items, branch identity and timestamps. <code>status: signed</code> is a simulated result. <code>kra_status: not_applicable</code> and null KRA fields indicate there is no KRA submission or acceptance.</p>
        </section>

        <section className="docs-section" id="validation">
          <h2>Exercise validation and tax calculations.</h2>
          <p>Use KES, 1 to 500 item lines, positive quantities with up to six decimal places and non-negative unit prices with up to two decimal places. An item can have a discount rate or discount amount. Supported tax codes are A through E.</p>
          <p>The current simulation uses <strong>B at 16% inclusive</strong> and <strong>A, C, D and E at 0%</strong>. The example returns KES 250.00 total and KES 34.48 included test tax. This test model is for integration checks; live tax treatment follows the registered fiscal engine and device configuration.</p>
          <p>Try an invalid tax code or a zero quantity to check your validation handling. See the <Link href="/developers/#api-reference">shared request field reference</Link> for the full contract.</p>
        </section>

        <section className="docs-section" id="retries-history">
          <h2>Retry, then inspect the original invoice.</h2>
          <ol className="sdk-setup-steps">
            <li><strong>Run the first request.</strong> Keep <code>data.id</code>, <code>request_id</code>, the invoice number and the receipt URL.</li>
            <li><strong>Run the identical request again.</strong> The original invoice is returned with <code>replayed: true</code>. Its number, signature and receipt URL stay the same.</li>
            <li><strong>Change the amount but keep the external_id.</strong> Expect <code>409 IDEMPOTENCY_CONFLICT</code>. Give a new sale its own reference; retry the same sale with its original reference and payload.</li>
          </ol>
          <p><code>external_id</code> is required, branch-scoped and up to 100 characters. An optional <code>Idempotency-Key</code> header provides an explicit retry key. Test counters and invoices are retained together, including across gateway restarts.</p>
          <CodeBlock label="Read the branch, invoice history and retained request" code={reads} />
          <p>History supports <code>limit</code> and <code>offset</code>, with a maximum page size of 100. Your test key only reads its assigned virtual branch. Refresh Sandbox invoices &amp; receipts in the portal to see the same records.</p>
          <CodeBlock label="Example duplicate conflict" code={'{\n  "error": {\n    "code": "IDEMPOTENCY_CONFLICT",\n    "message": "This idempotency key or external_id was already used with a different invoice."\n  }\n}'} />
          <div className="docs-table-scroll"><table className="docs-table"><thead><tr><th>HTTP / CODE</th><th>WHAT TO CHECK</th></tr></thead><tbody>{errors.map(([code, meaning]) => <tr key={code}><td><code>{code}</code></td><td>{meaning}</td></tr>)}</tbody></table></div>
        </section>

        <section className="docs-section" id="test-receipts">
          <h2>A receipt you can inspect and scan.</h2>
          <p>Choose <strong>Preview receipt</strong> in Sandbox invoices &amp; receipts, or open the actual <code>data.qr_url</code> returned by your request. Each receipt displays <strong>SANDBOX / NOT A KRA FISCAL RECEIPT</strong>.</p>
          <p>The QR image encodes a PawaTax sandbox receipt page at <code>/sandbox/receipts/{'{token}'}</code>, never a KRA URL. Its SVG is available at that returned receipt URL followed by <code>/qr.svg</code>. Receipt links contain unguessable tokens; anyone with a link can view that test receipt.</p>
          <p>The response excerpt above uses a placeholder token. Real requests return a working receipt URL. A phone scanning a localhost URL cannot reach your PC through its own loopback address; scan hosted test receipts using your reachable HTTPS gateway origin.</p>
        </section>

        <section className="docs-section" id="go-live">
          <h2>Switch the key when you are ready.</h2>
          <p>For a cloud-owned live branch, complete merchant/device onboarding and capture its verified credentials. Generate its <code>pawa_live_*</code> key in Developer Access. Replace the test key in your application configuration and use the actual cloud gateway origin. Keep the invoice path, headers and JSON structure.</p>
          <p>Live HTTP 201 means signed and saved, with <code>kra_status: pending_submission</code>. Review the invoice in the portal and choose Send to KRA when needed. Creating live invoices consumes real fiscal counters, even if the item is called a demo.</p>
          <p><strong>Windows Local uses live device credentials.</strong> A <code>pawa_test_*</code> key cannot activate the Windows runtime or use desktop sync. Test the shared HTTP integration here first. A live branch activated on Windows remains <code>local_sdk</code> owned and must sign on that PC at port 17500, even while connected.</p>
          <p>If you have an older key originally issued for a KRA Sandbox device, create a fresh internal sandbox key using the portal steps above. Those older keys cannot reach a real device through the developer sandbox.</p>
          <div className="docs-related">
            <Link href="/developers/#api-reference"><Box size={20} /><h3>Full API reference <ArrowUpRight size={13} /></h3><p>Shared fields, responses and retry handling.</p></Link>
            <Link href="/products/offline-sdk/#setup"><Box size={20} /><h3>Windows Local setup <ArrowUpRight size={13} /></h3><p>Activate one registered device on its signing PC.</p></Link>
          </div>
        </section>
      </article>
    </>
  );
}
