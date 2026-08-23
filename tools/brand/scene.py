#!/usr/bin/env python3
"""Draw the illustrated Algarve hero scene as flat-vector SVG.

    python3 tools/brand/scene.py

Writes src/assets/brand/hero-scene-{wide,tall}.svg. Nothing is downloaded and
nothing is traced from a photograph: every path is generated here, so the
artwork carries no third-party licence — which is the point, since the stock
villa it replaces had none we could establish.

Geometry is procedural rather than hand-authored path data so the same scene
can be re-cut to a different aspect without redrawing it. The wide cut leaves
its left half quiet, because that is where the desktop hero puts its
headline; the tall cut moves the same elements down, because mobile stacks
its text above the image instead.
"""
import math, random

# The page palette, used as-is. Depth is carried by VALUE, not hue: each plane
# is a step darker than the one behind it, all inside the same warm family.
# That is what keeps a flat illustration from reading as clip art.
INK        = '#3a241a'
BARK       = '#5b3524'
CLAY_DEEP  = '#94502c'
TERRACOTTA = '#c25a38'
CLAY_MID   = '#d9784a'
BLUSH      = '#dba48f'
BLUSH_PALE = '#ecc7b4'
OCHRE      = '#d9a02b'
OCHRE_MID  = '#e3b455'
OCHRE_PALE = '#f4d489'
CREAM      = '#fbf4e8'
WHITE      = '#fffdf7'
# One cool note, desaturated and warm-leaning so it sits inside the warm
# palette rather than competing with it. The Algarve without sea does not
# read as the Algarve.
SEA        = '#bacdd4'
SEA_DEEP   = '#a3bbc4'


def spline(pts):
    """Smooth open curve through the midpoints of a control polyline."""
    d = 'M %.1f %.1f' % pts[0]
    for i in range(len(pts) - 1):
        (x0, y0), (x1, y1) = pts[i], pts[i + 1]
        d += ' Q %.1f %.1f %.1f %.1f' % (x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
    d += ' L %.1f %.1f' % pts[-1]
    return d


def ridge(w, h, y, amp, seed, steps=7, tilt=0.0):
    """A hill silhouette closed down to the bottom of the frame. `tilt` lifts
    the right-hand end, which is what gives the range somewhere to go."""
    rng = random.Random(seed)
    pts = [(-60.0, y + amp * 0.4)]
    for i in range(steps + 1):
        fx = i / steps
        pts.append((w * fx, y + rng.uniform(-amp, amp) - tilt * h * fx))
    pts.append((w + 60.0, y - tilt * h + amp * 0.3))
    return spline(pts) + ' L %.1f %.1f L %.1f %.1f Z' % (w + 60, h + 60, -60, h + 60)


def cliff(w, h, x0, y, seed):
    """A headland dropping into the water: a blocky, faceted profile rather
    than a smooth hill, because that is what the Algarve coast actually is."""
    rng = random.Random(seed)
    pts = [(x0, y)]
    x, yy = x0, y
    while x < w + 60:
        x += rng.uniform(w * 0.04, w * 0.09)
        yy += rng.uniform(-h * 0.055, -h * 0.010)
        pts.append((x, yy))
    d = 'M %.1f %.1f' % pts[0]
    for p in pts[1:]:
        d += ' L %.1f %.1f' % p
    return d + ' L %.1f %.1f L %.1f %.1f Z' % (w + 60, h + 60, x0, h + 60)


def villa(x, base, w, h, roof, wall, flip=False):
    """A whitewashed block with a pitched terracotta roof, arched door and
    shuttered windows — the Algarve vernacular, drawn as simply as it bears."""
    g = []
    over = w * 0.16                              # roof overhang each side
    peak = h * 0.42
    g.append('<path d="M %.1f %.1f L %.1f %.1f L %.1f %.1f Z" fill="%s"/>'
             % (x - over, base - h, x + w + over, base - h, x + w / 2, base - h - peak, roof))
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>' % (x, base - h, w, h, wall))
    cx = x + w * (0.16 if flip else 0.72)
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>'
             % (cx, base - h - peak * 0.86, w * 0.10, peak * 0.72, wall))
    dw, dh = w * 0.20, h * 0.52
    dx = x + (w * 0.66 if flip else w * 0.14)
    g.append('<path d="M %.1f %.1f v %.1f a %.1f %.1f 0 0 1 %.1f 0 v %.1f Z" fill="%s"/>'
             % (dx, base, -(dh - dw / 2), dw / 2, dw / 2, dw, dh - dw / 2, INK))
    for i in range(2):
        ww, wh = w * 0.15, h * 0.24
        wx = x + w * (0.16 if flip else 0.44) + i * w * 0.26
        if wx + ww > x + w * 0.94:
            break
        g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>'
                 % (wx, base - h * 0.78, ww, wh, INK))
    return ''.join(g)


def cypress(x, base, h, colour):
    w = h * 0.17
    return ('<path d="M %.1f %.1f C %.1f %.1f %.1f %.1f %.1f %.1f C %.1f %.1f %.1f %.1f %.1f %.1f Z" fill="%s"/>'
            % (x, base, x - w, base - h * 0.40, x - w * 0.66, base - h * 0.88, x, base - h,
               x + w * 0.66, base - h * 0.88, x + w, base - h * 0.40, x, base, colour))


def pine(x, base, h, colour):
    """An umbrella pine: a tall bare trunk under a wide, flat canopy. The
    Algarve's signature tree. The canopy is built from overlapping ellipses
    that are WIDE and SHALLOW — round ones read as broccoli."""
    lean = h * 0.07
    tw = h * 0.030
    g = ['<path d="M %.1f %.1f q %.1f %.1f %.1f %.1f l %.1f %.1f q %.1f %.1f %.1f %.1f Z" fill="%s"/>'
         % (x - tw, base, h * 0.012, -h * 0.40, lean, -h * 0.70,
            tw * 1.55, 0.0, -h * 0.006, h * 0.30, -lean + h * 0.006, h * 0.70, colour)]
    cx, cy = x + lean + tw * 0.7, base - h * 0.74
    rx, ry = h * 0.46, h * 0.105
    for dx, dy, sx, sy in ((0.0, 0.0, 1.0, 1.0), (-0.52, 0.30, 0.56, 0.70),
                           (0.54, 0.34, 0.52, 0.66), (-0.24, -0.62, 0.50, 0.72),
                           (0.28, -0.58, 0.46, 0.68)):
        g.append('<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="%s"/>'
                 % (cx + rx * dx, cy + ry * dy, rx * sx, ry * sy, colour))
    return ''.join(g)


def scene(w, h, layout):
    """The frame is built as explicit depth bands rather than free-floating
    shapes, because the thing that goes wrong first in a flat landscape is
    one plane swallowing the one behind it — the first cut lost the sea
    entirely under a headland drawn at the same height."""
    wide = layout == 'wide'
    quiet = 0.44 if wide else 0.0    # fraction of width kept clear for the desktop headline
    SKY_END  = h * (0.50 if wide else 0.50)   # horizon
    SEA_END  = h * (0.63 if wide else 0.605)  # waterline against the near shore
    SLOPE    = h * (0.70 if wide else 0.685)  # where the village hillside starts
    FG       = h * (0.865 if wide else 0.855)  # near bank

    o = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" '
         'preserveAspectRatio="xMidYMid slice" role="img" '
         'aria-label="Illustration of an Algarve hillside village at golden hour: '
         'whitewashed villas with terracotta roofs climbing a headland above the sea, '
         'with umbrella pines and cypresses in the foreground">' % (w, h)]
    o.append('<defs>'
             '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">'
             '<stop offset="0" stop-color="%s"/><stop offset="0.55" stop-color="#fae7d3"/>'
             '<stop offset="1" stop-color="%s"/></linearGradient>'
             '<linearGradient id="water" x1="0" y1="0" x2="0" y2="1">'
             '<stop offset="0" stop-color="%s"/><stop offset="1" stop-color="%s"/></linearGradient>'
             '<linearGradient id="track" x1="0" y1="0" x2="0" y2="1">'
             '<stop offset="0" stop-color="#fff3dc" stop-opacity="0.62"/>'
             '<stop offset="1" stop-color="#fff3dc" stop-opacity="0"/></linearGradient>'
             '<linearGradient id="haze" x1="0" y1="0" x2="1" y2="0">'
             '<stop offset="0" stop-color="#fdf6ec" stop-opacity="0.94"/>'
             '<stop offset="0.30" stop-color="#fdf6ec" stop-opacity="0.86"/>'
             '<stop offset="0.52" stop-color="#fdf6ec" stop-opacity="0.34"/>'
             '<stop offset="0.68" stop-color="#fdf6ec" stop-opacity="0"/></linearGradient>'
             '<linearGradient id="hazeV" x1="0" y1="0" x2="0" y2="1">'
             '<stop offset="0" stop-color="#fdf6ec" stop-opacity="0.95"/>'
             '<stop offset="0.40" stop-color="#fdf6ec" stop-opacity="0.90"/>'
             '<stop offset="0.56" stop-color="#fdf6ec" stop-opacity="0.42"/>'
             '<stop offset="0.70" stop-color="#fdf6ec" stop-opacity="0"/></linearGradient>'
             '<radialGradient id="glow"><stop offset="0" stop-color="%s" stop-opacity="0.9"/>'
             '<stop offset="1" stop-color="%s" stop-opacity="0"/></radialGradient>'
             '</defs>' % (CREAM, BLUSH_PALE, SEA, SEA_DEEP, OCHRE_PALE, OCHRE_PALE))
    o.append('<rect width="%d" height="%d" fill="url(#sky)"/>' % (w, h))

    # A few flat clouds keep the upper sky from reading as dead space.
    rc = random.Random(19)
    for fx, fy, fs in ((0.08, 0.13, 1.15), (0.26, 0.075, 0.72), (0.155, 0.235, 0.86),
                       (0.86, 0.115, 0.95), (0.70, 0.055, 0.62)):
        cx, cy, cw = w * fx, h * fy, w * 0.085 * fs
        o.append('<g fill="%s" opacity="0.55">' % BLUSH_PALE)
        for dx, dy, r in ((0.0, 0.0, 0.52), (-0.62, 0.22, 0.36), (0.60, 0.24, 0.32), (0.24, -0.20, 0.34)):
            o.append('<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f"/>'
                     % (cx + cw * dx, cy + cw * dy * 0.55, cw * r, cw * r * 0.44))
        o.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f"/>'
                 % (cx - cw * 0.78, cy + cw * 0.10, cw * 1.56, cw * 0.20, cw * 0.10))
        o.append('</g>')

    sun_x = w * (0.60 if wide else 0.60)
    sun_y = SKY_END - h * 0.15
    o.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="url(#glow)"/>' % (sun_x, sun_y, h * 0.30))
    o.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>' % (sun_x, sun_y, h * 0.058, OCHRE_PALE))

    # far headland: sits ON the horizon and spans only part of the width, so
    # open water is still visible beside it rather than behind it
    hl = ' '.join('L %.1f %.1f' % (w * fx, SKY_END - h * fy) for fx, fy in
                  ((0.06, 0.012), (0.16, 0.038), (0.27, 0.030), (0.36, 0.052), (0.44, 0.022)))
    o.append('<path d="M %.1f %.1f %s L %.1f %.1f Z" fill="%s" opacity="0.85"/>'
             % (-40, SKY_END, hl, w * 0.52, SKY_END, BLUSH))

    # sea: a real band between the horizon and the near shore
    o.append('<rect x="0" y="%.1f" width="%d" height="%.1f" fill="url(#water)"/>' % (SKY_END, w, SEA_END - SKY_END))
    # The sun's track widens as it comes toward the viewer. Drawn as a taper,
    # not the rectangle the first cut used — a straight-sided column of light
    # on water reads as a UI panel laid over the picture.
    sea_h = SEA_END - SKY_END
    o.append('<path d="M %.1f %.1f L %.1f %.1f L %.1f %.1f L %.1f %.1f Z" fill="url(#track)"/>'
             % (sun_x - w * 0.016, SKY_END, sun_x + w * 0.016, SKY_END,
                sun_x + w * 0.075, SEA_END, sun_x - w * 0.075, SEA_END))
    # Swells: short, rounded, thicker near the light and sparse away from it,
    # so they read as water catching the sun rather than as ruled lines.
    rng = random.Random(7)
    for i in range(14):
        fy = 0.10 + 0.062 * i % 1.0
        yy = SKY_END + sea_h * (0.12 + 0.060 * (i % 13))
        if yy > SEA_END - sea_h * 0.06:
            continue
        cxf = rng.uniform(0.0, 0.92)
        near = 1.0 - min(abs(cxf - sun_x / w) / 0.45, 1.0)
        o.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="%s" opacity="%.2f"/>'
                 % (w * cxf, yy, w * rng.uniform(0.03, 0.10) * (0.6 + near),
                    h * 0.0085, h * 0.0043, OCHRE_PALE if near > 0.55 else BLUSH_PALE,
                    0.25 + 0.45 * near))

    # golden cliff dropping into the water on the right, faceted not rounded
    cx0 = w * (quiet + 0.10)
    face = [(cx0, SEA_END)]
    x, y = cx0, SEA_END
    rc = random.Random(5)
    while x < w + 60:
        x += w * rc.uniform(0.05, 0.11)
        y -= h * rc.uniform(0.012, 0.060)
        face.append((x, max(y, SKY_END + h * 0.015)))
    o.append('<path d="M %.1f %.1f %s L %.1f %.1f L %.1f %.1f Z" fill="%s"/>'
             % (cx0, SEA_END, ' '.join('L %.1f %.1f' % p for p in face[1:]),
                w + 60, h + 60, cx0, h + 60, OCHRE_MID))

    # near shore and the village hillside
    o.append('<path d="%s" fill="%s"/>' % (ridge(w, h, SEA_END, h * 0.014, 3, 6, tilt=0.02), BLUSH))
    o.append('<path d="%s" fill="%s"/>' % (ridge(w, h, SLOPE, h * 0.022, 23, 6, tilt=0.10), CLAY_MID))

    # the village CLIMBS the slope: each house sits a step higher to the right,
    # which is what makes it read as a hill town rather than a terrace
    if wide:
        spots = [(0.50, 0.86, 0.00), (0.575, 1.06, 0.030), (0.655, 0.88, 0.058),
                 (0.725, 1.14, 0.086), (0.805, 0.94, 0.112), (0.880, 1.06, 0.138),
                 (0.950, 0.86, 0.162)]
    else:
        spots = [(0.03, 0.88, 0.00), (0.135, 1.08, 0.026), (0.265, 0.90, 0.050),
                 (0.395, 1.16, 0.074), (0.535, 0.96, 0.098), (0.665, 1.08, 0.120),
                 (0.795, 0.88, 0.140), (0.900, 1.00, 0.158)]
    vh = h * (0.068 if wide else 0.062)
    for i, (fx, s, lift) in enumerate(spots):
        o.append(villa(w * fx, SLOPE + h * 0.075 - h * lift, vh * 1.02 * s, vh * s,
                       roof=TERRACOTTA if i % 2 else CLAY_DEEP,
                       wall=WHITE if i % 2 else CREAM, flip=bool(i % 3)))

    # near bank, darkest plane, closing the frame
    o.append('<path d="%s" fill="%s"/>' % (ridge(w, h, FG, h * 0.018, 31, 6, tilt=-0.03), CLAY_DEEP))

    if wide:
        trees = [(0.055, 0.130, 'p'), (0.150, 0.086, 'c'), (0.192, 0.068, 'c'),
                 (0.325, 0.112, 'p'), (0.560, 0.078, 'c'), (0.905, 0.120, 'p')]
    else:
        trees = [(0.075, 0.105, 'p'), (0.225, 0.074, 'c'), (0.480, 0.098, 'p'),
                 (0.700, 0.070, 'c'), (0.905, 0.100, 'p')]
    for fx, fh, kind in trees:
        o.append((cypress if kind == 'c' else pine)(w * fx, FG + h * 0.075, h * fh, BARK))
    # Morning haze over the quiet side. This is the job the CSS veil used to
    # do, moved into the picture: an illustrator would draw the light this
    # way round anyway, and here it can be judged against the artwork instead
    # of greying it out from above.
    o.append('<rect width="%d" height="%d" fill="url(#%s)"/>' % (w, h, 'haze' if wide else 'hazeV'))
    o.append('</svg>')
    return '\n'.join(o)


if __name__ == '__main__':
    open('src/assets/brand/hero-scene-wide.svg', 'w').write(scene(1600, 900, 'wide'))
    open('src/assets/brand/hero-scene-tall.svg', 'w').write(scene(900, 1130, 'tall'))
    print('hero scenes')
