import { milestones } from "@/content/organisation";
import { ActionLink } from "@/components/ui/ActionLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { pad } from "@/lib/utils";

/** Each milestone steps one span further right than the last. */
const step = [
  "lg:col-span-7 lg:col-start-1",
  "lg:col-span-7 lg:col-start-3",
  "lg:col-span-7 lg:col-start-5",
  "lg:col-span-6 lg:col-start-7",
];

/**
 * Firsts and records, walked down the page as a staircase.
 *
 * The source material carries no dates, so this is deliberately not a timeline —
 * it is an ordered set of things done first, and the descending indent supplies
 * the sense of progression a date axis would otherwise give.
 */
export function MilestoneStair() {
  return (
    <section className="relative bg-canvas-sunken py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="07">Firsts</Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-ink-950">
              Work that had no precedent to follow.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-small text-neutral-600">
              Stated without dates, because the record we hold carries the
              achievement and not the year — and a year we could not evidence would
              be worth less than none.
            </p>
          </div>
        </div>

        <div className="egrid mt-[clamp(3.5rem,7vw,6rem)] gap-y-[clamp(2rem,4vw,3.5rem)]">
          {milestones.map((milestone, i) => (
            <article
              key={milestone.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
              className={`group col-span-12 border-t border-ink-900/22 pt-7 transition-colors duration-700 [transition-timing-function:var(--ease-out-expo)] hover:border-signal-500/70 ${step[i % step.length]}`}
            >
              <div className="flex items-baseline gap-6">
                <span className="label-mono shrink-0 text-neutral-550 transition-colors duration-500 group-hover:text-signal-700">
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className="font-display text-d4 text-ink-950">
                    {milestone.title}
                  </h3>
                  <p className="mt-4 max-w-[48ch] text-body text-neutral-600">
                    {milestone.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-[clamp(4rem,8vw,7rem)] flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-ink-900/12 pt-10">
          <p className="label-mono text-neutral-600">Next</p>
          <ActionLink href="/facilities" variant="outline">
            Walk the facilities
          </ActionLink>
          <ActionLink href="/contact" variant="text">
            Ask us something specific
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
