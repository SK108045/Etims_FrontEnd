import { taxCodes } from "@/lib/integration";

export default function TaxCodeReference() {
  return (
    <div className="docs-table-scroll">
      <table className="docs-table">
        <caption>VAT included in a KES 250 item, before any discount</caption>
        <thead><tr><th>CODE</th><th>MEANING</th><th>INCLUDED VAT (KES)</th></tr></thead>
        <tbody>{taxCodes.filter(row => row.supported).map(row => (
          <tr key={row.code}><td><code>{row.code}</code></td><td>{row.name}</td><td>{(Math.round(250 * row.rate / (100 + row.rate) * 100) / 100).toFixed(2)}</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}
