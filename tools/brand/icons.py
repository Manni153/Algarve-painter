#!/usr/bin/env python3
"""Draw one illustrated icon per service.

    python3 tools/brand/icons.py

Writes src/assets/brand/icon-<slug>.svg. These replace seven line glyphs that
were all the same house outline with a different squiggle inside it — the
single most template-looking thing left on the page, and the thing a visitor
scanning the services grid actually looks at.

Each icon is a drawn object rather than a pictogram: flat fills from the page
palette, a heavy ink keyline to match the mascot, and enough of the real
thing in it that you could name the service with the label covered. They are
filled shapes, not strokes, so they hold up on the coloured tiles the cards
put them on.
"""
INK    = '#3a241a'
CREAM  = '#fbf4e8'
WHITE  = '#fffdf7'
TERRA  = '#c25a38'
OCHRE  = '#d9a02b'
BLUE   = '#4c7593'
ROSE   = '#d9a08c'
OLIVE  = '#6b7d55'
WOOD   = '#a9764a'
STEEL  = '#8d9aa3'

V = 64
K = 2.6   # keyline weight


def head(extra=''):
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="44" height="44" '
            'aria-hidden="true" focusable="false"%s>'
            '<g stroke="%s" stroke-width="%.1f" stroke-linejoin="round" stroke-linecap="round">'
            % (V, V, extra, INK, K))


TAIL = '</g></svg>'


def roller(x, y, a=0, colour=TERRA):
    """A roller head on a bent handle — the tool that says 'painting' faster
    than a brush does, because a brush also says 'art'."""
    return ('<g transform="rotate(%d %d %d)">'
            '<rect x="%d" y="%d" width="20" height="9" rx="3" fill="%s"/>'
            '<path d="M %d %d h 6 v 9" fill="none"/>'
            '<path d="M %d %d v 11" fill="none"/>'
            '</g>' % (a, x, y, x, y, colour, x + 20, y + 3, x + 26, y + 12))


def brush(x, y, a=0, bristle=OCHRE):
    return ('<g transform="rotate(%d %d %d)">'
            '<rect x="%d" y="%d" width="9" height="17" rx="3" fill="%s"/>'
            '<rect x="%d" y="%d" width="11" height="6" fill="%s"/>'
            '<path d="M %d %d h 11 v 9 h -11 z" fill="%s"/>'
            '</g>' % (a, x, y, x, y, WOOD, x - 1, y + 17, CREAM, x - 1, y + 23, bristle))


ICONS = {}

# 1. Exterior house painting — a facade, half of it freshly rolled
ICONS['exterior-house-painting'] = (
    '<path d="M 8 28 L 32 11 L 56 28 V 56 H 8 Z" fill="%s"/>'
    '<path d="M 32 11 L 56 28 V 56 H 32 Z" fill="%s"/>'
    '<rect x="16" y="34" width="10" height="10" rx="1.5" fill="%s"/>'
    '<rect x="38" y="34" width="10" height="10" rx="1.5" fill="%s"/>'
    '<path d="M 8 28 L 32 11 L 56 28" fill="none"/>'
    % (WHITE, ROSE, BLUE, BLUE)) + roller(20, 16, -18)

# 2. Interior painting — a room corner, one wall done
ICONS['interior-painting'] = (
    '<path d="M 9 12 H 55 V 52 H 9 Z" fill="%s"/>'
    '<path d="M 32 12 H 55 V 52 H 32 Z" fill="%s"/>'
    '<path d="M 9 52 H 55" fill="none"/>'
    '<rect x="14" y="20" width="14" height="18" rx="2" fill="%s"/>'
    % (CREAM, OCHRE, ROSE)) + roller(30, 22, 0, TERRA)

# 3. Villa and pool area — water, a parasol and the terrace edge
ICONS['villa-pool-area-painting'] = (
    '<path d="M 6 34 H 58 V 56 H 6 Z" fill="%s"/>'
    '<path d="M 6 40 q 7 -5 13 0 t 13 0 t 13 0 t 13 0" fill="none" stroke="%s" stroke-width="2.2"/>'
    '<path d="M 6 48 q 7 -5 13 0 t 13 0 t 13 0 t 13 0" fill="none" stroke="%s" stroke-width="2.2"/>'
    '<path d="M 6 34 H 58" fill="none"/>'
    '<path d="M 44 8 v 26" fill="none"/>'
    '<path d="M 28 20 q 16 -16 32 0 z" fill="%s"/>'
    % (BLUE, CREAM, CREAM, TERRA))

# 4. Render and crack repair — a cracked wall and a filling knife
ICONS['render-crack-repair'] = (
    '<path d="M 10 10 H 54 V 54 H 10 Z" fill="%s"/>'
    '<path d="M 30 10 L 25 24 L 34 30 L 27 42 L 33 54" fill="none" stroke="%s" stroke-width="3.4"/>'
    '<path d="M 40 22 L 54 22 L 54 34 L 40 34 Z" fill="%s"/>'
    '<path d="M 46 34 h 4 v 14 h -4 z" fill="%s"/>'
    % (CREAM, TERRA, STEEL, WOOD))

# 5. Wood and shutter treatment — a louvred shutter mid-coat
ICONS['wood-shutter-treatment'] = (
    '<path d="M 12 10 H 52 V 54 H 12 Z" fill="%s"/>'
    '<path d="M 32 10 H 52 V 54 H 32 Z" fill="%s"/>'
    + ''.join('<path d="M 16 %d H 48" fill="none" stroke="%s" stroke-width="2.4"/>' % (y, INK)
              for y in range(18, 52, 7))
    ) % (WOOD, OLIVE) + brush(20, 6, 12)

# 6. Metalwork and railings — balusters and a fresh coat
ICONS['metalwork-railing-painting'] = (
    '<path d="M 8 18 H 56 V 24 H 8 Z" fill="%s"/>'
    '<path d="M 8 50 H 56 V 56 H 8 Z" fill="%s"/>'
    + ''.join('<path d="M %d 24 v 26" fill="none" stroke="%s" stroke-width="4"/>' % (x, STEEL)
              for x in (16, 26, 36, 46))
    + '<circle cx="26" cy="37" r="5" fill="%s"/>'
      '<circle cx="46" cy="37" r="5" fill="%s"/>'
    ) % (STEEL, STEEL, TERRA, TERRA) + brush(46, 4, 20, TERRA)

# 7. Waterproof and roof coating — a flat roof taking a coat, water beading off
ICONS['waterproof-roof-coating'] = (
    '<path d="M 6 30 L 32 16 L 58 30 V 36 H 6 Z" fill="%s"/>'
    '<path d="M 10 36 H 54 V 56 H 10 Z" fill="%s"/>'
    '<path d="M 32 16 L 58 30" fill="none"/>'
    '<path d="M 20 44 q 5 -9 10 0 a 5 5 0 0 1 -10 0 z" fill="%s"/>'
    '<path d="M 38 46 q 4 -7 8 0 a 4 4 0 0 1 -8 0 z" fill="%s"/>'
    % (TERRA, CREAM, BLUE, BLUE)) + roller(16, 8, -12, OCHRE)


if __name__ == '__main__':
    for slug, body in ICONS.items():
        open('src/assets/brand/icon-%s.svg' % slug, 'w').write(head() + body + TAIL)
    print('%d service icons' % len(ICONS))
