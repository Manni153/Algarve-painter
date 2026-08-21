'use strict';

const site = require('../data/site');
const { esc, rich, heroIntro, renderPage, breadcrumbListSchema } = require('./layout');

const pillars = [
  {
    heading: 'English From the First Call',
    text: 'Every conversation — from the first enquiry to the final walkthrough — happens in clear English. No translation apps, no back-and-forth over language, just a straightforward conversation about what the property needs and what it does not.',
  },
  {
    heading: 'We Know How Algarve Property Weathers',
    text: 'A south-facing wall in Silves, a seafront balcony in Quarteira and a shaded elevation up in Monchique fail in completely different ways and on completely different timescales. What gets specified follows from the property and its exposure rather than from a standard package.',
  },
  {
    heading: 'Preparation Is Quoted, Not Skipped',
    text: 'Washing down, scraping back, filling cracks, treating salt bloom or growth and priming bare patches is where a paint job is won or lost. It is priced as part of the work rather than left out to make a number look smaller.',
  },
  {
    heading: 'An Honest Answer About What Needs Doing',
    text: 'Sometimes a wall needs washing rather than painting, sometimes one elevation is due and the rest will hold another season, and sometimes a coating is the wrong fix entirely. You get told which of those you are looking at, including when the answer costs us the work.',
  },
];

function renderAbout() {
  const pillarItems = pillars
    .map(
      (p, i) => `<div class="pillar">
        <span class="num">${String(i + 1).padStart(2, '0')}</span>
        <div><h3>${esc(p.heading)}</h3><p>${esc(p.text)}</p></div>
      </div>`
    )
    .join('');

  const hero = heroIntro({
    breadcrumb: [{ label: 'Home', href: '/' }, { label: 'About' }],
    h1Text: 'About Algarve Painter',
    headlineHtml: 'A local painting team that explains everything in plain English.',
    subtext: 'Built around one idea: you should understand what you are paying for, and why.',
    ctaNote: 'Questions welcome — no pitch, just answers.',
    noMedia: true,
    dark: true,
  });

  const body = `
  ${hero}

  <section>
    <div class="container">
      <div class="rs-block"><div class="narrow" style="margin: 0 auto;">
        <span class="eyebrow">Who We Are</span>
        <h2>Painting and decorating for English-speaking property owners in the Algarve</h2>
        <p>${rich('Algarve Painter handles <a href="/exterior-house-painting">exterior house painting</a>, <a href="/interior-painting">interior painting</a>, <a href="/villa-pool-area-painting">villa and pool area painting</a>, <a href="/render-crack-repair">render and crack repair</a>, <a href="/wood-shutter-treatment">wood and shutter treatment</a>, <a href="/metalwork-railing-painting">metalwork and railing painting</a> and <a href="/waterproof-roof-coating">waterproof and roof coating</a> for property owners across the Algarve — many of whom split their time between Portugal and the UK, Ireland, the Netherlands or Germany.')}</p>
        <p>Alongside villas, apartments and holiday homes, we take on commercial painting: apartment-block common areas and stairwells, hotel and rental turnarounds, restaurants, shops and offices. Those jobs are planned around opening hours or a changeover window rather than a standard working day, which is usually the constraint that matters most on commercial work.</p>
        <p>Owning a property here and not living in it full-time makes ordinary maintenance harder than it should be — problems go unnoticed for months, and a short visit is not the moment you want to spend arranging trades. That is why the service is built the way it is: clear English from the first call, work carried out while you are away with photographs as it goes, and one number to call afterwards rather than a new search every time something needs attention.</p>
      </div></div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="rs-block">
        <div class="section-head">
          <span class="eyebrow">Why Owners Choose Us</span>
          <h2>What makes Algarve Painter different</h2>
        </div>
        <div class="pillar-list">${pillarItems}</div>
      </div>
    </div>
  </section>

  <section class="cta-band">
    <div class="container">
      <span class="eyebrow">Get Started</span>
      <h2>Talk to Algarve Painter about your property</h2>
      <p class="lede">Call now to discuss exteriors, interiors or repairs — in English, with no confusion.</p>
      <a href="${site.telHref}" class="btn btn-lg btn-icon">${site.phoneDisplay}</a>
    </div>
  </section>
  `;

  const breadcrumbSchema = breadcrumbListSchema([
    { name: 'Home', item: `${site.baseUrl}/` },
    { name: 'About', item: `${site.baseUrl}/about` },
  ]);

  return renderPage({
    path: '/about',
    bodyHtml: body,
    schema: [breadcrumbSchema],
    title: 'About Algarve Painter | Local English-Speaking Painters',
    metaDescription: 'Algarve Painter handles exterior and interior painting, render repair and woodwork for English-speaking property owners across the Algarve, with one point of contact throughout.',
    mainClass: 'page-lagos-rs page-about',
    useHomeHeader: true,
  });
}

module.exports = renderAbout;
