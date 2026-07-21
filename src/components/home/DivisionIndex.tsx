"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { easing } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";
import { SpecimenPlate, type PlateVariant } from "@/components/visuals/SpecimenPlate";

const PLATES: PlateVariant[] = [
  "orbital",
  "lattice",
  "wave",
  "titration",
  "gradient-well",
  "chromatogram",
];

/**
 * The shallow projection of a discipline this section renders.
 *
 * Declared here and built on the server in `app/page.tsx`: the discipline
 * module carries long-form body copy, capability trees and SEO strings that
 * this component never reads, and importing it from a client component would
 * ship all of it into the homepage bundle.
 */
export type DivisionRow = {
  slug: string;
  index: string;
  name: string;
  family: string;
  summary: string;
  claim: { value: string; unit?: string; caption: string };
};

/**
 * The signature interaction: an index of the thirteen divisions where pointing
 * at a name resolves it into a figure, a claim and a summary.
 *
 * Every row is a real link, so the whole section works on touch, on keyboard
 * and with JavaScript off — the preview is enhancement, never the only route
 * to the content.
 */
export function DivisionIndex({ divisions }: { divisions: DivisionRow[] }) {
  const [active, setActive] = useState(0);
  const current = divisions[active];

  return (
    <section
      data-theme="deep"
      className="relative isolate overflow-hidden bg-deep py-[var(--section-y)] text-ink-50"
    >
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-60"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.035)",
            "--graticule-size": "5rem",
          } as React.CSSProperties
        }
      />

      <div className="shell relative">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="02" tone="deep">
              Scientific divisions
            </Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
              Thirteen divisions, one chain of custody.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-ink-200">
              Each division holds its own accreditations and instrument estate, and every one of
              them reports into the same quality system.
            </p>
            <ActionLink href="/research" variant="text" tone="deep" className="mt-5">
              All divisions
            </ActionLink>
          </div>
        </div>

        {/* `egrid` declares twelve tracks at every width, so the `col-span-12`
            children below stack cleanly on a phone. A grid that only declares
            them at lg leaves the browser to invent eleven implicit tracks and
            eleven gutters underneath it, which overflows a narrow shell. */}
        <div className="egrid mt-16 lg:gap-x-[clamp(2rem,4vw,4.5rem)]">
          {/* Index */}
          <ul
            className="col-span-12 lg:col-span-7"
            onMouseLeave={() => setActive((v) => v)}
          >
            {divisions.map((discipline, i) => (
              <li key={discipline.slug}>
                <Link
                  href={`/research/${discipline.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    "group flex items-center gap-6 border-t py-[clamp(0.875rem,1.6vw,1.375rem)] transition-colors duration-500",
                    active === i
                      ? "border-signal-400/60"
                      : "border-white/10 hover:border-white/30",
                  )}
                >
                  <span
                    className={cn(
                      "label-mono w-8 shrink-0 tabular-nums transition-colors duration-400",
                      active === i ? "text-signal-400" : "text-ink-300",
                    )}
                  >
                    {discipline.index}
                  </span>

                  <span
                    className={cn(
                      "flex-1 font-display text-[clamp(1.375rem,2.6vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] transition-colors duration-500",
                      active === i ? "text-white" : "text-ink-200 group-hover:text-white",
                    )}
                  >
                    {discipline.name}
                  </span>

                  <span
                    className={cn(
                      "label-mono hidden shrink-0 text-right transition-colors duration-400 xl:block",
                      active === i ? "text-ink-200" : "text-ink-300",
                    )}
                  >
                    {discipline.family}
                  </span>

                  <ArrowRight
                    aria-hidden
                    className={cn(
                      "h-5 w-5 shrink-0 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)]",
                      active === i
                        ? "translate-x-0 text-signal-400 opacity-100"
                        : "-translate-x-3 opacity-0",
                    )}
                  />
                </Link>
              </li>
            ))}
            <li className="border-t border-white/10" />
          </ul>

          {/* Preview — sticky so it stays beside the row being pointed at. */}
          <div className="col-span-12 mt-14 lg:col-span-5 lg:mt-0">
            <div className="lg:rail-sticky">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-white/10">
                {/* `initial={false}`: the crossfade belongs to a *change* of
                    selection. Without it the mounted state is serialised into
                    the server HTML as opacity:0 and the preview is invisible
                    until hydration — or permanently, if it never happens. */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.slug}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: easing.expo }}
                    className="absolute inset-0"
                  >
                    <SpecimenPlate
                      variant={PLATES[active % PLATES.length]}
                      seed={active}
                      tone="deep"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-deep/85 to-transparent p-6">
                  <p className="label-mono text-white/70">Fig. {current.index}</p>
                  <p className="label-mono text-signal-400">{current.name}</p>
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: easing.expo }}
                  className="mt-8"
                >
                  <p className="font-display text-d4 text-white">
                    {current.claim.value}
                    {current.claim.unit ? (
                      <span className="ml-2 text-h3 font-medium text-signal-400">
                        {current.claim.unit}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-3 max-w-[36ch] text-small text-ink-200">
                    {current.claim.caption}
                  </p>
                  <p className="mt-6 border-t border-white/10 pt-5 text-small text-ink-100">
                    {current.summary}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
