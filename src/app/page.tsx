import type { Metadata } from "next";

import { site } from "@/content/site";
import { disciplines } from "@/content/disciplines";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { AccreditationTicker } from "@/components/home/AccreditationTicker";
import { Thesis } from "@/components/home/Thesis";
import { DivisionIndex, type DivisionRow } from "@/components/home/DivisionIndex";
import { SectorScroll, type SectorCard } from "@/components/home/SectorScroll";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Complete Preclinical Research, Start to Finish`,
  description:
    "NSRL is a one-stop preclinical contract research organisation with thirteen accredited scientific divisions — GLP, NABL ISO/IEC 17025 and AAALAC accredited — serving the agrochemical, pharmaceutical, medical device, industrial chemical and food sectors.",
  path: "/",
});

/**
 * Server-side projections.
 *
 * `DivisionIndex` and `SectorScroll` are client components, so anything they
 * import is bundled for the browser. The discipline and industry modules are
 * mostly long-form body copy, capability trees and SEO strings that neither
 * component reads, so the page narrows each record to the handful of fields
 * that actually cross the client boundary and passes those as props.
 */
const divisionRows: DivisionRow[] = disciplines.map((discipline) => ({
  slug: discipline.slug,
  index: discipline.index,
  name: discipline.name,
  family: discipline.family,
  summary: discipline.summary,
  claim: discipline.claim,
}));

const sectorCards: SectorCard[] = industries.map((industry) => ({
  slug: industry.slug,
  index: industry.index,
  name: industry.name,
  promise: industry.promise,
  summary: industry.summary,
  /* The card shows four; trimming here keeps the rest off the wire. */
  frameworks: industry.frameworks.slice(0, 4),
}));

/**
 * A conventional corporate home: masthead with the recorded figures, the
 * credibility strip, one short argument, then two directories — divisions and
 * sectors — that route out to their own pages. Facilities, the quality
 * system, careers and the newsroom live on their pages, not here.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AccreditationTicker />
      <Thesis />
      <DivisionIndex divisions={divisionRows} />
      <SectorScroll sectors={sectorCards} />
    </>
  );
}
