'use strict';

const site = require('../data/site');
const services = require('../data/services');
const { regionGroups } = require('../data/towns');
const { esc, rich, placeholder, photo, heroIntro, renderPage, serviceIcon, BUSINESS_ID, breadcrumbListSchema } = require('./layout');

// Design-system set for service pages — mirrors the town-page set (see
// town.js's DESIGN_SYSTEM_PILOT_SLUGS): applies the homepage's visual
// system (full-bleed split hero, rs-block panels, icon-tile "Explore"
// cards, white header/nav chrome). All seven services are in it; the
// branch is kept so a future page can be added without inheriting it
// before its content is ready.
const SERVICE_DESIGN_SYSTEM_PILOT_SLUGS = new Set(['exterior-house-painting', 'interior-painting', 'villa-pool-area-painting', 'render-crack-repair', 'wood-shutter-treatment', 'metalwork-railing-painting', 'waterproof-roof-coating']);

// Minimal-images set — separate from the design-system set above. A page
// listed here drops the media column from its "Real-World Scenarios" and
// "In Detail" sections entirely, collapsing them to single-column layouts.
// All seven are listed while there is no painting-specific photography for
// those slots; remove a slug here once real photos exist for it, and its
// placeholder-backed media columns come back.
const SERVICE_MINIMAL_IMAGES_SLUGS = new Set(['exterior-house-painting', 'interior-painting', 'villa-pool-area-painting', 'render-crack-repair', 'wood-shutter-treatment', 'metalwork-railing-painting', 'waterproof-roof-coating']);

// Every service page uses the same full-bleed hero photography (the standard
// villa facade pair, also used on the homepage and every town page) rather
// than dedicated per-service shots. When real per-service photography is
// supplied, replace the entry for that slug here — nothing else changes.
const SHARED_HERO = {
  mobileWebp: '/assets/images/hero-paint-mobile.webp',
  mobileJpg: '/assets/images/hero-paint-mobile.jpg',
  desktopWebp: '/assets/images/hero-paint-desktop.webp',
  desktopJpg: '/assets/images/hero-paint-desktop.jpg',
  alt: 'Thick brushstrokes of terracotta, ochre and dusty pink paint swatched across a dark canvas',
};
const SERVICE_HERO_PHOTO = {
  'exterior-house-painting': SHARED_HERO,
  'interior-painting': SHARED_HERO,
  'villa-pool-area-painting': SHARED_HERO,
  'render-crack-repair': SHARED_HERO,
  'wood-shutter-treatment': SHARED_HERO,
  'metalwork-railing-painting': SHARED_HERO,
  'waterproof-roof-coating': SHARED_HERO,
};

// Per-service in-page photography for the two remaining media slots
// ("What's Included" and "Why It Matters"). These use the generic Algarve
// property photography in /assets/images rather than painting-specific
// shots — swap an entry here when a real photo of the work is available.
const SERVICE_DESCRIPTION_PHOTO = {
  'exterior-house-painting': {
    included: { webp: '/assets/images/lagos-villa-terrace.webp', jpg: '/assets/images/lagos-villa-terrace.jpg', alt: 'Rendered villa exterior on an Algarve hillside plot' },
    whyItMatters: { webp: '/assets/images/carvoeiro-villa-terrace.webp', jpg: '/assets/images/carvoeiro-villa-terrace.jpg', alt: 'Whitewashed holiday villa terrace above the coast' },
  },
  'interior-painting': {
    included: { webp: '/assets/images/faro-villa-terrace.webp', jpg: '/assets/images/faro-villa-terrace.jpg', alt: 'Bright interior terrace doors of an Algarve apartment' },
    whyItMatters: { webp: '/assets/images/tavira-villa-terrace.webp', jpg: '/assets/images/tavira-villa-terrace.jpg', alt: 'Painted interior walls of a restored Algarve town house' },
  },
  'villa-pool-area-painting': {
    included: { webp: '/assets/images/vilamoura-villa-terrace.webp', jpg: '/assets/images/vilamoura-villa-terrace.jpg', alt: 'Villa terrace and pool surround on an Algarve estate' },
    whyItMatters: { webp: '/assets/images/quarteira-villa-terrace.webp', jpg: '/assets/images/quarteira-villa-terrace.jpg', alt: 'Painted terrace walls overlooking the Algarve coast' },
  },
  'render-crack-repair': {
    included: { webp: '/assets/images/silves-villa-terrace.webp', jpg: '/assets/images/silves-villa-terrace.jpg', alt: 'Rendered wall of an inland Algarve property' },
    whyItMatters: { webp: '/assets/images/ferragudo-villa-terrace.webp', jpg: '/assets/images/ferragudo-villa-terrace.jpg', alt: 'Traditional rendered facade on an Algarve village house' },
  },
  'wood-shutter-treatment': {
    included: { webp: '/assets/images/monchique-villa-terrace.webp', jpg: '/assets/images/monchique-villa-terrace.jpg', alt: 'Timber shutters and joinery on an Algarve hill property' },
    whyItMatters: { webp: '/assets/images/aljezur-villa-terrace.webp', jpg: '/assets/images/aljezur-villa-terrace.jpg', alt: 'Exposed timber and rendered walls on a west-coast property' },
  },
  'metalwork-railing-painting': {
    included: { webp: '/assets/images/praia-da-luz-villa-terrace.webp', jpg: '/assets/images/praia-da-luz-villa-terrace.jpg', alt: 'Painted terrace railing on an Algarve coastal villa' },
    whyItMatters: { webp: '/assets/images/albufeira-villa-terrace.webp', jpg: '/assets/images/albufeira-villa-terrace.jpg', alt: 'Balcony railings overlooking the Algarve coast' },
  },
  'waterproof-roof-coating': {
    included: { webp: '/assets/images/olhao-villa-terrace.webp', jpg: '/assets/images/olhao-villa-terrace.jpg', alt: 'Flat roof terrace on an Algarve town house' },
    whyItMatters: { webp: '/assets/images/portimao-villa-terrace.webp', jpg: '/assets/images/portimao-villa-terrace.jpg', alt: 'Terrace and parapet on an Algarve apartment building' },
  },
};
function renderService(service) {
  const isPilot = SERVICE_DESIGN_SYSTEM_PILOT_SLUGS.has(service.slug);
  const isMinimalImages = SERVICE_MINIMAL_IMAGES_SLUGS.has(service.slug);
  // Design-system pilot only: wraps a section's content in the homepage's
  // "emphasis block" panel (white rounded surface on the flat page
  // background — see .page-lagos-rs .rs-block in main.css). Every other
  // service keeps its plain/section-alt backgrounds untouched.
  const blockOpen = isPilot ? '<div class="rs-block">' : '';
  const blockClose = isPilot ? '</div>' : '';

  const otherServices = services.filter((s) => s.slug !== service.slug);

  const includedList = service.included
    .map((item) => `<li>${esc(item)}</li>`)
    .join('');

  const extraCards = (service.extraSections || [])
    .map(
      (sec) => `<div class="card">
        <h3>${esc(sec.heading)}</h3>
        <p>${esc(sec.text)}</p>
      </div>`
    )
    .join('');

  const scenarioItems = (service.scenarios || [])
    .map(
      (s, i) => `<div class="pillar">
        <span class="num">${String(i + 1).padStart(2, '0')}</span>
        <div><h3>${esc(s.heading)}</h3><p>${esc(s.text)}</p></div>
      </div>`
    )
    .join('');

  const commonProblemCards = (service.commonProblems || [])
    .map(
      (p) => `<div class="card">
        <h3>&ldquo;${esc(p.symptom)}&rdquo;</h3>
        <p>${rich(p.text)}</p>
      </div>`
    )
    .join('');

  const propertyTypeCards = (service.propertyTypes || [])
    .map(
      (p) => `<div class="card">
        <h3>${esc(p.type)}</h3>
        <p>${esc(p.text)}</p>
      </div>`
    )
    .join('');

  const faqItems = (service.faqs || [])
    .map(
      (f) => `<div class="faq-item">
        <h3>${esc(f.q)}</h3>
        <p>${rich(f.a)}</p>
      </div>`
    )
    .join('');

  const deepDiveHtml = (service.deepDive || [])
    .map((d) => `<h3>${esc(d.heading)}</h3><p>${rich(d.text)}</p>`)
    .join('');

  // FAQPage answers must be plain text for the schema (no markup), so this
  // strips the same anchor tags that are rendered live in the page copy.
  const stripTags = (str) => String(str).replace(/<[^>]+>/g, '');

  const faqSchema = service.faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) },
        })),
      }
    : null;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: `${service.name} in the Algarve`,
    description: stripTags(service.intro),
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Algarve, Portugal',
    },
    provider: { '@id': BUSINESS_ID },
  };

  const breadcrumbSchema = breadcrumbListSchema([
    { name: 'Home', item: `${site.baseUrl}/` },
    { name: 'Services', item: `${site.baseUrl}/#services` },
    { name: service.name, item: `${site.baseUrl}/${service.slug}` },
  ]);

  // Every service page still links to all 22 town pages, but as flowing,
  // regionally-framed sentences with town-name anchors rather than a
  // mechanical 22-item list of "[Service] in [Town]" entries.
  const groups = regionGroups();
  const linkList = (towns) => {
    const links = towns.map((t) => `<a href="/${t.slug}">${esc(t.name)}</a>`);
    if (links.length === 1) return links[0];
    return `${links.slice(0, -1).join(', ')} and ${links[links.length - 1]}`;
  };
  const west = groups.find((g) => g.key === 'west');
  const central = groups.find((g) => g.key === 'central');
  const east = groups.find((g) => g.key === 'east');
  const townLinksHtml = `
    <p>Across the <strong>West Algarve</strong>, ${esc(service.name.toLowerCase())} is carried out in ${linkList(west.towns)}.</p>
    <p>In the <strong>Central Algarve</strong>, that coverage runs through ${linkList(central.towns)}.</p>
    <p>And along the <strong>East Algarve</strong>, it reaches ${linkList(east.towns)} — the full stretch to the Spanish border.</p>`;

  // On the pilot page, this gets the homepage's exact card internals (icon
  // tile + arrow-icon "Learn more" pill) so main.css's .page-lagos-rs
  // #services rules — mirroring .page-home #services exactly — have the
  // same elements to style. Every other service page keeps the original
  // plain card (heading + subhead + text-arrow link).
  const otherServiceCards = otherServices
    .map((s) => {
      if (isPilot) {
        return `<a href="/${s.slug}" class="card${s.flagship ? ' flagship' : ''}">
          <div class="card-icon-block">${serviceIcon(s.slug)}</div>
          ${s.flagship ? '<span class="badge">Flagship Service</span>' : ''}
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.heroSubhead)}</p>
          <span class="card-link"><span class="card-link-label">Learn more</span> <span class="card-link-arrow-text" aria-hidden="true">&rarr;</span><svg class="card-link-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9.25"/><path d="M9.2 8.3 13.4 12 9.2 15.7"/></svg></span>
        </a>`;
      }
      return `<a href="/${s.slug}" class="card${s.flagship ? ' flagship' : ''}">
        ${s.flagship ? '<span class="badge">Flagship Service</span>' : ''}
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.heroSubhead)}</p>
        <span class="card-link">Learn more &rarr;</span>
      </a>`;
    })
    .join('');

  const heroPhoto = SERVICE_HERO_PHOTO[service.slug];
  const descriptionPhotos = SERVICE_DESCRIPTION_PHOTO[service.slug] || {};

  const hero = heroIntro({
    alt: heroPhoto ? heroPhoto.alt : service.imageAlt,
    breadcrumb: [{ label: 'Home', href: '/' }, { label: service.name }],
    h1Text: service.h1,
    headlineHtml: esc(service.heroHeadline),
    subtext: service.heroTagline,
    // Dropped on the design-system pilot page only, matching the
    // homepage's own hero (which never passes a ctaNote at all) — every
    // other service keeps its note unchanged.
    ctaNote: isPilot ? undefined : service.ctaNote,
    // Same trust-stats row as the homepage/town-pilot hero, reusing the
    // same sitewide data (site.js) — pilot page only.
    trustStats: isPilot ? site.trustStats : undefined,
    desktopStatsText: isPilot ? site.heroStatsDesktop : undefined,
    mobileStatsText: isPilot ? site.heroStatsShort : undefined,
    // Full-bleed split hero (the homepage's own hero mechanism) is opted
    // into for the pilot; every other service page keeps its original
    // boxed, in-flow hero image untouched.
    image: heroPhoto
      ? {
          mobileWebp: heroPhoto.mobileWebp,
          mobileJpg: heroPhoto.mobileJpg,
          desktopWebp: heroPhoto.desktopWebp,
          desktopJpg: heroPhoto.desktopJpg,
        }
      : undefined,
    twoColDesktop: isPilot,
  });

  // Jump-link table of contents — only lists sections this service actually
  // has, so it stays accurate if a section is ever conditionally empty.
  const tocSections = [
    { id: 'included', label: "What's Included" },
    { id: 'why-it-matters', label: 'Why It Matters' },
    deepDiveHtml ? { id: 'in-depth', label: 'In Depth' } : null,
    scenarioItems ? { id: 'scenarios', label: 'Real-World Scenarios' } : null,
    commonProblemCards ? { id: 'common-problems', label: 'Common Problems' } : null,
    propertyTypeCards ? { id: 'property-types', label: 'By Property Type' } : null,
    extraCards ? { id: 'in-detail', label: 'In Detail' } : null,
    faqItems ? { id: 'faq', label: 'FAQ' } : null,
  ].filter(Boolean);

  const tocHtml = tocSections
    .map((t) => `<a href="#${t.id}">${esc(t.label)}</a>`)
    .join('');

  const body = `
  ${hero}

  <nav class="toc${isPilot ? ' toc-rs' : ''}" aria-label="Page sections">
    <div class="container">
      <span class="toc-label">On this page</span>
      <div class="toc-links">${tocHtml}</div>
    </div>
  </nav>

  <section id="included">
    <div class="container">
      ${blockOpen}<div class="two-col">
        <div class="two-col-text">
          <span class="eyebrow">What's Included</span>
          <h2>What our ${esc(service.name)} service covers</h2>
          <p>${rich(service.intro)}</p>
          <ul class="check-list mt-32">${includedList}</ul>
        </div>
        <div class="two-col-media">
          ${
            descriptionPhotos.included
              ? photo(descriptionPhotos.included.alt, { webp: descriptionPhotos.included.webp, jpg: descriptionPhotos.included.jpg, ratio: descriptionPhotos.included.ratio || 'tall' })
              : placeholder(service.imageAlt, { ratio: 'tall' })
          }
        </div>
      </div>${blockClose}
    </div>
  </section>

  <section${isPilot ? '' : ' class="section-alt"'} id="why-it-matters">
    <div class="container">
      ${blockOpen}<div class="two-col reverse">
        <div class="two-col-media">
          ${
            descriptionPhotos.whyItMatters
              ? photo(descriptionPhotos.whyItMatters.alt, { webp: descriptionPhotos.whyItMatters.webp, jpg: descriptionPhotos.whyItMatters.jpg, ratio: 'tall' })
              : placeholder(`${service.name} on an Algarve property`, { ratio: 'tall' })
          }
        </div>
        <div class="two-col-text">
          <span class="eyebrow">Why It Matters</span>
          <h2>Why this matters on an Algarve property</h2>
          <p>${esc(service.whyItMatters)}</p>
          <a href="${site.telHref}" class="btn btn-icon mt-32">${site.phoneDisplay}</a>
        </div>
      </div>${blockClose}
    </div>
  </section>

  ${
    deepDiveHtml
      ? `<section id="in-depth">
          <div class="container">
            ${blockOpen}<div class="section-head">
              <span class="eyebrow">In Depth</span>
              <h2>How ${esc(service.name.toLowerCase())} actually works</h2>
            </div>
            <div class="narrow" style="margin: 0 auto;">${deepDiveHtml}</div>${blockClose}
          </div>
        </section>`
      : ''
  }

  ${
    scenarioItems
      ? isMinimalImages
        ? `<section id="scenarios">
          <div class="container">
            <div class="section-head">
              <span class="eyebrow">Real-World Scenarios</span>
              <h2>Where ${esc(service.name.toLowerCase())} actually gets used</h2>
            </div>
            <div class="pillar-list mt-32">${scenarioItems}</div>
          </div>
        </section>`
        : `<section${isPilot ? '' : ' class="section-alt"'} id="scenarios">
          <div class="container">
            ${blockOpen}<div class="two-col">
              <div class="two-col-text">
                <span class="eyebrow">Real-World Scenarios</span>
                <h2>Where ${esc(service.name.toLowerCase())} actually gets used</h2>
                <div class="pillar-list mt-32">${scenarioItems}</div>
              </div>
              <div class="two-col-media">
                ${
                  descriptionPhotos.scenarios
                    ? photo(descriptionPhotos.scenarios.alt, { webp: descriptionPhotos.scenarios.webp, jpg: descriptionPhotos.scenarios.jpg, ratio: 'tall' })
                    : placeholder(service.scenarioImageAlt, { ratio: 'tall' })
                }
              </div>
            </div>${blockClose}
          </div>
        </section>`
      : ''
  }

  ${
    commonProblemCards
      ? `<section id="common-problems">
          <div class="container">
            ${blockOpen}<div class="section-head">
              <span class="eyebrow">Common Problems</span>
              <h2>What owners actually call about</h2>
              <p class="lede">The specific issues that come up most, and what's usually behind them.</p>
            </div>
            <div class="card-grid cols-2">${commonProblemCards}</div>${blockClose}
          </div>
        </section>`
      : ''
  }

  ${
    propertyTypeCards
      ? `<section id="property-types">
          <div class="container">
            ${blockOpen}<div class="section-head">
              <span class="eyebrow">By Property Type</span>
              <h2>How this applies to your property</h2>
              <p class="lede">The same service, scoped differently depending on what you own.</p>
            </div>
            <div class="card-grid cols-2">${propertyTypeCards}</div>${blockClose}
          </div>
        </section>`
      : ''
  }

  ${
    extraCards
      ? isMinimalImages
        ? `<section id="in-detail">
          <div class="container">
            ${blockOpen}<div class="section-head">
              <span class="eyebrow">In Detail</span>
              <h2>${esc(service.name)}, done properly</h2>
            </div>
            <div class="card-grid cols-2 mt-32">${extraCards}</div>${blockClose}
          </div>
        </section>`
        : `<section${isPilot ? '' : ' class="section-alt"'} id="in-detail">
          <div class="container">
            ${blockOpen}<div class="two-col reverse">
              <div class="two-col-media">
                ${
                  descriptionPhotos.inDetail
                    ? photo(descriptionPhotos.inDetail.alt, { webp: descriptionPhotos.inDetail.webp, jpg: descriptionPhotos.inDetail.jpg, ratio: descriptionPhotos.inDetail.ratio || 'tall' })
                    : placeholder(service.detailImageAlt, { ratio: 'tall' })
                }
              </div>
              <div class="two-col-text">
                <span class="eyebrow">In Detail</span>
                <h2>${esc(service.name)}, done properly</h2>
              </div>
            </div>
            <div class="card-grid cols-2 mt-32">${extraCards}</div>${blockClose}
          </div>
        </section>`
      : ''
  }

  ${
    faqItems
      ? `<section id="faq">
          <div class="container">
            ${blockOpen}<div class="section-head">
              <span class="eyebrow">Questions</span>
              <h2>Frequently asked questions</h2>
            </div>
            <div class="faq-list">${faqItems}</div>${blockClose}
          </div>
        </section>`
      : ''
  }

  ${
    isPilot
      ? `<section>
          <div class="container">
            <div class="cta-band rs-block">
              <span class="eyebrow">Get Started</span>
              <h2>Talk through your ${esc(service.name.toLowerCase())} options</h2>
              <p class="lede">Call now and we'll talk you through what makes sense for your property — in English, with no jargon.</p>
              <a href="${site.telHref}" class="btn btn-lg btn-icon">${site.phoneDisplay}</a>
            </div>
          </div>
        </section>`
      : `<section class="cta-band">
    <div class="container">
      <span class="eyebrow">Get Started</span>
      <h2>Talk through your ${esc(service.name.toLowerCase())} options</h2>
      <p class="lede">Call now and we'll talk you through what makes sense for your property — in English, with no jargon.</p>
      <a href="${site.telHref}" class="btn btn-lg btn-icon">${site.phoneDisplay}</a>
    </div>
  </section>`
  }

  <section${isPilot ? '' : ' class="section-alt"'}>
    <div class="container">
      ${blockOpen}<div class="section-head">
        <span class="eyebrow">Where We Work</span>
        <h2>${esc(service.name)} across the Algarve</h2>
      </div>
      <div class="narrow region-links" style="margin: 0 auto;">${townLinksHtml}</div>${blockClose}
    </div>
  </section>

  <section${isPilot ? ' id="services"' : ''}>
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Explore</span>
        <h2>More of what we do</h2>
      </div>
      <div class="card-grid cols-3">${otherServiceCards}</div>
      ${isPilot ? '<div class="carousel-progress" aria-hidden="true"><div class="carousel-progress-fill"></div></div>' : ''}
    </div>
  </section>
  `;

  return renderPage({
    path: `/${service.slug}`,
    bodyHtml: body,
    schema: [serviceSchema, breadcrumbSchema, faqSchema].filter(Boolean),
    mainClass: isPilot ? `page-lagos-rs page-${service.slug}` : undefined,
    useHomeHeader: isPilot,
    title: service.seoTitle,
    metaDescription: service.seoDescription,
  });
}

module.exports = renderService;
