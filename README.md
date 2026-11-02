# PawaTax web

A responsive, animated, multipage marketing website built with Next.js App Router, React and TypeScript. The output is a static export and can be deployed to Vercel or any static host.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

`npm run dev` starts Next.js with hot reload, then prepares the static pages
sequentially. Wait for the `pages prepared. Hot reload is active.` message before
reviewing navigation; the initial compilation happens during this startup step
instead of on the first click of each link. Normal edits still update through
Fast Refresh without rebuilding the site. CLI options pass through to Next.js,
for example `npm run dev -- --port 3002`.

Turbopack's persistent development cache is disabled to avoid expensive cache
reads and writes on slow disks. Compilation stays in memory during the session;
each restart prepares pages again. Production build caching is unchanged.

## Production

```sh
npm run typecheck
npm run build
npm start
```

Stop the development server before starting the production preview on port 3000.
The production website is exported to `out/`; `npm start` serves those prebuilt
files with compression and caches fingerprinted assets. Pages do not compile on
click, and Next.js link prefetching is enabled in this production build. Rebuild
after editing source files. To keep development running while reviewing the
export, use `npm run preview -- --listen 3001`.

For Vercel, select `pawatax-web` as the project root and use the Next.js framework preset. No environment variables are required for this marketing site.

## Pages

Home, platform, invoicing API, offline SDK, developer guide, pricing, company, contact/integration brief, privacy, terms and status, plus a custom 404 page.

## Interactions

- Accessible product dropdown, mobile navigation and native early-access dialog.
- Language-switching API demo with copy, simulated processing and sample response.
- Offline signing/sync illustration, plus Windows activation and localhost API walkthrough.
- Documentation topic search and anchor navigation.
- Pricing FAQ accordions.
- Validated integration brief form and downloadable text file.
- Responsive SVG/CSS branding and diagrams; motion respects reduced-motion preferences.

## Production integration boundaries

The API and Windows Local guides mirror the current PawaTax implementation. Shared request payloads and language examples live in `src/lib/integration.ts`; `ApiDemo` presents copyable Bash curl, Windows PowerShell, Node.js, Python and PHP examples. Interactive examples simulate responses locally and never create fiscal invoices.

Cloud development uses `http://127.0.0.1:17400`; Windows Local uses `http://127.0.0.1:17500`. `https://api.pawatax.co.ke` is the planned hosted origin, not a claim of a live public API. This static Vercel website does not host the fiscal gateway or runtime download. Download Windows x64 through the authenticated portal. Activation uses the existing branch API key and makes that PC the sole signing owner. Sync imports already-signed results separately from invoice creation; KRA submission remains manual in the portal.

The site sign-in dialog and integration-brief form remain informational preview flows. Pricing is not final. The contact form downloads a local brief and does not send email. The status page is not connected to live telemetry.

DM Sans and Manrope are bundled locally as variable WOFF2 fonts through
`next/font/local`, with preloading and fallback metrics. Visitors do not need to
fetch a Google Fonts stylesheet or connect to a separate font server. Their OFL
licenses are included in `src/app/fonts/`. The logo and social preview SVGs are
original code-native assets. Application colors, layout, components and motion
are in `src/app/globals.css` and `src/components/`.
