"""Build the hero art from the supplied photographs.

The hero used to be generated procedurally (see generate.py). It is now
derived from photographs of five impasto strokes on canvas, so this script
owns the hero assets and generate.py no longer touches them.

There are two sources, one per orientation, because one photograph cannot
serve both frames well:

  paint-desktop.png   2048x1152 (16:9)    -> desktop, 1025px and up
  paint-mobile.png    1632x2048 (0.797:1) -> mobile and tablet, up to 1024px

Only the portrait one is mirrored, and they differ because the photographs
do. Desktop puts its headline, tagline and CTA on the left, so what it needs
is empty ground on the left and the loaded ends on the right. The landscape
photograph is already composed that way — a third of clear plaster, then the
five strokes running out to the right with the brush still in frame — so it
is used as shot. The portrait photograph is the other way round, paint mass
left and dry-brush right, so it is mirrored; that also keeps the artwork
facing the same way at every width, so resizing past 1025px does not flip
the strokes end for end.

(The landscape source this replaced ran the other way and was mirrored for
exactly the same reason. Mirroring is a property of each photograph, not a
house rule.)

The portrait source needs no recomposition — it is shot in the orientation
the mobile hero renders into, so it is resized rather than cropped to shape
or laid onto a made-up ground. (The previous mobile art was the 16:9
photograph pasted low on a matching canvas colour, which was only ever a way
of not losing three of the five strokes to a crop.)

Its dead bottom margin is trimmed, though. Below 1025px the hero frame is
always narrower than the artwork, so `object-fit: cover` fits the image by
HEIGHT and crops width — which means every row of the file renders, and the
photograph's bottom 210px of bare canvas showed as an empty band under the
strokes at the foot of the hero. Trimming to the last row that carries paint
puts the burgundy on the frame's bottom edge. Nothing is discarded: the cut
is at the paint boundary, not into it.
"""
from PIL import Image, ImageOps, ImageFilter

SRC_DESKTOP = 'villa freshly painted.png'
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
    # Not mirrored — see the module docstring. The frame is 16:9 and so are
    # both desktop candidates, so fit() is a plain resize here: nothing is
    # cropped and the brush stays in shot.
    d = Image.open(SRC_DESKTOP).convert('RGB')
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
    # PAINT_BOTTOM is the last row of the portrait source carrying pigment,
    # measured off the file rather than eyeballed. Everything below it is
    # bare canvas, and below 1025px every row renders (see the module
    # docstring), so it would show as an empty band under the strokes.
    # Trimming it takes the source from 0.797:1 to 0.888:1; the srcset width
    # descriptors are unchanged, so image selection is unaffected.
    PAINT_BOTTOM = 1838
    m = ImageOps.mirror(Image.open(SRC_MOBILE).convert('RGB'))
    m = m.crop((0, 0, m.width, PAINT_BOTTOM))
    save(fit(m,  850,  957), IMG + 'hero-paint-mobile@sm', q=76)
    save(fit(m, 1250, 1408), IMG + 'hero-paint-mobile',    q=76)
    save(fit(m, 1632, 1838), IMG + 'hero-paint-mobile@2x', q=76, sharpen=True)

    print('hero built: desktop from %s (as shot), mobile/tablet from %s (mirrored)'
          % (SRC_DESKTOP, SRC_MOBILE))

if __name__ == '__main__':
    main()
