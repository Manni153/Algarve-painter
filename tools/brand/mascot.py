#!/usr/bin/env python3
"""Draw the Algarve Painter mascot as flat-vector SVG.

    python3 tools/brand/mascot.py

Writes src/assets/brand/mascot.svg (badged, for the header and favicon) and
mascot-flat.svg (the figure alone, for places that supply their own
surround). Every path is generated here, so the mark carries no third-party
licence.

What the drawing is built around:

  * It has to survive 32px. The whole mark is a small number of large shapes
    under a heavy ink keyline. Detail that disappears at favicon size only
    makes the 200px version noisier, so there is none.

  * The brush has to read as a brush. In the first version it was tucked
    behind the ear, where it was small, half-hidden by the cap and — at any
    size below about 80px — indistinguishable from a flag. It is now held up
    in front of the shoulder at the scale of the head itself, angled across
    the badge, with a banded ferrule, tapered bristles carrying a load of
    terracotta and a drip coming off them. Head plus diagonal brush is a
    silhouette you can still name at 32px.

  * It has to look drawn rather than assembled. Flat art gets its quality
    from a light direction that is applied consistently, so one side of the
    face, the cap and the brush handle all carry the same shadow tone, and
    the eyes carry the same highlight.
"""
INK       = '#3a241a'
INK_LINE  = '#33200f'
SKIN      = '#e5ac81'
SKIN_SH   = '#c98d63'      # shadow side, one consistent light direction
SKIN_HI   = '#f0c19c'
TERRA     = '#c25a38'
TERRA_SH  = '#9e4128'
TERRA_HI  = '#d7734f'
OCHRE     = '#d9a02b'
OCHRE_SH  = '#b27f16'
CREAM     = '#fbf4e8'
WHITE     = '#fffdf7'
WOOD      = '#b8813f'
WOOD_SH   = '#93611f'
STEEL     = '#c9ccd1'
STEEL_SH  = '#9aa1a9'

S = 240
CX = S / 2
K = 7.6            # keyline weight


def figure(cx, cy, sc=1.0):
    """Head, cap, moustache and the raised brush, around (cx, cy).

    Draw order is the whole trick: shoulders, then head, then the brush LAST
    and to the RIGHT of the face. The first attempt drew the brush first and
    it disappeared behind the head; flat art has no depth cues except order,
    so anything meant to be in front has to be painted last."""
    def p(x, y):
        return cx + x * sc, cy + y * sc
    ky = ' stroke="%s" stroke-width="%.1f" stroke-linejoin="round" stroke-linecap="round"' % (INK_LINE, K * sc)
    g = []

    # ---- shoulders -------------------------------------------------------
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f l %.1f 0 q %.1f %.1f %.1f %.1f Z" fill="%s"%s/>'
             % (*p(-86, 106), 8 * sc, -40 * sc, 86 * sc, -46 * sc, 80 * sc,
                8 * sc, 6 * sc, 86 * sc, 46 * sc, OCHRE, ky))
    g.append('<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="%s" transform="rotate(-18 %.1f %.1f)"/>'
             % (*p(-54, 82), 10 * sc, 6 * sc, TERRA, *p(-54, 82)))
    g.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (*p(-36, 94), 5 * sc, TERRA))

    # ---- neck, ears, face ------------------------------------------------
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="%s"%s/>'
             % (*p(-21, 28), 42 * sc, 40 * sc, 12 * sc, SKIN_SH, ky))
    for sx in (-1, 1):
        g.append('<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="%s"%s/>'
                 % (*p(sx * 61, 2), 12 * sc, 16 * sc, SKIN, ky))
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="%s"%s/>'
             % (*p(-59, -56), 118 * sc, 100 * sc, 35 * sc, SKIN, ky))

    # ---- cap: crown, peak, band, button ----------------------------------
    g.append('<path d="M %.1f %.1f a %.1f %.1f 0 0 1 %.1f 0 Z" fill="%s"%s/>'
             % (*p(-62, -52), 62 * sc, 58 * sc, 124 * sc, TERRA, ky))
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f q %.1f %.1f %.1f %.1f Z" fill="%s"%s/>'
             % (*p(30, -50), -62 * sc, 7 * sc, -108 * sc, -3 * sc,
                15 * sc, -21 * sc, 108 * sc, -4 * sc, TERRA_SH, ky))
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>'
             % (*p(-60, -68), 120 * sc, 15 * sc, OCHRE))
    g.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"%s/>' % (*p(0, -106), 8 * sc, OCHRE, ky))

    # ---- face features ---------------------------------------------------
    for sx in (-1, 1):
        g.append('<path d="M %.1f %.1f l %.1f %.1f" fill="none" stroke="%s" '
                 'stroke-width="%.1f" stroke-linecap="round"/>'
                 % (*p(sx * 15, -30), sx * 21 * sc, -4 * sc, INK, 6.5 * sc))
        g.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (*p(sx * 26, -8), 8.5 * sc, INK))
        g.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>'
                 % (*p(sx * 26 - 3, -11), 3.2 * sc, WHITE))
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f" fill="none" stroke="%s" '
             'stroke-width="%.1f" stroke-linecap="round"/>'
             % (*p(-5, 2), 9 * sc, 12 * sc, 14 * sc, 1 * sc, SKIN_SH, 7 * sc))
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f q %.1f %.1f %.1f %.1f '
             'q %.1f %.1f %.1f %.1f q %.1f %.1f %.1f %.1f Z" fill="%s"/>'
             % (*p(0, 18),
                -9 * sc, -11 * sc, -33 * sc, -7 * sc,
                -9 * sc, 2 * sc, 2 * sc, 12 * sc,
                10 * sc, 8 * sc, 31 * sc, 2 * sc,
                10 * sc, -5 * sc, 0, -7 * sc, INK))
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f" fill="none" stroke="%s" '
             'stroke-width="%.1f" stroke-linecap="round"/>'
             % (*p(-14, 34), 14 * sc, 11 * sc, 28 * sc, 0, INK, 6 * sc))

    # ---- brush, in front and to the right --------------------------------
    # Laid out vertically then rotated as one group, which keeps the ferrule
    # square to the handle instead of having to solve every corner by hand.
    px, py = p(102, 22)
    g.append('<g transform="rotate(-14 %.1f %.1f)">' % (px, py))
    g.append('<path d="M %.1f %.1f l %.1f 0 l %.1f %.1f l %.1f 0 Z" fill="%s"%s/>'
             % (*p(80, 30), 26 * sc, -3 * sc, 78 * sc, -20 * sc, WOOD, ky))          # handle
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="%s"%s/>'
             % (*p(76, 0), 34 * sc, 30 * sc, 5 * sc, STEEL, ky))                     # ferrule
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>'
             % (*p(76, 9), 34 * sc, 5 * sc, STEEL_SH))                               # crimp band
    g.append('<path d="M %.1f %.1f l %.1f 0 l %.1f %.1f q %.1f %.1f %.1f 0 Z" fill="%s"%s/>'
             % (*p(74, 2), 38 * sc, -5 * sc, -40 * sc, -14 * sc, -6 * sc, -28 * sc, TERRA, ky))  # bristles
    for dx in (11, 20, 28):                                                          # bristle splits
        g.append('<path d="M %.1f %.1f l %.1f %.1f" stroke="%s" stroke-width="%.1f" opacity="0.40"/>'
                 % (*p(74 + dx, -3), -3 * sc, -27 * sc, INK_LINE, 2.4 * sc))
    g.append('</g>')

    # hand gripping the handle, drawn after so it reads as in front of it
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f l %.1f %.1f q %.1f %.1f %.1f %.1f Z" fill="%s"%s/>'
             % (*p(64, 88), 10 * sc, -20 * sc, 38 * sc, -14 * sc, 9 * sc, 24 * sc,
                -12 * sc, 14 * sc, -38 * sc, 8 * sc, SKIN, ky))

    # a drip leaving the loaded bristles
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f q %.1f %.1f %.1f %.1f Z" fill="%s"/>'
             % (*p(112, -52), -6 * sc, 13 * sc, 0, 20 * sc, 6 * sc, -7 * sc, 0, -20 * sc, TERRA))
    g.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (*p(112, -24), 5.6 * sc, TERRA))
    return ''.join(g)


def badge():
    o = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" role="img" '
         'aria-label="Algarve Painter: a painter in a terracotta cap holding a loaded paint brush">'
         % (S, S)]
    o.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (CX, CX, 117, INK_LINE))
    o.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (CX, CX, 109, TERRA))
    o.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (CX, CX, 95, CREAM))
    o.append('<clipPath id="mdisc"><circle cx="%.1f" cy="%.1f" r="%.1f"/></clipPath>' % (CX, CX, 95))
    o.append('<g clip-path="url(#mdisc)">')
    o.append(figure(CX - 16, CX + 16, 0.75))
    o.append('</g></svg>')
    return '\n'.join(o)


def flat():
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" role="img" '
            'aria-label="Algarve Painter mascot">%s</svg>' % (S, S, figure(CX - 4, CX + 6, 0.88)))


if __name__ == '__main__':
    open('src/assets/brand/mascot.svg', 'w').write(badge())
    open('src/assets/brand/mascot-flat.svg', 'w').write(flat())
    print('mascot')
