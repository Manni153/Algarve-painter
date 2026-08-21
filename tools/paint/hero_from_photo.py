"""Build the hero art from the supplied photograph.

The hero used to be generated procedurally (see generate.py). It is now
derived from `paint example.png` — a photograph of five impasto strokes on
canvas — so this script owns the hero assets and generate.py no longer
touches them.

Two things the source needs before it can carry the layout:

1. It is mirrored. The paint mass sits on the LEFT of the photograph and
   dry-brushes out to bare canvas on the right, while the hero puts its
   headline, tagline and CTA on the left. Unmirrored, every word would sit
   on thick opaque pigment. Mirrored, the faded dry end falls under the text
   and the loaded ends occupy the right half — the same reading order the
   layout already had, with all five strokes and their texture intact.

2. It is recomposed for portrait. The photograph is 16:9; the mobile hero
   frame is 0.797:1. Cropping to that would show a narrow horizontal band of
   two or three strokes. Instead the full width is laid onto a matching
   canvas ground, low in the frame, so the text sits above it and all five
   strokes survive.
"""
import sys
from PIL import Image, ImageOps, ImageFilter

SRC = 'paint example.png'
IMG = 'src/assets/images/'
GROUND = (234, 235, 236)          # sampled from the photograph's own canvas

def save(im, path, q=82, sharpen=False):
    """No dither here, unlike the generated art: a photograph already carries
    its own film/canvas grain, so there is nothing to break up and the noise
    only costs bytes. Quality is lower for the same reason — the texture
    masks compression that would show on a flat generated field."""
    if sharpen:
        # The source photograph is 2048px wide, so on a high-DPI desktop the
        # largest candidate is still being upscaled by the browser (1.9x at
        # 1920 DPR 2). A light unsharp mask before encoding recovers some of
        # the crispness that upscale costs. It cannot add detail that is not
        # in the source — a higher-resolution original is the real fix.
        im = im.filter(ImageFilter.UnsharpMask(radius=1.1, percent=55, threshold=3))
    im.save(path + '.jpg', quality=q, optimize=True, progressive=True)
    im.save(path + '.webp', quality=q, method=6)

def landscape(src, w, h):
    """Cover-crop the mirrored photograph to the requested frame."""
    return ImageOps.fit(src, (w, h), Image.LANCZOS, centering=(0.5, 0.5))

def portrait(src, w, h, centre=0.62):
    """Full-width strokes laid low on a matching canvas ground."""
    out = Image.new('RGB', (w, h), GROUND)
    art = src.resize((w, round(src.height * w / src.width)), Image.LANCZOS)
    out.paste(art, (0, round(h * centre - art.height / 2)))
    return out

def main():
    src = ImageOps.mirror(Image.open(SRC).convert('RGB'))
    # Sizes are capped by the source itself: the photograph is 2048px wide, so
    # the large desktop candidate is its native width rather than an upscale.
    # The small candidates are set just above the commonest device needs so
    # those devices take the lighter file: 1500px covers a 1440 desktop at
    # DPR 1, and 1250px covers a 390 phone at DPR 3 (1170px).
    save(landscape(src, 1500, 844),  IMG + 'hero-paint-desktop')
    save(landscape(src, 2048, 1152), IMG + 'hero-paint-desktop@2x', sharpen=True)
    save(portrait(src, 1250, 1569),  IMG + 'hero-paint-mobile')
    save(portrait(src, 1650, 2071),  IMG + 'hero-paint-mobile@2x', sharpen=True)
    print('hero built from %s (mirrored; portrait recomposed)' % SRC)

if __name__ == '__main__':
    main()
