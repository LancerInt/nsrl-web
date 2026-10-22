import type { Metadata } from "next";
import Link from "next/link";

import { pageMetadata } from "@/lib/seo";
import { pad } from "@/lib/utils";
import { industries } from "@/content/industries";
import { disciplines } from "@/content/disciplines";
import { studyLifecycle } from "@/content/organisation";
import { PageHero } from "@/components/ui/PageHero";
import { FrameworkStrip } from "@/components/services/FrameworkStrip";
import { ProcessSpine } from "@/components/services/ProcessSpine";
import { SectorLedger } from "@/components/services/SectorLedger";
import { ServicesClosing } from "@/components/services/ServicesClosing";

export const metadata: Metadata = pageMetadata({
  title: "Services — How We Work & The Sectors We Serve",
  description:
    "How an NSRL study runs, from scoping against the reviewing authority through GLP conduct, independent QA audit, reporting and ten-year archival — and the sectors the laboratory writes dossiers for.",
  path: "/services",
  keywords: [
    "preclinical study process",
    "GLP study lifecycle",
    "agrochemical registration testing",
    "REACH compliance testing",
    "food and feed additive testing",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Services"
        /* The old title counted sectors and stages at the reader before
           saying what the page was for. Those counts are still on the page,
           in the meta row directly beneath, where a number belongs. */
        title="Plan your regulatory study"
        lead="Every programme here is scoped from the authority that will read it, conducted inside one accredited laboratory, and reported so that each conclusion traces back to the instrument that produced it."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        meta={[
          { label: "Sectors", value: String(industries.length) },
          { label: "Stages", value: pad(studyLifecycle.length) },
          { label: "Divisions", value: String(disciplines.length) },
        ]}
        visual={<HeroVisual />}
        aside={
          <nav aria-label="Sectors on this page">
            <p className="label-mono text-neutral-600">Jump to a sector</p>
            <ul className="mt-5">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`#${industry.slug}`}
                    className="flex items-baseline justify-between gap-5 border-t border-ink-900/12 py-3.5 transition-colors duration-400 hover:border-meniscus-500/60 hover:text-meniscus-600"
                  >
                    <span className="font-display text-h3 text-ink-900">{industry.name}</span>
                    <span className="label-mono shrink-0 tabular-nums text-neutral-550">
                      {industry.index}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-ink-900/12" />
          </nav>
        }
      />

      <FrameworkStrip />
      <ProcessSpine />
      <SectorLedger />
      <ServicesClosing />
    </>
  );
}

/**
 * A light hero, where most interior pages open deep: a faint graticule, a
 * meniscus-tinted wash pulled to the upper right, and a hairline horizon so the
 * page still starts with a drawn instrument rather than a blank sheet.
 */
function HeroVisual() {
  return (
    <>
      <div
        className="graticule absolute inset-0 opacity-40"
        style={
          {
            "--graticule-color": "rgba(8,21,43,0.045)",
            "--graticule-size": "5.5rem",
          } as React.CSSProperties
        }
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--rule)]" />
    </>
  );
}
