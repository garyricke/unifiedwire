# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

A single-file static HTML client proposal for **Unified Wire & Cable (UWC)** — a 2026 brand transformation pitch covering two scopes of work and a bundled option. There is no build system, no package manager, no framework. The entire deliverable is `index.html`.

To preview: `open index.html`

## File Structure

```
index.html                          — the entire proposal (single file, ~1,460 lines)
images/                             — local copies of all images (also hosted on Cloudinary)
Unified-Wire-New-Website-Proposal.md      — source content for website scope
Unified-Wire-Spec-Sheet-RFQ-Proposal.md  — source content for spec sheet scope
Unified-Wire-Comprehensive-Digital-Print-Bundle.md  — bundle pricing/synergies
Comprehensive Digital & Print Transformation Bundled Discount.md  — pricing table
Unified Wire-new-wire-images-approach.md  — JSON wire image generation approach
unified-wire-brand-colors.svg             — brand color reference
```

## index.html Architecture

All CSS lives in a single `<style>` block in `<head>`. All JavaScript lives in a single `<script>` block at the bottom of `<body>`. No external CSS or JS dependencies.

### Page Sections (in DOM order)

| Section | ID | Background Class |
|---|---|---|
| Nav (sticky) | — | navy |
| Hero | — | dark gradient |
| Investment overview cards | — | white `.section` |
| Website proposal | `#website` | gray `.section-alt` |
| Spec sheet suite | `#specsheets` | white `.section` |
| AI wire imagery | `#imagery` | dark `.section-dark` |
| Bundle value | `#bundle` | dark `.section-dark` |
| Timeline | `#timeline` | white `.section` |
| Payment schedule | `#payment` | gray `.section-alt` |
| CTA | — | blue `.cta-section` |
| Footer | — | navy |
| Lightbox overlay | `#lightbox` | — |
| Modal: website | `#modal-website` | — |
| Modal: spec sheets | `#modal-specs` | — |
| Modal: JSON wire | `#modal-json` | — |

### Brand Tokens (CSS custom properties)

```css
--blue: #0362BC       --blue-dk: #024a90
--orange: #E36417     --orange-dk: #b84f10
--navy: #0A1628       --navy2: #0d1e38
--gray: #B9BDBD       --gray-lt: #f0f2f4
--text: #1a2535       --text-lt: #4a5568
--border: #dce3ed     --radius: 12px
--shadow: 0 4px 24px rgba(3,98,188,.12)
--shadow-lg: 0 12px 48px rgba(3,98,188,.2)
```

Website scope = **blue**. Spec sheet scope = **orange**. Bundle/featured = blue+orange gradient text.

### Key Component Patterns

**Standard section structure:**
```html
<section class="section [section-alt|section-dark]" id="sectionname">
  <div class="container">
    <div class="sec-head fade-in">
      <span class="badge badge-blue">Label</span>
      <h2>Heading</h2>
      <p>Description</p>
    </div>
    <!-- content with fade-in class for scroll animation -->
  </div>
</section>
```

**Featured/recommended card pattern** (used on investment cards and payment cards):
- The "featured" variant needs `overflow: visible` to show the absolute-positioned badge above the card border
- Compensate by adding `border-radius` directly to the card's head element so its background still clips correctly
- See `.inv-card-rec` / `.rec-badge` and `.pay-card-featured` / `.pay-featured-badge` for reference

**Modals:**
```html
<div class="modal-overlay" id="modal-name" onclick="handleOverlayClick(event,'modal-name')">
  <div class="modal-box">
    <div class="modal-head">...</div>
    <div class="modal-body">...</div>
  </div>
</div>
```
Opened/closed via `openModal('modal-name')` / `closeModal('modal-name')`.

**Scroll animations:** Add `class="fade-in"` to any element — the existing `IntersectionObserver` at the bottom of the script block handles it automatically.

### Images

All images are served from Cloudinary:
- Base: `https://res.cloudinary.com/dsbllwpbh/image/upload/`
- Local copies are in `images/` as a reference/backup

### JavaScript Functions

- `openModal(id)` / `closeModal(id)` / `handleOverlayClick(event, id)` — modal system
- `openLightbox(src, caption)` / `closeLightbox()` — fullscreen image viewer
- `updateBA(input, idx)` — drives the before/after comparison sliders (3 instances, indexed 0–2)

## Project Pricing (source of truth for any calculations)

| Option | Investment |
|---|---|
| New Website (standalone) | $25,000 flat |
| Spec Sheet Suite (standalone) | $15,000–$18,000 (midpoint $16,500) |
| Full Bundle | $35,000 flat (saves $5,000–$8,000) |

Payment schedule uses **40% / 30% / 30%** split across Feb 25 → Mar 31 → May 5, 2026. Extended terms use 18% APR basis: Net 15 = +1.0%, Net 30 = +1.5%, Net 45 = +2.5% per invoice.

## Key Project Dates

- Late February 2026: On-site iPhone shoot, strategy kickoff
- March 31, 2026: Mid-project development milestone (payment #2)
- April 10, 2026: Final spec sheet design approvals
- May 1, 2026: Print delivery (6,000 units)
- First week of May 2026: Website launch + tradeshow
- Second week of May 2026: Tradeshow
