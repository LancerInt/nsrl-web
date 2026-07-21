import { units } from "@/content/facilities";
import { locations } from "@/content/site";
import { pad } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecList } from "@/components/ui/SpecList";
import { SpecimenPlate, type PlateVariant } from "@/components/visuals/SpecimenPlate";

const PLATES: PlateVariant[] = ["lattice", "gradient-well", "titration"];
const PLATE_CAPTIONS = ["Lattice assembly", "Plate array", "Titration curve"];

/**
 * The three units as a walk rather than a card grid.
 *
 * Each unit takes a full band and the figure crosses the grid from one side to
 * the other, so the reader physically moves left-right-left down the page — the
 * closest a web page gets to being led through an estate.
 *
 * `units` and `locations` share their ids, so the postal address is joined onto
 * the unit here rather than duplicated in the content layer.
 */
export function UnitWalk() {
  return (
    <section id="units" className="relative bg-canvas py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="01">The estate, unit by unit</Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-ink-950">
              Three addresses. One chain of custody.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              The units sit within a short drive of one another in Kanchipuram district. What that
              proximity buys is not convenience — it is that a study can change division without
              changing custodian.
            </p>
          </div>
        </div>

        <div className="mt-[clamp(3.5rem,7vw,7rem)]">
          {units.map((unit, i) => {
            const location = locations.find((entry) => entry.id === unit.id);
            const flip = i % 2 === 1;

            return (
              <article
                key={unit.id}
                id={unit.id}
                className="scroll-mt-[calc(var(--nav-h)+2rem)] border-t border-ink-900/12 pt-10 [&:not(:first-child)]:mt-[clamp(4rem,8vw,8rem)]"
              >
                {/* Walk marker */}
                <div className="flex items-center gap-4">
                  <span aria-hidden className="block h-2.5 w-2.5 rounded-full bg-signal-500" />
                  <span className="label-mono text-neutral-600">
                    Unit {pad(i + 1)} / {pad(units.length)}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-ink-900/10" />
                  <span className="label-mono text-signal-700">{unit.label}</span>
                </div>

                <div className="egrid mt-12 gap-y-12">
                  {/* Figure */}
                  <div
                    data-reveal="scale"
                    className={[
                      "relative col-span-12 aspect-[5/4] overflow-hidden rounded-[var(--radius-card)] lg:aspect-auto lg:min-h-[24rem]",
                      flip ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5",
                    ].join(" ")}
                  >
                    <SpecimenPlate variant={PLATES[i % PLATES.length]} seed={i + 4} />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink-950/70 to-transparent p-6">
                      <p className="label-mono text-white/80">
                        Fig. {pad(i + 1)} — {PLATE_CAPTIONS[i % PLATE_CAPTIONS.length]}
                      </p>
                      <p className="label-mono text-ink-100">{unit.label}</p>
                    </div>
                  </div>

                  {/* Copy */}
                  <div
                    className={[
                      "col-span-12",
                      flip ? "lg:col-span-6 lg:col-start-1 lg:row-start-1" : "lg:col-span-6 lg:col-start-7",
                    ].join(" ")}
                  >
                    <RevealText as="h3" className="font-display text-d4 text-ink-950">
                      {unit.title}
                    </RevealText>

                    <p data-reveal className="measure mt-7 text-lead text-neutral-700">
                      {unit.body}
                    </p>

                    {location ? (
                      <div
                        data-reveal
                        style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
                        className="mt-10 border-l-2 border-signal-500/50 pl-6"
                      >
                        <p className="label-mono text-neutral-600">{location.role}</p>
                        <address className="mt-3 not-italic text-small text-ink-800">
                          {location.lines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                      </div>
                    ) : null}

                    <div
                      data-reveal
                      style={{ "--reveal-delay": "0.16s" } as React.CSSProperties}
                      className="mt-12"
                    >
                      <h4 className="label-mono text-neutral-600">
                        Houses — {pad(unit.houses.length)} functions
                      </h4>
                      <SpecList
                        items={unit.houses}
                        columns={unit.houses.length > 4 ? 2 : 1}
                        className="mt-5"
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
