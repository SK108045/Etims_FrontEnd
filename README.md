# PawaTax web

A responsive, animated, multipage marketing website built with Next.js App Router, React and TypeScript. The output is a static export and can be deployed to Vercel or any static host.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

`npm run dev` compiles pages on demand and runs development checks. The first
visit to a route can be noticeably slower than the built website. Use the
production preview below when reviewing navigation speed.

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
- Offline concept simulator with a local queue and reconnect behavior.
- Documentation topic search and anchor navigation.
- Pricing FAQ accordions.
- Validated integration brief form and downloadable text file.
- Responsive SVG/CSS branding and diagrams; motion respects reduced-motion preferences.

## Production integration boundaries

The repository supplied only `Design.txt`, with no product backend or SDK source. The API examples are illustrative, not live requests. The `api.pawatax.com` hostname is representative, not a runtime dependency. The offline SDK is labelled in development. Pricing is not final. Sign-in explains the preview state. The contact form generates a local file and does not send email, persist a lead or join a real waitlist. The status page does not claim live API health. Replace these preview flows with verified backend services before commercial onboarding.

DM Sans and Manrope are bundled locally as variable WOFF2 fonts through
`next/font/local`, with preloading and fallback metrics. Visitors do not need to
fetch a Google Fonts stylesheet or connect to a separate font server. Their OFL
licenses are included in `src/app/fonts/`. The logo and social preview SVGs are
original code-native assets. Application colors, layout, components and motion
are in `src/app/globals.css` and `src/components/`.
