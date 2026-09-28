'use strict';

// Static site generator. No dependencies: `node site/build.js` renders every
// page from site/data + site/templates into /dist, ready for Netlify.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const site = require('./data/site');
const services = require('./data/services');
const locations = require('./data/locations');
const { assets } = require('./templates/layout');

const ROOT = __dirname;
const OUT = path.join(ROOT, '..', 'dist');

// ------------------------------------------------------------------ helpers

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// Copy a text asset under a content-hashed name so it can be cached forever.
function hashed(rel, transform = (x) => x) {
  const src = path.join(ROOT, 'assets', rel);
  const body = transform(fs.readFileSync(src, 'utf8'));
  const hash = crypto.createHash('sha256').update(body).digest('hex').slice(0, 10);
  const ext = path.extname(rel);
  const outRel = rel.replace(ext, `.${hash}${ext}`);
  fs.mkdirSync(path.dirname(path.join(OUT, 'assets', outRel)), { recursive: true });
  fs.writeFileSync(path.join(OUT, 'assets', outRel), body);
  return `/assets/${outRel}`;
}

// Conservative CSS minifier: comments and redundant whitespace only.
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function minifyJs(js) {
  return js
    .split('\n')
    .map((l) => l.replace(/^\s+/, ''))
    .filter((l) => l && !l.startsWith('//'))
    .join('\n');
}

// ------------------------------------------------------------------ validation

function validate() {
  const errors = [];
  const warnings = [];
  const serviceSlugs = new Set(services.map((s) => s.slug));
  const locSlugs = new Set(locations.map((l) => l.slug));
  for (const s of services) {
    for (const r of s.related) if (!serviceSlugs.has(r) || r === s.slug) errors.push(`${s.slug}: bad related slug "${r}"`);
  }
  for (const l of locations) {
    for (const n of l.nearby) if (!locSlugs.has(n) || n === l.slug) errors.push(`${l.slug}: bad nearby slug "${n}"`);
    for (const x of l.services) if (!serviceSlugs.has(x.slug)) errors.push(`${l.slug}: bad service slug "${x.slug}"`);
  }
  for (const p of [...services, ...locations]) {
    if (p.title.length > 60) warnings.push(`title over 60 chars (${p.title.length}): ${p.title}`);
    if (p.metaDescription.length > 160) warnings.push(`meta description over 160 chars: ${p.slug}`);
  }
  if (site.PLACEHOLDERS.phone) warnings.push('PHONE NUMBER IS A PLACEHOLDER: set phoneDisplay / phoneTel in site/data/site.js');
  if (site.PLACEHOLDERS.whatsapp) warnings.push('WHATSAPP NUMBER IS A PLACEHOLDER: set whatsappNumber in site/data/site.js (or whatsappEnabled: false)');
  return { errors, warnings };
}

// ------------------------------------------------------------------ build

function build() {
  const { errors, warnings } = validate();
  if (errors.length) {
    console.error('Build failed:\n  ' + errors.join('\n  '));
    process.exit(1);
  }

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  // Assets first, so templates can reference hashed filenames.
  assets.cssInline = minifyCss(fs.readFileSync(path.join(ROOT, 'assets', 'css', 'main.css'), 'utf8'));
  assets.js = hashed('js/main.js', minifyJs);
  copyDir(path.join(ROOT, 'assets', 'fonts'), path.join(OUT, 'assets', 'fonts'));
  copyDir(path.join(ROOT, 'assets', 'img'), path.join(OUT, 'assets', 'img'));
  copyDir(path.join(ROOT, 'static'), OUT);

  // Templates are required after the asset names are set.
  const renderHome = require('./templates/home');
  const renderService = require('./templates/service');
  const renderLocation = require('./templates/location');
  const pages = require('./templates/pages');
  const ctx = { services, locations };

  const routes = [
    ['/', () => renderHome(ctx), '1.0'],
    ...services.map((s) => [`/${s.slug}/`, () => renderService(s, ctx), s.slug === 'villa-painting' ? '0.9' : '0.8']),
    ...locations.map((l) => [`/painters-${l.slug}/`, () => renderLocation(l, ctx), '0.8']),
    ['/painting-services/', () => pages.servicesHub(ctx), '0.7'],
    ['/areas-we-cover/', () => pages.areasHub(ctx), '0.7'],
    ['/projects/', () => pages.projectsPage(ctx), '0.6'],
    ['/how-it-works/', () => pages.howItWorks(ctx), '0.5'],
    ['/about/', () => pages.about(ctx), '0.5'],
    ['/contact/', () => pages.contact(ctx), '0.6'],
    ['/privacy-policy/', () => pages.privacy(ctx), '0.2'],
  ];

  const seen = { titles: new Map(), descriptions: new Map() };
  for (const [route, render, priority] of routes) {
    const out = render();
    const title = (out.match(/<title>([^<]*)<\/title>/) || [])[1];
    const desc = (out.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    if (priority) {
      if (seen.titles.has(title)) warnings.push(`duplicate title on ${route} and ${seen.titles.get(title)}`);
      if (seen.descriptions.has(desc)) warnings.push(`duplicate description on ${route} and ${seen.descriptions.get(desc)}`);
      seen.titles.set(title, route);
      seen.descriptions.set(desc, route);
    }
    const dir = path.join(OUT, route);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), out);
  }
  fs.writeFileSync(path.join(OUT, '404.html'), pages.notFound(ctx));

  // sitemap.xml and robots.txt
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .filter(([, , p]) => p)
    .map(([route, , p]) => `  <url><loc>${site.baseUrl}${route}</loc><lastmod>${today}</lastmod><priority>${p}</priority></url>`)
    .join('\n');
  fs.writeFileSync(
    path.join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
  fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.baseUrl}/sitemap.xml\n`);

  // Netlify redirects: old URLs from the previous version of the site.
  const legacy = require('./data/redirects');
  fs.writeFileSync(
    path.join(OUT, '_redirects'),
    '# Generated by site/build.js from site/data/redirects.js\n' +
      legacy.map(([from, to]) => `${from.padEnd(36)} ${to.padEnd(36)} 301`).join('\n') +
      '\n'
  );

  console.log(`Built ${routes.length + 1} pages into dist/ (${services.length} services, ${locations.length} locations).`);
  for (const w of warnings) console.warn(`  ⚠ ${w}`);
}

build();
