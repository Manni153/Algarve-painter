'use strict';

const site = require('../data/site');
const services = require('../data/services');
const { regionGroups } = require('../data/towns');
const { esc, rich, heroIntro, reassuranceBand, renderPage, cardIcon, serviceIcon } = require('./layout');
const { visualiser, estimator } = require('./tools');

function renderHome() {
  const trustCards = site.trustSection
    .map(
      (t) => `<div class="card">
        <div class="icon-dot">${cardIcon(t.icon)}</div>
        <h3>${esc(t.heading)}</h3>
        <p>${esc(t.text)}</p>
      </div>`
    )
    .join('');

  const serviceCards = services
    .map(
      (s) => `<a href="/${s.slug}" class="card${s.flagship ? ' flagship' : ''}">
        <div class="card-icon-block">${serviceIcon(s.slug)}</div>
        ${s.flagship ? '<span class="badge">Flagship Service</span>' : ''}
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.heroSubhead)}</p>
        <span class="card-link"><span class="card-link-label">Learn more</span> <span class="card-link-arrow-text" aria-hidden="true">&rarr;</span><svg class="card-link-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9.25"/><path d="M9.2 8.3 13.4 12 9.2 15.7"/></svg></span>
      </a>`
    )
    .join('');

  const directoryCols = regionGroups()
    .map(
      (g) => `<div class="directory-col">
        <div class="head">${esc(g.label.toUpperCase())}</div>
        ${g.towns.map((t) => `<a href="/${t.slug}">${esc(t.name)}</a>`).join('')}
      </div>`
    )
    .join('');

  const processSteps = site.process
    .map(
      (p, i) => `<div class="pillar">
        <span class="num">${String(i + 1).padStart(2, '0')}</span>
        <div><h3>${esc(p.heading)}</h3><p>${esc(p.text)}</p></div>
      </div>`
    )
    .join('');

  const faqItems = site.faqs
    .map(
      (f) => `<div class="faq-item">
        <h3>${esc(f.q)}</h3>
        <p>${esc(f.a)}</p>
      </div>`
    )
    .join('');

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: site.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const hero = heroIntro({
    alt: 'Five thick impasto brushstrokes — ochre, dusty rose, orange, deep plum and burgundy — swept across artist\u2019s canvas',
    h1Text: 'Painting & Decorating in the Algarve',
    // "Decorating" never splits across lines (nbsp, all breakpoints); the
    // <br> is desktop-only (see .hero-kicker-break in main.css) so it
    // forces a clean two-line break there without affecting mobile's
    // natural wrap. Wording/punctuation is byte-identical to h1Text above
    // — no copy change, purely a line-break placement.
    h1Html: 'Painting &amp; Decorating<br class="hero-kicker-break"> in the Algarve',
    headlineHtml: 'Make your Algarve property look cared for again',
    subtext: 'Exteriors, interiors, render repair and woodwork — prepared properly and explained in plain English.',
    trustStats: site.trustStats,
    desktopStatsText: site.heroStatsDesktop,
    mobileStatsText: site.heroStatsShort,
    // Full-bleed hero, two dedicated images: desktop (1025px+) gets its own
    // wide crop of the villa facade; mobile and tablet (<=1024px, both
    // breakpoints together) share ONE portrait image composed for that
    // aspect ratio rather than cropped down from the desktop photo — see
    // heroIntro in layout.js for the single 1025px <picture> breakpoint
    // that splits them.
    image: {
      svgWide: '/assets/brand/hero-scene-wide.svg',
      svgTall: '/assets/brand/hero-scene-tall.svg',
    },
    twoColDesktop: true,
  });

  const reassurance = reassuranceBand({
    heading: 'No pressure, no hard sell — just a straight answer.',
  });

  const body = `
  <div class="hero-viewport">
    ${hero}
    ${reassurance}
  </div>

  <section id="services">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">What We Do</span>
        <h2>Painting &amp; decorating services</h2>
        <p class="lede">From a single room to a whole villa exterior, every job is quoted around the condition of the actual surfaces rather than a rate per square metre.</p>
      </div>
      <div class="card-grid cols-3">${serviceCards}</div>
      <div class="carousel-progress" aria-hidden="true"><div class="carousel-progress-fill"></div></div>
    </div>
  </section>

  ${visualiser()}
  ${estimator()}

  <section>
    <div class="container">
      <div class="rs-block">
        <div class="section-head">
          <span class="eyebrow">The Algarve, in Practice</span>
          <h2>Painting and decorating for English-speaking property owners</h2>
        </div>
        <div class="narrow" style="margin: 0 auto;">
          <h3>A Climate That Is Hard on Paint, and Harder on Bad Preparation</h3>
          <p>Algarve sun, salt air and winter rain are hard on a painted surface in a way a milder climate is not. Strong UV breaks down the binder in an exterior coating until it chalks; salt near the coast corrodes metalwork and drives salt bloom out through render; and cracked render lets winter rain into the wall behind it. None of that is unusual, and none of it is a reason to repaint more often than a property needs — but it does mean the coating is only ever as good as the surface underneath. Washing down, scraping back, filling cracks properly and priming bare patches is what decides whether a repaint lasts years or seasons, and it is the part a cheaper quote is usually leaving out.</p>

          <h3>One Point of Contact, From Render Repair to the Final Coat</h3>
          <p>${rich('Algarve Painter covers seven services — <a href="/exterior-house-painting">exterior house painting</a>, <a href="/interior-painting">interior painting</a>, <a href="/villa-pool-area-painting">villa and pool area painting</a>, <a href="/render-crack-repair">render and crack repair</a>, <a href="/wood-shutter-treatment">wood and shutter treatment</a>, <a href="/metalwork-railing-painting">metalwork and railing painting</a> and <a href="/waterproof-roof-coating">waterproof and roof coating</a> — coordinated through a single phone number rather than split across separate trades. In practice that matters because these overlap constantly: a facade will not hold its paint until the cracked render underneath is repaired, rust bleeding off a balcony rail keeps staining a wall no matter how many times it is repainted, and water coming through a roof terrace shows up as a damp patch on the ceiling below. Handling them together, from one call, avoids the familiar situation where two trades each say the problem belongs to the other.')}</p>

          <h3>Villas, Apartments, Rentals and Commercial Premises</h3>
          <p>Property types across the Algarve vary widely, and what makes sense for a hillside villa with long boundary walls does not automatically apply to an apartment with a terrace and a balcony rail. A villa is usually a large exterior where the house is less than half the painted area once the pool surround, pergola and boundary walls are counted; an apartment is normally the owner’s own interior, terrace walls and metalwork, with the facade and stairwells belonging to the condominium; a holiday rental raises the scheduling question above everything else, since the work has to fit a changeover or an off-season window. Commercial premises — shops, restaurants, offices, hotel and apartment-block common areas — add a further constraint again, and are normally worked around trading hours or an agreed closure rather than a standard working day. Every job starts from the property in front of us rather than a fixed package, in a first conversation that happens entirely in English.</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="rs-block rs-block--overhang">
        <div class="section-head">
          <span class="eyebrow">Why Owners Choose Us</span>
          <h2>A local decorator that speaks your language</h2>
          <p class="lede">Straightforward communication and one team handling everything from the first survey to the final walkthrough.</p>
        </div>
        <div class="trust-grid">${trustCards}</div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="rs-block">
        <div class="section-head">
          <span class="eyebrow">How It Works</span>
          <h2>From first call to the final coat</h2>
          <p class="lede">Every step is handled as one connected process, so nothing gets lost between a quote and the work actually happening.</p>
        </div>
        <div class="pillar-list">${processSteps}</div>
      </div>
    </div>
  </section>

  <section id="areas">
    <div class="container">
      <div class="rs-block">
        <div class="section-head">
          <span class="eyebrow">Where We Work</span>
          <h2>Serving property owners across the Algarve</h2>
          <p class="lede">From Sagres in the west to Vila Real de Santo António in the east.</p>
        </div>
        <div class="directory">${directoryCols}</div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="rs-block">
        <div class="section-head">
          <span class="eyebrow">Questions</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div class="faq-list">${faqItems}</div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="cta-band rs-block rs-block--dark">
        <span class="eyebrow">Get Started</span>
        <h2>Ready to get your property painted?</h2>
        <p class="lede">Call now to talk through exteriors, interiors or repairs for your property — in English, with no confusion.</p>
        <a href="${site.telHref}" class="btn btn-lg btn-icon">${site.phoneDisplay}</a>
      </div>
    </div>
  </section>
  `;

  return renderPage({
    path: '/',
    bodyHtml: body,
    schema: [faqSchema],
    mainClass: 'page-home',
    title: 'Painting & Decorating in the Algarve | Algarve Painter',
    metaDescription: 'Exterior and interior painting, render repair and woodwork for properties across the Algarve, by a locally based, 100% English-speaking team — call today.',
  });
}

module.exports = renderHome;
