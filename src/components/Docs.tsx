import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Braces,
  ChevronRight,
  Code2,
  FileJson,
  Info,
  KeyRound,
  Receipt,
  Terminal,
  WifiOff,
} from "lucide-react";
import ApiDemo, { Highlight } from "./ApiDemo";
import FiscalReceiptExample from "./FiscalReceiptExample";
import DocsSearch from "./DocsSearch";
export default function Docs() {
  return (
    <div className="docs-layout container">
      <aside className="docs-sidebar">
        <DocsSearch />
        <div className="docs-version">
          <span>v1</span> INTEGRATION PREVIEW
        </div>
        <div className="docs-label">GET STARTED</div>
        <a href="#quickstart">
          <BookOpen /> Quickstart
        </a>
        <a href="#authentication">
          <KeyRound /> Authentication
        </a>
        <div className="docs-label">API REFERENCE</div>
        <a href="#api-reference">
          <Braces /> Create an invoice
        </a>
        <a href="#response">
          <FileJson /> Invoice response
        </a>
        <a href="#receipt-output">
          <Receipt /> Receipt output
        </a>
        <a href="#integration-notes">
          <Code2 /> Integration notes
        </a>
        <div className="docs-label">EXPLORE MORE</div>
        <Link href="/products/offline-sdk/">
          <WifiOff /> Offline SDK <ArrowUpRight size={12} />
        </Link>
        <Link href="/contact/">
          <Terminal /> Plan your integration
        </Link>
      </aside>
      <article className="docs-main">
        <div className="docs-breadcrumb">
          Documentation <ChevronRight size={11} /> <span>Getting started</span>
        </div>
        <h1>A simpler path to fiscal.</h1>
        <p className="docs-lead">
          If you can make an HTTP request, you’re already speaking our language.
          Here’s how your application connects to the PawaTax invoicing
          workflow.
        </p>
        <div className="docs-notice">
          <Info />
          <p>
            <strong>A guide to the integration shape.</strong> The API domain,
            keys and invoice data on this site are representative examples.
            Access and the final production contract must be confirmed during
            onboarding.
          </p>
        </div>
        <section className="docs-section" id="quickstart">
          <h2>Your first invoice, explained.</h2>
          <p>
            The flow is simple: get branch credentials, submit invoice data and
            use the fiscal response to build your receipt.
          </p>
          <div className="docs-steps">
            <div>
              <span>01</span>
              <h3>Get your credentials</h3>
              <p>Obtain an API key for your merchant branch.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Send your invoice</h3>
              <p>POST your invoice payload as JSON.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Build the receipt</h3>
              <p>Use the fiscal data in the response.</p>
            </div>
          </div>
          <ApiDemo large />
        </section>
        <section className="docs-section" id="authentication">
          <h2>One branch. One credential.</h2>
          <p>
            The invoicing endpoint uses Bearer authentication. Use the API key
            belonging to the merchant branch that is issuing the invoice.
          </p>
          <div className="docs-code-static">
            <pre>
              <code>
                <Highlight
                  code={
                    "Authorization: Bearer YOUR_BRANCH_API_KEY\nContent-Type: application/json"
                  }
                />
              </code>
            </pre>
          </div>
          <p style={{ marginTop: 17 }}>
            Keep API keys in your server environment or an appropriate secure
            client integration. Never commit keys to source control or expose
            them in public browser bundles. The offline SDK authentication model
            will be documented at release.
          </p>
        </section>
        <section className="docs-section" id="api-reference">
          <h2>
            <span className="method-label">POST</span> /v1/invoices
          </h2>
          <p>
            Submit invoice data from your application. The example below shows a
            customer and a single line item. Required fields, validation rules
            and all production response codes must be confirmed against the live
            API contract.
          </p>
          <div className="docs-code-static">
            <pre>
              <code>
                <Highlight
                  code={
                    '{\n  "receipt_no": "INV-1042",\n  "customer": {\n    "name": "Demo Customer",\n    "pin": "NA"\n  },\n  "items": [\n    {\n      "name": "Paint Brush",\n      "quantity": 2,\n      "unit_price": 150.00\n    }\n  ]\n}'
                  }
                />
              </code>
            </pre>
          </div>
          <table className="docs-table">
            <thead>
              <tr>
                <th>EXAMPLE FIELD</th>
                <th>TYPE</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>receipt_no</td>
                <td>string</td>
                <td>Your application’s invoice reference.</td>
              </tr>
              <tr>
                <td>customer</td>
                <td>object</td>
                <td>Customer details associated with the invoice.</td>
              </tr>
              <tr>
                <td>items</td>
                <td>array</td>
                <td>The invoice line items.</td>
              </tr>
              <tr>
                <td>items[].name</td>
                <td>string</td>
                <td>The product or service description.</td>
              </tr>
              <tr>
                <td>items[].quantity</td>
                <td>number</td>
                <td>The quantity sold.</td>
              </tr>
              <tr>
                <td>items[].unit_price</td>
                <td>number</td>
                <td>The price per unit in this example.</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="docs-section" id="response">
          <h2>Everything your receipt needs.</h2>
          <p>
            The illustrated response contains a fiscal invoice number, receipt
            signature and an indication of QR data. The values below are sample
            data, not a valid fiscal receipt.
          </p>
          <div className="docs-code-static">
            <pre>
              <code>
                <Highlight
                  code={
                    '{\n  "status": "success",\n  "invoice_number": "KRACU0100544492/1042",\n  "receipt_signature": "CTQOVY2POPW5LIQN",\n  "qr_code": "generated"\n}'
                  }
                />
              </code>
            </pre>
          </div>
          <p style={{ marginTop: 17 }}>
            Use the returned data in your own receipt layout. Confirm QR
            encoding and rendering requirements with the production integration
            contract; the word <code>generated</code> is an illustrative
            placeholder.
          </p>
        </section>
        <section className="docs-section" id="receipt-output">
          <h2>From fiscal data to receipt.</h2>
          <p>
            A receipt’s control unit block brings together the CU serial number,
            CU invoice number, receipt reference and date, followed by the QR
            code. Here’s an illustrative layout using sample values.
          </p>
          <FiscalReceiptExample />
          <p className="receipt-output-note">
            This is a display example, not an API response schema. Confirm the
            exact field mapping and timestamp format against your production
            integration before rendering a live receipt.
          </p>
        </section>
        <section className="docs-section" id="integration-notes">
          <h2>A few useful boundaries.</h2>
          <table className="docs-table">
            <thead>
              <tr>
                <th>TOPIC</th>
                <th>WHAT TO PLAN FOR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Merchant isolation</td>
                <td>
                  Keep each merchant and branch’s API credentials associated
                  with the correct account.
                </td>
              </tr>
              <tr>
                <td>Connectivity</td>
                <td>
                  The REST API requires a network connection. Offline queueing
                  is a separate SDK roadmap.
                </td>
              </tr>
              <tr>
                <td>Errors & retries</td>
                <td>
                  Confirm error handling, duplicate prevention and retry
                  behavior during onboarding before submitting real invoices.
                </td>
              </tr>
              <tr>
                <td>Sample code</td>
                <td>
                  All examples are illustrative. The API hostname is not a
                  configured dependency of this site.
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <div className="docs-related">
          <Link href="/products/offline-sdk/">
            <WifiOff size={20} />
            <h3>
              Beyond the connection <ArrowUpRight size={13} />
            </h3>
            <p>Explore the offline SDK roadmap.</p>
          </Link>
          <Link href="/contact/">
            <Code2 size={20} />
            <h3>
              What are you building? <ArrowUpRight size={13} />
            </h3>
            <p>Put your integration needs into a brief.</p>
          </Link>
        </div>
      </article>
    </div>
  );
}
