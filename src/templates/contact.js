'use strict';

const site = require('../data/site');
const { heroIntro, renderPage, breadcrumbListSchema } = require('./layout');

function renderContact() {
  const hero = heroIntro({
    breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Contact' }],
    h1Text: 'Contact Algarve Painter',
    headlineHtml: 'Call or WhatsApp — get a straight answer today.',
    subtext: 'Call now for the fastest response, or send photos of the walls on WhatsApp.',
    ctaNote: 'Fastest way to a clear answer.',
    noMedia: true,
    dark: true,
  });

  const body = `
  ${hero}

  <section>
    <div class="container">
      <div class="rs-block"><div class="section-head">
        <span class="eyebrow">Get in Touch</span>
        <h2>Call or WhatsApp us directly</h2>
        <p class="lede">The fastest way to a straight answer — and photos of the surfaces tell us more than a description can.</p>
      </div>
      <div class="contact-direct">
        <div class="contact-direct-card">
          <h3>Call Us</h3>
          <span class="big-phone">${site.phoneDisplay}</span>
          <a href="${site.telHref}" class="btn btn-block btn-icon">${site.phoneDisplay}</a>
        </div>
        <div class="contact-direct-card">
          <h3>WhatsApp</h3>
          <p>Send a few photos of the walls, woodwork or cracks for a quicker, more specific answer.</p>
          <a href="${site.whatsappHref}" class="btn btn-outline btn-block" target="_blank" rel="noopener">Chat on WhatsApp</a>
        </div>
      </div></div>
    </div>
  </section>
  `;

  const breadcrumbSchema = breadcrumbListSchema([
    { name: 'Home', item: `${site.baseUrl}/` },
    { name: 'Contact', item: `${site.baseUrl}/contact` },
  ]);

  return renderPage({
    path: '/contact',
    bodyHtml: body,
    schema: [breadcrumbSchema],
    title: 'Contact Algarve Painter | Call or WhatsApp Today',
    metaDescription: 'Call or WhatsApp Algarve Painter for a fast, straightforward answer about exterior painting, interiors, render repair or woodwork — no forms, no waiting.',
    mainClass: 'page-lagos-rs page-contact',
    useHomeHeader: true,
  });
}

module.exports = renderContact;
