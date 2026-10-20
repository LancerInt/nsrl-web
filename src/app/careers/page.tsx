import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { formatCount } from "@/lib/utils";
import { careersIntro, departmentGroups, departments } from "@/content/careers";
import { capacityStats } from "@/content/organisation";
import { PageHero } from "@/components/ui/PageHero";
import { ActionLink } from "@/components/ui/ActionLink";
import { CareersHeroVisual } from "@/components/careers/CareersHeroVisual";
import { CareersIntro } from "@/components/careers/CareersIntro";
import { CareerLedger } from "@/components/careers/CareerLedger";
import { DepartmentIndex } from "@/components/careers/DepartmentIndex";
import { ApplySection } from "@/components/careers/ApplySection";

export const metadata: Metadata = pageMetadata({
  title: "Careers — Join the NSRL scientific team",
  description: `Applications are open across ${departments.length} departments at NSRL, from chemistry and toxicology to animal science, quality assurance and archiving — with 450+ instruments and 150,000 sq ft of accredited laboratory estate in Tamil Nadu.`,
  path: "/careers",
  keywords: [
    "NSRL careers",
    "CRO jobs India",
    "toxicology jobs",
    "laboratory jobs Tamil Nadu",
    "preclinical research careers",
  ],
});

/** Stats worth stating at the top of a careers page: people, kit, space. */
const HERO_STATS = ["Professionals", "Instruments", "Laboratory space"];

export default function CareersPage() {
  const meta = HERO_STATS.map((label) => {
    const stat = capacityStats.find((item) => item.label === label);
    return stat
      ? { label: stat.label, value: `${formatCount(stat.value)}${stat.suffix ?? ""}` }
      : null;
  }).filter((item): item is { label: string; value: string } => item !== null);

  return (
    <>
      <PageHero
        eyebrow={careersIntro.eyebrow}
        title="A career measured in studies, not job titles."
        lead={careersIntro.lead}
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        meta={meta}
        visual={<CareersHeroVisual />}
        aside={
          <div className="rounded-[var(--radius-card)] border border-[var(--rule)] bg-white/[0.04] p-8">
            <p className="label-mono text-neutral-550">Open to application</p>
            <p className="mt-5 font-display text-d3 leading-none text-ink-950">
              {departments.length}
            </p>
            <p className="mt-4 text-small text-neutral-600">
              departments, grouped into {departmentGroups.length} families — scientific
              divisions, animal science, quality and records, and operations.
            </p>
            <ActionLink href="#apply" variant="outline" className="mt-6">
              Apply now
            </ActionLink>
          </div>
        }
      />

      <CareersIntro />
      <CareerLedger />
      <DepartmentIndex />
      <ApplySection />
    </>
  );
}
