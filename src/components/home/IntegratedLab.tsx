import { images } from "@/content/imagery";
import { disciplines } from "@/content/disciplines";
import { numberWord } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

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
const engagement = [
  { division: "Chemistry", contributes: "Identity, purity and stability of the test item" },
  { division: "Toxicology", contributes: "In-life conduct and dosing" },
  { division: "Ecotoxicology", contributes: "Effect on aquatic and terrestrial species" },
  { division: "Vivarium", contributes: "Housing, environmental control and health monitoring" },
  { division: "Quality assurance", contributes: "Independent audit against the protocol" },
];

const photo = images.scientistVials;

export function IntegratedLab() {
  return (
    <section
      className="bg-canvas-sunken py-[var(--section-y)] text-ink-950"
      aria-labelledby="one-laboratory"
    >
      <div className="shell">
        {/* `items-stretch` is the whole point: the figure takes its height
            from the text column rather than from a fixed ratio, so the two
            columns end on the same line and there is no dead space under
            the photograph. Below `lg` the figure falls back to a ratio and
            the three blocks stack in reading order. */}
        <div className="grid items-stretch gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <figure
            data-reveal
            className="relative aspect-[4/3] img-frame sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[26rem]"
          >
            <SpecimenPlate
              src={photo.src}
              alt={photo.alt}
              position={photo.position}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </figure>

          <div data-reveal className="flex flex-col">
            <Eyebrow>Why one laboratory</Eyebrow>
            <h2
              id="one-laboratory"
              className="mt-4 max-w-[18ch] font-display text-d2 text-ink-950"
            >
              One laboratory, {numberWord(disciplines.length)} divisions.
            </h2>

            <div className="measure mt-5 space-y-3 text-lead text-neutral-700">
              <p>
                Most preclinical programmes are assembled from three or four vendors, and every
                boundary between them re-ships material, re-validates methods and loses weeks to
                email.
              </p>
              <p>
                Here the divisions share one campus, one quality system, one archive and one
                chain of custody. Nothing is handed over, because nothing leaves.
              </p>
            </div>

            {/* The register */}
            <div className="card-elevated mt-6 px-5 py-4 sm:px-6 sm:py-5">
              <p className="label-mono text-meniscus-600">One test item · one custody record</p>

              {/* Unordered, deliberately: an <ol> would assert in the markup
                  the sequence the note underneath spends a sentence denying. */}
              <ul className="mt-3">
                {engagement.map((entry) => (
                  <li
                    key={entry.division}
                    className="grid grid-cols-[0.5rem_minmax(0,1fr)] items-baseline gap-x-3 border-t border-ink-900/10 py-2 sm:grid-cols-[0.5rem_11.5rem_minmax(0,1fr)]"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-meniscus-500"
                    />
                    <span className="font-display text-h3 leading-snug text-ink-950">
                      {entry.division}
                    </span>
                    <span className="col-start-2 text-small leading-snug text-neutral-600 sm:col-start-3">
                      {entry.contributes}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 border-t border-ink-900/10 pt-3 text-small text-neutral-600">
                An illustration, not a pipeline. Which divisions a programme engages — and in
                what order — follows from the dossier it has to satisfy, and they run in parallel
                wherever the science allows.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
              <ActionLink href="/about" variant="text">
                How the laboratory is organised
              </ActionLink>
              <ActionLink href="/about#quality-system" variant="text">
                The quality system
              </ActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
