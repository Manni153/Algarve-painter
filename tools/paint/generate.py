#!/usr/bin/env python3
"""Generate every painted asset the site uses.

    python3 tools/paint/generate.py [palette]

Writes into src/assets/images and src/assets/icons. Run from the repo root.
Requires Pillow and NumPy (`pip install pillow numpy`) — neither is a runtime
dependency of the site itself, only of this generator.

Nothing here is downloaded: every pixel is procedural, so the assets carry no
third-party licence. See tools/paint/brush.py for the stroke engine.

To change the hero colourway, pass a palette name (see PALETTES below) or add
a new entry — geometry stays fixed, so a swap is colour-only:

    python3 tools/paint/generate.py studio

'reference' is the colourway the site ships; it is the default here so a bare
run reproduces exactly what is committed.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from brush import stroke, canvas
from PIL import Image

CANVAS = (248, 243, 234)          # warm off-white; a shade lighter than the page ground

# Five pigments, laid bottom-of-list to top-of-hero. Geometry is shared, so
# switching palette changes colour only.
PALETTES = {
    # widest hue spread: two warms, a cool, a soft mid, and a dark anchor
    'studio':    [(233, 176, 31), (23, 166, 152), (242, 100, 60), (226, 138, 132), (34, 48, 63)],
    # "Basic Canvas": the reference swatch set — mustard gold, dusty rose,
    # terracotta, warm plum, burgundy. One warm family with nothing jumping
    # out of it, but rich pigment rather than pastel: these are deep,
    # saturated values that read matte because of how they are SHADED (no
    # specular rim, opaque body, colour-led texture), not because the colour
    # itself has been drained.
    'reference': [(210, 149,  42), (196, 112, 122), (192,  86,  47), (142,  74,  99), (126,  47,  62)],
    # maximum separation: four saturated hues plus near-black
    'pop':       [(242, 183, 5), (18, 168, 160), (214, 65, 126), (255, 107, 74), (46, 42, 40)],
}

# (x, y, w, h as fractions of the canvas, seed, arc, rotation)
GEO_DESKTOP = [(0.46, 0.05, 0.56, 0.15, 101,  0.16, -5),
               (0.43, 0.24, 0.60, 0.17, 111, -0.12,  4),
               (0.40, 0.44, 0.64, 0.22, 121,  0.18, -2),
               (0.47, 0.68, 0.55, 0.14, 131, -0.14,  5),
               (0.55, 0.85, 0.44, 0.10, 141,  0.10, -4)]
# mobile stacks the strokes under the headline instead of beside it
GEO_MOBILE  = [(0.10, 0.34, 0.86, 0.09, 201,  0.14, -2),
               (0.04, 0.45, 0.92, 0.10, 211, -0.10,  2),
               (0.02, 0.57, 0.98, 0.13, 221,  0.16, -1),
               (0.10, 0.72, 0.86, 0.09, 231, -0.12,  2),
               (0.20, 0.84, 0.74, 0.07, 241,  0.10, -2)]

IMG = 'src/assets/images/'
ICO = 'src/assets/icons/'

def compose(colours, geo, w, h, ground=CANVAS, tooth=0.10):
    bg = canvas(w, h, ground, seed=17, tooth=tooth).convert('RGBA')
    for c, (fx, fy, fw, fh, sd, arc, deg) in zip(colours, geo):
        sw = stroke(int(w * fw), int(h * fh), c, seed=sd, arc=arc, load=0.82)
        if deg:
            sw = sw.rotate(deg, resample=Image.BICUBIC, expand=True)
        bg.alpha_composite(sw, (int(w * fx), int(h * fy)))
    return bg.convert('RGB')

def save(im, path, q=86):
    im.save(path + '.jpg', quality=q, optimize=True, progressive=True)
    im.save(path + '.webp', quality=82, method=6)

def main(name='reference'):
    if name not in PALETTES:
        sys.exit('unknown palette %r; choose from %s' % (name, ', '.join(PALETTES)))
    cols = PALETTES[name]

    save(compose(cols, GEO_DESKTOP, 1900, 1069), IMG + 'hero-paint-desktop')
    save(compose(cols, GEO_MOBILE, 1455, 1826), IMG + 'hero-paint-mobile')
    print('heroes (%s)' % name)

    # Section marks: the swatch swiped under each heading, alternating by
    # section. Drawn from the same palette so page and hero stay in family.
    for fname, c in [('swatch-clay', cols[2]), ('swatch-ochre', cols[0]), ('swatch-blush', cols[1])]:
        stroke(900, 190, c, seed=41, arc=0.14, load=0.82).save(IMG + fname + '.png')

    # Three-hue divider, used as a watermark on the dark CTA bands.
    div = Image.new('RGBA', (1600, 210), (0, 0, 0, 0))
    for c, x, y, sd, ar, dg in [(cols[0], 20, 24, 11, 0.16, -2),
                                (cols[1], 520, 58, 21, -0.12, 2),
                                (cols[2], 950, 28, 31, 0.20, -1)]:
        sw = stroke(720, 150, c, seed=sd, arc=ar, load=0.8).rotate(dg, resample=Image.BICUBIC, expand=True)
        div.alpha_composite(sw, (x, y))
    div.save(IMG + 'swatch-divider.png')
    print('swatches')

    # Stats swatch: the band the hero trust row sits on. It is a paint stroke
    # like everything else in the hero — same rounded ends, same matte
    # texture — just laid down solid, so the icons and labels on top of it
    # stay legible whatever is painted behind. Two aspect ratios rather than
    # one stretched asset: the row is roughly 8:1 on desktop and 3:1 on
    # mobile, and stretching a single stroke across that range visibly
    # smears its texture.
    TAN = (226, 201, 170)
    stroke(1600, 200, TAN, seed=901, arc=0.015, load=1.0, solid=True).save(IMG + 'stats-swatch-wide.png')
    stroke(900, 300, TAN, seed=907, arc=0.02, load=1.0, solid=True).save(IMG + 'stats-swatch-tall.png')
    print('stats swatch')

    # Favicon: two loaded swipes on cream.
    S = 1024
    fav = canvas(S, S, CANVAS, seed=5, tooth=0.08).convert('RGBA')
    for c, fy, fh, sd, dg in [(cols[1], 0.20, 0.30, 301, -6), (cols[2], 0.44, 0.38, 303, -4)]:
        sw = stroke(int(S * 0.88), int(S * fh), c, seed=sd, arc=0.14, load=0.9)
        fav.alpha_composite(sw.rotate(dg, resample=Image.BICUBIC, expand=True), (int(S * 0.06), int(S * fy)))
    fav = fav.convert('RGB').resize((512, 512), Image.LANCZOS)
    fav.save(ICO + 'icon-512.png')
    fav.resize((180, 180), Image.LANCZOS).save(ICO + 'apple-touch-icon.png')
    fav.resize((32, 32), Image.LANCZOS).save(ICO + 'favicon-32x32.png')
    fav.save(ICO + 'favicon.ico', format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    print('favicon')

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'reference')
