import type { Metadata } from "next";

import { units } from "@/content/facilities";
import { capacityStats } from "@/content/organisation";
import { formatCount, pad } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SitePlanField } from "@/components/facilities/SitePlanField";
import { UnitWalk } from "@/components/facilities/UnitWalk";
import { CapacityPanel } from "@/components/facilities/CapacityPanel";
import { EnvironmentTable } from "@/components/facilities/EnvironmentTable";
import { InstrumentRegister } from "@/components/facilities/InstrumentRegister";
import { AuditNote } from "@/components/facilities/AuditNote";

export const metadata: Metadata = pageMetadata({
  title: "Facilities — 150,000 sq ft of Accredited Laboratory",
  description:
    "NSRL's accredited laboratory in Salem, Tamil Nadu: a single site housing toxicology, chemistry, ecotoxicology, entomology, the vivarium, discovery and a radioisotope laboratory, with 70+ clean rooms, inhalation suites, an AERB Type 2 radioisotope facility and 450+ instruments.",
  path: "/facilities",
  keywords: [
    "GLP laboratory facilities India",
    "AAALAC accredited vivarium",
    "inhalation toxicity chambers",
    "AERB radioisotope laboratory",
    "preclinical laboratory Salem Tamil Nadu",
  ],
});

/** Jump targets offered in the hero. */
const contents = [
  ...units.map((unit) => ({ href: `#${unit.id}`, label: unit.label, note: unit.title })),
  { href: "#environments", label: "Environments", note: "Specification schedule" },
  { href: "#instruments", label: "Instruments", note: "Equipment register" },
];

export default function FacilitiesPage() {
  const space = capacityStats.find((stat) => stat.label === "Laboratory space");

  return (
    <>
      <PageHero
        eyebrow="The facility"
        title="Where the work actually happens."
        lead="A single accredited laboratory in Salem, Tamil Nadu. Chemistry, toxicology, ecotoxicology, entomology, pathology and the vivarium share one site — which is the whole reason a study can change division without changing custodian."
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
        aside={
          <nav aria-label="On this page" className="card-elevated p-6">
            <p className="label-mono text-neutral-550">On this page</p>
            <ul className="mt-4">
              {contents.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group -mx-3 flex items-baseline gap-4 rounded-lg px-3 py-3 transition-colors duration-300 hover:bg-canvas-sunken"
                  >
                    <span className="label-mono shrink-0 tabular-nums text-neutral-550">
                      {pad(i + 1)}
                    </span>
                    <span>
                      <span className="block font-display text-h3 text-ink-950">{item.label}</span>
                      <span className="mt-1 block text-small text-neutral-600">{item.note}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <UnitWalk />
      <CapacityPanel />
      <EnvironmentTable />
      <InstrumentRegister />
      <AuditNote />
    </>
  );
}
