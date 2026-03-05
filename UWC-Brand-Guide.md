# Unified Wire & Cable — Brand Guide
**Version 1.0 · 2026 · Internal Use Only**

---

## 01 — Brand Story

### Built on precision. Defined by what's next.

Unified Wire & Cable has spent decades delivering the wire, cable, and connectivity solutions that power industrial, commercial, and specialty applications across North America.

In 2026, UWC is stepping forward — into a modern brand identity that reflects the quality, precision, and momentum that defines every product we manufacture. This guide ensures that identity is applied consistently and with purpose.

### Brand Pillars

| Pillar | Description |
|---|---|
| **Engineered Precision** | Every specification matters. We lead with technical authority and the confidence of manufacturing excellence. |
| **Connected Forward** | We don't just supply cable — we connect industries to the infrastructure that moves them. Our brand reflects that forward-looking mission. |
| **Industrial Edge** | We operate where performance is non-negotiable. Our visual identity mirrors that: clean, bold, and built to perform at scale. |
| **Trusted Partnership** | Decades of relationships, specs fulfilled on time, and products that perform in the field. Our brand earns trust before a word is spoken. |

---

## 02 — Color Palette

Our palette is drawn directly from the UWC mark — the structural blue of precision engineering and the copper-orange of raw material.

### Primary

| Name | Hex | RGB | CMYK | Usage |
|---|---|---|---|---|
| UWC Blue | `#0362BC` | 3 · 98 · 188 | 98 · 48 · 0 · 26 | Primary brand color — digital, UI, web |
| Blue Dark | `#024a90` | 2 · 74 · 144 | 99 · 49 · 0 · 44 | Hover states, depth |
| Blue Tint | `#7ebfff` | 126 · 191 · 255 | — | UI highlights only |

### Accent

| Name | Hex | RGB | CMYK | Usage |
|---|---|---|---|---|
| UWC Orange | `#E36417` | 227 · 100 · 23 | 0 · 56 · 90 · 11 | Accent — print, spec sheets |
| Orange Dark | `#b84f10` | 184 · 79 · 16 | 0 · 57 · 91 · 28 | Hover states, depth |
| Orange Tint | `#ffb07a` | 255 · 176 · 122 | — | UI highlights only |

### Foundation

| Name | Hex | RGB | CMYK | Usage |
|---|---|---|---|---|
| UWC Navy | `#0A1628` | 10 · 22 · 40 | 75 · 45 · 0 · 84 | Primary dark background |
| Navy Light | `#0d1e38` | 13 · 30 · 56 | 77 · 46 · 0 · 78 | Secondary dark background |

### Neutrals

| Name | Hex | RGB | CMYK | Usage |
|---|---|---|---|---|
| UWC Gray | `#B9BDBD` | 185 · 189 · 189 | 2 · 0 · 0 · 26 | Borders, secondary elements |
| Gray Light | `#f0f2f4` | 240 · 242 · 244 | — | Alternate section backgrounds |
| Text Dark | `#1a2535` | 26 · 37 · 53 | — | Primary body text |
| Text Light | `#4a5568` | 74 · 85 · 104 | — | Secondary body text |
| White | `#ffffff` | 255 · 255 · 255 | — | Page backgrounds |

### Color Usage Rules

- **Blue** → Digital / Website scope
- **Orange** → Print / Spec sheet scope
- **Blue-to-orange gradient** → Bundle or featured content — use sparingly

### CSS Custom Properties

```css
:root {
  --blue:      #0362BC;
  --blue-dk:   #024a90;
  --orange:    #E36417;
  --orange-dk: #b84f10;
  --navy:      #0A1628;
  --navy2:     #0d1e38;
  --gray:      #B9BDBD;
  --gray-lt:   #f0f2f4;
  --white:     #ffffff;
  --text:      #1a2535;
  --text-lt:   #4a5568;
  --border:    #dce3ed;
  --radius:    12px;
  --shadow:    0 4px 24px rgba(3,98,188,.12);
  --shadow-lg: 0 12px 48px rgba(3,98,188,.2);
}
```

---

## 03 — Typography

### Typefaces

| Role | Family | Source |
|---|---|---|
| **Primary** | Plus Jakarta Sans | Google Fonts |
| **Technical / Labels** | DM Mono | Google Fonts |

**Plus Jakarta Sans** is a geometric humanist sans-serif with a confident, precision-engineered character. Its wide weight range carries every communication from spec sheet labels to tradeshow headlines.

**DM Mono** is used exclusively for all technical data, part numbers, labels, and metadata.

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### CSS Font Variables

```css
:root {
  --font: 'Plus Jakarta Sans', -apple-system, sans-serif;
  --mono: 'DM Mono', 'Courier New', monospace;
}
```

### Type Weights

| Weight | Name | Usage |
|---|---|---|
| 300 | Light | Subtitles, cover sub-headings |
| 400 | Regular | Body copy |
| 600 | SemiBold | Navigation, labels |
| 700 | Bold | H3, H4, UI elements |
| 800 | ExtraBold | H1, H2, display headlines |

### Type Scale

| Level | Size | Weight | Letter Spacing | Usage |
|---|---|---|---|---|
| H1 | `clamp(2.4rem, 5vw, 4rem)` | 800 | `-0.03em` | Page headlines |
| H2 | `clamp(1.6rem, 3vw, 2.5rem)` | 800 | `-0.02em` | Section headings |
| H3 | `1.3rem` | 700 | — | Sub-headings |
| H4 | `1rem` | 700 | — | Card titles, labels |
| Body | `1.05rem` | 400 | — | Paragraphs |
| Small | `0.88rem` | 400 | — | Supporting text |
| Label | `0.70rem` | 400 | `+0.15em` | DM Mono — all caps |

### CSS Typography Rules

```css
h1 { font-size: clamp(2.4rem, 5vw, 4rem);       font-weight: 800; letter-spacing: -.03em; line-height: 1.08; }
h2 { font-size: clamp(1.6rem, 3vw, 2.5rem);     font-weight: 800; letter-spacing: -.02em; line-height: 1.15; }
h3 { font-size: 1.3rem;  font-weight: 700; }
h4 { font-size: 1rem;    font-weight: 700; }
p  { font-size: 1.05rem; font-weight: 400; color: var(--text-lt); line-height: 1.6; }

/* Label / eyebrow — always DM Mono */
.label {
  font-family: var(--mono);
  font-size: .70rem;
  letter-spacing: .15em;
  text-transform: uppercase;
}
```

---

## 04 — Logo Usage

### The UWC Mark

The UWC monogram is the core of our identity. The metallic depth of the letterforms references our materials — structural steel-blue conductors and copper wire — unified under a single, unmistakable mark.

### Approved Backgrounds

| Background | Use |
|---|---|
| White `#ffffff` | Primary placement |
| Light Gray `#f0f2f4` | Secondary / section placement |
| Navy `#0A1628` | Dark / inverted placement |

### Clear Space

Maintain a minimum clear zone around the UWC mark **equal to the height of the "U" letterform** on all four sides. This zone must remain free of text, graphics, and competing visual elements.

### Minimum Sizes

| Medium | Minimum Width |
|---|---|
| Digital | 80px |
| Print | 0.75 inch |

### Logo Don'ts

- **Don't stretch** — Never distort proportions. Scale uniformly only.
- **Don't recolor** — Do not apply flat fills, tints, or custom color treatments. Use approved source files only.
- **Don't use on busy backgrounds** — The mark requires a clean, solid, or approved background to read clearly.
- **Don't add effects** — No additional drop shadows, glows, or overlays beyond what is built into the mark.
- **Don't use low-res** — Always use vector or high-resolution source files. Minimum 2× pixel density for screen.
- **Don't crowd** — Never allow text, icons, or graphic elements to intrude into the clear space zone.

---

## 05 — UI Components

### Iconography

Per `iconography-rules.md`:

- **Style:** Flat, minimalist SVG icons. No gradients, shadows, or 3D effects.
- **Implementation:** Inline SVGs only. Never `<img>` tags for icons.
- **Coloring:** Use `currentColor` on `stroke` or `fill` so icons inherit CSS color.
- **Size:** Default `24×24px`. Indicator icons (check, X) at `16×16px`.

### Buttons

```css
/* Base */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 26px; border-radius: 8px;
  font-family: var(--font); font-size: .92rem; font-weight: 700;
  border: none; cursor: pointer; transition: all .2s;
}

/* Variants */
.btn-primary     { background: var(--blue);   color: #fff; }
.btn-orange      { background: var(--orange); color: #fff; }
.btn-outline     { background: transparent; color: var(--blue);   border: 2px solid var(--blue); }
.btn-outline-org { background: transparent; color: var(--orange); border: 2px solid var(--orange); }
.btn-ghost       { background: rgba(255,255,255,.1); color: #fff; border: 1.5px solid rgba(255,255,255,.25); }
.btn-outline-wh  { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,.45); }

/* Sizes */
.btn-sm { padding: 9px 18px; font-size: .82rem; }
.btn-lg { padding: 16px 36px; font-size: 1.05rem; }
```

### Badges

```css
.badge        { display: inline-block; font-size: .70rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; }
.badge-blue   { background: var(--blue);    color: #fff; }
.badge-orange { background: var(--orange);  color: #fff; }
.badge-navy   { background: var(--navy);    color: #fff; }
.badge-gray   { background: var(--gray-lt); color: var(--text); border: 1.5px solid var(--border); }
```

### Tags (Outline Chips)

```css
.tag        { display: inline-flex; align-items: center; gap: 6px; font-size: .8rem; font-weight: 600; padding: 5px 12px; border-radius: 20px; border: 1.5px solid; }
.tag-blue   { color: var(--blue);   border-color: var(--blue);   background: rgba(3,98,188,.07); }
.tag-orange { color: var(--orange); border-color: var(--orange); background: rgba(227,100,23,.07); }
```

### Cards

```css
/* Standard card */
.card {
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  transition: box-shadow .2s, transform .2s;
}
.card:hover { box-shadow: var(--shadow); transform: translateY(-2px); }

/* Ghost card — for dark/navy backgrounds */
.card-ghost {
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--radius);
  padding: 24px;
}
```

### Section Layout

```css
.section     { padding: 96px 0; }
.section-alt  { background: var(--gray-lt); }          /* alternating light gray */
.section-dark { background: var(--navy); color: #fff; } /* navy dark sections */
.container   { max-width: 1100px; margin: 0 auto; padding: 0 32px; }
```

### Scroll Animation

Add `class="fade-in"` to any element. Wire up with this IntersectionObserver:

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
```

```css
.fade-in         { opacity: 0; transform: translateY(20px); transition: opacity .55s ease, transform .55s ease; }
.fade-in.visible { opacity: 1; transform: none; }
```

---

## 06 — Voice & Tone

### Brand Personality

`Precise` · `Confident` · `Modern` · `Direct` · `Reliable` · `Industrial` · `Forward-looking` · `Technical` · `Trusted` · `Unambiguous`

### We Are

- Clear and direct — we say exactly what the product does
- Technically credible — specs are precise, never approximate
- Confident without arrogance — our work speaks first
- Future-forward — we talk about where the industry is heading
- Respectful of our customer's expertise and time

### We Are Not

- Corporate and stiff — no jargon for jargon's sake
- Casual or informal — we're not a lifestyle brand
- Vague — "quality products" alone is not enough
- Boastful — let performance and specs do the talking
- Outdated — avoid legacy industrial clichés

### Writing Examples

| Use this | Not this |
|---|---|
| *"XHHW-2 rated to 90°C, wet or dry. Built for installations that can't afford a callback."* | *"Our high-quality wire products offer superior performance for a variety of applications."* |
| *"6,000 units. 12 SKUs. On the dock by May 1st."* | *"We strive to meet customer delivery expectations through our dedicated fulfillment processes."* |
| *"Unified Wire & Cable. Precision-manufactured. Ready when the job starts."* | *"Your trusted partner in wire and cable solutions since [year]."* |

---

*UWC Brand Guide v1.0 · 2026 · Internal Use Only · © 2026 Unified Wire & Cable*
