'use strict';

const site = require('../data/site');
const home = require('../data/home');
const { esc, map, picture, heroPicture, jsonLd, html } = require('../lib/util');
const { icon } = require('../lib/icons');
const c = require('../lib/components');
const { layout } = require('./layout');
const { businessSchema } = require('./schema');

module.exports = function renderHome({ services, locations }) {
  const h = home.hero;
  const faq = c.faqSection(home.faqs, { eyebrow: 'FAQ', heading: 'Questions Algarve Owners Ask Before Painting', id: 'faq-title' });

  const hero = `<section class="hero hero--home" aria-labelledby="hero-title">
<div class="hero__media">${heroPicture(h.image, { alt: h.imageAlt, imgClass: 'hero__img' })}</div>
<div class="container hero__inner">
<p class="eyebrow eyebrow--light">${esc(h.eyebrow)}</p>
<h1 class="hero__title" id="hero-title">${h.h1Lines.map((l) => `<span>${esc(l)}</span>`).join(' ')}</h1>
<p class="hero__lead">${h.lead.map((l) => `<span>${esc(l)}</span>`).join(' ')}</p>
<div class="btn-row">${c.btnQuote('Request a Free Quote', 'btn btn--light')}${c.btnCall('Call Us', 'btn btn--outline-light')}</div>
</div>
</section>
<section class="hero-stats" aria-label="At a glance">
<div class="container"><ul class="hero-stats__list" role="list">${map(
    home.heroStats,
    (s) => `<li><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></li>`
  )}</ul></div>
</section>`;

  const servicesSection = `<section class="section" aria-labelledby="services-title" id="services">
<div class="container">
${c.sectionHead({ ...home.services, id: 'services-title' })}
${c.serviceCards(services, { feature: true })}
${c.inlineCta('Planning a complete villa repaint or a full interior?')}
</div>
</section>`;

  const a = home.algarve;
  const algarve = `<section class="section section--sand" aria-labelledby="algarve-title" id="algarve-painting">
<div class="container">
${c.sectionHead({ eyebrow: a.eyebrow, heading: a.heading, id: 'algarve-title' })}
<div class="split split--sticky">
<div class="split__media">${picture(a.image, { alt: a.imageAlt, sizes: '(min-width: 1000px) 420px, 92vw', className: 'frame frame--tall' })}</div>
<div class="split__body prose">
<p class="lede">${esc(a.intro)}</p>
${a.blocks.map((b) => `<h3>${esc(b.heading)}</h3>${c.paras(b.paragraphs)}`).join('\n')}
</div>
</div>
</div>
</section>`;

  const p = home.problems;
  const problems = `<section class="section" aria-labelledby="problems-title" id="common-problems">
<div class="container">
${c.sectionHead({ eyebrow: p.eyebrow, heading: p.heading, intro: p.intro, id: 'problems-title' })}
<div class="problem-grid">${map(
    p.items,
    (it) => `<article class="problem" id="${it.id}">
<h3 class="problem__title">${esc(it.title)}</h3>
<dl class="problem__dl">
<div><dt>What you see</dt><dd>${esc(it.see)}</dd></div>
<div><dt>Why it can happen</dt><dd>${esc(it.why)}</dd></div>
<div><dt>What the work involves</dt><dd>${esc(it.process)}</dd></div>
</dl>
<a class="text-link" href="${it.link}">${esc(services.find((s) => `/${s.slug}/` === it.link)?.name || 'Learn more')} ${icon('arrow', { size: 16 })}</a>
</article>`
  )}</div>
${c.inlineCta('Seeing one of these on your property?', 'Send us some photos')}
</div>
</section>`;

  const galleryHtml = c.gallery({ limit: 4 });
  const gallery = galleryHtml
    ? `<section class="section section--sand" aria-labelledby="gallery-title" id="projects">
<div class="container">
${c.sectionHead({ ...home.gallery, id: 'gallery-title' })}
${galleryHtml}
<div class="center-row"><a class="btn btn--ghost" href="/projects/">View all projects ${icon('arrow', { size: 16 })}</a></div>
</div>
</section>`
    : '';

  const area = `<section class="section section--sand" aria-labelledby="area-title" id="areas">
<div class="container">
${c.sectionHead({ ...home.area, id: 'area-title' })}
${c.areaGrid(locations)}
<p class="area-note">Not listed? We cover the whole Algarve, including ${['Praia da Luz', 'Alvor', 'Ferragudo', 'Silves', 'São Brás de Alportel', 'Santa Luzia'].join(', ')} and inland villages. <a href="#quote" data-quote-link>Ask about your area</a>.</p>
</div>
</section>`;

  const body = html([
    hero,
    c.reviewsSection({ tone: 'sand' }),
    servicesSection,
    c.whyChoose(),
    c.trustStrip(),
    algarve,
    problems,
    gallery,
    c.steps(home.steps),
    area,
    faq.html,
    c.quoteForm({ locations, services, pagePath: '/' }),
  ]);

  return layout({
    path: '/',
    title: home.title,
    description: home.metaDescription,
    ogTitle: 'English-Speaking Painters in the Algarve',
    heroImage: h.image,
    overHero: true,
    bodyClass: 'page-home',
    locations,
    schema: [
      jsonLd(businessSchema({ locations, services })),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${site.baseUrl}/#website`,
        url: `${site.baseUrl}/`,
        name: site.brand,
        inLanguage: site.lang,
        publisher: { '@id': `${site.baseUrl}/#business` },
      }),
      faq.schema,
    ].join('\n'),
    body,
  });
};
