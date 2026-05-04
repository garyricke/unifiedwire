#!/usr/bin/env python3
"""
Generate print-ready PDFs from every concept-*.html file using Chrome headless.
Each PDF gets a YYYYMMDD-HHMM timestamp in its filename.
After generating, rewrites index.html so each "PDF" link points at the new file.
Re-run anytime to bump versions.

Usage: python3 generate-pdfs.py
"""
from __future__ import annotations

import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PDFS_DIR = ROOT / "pdfs"
INDEX = ROOT / "index.html"

# (html filename, slug used in PDF filename)
SHEETS = [
    ("concept-a1-nano.html",   "A1-Nano"),
    ("concept-a2-openai.html", "A2-OpenAI"),
    ("concept-b1-nano.html",   "B1-Nano"),
    ("concept-b2-openai.html", "B2-OpenAI"),
    ("concept-c1-nano.html",   "C1-Nano"),
    ("concept-c2-openai.html", "C2-OpenAI"),
    ("concept-d1-nano.html",   "D1-Nano"),
    ("concept-d2-openai.html", "D2-OpenAI"),
    ("concept-e1-nano.html",   "E1-Nano"),
    ("concept-e2-openai.html", "E2-OpenAI"),
]


def main() -> int:
    if not Path(CHROME).exists():
        print(f"error: Chrome not found at {CHROME}", file=sys.stderr)
        return 1

    PDFS_DIR.mkdir(exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d-%H%M")
    print(f"AirPods giveaway PDF build · timestamp {ts}\n")

    generated: list[tuple[str, str, str]] = []

    for html_file, slug in SHEETS:
        src = ROOT / html_file
        if not src.exists():
            print(f"  · {html_file} missing — skipping")
            continue
        pdf_name = f"UWC-Airpods-{slug}-{ts}.pdf"
        pdf_path = PDFS_DIR / pdf_name

        print(f"  → {pdf_name}")
        result = subprocess.run(
            [
                CHROME,
                "--headless=new",
                "--disable-gpu",
                "--no-pdf-header-footer",
                f"--print-to-pdf={pdf_path}",
                f"file://{src}",
            ],
            capture_output=True,
            text=True,
        )

        if result.returncode == 0 and pdf_path.exists():
            size_kb = pdf_path.stat().st_size // 1024
            print(f"      ✓ saved ({size_kb:,} KB)")
            generated.append((html_file, slug, pdf_name))
        else:
            print(f"      ✗ error: {result.stderr.strip() or 'unknown'}")

    # Update index.html — rewrite any pdfs/UWC-Airpods-{slug}-* link (or PLACEHOLDER) to the new file.
    if INDEX.exists() and generated:
        html = INDEX.read_text()
        original = html
        for _, slug, pdf_name in generated:
            # Match either a previous timestamped filename or the initial PLACEHOLDER.
            pattern = rf"pdfs/UWC-Airpods-{re.escape(slug)}-(?:\d{{8}}-\d{{4}}|PLACEHOLDER)\.pdf"
            replacement = f"pdfs/{pdf_name}"
            html, n = re.subn(pattern, replacement, html)
            if n == 0:
                print(
                    f"  · note: no existing {slug} PDF link found in index.html "
                    "(add one to make it auto-update next run)"
                )
        if html != original:
            INDEX.write_text(html)
            print(f"\n✓ updated {INDEX.name}")
        else:
            print(f"\n· {INDEX.name} already up-to-date")

    print(f"\n{len(generated)}/{len(SHEETS)} PDFs in {PDFS_DIR.relative_to(ROOT)}/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
