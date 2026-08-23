// The two interactive sections that make this a working tool rather than a
// brochure: a colour visualiser and an instant estimate.
//
// Both are built to work with JavaScript disabled as far as they usefully
// can. The visualiser renders with its default scheme already applied, so a
// visitor with no JS still sees a painted Algarve villa rather than an empty
// widget; the estimator renders as a plain list of options and a phone
// number. Nothing about the page's actual conversion path — call, WhatsApp —
// depends on either of them running.
const fs = require('fs');
const path = require('path');
const { esc } = require('./layout');
const site = require('../data/site');
const colours = require('../data/colours');
const pricing = require('../data/pricing');

const villaSvg = fs.readFileSync(path.join(__dirname, '../assets/brand/villa.svg'), 'utf8');

function swatchList(surface) {
  const list = colours.palettes[surface.palette];
  return list.map((c, i) => `
    <button type="button" class="swatch" role="radio" aria-checked="${i === 0 ? 'true' : 'false'}"
            data-surface="${surface.key}" data-colour="${c.id}" data-hex="${c.hex}"
            style="--sw: ${c.hex};" title="${esc(c.name)} — ${esc(c.en)}">
      <span class="swatch-chip"></span>
      <span class="swatch-name">${esc(c.name)}</span>
    </button>`).join('');
}

function visualiser() {
  const def = colours.schemes[0];
  const hex = (pal, id) => (colours.palettes[pal].find((c) => c.id === id) || {}).hex;
  const defaults = {
    wall: hex('walls', def.wall), trim: hex('trims', def.trim),
    shutter: hex('trims', def.shutter), door: hex('trims', def.door), roof: hex('roofs', def.roof),
  };
  return `
  <section id="colours" class="tool-band">
    <div class="container">
      <div class="section-head section-head--wide">
        <span class="eyebrow">Before You Commit</span>
        <h2 class="display-xl">See it painted<br><span class="ghost">before we start</span></h2>
        <p class="lede">Choosing a colour off a 40&nbsp;mm swatch in a shop is how people end up repainting twice. Try the whole house instead — walls, trim, shutters, door and roof — in the colours the Algarve actually uses.</p>
      </div>

      <div class="viz" data-viz
           style="--v-wall: ${defaults.wall}; --v-trim: ${defaults.trim}; --v-shutter: ${defaults.shutter}; --v-door: ${defaults.door}; --v-roof: ${defaults.roof};">
        <div class="viz-stage">
          ${villaSvg}
          <p class="viz-caption" data-viz-caption><strong>${esc(def.name)}</strong> — ${esc(def.note)}</p>
        </div>

        <div class="viz-panel">
          <div class="viz-schemes" role="group" aria-label="Colour schemes">
            <span class="viz-label">Start from a look</span>
            <div class="scheme-row">
              ${colours.schemes.map((s, i) => `
                <button type="button" class="scheme" data-scheme='${esc(JSON.stringify({
                  wall: hex('walls', s.wall), trim: hex('trims', s.trim), shutter: hex('trims', s.shutter),
                  door: hex('trims', s.door), roof: hex('roofs', s.roof), name: s.name, note: s.note,
                  ids: { wall: s.wall, trim: s.trim, shutter: s.shutter, door: s.door, roof: s.roof },
                }))}' aria-pressed="${i === 0 ? 'true' : 'false'}">
                  <span class="scheme-chips">
                    <i style="background:${hex('walls', s.wall)}"></i><i style="background:${hex('trims', s.trim)}"></i><i style="background:${hex('roofs', s.roof)}"></i>
                  </span>
                  ${esc(s.name)}
                </button>`).join('')}
            </div>
          </div>

          ${colours.surfaces.map((s) => `
            <div class="viz-surface" role="radiogroup" aria-label="${esc(s.label)} colour">
              <span class="viz-label">${esc(s.label)}${s.hint ? ` <em>${esc(s.hint)}</em>` : ''}</span>
              <div class="swatch-row">${swatchList(s)}</div>
            </div>`).join('')}

          <div class="viz-actions">
            <a class="btn btn-icon" data-viz-cta href="${site.whatsappHref}" target="_blank" rel="noopener">
              Send this scheme to us
            </a>
            <p class="viz-note">Opens WhatsApp with your colours written out. No obligation, and no form to fill in.</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function estimator() {
  const opt = (group, items, checked) => items.map((it, i) => `
    <label class="opt">
      <input type="radio" name="${group}" value="${it.id}"${i === checked ? ' checked' : ''}
             data-lo="${it.lo || ''}" data-hi="${it.hi || ''}" data-m2="${it.m2 || ''}" data-factor="${it.factor || ''}">
      <span class="opt-body"><span class="opt-label">${esc(it.label)}</span>${it.note ? `<span class="opt-note">${esc(it.note)}</span>` : ''}</span>
    </label>`).join('');

  const jobs = Object.keys(pricing.rates).map((k) => ({ id: k, label: pricing.rates[k].label, lo: pricing.rates[k].lo, hi: pricing.rates[k].hi }));

  return `
  <section id="estimate" class="tool-band tool-band--dark">
    <div class="container">
      <div class="section-head section-head--wide">
        <span class="eyebrow">No Waiting In</span>
        <h2 class="display-xl">A number now,<br><span class="ghost ghost--light">not next week</span></h2>
        <p class="lede">Four questions, an honest range, and the working shown. It is an estimate rather than a quote — the real figure comes off the surfaces once we have seen them — but it tells you the order of magnitude before you pick up the phone.</p>
      </div>

      <form class="est" data-est autocomplete="off">
        <div class="est-grid">
          <fieldset class="est-q"><legend>What kind of property?</legend>${opt('prop', pricing.properties, 0)}</fieldset>
          <fieldset class="est-q"><legend>What needs painting?</legend>${opt('job', jobs, 0)}</fieldset>
          <fieldset class="est-q"><legend>How big is it?</legend>${opt('size', pricing.sizes, 1)}</fieldset>
          <fieldset class="est-q"><legend>What condition is it in?</legend>${opt('cond', pricing.conditions, 1)}</fieldset>
        </div>

        <div class="est-out" aria-live="polite">
          <span class="est-out-label">Indicative range</span>
          <p class="est-figure"><span data-est-lo>—</span> <span class="est-dash">–</span> <span data-est-hi>—</span></p>
          <p class="est-working" data-est-working></p>
          <div class="est-cta">
            <a class="btn btn-icon" href="${site.telHref}">Call ${esc(site.phoneDisplay)}</a>
            <a class="btn btn-outline" data-est-wa href="${site.whatsappHref}" target="_blank" rel="noopener">Send this on WhatsApp</a>
          </div>
          <p class="est-smallprint">An estimate, not a quote. It assumes reasonable access and standard trade coatings, and it excludes scaffolding and major render repair — both of which we would rather find on a survey than surprise you with later.</p>
        </div>
      </form>
    </div>
  </section>`;
}

module.exports = { visualiser, estimator };
