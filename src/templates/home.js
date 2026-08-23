'use strict';

const site = require('../data/site');
const services = require('../data/services');
const { regionGroups } = require('../data/towns');
const { esc, rich, renderPage, cardIcon, serviceIcon } = require('./layout');
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
  // ---- Hero Atelier ("Painting, Perfected.") ------------------------------
  // Ground-up redesign, not a restyle of the previous conversion hero: dark
  // premium ground, an abstract paint-sweep panel (tools/brand/atelier.py)
  // instead of an illustrated scene, and a two-word headline built so
  // neither line can wrap into an awkward orphan at any width. See the
  // HERO ATELIER block in main.css for the full design rationale — the
  // short version is that a dark ground makes cream-text contrast a
  // guarantee rather than something to keep re-tuning against whatever
  // sits behind it, which is what every previous hero on this page spent
  // real effort fighting.
  const hero = `
  <section class="hero-atelier bleed">
    <div class="hero-atelier-art" aria-hidden="true">
      <img src="/assets/brand/hero-atelier.svg" alt="" loading="eager" fetchpriority="high" width="1300" height="1300">
    </div>
    <div class="container">
      <div class="hero-atelier-copy">
        <p class="hero-eyebrow" data-rise><span class="hero-eyebrow-rule" aria-hidden="true"></span>Algarve Painter &middot; Local Master Painters</p>
        <h1 class="hero-h1" data-rise>
          <span class="sr-only">Painting and decorating in the Algarve — </span>
          <span class="hero-h1-line">Painting,</span>
          <span class="hero-h1-line hero-h1-accent">Perfected.</span>
        </h1>
        <p class="hero-sub" data-rise>Exterior and interior painting for villas and homes across the Algarve &mdash; prepared with real craft, finished to last against salt air and sun. English&#8209;speaking painters, on site until it's right.</p>
        <div class="hero-cta-row" data-rise>
          <a class="btn-hero" href="${site.whatsappHref}" target="_blank" rel="noopener">
            Request a Private Consultation
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <a class="hero-phone" href="${site.telHref}">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>
            Or call <strong>${esc(site.phoneDisplay)}</strong>
          </a>
        </div>
        <p class="hero-cta-note" data-rise>Usually the same day, in English &mdash; via WhatsApp</p>
      </div>
    </div>
  </section>`;

  // Icon-less on purpose — see main.css. No invented numbers either: no
  // years-in-business, no review count. Only claims this file can stand
  // behind without a made-up statistic attached to it.
  const credentialsStrip = `
  <section class="credentials-strip">
    <div class="container">
      <ul class="credentials-list">
        <li>Local &amp; Algarve-based</li>
        <li>100% English-speaking</li>
        <li>Prepped properly, no shortcuts</li>
        <li>Spotless daily clean-up</li>
      </ul>
    </div>
  </section>`;

  const body = `
  ${hero}
  ${credentialsStrip}

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
    heroTheme: 'dark',
    title: 'Painting & Decorating in the Algarve | Algarve Painter',
    metaDescription: 'Exterior and interior painting, render repair and woodwork for properties across the Algarve, by a locally based, 100% English-speaking team — call today.',
  });
}

module.exports = renderHome;
