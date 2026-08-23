'use strict';

const fs = require('fs');
const path = require('path');

const site = require('./data/site');
const pricing = require('./data/pricing');
const services = require('./data/services');
const { towns } = require('./data/towns');

const renderHome = require('./templates/home');
const renderService = require('./templates/service');
const renderTown = require('./templates/town');
const renderAbout = require('./templates/about');
const renderContact = require('./templates/contact');
const renderHowWeWork = require('./templates/how-we-work');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public');

function rimraf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function writePage(urlPath, html) {
  const dir = urlPath === '/' ? OUT : path.join(OUT, urlPath.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function build() {
  rimraf(OUT);
  fs.mkdirSync(OUT, { recursive: true });

  const pages = [];

  // Homepage
  writePage('/', renderHome());
  pages.push({ loc: '/', priority: '1.0' });

  // Service pages
  services.forEach((service) => {
    writePage(`/${service.slug}`, renderService(service));
    pages.push({ loc: `/${service.slug}`, priority: service.flagship ? '0.9' : '0.8' });
  });

  // Town pages
  towns.forEach((town) => {
    writePage(`/${town.slug}`, renderTown(town));
    pages.push({ loc: `/${town.slug}`, priority: '0.7' });
  });

  // Supporting pages
  writePage('/how-we-work', renderHowWeWork());
  pages.push({ loc: '/how-we-work', priority: '0.5' });

  writePage('/about', renderAbout());
  pages.push({ loc: '/about', priority: '0.5' });

  writePage('/contact', renderContact());
  pages.push({ loc: '/contact', priority: '0.6' });

  // Static assets
  copyDir(path.join(__dirname, 'assets'), path.join(OUT, 'assets'));

  // Favicon files also served from the site root, alongside their
  // /assets/icons/ copies referenced by <link> tags in layout.js — root
  // placement is the fallback path browsers/crawlers request by default
  // when no <link rel="icon"> is found.
  fs.copyFileSync(path.join(__dirname, 'assets/icons/favicon.ico'), path.join(OUT, 'favicon.ico'));
  fs.copyFileSync(path.join(__dirname, 'assets/icons/apple-touch-icon.png'), path.join(OUT, 'apple-touch-icon.png'));

  // Netlify redirect rules (trailing-slash enforcement) — must sit at the
  // site root to be picked up by Netlify's redirect engine.
  fs.copyFileSync(path.join(__dirname, '_redirects'), path.join(OUT, '_redirects'));

  // sitemap.xml — every <loc> gets a trailing slash (p.loc itself is left
  // as-is, e.g. '/monchique', since writePage() above still needs the
  // no-slash form to build the right output folder) so every sitemap URL
  // matches its own page's canonical tag exactly and the form the
  // /_redirects rule treats as canonical, rather than the pre-redirect
  // form that 301s on the way in.
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${site.baseUrl}${p.loc.endsWith('/') ? p.loc : `${p.loc}/`}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap, 'utf8');

  // robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${site.baseUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(OUT, 'robots.txt'), robots, 'utf8');

  console.log(`Built ${pages.length} pages into ${path.relative(ROOT, OUT)}/`);

  // Loud, deliberate reminder while the site is still carrying the
  // placeholder phone number from src/data/site.js. That number is wired
  // into every CTA, the sticky mobile call bar, the WhatsApp link and the
  // LocalBusiness JSON-LD, so shipping with it would silently break every
  // conversion path on the site.
  if (site.PHONE_IS_PLACEHOLDER) {
    console.warn('');
    console.warn('  !!  PLACEHOLDER PHONE NUMBER STILL IN PLACE  !!');
    console.warn(`      Every CTA, the WhatsApp link and the JSON-LD use ${site.phoneDisplay}.`);
    console.warn('      Set phoneDisplay / phoneTel in src/data/site.js before going live.');
    console.warn('');
  }

  // Same treatment for the estimator's rates. A visitor reads the number it
  // produces as a real one, so shipping placeholder rates is worse than
  // shipping no estimator at all.
  if (pricing.RATES_ARE_PLACEHOLDER) {
    console.warn('  !!  PLACEHOLDER ESTIMATE RATES STILL IN PLACE  !!');
    console.warn('      The instant estimate on the homepage is quoting made-up euro-per-m2 bands.');
    console.warn('      Set them in src/data/pricing.js and clear RATES_ARE_PLACEHOLDER before going live.');
    console.warn('');
  }
}

build();
