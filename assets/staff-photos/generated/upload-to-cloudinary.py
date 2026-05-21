#!/usr/bin/env python3
"""
Upload generated on-location staff portraits to Cloudinary under uwc/.

Reads CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET from env. Each upload is
followed by an explicit eager transform so the f_auto,q_auto:good,w_800,
c_fill,g_face variant is pre-generated and the CDN serves it instantly.

Usage:
  export CLOUDINARY_API_KEY=...
  export CLOUDINARY_API_SECRET=...
  python3 upload-to-cloudinary.py
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

try:
    import cloudinary
    import cloudinary.uploader
    import cloudinary.api
except ImportError:
    print("error: cloudinary not installed. run: pip3 install cloudinary", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent
CLOUD = "dsbllwpbh"
EAGER = "f_auto,q_auto:good,w_800,c_fill,g_face"

UPLOADS = [
    ("brittany-hughes-onsite.png",   "uwc/brittany-hughes-profile-square"),
    ("daniela-troconiz-onsite.png",  "uwc/daniela-troconiz-profile-square"),
    ("ebaa-albarbarawi-onsite.png",  "uwc/ebaa-albarbarawi-profile-square"),
    ("gabriel-ferguson-onsite.png",  "uwc/gabriel-ferguson-profile-square"),
    ("john-nelson-onsite.png",       "uwc/john-nelson-profile-square"),
    ("les-tucker-onsite.png",        "uwc/les-tucker-profile-square"),
    ("tina-fant-onsite.png",         "uwc/tina-fant-profile-square"),
    ("tom-bushman-onsite.png",       "uwc/tom-bushman-profile-square"),
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
        src = ROOT / filename
        if not src.exists():
            print(f"  · {filename} missing — skipping")
            continue
        print(f"  → {public_id}")
        try:
            cloudinary.uploader.upload(
                str(src),
                public_id=public_id,
                overwrite=True,
                eager=[{"raw_transformation": EAGER}],
                resource_type="image",
            )
            print(f"      ✓ uploaded + eager-transformed ({EAGER})")
            ok += 1
        except Exception as exc:
            print(f"      ✗ {exc}")

    print(f"\n{ok}/{len(UPLOADS)} uploaded")
    return 0


if __name__ == "__main__":
    sys.exit(main())
