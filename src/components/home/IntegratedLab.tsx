import { disciplines } from "@/content/disciplines";
import { numberWord } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";
import { DivisionNetwork } from "@/components/visuals/DivisionNetwork";

/**
 * The custody register.
 *
 * Every other way of drawing "the divisions working together" implies an
 * order — numbered steps, a left-to-right pipeline, a ring with an arrow. None
 * of those is true: which divisions a programme touches is set by the dossier,
 * and they run in parallel wherever the science allows.
 *
 * So this is set as a register, not a diagram: five ruled rows, each naming a
 * division and what it contributes. A register is read by scanning, not by
 * following, which is the honest shape for a set of contributions with no
 * fixed sequence. It is also half the height the branching figure was, which
 * is what stopped the text column running past the bottom of the photograph.
 *
 * It is a list in the markup, not a picture: a screen reader gets the
 * divisions and their contributions in the same words a sighted reader sees.
 */
export function IntegratedLab() {
  return (
    <section
      /* Sunken, so the selected row can lift onto white paper and the navy
         answer panel has something to sit against. On plain canvas the
         whole figure floated. */
      className="bg-canvas-sunken py-[var(--section-y)] text-ink-900"
      aria-labelledby="one-laboratory"
    >
      <div className="shell">
        <div className="max-w-[46rem]">
          <Eyebrow>Why one laboratory</Eyebrow>
          <h2 id="one-laboratory" className="mt-4 font-display text-d2 text-ink-900">
            One laboratory, {numberWord(disciplines.length)} divisions.
          </h2>

          <div className="measure mt-5 space-y-3 text-lead text-neutral-600">
            <p>
              Most preclinical programmes are assembled from three or four vendors, and every
              boundary between them re-ships material, re-validates methods and loses weeks to
              email.
            </p>
            <p>
              Here the divisions share one campus, one quality system, one archive and one chain
              of custody. Nothing is handed over, because nothing leaves.
            </p>
          </div>
        </div>

        <DivisionNetwork className="mt-10" />

        {/* The denial that earns the figure. Radial arrangements read as
            pipelines whether or not one is meant, so what the links stand
            for is written down rather than implied. */}
        <p className="mt-6 max-w-[62ch] border-t border-[--rule] pt-4 text-small text-neutral-600">
          The connections above are a shared quality system, one test-item record and one
          archive — not a fixed order of work. Which divisions a programme engages, and in what
          sequence, follows from the dossier it has to satisfy, and they run in parallel wherever
          the science allows.
        </p>

        <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
          <ActionLink href="/about" variant="text">
            How the laboratory is organised
          </ActionLink>
          <ActionLink href="/about#quality-system" variant="text">
            The quality system
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
