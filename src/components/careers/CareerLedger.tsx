import { careerPillars } from "@/content/careers";
import { Section, SectionBody } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";

/**
 * The four working propositions, set as a plain ruled ledger.
 */
export function CareerLedger() {
  return (
    <Section bleed className="overflow-hidden">
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-40"
        style={
          {
            "--graticule-color": "color-mix(in oklab, var(--color-ink-900) 2.5%, transparent)",
            "--graticule-size": "5rem",
          } as React.CSSProperties
        }
      />

      <div className="shell relative">
        <SectionBody>
          <div className="egrid items-end gap-y-8">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow index="02">
                What you get out of it
              </Eyebrow>
              <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
                Four things this laboratory can offer that a job description usually cannot.
              </RevealText>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:col-start-10">
              <p className="label-mono leading-relaxed text-neutral-550">
                {careerPillars.length} propositions · read downward
              </p>
            </div>
          </div>

          <ol className="mt-6">
            {careerPillars.map((pillar) => (
              <li
                key={pillar.index}
                className="border-t border-[var(--rule)] py-6 last:border-b last:border-b-[var(--rule)]"
              >
                <div className="egrid items-baseline gap-y-4">
                  <p className="label-mono col-span-12 tabular-nums text-neutral-550 lg:col-span-1">
                    {pillar.index}
                  </p>
                  <div className="col-span-12 lg:col-span-8 lg:col-start-3">
                    <h3 className="font-display text-h1 text-ink-950">{pillar.title}</h3>
                    <p className="measure mt-3 text-body text-neutral-600">{pillar.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </SectionBody>
      </div>
    </Section>
  );
}
