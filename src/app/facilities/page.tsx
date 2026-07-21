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
  title: "Facilities — Three Units, 150,000 sq ft of Accredited Laboratory",
  description:
    "NSRL's estate in Kanchipuram district, Tamil Nadu: three units housing toxicology, chemistry, ecotoxicology, entomology, the vivarium and a discovery centre, with 70+ clean rooms, inhalation suites, an AERB Type 2 radioisotope facility and 450+ instruments.",
  path: "/facilities",
  keywords: [
    "GLP laboratory facilities India",
    "AAALAC accredited vivarium",
    "inhalation toxicity chambers",
    "AERB radioisotope laboratory",
    "preclinical laboratory Chennai",
  ],
});

/** Jump targets offered in the hero, so the estate can be entered anywhere. */
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
        eyebrow="The estate"
        title="Where the work actually happens."
        lead="Three units in Kanchipuram district, Tamil Nadu, roughly an hour from Chennai international airport. Toxicology, chemistry, ecotoxicology, entomology and the vivarium share a single campus — which is the whole reason a study can change division without changing custodian."
        crumbs={[{ label: "Home", href: "/" }, { label: "Facilities" }]}
        meta={[
          { label: "Units", value: pad(units.length) },
          ...(space
            ? [
                {
                  label: space.label,
                  value: `${formatCount(space.value)}${space.suffix ?? ""}`,
                },
              ]
            : []),
          { label: "District", value: "Kanchipuram" },
        ]}
        visual={<SitePlanField />}
        aside={
          <nav aria-label="On this page" className="glass rounded-[var(--radius-card)] p-6">
            <p className="label-mono text-signal-400">On this page</p>
            <ul className="mt-5">
              {contents.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex items-baseline gap-4 border-t border-white/12 py-4 transition-colors duration-400 hover:border-signal-400/60"
                  >
                    <span className="label-mono shrink-0 tabular-nums text-ink-300 transition-colors duration-400 group-hover:text-signal-400">
                      {pad(i + 1)}
                    </span>
                    <span>
                      <span className="block font-display text-h3 text-white">{item.label}</span>
                      <span className="mt-1 block text-small text-ink-200">{item.note}</span>
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
