'use strict';

// Hub and company pages: services hub, areas hub, projects, how it works,
// about, contact, thank-you, privacy policy and 404.

const site = require('../data/site');
const home = require('../data/home');
const { esc, phoneHtml, map, html, picture, waHref } = require('../lib/util');
const { icon } = require('../lib/icons');
const c = require('../lib/components');
const { layout } = require('./layout');

function servicesHub({ services, locations }) {
  const path = '/painting-services/';
  const crumbs = c.breadcrumbs([{ name: 'Services', path }]);
  const body = html([
    c.pageHero({
      crumbs: crumbs.nav,
      eyebrow: 'SERVICES · ALGARVE',
      h1: 'Painting Services in the Algarve',
      lead: 'Interior and exterior painting for villas, houses and apartments, from complete villa repaints to rental refreshes and pre-sale preparation. Every project is surveyed, clearly quoted in English and properly prepared.',
      image: 'algarve-villa-exterior-freshly-painted',
      imageAlt: 'Algarve villa with freshly painted rendered walls, white window surrounds and dark shutters',
    }),
    `<section class="section" aria-labelledby="svc-title"><div class="container">
${c.sectionHead({ eyebrow: 'WHAT WE DO', heading: 'Choose a Service', intro: 'Each page explains what the work involves, how the Algarve climate affects it, what is included and how the preparation is done.', id: 'svc-title' })}
${c.serviceCards(services, { feature: true })}
</div></section>`,
    c.whyChoose(),
    c.steps(home.steps),
    c.contactBlock(),
  ]);
  return layout({
    path,
    title: 'Painting Services Algarve | Interior, Exterior & Villa',
    description: 'Interior, exterior, villa, apartment, wall and ceiling, shutter and woodwork painting, plus rental and pre-sale painting across the Algarve, in English.',
    locations,
    schema: crumbs.schema,
    body,
  });
}

function areasHub({ services, locations }) {
  const path = '/areas-we-cover/';
  const crumbs = c.breadcrumbs([{ name: 'Areas', path }]);
  const body = html([
    c.pageHero({
      crumbs: crumbs.nav,
      eyebrow: 'SERVICE AREA',
      h1: 'Painters Across the Algarve',
      lead: 'From the clifftop villas of Lagos and Carvoeiro to the Golden Triangle, Faro and historic Tavira, our English-speaking painters cover the whole Algarve.',
      image: 'carvoeiro-cliff-terrace-rendered-wall',
      imageAlt: 'Clifftop villa terrace with a rendered wall above a sea cove on the Algarve coast',
    }),
    `<section class="section" aria-labelledby="areas-title"><div class="container">
${c.sectionHead({ eyebrow: 'LOCATIONS', heading: 'Choose Your Area', intro: 'Each area page covers the local property types, the conditions that affect paint there and the projects owners most often need.', id: 'areas-title' })}
<ul class="loc-grid" role="list">${locations
      .map(
        (l) => `<li><a class="loc-card" href="/painters-${l.slug}/">${picture(l.image, { alt: '', sizes: '(min-width: 1100px) 260px, (min-width: 700px) 30vw, 46vw', className: 'loc-card__img' })}<span class="loc-card__body"><span class="loc-card__kicker">Painters in</span><strong>${esc(l.name)}</strong><span class="loc-card__muni">${esc(l.municipality)} municipality</span></span></a></li>`
      )
      .join('')}</ul>
<p class="area-note">Not listed? We cover the whole Algarve, including Praia da Luz, Alvor, Ferragudo, Silves, São Brás de Alportel and inland villages. <a href="${waHref("Hi, is my area of the Algarve covered? My property is in ")}" target="_blank" rel="noopener">Ask us on WhatsApp</a>.</p>
</div></section>`,
    c.whyChoose(),
    c.contactBlock(),
  ]);
  return layout({
    path,
    title: 'Areas We Cover | Painters Across the Algarve',
    description: 'English-speaking painters covering Lagos, Portimão, Carvoeiro, Albufeira, Vilamoura, Quinta do Lago, Vale do Lobo, Loulé, Faro, Olhão, Tavira and more.',
    locations,
    schema: crumbs.schema,
    body,
  });
}

function projectsPage({ services, locations }) {
  const path = '/projects/';
  const crumbs = c.breadcrumbs([{ name: 'Projects', path }]);
  const gallery = c.gallery();
  const body = html([
    c.pageHero({
      crumbs: crumbs.nav,
      eyebrow: 'PROJECTS',
      h1: 'Before & After Painting Projects',
      lead: 'Villa exteriors, complete interiors, apartments and rental refreshes across the Algarve. Drag the handle on each project to compare before and after.',
    }),
    `<section class="section section--flush-top" aria-label="Project gallery"><div class="container">
${gallery || '<p class="section-intro">Project photographs are being added. In the meantime, ask us and we will share examples relevant to your property.</p>'}
</div></section>`,
    c.contactBlock({ heading: 'Planning a Project Like These?' }),
  ]);
  return layout({
    path,
    title: 'Painting Projects Algarve | Before & After Gallery',
    description: 'Before and after painting projects from Algarve villas, houses and apartments: exterior repaints, complete interiors, shutters and rental refreshes.',
    locations,
    schema: crumbs.schema,
    body,
  });
}

function howItWorks({ services, locations }) {
  const path = '/how-it-works/';
  const crumbs = c.breadcrumbs([{ name: 'How It Works', path }]);
  const detail = [
    {
      h: 'Tell us about your property',
      p: [
        'Send us a WhatsApp message or call. Tell us where the property is, what type it is and roughly what needs painting. Photographs help a great deal: a wide shot of each area and close-ups of any cracks, peeling or staining, sent straight to our WhatsApp.',
        'If you are not in Portugal, that is normal. Many of our clients own second homes or rentals here, and the whole process can be arranged remotely.',
      ],
    },
    {
      h: 'Property visit',
      p: [
        'A painter visits to look at the surfaces properly: what they are, what condition they are in, what preparation they need and what is underneath the current paint. They measure up and check access, including whether scaffolding or platforms are needed and how outside areas, pools and planting will be protected.',
        'If something needs attention before painting, such as a crack that looks more than cosmetic or staining that suggests an ongoing leak, we tell you at this stage.',
      ],
    },
    {
      h: 'Clear written quote',
      p: [
        'You receive a written quotation in English that sets out the scope area by area: what is being prepared and how, what is being painted, the type of coatings and number of coats, protection, access and the price.',
        'Nothing starts until the scope is agreed. If you want to phase the work, for example the exterior before summer and the interior while you are away, the quote can be structured that way.',
      ],
    },
    {
      h: 'Preparation and painting',
      p: [
        'Floors, furniture, windows, terraces and planting are protected first. Surfaces are cleaned, loose paint removed, cracks and defects filled and bare areas primed. Only then does painting start, with the agreed number of coats.',
        'The property is kept tidy as the work goes on and cleaned at the end. We walk round the finished work with you, or with your key holder or property manager, and share photographs if you are abroad.',
      ],
    },
  ];
  const body = html([
    c.pageHero({
      crumbs: crumbs.nav,
      eyebrow: 'HOW IT WORKS',
      h1: 'How Our Painting Projects Work',
      lead: 'A simple, transparent process in English, from the first message to a finished, clean property. Designed to work just as well if you are not in Portugal.',
      image: 'faro-lagoon-terrace-rendered-wall',
      imageAlt: 'Rendered terrace wall and limestone floor overlooking the Ria Formosa lagoon',
    }),
    c.steps(home.steps),
    `<section class="section section--sand" aria-labelledby="detail-title"><div class="container container--narrow prose">
<h2 class="section-title" id="detail-title">Each Step in Detail</h2>
${detail.map((d, i) => `<h3><span class="prose__num">0${i + 1}</span> ${esc(d.h)}</h3>${c.paras(d.p)}`).join('\n')}
</div></section>`,
    c.whyChoose(),
    c.contactBlock(),
  ]);
  return layout({
    path,
    title: 'How It Works | Algarve Painting Projects in English',
    description: 'How our Algarve painting projects work: tell us about your property, a property visit, a clear written quote, then careful preparation and painting.',
    locations,
    schema: crumbs.schema,
    body,
  });
}

function about({ services, locations }) {
  const path = '/about/';
  const crumbs = c.breadcrumbs([{ name: 'About', path }]);
  const body = html([
    c.pageHero({
      crumbs: crumbs.nav,
      eyebrow: 'ABOUT',
      h1: 'English-Speaking Painters for Algarve Property Owners',
      lead: `${site.brand} exists to make painting an Algarve property straightforward for people who would rather deal with it in English.`,
      image: 'tavira-river-terrace-rendered-wall',
      imageAlt: 'Painted rendered terrace overlooking a river and a historic white Algarve town',
    }),
    `<section class="section" aria-labelledby="about-title"><div class="container container--narrow prose">
<h2 class="section-title" id="about-title">Why we do it this way</h2>
<p>Finding a reliable painter in the Algarve is harder than it should be, especially if your Portuguese is limited or you are not here while the work happens. Owners tell us the same things: quotes that arrive as a single number with no detail, calls that are not returned, and paint jobs that looked fine for one summer before cracking and peeling again because the preparation was skipped.</p>
<p>We set out to do the opposite. Everything is discussed in English. Every project starts with a proper look at the surfaces and a written scope. Preparation is treated as the most important part of the job. And the work is organised so that owners who live abroad can follow it without needing to be here.</p>
<h3>The projects we focus on</h3>
<p>We accept general painting work, but most of what we do is complete projects: whole villas inside and out, full exteriors, complete interiors, apartments, rental properties between tenants or seasons, and properties being prepared for sale. These are the projects where planning, preparation and clear communication make the biggest difference to the result.</p>
<h3>Who we work for</h3>
<p>Our clients are mostly English-speaking property owners in the Algarve: residents, second-home owners, landlords and holiday-let owners, investors and the property managers who look after homes for owners overseas.</p>
${site.disclosure ? `<h3>How we operate</h3><p>${esc(site.disclosure)}</p>` : ''}
</div></section>`,
    c.whyChoose(),
    c.contactBlock(),
  ]);
  return layout({
    path,
    title: `About ${site.brand} | English-Speaking Algarve Painters`,
    description: 'English-speaking painters for Algarve villas, houses and apartments, focused on complete projects, proper preparation and clear written quotes.',
    locations,
    schema: crumbs.schema,
    body,
  });
}

function contact({ services, locations }) {
  const path = '/contact/';
  const crumbs = c.breadcrumbs([{ name: 'Contact', path }]);
  const hours = site.openingHours.length
    ? `<h3>Hours</h3><ul class="plain-list" role="list">${site.openingHours.map((h) => `<li>${esc(h.label)}</li>`).join('')}</ul>`
    : '';
  const body = html([
    c.pageHero({
      crumbs: crumbs.nav,
      eyebrow: 'CONTACT',
      h1: 'Talk to Our Algarve Painters',
      lead: 'WhatsApp is the quickest way to reach us: send a few photos of what needs painting and a line about the property. Prefer to talk? Call us. Either way, everything is in English.',
      actions: false,
    }),
    `<section class="section section--flush-top" aria-labelledby="direct-title"><div class="container">
<h2 class="visually-hidden" id="direct-title">Contact details</h2>
<ul class="contact-cards" role="list">
${site.whatsappEnabled ? `<li><a class="contact-card" href="${waHref()}" target="_blank" rel="noopener">${icon('whatsapp', { size: 28 })}<span class="contact-card__label">WhatsApp</span><strong>Send us a message</strong><span class="contact-card__note">Photos welcome</span></a></li>` : ''}
<li><a class="contact-card" href="${site.telHref}">${icon('phone', { size: 28 })}<span class="contact-card__label">Call</span><strong>${phoneHtml()}</strong><span class="contact-card__note">Speak to us in English</span></a></li>
</ul>
<div class="contact-meta prose">${hours}<h3>Area covered</h3><p>The whole Algarve. See <a href="/areas-we-cover/">areas we cover</a>.</p></div>
</div></section>`,
    c.steps(home.steps),
  ]);
  return layout({
    path,
    title: `Contact ${site.brand} | WhatsApp or Call`,
    description: 'Contact our English-speaking Algarve painters on WhatsApp or by phone. Send photos of what needs painting and we will arrange a visit.',
    locations,
    schema: crumbs.schema,
    body,
  });
}

function privacy({ locations }) {
  const path = '/privacy-policy/';
  const crumbs = c.breadcrumbs([{ name: 'Privacy Policy', path }]);
  const body = `<section class="page-hero page-hero--simple"><div class="container container--narrow">${crumbs.nav}<h1 class="page-hero__title">Privacy Policy</h1></div></section>
<section class="section section--flush-top"><div class="container container--narrow prose">
<p>This policy explains what ${esc(site.brand)} does with the personal information you share with us.</p>
<h2>What we collect</h2>
<p>This website has no forms and does not collect personal information itself. When you call us or send us a WhatsApp message, we receive the details you choose to share: usually your name, phone number, the property location and photographs of the work.</p>
<h2>How we use it</h2>
<p>Only to reply to you, arrange a visit, prepare a quotation and carry out and administer any work you ask us to do. We do not sell your information or use it for unrelated marketing.</p>
<h2>How it is stored</h2>
<p>WhatsApp messages are handled by WhatsApp (Meta) under its own privacy policy. We keep your details only for as long as needed for the purposes above and for our legal and accounting obligations.</p>
<h2>Your rights</h2>
<p>Under the GDPR you can ask to see, correct or delete the personal information we hold about you, or object to how we use it. Contact us at <a href="mailto:${site.email}">${esc(site.email)}</a>. You also have the right to complain to the Portuguese data protection authority, the CNPD.</p>
<h2>Cookies</h2>
<p>This website does not use advertising or tracking cookies.</p>
</div></section>`;
  return layout({
    path,
    title: `Privacy Policy | ${site.brand}`,
    description: `How ${site.brand} uses the personal information you share by phone or WhatsApp, and your rights under the GDPR.`,
    locations,
    schema: crumbs.schema,
    body,
  });
}

function notFound({ locations, services }) {
  const body = `<section class="page-hero page-hero--simple"><div class="container container--narrow">
<p class="eyebrow">PAGE NOT FOUND</p>
<h1 class="page-hero__title">This Page Has Moved or No Longer Exists</h1>
<p class="page-hero__lead">Try one of these instead, or get in touch and we will help.</p>
<ul class="plain-list plain-list--links" role="list">
<li><a href="/">Homepage</a></li>
${services.map((s) => `<li><a href="/${s.slug}/">${esc(s.name)}</a></li>`).join('')}
<li><a href="/areas-we-cover/">Areas we cover</a></li>
<li><a href="/contact/">Contact</a></li>
</ul>
</div></section>`;
  return layout({ path: '/404.html', title: `Page Not Found | ${site.brand}`, description: 'Page not found.', noindex: true, locations, body });
}

module.exports = { servicesHub, areasHub, projectsPage, howItWorks, about, contact, privacy, notFound };
