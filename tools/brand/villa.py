#!/usr/bin/env python3
"""Draw the repaintable Algarve villa used by the colour visualiser.

    python3 tools/brand/villa.py

Writes src/assets/brand/villa.svg. Every surface a painter would actually
quote for carries a class the page can recolour at runtime:

    .v-wall     render / masonry
    .v-trim     plinth band, window and door surrounds, chimney lattice
    .v-shutter  shutters
    .v-door     the front door
    .v-roof     pantiles

Nothing is downloaded and nothing is traced, so the drawing carries no
third-party licence. It is generated rather than hand-authored because the
repeated parts — pantile courses, shutter louvres, the chimney lattice — are
the parts that make it look drawn rather than clip-arted, and doing those by
hand is how they end up irregular in the wrong way.
"""
import math

INK      = '#3a241a'
INK_SOFT = '#5b3524'
GLASS    = '#3f5a68'
GLASS_LT = '#587a8b'
SKIN     = '#e0a87e'
CREAM    = '#fbf4e8'
BOUGAIN  = '#c2417a'
BOUGAIN2 = '#9c2c5e'
LEAF     = '#4f6b46'
LEAF_DK  = '#3b5235'
STONE    = '#cbb9a6'
STONE_DK = '#b09c88'

W, H = 1000, 760
GROUND = 686


def shutter(x, y, w, h, cls='v-shutter'):
    """A louvred shutter. The slats are what stop it reading as a coloured
    rectangle, and they cost four lines."""
    g = ['<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="2" class="%s"/>' % (x, y, w, h, cls)]
    n = max(3, int(h / 11))
    for i in range(n):
        yy = y + h * (i + 0.5) / n
        g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="2.6" rx="1.3" fill="%s" opacity="0.30"/>'
                 % (x + 3, yy, w - 6, INK))
    return ''.join(g)


def window(x, y, w, h, arched=False):
    """Opening, glass, glazing bars, painted surround and a pair of shutters
    thrown back against the wall — the way they actually sit in the Algarve."""
    sw = w * 0.44
    g = [shutter(x - sw - 5, y, sw, h), shutter(x + w + 5, y, sw, h)]
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="3" class="v-trim"/>'
             % (x - 7, y - 7, w + 14, h + 14))
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>' % (x, y, w, h, GLASS))
    g.append('<path d="M %.1f %.1f L %.1f %.1f L %.1f %.1f Z" fill="%s" opacity="0.55"/>'
             % (x, y + h, x + w, y, x + w, y + h * 0.42, GLASS_LT))
    g.append('<rect x="%.1f" y="%.1f" width="3" height="%.1f" fill="%s" opacity="0.85"/>' % (x + w / 2 - 1.5, y, h, CREAM))
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="3" fill="%s" opacity="0.85"/>' % (x, y + h * 0.45, w, CREAM))
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="7" rx="2" class="v-trim"/>' % (x - 12, y + h + 7, w + 24, ))
    return ''.join(g)


def pantiles(pts, courses=7):
    """A pitched roof: the plane, then scalloped courses across it. Real
    pantiles read as rows of half-round ridges, and a flat triangle does not."""
    g = ['<path d="M %.1f %.1f L %.1f %.1f L %.1f %.1f Z" class="v-roof"/>'
         % (pts[0][0], pts[0][1], pts[1][0], pts[1][1], pts[2][0], pts[2][1])]
    (lx, ly), (rx, ry), (ax, ay) = pts
    for i in range(1, courses):
        t = i / courses
        x0, y0 = lx + (ax - lx) * t, ly + (ay - ly) * t
        x1, y1 = rx + (ax - rx) * t, ry + (ay - ry) * t
        g.append('<path d="M %.1f %.1f L %.1f %.1f" stroke="%s" stroke-width="2.4" opacity="0.28"/>'
                 % (x0, y0, x1, y1, INK))
    step = 26
    n = int((rx - lx) / step)
    for i in range(n + 1):
        xx = lx + i * step
        g.append('<path d="M %.1f %.1f L %.1f %.1f" stroke="%s" stroke-width="2" opacity="0.16"/>'
                 % (xx, ly, ax + (xx - lx) * 0.06, ay + 4, INK))
    return ''.join(g)


def chimney(x, base, w, h):
    """Chaminé algarvia: square stack, pierced lattice, flared cap, finial."""
    g = ['<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" class="v-wall"/>' % (x, base - h, w, h)]
    for r in range(3):
        for c in range(3):
            g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="1.5" class="v-trim"/>'
                     % (x + w * 0.13 + c * w * 0.27, base - h * (0.80 - r * 0.20), w * 0.17, h * 0.11))
    g.append('<path d="M %.1f %.1f l %.1f 0 l %.1f %.1f l %.1f 0 Z" class="v-trim"/>'
             % (x - w * 0.22, base - h, w * 1.44, -w * 0.16, -h * 0.09, -w * 1.12))
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="2" class="v-trim"/>'
             % (x + w * 0.40, base - h - h * 0.17, w * 0.20, h * 0.09))
    return ''.join(g)


def bougainvillea(cx, cy, r, seed=1):
    g = []
    x = seed * 977
    for i in range(46):
        x = (x * 1103515245 + 12345) % 2147483648
        a = (x / 2147483648) * math.tau
        x = (x * 1103515245 + 12345) % 2147483648
        d = (x / 2147483648) ** 0.6 * r
        x = (x * 1103515245 + 12345) % 2147483648
        rr = r * (0.10 + 0.10 * (x / 2147483648))
        px, py = cx + math.cos(a) * d, cy + math.sin(a) * d * 0.78
        g.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>'
                 % (px, py, rr, BOUGAIN2 if i % 4 == 0 else BOUGAIN))
    return ''.join(g)


def painter():
    """A painter up a ladder with a roller on a pole, leaning on the main
    block so the roller actually meets the wall he is standing at. He is the
    reason the drawing reads as a job in progress rather than an estate
    agent's photo, and he is what makes the colour change feel like something
    being done rather than a filter."""
    LX = 548                    # ladder left rail
    g = ['<g id="villa-painter">']
    for dx in (0, 44):
        g.append('<rect x="%.1f" y="418" width="9" height="270" rx="4.5" fill="%s"/>' % (LX + dx, INK_SOFT))
    for i in range(6):
        g.append('<rect x="%.1f" y="%.1f" width="53" height="7" rx="3.5" fill="%s"/>' % (LX, 452 + i * 40, INK_SOFT))
    g.append('<path d="M %.1f 590 l 10 -48 l 24 0 l 8 48 Z" fill="#3d4f6b"/>' % (LX + 8))
    g.append('<rect x="%.1f" y="492" width="50" height="60" rx="13" fill="#4a5f80"/>' % (LX + 5))
    g.append('<rect x="%.1f" y="478" width="32" height="20" rx="8" fill="%s"/>' % (LX + 14, SKIN))
    g.append('<circle cx="%.1f" cy="460" r="22" fill="%s"/>' % (LX + 30, SKIN))
    g.append('<path d="M %.1f 452 a 22 21 0 0 1 44 0 Z" class="v-door"/>' % (LX + 8))
    g.append('<path d="M %.1f 452 q 17 2 21 8 q -15 4 -23 2 Z" class="v-door"/>' % (LX + 52))
    # raised arm and the roller, meeting the wall above him
    g.append('<path d="M %.1f 500 q 30 -16 40 -54" stroke="%s" stroke-width="16" fill="none" stroke-linecap="round"/>'
             % (LX + 52, SKIN))
    g.append('<rect x="%.1f" y="384" width="8" height="72" rx="4" fill="#c9a227" transform="rotate(14 %.1f 420)"/>'
             % (LX + 82, LX + 86))
    g.append('<rect x="%.1f" y="360" width="40" height="17" rx="7" class="v-wall" stroke="%s" stroke-width="3.5"/>'
             % (LX + 70, INK))
    # a freshly rolled band, lighter than the rest of the wall, under the roller
    g.append('<rect x="%.1f" y="360" width="40" height="118" class="v-wall" opacity="0.55"/>' % (LX + 70))
    g.append('</g>')
    return ''.join(g)


def build():
    o = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" id="villa-svg" role="img" '
         'aria-label="Illustration of an Algarve villa whose wall, trim, shutter, door and roof '
         'colours change as you choose them">' % (W, H)]
    o.append('<defs><linearGradient id="vsky" x1="0" y1="0" x2="0" y2="1">'
             '<stop offset="0" stop-color="#fdf7ee"/><stop offset="1" stop-color="#f6e6d6"/></linearGradient>'
             '<clipPath id="vclip"><rect width="%d" height="%d" rx="26"/></clipPath></defs>' % (W, H))
    o.append('<g clip-path="url(#vclip)">')
    o.append('<rect width="%d" height="%d" fill="url(#vsky)"/>' % (W, H))

    # ---- ground ---------------------------------------------------------
    o.append('<rect x="0" y="%d" width="%d" height="%d" fill="%s"/>' % (GROUND, W, H - GROUND, STONE))
    o.append('<rect x="0" y="%d" width="%d" height="7" fill="%s"/>' % (GROUND, W, STONE_DK))

    # ---- wing (right, lower) -------------------------------------------
    o.append(pantiles([(600, 428), (900, 428), (750, 344)], 5))
    o.append('<rect x="622" y="428" width="256" height="258" class="v-wall"/>')
    o.append('<rect x="622" y="640" width="256" height="46" class="v-trim"/>')
    o.append(window(800, 486, 56, 76))

    # ---- main block (left, taller) --------------------------------------
    o.append(chimney(268, 268, 46, 96))
    o.append(pantiles([(150, 296), (660, 296), (405, 176)], 8))
    o.append('<rect x="182" y="296" width="446" height="390" class="v-wall"/>')
    o.append('<rect x="182" y="626" width="446" height="60" class="v-trim"/>')
    # upper windows
    o.append(window(268, 350, 74, 96))
    o.append(window(452, 350, 74, 96))
    # arched door on a painted surround, up two steps
    o.append('<path d="M 300 686 v -136 a 56 56 0 0 1 112 0 v 136 Z" class="v-trim"/>')
    o.append('<path d="M 312 686 v -128 a 44 44 0 0 1 88 0 v 128 Z" class="v-door"/>')
    o.append('<circle cx="386" cy="612" r="6" fill="%s"/>' % '#c9a227')
    for i, (dx, dy, dw) in enumerate(((-16, 0, 160), (-30, 14, 188))):
        o.append('<rect x="%.1f" y="%.1f" width="%.1f" height="16" rx="3" fill="%s"/>'
                 % (340 + dx, 686 + dy - 16, dw, STONE_DK if i else STONE))
    # ground-floor window to the right of the door
    o.append(window(492, 500, 68, 88))

    # ---- pergola in front of the wing -----------------------------------
    # Bougainvillea goes on FIRST so the pergola frame reads in front of it —
    # drawn last it covered the beam, the posts and the painter alike.
    o.append(bougainvillea(716, 470, 56, seed=3))
    o.append(bougainvillea(852, 486, 44, seed=9))
    for px in (640, 748, 856):
        o.append('<rect x="%.1f" y="452" width="16" height="234" class="v-trim"/>' % px)
    o.append('<rect x="628" y="440" width="244" height="14" rx="4" class="v-trim"/>')
    for i in range(9):
        o.append('<rect x="%.1f" y="430" width="9" height="16" rx="3" fill="%s" opacity="0.55"/>'
                 % (636 + i * 27, INK_SOFT))

    # ---- planting -------------------------------------------------------
    o.append('<path d="M 140 686 q 8 -74 22 -104 q 14 30 22 104 Z" fill="%s"/>' % LEAF_DK)
    for a in (-166, -140, -114, -90, -66, -40, -14):
        r = math.radians(a)
        o.append('<path d="M 156 686 L %.1f %.1f L 168 686 Z" fill="%s"/>'
                 % (162 + math.cos(r) * 62, 686 + math.sin(r) * 96, LEAF))
    o.append('<path d="M 92 686 l 10 -52 l 56 0 l 10 52 Z" class="v-trim"/>')
    o.append('<ellipse cx="932" cy="640" rx="46" ry="52" fill="%s"/>' % LEAF)
    o.append('<rect x="926" y="640" width="12" height="46" fill="%s"/>' % LEAF_DK)

    o.append(painter())
    o.append('</g></svg>')
    return '\n'.join(o)


if __name__ == '__main__':
    open('src/assets/brand/villa.svg', 'w').write(build())
    print('villa')
