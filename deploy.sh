#!/usr/bin/env bash
# Stage root-level assets referenced by internal pages into site/
# Runs in Netlify CI (per netlify.toml). Re-runnable locally for parity.
set -euo pipefail

SRC=.
DST=site

mkdir -p "$DST/images" "$DST/generated_imgs" "$DST/assets/banners-22apr2026/openai"

# Brand assets used by brand-guide / spec-navigator / rep-locator / truck-wrap
cp -f "$SRC/Unified-Logo-current.png"           "$DST/"           2>/dev/null || true
cp -f "$SRC/unifiedwire-favicon-apr2026.png"    "$DST/"           2>/dev/null || true

# USA250 + truck-wrap reference images
cp -f "$SRC/images/unified-america-250.svg"         "$DST/images/" 2>/dev/null || true
cp -f "$SRC/images/encore-wire-truck-reference.png" "$DST/images/" 2>/dev/null || true

# Tradeshow banner backgrounds + ribbon (referenced by tradeshow-banners-v2.html)
for f in \
  america-250-ribbon.png \
  uwc-usa-26-2026.svg \
  UWCLogoWithNameOnly.png; do
  cp -f "$SRC/assets/banners-22apr2026/$f" "$DST/assets/banners-22apr2026/" 2>/dev/null || true
done
for f in \
  bg-cat-automotive-marine.jpg \
  bg-cat-power-distribution.jpg \
  bg-cat-stadium-lighting.jpg \
  bg-data-center-a-topaz-enhance-6x.jpg \
  bg-medium-voltage-a-topaz-enhance-6x.jpg \
  bg-multi-conductor-a-topaz-enhance-6x.jpg; do
  cp -f "$SRC/assets/banners-22apr2026/openai/$f" "$DST/assets/banners-22apr2026/openai/" 2>/dev/null || true
done

# Truck-wrap concept renders
for f in \
  edited-2026-03-18T16-12-54-643Z-jo3akt.png \
  edited-2026-03-18T16-16-08-273Z-ozjz80.png \
  generated-2026-03-17T20-38-30-720Z-lr4hl8.png \
  generated-2026-03-17T20-39-18-399Z-oe8a4s.png \
  generated-2026-03-17T20-40-30-735Z-9s93l5.png \
  generated-2026-03-17T21-12-55-514Z-ktlpm3.png \
  generated-2026-03-18T16-08-40-165Z-o7edg3.png; do
  cp -f "$SRC/generated_imgs/$f" "$DST/generated_imgs/" 2>/dev/null || true
done

echo "Internal-pages assets staged in $DST/"
