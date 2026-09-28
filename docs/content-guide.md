# Content guide

How the copy on this site is written, and the exact data shapes that drive
the service and location pages. Read this before editing anything in
`site/data/`.

## Who we are writing for

English-speaking owners of Algarve property: expats living here full-time,
foreign owners of second homes and villas, landlords and holiday-let owners,
investors, property managers, and owners preparing a property for sale or
for rental. Many are not in Portugal while the work happens. Their biggest
frustrations with trades here are the language barrier, vague quotes,
unreturned calls and paint jobs that skip preparation and fail in two summers.

The commercial focus is **larger projects**: complete villa repaints, full
exteriors, complete interiors, large apartments, rental refreshes between
tenants or seasons, and pre-sale preparation. Small jobs are accepted, but
the copy should never read like a handyman service or a cheap contractor.

## Voice

- British English (colour, mould, render, neighbour, organise).
- Calm, specific, knowledgeable. Explain like a good surveyor, not a salesman.
- "We" / "our painters". Second person to the reader.
- Describe what the owner **sees**, why it **can** happen, and what the
  painting work **normally involves**.
- Short paragraphs (2–4 sentences). No filler, no hype words ("stunning",
  "top-notch", "second to none", "best in the Algarve").
- Use Algarve and Portuguese terms naturally where owners will meet them:
  render, lime wash (cal), platibanda, açoteia, chaminé, estores/persianas
  (shutters), condomínio, Alojamento Local (AL). Explain them when used.

## Hard rules (compliance and honesty)

Never write, anywhere:

- Invented reviews, testimonials, client names, project counts, years in
  business, team size, response-time promises, or "X villas painted in
  Vilamoura" style claims.
- Prices, price ranges, per-m² rates or discounts.
- Warranty or guarantee lengths, or "guaranteed" anything.
- Certifications, licences, insurance levels or trade-body memberships.
- Paint brand or product names.
- Structural, waterproofing, damp-proofing or "cure" claims. Painting can
  cover and refresh; it does not fix rising damp, leaks, structural cracks
  or failed waterproofing. Where those are suspected, say that the cause
  needs looking at (and may need another specialist) before repainting.
- Weather/UV claims stated as hard fact about specific paint lifespans.
  Use "can", "often", "typically", "tends to".
- Keyword stuffing. A town name or "painters Algarve" should appear where a
  person would naturally say it, not in every sentence.

"Request a Free Quote" is the site's CTA. Quotes and property visits are
free; nothing else should be promised.

## Service data shape (`site/data/services.js`)

```js
{
  slug: 'interior-painting',            // URL: /interior-painting/
  name: 'Interior Painting',            // card + breadcrumb label
  title: '…',                           // <title>, ≤ 60 chars, unique
  metaDescription: '…',                 // 140–158 chars, unique
  schemaServiceType: 'Interior painting',
  hero: { eyebrow: 'INTERIOR PAINTING · ALGARVE', h1: '…', lead: '…' }, // lead 1–2 sentences
  card: '…',                            // 20–30 words for the services grid
  intro: { heading: '…', paragraphs: ['…', '…', '…'] },
  problems: { heading: '…', intro: '…', items: [{ title, text }] },       // 4–6 "what owners notice"
  detail: { heading: '…', sections: [{ heading, paragraphs: ['…'] }] },   // 3–4 deep-dive sections
  algarve: { heading: '…', paragraphs: ['…'], points: [{ title, text }] },// 2–3 paras + 3–4 points
  included: { heading: '…', intro: '…', items: ['…'] },                   // 8–12 short items
  preparation: { heading: '…', intro: '…', steps: [{ title, text }] },    // 5–7 steps
  process: [{ title, text }],           // exactly 4 service-specific steps
  forWhom: { heading: '…', items: [{ title, text }] },                    // 3–4 owner types / scenarios
  related: ['slug', 'slug', 'slug'],    // 3 other service slugs
  faqs: [{ q, a }],                     // 6–8, answers 40–90 words
  cta: { heading: '…', text: '…' },
}
```

## Location data shape (`site/data/locations-*.js`)

```js
{
  slug: 'vilamoura',                    // URL: /painters-vilamoura/
  name: 'Vilamoura',
  municipality: 'Loulé',
  region: 'central',                    // 'west' | 'central' | 'east'
  title: '…',                           // ≤ 60 chars, e.g. "Painters in Vilamoura | English-Speaking | Algarve Painter"
  metaDescription: '…',                 // 140–158 chars, unique
  hero: { h1: 'Painters in Vilamoura', lead: '…' },
  intro: { heading: '…', paragraphs: ['…', '…', '…'] },
  property: { heading: '…', intro: '…', items: [{ title, text }] },       // 3–4 local housing types
  conditions: { heading: '…', paragraphs: ['…'], points: [{ title, text }] }, // local exposure: salt, sun, humidity, age of stock
  services: [{ slug: 'villa-painting', text: '…' }],                      // 3–4 most relevant, one local sentence each
  scenarios: { heading: '…', items: [{ title, text }] },                  // 3 typical owner situations here
  areas: ['…'],                         // 6–12 well-known neighbourhoods / urbanisations / nearby villages
  nearby: ['slug', 'slug', 'slug'],     // 3–4 other location slugs
  faqs: [{ q, a }],                     // 4–6, genuinely location-specific
}
```

Location pages must not be thin: the property types, conditions and
scenarios have to be specific to that place (a Quinta do Lago villa is not
an Olhão townhouse). Only name neighbourhoods and features that genuinely
exist; when unsure, leave it out.
