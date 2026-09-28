#!/usr/bin/env python3
"""Rasterise the header logo mark into the PNG/ICO favicons in site/static.

Same geometry as the mark in site/templates/layout.js (34-unit grid) and
site/static/favicon.svg. Run after changing the mark:  python3 tools/favicons.py
"""
import os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "site", "static")
INK, STONE = "#1c2427", "#f6f2ea"


def mark(size, stroke, pad=0.0, frame=True):
    """Draw the mark at `size` px. `pad` shrinks it inside a full-bleed tile
    (used for the home-screen icons, which platforms crop to a rounded square)."""
    s = size * 8  # supersample, then downscale for smooth edges
    im = Image.new("RGBA", (s, s), STONE)
    d = ImageDraw.Draw(im)
    inner = s * (1 - 2 * pad)
    k = inner / 34
    o = s * pad
    P = lambda x, y: (o + x * k, o + y * k)
    w = max(1, round(stroke * k))
    if frame:
        h = stroke / 2
        d.rounded_rectangle([*P(h, h), *P(34 - h, 34 - h)], radius=2.5 * k, outline=INK, width=w)
    d.line([P(8, 26), P(8, 14.5), P(17, 8), P(26, 14.5), P(26, 26)], fill=INK, width=w, joint="curve")
    d.rectangle([*P(14, 17), *P(20, 26)], fill=INK)
    return im.resize((size, size), Image.LANCZOS)


mark(32, 2.5).save(os.path.join(OUT, "favicon-32.png"))
mark(180, 1.6, pad=0.14).save(os.path.join(OUT, "apple-touch-icon.png"))
mark(512, 1.6, pad=0.14).save(os.path.join(OUT, "icon-512.png"))
mark(48, 2.5).save(os.path.join(OUT, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("favicons written")
