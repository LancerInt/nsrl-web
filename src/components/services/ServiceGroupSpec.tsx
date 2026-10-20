import type { Industry } from "@/content/industries";
import { pad } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecList } from "@/components/ui/SpecList";

/**
 * The study catalogue, set as a ruled specification rather than a card grid.
 *
 * Each group keeps its title in the left rail and spills its studies into the
 * right, splitting into two columns only when the group is long enough to need
 * it — so the rows breathe differently down the page instead of marching.
 */
export function ServiceGroupSpec({ industry }: { industry: Industry }) {
  const studyCount = industry.serviceGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <Section
      id="catalogue"
      tone="sunken"
      innerClassName="py-[var(--section-y)]"
      aria-labelledby="catalogue-heading"
    >
      <div className="egrid items-end gap-y-8">
        <div className="col-span-12 lg:col-span-7">
          <Eyebrow index="02">Study catalogue</Eyebrow>
          <RevealText
            as="h2"
            id="catalogue-heading"
            className="mt-6 font-display text-d3 text-ink-950"
          >
            {industry.summary}.
          </RevealText>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <dl className="flex gap-x-12 gap-y-4">
            <div>
              <dt className="label-mono text-neutral-600">Groups</dt>
              <dd className="mt-2 font-display text-h1 tabular-nums text-ink-950">
                {pad(industry.serviceGroups.length)}
              </dd>
            </div>
            <div>
              <dt className="label-mono text-neutral-600">Study types</dt>
              <dd className="mt-2 font-display text-h1 tabular-nums text-ink-950">
                {studyCount}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-[clamp(3rem,6vw,5rem)] border-t border-ink-900/14">
        {industry.serviceGroups.map((group, i) => (
          <div
            key={group.title}
            data-reveal
            style={{ "--reveal-delay": `${(i % 3) * 0.06}s` } as React.CSSProperties}
            className="egrid gap-y-6 border-b border-ink-900/14 py-[clamp(1.25rem,2.5vw,2rem)]"
          >
            <div className="col-span-12 flex items-baseline gap-5 lg:col-span-4">
              <span className="label-mono shrink-0 pt-1 tabular-nums text-neutral-550">
                {pad(i + 1)}
              </span>
              <h3 className="font-display text-h1 text-ink-950">{group.title}</h3>
            </div>

            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <SpecList
                items={group.items}
                columns={group.items.length >= 6 ? 2 : 1}
                numbered={false}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
