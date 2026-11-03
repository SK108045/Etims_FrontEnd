import type { Metadata } from "next";
import Link from "next/link";
import { HardDrive, RefreshCw, Monitor, ShieldCheck } from "lucide-react";
import { Button, CTA, Eyebrow, PageHero } from "@/components/ui";
import ApiDemo, { OfflineDemo } from "@/components/ApiDemo";
import CodeBlock from "@/components/CodeBlock";
import { activationCommand, localStatusCommand, localSyncCommand } from "@/lib/integration";

export const metadata: Metadata = {
  title: "Windows Local Runtime & Offline API",
  description: "Activate PawaTax Local on one Windows x64 PC. Sign invoices offline through localhost REST, preview receipts and synchronize already-signed invoices to the dashboard.",
};
const routes = [
  ["POST /v1/activate", "Activate with X-API-Key and cloud_url; the CLI manages this for you."],
  ["POST /v1/invoices", "Sign and save using the same JSON as the online API."],
  ["GET /v1/invoices?limit=100&offset=0&q=REF&sync=all", "Search local history; sync can be all, pending or synced. Maximum page size 500."],
  ["GET /v1/invoices/{id}", "Read the invoice and its top-level synced acknowledgement."],
  ["GET /v1/invoices/{id}/qr", "Retrieve the original QR PNG."],
  ["GET /v1/branch", "Inspect the bound merchant, branch, registered device and environment."],
  ["GET /v1/status", "Inspect activation, queue counts and recovery state."],
  ["POST /v1/sync", "Send {} to attempt queued cloud synchronization immediately."],
];
export default function SDK() {
  return (
    <>
      <PageHero
        eyebrow="PAWATAX LOCAL / WINDOWS x64"
        title={<>The internet can stop.<br /><span>Your checkout keeps going.</span></>}
        copy="A Windows service behind your existing POS or ERP. Sign invoices on the merchant PC, online or offline, through a local REST API. Synchronize completed invoices to the PawaTax dashboard when connected."
      >
        <div className="button-row">
          <Button href="#setup">Set up Windows Local</Button>
          <Button href="#local-api" secondary>Local API reference</Button>
        </div>
        <p className="small-note">Windows 10/11 x64 with .NET Framework 4.8. Download through your PawaTax portal. Android and Linux runtimes are not included.</p>
      </PageHero>
      <OfflineDemo />
      <div className="roadmap-note"><ShieldCheck size={18} /><p><strong>One branch. One signing PC.</strong> Activation provisions the exact device already registered in the portal. That PC becomes its only signing owner, including while online. Cloud invoice creation is blocked for the branch.</p></div>
      <section className="two-col-section container">
        <div data-reveal>
          <Eyebrow>YOUR POS STAYS YOUR POS</Eyebrow>
          <h2>Local service.<br /><span className="muted-heading">Familiar HTTP.</span></h2>
          <p>Your software calls <code>http://127.0.0.1:17500/v1/invoices</code> with the same API key and invoice JSON. The bundled Windows fiscal engine signs locally after the initial online activation.</p>
          <p>PawaTaxLocal.exe starts the Windows service. Open PawaTax Desktop from its tray icon to search local invoices, check synchronization or choose Preview receipt to see the original receipt and QR image. Closing the viewer leaves the service running.</p>
        </div>
        <div className="principle-list">
          {[
            { icon: Monitor, title: "One installation, one existing device", text: "The portal supplies merchant, branch, serial, model, SDC and environment. The downloaded PC does not create another fiscal identity." },
            { icon: HardDrive, title: "Sign and retain locally", text: "Protected credentials, fiscal counters, invoice journals and duplicate protection stay on the merchant PC." },
            { icon: RefreshCw, title: "Sync the signed result", text: "Already-signed invoices are imported into the dashboard. The cloud never signs those invoices again; KRA submission stays a manual portal action." },
          ].map(({ icon: Icon, title, text }) => <div className="principle" key={title} data-reveal><Icon /><div><h3>{title}</h3><p>{text}</p></div></div>)}
        </div>
      </section>
      <article className="container sdk-guide">
        <section className="docs-section" id="setup">
          <Eyebrow>ACTIVATE ONCE, THEN WORK OFFLINE</Eyebrow>
          <h2>From download to your first local request.</h2>
          <div className="docs-notice"><ShieldCheck /><p><strong>Testing your HTTP integration first?</strong> Use <Link href="/developers/sandbox/">PawaTax Sandbox in your user portal</Link>. A pawa_test_* key simulates the shared invoice contract on the cloud gateway and cannot activate this Windows fiscal runtime. Windows Local requires a live key for its existing registered device.</p></div>
          <ol className="sdk-setup-steps">
            <li><strong>Prepare the branch in the portal.</strong> Select the existing registered branch with captured desktop credentials. Open Developer Access and generate or copy its live pawa_live_* API key.</li>
            <li><strong>Download the Windows runtime.</strong> Use Windows offline clients in Developer Access. Extract the entire ZIP and keep its dependencies together. This website does not host the runtime download.</li>
            <li><strong>Start PawaTaxLocal.exe.</strong> Accept the Windows administrator prompt to install/start the service. The viewer starts hidden in the tray; open it through Open PawaTax Desktop. There is no separate public desktop EXE.</li>
            <li><strong>Activate with the API key.</strong> In a terminal in the extracted folder, run the command below and paste the branch key into its hidden prompt. No pairing code, setup key or new KRA device registration is needed.</li>
          </ol>
          <CodeBlock label="PowerShell / activate the running service" code={activationCommand} />
          <p>The example cloud gateway runs on the same PC at port 17400. For a merchant PC connecting to hosted PawaTax, replace that origin with your actual reachable HTTPS cloud origin. <code>https://api.pawatax.co.ke</code> is planned, not assumed live. Initial activation and confirmation require connectivity.</p>
          <p>Installation identity, Windows DPAPI protection, signed provisioning and device-bound sync proofs are managed internally. One Windows installation binds to one merchant, branch, registered device and environment. A second PC cannot claim the branch with another key.</p>
        </section>
        <section className="docs-section" id="local-api">
          <h2>Call localhost from the existing POS.</h2>
          <p>Use the same activation key in <code>X-API-Key</code>. Calls remain local even when connected. These browser demos simulate responses; copying and executing a command against a Production device creates a real fiscal invoice.</p>
          <ApiDemo large mode="local" />
          <div className="docs-table-scroll"><table className="docs-table"><thead><tr><th>LOCAL ROUTE</th><th>PURPOSE</th></tr></thead><tbody>{routes.map(([route, purpose]) => <tr key={route}><td><code>{route}</code></td><td>{purpose}</td></tr>)}</tbody></table></div>
          <p>Every route above uses <code>X-API-Key</code>. There is no separate local key or credentials command. The API listens on loopback only and rejects browser Origin requests by default; integrate through native HTTP clients, your POS backend or curl.</p>
          <CodeBlock label="Check local status" code={localStatusCommand} />
          <CodeBlock label="Example status / identifiers and counts vary" code={'{\n  "service": "PawaTax Windows Local API",\n  "paired": true,\n  "installation_id": "YOUR_INSTALLATION_ID",\n  "signing_owner": "local_sdk",\n  "invoices": 3,\n  "pending_sync": 2,\n  "recovery_pending": 0,\n  "last_sync_error": null,\n  "automatic_sync": true\n}'} />
          <p><code>paired: true</code> means activation and its initial confirmation completed. <code>pending_sync</code> counts completed invoices awaiting cloud acknowledgement. <code>recovery_pending</code> counts interrupted operations. The local invoice count is separate from the device fiscal counter.</p>
        </section>
        <section className="docs-section" id="sync">
          <h2>Offline first. Automatic cloud retry.</h2>
          <p>Invoices are signed and saved before being queued. The background worker checks approximately every five seconds and processes up to 25 queued invoices per cycle, in sequence. Failed jobs retain an exponential retry delay capped at one hour, plus a little jitter. The queue and retry schedule survive restarts.</p>
          <p>Reconnect does not clear an existing retry delay. For an immediate attempt, use Sync now in the tray viewer or send this request:</p>
          <CodeBlock label="Attempt synchronization now" code={localSyncCommand} />
          <p>The result contains <code>synced</code> and <code>pending</code> counts. HTTP 200 alone does not mean the queue is empty. Check <code>last_sync_error</code> in status if transfers remain pending. A local invoice read returning <code>synced: true</code> means the web app acknowledged it; it does not mean KRA accepted it.</p>
          <p>The runtime signs transfer proofs and imports retained results through <code>POST /v1/desktop/sync</code>. Your POS does not call this internal cloud endpoint or resend invoices to cloud invoice creation. Review synchronized invoices and choose Send to KRA in the dashboard.</p>
        </section>
        <section className="docs-section" id="recovery">
          <h2>Keep the reference. Keep the installation.</h2>
          <p>Use a unique <code>external_id</code> for each sale. Retrying the same content returns the original invoice with <code>replayed: true</code>; changing content under the same reference returns 409. An optional Idempotency-Key is also supported. After a timeout, retry the same sale rather than allocating another reference.</p>
          <p>The local journal and native engine retain operation results for crash recovery. Never reset counters or delete journals to get past an uncertain operation. Preserve the entire installation data and protected identity for controlled recovery. Key replacement is done by reactivating the same PC, not by restoring an old fiscal snapshot.</p>
          <p>Cloud key revocation blocks new cloud authentication immediately. An offline installation cannot learn a revocation until connected and updated; revocation does not hand signing ownership back to cloud. See the <a href="/developers/#integration-notes">integration notes</a> for error handling.</p>
        </section>
      </article>
      <CTA />
    </>
  );
}
