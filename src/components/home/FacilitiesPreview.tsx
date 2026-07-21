import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { environments } from "@/content/facilities";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

/**
 * Six controlled environments, laid out as an offset editorial grid so the
 * section reads as a plate of specimens rather than a card wall.
 */
export function FacilitiesPreview() {
  return (
    <section className="relative bg-canvas py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid gap-y-14">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow index="07">Controlled environments</Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-ink-950">
              Conditions held steady, for as long as the study runs.
            </RevealText>
            <p className="measure mt-7 text-lead text-neutral-600">
              Some of this work runs for years. The value is not that we can create the right
              conditions — it is that we can hold them, and prove we did.
            </p>

            <Link
              href="/facilities"
              className="group mt-10 inline-flex items-center gap-3 border-b border-ink-900/20 pb-2 font-display text-h3 text-ink-950 transition-colors duration-400 hover:border-signal-500 hover:text-signal-700"
            >
              Facilities in detail
              <ArrowUpRight
                aria-hidden
                className="h-5 w-5 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <div
              data-reveal="scale"
              className="relative mt-14 aspect-[5/3] overflow-hidden rounded-[var(--radius-card)]"
            >
              <SpecimenPlate variant="gradient-well" seed={7} />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink-950/65 to-transparent p-6">
                <p className="label-mono text-white">Fig. 07 — Plate array</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <dl>
              {environments.map((environment, i) => (
                <div
                  key={environment.index}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
                  className="group grid grid-cols-[auto_1fr] gap-x-6 border-t border-ink-900/12 py-8 transition-colors duration-500 hover:border-signal-500/60"
                >
                  <span className="label-mono pt-1.5 text-neutral-550">{environment.index}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <dt className="font-display text-h1 text-ink-950">{environment.title}</dt>
                      <span className="label-mono text-signal-700">{environment.spec}</span>
                    </div>
                    <dd className="mt-3 text-small text-neutral-600">{environment.body}</dd>
                  </div>
                </div>
              ))}
              <div className="border-t border-ink-900/12" />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
