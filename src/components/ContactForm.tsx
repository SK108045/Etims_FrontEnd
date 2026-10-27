"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCheck, Download, RotateCcw } from "lucide-react";
export default function ContactForm() {
  const [interest, setInterest] = useState("Invoicing API");
  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get(
      "interest",
    );
    const choices: Record<string, string> = {
      business: "Business plan",
      enterprise: "Enterprise integration",
      "offline-sdk": "Offline SDK",
    };
    if (selected && choices[selected]) setInterest(choices[selected]);
  }, []);
  const [brief, setBrief] = useState<string | null>(null);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `PAWATAX — INTEGRATION BRIEF\nPrepared: ${new Date().toISOString().slice(0, 10)}\n\nName: ${data.get("name")}\nWork email: ${data.get("email")}\nCompany: ${data.get("company") || "Not provided"}\nInterested in: ${data.get("interest")}\n\nWhat we are building:\n${data.get("message")}\n\nThis brief was generated locally. No enquiry has been sent to PawaTax.\n`;
    setBrief(text);
  }
  function download() {
    if (!brief) return;
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "pawatax-integration-brief.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  if (brief)
    return (
      <div className="contact-form">
        <div className="brief-success" role="status">
          <CheckCheck />
          <h2>
            Your next step,
            <br />
            all mapped out.
          </h2>
          <p>
            Your integration brief is ready to download and share with the
            PawaTax team when onboarding opens. No message has been sent, and
            your details have stayed in this browser session.
          </p>
          <button className="button" onClick={download}>
            Download your brief <Download size={17} />
          </button>
          <button className="text-link" onClick={() => setBrief(null)}>
            <RotateCcw size={14} /> Create another brief
          </button>
        </div>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit}>
      <p className="form-note">
        Prepare an integration brief in a minute. This preview creates a
        downloadable brief on your device; it doesn’t send an enquiry.
      </p>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Your name *</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Alex Kamau"
            required
            maxLength={100}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Work email *</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            maxLength={200}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="company">Company or project</label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="The next big thing"
          maxLength={200}
        />
      </div>
      <div className="field">
        <label htmlFor="interest">What are you interested in?</label>
        <select
          id="interest"
          name="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        >
          <option>Invoicing API</option>
          <option>Offline SDK</option>
          <option>Business plan</option>
          <option>Enterprise integration</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">What are you building? *</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us about your software, devices and integration needs…"
          required
          minLength={10}
          maxLength={5000}
        />
      </div>
      <button className="button" type="submit">
        Create integration brief <ArrowRight size={17} />
      </button>
      <p className="form-privacy">
        Your information stays on your device.{" "}
        <Link href="/privacy/">Privacy details</Link>
      </p>
    </form>
  );
}
