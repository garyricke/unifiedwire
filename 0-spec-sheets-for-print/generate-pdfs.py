#!/usr/bin/env python3
"""
Generate print-ready PDFs from every spec-sheet-*.html file using Chrome headless.
Each PDF gets a YYYYMMDD-HHMM timestamp in its filename.
After generating, this script updates index.html to point each "Download PDF"
link to the new file. Re-run anytime to bump versions.

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
    ("spec-sheet-01-corporate.html",         "01-Corporate-Capabilities"),
    ("spec-sheet-02-automotive-marine.html", "02-Automotive-Marine"),
    ("spec-sheet-03-building-lighting.html", "03-Building-Lighting"),
    ("spec-sheet-04-hookup.html",            "04-Hookup-Wire"),
    ("spec-sheet-05-power-battery.html",     "05-Power-Battery"),
    ("spec-sheet-06-specialty-cords.html",   "06-Specialty-Cords"),
    ("spec-sheet-07-custom-oem.html",        "07-Custom-OEM"),
    ("spec-sheet-08-medium-voltage.html",    "08-Medium-Voltage"),
    ("spec-sheet-09-data-center.html",       "09-Data-Center"),
]


def main() -> int:
    if not Path(CHROME).exists():
        print(f"error: Chrome not found at {CHROME}", file=sys.stderr)
        return 1

    PDFS_DIR.mkdir(exist_ok=True)
    ts = datetime.now().strftime("%Y%m%d-%H%M")
    print(f"Spec-sheet PDF build · timestamp {ts}\n")

    generated: list[tuple[str, str, str]] = []

    for html_file, slug in SHEETS:
        src = ROOT / html_file
        if not src.exists():
            print(f"  · {html_file} missing — skipping")
            continue
        pdf_name = f"UWC-{slug}-{ts}.pdf"
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

    # Update the landing page so each Download-PDF link points to the new file.
    # We look for any pdfs/UWC-{slug}-YYYYMMDD-HHMM.pdf reference and rewrite it.
    if INDEX.exists() and generated:
        html = INDEX.read_text()
        original = html
        for _, slug, pdf_name in generated:
            pattern = rf"pdfs/UWC-{re.escape(slug)}-\d{{8}}-\d{{4}}\.pdf"
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
