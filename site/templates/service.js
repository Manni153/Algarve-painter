'use strict';

const { esc, map, jsonLd, html } = require('../lib/util');
const { icon } = require('../lib/icons');
const c = require('../lib/components');
const { layout } = require('./layout');
const { serviceSchema } = require('./schema');

const HERO_PHOTO = require('../data/service-photos');

module.exports = function renderService(s, { services, locations }) {
  const path = `/${s.slug}/`;
  const crumbs = c.breadcrumbs([{ name: 'Services', path: '/painting-services/' }, { name: s.name, path }]);
  const [img, alt] = HERO_PHOTO[s.slug] || HERO_PHOTO['villa-painting'];
  const message = `Hi, I'm looking for ${s.name.toLowerCase()} at my property in the Algarve.`;
  const faq = c.faqSection(s.faqs, { eyebrow: 'FAQ', heading: `${s.name}: Questions Owners Ask`, id: 'faq-title' });
  const related = s.related.map((slug) => services.find((x) => x.slug === slug)).filter(Boolean);

  const hero = c.pageHero({
    crumbs: crumbs.nav,
    eyebrow: s.hero.eyebrow,
    h1: s.hero.h1,
    lead: s.hero.lead,
    image: img,
    imageAlt: alt,
    points: ['English-speaking', 'Free written quote', 'Algarve-wide'],
    message,
  });

  const intro = `<section class="section" aria-labelledby="intro-title">
<div class="container split">
<div class="split__body prose">
<h2 class="section-title" id="intro-title">${esc(s.intro.heading)}</h2>
${c.paras(s.intro.paragraphs)}
</div>
<aside class="aside-card aside-card--summary" aria-labelledby="glance-title">
<h3 class="aside-card__title" id="glance-title">Typically included</h3>
<ul class="tick-list" role="list">${s.included.items.slice(0, 6).map((i) => `<li>${icon('check', { size: 16 })}<span>${esc(i)}</span></li>`).join('')}</ul>
<a class="text-link" href="#included">Full scope ${icon('arrow', { size: 16 })}</a>
</aside>
</div>
</section>`;

  const problems = `<section class="section section--sand" aria-labelledby="problems-title">
<div class="container">
${c.sectionHead({ eyebrow: 'WHAT OWNERS NOTICE', heading: s.problems.heading, intro: s.problems.intro, id: 'problems-title' })}
<ul class="card-grid" role="list">${map(s.problems.items, (p) => `<li class="card"><h3 class="card__title">${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`)}</ul>
</div>
</section>`;

  const detail = `<section class="section" aria-labelledby="detail-title">
<div class="container container--narrow prose">
<p class="eyebrow">IN DETAIL</p>
<h2 class="section-title" id="detail-title">${esc(s.detail.heading)}</h2>
${s.detail.sections.map((d, i) => c.mobileAccordion({ heading: d.heading, body: c.paras(d.paragraphs), keepOpen: i === 0 })).join('\n')}
${c.inlineCta(`Want ${s.name.toLowerCase()} priced properly for your property?`, { label: 'Get a quote on WhatsApp', message })}
</div>
</section>`;

  const algarve = `<section class="section section--sand" aria-labelledby="algarve-title">
<div class="container">
${c.sectionHead({ eyebrow: 'ALGARVE CONSIDERATIONS', heading: s.algarve.heading, id: 'algarve-title' })}
<div class="split split--even">
<div class="prose">${c.paras(s.algarve.paragraphs)}</div>
<ul class="point-list" role="list">${map(s.algarve.points, (p) => `<li><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`)}</ul>
</div>
</div>
</section>`;

  const included = `<section class="section" aria-labelledby="included-title" id="included">
<div class="container">
${c.sectionHead({ eyebrow: 'WHAT IS INCLUDED', heading: s.included.heading, intro: s.included.intro, id: 'included-title' })}
<ul class="tick-list tick-list--cols" role="list">${s.included.items.map((i) => `<li>${icon('check', { size: 18 })}<span>${esc(i)}</span></li>`).join('')}</ul>
</div>
</section>`;

  const prep = `<section class="section section--sand" aria-labelledby="prep-title">
<div class="container">
${c.sectionHead({ eyebrow: 'PREPARATION', heading: s.preparation.heading, intro: s.preparation.intro, id: 'prep-title' })}
<ol class="prep" role="list">${map(
    s.preparation.steps,
    (p, i) => `<li class="prep__item"><span class="prep__num" aria-hidden="true">${i + 1}</span><div><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div></li>`
  )}</ol>
</div>
</section>`;

  const process = c.steps(
    { eyebrow: 'HOW IT WORKS', heading: `How ${s.name} Works`, items: s.process },
    { id: 'process-title' }
  );

  const forWhom = `<section class="section section--sand" aria-labelledby="whom-title">
<div class="container">
${c.sectionHead({ eyebrow: 'WHO WE WORK WITH', heading: s.forWhom.heading, id: 'whom-title' })}
<ul class="card-grid card-grid--2" role="list">${map(s.forWhom.items, (p) => `<li class="card"><h3 class="card__title">${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`)}</ul>
</div>
</section>`;

  const projects = c.gallery({ filter: (p) => p.service === s.slug });
  const projectSection = projects
    ? `<section class="section section--sand" aria-labelledby="proj-title"><div class="container">${c.sectionHead({ eyebrow: 'PROJECTS', heading: `${s.name} Projects`, id: 'proj-title' })}${projects}</div></section>`
    : '';

  const relatedSection = `<section class="section" aria-labelledby="related-title">
<div class="container">
${c.sectionHead({ eyebrow: 'RELATED SERVICES', heading: 'Often Planned Together', id: 'related-title' })}
${c.serviceCards(related, { exclude: s.slug })}
</div>
</section>`;

  const areas = `<section class="section section--sand" aria-labelledby="areas-title">
<div class="container">
${c.sectionHead({ eyebrow: 'LOCATIONS', heading: `Where We Provide ${s.name}`, intro: 'Our painters work throughout the Algarve. Choose your area for local property and painting information.', id: 'areas-title' })}
${c.areaGrid(locations)}
</div>
</section>`;

  const body = html([
    hero,
    intro,
    problems,
    detail,
    algarve,
    included,
    prep,
    c.ctaBand({
      heading: s.cta.heading,
      text: s.cta.text,
      // Avoid showing the hero photograph twice on the same page.
      image: img === 'algarve-villa-exterior-freshly-painted' ? 'carvoeiro-cliff-terrace-rendered-wall' : 'algarve-villa-exterior-freshly-painted',
      message,
    }),
    process,
    forWhom,
    c.whyChoose(undefined, { tone: 'plain' }),
    projectSection,
    relatedSection,
    areas,
    faq.html,
    c.contactBlock({ message }),
  ]);

  return layout({
    path,
    title: s.title,
    description: s.metaDescription,
    locations,
    schema: [jsonLd(serviceSchema(s)), crumbs.schema, faq.schema].join('\n'),
    body,
  });
};
