import { units } from "@/content/facilities";
import { locations } from "@/content/site";
import { facilityUnitImage, images } from "@/content/imagery";
import { pad } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecList } from "@/components/ui/SpecList";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

/* One site, one illustration. The rotating list existed when this section
   could render several units from a shared stock pool; the content module
   has carried a single accredited site for some time, and the image set
   supplies one frame for it. */

/**
 * The single accredited site, presented as one full band.
 *
 * `units` and `locations` share their ids, so the postal address is joined onto
 * the site here rather than duplicated in the content layer.
 */
export function UnitWalk() {
  return (
    <section id="units" className="relative bg-canvas py-[var(--section-y)]">
      <div className="shell">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow>The facility</Eyebrow>
            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              One site. One chain of custody.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              Every division works from the same accredited site in Salem. What that buys is not
              convenience — it is that a study can change division without changing custodian.
            </p>
          </div>
        </div>

        <div className="mt-[clamp(2rem,3.5vw,3rem)]">
          {units.map((unit) => {
            const location = locations.find((entry) => entry.id === unit.id);

            return (
              <article
                key={unit.id}
                id={unit.id}
                className="scroll-mt-[calc(var(--nav-h)+2rem)] border-t border-ink-900/12 pt-7"
              >
                {/* Site marker */}
                <div className="flex items-center gap-4">
                  <span aria-hidden className="block h-2.5 w-2.5 rounded-full bg-ink-900" />
                  <span className="label-mono text-ink-700">{unit.label}</span>
                  <span aria-hidden className="h-px flex-1 bg-ink-900/10" />
                  <span className="label-mono text-neutral-600">{unit.title}</span>
                </div>

                <div className="egrid mt-6 gap-y-8">
                  {/* Figure */}
                  <div
                    data-reveal="scale"
                    className="relative col-span-12 aspect-[5/4] img-frame lg:col-span-5 lg:aspect-auto lg:min-h-[24rem]"
                  >
                    <SpecimenPlate
                      src={images[facilityUnitImage].src}
                      alt={images[facilityUnitImage].alt}
                      position={images[facilityUnitImage].position}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </div>

                  {/* Copy */}
                  <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                    <p data-reveal className="measure text-lead text-neutral-700">
                      {unit.body}
                    </p>

                    {location ? (
                      <div
                        data-reveal
                        style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
                        className="mt-7 border-l-2 border-ink-900/30 pl-6"
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
                      className="mt-7"
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
