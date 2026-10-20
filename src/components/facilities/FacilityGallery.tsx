import { facilityGallery, images } from "@/content/imagery";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

/**
 * Four environments, captioned.
 *
 * Every frame holds the same 3:2 ratio and the same grade; the captions do
 * the differentiating. They describe the kind of environment shown and the
 * specification behind it — both of which come from
 * `content/facilities.ts` — without claiming the photograph is of this site.
 * The library is free-licence stand-ins until NSRL's own photography lands.
 */
export function FacilityGallery() {
  return (
    <section
      id="gallery"
      className="bg-canvas-sunken py-[var(--section-y)]"
      aria-labelledby="gallery-heading"
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5" data-reveal>
          <div>
            <Eyebrow>Around the site</Eyebrow>
            <h2
              id="gallery-heading"
              className="mt-5 max-w-[22ch] font-display text-d3 text-ink-950"
            >
              Environments, and what each is held to.
            </h2>
          </div>
          <p className="max-w-[40ch] text-small text-neutral-600">
            Six controlled environments carry the in-life and analytical programme. The full
            specification schedule is below.
          </p>
        </div>

        <ul className="mt-[clamp(2rem,3.2vw,3rem)] grid gap-x-5 gap-y-8 sm:grid-cols-2">
          {facilityGallery.map((frame, i) => {
            const image = images[frame.image];

            return (
              <li
                key={frame.title}
                data-reveal
                style={{ "--reveal-delay": `${0.05 * i}s` } as React.CSSProperties}
              >
                <figure>
                  <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-ink-900">
                    <SpecimenPlate
                      src={image.src}
                      alt={image.alt}
                      position={image.position}
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <figcaption className="mt-3.5">
                    <span className="block font-display text-h3 text-ink-950">{frame.title}</span>
                    <span className="mt-1 block text-small text-neutral-600">{frame.caption}</span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
