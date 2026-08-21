'use strict';

// Order below is priority order for build/internal-linking weight.
// Exterior House Painting is the flagship page: extra depth + links to all
// 22 towns.
//
// Content is grounded in what a painting and decorating outfit working on
// Algarve property actually does — exterior and interior decoration, villa
// and pool-area work, render and crack repair, wood and shutter treatment,
// metalwork and railings, and waterproof roof coatings — plus commercial
// work (apartment-block common areas, rental and hotel turnarounds, shops,
// restaurants and offices), which is referenced across the pages rather
// than given a page of its own. No brand names, product names, warranty
// lengths, response-time commitments, certification or licensing claims,
// pricing figures or capabilities beyond what's confirmed appear anywhere
// below. Same compliance rules as the sister site: no "free quote"
// language and no same-day promises.
const services = [
  {
    slug: 'exterior-house-painting',
    name: 'Exterior House Painting',
    navLabel: 'Exterior House Painting',
    flagship: true,
    h1: 'Exterior House Painting in the Algarve',
    seoTitle: 'Exterior House Painting in the Algarve | Algarve Painter',
    seoDescription: 'Exterior painting for Algarve villas and apartments — walls washed, cracks filled and primed before painting, by a locally based, English-speaking team.',
    heroHeadline: 'Make the whole property look cared for again.',
    heroTagline: 'Exterior painting that starts with preparation — explained in plain English.',
    ctaNote: 'Describe your property — get a straight answer in one call.',
    reassurance: { heading: 'Not sure whether it needs a full repaint or just one elevation?', body: 'That is exactly what a first call sorts out. Describe the property, hear an honest read on which walls are actually due and which will hold another season — no site-visit commitment, and no pressure to do more than the building needs.' },
    heroSubhead:
      'Exterior repainting for villas, townhouses and apartment blocks, with the washing down, filling and priming quoted as part of the job rather than skipped.',
    imageAlt: '[Placeholder: Painter cutting in along a window reveal on a rendered villa exterior]',
    scenarioImageAlt: '[Placeholder: Scaffold tower against a sun-faded villa elevation, half repainted]',
    detailImageAlt: '[Placeholder: Masked-off shutters and taped window frames before a topcoat goes on]',
    intro:
      'Exterior painting is usually the first thing an owner looks at when a property starts to feel tired — chalky, faded walls, hairline cracks tracking out from window corners, or one elevation that has clearly aged faster than the rest.',
    deepDive: [
      {
        heading: 'Why Preparation Decides How Long the Paint Lasts',
        text: "The single biggest difference between an exterior that still looks good in five years and one that is flaking after two is what happened before the first topcoat. On an Algarve property that usually means washing off years of accumulated dust, pollen and salt film, scraping back anything that has already lost its grip, raking out and filling cracks properly rather than skimming over them, treating any salt bloom or damp staining at source, and priming every bare or repaired patch so the topcoat has a consistent surface to bind to. Skipping those steps makes a quote look cheaper and makes the result fail early — new paint bonds to whatever is under it, so painting over a chalky or loose surface simply buys a couple of seasons before the whole thing lifts.",
      },
      {
        heading: 'Why Two Quotes for Similar-Looking Villas Can Differ',
        text: 'The most common reason two exterior quotes for what look like comparable properties come out differently is access and condition, not floor area. A single-storey villa where every wall can be reached from a ladder or a light tower is a more contained job than a three-storey townhouse on a sloping plot needing scaffold, or a property where the pool terrace has to be fully sheeted before anyone starts. Condition matters just as much: a wall that needs nothing more than a wash and two coats is a completely different job from one carrying widespread cracking, previous patch repairs in the wrong material, or a coating that has to come off before anything new goes on. That is why an accurate number comes from looking at the property rather than a rate per square metre.',
      },
    ],
    included: [
      'Full wash-down to remove dust, salt film, pollen and surface growth before anything else',
      'Scraping back and removing loose, chalking or flaking previous coatings',
      'Raking out and filling cracks, and making good damaged render before painting',
      'Priming bare, repaired and previously untreated patches so the topcoat binds evenly',
      'Masking and sheeting of windows, shutters, terraces, pool surrounds and planting',
      'Breathable, UV-stable exterior coatings suited to Algarve sun and coastal salt air',
      'Villas, townhouses, apartment blocks and commercial frontages',
    ],
    whyItMatters:
      'Exterior paint on an Algarve property is doing more than making it look tidy — it is the layer taking the direct hit from summer sun, salt-laden air and winter rain, and it is what keeps water out of the render behind it. Letting it go too long turns a straightforward repaint into render repair, which costs more and takes longer. For owners who are not on-site year-round, a repaint on a sensible cycle is also the difference between arriving to a property that looks looked-after and one that looks abandoned.',
    scenarios: [
      {
        heading: 'The South or West Elevation That Aged First',
        text: 'One wall taking direct afternoon sun and driven rain almost always fails before the others. Repainting just that elevation is often the right call, with the caveat that fresh paint will read brighter than the faded walls next to it until they weather in.',
      },
      {
        heading: 'Getting a Property Ready to Sell or Let',
        text: 'A repainted exterior changes the first impression a property makes in photographs and at a viewing more than almost any other single job at the same cost — and it is generally the last work you want happening while a property is already on the market.',
      },
      {
        heading: 'A Villa Bought With Years of Deferred Maintenance',
        text: 'Newly bought properties often come with a decade of postponed exterior work. Assessing what genuinely needs doing now versus what will hold another season keeps the first year of ownership from turning into one continuous building site.',
      },
      {
        heading: 'Apartment Block or Condominium Frontage',
        text: 'Shared buildings involve a committee, a budget and a schedule rather than a single owner making a call. Work is planned around residents and access to shared entrances, with the sequencing agreed before anything starts.',
      },
    ],
    propertyTypes: [
      { type: 'Villa', text: 'Full exterior including boundary and garden walls, window reveals, soffits and any outbuildings — usually the largest single decorating job a property will have.' },
      { type: 'Apartment', text: 'Typically the unit\'s own terrace, balcony walls and railings, since the building\'s facade and common areas are usually a condominium decision rather than an individual owner\'s.' },
      { type: 'Holiday Rental', text: 'Scheduled around bookings, most often in a changeover window or an off-season gap, so the property is not out of service longer than it has to be.' },
      { type: 'Commercial Premises', text: 'Shop and restaurant frontages, office exteriors, hotel and apartment-block common areas — usually worked around opening hours or an agreed closed period rather than a standard working day.' },
    ],
    commonProblems: [
      {
        symptom: 'Paint is chalky and comes off on your hand when you touch the wall',
        text: 'Normal UV breakdown of the binder in an older coating, accelerated on south and west elevations. It has to be washed and scraped back to a sound surface and primed — painting straight over chalk means the new coat bonds to loose powder rather than to the wall.',
      },
      {
        symptom: 'Hairline cracks tracking diagonally out from window and door corners',
        text: 'Extremely common and usually cosmetic — stress cracking in the render at the weakest point of the opening rather than structural movement. They get raked out, filled and reinforced before painting. Cracks that are wide, stepped, or that keep reopening in the same place after repair are a different conversation and worth having before repainting over them.',
      },
      {
        symptom: 'White crystalline powder or staining coming through the paint low down on a wall',
        text: 'Salt bloom — moisture moving through the wall and depositing salts as it evaporates. Painting over it traps the moisture and it will come back through. The source of the damp has to be dealt with and the wall allowed to dry before a breathable coating goes on.',
      },
      {
        symptom: 'Black or green growth on a shaded, north-facing wall',
        text: 'Algae and mould thriving where a wall never dries out fully. It gets treated and killed rather than just jet-washed off, because pressure washing alone removes what you can see and leaves the spores that bring it back within a season.',
      },
      {
        symptom: 'Paint bubbling and lifting away in sheets rather than flaking',
        text: 'Almost always moisture behind the coating, or a previous non-breathable paint trapping it. The affected area has to come back to a sound surface and the cause found first — recoating over it repeats the same failure in the same place.',
      },
      {
        symptom: 'A repaired patch is a visibly different shade and texture from the wall around it',
        text: 'Filler and new render absorb differently from aged, weathered paint, so a patch shows through even in a matched colour. Priming the repair and painting the full elevation rather than the patch is what actually makes it disappear.',
      },
      {
        symptom: 'A previous repaint has already failed after two or three years',
        text: 'Usually a preparation shortcut rather than a bad product — painted over chalk, over damp, or without priming bare patches. Worth establishing what was skipped before repeating the same specification and expecting a different outcome.',
      },
      {
        symptom: 'Rust stains bleeding down the wall from railings or a balcony',
        text: 'The metalwork is corroding and the runoff is staining the render. Painting the wall alone leaves the source in place and the staining returns — the metal needs treating at the same time.',
      },
      {
        symptom: 'The render sounds hollow when tapped in places',
        text: 'The render has debonded from the substrate underneath. That area needs cutting out and making good before painting, because a coating over hollow render simply comes away with it when it eventually lets go.',
      },
      {
        symptom: 'Colour has faded unevenly across the same wall',
        text: 'Usually shading from a tree, a balcony overhang or a neighbouring building giving part of the wall meaningfully less UV exposure. Not a fault, and not fixable by touching up — the elevation reads as one surface only once it is painted as one.',
      },
      {
        symptom: 'Nobody has painted the property since it was bought and it is not clear where to start',
        text: 'Start with a walk round and a written order of priority: which elevations are actually failing, which are cosmetic, and what is letting water in. Doing the water-related work first and the cosmetic work after is almost always cheaper over five years than doing whatever looks worst.',
      },
    ],
    extraSections: [
      {
        heading: 'Washing Down and Cutting Back',
        text: 'Every exterior starts with a wash to remove the film of dust, salt and organic growth that builds up on Algarve properties, followed by scraping and sanding back anything that is chalking, flaking or already lifting. It is the least visible part of the job and the part that decides how long the result holds.',
      },
      {
        heading: 'Crack Repair and Making Good',
        text: 'Cracks are raked out and filled rather than skimmed over, damaged or hollow render is cut back and made good, and repairs are primed before painting. Where the cracking is widespread, that becomes a job in its own right — see render and crack repair.',
      },
      {
        heading: 'Coatings Chosen for the Climate',
        text: 'Strong UV, salt air near the coast and heavy winter rain all shorten the life of an exterior coating. Breathable, UV-stable products are specified for that combination, and the specification is matched to the wall in front of us rather than applied identically to every property.',
      },
      {
        heading: 'Protecting Everything That Is Not Being Painted',
        text: 'Windows, shutters, ironwork, terraces, pool surrounds, outdoor furniture and planting are masked and sheeted before work starts, and the site is cleared at the end of each day rather than left as it stands until the job finishes.',
      },
    ],
    faqs: [
      {
        q: 'How much does it cost to paint the outside of a villa?',
        a: 'It depends on the size of the property, the condition of the existing surfaces, how much crack repair and preparation is involved and whether scaffold or access equipment is needed — there is no single price that applies to every property. The most accurate way to get a number is a quick call or WhatsApp message describing the property.',
      },
      {
        q: 'How long does an exterior repaint take?',
        a: 'It depends on the size of the property and how much preparation the surfaces need — a villa that only needs washing and two coats is a more contained job than one carrying widespread cracking or a failed previous coating. Timing is confirmed as part of the survey, not before it.',
      },
      {
        q: 'What time of year is best for exterior painting here?',
        a: 'Spring and autumn are generally the most forgiving. In high summer a south-facing wall can get hot enough that paint flashes off before it levels properly, and in midwinter overnight damp and rain stop a coat curing — so the order of elevations gets planned around the weather and which side is in shade.',
      },
      {
        q: 'Do the walls need to be repaired before painting?',
        a: 'Where there is cracking, hollow render or damage, yes — see <a href="/render-crack-repair">render and crack repair</a>. Painting over unrepaired render hides the problem for a season rather than solving it, and the coating fails again in the same places.',
      },
      {
        q: 'Can you paint just one elevation rather than the whole property?',
        a: 'Yes, and it is often the sensible call when one wall has aged much faster than the others. The one thing to expect is that the freshly painted side will read brighter than the faded walls beside it until they weather in.',
      },
      {
        q: 'Will you paint the shutters and railings at the same time?',
        a: 'They are usually done as part of the same visit — see <a href="/wood-shutter-treatment">wood and shutter treatment</a> and <a href="/metalwork-railing-painting">metalwork and railing painting</a>. Doing them together avoids paying twice for access to the same walls.',
      },
      {
        q: 'Do I need to be at the property while the work happens?',
        a: 'No. For second homes and rentals this is routine — access is arranged with whoever holds keys locally, progress photos are sent through as the work goes, and the final walkthrough can happen over a video call.',
      },
      {
        q: 'How often should an Algarve exterior be repainted?',
        a: 'It varies more by elevation and exposure than by a fixed number of years — a sheltered north wall holds far longer than a south or west wall taking direct sun and salt air. Rather than a schedule, the useful signal is the paint starting to chalk when you rub it, which means the coating is breaking down and water is getting closer to the render.',
      },
      {
        q: 'Can you match the colour the property already is?',
        a: 'In most cases yes, matched closely from a sample. Worth knowing that a matched colour will still look newer than the weathered paint next to it, so matching works best for a repair or a full elevation rather than a patch in the middle of a wall.',
      },
      {
        q: 'Do you paint boundary walls and garden walls too?',
        a: 'Yes — boundary walls, garden walls, gate pillars and outbuildings are usually quoted alongside the house itself, since they are what makes a property read as finished rather than half done from the road.',
      },
      {
        q: 'Can you work on an apartment block or a shared building?',
        a: 'Yes. Shared buildings involve the condominium and its budget rather than one owner, so the scope, sequencing and access to common areas get agreed up front and the work is planned around residents.',
      },
      {
        q: 'What happens if it rains partway through the job?',
        a: 'Work pauses on the affected elevation and the surface is allowed to dry before anything else goes on, rather than being coated over damp. In practice that means the running order shifts to a sheltered side of the property while the weather passes.',
      },
    ],
  },
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    navLabel: 'Interior Painting',
    flagship: false,
    h1: 'Interior Painting in the Algarve',
    seoTitle: 'Interior Painting & Decorating in the Algarve | Algarve Painter',
    seoDescription: 'Interior painting for Algarve villas, apartments and rentals — walls, ceilings, woodwork and stairwells, by a locally based, English-speaking team.',
    heroHeadline: 'Rooms finished properly, and your furniture handled like it is yours.',
    heroTagline: 'Interior decorating with the prep, the masking and the clean-up included.',
    ctaNote: 'Quick call, plain English, no pressure.',
    reassurance: { heading: 'No pressure — just a straight answer about the rooms you have.', body: 'A five-minute call is enough to work out whether you are looking at a full redecoration or two rooms and a stairwell. If it is the smaller job, that is exactly what you will hear.' },
    heroSubhead:
      'Interior painting and decorating for villas, apartments and rentals — walls, ceilings, woodwork, doors and stairwells, room by room.',
    imageAlt: '[Placeholder: Roller finishing a wall in a bright, sheeted living room]',
    scenarioImageAlt: '[Placeholder: Furniture stacked and covered in the centre of a room mid-decoration]',
    detailImageAlt: '[Placeholder: Brush cutting in neatly along a skirting board and door frame]',
    intro:
      'Interior decoration covers everything inside the property — walls and ceilings, woodwork, doors, skirtings, stairwells and built-in joinery — and it is as much about how the work is done around your things as how the finish looks afterwards.',
    deepDive: [
      {
        heading: 'What Actually Takes the Time Inside a Property',
        text: 'Rolling a wall is quick. What takes the time is everything either side of it: emptying and moving furniture, sheeting floors and covering what stays, masking edges, filling nail holes and cracks, sanding filler flat, spot-priming repairs and stains, cutting in cleanly along ceilings, skirtings and frames, then removing masking and putting the room back. A room with a lot of woodwork, built-in shelving or an awkward stairwell takes considerably longer than a plain-walled bedroom of the same floor area, which is why quotes are rarely proportional to square metres.',
      },
      {
        heading: 'Living in the Property While the Work Happens',
        text: 'Interiors are normally worked in sequence rather than all at once, so a property stays usable throughout. Bedrooms are typically done first so there is always somewhere to sleep, kitchens and bathrooms are scheduled around the days you can most easily do without them, and hallways and stairwells go last because everything else has to pass through them. Furniture gets moved to the centre and sheeted rather than taken out of the property, floors are protected and dust is contained, and each day ends with the room cleared enough to walk through.',
      },
    ],
    included: [
      'Furniture moved and sheeted, floors and fittings protected before work starts',
      'Filling nail holes, cracks and damaged plaster, then sanding flat',
      'Spot-priming repairs, bare plaster and any staining before painting',
      'Walls and ceilings, cut in by brush and finished by roller',
      'Woodwork — doors, frames, skirtings, architraves and built-in joinery',
      'Stairwells, hallways and high or awkward-access ceilings',
      'Rooms handed back cleared and put back, not left for you to reassemble',
    ],
    whyItMatters:
      'Interiors in the Algarve take a different kind of wear than the exterior does — strong light through big windows fading colours unevenly, condensation and mould in bathrooms and on north-facing walls in winter, and the steady scuffing that comes with a property being let. Redecorating on a sensible cycle keeps a home feeling looked-after, and for a rental it is one of the few things guests reliably notice and mention.',
    scenarios: [
      {
        heading: 'Redecorating After Buying',
        text: 'Painting through before furniture arrives is by far the easiest version of this job — no moving, no working around anything, and rooms can be done in parallel rather than one at a time.',
      },
      {
        heading: 'Rental Turnaround Between Seasons',
        text: 'Scuffed hallways, marked bedroom walls and tired woodwork get put right in the off-season gap, so the property photographs and shows well for the next round of bookings.',
      },
      {
        heading: 'One Room That Has Gone Wrong',
        text: 'A bathroom ceiling with mould, a damp patch on a north wall, or a room where a previous colour never quite worked — a single room is a perfectly sensible job on its own rather than something to bundle into a whole-house redecoration.',
      },
      {
        heading: 'Stairwells and Double-Height Spaces',
        text: 'The parts of a property most owners cannot safely do themselves. High hallway walls, stairwell voids and vaulted ceilings need proper access equipment rather than a ladder on a step.',
      },
    ],
    propertyTypes: [
      { type: 'Villa', text: 'Usually room-by-room across a whole property, with the stairwell, hallways and any double-height spaces as the parts most worth handing over.' },
      { type: 'Apartment', text: 'Often a full redecoration in one go, since the smaller footprint means the disruption is short — or just the rooms taking the most light and wear.' },
      { type: 'Holiday Rental', text: 'Scheduled into a changeover or off-season window, prioritising the areas guests actually notice: hallways, bedrooms, bathroom ceilings and woodwork.' },
      { type: 'Commercial Premises', text: 'Offices, shops, restaurants, and hotel or apartment-block common areas and stairwells — normally worked outside opening hours or in an agreed closed period.' },
    ],
    commonProblems: [
      {
        symptom: 'Black mould keeps coming back on the bathroom ceiling',
        text: 'A ventilation problem showing up as a decorating one. It gets treated and killed rather than painted over, and a suitable coating used — but unless the moisture has somewhere to go, it returns regardless of what is on the ceiling.',
      },
      {
        symptom: 'A damp patch or stain keeps bleeding through fresh paint',
        text: 'Water-soluble staining travels straight through ordinary emulsion no matter how many coats go on. It needs a stain-blocking primer over the affected area first — and the source of the water found, or the stain simply comes back.',
      },
      {
        symptom: 'Filled holes and cracks are visible through the new paint',
        text: 'Filler absorbs differently from the surrounding wall, so it flashes through as a duller or shinier patch unless it is sanded flat and spot-primed before painting. Almost always a preparation step that was skipped rather than a paint problem.',
      },
      {
        symptom: 'Colour looks completely different in the room than on the sample card',
        text: 'The Algarve light is the reason. Strong, warm daylight through a big window shifts a colour noticeably, and a north-facing room reads much cooler than a south-facing one. Trying a sample patch on the actual wall and looking at it at different times of day is worth the extra step before committing.',
      },
      {
        symptom: 'One wall has faded much more than the rest of the room',
        text: 'Direct sunlight through glass. Nothing has gone wrong — it just means the room needs painting as a whole rather than touching up the faded wall, which will never match.',
      },
      {
        symptom: 'Old woodwork feels rough and the new coat is not sitting flat',
        text: 'Previous gloss that was not sanded back before recoating. Woodwork needs deglossing and keying so the new coat has something to grip, otherwise it sits on the surface and chips at every knock.',
      },
      {
        symptom: 'Hairline cracks keep reopening along the ceiling-to-wall junction',
        text: 'Normal seasonal movement at a junction between two different materials. Filling alone will crack again; the joint needs to be treated with something flexible rather than rigid filler if it is going to stay closed.',
      },
      {
        symptom: 'Paint is peeling off the wall in a bathroom or kitchen',
        text: 'Usually the wrong product for a room with that much moisture, or painting onto a surface that was not properly cleaned of grease and residue first. Both mean bringing it back to a sound surface rather than adding another coat.',
      },
    ],
    extraSections: [
      {
        heading: 'Protection and Preparation',
        text: 'Furniture is moved to the centre and covered, floors are sheeted, and fittings, sockets and switch plates are masked before anything starts. Filling, sanding and spot-priming happen before the first topcoat rather than being worked around afterwards.',
      },
      {
        heading: 'Walls, Ceilings and Woodwork',
        text: 'Walls and ceilings are cut in by brush and finished by roller for an even surface. Woodwork — doors, frames, skirtings, architraves and built-in joinery — is deglossed, filled and keyed before recoating so the finish holds up to knocks.',
      },
      {
        heading: 'Working Around You',
        text: 'Rooms are done in sequence rather than all at once so the property stays liveable, with bedrooms usually first and hallways and stairwells last. Each day ends with the space cleared enough to use.',
      },
      {
        heading: 'Handing the Room Back',
        text: 'Masking comes off, furniture goes back where it was, and the room is cleaned rather than left for you to reassemble. Leftover paint is labelled by room and left with you for touch-ups.',
      },
    ],
    faqs: [
      {
        q: 'Do I need to move out while the interior is painted?',
        a: 'Almost never. Rooms are done in sequence so the property stays liveable — bedrooms typically first so there is always somewhere to sleep, hallways and stairwells last because everything else passes through them.',
      },
      {
        q: 'Do I have to move the furniture myself?',
        a: 'No. Furniture is moved to the centre of the room and sheeted as part of the work. Anything genuinely fragile or valuable is worth putting away yourself beforehand, simply so it is not being handled at all.',
      },
      {
        q: 'How many coats will the walls need?',
        a: 'It depends on what is already there — going lighter over a strong dark colour needs more than refreshing a similar shade, and bare or repaired plaster needs priming first. The number of coats is confirmed as part of the quote rather than assumed.',
      },
      {
        q: 'Can you paint over wallpaper?',
        a: 'Sometimes, but it is usually a false economy. Paint adds moisture that can lift the paper at the seams, so unless the paper is very well adhered and flat, stripping it back gives a result that does not need redoing.',
      },
      {
        q: 'Can you help choose colours?',
        a: 'We can talk through what tends to work in a given room and light, though the choice stays yours. The most useful step is trying sample patches on the actual wall and looking at them morning and evening — Algarve light shifts colours more than most people expect.',
      },
      {
        q: 'Do you paint ceilings and woodwork as well as walls?',
        a: 'Yes — walls, ceilings, doors, frames, skirtings, architraves and built-in joinery. Doing woodwork at the same time as the walls avoids masking the same edges twice.',
      },
      {
        q: 'What about high stairwells and double-height ceilings?',
        a: 'Those are handled with proper access equipment rather than ladders. They are usually the part of an interior most owners would rather not attempt themselves, and they are quoted as part of the same job.',
      },
      {
        q: 'Can this be scheduled around rental bookings?',
        a: 'Yes. Rental interiors are commonly done in a changeover window or an off-season gap, with the scope set to what actually fits the time available rather than overrunning into the next booking.',
      },
      {
        q: 'Will there be dust everywhere?',
        a: 'Filling and sanding do create dust, which is why floors and furniture are sheeted and the work is contained to the room in progress. Rooms are cleaned as they are finished rather than at the very end of the job.',
      },
      {
        q: 'Can you fix cracks and damaged plaster before painting?',
        a: 'Yes — filling, sanding and spot-priming are part of the work. Larger areas of damaged plaster or ongoing damp are worth flagging early, since those can change the scope of the job.',
      },
    ],
  },
  {
    slug: 'villa-pool-area-painting',
    name: 'Villa & Pool Area Painting',
    navLabel: 'Villa & Pool Area Painting',
    flagship: false,
    h1: 'Villa & Pool Area Painting in the Algarve',
    seoTitle: 'Villa & Pool Area Painting in the Algarve | Algarve Painter',
    seoDescription: 'Painting for Algarve villa terraces, pool surrounds, boundary walls and outbuildings — coatings chosen for sun, chlorine and salt. Call today.',
    heroHeadline: 'The part of the property you actually spend the summer in.',
    heroTagline: 'Terraces, pool surrounds and boundary walls — finished to handle sun, water and bare feet.',
    ctaNote: 'One quick call tells you what makes sense out there.',
    reassurance: { heading: 'Unsure what can and cannot be painted around a pool?', body: 'Plenty can, some should not, and a short call sorts out which is which for your setup — including an honest answer where a coating is not the right fix at all.' },
    heroSubhead:
      'Painting and coating for the outdoor living areas — terraces, pool surrounds, boundary walls, pergolas, planters and outbuildings.',
    imageAlt: '[Placeholder: Freshly painted white pool surround wall beside blue water]',
    scenarioImageAlt: '[Placeholder: Terrace wall and pergola posts masked and part-painted]',
    detailImageAlt: '[Placeholder: Painted boundary wall and gate pillar at a villa entrance]',
    intro:
      'The pool terrace and the walls around it take more punishment than any other part of an Algarve property — full sun most of the day, splash-out from the pool, chlorine or salt water, sun cream, and constant foot traffic across the same few metres.',
    deepDive: [
      {
        heading: 'Why Pool Surrounds Fail Faster Than the House Itself',
        text: 'A pool surround is being asked to do something a house wall is not. It gets wet and dries repeatedly through the day, it takes splash-out carrying chlorine or salt, it reflects heat back off the paving, and it is in direct sun for far longer than a shaded elevation of the villa. That combination breaks down an ordinary masonry coating quickly, which is why the low band of wall around a pool is usually the first thing on a property to look tired even when the house itself still looks fine. Specifying for that exposure — rather than simply continuing the house colour in the house product — is the difference between an area that holds up for years and one that needs redoing every other season.',
      },
      {
        heading: 'What Should and Should Not Be Painted Out There',
        text: 'Not everything around a pool benefits from a coating. Walls, planters, pergola posts, boundary walls and outbuildings all take paint well. Pool copings and heavily trafficked paving generally do not — a coating on a wet, barefoot surface is a slip risk and wears through in walking lines, and the honest answer is often that cleaning or sealing is the better route. The interior of the pool itself is specialist work with its own products and drain-down requirements, and is worth treating as a separate job rather than an add-on to painting the surrounding walls.',
      },
    ],
    included: [
      'Terrace, patio and pool-surround walls, including the splash zone at low level',
      'Boundary walls, garden walls, gate pillars and entrance features',
      'Pergolas, shade structures, planters and built-in outdoor seating',
      'Pool houses, garden stores, garages and other outbuildings',
      'Wash-down, treatment of algae or salt bloom, filling and priming before painting',
      'Coatings chosen for full sun, splash-out and chlorine or salt exposure',
      'Full sheeting of the pool, paving, planting and outdoor furniture before work starts',
    ],
    whyItMatters:
      'For most owners the terrace and pool area is the reason they bought in the Algarve, and it is the part of the property guests and visitors see most. It is also the part that ages fastest, so it tends to set the impression of how well the whole property is kept. Getting the specification right for that exposure means the outdoor space looks right for the whole season rather than needing attention every spring.',
    scenarios: [
      {
        heading: 'Getting the Terrace Ready for Summer',
        text: 'The pool surround and terrace walls done in spring, before the season starts and before the heat makes working out there — and living around the work — unpleasant.',
      },
      {
        heading: 'Preparing a Rental for the Season',
        text: 'The outdoor area is what a holiday rental is photographed on and reviewed for. A tired splash-zone wall reads badly in pictures in a way an interior scuff does not.',
      },
      {
        heading: 'Boundary Walls and the Entrance',
        text: 'The gate pillars, boundary wall and driveway walls are the first thing anyone sees. They are often left until last and are usually the quickest win on a property that looks tired from the road.',
      },
      {
        heading: 'After Landscaping or Pool Work',
        text: 'Once new paving, planting or pool works are finished, the surrounding walls almost always need putting right — repainting afterwards rather than before avoids doing it twice.',
      },
    ],
    propertyTypes: [
      { type: 'Villa', text: 'The full outdoor envelope: pool surround, terrace walls, pergola, boundary walls, gate pillars and any pool house or garden store.' },
      { type: 'Apartment', text: 'Terrace and balcony walls, dividing walls and railings — the private outdoor space rather than the building\'s shared areas.' },
      { type: 'Holiday Rental', text: 'Prioritising what the property is photographed and reviewed on: the pool surround, terrace and anything in the background of a listing photo.' },
      { type: 'Commercial Premises', text: 'Hotel and aparthotel pool decks, restaurant terraces and shared outdoor areas — normally scheduled outside the season or during an agreed closure.' },
    ],
    commonProblems: [
      {
        symptom: 'Paint is flaking off the low wall right around the pool but the rest looks fine',
        text: 'That band takes constant splash-out, wetting and drying, and reflected heat off the paving. An ordinary masonry coating is not specified for it — the area needs bringing back to a sound surface and a coating suited to that exposure.',
      },
      {
        symptom: 'A white crusty deposit keeps appearing on the pool surround wall',
        text: 'Salt or mineral deposits left as splash-out evaporates, common with salt-water pools. It gets removed and the wall allowed to dry before recoating, and painting over it simply traps the problem underneath.',
      },
      {
        symptom: 'Green or black growth on the shaded side of a terrace wall',
        text: 'A wall that stays damp because it never gets direct sun. It needs treating rather than just washing off — pressure washing removes what is visible and leaves what brings it back.',
      },
      {
        symptom: 'Painted pool paving has worn through in the walking lines',
        text: 'Coatings on trafficked paving wear where feet actually go, and they get slippery when wet. It is generally worth removing rather than recoating, and cleaning or sealing the paving instead.',
      },
      {
        symptom: 'The pergola or shade structure is peeling and splitting',
        text: 'Timber in full Algarve sun moves and opens up as it dries. It needs sanding back, any splits filled and a flexible exterior treatment rather than a hard film — see <a href="/wood-shutter-treatment">wood and shutter treatment</a>.',
      },
      {
        symptom: 'Rust from the pool railing or handrail is staining the surround',
        text: 'The metal is corroding and the runoff marks the wall. Painting the wall alone leaves the source in place — see <a href="/metalwork-railing-painting">metalwork and railing painting</a>.',
      },
      {
        symptom: 'The boundary wall is cracked and has been patched in a different material',
        text: 'Old patch repairs in the wrong material move differently from the wall and crack again around the edges. They usually need cutting out and making good properly before painting.',
      },
      {
        symptom: 'The white walls look grey and grubby rather than faded',
        text: 'Often surface soiling rather than degraded paint — dust, pollen and traffic film. Worth washing a test area first, because if it comes up clean the property may not need repainting yet at all.',
      },
    ],
    extraSections: [
      {
        heading: 'The Splash Zone',
        text: 'The low band of wall around a pool is treated as its own problem rather than as the bottom of a wall. It gets brought back to a sound surface, any salt or mineral deposit removed and allowed to dry, and a coating specified for repeated wetting and full sun.',
      },
      {
        heading: 'Boundary Walls and Entrances',
        text: 'Gate pillars, driveway walls and boundary walls are what set the impression of a property from the road. They are quoted alongside the terrace because they take the same exposure and are usually in the same condition.',
      },
      {
        heading: 'Protecting the Pool and Planting',
        text: 'The pool is covered, paving and outdoor furniture sheeted, and planting protected before anything starts. Nothing goes in the water, and the area is cleared at the end of each day rather than left sheeted for the duration.',
      },
      {
        heading: 'Knowing What Not to Coat',
        text: 'Pool copings, wet barefoot paving and the pool interior are generally not painting jobs — coatings there create a slip risk, wear through in traffic lines, or need specialist products and a drain-down. Where that is the case, you get told rather than sold a coating.',
      },
    ],
    faqs: [
      {
        q: 'Can you paint the inside of the pool itself?',
        a: 'Pool interiors are specialist work with their own products and a drain-down requirement, and are best treated as a separate job rather than an add-on to painting the walls around it. The surround, terrace and boundary walls are what this service covers.',
      },
      {
        q: 'Does the pool need to be emptied or covered?',
        a: 'Not emptied. It gets covered and protected before work starts, along with the paving, furniture and planting — nothing goes in the water.',
      },
      {
        q: 'Why does the wall around the pool fail before the rest of the villa?',
        a: 'It takes splash-out, repeated wetting and drying, chlorine or salt, full sun and heat reflected off the paving, all in one narrow band. It is a harsher exposure than any wall on the house, so it needs a specification to match rather than the same product used on the facade.',
      },
      {
        q: 'Can the paving around the pool be painted?',
        a: 'Generally not advisable. A coating on wet, barefoot paving is a slip risk and wears through where people actually walk — cleaning or sealing usually gives a better and safer result.',
      },
      {
        q: 'Can this be done at the same time as the house exterior?',
        a: 'Yes, and it usually makes sense — see <a href="/exterior-house-painting">exterior house painting</a>. Doing both in one visit avoids paying twice for access and masking around the same areas.',
      },
      {
        q: 'When is the best time of year to do the terrace?',
        a: 'Spring, before the season starts, is the most common — the weather is workable, the pool is not yet in daily use, and it is done before the summer heat makes both the work and living around it uncomfortable.',
      },
      {
        q: 'Will the pool be usable while the work is happening?',
        a: 'Usually not for the days the surround is being worked on, since it is covered and the area is a working site. That window is agreed up front so it can be planned around, particularly for a rental.',
      },
      {
        q: 'Do you paint pergolas and shade structures too?',
        a: 'Yes — timber pergolas, posts and shade structures are commonly done at the same time as the walls. Timber in full sun needs a flexible treatment rather than a hard film, so it is specified differently from the masonry.',
      },
      {
        q: 'What about the garage, pool house or garden store?',
        a: 'Those are usually quoted alongside the terrace and boundary walls. They are what make a property read as finished rather than half done, and they take the same exposure as the rest of the outdoor area.',
      },
    ],
  },
  {
    slug: 'render-crack-repair',
    name: 'Render & Crack Repair',
    navLabel: 'Render & Crack Repair',
    flagship: false,
    h1: 'Render & Crack Repair in the Algarve',
    seoTitle: 'Render Repair & Crack Filling in the Algarve | Algarve Painter',
    seoDescription: 'Render repair, crack filling and damp treatment for Algarve properties, done properly before painting. Locally based, English-speaking — call today.',
    heroHeadline: 'Fix what is under the paint, not just what you can see.',
    heroTagline: 'Cracks, hollow render and salt bloom dealt with at source before anything is painted over them.',
    ctaNote: 'Send a photo of the crack — get a straight read on it.',
    reassurance: { heading: 'Worried a crack means something structural?', body: 'Most do not — the majority of cracking on Algarve render is cosmetic stress cracking at window corners. A photo and a short call will usually tell you which kind you are looking at, and you will get a straight answer either way.' },
    heroSubhead:
      'Repairing cracked, hollow and damaged render, treating salt bloom and damp staining, and making good before painting.',
    imageAlt: '[Placeholder: Crack raked out and filled on a rendered exterior wall]',
    scenarioImageAlt: '[Placeholder: Hollow render cut back to the substrate ready for making good]',
    detailImageAlt: '[Placeholder: Repaired and primed patch on a villa wall before topcoat]',
    intro:
      'Render repair is the work that decides whether a repaint lasts. Cracking, hollow patches, salt bloom and damp staining all keep coming back through a new coating unless they are dealt with at source first.',
    deepDive: [
      {
        heading: 'Which Cracks Matter and Which Do Not',
        text: 'Most cracking on Algarve render is cosmetic. Fine hairline cracks running diagonally from the corners of windows and doors are stress cracks at the weakest point of an opening, and crazing across a whole panel is usually shrinkage in the render itself — both are dealt with by raking out, filling and reinforcing before painting. What is worth a closer look is a crack that is wide enough to get a fingernail into, one that steps diagonally through the wall following the line of the blockwork, one that runs through a lintel, or one that keeps reopening in exactly the same place after being repaired. Those point at movement rather than surface stress, and repairing and painting over them without understanding why simply resets the clock on the same crack reappearing.',
      },
      {
        heading: 'Why Painting Over Damp Never Works',
        text: 'Where a wall is holding moisture, paint is the wrong tool. Water moving through render carries dissolved salts to the surface, where it evaporates and leaves them behind as the white crystalline bloom common on the lower parts of Algarve walls. A coating applied over that traps moisture behind a film, and it pushes the paint off the wall in bubbles and sheets rather than stopping the problem. The sequence that actually works is finding where the water is getting in — a failed roof detail, a cracked sill, a leaking pipe, rising damp or splash-back off paving — stopping it, letting the wall dry, removing the salt deposits, and only then using a breathable system that lets the wall continue to release moisture rather than sealing it in.',
      },
    ],
    included: [
      'Raking out, filling and reinforcing cracked render',
      'Cutting back hollow or debonded render and making good to match',
      'Treating salt bloom and efflorescence rather than coating over it',
      'Identifying and reporting the source of damp staining before any painting',
      'Repairing damaged window sills, reveals, corners and wall edges',
      'Treating and killing algae, mould and organic growth at the root',
      'Priming all repairs so the topcoat binds evenly across old and new',
    ],
    whyItMatters:
      'Render is what keeps water out of the wall behind it, and paint is what protects the render. Once cracking lets water in, the damage accelerates — freeze-thaw is not the issue here, but repeated wetting, salt crystallisation and sun do the same work more slowly. Dealing with render while the problem is still cosmetic is consistently cheaper than waiting until sections have to be cut out and replaced.',
    scenarios: [
      {
        heading: 'Cracks Found While Quoting a Repaint',
        text: 'The most common route into this work. A wall that looked like it needed painting turns out to need repair first, and doing them in the right order is what makes the paint last.',
      },
      {
        heading: 'Salt Bloom on a Low Wall or Boundary Wall',
        text: 'White crystalline deposits low down on a wall, usually where splash-back off paving or ground moisture is feeding the render. Treated at source rather than coated over.',
      },
      {
        heading: 'A Survey Flagged Render Before a Sale',
        text: 'Cracking and hollow render picked up in a survey, needing putting right — or at least accurately understood — before a sale or purchase completes.',
      },
      {
        heading: 'Repairs After a Leak or Roof Problem',
        text: 'Once the leak itself is fixed, the wall it damaged still needs drying, making good and repainting before it looks right again.',
      },
    ],
    propertyTypes: [
      { type: 'Villa', text: 'Most often window and door corner cracking, hollow patches on sun-exposed elevations, and salt bloom on low or boundary walls.' },
      { type: 'Apartment', text: 'Usually terrace and balcony walls, sills and undersides of balconies, where the individual owner is responsible rather than the building.' },
      { type: 'Holiday Rental', text: 'Repairs timed into an off-season gap, since render work is dustier and less guest-compatible than straightforward painting.' },
      { type: 'Commercial Premises', text: 'Shopfront surrounds, apartment-block common areas and stairwells, and any wall where cracking is visible to customers or residents.' },
    ],
    commonProblems: [
      {
        symptom: 'Fine cracks running diagonally from the corner of every window',
        text: 'Stress cracking at the weakest point of an opening, and normally cosmetic. It is raked out, filled and reinforced before painting rather than being skimmed over, which is why it reappears when it has only been painted across.',
      },
      {
        symptom: 'A crack wide enough to get a fingernail into, stepping through the wall',
        text: 'That pattern points at movement rather than surface stress. It is worth understanding the cause before repairing and painting over it, because a cosmetic repair over a moving crack reopens in the same place.',
      },
      {
        symptom: 'The wall sounds hollow when tapped',
        text: 'The render has debonded from the substrate behind it. That section needs cutting back to sound material and making good — a coating over hollow render comes away with it when it eventually lets go.',
      },
      {
        symptom: 'White powdery crystals on the lower part of a wall',
        text: 'Efflorescence: salts carried to the surface by moisture moving through the wall. The moisture source has to be dealt with and the wall allowed to dry, because painting over it traps the water and the bloom returns through the new coating.',
      },
      {
        symptom: 'A patch repair from a few years ago is cracked around its edges',
        text: 'The repair was made in a material that moves differently from the surrounding render, so it has separated at the joint. It generally needs cutting out and redoing in a compatible material rather than filling the outline again.',
      },
      {
        symptom: 'Render is crumbling and coming away where it meets the ground',
        text: 'Usually splash-back off paving plus ground moisture wicking up. Repairing it without addressing drainage or the ground level against the wall means repeating the repair on the same schedule.',
      },
      {
        symptom: 'A brown or yellow stain keeps spreading on an internal wall',
        text: 'Water getting in from outside and showing on the inside face. The external cause needs finding first — the internal decoration is the symptom, not the problem.',
      },
      {
        symptom: 'The window sill is cracked and water sits on it',
        text: 'A failed sill or a lost drip detail sends water straight down the face of the wall instead of throwing it clear, which is why the render below sills is often the worst on a property. The sill needs repairing properly rather than the wall below it just being repainted.',
      },
    ],
    extraSections: [
      {
        heading: 'Assessing Before Repairing',
        text: 'Cracks are looked at for width, pattern and whether they have been repaired before, and render is sounded for hollow areas that are not visible. What comes back is a plain-English read on what is cosmetic and what is not, rather than a quote to fill everything.',
      },
      {
        heading: 'Cutting Back and Making Good',
        text: 'Hollow and damaged render is cut back to sound material and made good in a compatible material, matched to the surrounding texture so the repair does not read as a patch once painted.',
      },
      {
        heading: 'Damp and Salt Bloom',
        text: 'Efflorescence and damp staining are treated at source rather than coated over. Where the cause is outside the scope of decorating work — a plumbing leak or a roof detail — you get told what it is rather than sold a coating that will fail.',
      },
      {
        heading: 'Priming Before Painting',
        text: 'Every repair is primed before the topcoat, because filler and new render absorb differently from aged paint. It is the step that stops repairs flashing through as visible patches in the finished wall.',
      },
    ],
    faqs: [
      {
        q: 'Are the cracks in my wall serious?',
        a: 'Most are not. Fine cracking from window and door corners, and crazing across a panel, are usually cosmetic. Cracks that are wide, that step through the wall diagonally, that run through a lintel, or that keep reopening after repair are worth looking at more closely before anything is painted over them.',
      },
      {
        q: 'Can you just fill the cracks and paint over them?',
        a: 'Cracks are raked out, filled and reinforced rather than skimmed over — a surface fill over an open crack reappears within a season or two. Where the cracking points at movement rather than surface stress, that gets flagged instead of painted over.',
      },
      {
        q: 'Do I need render repair before painting?',
        a: 'Where there is cracking, hollow render or damp, yes. Paint bonds to whatever is under it, so a coating over unsound render fails in the same places regardless of the product used.',
      },
      {
        q: 'What is the white powder on my wall?',
        a: 'Efflorescence — salts left behind as moisture moving through the wall evaporates at the surface. It indicates water in the wall, so the source needs dealing with and the wall drying before any coating goes on.',
      },
      {
        q: 'Can you find out where the damp is coming from?',
        a: 'The common causes get checked — failed sills, cracked render, splash-back off paving, ground levels, roof and gutter details. Where it turns out to be plumbing or a structural issue, you get told plainly rather than sold decorating work that will not fix it.',
      },
      {
        q: 'Will the repair be visible once it is painted?',
        a: 'Not if it is made good to match the surrounding texture and primed before the topcoat. Repairs show through when they are left unprimed, because filler and new render absorb paint differently from weathered wall.',
      },
      {
        q: 'Can repairs be done without repainting the whole wall?',
        a: 'Physically yes, but the repaired area will read differently from the weathered paint around it. For anything more than a small patch in an inconspicuous spot, painting the full elevation is what actually makes the repair disappear.',
      },
      {
        q: 'Do you do this as a standalone job, or only with painting?',
        a: 'Either. Repairs are commonly done as part of an <a href="/exterior-house-painting">exterior repaint</a>, but they are also taken on on their own — for example ahead of a sale, or after a leak has been fixed.',
      },
      {
        q: 'How urgent is it if I have found cracking?',
        a: 'Cosmetic cracking is not an emergency, but it is the cheap stage. Once water is getting in behind the render regularly, repairs move from filling to cutting out and replacing sections, which is a bigger job.',
      },
    ],
  },
  {
    slug: 'wood-shutter-treatment',
    name: 'Wood & Shutter Treatment',
    navLabel: 'Wood & Shutter Treatment',
    flagship: false,
    h1: 'Wood & Shutter Treatment in the Algarve',
    seoTitle: 'Wood & Shutter Painting in the Algarve | Algarve Painter',
    seoDescription: 'Shutters, doors, pergolas and window frames sanded, treated and refinished for Algarve sun and salt air, by a locally based, English-speaking team.',
    heroHeadline: 'Bring the shutters back before the timber goes.',
    heroTagline: 'Sanded back, treated and refinished — not painted over and left to split again.',
    ctaNote: 'A five-minute call is enough to point you right.',
    reassurance: { heading: 'Not sure if the shutters are worth saving?', body: 'Often they are, even when they look past it — splitting and greying is usually surface damage rather than rot. A look at a couple of photos will usually tell you whether it is a refinish or a replacement, and you will get the honest version.' },
    heroSubhead:
      'Treating and refinishing exterior and interior timber — shutters, doors, window frames, pergolas, gates, decking rails and joinery.',
    imageAlt: '[Placeholder: Louvred shutter sanded back and part-refinished]',
    scenarioImageAlt: '[Placeholder: Shutters taken off and laid out on trestles for treatment]',
    detailImageAlt: '[Placeholder: Brush working stain into the grain of a pergola post]',
    intro:
      'Timber has the hardest time of anything on an Algarve property. Strong UV breaks down the surface, heat and dry air open the grain up, and salt air near the coast accelerates all of it — so shutters, pergolas and exterior doors are usually the first things to look neglected.',
    deepDive: [
      {
        heading: 'Why Algarve Timber Fails the Way It Does',
        text: 'Timber outdoors here goes through a daily cycle of expansion and contraction that a milder climate never puts it through — heating hard in direct sun, cooling quickly at night, drying out through the summer and taking on moisture again in winter. That movement is what opens up the joints on a louvred shutter, lifts a film finish at the edges, and splits the end grain on pergola posts. Sun does the rest: UV breaks down the surface fibres and turns exposed wood grey and fibrous. Salt air near the coast speeds it up further and corrodes the fixings, hinges and catches at the same time. The practical consequence is that a hard, glossy film finish is often the wrong choice out here — it looks good for a season, then cracks where the wood moves and lets water underneath, where it does more damage than no coating at all.',
      },
      {
        heading: 'Refinishing Versus Replacing',
        text: 'Timber that looks beyond saving frequently is not. Greying, a rough fibrous surface, opened grain and surface splitting are all surface conditions — sanding back usually reveals sound wood a few fractions of a millimetre down. What genuinely warrants replacement is soft, spongy timber that a screwdriver pushes into, rot at the bottom rails and corners where water has been sitting, joints that have opened so far the frame has racked out of square, or shutters so far gone that the fixings no longer hold. The useful test is not how bad it looks, but whether the wood is still hard, and that is usually settled in a couple of minutes on-site — or from a close photo.',
      },
    ],
    included: [
      'Sanding back greyed, split and degraded timber to sound wood',
      'Filling splits and open joints, and treating any rot found at rails and corners',
      'Shutters taken off, worked on trestles and rehung where that gives a better finish',
      'Cleaning up or replacing seized hinges, catches and fixings where needed',
      'Exterior doors, window frames, gates, pergolas, decking rails and garden joinery',
      'Interior doors, skirtings, architraves, staircases and built-in joinery',
      'Flexible, UV-resistant exterior treatments suited to timber that moves',
    ],
    whyItMatters:
      'Shutters and exterior doors are the details that make an Algarve property look either cared-for or neglected, and they are what people notice first from the street. More practically, timber that is left untreated eventually stops being a decorating job and becomes a joinery one — and replacing a set of shutters costs considerably more than keeping the existing ones on a maintenance cycle.',
    scenarios: [
      {
        heading: 'Shutters That Have Gone Grey and Rough',
        text: 'The classic Algarve problem. Usually surface degradation rather than failed timber, and usually recoverable by sanding back and refinishing rather than replacing.',
      },
      {
        heading: 'A Front Door That Lets the Property Down',
        text: 'A single door in full afternoon sun, splitting and faded while the rest of the property looks fine. A small, self-contained job with an outsized effect on how the property reads.',
      },
      {
        heading: 'Pergola or Shade Structure Before Summer',
        text: 'Timber overhead structures dry, split and open up faster than anything at ground level. Getting them treated before the season keeps them from becoming a replacement job.',
      },
      {
        heading: 'Interior Woodwork With a Redecoration',
        text: 'Doors, skirtings, architraves and staircases done alongside the walls — deglossed and keyed properly so the finish holds up to knocks rather than chipping at the first contact.',
      },
    ],
    propertyTypes: [
      { type: 'Villa', text: 'Usually the largest timber inventory: shutters throughout, exterior doors, gates, a pergola, decking rails and garden joinery.' },
      { type: 'Apartment', text: 'Typically shutters and window frames on the unit\'s own openings, plus balcony joinery, rather than anything in shared areas.' },
      { type: 'Holiday Rental', text: 'Shutters and the front door do a lot of work in listing photographs, so they are often the highest-value timber to keep on top of.' },
      { type: 'Commercial Premises', text: 'Shopfront joinery, restaurant terrace timber and hotel or apartment-block common-area doors — scheduled outside opening hours where needed.' },
    ],
    commonProblems: [
      {
        symptom: 'Shutters have gone silver-grey and feel rough and fibrous',
        text: 'UV has broken down the surface fibres. Almost always surface-only — sanding back generally reaches sound timber quickly, and the shutters do not need replacing.',
      },
      {
        symptom: 'The finish is peeling off in flakes along the edges of the slats',
        text: 'A hard film finish that could not move with the timber, so it cracked at the edges and let water underneath. It needs taking back rather than recoating, and a more flexible treatment used in its place.',
      },
      {
        symptom: 'A shutter has swollen and no longer closes properly',
        text: 'Moisture taken up through unsealed end grain, often at the bottom rail. It needs drying, easing and the end grain sealing — planing it to fit while swollen leaves a gap once it dries back.',
      },
      {
        symptom: 'The bottom rail of the shutter is soft and crumbly',
        text: 'Rot where water has been sitting, and the one condition that is genuinely past refinishing. Sometimes a single rail can be repaired or replaced rather than the whole shutter — worth assessing before writing the set off.',
      },
      {
        symptom: 'Hinges and catches are seized solid with rust',
        text: 'Salt air corroding the ironmongery. Fixings are freed off, cleaned up or replaced as part of the work — refinishing timber and rehanging it on failed hinges is a false economy.',
      },
      {
        symptom: 'The pergola posts have deep splits running along the grain',
        text: 'Normal drying movement in timber under strong sun. Splits are filled and the structure treated with something flexible — they are cosmetic unless they run through a joint or a load-bearing section.',
      },
      {
        symptom: 'The front door has faded on the outside but looks fine inside',
        text: 'One face takes all the UV. It gets sanded and refinished on the exposed side, though refinishing both faces gives a more consistent result if the colour has shifted noticeably.',
      },
      {
        symptom: 'Interior woodwork chips as soon as anything touches it',
        text: 'Recoated over old gloss without deglossing or keying, so the new coat never bonded. It has to come back to a sound, keyed surface — more coats on top will keep chipping.',
      },
    ],
    extraSections: [
      {
        heading: 'Back to Sound Timber',
        text: 'Greyed and degraded surface is sanded back to sound wood, splits and open joints are filled, and any rot is cut out and treated. The finish is only as good as what is under it, and on timber that is a preparation problem more than a product one.',
      },
      {
        heading: 'Shutters Off and On Trestles',
        text: 'Where it gives a better result, shutters come off and are worked flat on trestles, which allows the edges and the top and bottom of every slat to be treated properly rather than just the visible face.',
      },
      {
        heading: 'Finishes That Move With the Wood',
        text: 'Timber outdoors in the Algarve moves constantly, so treatments are chosen to flex with it rather than form a hard film that cracks. That means a finish that wears gradually and can be refreshed, instead of one that fails suddenly and has to be stripped.',
      },
      {
        heading: 'Ironmongery and Fixings',
        text: 'Hinges, catches, stays and fixings are freed off, cleaned up or replaced where salt air has taken them. Refinished shutters hanging on seized hinges is a job half done.',
      },
    ],
    faqs: [
      {
        q: 'Are my shutters worth saving or do they need replacing?',
        a: 'More often than not they are worth saving. Greying, roughness and surface splitting are surface conditions that sand out. What genuinely warrants replacement is soft, spongy timber, rot at the bottom rails, or joints that have opened so far the frame has racked out of square.',
      },
      {
        q: 'Do the shutters have to come off?',
        a: 'Not always, but taking them off and working them on trestles gives a better result — it allows the edges and the tops and bottoms of the slats to be treated rather than just the face you can see.',
      },
      {
        q: 'Should shutters be stained or painted?',
        a: 'Both work; what matters more here is that the finish can move with the timber rather than forming a hard, brittle film. A finish that wears gradually and can be refreshed beats one that looks perfect for a season and then has to be stripped.',
      },
      {
        q: 'How often do exterior shutters need doing in the Algarve?',
        a: 'It depends heavily on exposure — shutters on a shaded elevation last far longer than ones taking direct afternoon sun and salt air. The signal to watch for is the finish starting to dull and the timber feeling rough, which is the point at which a refresh is still straightforward.',
      },
      {
        q: 'Can you repair a rotten section rather than replacing the whole shutter?',
        a: 'Often yes — rot is usually confined to the bottom rail or a corner where water has been sitting, and a single section can sometimes be repaired or replaced rather than writing off the whole shutter.',
      },
      {
        q: 'Do you do interior woodwork as well?',
        a: 'Yes — doors, frames, skirtings, architraves, staircases and built-in joinery, usually alongside <a href="/interior-painting">interior painting</a> so the same edges are not masked twice.',
      },
      {
        q: 'What about pergolas and outdoor timber structures?',
        a: 'Those are commonly done with the <a href="/villa-pool-area-painting">terrace and pool area</a>. Overhead timber dries and splits faster than anything at ground level, so it tends to need attention sooner than shutters do.',
      },
      {
        q: 'Will you deal with the hinges and catches too?',
        a: 'Yes. Seized or corroded ironmongery is freed off, cleaned up or replaced as part of the work, because rehanging refinished shutters on failed hinges undoes the point of doing them.',
      },
      {
        q: 'Can this be done at the same time as painting the walls?',
        a: 'Yes, and it is usually the efficient way round — see <a href="/exterior-house-painting">exterior house painting</a>. The shutters have to be masked or removed for the walls anyway, so treating them in the same visit avoids doing that work twice.',
      },
    ],
  },
  {
    slug: 'metalwork-railing-painting',
    name: 'Metalwork & Railing Painting',
    navLabel: 'Metalwork & Railing Painting',
    flagship: false,
    h1: 'Metalwork & Railing Painting in the Algarve',
    seoTitle: 'Metalwork & Railing Painting in the Algarve | Algarve Painter',
    seoDescription: 'Rust treated back to sound metal, primed and repainted — railings, gates, balconies and grilles across the Algarve. English-speaking team, call today.',
    heroHeadline: 'Stop the rust before it stains the whole wall.',
    heroTagline: 'Taken back to sound metal, primed properly, then painted — not glossed over.',
    ctaNote: 'Describe what is rusting — get a clear answer in plain English.',
    reassurance: { heading: 'Rust streaks down the wall already?', body: 'Then the railing is the job, not the wall — repainting the render alone just means the staining comes back. A short call sorts out what needs treating and in what order.' },
    heroSubhead:
      'Treating and repainting exterior metalwork — railings, balustrades, gates, window grilles, balconies, staircases and pool handrails.',
    imageAlt: '[Placeholder: Wrought-iron balcony railing part-stripped and primed]',
    scenarioImageAlt: '[Placeholder: Rust bleed staining rendered wall below a corroded balustrade]',
    detailImageAlt: '[Placeholder: Brush working primer into a wrought-iron gate scroll]',
    intro:
      'Metalwork is where salt air does its most visible damage. Railings, gates, grilles and balustrades corrode from the inside of the coating outwards, and once rust starts bleeding down a wall it becomes two jobs rather than one.',
    deepDive: [
      {
        heading: 'Why Painting Over Rust Always Comes Back',
        text: 'Rust is not a stain sitting on top of metal — it is the metal itself converting, and it keeps converting underneath anything painted over it. A coating applied over active corrosion is holding onto rust rather than to steel, so it lifts within a season or two and usually takes a patch of surrounding sound paint with it. The only sequence that lasts is mechanical: take the corrosion back to bright, sound metal, treat what cannot be reached, get a proper metal primer onto the bare steel quickly before it starts to flash-rust again, and then build the topcoats. That is why a metalwork quote is mostly preparation time. Coastal properties make it more urgent still, because salt in the air is both an accelerant and an electrolyte, and it finds every scratch, weld and fixing.',
      },
      {
        heading: 'Where Corrosion Actually Starts',
        text: 'Corrosion rarely begins in the middle of a smooth section. It starts where water sits or where the coating is thinnest: the underside of a handrail, the bottom of a baluster where it meets a wet terrace, welds and joints, the inside faces of scrollwork, the point where a railing is set into masonry, and around every fixing. That has two consequences worth knowing. First, an inspection has to include the faces you cannot see from standing height — the underside of a rail is usually worse than the top. Second, the point where metal enters render or concrete is the one to watch hardest, because corroding steel expands as it converts and will crack the masonry around it, turning a painting job into a repair job.',
      },
    ],
    included: [
      'Taking corrosion back to sound, bright metal rather than coating over it',
      'Treating pitted areas and joints that cannot be fully cleaned mechanically',
      'Metal primer applied to bare steel before it can begin to flash-rust',
      'Topcoats built up for coastal exposure and full sun',
      'Railings, balustrades, balconies, staircases and pool handrails',
      'Gates, gate frames, window grilles, security bars and railings set into masonry',
      'Making good the render staining and cracking that corrosion has caused',
    ],
    whyItMatters:
      'Metalwork on a coastal property is on a clock in a way that render and timber are not — corrosion does not pause, and it does not stay confined to the metal. Left alone it stains the walls below it, cracks the masonry where railings are set in, and eventually compromises balustrades and handrails that people lean on. Keeping on top of it is straightforward maintenance; catching it late turns it into fabrication and masonry work.',
    scenarios: [
      {
        heading: 'Rust Streaks Down a Freshly Painted Wall',
        text: 'The most common trigger for this work. The wall was repainted, the corroding railing above it was not, and the staining is back within a season.',
      },
      {
        heading: 'Balcony Balustrades on a Coastal Apartment',
        text: 'Exposed directly to salt air with nothing between them and the sea. These generally need attention on a shorter cycle than anything else on the property.',
      },
      {
        heading: 'Entrance Gates and Railings',
        text: 'Wrought-iron gates and driveway railings set the impression of a property from the road, and their moving parts and fixings corrode faster than the flat sections.',
      },
      {
        heading: 'Pool Handrails and Steps',
        text: 'Constantly wetted, often with chlorinated or salt water, and handled by everyone using the pool. Corrosion here is a safety consideration rather than a cosmetic one.',
      },
    ],
    propertyTypes: [
      { type: 'Villa', text: 'Typically driveway gates, boundary railings, balcony balustrades, external staircases, window grilles and pool handrails.' },
      { type: 'Apartment', text: 'Balcony and terrace balustrades — the individual owner\'s metalwork, since shared stairwell railings usually fall to the condominium.' },
      { type: 'Holiday Rental', text: 'Balustrades and handrails guests actually use, where corrosion is a safety question as well as an appearance one.' },
      { type: 'Commercial Premises', text: 'Shopfront grilles and security shutters, hotel and apartment-block stair railings, terrace balustrades and external fire escapes.' },
    ],
    commonProblems: [
      {
        symptom: 'Rust-coloured streaks running down the wall below a railing',
        text: 'Corrosion runoff staining the render. Repainting the wall alone leaves the source in place and the staining returns — the metalwork has to be dealt with first, then the wall made good.',
      },
      {
        symptom: 'Paint on the railing is blistering with rust visible underneath',
        text: 'Corrosion advancing beneath the coating and pushing it off. It has to be taken back to sound metal and primed; another topcoat over it fails in the same places within a season or two.',
      },
      {
        symptom: 'The render is cracking where a railing is set into the wall',
        text: 'Corroding steel expands as it converts and splits the masonry around it. That needs the metal treating and the render making good together — see <a href="/render-crack-repair">render and crack repair</a>.',
      },
      {
        symptom: 'The underside of the handrail is far worse than the top',
        text: 'Water sits on the underside and the coating is usually thinnest there. It is the face most often missed on a quick repaint, which is why corrosion frequently reappears from below.',
      },
      {
        symptom: 'A gate has started dragging or no longer latches',
        text: 'Corrosion building up on hinges and at the latch, or a frame that has moved. Fixings are freed off and treated as part of the work — painting a gate that does not close is fixing the wrong problem.',
      },
      {
        symptom: 'Deep pitting in the metal that cannot be sanded out',
        text: 'Corrosion has eaten into the section rather than just the surface. Pitting is treated and filled where the metal is still structurally sound, and flagged where it is not — some sections are a fabrication job rather than a painting one.',
      },
      {
        symptom: 'Aluminium or galvanised metal has gone chalky and dull',
        text: 'A different failure from rust — surface oxidation rather than corrosion through the section. It needs cleaning and keying with the right primer for that metal, because a standard steel primer will not adhere properly.',
      },
      {
        symptom: 'The pool handrail feels loose in its fixing',
        text: 'Corrosion at the point where the rail enters the deck, which is the wettest part of the whole installation. Worth treating as a safety issue rather than something to look at with the next repaint.',
      },
    ],
    extraSections: [
      {
        heading: 'Back to Sound Metal',
        text: 'Corrosion is removed mechanically back to bright, sound steel rather than being painted over. It is the least glamorous and most important part of the job, and it is what the majority of the time on a metalwork quote actually goes on.',
      },
      {
        heading: 'Priming Before It Flash-Rusts',
        text: 'Bare steel begins to corrode again quickly once exposed, particularly in humid coastal air, so primer goes on promptly rather than at the end of the day. The primer is matched to the metal — steel, galvanised and aluminium each need a different one.',
      },
      {
        heading: 'The Faces You Cannot See',
        text: 'Undersides of rails, the inside faces of scrollwork, welds, joints and every fixing point get treated, not just the visible surfaces. Corrosion starts where water sits, which is almost always somewhere you are not looking.',
      },
      {
        heading: 'Where Metal Meets Masonry',
        text: 'Railings set into render or concrete are the highest-priority detail, because corroding steel expands and cracks the masonry around it. Treating the metal and making good the render is one job, not two.',
      },
    ],
    faqs: [
      {
        q: 'Can you just paint over the rust?',
        a: 'No — or rather, it can be done and it does not last. Paint over active corrosion is bonded to rust rather than to metal, so it lifts within a season or two and usually takes surrounding sound paint with it. Taking it back to sound metal is what makes the job worth doing.',
      },
      {
        q: 'The rust is staining my wall — do I need to repaint the wall too?',
        a: 'Usually yes, but in the right order: treat the metalwork first, then make good and repaint the wall. Doing the wall first means the staining reappears from the same source.',
      },
      {
        q: 'How often does coastal metalwork need doing?',
        a: 'More often than anything else on the property, and it varies with how directly exposed it is — a seafront balcony balustrade is on a much shorter cycle than a gate set back from the road. The signal to act on is the first blistering or rust spotting, not visible streaking.',
      },
      {
        q: 'Is a corroded balustrade a safety issue?',
        a: 'It can be. Surface corrosion is cosmetic, but corrosion that has eaten into the section, or that has loosened a fixing where a rail enters masonry or decking, affects something people lean on. Anything found in that condition gets flagged plainly rather than painted.',
      },
      {
        q: 'Do you work on aluminium and galvanised metal as well as iron?',
        a: 'Yes, though they are prepared and primed differently — a primer intended for steel will not adhere properly to aluminium or galvanised surfaces. Getting that right is what stops the coating peeling off in sheets later.',
      },
      {
        q: 'Can badly pitted metal be saved?',
        a: 'Where the section is still structurally sound, pitting can be treated and filled. Where corrosion has eaten through, that is a fabrication job rather than a painting one, and you get told which of the two you are looking at.',
      },
      {
        q: 'Will the gate still work properly afterwards?',
        a: 'Hinges, latches and fixings are freed off and treated as part of the work. A gate that drags or will not latch is usually a corrosion problem at those points rather than a frame problem, and it gets dealt with rather than painted around.',
      },
      {
        q: 'Can this be done alongside painting the house?',
        a: 'Yes, and it is generally the sensible order — see <a href="/exterior-house-painting">exterior house painting</a>. Metalwork is treated first so that any staining it has caused can be made good when the walls are painted.',
      },
    ],
  },
  {
    slug: 'waterproof-roof-coating',
    name: 'Waterproof & Roof Coating',
    navLabel: 'Waterproof & Roof Coating',
    flagship: false,
    h1: 'Waterproof & Roof Coating in the Algarve',
    seoTitle: 'Waterproof & Roof Coating in the Algarve | Algarve Painter',
    seoDescription: 'Flat roof and terrace waterproof coatings for Algarve properties — surfaces prepared, details sealed, then coated. English-speaking team, call today.',
    heroHeadline: 'Deal with it before it shows up on the ceiling.',
    heroTagline: 'Flat roofs and terraces prepared and coated — details and upstands included, not skipped.',
    ctaNote: 'No pressure — just a clear answer about your options.',
    reassurance: { heading: 'Water coming in and not sure where from?', body: 'The stain inside is almost never directly under the leak. Working out where water is actually getting in comes before any coating goes down — and if the answer is that a coating will not fix it, you will hear that.' },
    heroSubhead:
      'Waterproof coatings for flat roofs, roof terraces, balconies and parapets, with the detailing and upstands treated as part of the job.',
    imageAlt: '[Placeholder: Roller applying waterproof coating across a flat roof terrace]',
    scenarioImageAlt: '[Placeholder: Parapet upstand and outlet detail being sealed before coating]',
    detailImageAlt: '[Placeholder: Ponding water sitting on an untreated flat roof after rain]',
    intro:
      'Flat roofs and roof terraces are common on Algarve properties, and they are where most water ingress starts. A waterproof coating is what stands between winter rain and the ceiling below — and it is nearly always the details rather than the open field that fail first.',
    deepDive: [
      {
        heading: 'It Is Almost Always the Details',
        text: 'The middle of a flat roof is rarely where water gets in. Failures concentrate at the junctions and interruptions: where the roof turns up into a parapet, around rainwater outlets and gullies, at the base of anything penetrating the surface — pipes, aerial mounts, solar fixings, air-conditioning feet — at door thresholds onto a roof terrace, and at every joint and change of material. Those are the places where a coating is thinnest, where movement concentrates, and where debris collects and holds water. A quote that covers the open area and treats detailing as an afterthought is quoting the easy eighty per cent of the surface and leaving the twenty per cent that actually leaks, which is why detailing, upstands and outlets are scoped as part of the work rather than as extras.',
      },
      {
        heading: 'Finding Where the Water Is Actually Getting In',
        text: 'The stain on a ceiling is very seldom directly beneath the point of entry. Water tracks along the underside of a slab, follows a beam or a service run, and emerges at the lowest or weakest point it reaches, which can be several metres away and on a different side of the room. That means the sequence is investigation before coating: looking at the roof surface, the upstands, the outlets and the parapet copings, checking where ponding sits after rain, and considering whether the source might not be the roof at all — a cracked parapet coping, a failed door threshold, a blocked gully backing up, or a plumbing run. Coating a roof without establishing that is how a property ends up with a new coating and the same leak.',
      },
    ],
    included: [
      'Clearing, cleaning and preparing the existing roof or terrace surface',
      'Assessing where water is actually entering before any coating is specified',
      'Repairing cracks, blisters and failed patches in the existing surface',
      'Detailing at upstands, parapets, outlets, gullies and penetrations',
      'Sealing around pipes, fixings, aerial and air-conditioning mounts and thresholds',
      'Reinforcement at joints, junctions and changes of material',
      'Flat roofs, roof terraces, balcony decks, parapets and canopies',
    ],
    whyItMatters:
      'Water getting into a flat roof does not stay in the roof. It tracks into the structure, shows up as staining and mould on ceilings and walls below, damages internal decoration, and in the Algarve it feeds the salt bloom that pushes exterior paint off walls from behind. Keeping the roof surface and its details sound is the single most cost-effective maintenance job on a flat-roofed property, because everything downstream of a leak is more expensive than the coating would have been.',
    scenarios: [
      {
        heading: 'A Stain That Appeared on the Ceiling After Heavy Rain',
        text: 'The usual starting point. The first job is finding where the water is actually getting in, which is rarely directly above the stain.',
      },
      {
        heading: 'A Roof Terrace in Regular Use',
        text: 'A terrace that is walked on, furnished and used as outdoor living space wears differently from a roof nobody goes onto, and needs a surface specified for foot traffic.',
      },
      {
        heading: 'Before the Winter Rain',
        text: 'Autumn work on a roof that got through the summer but showed signs of failure the previous winter — done while the surface is dry and before it is tested again.',
      },
      {
        heading: 'A Coating That Has Blistered and Lifted',
        text: 'A previous coating applied over a damp or dirty surface, now lifting in patches. The failed material has to come off rather than be coated over again.',
      },
    ],
    propertyTypes: [
      { type: 'Villa', text: 'Flat roof areas, roof terraces, garage and outbuilding roofs, canopies and parapet copings — often several separate areas rather than one surface.' },
      { type: 'Apartment', text: 'Balcony and terrace decks, and any private roof terrace, where water getting through affects the apartment below as much as your own.' },
      { type: 'Holiday Rental', text: 'Best done off-season, since a roof terrace out of use during the season removes the feature a rental is often booked for.' },
      { type: 'Commercial Premises', text: 'Flat roofs over shops, restaurants and offices, and hotel or apartment-block roof areas — usually scheduled around trading or occupancy.' },
    ],
    commonProblems: [
      {
        symptom: 'A damp stain on the ceiling that gets worse after heavy rain',
        text: 'Water entering the roof and tracking through the structure before it shows. The point of entry is usually somewhere other than directly above the stain, so it needs finding rather than assuming.',
      },
      {
        symptom: 'Water sits in puddles on the roof for days after rain',
        text: 'Ponding, caused by falls that do not run to the outlets or by a surface that has settled. Standing water finds every weakness in a coating, so it is worth addressing rather than just coating over.',
      },
      {
        symptom: 'The existing coating has blistered and is lifting in patches',
        text: 'Almost always applied over a damp or inadequately cleaned surface, so it never bonded. The failed material has to be removed back to a sound surface — coating over a blistered layer repeats the failure.',
      },
      {
        symptom: 'Cracking where the roof turns up into the parapet wall',
        text: 'The upstand junction is where movement concentrates, and it is the single most common leak point on a flat roof. It needs proper detailing and reinforcement rather than the field coating simply being carried up the wall.',
      },
      {
        symptom: 'The outlet or gully is blocked and water backs up',
        text: 'Debris in the outlet turning the roof into a shallow tank. Clearing it is straightforward; the important part is checking what the standing water has already done to the surface and the surrounding detail.',
      },
      {
        symptom: 'Damp appearing on the wall below a roof terrace door',
        text: 'The threshold detail, not the roof field. Door thresholds onto terraces are a frequent entry point and often get missed entirely because attention goes to the open roof area.',
      },
      {
        symptom: 'Water is coming in around an air-conditioning or solar fixing',
        text: 'Anything bolted through a roof is a penetration through the waterproof layer. Each one needs sealing and detailing individually, and they are commonly the last thing anyone checks.',
      },
      {
        symptom: 'The parapet coping is cracked and the wall below it is stained',
        text: 'Water getting into the top of the wall rather than through the roof surface at all. Coating the roof will not touch it — the coping needs repairing, and the wall below making good.',
      },
    ],
    extraSections: [
      {
        heading: 'Investigation First',
        text: 'Where there is an active leak, the work starts with establishing where water is actually entering — the surface, the upstands, the outlets, the copings, the thresholds, or something that is not the roof at all. A coating specified before that is a guess.',
      },
      {
        heading: 'Preparation and Repair',
        text: 'Surfaces are cleared and cleaned, failed or blistered previous coatings removed back to sound material, and cracks and damaged areas repaired. Coatings bond to what is under them, and on a roof that matters more than anywhere else on a property.',
      },
      {
        heading: 'Detailing, Upstands and Outlets',
        text: 'Junctions, upstands, outlets, penetrations and thresholds are detailed and reinforced as part of the job rather than treated as extras, because those are the places a flat roof actually fails.',
      },
      {
        heading: 'Terraces That Get Used',
        text: 'A roof terrace with furniture and foot traffic is a different specification from a roof nobody walks on. Where a surface is in regular use, it is specified for that rather than for a roof that only ever sees rain.',
      },
    ],
    faqs: [
      {
        q: 'Can a coating fix an active leak?',
        a: 'Often yes, but only once it is clear where the water is getting in. If the source turns out to be a cracked parapet coping, a failed door threshold or a plumbing run rather than the roof surface, a coating will not fix it — and you get told that rather than sold one.',
      },
      {
        q: 'The stain is in the middle of the ceiling — is the leak directly above it?',
        a: 'Usually not. Water tracks along the underside of a slab or follows a beam and emerges at the weakest point it reaches, which can be several metres from where it entered. Finding the entry point is a separate step from seeing the damage.',
      },
      {
        q: 'Can you coat over the existing waterproofing?',
        a: 'Where the existing layer is sound, clean and compatible, often yes. Where it has blistered, lifted or failed, it has to come off first — a coating over failed material fails in the same places.',
      },
      {
        q: 'Will the roof terrace still be usable afterwards?',
        a: 'Yes, provided it is specified for foot traffic from the outset. A surface intended for a roof nobody walks on will not stand up to furniture and daily use, so how the terrace is actually used needs saying up front.',
      },
      {
        q: 'What about the water that pools after rain?',
        a: 'Ponding is worth addressing rather than coating over, because standing water finds every weakness in a coating and shortens its life considerably. Sometimes that means improving falls to the outlets; sometimes it means accepting it and specifying accordingly.',
      },
      {
        q: 'When is the best time of year to do this?',
        a: 'Late spring through autumn, while the surface is reliably dry and there is a settled window for the coating to cure. Work through the wet season is possible but has to be planned around the weather rather than the diary.',
      },
      {
        q: 'Do you deal with the damage inside as well?',
        a: 'The internal making good — treating staining, sealing it and redecorating — is handled as <a href="/interior-painting">interior painting</a>, once the leak is stopped and the wall or ceiling has dried. Doing it before then means doing it twice.',
      },
      {
        q: 'Does this help with the damp on my walls?',
        a: 'It can, where the water in the wall is coming from a roof or parapet above. Water getting into the structure feeds the salt bloom that pushes exterior paint off walls from behind — see <a href="/render-crack-repair">render and crack repair</a>.',
      },
    ],
  },
];

module.exports = services;
