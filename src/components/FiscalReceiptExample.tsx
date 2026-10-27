import Image from "next/image";

const receiptFields = [
  ["CU Serial No", "DEMO-CU-000001"],
  ["CU Invoice No", "DEMO-INV-1042"],
  ["Receipt Ref No", "DEMO-REF-1042"],
  ["Date", "28/10/2026 10:42:00"],
];

export default function FiscalReceiptExample() {
  return (
    <figure className="fiscal-receipt-example">
      <div className="fiscal-receipt-paper">
        <div className="fiscal-receipt-top">
          <span>PawaTax</span>
          <span>DEMO RECEIPT</span>
        </div>
        <h3>CONTROL UNIT INFO</h3>
        <dl className="fiscal-receipt-fields">
          {receiptFields.map(([label, value]) => (
            <div key={label}>
              <dt>{label}:</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <Image
          src="/demo-receipt-qr.svg"
          width={148}
          height={148}
          className="fiscal-receipt-qr"
          alt="Sample receipt QR encoding a PawaTax demo message"
        />
        <p className="fiscal-receipt-demo-note">
          Sample values only.
          <br />
          Not a valid fiscal receipt.
        </p>
      </div>
      <figcaption>
        Example receipt layout · Control unit details + QR
      </figcaption>
    </figure>
  );
}
