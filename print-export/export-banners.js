import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const HTML_PATH = resolve(PROJECT_ROOT, 'tradeshow-banners-v2.html');
const EXPORTS_DIR = resolve(__dirname, 'exports');

// 33" × 81" at 96 CSS DPI = 3168 × 7776 layout px.
// deviceScaleFactor 150/96 = 1.5625 → 4950 × 12150 raster px (150 DPI).
const LAYOUT_WIDTH = 3168;
const LAYOUT_HEIGHT = 7776;
const DPI_SCALE = 150 / 96;

const ALL_BANNERS = [
  { id: 'banner-01a', file: '01a-data-center-server-aisle' },
  { id: 'banner-01b', file: '01b-data-center-graphic-tech' },
  { id: 'banner-01c', file: '01c-data-center-cable-tray' },
  { id: 'banner-01d', file: '01d-data-center-facility-exterior' },
  { id: 'banner-02a', file: '02a-medium-voltage-infrastructure' },
  { id: 'banner-02b', file: '02b-medium-voltage-product-hero' },
  { id: 'banner-03',  file: '03-applications-market-grid' },
  { id: 'banner-04a', file: '04a-usa-flag-and-factory' },
  { id: 'banner-04b', file: '04b-usa-patriot-craftsman' },
  { id: 'banner-05a', file: '05a-single-conductor-red-jacket' },
  { id: 'banner-05b', file: '05b-single-conductor-yellow-jacket' },
  { id: 'banner-06',  file: '06-multi-conductor' }
];

function pickTargets(args) {
  if (args.length === 0) return ALL_BANNERS;
  return ALL_BANNERS.filter(b => args.includes(b.id) || args.includes(b.file));
}

async function main() {
  const allArgs = process.argv.slice(2);
  const flags = new Set(allArgs.filter(a => a.startsWith('--')));
  const positional = allArgs.filter(a => !a.startsWith('--'));
  const targets = pickTargets(positional);
  const wantPng = flags.has('--png');

  if (targets.length === 0) {
    console.error('No matching banners. Available IDs:');
    ALL_BANNERS.forEach(b => console.error(`  ${b.id}  (${b.file})`));
    process.exit(1);
  }

  if (!existsSync(HTML_PATH)) {
    console.error(`Source HTML not found: ${HTML_PATH}`);
    process.exit(1);
  }

  mkdirSync(EXPORTS_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: LAYOUT_WIDTH, height: LAYOUT_HEIGHT },
    deviceScaleFactor: wantPng ? DPI_SCALE : 1
  });
  const fileUrl = pathToFileURL(HTML_PATH).href;

  const formats = wantPng ? 'PDF + PNG (150 DPI)' : 'PDF';
  console.log(`Exporting ${targets.length} banner${targets.length === 1 ? '' : 's'} as ${formats}`);
  console.log(`Output: ${EXPORTS_DIR}\n`);

  for (const banner of targets) {
    const page = await context.newPage();
    const url = `${fileUrl}?print=${banner.id}`;
    console.log(`→ ${banner.id}`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait for web fonts (Barlow Condensed, DM Sans) to finish loading.
    await page.evaluate(() => document.fonts.ready);

    const targetExists = await page.evaluate(() =>
      !!document.querySelector('.concept-card.print-target')
    );
    if (!targetExists) {
      console.warn(`  WARN: no print-target found for ${banner.id} — skipping.`);
      await page.close();
      continue;
    }

    // PDF (vector text, embedded fonts, native-resolution background images).
    const pdfPath = resolve(EXPORTS_DIR, `${banner.file}.pdf`);
    await page.pdf({
      path: pdfPath,
      width: '33in',
      height: '81in',
      printBackground: true,
      pageRanges: '1',
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    console.log(`  PDF: ${pdfPath}`);

    // PNG (raster fallback at 150 DPI = 4950 × 12150 px).
    if (wantPng) {
      const pngPath = resolve(EXPORTS_DIR, `${banner.file}.png`);
      await page.locator('.concept-card.print-target .banner').screenshot({
        path: pngPath,
        type: 'png'
      });
      console.log(`  PNG: ${pngPath}`);
    }

    await page.close();
  }

  await context.close();
  await browser.close();
  console.log(`\nDone. ${targets.length} banner${targets.length === 1 ? '' : 's'} exported.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
