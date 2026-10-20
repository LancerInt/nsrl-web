import { images } from "@/content/imagery";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

/**
 * The custody figure.
 *
 * Every other way of drawing "thirteen divisions working together" implies an
 * order — numbered steps, a left-to-right pipeline, a ring with an arrow. None
 * of those is true: which divisions a programme touches is set by the dossier,
 * and they run in parallel wherever the science allows. So the figure draws
 * the one thing that *is* constant — a single chain of custody — and hangs the
 * divisions off it as branches. Nothing in it reads as first or last.
 *
 * It is a list in the markup, not a picture: a screen reader gets the
 * divisions and what each contributes, in the same words a sighted reader
 * sees. The spine and the nodes are drawn with borders and are decorative.
 */
const engagement = [
  { division: "Chemistry", contributes: "Identity, purity, stability of the test item" },
  { division: "Toxicology", contributes: "In-life conduct and dosing" },
  { division: "Pathology", contributes: "Tissue read and histopathology" },
  { division: "Radioisotope laboratory", contributes: "Where the compound went, and in what form" },
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
        <div className="grid items-start gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Photograph */}
          <figure data-reveal className="relative img-frame aspect-[4/3] lg:aspect-[5/6]">
            <SpecimenPlate
              src={photo.src}
              alt={photo.alt}
              position={photo.position}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </figure>

          {/* Argument */}
          <div>
            <div data-reveal>
              <Eyebrow>Why one laboratory</Eyebrow>
              <h2
                id="one-laboratory"
                className="mt-5 max-w-[18ch] font-display text-d2 text-ink-950"
              >
                One laboratory, thirteen divisions.
              </h2>

              <div className="measure mt-6 space-y-4 text-lead text-neutral-700">
                <p>
                  Most preclinical programmes are assembled from three or four vendors. Every
                  boundary between them is a place where material is re-shipped, methods are
                  re-validated and weeks disappear into email.
                </p>
                <p>
                  Here the divisions share one campus, one quality system, one archive and one
                  chain of custody. Nothing is handed over, because nothing leaves.
                </p>
              </div>
            </div>

            {/* The custody figure */}
            <div
              data-reveal
              style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
              className="card-elevated mt-9 p-6 sm:p-7"
            >
              <p className="label-mono text-meniscus-600">One test item · one custody record</p>

              {/* Unordered, deliberately: an <ol> would assert in the markup
                  the sequence the caption spends a sentence denying. */}
              <ul className="mt-5 ml-1 border-l-2 border-meniscus-500/30">
                {engagement.map((entry) => (
                  <li key={entry.division} className="relative py-2.5 pl-6">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[1.4rem] h-[2px] w-4 -translate-x-[2px] bg-meniscus-500/30"
                    />
                    <span
                      aria-hidden
                      className="absolute left-[0.85rem] top-[1.09rem] h-2 w-2 rounded-full bg-meniscus-500"
                    />
                    <span className="block font-display text-h3 text-ink-950">
                      {entry.division}
                    </span>
                    <span className="mt-0.5 block text-small text-neutral-600">
                      {entry.contributes}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-ink-900/8 pt-4 text-small text-neutral-600">
                An illustration, not a pipeline. Which divisions a programme engages — and in
                what order — follows from the dossier it has to satisfy, and they run in
                parallel wherever the science allows.
              </p>
            </div>

            <div
              data-reveal
              style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
              className="mt-7 flex flex-wrap gap-x-7 gap-y-3"
            >
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
