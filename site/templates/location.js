'use strict';

const home = require('../data/home');
const { esc, map, jsonLd, html } = require('../lib/util');
const { icon } = require('../lib/icons');
const c = require('../lib/components');
const { layout } = require('./layout');
const { locationSchema } = require('./schema');

module.exports = function renderLocation(l, { services, locations }) {
  const path = `/painters-${l.slug}/`;
  const crumbs = c.breadcrumbs([{ name: 'Areas', path: '/areas-we-cover/' }, { name: `Painters in ${l.name}`, path }]);
  const faq = c.faqSection(l.faqs, { eyebrow: 'FAQ', heading: `Painting in ${l.name}: Common Questions`, id: 'faq-title' });
  const message = `Hi, I'm looking for painting work at my property in ${l.name}.`;
  const nearby = l.nearby.map((slug) => locations.find((x) => x.slug === slug)).filter(Boolean);

  const hero = c.pageHero({
    crumbs: crumbs.nav,
    eyebrow: `PAINTERS · ${l.name.toUpperCase()}`,
    h1: l.hero.h1,
    lead: l.hero.lead,
    image: l.image,
    imageAlt: l.imageAlt,
    points: ['English-speaking', 'Interior + exterior', `Covering ${l.name} & nearby`],
    message,
  });

  const intro = `<section class="section" aria-labelledby="intro-title">
<div class="container split">
<div class="split__body prose">
<h2 class="section-title" id="intro-title">${esc(l.intro.heading)}</h2>
${c.paras(l.intro.paragraphs)}
</div>
<aside class="aside-card" aria-labelledby="covered-title">
<h3 class="aside-card__title" id="covered-title">Areas we cover around ${esc(l.name)}</h3>
<ul class="chip-list" role="list">${l.areas.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
<p class="aside-card__note">${icon('pin', { size: 16 })}<span>${esc(l.name)} is in the municipality of ${esc(l.municipality)}.</span></p>
</aside>
</div>
</section>`;

  const property = `<section class="section section--sand" aria-labelledby="property-title">
<div class="container">
${c.sectionHead({ eyebrow: `${l.name.toUpperCase()} PROPERTY`, heading: l.property.heading, intro: l.property.intro, id: 'property-title' })}
<ul class="card-grid card-grid--2" role="list">${map(l.property.items, (p) => `<li class="card"><h3 class="card__title">${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`)}</ul>
</div>
</section>`;

  const conditions = `<section class="section" aria-labelledby="conditions-title">
<div class="container">
${c.sectionHead({ eyebrow: 'LOCAL CONDITIONS', heading: l.conditions.heading, id: 'conditions-title' })}
<div class="split split--even">
<div class="prose">${c.paras(l.conditions.paragraphs)}</div>
<ul class="point-list" role="list">${map(l.conditions.points, (p) => `<li><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`)}</ul>
</div>
${c.inlineCta(`Own a property in ${l.name}?`, { label: 'Arrange a visit on WhatsApp', message })}
</div>
</section>`;

  const svc = `<section class="section section--sand" aria-labelledby="svc-title">
<div class="container">
${c.sectionHead({ eyebrow: 'SERVICES', heading: `Painting Services in ${l.name}`, id: 'svc-title' })}
<ul class="service-grid service-grid--local" role="list">${map(l.services, (item) => {
    const s = services.find((x) => x.slug === item.slug);
    if (!s) return '';
    return `<li class="service-card"><a class="service-card__link" href="/${s.slug}/"><h3 class="service-card__title">${esc(s.name)}</h3><p class="service-card__text">${esc(item.text)}</p><span class="service-card__more">${esc(s.name)} ${icon('arrow', { size: 16 })}</span></a></li>`;
  })}</ul>
<p class="more-links">Also available in ${esc(l.name)}: ${services
    .filter((s) => !l.services.some((x) => x.slug === s.slug))
    .map((s) => `<a href="/${s.slug}/">${esc(s.name.toLowerCase())}</a>`)
    .join(', ')}.</p>
</div>
</section>`;

  // Projects in this location (if any) sit inside the scenarios section so
  // the alternating section backgrounds stay in rhythm.
  const projects = c.gallery({ filter: (p) => p.locationSlug === l.slug });
  const scenarios = `<section class="section" aria-labelledby="scen-title">
<div class="container">
${c.sectionHead({ eyebrow: 'TYPICAL PROJECTS', heading: l.scenarios.heading, id: 'scen-title' })}
<ul class="card-grid" role="list">${map(l.scenarios.items, (p) => `<li class="card card--line"><h3 class="card__title">${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`)}</ul>
${projects ? `<h3 class="subhead">Painting projects in ${esc(l.name)}</h3>${projects}` : ''}
</div>
</section>`;

  const areaSection = `<section class="section section--sand" aria-labelledby="near-title">
<div class="container">
${c.sectionHead({ eyebrow: 'NEARBY', heading: `Painters Near ${l.name}`, id: 'near-title' })}
<ul class="near-list" role="list">${nearby.map((n) => `<li><a class="near-card" href="/painters-${n.slug}/"><span>Painters in</span><strong>${esc(n.name)}</strong>${icon('arrow', { size: 18 })}</a></li>`).join('')}</ul>
<h3 class="subhead">All areas we cover</h3>
${c.areaGrid(locations, { current: l.slug })}
</div>
</section>`;

  const body = html([
    hero,
    intro,
    property,
    conditions,
    svc,
    scenarios,
    c.whyChoose({ ...home.why, heading: `Why ${l.name} Property Owners Choose Our Painters` }),
    c.steps(home.steps),
    areaSection,
    faq.html,
    c.contactBlock({
      eyebrow: `PAINTERS IN ${l.name.toUpperCase()}`,
      heading: `Painting a Property in ${l.name}?`,
      text: `Send us a few photos on WhatsApp with a line about the property. We reply in English and arrange a visit in ${l.name}.`,
      message,
    }),
  ]);

  return layout({
    path,
    title: l.title,
    description: l.metaDescription,
    locations,
    schema: [jsonLd(locationSchema(l)), crumbs.schema, faq.schema].join('\n'),
    body,
  });
};
