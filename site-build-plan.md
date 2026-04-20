# Unified Wire & Cable — Site Build Plan

**Updated:** April 6, 2026
**Status:** Pre-build — approved for execution

---

## CONSTRAINTS & GROUND RULES

- `index.html` in root **must not be touched** — it is the active temporary landing page
- New home page is `home.html` (not index)
- All new site pages are **password protected** (password: `copper`) via client-side JS session check
- Build order is approved; proceed page by page
- Rep Locator and Spec Navigator are already built; new pages will reference/incorporate them

---

## DIRECTORY STRUCTURE

```
/Users/garyricke/Documents/unifiedwire/
│
├── index.html                    ← EXISTING — temporary landing (DO NOT TOUCH)
├── [existing .md / proposal files — untouched]
├── images/                       ← EXISTING asset source
├── generated_imgs/               ← EXISTING asset source
├── rep-locator.html              ← EXISTING (referenced by find-a-rep.html)
├── spec-navigator.html           ← EXISTING (referenced by products.html)
│
└── site/                         ← ALL NEW SITE PAGES LIVE HERE
    │
    ├── home.html                 ← New homepage
    ├── products.html
    ├── skin-coat-technology.html
    ├── about.html
    ├── careers.html
    ├── contact.html
    ├── find-a-rep.html
    │
    ├── markets/
    │   ├── index.html            ← Markets hub
    │   ├── appliance.html
    │   ├── automotive.html
    │   ├── marine.html
    │   ├── rv.html
    │   ├── electronics-oem.html
    │   ├── military.html
    │   └── distribution.html
    │
    ├── resources/
    │   ├── index.html            ← Resources hub
    │   ├── compliance.html
    │   └── tools.html
    │
    └── assets/
        ├── css/
        │   └── uwc.css           ← Shared brand stylesheet (brand guide tokens)
        ├── js/
        │   ├── uwc.js            ← Shared JS (nav, scroll animations, modals)
        │   └── password.js       ← Password protection (session-based)
        └── img/                  ← Site-specific images (sourced from /images/ and /generated_imgs/)
```

**Path conventions:**
- From `site/*.html` → assets at `./assets/css/uwc.css`
- From `site/markets/*.html` → assets at `../assets/css/uwc.css`
- From `site/resources/*.html` → assets at `../assets/css/uwc.css`
- Images from root: `../../images/filename.png` (from nested pages) or `../images/` (from site root level)

---

## PASSWORD PROTECTION

All pages in `site/` use a session-based client-side gate.

**Mechanism (`password.js`):**
1. On page load: check `sessionStorage.getItem('uwc_auth')`
2. If not set: inject a full-screen overlay with a password input (no page content visible beneath)
3. On correct entry (`copper`): set `sessionStorage.setItem('uwc_auth', '1')`, remove overlay
4. On incorrect entry: shake animation + error message, no redirect
5. Session persists until browser tab is closed (sessionStorage scope)

**Note:** This is a client-preview gate, not production security. No server-side auth required.

---

## SHARED ASSETS

### `assets/css/uwc.css`
One stylesheet for all pages. Includes:
- Brand token CSS custom properties (from brand guide)
- Typography (Plus Jakarta Sans + DM Mono via Google Fonts)
- Layout utilities (`.section`, `.section-alt`, `.section-dark`, `.container`)
- Components (`.btn`, `.badge`, `.tag`, `.card`, `.card-ghost`)
- Scroll animation (`.fade-in` / `.fade-in.visible`)
- Navigation (sticky header, mobile hamburger)
- Footer
- Password overlay

### `assets/js/uwc.js`
- IntersectionObserver for `.fade-in`
- Mobile nav toggle
- Any modal/lightbox patterns reused across pages

### `assets/js/password.js`
- Standalone; included on every page; runs before page render

---

## CONTENT ADDITIONS FROM INTERVIEWS (April 1, 2026)

The employee interviews add significant depth beyond the old website. Key additions per page:

### Founding Story (correction + enrichment)
- **Founded 1977** *(old site said 1978 — use 1977 per interview source)*
- **2027 = 50th anniversary** — worth building into messaging
- Tim Foley's father ran a wiring harness company (started 1965); founded UWC as a backward integration move to control their own wire supply. The name "Unified" reflects that integration philosophy.
- Originally located in Wrigleyville, Chicago; now in DeKalb, IL

### Key People (for About page)
| Name | Title | Tenure | Notable |
|------|-------|--------|---------|
| Tim Foley | VP Sales | 25 years | Son of founder; grew up in the business |
| Jorge Hernandez | Production Manager | 33 years | 2nd employee ever; trains most production staff |
| Daniela | Quality Manager (in training) | 5 years | Industrial Engineer; owns the QMS |
| Salvador Lopez | Wire Mill Supervisor | 14 years | Promoted from within; manages 9 operators |
| Ebba | Plant Engineer | 6 months | Masters in Energy Systems Eng.; newest voice |

*Tom Bushman (Operations) and Tina Fant (HR/Office) interviews were not completed.*

### Pull Quotes (to use throughout site)
> "Relationships are the key to everything."
> — Jorge Hernandez, Production Manager · 33 years

> "Every day is learning more. Every day is a different job."
> — Salvador Lopez, Wire Mill Supervisor · 14 years

> "I'm kind of like that bridge in between. It's the most difficult part, but also the most rewarding."
> — Daniela, Quality Manager

> "Everyone teaches from the roots. You need to understand root causes."
> — Ebba, Plant Engineer

> "My father thought, why not get more integrated."
> — Tim Foley, VP Sales (on why Unified Wire & Cable was founded)

---

## BUILD ORDER & PAGE CONTENT SUMMARY

### PHASE 1 — Foundation

#### Step 0: Shared Assets (`site/assets/`)
Build first; all pages depend on these.
- `uwc.css` — full brand system stylesheet
- `uwc.js` — shared interactions
- `password.js` — session auth gate

---

#### Step 1: `site/home.html`

| Section | Content |
|---------|---------|
| **Hero** | Bold headline ("Precision-manufactured wire & cable. Ready when the job starts.") · Sub · CTAs: [Browse Products] [Request a Quote] · Dark navy background |
| **Trust Bar** | ISO 9001:2015 · UL Listed · CSA Approved · RoHS3 · Made in DeKalb, IL — with cert marks |
| **Why Unified Wire** | 6-pillar grid: Experience · Capacity · Flexibility · Inventory · Pricing · People |
| **Product Categories** | Quick-nav cards: Automotive · UL Hook-up · X-Link · MTW · Building Wire · Specialty — each links to products.html filtered |
| **Skin Coat Teaser** | 2-col: brief intro + 3 bullets · [Learn More] CTA |
| **Markets Strip** | Icon row — Appliance · Automotive · Marine · RV · Electronics/OEM · Military · Distribution |
| **By the Numbers** | Founded 1977 · 75,000 sq ft · 7 extrusion lines · 100+ UL styles · Approaching 50 years |
| **CTA Banner** | "Need a quote or have a custom spec?" · [Contact Sales] [Find Your Rep] |

---

#### Step 2: `site/products.html`

| Section | Content |
|---------|---------|
| **Page Header** | H1: "Wire & Cable Products" · 1-sentence description |
| **Spec Navigator** | Iframe or redirect to `../../spec-navigator.html` |
| **Browse by Category** | 14 product category cards linking to spec-navigator filtered view |
| **UL Styles Callout** | "100+ UL AWM Approved Styles" · Expandable full list · [Contact Sales] for custom |

---

#### Step 3: `site/resources/compliance.html`

| Section | Content |
|---------|---------|
| **Header** | "Compliance Center" · "Download any document — no form required." |
| **Document Library** | Table per regulation: ISO 9001:2015 · RoHS3 · REACH/SVHC · Conflict Minerals · TSCA · Prop 65 — each with [Download PDF] placeholder, scope note, Last Updated field |
| **UL AWM Approvals** | Full filterable list of 100+ approved styles |
| **CSA / SAE Summary** | Compact approvals table |

---

#### Step 4: `site/skin-coat-technology.html`

| Section | Content |
|---------|---------|
| **Hero** | "Skin Coat Technology — A Better Way to Color Wire" · 1-line summary |
| **The Process** | Illustrated diagram: main extruder (inner natural layer) + 2 co-extruders (outer colored skin 0.004"–0.010") — molten state, fused as one |
| **Why It Matters** | Color won't peel or scrape · Same physical/electrical properties as standard PVC · UL/CSA/SAE compliant |
| **Business Benefits** | Lower minimums · Better pricing (reduced scrap/downtime) · Custom color combinations without tooling cost |
| **Applications** | Automotive harness · Appliance · OEM color-coding |
| **CTA** | [Request a Custom Color Spec] |

---

#### Step 5: `site/about.html`

| Section | Content |
|---------|---------|
| **Opening** | 2–3 sentences: who UWC is, since 1977, DeKalb IL, what they make and who they serve |
| **Founding Story** | Tim Foley's father, harness company (1965) → founded UWC 1977 as vertical integration; name "Unified" reflects that origin; approaching 50-year milestone in 2027 |
| **The Facility** | 75,000 sq ft · DeKalb, IL · 7 extrusion lines · Photo/video placeholder: extrusion lines, copper fabrication, QC lab |
| **Vertical Integration** | "From Copper Rod to Finished Wire — All Under One Roof" · 3 customer benefits: raw material security / custom agility / cost control |
| **Our People** | Team tenure stats (Jorge 33 yrs, Tim 25 yrs, Salvador 14 yrs, Daniela 5 yrs) · Pull quotes from interviews · Culture statement: relationships, mentorship, "teach from the roots" |
| **Certifications** | ISO 9001:2015 · UL · CSA · SAE · RoHS3 · REACH · Conflict Minerals · TSCA · Prop 65 |
| **CTA Row** | [View Products] [Find a Sales Rep] [Contact Us] |

---

### PHASE 2 — Market Pages

All market pages follow the same template:
- Hero with market name + 1-line description
- "Why UWC for [Market]" — 3–4 bullets specific to that industry's pain points
- Featured Products — relevant product cards with key specs
- Compliance angle (where relevant)
- CTA: [Download Spec Sheet] [Request a Quote]

#### Step 6a: `site/markets/index.html` — Markets Hub
Grid of 7 market cards → sub-pages

#### Step 6b–6h: Market Sub-Pages

| File | Featured Products | Key Angle |
|------|-----------------|-----------|
| `appliance.html` | AWM, UL 3173 (X-Link), Flexible Cord | 105°C–125°C, UL/CSA, high-volume OEM delivery |
| `automotive.html` | SAE J1128 GPT, SXL/GXL/TXL, Ribbon Rip | Skin Coat custom color, harness-ready, lower minimums |
| `marine.html` | Boat Cable BC-5W3, J378C, Parallel Bonded | Tinned copper, 105°C dry / 75°C wet, corrosion resistance |
| `rv.html` | SAE J1128 GPT, Parallel Bonded, Brake Cable | Trailer lighting, brake control, 80°C–105°C |
| `electronics-oem.html` | UL 1007/1015/1028, MIL Spec, AWM | 100+ UL styles, self-serve compliance docs |
| `military.html` | MIL-W-16878E Types B/C/D, MIL-W-76B | -55°C to 105°C, 600V–3000V, exact spec conformance |
| `distribution.html` | Full product range | Emergency stock, lower minimums, broad UL portfolio |

---

### PHASE 3 — Tools & Remaining Pages

#### Step 7: `site/resources/tools.html` — Engineering Toolbox
- Voltage Drop Calculator (inputs: AWG, length, current, voltage, conductor material → output: V drop, % drop, NEC pass/fail)
- Wire Unit Converter (AWG ↔ mm², ft ↔ m, lbs/1000ft ↔ kg/km)
- Below each result: suggested UWC products → link to spec-navigator

#### Step 8: `site/resources/index.html` — Resources Hub
Entry page; cards linking to Compliance Center, Toolbox, Spec Navigator, UL Approvals

#### Step 9: `site/contact.html`
- Real contact info upfront (no buried form): Sales · Customer Service · AP · Careers · Phone
- Quote/inquiry form: Name · Company · Email · Phone · Product Interest (dropdown) · Message
- Location: DeKalb, IL 60115 · "1.5 hours west of downtown Chicago" · Map

#### Step 10: `site/careers.html`
- Company statement ("Since 1977...") · Benefits grid · Open positions placeholder · Apply CTA

#### Step 11: `site/find-a-rep.html`
- Thin wrapper page with nav/footer, embedding or linking to `../../rep-locator.html`

---

## OPEN QUESTIONS / FLAGS

| Item | Note |
|------|------|
| **Founded year** | Interviews say 1977; old site said 1978. Using **1977** per primary source (Tim Foley interview). Confirm with client. |
| **Interview gaps** | Tom Bushman (Operations) and Tina Fant (HR) interviews not completed. May want to add their content to About/Careers pages later. |
| **Real spec sheet PDFs** | All [Download Spec Sheet] buttons use placeholders at launch; swap real PDFs per product later. |
| **Spec Navigator integration** | Determine whether products.html iframes spec-navigator.html or links out to it. |
| **Image assets** | Facility photos and video are placeholder at launch (noted in About, Skin Coat). Real assets TBD from on-site shoot. |
| **Compliance doc PDFs** | Placeholder buttons on compliance.html; real PDFs to be provided by UWC. |
