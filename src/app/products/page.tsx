import type { Metadata } from "next";

import { studyPackages } from "@/content/packages";
import { pad } from "@/lib/utils";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { LedgerRule } from "@/components/products/LedgerRule";
import { PackageDefinition } from "@/components/products/PackageDefinition";
import { PackageLedger } from "@/components/products/PackageLedger";
import { SectorRouting } from "@/components/products/SectorRouting";
import { ProposalCta } from "@/components/products/ProposalCta";

export const metadata: Metadata = pageMetadata({
  title: "Study Packages — Regulatory Study Sets, Assembled by Submission",
  description:
    "Six study packages assembled from NSRL's existing accredited catalogue: agrochemical registration, the OECD genotoxicity battery, ISO 10993 device biocompatibility, IND-enabling safety, REACH compliance and food & feed safety.",
  path: "/products",
  keywords: [
    "agrochemical registration dossier",
    "genotoxicity battery OECD",
    "ISO 10993 biocompatibility testing",
    "IND-enabling studies",
    "REACH compliance testing",
    "food safety testing panel",
  ],
});

const studyCount = studyPackages.reduce(
  (total, pkg) => total + pkg.includes.reduce((n, group) => n + group.items.length, 0),
  0,
);

const frameworkCount = new Set(studyPackages.flatMap((pkg) => pkg.frameworks)).size;

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Study Packages",
          description:
            "Pre-assembled, guideline-mapped sets of preclinical and analytical studies, grouped by the regulatory submission they support.",
          path: "/products",
          serviceType: "Preclinical contract research",
        })}
      />

      <PageHero
        tone="light"
        eyebrow="Study packages"
        title="Studies we already run, grouped the way you file them."
        lead="A package is an assembly of studies this laboratory already runs, arranged around a single submission so that one quality system, one archive and one chain of custody carry the whole dossier."
        crumbs={[{ label: "Home", href: "/" }, { label: "Study packages" }]}
        meta={[
          { label: "Packages", value: pad(studyPackages.length) },
          { label: "Studies listed", value: String(studyCount) },
          { label: "Frameworks", value: String(frameworkCount) },
        ]}
        visual={<LedgerRule />}
        aside={
          <nav
            aria-label="Package index"
            className="rounded-[var(--radius-card)] border border-ink-900/12 bg-canvas-raised p-6"
          >
            <p className="label-mono text-meniscus-600">Index</p>
            <ol className="mt-5">
              {studyPackages.map((pkg) => (
                <li key={pkg.slug}>
                  <a
                    href={`#${pkg.slug}`}
                    className="group flex items-baseline gap-4 border-t border-ink-900/12 py-3.5 transition-colors duration-400 hover:border-meniscus-500/60"
                  >
                    <span className="label-mono shrink-0 tabular-nums text-neutral-550 transition-colors duration-400 group-hover:text-meniscus-600">
                      {pkg.index}
                    </span>
                    <span className="text-small text-ink-800 transition-colors duration-400 group-hover:text-meniscus-600">
                      {pkg.name}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      <PackageDefinition />
      <PackageLedger />
      <SectorRouting />
      <ProposalCta />
    </>
  );
}
