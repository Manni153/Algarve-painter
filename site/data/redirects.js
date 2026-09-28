'use strict';

// Permanent redirects from the previous version of the site (src/ → public/)
// to the equivalent new page, so any links or indexed URLs keep their value.
// Netlify matches these with and without a trailing slash.

const town = (from, to) => [`/${from}`, `/painters-${to}/`];

module.exports = [
  ['/villa-pool-area-painting', '/villa-painting/'],
  ['/render-crack-repair', '/walls-ceilings/'],
  ['/wood-shutter-treatment', '/doors-shutters-woodwork/'],
  ['/metalwork-railing-painting', '/doors-shutters-woodwork/'],
  ['/waterproof-roof-coating', '/exterior-house-painting/'],
  ['/how-we-work', '/how-it-works/'],
  // The quote form (and its thank-you page) was removed: contact is by phone
  // and WhatsApp only.
  ['/thank-you', '/'],

  // Town pages that now have a /painters-<town>/ page.
  ...['albufeira', 'almancil', 'carvoeiro', 'faro', 'lagoa', 'lagos', 'loule', 'olhao', 'portimao', 'quarteira', 'tavira', 'vilamoura'].map((t) => town(t, t)),

  // Old town pages without their own page yet: nearest covered location.
  town('aljezur', 'lagos'),
  town('sagres', 'lagos'),
  town('praia-da-luz', 'lagos'),
  town('alvor', 'portimao'),
  town('monchique', 'portimao'),
  town('ferragudo', 'lagoa'),
  town('silves', 'lagoa'),
  town('sao-bras-de-alportel', 'loule'),
  town('castro-marim', 'tavira'),
  town('vila-real-de-santo-antonio', 'tavira'),
];
