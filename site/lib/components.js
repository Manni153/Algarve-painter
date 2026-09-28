'use strict';

// Shared page sections. Every template composes pages from these so the
// homepage, service pages and location pages stay consistent, and so a
// change to (say) the quote form happens in one place.

const site = require('../data/site');
const home = require('../data/home');
const reviews = require('../data/reviews');
const projects = require('../data/projects');
const { esc, html, map, picture, jsonLd, abs, phoneHtml } = require('./util');
const { icon, googleG } = require('./icons');
const { illustration } = require('./illustrations');

// ---------------------------------------------------------------- buttons

const btnQuote = (label = 'Request a Free Quote', cls = 'btn btn--primary') =>
  `<a class="${cls}" href="#quote" data-quote-link>${esc(label)}</a>`;

const btnCall = (label = 'Call Us', cls = 'btn btn--ghost') =>
  `<a class="${cls}" href="${site.telHref}">${icon('phone', { size: 18 })}<span>${label === site.phoneDisplay ? phoneHtml() : esc(label)}</span></a>`;

const btnWhatsApp = (label = 'WhatsApp', cls = 'btn btn--ghost') =>
  site.whatsappEnabled
    ? `<a class="${cls}" href="${site.whatsappHref}" target="_blank" rel="noopener">${icon('whatsapp', { size: 18 })}<span>${esc(label)}</span></a>`
    : '';

// ---------------------------------------------------------------- headings

function sectionHead({ eyebrow, heading, intro, id, center = false, level = 2 }) {
  return `<header class="section-head${center ? ' section-head--center' : ''}">
${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
<h${level} class="section-title"${id ? ` id="${id}"` : ''}>${esc(heading)}</h${level}>
${intro ? `<p class="section-intro">${esc(intro)}</p>` : ''}
</header>`;
}

const paras = (list) => map(list, (p) => `<p>${esc(p)}</p>`);

// ---------------------------------------------------------------- breadcrumbs

// items: [{ name, path }] — the last item is the current page.
function breadcrumbs(items) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  const nav = `<nav class="crumbs" aria-label="Breadcrumb"><ol>${all
    .map((c, i) =>
      i === all.length - 1
        ? `<li><span aria-current="page">${esc(c.name)}</span></li>`
        : `<li><a href="${c.path}">${esc(c.name)}</a></li>`
    )
    .join('')}</ol></nav>`;
  const schema = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  });
  return { nav, schema };
}

// ---------------------------------------------------------------- inner hero

// Split hero used by every page except the homepage: text on the limestone
// ground (so the LCP element is text, not a photograph) with a framed photo.
function pageHero({ crumbs, eyebrow, h1, lead, image, imageAlt, points }) {
  return `<section class="page-hero" aria-labelledby="page-title">
<div class="container page-hero__grid">
<div class="page-hero__text">
${crumbs || ''}
${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
<h1 class="page-hero__title" id="page-title">${esc(h1)}</h1>
${lead ? `<p class="page-hero__lead">${esc(lead)}</p>` : ''}
<div class="btn-row">${btnQuote()}${btnCall()}</div>
${points ? `<ul class="tick-list tick-list--inline" role="list">${points.map((pt) => `<li>${icon('check', { size: 16 })}<span>${esc(pt)}</span></li>`).join('')}</ul>` : ''}
</div>
${image ? `<div class="page-hero__media">${picture(image, { alt: imageAlt, sizes: '(min-width: 1000px) 44vw, 92vw', className: 'frame', eager: true })}</div>` : ''}
</div>
</section>`;
}

// ---------------------------------------------------------------- CTAs

// Quiet single-line prompt placed after a major section. Deliberately low
// key: the page should not shout "quote" after every block.
function inlineCta(text, label = 'Request a free quote') {
  return `<p class="inline-cta"><span>${esc(text)}</span> <a href="#quote" data-quote-link>${esc(label)} ${icon('arrow', { size: 16 })}</a></p>`;
}

function ctaBand({ heading, text, image = 'algarve-villa-exterior-freshly-painted', alt = '' }) {
  return `<section class="cta-band" aria-labelledby="cta-band-title">
<div class="cta-band__media">${picture(image, { alt, sizes: '100vw' })}</div>
<div class="container cta-band__inner">
<h2 class="cta-band__title" id="cta-band-title">${esc(heading)}</h2>
<p class="cta-band__text">${esc(text)}</p>
<div class="btn-row">${btnQuote('Request a Free Quote', 'btn btn--light')}${btnCall(site.phoneDisplay, 'btn btn--outline-light')}</div>
</div>
</section>`;
}

// ---------------------------------------------------------------- services

// Service cards. With `feature`, the complete-villa service leads as a
// full-width card with a photograph: it is the project type the business
// most wants, so it gets the most visual weight. Numbering keeps the
// standard service order.
const FEATURE_SLUG = 'villa-painting';

function serviceCards(services, { exclude, feature = false, headingLevel = 3 } = {}) {
  const list = services.filter((s) => s.slug !== exclude);
  const ordered = feature ? [...list.filter((s) => s.slug === FEATURE_SLUG), ...list.filter((s) => s.slug !== FEATURE_SLUG)] : list;
  const card = (s) => {
    const num = String(services.indexOf(s) + 1).padStart(2, '0');
    const more = `<span class="service-card__more">Learn more ${icon('arrow', { size: 16 })}<span class="visually-hidden"> about ${esc(s.name.toLowerCase())}</span></span>`;
    if (feature && s.slug === FEATURE_SLUG) {
      return `<li class="service-card service-card--feature">
<a href="/${s.slug}/" class="service-card__link">
<div class="service-card__media">${picture('algarve-villa-exterior-freshly-painted', { alt: 'Villa with freshly painted rendered walls, window surrounds and shutters', sizes: '(min-width: 1240px) 700px, (min-width: 900px) 56vw, 100vw' })}</div>
<div class="service-card__body">
<span class="service-card__kicker">Complete projects</span>
<h${headingLevel} class="service-card__title">${esc(s.name)}</h${headingLevel}>
<p class="service-card__text">${esc(s.card)}</p>
${more}
</div>
</a>
</li>`;
    }
    return `<li class="service-card">
<a href="/${s.slug}/" class="service-card__link">
<span class="service-card__num" aria-hidden="true">${num}</span>
<h${headingLevel} class="service-card__title">${esc(s.name)}</h${headingLevel}>
<p class="service-card__text">${esc(s.card)}</p>
${more}
</a>
</li>`;
  };
  return `<ul class="service-grid" role="list">${ordered.map(card).join('')}</ul>`;
}

// ---------------------------------------------------------------- why choose us

function whyChoose({ eyebrow, heading, intro, items } = home.why, { tone = 'sand' } = {}) {
  return `<section class="section${tone === 'sand' ? ' section--sand' : ''}" aria-labelledby="why-title">
<div class="container">
${sectionHead({ eyebrow, heading, intro, id: 'why-title' })}
<ul class="why-grid" role="list">${map(
    items,
    (w) => `<li class="why-item">
<span class="why-item__icon">${icon(w.icon, { size: 26 })}</span>
<h3 class="why-item__title">${esc(w.title)}</h3>
<p>${esc(w.text)}</p>
</li>`
  )}</ul>
</div>
</section>`;
}

function trustStrip() {
  return `<section class="trust-strip" aria-label="How we work">
<div class="container"><ul class="trust-strip__list" role="list">${map(
    home.trustStrip,
    (t) => `<li><strong>${esc(t.value)}</strong><span>${esc(t.label)}</span></li>`
  )}</ul></div>
</section>`;
}

// ---------------------------------------------------------------- how it works

function steps({ eyebrow, heading, intro, items } = home.steps, { id = 'steps-title', tone = '' } = {}) {
  return `<section class="section${tone ? ` section--${tone}` : ''}" aria-labelledby="${id}">
<div class="container">
${sectionHead({ eyebrow, heading, intro, id })}
<ol class="steps" role="list">${map(
    items,
    (s, i) => `<li class="step">
<span class="step__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
<h3 class="step__title">${esc(s.title)}</h3>
<p>${esc(s.text)}</p>
</li>`
  )}</ol>
</div>
</section>`;
}

// ---------------------------------------------------------------- areas

function areaGrid(locations, { current } = {}) {
  const regions = [
    ['west', 'Western Algarve'],
    ['central', 'Central Algarve'],
    ['east', 'Eastern Algarve'],
  ];
  return `<div class="area-regions">${regions
    .map(([key, label]) => {
      const locs = locations.filter((l) => l.region === key);
      if (!locs.length) return '';
      return `<div class="area-region"><h3 class="area-region__title">${label}</h3><ul class="area-list" role="list">${locs
        .map((l) =>
          l.slug === current
            ? `<li><span class="area-link is-current" aria-current="page">${esc(l.name)}</span></li>`
            : `<li><a class="area-link" href="/painters-${l.slug}/">Painters in ${esc(l.name)} ${icon('arrow', { size: 14 })}</a></li>`
        )
        .join('')}</ul></div>`;
    })
    .join('')}</div>`;
}

// ---------------------------------------------------------------- FAQs

// Visible FAQs as native <details>, plus FAQPage schema describing exactly
// the same questions and answers.
function faqSection(faqs, { eyebrow = 'FAQ', heading = 'Frequently Asked Questions', id = 'faq-title', schema = true } = {}) {
  if (!faqs || !faqs.length) return { html: '', schema: '' };
  const out = `<section class="section" aria-labelledby="${id}">
<div class="container container--narrow">
${sectionHead({ eyebrow, heading, id })}
<div class="faq">${map(
    faqs,
    (f) => `<details class="faq__item">
<summary class="faq__q"><span>${esc(f.q)}</span>${icon('chevron', { size: 20, className: 'icon faq__chev' })}</summary>
<div class="faq__a"><p>${esc(f.a)}</p></div>
</details>`
  )}</div>
</div>
</section>`;
  const ld = schema
    ? jsonLd({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      })
    : '';
  return { html: out, schema: ld };
}

// ---------------------------------------------------------------- reviews

function stars(n) {
  return `<span class="stars" role="img" aria-label="${n} out of 5 stars">${Array.from({ length: 5 }, (_, i) =>
    icon('star', { size: 16, className: `icon star${i < n ? ' is-on' : ''}` })
  ).join('')}</span>`;
}

function reviewsSection({ limit = 6, tone = '' } = {}) {
  const list = reviews.slice(0, limit);
  const profile = site.googleReviewsUrl
    ? `<a class="btn btn--ghost" href="${esc(site.googleReviewsUrl)}" target="_blank" rel="noopener">${googleG}<span>Read our reviews on Google</span></a>`
    : '';
  const body = list.length
    ? `<ul class="review-grid" role="list">${map(
        list,
        (r) => `<li class="review">
<div class="review__top">${stars(r.rating)}${googleG}</div>
<blockquote class="review__text"><p>${esc(r.text)}</p></blockquote>
<p class="review__meta"><strong>${esc(r.author)}</strong>${r.location ? ` · ${esc(r.location)}` : ''}${r.date ? ` · <time datetime="${esc(r.date)}">${esc(formatMonth(r.date))}</time>` : ''}</p>
</li>`
      )}</ul>${profile ? `<div class="center-row">${profile}</div>` : ''}`
    : `<div class="review-empty">
<div class="review-empty__badge">${googleG}<span>Google Reviews</span></div>
<p>We only publish genuine reviews, word for word from our Google Business Profile. Reviews from Algarve homeowners will appear here as projects are completed.</p>
${profile}
</div>`;
  return `<section class="section${list.length ? '' : ' section--compact'}${tone ? ` section--${tone}` : ''}" aria-labelledby="reviews-title" id="reviews">
<div class="container${list.length ? '' : ' reviews-pending'}">
${sectionHead({ eyebrow: 'WHAT CLIENTS SAY', heading: 'Real Reviews From Algarve Homeowners', id: 'reviews-title' })}
${body}
</div>
</section>`;
}

function formatMonth(ym) {
  const [y, m] = String(ym).split('-');
  const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return m ? `${names[Number(m) - 1]} ${y}` : y;
}

// ---------------------------------------------------------------- gallery

function visibleProjects() {
  return projects.items.filter((p) => (p.before && p.after) || (projects.showIllustrations && p.illustration));
}

function baCompare(p, idx) {
  const real = p.before && p.after;
  const pane = (state) =>
    real
      ? picture(p[state], { alt: p[`${state}Alt`], sizes: '(min-width: 1100px) 540px, (min-width: 720px) 46vw, 92vw' })
      : illustration(p.illustration, state);
  return `<figure class="project">
<div class="ba" data-ba style="--pos:50%">
<div class="ba__pane ba__pane--before">${pane('before')}<span class="ba__tag">Before</span></div>
<div class="ba__pane ba__pane--after">${pane('after')}<span class="ba__tag ba__tag--after">After</span></div>
<span class="ba__handle" aria-hidden="true"></span>
<label class="visually-hidden" for="ba-${idx}">Compare before and after: ${esc(p.type)}, ${esc(p.location)}</label>
<input class="ba__range" id="ba-${idx}" type="range" min="0" max="100" value="50">
</div>
<figcaption class="project__cap">
<p class="project__type">${esc(p.type)} <span aria-hidden="true">—</span> <a href="/painters-${p.locationSlug}/">${esc(p.location)}</a></p>
<p class="project__desc">${esc(p.description)}</p>
${real ? '' : '<p class="project__note">Illustration of this project type. Project photographs to follow.</p>'}
</figcaption>
</figure>`;
}

function gallery({ limit, filter } = {}) {
  let list = visibleProjects();
  if (filter) list = list.filter(filter);
  if (limit) list = list.slice(0, limit);
  if (!list.length) return '';
  return `<div class="project-grid">${list.map((p, i) => baCompare(p, `${filter ? 'f' : 'g'}${i}`)).join('')}</div>`;
}

// ---------------------------------------------------------------- quote form

function quoteForm({ locations, services, presetLocation = '', presetService = '', pagePath = '/', heading, intro } = {}) {
  const f = site.form;
  const q = home.quote;
  const opt = (value, label, selected) => `<option value="${esc(value)}"${selected ? ' selected' : ''}>${esc(label)}</option>`;
  const scope = presetService === 'interior-painting' || presetService === 'walls-ceilings' ? 'Interior' : presetService === 'exterior-house-painting' ? 'Exterior' : '';
  const propertyType = presetService === 'apartment-painting' ? 'Apartment' : presetService === 'villa-painting' ? 'Villa' : '';
  return `<section class="section section--quote" id="quote" aria-labelledby="quote-title">
<div class="container quote">
<div class="quote__intro">
<p class="eyebrow">${esc(q.eyebrow)}</p>
<h2 class="section-title" id="quote-title">${esc(heading || q.heading)}</h2>
<p class="section-intro">${esc(intro || q.intro)}</p>
<ul class="quote__contact" role="list">
<li><a href="${site.telHref}">${icon('phone')}<span><small>Call</small>${phoneHtml()}</span></a></li>
${site.whatsappEnabled ? `<li><a href="${site.whatsappHref}" target="_blank" rel="noopener">${icon('whatsapp')}<span><small>WhatsApp</small>Send a message</span></a></li>` : ''}
<li><a href="mailto:${site.email}">${icon('mail')}<span><small>Email</small>${esc(site.email)}</span></a></li>
</ul>
<p class="quote__note">${icon('camera', { size: 18 })}<span>Photographs help: a wide shot of each area and a close-up of any cracks, peeling or staining. You can send them by ${site.whatsappEnabled ? 'WhatsApp or ' : ''}email after submitting the form.</span></p>
</div>
<form class="form" name="${f.name}" method="POST" action="${f.successPath}" data-netlify="true" netlify-honeypot="company"${f.photoUpload ? ' enctype="multipart/form-data"' : ''}>
<input type="hidden" name="form-name" value="${f.name}">
<input type="hidden" name="page" value="${esc(pagePath)}">
<p class="visually-hidden"><label>Leave this empty: <input type="text" name="company" tabindex="-1" autocomplete="off"></label></p>
<div class="form__grid">
<div class="field"><label for="f-name">Name</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
<div class="field"><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required></div>
<div class="field field--full"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
<div class="field"><label for="f-location">Property location</label><select id="f-location" name="location" required>
${opt('', 'Select an area', !presetLocation)}
${locations.map((l) => opt(l.name, l.name, l.slug === presetLocation)).join('')}
${opt('Elsewhere in the Algarve', 'Elsewhere in the Algarve', false)}
</select></div>
<div class="field"><label for="f-type">Property type</label><select id="f-type" name="property_type" required>
${opt('', 'Select a type', !propertyType)}
${['Villa', 'House or townhouse', 'Apartment', 'Penthouse', 'Rental or holiday let', 'Commercial', 'Other'].map((t) => opt(t, t, t === propertyType)).join('')}
</select></div>
<fieldset class="field field--full choice"><legend>What needs painting?</legend>
<div class="choice__row">${['Interior', 'Exterior', 'Both'].map((v) => `<label class="choice__opt"><input type="radio" name="scope" value="${v}"${v === scope ? ' checked' : ''} required><span>${v}</span></label>`).join('')}</div>
</fieldset>
<div class="field field--full"><label for="f-areas">Approximate areas requiring painting</label><input id="f-areas" name="areas" type="text" placeholder="e.g. whole exterior and boundary walls, or 3 bedrooms and living room"></div>
<div class="field field--full"><label for="f-time">Desired timeframe</label><select id="f-time" name="timeframe">
${['As soon as possible', 'Within 1–3 months', 'In 3–6 months', 'Before a sale or rental date', 'Flexible / planning ahead'].map((t, i) => opt(t, t, i === 4)).join('')}
</select></div>
${f.photoUpload ? `<div class="field field--full"><label for="f-photos">Photos <span class="optional">(optional)</span></label><input id="f-photos" name="photos" type="file" accept="image/*" multiple></div>` : ''}
<div class="field field--full"><label for="f-message">Message <span class="optional">(optional)</span></label><textarea id="f-message" name="message" rows="4" placeholder="Anything else we should know: condition, access, colours, whether you will be in Portugal"></textarea></div>
${presetService ? `<input type="hidden" name="service" value="${esc(services.find((s) => s.slug === presetService)?.name || presetService)}">` : ''}
</div>
<button class="btn btn--primary btn--block" type="submit">Request a Free Quote</button>
<p class="form__legal">We use your details only to reply about your project. See our <a href="/privacy-policy/">privacy policy</a>.</p>
</form>
</div>
</section>`;
}

module.exports = {
  btnQuote,
  btnCall,
  btnWhatsApp,
  sectionHead,
  paras,
  pageHero,
  breadcrumbs,
  inlineCta,
  ctaBand,
  serviceCards,
  whyChoose,
  trustStrip,
  steps,
  areaGrid,
  faqSection,
  reviewsSection,
  gallery,
  visibleProjects,
  quoteForm,
};
