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
- **A count in prose is derived, never typed.** Division, sector,
  accreditation, package and environment counts all read their arrays
  through `numberWord()`. Two bugs came from hand-written counts — "thirteen
  divisions" after six were withdrawn, and "six controlled environments"
  over a five-row table — and neither can recur.
- **`species` counts what is *listed*, not what is held.** Ecotoxicology
  claims 26 species and its array holds 12 entries, because those entries
  are taxonomic groups ("Birds", "Crustaceans") covering the 26. The ledger
  therefore suppresses the derived count wherever the headline claim already
  states a species figure, and labels it "Species listed" everywhere else.
  **If NSRL wants the twelve groups replaced by twenty-six named species,
  that is a content edit in `disciplines.ts` and the suppression can go.**

**Study Packages** (`/products`) are an editorial regrouping of studies already
listed as individual capabilities — assembled the way a regulatory affairs team
buys them. They assert no new capability, but should still be reviewed.

---

## ⚠️ Open items from the 21 Oct 2026 content & imagery review

The review document and its extraction archive are in
`assets/NSRL-Content-and-Review/`. Everything in it that could be fixed in
code has been. What remains needs either NSRL's own facts or assets that were
not delivered.

### Imagery — resolved 22 Oct 2026

The commissioned set arrived and is installed: **29 WebP illustrations in
`public/images/nsrl/`, one per placement**, delivered in
`assets/NSRL-All-29-Image-Replacements/` with a manifest and size map. Every
stock photograph has been deleted. `src/content/imagery.ts` is the only file
that maps a placement to a file.

The rule that travels with them, from the supplier's own README and the
earlier review, is unchanged and still binding:

> These are branded conceptual/editorial scientific illustrations, not
> photographs proving actual NSRL buildings, equipment, staff, certificates
> or test results.

So the set carries the sector, division and service illustrations, and the
facility sections are captioned by *activity* rather than by room. It does
**not** discharge the need for authentic photography below, and no caption
anywhere may present an illustration as a record of the site.

**Open action from the supplier:** "Review all species and method depictions
with the scientific owner." The entomology, ecotoxicology, vivarium and
toxicology illustrations each depict organisms and procedures; the alt text
describes what is drawn, but whether what is drawn is representative is a
scientific judgement, not an editorial one.

### Blocked on NSRL's facts or sign-off

| Review item | What is needed |
|---|---|
| Enquiry and application delivery | A real endpoint. Both forms still hand off to `mailto:` and now say so plainly. The review also asks the enquiry to collect name, work email, company, sector and a short brief with phone optional — worth doing in the same change as the endpoint, not before. |
| Claim evidence | An internal owner and an as-of date for 20,000+ studies, 275+ clients, 350+ professionals, 450+ instruments, 70+ clean rooms, "India's largest", the first nano-fertiliser registration and FDA/EMA acceptance. The site asserts all of these on the reference material alone. |
| Certificate detail | Certificate number, validity date, scope and address per record, so `/downloads` can show them. Division-level badges should then be matched to the actual certificate scope rather than implying blanket coverage. |
| Species register | An approved list, so counts can state species rather than groups. Until then ecotoxicology's twelve entries are labelled **Organism groups** and entomology's single general statement carries no counter. |
| Method titles | OECD 218 is still published as a bare number because the source gave no title, and guessing one names the wrong guideline. The scientific owner should supply it and approve the grouping of "methods", "platforms" and "frameworks". |
| Hero supporting line | The review proposes "Chemistry, toxicology and environmental testing for agrochemical, industrial chemical and food & feed submissions" and explicitly gates it on NSRL approving the service scope. **Not applied.** |
| Newsroom | The two 2023 records are no longer listed. Publish current, dated, owned updates — or supply the body for the withdrawn record and it becomes an article. |

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

**29 commissioned NSRL illustrations, one per placement**, in
`public/images/nsrl/`. Every placement is mapped in one file —
`src/content/imagery.ts` — with its alt text, delivered dimensions and crop
(`position`) written once. `SpecimenPlate` renders an optimised `next/image`
when passed a `src`, and falls back to its deterministic SVG drawing
otherwise. No colour grade is applied: the artwork is already rendered to
this palette, and the filter that used to unify a dozen mismatched
photographs would now only pull it off-brand.

Nothing is shared between slots. The old stock library had eleven files
doing twenty-nine jobs, so one bench appeared on a sector card and a
division page at different aspect ratios and no crop suited both. The two
maps that used to be one are the clearest case: `sectorCardImage` (homepage,
16:10, read at a glance) and `sectorPageImage` (sector hero, 4:3, read
beside the scope copy) are deliberately different illustrations of the same
sector.

### What they are — and the line not to cross

They are branded conceptual illustrations, **not photographs**. No caption
may present one as a record of NSRL's premises, staff, equipment,
certificates or results, and the alt text describes the drawing rather than
asserting a room. The facility sections are therefore captioned by activity
("Instrument operation", "Containment work") rather than by room. Full
licence and provenance note in `public/images/CREDITS.md`.

### ⚠ Still outstanding

**Illustration cannot do these jobs**, and the set does not claim to:

| Priority | Needed | Why |
|---|---|---|
| **1** | **Scientific sign-off on the artwork** | The supplier's own instruction: "Review all species and method depictions with the scientific owner." Entomology, ecotoxicology, vivarium and toxicology each depict organisms and procedures. Whether what is drawn is representative is a scientific judgement, not an editorial one. |
| **1** | **Leadership portrait and a real team photograph** | `/about` carries an abstract illustration captioned "Illustration — not a portrait". That is honest, not a substitute. |
| **2** | **Facility documentation** — exterior or reception, the actual instrument benches, environmental test systems, the archive, controlled rooms | Needed before any caption can name a room. Until then `/facilities` describes activities and specifications, both drawn from `content/facilities.ts`. |
| **2** | **Vivarium** — approved animal-housing and welfare photography | The welfare programme is a claim the site makes; a rendering of an enclosure does not evidence it. |

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
- **Forms have no backend, and now say so.** They validate client-side and
  then compose a pre-filled `mailto:`. The enquiry button reads **"Compose
  enquiry email"** and the helper text reads "you still need to send it",
  because "Send enquiry" promised a submission this page cannot make — an
  enquiry only reaches NSRL once the visitor sends the draft themselves, and
  anything they abandon is simply lost.

  **This is the site's weakest point for lead capture and it is not a
  labelling problem.** A real endpoint with server-side confirmation and
  error handling is the fix; both forms carry a `TODO(nsrl):` marking
  exactly where to POST, with the mailto kept as the fallback for when that
  request fails. When it lands, the button reverts to "Send enquiry".
