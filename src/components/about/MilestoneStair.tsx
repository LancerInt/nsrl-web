import { milestones } from "@/content/organisation";
import { ActionLink } from "@/components/ui/ActionLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { pad } from "@/lib/utils";

/**
 * Firsts and records — an ordered set of things done first, set as a compact
 * grid. The source material carries no dates, so this is deliberately not a
 * timeline; the index supplies the sense of order a date axis would give.
 */
export function MilestoneStair() {
  return (
    <section className="relative bg-canvas-sunken py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="05">Research &amp; capabilities</Eyebrow>
            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              Scientific expertise. Practical outcomes.
            </RevealText>
          </div>
          {/* The paragraph that sat here explained why these entries carry
              no dates. That is an editorial note about how the page was
              assembled, and a visitor reading about a first nano-fertiliser
              registration is not asking about our sourcing policy. The
              entries simply do not state years; nothing needs to apologise
              for it. */}
        </div>

        <div className="mt-[clamp(2rem,3.5vw,3rem)] grid gap-x-[clamp(2rem,4vw,4rem)] gap-y-8 sm:grid-cols-2">
          {milestones.map((milestone, i) => (
            <article
              key={milestone.title}
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 0.08}s` } as React.CSSProperties}
              className="border-t border-[var(--rule-strong)] pt-6"
            >
              <div className="flex items-baseline gap-5">
                <span className="label-mono shrink-0 text-neutral-550">{pad(i + 1)}</span>
                <div>
                  <h3 className="font-display text-h1 text-ink-950">{milestone.title}</h3>
                  <p className="mt-3 text-body text-neutral-600">{milestone.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-[clamp(2rem,3.5vw,3rem)] flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-ink-900/12 pt-7">
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
