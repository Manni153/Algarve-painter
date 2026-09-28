'use strict';

// ---------------------------------------------------------------------------
// BEFORE & AFTER PROJECTS
//
// Each entry drives one card in the homepage gallery and on /projects/.
// To publish a real project:
//   1. Put the two photographs in site/photos/ with descriptive names, e.g.
//        vilamoura-villa-exterior-before.jpg
//        vilamoura-villa-exterior-after.jpg
//      Shoot them from the same position and framing so the slider lines up.
//   2. Run: python3 tools/site-images.py
//   3. Fill in `before` / `after` with those names (no extension), write
//      accurate alt text, and delete `illustration`.
//
// While `before`/`after` are null the card shows a drawn illustration of the
// project type (clearly labelled as an illustration, never passed off as
// real work). Set `showIllustrations: false` to hide unphotographed entries
// entirely once you have enough real projects.
// ---------------------------------------------------------------------------

module.exports = {
  showIllustrations: true,
  items: [
    {
      type: 'Villa Exterior',
      location: 'Vilamoura',
      locationSlug: 'vilamoura',
      service: 'villa-painting',
      description:
        'Full exterior repaint of a detached villa: façade washing, crack filling, parapets, chimneys and boundary walls, with shutters refinished to match.',
      before: null,
      beforeAlt: '',
      after: null,
      afterAlt: '',
      illustration: 'villa',
    },
    {
      type: 'Interior Repaint',
      location: 'Quinta do Lago',
      locationSlug: 'quinta-do-lago',
      service: 'interior-painting',
      description:
        'Complete interior repaint of an occupied villa, room by room, with high ceilings, stain-blocking on old water marks and furniture protected throughout.',
      before: null,
      beforeAlt: '',
      after: null,
      afterAlt: '',
      illustration: 'interior',
    },
    {
      type: 'Apartment Painting',
      location: 'Albufeira',
      locationSlug: 'albufeira',
      service: 'apartment-painting',
      description:
        'Holiday apartment refreshed between seasons: walls, ceilings and woodwork in durable washable finishes, with balcony walls repainted.',
      before: null,
      beforeAlt: '',
      after: null,
      afterAlt: '',
      illustration: 'apartment',
    },
    {
      type: 'Villa Exterior',
      location: 'Lagos',
      locationSlug: 'lagos',
      service: 'exterior-house-painting',
      description:
        'Sea-facing villa exterior: salt residue washed off, flaking paint removed, hairline cracks filled and railings treated before repainting.',
      before: null,
      beforeAlt: '',
      after: null,
      afterAlt: '',
      illustration: 'shutters',
    },
  ],
};
