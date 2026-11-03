// Shared examples mirror DEVELOPER_API.md and the Windows local API contract.
// All identifiers are illustrative. This website never sends fiscal requests.
export type SigningMode = "cloud" | "local" | "sandbox";
export const baseUrls = {
  cloud: "http://127.0.0.1:17400",
  local: "http://127.0.0.1:17500",
  sandbox: "http://127.0.0.1:17400",
} as const;
export const languages = ["cURL", "PowerShell", "Node.js", "Python", "PHP"] as const;
export type Language = (typeof languages)[number];
export const invoice = {
  external_id: "ORDER-1042",
  currency: "KES",
  customer: { pin: "NA", name: "Walk-In Customer" },
  items: [{
    item_code: "ITEM-001",
    name: "Paint brush",
    quantity: 1,
    unit_price: 250,
    tax_code: "A",
  }],
  payment_method: "cash",
};
export const invoiceJson = JSON.stringify(invoice, null, 2);
export const sandboxInvoice = {
  ...invoice,
  external_id: "SANDBOX-ORDER-1042",
  items: invoice.items.map(item => ({ ...item, tax_code: "B" })),
};
export const sandboxInvoiceJson = JSON.stringify(sandboxInvoice, null, 2);
export function invoiceExample(language: Language, mode: SigningMode) {
  const url = `${baseUrls[mode]}/v1/invoices`;
  const payload = mode === "sandbox" ? sandboxInvoiceJson : invoiceJson;
  const key = mode === "sandbox" ? "pawa_test_YOUR_API_KEY" : "YOUR_API_KEY";
  switch (language) {
    case "cURL":
      return `curl --request POST "${url}" \\\n  --header "X-API-Key: ${key}" \\\n  --header "Content-Type: application/json" \\\n  --data-raw '${payload}'`;
    case "PowerShell":
      return `@'\n${payload}\n'@ | curl.exe --request POST "${url}" \`\n  --header "X-API-Key: ${key}" \`\n  --header "Content-Type: application/json" \`\n  --data-binary "@-"`;
    case "Node.js":
      return `const invoice = ${payload};\n\nconst response = await fetch("${url}", {\n  method: "POST",\n  headers: {\n    "X-API-Key": process.env.PAWATAX_API_KEY,\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify(invoice)\n});\nconst result = await response.json();\nif (!response.ok) throw new Error(JSON.stringify(result));\nconsole.log(result.data.invoice_number, result.replayed);`;
    case "Python":
      return `import json\nimport os\nfrom urllib.request import Request, urlopen\n\ninvoice = ${payload}\n\nrequest = Request(\n    "${url}",\n    data=json.dumps(invoice).encode("utf-8"),\n    headers={\n        "X-API-Key": os.environ["PAWATAX_API_KEY"],\n        "Content-Type": "application/json"\n    },\n    method="POST"\n)\nwith urlopen(request, timeout=30) as response:\n    result = json.load(response)\nprint(result["data"]["invoice_number"], result["replayed"])`;
    case "PHP":
      return `<?php\n// Requires PHP's cURL extension.\n$invoice = <<<'JSON'\n${payload}\nJSON;\n\n$curl = curl_init('${url}');\ncurl_setopt_array($curl, [\n  CURLOPT_POST => true,\n  CURLOPT_RETURNTRANSFER => true,\n  CURLOPT_TIMEOUT => 30,\n  CURLOPT_HTTPHEADER => [\n    'X-API-Key: ' . getenv('PAWATAX_API_KEY'),\n    'Content-Type: application/json'\n  ],\n  CURLOPT_POSTFIELDS => $invoice\n]);\n$body = curl_exec($curl);\nif ($body === false) throw new RuntimeException(curl_error($curl));\n$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);\ncurl_close($curl);\nif ($status >= 400) throw new RuntimeException($body);\n$result = json_decode($body, true, 512, JSON_THROW_ON_ERROR);\necho $result['data']['invoice_number'];`;
  }
}
export function invoiceResponse(mode: SigningMode) {
  return JSON.stringify({
    data: {
      id: mode === "local" ? "desktop_INSTALLATION_OPERATION" : mode === "sandbox" ? "inv_sbx_example" : "inv_example",
      invoice_number: mode === "sandbox" ? "PAWA-SANDBOX-EXAMPLE/1" : "REGISTERED-SDC/123",
      external_id: mode === "sandbox" ? sandboxInvoice.external_id : invoice.external_id,
      receipt_signature: mode === "sandbox" ? "SANDBOX-EXAMPLE" : "EXAMPLE_SIGNATURE",
      status: "signed",
      kra_status: mode === "sandbox" ? "not_applicable" : "pending_submission",
      source: mode === "local" ? "desktop" : "api",
      environment: mode === "sandbox" ? "sandbox" : "prod",
      ...(mode === "sandbox" ? {
        tot_amt: 250,
        tax_amt: 34.48,
        qr_url: `${baseUrls.sandbox}/sandbox/receipts/SANDBOX_RECEIPT_TOKEN`,
        kra_result_code: null,
        kra_result_msg: null,
        kra_transmitted_at: null,
      } : {}),
      currency: "KES",
    },
    request_id: mode === "local" ? "OPERATION" : "req_example",
    replayed: false,
  }, null, 2);
}
export const activationCommand = '.\\PawaTaxLocal.exe activate --cloud-url "http://127.0.0.1:17400"';
export const localStatusCommand = 'curl.exe --request GET "http://127.0.0.1:17500/v1/status" --header "X-API-Key: YOUR_API_KEY"';
export const localSyncCommand = 'curl.exe --request POST "http://127.0.0.1:17500/v1/sync" --header "X-API-Key: YOUR_API_KEY" --header "Content-Type: application/json" --data-binary "{}"';
