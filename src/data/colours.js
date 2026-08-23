// Algarve exterior colour schemes for the visualiser.
//
// These are the colours the region actually paints with, not a generic
// swatch grid: lime white and sand on the walls, and the Atlantic blue and
// ochre-yellow that traditionally band the plinth and frame the openings.
// Portuguese names first, because the customer sees them on tins here and
// recognising one is a small proof that we work in the Algarve rather than
// somewhere with a Portuguese phone number.
//
// A scheme is what most visitors will use — one tap, whole house. The
// per-surface palettes underneath are for the ones who want to fiddle, and
// fiddling is the point: a visitor who has spent two minutes choosing their
// own shutters has already imagined us doing the work.

const walls = [
  { id: 'branco-cal',   name: 'Branco Cal',      en: 'Lime white',   hex: '#f6f1e7' },
  { id: 'areia',        name: 'Areia',           en: 'Sand',         hex: '#eadfc9' },
  { id: 'creme-velho',  name: 'Creme Velho',     en: 'Old cream',    hex: '#e6d4b4' },
  { id: 'rosa-velho',   name: 'Rosa Velho',      en: 'Old rose',     hex: '#e2c0b4' },
  { id: 'terra-clara',  name: 'Terra Clara',     en: 'Pale earth',   hex: '#dcb99a' },
  { id: 'cinza-pedra',  name: 'Cinza Pedra',     en: 'Stone grey',   hex: '#d5d0c6' },
];

const trims = [
  { id: 'azul-atlantico', name: 'Azul Atlântico', en: 'Atlantic blue', hex: '#4c7593' },
  { id: 'amarelo-algarve', name: 'Amarelo Algarve', en: 'Algarve ochre', hex: '#d9a02b' },
  { id: 'branco',        name: 'Branco',          en: 'White',         hex: '#fffdf7' },
  { id: 'verde-oliveira', name: 'Verde Oliveira', en: 'Olive green',   hex: '#6b7d55' },
  { id: 'terracota',     name: 'Terracota',       en: 'Terracotta',    hex: '#c25a38' },
  { id: 'castanho',      name: 'Castanho',        en: 'Deep brown',    hex: '#5b3524' },
];

const roofs = [
  { id: 'telha-nova',   name: 'Telha Nova',      en: 'New pantile',   hex: '#c0693f' },
  { id: 'telha-velha',  name: 'Telha Velha',     en: 'Aged pantile',  hex: '#a35c3c' },
  { id: 'telha-clara',  name: 'Telha Clara',     en: 'Pale pantile',  hex: '#d08a5f' },
];

// Four looks that actually exist here, each named for where you see it.
const schemes = [
  { id: 'classico',  name: 'Clássico',        note: 'Lime white and Atlantic blue — the coastal villages',
    wall: 'branco-cal',  trim: 'azul-atlantico',  shutter: 'azul-atlantico', door: 'azul-atlantico', roof: 'telha-nova' },
  { id: 'serra',     name: 'Serra',           note: 'Sand walls with ochre trim — the hill villages inland',
    wall: 'areia',       trim: 'amarelo-algarve', shutter: 'castanho',       door: 'castanho',       roof: 'telha-velha' },
  { id: 'moderno',   name: 'Moderno',         note: 'Stone grey and deep brown — newer builds and renovations',
    wall: 'cinza-pedra', trim: 'branco',          shutter: 'castanho',       door: 'castanho',       roof: 'telha-clara' },
  { id: 'quinta',    name: 'Quinta',          note: 'Old rose and olive — farmhouses and converted quintas',
    wall: 'rosa-velho',  trim: 'branco',          shutter: 'verde-oliveira', door: 'verde-oliveira', roof: 'telha-velha' },
];

// Surfaces in the order the visualiser offers them, which is the order a
// quote is built up in: the big area first, the details after.
const surfaces = [
  { key: 'wall',    label: 'Walls',    palette: 'walls' },
  { key: 'trim',    label: 'Trim',     palette: 'trims', hint: 'Plinth, window and door surrounds' },
  { key: 'shutter', label: 'Shutters', palette: 'trims' },
  { key: 'door',    label: 'Door',     palette: 'trims' },
  { key: 'roof',    label: 'Roof',     palette: 'roofs' },
];

module.exports = { walls, trims, roofs, schemes, surfaces, palettes: { walls, trims, roofs } };
