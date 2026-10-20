import type { Industry } from "@/content/industries";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecChips } from "@/components/ui/SpecList";

/**
 * The argument for the sector: frameworks held in a sticky left rail while the
 * body copy scrolls past them, then the proof point — where the source material
 * carries one — set as a single large statement across the grid.
 */
export function SectorBrief({ industry }: { industry: Industry }) {
  return (
    <Section
      id="programme"
      tone="canvas"
      innerClassName="py-[var(--section-y)]"
      aria-labelledby="programme-heading"
    >
      <div className="egrid gap-y-8">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:rail-sticky">
            <Eyebrow index="01">The programme</Eyebrow>

            <p className="label-mono mt-6 text-neutral-600">Frameworks &amp; authorities</p>
            <SpecChips items={industry.frameworks} className="mt-5" />

            <p className="label-mono mt-7 border-t border-ink-900/12 pt-6 leading-relaxed text-neutral-500">
              Sector {industry.index} · {industry.serviceGroups.length} study groups ·{" "}
              {industry.divisions.length} divisions
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <RevealText
            as="h2"
            id="programme-heading"
            className="font-display text-d3 text-ink-950"
          >
            What the dossier has to prove.
          </RevealText>

          <div className="mt-7 space-y-5 text-lead text-neutral-700">
            {industry.body.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 48)}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
                className={i === 0 ? "text-ink-900" : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {industry.proofPoint ? (
        <div className="egrid mt-[clamp(2rem,3.5vw,3rem)] gap-y-8 border-t border-ink-900/15 pt-[clamp(1.5rem,2.5vw,2.25rem)]">
          <p className="label-mono col-span-12 text-neutral-600 lg:col-span-1">Proof</p>

          <p
            data-reveal
            className="col-span-12 font-display text-d3 text-ink-950 lg:col-span-7 lg:col-start-2"
          >
            {industry.proofPoint.value}
          </p>

          <p
            data-reveal
            style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            className="col-span-12 self-end border-l border-ink-900/45 pl-6 text-small text-neutral-600 lg:col-span-3 lg:col-start-10"
          >
            {industry.proofPoint.caption}
          </p>
        </div>
      ) : null}
    </Section>
  );
}
