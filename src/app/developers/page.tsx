import type { Metadata } from "next";
import Docs from "@/components/Docs";
export const metadata: Metadata = {
  title: "Developer Documentation",
  description:
    "Integrate the PawaTax Cloud and Windows Local APIs with X-API-Key, complete invoice examples, duplicate protection and synchronization guides.",
};
export default function Developers() {
  return <Docs />;
}
