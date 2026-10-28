import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
  experimental: {
    // Avoid persistent-cache reads/writes on slow development disks.
    // Compilation stays in memory for this dev session; builds keep their cache.
    turbopackFileSystemCacheForDev: false,
  },
};
export default config;
