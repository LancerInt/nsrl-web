import { cn } from "@/lib/utils";
import { careerPillars } from "@/content/careers";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";

/** Each pillar steps one column further across the grid — a staircase, not a card wall. */
const START = ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3", "lg:col-start-4"];

/**
 * The four working propositions, set as a descending ledger.
 *
 * Deliberately not a 4-up grid: the rows are full-width and each one begins a
 * column later than the last, so the section reads top-to-bottom as an argument
 * that accumulates rather than four interchangeable tiles.
 */
export function CareerLedger() {
  return (
    <Section tone="deep-raised" bleed className="overflow-hidden">
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-60"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.03)",
            "--graticule-size": "5rem",
          } as React.CSSProperties
        }
      />

      <div className="shell relative">
        <SectionBody>
          <div className="egrid items-end gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow index="02" tone="deep">
                What you get out of it
              </Eyebrow>
              <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
                Four things this laboratory can offer that a job description usually cannot.
              </RevealText>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:col-start-10">
              <p className="label-mono leading-relaxed text-ink-300">
                {careerPillars.length} propositions · read downward
              </p>
            </div>
          </div>

          <ol className="mt-[clamp(3.5rem,7vw,6rem)]">
            {careerPillars.map((pillar, i) => (
              <li
                key={pillar.index}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}
                className="group border-t border-white/12 py-[clamp(2rem,4vw,3.25rem)] transition-colors duration-500 last:border-b last:border-b-white/12 hover:border-signal-400/50"
              >
                <div className="egrid items-baseline gap-y-5">
                  <p
                    aria-hidden
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
                    className={cn(
                      "col-span-12 font-display text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.045em] text-transparent lg:col-span-2",
                      START[i],
                    )}
                  >
                    {pillar.index}
                  </p>

                  <div className="col-span-12 lg:col-span-7">
                    <h3 className="font-display text-d4 text-white">{pillar.title}</h3>
                    <p className="measure mt-5 text-body text-ink-200">{pillar.body}</p>
                  </div>

                  <span
                    aria-hidden
                    className="col-span-12 hidden items-center justify-end gap-3 lg:col-span-2 lg:col-start-11 lg:flex"
                  >
                    <span className="block h-px w-10 bg-white/15 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:w-16 group-hover:bg-signal-400" />
                    <span className="block h-1.5 w-1.5 rounded-full bg-signal-400/70" />
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </SectionBody>
      </div>
    </Section>
  );
}
