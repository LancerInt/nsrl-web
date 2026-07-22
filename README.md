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
| All 10 accreditations **and their certificate URLs** | `src/content/accreditations.ts` | From reference site — the certificate links point at the reference organisation's Google Drive and **must be repointed** |
| Guideline numbers, test names, species, instruments | `src/content/disciplines.ts`, `industries.ts` | From reference site, reproduced verbatim |
| One news article | `src/content/news.ts` → `articles` | From reference site |
| One archive record with **no body** | `src/content/news.ts` → `archiveRecords` | Title and date are sourced; the body was never published, so none is shown |
| SENAVE certificate link | `src/content/accreditations.ts` | **Missing** — the reference register reused the AERB document, so no link is shown |

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
  accepted study reports. Bodies that certify or license the laboratory
  (CIBRC, AERB, AYUSH, SENASA, SENAVE) appear under accreditations instead.
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
  ruled title-block cards, a double rule closing each hero. The global footer
  is the single deep-navy block (the file's back cover).
- **Colour** is derived from the supplied logo: `ink-*` (the navy wordmark and
  orbital), `meniscus-*` (the liquid in the flask — carries figure traces),
  `signal-*` (the green orbital — reserved strictly for functional marks:
  held accreditations, acceptance ticks, form feedback), plus `neutral-*` and
  the surface tokens `canvas` / `canvas-raised` / `canvas-sunken` / `deep`.
  No component contains a hex value.
- **Type**: Newsreader (serif display — the document voice, weights set in the
  tokens), Inter (body and UI), IBM Plex Mono (the monospace "calibration
  label" voice). Fluid display scale `text-d1`–`text-d4` via `clamp()`; the
  roman `text-editorial` register replaces the old italic accent voice.
- **Motion**: one vocabulary in `src/lib/motion.ts`. Native scroll (no
  smooth-scroll hijack); reveals ride a single IntersectionObserver
  (`data-reveal`); GSAP handles pinning and scrub; Framer Motion handles
  menus, transitions and presence. Numbers are static — a laboratory reports
  its figures, it does not perform them.

## Imagery

The figure slots carry **real laboratory photography**. Every image is mapped in
one place — `src/content/imagery.ts` — with its `alt` text written once, and the
per-page assignments (`divisionImage`, `sectorImage`) resolved through
`imageFor()` so a missing slug degrades to a real photo rather than crashing the
render. `SpecimenPlate` renders an optimised `next/image` when passed a `src`,
and falls back to its deterministic SVG drawing otherwise.

The files in `public/images/` are **free-licence stand-ins** (CC0, public
domain, and a few CC-BY/BY-SA with attribution recorded in
`public/images/CREDITS.md`) — representative laboratories, not NSRL's own.
**Replace them with NSRL's photography before launch**: drop the new files in,
point the `src` values in `imagery.ts` at them, and no component changes are
needed.

## Accessibility & performance notes

- Motion is fully inert under `prefers-reduced-motion` — GSAP triggers do not
  register and all reveals resolve immediately.
- `[data-reveal]` only hides content once JavaScript has marked the document, so
  a failed hydration never leaves a blank page.
- Anchor targets carry `scroll-margin-top`, so in-page links clear the fixed
  header without any scroll interception.
- Forms have no backend. They validate client-side and then compose a pre-filled
  `mailto:` so enquiries genuinely reach NSRL with zero server. Each carries a
  `TODO(nsrl):` marking exactly where to swap in a real endpoint.
