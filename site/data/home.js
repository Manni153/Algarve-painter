'use strict';

// Homepage copy and the shared blocks reused on service and location pages
// (why-choose-us, how-it-works steps, trust strip). See docs/content-guide.md
// for the rules this copy follows.

module.exports = {
  title: 'Painters Algarve | English-Speaking House & Villa Painters',
  metaDescription:
    'English-speaking painters in the Algarve for villas, houses and apartments. Interior and exterior painting, proper preparation and clear written quotes.',

  hero: {
    eyebrow: 'PAINTING · ALGARVE',
    h1Lines: ['English-Speaking', 'Painters', 'in the Algarve'],
    lead: ['Interior looking tired? Exterior paint peeling?', 'We quote. We prepare. We paint.'],
    image: 'algarve-villa-exterior-freshly-painted',
    imageAlt:
      'Algarve villa with freshly painted warm rendered walls, white window surrounds and dark shutters at golden hour',
  },

  heroStats: [
    { value: '100%', label: 'English-Speaking' },
    { value: 'Interior + Exterior', label: 'Painting' },
    { value: 'Algarve-Wide', label: 'Coverage' },
  ],

  services: {
    eyebrow: 'WHAT WE DO',
    heading: 'Painting Services for Algarve Homes & Villas',
    intro:
      'From a complete villa repaint to a full interior refresh before a sale, every project starts with the same thing: a proper look at the surfaces and a clear written scope.',
  },

  why: {
    eyebrow: 'WHY CHOOSE US',
    heading: 'Why Algarve Property Owners Choose Our Painters',
    items: [
      {
        icon: 'chat',
        title: 'No Language Barrier',
        text: 'Everything from the initial quotation to colours, preparation and project details can be discussed in English.',
      },
      {
        icon: 'doc',
        title: 'Detailed Quotations',
        text: 'Clear scope and pricing before work begins. You can see what is being prepared, what is being painted and how many coats, surface by surface.',
      },
      {
        icon: 'layers',
        title: 'Proper Preparation',
        text: 'Surfaces are properly prepared before painting rather than simply painted over. Cleaning, scraping, filling and priming are part of the job, not an extra.',
      },
      {
        icon: 'shield',
        title: 'Clean & Careful Work',
        text: 'Floors, furniture, windows and surrounding surfaces are protected during work, and the property is left clean at the end of each day.',
      },
      {
        icon: 'pin',
        title: 'Algarve-Wide Coverage',
        text: 'Covering homes, villas and apartments throughout the Algarve, from Lagos in the west to Tavira in the east.',
      },
    ],
  },

  // Dark strip between sections. Deliberately factual: what the service is,
  // not claims about how many jobs have been done.
  trustStrip: [
    { value: 'English', label: 'From first call to final walk-round' },
    { value: 'Written', label: 'Scope and quotation before work starts' },
    { value: 'Prepared', label: 'Surfaces cleaned, repaired and primed' },
    { value: 'Protected', label: 'Floors, furniture, pools and planting' },
  ],

  algarve: {
    eyebrow: 'PAINTING IN THE ALGARVE',
    heading: 'What the Algarve Climate Does to Paint',
    intro:
      'Paint behaves differently here than it does in northern Europe. If you have owned property in the Algarve for a few years, you have probably already seen it: one wall looks fine while another has faded to chalk, shutters that were glossy three summers ago are grey and split, and a hairline crack keeps coming back through the paint. None of this means the previous painter was necessarily bad. It is what strong sun, salt air, winter rain and hard-working render do over time. Understanding it is the first step to a repaint that lasts.',
    image: 'albufeira-coastal-terrace-rendered-wall',
    imageAlt: 'Rendered terrace wall and limestone floor on a villa overlooking the Algarve coast and a sandy beach',
    blocks: [
      {
        heading: 'Intense sun and UV exposure',
        paragraphs: [
          'The Algarve has some of the sunniest weather in Europe, and ultraviolet light is the main thing that breaks down a paint film. Colours fade, pigments lose their depth and the surface can become chalky, so a finger drawn across the wall comes away white or coloured. South and west-facing elevations take the most punishment, which is why one side of a villa often needs attention years before the others.',
          'Heat matters as much as light. A south-facing wall in August can be too hot to paint well, because the coating dries before it has levelled and bonded. Good exterior work here is planned around the sun: which elevation is in shade at which time of day, and which months suit the job.',
        ],
      },
      {
        heading: 'Salt air on the coast',
        paragraphs: [
          'Properties close to the sea, particularly on the clifftops around Carvoeiro, Albufeira and Lagos, carry a fine film of salt on every exterior surface. Salt attracts moisture and can interfere with how new paint bonds, so washing down before painting matters more on the coast than inland. Railings, gates and metal fixings rust faster here too, and that rust will bleed through paint if it is simply painted over.',
        ],
      },
      {
        heading: 'Humidity, damp and mould staining',
        paragraphs: [
          'The Algarve is dry in summer but can be surprisingly damp in winter, especially in properties that are closed up for months at a time, near the Ria Formosa lagoon, or in north-facing rooms that never see the sun. Dark spotting in the corners of ceilings, grey patches behind wardrobes and staining low on external walls are common.',
          'Painting can clean up and refresh these surfaces, and suitable coatings and stain-blocking primers help. But paint is not a cure for damp. If moisture is coming from a leak, a failed terrace, poor ventilation or rising from the ground, that cause needs identifying first, sometimes by another specialist, or the staining will come back. We will tell you honestly when we think that is the case.',
        ],
      },
      {
        heading: 'Render, cracks and older villas',
        paragraphs: [
          'Most Algarve houses are rendered masonry, finished in paint or, on older and traditional buildings, lime wash. Render moves with heat and cold, and fine cracks through the paint are very common, particularly around windows, at corners and where walls meet terraces. Many of these are superficial and can be opened up, filled and painted so they are no longer visible.',
          'Wider or recurring cracks, bulging or hollow-sounding render, or cracks that run diagonally from openings can indicate something more than cosmetic movement. Those need assessing before they are painted over, so we flag them rather than hide them. Older villas also tend to carry many layers of old paint, some of it poorly bonded, which is why testing and scraping back comes before any new coat.',
        ],
      },
      {
        heading: 'White façades, balconies, terraces and boundary walls',
        paragraphs: [
          'The crisp white Algarve façade is beautiful when it is fresh and shows every flaw when it is not. Dust, rain streaks, algae on shaded walls and rust runs from railings all stand out against white. Balconies and terraces take the hardest wear: water sits on them, the sun hits them hard and the join between floor and wall is where paint most often lifts first.',
          'Boundary walls are the forgotten surface on many properties. They take sun on both faces, irrigation spray at the base and soil against the bottom, and they are often the first thing a buyer or guest sees. Including them in an exterior repaint is usually what makes the whole property look finished.',
        ],
      },
      {
        heading: 'Shutters and exterior woodwork',
        paragraphs: [
          'Timber shutters, doors, pergolas and window frames suffer more in the Algarve sun than almost anything else. Coatings dry out, crack and peel, and bare timber greys and splits. Once water gets in behind a failing finish, the damage speeds up. Sanding back to a sound surface, repairing small defects and building up the right primer and topcoats is slow, careful work, and it is the difference between shutters that look good for one summer and shutters that last.',
        ],
      },
    ],
  },

  problems: {
    eyebrow: 'COMMON PROBLEMS',
    heading: 'Common Painting Problems in Algarve Properties',
    intro:
      'These are the situations Algarve property owners most often contact us about. Each one describes what you are likely to be seeing, why it can happen, and what the painting work normally involves.',
    items: [
      {
        id: 'fading-peeling',
        title: 'Exterior Paint Fading or Peeling',
        see: 'Walls that have faded unevenly, a chalky residue when you touch them, or paint lifting in flakes and blisters, often worst on south and west-facing walls.',
        why: 'UV light breaks down the paint film over time, heat cycles stress it, and moisture getting behind the paint pushes it off. Paint applied over dust, salt or chalky old coatings never bonded properly in the first place.',
        process: 'Washing down, scraping off everything loose, sanding edges, treating chalky areas with a suitable stabilising primer, then two full coats of an exterior coating suited to the exposure.',
        link: '/exterior-house-painting/',
      },
      {
        id: 'cracks',
        title: 'Cracks Appearing Through Exterior Paint',
        see: 'Fine hairline cracks spreading across rendered walls, or lines opening up at the corners of windows and doors and where walls meet terraces.',
        why: 'Render expands and contracts with the Algarve heat and cool nights. Most fine cracking is surface movement, but some cracks indicate something deeper.',
        process: 'Cracks are opened up, cleaned and filled with a suitable flexible filler, then spot-primed before painting so they do not show through. Anything wide, recurring or suspicious is flagged before painting rather than covered up.',
        link: '/walls-ceilings/',
      },
      {
        id: 'damp-mould',
        title: 'Damp and Mould Staining',
        see: 'Black or grey spotting on ceilings and in corners, staining behind furniture, tide marks low on walls, or green algae on shaded exterior walls.',
        why: 'Condensation in properties closed up over winter, poor ventilation, north-facing rooms, and moisture from a leak or failed terrace all contribute.',
        process: 'Affected areas are cleaned and treated, stains sealed with a stain-blocking primer, and suitable finishes applied. Where the moisture has an ongoing cause, we recommend it is identified and resolved first, because paint alone will not stop it coming back.',
        link: '/walls-ceilings/',
      },
      {
        id: 'balconies-terraces',
        title: 'Flaking Paint Around Balconies and Terraces',
        see: 'Paint lifting along the base of balcony walls, around drainage outlets, on parapets and on the underside of balconies, often with rust stains from railings.',
        why: 'These areas take standing water, direct sun and heavy use. Water tracking into the render at the floor line and rusting railing fixings are common culprits.',
        process: 'Loose paint is removed, rust treated and primed, joints and cracks filled, and the walls, parapets and soffits painted with coatings suited to exposure. Where terrace waterproofing looks to be failing, we say so before painting.',
        link: '/exterior-house-painting/',
      },
      {
        id: 'shutters-woodwork',
        title: 'Sun-Damaged Shutters and Woodwork',
        see: 'Shutters that have turned grey, peeling or cracked varnish on doors, split and raised grain on pergolas, and window frames with bare timber showing.',
        why: 'Timber moves a lot in heat and sun, and UV breaks down both paint and varnish faster here than in northern Europe. Once water gets behind the finish, it fails quickly.',
        process: 'Removing failed coatings, sanding back to sound timber, filling small defects, priming bare wood and building up coatings suitable for strong sun. Shutters are often taken down and worked on in batches.',
        link: '/doors-shutters-woodwork/',
      },
      {
        id: 'recently-bought',
        title: 'Recently Bought Algarve Property Needing Repainting',
        see: 'A property that looked fine in the listing photos but, now it is yours, has tired walls, dated colours, patched repairs and exterior paint past its best.',
        why: 'Properties are often given a quick cosmetic coat before sale, or have been let for years with only touch-ups between guests.',
        process: 'A full survey of every surface inside and out, then a phased plan, often exterior first before the next hot summer, or interior first while you are away and the property is empty.',
        link: '/villa-painting/',
      },
      {
        id: 'pre-sale',
        title: 'Preparing a Property for Sale',
        see: 'You are about to list the property and know that faded walls, marked interiors and a tired façade will show in every photograph and viewing.',
        why: 'Buyers judge condition quickly, and a property that looks maintained photographs better and raises fewer questions at viewings.',
        process: 'A focused scope agreed around your listing date: usually the façade, entrance, boundary walls and main living spaces first, in neutral finishes that suit the widest range of buyers.',
        link: '/rental-property-painting/',
      },
      {
        id: 'between-tenants',
        title: 'Repainting Between Rental Tenants',
        see: 'Scuffed hallways, marked walls behind beds and sofas, patched holes from pictures and televisions, and guest reviews starting to mention wear.',
        why: 'Rental properties and holiday lets take far more wear than a family home, and short changeover windows mean touch-ups pile up.',
        process: 'Work scheduled into the gap between tenants or bookings, durable washable finishes in high-traffic areas, and a consistent colour record so future touch-ups match.',
        link: '/rental-property-painting/',
      },
      {
        id: 'poor-paint',
        title: 'Old or Poorly Applied Paint',
        see: 'Drips and runs, patchy coverage where the old colour shows through, paint on light switches and tiles, and new paint already peeling off in sheets.',
        why: 'Paint applied over dirty, damp or glossy surfaces without preparation, the wrong product for the surface, or too few coats.',
        process: 'Testing adhesion, removing what has not bonded, correcting the surface, and repainting properly, with the right primer for what is underneath.',
        link: '/interior-painting/',
      },
    ],
  },

  gallery: {
    eyebrow: 'PROJECTS',
    heading: 'Before & After',
    intro:
      'Painting is visual, so the best way to judge the work is to see it. Drag the handle on each project to compare the property before and after painting.',
  },

  steps: {
    eyebrow: 'HOW IT WORKS',
    heading: 'From First Message to Finished Property',
    items: [
      { title: 'Tell Us About Your Property', text: 'Send details and photographs or arrange a visit.' },
      {
        title: 'Property Visit',
        text: 'The painter checks the surfaces, measurements, access and preparation required.',
      },
      {
        title: 'Clear Written Quote',
        text: 'The painting scope and quotation are agreed before work starts.',
      },
      {
        title: 'Preparation & Painting',
        text: 'Areas are protected, surfaces prepared, painting completed and the property cleaned.',
      },
    ],
  },

  area: {
    eyebrow: 'SERVICE AREA',
    heading: 'Painters Covering the Whole Algarve',
    intro:
      'We work throughout the Algarve, from the clifftop villas of the west coast to the historic towns of the east. Choose your area for local information on property types and painting considerations.',
  },

  faqs: [
    {
      q: 'Do your painters speak English?',
      a: 'Yes. Everything from the first message to the quotation, colour choices, preparation and the final walk-round can be discussed in English. That includes the technical side, explained in plain language, so you understand exactly what is being done to your property and why.',
    },
    {
      q: 'Is the quote free?',
      a: 'Yes. The property visit and written quotation are free and there is no obligation. For smaller or straightforward jobs, photographs and measurements may be enough to give you an initial idea before a visit.',
    },
    {
      q: 'What does a written quote include?',
      a: 'The areas to be painted, the preparation each surface needs, the type of coatings and number of coats, how furniture, floors and outside areas will be protected, access requirements such as scaffolding, and the price. You know what is and is not included before any work starts.',
    },
    {
      q: 'Can you paint my property while I am not in Portugal?',
      a: 'Yes, and many of our clients are abroad while the work happens. Access can be arranged through a key holder, neighbour or property manager, and progress can be shared with photographs so you can see how the job is going without being there.',
    },
    {
      q: 'Do you take on small painting jobs?',
      a: 'We do accept smaller work, but our focus is on complete projects: whole villas, full exteriors, complete interiors, apartments, rental refreshes and pre-sale preparation. If you have a smaller job, get in touch and we will tell you honestly whether it is a good fit.',
    },
    {
      q: 'When is the best time of year for exterior painting in the Algarve?',
      a: 'Spring and autumn are usually the most comfortable months for exterior work. High summer can be too hot on sun-facing walls for paint to dry properly, and winter brings rain and damp mornings. Work does happen year-round, but it is planned around the weather and which walls are in shade.',
    },
    {
      q: 'Do I need to move out during interior painting?',
      a: 'Usually not. Rooms are normally painted in a planned sequence so the property stays usable, with furniture moved to the centre and covered rather than removed. For a complete interior, many owners prefer to schedule it while they are away.',
    },
    {
      q: 'Can you help choose colours?',
      a: 'Yes. We can talk through colours that suit Algarve light and architecture, what works for a rental or a sale, and any restrictions from a condomínio or urbanisation. Sample patches can be applied so you see the colour on your own walls before deciding.',
    },
    {
      q: 'Will painting fix damp or cracks?',
      a: 'Painting can make surfaces look right again, and proper preparation deals with most surface cracks and staining. It will not fix a leak, rising damp or structural movement. Where we see signs of those, we will say so before painting so the cause can be dealt with first.',
    },
    {
      q: 'Which areas of the Algarve do you cover?',
      a: 'The whole Algarve, including Lagos, Portimão, Carvoeiro, Lagoa, Albufeira, Vilamoura, Quarteira, Vale do Lobo, Quinta do Lago, Almancil, Loulé, Faro, Olhão and Tavira. If your property is somewhere not listed, just ask.',
    },
  ],

  quote: {
    eyebrow: 'REQUEST A FREE QUOTE',
    heading: 'Tell Us About Your Property',
    intro:
      'Send a few details and, if you can, some photographs. We will reply in English to arrange a visit or discuss the next step.',
  },
};
