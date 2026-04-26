# UWC Banner Print Export

Renders print-ready PDFs from `tradeshow-banners-v2.html` at exactly **33″ × 81″** with full-resolution backgrounds and embedded fonts, using headless Chromium (Playwright).

## Print specs (from client)

- Trim size: **33″ × 81″**
- Safety margins: **1″ top, 3″ bottom** — already designed into the CSS
- No bleed required beyond the artwork
- Backgrounds print at native image resolution
- Fonts (Barlow Condensed, DM Sans) embedded by Chromium

## One-time setup

```sh
cd print-export
npm install
npx playwright install chromium
```

(`npx playwright install chromium` downloads the browser binary the script drives — only needed once per machine.)

## Export all 12 banner concepts

```sh
npm run export
```

Output PDFs land in `print-export/exports/` with descriptive filenames, e.g.
`01a-data-center-server-aisle.pdf`, `05b-single-conductor-yellow-jacket.pdf`.

## Export only approved concepts

Pass banner IDs as arguments — useful once the client locks in their picks:

```sh
node export-banners.js banner-01c banner-02a banner-03 banner-04a banner-05a banner-06
```

Matches by `id` (`banner-01a`) or by descriptive `file` name
(`01a-data-center-server-aisle`).

## Also export raster fallback (`--png`)

If a printer rejects the PDF, the `--png` flag also writes a 150 DPI PNG
(**4,950 × 12,150 px**) alongside each PDF:

```sh
node export-banners.js --png
node export-banners.js --png banner-01c banner-05a
```

PNG files are large (typically 30–60 MB each, depending on imagery). Only
generate them when needed.

## Preview a single banner at print size in the browser

Append `?print=<banner-id>` to the URL. The page strips all chrome and renders
just the targeted banner at 33″ × 81″:

```
http://localhost:8770/tradeshow-banners-v2.html?print=banner-01a
file:///path/to/tradeshow-banners-v2.html?print=banner-05b
```

## Banner ID reference

| ID | Concept |
|---|---|
| `banner-01a` | Data Center · Server Aisle |
| `banner-01b` | Data Center · Graphic / Tech |
| `banner-01c` | Data Center · Cable Tray |
| `banner-01d` | Data Center · Facility Exterior |
| `banner-02a` | Medium Voltage · Infrastructure |
| `banner-02b` | Medium Voltage · Product Hero |
| `banner-03`  | Applications · Market Grid |
| `banner-04a` | USA · Flag & Factory |
| `banner-04b` | USA · Patriot & Craftsman |
| `banner-05a` | Single Conductor · Red Jacket |
| `banner-05b` | Single Conductor · Yellow Jacket |
| `banner-06`  | Multi-Conductor |
