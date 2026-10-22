import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { industries } from "@/content/industries";
import { getDiscipline, type Discipline } from "@/content/disciplines";
import { images, servicesOverviewImage } from "@/content/imagery";
import { numberWord } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecChips } from "@/components/ui/SpecList";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

/**
 * The sectors as ledger entries rather than cards.
 *
 * The homepage moves these horizontally as plates; here they are ruled entries
 * in an index — a large index number in the gutter, the promise set in the
 * editorial serif, and the divisions that actually carry the work listed as
 * links, because on this page the question is "who does it", not "what does it
 * look like".
 */
export function SectorLedger() {
  return (
    <Section tone="canvas" innerClassName="py-[var(--section-y)]" id="sectors">
      <div className="egrid items-end gap-y-8">
        <div className="col-span-12 lg:col-span-6">
          <Eyebrow index="02">Sectors served</Eyebrow>
          <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
            {numberWord(industries.length, { capitalise: true })} regulatory worlds, one
            evidence base.
          </RevealText>
          <p className="measure mt-6 text-lead text-neutral-600">
            The endpoints, guidelines and species in a programme follow from the authority that
            has to approve it. These five are the contexts the laboratory is built to write for.
          </p>
        </div>

        <div
          data-reveal="scale"
          className="relative col-span-12 aspect-[16/9] img-frame lg:col-span-5 lg:col-start-8 lg:aspect-[4/3]"
        >
          <SpecimenPlate
            src={images[servicesOverviewImage].src}
            alt={images[servicesOverviewImage].alt}
            position={images[servicesOverviewImage].position}
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </div>

      <div className="mt-[clamp(2rem,3.5vw,3rem)]">
        {industries.map((industry, i) => {
          const divisions = industry.divisions
            .map((slug) => getDiscipline(slug))
            .filter((discipline): discipline is Discipline => Boolean(discipline));

          return (
            <article
              key={industry.slug}
              id={industry.slug}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.05}s` } as React.CSSProperties}
              className="group scroll-mt-32 border-t border-ink-900/12 transition-colors duration-500 hover:border-ink-900/40"
            >
              <div className="egrid gap-y-9 py-[clamp(2.5rem,5vw,4.5rem)]">
                <p className="col-span-12 font-display text-[clamp(2.75rem,4.6vw,4.25rem)] font-medium leading-none tracking-[-0.014em] tabular-nums text-neutral-550 transition-colors duration-500 group-hover:text-ink-700 lg:col-span-1">
                  {industry.index}
                </p>

                <div className="col-span-12 lg:col-span-6 lg:col-start-2">
                  <h3 className="font-display text-d4 text-ink-950">
                    <Link
                      href={`/services/${industry.slug}`}
                      className="inline-flex items-start gap-3 transition-colors duration-400 hover:text-ink-700"
                    >
                      {industry.name}
                      <ArrowUpRight
                        aria-hidden
                        className="mt-1.5 h-6 w-6 shrink-0 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </h3>

                  {/* Sans, not the editorial serif: five ledger entries would
                      turn a once-per-page accent into a body style. */}
                  <p className="measure mt-5 text-lead text-neutral-700">{industry.promise}</p>

                  <p className="measure mt-6 text-body text-neutral-600">{industry.summary}.</p>
                </div>

                <div className="col-span-12 lg:col-span-4 lg:col-start-9">
                  <p className="label-mono text-neutral-600">Written for</p>
                  <SpecChips items={industry.frameworks} className="mt-4" />

                  <p className="label-mono mt-7 text-neutral-600">
                    Divisions carrying the work
                  </p>
                  <ul className="mt-4">
                    {divisions.map((division) => (
                      <li key={division.slug}>
                        <Link
                          href={`/research/${division.slug}`}
                          className="flex items-baseline justify-between gap-5 border-t border-ink-900/10 py-3 text-small text-ink-800 transition-colors duration-400 hover:border-ink-900/40 hover:text-ink-700"
                        >
                          <span>{division.name}</span>
                          <span className="label-mono shrink-0 tabular-nums text-neutral-550">
                            {division.index}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
        <div className="border-t border-ink-900/12" />
      </div>
    </Section>
  );
}
