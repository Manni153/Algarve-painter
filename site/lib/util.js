'use strict';

const site = require('../data/site');
const images = require('../data/images.json');

// HTML-escape text content and attribute values.
function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const abs = (path) => site.baseUrl + path;

// wa.me link with a short prefilled message (defaults to the sitewide one).
const waHref = (message = site.whatsappMessage) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

// Phone number for display: non-breaking spaces so it never wraps.
const phoneHtml = () => esc(site.phoneDisplay).replace(/ /g, '&nbsp;');

// Join template fragments, dropping false/null/undefined.
const html = (parts) => parts.filter((p) => p !== false && p != null && p !== '').join('\n');
const map = (arr, fn) => (arr || []).map(fn).join('\n');

function jsonLd(obj) {
  // Escape "<" so a string can never close the script element.
  return `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
}

const imgUrl = (key, width) => `/assets/img/${key}-${width}.webp`;

// Responsive <picture>. `sizes` must describe the rendered width so the
// browser picks the smallest adequate file. Above-the-fold images pass
// eager: true (no lazy loading); the LCP image also passes priority: true.
function picture(key, { alt, sizes = '100vw', eager = false, priority = false, className = '', imgClass = '' } = {}) {
  const meta = images[key];
  if (!meta) throw new Error(`Unknown image key "${key}" — add the photo to site/photos and run tools/site-images.py`);
  if (alt == null) throw new Error(`Image "${key}" needs alt text`);
  const srcset = meta.widths.map((w) => `${imgUrl(key, w)} ${w}w`).join(', ');
  return `<picture${className ? ` class="${className}"` : ''}><source type="image/webp" srcset="${srcset}" sizes="${sizes}"><img src="/assets/img/${key}-${meta.fallback}.jpg" alt="${esc(alt)}" width="${meta.width}" height="${meta.height}"${imgClass ? ` class="${imgClass}"` : ''} ${priority ? 'fetchpriority="high" ' : ''}${eager || priority ? '' : 'loading="lazy" '}decoding="async"></picture>`;
}

// Full-bleed hero with art direction: a portrait crop (<key>-portrait) on
// phones, the landscape original from 600px up. The portrait crop is 9:16,
// so on a typical phone it renders a little wider than the viewport (122vw).
// On a portrait tablet the landscape image is scaled to the hero's height,
// far wider than the viewport, so it asks for the largest file there.
function heroPicture(key, { alt, imgClass = '' }) {
  const land = images[key];
  const port = images[`${key}-portrait`];
  const set = (k, m) => m.widths.map((w) => `${imgUrl(k, w)} ${w}w`).join(', ');
  return `<picture>${port ? `<source media="(max-width: 599px)" type="image/webp" srcset="${set(`${key}-portrait`, port)}" sizes="122vw">` : ''}<source type="image/webp" srcset="${set(key, land)}" sizes="(max-width: 899px) 180vw, 100vw"><img src="/assets/img/${key}-${land.fallback}.jpg" alt="${esc(alt)}" width="${land.width}" height="${land.height}"${imgClass ? ` class="${imgClass}"` : ''} fetchpriority="high" decoding="async"></picture>`;
}

function preloadHero(key) {
  const land = images[key];
  const port = images[`${key}-portrait`];
  const set = (k, m) => m.widths.map((w) => `${imgUrl(k, w)} ${w}w`).join(', ');
  return (port ? `<link rel="preload" as="image" type="image/webp" media="(max-width: 599px)" imagesrcset="${set(`${key}-portrait`, port)}" imagesizes="122vw" fetchpriority="high">\n` : '') +
    `<link rel="preload" as="image" type="image/webp"${port ? ' media="(min-width: 600px)"' : ''} imagesrcset="${set(key, land)}" imagesizes="(max-width: 899px) 180vw, 100vw" fetchpriority="high">`;
}

// For <link rel="preload" as="image"> of the LCP image.
function preloadImage(key, sizes = '100vw') {
  const meta = images[key];
  const srcset = meta.widths.map((w) => `${imgUrl(key, w)} ${w}w`).join(', ');
  return `<link rel="preload" as="image" type="image/webp" imagesrcset="${srcset}" imagesizes="${sizes}" fetchpriority="high">`;
}

module.exports = { esc, abs, phoneHtml, waHref, html, map, jsonLd, picture, preloadImage, heroPicture, preloadHero, images };
