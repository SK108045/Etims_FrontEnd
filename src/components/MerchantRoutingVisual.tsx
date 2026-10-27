import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCheck,
  FileText,
  KeyRound,
  LockKeyhole,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import styles from "./MerchantRoutingVisual.module.css";

const merchants = [
  { name: "A", y: 100 },
  { name: "B", y: 220 },
  { name: "C", y: 340 },
];
const branches = merchants.flatMap(({ name, y }) => [
  { merchant: name, number: "01", y: y - 32 },
  { merchant: name, number: "02", y: y + 32 },
]);
const point = (x: number, y: number) => ({
  left: `${x / 12}%`,
  top: `${y / 4.7}%`,
});
const outgoing =
  "M 80 220 H 562 C 594 220 601 252 632 252 H 779 C 836 252 838 220 888 220 H 1105";
const returning =
  "M 1105 285 V 416 Q 1105 434 1087 434 H 98 Q 80 434 80 416 V 332";

export default function MerchantRoutingVisual() {
  return (
    <figure className={styles.visual} data-reveal>
      <figcaption className={styles.toolbar}>
        <div className={styles.requestLabel}>
          <span className={styles.requestDot} />
          <strong>Automatic request routing</strong>
          <code>POST /v1/invoices</code>
        </div>
        <span className={styles.credential}>
          <KeyRound size={14} /> Branch key <strong>B / 02</strong>
        </span>
      </figcaption>

      <p className={styles.mobileHint}>
        Scroll to follow the request <ArrowRight size={14} />
      </p>
      <div
        className={styles.scroller}
        role="region"
        tabIndex={0}
        aria-label="Invoice request pipeline. Scroll horizontally to explore the full route on smaller screens."
      >
        <div
          className={styles.canvas}
          role="img"
          aria-label="A developer integrates their POS, ERP or app with PawaTax once. The branch API credential automatically routes the illustrated invoice through Merchant B and its Branch 02 to eTIMS. A successful fiscal invoice and QR return to the client. Merchants A and C have their own alternate branches and credentials. Invoice, customer and branch data stay isolated to their merchant."
        >
          <svg
            className={styles.wires}
            viewBox="0 0 1200 470"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="pawa-routing-arrow-muted"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path
                  d="m2 1 3 3-3 3"
                  fill="none"
                  stroke="#adbf9e"
                  strokeWidth="1.3"
                />
              </marker>
              <marker
                id="pawa-routing-arrow-active"
                markerWidth="9"
                markerHeight="9"
                refX="6"
                refY="4.5"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path
                  d="m2 1.5 3 3-3 3"
                  fill="none"
                  stroke="#347b4b"
                  strokeWidth="1.5"
                />
              </marker>
            </defs>

            <path
              className={styles.laneDivider}
              d="M 398 160 H 800 M 398 280 H 800"
            />
            <g
              className={styles.alternateWires}
              markerEnd="url(#pawa-routing-arrow-muted)"
            >
              <path d="M 310 220 C 364 220 357 100 410 100" />
              <path d="M 310 220 C 364 220 357 340 410 340" />
              {branches
                .filter((b) => !(b.merchant === "B" && b.number === "02"))
                .map((branch) => {
                  const merchantY = merchants.find(
                    (m) => m.name === branch.merchant,
                  )!.y;
                  return (
                    <path
                      key={`${branch.merchant}-${branch.number}`}
                      d={`M 562 ${merchantY} C 594 ${merchantY} 601 ${branch.y} 632 ${branch.y}`}
                    />
                  );
                })}
              {branches
                .filter((b) => !(b.merchant === "B" && b.number === "02"))
                .map((branch) => (
                  <path
                    key={`output-${branch.merchant}-${branch.number}`}
                    d={`M 779 ${branch.y} C 836 ${branch.y} 838 220 888 220`}
                  />
                ))}
            </g>
            <g
              className={styles.selectedWires}
              markerEnd="url(#pawa-routing-arrow-active)"
            >
              <path d="M 120 220 H 225" />
              <path d="M 310 220 H 410" />
              <path d="M 562 220 C 594 220 601 252 632 252" />
              <path d="M 779 252 C 836 252 838 220 888 220" />
              <path d="M 970 220 H 1016" />
            </g>
            <path
              className={styles.returnWire}
              d={returning}
              markerEnd="url(#pawa-routing-arrow-active)"
            />

            <g className={styles.outboundPacket}>
              <circle r="10" fill="#70a749" opacity="0.16" />
              <circle r="4.5" fill="#287343" stroke="#fff" strokeWidth="2" />
              <animateMotion
                path={outgoing}
                dur="10s"
                keyTimes="0;0.08;0.56;1"
                keyPoints="0;0;1;1"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </g>
            <g className={styles.returnPacket}>
              <circle r="9" fill="#70a749" opacity="0.15" />
              <circle r="4" fill="#82ae55" stroke="#fff" strokeWidth="2" />
              <animateMotion
                path={returning}
                dur="10s"
                keyTimes="0;0.63;0.95;1"
                keyPoints="0;0;1;1"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </g>
          </svg>

          <div aria-hidden="true">
            {[
              [80, "CLIENT SOFTWARE"],
              [270, "ONE INTEGRATION"],
              [490, "INDEPENDENT MERCHANTS"],
              [710, "BRANCH / API KEY"],
              [930, "FISCAL PROCESSING"],
              [1105, "INVOICE + QR"],
            ].map(([x, label]) => (
              <span
                key={label}
                className={styles.stageLabel}
                style={point(Number(x), 18)}
              >
                {label}
              </span>
            ))}

            <div
              className={`${styles.node} ${styles.client}`}
              style={point(80, 220)}
            >
              <span className={styles.clientIcon}>
                <Monitor size={29} strokeWidth={1.4} />
              </span>
              <strong className={styles.nodeLabel}>POS / ERP / App</strong>
              <span className={styles.nodeDetail}>Integrate once</span>
            </div>

            <div
              className={`${styles.node} ${styles.api}`}
              style={point(270, 220)}
            >
              <span className={styles.apiIcon}>
                <svg viewBox="0 0 40 40" width="44" height="44" fill="none">
                  <path
                    d="M10 32V7h13c9 0 13 12 4 17-2 1-6 1-9 1l5-8h-6v15z"
                    fill="currentColor"
                  />
                  <path d="m28 27-6 9h6l6-9z" fill="currentColor" />
                </svg>
              </span>
              <strong className={styles.nodeLabel}>PawaTax API</strong>
              <span className={styles.nodeDetail}>
                <ShieldCheck size={13} /> Routes by branch key
              </span>
            </div>

            {merchants.map(({ name, y }) => (
              <div
                key={name}
                className={`${styles.node} ${styles.merchant} ${name === "B" ? styles.selected : ""}`}
                style={point(490, y)}
              >
                <Building2 size={18} strokeWidth={1.5} />
                <strong>Merchant {name}</strong>
                <LockKeyhole size={13} className={styles.lock} />
                <span className={styles.merchantScope}>
                  Invoices · customers · branches
                </span>
              </div>
            ))}

            {branches.map(({ merchant, number, y }) => (
              <div
                key={`${merchant}-${number}`}
                className={`${styles.node} ${styles.branch} ${merchant === "B" && number === "02" ? styles.selected : ""}`}
                style={point(710, y)}
              >
                <KeyRound size={16} strokeWidth={1.5} />
                <div>
                  <strong>Branch {number}</strong>
                  <small>
                    API key · {merchant}/{number}
                  </small>
                </div>
              </div>
            ))}

            <div
              className={`${styles.node} ${styles.fiscal}`}
              style={point(930, 220)}
            >
              <span className={styles.fiscalIcon}>
                <CheckCheck size={29} strokeWidth={1.5} />
              </span>
              <strong className={styles.nodeLabel}>eTIMS</strong>
              <span className={styles.nodeDetail}>Fiscal processing</span>
            </div>

            <div
              className={`${styles.node} ${styles.invoice}`}
              style={point(1105, 220)}
            >
              <div className={styles.invoiceHeading}>
                <FileText size={16} />
                <strong>Fiscal invoice</strong>
                <Check size={14} />
              </div>
              <div className={styles.invoiceBody}>
                <div>
                  <strong>INV-1042</strong>
                  <span>Merchant B / 02</span>
                </div>
                <Image
                  src="/demo-receipt-qr.svg"
                  width={43}
                  height={43}
                  alt=""
                />
              </div>
              <div className={styles.invoiceStatus}>
                <CheckCheck size={13} /> 200 OK <span>Invoice + QR</span>
              </div>
            </div>

            <div className={styles.returnLabel} style={point(610, 434)}>
              <ArrowLeft size={14} />
              <strong>200 OK</strong>
              <span>Invoice + QR returned to your software</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.legend}>
        <span>
          <i className={styles.activeLegend} /> Highlighted invoice request
        </span>
        <span>
          <i className={styles.alternateLegend} /> Alternate merchant routes
        </span>
        <span>
          <KeyRound size={14} /> A separate key for every branch
        </span>
        <span>
          <LockKeyhole size={14} /> Merchant records stay isolated
        </span>
      </div>
    </figure>
  );
}
