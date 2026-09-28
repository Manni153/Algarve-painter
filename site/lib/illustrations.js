'use strict';

// Drawn before/after elevations used in the project gallery until real
// photographs are added (see site/data/projects.js). Each drawing is one
// scene in two states: `before` (weathered, faded, cracked) and `after`
// (freshly painted). Both states share the same geometry so the comparison
// slider lines up exactly, as a matched pair of photographs would.

const W = 800;
const H = 560;

const PALETTE = {
  before: {
    sky: '#e7e3da',
    wall: '#d6ccbb',
    wallShade: '#c7bca9',
    trim: '#cfc6b5',
    shutter: '#9b958a',
    door: '#8c8272',
    ground: '#cdbfa6',
    line: '#7d7465',
  },
  after: {
    sky: '#dfe9ee',
    wall: '#fbfaf6',
    wallShade: '#ece8df',
    trim: '#ffffff',
    shutter: '#2f5a66',
    door: '#2f5a66',
    ground: '#e5d8bf',
    line: '#39464a',
  },
};

// Weathering drawn only in the "before" state.
function wear(spots) {
  return spots
    .map(([kind, ...a]) => {
      if (kind === 'crack') return `<polyline points="${a[0]}" fill="none" stroke="#6f6656" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
      if (kind === 'peel') return `<path d="${a[0]}" fill="#e6dfd1" stroke="#a89d89" stroke-width="1"/>`;
      if (kind === 'streak') return `<rect x="${a[0]}" y="${a[1]}" width="${a[2]}" height="${a[3]}" fill="#a79b86" opacity=".28" rx="3"/>`;
      if (kind === 'mould') return `<circle cx="${a[0]}" cy="${a[1]}" r="${a[2]}" fill="#6d6a5c" opacity=".22"/>`;
      return '';
    })
    .join('');
}

function shutterPair(x, y, w, h, c) {
  const slats = (sx) =>
    Array.from({ length: Math.floor(h / 9) }, (_, i) => `<line x1="${sx + 4}" x2="${sx + w / 2 - 4}" y1="${y + 6 + i * 9}" y2="${y + 6 + i * 9}" stroke="${c.line}" stroke-opacity=".35" stroke-width="1"/>`).join('');
  return `<rect x="${x - w / 2 - 2}" y="${y}" width="${w / 2}" height="${h}" fill="${c.shutter}" stroke="${c.line}" stroke-width="1.2"/>${slats(x - w / 2 - 2)}
<rect x="${x + w + 2}" y="${y}" width="${w / 2}" height="${h}" fill="${c.shutter}" stroke="${c.line}" stroke-width="1.2"/>${slats(x + w + 2)}
<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#5d6d72" stroke="${c.trim}" stroke-width="6"/>
<line x1="${x + w / 2}" x2="${x + w / 2}" y1="${y}" y2="${y + h}" stroke="${c.trim}" stroke-width="3"/>`;
}

const scenes = {
  villa(c, before) {
    return `<rect width="${W}" height="${H}" fill="${c.sky}"/>
<path d="M650 470 C640 360 660 250 672 180 C684 250 704 360 694 470Z" fill="#6f7f5e" opacity=".85"/>
<rect x="0" y="470" width="${W}" height="90" fill="${c.ground}"/>
<rect x="110" y="170" width="480" height="300" fill="${c.wall}" stroke="${c.line}" stroke-width="1.5"/>
<rect x="100" y="152" width="500" height="24" fill="${c.trim}" stroke="${c.line}" stroke-width="1.5"/>
<rect x="470" y="92" width="44" height="64" fill="${c.wall}" stroke="${c.line}" stroke-width="1.5"/>
<path d="M462 92h60l-8-18h-44z" fill="${c.trim}" stroke="${c.line}" stroke-width="1.5"/>
<rect x="484" y="104" width="6" height="14" fill="${c.line}" opacity=".6"/><rect x="496" y="104" width="6" height="14" fill="${c.line}" opacity=".6"/>
<rect x="110" y="320" width="480" height="8" fill="${c.wallShade}"/>
${shutterPair(170, 210, 60, 80, c)}${shutterPair(430, 210, 60, 80, c)}
${shutterPair(170, 360, 60, 80, c)}
<path d="M390 470v-86a40 40 0 0 1 80 0v86z" fill="${c.door}" stroke="${c.trim}" stroke-width="6"/>
<rect x="0" y="430" width="100" height="40" fill="${c.wall}" stroke="${c.line}" stroke-width="1.2"/><rect x="600" y="430" width="200" height="40" fill="${c.wall}" stroke="${c.line}" stroke-width="1.2"/>
<rect x="0" y="424" width="100" height="8" fill="${c.trim}"/><rect x="600" y="424" width="200" height="8" fill="${c.trim}"/>
${before ? wear([
  ['streak', 140, 176, 10, 120], ['streak', 330, 176, 8, 90], ['streak', 560, 176, 12, 140],
  ['crack', '300,240 312,262 306,280 318,300'], ['crack', '560,380 548,402 556,420'], ['crack', '110,440 128,452 140,470'],
  ['peel', 'M250 380 q18-10 30 4 q10 14-6 20 q-20 4-24-24z'], ['peel', 'M520 250 q14-8 22 6 q4 12-10 14z'], ['peel', 'M640 440 q20-6 26 8 q-6 12-22 6z'],
  ['mould', 130, 462, 16], ['mould', 580, 462, 14],
]) : ''}`;
  },

  interior(c, before) {
    const wall = before ? '#d9d1c2' : '#f6f3ec';
    return `<rect width="${W}" height="${H}" fill="${before ? '#e1dbcf' : '#fbfaf6'}"/>
<rect x="0" y="0" width="${W}" height="60" fill="${before ? '#d3cabb' : '#ffffff'}"/>
<line x1="0" x2="${W}" y1="60" y2="60" stroke="${c.line}" stroke-opacity=".4"/>
<rect x="0" y="60" width="${W}" height="400" fill="${wall}"/>
<rect x="470" y="120" width="190" height="240" fill="#cfe0e6" stroke="${c.trim}" stroke-width="10"/>
<line x1="565" x2="565" y1="120" y2="360" stroke="${c.trim}" stroke-width="6"/>
<rect x="0" y="460" width="${W}" height="100" fill="#d8c6a6"/>
<rect x="0" y="446" width="${W}" height="14" fill="${c.trim}" stroke="${c.line}" stroke-opacity=".3"/>
<path d="M90 446v-70a16 16 0 0 1 16-16h250a16 16 0 0 1 16 16v70z" fill="#b9ab94"/><rect x="80" y="400" width="300" height="46" rx="8" fill="#a8997f"/>
<rect x="150" y="150" width="140" height="100" fill="none" stroke="${c.line}" stroke-opacity=".5" stroke-width="3"/>
${before ? wear([
  ['mould', 20, 76, 26], ['mould', 50, 70, 14], ['mould', 780, 80, 22],
  ['streak', 700, 60, 60, 120], ['crack', '400,60 410,96 402,130 414,170'],
  ['peel', 'M680 300 q20-12 34 4 q6 16-14 18z'], ['streak', 120, 270, 220, 14],
]) : ''}`;
  },

  apartment(c, before) {
    const floors = [100, 210, 320];
    return `<rect width="${W}" height="${H}" fill="${c.sky}"/>
<rect x="0" y="480" width="${W}" height="80" fill="${c.ground}"/>
<rect x="140" y="60" width="520" height="420" fill="${c.wall}" stroke="${c.line}" stroke-width="1.5"/>
<rect x="130" y="46" width="540" height="18" fill="${c.trim}" stroke="${c.line}" stroke-width="1.2"/>
${floors.map((y) => `<rect x="180" y="${y}" width="120" height="80" fill="#5d6d72" stroke="${c.trim}" stroke-width="5"/>
<rect x="400" y="${y - 10}" width="220" height="90" fill="#6a7a7f" stroke="${c.trim}" stroke-width="5"/>
<rect x="386" y="${y + 70}" width="248" height="14" fill="${c.trim}" stroke="${c.line}" stroke-width="1"/>
${Array.from({ length: 16 }, (_, i) => `<line x1="${392 + i * 15}" x2="${392 + i * 15}" y1="${y + 40}" y2="${y + 70}" stroke="${before ? '#7a5a44' : c.line}" stroke-width="2"/>`).join('')}
<line x1="388" x2="632" y1="${y + 40}" y2="${y + 40}" stroke="${before ? '#7a5a44' : c.line}" stroke-width="3"/>`).join('')}
<rect x="240" y="410" width="80" height="70" fill="${c.door}" stroke="${c.trim}" stroke-width="5"/>
${before ? wear([
  ['streak', 420, 184, 6, 30], ['streak', 520, 184, 6, 34], ['streak', 460, 294, 6, 30], ['streak', 600, 404, 8, 40],
  ['crack', '160,120 170,150 164,178'], ['crack', '640,300 628,330 636,352'],
  ['peel', 'M340 250 q14-10 26 2 q2 14-14 14z'], ['peel', 'M170 440 q18-6 22 10 q-10 8-22-10z'],
  ['mould', 160, 470, 18],
]) : ''}`;
  },

  shutters(c, before) {
    return `<rect width="${W}" height="${H}" fill="${c.wall}"/>
<rect x="0" y="500" width="${W}" height="60" fill="${c.ground}"/>
<rect x="0" y="0" width="${W}" height="28" fill="${c.trim}" stroke="${c.line}" stroke-width="1"/>
${shutterPair(150, 90, 120, 170, c)}${shutterPair(520, 90, 120, 170, c)}
<rect x="330" y="300" width="140" height="200" fill="${c.door}" stroke="${c.trim}" stroke-width="10"/>
<line x1="400" x2="400" y1="300" y2="500" stroke="${c.line}" stroke-opacity=".4" stroke-width="2"/>
<circle cx="386" cy="410" r="4" fill="#c9b27a"/><circle cx="414" cy="410" r="4" fill="#c9b27a"/>
<rect x="0" y="480" width="${W}" height="20" fill="${c.wallShade}"/>
${before ? wear([
  ['peel', 'M96 120 q10-4 16 8 q-2 20-14 14z'], ['peel', 'M214 180 q12 0 12 14 q-10 8-16-4z'], ['peel', 'M650 140 q14-4 16 12 q-12 10-18-2z'],
  ['peel', 'M350 330 q16-6 22 8 q-4 14-20 8z'], ['streak', 90, 262, 60, 10], ['streak', 460, 262, 60, 10],
  ['crack', '300,60 290,90 302,120 294,150'], ['crack', '720,300 706,340 716,370'], ['mould', 20, 496, 24], ['mould', 780, 490, 20],
]) : ''}`;
  },
};

function illustration(kind, state) {
  const draw = scenes[kind] || scenes.villa;
  const before = state === 'before';
  return `<svg class="illus" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a ${kind === 'interior' ? 'room' : kind === 'apartment' ? 'apartment building' : 'villa façade'} ${before ? 'before painting, weathered and cracked' : 'after painting, freshly finished'}">${draw(PALETTE[state], before)}</svg>`;
}

module.exports = { illustration, ILLUS_RATIO: `${W} / ${H}` };
