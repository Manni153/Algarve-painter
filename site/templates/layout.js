'use strict';

const site = require('../data/site');
const { esc, phoneHtml, waHref, abs, jsonLd, preloadImage, preloadHero } = require('../lib/util');
const { icon } = require('../lib/icons');

// Filled in by build.js once asset hashes are known.
// The stylesheet is inlined into every page (about 7 KB compressed), which
// removes the only render-blocking request.
const assets = { cssInline: '', js: '/assets/js/main.js' };

// The number in the mobile header: the "+351" country code is hidden on the
// narrowest phones so logo, number and menu fit on one line (the tel: link
// always carries the full international number).
function headerNumber() {
  const m = site.phoneDisplay.match(/^(\+\d+)\s+(.*)$/);
  if (!m) return phoneHtml();
  return `<span class="header-call__cc">${esc(m[1])}&nbsp;</span>${esc(m[2]).replace(/ /g, '&nbsp;')}`;
}

function wordmark() {
  return `<a class="wordmark" href="/" aria-label="${esc(site.brand)}, home">
<svg class="wordmark__mark" width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" focusable="false"><rect x="1" y="1" width="32" height="32" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 26V14.5L17 8l9 6.5V26" fill="none" stroke="currentColor" stroke-width="1.4"/><rect x="14" y="17" width="6" height="9" fill="currentColor"/></svg>
<span class="wordmark__text"><span class="wordmark__name">${esc(site.brand)}</span><span class="wordmark__desc">${esc(site.brandDescriptor)}</span></span>
</a>`;
}

// Header: logo left; Home | Services | Areas | phone on the right. On phones
// the same list becomes the menu panel (Services and Areas as accordions,
// Call Us with the number), so the bar itself is just logo + menu button.
function header({ locations, transparent }) {
  const menus = {
    services: `<ul class="menu__list" role="list">${site.nav.services.map((s) => `<li><a href="${s.href}">${esc(s.label)}</a></li>`).join('')}<li class="menu__all"><a href="/painting-services/">All painting services ${icon('arrow', { size: 14 })}</a></li></ul>`,
    areas: `<ul class="menu__list menu__list--cols" role="list">${locations.map((l) => `<li><a href="/painters-${l.slug}/">${esc(l.name)}</a></li>`).join('')}<li class="menu__all"><a href="/areas-we-cover/">All areas we cover ${icon('arrow', { size: 14 })}</a></li></ul>`,
  };
  const menuItem = (label, href, key) => `<li class="nav__item nav__item--menu">
<a class="nav__link" href="${href}">${label}</a><button class="nav__toggle" type="button" aria-expanded="false" aria-controls="menu-${key}"><span class="visually-hidden">Show ${label.toLowerCase()} menu</span>${icon('chevron', { size: 18 })}</button>
<div class="menu" id="menu-${key}">${menus[key]}</div>
</li>`;
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header${transparent ? ' site-header--over' : ''}" data-header>
<div class="container site-header__inner">
${wordmark()}
<nav class="nav" id="site-nav" aria-label="Main">
<ul class="nav__list" role="list">
<li class="nav__item"><a class="nav__link" href="/">Home</a></li>
${menuItem('Services', '/painting-services/', 'services')}
${menuItem('Areas', '/areas-we-cover/', 'areas')}
<li class="nav__item nav__item--call"><a class="nav__call" href="${site.telHref}">${icon('phone', { size: 18 })}<span class="nav__call-label">Call Us</span><span class="nav__call-number">${phoneHtml()}</span></a></li>
</ul>
</nav>
<a class="header-call" href="${site.telHref}" aria-label="Call ${esc(site.phoneDisplay)}">${icon('phone', { size: 16 })}<span>${headerNumber()}</span></a>
<button class="nav-burger" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle><span class="visually-hidden">Menu</span>${icon('menu', { size: 24, className: 'icon nav-burger__open' })}${icon('close', { size: 24, className: 'icon nav-burger__close' })}</button>
</div>
</header>`;
}

function footer({ locations }) {
  const year = new Date().getFullYear();
  const ordered = [...locations].sort((a, b) => a.rank - b.rank);
  return `<footer class="site-footer">
<div class="container site-footer__grid">
<div class="site-footer__brand">
${wordmark()}
<p>English-speaking painters for villas, houses and apartments across the Algarve.</p>
</div>
<nav class="site-footer__col" aria-label="Footer"><h2 class="site-footer__title">Explore</h2><ul role="list">
<li><a href="/">Home</a></li><li><a href="/painting-services/">Services</a></li><li><a href="/areas-we-cover/">Areas</a></li>
</ul></nav>
<div class="site-footer__col"><h2 class="site-footer__title">Contact</h2><ul role="list" class="site-footer__contact">
<li><a href="${site.telHref}">${icon('phone', { size: 18 })}<span>${phoneHtml()}</span></a></li>
${site.whatsappEnabled ? `<li><a href="${waHref()}" target="_blank" rel="noopener">${icon('whatsapp', { size: 18 })}<span>WhatsApp</span></a></li>` : ''}
</ul></div>
<nav class="site-footer__col site-footer__col--areas" aria-label="Service areas"><h2 class="site-footer__title">Service areas</h2><ul role="list" class="site-footer__areas">${ordered.map((l) => `<li><a href="/painters-${l.slug}/">${esc(l.name)}</a></li>`).join('')}</ul></nav>
</div>
<div class="container site-footer__base">
<p>© ${year} ${esc(site.legalName)}. Interior &amp; exterior painting across the Algarve, Portugal.</p>
<ul class="site-footer__legal" role="list"><li><a href="/projects/">Projects</a></li><li><a href="/how-it-works/">How it works</a></li><li><a href="/about/">About</a></li><li><a href="/contact/">Contact</a></li><li><a href="/privacy-policy/">Privacy</a></li></ul>
${site.disclosure ? `<p class="site-footer__disclosure">${esc(site.disclosure)}</p>` : ''}
</div>
</footer>`;
}

// One floating WhatsApp button, bottom right, on every screen size: just
// the logo in a round button, never a bar. It is the only floating element.
function floatingWhatsApp() {
  if (!site.whatsappEnabled) return '';
  return `<a class="wa-float" href="${waHref()}" target="_blank" rel="noopener" aria-label="WhatsApp us">${icon('whatsapp', { size: 30, className: 'icon wa-float__icon' })}</a>`;
}

function localBusinessRef() {
  return { '@id': `${site.baseUrl}/#business` };
}

/**
 * Wrap page content in the full HTML document.
 *
 * @param {object} p
 * @param {string} p.path        canonical path with trailing slash
 * @param {string} p.title       unique <title>
 * @param {string} p.description unique meta description
 * @param {string} p.body        page content (inside <main>)
 * @param {string} [p.schema]    extra JSON-LD <script> blocks
 * @param {string} [p.ogImage]   absolute path to a 1200x630 image
 * @param {string} [p.lcpImage]  image key to preload (hero)
 * @param {string} [p.lcpSizes]  sizes for the preload
 * @param {boolean} [p.noindex]
 * @param {boolean} [p.overHero] header sits over a full-bleed hero
 * @param {Array} p.locations    for nav and footer
 */
function layout(p) {
  const url = abs(p.path);
  const ogImage = abs(p.ogImage || '/assets/img/og-algarve-villa-exterior-freshly-painted.jpg');
  return `<!DOCTYPE html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
${p.noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${url}">`}
${p.heroImage ? preloadHero(p.heroImage) : ''}${p.lcpImage ? preloadImage(p.lcpImage, p.lcpSizes) : ''}
<link rel="preload" href="/assets/fonts/fraunces-var.woff2" as="font" type="font/woff2" crossorigin>
<style>${assets.cssInline}</style>
<meta name="theme-color" content="#1c2427">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.brand)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
${p.schema || ''}
<script>document.documentElement.classList.add('js')</script>
</head>
<body class="${p.bodyClass || ''}">
${header({ locations: p.locations, transparent: p.overHero })}
<main id="main">
${p.body}
</main>
${footer({ locations: p.locations })}
${floatingWhatsApp()}
<script src="${assets.js}" defer></script>
</body>
</html>
`;
}

module.exports = { layout, assets, localBusinessRef };
