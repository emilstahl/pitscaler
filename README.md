# PitScaler

Source for [pitscaler.com](https://pitscaler.com): an independent, source-linked briefing on the Citrix NetScaler zero-days CVE-2026-88771 and CVE-2026-88772 (bulletin CTX697096). It covers all eight CVEs in the bulletin, a timeline, public IoCs, detection and remediation.

Not affiliated with Citrix or Cloud Software Group. Every claim links to a public source.

## Files
- `public/index.html`: page structure and prose.
- `public/app.js`: the data (SOURCES, CVES, TIMELINE, IOCS, BUILDS, FAQ) and the rendering code.
- `public/style.css`: styling.
- `build.mjs`: generates every page and format (static HTML, Markdown, llms.txt, sitemap, the IoC CSV) into `dist/` and `worker.js`.

## Contributing
Corrections and new public sources are welcome. Open an issue, or send a pull request:

1. Fork the repo and create a branch.
2. Make the change:
   - New IoC: add a row to `IOCS` in `public/app.js` with `type`, `value`, `context`, `caveat`, `cite` and `share`.
   - New source: add it to `SOURCES` first, then refer to it by id in `cite`.
   - New timeline event: add it to `TIMELINE` with `date`, `kind`, `title`, `body` and `cite`.
   - Prose: edit `public/index.html` and cite as `<a class="cite" href="URL">[Name]</a>`. The URL must exist in `SOURCES`.
3. Run `node build.mjs` (Node 20 or later). It must pass. It fails if a citation URL is missing from `SOURCES`.
4. Open the pull request with a link to the public source for each change.

The pull request build check runs the same build automatically.

Rules:
- Only public material, TLP:CLEAR or unmarked, with a link to the original publisher. No TLP:AMBER/RED or confidential intel, and no victim names unless the victim or a public source has named them.
- Keep the source's own wording on confidence: "attempted" stays attempted.
- In `public/app.js`, don't use backticks, and don't write a dollar sign directly followed by an opening brace. Build it as `'$' + '{IFS}'`.
- Don't edit `dist/` or `worker.js`; they are generated.

You can also send corrections to emil@pitscaler.com or on Signal (emil.112).

Deploys are handled by the maintainer.
