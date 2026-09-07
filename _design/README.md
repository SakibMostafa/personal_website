# Handoff — Sakib Mostafa's Personal Portfolio Site

## Overview

A six-page personal portfolio for **Sakib Mostafa** — Postdoctoral Scholar, Department of Radiation Oncology, Stanford School of Medicine. Working at the intersection of AI and cancer research (liquid biopsy, cfRNA, multi-omics integration, graph foundation models).

Target deployment: **GitHub Pages**, static hosting.

Pages: **Home · Research · Publications · Teaching · CV · Contact.**

Two complete design directions were prototyped — Direction A ("Quiet Scholar") and Direction B ("Editorial Grid"). The user has not yet committed to one. **See `OPEN_QUESTIONS.md` for the first decision the developer needs to extract from the user before building.**

A separate `Logo.html` brand identity sheet defines the **Aperture** logo system (the canonical mark for the site, plus a refined Cormorant Garamond / IBM Plex Mono / navy-teal-ivory-gold palette). The user picked this identity *after* the two direction prototypes were built, so it is not yet rolled into either direction. **See `OPEN_QUESTIONS.md`.**

## About the design files

The files in this bundle are **design references created in HTML / inline JSX** — prototypes showing the intended look, feel, and content. They are not production code to copy directly.

They were authored to run inside a design-review canvas (`<DesignCanvas>` + `<DCArtboard>` wrappers) that scales each page to a fixed artboard width so the two directions can sit side-by-side for comparison. **None of that canvas chrome belongs in the final site.** The portfolio components themselves (`APortfolio` and `BPortfolio` in `portfolio-a.jsx` / `portfolio-b.jsx`) are what should be ported.

The task is to **recreate these designs in a real static-site codebase** suitable for GitHub Pages, picking the most appropriate framework. Recommended:

- **Astro** (preferred) — zero JS by default, file-based routing, MDX support, trivial Pages deploy. Each "page" maps cleanly to an `.astro` file.
- **Next.js static export** — `next export` works well on Pages.
- **Vite + React Router** — straightforward if sticking close to the JSX in the bundle.
- **Plain HTML + CSS** — totally viable, the designs are not interactive beyond nav links.

Tailwind is a reasonable choice for styling, but the prototypes use inline-style objects + a small `<style>` block per direction. The developer can pick whichever idiom fits the framework.

## Fidelity

**High-fidelity.** Colors, type scale, spacing, borders, and copy are final. Recreate pixel-perfect. The only thing not final is which direction (and which logo) to ship — see `OPEN_QUESTIONS.md`.

The prototypes have been signed off by the user on:

- Two design directions, six pages each (Home, Research, Publications, Teaching, CV, Contact).
- The Aperture identity system (logo + palette + type).
- Removal of all "academic job market / 2026–27 faculty market" framing throughout. Do not re-introduce it.

---

## Files in this bundle

| File | What it is |
|---|---|
| `README.md` | This document. |
| `OPEN_QUESTIONS.md` | Questions to ask the user before building. **Read this first.** |
| `portfolio-a.jsx` | Direction A — "Quiet Scholar." Six page components + nav + footer. |
| `portfolio-b.jsx` | Direction B — "Editorial Grid." Six page components + nav + footer. |
| `cv-data.js` | **Single source of truth for all content.** Used by both directions. |
| `Logo.html` | Aperture brand identity sheet — mark, lockups, palette, typography. |
| `index.html` | The design canvas wrapper. **Reference only — do not ship.** |

---

## Open questions (must resolve before building)

See `OPEN_QUESTIONS.md`. Summary:

1. **Direction A, Direction B, or a merge?**
2. **Roll the Aperture identity (navy / teal / ivory / gold + Cormorant Garamond) into the chosen direction, or keep that direction's original palette and type?**
3. **Real social/profile URLs** (Google Scholar, LinkedIn, GitHub, ORCID, ResearchGate, CV PDF).
4. **Favicon and OG image** (the Aperture mark works as both — needs to be exported as static PNG/SVG).

---

## Pages — structure

All six pages render at a max content width with horizontal padding (`88px` in Direction A, `64px` in Direction B). All pages share a sticky nav at top and a footer at bottom.

### 1. Home

- Hero: name (large display), tagline, short bio, three CTAs (View research / Download CV / Email), and a 6-cell stats strip beneath.
- In Direction A: the **Aperture mark** sits in the upper-right of the hero, 280×280px, absolutely positioned.
- In Direction B: a magazine-style two-column hero (text + large "FIG. 01" plate), followed by a featured Nature-family manuscript-status block.

### 2. Research

- Headline + intro paragraph.
- "Nature-family submissions" — status list for three manuscripts under review and two being prepared for submission (data: `CV.natureSubmissions`).
- "Research areas" — 2×2 grid of four focus areas (data: `CV.researchAreas`).
- "In preparation" — list of upcoming papers (data: `CV.inPrep`).
- Direction B also features the current position bulletted out, boxed.

### 3. Publications

- Counter header: `19 papers · 1 book chapter · 425+ citations`.
- Publications grouped by topic, sourced from `CV.publications` (an object of `label → papers[]`). Groups: *Current Nature-Family Manuscript Status*, *Cancer and Biomedical AI*, *Neurological Disorder Diagnosis & Medical Imaging*, *Plant Phenomics & Agricultural AI*, *Software Engineering & Methodological CS*, *Book Chapter*.
- Each paper: authors (with `Mostafa` bolded), title, venue (italic), year, citation count badge, impact factor badge, optional note badge.

### 4. Teaching

- Headline.
- "Courses & lectureship" (4 entries: `CV.teaching.lecturer`).
- "Teaching assistantships" (6 entries: `CV.teaching.ta`).
- "Mentoring" (11 entries: `CV.teaching.mentoring`).

### 5. CV

Long-form, paginates well to PDF. Sections in order: **Education · Experience · Awards & funding · Patents · Selected talks · Technical skills · Service & leadership · Media coverage · References.** Each section sources from a top-level key in `CV` (`education`, `positions`, `awards`, `patents`, `talks`, `skills`, `service`, `media`, `references`).

Direction A renders this as a two-column "label / content" layout. Direction B uses heavy editorial rules and section dividers.

### 6. Contact

- Headline.
- Email / Scholar / LinkedIn cards.
- Location card.
- Stanford cancer collaborators (sub-list from `CV.stanfordCollaborators`).
- Collaborator map — a radial cluster diagram with Sakib at center and seven institutional clusters around (`CV.collabClusters`). Position percentages are hand-tuned and documented in the JSX. Use `<svg>` for the connecting lines; absolutely-positioned divs for the nodes.

---

## Identity & Design tokens

### The Aperture (canonical identity — `Logo.html`)

A thin scholarly ring (microscope field / cell membrane) containing an asymmetric three-node cluster. Two nodes navy (structural relationships), one node warm gold (the focal signal). One interior edge is rendered in teal to suggest the interpretable connection.

The full geometry (viewBox 100×100):

```svg
<svg viewBox="0 0 100 100">
  <!-- Outer ring -->
  <circle cx="50" cy="50" r="42" fill="none" stroke="#142a44" stroke-width="1.4"/>
  <!-- Faint inner ring (optional, for depth at large sizes) -->
  <circle cx="50" cy="50" r="38.5" fill="none" stroke="#142a44" stroke-width="0.5" stroke-opacity="0.3"/>
  <!-- Edges -->
  <line x1="38" y1="56" x2="60" y2="62" stroke="#142a44" stroke-width="0.9"/>
  <line x1="38" y1="56" x2="56" y2="34" stroke="#142a44" stroke-width="0.9"/>
  <line x1="60" y1="62" x2="56" y2="34" stroke="#4e8a8c" stroke-width="0.9"/>
  <!-- Nodes -->
  <circle cx="38" cy="56" r="4.6" fill="#142a44"/>
  <circle cx="60" cy="62" r="3.4" fill="#142a44"/>
  <circle cx="56" cy="34" r="3.8" fill="#b9883c"/>
</svg>
```

Stroke widths scale up at smaller display sizes — see the four compact variants in `Logo.html` (96 / 48 / 24px) for exact ratios. Below ~24px, the edges drop out entirely and only the three nodes plus the ring remain.

### Palette (Aperture identity)

| Role | Name | Hex |
|---|---|---|
| Primary · 01 | Midnight Field | `#0B1827` |
| Primary · 02 | Deep Navy | `#142A44` |
| Secondary | Scholar Teal | `#4E8A8C` |
| Ground · 01 | Soft Ivory | `#F5EFE3` |
| Ground · 02 | Warm Vellum | `#ECE4D3` |
| Accent · 01 | Manuscript Gold | `#B9883C` |
| Accent · 02 | Folio Rose | `#B56B6B` |
| Rule | — | `#C9BEA6` |

Used in `Logo.html`. **Reserve the gold for the accent node, full-stops, and small precise moments. Never use it as a fill on large surfaces.**

### Palette — Direction A (Quiet Scholar — current, may be replaced)

```js
{
  bg: "#fafaf7", panel: "#ffffff", ink: "#15151a",
  inkSoft: "#4a4a52", inkMute: "#8a8a92", line: "#e6e4dc",
  accent: "#8c1515",       // Stanford cardinal
  accentSoft: "#f4e9e9",
}
```

### Palette — Direction B (Editorial Grid — current, may be replaced)

```js
{
  bg: "#f1ece1", panel: "#f7f3e8", ink: "#1a1814",
  inkSoft: "#3d3a32", inkMute: "#857f6f", line: "#d6cfbb",
  accent: "#b34e2a",       // warm terracotta
  accentDeep: "#7d3219",
}
```

### Typography

- **Aperture identity (canonical):**
  - Wordmark: **Cormorant Garamond**, weight 500, surname in italic.
  - UI / labels / mono: **IBM Plex Mono**, weight 400 / 500, tracking `0.06–0.18em`, uppercase for labels.
  - Numerals: lining figures in body; tabular in tables.
- **Direction A:** **Inter** for everything; UI monospace fallback for small captions.
- **Direction B:** **Space Grotesk** for display, **JetBrains Mono** for labels, lining figures.

Load fonts via Google Fonts in the chosen framework's appropriate head/layout entry point.

### Spacing & layout

Both directions use generous, fixed pixel padding rather than a tight token scale. Recurring values:

- Page horizontal padding: `88px` (A), `64px` (B).
- Section vertical padding: `72–104px`.
- Card / cell padding: `14–28px`.
- Gaps in grids: `14 / 18 / 22 / 32 / 56` px.

### Border / rule

- Direction A: 1px `#e6e4dc`.
- Direction B: 1px `#d6cfbb` (thin) and 2px `bTokens.ink` (thick editorial rule).
- Aperture identity: 1px `#c9bea6` on ivory; 1px ivory @ 14% alpha on navy.

---

## Content — `cv-data.js`

A single global `window.CV` object. **Treat this file as the data model.** Port it to whatever shape your chosen framework wants (a `.json`, a `.ts` module, MDX frontmatter per page, etc.) without changing field names.

Top-level keys: `name`, `role`, `affiliation`, `location`, `email`, `scholar`, `linkedin`, `tagline`, `shortBio`, `highlights[]`, `natureSubmissions[]`, `researchAreas[]`, `positions[]`, `education[]`, `publications{}` (object of group → papers[]), `inPrep[]`, `patents[]`, `awards[]`, `talks[]`, `teaching{lecturer[], ta[], mentoring[]}`, `stanfordCollaborators[]`, `collabClusters[]`, `skills{}`, `service{}`, `media[]`, `references[]`.

Author name appears in **bold** wherever it shows up in an authors string (`Mostafa` substring match).

---

## Interactions & behavior

The site is mostly static. The only interactive behaviors are:

- **Nav links** — switch between the six pages. In the prototype this is a `page` prop swap; in a real site it's standard routing.
- **Hover states** on nav links (active page gets an underline in the accent color), CTA pills, and publication links. None of the prototypes specify hover states explicitly — use a subtle opacity drop or accent-color shift consistent with the chosen direction.
- **CV download** — a static PDF served from `/cv.pdf` (or wherever). The user will supply the PDF.
- **Email link** — `mailto:sakib.mostafa@stanford.edu`.

No animations beyond the optional subtle Aperture mark presentation. The earlier mortarboard flip / hand illustration has been **explicitly removed**. Do not add motion.

### Responsive

The prototypes were designed at desktop widths (`~1180–1440px` content). At narrower viewports:

- Drop multi-column grids to single columns at < 900px.
- Reduce hero display type by ~30% at < 600px.
- Stack the masthead three-column row to vertical at < 700px.
- Reduce page horizontal padding to `24px` at < 600px.

The Aperture mark in Direction A's Home should move below the headline (or scale down to a small mark inline with the name) on mobile, not stay absolute.

---

## Assets to supply

- **CV PDF** — `cv.pdf` for the Download CV CTA.
- **Favicon** — derive from the Aperture mark (32×32, 192×192, 512×512 PNG + SVG).
- **OG image** — 1200×630 PNG, ideally the primary horizontal lockup centered on Soft Ivory.
- **Headshot** — currently no headshot is used. Ask if one should be added to Home or Contact.

---

## Deploy

GitHub Pages on a project repo (likely `sakibmostafa.github.io` or `<repo>/`). Standard GitHub Actions workflow for the chosen framework:

- Astro / Next: built artifact uploaded to `gh-pages` branch via `actions/deploy-pages`.
- Plain static: push `dist/` to `gh-pages`.

Ensure `base` is set correctly if the site lives under a subpath. Add a `CNAME` file if the user wants a custom domain.
