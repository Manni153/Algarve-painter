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

const locations = list
  .map((l) => {
    const photo = PHOTOS[l.slug];
    if (!photo) throw new Error(`No photo mapped for location "${l.slug}"`);
    return { ...l, image: photo[0], imageAlt: photo[1] };
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'pt'));

module.exports = locations;
