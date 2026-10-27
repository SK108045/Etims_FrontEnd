import type { Metadata } from "next";
import Docs from "@/components/Docs";
export const metadata: Metadata = {
  title: "Developer Documentation",
  description:
    "Explore Bearer authentication, POST /v1/invoices, example payloads and fiscal receipt responses in the PawaTax integration guide.",
};
export default function Developers() {
  return <Docs />;
}
