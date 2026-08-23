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
AZULEJO    = '#5b7f9e'      # the blue of Portuguese tilework and painted trim
BOUGAIN    = '#c2417a'      # bougainvillea
BOUGAIN_DK = '#9c2c5e'
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


def chimney(x, base, w, h, colour, trim):
    """A chaminé algarvia. These are the single most identifiable thing on an
    Algarve roofline — tall, square, and pierced with a filigree lattice under
    a flared cap — and leaving them off is most of why the first cut could
    have been anywhere on the Mediterranean."""
    g = ['<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>' % (x, base - h, w, h, colour)]
    # pierced lattice: two rows of openings, suggested rather than drawn out
    hx, hy = w * 0.19, h * 0.13
    for r in range(2):
        for c in range(3):
            g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>'
                     % (x + w * 0.14 + c * w * 0.27, base - h * (0.78 - r * 0.26), hx, hy, trim))
    # flared cap and finial
    g.append('<path d="M %.1f %.1f l %.1f 0 l %.1f %.1f l %.1f 0 Z" fill="%s"/>'
             % (x - w * 0.20, base - h, w * 1.40, -w * 0.18, -h * 0.11, -w * 1.04, trim))
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>'
             % (x + w * 0.40, base - h - h * 0.19, w * 0.20, h * 0.09, trim))
    return ''.join(g)


def villa(x, base, w, h, roof, wall, flip=False, terrace=False, trim=AZULEJO):
    """A white Algarve house: pantiled or flat-terraced, with a painted skirt
    band and painted surrounds to the openings, an arched door, and a filigree
    chimney. The paint is not decoration here — a painting company's own
    illustration ought to show painted buildings."""
    g = []
    if terrace:
        # açoteia: flat roof with a parapet, and a run of little arches
        g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>'
                 % (x - w * 0.05, base - h - h * 0.16, w * 1.10, h * 0.16, wall))
        g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>'
                 % (x - w * 0.05, base - h - h * 0.16, w * 1.10, h * 0.045, trim))
        for i in range(3):
            g.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>'
                     % (x + w * (0.18 + 0.32 * i), base - h - h * 0.055, w * 0.055, trim))
        roof_top = base - h - h * 0.16
    else:
        over, peak = w * 0.14, h * 0.36
        g.append('<path d="M %.1f %.1f L %.1f %.1f L %.1f %.1f Z" fill="%s"/>'
                 % (x - over, base - h, x + w + over, base - h, x + w / 2, base - h - peak, roof))
        # pantile courses, just enough to read as tile rather than a flat plane
        for i in (1, 2):
            fy = i / 3.0
            g.append('<path d="M %.1f %.1f L %.1f %.1f" stroke="%s" stroke-width="%.1f" opacity="0.35"/>'
                     % (x - over + (over + w / 2) * fy, base - h - peak * fy,
                        x + w + over - (over + w / 2) * fy, base - h - peak * fy, CREAM, h * 0.020))
        roof_top = base - h - peak

    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>' % (x, base - h, w, h, wall))
    # painted skirt band along the base — the vernacular ochre or blue plinth
    g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>'
             % (x, base - h * 0.17, w, h * 0.17, trim))

    cw = w * 0.19
    g.append(chimney(x + w * (0.10 if flip else 0.72), roof_top + h * 0.03, cw, h * 0.26, wall, trim))

    # arched door with a painted surround
    dw, dh = w * 0.21, h * 0.50
    dx = x + (w * 0.64 if flip else w * 0.13)
    g.append('<path d="M %.1f %.1f v %.1f a %.1f %.1f 0 0 1 %.1f 0 v %.1f Z" fill="%s"/>'
             % (dx - w * 0.035, base, -(dh - dw / 2 + h * 0.05), dw / 2 + w * 0.035, dw / 2 + w * 0.035,
                dw + w * 0.07, dh - dw / 2 + h * 0.05, trim))
    g.append('<path d="M %.1f %.1f v %.1f a %.1f %.1f 0 0 1 %.1f 0 v %.1f Z" fill="%s"/>'
             % (dx, base, -(dh - dw / 2), dw / 2, dw / 2, dw, dh - dw / 2, INK))

    # shuttered windows, each in a painted surround
    for i in range(2):
        ww, wh = w * 0.155, h * 0.23
        wx = x + w * (0.16 if flip else 0.42) + i * w * 0.25
        if wx + ww > x + w * 0.92:
            break
        g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>'
                 % (wx - w * 0.032, base - h * 0.74 - h * 0.03, ww + w * 0.064, wh + h * 0.06, trim))
        g.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" fill="%s"/>'
                 % (wx, base - h * 0.74, ww, wh, INK))
    return ''.join(g)


def stack(x, base, w, h, colour, arch=False):
    """A limestone sea stack, optionally pierced — the Ponta da Piedade
    silhouette that says Algarve coast and nowhere else."""
    g = ['<path d="M %.1f %.1f L %.1f %.1f L %.1f %.1f L %.1f %.1f L %.1f %.1f Z" fill="%s"/>'
         % (x, base, x + w * 0.10, base - h * 0.72, x + w * 0.36, base - h,
            x + w * 0.82, base - h * 0.66, x + w, base, colour)]
    if arch:
        g.append('<path d="M %.1f %.1f v %.1f a %.1f %.1f 0 0 1 %.1f 0 v %.1f Z" fill="%s"/>'
                 % (x + w * 0.30, base, -h * 0.34, w * 0.20, h * 0.24, w * 0.40, h * 0.34, SEA_DEEP))
    return ''.join(g)


def agave(x, base, h, colour):
    """Agave — the spiky rosette on every Algarve roadside and clifftop."""
    g = []
    for a in (-168, -142, -116, -90, -64, -38, -12):
        r = math.radians(a)
        ex, ey = x + math.cos(r) * h * 0.62, base + math.sin(r) * h
        g.append('<path d="M %.1f %.1f L %.1f %.1f L %.1f %.1f Z" fill="%s"/>'
                 % (x - h * 0.15, base, ex, ey, x + h * 0.15, base, colour))
    return ''.join(g)


def bougainvillea(x, base, w, h, colour, dark):
    """A bougainvillea spilling down a wall: the one hot colour in an Algarve
    street, and the reason a whitewashed village never reads as monotone."""
    g = []
    rng = random.Random(int(x) * 7 + 3)
    for i in range(30):
        cx = x + rng.uniform(0, w)
        cy = base - rng.uniform(0, h)
        r = h * rng.uniform(0.055, 0.115)
        g.append('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>'
                 % (cx, cy, r, dark if i % 3 == 0 else colour))
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
             '<stop offset="0" stop-color="%s"/><stop offset="0.44" stop-color="#fae7d3"/>'
             '<stop offset="0.78" stop-color="#f8d9b4"/>'
             '<stop offset="1" stop-color="%s"/></linearGradient>'
             '<linearGradient id="water" x1="0" y1="0" x2="0" y2="1">'
             '<stop offset="0" stop-color="%s"/><stop offset="1" stop-color="%s"/></linearGradient>'
             '<linearGradient id="track" x1="0" y1="0" x2="0" y2="1">'
             '<stop offset="0" stop-color="#fff3dc" stop-opacity="0.62"/>'
             '<stop offset="1" stop-color="#fff3dc" stop-opacity="0"/></linearGradient>'
             '<linearGradient id="haze" x1="0" y1="0" x2="1" y2="0">'
             '<stop offset="0" stop-color="#fdf6ec" stop-opacity="0.80"/>'
             '<stop offset="0.30" stop-color="#fdf6ec" stop-opacity="0.62"/>'
             '<stop offset="0.52" stop-color="#fdf6ec" stop-opacity="0.20"/>'
             '<stop offset="0.66" stop-color="#fdf6ec" stop-opacity="0"/></linearGradient>'
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

    # Gulls over the water: three two-stroke arcs, sized down with distance.
    # Life and scale for almost no ink, kept right of the text zone.
    # Placement is a text-safety constraint, not taste: at 0.60 the flock sat
    # exactly behind the headline's second line and its ink strokes took the
    # outline type down to 1.0:1. 0.78 keeps them over the cliff at every
    # tested width up to 2560, clear of the widest text run.
    gx = 0.78 if wide else 0.72
    for dx, dy, gs in ((0.0, 0.0, 1.0), (0.06, -0.05, 0.72), (-0.05, -0.085, 0.55)):
        cxg, cyg, r = w * (gx + dx), SKY_END - h * (0.30 + dy), h * 0.016 * gs
        o.append('<path d="M %.1f %.1f q %.1f %.1f %.1f 0 M %.1f %.1f q %.1f %.1f %.1f 0" '
                 'stroke="%s" stroke-width="%.1f" fill="none" stroke-linecap="round" opacity="0.75"/>'
                 % (cxg - 2 * r, cyg, r, -r * 1.15, 2 * r, cxg, cyg, r, -r * 1.15, 2 * r,
                    INK, h * 0.0042 * gs))

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

    # Sea stacks off the point, one of them pierced. This is the Ponta da
    # Piedade silhouette, and it is the fastest way to say Algarve coast
    # rather than generic Mediterranean bay.
    st_base = SEA_END - (SEA_END - SKY_END) * 0.16
    if wide:
        st = [(0.360, 0.055, 0.090, True), (0.418, 0.036, 0.060, False), (0.310, 0.028, 0.045, False)]
    else:
        st = [(0.140, 0.070, 0.075, True), (0.245, 0.046, 0.050, False), (0.058, 0.036, 0.038, False)]
    for fx, fw, fh, arch in st:
        o.append(stack(w * fx, st_base, w * fw, h * fh, OCHRE_MID, arch))

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
    o.append('<path d="%s" fill="%s"/>' % (ridge(w, h, SEA_END, h * 0.026, 3, 7, tilt=0.02), BLUSH))
    o.append('<path d="%s" fill="%s"/>' % (ridge(w, h, SLOPE, h * 0.022, 23, 6, tilt=0.10), CLAY_MID))

    # The village CLIMBS the slope — each house a step higher — and mixes
    # pitched pantile roofs with flat açoteia terraces, which is what an
    # actual Algarve hill village does. Trim alternates between the blue of
    # the tilework and ochre, so the row reads as painted buildings rather
    # than as one repeated block.
    if wide:
        spots = [(0.50, 0.86, 0.000), (0.575, 1.06, 0.030), (0.655, 0.88, 0.058),
                 (0.725, 1.14, 0.086), (0.805, 0.94, 0.112), (0.880, 1.06, 0.138),
                 (0.950, 0.86, 0.162)]
    else:
        spots = [(0.03, 0.88, 0.000), (0.135, 1.08, 0.026), (0.265, 0.90, 0.050),
                 (0.395, 1.16, 0.074), (0.535, 0.96, 0.098), (0.665, 1.08, 0.120),
                 (0.795, 0.88, 0.140), (0.900, 1.00, 0.158)]
    vh = h * (0.068 if wide else 0.062)
    for i, (fx, s_, lift) in enumerate(spots):
        vx, vy2 = w * fx, SLOPE + h * 0.075 - h * lift
        o.append(villa(vx, vy2, vh * 1.02 * s_, vh * s_,
                       roof=TERRACOTTA if i % 2 else CLAY_DEEP,
                       wall=WHITE if i % 2 else CREAM,
                       flip=bool(i % 3), terrace=(i % 4 == 2),
                       trim=AZULEJO if i % 2 else OCHRE))
        if i in (1, 4):
            o.append(bougainvillea(vx + vh * 0.72 * s_, vy2, vh * 0.44 * s_, vh * 0.62 * s_,
                                   BOUGAIN, BOUGAIN_DK))

    # near bank, darkest plane, closing the frame
    o.append('<path d="%s" fill="%s"/>' % (ridge(w, h, FG, h * 0.018, 31, 6, tilt=-0.03), '#7d3f21'))

    if wide:
        trees = [(0.055, 0.130, 'p'), (0.150, 0.086, 'c'), (0.192, 0.068, 'c'),
                 (0.325, 0.112, 'p'), (0.560, 0.078, 'c'), (0.905, 0.120, 'p')]
    else:
        trees = [(0.075, 0.105, 'p'), (0.225, 0.074, 'c'), (0.480, 0.098, 'p'),
                 (0.700, 0.070, 'c'), (0.905, 0.100, 'p')]
    for fx, fh, kind in trees:
        o.append((cypress if kind == 'c' else pine)(w * fx, FG + h * 0.075, h * fh, BARK))
    # agave on the near bank, and one bougainvillea to carry a hot note into
    # the foreground so the bottom of the frame is not all earth
    for fx, fh in ((0.215, 0.082), (0.695, 0.068), (0.455, 0.058)) if wide else ((0.31, 0.072), (0.85, 0.060)):
        o.append(agave(w * fx, FG + h * 0.085, h * fh, BARK))
    bx = w * (0.815 if wide else 0.60)
    o.append(bougainvillea(bx, FG + h * 0.075, w * 0.055, h * 0.075, BOUGAIN, BOUGAIN_DK))
    # Morning haze over the quiet side. This is the job the CSS veil used to
    # do, moved into the picture: an illustrator would draw the light this
    # way round anyway, and here it can be judged against the artwork instead
    # of greying it out from above.
    o.append('<rect width="%d" height="%d" fill="url(#%s)"/>' % (w, h, 'haze' if wide else 'hazeV'))
    # A few swells re-drawn OVER the haze on the quiet side. The haze erased
    # the water's texture there, and a pale flat rectangle with a straight
    # horizon above and a straight shore below stopped reading as sea at all
    # — a design review called it "a scrim band with hard seams".
    if wide:
        rh = random.Random(41)
        for i in range(6):
            yy = SKY_END + (SEA_END - SKY_END) * (0.22 + 0.12 * i)
            o.append('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="%s" opacity="%.2f"/>'
                     % (w * rh.uniform(0.02, 0.38), yy, w * rh.uniform(0.05, 0.14),
                        h * 0.006, h * 0.003, SEA_DEEP, rh.uniform(0.18, 0.30)))
    o.append('</svg>')
    return '\n'.join(o)


if __name__ == '__main__':
    open('src/assets/brand/hero-scene-wide.svg', 'w').write(scene(1600, 900, 'wide'))
    open('src/assets/brand/hero-scene-tall.svg', 'w').write(scene(900, 1130, 'tall'))
    print('hero scenes')
