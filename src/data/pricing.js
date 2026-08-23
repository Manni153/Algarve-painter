// Indicative rates for the instant estimate.
//
// ------------------------------------------------------------------------
//  THESE ARE PLACEHOLDERS. Set them before launch, the same way the phone
//  number has to be set. The build prints a warning while they stand.
// ------------------------------------------------------------------------
//
// They are deliberately expressed as a euro-per-square-metre band rather
// than a fixed price, because that is honestly what an estimate is at this
// stage, and because it means the owner changes six numbers in one file
// rather than re-authoring a page. The page never calls the output a quote.

const RATES_ARE_PLACEHOLDER = true;

// € per m² of painted surface, low and high, before condition is applied.
const rates = {
  'exterior-walls':  { lo: 11, hi: 19, label: 'Exterior walls' },
  'interior':        { lo:  9, hi: 15, label: 'Interior' },
  'both':            { lo: 18, hi: 31, label: 'Interior and exterior' },
  'roof-terrace':    { lo: 16, hi: 27, label: 'Roof or terrace coating' },
  'wood-metal':      { lo: 22, hi: 38, label: 'Shutters, wood and metalwork' },
};

// Painted area is not floor area. These are rough multipliers from the
// property size a customer actually knows to the surface a painter prices.
const sizes = [
  { id: 'small',  label: 'Small',      note: '1–2 bed apartment or townhouse', m2: 90 },
  { id: 'medium', label: 'Medium',     note: '3 bed villa or large townhouse', m2: 180 },
  { id: 'large',  label: 'Large',      note: '4+ bed villa, pool surround, walls', m2: 320 },
  { id: 'xlarge', label: 'Very large', note: 'Estate, quinta or commercial premises', m2: 520 },
];

// Condition is the single biggest swing on an Algarve exterior, and saying
// so on the page is worth more than hiding it: it is the reason a cheaper
// quote is cheaper.
const conditions = [
  { id: 'sound',  label: 'Sound',    note: 'Painted in the last few years, no cracking', factor: 0.88 },
  { id: 'normal', label: 'Typical',  note: 'Some chalking, hairline cracks, a few patches', factor: 1.00 },
  { id: 'poor',   label: 'Tired',    note: 'Flaking, cracked render, salt bloom or rust', factor: 1.34 },
];

const properties = [
  { id: 'villa',      label: 'Villa' },
  { id: 'apartment',  label: 'Apartment' },
  { id: 'townhouse',  label: 'Townhouse' },
  { id: 'commercial', label: 'Commercial' },
];

module.exports = { rates, sizes, conditions, properties, RATES_ARE_PLACEHOLDER };
