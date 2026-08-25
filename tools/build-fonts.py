#!/usr/bin/env python3
"""Fetch and subset the two web faces, and the static cuts the social cards use.

Run this only when a face changes; the outputs are committed. It exists so the
files under public/fonts/ and assets/fonts/ are reproducible rather than
mystery binaries.

    pip install fonttools brotli
    python3 tools/build-fonts.py

Both families are licensed under the SIL Open Font License 1.1, which permits
self-hosting and subsetting. Licences are committed next to the outputs.

Why the axes are pinned the way they are:

  * Newsreader roman keeps its optical-size axis over 14-48 so display sizes get
    the finer cut automatically (font-optical-sizing: auto). It costs about
    32 KB over a pinned instance and it is the difference between a headline
    that looks set and one that looks scaled.
  * The italic is body copy only, so it is pinned at one optical size.
  * Inter is interface text at a narrow range of sizes, so it is pinned too.
"""

import subprocess
import sys
from pathlib import Path
from urllib.request import Request, urlopen

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
WEB = ROOT / "public" / "fonts"
CARD = ROOT / "assets" / "fonts"

# A browser UA, or the API serves the legacy TrueType stylesheet.
UA = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0 Safari/537.36"
)

# Latin-subset variable sources, taken from the css2 stylesheets for
# Newsreader (v26) and Inter (v20).
SOURCES = {
    "newsreader": "https://fonts.gstatic.com/s/newsreader/v26/cY9AfjOCX1hbuyalUrK4397yjA.woff2",
    "newsreader-italic": "https://fonts.gstatic.com/s/newsreader/v26/cY9CfjOCX1hbuyalUrK439vCjohC.woff2",
    "inter": "https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcviYwY.woff2",
}

LICENCES = {
    "Newsreader-LICENSE.txt": "https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/OFL.txt",
}

# Everything the site actually sets: ASCII, the punctuation real prose uses, and
# the accented characters a cited name or title may carry.
CHARSET = (
    "".join(chr(c) for c in range(0x20, 0x7F))
    + " "
    + "‘’“”"
    + "–—…•"
    + "©®™"
    + "·→↗×"
    + "àáâäçèéêëîï"
    + "ôöùûüñÉÈÀÇ"
    + "½¼°′″£€−"
)

# Google's latin subsets ship kerning in GPOS and ligatures in GSUB, and nothing
# else — there are no old-style figures to keep, whatever is asked for here.
# Inter's numeric feature glyphs additionally trip the variable-font subsetter.
BASE_FEATURES = ["kern", "liga", "clig", "calt", "ccmp", "locl", "mark", "mkmk"]


def fetch(url: str) -> bytes:
    with urlopen(Request(url, headers={"User-Agent": UA}), timeout=60) as r:
        return r.read()


def build(raw: Path, out: Path, axes: dict, flavor: str | None,
          features: list[str] = BASE_FEATURES) -> None:
    font = TTFont(raw)
    if axes:
        font = instancer.instantiateVariableFont(font, axes, updateFontNames=False)
    options = subset.Options()
    options.layout_features = features
    options.name_IDs = [1, 2, 3, 4, 5, 6]
    options.notdef_outline = False
    options.drop_tables += ["DSIG"]
    sub = subset.Subsetter(options=options)
    sub.populate(text=CHARSET)
    sub.subset(font)
    font.flavor = flavor
    out.parent.mkdir(parents=True, exist_ok=True)
    font.save(out)
    print(f"{out.relative_to(ROOT)}  {out.stat().st_size / 1024:.1f} KB  {axes}")


def main() -> int:
    cache = ROOT / ".font-cache"
    cache.mkdir(exist_ok=True)
    for name, url in SOURCES.items():
        raw = cache / f"{name}.woff2"
        if not raw.exists():
            raw.write_bytes(fetch(url))

    # Served to the browser.
    build(cache / "newsreader.woff2", WEB / "newsreader-latin.woff2",
          {"opsz": (14, 48), "wght": (400, 600)}, "woff2")
    build(cache / "newsreader-italic.woff2", WEB / "newsreader-latin-italic.woff2",
          {"opsz": 20, "wght": (400, 500)}, "woff2")
    build(cache / "inter.woff2", WEB / "inter-latin.woff2",
          {"opsz": 20, "wght": (400, 600)}, "woff2")

    # Build time only: satori renders the social cards from static TrueType.
    build(cache / "newsreader.woff2", CARD / "Newsreader-Regular.ttf",
          {"opsz": 44, "wght": 400}, None)
    build(cache / "newsreader.woff2", CARD / "Newsreader-SemiBold.ttf",
          {"opsz": 44, "wght": 600}, None)

    for filename, url in LICENCES.items():
        (CARD / filename).write_bytes(fetch(url))
        print(f"assets/fonts/{filename}")

    total = sum(p.stat().st_size for p in WEB.glob("*.woff2"))
    print(f"\nserved font payload: {total / 1024:.1f} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
