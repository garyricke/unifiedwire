# Unified Wire & Cable — New Site Content Outline

**Status:** Pre-build planning document
**Already built:** `rep-locator.html`, `spec-navigator.html`
**Stack:** Static HTML (single-file pages, brand guide conventions)

---

## SITE MAP

```
/                          Home
/products/                 Products (hosts the spec-navigator)
/markets/                  Markets & Industries (hub)
  /markets/appliance/
  /markets/automotive/
  /markets/marine/
  /markets/rv/
  /markets/electronics-oem/
  /markets/military/
/resources/                Resources hub
  /resources/compliance/   Compliance Center
  /resources/tools/        Engineering Toolbox (calculators)
  /skin-coat-technology/   Technology deep-dive
/about/                    About Us
/careers/                  Careers
/find-a-rep/               Rep Locator (DONE)
/contact/                  Contact
```

---

## PAGE-BY-PAGE CONTENT OUTLINE

---

### 1. HOME — `/`

**Goal:** Establish credibility instantly, route three user types (engineer, buyer, distributor) to the right path quickly.

**Sections in order:**

#### 1.1 Hero
- Headline: Bold, spec-forward (e.g., "Precision-manufactured wire & cable. Ready when the job starts.")
- Sub: 1–2 lines on what UWC does + who they serve
- CTAs: [Browse Products] [Request a Quote]
- Background: Dark navy with facility/industrial visual or copper wire macro

#### 1.2 Trust Bar (logo strip)
- "ISO 9001:2015 Certified · UL Listed · CSA Approved · RoHS3 Compliant · Made in DeKalb, IL"
- Visual row of certification marks

#### 1.3 Why Unified Wire (6-pillar grid)
- Experience · Capacity · Production Flexibility · Inventory · Pricing · People
- Each pillar: icon + headline + 1–2 sentence description (pulled from content brief)

#### 1.4 Featured Product Categories (quick navigation cards)
- Automotive Wire · UL Style Hook-up Wire · X-Link (XLPE) · MTW · Copper Building Wire · Specialty/Custom
- Each card: product name + key spec callout + [View Specs] link → spec-navigator filtered

#### 1.5 Skin Coat Technology teaser
- 2-column: brief intro left, "What makes it different" bullets right
- CTA: [Learn About Skin Coat Technology]

#### 1.6 Markets We Serve (icon row)
- Appliance · Automotive · Marine · RV · Electronics/OEM · Military · Distribution
- Each links to corresponding market page

#### 1.7 By the Numbers (stats strip)
- Founded 1978 · 75,000 sq ft facility · 7 extrusion lines · 100+ UL approved styles · 50+ years

#### 1.8 CTA Banner
- "Need a quote or have a custom spec? Our team responds fast."
- Buttons: [Contact Sales] [Find Your Rep]

---

### 2. PRODUCTS — `/products/`

**Goal:** This page IS the spec-navigator. Minimal surrounding copy; the tool does the work.

**Sections:**

#### 2.1 Page Header (minimal)
- H1: "Wire & Cable Products"
- 1 sentence: "Filter by specification to find the right product — then download the spec sheet or request a quote."

#### 2.2 Spec Navigator (embedded — already built)
- Full spec-navigator.html embedded/linked here
- Filters: Product Type · AWG Gauge · Conductor Material · Insulation · Temp Rating · Voltage · Standards (UL/CSA/SAE/MIL)

#### 2.3 Product Category Quick Links (below navigator)
- For users who prefer to browse by category:
  - Automotive Wire (SAE J1128 GPT, SGT)
  - AWM PVC / Nylon Wire
  - Boat Cable (BC-5W3)
  - Brake Cable
  - Copper Building Wire (THHN/THWN/MTW)
  - Flexible Cord Wire (SPT-1, SPT-2)
  - Machine Tool Wire (MTW)
  - MIL Spec Wire (MIL-W-16878E, MIL-W-76B)
  - Parallel Bonded Wire
  - Ribbon Rip Wire
  - TFFN / TFN Wire
  - UL Style Hook-up Wire
  - X-Link Wire (SXL, GXL, TXL, UL 3173)
  - Specialty & Custom

#### 2.4 UL Approvals Callout
- "100+ UL AWM Approved Styles" — expandable full list or link to compliance page
- "Don't see what you need? We can quote custom constructions." → [Contact Sales]

---

### 3. MARKETS & INDUSTRIES HUB — `/markets/`

**Goal:** Help industry-specific buyers see that UWC understands their application.

#### 3.1 Header
- H1: "Wire & Cable for Your Industry"
- 1–2 sentences: UWC serves 7 core markets with product expertise specific to each

#### 3.2 Market Cards (grid → links to sub-pages)
- Appliance · Automotive · Marine · RV · Electronics/OEM · Military · Wire Distribution

---

### 3a. APPLIANCE — `/markets/appliance/`
- **Featured products:** AWM PVC/Nylon, X-Link (UL 3173), UL Style (1015, 1028), Flexible Cord
- **Key specs highlighted:** 105°C, 125°C (UL 3173), 300–600V, UL/CSA listed
- **Pain point addressed:** Consistent delivery and quality for high-volume appliance production
- **Compliance angle:** RoHS3, REACH — downloadable docs
- CTA: [Download Spec Sheets] [Request a Quote]

### 3b. AUTOMOTIVE — `/markets/automotive/`
- **Featured products:** SAE J1128 GPT, SXL, GXL, TXL, Ribbon Rip Wire, Parallel Bonded
- **Key specs:** 80°C–125°C, XLPE insulation, SAE J1128 / J1127
- **Pain point:** Harness-ready wire, custom configurations, lower minimums via Skin Coat
- **Highlight:** Ribbon Rip Wire for connector/plug molding efficiency
- CTA: [Build a Custom Spec] [Contact Sales]

### 3c. MARINE / BOAT — `/markets/marine/`
- **Featured products:** Boat Cable (BC-5W3), SAE J378C Marine Wire, Parallel Bonded
- **Key specs:** Tinned copper standard, 105°C Dry / 75°C Wet, UL Listed BC-5W3
- **Pain point:** Corrosion resistance, UL marine listing
- CTA: [View Boat Cable Specs] [Request a Quote]

### 3d. RECREATIONAL VEHICLE (RV) — `/markets/rv/`
- **Featured products:** SAE J1128 GPT, Parallel Bonded, Brake Cable (SAE GPT 2-conductor)
- **Key specs:** 80°C–105°C, trailer lighting, brake controllers
- **Pain point:** Flexible production scheduling for OEM volumes, trailer lighting compliance
- CTA: [View Products] [Request a Quote]

### 3e. ELECTRONICS / OEM — `/markets/electronics-oem/`
- **Featured products:** UL Style 1007/1015/1028/1061, MIL Spec, AWM, X-Link
- **Key specs:** 300V–600V, 80°C–105°C, UL/CSA listed, MIL-W-16878E
- **Pain point:** Fast spec confirmation, reliable delivery, compliance documentation for audits
- **Highlight:** 100+ UL AWM approved styles; self-serve compliance docs
- CTA: [Search by UL Style] [Download Compliance Docs]

### 3f. MILITARY — `/markets/military/`
- **Featured products:** MIL-W-16878E (Types B/C/D/BN/CN/DN), MIL-W-76B (LW/MW/HW)
- **Key specs:** -55°C to 105°C, 600V–3000V, MIL certified
- **Pain point:** Exact spec conformance, documentation, reliability
- CTA: [View MIL Spec Products] [Contact Sales]

### 3g. WIRE DISTRIBUTION — `/markets/distribution/`
- **Focus:** Why distributors prefer UWC as a manufacturing partner
- **Highlight:** Emergency stock fulfillment, lower minimums, Skin Coat flexibility, broad UL approval portfolio, fast response
- **Mention:** Allied Wire & Cable, Lapp Tannehill as authorized distributors (social proof)
- CTA: [Become a Distributor Partner] [Find a Rep]

---

### 4. RESOURCES HUB — `/resources/`

**Goal:** Self-service technical information. No form walls.

#### 4.1 Header
- H1: "Resources & Technical Support"
- Sub: "Spec sheets, compliance documents, and engineering tools — all available without a form."

#### 4.2 Resource Categories (cards → sub-sections or anchors)
- Compliance Center
- Engineering Toolbox
- Spec Sheets (links to spec-navigator)
- UL Approvals List

---

### 4a. COMPLIANCE CENTER — `/resources/compliance/`

**Goal:** Reduce audit friction. Download everything without calling.

#### Sections:
- **Intro:** "Unified Wire & Cable maintains current compliance documentation for all applicable regulations. Download any document directly."
- **Document Library** (organized by regulation):
  - ISO 9001:2015 Certificate — [Download PDF] *(placeholder)*
  - RoHS3 Declaration — [Download PDF] *(placeholder)*
  - REACH / SVHC Declaration — [Download PDF] *(placeholder)*
  - Conflict Minerals Statement (6.31) — [Download PDF] *(placeholder)*
  - TSCA Compliance — [Download PDF] *(placeholder)*
  - California Proposition 65 — [Download PDF] *(placeholder)*
- Each document shows: Name · Regulation · Scope · Last Updated date
- **UL Approved Styles:** Full list of 100+ AWM styles, filterable/searchable
- **CSA / SAE Approvals:** Summary table

---

### 4b. ENGINEERING TOOLBOX — `/resources/tools/`

**Goal:** Give engineers a reason to return. Tie results back to UWC products.

#### Tools (Phase 1 — build for launch):
1. **Voltage Drop Calculator**
   - Inputs: Wire gauge (AWG), length (ft), current (A), voltage (V), conductor material
   - Output: Voltage drop (V), % drop, pass/fail against NEC 3% recommendation
   - Below result: "Recommended UWC products that meet this spec" → link to spec-navigator

2. **Wire Unit Converter**
   - AWG ↔ mm²
   - Feet ↔ Meters
   - lbs/1000ft ↔ kg/km

#### Phase 2 (post-launch):
- Conduit Fill Calculator
- Ampacity Reference Table (NEC 310 lookup)
- Competitor Cross-Reference tool

---

### 5. SKIN COAT TECHNOLOGY — `/skin-coat-technology/`

**Goal:** Turn a factory feature into a competitive advantage. Position UWC as an innovator, not a commodity.

**Sections:**

#### 5.1 Hero / Intro
- Headline: "Skin Coat Technology — A Better Way to Color Wire"
- Sub: What it is in one sentence

#### 5.2 The Process (visual / diagram)
- How it works (from content brief):
  - Main extruder: inner layer of natural compound
  - Co-extruders: outer skin of colored compound (0.004"–0.010")
  - Applied simultaneously in molten state under pressure → fused as one
- Diagram or cross-section illustration

#### 5.3 Why It Matters
- Color won't peel, scrape off, or separate
- Same physical and electrical properties as conventional PVC
- Meets UL, CSA, and SAE standards

#### 5.4 Business Benefits
- **Lower minimums** — economical for smaller runs
- **Better pricing** — reduced scrap rates, less machine downtime
- **Custom color combinations** — without the tooling cost of conventional methods
- Ideal for: automotive harness, appliance, OEM color-coding requirements

#### 5.5 CTA
- "Want to discuss a custom color spec?" → [Contact Sales] or [Request a Quote]

---

### 6. ABOUT US — `/about/`

**Goal:** Establish trust through heritage, capability, and people — with proof, not clichés.

**Sections:**

#### 6.1 Opening Statement
- 2–3 sentences: Who UWC is, since 1978, DeKalb IL, what they make and who they serve
- Tone: Confident, direct — per brand guide ("Precision-manufactured. Ready when the job starts.")

#### 6.2 The Facility
- 75,000 sq ft manufacturing facility in DeKalb, Illinois
- 7 extrusion lines
- Vertical integration: copper fabrication through extrusion (in-house)
- *Photo/video placeholder: extrusion lines, copper rod fabrication, quality lab*

#### 6.3 Vertical Integration — Supply Chain Advantage
- Explain what it means for the customer:
  - Raw material security: in-house copper rod protects against market shortages
  - Custom agility: faster prototyping of non-standard constructions
  - Cost control: buffers some market volatility
- Section headline could be: "From Copper Rod to Finished Wire — All Under One Roof"

#### 6.4 Certifications & Standards
- ISO 9001:2015 (quality management)
- UL Listed, CSA Approved, SAE Approved
- RoHS3 · REACH · Conflict Minerals · TSCA · Prop 65
- Visual: certification logos

#### 6.5 Our People
- Brief statement on team value (from old site: "People are our most valuable corporate asset")
- Not a full team directory — just a human touch before the CTA
- *Photo placeholder: team / facility*

#### 6.6 CTA Row
- [View Our Products] [Find a Sales Rep] [Contact Us]

---

### 7. CAREERS — `/careers/`

**Goal:** Attract manufacturing and operations talent in DeKalb, IL.

**Sections:**

#### 7.1 Header
- "Join the Team at Unified Wire & Cable"
- Company statement: "Since 1978 we have been making quality insulated wire... We can't do it without the dedicated employees on our team."

#### 7.2 Benefits
- Grid of benefit cards:
  - Medical · Dental · Vision
  - Life / AD&D
  - STD / LTD
  - EAP
  - Critical Illness Insurance
  - Uniform Contribution
  - 401(k) Match
  - Vacation & Holidays

#### 7.3 Open Positions
- *Placeholder:* "We are currently accepting applications. Send your resume to careers@unifiedwire.com"
- Or simple job listing component if positions are known

#### 7.4 CTA
- [Apply Now — careers@unifiedwire.com]

---

### 8. REP LOCATOR — `/find-a-rep/`

**Status: DONE** (`rep-locator.html`)

No additional content needed at this time.

---

### 9. CONTACT — `/contact/`

**Goal:** Route inquiries efficiently. No form wall for specs — that's handled by spec-navigator and compliance pages.

**Sections:**

#### 9.1 Header
- "Get in Touch"
- Sub: "For quotes, custom specs, or general inquiries — reach us directly."

#### 9.2 Contact Cards (not a buried form — real info upfront)
| Role | Contact |
|------|---------|
| Sales & Quotes | uwcsales@unifiedwire.com |
| Customer Service | tina.fant@unifiedwire.com |
| Accounts Payable | accountspayable@unifiedwire.com |
| Careers | careers@unifiedwire.com |
| Main Phone | 815-748-4876 |

#### 9.3 Contact Form
- Fields: Name · Company · Email · Phone · Product Interest (dropdown: product categories) · Message
- Note: Spec sheet requests → redirect to spec-navigator. This form is for quotes and custom inquiries.

#### 9.4 Location / Map
- Unified Wire & Cable, Inc.
- DeKalb, Illinois 60115
- "Located 1.5 hours west of downtown Chicago"
- Embedded map or static map image

---

## GLOBAL COMPONENTS

### Navigation
- Logo (left)
- Primary: Products · Markets · Resources · About · Careers
- Right: [Find a Rep] (outlined) · [Request a Quote] (filled blue)
- Mobile: hamburger, full-screen overlay

### Footer
- Column 1: Logo + tagline + certifications strip
- Column 2: Products (category links)
- Column 3: Company (About, Careers, Contact, Find a Rep)
- Column 4: Resources (Compliance, Tools, Spec Navigator)
- Bottom bar: © 2026 Unified Wire & Cable, Inc. · DeKalb, IL · Privacy Policy

### Persistent Elements
- Request a Quote button / sticky CTA on mobile
- "Find a Rep" always available in nav

---

## BUILD ORDER RECOMMENDATION

| Order | Page | Rationale |
|-------|------|-----------|
| 1 | Home | Sets tone, validates design system across all component types |
| 2 | Products | Wraps spec-navigator; high commercial value |
| 3 | Resources → Compliance Center | Competitive gap item; fast to build, high trust impact |
| 4 | Skin Coat Technology | Key differentiator; needed before About |
| 5 | About | Needed for credibility; references facility/vertical integration |
| 6 | Markets hub + sub-pages | Template-driven; build hub first, sub-pages are repeatable |
| 7 | Resources → Engineering Toolbox | Calculators require JS logic; build after static pages are done |
| 8 | Contact | Simple, fast |
| 9 | Careers | Low traffic priority; straightforward layout |
| — | Find a Rep | DONE |
