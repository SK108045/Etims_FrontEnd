import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Fingerprint, Hash, QrCode } from "lucide-react";
import { Eyebrow } from "./ui";
import styles from "./InvoiceOutputSection.module.css";

const details = [
  {
    icon: Hash,
    number: "01",
    title: "An invoice with an identity.",
    text: "The invoice number comes back in the response, ready to add to your receipt.",
    field: "invoice_number",
  },
  {
    icon: Fingerprint,
    number: "02",
    title: "The fiscal details, included.",
    text: "Keep the returned receipt signature alongside the sale in your software.",
    field: "receipt_signature",
  },
  {
    icon: QrCode,
    number: "03",
    title: "A QR for the final receipt.",
    text: "Use the returned QR data in the receipt layout your customers already know.",
    field: "qr_url",
  },
];

export default function InvoiceOutputSection() {
  return (
    <section className={`section container ${styles.section}`} id="features">
      <div className={styles.layout}>
        <figure className={styles.visual} data-reveal>
          <figcaption className={styles.visualLabel}>
            <span className={styles.dot} /> THE OTHER SIDE OF THE REQUEST
          </figcaption>
          <div className={styles.paperWrap}>
            <div className={styles.paper}>
              <div className={styles.paperBrand}>
                PawaTax<span>.</span>
              </div>
              <p className={styles.receiptType}>FISCAL INVOICE</p>
              <div className={styles.invoiceHeading}>
                <strong>INV-1042</strong>
                <span>
                  <Check size={12} aria-hidden="true" /> Generated
                </span>
              </div>
              <div className={styles.sale}>
                <div className={styles.tableHeading}>
                  <span>ITEM</span>
                  <span>AMOUNT</span>
                </div>
                <div>
                  <span>
                    Paint brush <small>2 × KES 150.00</small>
                  </span>
                  <span>300.00</span>
                </div>
              </div>
              <div className={styles.total}>
                <span>TOTAL</span>
                <strong>KES 300.00</strong>
              </div>
              <div className={styles.fiscal}>
                <div className={styles.fiscalData}>
                  <span className={styles.fiscalLabel}>FISCAL DETAILS</span>
                  <dl>
                    <div>
                      <dt>Invoice number</dt>
                      <dd>
                        INV-1042 <b>01</b>
                      </dd>
                    </div>
                    <div>
                      <dt>Receipt signature</dt>
                      <dd>
                        7F4C…9A12 <b>02</b>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className={styles.qr}>
                  <Image
                    src="/demo-receipt-qr.svg"
                    alt="Illustrative receipt QR layout"
                    width={82}
                    height={82}
                  />
                  <span>
                    QR DATA <b>03</b>
                  </span>
                </div>
              </div>
              <p className={styles.thankYou}>Thank you for shopping with us.</p>
            </div>
          </div>
          <div className={styles.returned}>
            <Check size={16} aria-hidden="true" />
            <span>
              Receipt details returned.
              <strong>Your layout takes it from here.</strong>
            </span>
          </div>
        </figure>

        <div className={styles.copy} data-reveal>
          <Eyebrow>MORE THAN A SUCCESS RESPONSE</Eyebrow>
          <h2>
            The sale is yours.
            <br />
            <span>
              The fiscal details,
              <br />
              already handled.
            </span>
          </h2>
          <p className={styles.intro}>
            Give your checkout the invoice details it needs. Keep the receipt
            experience entirely your own.
          </p>
          <ol className={styles.details}>
            {details.map(({ icon: Icon, number, title, text, field }) => (
              <li key={field}>
                <span className={styles.detailIcon}>
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <div className={styles.detailHeading}>
                    <span>{number}</span>
                    <h3>{title}</h3>
                  </div>
                  <p>{text}</p>
                  <code>{field}</code>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/developers/#response" className="text-link">
            Explore the invoice response{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
