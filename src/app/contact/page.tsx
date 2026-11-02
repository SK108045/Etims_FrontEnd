import type { Metadata } from "next";
import { Braces, Building2, WifiOff } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
export const metadata: Metadata = {
  title: "Let’s Build",
  description:
    "Plan your PawaTax integration. Create a brief for your invoicing API, offline SDK or enterprise requirements.",
};
export default function Contact() {
  return (
    <section className="contact-grid container">
      <div className="contact-intro">
        <Eyebrow>LET’S BUILD SOMETHING GOOD</Eyebrow>
        <h1>
          Your next integration
          <br />
          <span className="headline-accent">starts here.</span>
        </h1>
        <p>
          Got a checkout to connect? A platform to scale? Tell us what you’re
          working on and put your integration needs into a shareable brief.
        </p>
        <div className="contact-points">
          {[
            {
              icon: Braces,
              title: "Connect your application",
              text: "POS, ERP, e-commerce or your own thing.",
            },
            {
              icon: Building2,
              title: "Plan a bigger rollout",
              text: "Multiple merchants, branches and integration needs.",
            },
            {
              icon: WifiOff,
              title: "Integrate Windows Local",
              text: "Connect your existing Windows POS through localhost REST.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div className="contact-point" key={title}>
              <Icon />
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
