import type { Metadata } from "next";

import {
  disciplineFamilies,
  disciplines,
  disciplinesByFamily,
} from "@/content/disciplines";
import { pageMetadata } from "@/lib/seo";
import { pad, slugify } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
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
      <PageHero
        eyebrow="Scientific divisions"
        index={String(disciplines.length)}
        crumbs={[{ label: "Home", href: "/" }, { label: "Research" }]}
        title="Our scientific divisions"
        lead="Each division holds its own accreditations, its own instrument estate and its own species list. They share one campus, one quality system and one archive — which is why a programme can cross between them without a handover."
        meta={[
          { label: "Divisions", value: String(disciplines.length) },
          { label: "Families", value: String(disciplineFamilies.length) },
          { label: "Listed methods", value: String(listedMethods) },
          { label: "Guidelines cited", value: String(citedGuidelines) },
        ]}
        visual={<RegisterHeroField />}
      />

      <DivisionFinder entries={finderEntries} families={finderFamilies} />

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
