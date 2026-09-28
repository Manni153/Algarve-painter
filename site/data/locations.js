'use strict';

// All location pages, alphabetical. Content lives in locations-a.js and
// locations-b.js (split only to keep the files a manageable size); this file
// adds the photograph for each page and exports the combined list.
//
// To add a location: add an entry following docs/content-guide.md to either
// file, add its photograph below, and rebuild. The page, navigation, footer,
// area grid, quote-form dropdown, sitemap and redirects all pick it up.

const list = [...require('./locations-a'), ...require('./locations-b')];

// Image key (see site/data/images.json) and honest alt text for each page.
// The photographs are views from rendered, painted terraces; the alt text
// describes what is in the picture, not a claim about a specific job.
const PHOTOS = {
  albufeira: ['albufeira-coastal-terrace-rendered-wall', 'Painted rendered terrace wall and limestone floor overlooking a beach and clifftop villas'],
  almancil: ['loule-countryside-terrace-rendered-wall', 'Villa terrace with a warm rendered wall looking out over green countryside and hills'],
  carvoeiro: ['carvoeiro-cliff-terrace-rendered-wall', 'Clifftop villa terrace with a rendered wall above a sea cove and golden cliffs'],
  faro: ['faro-lagoon-terrace-rendered-wall', 'Rendered terrace overlooking the Ria Formosa lagoon with the city beyond'],
  lagoa: ['lagoa-coast-terrace-rendered-wall', 'Villa terrace with a painted rendered pillar above rocky coves and pine-covered clifftops'],
  lagos: ['lagos-sea-view-terrace-rendered-wall', 'Sea-view terrace with a rendered wall and shutter overlooking cliffs and the Atlantic'],
  loule: ['barrocal-olive-hills-terrace-rendered-wall', 'Countryside terrace with a warm rendered wall looking over olive and carob trees in the hills'],
  olhao: ['olhao-harbour-terrace-rendered-wall', 'Rendered terrace above a harbour with fishing boats and a white town on the water'],
  portimao: ['arade-river-terrace-rendered-wall', 'Villa terrace with a rendered pillar overlooking a wide river estuary and town'],
  quarteira: ['seafront-town-terrace-rendered-wall', 'Terrace with a painted rendered wall above white seafront buildings and the sea'],
  'quinta-do-lago': ['ria-formosa-pines-terrace-rendered-wall', 'Villa terrace with a rendered wall among umbrella pines overlooking the lagoon'],
  tavira: ['tavira-river-terrace-rendered-wall', 'Rendered terrace wall overlooking a river and a historic white town with church towers'],
  'vale-do-lobo': ['red-cliffs-beach-terrace-rendered-wall', 'Clifftop terrace among pines above red cliffs and a long sandy beach'],
  vilamoura: ['vilamoura-golf-view-terrace-rendered-wall', 'Painted rendered terrace wall overlooking a golf course, lake and villas'],
};

// Short descriptor shown under each town in the area grids, and the order
// the grids use (the most important markets first).
const TAGLINES = {
  vilamoura: 'Marina, golf and townhouses',
  'quinta-do-lago': 'Estate villas among the pines',
  'vale-do-lobo': 'Resort villas above the cliffs',
  almancil: 'Golden Triangle villas',
  loule: 'Market town and country quintas',
  albufeira: 'Clifftop villas and apartments',
  carvoeiro: 'Clifftop homes and holiday lets',
  lagoa: 'Porches, Ferragudo and quintas',
  portimao: 'Seafront apartments and Alvor',
  lagos: 'Old Town and sea-view villas',
  faro: 'City apartments and townhouses',
  tavira: 'Historic town and coastal villages',
  quarteira: 'Seafront apartment blocks',
  olhao: 'Cubist houses by the Ria Formosa',
};
const RANK = Object.keys(TAGLINES);

const locations = list
  .map((l) => {
    const photo = PHOTOS[l.slug];
    if (!photo) throw new Error(`No photo mapped for location "${l.slug}"`);
    if (!TAGLINES[l.slug]) throw new Error(`No tagline for location "${l.slug}"`);
    return { ...l, image: photo[0], imageAlt: photo[1], tagline: TAGLINES[l.slug], rank: RANK.indexOf(l.slug) };
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'pt'));

module.exports = locations;
