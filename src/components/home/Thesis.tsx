import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";
import { milestones } from "@/content/organisation";

/**
 * The argument, stated once and plainly: fragmentation is what costs a
 * programme its timeline, and the answer is a single custodian.
 *
 * Asymmetric on purpose — the copy occupies five columns against a plate that
 * breaks the grid, so the section never reads as a two-up template.
 */
export function Thesis() {
  return (
    <section className="relative bg-canvas py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid gap-y-16">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow index="01">Why one laboratory</Eyebrow>

            <RevealText as="h2" className="mt-8 font-display text-d3 text-ink-950">
              A study is only as strong as its weakest handover.
            </RevealText>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="space-y-7 text-lead text-neutral-700">
              <p data-reveal>
                Most preclinical programmes are assembled from three or four vendors. Every
                boundary between them is a place where material is re-shipped, methods are
                re-validated, context is re-explained, and weeks disappear into email.
              </p>
              <p data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
                We built the alternative. Thirteen scientific divisions share one campus, one
                quality system, one archive and one chain of custody. Chemistry establishes the
                identity of a test item; toxicology doses it; pathology reads the tissue; the
                radioisotope laboratory follows where it went. Nothing is handed over, because
                nothing leaves.
              </p>
              <p
                data-reveal
                style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}
                className="font-editorial text-editorial italic text-ink-900"
              >
                The result is not simply faster. It is more defensible — because the record has no
                seams in it.
              </p>
            </div>

            <ActionLink href="/about" variant="text" className="mt-10">
              How the laboratory is organised
            </ActionLink>
          </div>
        </div>

        {/*
          Milestones, set against a figure that breaks the column grid.

          `egrid` rather than `lg:grid-cols-12`: the children below carry
          `col-span-12`, and a grid that only declares twelve tracks at lg makes
          the browser generate them implicitly below it — eleven phantom columns
          plus eleven gutters, which on a 390px phone is wider than the shell and
          clips the content. The wider gutter is restored at lg, where it is the
          only width at which the two columns actually sit side by side.
        */}
        <div className="egrid mt-[clamp(4rem,8vw,8rem)] gap-y-12 lg:gap-x-[clamp(2rem,4vw,5rem)]">
          <div
            data-reveal="scale"
            className="relative col-span-12 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] lg:col-span-5 lg:aspect-auto lg:min-h-[26rem]"
          >
            <SpecimenPlate variant="orbital" seed={3} />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-950/70 to-transparent p-7">
              <p className="label-mono text-white/80">Fig. 01 — Orbital assembly</p>
              <p className="label-mono text-ink-100">NSRL</p>
            </div>
          </div>

          <dl className="col-span-12 lg:col-span-6 lg:col-start-7">
            {milestones.map((milestone, i) => (
              <div
                key={milestone.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
                className="group border-t border-ink-900/12 py-7 transition-colors duration-500 hover:border-signal-500/60"
              >
                <div className="flex items-baseline gap-5">
                  <span className="label-mono shrink-0 text-neutral-550">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <dt className="font-display text-h2 text-ink-950">{milestone.title}</dt>
                    <dd className="mt-2 text-small text-neutral-600">{milestone.body}</dd>
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
