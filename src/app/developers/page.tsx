import type { Metadata } from "next";
import Docs from "@/components/Docs";
export const metadata: Metadata = {
  title: "Developer Documentation",
  description:
    "Start in PawaTax Sandbox inside your user portal, then integrate Cloud or Windows Local with the same invoice JSON, X-API-Key and duplicate protection.",
};
export default function Developers() {
  return <Docs />;
}
