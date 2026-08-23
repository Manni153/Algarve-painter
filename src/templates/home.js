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

  // ---- Hero v2 -----------------------------------------------------------
  // The homepage hero is purpose-built here rather than through heroIntro,
  // which still serves the 32 service/town pages unchanged. It keeps the
  // skeleton classes (.hero-stack--split, .hero-stack-media, .container) so
  // the full-bleed 100dvh mechanics, the transparent-header JS and the
  // mobile veil all keep working — only the text column's contents are new.
  //
  // Conversion order is the layout: headline -> support line -> one primary
  // action -> quiet phone alternative -> proof. One primary CTA, not two
  // equals: the button goes to WhatsApp because that is how Algarve
  // owners actually open a conversation, and the phone number is styled as
  // the fallback it is.
  const heroTrust = [
    {
      title: 'Plain English, start to finish',
      copy: 'Quotes, scheduling and final touch-ups — all in your language.',
      icon: `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><g stroke="#3a241a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M 10 14 H 54 V 42 H 30 L 18 52 V 42 H 10 Z" fill="#fffdf7"/><path d="M 18 24 H 46 M 18 32 H 38" fill="none"/></g></svg>`,
    },
    {
      title: 'Algarve-based, all year round',
      copy: 'Lagos to Tavira, winter included — never a crew from out of town.',
      icon: `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><g stroke="#3a241a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M 32 8 C 21 8 14 16 14 26 C 14 38 32 56 32 56 C 32 56 50 38 50 26 C 50 16 43 8 32 8 Z" fill="#c25a38"/><circle cx="32" cy="26" r="8" fill="#fbf4e8"/></g></svg>`,
    },
    {
      title: 'Spotless when we leave',
      copy: 'Sheeted, masked and swept at the end of every day — not just the final one.',
      icon: `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><g stroke="#3a241a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><rect x="12" y="12" width="26" height="14" rx="4" fill="#c25a38"/><path d="M 38 19 h 8 v 10 h -12" fill="none"/><path d="M 34 29 v 12" fill="none"/><path d="M 50 12 l 2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#d9a02b"/></g></svg>`,
    },
  ];

  const hero = `
  <section class="hero-stack hero-stack--split hero-v2 bleed">
    <div class="container">
      <div class="hero-stack-text">
        <p class="hero-eyebrow" data-rise>Painting &amp; Decorating &middot; Lagos to Tavira</p>
        <h1 class="hero-h1" data-rise>
          <span class="sr-only">Painting and decorating in the Algarve — </span>
          <span class="hero-h1-line">A finish worthy</span>
          <span class="hero-h1-line hero-h1-accent">of the Algarve sun</span>
        </h1>
        <p class="hero-sub" data-rise>Same&#8209;day replies. Crews that turn up. Paintwork that stands up to salt air and UV &mdash; from English&#8209;speaking painters who live here year&#8209;round.</p>
        <div class="hero-cta-row" data-rise>
          <a class="btn-hero" href="${site.whatsappHref}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12.01 2C6.48 2 2 6.48 2 12.01c0 1.98.55 3.83 1.5 5.42L2 22l4.7-1.47a9.96 9.96 0 0 0 5.3 1.52h.01c5.53 0 10.01-4.48 10.01-10.02C22 6.48 17.53 2 12.01 2zm5.86 14.3c-.25.7-1.44 1.34-1.98 1.4-.5.06-1.02.28-3.42-.72-2.88-1.2-4.73-4.1-4.87-4.3-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.66-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.08.13.08.75-.17 1.45z"/></svg>
            WhatsApp Us &mdash; Free Quote
          </a>
          <a class="hero-phone" href="${site.telHref}">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>
            Prefer to call? <strong>${esc(site.phoneDisplay)}</strong>
          </a>
        </div>
        <p class="hero-cta-note" data-rise>Free, no&#8209;obligation quotes &mdash; priced from the surfaces, not a guess</p>
        <div class="hero-trust" data-rise role="list">
          ${heroTrust.map((c) => `
          <div class="trust-card" role="listitem">
            <span class="trust-card-icon">${c.icon}</span>
            <div class="trust-card-text"><strong>${c.title}</strong><span>${c.copy}</span></div>
          </div>`).join('')}
        </div>
      </div>
      <div class="hero-stack-media">
        <picture>
          <source media="(min-width: 1025px)" type="image/svg+xml" srcset="/assets/brand/hero-scene-wide.svg">
          <img src="/assets/brand/hero-scene-tall.svg" alt="Illustration of an Algarve hillside village at golden hour: whitewashed villas with terracotta roofs climbing a headland above the sea" loading="eager" fetchpriority="high">
        </picture>
      </div>
    </div>
  </section>`;

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
