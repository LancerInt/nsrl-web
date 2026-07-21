import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { studyPackages, type StudyPackage } from "@/content/packages";
import { getDiscipline } from "@/content/disciplines";
import { cn, pad } from "@/lib/utils";
import { Disclosure } from "@/components/ui/Disclosure";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecChips, SpecList } from "@/components/ui/SpecList";
import { SpecimenPlate, type PlateVariant } from "@/components/visuals/SpecimenPlate";

const PLATES: PlateVariant[] = ["wave", "lattice", "gradient-well", "orbital", "titration", "chromatogram"];

/**
 * Six packages on one ledger.
 *
 * Each row is a disclosure, because the full contents run to more than a
 * hundred study lines and a page that printed all of them at once would be
 * unreadable. Featured packages open on arrival and carry a figure; the rest
 * stay closed until asked for, but their panels remain in the document.
 */
export function PackageLedger() {
  return (
    <section id="packages" className="relative bg-canvas py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="02">The ledger</Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-ink-950">
              Six submissions, opened line by line.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              Open a row to see the whole schedule: the frameworks it is assembled against, the
              divisions that execute it, and every study group inside it.
            </p>
          </div>
        </div>

        <div className="mt-16">
          {studyPackages.map((pkg, i) => (
            <PackageRow key={pkg.slug} pkg={pkg} position={i} />
          ))}
          <div className="border-t border-ink-900/12" />
        </div>
      </div>
    </section>
  );
}

function PackageRow({ pkg, position }: { pkg: StudyPackage; position: number }) {
  const studies = pkg.includes.reduce((total, group) => total + group.items.length, 0);
  const divisions = pkg.divisions
    .map((slug) => getDiscipline(slug))
    .filter((division): division is NonNullable<typeof division> => Boolean(division));

  return (
    <div id={pkg.slug} className="scroll-mt-[calc(var(--nav-h)+2rem)]">
      <Disclosure
        defaultOpen={pkg.featured}
        meta={`${studies} studies`}
        title={
          <span className="block">
            <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span
                className={cn(
                  "label-mono tabular-nums",
                  pkg.featured ? "text-signal-700" : "text-neutral-550",
                )}
              >
                {pkg.index}
              </span>
              <span className={pkg.featured ? "text-d4" : "text-h1"}>{pkg.name}</span>
            </span>
            <span className="label-mono mt-3 block text-neutral-600">{pkg.audience}</span>
          </span>
        }
      >
        <div className="egrid gap-y-12 pt-2">
          {/* Argument */}
          <div className="col-span-12 lg:col-span-5">
            <p className="text-lead text-ink-900">{pkg.summary}</p>
            <p className="measure mt-6 text-body text-neutral-600">{pkg.body}</p>

            <h4 className="label-mono mt-10 text-neutral-600">Assembled against</h4>
            <SpecChips items={pkg.frameworks} className="mt-4" />

            <h4 className="label-mono mt-10 text-neutral-600">
              Divisions executing — {pad(divisions.length)}
            </h4>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {divisions.map((division) => (
                <li key={division.slug}>
                  <Link
                    href={`/research/${division.slug}`}
                    className="group inline-flex items-center gap-1.5 border-b border-ink-900/20 pb-1 font-display text-h3 text-ink-900 transition-colors duration-400 hover:border-signal-500 hover:text-signal-700"
                  >
                    {division.name}
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {pkg.featured ? (
              <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]">
                <SpecimenPlate variant={PLATES[position % PLATES.length]} seed={position + 1} />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-ink-950/70 to-transparent p-6">
                  <p className="label-mono text-white/80">Fig. {pkg.index}</p>
                  <p className="label-mono text-ink-100">{studies} studies</p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Schedule */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-10 sm:grid-cols-2">
              {pkg.includes.map((group, i) => (
                <div key={group.title}>
                  <div className="flex items-baseline gap-3">
                    <span className="label-mono tabular-nums text-signal-700">
                      {pkg.index}.{pad(i + 1)}
                    </span>
                    <h4 className="font-display text-h3 text-ink-950">{group.title}</h4>
                  </div>
                  <SpecList items={group.items} numbered={false} className="mt-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}
