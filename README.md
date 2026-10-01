# pitscaler.com

Static briefing served by the Cloudflare Worker `pitscaler` (account "Emil Stahl", Free plan).
Custom domains: pitscaler.com and www.pitscaler.com.

- `public/index.html` - page structure and prose
- `public/app.js` - all data: SOURCES, CVES, CVE_GROUP, TIMELINE, IOCS, BUILDS
- `public/style.css` - styling

## Updating
1. Edit the data objects in `public/app.js`, or the prose in `public/index.html`. Tie every new statement to a SOURCES id.
2. Update the as-of date in `index.html` (banner and footer).
3. Build: `node build.mjs`. This regenerates `public/static.html`, `index.md`, `llms.txt`, `robots.txt` and the bundled `worker.js`.
4. Deploy: push to `main`; `.github/workflows/deploy.yml` builds and runs `wrangler deploy`. It needs repo secrets `CLOUDFLARE_API_TOKEN` (Workers Scripts:Edit, plus Zone/DNS edit for the custom domains) and `CLOUDFLARE_ACCOUNT_ID`. Manual alternative: `npx wrangler login`, then `npx wrangler deploy`.

## What the Worker serves
- `/`: the interactive page. A client that sends `Accept: text/markdown` gets the Markdown version instead (`Vary: Accept`).
- `/static.html`: the same content without JavaScript.
- `/index.md` and `/llms-full.txt`: the full briefing as Markdown.
- `/llms.txt`: a short index for LLMs.
- `/robots.txt`: `Content-Signal: search=yes, ai-input=yes, ai-train=yes`. Every response also carries a `content-signal` header.
- `/sitemap.xml`: the five public URLs. `lastmod` is set in build.mjs, so update it with the as-of date.
- HTML responses carry a `Link` header pointing to the Markdown, llms.txt and static versions.

Rules for `app.js`: never use backticks, and never write a dollar sign directly followed by an opening brace. Build that sequence as `'$' + '{IFS}'` instead.
Requests to the script Worker count toward the Free plan's limit of 100k requests a day.

## SEO and AI search
- `/` is prerendered: all content is in the HTML, and `app.js` rebuilds it with filters. `/static.html`, `/index.md` and `/llms*` point to `/` as canonical.
- JSON-LD (WebSite, Organization, TechArticle, FAQPage) is generated from the data in app.js. FAQ answers come from the `FAQ` array.
- `MOD` and `PUBLISHED` in build.mjs: change `MOD` (dateModified and sitemap lastmod) only when the content changes, not on every deploy.
- Generated files go to `dist/`. Don't edit them by hand.
- IndexNow: after a content change, POST the URLs to https://api.indexnow.org/indexnow with key `5f3c9a8e2b7d4e61a0c9f4b2d8e7a613` (key file is served at `/<key>.txt`).
- References are numbered like Wikipedia: by category order (SOURCE_CATS), then by declaration order in SOURCES. app.js and build.mjs use the same algorithm. In index.html, write a citation as `<a class="cite" href="URL">[Name]</a>`. The build turns it into `[n]`, and it fails if the URL isn't in SOURCES.

## Zone security settings (Cloudflare, not Worker)
HSTS (max-age 63072000, includeSubDomains, preload) and `X-Content-Type-Options: nosniff` are set in zone Settings → Security headers, not in `SEC` in build.mjs. Also set on the zone: min TLS 1.2, TLS 1.3, Always Use HTTPS, DNSSEC, CAA (pki.goog, letsencrypt.org, iodef mailto:emil@pitscaler.com). Bot Fight Mode and "Block AI bots" are off; managed robots.txt is off.

## Contributing
Corrections and new public sources are welcome as issues or pull requests, or by mail to emil@pitscaler.com (Signal: emil.112).
- Only public, TLP:CLEAR material with a link to the original publisher. No TLP:AMBER/RED or confidential intel.
- Edit `public/` and `build.mjs`; run `node build.mjs` and check that it passes (it fails if an `index.html` citation URL is missing from `SOURCES` in `public/app.js`).
