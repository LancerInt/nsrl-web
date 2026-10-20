import { capacityStats } from "@/content/organisation";
import { facilityShowcase, images } from "@/content/imagery";
import { formatCount } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

/**
 * The facility, shown rather than described.
 *
 * Four frames, each captioned with what it depicts, set against the recorded
 * capacity figures. The composition is varied — one tall frame, three wide —
 * so the band reads as a plate of photographs rather than a row of thumbnails,
 * but every frame shares one grade and one caption treatment so the variation
 * never becomes noise.
 *
 * The captions describe the kind of environment in the frame. They do not
 * claim the photograph is of NSRL's own site, because the current library is
 * free-licence stand-ins — see `content/imagery.ts` and README.md.
 */
/**
 * Column spans at `lg`: one lead frame at half the row, two at a quarter
 * each. Variation in scale, not in shape — every frame keeps the same 4:3.
 */
const SPANS = ["sm:col-span-2 lg:col-span-6", "lg:col-span-3", "lg:col-span-3"];

export function FacilityShowcase() {

  return (
    <section
      data-theme="deep"
      className="bg-deep py-[var(--section-y)] text-white"
      aria-labelledby="facility"
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5" data-reveal>
          <div>
            <Eyebrow tone="deep">The facility</Eyebrow>
            <h2 id="facility" className="mt-5 max-w-[22ch] font-display text-d2 text-white">
              One accredited site in Salem, Tamil Nadu.
            </h2>
          </div>
          <p className="max-w-[40ch] text-small text-ink-200">
            Chemistry, toxicology, ecotoxicology, entomology, pathology and the vivarium share
            one address. That is what lets a study change division without changing custodian.
          </p>
        </div>

        {/* `items-end` is what makes one-big-two-small read as a composition
            rather than as a large frame with two orphans floating above it:
            the three frames sit on a shared baseline, and the extra height
            goes above the small pair where it belongs. */}
        <div className="mt-[clamp(2rem,3.2vw,3rem)] grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
          {facilityShowcase.map((frame, i) => (
            <Frame
              key={frame.title}
              frame={frame}
              delay={0.05 * i}
              className={SPANS[i % SPANS.length]}
              sizes={
                i === 0
                  ? "(min-width: 1024px) 48vw, 100vw"
                  : "(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
              }
            />
          ))}
        </div>

        {/* Recorded capacity — the numbers the photographs are evidence of. */}
        <dl
          data-reveal
          className="mt-10 grid gap-x-8 gap-y-6 border-t border-white/12 pt-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {capacityStats.map((stat) => (
            <div key={stat.label}>
              <dt className="label-mono text-ink-200">{stat.label}</dt>
              <dd className="mt-2 font-display text-h1 text-white">
                {formatCount(stat.value)}
                {stat.suffix ?? ""}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8" data-reveal>
          <ActionLink href="/facilities" variant="outline" tone="deep">
            Walk the facility
          </ActionLink>
        </div>
      </div>
    </section>
  );
}

function Frame({
  frame,
  className,
  sizes,
  delay = 0,
}: {
  frame: (typeof facilityShowcase)[number];
  className?: string;
  sizes: string;
  delay?: number;
}) {
  const image = images[frame.image];

  return (
    <figure
      data-reveal
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
      className={className}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-deep-raised">
        <SpecimenPlate
          src={image.src}
          alt={image.alt}
          position={image.position}
          sizes={sizes}
          className="photo-deep"
        />
      </div>
      <figcaption className="mt-3.5">
        <span className="block font-display text-h3 text-white">{frame.title}</span>
        <span className="mt-1 block max-w-[52ch] text-small text-ink-200">{frame.caption}</span>
      </figcaption>
    </figure>
  );
}
