#!/usr/bin/env python3
"""Draw the Algarve Painter mascot as flat-vector SVG.

    python3 tools/brand/mascot.py

Writes src/assets/brand/mascot.svg (and -flat.svg, the badge-less head for
places that supply their own surround). Every path is generated here, so the
mark carries no third-party licence.

Constraints the drawing is built around:

  * It has to survive 32px. Everything is built from a small number of large
    shapes with a heavy ink keyline; detail that disappears at favicon size
    is detail that only makes the 200px version noisier.
  * It has to read as a working painter, not a generic face. The cap, the
    brush behind the ear and the paint fleck on the shoulder do that work —
    take them away and it is any tradesman.
  * It uses the page palette untouched, so the mark and the site cannot drift
    apart.
"""
INK      = '#3a241a'
SKIN     = '#e0a87e'
SKIN_DK  = '#c78a5f'
TERRA    = '#c25a38'
TERRA_DK = '#9e4128'
OCHRE    = '#d9a02b'
CREAM    = '#fbf4e8'
WHITE    = '#fffdf7'
BLUSH    = '#d9a08c'

S = 240          # viewBox
CX = S / 2
K = 7.0          # keyline weight


def head(cx, cy, sc=1.0, keyline=True):
    """Head, cap, brush and collar, drawn around (cx, cy) at scale `sc`.

    Everything is sized off a 240-unit head so the whole mark scales as one
    piece. The cap peak projects to the viewer's left rather than running
    across the full width — the first cut drew it as a bar and it read as a
    military cap, not a painter's."""
    def p(x, y):
        return cx + x * sc, cy + y * sc
    ky = (' stroke="%s" stroke-width="%.1f" stroke-linejoin="round" stroke-linecap="round"'
          % (INK, K * sc)) if keyline else ''
    g = []

    # collar / shoulders
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f l %.1f 0 q %.1f %.1f %.1f %.1f Z" fill="%s"%s/>'
             % (*p(-80, 100), 8 * sc, -38 * sc, 80 * sc, -44 * sc, 74 * sc,
                8 * sc, 6 * sc, 80 * sc, 44 * sc, OCHRE, ky))
    g.append('<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="%s" '
             'transform="rotate(-18 %.1f %.1f)"/>' % (*p(-48, 76), 10 * sc, 6.5 * sc, TERRA, *p(-48, 76)))
    g.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (*p(-32, 88), 5 * sc, TERRA))

    # brush behind the ear, angled so the bristles clear the cap. Drawn first
    # so the head overlaps its handle.
    bx, by = p(58, -26)
    g.append('<g transform="rotate(38 %.1f %.1f)">' % (bx, by))
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="%s"%s/>'
             % (*p(48, -18), 23 * sc, 74 * sc, 8 * sc, OCHRE, ky))          # handle
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"%s/>'
             % (*p(44, -48), 31 * sc, 18 * sc, CREAM, ky))                   # ferrule
    g.append('<path d="M %.1f %.1f l %.1f 0 l %.1f %.1f l %.1f 0 Z" fill="%s"%s/>'
             % (*p(44, -48), 31 * sc, 5 * sc, -34 * sc, -41 * sc, TERRA, ky))  # bristles
    g.append('</g>')

    # neck
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="%s"%s/>'
             % (*p(-20, 30), 40 * sc, 36 * sc, 11 * sc, SKIN_DK, ky))

    # ears
    for sx in (-1, 1):
        g.append('<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="%s"%s/>'
                 % (*p(sx * 60, 4), 12 * sc, 16 * sc, SKIN, ky))

    # face: a soft square so it reads as a jaw rather than an egg
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="%s"%s/>'
             % (*p(-58, -54), 116 * sc, 98 * sc, 34 * sc, SKIN, ky))

    # cap: dome, then a peak that projects left and down over the brow
    g.append('<path d="M %.1f %.1f a %.1f %.1f 0 0 1 %.1f 0 Z" fill="%s"%s/>'
             % (*p(-61, -48), 61 * sc, 56 * sc, 122 * sc, TERRA, ky))
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f q %.1f %.1f %.1f %.1f Z" fill="%s"%s/>'
             % (*p(28, -46), -60 * sc, 6 * sc, -104 * sc, -2 * sc,
                14 * sc, -20 * sc, 104 * sc, -4 * sc, TERRA_DK, ky))
    g.append('<path d="M %.1f %.1f l %.1f 0 l 0 %.1f l %.1f 0 Z" fill="%s"/>'
             % (*p(-58, -62), 116 * sc, 14 * sc, -116 * sc, OCHRE))

    # brows: short straight strokes, angled a touch inward
    for sx in (-1, 1):
        g.append('<path d="M %.1f %.1f l %.1f %.1f" fill="none" stroke="%s" '
                 'stroke-width="%.1f" stroke-linecap="round"/>'
                 % (*p(sx * 15, -26), sx * 20 * sc, -3 * sc, INK, 6.5 * sc))
    for sx in (-1, 1):
        g.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (*p(sx * 25, -8), 7.5 * sc, INK))
    # nose
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f" fill="none" stroke="%s" '
             'stroke-width="%.1f" stroke-linecap="round"/>'
             % (*p(-4, 4), 8 * sc, 11 * sc, 13 * sc, 1 * sc, SKIN_DK, 6.5 * sc))

    # moustache: one shape, wide and flat, clear of the mouth below it. This
    # is the silhouette that survives at favicon size, so it is drawn simply.
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f q %.1f %.1f %.1f %.1f '
             'q %.1f %.1f %.1f %.1f q %.1f %.1f %.1f %.1f Z" fill="%s"/>'
             % (*p(0, 18),
                -9 * sc, -10 * sc, -31 * sc, -7 * sc,
                -8 * sc, 2 * sc, 1 * sc, 11 * sc,
                9 * sc, 7 * sc, 30 * sc, 3 * sc,
                9 * sc, -5 * sc, 0 * sc, -7 * sc, INK))
    g.append('<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f" fill="none" stroke="%s" '
             'stroke-width="%.1f" stroke-linecap="round"/>'
             % (*p(-14, 33), 14 * sc, 11 * sc, 28 * sc, 0, INK, 6 * sc))
    return ''.join(g)


def badge():
    o = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" role="img" '
         'aria-label="Algarve Painter mascot: a painter in a terracotta cap with a '
         'brush behind his ear">' % (S, S)]
    o.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (CX, CX, 116, INK))
    o.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (CX, CX, 109, TERRA))
    o.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (CX, CX, 95, CREAM))
    o.append('<clipPath id="disc"><circle cx="%.1f" cy="%.1f" r="%.1f"/></clipPath>' % (CX, CX, 95))
    o.append('<g clip-path="url(#disc)">')
    o.append(head(CX, CX + 12, 0.86))
    o.append('</g>')
    o.append('</svg>')
    return '\n'.join(o)


def flat():
    o = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" role="img" '
         'aria-label="Algarve Painter mascot">' % (S, S)]
    o.append(head(CX, CX + 4, 0.94))
    o.append('</svg>')
    return '\n'.join(o)


if __name__ == '__main__':
    open('src/assets/brand/mascot.svg', 'w').write(badge())
    open('src/assets/brand/mascot-flat.svg', 'w').write(flat())
    print('mascot')
