import type { Metadata } from "next";

import { units } from "@/content/facilities";
import { capacityStats } from "@/content/organisation";
import { formatCount } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { PageNav } from "@/components/ui/PageNav";
import { SitePlanField } from "@/components/facilities/SitePlanField";
import { FacilityLead } from "@/components/facilities/FacilityLead";
import { FacilityGallery } from "@/components/facilities/FacilityGallery";
import { UnitWalk } from "@/components/facilities/UnitWalk";
import { CapacityPanel } from "@/components/facilities/CapacityPanel";
import { EnvironmentTable } from "@/components/facilities/EnvironmentTable";
import { InstrumentRegister } from "@/components/facilities/InstrumentRegister";
import { AuditNote } from "@/components/facilities/AuditNote";

export const metadata: Metadata = pageMetadata({
  title: "Facilities — 150,000 sq ft of Accredited Laboratory",
  description:
    "NSRL's accredited laboratory in Salem, Tamil Nadu: a single site housing toxicology, chemistry, ecotoxicology, entomology, microbiology and the vivarium, with 70+ clean rooms, inhalation suites and 450+ instruments.",
  path: "/facilities",
  keywords: [
    "GLP laboratory facilities India",
    "environmentally controlled vivarium",
    "inhalation toxicity chambers",
    "ecotoxicology test systems",
    "preclinical laboratory Salem Tamil Nadu",
  ],
});

/** Jump targets offered in the hero. */
const contents = [
  ...units.map((unit) => ({ href: `#${unit.id}`, label: unit.label, note: unit.title })),
  { href: "#gallery", label: "Around the site", note: "Captioned gallery" },
  { href: "#environments", label: "Environments", note: "Specification schedule" },
  { href: "#instruments", label: "Instruments", note: "Equipment register" },
];

export default function FacilitiesPage() {
  const space = capacityStats.find((stat) => stat.label === "Laboratory space");

  return (
    <>
      <PageHero
        eyebrow="The facility"
        title="Facilities and equipment"
        lead="A single accredited laboratory in Salem, Tamil Nadu. Chemistry, toxicology, ecotoxicology, entomology, microbiology and the vivarium share one site — which is the whole reason a study can change division without changing custodian."
        crumbs={[{ label: "Home", href: "/" }, { label: "Facilities" }]}
        meta={[
          ...(space
            ? [
                {
                  label: space.label,
                  value: `${formatCount(space.value)}${space.suffix ?? ""}`,
                },
              ]
            : []),
          { label: "City", value: "Salem" },
        ]}
        visual={<SitePlanField />}
      />

      {/* A horizontal anchor strip, the same one the division pages use.

          This was a card in the hero's right column listing six sections,
          each with a serif heading and an explanatory note — the tallest
          thing on the page above the fold, and it set the hero's height
          while saying nothing a reader needed before seeing the facility
          itself. As a strip it does the same job in one row and the
          gallery arrives far sooner. */}
      <PageNav items={contents.map((item) => ({ href: item.href, label: item.label }))} />

      <FacilityLead />
      {/* The gallery sits directly after the lead now. It was third, behind
          the unit walk, so the page's only photography arrived two long
          sections after the introduction that promised it. */}
      <FacilityGallery />
      <UnitWalk />
      <CapacityPanel />
      <EnvironmentTable />
      <InstrumentRegister />
      <AuditNote />
    </>
  );
}
