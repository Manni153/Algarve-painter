const fs = require('fs');
const path = require('path');
'use strict';

const site = require('../data/site');
const services = require('../data/services');
const { towns, regionGroups } = require('../data/towns');

const whatsappIcon = `<svg viewBox="0 0 24 24" fill="#3A241A" aria-hidden="true"><path d="M12.01 2C6.48 2 2 6.48 2 12.01c0 1.98.55 3.83 1.5 5.42L2 22l4.7-1.47a9.96 9.96 0 0 0 5.3 1.52h.01c5.53 0 10.01-4.48 10.01-10.02C22 6.48 17.53 2 12.01 2zm5.86 14.3c-.25.7-1.44 1.34-1.98 1.4-.5.06-1.02.28-3.42-.72-2.88-1.2-4.73-4.1-4.87-4.3-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.08.13.08.75-.17 1.45z"/></svg>`;

// Small, consistent-style line-icon set for feature/trust cards (the
// .icon-dot slot) — simple stroke icons on a 24x24 grid, not illustrative,
// colored via currentColor so they inherit whatever the surrounding
// component sets. Keyed by name so data files can just reference a name
// (e.g. icon: 'pin') rather than embedding markup.
const cardIcons = {
  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="11" rx="2.5"/><path d="M8 16.5v3l4-3"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></svg>`,
  tools: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5l-6 6 2.4 2.4 6-6a4 4 0 0 0 5-5.4l-2.6 2.6-2-2 2.6-2.6z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="7" r="2.2"/><circle cx="18" cy="7" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M7.8 8.3 10.5 16M16.2 8.3 13.5 16M8.2 7h7.6"/></svg>`,
};

function cardIcon(name) {
  return cardIcons[name] || '';
}

// Hero stats-row icons — hand-drawn, not from an icon set. Shared spec
// across all three: 24x24 viewBox, 2px stroke, round caps/joins, no fill
// on the stroked shape itself, generous corner radii, base colour
// #475569 (matches --hero2-steel), with exactly one small filled detail
// per icon in #DC143C (--hero2-crimson). Order matches the fixed
// English-Speaking / Locally-Based / Clean-Finish order both stat rows
// already render in (see heroStatIcons below), so no explicit
// name-to-stat mapping is needed.
// Redrawn one pass after shipping: the element box measured correctly at
// 26x26 (confirmed with Playwright) but the artwork itself only filled
// ~65-70% of the bubble/pin's 24-unit viewBox and as little as ~27% of
// the bolt's width — plenty of unused margin inside the box, which reads
// as a visibly smaller icon even though the box itself is exactly right.
// Paths below now extend much closer to the viewBox edges (leaving only
// enough clearance for the 2px stroke itself), so the visible ink
// actually approaches the full 26px box — confirmed via getBBox(), not
// just the element's own width/height.
const heroStatIcons = [
  // 1. Speech bubble (English-Speaking): soft, near-pill rounded body,
  // now spanning nearly the full viewBox width (was 17 of 24 units, now
  // 21). Tail stays a short, separate stroke sitting just below the body
  // with a visible gap — "slightly detached" — just pulled further down
  // to match the taller body. Crimson dot sits inside the body.
  `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#6E5647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="1.5" y="3" width="21" height="12.5" rx="6"/><path d="M6.6 17.4C5.7 19 4.2 20.4 2.3 21.3"/><circle cx="12" cy="9.25" r="1.5" fill="#C25A38" stroke="none"/></svg>`,
  // 2. Map pin (Locally-Based): same single closed teardrop shape, widened
  // and lengthened to reach much closer to the viewBox edges (was 13x18
  // of 24 units, now 15x20). Crimson dot centred in the rounded head.
  `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#6E5647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 2.3C7.7 2.3 4.3 5.8 4.3 10c0 5.9 7.7 12.7 7.7 12.7s7.7-6.8 7.7-12.7c0-4.2-3.4-7.7-7.7-7.7Z"/><circle cx="12" cy="9.7" r="1.6" fill="#C25A38" stroke="none"/></svg>`,
  // 3. Paint brush (Clean, Tidy Finish): replaces the sister site's
  // lightning bolt, which read as "fast" — the wrong idea for this stat.
  // Same construction rules as the two above: one stroked outline drawn
  // close to the viewBox edges (ferrule + bristles + handle spanning
  // ~19 of 24 units vertically), a single crimson detail, no fill on the
  // stroked shape. The stroke below the brush is the painted line it
  // leaves, which is what "finish" actually refers to.
  `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#6E5647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 1.6v5.2"/><rect x="7.4" y="6.8" width="9.2" height="4.4" rx="1.4"/><path d="M8.9 11.2v3.1c0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1v-3.1"/><path d="M2.6 22.2c3.1-1.4 15.7-1.4 18.8 0" stroke="#C25A38"/></svg>`,
];

// Service-card icons (desktop-only card rebuild) — hand-drawn, redrawn as a
// family: every icon is the same rounded-house outline (identical path,
// same proportions/position) containing one distinct inner element, so only
// the inner glyph changes card to card. 24x24 viewBox, 2.5px stroke, round
// caps/joins, fill none, single colour (white — these sit on a solid
// steel-blue block, no crimson accent on this set). Small dots/squares that
// need to read as solid (keypad buttons, antenna ball, camera lens) are
// filled white rather than stroked, same white as everything else — still
// "single colour", just filled instead of outlined for those tiny details.
// House outline and every inner element share one uniform 1.1x scale (about
// the 12,12 viewBox centre) versus the first pass, after the house read as
// slightly cramped at true render size — flame was nudged up afterwards
// specifically so its base doesn't cross the house's own floor line.
// Keyed by service slug (see data/services.js) rather than by index, so the
// mapping stays correct even if services.js is reordered.
const houseOutline = 'M2.1 20.8V9.8L12 2.1L21.9 9.8V20.8Z';
// One drawn icon per service, read from src/assets/brand at build time and
// inlined. They replaced seven line glyphs that were all the same house
// outline with a different squiggle inside — see tools/brand/icons.py. Read
// from disk rather than pasted in here so the generator stays the source of
// truth and a redraw is one command, not a hand-merge of seven path strings.
const serviceIcons = (() => {
  const dir = path.join(__dirname, '../assets/brand');
  const out = {};
  for (const f of fs.readdirSync(dir)) {
    const m = f.match(/^icon-(.+)\.svg$/);
    if (m) out[m[1]] = fs.readFileSync(path.join(dir, f), 'utf8').trim();
  }
  return out;
})();

function serviceIcon(slug) {
  return serviceIcons[slug] || '';
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// For trusted, hand-authored copy fields that intentionally contain inline
// <a> links (contextual cross-links between services/towns). Never use on
// anything that isn't a literal string written in our own data files.
function rich(str) {
  return String(str);
}

// Plain, unobtrusive image placeholder — clearly marked, not decorative.
// Real photography drops in later; this just needs to hold the space.
function placeholder(alt, { ratio } = {}) {
  const ratioClass = ratio ? ` ratio-${ratio}` : '';
  return `<div class="placeholder${ratioClass}" role="img" aria-label="${esc(alt)}">
    <span class="ph-label">${esc(alt)}</span>
  </div>`;
}

// Real-photography counterpart to placeholder() — same ratio classes and
// rounded-frame sizing, a real <picture> (WebP with a JPEG fallback)
// instead of the labelled placeholder box.
function photo(alt, { webp, jpg, ratio } = {}) {
  const ratioClass = ratio ? ` ratio-${ratio}` : '';
  return `<picture class="photo-frame${ratioClass}">
    <source type="image/webp" srcset="${webp}">
    <img src="${jpg}" alt="${esc(alt)}" loading="lazy">
  </picture>`;
}

function renderBreadcrumb(items) {
  if (!items || !items.length) return '';
  const parts = items
    .map((item, i) => {
      if (i === items.length - 1) return `<span>${esc(item.label)}</span>`;
      return `<a href="${item.href}">${esc(item.label)}</a>`;
    })
    .join(' &rsaquo; ');
  return `<p class="breadcrumb">${parts}</p>`;
}

// Headline-first hero, single column, stacked top to bottom:
// nav (rendered separately) -> small keyword H1 (crawlable, the real <h1>)
// -> large emotional headline (a separate, visually dominant heading, NOT
// the H1) -> practical subtext -> CTA -> supporting image. The image sits
// below the CTA, full width of the content column (not full-bleed), so it
// reads as evidence rather than a backdrop. Trust stats render as a
// separate band directly after, so they're the first thing seen on scroll.
// twoColDesktop opts a single page's hero into a real two-column layout at
// desktop widths (kicker/headline/subtext/CTA/note/trust-stats stacked in a
// left column, image filling the right column's full height) — currently
// used by the homepage only. Every other page keeps the single-column,
// stacked-then-image layout at every breakpoint. Mobile/tablet are
// unaffected either way: the split only activates at the desktop breakpoint.
// Hero art ships in several sizes per orientation (see
// tools/paint/hero_from_photo.py); each is the same name with a suffix before
// the extension, so the srcset can be derived rather than threaded through
// every call site. Only the paint hero goes through here — every page on the
// site shares it, so there is no other asset that would need the variants.
//
// Width descriptors, not DPR descriptors. The hero is full-bleed, so what the
// browser needs is viewport-width x DPR: a 390px phone at DPR 3 needs 1170px
// and is served the 1250px portrait file, while a 1024px tablet at DPR 2 needs
// 2048px and is served the largest one. A `2x` descriptor would instead hand
// that phone the largest file purely because of its pixel density.
//
// The portrait side carries three candidates rather than two. Its source is a
// photograph edge to edge, so it costs roughly three times what the old
// synthetic-ground art did at the same width, and it is the LCP image on the
// platform least able to afford it: the 850px candidate takes the DPR-2
// phones, which is most of them, and leaves 1250px to DPR 3.
const HERO_WIDTHS = {
  desktop: [['', 1500], ['@2x', 2048]],
  mobile: [['@sm', 850], ['', 1250], ['@2x', 1632]],
};
function heroVariant(src, suffix) {
  return suffix ? src.replace(/(\.[a-z0-9]+)$/i, suffix + '$1') : src;
}
function heroSrcset(src, kind) {
  return HERO_WIDTHS[kind].map(([suffix, w]) => `${heroVariant(src, suffix)} ${w}w`).join(', ');
}

function heroIntro({ alt, breadcrumb, h1Text, h1Html, headlineHtml, subtext, ctaNote, trustStats, desktopStatsText, mobileStatsText, image, twoColDesktop, noMedia, dark }) {
  // Mobile (<768px) uses trustStats' two-tier bold-value + caption-label
  // format (.v/.l); tablet+ (768px+) uses desktopStatsText's single
  // combined-line format (.vs) instead — both rendered into the same
  // markup when both are supplied, toggled by breakpoint via CSS (see
  // .page-home .hero-trust-band .v/.l/.vs in main.css), same "render
  // both, hide via CSS" pattern used elsewhere on this page. Pages
  // without trustStats (none currently) or without desktopStatsText fall
  // back to whichever one they do have.
  const statsHtml = trustStats
    ? `<div class="hero-trust-band${twoColDesktop ? ' hero-trust-band--split' : ''} bleed"><div class="container">${trustStats
        .map((s, i) => `<div class="stat">${heroStatIcons[i] || ''}<span class="v">${esc(s.value)}</span><span class="l">${esc(s.label)}</span>${desktopStatsText ? `<span class="vs">${esc(desktopStatsText[i])}</span>` : ''}</div>`)
        .join('')}</div></div>`
    : desktopStatsText
    ? `<div class="hero-trust-band${twoColDesktop ? ' hero-trust-band--split' : ''} bleed"><div class="container">${desktopStatsText
        .map((t, i) => `<div class="stat">${heroStatIcons[i] || ''}<span class="vs">${esc(t)}</span></div>`)
        .join('')}</div></div>`
    : '';

  // Desktop-only duplicate of the trust stats, rendered inside the text
  // column so it can sit in the left-column stack instead of the full-bleed
  // band above (which is hidden at desktop widths when twoColDesktop is on).
  // When desktopStatsText is supplied (homepage, latest pass) each entry is
  // one single-line combined string ("100% English-Speaking") rendered as
  // a single span — no separate bold-value/caption split — independent of
  // trustStats, which still drives the mobile/tablet band's original
  // two-line format unchanged.
  // mobileStatsText (mobile+tablet, <=1024px) vs desktopStatsText
  // (1025px+) — both rendered, toggled by breakpoint via CSS (.v-desktop/
  // .v-mobile, see main.css), same "render both, hide via CSS" pattern
  // used elsewhere on this page. Desktop stays a single combined-string
  // line ("100% English-Speaking"); mobile/tablet render each stat as
  // icon / value / label — three stacked rows, each a separate .v-mobile
  // span (both share the .v-mobile class so the existing display-toggle
  // and font-size rules in main.css apply to both without changes there).
  // Falls back to rendering desktopStatsText alone (old behaviour) when
  // no mobile-specific data is supplied.
  const inlineStatsHtml = twoColDesktop && desktopStatsText && mobileStatsText
    ? `<div class="hero-trust-inline">${desktopStatsText
        .map((t, i) => `<div class="stat">${heroStatIcons[i] || ''}<span class="v v-desktop">${esc(t)}</span><span class="v v-mobile v-mobile-value">${esc(mobileStatsText[i].value)}</span><span class="v v-mobile v-mobile-label">${esc(mobileStatsText[i].label)}</span></div>`)
        .join('')}</div>`
    : twoColDesktop && desktopStatsText
    ? `<div class="hero-trust-inline">${desktopStatsText
        .map((t, i) => `<div class="stat">${heroStatIcons[i] || ''}<span class="v">${esc(t)}</span></div>`)
        .join('')}</div>`
    : twoColDesktop && trustStats
    ? `<div class="hero-trust-inline">${trustStats
        .map((s, i) => `<div class="stat">${heroStatIcons[i] || ''}<span class="v">${esc(s.value)}</span><span class="l">${esc(s.label)}</span></div>`)
        .join('')}</div>`
    : '';

  const ctaNoteHtml = twoColDesktop && ctaNote ? `<p class="hero-cta-note">${esc(ctaNote)}</p>` : '';

  // When a real image is supplied, render a responsive <picture> (WebP with
  // a JPEG fallback) instead of the placeholder. Above-the-fold and
  // LCP-critical, so eager load with high fetch priority rather than the
  // below-the-fold lazy path.
  // Exactly ONE breakpoint, at 1025px — mobile and tablet (<=1024px) both
  // resolve to the same image.mobileWebp/mobileJpg source, desktop
  // (1025px+) gets its own image.desktopWebp/desktopJpg. Used to be three
  // tiers (a true-mobile-only image, a 768px+ tier covering tablet, and a
  // 1025px+-only desktop override) from when mobile/tablet were still
  // cropped from the desktop photo — collapsed to two once mobile/tablet
  // got their own purpose-composed image instead of a crop, since there's
  // no longer a reason for tablet to sit in its own tier between them.
  // <source> elements are evaluated in order and the first match wins, so
  // the 1025px+ (desktop) source has to render first. home.js, all 7
  // service.js pages and all 22 town.js pages supply `image` now that
  // every service/town has its own hero photography; about.js, contact.js
  // and how-we-work.js pass noMedia instead (see below) rather than
  // leaving `image` undefined, so the placeholder branch below is
  // currently unreachable in practice — kept as a safety fallback for any
  // future page that adds a hero without photography yet.
  // noMedia (About/Contact/How We Work only): these pages have no
  // photography at all, so the media column — real image or dashed
  // placeholder box alike — is dropped entirely rather than rendering an
  // empty box. Paired with `dark`, which gives the now-image-less hero a
  // deliberate solid --ink background (the same dark-section treatment
  // used elsewhere for CTA bands/footer) instead of the default
  // transparent hero that would otherwise just show blank page background.
  // An `image.svg` hero is the illustrated Algarve scene rather than a
  // photograph. It needs none of the responsive plumbing below — one vector
  // file serves every width and DPR — so it takes a plain <img> and the two
  // cuts (wide for desktop, tall for mobile and tablet) are switched by the
  // same single 1025px breakpoint the photographs use.
  const mediaHtml = noMedia
    ? ''
    : image && image.svgWide
    ? `<picture>
        <source media="(min-width: 1025px)" type="image/svg+xml" srcset="${image.svgWide}">
        <img src="${image.svgTall}" alt="${esc(alt)}" loading="eager" fetchpriority="high">
      </picture>`
    : image
    ? `<picture>
        <source media="(min-width: 1025px)" type="image/webp" sizes="100vw" srcset="${heroSrcset(image.desktopWebp, 'desktop')}">
        <source media="(min-width: 1025px)" type="image/jpeg" sizes="100vw" srcset="${heroSrcset(image.desktopJpg, 'desktop')}">
        <source type="image/webp" sizes="100vw" srcset="${heroSrcset(image.mobileWebp, 'mobile')}">
        <img src="${image.mobileJpg}" sizes="100vw" srcset="${heroSrcset(image.mobileJpg, 'mobile')}" alt="${esc(alt)}"${image.objectPosition ? ` style="--hero-obj-pos: ${esc(image.objectPosition)};"` : ''} loading="eager" fetchpriority="high">
      </picture>`
    : placeholder(alt, {});

  return `
  <section class="hero-stack${twoColDesktop ? ' hero-stack--split' : ''}${dark ? ' hero-stack--dark' : ''} bleed">
    <div class="container">
      <div class="hero-stack-text">
        ${breadcrumb ? renderBreadcrumb(breadcrumb) : ''}
        <h1 class="hero-kicker">${h1Html || esc(h1Text)}</h1>
        <h2 class="hero-headline">${headlineHtml}</h2>
        <p class="hero-subtext">${esc(subtext)}</p>
        <a href="${site.telHref}" class="btn btn-lg btn-icon">${site.phoneDisplay}</a>
        ${ctaNoteHtml}
        ${inlineStatsHtml}
      </div>
      ${noMedia ? '' : `<div class="hero-stack-media">
        ${mediaHtml}
      </div>`}
    </div>
  </section>
  ${statsHtml}`;
}

// Small reassurance callout addressing hesitation directly — meant to sit
// right after the hero/CTA, before the page moves into main content.
function reassuranceBand({ heading, body }) {
  return `
  <section class="reassurance-band">
    <div class="container narrow">
      <h2>${esc(heading)}</h2>
      ${body ? `<p>${esc(body)}</p>` : ''}
    </div>
  </section>`;
}

// Desktop-only (1025px+, see main.css) nav bar for the white header: a
// Home link, a Services dropdown (the 7 service pages), Service Areas
// (the homepage's own #areas section — there's no standalone town-hub
// page), About and Contact. Called whenever useHeaderChrome is true, which
// as of the design-system rollout is every one of the 33 pages (all 7
// services + all 22 towns are in their respective pilot sets, plus
// home/about/contact/how-we-work) — this is the one shared desktop nav.
// Service Areas links to the absolute /#areas rather than a bare #areas so
// it still resolves correctly (navigates to the homepage, then scrolls)
// when clicked from any page other than the homepage itself.
function renderHomeHeaderNav() {
  const dropdownLinks = site.headerServiceNav
    .map((s) => `<a href="${s.href}">${esc(s.label)}</a>`)
    .join('');
  return `
      <nav class="home-header-nav" aria-label="Primary">
        <a href="/" class="home-header-nav-link">Home</a>
        <div class="home-header-nav-item">
          <button type="button" class="home-header-nav-trigger" data-dropdown-trigger aria-haspopup="true" aria-expanded="false">Services</button>
          <div class="home-header-dropdown"><div class="home-header-dropdown-panel">${dropdownLinks}</div></div>
        </div>
        <a href="/#areas" class="home-header-nav-link">Service Areas</a>
        <a href="/about" class="home-header-nav-link">About</a>
        <a href="/contact" class="home-header-nav-link">Contact</a>
      </nav>`;
}

// Shared by both the header and (on the homepage only) the footer wordmark,
// so the accent-mark SVG and its markup structure never drift between the
// two instances — one string to keep in sync instead of two. The mark is a
// brush-sweep arc (echoing the favicon), absolutely positioned inside a
// relatively-positioned wrapper around just the "P" glyph, so it floats
// above without affecting line height/layout in either context.
function wordmarkHtml(isHome) {
  // Hand-painted treatment: "Algarve" in the rounded display face, "Painter"
  // set in the brush-script face and underscored with a rough, tapered
  // brushstroke drawn as a filled path (not a stroked line, so the ends and
  // the belly of the stroke can carry real bristle-loaded weight variation).
  // The stroke is absolutely positioned out of flow inside .wordmark-h-wrap,
  // so it never affects line height or wrapping in the header or footer.
  // The mascot rides in front of the wordmark: it is the mark that makes the
  // header unmistakable, and it is the one element repeated at every size
  // from the 32px favicon up. Inlined as an <img> rather than inline SVG so
  // the same file serves the header, the footer and the icons without three
  // copies of the path data in every page.
  return `<img class="wordmark-mascot" src="/assets/brand/mascot.svg" alt="" aria-hidden="true" width="44" height="44"> Algarve <span class="accent"><span class="wordmark-h-wrap">Painter<svg class="wordmark-brush" viewBox="0 0 120 16" fill="none" aria-hidden="true" focusable="false" preserveAspectRatio="none"><path d="M2.5 10.2c14-3.4 30.6-5.1 49.8-5.1 19.2 0 39.3 1.9 60.3 5.7-6.6.4-13.6.6-21 .6-16.1 0-33.6-.9-52.5-2.7-13.3-1.3-25.5-1.8-36.6-1.5Z" fill="#C25A38"/></svg></span></span>`;
}



// isHome adds a site-header--home class so the homepage's white-header
// treatment (see main.css) can be scoped without touching the header on
// any of the other 32 pages, which all still get the plain dark header.
function renderHeader(isHome) {
  const headerNavLinks = site.headerServiceNav
    .map((s) => `<li><a href="${s.href}">${esc(s.label)}</a></li>`)
    .join('');
  return `
  <nav class="site-header${isHome ? ' site-header--home' : ''} bleed" aria-label="Primary">
    <div class="container">
      <a href="/" class="wordmark">${wordmarkHtml(isHome)}</a>
      <ul class="header-nav">${headerNavLinks}</ul>
      ${isHome ? renderHomeHeaderNav() : ''}
      <div class="header-actions">
        <a href="${site.telHref}" class="header-phone" aria-label="Call Algarve Painter">
          <span class="icon" aria-hidden="true"></span><span class="phone-digits">${site.phoneDisplay}</span>
        </a>
        <button type="button" class="hamburger" data-nav-open aria-expanded="false" aria-controls="nav-drawer" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>`;
}

function renderNavDrawer() {
  const serviceLinks = site.serviceNav
    .map((s) => `<li><a href="${s.href}">${esc(s.label)}</a></li>`)
    .join('');
  const companyLinks = site.companyNav
    .map((c) => `<li><a href="${c.href}">${esc(c.label)}</a></li>`)
    .join('');
  const townLinks = towns
    .map((t) => `<a href="/${t.slug}">${esc(t.name)}</a>`)
    .join('');

  return `
  <div class="nav-drawer" id="nav-drawer" data-nav-drawer>
    <nav class="nav-panel" aria-label="Main menu">
      <div class="nav-panel-top">
        <a href="/" class="wordmark">Algarve <span class="accent">Painter</span></a>
        <button type="button" class="nav-close" data-nav-close aria-label="Close menu">&#10005;</button>
      </div>

      <p class="nav-group-label">Home</p>
      <ul class="nav-list"><li><a href="/">Home</a></li></ul>

      <p class="nav-group-label">Services</p>
      <ul class="nav-list">${serviceLinks}</ul>

      <p class="nav-group-label">Areas We Cover</p>
      <div class="nav-list nav-towns-grid">${townLinks}</div>

      <p class="nav-group-label">Company</p>
      <ul class="nav-list">${companyLinks}</ul>

      <div class="nav-cta">
        <a href="${site.telHref}" class="btn btn-block btn-icon">${site.phoneDisplay}</a>
        <a href="${site.whatsappHref}" class="btn btn-outline btn-block" target="_blank" rel="noopener">WhatsApp Us</a>
      </div>
    </nav>
  </div>`;
}

function renderFooter(isHome) {
  const serviceLinks = services
    .map((s) => `<li><a href="/${s.slug}">${esc(s.name)}</a></li>`)
    .join('');
  const groups = regionGroups();
  const areaLinks = groups
    .map((g) => g.towns.map((t) => `<li><a href="/${t.slug}">${esc(t.name)}</a></li>`).join(''))
    .join('');
  const year = new Date().getFullYear();

  return `
  <footer class="site-footer bleed">
    <div class="container">
      <div class="footer-masthead">
        <div>
          <a href="/" class="wordmark">${wordmarkHtml(isHome)}</a>
          <p>English-speaking painting and decorating for homeowners and businesses across the Algarve.</p>
        </div>
        <a href="${site.telHref}" class="btn btn-icon">${site.phoneDisplay}</a>
      </div>
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Services</h4>
          <ul>${serviceLinks}</ul>
        </div>
        <div class="footer-col">
          <h4>Areas We Cover</h4>
          <ul>${areaLinks}</ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/how-we-work">How We Work</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Direct</h4>
          <ul>
            <li><a href="${site.telHref}">${esc(site.phoneDisplay)}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${year} Algarve Painter. All rights reserved.</p>
        <p>${esc(site.phoneDisplay)}</p>
      </div>
    </div>
  </footer>`;
}

function renderFloatingButtons() {
  return `
  <a href="${site.whatsappHref}" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat with Algarve Painter on WhatsApp">
    ${whatsappIcon}
  </a>`;
}

// Canonical business entity: one HousePainter (a LocalBusiness subtype),
// identified by
// a stable @id, injected into every page's JSON-LD by renderPage() below.
// Service-page and town-page Service schema reference it via
// `provider: { '@id': BUSINESS_ID }` instead of repeating the object.
// Deliberately minimal — name/telephone/url/image/areaServed only. No
// address (none is confirmed) and no certification/licensing claims.
const BUSINESS_ID = `${site.baseUrl}/#business`;
const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HousePainter',
  '@id': BUSINESS_ID,
  name: 'Algarve Painter',
  telephone: site.phoneTel,
  url: `${site.baseUrl}/`,
  image: `${site.baseUrl}/assets/icons/icon-512.png`,
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Algarve, Portugal',
  },
};

// Shared BreadcrumbList JSON-LD builder. Takes an ordered list of
// { name, item } steps (item omitted for a non-navigable step) and numbers
// the positions automatically, so every template builds its breadcrumb
// schema the same way instead of hand-rolling the itemListElement array.
function breadcrumbListSchema(steps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: steps.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      ...(step.item ? { item: step.item } : {}),
    })),
  };
}

// Title tags and meta descriptions are managed entirely outside this
// codebase (hosting-platform level) — deliberately not generated here.
// useHomeHeader lets a single non-homepage page (currently: the Lagos
// town page, a one-page pilot of the homepage's design system — see
// town.js) opt into the same white-header/dropdown-nav/Nunito-fonts
// treatment as the homepage, independent of mainClass/isHome. isHome
// itself still only reflects mainClass === 'page-home' — this doesn't
// make that page "the homepage" in any other sense (schema, mainClass,
// path are all untouched), it only reuses the header/footer/font chrome.
function renderPage({ path, bodyHtml, schema, mainClass, useHomeHeader, title, metaDescription }) {
  const isHome = mainClass === 'page-home';
  const useHeaderChrome = isHome || Boolean(useHomeHeader);
  // Trailing slash on every page, not just the homepage — matches
  // sitemap.xml's own entries (build.js) and the /_redirects rule that
  // 301s the no-slash form to this one, so the canonical tag always
  // already points at the form a crawler ends up on, no extra hop.
  // Centralized here (path is only ever read for this, nowhere else in
  // this function or file) rather than appending a slash to `path` at
  // each individual renderPage() call site, so no future page can add
  // itself without it.
  const canonicalPath = path.endsWith('/') ? path : `${path}/`;
  const canonical = `${site.baseUrl}${canonicalPath}`;
  // businessSchema renders on every page (not just those that pass their
  // own schema) — it's the single source other pages' Service schema
  // references via BUSINESS_ID, so it always needs to be resolvable.
  const schemaHtml = [businessSchema, ...(schema || [])]
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/<\/script/gi, '<\\/script')}</script>`)
    .join('\n');
  // Homepage typography test (Nunito/Nunito Sans) — gated on
  // useHeaderChrome (was isHome directly) the same way renderHeader's
  // homepage-style markup is, so none of the other 31 pages make this
  // extra request. To roll this out site-wide later: change
  // `useHeaderChrome ?` below to `true ?` (or drop the ternary) —
  // nothing else about this block, or the CSS that consumes it, needs to
  // move or be duplicated per page.
  const homeFontsLink = useHeaderChrome
    ? ''
    : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${title ? `<title>${esc(title)}</title>\n` : ''}${metaDescription ? `<meta name="description" content="${esc(metaDescription)}">\n` : ''}<link rel="canonical" href="${canonical}">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Algarve Painter">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.baseUrl}/assets/icons/icon-512.png">
<meta name="twitter:card" content="summary">
<meta name="twitter:image" content="${site.baseUrl}/assets/icons/icon-512.png">
<meta name="theme-color" content="#fbf6ec">
${homeFontsLink}
<link rel="stylesheet" href="/assets/css/main.css">
${schemaHtml}
</head>
<body>
${renderHeader(useHeaderChrome)}
${renderNavDrawer()}
<main${mainClass ? ` class="${mainClass}"` : ''}>
${bodyHtml}
</main>
${renderFooter(useHeaderChrome)}
${renderFloatingButtons()}
<script src="/assets/js/main.js"></script>
</body>
</html>`;
}

module.exports = {
  esc,
  rich,
  placeholder,
  photo,
  heroIntro,
  reassuranceBand,
  renderPage,
  renderBreadcrumb,
  cardIcon,
  serviceIcon,
  BUSINESS_ID,
  breadcrumbListSchema,
};
