#!/usr/bin/env python3
"""
Render PNG thumbnails for each concept-*.html sheet at 2x device-scale-factor.
Used by index.html gallery.

Usage: python3 generate-thumbs.py
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
THUMBS_DIR = ROOT / "images" / "thumbs"

# 8.5" × 11" at 96dpi = 816 × 1056. Bump height to absorb any browser-chrome
# reservation in headless Chrome — the page is `overflow: hidden` so extra
# vertical room just shows a tiny strip of body background, never clips content.
WINDOW_W = 816
WINDOW_H = 1080

SHEETS = [
    "concept-a1-nano",
    "concept-a2-openai",
    "concept-b1-nano",
    "concept-b2-openai",
    "concept-c1-nano",
    "concept-c2-openai",
    "concept-d1-nano",
    "concept-d2-openai",
    "concept-e1-nano",
    "concept-e2-openai",
]


def main() -> int:
    if not Path(CHROME).exists():
        print(f"error: Chrome not found at {CHROME}", file=sys.stderr)
        return 1

    THUMBS_DIR.mkdir(parents=True, exist_ok=True)
    print(f"AirPods giveaway thumbnail build → {THUMBS_DIR.relative_to(ROOT)}/\n")

    ok = 0
    for slug in SHEETS:
        src = ROOT / f"{slug}.html"
        if not src.exists():
            print(f"  · {slug}.html missing — skipping")
            continue
        out = THUMBS_DIR / f"{slug}.png"
        print(f"  → {out.name}")
        result = subprocess.run(
            [
                CHROME,
                "--headless=new",
                "--disable-gpu",
                "--hide-scrollbars",
                "--force-device-scale-factor=2",
                f"--window-size={WINDOW_W},{WINDOW_H}",
                f"--screenshot={out}",
                f"file://{src}",
            ],
            capture_output=True,
            text=True,
        )
        if result.returncode == 0 and out.exists():
            ok += 1
            kb = out.stat().st_size // 1024
            print(f"      ✓ saved ({kb:,} KB)")
        else:
            print(f"      ✗ error: {result.stderr.strip() or 'unknown'}")

    print(f"\n{ok}/{len(SHEETS)} thumbnails generated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
