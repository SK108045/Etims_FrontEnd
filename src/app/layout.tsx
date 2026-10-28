import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
const bodyFont = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  variable: "--font-dm-sans",
  weight: "400 700",
  display: "swap",
});
const headingFont = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "400 800",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://pawatax.allanben678.chatgpt.site"),
  title: {
    default: "PawaTax — eTIMS API for Developers",
    template: "%s | PawaTax",
  },
  description:
    "Integrate fiscal invoicing into your POS, ERP or application with the PawaTax REST API.",
  openGraph: {
    title: "PawaTax — eTIMS API for Developers",
    description:
      "One simple API. Every checkout. Fiscal invoicing built for developers in Kenya.",
    type: "website",
    locale: "en_KE",
    siteName: "PawaTax",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PawaTax — The fiscal layer for whatever you are building",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PawaTax — eTIMS API for Developers",
    description: "From application code to fiscal invoicing.",
  },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
