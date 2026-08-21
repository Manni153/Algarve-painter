"""Impasto brush-stroke engine.

A stroke is built from individual bristle lanes rather than as one solid
silhouette: each lane carries its own paint load, drops out at its own point
along the drag, and sits at its own offset. That is what produces real
dry-brush skips, a splayed tail and irregular (non-periodic) edges. The
combined alpha is then shaded with tonal variation, groove light and a
directional impasto ridge."""
import numpy as np, math
from PIL import Image, ImageFilter

def _noise(w, h, octaves=5, base=6, rng=None):
    rng = rng or np.random
    out = np.zeros((h, w), np.float32); amp = 1.0; tot = 0.0
    for o in range(octaves):
        gw = max(2, base << o); gh = max(2, int(base * h / max(w, 1)) << o)
        g = (rng.rand(gh, gw) * 255).astype(np.uint8)
        layer = np.asarray(Image.fromarray(g).resize((w, h), Image.BICUBIC), np.float32) / 255.0
        out += layer * amp; tot += amp; amp *= 0.5
    return out / tot

def _smooth1d(v, sigma):
    n = len(v); r = max(1, int(sigma * 3))
    k = np.exp(-0.5 * (np.arange(-r, r + 1) / sigma) ** 2); k /= k.sum()
    return np.convolve(np.pad(v, r, mode='edge'), k, mode='same')[r:r + n]

def stroke(w, h, colour, seed=0, arc=0.10, load=0.85, thickness=0.74, solid=False):
    rng = np.random.RandomState(seed)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    t = np.linspace(0, 1, w).astype(np.float32)

    centre = h * 0.5 + arc * h * 0.5 * np.sin(t * math.pi)
    centre += _smooth1d((rng.rand(w) - 0.5) * h * 0.10, w * 0.06)

    # rounded where the brush is set down, tapering slightly toward the tail
    prof = np.sqrt(np.clip(t / (0.020 if solid else 0.045), 0, 1))
    if not solid:
        prof = prof * (1 - 0.28 * np.clip((t - 0.55) / 0.45, 0, 1) ** 1.6)
    else:
        prof = prof * np.sqrt(np.clip((1 - t) / 0.020, 0, 1))   # rounded at both ends
    half = (h * thickness * 0.5) * prof
    half *= (0.90 + 0.15 * _smooth1d(rng.rand(w), w * 0.05)) if solid else (0.86 + 0.28 * _smooth1d(rng.rand(w), w * 0.05))
    # high-frequency raggedness on the outer envelope — paint edges are
    # irregular at every scale, and a slowly-varying envelope reads as tape
    ragged_amp = 0.13   # solid keeps the same ragged edge as any other stroke; it is opaque, not clean
    ragged_t = 1 + ragged_amp * _smooth1d(rng.rand(w) - 0.5, max(1.5, w * 0.004)) * 2.4
    ragged_b = 1 + ragged_amp * _smooth1d(rng.rand(w) - 0.5, max(1.5, w * 0.004)) * 2.4

    # ---- bristle lanes ----------------------------------------------------
    lanes = max(18, int(h / 5))
    lane_y = np.linspace(-1, 1, lanes)
    lane_load = 0.35 + 0.65 * _smooth1d(rng.rand(lanes), 1.2)      # how much paint each carries
    lane_dry = 0.30 + 0.85 * rng.rand(lanes)                        # where it runs out
    lane_off = _smooth1d((rng.rand(lanes) - 0.5), 1.0) * 0.16

    a = np.zeros((h, w), np.float32)
    for i in range(lanes):
        band_c = centre + (lane_y[i] + lane_off[i]) * half
        band_h = np.maximum(half * (1.35 / lanes) * 2.6, 0.9)
        d = np.abs(yy - band_c[None, :]) / band_h[None, :]
        lane = np.clip(1.25 - d, 0, 1)
        alive = np.ones((1, w), np.float32) if solid else np.clip(1 - (t[None, :] - lane_dry[i] * load) / 0.30, 0, 1)
        alive = np.clip(alive + (lane_load[i] - 0.5) * 0.8, 0, 1)
        a = np.maximum(a, lane * alive * (0.55 + 0.65 * lane_load[i]))
    up = np.maximum(half * ragged_t, 1e-3)[None, :]
    dn = np.maximum(half * ragged_b, 1e-3)[None, :]
    dv = yy - centre[None, :]
    out = np.where(dv < 0, -dv / up, dv / dn)
    a *= np.clip(1 - np.clip(out - 1.0, 0, 1) * 7, 0, 1)

    grain = _noise(w, h, 4, 12, rng)
    a *= np.clip(0.82 + 0.40 * grain, 0, 1)
    a = np.clip(a * 1.95, 0, 1)

    # ---- smudge -----------------------------------------------------------
    # Pressed, finger-worked paint has no clean boundary: the silhouette is
    # softened, then given back a little bite so it reads as blended pigment
    # rather than an airbrush cloud. This happens before shading so the body
    # and the edge are lit as one mass.
    a = np.asarray(Image.fromarray((a * 255).astype(np.uint8))
                   .filter(ImageFilter.GaussianBlur(max(1.4, h * 0.032))), np.float32) / 255.0
    a = np.clip((a - 0.11) / 0.72, 0, 1)

    # Broad, low-frequency density variation — where the swatch was pressed
    # thin and where the pigment pooled.
    press = _noise(max(5, w // 34), max(4, h // 7), 3, 3, rng)
    press = np.asarray(Image.fromarray((press * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC), np.float32) / 255.0
    # Opacity modulation is kept deliberately shallow. Thinning the alpha
    # over a light canvas is what drains a pigment: the cream reads through
    # and the stroke goes pastel. The worked, pressed character comes from
    # varying the COLOUR through the body instead (below), which keeps the
    # stroke opaque and therefore rich while still looking hand-laid.
    tooth_n = _noise(w, h, 4, 14, rng)
    if solid:
        a = np.clip(a * (0.90 + 0.13 * press) * (0.93 + 0.09 * tooth_n) * 1.40, 0, 1)
    else:
        a = np.clip(a * (0.90 + 0.13 * press) * (0.94 + 0.08 * tooth_n) * 1.12, 0, 1)

    # ---- body shading -----------------------------------------------------
    # Matte, not glossy: the pigment is knocked back toward a warm grey and
    # lit only by broad, soft variation. No specular rim — a bright edge
    # highlight is what made the earlier strokes read as motion graphics.
    base = np.array(colour, np.float32)
    # A trace of warm grey only — enough to take the plastic edge off a
    # saturated pigment, far short of desaturating it. The previous pass
    # mixed in 12% and that, compounded with thinned alpha, is what turned
    # the set pastel.
    grey = float(base @ np.array([0.299, 0.587, 0.114], np.float32))
    base = base * 0.97 + np.array([grey * 1.03, grey * 0.98, grey * 0.91], np.float32) * 0.03

    tone = _noise(w, h, 5, 5, rng)
    amp = 0.26
    body = base[None, None, :] * ((1.0 - amp * 0.5) + amp * tone[..., None])
    body *= 0.91 + 0.18 * press[..., None]

    # Striations survive, but blurred and shallow — worked into the paint
    # rather than dragged across the top of it.
    drag = _noise(max(8, w // 18), h, 3, 5, rng)
    drag = np.asarray(Image.fromarray((drag * 255).astype(np.uint8))
                      .resize((w, h), Image.BILINEAR)
                      .filter(ImageFilter.GaussianBlur(max(1.0, h * 0.010))), np.float32) / 255.0
    body *= (0.95 + 0.11 * drag[..., None])

    lanes_light = np.zeros((h, w), np.float32)
    for i in range(lanes):
        band_c = centre + (lane_y[i] + lane_off[i]) * half
        lanes_light += np.exp(-((yy - band_c[None, :]) ** 2) / (2 * (max(h * 0.018, 1)) ** 2)) * (lane_load[i] - 0.5)
    body *= (1 + np.clip(lanes_light, -1, 1)[..., None] * 0.12)

    # A single soft cross-stroke gradient stands in for form. Deliberately
    # much weaker than the old edge-gradient lighting, and with no positive
    # highlight term at all.
    blur = np.asarray(Image.fromarray((a * 255).astype(np.uint8))
                      .filter(ImageFilter.GaussianBlur(max(2.5, h * 0.06))), np.float32) / 255.0
    body *= (0.95 + 0.07 * blur[..., None])

    # Soften the pigment itself, so colour bleeds slightly across the body
    # the way worked paint does.
    body = np.asarray(Image.fromarray(np.clip(body, 0, 255).astype(np.uint8))
                      .filter(ImageFilter.GaussianBlur(max(0.6, h * 0.006))), np.float32)

    return Image.fromarray(np.dstack([np.clip(body, 0, 255), a * 255]).astype(np.uint8), 'RGBA')

def canvas(w, h, colour, seed=0, tooth=0.12):
    rng = np.random.RandomState(seed)
    base = np.array(colour, np.float32)
    fine = _noise(w, h, 3, 40, rng); broad = _noise(w, h, 5, 5, rng)
    field = base[None, None, :] * (1 - tooth * 0.5 + tooth * (0.45 * broad + 0.55 * fine)[..., None] * 1.1)
    g = np.mgrid[0:h, 0:w]
    weave = (np.sin(g[1] * 1.9) * np.sin(g[0] * 1.9)).astype(np.float32)
    field *= (1 + weave[..., None] * 0.013)
    return Image.fromarray(np.clip(field, 0, 255).astype(np.uint8))


def dither(im, amount=1.6, seed=0):
    """Fine per-pixel noise applied before encoding.

    The strokes are large, smooth tonal fields, which is exactly what 8-bit
    quantisation turns into visible banding. A sub-perceptual amount of noise
    breaks the banding up and costs a few KB."""
    rng = np.random.RandomState(seed)
    a = np.asarray(im.convert('RGB'), np.float32)
    a += (rng.rand(*a.shape).astype(np.float32) - 0.5) * 2.0 * amount
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
