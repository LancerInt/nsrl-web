import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { industries } from "@/content/industries";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The escape hatch.
 *
 * Six packages cannot cover every submission, and pretending otherwise is how a
 * catalogue loses a reader. This band routes anyone whose dossier does not fit
 * to the sector page — or to custom studies — instead of leaving them to force
 * their programme into the nearest box.
 */
export function SectorRouting() {
  return (
    <section className="relative bg-canvas-sunken py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid gap-y-7">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:rail-sticky">
              <Eyebrow index="03">If none of the six fit</Eyebrow>
              <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
                Start from the authority instead.
              </RevealText>
              <p className="measure-tight mt-7 text-body text-neutral-600">
                A package is a shortcut through the catalogue, not a boundary around it. Where the
                submission is unusual, the sector pages set out the frameworks in full — and a
                study can be designed from scratch.
              </p>
              <ActionLink href="/research/custom-studies" variant="outline" className="mt-6">
                Custom studies
              </ActionLink>
            </div>
          </div>

          <ul className="col-span-12 lg:col-span-7 lg:col-start-6">
            {industries.map((industry, i) => (
              <li
                key={industry.slug}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
              >
                <Link
                  href={`/services/${industry.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 border-t border-ink-900/12 py-6 transition-colors duration-500 hover:border-ink-900/40"
                >
                  <span className="label-mono tabular-nums text-neutral-550 transition-colors duration-400 group-hover:text-ink-700">
                    {industry.index}
                  </span>

                  <span>
                    <span className="block font-display text-h1 text-ink-950 transition-colors duration-400 group-hover:text-ink-700">
                      {industry.name}
                    </span>
                    <span className="mt-3 block max-w-[46ch] text-small text-neutral-600">
                      {industry.summary}
                    </span>
                    <span className="label-mono mt-4 block text-neutral-600">
                      {industry.frameworks.slice(0, 4).join(" · ")}
                    </span>
                  </span>

                  <ArrowRight
                    aria-hidden
                    className="h-5 w-5 shrink-0 -translate-x-2 text-ink-700 opacity-0 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
            <li aria-hidden className="border-t border-ink-900/12" />
          </ul>
        </div>
      </div>
    </section>
  );
}
