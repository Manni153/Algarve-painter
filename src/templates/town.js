'use strict';

const site = require('../data/site');
const services = require('../data/services');
const { nearbyTowns } = require('../data/towns');
const { esc, rich, placeholder, photo, heroIntro, renderPage, serviceIcon, BUSINESS_ID, breadcrumbListSchema } = require('./layout');

// Design-system rollout: applies the homepage's finalized visual system
// (colours, typography, buttons, service cards, hero gradient/text-shadow,
// nav/dropdown — see main.css's ".page-lagos-rs" block, named for the pilot
// town it started on) to town pages approved for it, one at a time. Every
// town NOT in this set is byte-for-byte unchanged — this set is the only
// thing that branches their otherwise-shared rendering logic. Hero and
// description photography are supplied independently per town (see
// TOWN_HERO_PHOTO/TOWN_DESCRIPTION_PHOTO below) — towns without their own
// photos yet still render the standard placeholder box in that slot.
const DESIGN_SYSTEM_PILOT_SLUGS = new Set(['lagos', 'praia-da-luz', 'sagres', 'aljezur', 'alvor', 'portimao', 'ferragudo', 'lagoa', 'carvoeiro', 'silves', 'monchique', 'albufeira', 'vilamoura', 'quarteira', 'loule', 'almancil', 'faro', 'olhao', 'sao-bras-de-alportel', 'tavira', 'castro-marim', 'vila-real-de-santo-antonio']);

// Services-first rollout: moves the "What We Install" services card grid
// (matching the homepage's own section order) to sit directly under the
// hero, ahead of "Local to <town>" and the rest — rolled out one town at a
// time same as DESIGN_SYSTEM_PILOT_SLUGS above, starting with the pilot
// town (Lagos) and now covering every town. Towns NOT in this set would
// keep the original section order untouched, but none remain.
const SERVICES_FIRST_SLUGS = new Set(['lagos', 'praia-da-luz', 'sagres', 'aljezur', 'alvor', 'portimao', 'ferragudo', 'lagoa', 'carvoeiro', 'silves', 'monchique', 'albufeira', 'vilamoura', 'quarteira', 'loule', 'almancil', 'faro', 'olhao', 'sao-bras-de-alportel', 'tavira', 'castro-marim', 'vila-real-de-santo-antonio']);

// Per-town full-bleed hero photography. Every town currently shares the
// same villa-facade pair (also used on the homepage and every service
// page) rather than dedicated per-town photography. When a real photo of
// work in a given town is available, replace that town's entry here and
// nothing else has to change.
const TOWN_HERO = {
  mobileWebp: '/assets/images/hero-paint-mobile.webp',
  mobileJpg: '/assets/images/hero-paint-mobile.jpg',
  desktopWebp: '/assets/images/hero-paint-desktop.webp',
  desktopJpg: '/assets/images/hero-paint-desktop.jpg',
};
const TOWN_HERO_PHOTO = {
  'lagos': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Lagos, Algarve' },
  'praia-da-luz': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Praia da Luz, Algarve' },
  'sagres': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Sagres, Algarve' },
  'aljezur': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Aljezur, Algarve' },
  'alvor': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Alvor, Algarve' },
  'portimao': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Portimão, Algarve' },
  'ferragudo': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Ferragudo, Algarve' },
  'lagoa': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Lagoa, Algarve' },
  'carvoeiro': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Carvoeiro, Algarve' },
  'silves': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Silves, Algarve' },
  'monchique': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Monchique, Algarve' },
  'albufeira': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Albufeira, Algarve' },
  'vilamoura': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Vilamoura, Algarve' },
  'quarteira': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Quarteira, Algarve' },
  'loule': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Loulé, Algarve' },
  'almancil': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Almancil, Algarve' },
  'faro': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Faro, Algarve' },
  'olhao': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Olhão, Algarve' },
  'sao-bras-de-alportel': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — São Brás de Alportel, Algarve' },
  'tavira': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Tavira, Algarve' },
  'castro-marim': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Castro Marim, Algarve' },
  'vila-real-de-santo-antonio': { ...TOWN_HERO, alt: 'Thick impasto brushstrokes in ochre, rose, orange, plum and burgundy on canvas — Vila Real de Santo António, Algarve' },
};

// Per-town "Local to <town>" description photo — genuinely different per
// town, unlike the shared hero above.
const TOWN_DESCRIPTION_PHOTO = {
  'lagos': {
    webp: '/assets/images/lagos-villa-terrace.webp',
    jpg: '/assets/images/lagos-villa-terrace.jpg',
    alt: 'Painted villa terrace overlooking the coast near Lagos',
  },
  'praia-da-luz': {
    webp: '/assets/images/praia-da-luz-villa-terrace.webp',
    jpg: '/assets/images/praia-da-luz-villa-terrace.jpg',
    alt: 'Terrace and rendered wall of a Praia da Luz holiday villa',
  },
  'sagres': {
    webp: '/assets/images/sagres-villa-terrace.webp',
    jpg: '/assets/images/sagres-villa-terrace.jpg',
    alt: 'Wind-exposed painted terrace on a property near Sagres',
  },
  'aljezur': {
    webp: '/assets/images/aljezur-villa-terrace.webp',
    jpg: '/assets/images/aljezur-villa-terrace.jpg',
    alt: 'Rendered terrace of a rural property near Aljezur',
  },
  'alvor': {
    webp: '/assets/images/alvor-villa-terrace.webp',
    jpg: '/assets/images/alvor-villa-terrace.jpg',
    alt: 'Whitewashed terrace wall on a property in Alvor',
  },
  'portimao': {
    webp: '/assets/images/portimao-villa-terrace.webp',
    jpg: '/assets/images/portimao-villa-terrace.jpg',
    alt: 'Painted apartment terrace overlooking Portimão',
  },
  'ferragudo': {
    webp: '/assets/images/ferragudo-villa-terrace.webp',
    jpg: '/assets/images/ferragudo-villa-terrace.jpg',
    alt: 'Painted terrace of a village property in Ferragudo',
  },
  'lagoa': {
    webp: '/assets/images/lagoa-villa-terrace.webp',
    jpg: '/assets/images/lagoa-villa-terrace.jpg',
    alt: 'Villa terrace and boundary wall in the Lagoa municipality',
  },
  'carvoeiro': {
    webp: '/assets/images/carvoeiro-villa-terrace.webp',
    jpg: '/assets/images/carvoeiro-villa-terrace.jpg',
    alt: 'Holiday villa terrace above the cliffs at Carvoeiro',
  },
  'silves': {
    webp: '/assets/images/silves-villa-terrace.webp',
    jpg: '/assets/images/silves-villa-terrace.jpg',
    alt: 'Terrace of an inland property near Silves',
  },
  'monchique': {
    webp: '/assets/images/monchique-villa-terrace.webp',
    jpg: '/assets/images/monchique-villa-terrace.jpg',
    alt: 'Rendered terrace of a hillside property in Monchique',
  },
  'albufeira': {
    webp: '/assets/images/albufeira-villa-terrace.webp',
    jpg: '/assets/images/albufeira-villa-terrace.jpg',
    alt: 'Painted terrace of a holiday property in Albufeira',
  },
  'vilamoura': {
    webp: '/assets/images/vilamoura-villa-terrace.webp',
    jpg: '/assets/images/vilamoura-villa-terrace.jpg',
    alt: 'Estate villa terrace and painted wall in Vilamoura',
  },
  'quarteira': {
    webp: '/assets/images/quarteira-villa-terrace.webp',
    jpg: '/assets/images/quarteira-villa-terrace.jpg',
    alt: 'Seafront apartment terrace and railing in Quarteira',
  },
  'loule': {
    webp: '/assets/images/loule-villa-terrace.webp',
    jpg: '/assets/images/loule-villa-terrace.jpg',
    alt: 'Terrace of a countryside property near Loulé',
  },
  'almancil': {
    webp: '/assets/images/almancil-villa-terrace.webp',
    jpg: '/assets/images/almancil-villa-terrace.jpg',
    alt: 'Large villa terrace and painted boundary wall near Almancil',
  },
  'faro': {
    webp: '/assets/images/faro-villa-terrace.webp',
    jpg: '/assets/images/faro-villa-terrace.jpg',
    alt: 'Painted terrace of a property on the outskirts of Faro',
  },
  'olhao': {
    webp: '/assets/images/olhao-villa-terrace.webp',
    jpg: '/assets/images/olhao-villa-terrace.jpg',
    alt: 'Flat roof terrace of a town house in Olhão',
  },
  'sao-bras-de-alportel': {
    webp: '/assets/images/sao-bras-de-alportel-villa-terrace.webp',
    jpg: '/assets/images/sao-bras-de-alportel-villa-terrace.jpg',
    alt: 'Terrace of an inland property near São Brás de Alportel',
  },
  'tavira': {
    webp: '/assets/images/tavira-villa-terrace.webp',
    jpg: '/assets/images/tavira-villa-terrace.jpg',
    alt: 'Painted terrace of a historic town house in Tavira',
  },
  'castro-marim': {
    webp: '/assets/images/castro-marim-villa-terrace.webp',
    jpg: '/assets/images/castro-marim-villa-terrace.jpg',
    alt: 'Terrace of a property near the Guadiana at Castro Marim',
  },
  'vila-real-de-santo-antonio': {
    webp: '/assets/images/vila-real-de-santo-antonio-villa-terrace.webp',
    jpg: '/assets/images/vila-real-de-santo-antonio-villa-terrace.jpg',
    alt: 'Terrace overlooking the Guadiana at Vila Real de Santo António',
  },
};
// Short line under the hero CTA button, varied across towns.
const CTA_NOTES = [
  'Call about your property — straight answer, no pressure.',
  'One quick call tells you what makes sense here.',
  'Describe the property — get a clear answer in plain English.',
  'No pressure — just a clear answer about your options.',
  'A five-minute call is enough to point you right.',
];
const TOWN_CTA_NOTE = {
  'lagos': 0, 'praia-da-luz': 1, 'sagres': 2, 'aljezur': 3, 'alvor': 4,
  'portimao': 0, 'ferragudo': 1, 'lagoa': 2, 'carvoeiro': 3, 'silves': 4,
  'monchique': 0, 'albufeira': 1, 'vilamoura': 2, 'quarteira': 3, 'loule': 4,
  'almancil': 0, 'faro': 1, 'olhao': 2, 'sao-bras-de-alportel': 3, 'tavira': 4,
  'castro-marim': 0, 'vila-real-de-santo-antonio': 1,
};

// Keyword -> service page map, used to turn a first natural mention of a
// service inside a town's prose into a real link, without hand-editing 22
// town entries. Matched in this order; each service links at most once per
// page so the prose doesn't turn into a wall of links.
const SERVICE_KEYWORDS = [
  { re: /\brender(?: repair)?\b/i, slug: 'render-crack-repair' },
  { re: /\bcrack(?:ing|s)?\b/i, slug: 'render-crack-repair' },
  { re: /\bmetalwork\b|\brailings?\b|\bbalustrades?\b/i, slug: 'metalwork-railing-painting' },
  { re: /\bshutters?\b|\btimber\b/i, slug: 'wood-shutter-treatment' },
  { re: /\bpool (?:surround|terrace)\b/i, slug: 'villa-pool-area-painting' },
  { re: /\b(?:flat )?roof terraces?\b|\bwaterproof\w*\b/i, slug: 'waterproof-roof-coating' },
  { re: /\binteriors?\b/i, slug: 'interior-painting' },
  { re: /\bexteriors?\b/i, slug: 'exterior-house-painting' },
];

function linkifyServices(text, linkedSlugs) {
  let result = text;
  for (const kw of SERVICE_KEYWORDS) {
    if (linkedSlugs.has(kw.slug)) continue;
    if (kw.re.test(result)) {
      result = result.replace(kw.re, (match) => `<a href="/${kw.slug}">${match}</a>`);
      linkedSlugs.add(kw.slug);
    }
  }
  return result;
}

function linkifyTownNames(text, nearby) {
  let result = text;
  for (const t of nearby) {
    // Word-boundary-safe replace of the first mention only.
    const re = new RegExp(`\\b${t.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
    if (re.test(result)) {
      result = result.replace(re, `<a href="/${t.slug}">${t.name}</a>`);
    }
  }
  return result;
}

function renderTown(town) {
  const isDesignSystemPilot = DESIGN_SYSTEM_PILOT_SLUGS.has(town.slug);
  // Hero and "Local to <town>" photography are supplied independently, on
  // each town's own schedule — both fall back to the standard placeholder
  // box until a town's own photos are supplied (see TOWN_HERO_PHOTO /
  // TOWN_DESCRIPTION_PHOTO above).
  const heroPhoto = TOWN_HERO_PHOTO[town.slug];
  const descriptionPhoto = TOWN_DESCRIPTION_PHOTO[town.slug];

  const serviceRows = services
    .map(
      (s) => `<a href="/${s.slug}">
        <h3>${esc(s.name)} in ${esc(town.name)}</h3>
        <span class="arrow">&rarr;</span>
      </a>`
    )
    .join('');

  // Markup for the "Most Relevant" card grid — the one section on a town
  // page that already matches the homepage's #services card structure
  // (a card-grid.cols-3 of linked cards). Was previously limited to the
  // 3 services in town.relevantServices ("most relevant" for that town's
  // property mix), which under-rendered against the homepage's own
  // #services section (all 7, always) — services are a shared data source
  // (services.js), not a per-page hardcoded list, so the fix applies here
  // for every town: all 7 services now render, using the town-specific
  // relevance reason where one is curated and falling back to the
  // service's own homepage copy (heroSubhead) for the rest — the same
  // fallback text the homepage's own cards use. On the pilot page, this
  // gets the homepage's exact card internals (icon tile + arrow-icon
  // "Learn more" pill) so main.css's .page-lagos-rs #services rules —
  // mirroring .page-home #services exactly — have the same elements to
  // style. Every other town keeps the original plain card (heading +
  // reason + text-arrow link), just with all 7 now instead of 3.
  const relevantCards = services
    .map((s) => {
      const curated = (town.relevantServices || []).find((r) => r.slug === s.slug);
      const reasonText = curated ? curated.reason : s.heroSubhead;
      if (isDesignSystemPilot) {
        return `<a href="/${s.slug}" class="card">
          <div class="card-icon-block">${serviceIcon(s.slug)}</div>
          <h3>${esc(s.name)} in ${esc(town.name)}</h3>
          <p>${esc(reasonText)}</p>
          <span class="card-link"><span class="card-link-label">Learn more</span><svg class="card-link-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9.25"/><path d="M9.2 8.3 13.4 12 9.2 15.7"/></svg></span>
        </a>`;
      }
      return `<a href="/${s.slug}" class="card">
        <h3>${esc(s.name)} in ${esc(town.name)}</h3>
        <p>${esc(reasonText)}</p>
        <span class="card-link">Learn more &rarr;</span>
      </a>`;
    })
    .join('');

  const nearby = nearbyTowns(town.slug, 3);
  const nearbyLine = nearby
    .map((t) => `<a href="/${t.slug}">${esc(t.name)}</a>`)
    .join('<span class="sep">&middot;</span>');

  // Cross-link a first natural mention of a service within the prose, and
  // the nearby-town names already named in the proximity paragraph.
  const linkedSlugs = new Set();
  const propertyProfileHtml = linkifyServices(esc(town.propertyProfile), linkedSlugs);
  const concernsHtml = linkifyServices(esc(town.concerns), linkedSlugs);
  const proximityHtml = linkifyTownNames(esc(town.proximity), nearby);

  // Premium reframe — only present for towns with a genuinely distinct
  // property profile (e.g. Vilamoura's marina-vs-golf-estate split), so
  // this whole block is a no-op for the other 19 town pages.
  const premiumSubAreaItems = ((town.premiumProfile && town.premiumProfile.subAreas) || [])
    .map(
      (s, i) => `<div class="pillar">
        <span class="num">${String(i + 1).padStart(2, '0')}</span>
        <div><h3>${esc(s.heading)}</h3><p>${rich(s.text)}</p></div>
      </div>`
    )
    .join('');

  const faqItems = (town.faqs || [])
    .map(
      (f) => `<div class="faq-item">
        <h3>${esc(f.q)}</h3>
        <p>${esc(f.a)}</p>
      </div>`
    )
    .join('');

  const faqSchema = town.faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: town.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const breadcrumbSchema = breadcrumbListSchema([
    { name: 'Home', item: `${site.baseUrl}/` },
    { name: 'Areas We Cover', item: `${site.baseUrl}/#areas` },
    { name: town.name, item: `${site.baseUrl}/${town.slug}` },
  ]);

  // Service schema mirrors service.js's — ties this page to the canonical
  // business entity via @id — but scoped to this one town rather than one
  // service, since a town page covers all seven services together.
  const townServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Painting & Decorating',
    name: `Painting & Decorating in ${town.name}`,
    provider: { '@id': BUSINESS_ID },
    areaServed: {
      '@type': 'City',
      name: town.name,
    },
  };

  const hero = heroIntro({
    alt: heroPhoto
      ? heroPhoto.alt
      : `[Placeholder: exterior wall being repainted on a property in ${town.name}]`,
    breadcrumb: [{ label: 'Home', href: '/' }, { label: town.name }],
    h1Text: `Painting & Decorating in ${town.name}`,
    headlineHtml: esc(town.heroHeadline),
    subtext: town.heroSubtext,
    // Dropped on the design-system pilot page only, matching the
    // homepage's own hero (which never passes a ctaNote at all) — every
    // other town keeps its note unchanged.
    ctaNote: isDesignSystemPilot ? undefined : CTA_NOTES[TOWN_CTA_NOTE[town.slug] ?? 0],
    // Same trust-stats row as the homepage hero, reusing the same sitewide
    // data (site.js) — pilot page only, so every other town's hero is
    // unaffected (heroIntro renders nothing here when these are undefined).
    trustStats: isDesignSystemPilot ? site.trustStats : undefined,
    desktopStatsText: isDesignSystemPilot ? site.heroStatsDesktop : undefined,
    mobileStatsText: isDesignSystemPilot ? site.heroStatsShort : undefined,
    // Full-bleed split hero (the homepage's own hero mechanism — gradient
    // scrim, text-shadow, breakpoint-specific direction) is opted into for
    // every design-system rollout town; every other town keeps its
    // original boxed, in-flow hero image untouched. Towns without their
    // own photography yet (see TOWN_HERO_PHOTO above) render the same
    // full-bleed shell with the standard placeholder box instead.
    image: heroPhoto
      ? {
          mobileWebp: heroPhoto.mobileWebp,
          mobileJpg: heroPhoto.mobileJpg,
          desktopWebp: heroPhoto.desktopWebp,
          desktopJpg: heroPhoto.desktopJpg,
        }
      : undefined,
    twoColDesktop: isDesignSystemPilot,
  });

  // Design-system pilot only: wraps a section's content in the homepage's
  // "emphasis block" panel (white rounded surface on the flat page
  // background — see .page-lagos-rs .rs-block in main.css). Every other
  // town keeps its plain/section-alt backgrounds untouched.
  const blockOpen = isDesignSystemPilot ? '<div class="rs-block">' : '';
  const blockClose = isDesignSystemPilot ? '</div>' : '';

  const isServicesFirst = SERVICES_FIRST_SLUGS.has(town.slug);

  const localToTownSection = `
  <section>
    <div class="container">
      ${blockOpen}<div class="two-col">
        <div class="two-col-text">
          <span class="eyebrow">Local to ${esc(town.name)}</span>
          <h2>Painting &amp; decorating in ${esc(town.name)}</h2>
          <p>${esc(town.name)} is ${esc(town.character)}. Whether it's a villa, apartment, holiday rental or commercial premises, the work is quoted around the condition of the actual surfaces — and every step is explained in English.</p>
          <p>${esc(town.context)}</p>
          <a href="${site.telHref}" class="btn btn-icon mt-32">${site.phoneDisplay}</a>
        </div>
        <div class="two-col-media">
          ${
            descriptionPhoto
              ? photo(descriptionPhoto.alt, { webp: descriptionPhoto.webp, jpg: descriptionPhoto.jpg, ratio: 'tall' })
              : placeholder(town.streetscapeAlt || `Street or coastal view of ${town.name}, Algarve`, { ratio: 'tall' })
          }
        </div>
      </div>${blockClose}
    </div>
  </section>`;

  const whatToKnowSection = `
  <section${isDesignSystemPilot ? '' : ' class="section-alt"'}>
    <div class="container">
      ${blockOpen}<div class="section-head">
        <span class="eyebrow">Painting in ${esc(town.name)}</span>
        <h2>What to know before painting in ${esc(town.name)}</h2>
      </div>
      <div class="narrow" style="margin: 0 auto;">
        <h3>Property Types &amp; Profile</h3>
        <p>${rich(propertyProfileHtml)}</p>
        <h3>What Owners Tend to Ask About</h3>
        <p>${rich(concernsHtml)}</p>
      </div>${blockClose}
    </div>
  </section>`;

  const inDetailSection = premiumSubAreaItems
    ? `
  <section id="in-detail">
          <div class="container">
            <div class="section-head">
              <span class="eyebrow">${esc(town.premiumProfile.eyebrow)}</span>
              <h2>${esc(town.premiumProfile.heading)}</h2>
              <p class="lede">${esc(town.premiumProfile.intro)}</p>
            </div>
            <div class="pillar-list mt-32">${premiumSubAreaItems}</div>
          </div>
        </section>`
    : '';

  // "What We Install" — same card-grid section as the homepage's own
  // #services. Ordered directly after the hero for towns in
  // SERVICES_FIRST_SLUGS (see note above); every other town keeps it
  // further down the page, after the "Local to <town>" / "What to know"
  // sections, as before.
  const whatWeInstallSection = relevantCards
    ? `
  <section${isDesignSystemPilot ? ' id="services"' : ''}>
          <div class="container">
            <div class="section-head">
              <span class="eyebrow">What We Do</span>
              <h2>Painting &amp; decorating services for ${esc(town.name)} properties</h2>
              <p class="lede">All seven services are available here, each scoped around how ${esc(town.name)} properties are actually built and exposed.</p>
            </div>
            <div class="card-grid cols-3">${relevantCards}</div>
            ${isDesignSystemPilot ? '<div class="carousel-progress" aria-hidden="true"><div class="carousel-progress-fill"></div></div>' : ''}
          </div>
        </section>`
    : '';

  const servicesListSection = `
  <section${isDesignSystemPilot ? '' : ' class="section-alt"'}>
    <div class="container">
      ${blockOpen}<div class="section-head">
        <span class="eyebrow">Services</span>
        <h2>What we do in ${esc(town.name)}</h2>
      </div>
      <div class="service-list">${serviceRows}</div>${blockClose}
    </div>
  </section>`;

  const faqSection = faqItems
    ? `
  <section id="faq">
          <div class="container">
            ${blockOpen}<div class="section-head">
              <span class="eyebrow">Questions</span>
              <h2>Frequently asked questions about ${esc(town.name)}</h2>
            </div>
            <div class="faq-list">${faqItems}</div>${blockClose}
          </div>
        </section>`
    : '';

  const nearbySection = `
  <section>
    <div class="container">
      ${blockOpen}<div class="section-head">
        <span class="eyebrow">Nearby</span>
        <h2>Also serving areas near ${esc(town.name)}</h2>
      </div>
      <div class="narrow" style="margin: 0 auto 32px;">
        <p>${rich(proximityHtml)}</p>
      </div>
      <div class="link-line center">${nearbyLine}</div>${blockClose}
    </div>
  </section>`;

  const ctaSection = isDesignSystemPilot
    ? `
  <section>
          <div class="container">
            <div class="cta-band rs-block">
              <span class="eyebrow">Get Started</span>
              <h2>Speak to Algarve Painter about your property in ${esc(town.name)}</h2>
              <p class="lede">Call now to talk through exteriors, interiors or repairs — in English, with no confusion.</p>
              <a href="${site.telHref}" class="btn btn-lg btn-icon">${site.phoneDisplay}</a>
            </div>
          </div>
        </section>`
    : `
  <section class="cta-band">
    <div class="container">
      <span class="eyebrow">Get Started</span>
      <h2>Speak to Algarve Painter about your property in ${esc(town.name)}</h2>
      <p class="lede">Call now to talk through exteriors, interiors or repairs — in English, with no confusion.</p>
      <a href="${site.telHref}" class="btn btn-lg btn-icon">${site.phoneDisplay}</a>
    </div>
  </section>`;

  const body = isServicesFirst
    ? `
  ${hero}
  ${whatWeInstallSection}
  ${localToTownSection}
  ${whatToKnowSection}
  ${inDetailSection}
  ${servicesListSection}
  ${faqSection}
  ${nearbySection}
  ${ctaSection}
  `
    : `
  ${hero}
  ${localToTownSection}
  ${whatToKnowSection}
  ${inDetailSection}
  ${whatWeInstallSection}
  ${servicesListSection}
  ${faqSection}
  ${nearbySection}
  ${ctaSection}
  `;

  return renderPage({
    path: `/${town.slug}`,
    bodyHtml: body,
    schema: [townServiceSchema, breadcrumbSchema, faqSchema].filter(Boolean),
    mainClass: isDesignSystemPilot ? 'page-lagos-rs' : undefined,
    useHomeHeader: isDesignSystemPilot,
    title: town.seoTitle,
    metaDescription: town.seoDescription,
  });
}

module.exports = renderTown;
