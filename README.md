# AlgarvePainter.com

Static marketing / lead-generation site for **Algarve Painter** — painting and decorating across the Algarve, targeting English-speaking expats and property owners (UK, Ireland, Netherlands, Germany), plus commercial work.

Built to the same architecture as its sister site, AlgarveSecure — same zero-dependency generator, same template structure, same design system — with the content, services, imagery and branding rewritten for painting.

## Stack

Zero-dependency Node.js static site generator (plain JS template literals, no framework). Content and site structure live in `/src`; running the build compiles everything to plain HTML/CSS/JS in `/public`, ready to deploy to any static host.

```
src/
  data/            site config, 7 services, 22 towns
  templates/       page templates (layout, home, service, town, how-we-work, about, contact)
  assets/          css + js + images + icons, copied as-is into the build
  build.js         generates /public
  _redirects       Netlify trailing-slash rules, copied to the site root
public/            generated static site (build output — deploy this folder)
```

## Build

```
npm run build
```

Regenerates `/public`, including `sitemap.xml` and `robots.txt`, from the data and templates in `/src`. No install step required — the generator has no external dependencies.

## Local preview

```
npm run serve
```

Or any static file server, e.g. `python3 -m http.server 4173 --directory public`.

## Pages (33 total)

- `/` — homepage
- 7 service pages: `/exterior-house-painting` (flagship), `/interior-painting`, `/villa-pool-area-painting`, `/render-crack-repair`, `/wood-shutter-treatment`, `/metalwork-railing-painting`, `/waterproof-roof-coating`
- 22 town pages, e.g. `/albufeira`, `/lagos`, `/tavira`, … (full list in `src/data/towns.js`)
- `/how-we-work`, `/about`, `/contact`

Each URL is served as a clean directory (`/exterior-house-painting/index.html`), which static hosts serve automatically for `/exterior-house-painting`.

## ⚠️ Before going live

**The phone number is a placeholder.** `src/data/site.js` currently carries `+351 000 000 000`, which is wired into every CTA button, the header, the sticky mobile call bar, the WhatsApp deep link, the footer and the `LocalBusiness` JSON-LD. Set `phoneDisplay` and `phoneTel` at the top of that file and everything updates together — nothing else hardcodes a number. `npm run build` prints a warning while the placeholder is still in place.

Also worth confirming before launch:

- **Domain.** `baseUrl` in `src/data/site.js` is `https://www.algarvepainter.com`, which drives every canonical tag and every `sitemap.xml` entry.
- **Business model copy.** `/how-we-work` states that Algarve Painter is a marketing service connecting property owners with a **local painter**, mirroring the sister site's own disclosure. `/about` is worded to match. If that is not how the business actually operates, both need changing together — `src/templates/how-we-work.js` and `src/templates/about.js`.

## Deploying

The `/public` folder is a complete static site — point any static host at it:

- **Netlify / Vercel / Cloudflare Pages**: set build command to `npm run build` and publish directory to `public`.
- **Any plain static host / S3 / GitHub Pages**: upload the contents of `/public` directly.

`src/_redirects` enforces the site-wide trailing-slash convention on Netlify (matching the canonical tags and `sitemap.xml`). On other hosts, apply the equivalent rule in that platform's own redirect configuration.

## Design language

**v4 "paint-craft"** — warm, tactile and pigment-led, replacing the navy/crimson palette inherited from the sister site. Structure, layout, grid, components, breakpoints and the measured hero budgets are unchanged; this is a visual restyle, not a rebuild.

- **Page palette** — crimson `#dc143c` for every CTA and for the wordmark's "Painter" (the colour this site launched with, brought back; the cream label on it measures 4.91:1, clear of AA, with `#b31032` on hover and `#96092a` on press so the pressed state stays the same hue), terracotta `#c25a38` as the decorative accent — painted marks, section swatches, icon tiles — with `#b85132` wherever that accent sits behind text, ochre `#d9a02b`, dusty pink `#d9a08c`, deep brown `#3a241a` for text and dark surfaces, cream `#fbf4e8` as the ground.
- **The wordmark is not held to a text contrast floor.** "Painter" is 21px on phones, under the 24px large-text threshold, and crimson on the light header measures 3.74:1 there against the 4.5:1 that normal text would need. WCAG 1.4.3 exempts brand names and logotypes, and the previous terracotta was lower still at 3.53:1 — so this is an improvement, not a new gap. At desktop size (34px) it clears its 3:1 floor at 4.04:1.
- **Hero** — two photographs of the same five impasto strokes (ochre, dusty rose, orange, deep plum, burgundy) on artist's canvas, one per orientation: `paint example.png` (2048×1152) for desktop from 1025px up, `paint-mobile.png` (1632×2048) for mobile and tablet below it. `tools/paint/hero_from_photo.py` owns the resulting hero files; `generate.py` deliberately no longer writes them, or a routine run would silently overwrite the artwork. Both sources are **mirrored**: the paint mass sits on the left of each photograph and desktop puts its headline there, so unmirrored every word would sit on thick opaque pigment. Mobile stacks its text above the image rather than beside it, so the argument is weaker there — but mirroring it too keeps the artwork facing the same way at every width, so resizing past 1025px does not flip the strokes end for end. The portrait source needs no recomposition — it is shot in the orientation the mobile hero renders into, where the art it replaced was the landscape photo pasted low on a matching canvas ground to avoid losing three of the five strokes to a crop. Its dead bottom margin **is** trimmed, at row 1838 (the last row carrying pigment, measured off the file). Below 1025px the frame is always narrower than the artwork, so `object-fit: cover` fits by height and crops width — every row renders, and the photograph's bottom 210px of bare canvas showed as an empty band under the strokes at the foot of the hero. Trimming takes the source from 0.797:1 to 0.888:1 and puts the burgundy on the frame's bottom edge; nothing is discarded, since the cut is at the paint boundary rather than into it.
- **Hero resolution ceiling** — each large candidate is its source's native width, never an upscale, but neither source is wide enough to cover every device. Phones are fine (a 430px handset at DPR 3 needs 1290px and gets 1632px). A large tablet at DPR 2 needs 2048px and gets 1632px, a 1.26× upscale; a high-DPI desktop needs 3840px at 1920 DPR 2 and gets 2048px, a 1.9× one. A light unsharp mask on the large candidates recovers some crispness — it cannot add detail that is not in the source, so higher-resolution originals are the real fix, and the desktop one is the more urgent.
- **Generated marks** — the section swatches, CTA watermark and favicon are still generated (`tools/paint/generate.py`) in a palette chosen to sit with the photograph.
- **Hero stats, no band** — the trust row sits directly on the photograph, with no surface behind it. It cannot do that in its old shape: three labels on one line need about 631px of glyphs at 25px, while the hero's light field runs out around 460px across — left as it was the row measured 1.32:1. Neither reframing nor a soft wash fixes it (`object-position` swept 0–55% never rose above 1.31:1, because a 16:9 source in a 1.6 box is barely cropped horizontally; and extending the veil to 930px, past the text column itself, still only reached 2.11:1). What works is making the row narrow enough to stay on the light field: above 1025px it adopts the stacked value-over-label format the mobile hero already uses, which needs ~470px for the same three stats at the same 25px value size. Measured worst case 4.97:1 on the values and 5.60:1 on the labels, both at 1025px — clear of AA for normal text, with the paint running unbroken behind them. **Tablet (768–1024px) is the exception**: there the row is bottom-anchored over the strokes at every width, so it keeps its translucent cream panel — removing it drops the labels to 1.01:1.
- **Hero resolution** — heroes are selected by *width* descriptor with `sizes="100vw"`, not by DPR. The hero is full-bleed, so what matters is viewport width × DPR: a 390px phone at DPR 2 needs 780px and takes the 850px portrait file, the same phone at DPR 3 needs 1170px and takes the 1250px one, while a 1024px tablet at DPR 2 needs 2048px and takes the largest, 1632px. A `2x` descriptor would hand that first phone the largest file purely for its pixel density. Desktop ships two candidates (1500/2048); **portrait ships three** (850/1250/1632), because its source is photographic edge to edge where the art it replaced was half flat synthetic ground — like for like the 1250px file is roughly three times the weight, and this is the LCP image on the platform least able to afford it. Portrait encodes at q76 rather than q82 for the same reason: the dry-brush grain and canvas tooth run through the whole frame and mask webp artefacts completely (compared at 1:1 against q82, no difference is visible), and it takes ~22% off. Desktop is untouched at q82.
- **Hero crop below 1025px** — `object-position: 85% 50%`, set in a `HERO CROP BELOW 1025PX` block at the end of `main.css`. The strokes run at a slight diagonal and their dry-brush tails rise to the left, so a centred window leaves a pale wedge of bare canvas in the bottom corner where the burgundy has already lifted off; at 85% the burgundy fills the foot of the frame and the loaded rounded ends of the plum and burgundy come into view, while the dry fade still sits under the headline. Contrast is unaffected — the stats measure 4.89:1 against 4.96:1 centred. It lives at the end of the file because the declaration in the `max-width: 1024px` block that looks like its home was **orphaned after a closed rule** and never applied — the second instance of this defect found in the inherited stylesheet, and like the first it also drops the rest of that media query to top level. Neither was re-nested: doing so would change what applies at desktop.
- **Type** — Fredoka (rounded display) for headlines, wordmark, buttons and labels; Nunito Sans for running text; Caveat (brush script) reserved for the wordmark's "Painter" and the hero tagline, so it reads as a signature rather than decoration. All three are self-hosted variable fonts in `src/assets/fonts` — no Google Fonts request, no third-party dependency.
- **Wordmark** — "Algarve" in the display face, "Painter" in the script with a tapered brushstroke swiped underneath (the SVG lives in `wordmarkHtml` in `layout.js`).
- **Everything the token swap can't express** lives in one clearly-marked `PAINT-CRAFT RESTYLE` block at the very end of `main.css` — type roles, the painted section marks, the wordmark, the trust band and the button fills. It sits last because much of the inherited stylesheet carries `!important` at high specificity.

## Photography

There is **no photography of real work yet**. The heroes are supplied photographs of impasto brushwork and the section marks are generated to match them, rather than stock imagery of houses — deliberate, since it signals painting immediately and stays exactly on palette. Everything is wired through a small map so real photos can be dropped in without touching template logic:

- **Hero (all 33 pages)** — `hero-paint-desktop{,@2x}.{jpg,webp}` and `hero-paint-mobile{@sm,,@2x}.{jpg,webp}`: five thick strokes swiped across artist's canvas, one photograph per orientation. Hero text is dark ink on light, with a light veil over the text field (left-to-right on desktop, top-to-bottom below 1025px) — see the `LIGHT HERO` block at the end of `main.css`. Per-page overrides live in `SERVICE_HERO_PHOTO` (`src/templates/service.js`) and `TOWN_HERO_PHOTO` (`src/templates/town.js`).
- **Painted marks** — `swatch-clay.png`, `swatch-ochre.png`, `swatch-blush.png` under every section heading (alternating by section), and `swatch-divider.png` as a watermark on the dark CTA bands.
- **Town "Local to <town>" photo** — genuinely different per town: 22 `<slug>-villa-terrace.{jpg,webp}` images, mapped in `TOWN_DESCRIPTION_PHOTO`.
- **Service in-page photos** — two slots per page, mapped in `SERVICE_DESCRIPTION_PHOTO`, currently drawing on the same town imagery.

**The generator is in the repo**, at `tools/paint/`:

```
python3 tools/paint/generate.py reference  # the shipped colourway
python3 tools/paint/generate.py studio     # or: pop
```

`brush.py` is the stroke engine — each stroke is built from individual bristle lanes, each with its own paint load and drop-out point, which is what produces the dry-brush skips, splayed tails and irregular edges. `generate.py` holds the palettes and the fixed stroke geometry, so a palette swap changes colour only. It needs Pillow and NumPy; neither is a runtime dependency of the site. Nothing is downloaded — every pixel is procedural, so the generated assets carry no third-party licence. Every service is listed in `SERVICE_MINIMAL_IMAGES_SLUGS`, which drops the media column from the "Real-World Scenarios" and "In Detail" sections rather than filling them with placeholder boxes. The build renders **zero** visible `[Placeholder: …]` boxes.

## Content notes

- Copy avoids certification and licensing claims, "free quote" language, same-day promises, pricing figures, warranty lengths, response-time commitments and product brand names — the same compliance rules as the sister site.
- Town content is reasoned from each town's actual property stock and exposure (coastal salt, inland heat, Atlantic wind on the west coast, damp in the Monchique hills, traditional lime render in the older towns), not from claims about specific past jobs, client counts or named developments.
- Commercial painting — apartment-block common areas, hotel and rental turnarounds, restaurants, shops and offices — is referenced across the homepage, `/about`, service `propertyTypes` and FAQs rather than being given a page of its own.

## Editing content

- **Services** — `src/data/services.js`. Each entry drives one page: hero, intro, deep-dive sections, what's-included list, real-world scenarios, common problems, property types, in-detail cards and FAQs (with FAQ schema generated automatically).
- **Towns** — `src/data/towns.js`. Each entry drives one page, and `nearby` / `region` drive the cross-linking between them.
- **Sitewide** — `src/data/site.js`: brand, phone, nav labels, hero trust stats, the four trust cards, the process steps and the homepage FAQs.
