#!/usr/bin/env python3
"""Draw the favicon from the same face as the wordmark.

    python3 tools/build-favicon.py

The mark is a JV monogram set in Newsreader SemiBold, sitting under the accent
rule that runs across the top of every page and every social card. The letters
are emitted as outlines rather than as SVG text, because an SVG favicon cannot
load a webfont: as text it would render in whatever serif the reader's platform
happens to have, which is the one thing an identity mark must not do.
"""

import sys
from pathlib import Path
from xml.sax.saxutils import escape

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FACE = ROOT / "assets" / "fonts" / "Newsreader-SemiBold.ttf"
OUT = ROOT / "public" / "favicon.svg"

SIZE = 64
RULE_HEIGHT = 6
CAP_TARGET = 29.0  # cap height of the monogram, in viewBox units


def main() -> int:
    font = TTFont(FACE)
    glyph_set = font.getGlyphSet()
    upem = font["head"].unitsPerEm
    cap = font["OS/2"].sCapHeight

    names = [font.getBestCmap()[ord(c)] for c in "JV"]
    scale = CAP_TARGET / cap

    # Lay the two letters on one baseline, then centre the ink they actually
    # make rather than their advance widths: this J has a descending tail, so
    # centring on the baseline would sit the pair visibly low.
    advances = [glyph_set[n].width * scale for n in names]
    tracking = CAP_TARGET * 0.02
    ink = BoundsPen(glyph_set)
    offset = 0.0
    for name, advance in zip(names, advances):
        pen = TransformPen(ink, (scale, 0, 0, scale, offset, 0))
        glyph_set[name].draw(pen)
        offset += advance + tracking
    x_min, y_min, x_max, y_max = ink.bounds

    x = (SIZE - (x_max - x_min)) / 2 - x_min
    baseline = RULE_HEIGHT + (SIZE - RULE_HEIGHT + y_max + y_min) / 2
    paths = []
    for name, advance in zip(names, advances):
        pen = SVGPathPen(glyph_set)
        glyph_set[name].draw(pen)
        d = pen.getCommands()
        if d:
            paths.append(
                f'<path class="mark" transform="translate({x:.2f} {baseline:.2f}) '
                f'scale({scale:.5f} {-scale:.5f})" d="{escape(d)}" />'
            )
        x += advance + tracking

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" role="img" aria-label="JV">
  <style>
    .bg {{ fill: #faf8f3; }}
    .rule {{ fill: #9e3412; }}
    .mark {{ fill: #1a1c1f; }}
    @media (prefers-color-scheme: dark) {{
      .bg {{ fill: #15171b; }}
      .rule {{ fill: #f0906a; }}
      .mark {{ fill: #e9e7e2; }}
    }}
  </style>
  <defs>
    <clipPath id="corner">
      <rect width="{SIZE}" height="{SIZE}" rx="9" />
    </clipPath>
  </defs>
  <g clip-path="url(#corner)">
    <rect class="bg" width="{SIZE}" height="{SIZE}" />
    <rect class="rule" width="{SIZE}" height="{RULE_HEIGHT}" />
    {"".join(paths)}
  </g>
</svg>
"""
    OUT.write_text(svg)
    print(f"{OUT.relative_to(ROOT)}  {OUT.stat().st_size} bytes")
    return 0


if __name__ == "__main__":
    sys.exit(main())
