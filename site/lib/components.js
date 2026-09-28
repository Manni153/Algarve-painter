'use strict';

// Shared page sections. Every template composes pages from these so the
// homepage, service pages and location pages stay consistent. Phone and
// WhatsApp are the only contact actions anywhere on the site.

const site = require('../data/site');
const home = require('../data/home');
const servicePhotos = require('../data/service-photos');
const reviews = require('../data/reviews');
const projects = require('../data/projects');
const { esc, html, map, picture, jsonLd, abs, phoneHtml, waHref } = require('./util');
const { icon, googleG } = require('./icons');
const { illustration } = require('./illustrations');

// ---------------------------------------------------------------- buttons

// Primary action. `message` is the prefilled WhatsApp text for this context.
const btnWhatsApp = ({ label = 'WhatsApp Us', cls = 'btn btn--primary', message } = {}) =>
  site.whatsappEnabled
    ? `<a class="${cls} btn--wa" href="${waHref(message)}" target="_blank" rel="noopener">${icon('whatsapp', { size: 19 })}<span>${esc(label)}</span></a>`
    : '';

// Secondary action. Pass `number: true` to show the phone number as the label.
const btnCall = ({ label = 'Call Us', cls = 'btn btn--ghost', number = false } = {}) =>
  `<a class="${cls}" href="${site.telHref}">${icon('phone', { size: 18 })}<span>${number ? `Call ${phoneHtml()}` : esc(label)}</span></a>`;

// The standard pair: WhatsApp first, Call second.
const contactButtons = ({ message, tone = 'light-bg', number = false } = {}) => {
  const dark = tone === 'dark-bg';
  return `<div class="btn-row">${btnWhatsApp({ message, cls: dark ? 'btn btn--light' : 'btn btn--primary' })}${btnCall({ number, cls: dark ? 'btn btn--outline-light' : 'btn btn--ghost' })}</div>`;
};

// ---------------------------------------------------------------- headings

function sectionHead({ eyebrow, heading, intro, id, center = false, level = 2 }) {
  return `<header class="section-head${center ? ' section-head--center' : ''}">
${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
<h${level} class="section-title"${id ? ` id="${id}"` : ''}>${esc(heading)}</h${level}>
${intro ? `<p class="section-intro">${esc(intro)}</p>` : ''}
</header>`;
}

const paras = (list) => map(list, (p) => `<p>${esc(p)}</p>`);

// A block that is fully open on larger screens and collapses to an
// accordion on phones (main.js closes it there unless `keepOpen`). Without
// JavaScript everything stays open.
function mobileAccordion({ heading, headingClass = '', body, keepOpen = false, level = 3 }) {
  return `<details class="acc" data-acc${keepOpen ? '="open"' : ''} open>
<summary class="acc__sum"><h${level}${headingClass ? ` class="${headingClass}"` : ''}>${esc(heading)}</h${level}>${icon('chevron', { size: 20, className: 'icon acc__chev' })}</summary>
<div class="acc__body">${body}</div>
</details>`;
}

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
function pageHero({ crumbs, eyebrow, h1, lead, image, imageAlt, points, message, actions = true }) {
  return `<section class="page-hero" aria-labelledby="page-title">
<div class="container page-hero__grid">
<div class="page-hero__text">
${crumbs || ''}
${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
<h1 class="page-hero__title" id="page-title">${esc(h1)}</h1>
${lead ? `<p class="page-hero__lead">${esc(lead)}</p>` : ''}
${actions ? contactButtons({ message }) : ''}
${points ? `<ul class="tick-list tick-list--inline" role="list">${points.map((pt) => `<li>${icon('check', { size: 16 })}<span>${esc(pt)}</span></li>`).join('')}</ul>` : ''}
</div>
${image ? `<div class="page-hero__media">${picture(image, { alt: imageAlt, sizes: '(min-width: 1000px) 44vw, 92vw', className: 'frame', eager: true })}</div>` : ''}
</div>
</section>`;
}

// ---------------------------------------------------------------- CTAs

// Quiet single-line prompt placed after a major section: one WhatsApp link,
// deliberately low key so the page never shouts after every block.
function inlineCta(text, { label = 'WhatsApp us', message } = {}) {
  if (!site.whatsappEnabled) return `<p class="inline-cta"><span>${esc(text)}</span> <a href="${site.telHref}">Call ${phoneHtml()} ${icon('arrow', { size: 16 })}</a></p>`;
  return `<p class="inline-cta"><span>${esc(text)}</span> <a href="${waHref(message)}" target="_blank" rel="noopener">${icon('whatsapp', { size: 17 })} ${esc(label)} ${icon('arrow', { size: 16 })}</a></p>`;
}

function ctaBand({ heading, text, image = 'algarve-villa-exterior-freshly-painted', alt = '', message }) {
  return `<section class="cta-band" aria-labelledby="cta-band-title">
<div class="cta-band__media">${picture(image, { alt, sizes: '100vw' })}</div>
<div class="container cta-band__inner">
<h2 class="cta-band__title" id="cta-band-title">${esc(heading)}</h2>
<p class="cta-band__text">${esc(text)}</p>
${contactButtons({ message, tone: 'dark-bg' })}
</div>
</section>`;
}

// ---------------------------------------------------------------- services

// Image-led service cards. With `feature`, the complete-villa service leads
// as a wide card: it is the project type the business most wants, so it gets
// the most visual weight. On phones the grid becomes a horizontal
// scroll-snap row so seven services don't turn into a very long page.
const FEATURE_SLUG = 'villa-painting';

function serviceCards(services, { exclude, feature = false, headingLevel = 3 } = {}) {
  const list = services.filter((s) => s.slug !== exclude);
  const ordered = feature ? [...list.filter((s) => s.slug === FEATURE_SLUG), ...list.filter((s) => s.slug !== FEATURE_SLUG)] : list;
  const card = (s) => {
    const isFeature = feature && s.slug === FEATURE_SLUG;
    const [img, alt] = servicePhotos[s.slug];
    const sizes = isFeature ? '(min-width: 1240px) 700px, (min-width: 900px) 56vw, (min-width: 700px) 46vw, 82vw' : '(min-width: 1240px) 380px, (min-width: 700px) 46vw, 82vw';
    return `<li class="svc${isFeature ? ' svc--feature' : ''}">
<a href="/${s.slug}/" class="svc__link">
<div class="svc__media">${picture(img, { alt, sizes })}</div>
<div class="svc__body">
${isFeature ? '<p class="svc__kicker">Complete projects</p>' : ''}
<h${headingLevel} class="svc__title">${esc(s.name)}</h${headingLevel}>
<p class="svc__text">${esc(s.card)}</p>
<span class="svc__more">Explore ${esc(s.name.toLowerCase())} ${icon('arrow', { size: 16 })}</span>
</div>
</a>
</li>`;
  };
  return `<ul class="svc-grid${feature ? ' svc-grid--feature' : ''}" role="list">${ordered.map(card).join('')}</ul>`;
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

// The areas as an editorial list: town name, a short line about its
// property, and a link to its page. Most important markets first.
function areaGrid(locations, { current } = {}) {
  const ordered = [...locations].sort((a, b) => a.rank - b.rank);
  return `<ul class="areas" role="list">${ordered
    .map((l) => {
      const inner = `<span class="area__name"><span class="visually-hidden">Painters in </span>${esc(l.name)}</span><span class="area__tag">${esc(l.tagline)}</span>`;
      return l.slug === current
        ? `<li><span class="area is-current" aria-current="page">${inner}</span></li>`
        : `<li><a class="area" href="/painters-${l.slug}/">${inner}${icon('arrow', { size: 16, className: 'icon area__arrow' })}</a></li>`;
    })
    .join('')}</ul>`;
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

function gallery({ limit, filter, compactOnPhones = false } = {}) {
  let list = visibleProjects();
  if (filter) list = list.filter(filter);
  if (limit) list = list.slice(0, limit);
  if (!list.length) return '';
  return `<div class="project-grid${compactOnPhones ? ' project-grid--compact' : ''}">${list.map((p, i) => baCompare(p, `${filter ? 'f' : 'g'}${i}`)).join('')}</div>`;
}

// ---------------------------------------------------------------- contact

// Direct-contact block at the foot of every page. No form: WhatsApp first,
// the phone as the alternative. `message` prefills WhatsApp for this page.
function contactBlock({ eyebrow = 'READY TO REPAINT YOUR PROPERTY?', heading = 'Tell Us What Needs Painting', text, message } = {}) {
  const hours = site.openingHours.map((h) => `<span>${esc(h.label)}</span>`).join('');
  const intro =
    text ||
    'Send us a few photos of the areas that need painting on WhatsApp, with a line about the property and where it is. We reply in English and arrange a visit.';
  return `<section class="section section--contact" id="contact" aria-labelledby="contact-title">
<div class="container contact-block">
<div class="contact-block__text">
<p class="eyebrow">${esc(eyebrow)}</p>
<h2 class="section-title" id="contact-title">${esc(heading)}</h2>
<p class="section-intro">${esc(intro)}</p>
<p class="contact-block__tip">${icon('camera', { size: 18 })}<span>Helpful photos: a wide shot of each wall or room, plus close-ups of any cracks, peeling or staining.</span></p>
</div>
<div class="contact-block__actions">
${site.whatsappEnabled ? `${btnWhatsApp({ message, cls: 'btn btn--light btn--lg btn--block' })}
<p class="contact-block__alt">Prefer to speak?</p>` : ''}
${btnCall({ number: true, cls: `btn ${site.whatsappEnabled ? 'btn--outline-light' : 'btn--light'} btn--lg btn--block` })}
${hours ? `<p class="contact-block__hours">${icon('clock', { size: 16 })}<span class="contact-block__hours-list">${hours}</span></p>` : ''}
</div>
</div>
</section>`;
}

module.exports = {
  btnCall,
  btnWhatsApp,
  contactButtons,
  sectionHead,
  paras,
  mobileAccordion,
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
  contactBlock,
};
