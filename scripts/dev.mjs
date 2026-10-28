import { spawn } from "node:child_process";
import { readdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { createInterface } from "node:readline";
import { stripVTControlCharacters } from "node:util";

const require = createRequire(import.meta.url);
const shutdown = new AbortController();
const child = spawn(
  process.execPath,
  [
    require.resolve("next/dist/bin/next"),
    "dev",
    "--hostname",
    "0.0.0.0",
    ...process.argv.slice(2),
  ],
  { stdio: ["inherit", "pipe", "inherit"] },
);

// Discover static pages so new marketing pages are prepared automatically too.
async function staticRoutes(directory, segments = []) {
  const entries = await readdir(directory, { withFileTypes: true });
  const routes = entries.some((entry) => /^page\.(tsx?|jsx?)$/.test(entry.name))
    ? [`/${segments.join("/")}${segments.length ? "/" : ""}`]
    : [];
  for (const entry of entries) {
    if (!entry.isDirectory() || /^[\[\@_]/.test(entry.name)) continue;
    const next = entry.name.startsWith("(")
      ? segments
      : [...segments, entry.name];
    routes.push(...(await staticRoutes(resolve(directory, entry.name), next)));
  }
  return routes;
}

async function preparePages(origin) {
  console.log(
    "\n[dev] Preparing pages once so link clicks do not trigger their first compilation…",
  );
  try {
    const routes = [...new Set(await staticRoutes(resolve("src/app")))];
    const priority = [
      "/",
      "/developers/",
      "/products/",
      "/pricing/",
      "/company/",
    ];
    routes.sort((a, b) => {
      const rank = (route) => {
        const index = priority.indexOf(route);
        return index === -1 ? priority.length : index;
      };
      return rank(a) - rank(b);
    });
    let prepared = 0;
    // Sequential requests avoid competing compilers on smaller laptops.
    for (const route of routes) {
      if (shutdown.signal.aborted) return;
      try {
        const response = await fetch(new URL(route, origin), {
          signal: AbortSignal.any([
            shutdown.signal,
            AbortSignal.timeout(90_000),
          ]),
        });
        await response.arrayBuffer();
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        prepared += 1;
      } catch (error) {
        if (shutdown.signal.aborted) return;
        console.warn(`[dev] Could not prepare ${route}: ${error.message}`);
      }
    }
    console.log(
      `\n[dev] ${prepared}/${routes.length} pages prepared. Hot reload is active.\n`,
    );
  } catch (error) {
    if (!shutdown.signal.aborted)
      console.warn(`[dev] Page preparation skipped: ${error.message}`);
  }
}

let origin;
let preparing = false;
child.stdout.on("data", (chunk) => process.stdout.write(chunk));
const lines = createInterface({ input: child.stdout });
lines.on("line", (line) => {
  const text = stripVTControlCharacters(line);
  const local = text.match(/Local:\s+(https?:\/\/\S+)/);
  if (local) origin = local[1];
  if (origin && !preparing && text.includes("Ready in")) {
    preparing = true;
    void preparePages(origin);
  }
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, () => {
    shutdown.abort();
    child.kill(signal);
  });
}
child.once("error", (error) => {
  console.error(`[dev] Could not start Next.js: ${error.message}`);
  process.exitCode = 1;
});
child.once("exit", (code, signal) => {
  shutdown.abort();
  lines.close();
  process.exit(code ?? (signal === "SIGINT" ? 130 : 1));
});
