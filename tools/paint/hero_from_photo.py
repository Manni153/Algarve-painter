"""Build the hero art from the supplied photographs.

The hero used to be generated procedurally (see generate.py). It is now
derived from photographs of five impasto strokes on canvas, so this script
owns the hero assets and generate.py no longer touches them.

There are two sources, one per orientation, because one photograph cannot
serve both frames well:

  paint example.png   2048x1152 (16:9)    -> desktop, 1025px and up
  paint-mobile.png    1632x2048 (0.797:1) -> mobile and tablet, up to 1024px

Both are mirrored. The paint mass sits on the LEFT of each photograph and
dry-brushes out to bare canvas on the right. Desktop puts its headline,
tagline and CTA on the left, so unmirrored every word would sit on thick
opaque pigment; mirrored, the faded dry end falls under the text and the
loaded ends occupy the right half. Mobile stacks its text above the image
rather than beside it, so the argument there is weaker — but mirroring it
too keeps the artwork facing the same way at every width, so resizing past
1025px does not flip the strokes end for end.

The portrait source needs no recomposition: it is already 0.797:1, the exact
frame the mobile hero renders into, so it is resized rather than cropped or
laid onto a made-up ground. (The previous mobile art was the 16:9 photograph
pasted low on a matching canvas colour, which was only ever a way of not
losing three of the five strokes to a crop.)
"""
from PIL import Image, ImageOps, ImageFilter

SRC_DESKTOP = 'paint example.png'
SRC_MOBILE = 'paint-mobile.png'
IMG = 'src/assets/images/'

def save(im, path, q=82, sharpen=False):
    """No dither here, unlike the generated art: a photograph already carries
    its own film/canvas grain, so there is nothing to break up and the noise
    only costs bytes. Quality is lower for the same reason — the texture
    masks compression that would show on a flat generated field."""
    if sharpen:
        # The landscape source is 2048px wide, so on a high-DPI desktop the
        # largest candidate is still being upscaled by the browser (1.9x at
        # 1920 DPR 2). A light unsharp mask before encoding recovers some of
        # the crispness that upscale costs. It cannot add detail that is not
        # in the source — a higher-resolution original is the real fix.
        im = im.filter(ImageFilter.UnsharpMask(radius=1.1, percent=55, threshold=3))
    im.save(path + '.jpg', quality=q, optimize=True, progressive=True)
    im.save(path + '.webp', quality=q, method=6)

def fit(src, w, h):
    """Cover-crop to the requested frame. A no-op crop when the aspect
    already matches, which is the case for the portrait source."""
    return ImageOps.fit(src, (w, h), Image.LANCZOS, centering=(0.5, 0.5))

def main():
    # Sizes are capped by the sources themselves: each large candidate is its
    # photograph's native size rather than an upscale. The small candidates
    # sit just above the commonest device needs so those devices take the
    # lighter file: 1500px covers a 1440 desktop at DPR 1, and 1250px covers
    # a 390 phone at DPR 3 (1170px).
    d = ImageOps.mirror(Image.open(SRC_DESKTOP).convert('RGB'))
    save(fit(d, 1500, 844),  IMG + 'hero-paint-desktop')
    save(fit(d, 2048, 1152), IMG + 'hero-paint-desktop@2x', sharpen=True)

    # Three candidates below 1025px, not two. The portrait source is
    # photographic edge to edge, where the art it replaces was the landscape
    # photo pasted onto a flat synthetic ground — half the old frame was a
    # near-uniform colour that cost almost nothing to encode. Like for like
    # the new 1250px file is roughly three times the weight, and this is the
    # LCP image on the platform least able to afford it. An 850px candidate
    # takes the DPR-2 phones (a 390pt screen needs 780px), which is most of
    # them, and leaves 1250px to DPR 3.
    #
    # Quality drops to 76 for the same reason. The dry-brush grain and canvas
    # tooth run through the whole frame and mask webp artefacts completely —
    # compared side by side at 1:1 against q82, no difference is visible —
    # while the flat pigment fields that would show banding are exactly where
    # the encoder spends least. Desktop is untouched at q82.
    m = ImageOps.mirror(Image.open(SRC_MOBILE).convert('RGB'))
    save(fit(m,  850, 1067), IMG + 'hero-paint-mobile@sm', q=76)
    save(fit(m, 1250, 1569), IMG + 'hero-paint-mobile',    q=76)
    save(fit(m, 1632, 2048), IMG + 'hero-paint-mobile@2x', q=76, sharpen=True)

    print('hero built: desktop from %s, mobile/tablet from %s (both mirrored)'
          % (SRC_DESKTOP, SRC_MOBILE))

if __name__ == '__main__':
    main()
