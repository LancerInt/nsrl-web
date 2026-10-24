import { differentiators, positioning } from "@/content/organisation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";

/**
 * The long-form opening: who the laboratory is, argued rather than listed.
 *
 * Three offset movements rather than a two-column split — a narrow rail of
 * labels, a prose column pushed to the right of centre, and a pull quote that
 * breaks back to the left across the grid. The differentiators then run as
 * marginalia in a multi-column flow, so the section never settles into a
 * repeating rhythm.
 */
export function AboutOpening() {
  return (
    <section
      /* A shorter foot than head. The band below opens with its own full
         section padding, so the two stacked to an unusually wide gap. */
      className="relative bg-canvas pb-[var(--section-y-tight)] pt-[var(--section-y)]"
    >
      <div className="shell">
        <div className="egrid gap-y-8">
          {/* Left rail — labels only, the margin of a printed page. */}
          <div className="col-span-12 lg:col-span-3">
            <Eyebrow index="01">{positioning.eyebrow}</Eyebrow>
          </div>

          {/* Prose, offset right of centre. */}
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <RevealText as="h2" className="font-display text-d3 text-ink-950">
              Integrated research, from planning to reporting.
            </RevealText>

            <p
              data-reveal
              className="measure mt-7 text-lead text-neutral-700"
            >
              {positioning.lead}
            </p>

            <p
              data-reveal
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
              className="measure mt-7 text-body text-neutral-600"
            >
              {positioning.supporting}
            </p>
          </div>
        </div>

        {/* The single editorial accent on this page. */}
        <figure className="egrid mt-[clamp(2rem,3.5vw,3rem)] gap-y-6">
          <blockquote
            data-reveal
            className="col-span-12 border-t border-ink-900/22 pt-7 lg:col-span-9 lg:col-start-2"
          >
            <p className="font-display text-editorial text-ink-900">
              {positioning.headline}
            </p>
          </blockquote>
          <figcaption
            data-reveal
            style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
            className="label-mono col-span-12 text-neutral-600 lg:col-span-2 lg:col-start-11 lg:pt-7"
          >
            The whole remit,
            <br />
            in one sentence
          </figcaption>
        </figure>

        {/* Marginalia — the five things that are hard to copy, set as notes. */}
        <div className="egrid mt-[clamp(2rem,3.5vw,3rem)] gap-y-8">
          <h3 className="label-mono col-span-12 text-neutral-600 lg:col-span-2">
            Notes
          </h3>
          <div className="col-span-12 gap-x-[clamp(2rem,4vw,4.5rem)] lg:col-span-9 lg:col-start-4 lg:columns-2">
            {differentiators.map((item, i) => (
              <p
                key={item.index}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}
                className="mb-9 break-inside-avoid border-t border-ink-900/12 pt-5 text-small text-neutral-600"
              >
                <span className="label-mono mr-3 text-ink-800">{item.index}</span>
                {item.metric ? (
                  <span className="label-mono mr-3 text-neutral-550">{item.metric}</span>
                ) : null}
                <span className="mt-3 block font-display text-h3 text-ink-950">
                  {item.title}
                </span>
                <span className="mt-2.5 block">{item.body}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
