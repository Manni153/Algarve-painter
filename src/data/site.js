'use strict';

// ---------------------------------------------------------------------------
// PLACEHOLDER PHONE NUMBER — REPLACE BEFORE LAUNCH.
// These two constants are the single source of truth for every phone touch
// point on the site: header button, hero CTA, sticky mobile call bar, every
// in-page CTA band, the footer, the contact page and the LocalBusiness JSON-LD.
// Change them here and the whole site updates; nothing else hardcodes a number.
// build.js prints a warning while the placeholder is still in place.
// ---------------------------------------------------------------------------
const phoneDisplay = '+351 000 000 000';
const phoneTel = '+351000000000';

// Exported so build.js can warn while the placeholder is still in place.
const PHONE_IS_PLACEHOLDER = phoneTel === '+351000000000';

module.exports = {
  brand: 'Algarve Painter',
  domainDisplay: 'AlgarvePainter.com',
  baseUrl: 'https://www.algarvepainter.com',
  phoneDisplay,
  phoneTel,
  PHONE_IS_PLACEHOLDER,
  telHref: `tel:${phoneTel}`,
  whatsappHref: `https://wa.me/${phoneTel.replace(/\D/g, '')}?text=${encodeURIComponent(
    "Hi Algarve Painter, I'd like to ask about painting my property."
  )}`,

  // Primary nav shown inside the hamburger menu on every page.
  serviceNav: [
    { label: 'Exterior House Painting', href: '/exterior-house-painting' },
    { label: 'Interior Painting', href: '/interior-painting' },
    { label: 'Villa & Pool Area Painting', href: '/villa-pool-area-painting' },
    { label: 'Render & Crack Repair', href: '/render-crack-repair' },
    { label: 'Wood & Shutter Treatment', href: '/wood-shutter-treatment' },
    { label: 'Metalwork & Railing Painting', href: '/metalwork-railing-painting' },
    { label: 'Waterproof & Roof Coating', href: '/waterproof-roof-coating' },
  ],

  companyNav: [
    { label: 'How We Work', href: '/how-we-work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  // Compact labels for the inline desktop header nav — shorter than
  // serviceNav's drawer labels since the header row has limited width.
  headerServiceNav: [
    { label: 'Exterior', href: '/exterior-house-painting' },
    { label: 'Interior', href: '/interior-painting' },
    { label: 'Villa & Pool', href: '/villa-pool-area-painting' },
    { label: 'Render Repair', href: '/render-crack-repair' },
    { label: 'Wood & Shutters', href: '/wood-shutter-treatment' },
    { label: 'Metalwork', href: '/metalwork-railing-painting' },
    { label: 'Roof Coating', href: '/waterproof-roof-coating' },
  ],

  // Mobile (<768px) uses this two-tier value/label format directly —
  // shortened labels chosen to read cleanly as a short second line under a
  // bold first line.
  trustStats: [
    { value: '100%', label: 'English-Speaking' },
    { value: 'Local', label: 'Based' },
    { value: 'Clean', label: 'Finish' },
  ],

  // Tablet (768px+) and desktop single-line versions of the same three
  // trust points, for the homepage hero's inline stats row.
  heroStatsDesktop: ['100% English-Speaking', 'Locally Based', 'Clean, Tidy Finish'],

  // Mobile AND tablet (<=1024px) render each stat as icon / value line /
  // label line (three stacked rows) instead of desktop's single combined
  // string above. Desktop (1025px+) keeps heroStatsDesktop, unaffected.
  heroStatsShort: [
    { value: '100%', label: 'English-Speaking' },
    { value: 'Locally', label: 'Based' },
    { value: 'Clean', label: 'Finish' },
  ],

  trustSection: [
    {
      heading: 'English-Speaking, Start to Finish',
      text: 'Every call, quote and site visit is handled in clear English — no translation, no guesswork, from the first conversation to the final walkthrough once the last coat is dry.',
      icon: 'chat',
    },
    {
      heading: 'Local Algarve Decorators',
      text: 'Based in the Algarve and working across the region, with a real understanding of how coastal sun, salt air and winter rain actually behave on a rendered wall here.',
      icon: 'pin',
    },
    {
      heading: 'Preparation Is the Job',
      text: 'Washing down, scraping back, filling cracks, treating any damp or salt bloom and priming bare patches is where a paint job is won or lost. It is quoted as part of the work rather than skipped to make a number look smaller.',
      icon: 'tools',
    },
    {
      heading: 'One Team, Whole Property',
      text: 'Walls, woodwork, railings, shutters, render repairs and roof coatings are handled under one roof, so a facade repaint and the crack repair underneath it are one job with one point of contact rather than two trades blaming each other.',
      icon: 'link',
    },
  ],

  // General process outline. Deliberately no specific timelines or response
  // commitments — only what's actually true of how the work happens.
  process: [
    {
      heading: 'Get in Touch',
      text: 'A call or WhatsApp message starts things off, and that first conversation happens entirely in English — no translation, no guessing at technical terms in a second language. It covers the basics: what the property is, roughly what needs painting, and what condition the surfaces are in, so there is a clear idea of next steps before anything is booked in.',
    },
    {
      heading: 'Survey & Quote',
      text: 'What actually gets quoted comes from looking at the property, not from a price-per-square-metre table. Render is checked for cracking, hollow patches and salt bloom; woodwork and metalwork are checked for rot and rust; previous coatings are checked for whether they can be overpainted or need stripping back. A villa whose south-facing wall has been baking for eight years needs a different specification than one repainted three summers ago.',
    },
    {
      heading: 'Preparation & Painting',
      text: 'Surfaces are washed down, scraped back, filled and primed before any topcoat goes on, and everything that is not being painted gets masked and sheeted first. Furniture, terraces, pool surrounds and planting are protected rather than worked around, and the site is cleared at the end of each day rather than left as it stands.',
    },
    {
      heading: 'Walkthrough & Aftercare',
      text: 'The job finishes with a walkthrough of the work while the team is still on-site, so anything you want looked at again gets picked up then rather than after everyone has packed up. Leftover paint is labelled and left with you for touch-ups, and the same number used to arrange the work is the number to call afterwards.',
    },
  ],

  faqs: [
    {
      q: 'Do you supply the paint as well as doing the work?',
      a: 'Yes — materials and labour are quoted as one job, so there is a single point of contact if anything ever needs attention, rather than being sent back and forth between a supplier and a decorator. If you have a particular product or colour in mind, that can be worked to instead.',
    },
    {
      q: 'What areas of the Algarve do you cover?',
      a: 'We work across the Algarve, from Sagres in the west to Vila Real de Santo António in the east. See the areas we cover below, or get in touch to check your specific location.',
    },
    {
      q: 'Do you do commercial work as well as houses?',
      a: 'Yes. Alongside villas, apartments and holiday homes, we take on commercial painting — apartment-block common areas and stairwells, rental and hotel-room turnarounds, restaurants, shops and offices. Commercial jobs are usually planned around opening hours or a changeover window rather than a standard working day.',
    },
    {
      q: 'What time of year is best for exterior painting in the Algarve?',
      a: 'Spring and autumn are generally the most forgiving — high summer means south-facing walls get hot enough that paint can flash off before it levels properly, and midwinter brings rain and overnight damp that stops a coat curing. Work happens year-round, but the sequence gets planned around the weather and which elevation is in shade.',
    },
    {
      q: 'Is the whole job explained in English?',
      a: 'Yes — including the technical parts explained in plain language rather than assuming familiarity with trade terms. If words like "elastomeric", "salt bloom" or "hollow render" do not mean anything to you, that is normal, and explaining what they mean for your wall is part of the job.',
    },
    {
      q: 'How much does it cost to paint a villa?',
      a: 'It depends on the size of the property, how many coats the surfaces need, how much preparation and crack repair is involved, and how much of the work needs scaffolding or access equipment — there is no single price that fits every property. Call or WhatsApp with a few details and you will get an answer specific to your situation rather than a generic estimate.',
    },
    {
      q: 'Do I need to move out while the work is done?',
      a: 'For exterior work, almost never — the work happens outside and access is only needed to shutters, windows and any terraces being painted. For interiors, rooms are usually done in sequence so the property stays liveable, with furniture moved to the centre and sheeted rather than removed.',
    },
    {
      q: 'How long does exterior paint actually last here?',
      a: 'Longer on a sheltered north elevation than on a south or west wall taking direct afternoon sun and salt air off the sea, which is why one side of a villa often looks tired while another still looks fine. Realistic expectations for your specific property are worth talking through before choosing a specification, rather than assuming one figure covers the whole building.',
    },
    {
      q: 'Can you match a colour that is already on the property?',
      a: 'In most cases yes — an existing colour can usually be matched closely from a sample, which matters for a repair or a single elevation rather than a whole repaint. Bear in mind that a matched colour will look newer than the faded paint beside it, so a full elevation is often the cleaner result.',
    },
    {
      q: 'Can you work on a property while I am not in Portugal?',
      a: 'Yes — this is common for second homes and rentals. Access is arranged with whoever holds keys locally, progress photos are sent through as the work goes, and the walkthrough can happen over a video call rather than waiting for your next visit.',
    },
  ],
};
