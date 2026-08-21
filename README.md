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

## Photography

There is **no painting-specific photography yet**. What ships is generic Algarve property imagery, and every image slot is wired through a small map so real photos can be dropped in without touching any template logic:

- **Hero (all 33 pages)** — one shared villa-facade pair, `hero-painting-{desktop,mobile}.{jpg,webp}`. Per-page overrides live in `SERVICE_HERO_PHOTO` (`src/templates/service.js`) and `TOWN_HERO_PHOTO` (`src/templates/town.js`).
- **Town "Local to <town>" photo** — genuinely different per town: 22 `<slug>-villa-terrace.{jpg,webp}` images, mapped in `TOWN_DESCRIPTION_PHOTO`.
- **Service in-page photos** — two slots per page ("What's Included", "Why It Matters"), mapped in `SERVICE_DESCRIPTION_PHOTO`, currently drawing on the same town imagery.

Every service is listed in `SERVICE_MINIMAL_IMAGES_SLUGS`, which drops the media column from the "Real-World Scenarios" and "In Detail" sections rather than filling them with placeholder boxes. Remove a slug from that set once real photos exist for it and those media columns come back.

The build currently renders **zero** visible `[Placeholder: …]` boxes — every slot that renders has a real image behind it.

## Content notes

- Copy avoids certification and licensing claims, "free quote" language, same-day promises, pricing figures, warranty lengths, response-time commitments and product brand names — the same compliance rules as the sister site.
- Town content is reasoned from each town's actual property stock and exposure (coastal salt, inland heat, Atlantic wind on the west coast, damp in the Monchique hills, traditional lime render in the older towns), not from claims about specific past jobs, client counts or named developments.
- Commercial painting — apartment-block common areas, hotel and rental turnarounds, restaurants, shops and offices — is referenced across the homepage, `/about`, service `propertyTypes` and FAQs rather than being given a page of its own.

## Editing content

- **Services** — `src/data/services.js`. Each entry drives one page: hero, intro, deep-dive sections, what's-included list, real-world scenarios, common problems, property types, in-detail cards and FAQs (with FAQ schema generated automatically).
- **Towns** — `src/data/towns.js`. Each entry drives one page, and `nearby` / `region` drive the cross-linking between them.
- **Sitewide** — `src/data/site.js`: brand, phone, nav labels, hero trust stats, the four trust cards, the process steps and the homepage FAQs.
