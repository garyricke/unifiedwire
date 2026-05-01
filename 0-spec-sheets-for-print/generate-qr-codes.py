#!/usr/bin/env python3
"""Generate branded QR codes for the 10 detailed spec-sheet web pages.

Each QR points to https://unifiedwire.com/spec-sheet-{slug} and embeds the
UWC logo in the center. Uses error-correction level H (~30% redundancy) so
the central logo doesn't break scannability.

Output: 0-spec-sheets-for-print/qr-codes/qr-spec-sheet-{slug}.png
"""

import os
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image

REPO_ROOT  = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
LOGO_PATH  = os.path.join(REPO_ROOT, "Unified-Logo-current.png")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "qr-codes")
BASE_URL   = "https://unifiedwire.com"

SLUGS = [
    "spec-sheet-gpt",
    "spec-sheet-gxl",
    "spec-sheet-gptm",
    "spec-sheet-1007",
    "spec-sheet-1015",
    "spec-sheet-tfn-tffn",
    "spec-sheet-thhn-mtw-thwn-2",
    "spec-sheet-xhhw-sis",
    "spec-sheet-sjtoow",
    "spec-sheet-mv-15kv-cu",
    "spec-sheet-mv-15kv-al",
    "spec-sheet-mv-25kv-al",
    "spec-sheet-mv-35kv-al",
]

# QR rendering knobs
BOX_SIZE       = 24
BORDER_MODULES = 4
LOGO_WIDTH_PCT = 0.22   # logo width as fraction of QR width
PLATE_PAD_PX   = 14     # white plate margin around the logo


def make_qr(url: str, logo: Image.Image) -> Image.Image:
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=BOX_SIZE,
        border=BORDER_MODULES,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white").convert("RGBA")
    qr_w, qr_h = img.size

    # Resize the logo while preserving aspect ratio
    logo_w = int(qr_w * LOGO_WIDTH_PCT)
    logo_h = int(logo_w * (logo.height / logo.width))
    logo_resized = logo.resize((logo_w, logo_h), Image.LANCZOS)

    # White plate behind the logo so the cluster of dark modules doesn't bleed through
    plate_w = logo_w + PLATE_PAD_PX * 2
    plate_h = logo_h + PLATE_PAD_PX * 2
    plate = Image.new("RGBA", (plate_w, plate_h), (255, 255, 255, 255))
    img.paste(plate, ((qr_w - plate_w) // 2, (qr_h - plate_h) // 2), plate)

    # Logo on top of plate
    img.paste(logo_resized, ((qr_w - logo_w) // 2, (qr_h - logo_h) // 2), logo_resized)

    return img


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    logo = Image.open(LOGO_PATH).convert("RGBA")

    for slug in SLUGS:
        url = f"{BASE_URL}/{slug}"
        img = make_qr(url, logo)
        out = os.path.join(OUTPUT_DIR, f"qr-{slug}.png")
        img.save(out)
        print(f"  {img.size[0]}x{img.size[1]}  {url}  ->  {os.path.relpath(out, REPO_ROOT)}")

    print(f"\nGenerated {len(SLUGS)} QR codes in {os.path.relpath(OUTPUT_DIR, REPO_ROOT)}/")


if __name__ == "__main__":
    main()
