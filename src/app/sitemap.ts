import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/products/",
    "/products/api/",
    "/products/offline-sdk/",
    "/developers/",
    "/developers/sandbox/",
    "/pricing/",
    "/company/",
    "/contact/",
    "/privacy/",
    "/terms/",
    "/status/",
  ].map((path) => ({
    url: `https://pawatax.allanben678.chatgpt.site${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
export const dynamic = "force-static";
