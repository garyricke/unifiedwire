#!/usr/bin/env python3
"""
Upload the 8 print-ready spec-sheet PDFs to Cloudinary under uwc/pdfs/ for use
on the public landing at /0-spec-sheets-for-print/index.html. Stored as
resource_type="raw" — these are download-only files, no image transformations.

Public IDs include the .pdf extension; the live URL pattern is:
  https://res.cloudinary.com/dsbllwpbh/raw/upload/fl_attachment/<public_id>

Reads CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET from env. Mirrors the
corp-cap/upload-to-cloudinary.py pattern.

Usage:
  export CLOUDINARY_API_KEY=...
  export CLOUDINARY_API_SECRET=...
  python3 upload-pdfs-to-cloudinary.py
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

try:
    import cloudinary
    import cloudinary.uploader
except ImportError:
    print("error: cloudinary not installed. run: pip3 install cloudinary", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent
PDFS = ROOT / "pdfs"
CLOUD = "dsbllwpbh"

# (local filename, cloudinary public_id including .pdf extension)
UPLOADS = [
    ("UWC-01-Corporate-Capabilities-20260504-0706.pdf", "uwc/pdfs/UWC-01-Corporate-Capabilities.pdf"),
    ("UWC-02-Automotive-Marine-20260504-0706.pdf",      "uwc/pdfs/UWC-02-Automotive-Marine.pdf"),
    ("UWC-03-Building-Lighting-20260504-0706.pdf",      "uwc/pdfs/UWC-03-Building-Lighting.pdf"),
    ("UWC-04-Hookup-Wire-20260504-0716.pdf",            "uwc/pdfs/UWC-04-Hookup-Wire.pdf"),
    ("UWC-05-Power-Battery-20260504-0717.pdf",          "uwc/pdfs/UWC-05-Power-Battery.pdf"),
    ("UWC-06-Portable-Cord-20260504-0706.pdf",          "uwc/pdfs/UWC-06-Portable-Cord.pdf"),
    ("UWC-07-Medium-Voltage-20260504-0706.pdf",         "uwc/pdfs/UWC-07-Medium-Voltage.pdf"),
    ("UWC-08-Data-Center-20260504-0719.pdf",            "uwc/pdfs/UWC-08-Data-Center.pdf"),
]


def main() -> int:
    key = os.environ.get("CLOUDINARY_API_KEY")
    secret = os.environ.get("CLOUDINARY_API_SECRET")
    if not key or not secret:
        print("error: set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET", file=sys.stderr)
        return 1

    cloudinary.config(cloud_name=CLOUD, api_key=key, api_secret=secret, secure=True)

    ok = 0
    for filename, public_id in UPLOADS:
        src = PDFS / filename
        if not src.exists():
            print(f"  · {filename} missing — skipping")
            continue
        size_mb = src.stat().st_size / 1024 / 1024
        print(f"  → {public_id}  ({size_mb:.1f} MB)")
        try:
            res = cloudinary.uploader.upload(
                str(src),
                public_id=public_id,
                overwrite=True,
                resource_type="raw",
            )
            print(f"      ✓ {res.get('secure_url')}")
            ok += 1
        except Exception as exc:
            print(f"      ✗ {exc}")

    print(f"\n{ok}/{len(UPLOADS)} uploaded")
    return 0 if ok == len(UPLOADS) else 1


if __name__ == "__main__":
    sys.exit(main())
