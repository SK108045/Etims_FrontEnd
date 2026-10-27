import { SectionTitle } from "./ui";
import MerchantRoutingVisual from "./MerchantRoutingVisual";

const explanations = [
  {
    number: "01",
    title: "A merchant is one client.",
    text: "Each business has its own account and customer records.",
  },
  {
    number: "02",
    title: "Their branches sit underneath.",
    text: "Give each location its own branch and API credential.",
  },
  {
    number: "03",
    title: "Every invoice has a home.",
    text: "Invoices stay linked to the right merchant and branch.",
  },
];

export default function MultiMerchantSection() {
  return (
    <section className="multi-merchant section" id="multi-merchant">
      <div className="container">
        <SectionTitle
          eyebrow="MULTI-TENANT BY DESIGN"
          title={
            <>
              One platform.
              <br />
              <span className="muted-heading">
                Every merchant. Every branch.
              </span>
            </>
          }
          centered
          copy="Connect many client businesses through one integration. Each merchant has its own branches and customer records, with separate credentials for every branch."
        />

        <MerchantRoutingVisual />

        <div className="merchant-explanations">
          {explanations.map(({ number, title, text }) => (
            <div key={number} data-reveal>
              <span className="merchant-step-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
