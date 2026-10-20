# NSRL

A custom website for NSRL — a preclinical contract research organisation.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP +
ScrollTrigger and Framer Motion.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

---

## ⚠️ Read this before launch — facts that need confirming

The content was extracted from the reference site supplied with the brief
(`brfchennai.com`), which is where every scientific fact, accreditation,
guideline number, statistic and address on this site comes from. NSRL's own
domain (`nsrl.co.in`) did not resolve when the site was built, so nothing could
be cross-checked against it.

**Everything below is inherited from the reference material and must be confirmed
or replaced by NSRL before this site goes live.** All of it lives in
`src/content/` — no fact is hardcoded in a component, so each is a one-line edit.

| What | Where | Status |
|---|---|---|
| Domain, legal name, contact email | `src/content/site.ts` → `site`, `contact` | **Placeholder** — invented for NSRL, must be replaced |
| LinkedIn URL | `src/content/site.ts` → `site.linkedin` | **Placeholder** |
| Phone numbers | `src/content/site.ts` → `contact` | From reference site |
| Three site addresses | `src/content/site.ts` → `locations` | From reference site |
| Founder name and role | `src/content/organisation.ts` → `leadership` | From reference site |
| All statistics (20,000 studies, 275 clients, 150,000 sq ft, 450 instruments, 350 staff, 70 clean rooms, 26 species) | `src/content/organisation.ts`, `facilities.ts` | From reference site |
| The 4 remaining accreditations **and their certificate URLs** | `src/content/accreditations.ts` | From reference site — the certificate links point at the reference organisation's Google Drive and **must be repointed** |
| Guideline numbers, test names, species, instruments | `src/content/disciplines.ts`, `industries.ts` | From reference site, reproduced verbatim |
| One news article | `src/content/news.ts` → `articles` | From reference site |
| One archive record with **no body** | `src/content/news.ts` → `archiveRecords` | Title and date are sourced; the body was never published, so none is shown |

No dates were invented anywhere. The reference material carries achievements but
not the years they occurred, so the site presents milestones and a study
lifecycle instead of a company timeline. If NSRL has real founding dates, add
them to `src/content/organisation.ts`.

### Rules the content layer enforces

These were applied deliberately after an audit, and are worth preserving:

- **Guideline numbers carry a title only where the source gave one.** OECD 218
  is published as a bare number for exactly this reason — the source cited the
  number with no test name, and the obvious guess is the wrong guideline.
- **"Accepted by" and "certified by" are different claims.** `acceptingAuthorities`
  lists only the US FDA and the EMA, the two agencies the source says have
  accepted study reports. Bodies that certify or recognise the laboratory
  (NGCMA, NABL, DSIR, CIBRC) appear under accreditations instead.
- **No certificate is shown twice.** `accreditations.ts` throws at build time if
  two records share a certificate URL.
- **No prose is published under a real byline unless the source contains it.**
  Hence `archiveRecords`, which lists a real newsroom entry without inventing
  its body.
- **No comparative market claims** ("one of a small number", "the only") unless
  the source states them. "India's largest ecotoxicology department" and
  "India's first nano-fertiliser" are kept because the source asserts both.

**Study Packages** (`/products`) are an editorial regrouping of studies already
listed as individual capabilities — assembled the way a regulatory affairs team
buys them. They assert no new capability, but should still be reviewed.

---

## ⚠️ Scope withdrawn — and the claims that went with it

NSRL instructed the removal of six divisions, two sectors and six
accreditations. Everything listed below went with them, because a site whose
argument is "here is the certificate" cannot keep asserting a capability or an
accreditation it no longer lists.

**Divisions removed** (13 → 7): Genetic Toxicology, Safety Pharmacology,
Pathology, Pharmacology & Drug Discovery, Radioisotope Laboratory, Medical
Device Testing. Remaining: Toxicology, Ecotoxicology, Chemistry, Microbiology,
Entomology, Vivarium, Custom Studies.

**Sectors removed** (5 → 3): Pharmaceutical, Medical Devices & Healthcare.
Remaining: Agrochemical, Industrial Chemicals, Food & Feed Additives.

**Accreditations removed** (10 → 4): AAALAC, CPCSEA, AERB, AYUSH, SENASA,
SENAVE. Remaining: OECD GLP, NABL ISO/IEC 17025, SIRO/DSIR, CIBRC. The
`Animal welfare` and `International registration` categories no longer exist.

**Knock-on removals made to keep the site internally consistent.** Each of
these existed only because of something withdrawn above:

- Study packages: *Standard Genotoxicity Battery*, *Device Biocompatibility
  Programme*, *IND-Enabling Safety Package* (6 → 3).
- Toxicology's `Genetic toxicology` and `Safety pharmacology` capability
  groups, and Industrial Chemicals' `Genetic toxicology` study group — these
  would have gone on selling Ames tests and cardiovascular safety assessment
  from inside a page after the departments were withdrawn.
- The AERB Type 2 radioisotope environment and the Radiometric instrument
  group in `facilities.ts`; "Pathology", "Drug discovery", "Safety
  pharmacology" and "Radioisotope laboratory" from the site's `houses` list.
- Every prose assertion of AAALAC accreditation or CPCSEA registration —
  in the Vivarium and Toxicology and Microbiology division copy, the quality
  pillars, the 3Rs band, the About page's "governing accreditations", the
  news article, and the page metadata.
- The `AERB Type 2 radioisotope certification` milestone, replaced with the
  NABL accreditation already in the register.
- Careers departments: Geno-toxicology, Pathology, Medical Device,
  Radioisotope (Entomology added, since that division exists and was absent).
- SENASA/SENAVE removed from the agrochemical `frameworks` list.

**Two judgement calls you may want to reverse:**

1. **"Histopathological examination" is still listed** under Toxicology's
   general and inhalation groups. A tox study's histopathology is part of the
   tox study, so it survived the removal of the Pathology *division* — but if
   NSRL no longer reads tissue at all, those two lines must go too.
2. **Animal welfare copy was kept, the accreditations were not.** The
   vivarium, the 3Rs framework and the welfare language all remain; only the
   AAALAC and CPCSEA *claims* were stripped. If those are held and simply not
   published, the sentences can be reinstated — they are in
   `disciplines.ts` (vivarium, toxicology, microbiology), `organisation.ts`
   (`qualityPillars`, `qualitySystems`, `threeRs`) and `news.ts`.

**Counts are now derived, not written.** Headings, page titles and meta
descriptions read their numbers from `disciplines.length`,
`industries.length` and `accreditations.length` via `numberWord()` in
`lib/utils.ts`. The accreditation strip and the sector grid also pick their
column counts from the content length, so trimming the register again will
not leave an empty cell or an orphan card. Nothing hardcodes "thirteen" or
"five" any more.

---

## Architecture

```
src/
├── app/                  # routes; each page owns its metadata
│   ├── layout.tsx        # fonts, org + website JSON-LD, global shell
│   ├── template.tsx      # page transition (remounts per navigation)
│   └── globals.css       # the entire design system (Tailwind v4 @theme)
├── content/              # ← every fact on the site, typed. Single source of truth.
├── components/
│   ├── system/           # ScrollManager, MotionProvider
│   ├── layout/           # SiteHeader (mega menu), SiteFooter, Logo
│   ├── ui/               # shared primitives — Section, PageHero, ActionLink…
│   ├── visuals/          # generative SVG figures
│   └── <page>/           # sections belonging to one page
├── hooks/
└── lib/                  # cn, motion vocabulary, SEO builders
```

**Content and presentation are strictly separated.** A component never contains a
fact; `src/content/` never contains markup.

## Design system

Everything lives in `src/app/globals.css` under `@theme`. There is no
`tailwind.config.js` — Tailwind v4 is CSS-first.

- **Direction**: a light "scientific dossier" — pages are set like the title
  and register pages of a GLP study file: paper surfaces, hairline rules,
  ruled cards, photographic bands. The global footer is the single deep-navy
  block (the file's back cover).
- **Colour** is anchored on the brand palette: deep navy `#0B1730`
  (`ink-900`, and the `deep` surface), primary accent blue `#2868B2`
  (`ink-400` / `meniscus-500`), paper `#FAFAF8` (`canvas`) and the cool
  secondary band `#EEF3F7` (`canvas-sunken`). `signal-*` (green) is reserved
  strictly for *held* credentials and success feedback; `alert-*` (red) is
  the only error colour; everything interactive — links, hovers, active
  states, focus rings — is the accent blue. No component contains a hex
  value.
- **Measure and rhythm**: one content width (`--shell-max: 80rem`, 1280px
  outer) and one vertical scale (`--section-y`, 56px → 104px, with
  `--section-y-tight` for bands that sit against the one above).
- **Controls**: two heights (`--control-h` 46px, `--control-h-sm` 40px) and
  three radii (`--radius-control` 6px, `--radius-card` 12px, `--radius-lg`
  16px). Every button, input and chip resolves to one of each, so mixed rows
  line up without hand-tuning. `ActionLink` is the single CTA component;
  `card-interactive` and `row-interactive` are the only two hover states a
  surface may have.
- **Type**: Newsreader (serif display — the document voice, weights set in the
  tokens), Inter (body and UI), IBM Plex Mono (the monospace "calibration
  label" voice). Fluid display scale `text-d1`–`text-d4` via `clamp()`.
  `label-mono` is 12px at 0.07em — the old 11px/0.2em setting read as
  decoration rather than as a field label.
- **Icons**: `app/favicon.ico` (16/32/48), `app/icon.png` and
  `app/apple-icon.png` are generated from `assets/logo-favicon.png` — the
  orbital mark on its own. They are file-convention assets, so `layout.tsx`
  deliberately declares **no** `metadata.icons`: doing so overrides all three,
  which is how the tab previously ended up showing the full lockup with
  "NSRL" underneath it, illegible at 16px. The 16px entry is cut from the
  unpadded square; the larger sizes carry 6% clear space.
- **Photography**: `SpecimenPlate` applies the shared `photo` grade
  (desaturate, hold contrast, lift the blacks) so a library assembled from a
  dozen sources reads as one shoot, and takes each image's `objectPosition`
  from its record in `content/imagery.ts` rather than from the layout.
- **Motion**: one vocabulary in `src/lib/motion.ts`. Transitional only —
  there are no perpetual animations anywhere (no drifting hero, no rotating
  orbitals, no marquee). Native scroll; Framer Motion handles menus and
  transitions. Numbers are static — a laboratory reports its figures, it
  does not perform them.
- **Reveals** are *enhancement only*, and the contract is enforced in four
  places (`hooks/useReveal.ts` + the reveal block in `globals.css`):
  nothing is hidden until the hook arms it; only elements starting below the
  fold are ever armed; the observer's root extends 20% *past* the fold so a
  fade finishes before the element is on screen; and a 1.2s safety timer
  resolves anything the observer never reported. The stagger rides the
  transform, never opacity — a delay on opacity is by definition a window
  of blank content. No JavaScript, a blocked bundle, a dead
  `IntersectionObserver` and a restored mid-page scroll all end with the
  words on the screen.
- **Focus** is declared *unlayered* at the top of `globals.css`, not in
  `@layer base`. Tailwind's `transition-colors` includes `outline-color`, so
  a layered rule loses to any element with a colour transition and the ring
  fades up from the element's own text colour. Leave it unlayered.

## Imagery

Every image is mapped in one place — `src/content/imagery.ts` — with its `alt`
text and crop (`position`) written once, and the per-page assignments
(`divisionImage`, `sectorImage`, `heroImage`, `facilityShowcase`,
`facilityLead`, `facilityGallery`) resolved from there. `SpecimenPlate`
renders an optimised `next/image` when passed a `src`, and falls back to its
deterministic SVG drawing otherwise.

The files in `public/images/` are **free-licence stand-ins** (CC0, public
domain, and a few CC-BY/BY-SA with attribution recorded in
`public/images/CREDITS.md`) — representative laboratories, not NSRL's own.
**Replace them with NSRL's photography before launch**: drop the new files in,
point the `src` values in `imagery.ts` at them, and no component changes are
needed.

### ⚠ Photography still outstanding

**There is not one photograph of NSRL on this site.** Every file in
`public/images/` is a free-licence stand-in of somebody else's laboratory.
Nothing is captioned as NSRL's premises, and no caption claims a room in a
photograph is a room at Salem — the captions name the *kind* of environment
and the specification behind it, both of which come from `content/`. That is
the most the current library honestly supports, and it is why the list below
matters more than any design change in this repo.

The homepage uses ten photographs in ten slots with nothing repeated. That is
the whole usable library — there is no slack left, and these gaps are why
some pages share a frame.

| Priority | Shot needed | Why |
|---|---|---|
| **1** | **The archive** — organised record storage, labelled boxes, specimen or block storage, the RAID cabinet | The ten-year retention is the foundation of the quality argument, it had a frame in the facility showcase, and that frame has been **removed** rather than filled with unrelated stock. The showcase now runs three frames instead of four because of this. |
| **1** | **Hero plate, ≥2560px wide**, laboratory interior with a quiet left third and instrument detail right | The hero runs full-bleed. The widest file in the library is 1920px, and it is now enlarged ~1.3× to find a focal point, so it is noticeably soft on a 1440px screen at 2×. This is the single highest-impact replacement. |
| **1** | **Animal housing / vivarium** — clean rooms, racks, environmental control | Specified on `/facilities` as "70+ clean rooms" with no photograph at all. |
| **1** | **Inhalation suites** | Specified, no photograph. One of the capabilities the laboratory is differentiated on. |
| **2** | **Insect rearing colonies** | Specified, no photograph. |
| **2** | **Entomology** | Shares the nursery frame with ecotoxicology. |
| **2** | **Second containment frame** | `cleanroom-w2.jpg` carries both the homepage facility showcase and the facilities page lead. |
| **3** | **Exterior / site establishing shot** | Nothing on the site shows the building. |

**Withdrawn from use — on disk, credited, referenced by nothing:**

- `pipette-1.jpg` — a visible `rawpixel` watermark across the whole frame.
- `documents-w3.jpg` — a handwritten ledger photographed in a museum case
  with a period magazine in shot. It was standing in for the archive and
  communicated the opposite of a secure, validated, backed-up one. A weak
  photograph of the right subject can be re-graded; this was the right
  photograph of the wrong subject.

Neither may be reinstated. `imagery.ts` records why next to the map.

**Quality caveats on what is in use:** `chemistry-w1.jpg` (the hero) is a
fluorescent-lit room with a yellow-green cast and visibly dated instruments —
the hero grade desaturates hard and lets the navy overlay supply the colour,
which works, but it is a rescue rather than a choice. `cleanroom-w2.jpg` is
underexposed and carries a third-party equipment brand mark. `pharma-w2.jpg`
shows a named third-party pharmaceutical product and is used only as a
small sector card for that reason.

## Accessibility & performance notes

- Motion is fully inert under `prefers-reduced-motion` — all reveals resolve
  immediately, and there are no perpetual animations to suppress in the
  first place.
- The focus ring is 2px of accent blue at a 3px offset, applied unlayered so
  no utility can remove it and it never animates in. Verified on every
  tabbable element in the header, hero and card grids.
- The accreditation matrix on `/research` is a horizontally scrolling table
  below `lg`. Its wrapper **must** keep `position: relative`: `sr-only` is
  `position: absolute`, so without a positioned scroll container every cell's
  screen-reader label resolves against the section instead, takes its static
  position from inside a 736px table, and pushes the whole document 330px
  wider than a phone viewport.
- `[data-reveal]` only hides content once JavaScript has marked the document, so
  a failed hydration never leaves a blank page.
- Anchor targets carry `scroll-margin-top`, so in-page links clear the fixed
  header without any scroll interception.
- Forms have no backend. They validate client-side and then compose a pre-filled
  `mailto:` so enquiries genuinely reach NSRL with zero server. Each carries a
  `TODO(nsrl):` marking exactly where to swap in a real endpoint.
