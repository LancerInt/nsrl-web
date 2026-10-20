import type { Metadata } from "next";

import { site } from "@/content/site";
import { disciplines } from "@/content/disciplines";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { AccreditationStrip } from "@/components/home/AccreditationStrip";
import { IntegratedLab } from "@/components/home/IntegratedLab";
import { DivisionIndex, type DivisionRow } from "@/components/home/DivisionIndex";
import { SectorGrid, type SectorCard } from "@/components/home/SectorGrid";
import { FacilityShowcase } from "@/components/home/FacilityShowcase";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Complete Preclinical Research, Start to Finish`,
  description:
    "NSRL is a one-stop preclinical contract research organisation with thirteen accredited scientific divisions — GLP, NABL ISO/IEC 17025 and AAALAC accredited — serving the agrochemical, pharmaceutical, medical device, industrial chemical and food sectors.",
  path: "/",
});

/**
 * Server-side projections.
 *
 * The discipline and industry modules are mostly long-form body copy,
 * capability trees and SEO strings that neither section reads. Narrowing each
 * record here keeps the sections honest about what they actually render, and
 * keeps the modules out of any client bundle if one of them ever needs to
 * become interactive.
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
 * The page is ordered around the question a prospective sponsor actually
 * arrives with — "can you run my programme?" — and answers it in the order
 * they ask it:
 *
 *   hero            what the laboratory does, and the recorded scale
 *   accreditation   whether the data will be accepted, with the certificates
 *   sectors         whether it works in my regulatory world  ← the first
 *                   real choice, so it comes before the science
 *   one laboratory  why a single custodian is the point
 *   divisions       which department owns my question
 *   facility        what the place is actually like
 *
 * The closing proposal action lives in the global footer rather than here;
 * one closing ask per page, not two.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AccreditationStrip />
      <SectorGrid sectors={sectorCards} />
      <IntegratedLab />
      <DivisionIndex divisions={divisionRows} />
      <FacilityShowcase />
    </>
  );
}
