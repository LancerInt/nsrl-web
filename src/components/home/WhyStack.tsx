import { differentiators } from "@/content/organisation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";

/**
 * Five reasons, stacked as sticky cards that come to rest on top of each other.
 *
 * Pure CSS `position: sticky` rather than a scroll library — it survives resize,
 * reduced motion and JavaScript failure without a single line of script.
 */
export function WhyStack() {
  return (
    <section className="relative bg-canvas py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="04">Why NSRL</Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-ink-950">
              Five things that are hard to copy.
            </RevealText>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          {differentiators.map((item, i) => (
            <article
              key={item.index}
              className="sticky top-[calc(var(--nav-h)+2rem)]"
              style={{ marginBottom: i === differentiators.length - 1 ? 0 : "1.5rem" }}
            >
              <div
                className="grid gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-6 rounded-[var(--radius-card)] border border-ink-900/10 bg-canvas-raised p-[clamp(1.75rem,4vw,3.5rem)] shadow-[0_1px_2px_rgba(8,21,43,0.04),0_24px_48px_-32px_rgba(8,21,43,0.28)] lg:grid-cols-12"
                style={{ transform: `translateY(${i * 0.5}rem)` }}
              >
                <div className="flex items-start justify-between gap-6 lg:col-span-4 lg:flex-col lg:justify-start">
                  <span className="label-mono text-neutral-550">{item.index}</span>
                  {item.metric ? (
                    <span className="font-display text-d4 tracking-[-0.035em] text-signal-600 lg:mt-auto">
                      {item.metric}
                    </span>
                  ) : null}
                </div>

                <div className="lg:col-span-8">
                  <h3 className="font-display text-d4 text-ink-950">{item.title}</h3>
                  <p className="measure mt-5 text-lead text-neutral-600">{item.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
