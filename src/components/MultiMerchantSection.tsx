import {
  Building2,
  FileText,
  KeyRound,
  Layers3,
  Store,
  Users,
} from "lucide-react";
import { SectionTitle } from "./ui";

const merchants = ["Merchant A", "Merchant B", "Merchant C"];
const branches = ["Branch 01", "Branch 02"];
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

        <div
          className="merchant-diagram"
          role="group"
          aria-label="PawaTax connects multiple merchants, each with its own branches"
          data-reveal
        >
          <div className="merchant-platform-root">
            <span className="merchant-platform-mark">
              <Layers3 size={24} strokeWidth={1.6} />
            </span>
            <div>
              <strong>PawaTax API</strong>
              <span>One integration for your software</span>
            </div>
          </div>

          <div className="merchant-client-grid">
            {merchants.map((merchant) => (
              <article
                className="merchant-client-card"
                key={merchant}
                aria-label={merchant}
              >
                <div className="merchant-client-heading">
                  <span className="merchant-client-mark">
                    <Building2 size={22} strokeWidth={1.6} />
                  </span>
                  <div>
                    <span>CLIENT BUSINESS</span>
                    <h3>{merchant}</h3>
                  </div>
                </div>

                <ul
                  className="merchant-branch-list"
                  aria-label={`${merchant} branches`}
                >
                  {branches.map((branch) => (
                    <li className="merchant-branch" key={branch}>
                      <Store size={17} strokeWidth={1.5} />
                      <strong>{branch}</strong>
                      <span>
                        <KeyRound size={13} /> Own API key
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="merchant-records">
                  <span>
                    <FileText size={14} /> Invoice history
                  </span>
                  <span>
                    <Users size={14} /> Customer records
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

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
