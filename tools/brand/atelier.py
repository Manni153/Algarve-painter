#!/usr/bin/env python3
"""Draw the abstract paint-sweep art behind the "Painting, Perfected." hero.

    python3 tools/brand/atelier.py

Writes src/assets/brand/hero-atelier.svg. Nothing is downloaded and nothing
is traced from a photograph — every path is generated here, so the artwork
carries no third-party licence, same as every other file under
tools/brand/.

This is deliberately NOT another illustrated Algarve scene (scene.py still
owns every other hero on the site). It is an abstract field of three
overlapping brushstrokes — the most literal possible image of "a painting
company" rendered as premium studio art rather than a cartoon roller. Two
strokes are soft-edged and layered for depth; the third is thin,
dry-brushed and left crisp, which is what stops the composition reading as
a uniform blur.

The canvas is close to square (not the usual 16:9 hero) on purpose. This
art is placed via CSS as a right-hand panel, not a full-bleed background —
sized and cropped with object-fit: cover at very different aspect ratios
between a short wide desktop panel and a tall narrow mobile one. A square
source with its content clustered center-right survives both crops; a
16:9 source (like scene.py's) does not, and re-deriving separate wide/tall
cuts for a purely decorative accent was not worth the complexity that cost
scene.py twice already.
"""
import math, random

TERRA_HI = '#e07a52'
TERRA    = '#c25a38'
TERRA_LO = '#7a3020'
OCHRE_HI = '#f0c96a'
OCHRE    = '#d9a02b'
OCHRE_LO = '#7a5710'
PLUM     = '#8a4351'
PLUM_LO  = '#4a2029'

S = 1300


def stroke_path(cx, cy, length, angle_deg, width, taper=0.16, waviness=0.05, seed=0, steps=26):
    """A tapered ribbon along one axis: a centreline with organic sine-sum
    jitter (same vocabulary as scene.py's ridge() — cheap layered sine noise
    rather than true Perlin, plenty at this scale) and a width profile that
    closes to a point at both ends rather than a hard cut."""
    rng = random.Random(seed)
    a = math.radians(angle_deg)
    ax, ay = math.cos(a), math.sin(a)
    nx, ny = -math.sin(a), math.cos(a)
    freqs = [(rng.uniform(0.8, 1.6), rng.uniform(0, math.tau)) for _ in range(2)]

    def jitter(t):
        return sum(math.sin(t * f * math.tau + p) for f, p in freqs) / len(freqs)

    top, bot = [], []
    for i in range(steps + 1):
        t = i / steps
        if t < taper:
            prof = t / taper
        elif t > 1 - taper:
            prof = (1 - t) / taper
        else:
            prof = 1.0
        prof = prof ** 0.72
        wob = jitter(t) * waviness * length
        px = cx + ax * (t - 0.5) * length + nx * wob
        py = cy + ay * (t - 0.5) * length + ny * wob
        hw = width * prof * (1 + 0.14 * jitter(t + 7))
        top.append((px + nx * hw, py + ny * hw))
        bot.append((px - nx * hw, py - ny * hw))

    d = 'M %.1f %.1f ' % top[0]
    d += ' '.join('L %.1f %.1f' % p for p in top[1:])
    d += ' ' + ' '.join('L %.1f %.1f' % p for p in reversed(bot))
    return d + ' Z'


def main():
    o = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" role="img" '
         'aria-hidden="true" focusable="false">' % (S, S)]
    o.append('<defs>')
    o.append('<radialGradient id="glow" cx="0.80" cy="0.14" r="0.66">'
             '<stop offset="0" stop-color="%s" stop-opacity="0.5"/>'
             '<stop offset="1" stop-color="%s" stop-opacity="0"/></radialGradient>' % (OCHRE_HI, OCHRE_HI))
    o.append('<linearGradient id="terra" x1="0" y1="0" x2="1" y2="1">'
             '<stop offset="0" stop-color="%s"/><stop offset="0.55" stop-color="%s"/>'
             '<stop offset="1" stop-color="%s"/></linearGradient>' % (TERRA_HI, TERRA, TERRA_LO))
    o.append('<linearGradient id="ochre" x1="0" y1="0" x2="1" y2="1">'
             '<stop offset="0" stop-color="%s"/><stop offset="0.6" stop-color="%s"/>'
             '<stop offset="1" stop-color="%s"/></linearGradient>' % (OCHRE_HI, OCHRE, OCHRE_LO))
    o.append('<linearGradient id="plum" x1="0" y1="0" x2="1" y2="0">'
             '<stop offset="0" stop-color="%s"/><stop offset="1" stop-color="%s"/></linearGradient>' % (PLUM, PLUM_LO))
    o.append('<filter id="soft1" x="-60%" y="-60%" width="220%" height="220%">'
             '<feGaussianBlur stdDeviation="20"/></filter>')
    o.append('<filter id="soft2" x="-60%" y="-60%" width="220%" height="220%">'
             '<feGaussianBlur stdDeviation="11"/></filter>')
    o.append('</defs>')

    # light source, upper right — matches the CSS ground gradient's own
    # highlight position so the vector art and the flat colour behind it
    # read as one continuous surface, not a sticker laid on a background.
    o.append('<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="url(#glow)"/>'
             % (S * 0.80, S * 0.14, S * 0.62, S * 0.50))

    # ochre sweep: furthest back, softest — sets the depth the terracotta
    # stroke then sits in front of. Clustered right-of-centre and kept well
    # short of the left edge so a text column there stays clear at any
    # object-fit: cover crop this ends up scaled into.
    o.append('<path d="%s" fill="url(#ochre)" opacity="0.55" filter="url(#soft1)"/>'
              % stroke_path(S * 0.66, S * 0.50, S * 1.05, -30, S * 0.075, taper=0.09, waviness=0.014, seed=11))

    # terracotta sweep: the dominant stroke.
    o.append('<path d="%s" fill="url(#terra)" opacity="0.96" filter="url(#soft2)"/>'
              % stroke_path(S * 0.72, S * 0.56, S * 1.05, -27, S * 0.062, taper=0.08, waviness=0.012, seed=3))

    # a second, narrower terracotta pass, offset — a loaded brush drags a
    # thinner trail behind the main sweep; without it the sweep reads as
    # one flat gradient blob rather than a worked stroke.
    o.append('<path d="%s" fill="url(#terra)" opacity="0.48" filter="url(#soft2)"/>'
              % stroke_path(S * 0.78, S * 0.70, S * 0.92, -25, S * 0.032, taper=0.14, waviness=0.016, seed=17))

    # the one crisp stroke: thin, dry-brushed, left unblurred — what stops
    # the field reading as a uniform blur.
    o.append('<path d="%s" fill="url(#plum)" opacity="0.80"/>'
              % stroke_path(S * 0.62, S * 0.32, S * 0.62, -42, S * 0.010, taper=0.16, waviness=0.045, seed=41))

    o.append('</svg>')
    return '\n'.join(o)


if __name__ == '__main__':
    open('src/assets/brand/hero-atelier.svg', 'w').write(main())
    print('atelier art')
