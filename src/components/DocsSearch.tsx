"use client";
import { useState } from "react";
import { Search } from "lucide-react";

const topics = [
  { id: "sandbox", title: "Developer sandbox", description: "pawa_test keys, user portal setup, no KRA, test receipts and going live." },
  { id: "environments", title: "Cloud or Windows Local", description: "Base URLs, port 17400, port 17500 and signing ownership." },
  { id: "endpoints", title: "Read and sync", description: "Invoice history, branch, local status, QR and synchronization routes." },
  {
    id: "quickstart",
    title: "Quickstart",
    description: "Create a sandbox key and send your first simulated invoice.",
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "Branch-bound X-API-Key, viewing and revocation.",
  },
  {
    id: "api-reference",
    title: "Create an invoice",
    description: "POST /v1/invoices and request fields.",
  },
  {
    id: "response",
    title: "Invoice response",
    description: "Fiscal invoice, receipt and QR information.",
  },
  {
    id: "receipt-output",
    title: "Receipt output",
    description:
      "CU serial, CU invoice, receipt reference, date and QR example.",
  },
  {
    id: "integration-notes",
    title: "Integration notes",
    description: "Idempotency, duplicate protection, errors and crash recovery.",
  },
];
export default function DocsSearch() {
  const [query, setQuery] = useState("");
  const matches = topics.filter((t) =>
    (t.title + " " + t.description).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="docs-search">
      <Search />
      <input
        aria-label="Search documentation"
        placeholder="Find in the guide…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setQuery("");
        }}
      />
      {query && (
        <div
          className="docs-search-results"
          role="region"
          aria-label="Search results"
        >
          {matches.length ? (
            matches.map((t) => (
              <a key={t.id} href={`#${t.id}`} onClick={() => setQuery("")}>
                <strong>{t.title}</strong>
                <small>{t.description}</small>
              </a>
            ))
          ) : (
            <p>No matching topics. Try “invoice” or “key”.</p>
          )}
        </div>
      )}
    </div>
  );
}
