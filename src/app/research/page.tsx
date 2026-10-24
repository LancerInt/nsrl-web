import type { Metadata } from "next";

import {
  disciplineFamilies,
  disciplines,
  disciplinesByFamily,
} from "@/content/disciplines";
import { pageMetadata } from "@/lib/seo";
import { pad, slugify } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RegisterHeroField } from "@/components/research/RegisterHeroField";
import {
  DivisionFinder,
  type FinderEntry,
  type FinderFamily,
} from "@/components/research/DivisionFinder";
import { FamilyLedger } from "@/components/research/FamilyLedger";
import { AccreditationMatrix } from "@/components/research/AccreditationMatrix";
import { methodCount } from "@/components/research/variation";

export const metadata: Metadata = pageMetadata({
  title: "Scientific Divisions | Accredited Research Departments",
  description:
    "The NSRL research divisions — toxicology, ecotoxicology, chemistry, microbiology, entomology, the vivarium and custom studies — with the accreditations each works under.",
  path: "/research",
  keywords: [
    "preclinical research divisions",
    "GLP toxicology laboratory",
    "ecotoxicology testing",
    "medical device testing",
    "contract research organisation India",
  ],
});

/* Counts are derived from the content module, never asserted independently. */
const listedMethods = disciplines.reduce(
  (total, discipline) => total + methodCount(discipline),
  0,
);
const citedGuidelines = new Set(
  disciplines.flatMap((discipline) => discipline.guidelines ?? []),
).size;

/* The finder's index, assembled on the server. `terms` is every string a
   sponsor might plausibly search for — method names, guideline numbers,
   species and instruments — flattened once here so the client ships one
   string per division rather than the whole capability tree. */
const finderEntries: FinderEntry[] = disciplines.map((discipline) => ({
  slug: discipline.slug,
  name: discipline.name,
  family: discipline.family,
  summary: discipline.summary,
  terms: [
    discipline.shortName ?? "",
    ...discipline.capabilities.flatMap((group) => [group.title, ...group.items]),
    ...(discipline.guidelines ?? []),
    ...(discipline.species ?? []),
    ...(discipline.instruments ?? []),
  ]
    .join(" ")
    .toLowerCase(),
}));

const finderFamilies: FinderFamily[] = disciplineFamilies.map((family) => ({
  id: slugify(family),
  name: family,
  count: disciplinesByFamily(family).length,
}));

export default function ResearchIndexPage() {
  return (
    <>
      {/*
        One section, not two.

        This was `PageHero` (426px) followed by the finder's own band
        (281px) — two wrappers, two sets of vertical padding and a stats
        card sized like a hero aside, which together pushed the first
        division's heading to y=816 at 1440x900. A reader arriving at a
        directory saw no entry from it.

        Everything a reader needs before the listings now sits in one
        band: breadcrumb, heading, one introduction, the counts as a row
        rather than a card, then search and the family chips. The finder
        renders `bare` so it contributes its controls and not a second
        section.
      */}
      <section className="relative isolate overflow-hidden border-b border-[var(--rule)] bg-canvas">
        <RegisterHeroField />
        <div className="shell relative pb-10 pt-[calc(var(--nav-h)+clamp(1.25rem,2.5vw,2rem))]">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Research" }]} />

          <div className="mt-6 grid gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
            <div>
              <Eyebrow>Scientific divisions</Eyebrow>
              <h1 className="mt-4 font-display text-d2 text-ink-900">
                Explore our scientific divisions.
              </h1>
            </div>
            <p className="measure text-small text-neutral-600">
              Seven specialist divisions bring together expertise in safety assessment,
              analytical testing and applied research. Coordinated study planning, documented
              procedures and clear reporting support your project from start to finish.
            </p>
          </div>

          {/* The counts as a row. They were a four-cell card in the hero's
              right column, which is a lot of structure for four numbers. */}
          <dl className="mt-7 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-y border-[var(--rule)] py-4">
            {[
              { label: "Divisions", value: String(disciplines.length) },
              { label: "Discipline groups", value: String(disciplineFamilies.length) },
              { label: "Listed methods", value: String(listedMethods) },
              { label: "Guidelines cited", value: String(citedGuidelines) },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2.5">
                <dt className="label-mono text-neutral-550">{stat.label}</dt>
                <dd className="font-display text-h2 tabular-nums text-ink-900">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7">
            <DivisionFinder entries={finderEntries} families={finderFamilies} bare />
          </div>
        </div>
      </section>

      {/* The register, family by family. Every division is on the page
          whatever the finder above is doing. */}
      {disciplineFamilies.map((family, i) => (
        <FamilyLedger
          key={family}
          family={family}
          index={pad(i + 1)}
          items={disciplinesByFamily(family)}
          tone={i % 2 === 0 ? "canvas" : "sunken"}
        />
      ))}

      <AccreditationMatrix />

      {/*
        The page used to close with its own "Not sure which division owns
        your question?" band, and the shared proposal section follows every
        page immediately after it — two conversion blocks back to back, each
        weakening the other. The shared one stays, because it is the single
        closing ask the whole site is built around. What this page lost with
        it was the direct line, so that moved into the finder at the top,
        where a visitor who cannot place their study is actually standing.
      */}
    </>
  );
}
