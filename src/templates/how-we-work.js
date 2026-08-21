'use strict';

const site = require('../data/site');
const { esc, rich, heroIntro, renderPage, breadcrumbListSchema } = require('./layout');

const stages = [
  {
    heading: 'Get in Touch',
    text: 'Call or message on WhatsApp and the first conversation happens entirely in English. It covers the basics — what the property is, roughly what needs painting, and what condition the surfaces are in — so there is a clear idea of next steps before anything is booked in. Photos of the walls, woodwork or any cracking tell us considerably more than a description does.',
  },
  {
    heading: 'Survey & Quote',
    text: 'What gets quoted comes from looking at the property rather than a rate per square metre. Render is checked for cracking, hollow patches and salt bloom; woodwork and metalwork for rot and corrosion; and existing coatings for whether they can be overpainted or have to come off. The quote separates preparation from painting so it is clear what is actually being paid for, and it breaks a large exterior down elevation by elevation rather than giving one number for everything.',
  },
  {
    heading: 'Preparation',
    text: 'Everything that is not being painted gets masked and sheeted first — windows, shutters, terraces, pool surrounds, planting, furniture and floors. Then the surfaces are washed down, scraped back, filled and primed. It is the least visible part of the job and the part that decides whether the result lasts years or seasons.',
  },
  {
    heading: 'Painting',
    text: 'Coats go on in the right conditions rather than to a fixed schedule — the running order across elevations follows the shade and the weather, because paint applied to a wall that is too hot or not dry does not hold. Sites are cleared at the end of each day rather than left as they stand until the job finishes.',
  },
  {
    heading: 'Walkthrough & Aftercare',
    text: 'The job finishes with a walkthrough while the team is still on-site, so anything you want looked at again gets picked up then rather than after everyone has packed up. If you are not in Portugal, that happens over a video call. Leftover paint is labelled and left with you for touch-ups, and the same number used to arrange the work is the number to call afterwards.',
  },
];

const faqs = [
  {
    q: 'Do I need to be at the property for the survey?',
    a: 'Not necessarily. For a straightforward job, photos and a description are often enough to scope it. For a larger property, or where there is cracking or damp involved, looking at it in person gives a considerably more accurate quote — and that can be arranged with whoever holds keys locally rather than waiting for your next visit.',
  },
  {
    q: 'Why is preparation quoted separately from painting?',
    a: 'Because it is where most of the cost and nearly all of the durability sits, and because it is the part a cheaper quote usually leaves out. Separating the two makes it possible to compare quotes honestly rather than on a headline number.',
  },
  {
    q: 'Can the work happen while I am out of the country?',
    a: 'Yes, and for second homes it is routine. Access is arranged with whoever holds keys locally, progress photos are sent through as the work goes, and the final walkthrough happens over a video call.',
  },
  {
    q: 'What happens if the weather turns partway through?',
    a: 'Work pauses on the affected elevation and the surface is allowed to dry rather than being coated over damp. In practice the running order shifts to a sheltered side of the property until the weather passes.',
  },
  {
    q: 'Which areas does this cover?',
    a: 'The whole Algarve, from Sagres in the west to Vila Real de Santo António in the east. See the areas we cover for the full list of towns.',
  },
];

function renderHowWeWork() {
  const stageItems = stages
    .map(
      (s, i) => `<div class="pillar">
        <span class="num">${String(i + 1).padStart(2, '0')}</span>
        <div><h3>${esc(s.heading)}</h3><p>${esc(s.text)}</p></div>
      </div>`
    )
    .join('');

  const faqItems = faqs
    .map(
      (f) => `<div class="faq-item">
        <h3>${esc(f.q)}</h3>
        <p>${esc(f.a)}</p>
      </div>`
    )
    .join('');

  const hero = heroIntro({
    breadcrumb: [{ label: 'Home', href: '/' }, { label: 'How We Work' }],
    h1Text: 'How Algarve Painter Works',
    headlineHtml: 'From first call to the final coat — no surprises along the way.',
    subtext: 'A straightforward look at how an enquiry turns into a finished job.',
    ctaNote: 'Start with a call — see exactly how it works.',
    noMedia: true,
    dark: true,
  });

  const body = `
  ${hero}

  <section>
    <div class="container">
      <div class="rs-block"><div class="narrow" style="margin: 0 auto;">
        <span class="eyebrow">The Short Version</span>
        <h2>Preparation is the job, and it is quoted as such</h2>
        <p><strong>New paint bonds to whatever is underneath it.</strong> That single fact explains almost everything about how this work is organised. A coating over a chalking wall, over damp, over active rust or over unrepaired render is bonded to a failing surface, so it lifts within a season or two regardless of how good the paint itself is. That is why the quote separates preparation from painting, and why a cheaper quote for what looks like the same job is usually cheaper because it is leaving that part out.</p>
        <p>${rich('It also explains why the services overlap the way they do. A facade will not hold its paint until the <a href="/render-crack-repair">cracked render</a> underneath is repaired. Rust off a <a href="/metalwork-railing-painting">balcony rail</a> keeps staining a wall no matter how many times the wall is repainted. Water coming through a <a href="/waterproof-roof-coating">roof terrace</a> shows up as a damp patch on the ceiling below. Handling them together, from one call, avoids the familiar situation where two trades each say the problem belongs to the other.')}</p>
      </div></div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="rs-block">
        <div class="section-head">
          <span class="eyebrow">The Process</span>
          <h2>From enquiry to finished job</h2>
          <p class="lede">Five stages, the same point of contact throughout.</p>
        </div>
        <div class="pillar-list">${stageItems}</div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="rs-block"><div class="narrow" style="margin: 0 auto;">
        <span class="eyebrow">Why It's Set Up This Way</span>
        <h2>One number, coverage across the whole region</h2>
        <p>One number and one WhatsApp cover the whole Algarve, from Sagres to Vila Real de Santo António. For owners with more than one property in the region — which is common enough — that means several jobs can be scheduled as a single run of work rather than arranged separately with different trades in different towns.</p>
        <p>It also means the answer you get about what your property needs is not shaped by what happens to be convenient to sell. Sometimes a wall needs washing rather than painting; sometimes one elevation is due and the rest will hold another season; sometimes a coating is the wrong fix entirely and the honest answer is that the problem is a leak, a threshold or a plumbing run. You get told which of those it is.</p>
      </div></div>
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

  <section class="cta-band">
    <div class="container">
      <span class="eyebrow">Get Started</span>
      <h2>Talk through what your property needs</h2>
      <p class="lede">Call or WhatsApp now — in English, with no jargon and no pressure.</p>
      <a href="${site.telHref}" class="btn btn-lg btn-icon">${site.phoneDisplay}</a>
    </div>
  </section>
  `;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = breadcrumbListSchema([
    { name: 'Home', item: `${site.baseUrl}/` },
    { name: 'How We Work', item: `${site.baseUrl}/how-we-work` },
  ]);

  return renderPage({
    path: '/how-we-work',
    bodyHtml: body,
    schema: [breadcrumbSchema, faqSchema],
    title: 'How Algarve Painter Works | From Call to Final Coat',
    metaDescription: 'See how Algarve Painter turns an enquiry into a finished job — one call, a proper survey, preparation quoted separately, then painting and a walkthrough.',
    mainClass: 'page-lagos-rs page-how-we-work',
    useHomeHeader: true,
  });
}

module.exports = renderHowWeWork;
