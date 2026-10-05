// Builds the no-JS static page, Markdown and llms.txt from public/index.html + public/app.js,
// and bundles everything into worker.js. Usage: node build.mjs
// build() is pure (strings in, files out) so the same code can run in the Cloudflare API sandbox.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

import { readFileSync as _rf, existsSync as _ex } from 'node:fs';
// IndexNow key: kept out of git. Set INDEXNOW_KEY or put it in .indexnow-key (gitignored).
export const INDEXNOW_KEY = (process.env.INDEXNOW_KEY || (_ex(new URL('./.indexnow-key', import.meta.url)) ? _rf(new URL('./.indexnow-key', import.meta.url), 'utf8') : '')).trim();
let ICON = '';
const readIcon = () => ICON;
export function build(indexHtml, appJs, css, icon, updatedIso) {
  ICON = icon || '';
  // Last-updated stamp (UTC), from the latest content commit; tokens are replaced in index.html and app.js
  const UPD = new Date(updatedIso || '2026-10-01T00:00:00Z');
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const UPD_ISO = UPD.toISOString().replace(/\.\d+Z$/, 'Z');
  const UPD_DATE = UPD_ISO.slice(0, 10);
  const UPD_DAY = UPD.getUTCDate() + ' ' + MONTHS[UPD.getUTCMonth()] + ' ' + UPD.getUTCFullYear();
  const UPD_HUMAN = UPD.getUTCDate() + ' ' + MONTHS[UPD.getUTCMonth()] + ' ' + UPD.getUTCFullYear() + ', ' + UPD_ISO.slice(11, 16) + ' UTC';
  const tok = (s) => s.replaceAll('{{UPDATED_ISO}}', UPD_ISO).replaceAll('{{UPDATED_DATE}}', UPD_DATE).replaceAll('{{UPDATED_HUMAN}}', UPD_HUMAN);
  indexHtml = tok(indexHtml); appJs = tok(appJs);
  const dataSrc = appJs.slice(0, appJs.indexOf('/* ================= Rendering'));
  const D = new Function(dataSrc + '\nreturn { SOURCES, SOURCE_CATS, CVES, TIMELINE, IOCS, BUILDS, FAQ };')();
  const cveMenu = here => '<li class="dd"><details><summary>CVEs</summary><ul>' + (here === '#home' ? '<li><a href="#cves">All CVEs</a></li>' : '') + D.CVES.map(c => { const p = '/' + c.id.toLowerCase() + '/';
    return '<li><a href="' + p + '"' + (p === here ? ' aria-current="page"' : '') + '>' + c.id + '</a></li>'; }).join('') + '</ul></details></li>';
  const FOOTNAV = '<nav aria-label="All pages" class="footnav"><div><h2>CVE pages</h2><ul>' +
    D.CVES.map(c => '<li><a href="/' + c.id.toLowerCase() + '/">' + c.id + '</a></li>').join('') + '</ul></div><div><h2>Guides</h2><ul>' +
    [['/', 'Overview'], ['/netscaler-timeline/', 'Timeline'], ['/netscaler-iocs/', 'IoCs'], ['/netscaler-detection/', 'Detection'], ['/netscaler-remediation/', 'Remediation and fixed builds'], ['/faq/', 'FAQ'], ['/about/', 'About and methodology'], ['/#sources', 'References']]
      .map(n => '<li><a href="' + n[0] + '">' + n[1] + '</a></li>').join('') + '</ul></div><div><h2>Formats</h2><ul>' +
    [['/iocs.csv', 'IoCs as CSV'], ['/blocklist.txt', 'Firewall blocklist'], ['/blocklist-plain.txt', 'Plain IP blocklist'], ['/index.md', 'Markdown'], ['/llms.txt', 'llms.txt'], ['/static.html', 'No-JavaScript page'], ['/sitemap.xml', 'Sitemap']]
      .map(n => '<li><a href="' + n[0] + '">' + n[1] + '</a></li>').join('') + '</ul></div></nav>';
  indexHtml = indexHtml.replace('<!--CVEMENU-->', cveMenu('#home')).replace('<!--FOOTNAV-->', FOOTNAV);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const short = id => { const s = D.SOURCES[id]; return s.cat === 'beaumont' ? 'Beaumont' : s.label.split(' - ')[0].replace(/ \(.*$/, ''); };
  const REF_ORDER = D.SOURCE_CATS.flatMap(c => Object.keys(D.SOURCES).filter(id => D.SOURCES[id].cat === c[0]));
  const REFNO = Object.fromEntries(REF_ORDER.map((id, i) => [id, i + 1]));
  const URLNO = {}; REF_ORDER.forEach(id => { if (!URLNO[D.SOURCES[id].url]) URLNO[D.SOURCES[id].url] = REFNO[id]; });
  const refA = id => '<a href="#ref-' + REFNO[id] + '" title="' + esc(D.SOURCES[id].label) + '">[' + REFNO[id] + ']</a>';
  const cites = ids => ' <sup class="ref">' + ids.map(refA).join('') + '</sup>';
  const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const fmt = iso => { const p = iso.split('-'); return MON[+p[1] - 1] + ' ' + (+p[2]); };
  const LABEL = { official: 'Official advisory', research: 'Research', telemetry: 'Telemetry', reported: 'Reported observation', community: 'Community', press: 'Press', beaumont: 'Beaumont' };

  const slug = e => 'tl-' + e.date + '-' + e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48).replace(/-$/, '');
  const cveHtml = D.CVES.map(c => '<article id="' + c.id.toLowerCase() + '" class="cve ' + c.kind + '"><div class="cve-head"><h3><a href="/' + c.id.toLowerCase() + '/">' + esc(c.id) + '</a></h3> <span class="tag ' +
    ({ hot: 'tag-danger', chain: 'tag-reported' }[c.kind] || 'tag-research') + '">' + esc(c.status) + '</span> <span class="' +
    (c.kind === 'other' ? 'note' : 'score') + '">' + esc(c.score) + '</span></div><dl>' +
    c.rows.map(r => '<dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + cites(r[2]) + '</dd>').join('') + '</dl></article>').join('\n');

  const tlHtml = D.TIMELINE.map(e => {
    const tags = ['<span class="tag tag-' + e.kind + '">' + LABEL[e.kind] + '</span>'];
    if (e.deadline) tags.push('<span class="tag tag-deadline">Deadline - upcoming</span>');
    if (e.approx) tags.push('<span class="tag tag-reported">Approximate date</span>');
    if (e.unverified) tags.push('<span class="tag tag-danger">' + esc(e.unverifiedLabel || 'Unverified claim') + '</span>');
    if (e.validated) tags.push('<span class="tag tag-official">Validated</span>');
    return '<li id="' + slug(e) + '" data-kind="' + e.kind + '" class="k-' + e.kind + (e.deadline ? ' deadline' : '') + '"><div><time class="chip">' + (e.approx ? '~' : '') + fmt(e.date) +
      (e.time ? ', ' + e.time + ' UTC' : '') + '</time> ' + tags.join(' ') + '</div><p class="tl-title">' + esc(e.title) + '</p>' +
      (e.quote ? '<p class="tl-body"><q>' + esc(e.quote) + '</q></p>' : '') + '<p class="tl-body">' + esc(e.body) + '</p>' +
      (e.validated ? '<p class="note">' + esc(e.validated) + '</p>' : '') +
      '<p class="note">Sources:' + cites(e.cite) + '</p></li>';
  }).join('\n');

  const iocHtml = D.IOCS.map(r => '<tr><td>' + esc(r.type) + '</td><td><code>' + esc(r.value) + '</code></td><td>' +
    r.cite.map(id => '<a href="#ref-' + REFNO[id] + '" title="' + esc(D.SOURCES[id].label) + '">' + esc(short(id) === 'GreyNoise' ? 'GreyNoise blog' : D.SOURCES[id].label.split(' - ')[0]) + ' [' + REFNO[id] + ']</a>').join('; ') + '</td><td>' + esc(r.context) +
    '</td><td>' + esc(r.caveat) + '</td><td>' + esc(r.share) + '</td></tr>').join('\n');
  const buildHtml = D.BUILDS.map(b => '<tr><td>' + esc(b) + '</td></tr>').join('\n');
  const CATN = Object.fromEntries(D.SOURCE_CATS.map(c => [c[0], c[1].split(' - ')[0].replace(/ \(.*$/, '')]));
  const srcHtml = REF_ORDER.map(id => { const s = D.SOURCES[id]; return '<tr id="ref-' + REFNO[id] + '"><td>' + REFNO[id] + '</td><td><a href="' + esc(s.url) + '">' + esc(s.label) + '</a>' +
    (s.pending ? ' <span class="pending">verification pending</span>' : '') + '</td><td>' + esc(CATN[s.cat]) + '</td><td class="url"><code>' + esc(s.url) + '</code></td></tr>'; }).join('\n');

  const faqHtml = D.FAQ.map(f => '<div class="faq"><h3>' + esc(f.q) + '</h3><p>' + esc(f.a) + cites(f.cite) + '</p></div>').join('\n');
  const fill = (html, id, inner) => html.replace(new RegExp('(<(\\w+) id="' + id + '"[^>]*>)(</\\2>)'), (m, open, tag, close) => open + '\n' + inner + '\n' + close);
  let pre = indexHtml;
  pre = fill(pre, 'cve-list', cveHtml); pre = fill(pre, 'tl-list', tlHtml); pre = fill(pre, 'ioc-body', iocHtml);
  pre = fill(pre, 'build-body', buildHtml); pre = fill(pre, 'ref-body', srcHtml); pre = fill(pre, 'faq-list', faqHtml);
  pre = pre.replace(/<a class="cite" href="([^"]+)">\[[^\]]*\]<\/a>/g, (m, u) => {
    const n = URLNO[u.replace(/&amp;/g, '&')];
    if (!n) throw new Error('uncited URL in index.html: ' + u);
    const id = REF_ORDER[n - 1];
    return '<sup class="ref">' + refA(id) + '</sup>';
  }).replace(/<\/sup> <sup class="ref">/g, '');
  const MOD = UPD_DATE;            // date of the latest content commit (see main block)
  const PUBLISHED = '2026-09-29';  // first publication (domain registered and first deployed 29 Sep 2026)
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': 'https://pitscaler.com/#website', url: 'https://pitscaler.com/', name: 'PitScaler', inLanguage: 'en' },
    { '@type': 'Organization', '@id': 'https://pitscaler.com/#publisher', name: 'PitScaler', url: 'https://pitscaler.com/', email: 'emil@pitscaler.com', logo: 'https://pitscaler.com/logo.svg' },
    { '@type': 'TechArticle', '@id': 'https://pitscaler.com/#briefing', mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://pitscaler.com/' }, url: 'https://pitscaler.com/',
      headline: 'Citrix NetScaler zero-day vulnerabilities CVE-2026-88771 and CVE-2026-88772',
      description: 'Source-linked historical briefing on the exploited NetScaler zero-days CVE-2026-88771, CVE-2026-88772 and CVE-2026-88779, all CVEs in CTX697096 and CTX697174, timeline, public IoCs, detection and remediation. Last updated: ' + UPD_HUMAN + '.',
      inLanguage: 'en', isAccessibleForFree: true, datePublished: PUBLISHED, dateModified: MOD,
      author: { '@id': 'https://pitscaler.com/#publisher' }, publisher: { '@id': 'https://pitscaler.com/#publisher' }, isPartOf: { '@id': 'https://pitscaler.com/#website' },
      about: [{ '@type': 'Thing', name: 'Citrix NetScaler ADC and Gateway' }].concat(D.CVES.slice(0, 2).map(c => ({ '@type': 'Thing', name: c.id, sameAs: 'https://www.cve.org/CVERecord?id=' + c.id }))),
      mentions: D.CVES.slice(2).map(c => ({ '@type': 'Thing', name: c.id, sameAs: 'https://www.cve.org/CVERecord?id=' + c.id })),
      keywords: 'PitScaler, CVE-2026-88771, CVE-2026-88772, CTX697096, Citrix NetScaler vulnerability, NetScaler ADC, NetScaler Gateway, zero-day, 0-day, remote code execution, RCE, NetScaler shutdown, IoC, WHIPSHOT, SLAPSHOT, webshell',
      citation: [...new Set(Object.values(D.SOURCES).map(s => s.url))] },
    { '@type': 'FAQPage', '@id': 'https://pitscaler.com/#faq', url: 'https://pitscaler.com/#faq', inLanguage: 'en',
      mainEntity: D.FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
  ] };
  pre = pre.replace('<!--JSONLD-->', '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, '\\u003c') + '</script>');
  let st = pre.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '').replace(/<p class="export">[\s\S]*?<\/p>/, '<p class="export"><a class="button" href="/iocs.csv">Download all IoCs as CSV</a></p>');
  st = st.replace(/<div class="filters"[\s\S]*?<\/div>\s*<p id="tl-count"[^>]*><\/p>/, '')
         .replace(/<div class="ioc-tools"[\s\S]*?<\/div>\s*/, '').replace(/<p id="ioc-count"[^>]*><\/p>/, '')
         .replace(/<noscript>[\s\S]*?<\/noscript>\s*/, '').replace(/<script[^>]*><\/script>\s*/, '')
         .replace('<div class="banner" role="note">', '<div class="banner" role="note"><strong>Static version</strong> without JavaScript. <a href="/">Interactive version</a> · <a href="/index.md">Markdown</a>. ');


  // ---- Dedicated pages: one canonical URL per search intent, generated from the same data ----
  const sectionInner = id => { const m = pre.match(new RegExp('<section id="' + id + '"[^>]*>([\\s\\S]*?)<\\/section>')); return m ? m[1].replace(/<h2[^>]*>[\s\S]*?<\/h2>/, '').replace(/<div class="ioc-tools"[\s\S]*?<\/div>\s*/, '').replace(/<p id="ioc-count"[^>]*><\/p>/, '') : ''; };
  const cveCards = cveHtml.split('\n');
  const tlLines = tlHtml.split('\n');
  const SHORT = { 'CVE-2026-88771': 'unauthenticated remote code execution', 'CVE-2026-88772': 'DTLS memory overflow leading to RCE', 'CVE-2026-88773': 'HTTP request smuggling',
    'CVE-2026-88774': 'feature policy bypass', 'CVE-2026-88775': 'Gateway/AAA memory overflow (DoS)', 'CVE-2026-88776': 'Oracle load-balancer memory overflow (DoS)',
    'CVE-2026-88777': 'non-HTTP L7 memory overflow (DoS)', 'CVE-2026-88778': 'TCP initial sequence number prediction', 'CVE-2026-88779': 'SAML memory overflow leading to DoS' };
  const KEV = { 'CVE-2026-88771': true, 'CVE-2026-88772': true, 'CVE-2026-88779': true };
  const NAV = [['/', 'Overview'], ['/netscaler-timeline/', 'Timeline'], ['/netscaler-iocs/', 'IoCs'], ['/netscaler-detection/', 'Detection'], ['/netscaler-remediation/', 'Remediation'], ['/faq/', 'FAQ'], ['/about/', 'About']];
  const refsBlock = '<section id="sources" class="wrap" aria-labelledby="h-sources"><h2 id="h-sources">References</h2><div class="table-wrap" tabindex="0" role="region" aria-label="References table, scrollable"><table class="refs"><thead><tr><th scope="col">#</th><th scope="col">Source</th><th scope="col">Type</th><th scope="col">URL</th></tr></thead><tbody>' + srcHtml + '</tbody></table></div></section>';
  const pages = [];
  const page = (path, title, desc, h1, crumb, body, about) => {
    const url = 'https://pitscaler.com' + path;
    const ld = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'TechArticle', headline: h1, description: desc, url, mainEntityOfPage: url, inLanguage: 'en', datePublished: PUBLISHED, dateModified: MOD,
        author: { '@id': 'https://pitscaler.com/#publisher' }, publisher: { '@type': 'Organization', '@id': 'https://pitscaler.com/#publisher', name: 'PitScaler', url: 'https://pitscaler.com/' },
        isPartOf: { '@id': 'https://pitscaler.com/#website' }, about: about || [{ '@type': 'Thing', name: 'Citrix NetScaler ADC and Gateway' }] },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'PitScaler', item: 'https://pitscaler.com/' }, { '@type': 'ListItem', position: 2, name: crumb, item: url }] }] };
    const related = NAV.filter(n => n[0] !== path).map(n => '<li><a href="' + n[0] + '">' + esc(n[1] === 'Overview' ? 'PitScaler overview: Citrix NetScaler zero-days' : n[1] === 'About' ? 'About PitScaler and its methodology' : 'NetScaler zero-day ' + (/[A-Z].*[A-Z]/.test(n[1]) ? n[1] : n[1].toLowerCase())) + '</a></li>')
      .concat(D.CVES.filter(c => '/' + c.id.toLowerCase() + '/' !== path).map(c => '<li><a href="/' + c.id.toLowerCase() + '/">' + esc(c.id) + ': ' + esc(SHORT[c.id]) + '</a></li>')).join('');
    const html = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + esc(title) + '</title>\n' +
      '<meta name="description" content="' + esc(desc) + '">\n<meta name="color-scheme" content="dark">\n<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">\n' +
      '<link rel="canonical" href="' + url + '">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n<link rel="stylesheet" href="/style.css">\n' +
      '<meta property="og:type" content="article">\n<meta property="og:site_name" content="PitScaler">\n<meta property="og:locale" content="en_US">\n<meta property="og:url" content="' + url + '">\n' +
      '<meta property="og:title" content="' + esc(title) + '">\n<meta property="og:description" content="' + esc(desc) + '">\n<meta name="twitter:card" content="summary">\n' +
      '<script type="application/ld+json">' + JSON.stringify(ld).replace(/</g, '\\u003c') + '</script>\n</head>\n<body>\n<a class="skip" href="#main">Skip to content</a>\n' +
      '<div class="banner" role="note">Last updated <time datetime="' + UPD_ISO + '">' + UPD_HUMAN + '</time>. Not a live feed; check official advisories for current status. <span class="contrib">Contribute: <a href="https://github.com/emilstahl/pitscaler">GitHub</a> · <a href="mailto:emil@pitscaler.com">emil@pitscaler.com</a> · Signal <code>emil.112</code></span></div>\n' +
      '<header class="site-head"><nav aria-label="Sections" class="wrap nav"><a class="brand" href="/"><img src="/logo.svg" alt="" width="28" height="28"> PitScaler</a><ul>' +
      NAV.map(n => '<li><a href="' + n[0] + '"' + (n[0] === path ? ' aria-current="page"' : '') + '>' + n[1] + '</a></li>' + (n[0] === '/' ? cveMenu(path) : '')).join('') + '</ul></nav></header>\n' +
      '<main id="main">\n<section class="wrap hero"><nav aria-label="Breadcrumb" class="toc"><a href="/">PitScaler</a> › ' + esc(crumb) + '</nav><h1>' + esc(h1) + '</h1></section>\n' +
      body + '\n<section class="wrap"><h2>Related pages</h2><ul class="related">' + related + '</ul></section>\n' + refsBlock + '\n</main>\n' +
      '<footer class="site-foot"><div class="wrap"><p>Contribute or send corrections: <a href="https://github.com/emilstahl/pitscaler">GitHub (issues and pull requests)</a> · <a href="mailto:emil@pitscaler.com">emil@pitscaler.com</a> · Signal <code>emil.112</code></p><p><strong>Independent briefing, not affiliated with Citrix.</strong> Citrix and NetScaler are trademarks of Cloud Software Group, Inc. or its affiliates. <a href="/about/">About and methodology</a>.</p><p>Feedback or corrections: <a href="mailto:emil@pitscaler.com">emil@pitscaler.com</a></p>' + FOOTNAV + '</div></footer>\n</body>\n</html>\n';
    pages.push(path); out[path] = [html, 'text/html; charset=utf-8'];
  };
  const out = {};
  // Official vulnerability records, fetched from NVD, CVE.org (MITRE) and ENISA EUVD on 30 Sep 2026
  const REC = {
    'CVE-2026-88771': { euvd: 'EUVD-2026-87958', cwe: 'CWE-20', nvd: 'Analyzed', pub: '2026-09-27 16:02', vec: 'CVSS:4.0/AV:N/AC:L/AT:P/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H' },
    'CVE-2026-88772': { euvd: 'EUVD-2026-87959', cwe: 'CWE-119', nvd: 'Analyzed', pub: '2026-09-27 16:09', vec: 'CVSS:4.0/AV:N/AC:H/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H' },
    'CVE-2026-88773': { euvd: 'EUVD-2026-87961', cwe: 'CWE-444', nvd: 'Analyzed', pub: '2026-09-27 16:20', vec: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:H/VA:N/SC:H/SI:H/SA:N' },
    'CVE-2026-88774': { euvd: 'EUVD-2026-87960', cwe: 'CWE-20 (Citrix: CWE-16)', nvd: 'Modified', pub: '2026-09-27 16:14', vec: 'CVSS:4.0/AV:N/AC:L/AT:P/PR:N/UI:N/VC:L/VI:L/VA:N/SC:H/SI:H/SA:N' },
    'CVE-2026-88775': { euvd: 'EUVD-2026-87962', cwe: 'CWE-120 (Citrix: CWE-119)', nvd: 'Modified', pub: '2026-09-27 16:21', vec: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:L/VI:L/VA:H/SC:N/SI:N/SA:N' },
    'CVE-2026-88776': { euvd: 'EUVD-2026-87971', cwe: 'CWE-119', nvd: 'Modified', pub: '2026-09-27 16:36', vec: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:L/VI:L/VA:H/SC:N/SI:N/SA:N' },
    'CVE-2026-88777': { euvd: 'EUVD-2026-87972', cwe: 'CWE-119', nvd: 'Modified', pub: '2026-09-27 16:37', vec: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:L/VI:L/VA:H/SC:N/SI:N/SA:N' },
    'CVE-2026-88778': { euvd: 'EUVD-2026-87973', cwe: 'CWE-342', nvd: 'Analyzed', pub: '2026-09-27 16:43', vec: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:L/VI:H/VA:H/SC:L/SI:L/SA:L' },
    'CVE-2026-88779': { euvd: '', cwe: 'CWE-119', nvd: 'Undergoing Analysis (CNA score carried: CVSS 4.0 8.7 HIGH, Secondary)', pub: '2026-10-04 04:16', vec: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:N/VA:H/SC:N/SI:N/SA:N' }
  };
  const recordsHtml = c => { const r = REC[c.id]; if (!r) return ''; const k = KEV[c.id];
    const is88779 = c.id === 'CVE-2026-88779';
    return '<section class="wrap"><h2>' + esc(c.id) + ' vulnerability records</h2>' +
      '<p>Official records for ' + esc(c.id) + ', checked on ' + (is88779 ? '5 October 2026' : '30 September 2026') + '. The CVE record was published by the CNA (NetScaler) at ' + r.pub + ' UTC' + (is88779 ? '; NVD lists it as Undergoing Analysis, carrying the CNA-provided CVSS 4.0 8.7 HIGH (Secondary) and CWE-119. NVD has not scored it independently yet' : '') + '.</p>' +
      '<div class="table-wrap" role="region" aria-label="Vulnerability records"><table class="facts"><tbody>' +
      '<tr><th scope="row">CVSS 4.0 vector</th><td><code>' + r.vec + '</code></td></tr>' +
      '<tr><th scope="row">Weakness (NVD)</th><td>' + esc(r.cwe) + '</td></tr>' +
      '<tr><th scope="row">NVD status</th><td>' + esc(r.nvd) + '</td></tr>' +
      (r.euvd ? '<tr><th scope="row">EUVD ID</th><td>' + r.euvd + '</td></tr>' : '') +
      '</tbody></table></div><ul class="records">' +
      '<li><a href="https://nvd.nist.gov/vuln/detail/' + c.id + '">NIST NVD: ' + c.id + '</a></li>' +
      '<li><a href="https://www.cve.org/CVERecord?id=' + c.id + '">CVE.org record: ' + c.id + '</a></li>' +
      (r.euvd ? '<li><a href="https://euvd.enisa.europa.eu/vulnerability/' + r.euvd + '">ENISA EU Vulnerability Database: ' + r.euvd + '</a></li>' : '') +
      '<li><a href="https://support.citrix.com/external/article/' + (is88779 ? 'CTX697174' : 'CTX697096') + '/citrix-netscaler-adc-and-citrix-netscale.html">Citrix bulletin ' + (is88779 ? 'CTX697174' : 'CTX697096') + '</a></li>' +
      (k ? '<li><a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog?search_api_fulltext=' + c.id + '">CISA KEV entry: ' + c.id + '</a></li>' : '') +
      '</ul></section>'; };
  D.CVES.forEach((c, i) => {
    const kev = KEV[c.id];
    const is88779 = c.id === 'CVE-2026-88779';
    const facts = '<dl class="facts"><dt>CVE</dt><dd>' + c.id + '</dd><dt>Product</dt><dd>Citrix NetScaler ADC and NetScaler Gateway</dd><dt>Bulletin</dt><dd>' + (is88779 ? 'CTX697174' + cites(['citrix88779']) : 'CTX697096' + cites(['citrix'])) + '</dd>' +
      '<dt>Severity</dt><dd>' + esc(c.score) + '</dd><dt>Exploitation</dt><dd>' + esc(c.status) + '</dd><dt>CISA KEV</dt><dd>' + (kev ? (is88779 ? 'Yes, added 4 Oct 2026, federal deadline 7 Oct 2026' : 'Yes, added 27 Sep 2026, federal deadline 30 Sep 2026') + cites(['kev']) : 'No') + '</dd>' +
      '<dt>Disclosed</dt><dd>' + (is88779 ? '<time datetime="2026-10-03">3 Oct 2026</time>' : '<time datetime="2026-09-27">27 Sep 2026</time>') + '</dd><dt>Fixed builds</dt><dd><a href="/netscaler-remediation/">' + (is88779 ? '14.1-73.41, 13.1-64.28 and FIPS/NDcPP builds' : '14.1-73.37, 13.1-64.23 and FIPS/NDcPP builds') + '</a></dd></dl>';
    const lede = '<p>' + esc(c.id) + ' is a Citrix NetScaler ADC and Gateway vulnerability: ' + esc(SHORT[c.id]) + ', rated ' + esc(c.score.replace('CVSS 4.0: ', 'CVSS 4.0 ')) + '. ' +
      (is88779 ? 'Citrix disclosed it on 3 October 2026 in bulletin CTX697174, crediting Bishop Fox and watchTowr, and says it has observed targeted attacks on unmitigated deployments with no impact on customer data integrity so far. It is the CVE behind the SAML issue Citrix had described without a CVE since 2 October.' + cites(['citrix88779']) : kev ? 'It was exploited in the wild as a zero-day before Citrix disclosed it on 27 September 2026.' : c.kind === 'chain' ? 'Kevin Beaumont reports it was chained with CVE-2026-88771 and CVE-2026-88772 in the attacks. As of 1 October 2026 no other source has independently confirmed its exploitation.' : 'No exploitation has been reported as of ' + UPD_DAY + '.') + (is88779 ? '' : cites(kev ? ['citrix', 'cisa'] : c.kind === 'chain' ? ['citrix', 'kb1'] : ['citrix'])) + '</p>';
    const tl = tlLines.filter(l => l.includes(c.id));
    const faq = D.FAQ.filter(f => f.a.includes(c.id) || f.q.includes(c.id)).map(f => '<div class="faq"><h3>' + esc(f.q) + '</h3><p>' + esc(f.a) + cites(f.cite) + '</p></div>').join('');
    const body = '<section class="wrap">' + lede + facts + '<div class="cves">' + cveCards[i] + '</div></section>' + recordsHtml(c) +
      (tl.length ? '<section class="wrap"><h2>' + esc(c.id) + ' timeline</h2><ol class="timeline">' + tl.join('') + '</ol></section>' : '') +
      (faq ? '<section class="wrap"><h2>Questions about ' + esc(c.id) + '</h2>' + faq + '</section>' : '') +
      '<section class="wrap"><h2>Next steps</h2><ul><li><a href="/netscaler-detection/">How to detect NetScaler compromise</a></li><li><a href="/netscaler-iocs/">Public NetScaler IoCs</a></li><li><a href="/netscaler-remediation/">NetScaler remediation and fixed builds</a></li></ul></section>';
    page('/' + c.id.toLowerCase() + '/', c.id + ': Citrix NetScaler ' + SHORT[c.id] + ' | PitScaler',
      c.id + ' in Citrix NetScaler ADC and Gateway: ' + SHORT[c.id] + ', ' + c.score + '. ' + (kev ? 'Exploited as a zero-day; in CISA KEV. ' : '') + 'Details, timeline, fixed builds and sources. As of 1 Oct 2026.',
      c.id + ': Citrix NetScaler ' + SHORT[c.id], c.id, body, [{ '@type': 'Thing', name: c.id, sameAs: 'https://www.cve.org/CVERecord?id=' + c.id }]);
  });
  page('/netscaler-iocs/', 'Citrix NetScaler IoCs: CVE-2026-88771 and CVE-2026-88772 | PitScaler',
    'Public indicators of compromise for the exploited Citrix NetScaler zero-days: IPs, webshell paths, hashes, headers, config changes and log strings, with sources and caveats. CSV download.',
    'Public Citrix NetScaler IoCs (PitScaler)', 'IoCs', '<section class="wrap">' + sectionInner('iocs') + '</section>');
  page('/netscaler-detection/', 'How to detect Citrix NetScaler compromise (CVE-2026-88771, CVE-2026-88772) | PitScaler',
    'Hunting guidance for NetScaler compromise: httpd.conf changes, webshells in VPN script directories, setuid /bin/sh, SLAPSHOT files, DTLS handshake failures and NSPPE crashes. Sourced.',
    'How to detect Citrix NetScaler compromise', 'Detection', '<section class="wrap">' + sectionInner('detection') + '</section>');
  page('/netscaler-remediation/', 'Citrix NetScaler remediation and fixed builds for CVE-2026-88771 | PitScaler',
    'Fixed NetScaler ADC and Gateway builds (14.1-73.37, 13.1-64.23, FIPS/NDcPP), why to check for compromise before patching, and what patching does not remove.',
    'Citrix NetScaler remediation and fixed builds', 'Remediation', '<section class="wrap">' + sectionInner('remediation') + '</section>');
  page('/netscaler-timeline/', 'Citrix NetScaler zero-day timeline, September 2026 | PitScaler',
    'Dated timeline of the Citrix NetScaler zero-day exploitation, from early September 2026 to disclosure on 27 September and the government shutdowns, with sources.',
    'Citrix NetScaler zero-day timeline, September 2026', 'Timeline', '<section class="wrap"><p>Times are UTC unless marked otherwise.</p><ol class="timeline">' + tlHtml + '</ol></section>');
  page('/faq/', 'Citrix NetScaler zero-day FAQ: CVE-2026-88771 and CVE-2026-88772 | PitScaler',
    'Short, sourced answers: which NetScaler CVEs are exploited, fixed versions, whether patching removes a backdoor, how to check for compromise, and whether to shut down.',
    'Citrix NetScaler zero-day FAQ', 'FAQ', '<section class="wrap faqs">' + faqHtml + '</section>');
  page('/about/', 'About PitScaler and its methodology | PitScaler',
    'Who runs PitScaler, how sources are chosen and classified, the public-only IoC policy, and how corrections work.',
    'About PitScaler and its methodology', 'About',
    '<section class="wrap"><p>PitScaler is an independent, non-commercial technical briefing on the September 2026 Citrix NetScaler ADC and Gateway zero-day incident (CVE-2026-88771, CVE-2026-88772 and the six other CVEs in bulletin CTX697096). It is maintained by an independent security practitioner. It is not affiliated with, endorsed by or sponsored by Cloud Software Group, Citrix or NetScaler.</p>' +
    '<h2>Quick answers</h2>' +
    '<h3>Who maintains PitScaler?</h3><p>An independent security practitioner, writing as the PitScaler editorial identity. Contact and corrections: <a href="mailto:emil@pitscaler.com">emil@pitscaler.com</a>. Germany\'s BSI links to PitScaler in its TLP:CLEAR warning BITS-H 2026-289305-1132 (1 October 2026) and recommends that operators use its IoC list. PitScaler is not affiliated with BSI.</p>' +
    '<h3>Is PitScaler affiliated with Citrix?</h3><p>No. It is not affiliated with, endorsed by or sponsored by Cloud Software Group, Citrix or NetScaler. For official guidance, use Citrix bulletin CTX697096.</p>' +
    '<h3>What kind of source is PitScaler?</h3><p>A secondary, independent compilation. It does not produce original telemetry or incident-response findings; every fact is attributed to the primary source that published it.</p>' +
    '<h3>How are claims verified?</h3><p>Each source page is read before it is cited, and quotes are checked word for word. Where a claim rests on one researcher, a press report or a community post, it is labelled as reported and not independently verified.</p>' +
    '<h3>What counts as independently verified?</h3><p>A claim marked "Validated" has been confirmed by a second, independent check, for example against the CVE record, the CISA KEV feed, a primary advisory or a first-hand observation. Claims confirmed only through non-public sources say so, and those sources are not named.</p>' +
    '<h3>How are corrections handled?</h3><p>Corrections sent to emil@pitscaler.com are checked against the primary source and fixed in the next update. The page date changes only when the content changes.</p>' +
    '<h3>When was this last verified?</h3><p>The whole site was last updated ' + UPD_HUMAN + '. Individual timeline entries marked "Validated" carry their own check date.</p>' +
    '<h2>Methodology</h2><p>Every statement is tied to a numbered reference. Sources are classified as:</p><ol><li><strong>Official</strong>: the vendor bulletin and government or national CERT advisories. These take precedence.</li><li><strong>Research</strong>: technical analysis and first-hand incident response by named security firms.</li><li><strong>Telemetry</strong>: sensor and honeypot data (for example GreyNoise, Lupovis, Defused).</li><li><strong>Reported</strong>: claims by individual researchers, community posts and press. These are attributed by name and labelled as not independently verified unless corroborated.</li></ol>' +
    '<p>Where a claim has been checked against a second source, it is marked <em>Validated</em>. Exposure counts are never presented as victim counts.</p>' +
    '<h2>IoC policy</h2><p>Only indicators that have been published openly (TLP:CLEAR or public pages without a TLP marking) are listed, each with its source, sharing marking and a caveat. Indicators received under restricted TLP are not published unless the same value later appears in a public source, which is then cited. IoCs are hunting leads, not universal indicators for every victim.</p>' +
    '<h2>Updates and corrections</h2><p>This is a dated historical snapshot, not a live feed. The as-of date and last-updated date appear at the top of every page. Send corrections to <a href="mailto:emil@pitscaler.com">emil@pitscaler.com</a>.</p>' +
    '<h2>Formats</h2><ul><li><a href="/">Interactive briefing</a></li><li><a href="/static.html">Static HTML without JavaScript</a></li><li><a href="/index.md">Markdown</a> and <a href="/llms.txt">llms.txt</a></li><li><a href="/iocs.csv">IoCs as CSV</a></li></ul></section>');

  // HTML -> Markdown for the <main> content (tags produced by us, so a small converter is enough)
  const main = st.slice(st.indexOf('<main'), st.indexOf('</main>'));
  const dec = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  const inline = s => dec(s
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (m, u, t) => '[' + t.replace(/<[^>]+>/g, '') + '](' + u + ')')
    .replace(/<code>([\s\S]*?)<\/code>/g, (m, t) => '`' + t + '`')
    .replace(/<q>([\s\S]*?)<\/q>/g, '"$1"').replace(/<(strong|b)>([\s\S]*?)<\/\1>/g, '**$2**')
    .replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
  const keep = [];
  const hold = t => '\n\n@@' + (keep.push(t) - 1) + '@@\n\n';
  const blockText = s => s.replace(/<span class="tag[^"]*">([\s\S]*?)<\/span>/g, ' [$1]')
    .replace(/<p class="tl-title">([\s\S]*?)<\/p>/g, ' **$1**. ').replace(/<\/(p|div|time|span|dd|dt)>/g, ' ');
  let md = main
    .replace(/<dl class="stats">([\s\S]*?)<\/dl>/, (m, t) => hold([...t.matchAll(/<div><dt>([\s\S]*?)<\/dt><dd>([\s\S]*?)<\/dd><p>([\s\S]*?)<\/p><\/div>/g)]
      .map(x => '- ' + inline(x[1]) + ': **' + inline(x[2]) + '** (' + inline(x[3]) + ')').join('\n')))
    .replace(/<div class="legend"[^>]*>([\s\S]*?)<\/div>/, (m, t) => hold(inline(blockText(t))))
    .replace(/<table[\s\S]*?<\/table>/g, tbl => {
      const rows = [...tbl.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map(r => [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(x => inline(x[1]).replace(/\|/g, '\\|')));
      if (!rows.length) return '';
      return hold(['| ' + rows[0].join(' | ') + ' |', '|' + '---|'.repeat(rows[0].length)].concat(rows.slice(1).map(r => '| ' + r.join(' | ') + ' |')).join('\n'));
    })
    .replace(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/g, (m, n, t) => hold('#'.repeat(+n) + ' ' + inline(blockText(t))))
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, (m, t) => '\n' + hold('- ' + inline(blockText(t))).trim())
    .replace(/<(p|dt|dd)(\s[^>]*)?>([\s\S]*?)<\/\1>/g, (m, a, b, t) => hold(inline(blockText(t))))
    .replace(/<div class="cve-head">([\s\S]*?)<\/div>/g, (m, t) => hold('### ' + inline(blockText(t)).replace(/@@(\d+)@@/g, (x, i) => keep[+i].replace(/^#+ /, ''))));
  md = dec(md.replace(/<[^>]+>/g, ' ')).split('\n').map(l => l.trim()).join('\n').replace(/\n{3,}/g, '\n\n').trim();
  md = md.replace(/@@(\d+)@@/g, (m, i) => keep[+i]).replace(/\]\(#ref-(\d+)\)/g, (m, n) => '](' + D.SOURCES[REF_ORDER[n - 1]].url + ')').replace(/(^|\n)(- [^\n]*)\n\n(?=- )/g, '$1$2\n').replace(/\n{3,}/g, '\n\n');
  const header = '---\ntitle: PitScaler - Citrix NetScaler Zero-Day Crisis\nurl: https://pitscaler.com/\nlast_updated: ' + UPD_ISO + ' (historical snapshot)\nnote: Independent briefing, not affiliated with Citrix. Check official advisories for current status.\n---\n\n';
  const foot = st.slice(st.indexOf('<footer'), st.indexOf('</footer>'));
  const footMd = [...foot.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(x => inline(x[1])).join('\n\n');
  md = header + md + '\n\n---\n\n' + footMd + '\n';

  const llms = [
    '# PitScaler - Citrix NetScaler zero-days', '',
    '> Independent, source-linked historical briefing on Citrix NetScaler ADC/Gateway CVE-2026-88771, CVE-2026-88772 and CVE-2026-88779. Bulletins CTX697096 (eight CVEs) and CTX697174. Last updated: ' + UPD_HUMAN + '. Not a live feed and not affiliated with Citrix. Verify current status with official advisories.', '',
    'Cite this page as a dated snapshot, not a current incident feed. Distinguish confirmed exploitation from researcher claims and exposure counts from compromised-system counts. All displayed IoCs are from public sources; do not infer that they identify every victim. Patching does not undo an existing compromise.', '',
    '## Briefing formats', '',
    '- [Canonical briefing](https://pitscaler.com/): overview, CVEs, timeline, public IoCs, detection, remediation, FAQs and source links',
    '- [No-JavaScript HTML](https://pitscaler.com/static.html): complete text without scripts',
    '- [Full Markdown briefing](https://pitscaler.com/index.md): extractable source-linked text',
    '- [Full text](https://pitscaler.com/llms-full.txt): same historical briefing as Markdown',
    '- [Public IoCs as CSV](https://pitscaler.com/iocs.csv): type, value, context, caveat, sharing, sources',
    '- [Firewall edge blocklist](https://pitscaler.com/blocklist.txt): the IPv4 rows that are safe to block, with the shared-infrastructure exclusions listed (Cloudflare WARP, VPN exits, residential/ISP, parking)',
    '- [Plain IP blocklist](https://pitscaler.com/blocklist-plain.txt): one IP per line, same set',
    '- [Domain blocklist](https://pitscaler.com/blocklist-domains.txt): *.pylrk.cc wildcard plus f.pylrk.cc — block inbound (payload delivery) AND outbound (Sliver C2 beacon) on the DNS name, never the Cloudflare proxy IPs',
    '- [Plain domain blocklist](https://pitscaler.com/blocklist-domains-plain.txt): one name per line, same set', '',
    '## Dedicated pages', ''].concat(pages.map(p => '- [' + (out[p][0].match(/<title>(.*?)<\/title>/)[1].replace(/ \| PitScaler$/, '').replace(/&amp;/g, '&')) + '](https://pitscaler.com' + p + ')'), ['',
    '## Key sections', '',
    '- [Eight CVEs](https://pitscaler.com/#cves)'].concat(D.CVES.map(c => '- [' + c.id + '](https://pitscaler.com/#' + c.id.toLowerCase() + ')'), [
    '- [Timeline](https://pitscaler.com/#timeline)', '- [Public IoCs](https://pitscaler.com/#iocs)', '- [Detection](https://pitscaler.com/#detection)',
    '- [Remediation](https://pitscaler.com/#remediation)', '- [FAQ](https://pitscaler.com/#faq)', '- [Sources](https://pitscaler.com/#sources)', '',
    '## Primary sources', '',
    '- [Citrix bulletin CTX697096](' + D.SOURCES.citrix.url + ')', '- [CISA alert](' + D.SOURCES.cisa.url + ')', '- [CISA KEV](' + D.SOURCES.kev.url + ')',
    '- [NCSC-NL advisory NCSC-2026-0394](' + D.SOURCES.ncscnl.url + ')', '- [CERT-EU technical analysis](' + D.SOURCES.certeu.url + ')',
    '- [GTIG/Mandiant exploitation analysis](' + D.SOURCES.gtig.url + ')', '- [GreyNoise analysis and public IoCs](' + D.SOURCES.gnblog.url + ')', '',
    '## Corrections and contributions', '', '- [GitHub](https://github.com/emilstahl/pitscaler): issues and pull requests', '- [Feedback](mailto:emil@pitscaler.com): emil@pitscaler.com', '- Signal: emil.112', ''])).join('\n');
  const robots = 'User-Agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=yes\nAllow: /\n\nSitemap: https://pitscaler.com/sitemap.xml\n';
  const lastmod = MOD;
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ['/'].concat(pages).map(p => '  <url><loc>https://pitscaler.com' + p + '</loc><lastmod>' + lastmod + '</lastmod></url>').join('\n') + '\n</urlset>\n';
  const q = v => '"' + String(v).replace(/"/g, '""') + '"';
  const csv = '\ufeff' + ['type', 'value', 'context', 'caveat', 'sharing', 'sources'].join(',') + '\r\n' +
    D.IOCS.map(r => [r.type, r.value, r.context, r.caveat, r.share, r.cite.map(id => D.SOURCES[id].url).join(' ')].map(q).join(',')).join('\r\n') + '\r\n';

  // Firewall-edge blocklist: only IPv4 rows whose own caveat does not warn against blocking
  // (Cloudflare WARP egress, shared VPN exits, residential/ISP CGNAT, domain-parking IPs are excluded).
  const blockable = D.IOCS.filter(r => r.type === 'IPv4' && !r.exclude_blocklist && !/do not block on it|never block|cloudflare warp/i.test(r.caveat) && !/cloudflare warp|cloudflare, inc/i.test(r.context) && !/shared by many users|likely a commercial vpn/i.test(r.caveat) && !/sedo domain-parking/i.test(r.caveat));
  const blockedExcluded = D.IOCS.filter(r => r.type === 'IPv4' && !blockable.includes(r));
  const gen = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  const blHeader = [
    '# PitScaler CVE-2026-88771/88772 public-IoC IPv4 edge-blocklist',
    '# Generated ' + gen + ' from https://pitscaler.com/iocs.csv',
    '# ' + blockable.length + ' IPs included; ' + blockedExcluded.length + ' IPv4 rows excluded as shared infrastructure or low-confidence leads',
    '#   (Cloudflare WARP egress, shared commercial VPN exits, residential/ISP CGNAT addresses, a domain-parking IP).',
    '# Read the caveats: https://pitscaler.com/iocs.csv - attacker IPs differ per victim (Beaumont).',
    '# Blocking these is defence in depth, not incident response. A clean log proves nothing.',
    '#',
    '# Excluded:',
    ...blockedExcluded.map(r => '#   ' + r.value.padEnd(16) + ' ' + (r.context.split('.')[0] || r.caveat.split(';')[0]).slice(0, 80)),
    '#',
  ];
  const blocklist = blHeader.join('\n') + '\n' + blockable.map(r => r.value).sort((a, b) => a.split('.').map(Number).reduce((x, n, i) => x * 256 + n, 0) - b.split('.').map(Number).reduce((x, n, i) => x * 256 + n, 0)).join('\n') + '\n';
  const blocklistTxt = '# See blocklist.txt for the annotated list. Plain one-IP-per-line version:\n\n' + blockable.map(r => r.value).sort((a, b) => a.split('.').map(Number).reduce((x, n, i) => x * 256 + n, 0) - b.split('.').map(Number).reduce((x, n, i) => x * 256 + n, 0)).join('\n') + '\n';

  // Domain blocklist: campaign domains whose malware role is multi-source (embedded C2 strings,
  // IR corroboration) or that NCSC-NL/Citrix-class guidance treats as blockable. Wildcard entries
  // cover subdomain rotation. Deliberately excludes dual-use hunt leads (oast.fun, dnsl.cc,
  // gs.thc.org) and the unregistered screenshot spellings (pyrlink.cc, pyrlnk.cc).
  const domBlockable = D.IOCS.filter(r => r.type === 'Domain' && ['pylrk.cc', 'f.pylrk.cc'].includes(r.value));
  const domHeader = [
    '# PitScaler campaign-domain edge-blocklist (CVE-2026-88771/88772 and the 2 Oct SAML-issue chain)',
    '# Generated ' + gen + ' from https://pitscaler.com/iocs.csv',
    '# Block inbound AND outbound: the actor downloads payloads from these names (inbound to the appliance)',
    '#   and the Sliver implant beacons out to them (outbound from the appliance).',
    '# Wildcard semantics: a line "*.pylrk.cc." means the name and every subdomain of it (NCSC-NL guidance: block all subdomains).',
    '# Read the caveats: https://pitscaler.com/iocs.csv',
    '# These are Cloudflare-fronted names: block the DNS name, never the resolved proxy IPs.',
    '# Blocking these is defence in depth, not incident response. A clean log proves nothing.',
    '#',
  ];
  const domainBlocklist = domHeader.join('\n') + '\n' +
    '# Wildcard: the C2 domain of the 2 Oct FreeBSD Sliver implant (embedded C2 string, Expel-corroborated MAR);\n' +
    '# covers delivery subdomain f.pylrk.cc and rotation. Registered 2 Oct 06:56 UTC.\n' +
    '*.pylrk.cc.\n' +
    '# Wildcard: same campaign, subdomain-rotation coverage (spelled *.pylrk.cc in NCSC-NL guidance).\n' +
    'pylrk.cc.\n' +
    '# Delivery host of the FreeBSD Sliver implant (/HaKi2ufpiQ8AeVTZ/host), explicit single-name line for\n' +
    '# resolvers/devices that do not support wildcards.\n' +
    'f.pylrk.cc.\n';
  const domainBlocklistPlain = '*.pylrk.cc\npylrk.cc\nf.pylrk.cc\n';

  const favicon = readIcon();
  return {
    ...out,
    '/iocs.csv': [csv, 'text/csv; charset=utf-8'], '/blocklist.txt': [blocklist, 'text/plain; charset=utf-8'], '/blocklist-plain.txt': [blocklistTxt, 'text/plain; charset=utf-8'], '/blocklist-domains.txt': [domainBlocklist, 'text/plain; charset=utf-8'], '/blocklist-domains-plain.txt': [domainBlocklistPlain, 'text/plain; charset=utf-8'], '/favicon.svg': [favicon, 'image/svg+xml'], '/favicon.ico': [favicon, 'image/svg+xml'], '/logo.svg': [favicon, 'image/svg+xml'],
    ...(INDEXNOW_KEY ? { ['/' + INDEXNOW_KEY + '.txt']: [INDEXNOW_KEY, 'text/plain; charset=utf-8'] } : {}),
    '/': [pre, 'text/html; charset=utf-8'], '/style.css': [css, 'text/css; charset=utf-8'], '/app.js': [appJs, 'text/javascript; charset=utf-8'],
    '/static.html': [st, 'text/html; charset=utf-8'], '/index.md': [md, 'text/markdown; charset=utf-8'], '/llms-full.txt': [md, 'text/plain; charset=utf-8'],
    '/llms.txt': [llms, 'text/plain; charset=utf-8'], '/robots.txt': [robots, 'text/plain; charset=utf-8'], '/.well-known/security.txt': ['Contact: mailto:emil@pitscaler.com\nExpires: 2027-09-30T00:00:00Z\nPreferred-Languages: en, da\nCanonical: https://pitscaler.com/.well-known/security.txt\n', 'text/plain; charset=utf-8'], '/sitemap.xml': [sitemap, 'application/xml; charset=utf-8']
  };
}

export const LOGIC = String.raw`
const SEC = {
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-frame-options': 'DENY',
  'permissions-policy': 'accelerometer=(), autoplay=(), browsing-topics=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), hid=(), idle-detection=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), serial=(), usb=(), xr-spatial-tracking=()',
  'cross-origin-opener-policy': 'same-origin',
  'cross-origin-resource-policy': 'same-origin',
  'x-permitted-cross-domain-policies': 'none',
  'x-dns-prefetch-control': 'off',
  'content-signal': 'search=yes, ai-input=yes, ai-train=yes'
};
const LINK = '</index.md>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"; type="text/plain", </static.html>; rel="alternate"; type="text/html"; title="no-js"';
const CSP = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests; require-trusted-types-for 'script'; trusted-types 'none'";
// Redirects carry the same security headers (HSTS preload requires HSTS on HTTPS redirects too)
function redir(location, status) { return new Response(null, { status: status || 301, headers: Object.assign({ location: location, 'cache-control': 'public, max-age=300' }, SEC) }); }
function hdr(type, extra) {
  const h = Object.assign({ 'content-type': type, 'cache-control': 'public, max-age=300' }, SEC, extra || {});
  // CSP only where content can execute; on XML/text it just breaks the browser's built-in viewers
  if (type.startsWith('text/html') || type.startsWith('image/svg')) { h['content-security-policy'] = CSP; h['cross-origin-embedder-policy'] = 'require-corp'; }
  return h;
}
function q(accept, type) {
  let best = 0;
  for (const part of accept.split(',')) {
    const [t, ...p] = part.trim().toLowerCase().split(';');
    const qv = p.map(x => x.trim()).find(x => x.startsWith('q='));
    const v = qv ? parseFloat(qv.slice(2)) : 1;
    if (t === type || t === type.split('/')[0] + '/*') best = Math.max(best, t === type ? v : v - 0.001);
  }
  return best;
}
export default {
  async fetch(req) {
    const u = new URL(req.url);
    // Custom-domain Workers may see an https URL even for plain-HTTP visitors, so also check the connection itself
    const plainHttp = u.protocol === 'http:' || req.headers.get('x-forwarded-proto') === 'http' || (req.cf && !req.cf.tlsVersion);
    if (plainHttp || u.hostname === 'www.pitscaler.com') return redir('https://pitscaler.com' + (F[u.pathname] || !F[u.pathname + '/'] ? u.pathname : u.pathname + '/') + u.search, 301);
    if (req.method !== 'GET' && req.method !== 'HEAD') return new Response('Method not allowed', { status: 405, headers: hdr('text/plain; charset=utf-8') });
    let path = u.pathname === '/index.html' ? '/' : u.pathname.replace(/\/{2,}/g, '/');
    let vary = {};
    if (path === '/') {
      const a = req.headers.get('accept') || '';
      vary = { vary: 'Accept', link: LINK };
      if (q(a, 'text/markdown') > 0 && q(a, 'text/markdown') >= q(a, 'text/html')) path = '/index.md';
    }
    if (!F[path] && F[path + '/']) return redir('https://pitscaler.com' + path + '/', 301);
    const f = F[path];
    if (!f) return new Response('Not found', { status: 404, headers: hdr('text/plain; charset=utf-8') });
    const extra = Object.assign({}, vary);
    if (f[1].startsWith('text/markdown')) extra['x-markdown-tokens'] = String(Math.ceil(f[0].length / 4));
    if (['/index.md', '/llms.txt', '/llms-full.txt'].includes(path)) extra.link = '<https://pitscaler.com/>; rel="canonical"';
    if (path === '/iocs.csv') extra['content-disposition'] = 'attachment; filename="pitscaler-iocs.csv"';
    if (path === '/blocklist.txt' || path === '/blocklist-plain.txt' || path === '/blocklist-domains.txt' || path === '/blocklist-domains-plain.txt') extra['content-disposition'] = 'attachment; filename="' + path.slice(1) + '"';
    return new Response(req.method === 'HEAD' ? null : f[0], { headers: hdr(f[1], extra) });
  }
};
`;

if (import.meta.url === 'file://' + process.argv[1]) {
  const P = 'public/';
  // latest commit touching the site content (not README/workflows); falls back to the latest commit, then a fixed date
  const git = (args) => { try { return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
  const updatedIso = git(['log', '-1', '--format=%cI', '--', 'public', 'build.mjs', 'logo.svg']) || git(['log', '-1', '--format=%cI']) || '2026-10-01T00:00:00Z';
  const files = build(readFileSync(P + 'index.html', 'utf8'), readFileSync(P + 'app.js', 'utf8'), readFileSync(P + 'style.css', 'utf8'), readFileSync('logo.svg', 'utf8'), updatedIso);
  // generated copies go to dist/ so public/ stays the editable source
  mkdirSync('dist', { recursive: true });
  for (const [path, [body]] of Object.entries(files)) {
    const out = 'dist' + (path.endsWith('/') ? path + 'index.html' : path);
    mkdirSync(out.slice(0, out.lastIndexOf('/')), { recursive: true });
    writeFileSync(out, body);
  }
  writeFileSync('worker.js', 'const F = ' + JSON.stringify(files) + ';\n' + LOGIC);
  console.log('built', Object.keys(files).join(' '));
}
