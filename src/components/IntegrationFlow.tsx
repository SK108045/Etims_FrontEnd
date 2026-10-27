import {
  Monitor,
  Smartphone,
  Laptop,
  Layers3,
  ShoppingBag,
  Braces,
  CheckCheck,
  FileText,
  QrCode,
} from "lucide-react";
const systems = [
  { icon: Monitor, name: "Web POS" },
  { icon: Smartphone, name: "Android POS" },
  { icon: Laptop, name: "Desktop POS" },
  { icon: Layers3, name: "ERP systems" },
  { icon: ShoppingBag, name: "E-commerce" },
  { icon: Braces, name: "Custom software" },
];
export default function IntegrationFlow() {
  return (
    <div className="integration-flow" data-reveal>
      <div className="flow-source-grid">
        {systems.map(({ icon: Icon, name }, i) => (
          <div
            className="flow-source"
            key={name}
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <Icon size={19} />
            <span>{name}</span>
          </div>
        ))}
      </div>
      <div className="flow-wire">
        <span />
        <i />
        <span />
      </div>
      <div className="flow-center">
        <div className="flow-logo">
          <svg viewBox="0 0 40 40" aria-hidden="true">
            <path
              d="M10 32V7h13c9 0 13 12 4 17-2 1-6 1-9 1l5-8h-6v15z"
              fill="currentColor"
            />
            <path d="m28 27-6 9h6l6-9z" fill="currentColor" />
          </svg>
        </div>
        <strong>PawaTax API</strong>
        <span>YOUR FISCAL LAYER</span>
      </div>
      <div className="flow-wire wire-short">
        <span />
        <i />
        <span />
      </div>
      <div className="flow-output">
        <div className="etims-node">
          <CheckCheck size={26} />
          <strong>eTIMS</strong>
          <span>Fiscal processing</span>
        </div>
        <div className="flow-results">
          <span>
            <FileText size={13} /> Invoice
          </span>
          <span>
            <QrCode size={13} /> Receipt + QR
          </span>
        </div>
      </div>
    </div>
  );
}
