"use client";
import { useState } from "react";
import { Search } from "lucide-react";

const topics = [
  {
    id: "quickstart",
    title: "Quickstart",
    description: "Start with the fiscal invoicing workflow.",
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "Branch credentials and Bearer API keys.",
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
    description: "Credentials, connectivity and example data.",
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
