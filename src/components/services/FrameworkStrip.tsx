import { industries } from "@/content/industries";
import { Section } from "@/components/ui/Section";
import { SpecChips } from "@/components/ui/SpecList";

/**
 * A thin instrument strip directly under the hero: every framework and
 * authority the five sector programmes are written for, de-duplicated.
 *
 * Deliberately shallow — it is a rule between two chapters, not a chapter.
 */
export function FrameworkStrip() {
  const frameworks = Array.from(new Set(industries.flatMap((industry) => industry.frameworks)));

  return (
    <Section
      tone="sunken"
      className="border-y border-[var(--rule)]"
      innerClassName="py-[clamp(2.5rem,5vw,4rem)]"
    >
      <div className="egrid gap-y-7">
        <div className="col-span-12 lg:col-span-3">
          <p className="label-mono text-neutral-550">Dossiers written for</p>
          <p className="mt-3 font-display text-h3 tabular-nums text-ink-950">
            {frameworks.length} frameworks &amp; authorities
          </p>
        </div>

        <SpecChips
          items={frameworks}
          className="col-span-12 lg:col-span-8 lg:col-start-5"
        />
      </div>
    </Section>
  );
}
