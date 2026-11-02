"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ code, label }: { code: string; label: string }) {
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setMessage("Copied");
    } catch {
      setMessage("Select and copy the code below.");
    }
  }
  return (
    <div className="docs-code-static code-block">
      <div className="code-block-toolbar">
        <span>{label}</span>
        <button type="button" onClick={copy} aria-label={`Copy ${label}`}>
          {message === "Copied" ? <Check size={14} /> : <Copy size={14} />}
          Copy
        </button>
        <span role="status">{message}</span>
      </div>
      <pre tabIndex={0} aria-label={label}><code>{code}</code></pre>
    </div>
  );
}
