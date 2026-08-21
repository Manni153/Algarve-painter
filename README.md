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

- **Page palette** — terracotta `#c25a38` (the accent; `#b85132` wherever it sits behind text, so button labels clear WCAG AA), ochre `#d9a02b`, dusty pink `#d9a08c`, deep brown `#3a241a` for text and dark surfaces, cream `#fbf4e8` as the ground.
- **Hero palette** — "Basic Canvas": one warm family on a warm off-white canvas `#f8f3ea` — mustard gold `#d2952a`, dusty rose `#c4707a`, terracotta `#c0562f`, warm plum `#8e4a63`, burgundy `#7e2f3e`. Rich, saturated pigment that reads *matte* because of how it is shaded, not because the colour has been drained: no specular rim, an opaque body, and texture carried in the colour rather than in the opacity. (Thinning alpha over a light canvas is what turns a pigment pastel — the cream reads straight through it.) Two alternates (`studio`, `pop`) ship in the generator; switching is one command and colour-only.
- **Hero stats band** — the trust row sits on a paint stroke of its own, in a warm tan from the same palette. It uses the generator's `solid` mode, which differs from a normal stroke *only* in profile (flat, rounded at both ends), dry-brush dropout (off) and alpha depth (opaque) — every colour-side texture term runs at full strength, so it carries the same striation, ragged edge and tonal variation as the rest. Generated at two aspect ratios (the row is ~8:1 on desktop, ~3:1 on mobile) and close to its rendered size: made much larger, the brush grain shrinks on the way down and the band reads as a smooth pill.
- **Hero resolution** — each hero ships in two sizes selected by *width* descriptor with `sizes="100vw"`, not by DPR. The hero is full-bleed, so what matters is viewport width × DPR: a 390px phone at DPR 3 needs 1170px and takes the small portrait file (128KB), while a 1024px tablet at DPR 2 needs 2048px and takes the large one. A `2x` descriptor would hand that phone the largest file purely for its pixel density. Encoding is q92 with 4:4:4 chroma and a fine pre-encode dither — large near-flat pigment fields are exactly what 8-bit quantisation bands, and the earlier q82 pass squeezed a 1900×1069 hero into 24KB. Set as token *values* at the top of `src/assets/css/main.css`; the token *names* are unchanged so the component CSS between them keeps resolving.
- **Type** — Fredoka (rounded display) for headlines, wordmark, buttons and labels; Nunito Sans for running text; Caveat (brush script) reserved for the wordmark's "Painter" and the hero tagline, so it reads as a signature rather than decoration. All three are self-hosted variable fonts in `src/assets/fonts` — no Google Fonts request, no third-party dependency.
- **Wordmark** — "Algarve" in the display face, "Painter" in the script with a tapered brushstroke swiped underneath (the SVG lives in `wordmarkHtml` in `layout.js`).
- **Everything the token swap can't express** lives in one clearly-marked `PAINT-CRAFT RESTYLE` block at the very end of `main.css` — type roles, the painted section marks, the wordmark, the trust band and the button fills. It sits last because much of the inherited stylesheet carries `!important` at high specificity.

## Photography

There is **no photography of real work yet**. The hero and the section marks are generated impasto brushwork rather than stock imagery, which is deliberate — it signals painting immediately and stays exactly on palette. Everything is wired through a small map so real photos can be dropped in without touching template logic:

- **Hero (all 33 pages)** — `hero-paint-{desktop,mobile}.{jpg,webp}`: five thick strokes swiped across a warm off-white canvas, composed so they clear the text column at every breakpoint. Hero text is dark ink on light, with a light veil over the text field (left-to-right on desktop, top-to-bottom below 1025px) — see the `LIGHT HERO` block at the end of `main.css`. Per-page overrides live in `SERVICE_HERO_PHOTO` (`src/templates/service.js`) and `TOWN_HERO_PHOTO` (`src/templates/town.js`).
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
