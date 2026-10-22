import { capacityStats } from "@/content/organisation";
import { facilityShowcase, images } from "@/content/imagery";
import { formatCount } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

/**
 * The facility, shown rather than described.
 *
 * One tall frame and two stacked beside it, sized so the three fill a single
 * clean rectangle with no dead corner — the lead runs the full height of the
 * block and each stacked frame takes half of it less the gap. Laying it out
 * as spans in a shared row left the two small frames floating at the top of
 * a column twice their height; this is a two-column flex instead, which has
 * no such gap to leave.
 *
 * Captions sit directly beneath their own frame, inside it, so a caption is
 * never ambiguous about which photograph it belongs to.
 *
 * The captions describe the kind of environment in the frame. They do not
 * claim the photograph is of NSRL's own site — the current library is
 * free-licence stand-ins. See `content/imagery.ts` and README.md.
 */
export function FacilityShowcase() {
  const [lead, ...stacked] = facilityShowcase;

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
            <h2 id="facility" className="mt-4 max-w-[22ch] font-display text-d2 text-white">
              One accredited site in Salem, Tamil Nadu.
            </h2>
          </div>
          <p className="max-w-[40ch] text-small text-ink-100">
            Chemistry, toxicology, ecotoxicology, entomology, microbiology and the vivarium
            share one address. That is what lets a study change division without changing
            custodian.
          </p>
        </div>

        <div
          data-reveal
          className="mt-[clamp(1.75rem,3vw,2.5rem)] flex flex-col gap-4 lg:flex-row lg:items-stretch"
        >
          {/* Lead frame — full height of the block. */}
          <Frame
            frame={lead}
            className="lg:w-[58%]"
            mediaClassName="aspect-[4/3] lg:aspect-auto lg:flex-1"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />

          {/* Two stacked, each half the block less the gap. */}
          <div className="flex flex-col gap-4 lg:w-[42%]">
            {/* `min-h` on the stacked media is what actually sets the
                height of the whole block: both columns stretch, so the
                shortest definite height in the group wins and the lead
                flexes to match it. Set too low, the two small frames
                letterbox to a 3:1 slot and their subjects get cropped out
                of their own photographs. */}
            {stacked.map((frame) => (
              <Frame
                key={frame.title}
                frame={frame}
                className="lg:flex-1"
                mediaClassName="aspect-[16/9] lg:aspect-auto lg:flex-1 lg:min-h-[14rem]"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            ))}
          </div>
        </div>

        {/* Recorded capacity — the numbers the photographs are evidence of. */}
        <dl
          data-reveal
          className="mt-10 grid gap-x-8 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {capacityStats.map((stat) => (
            <div key={stat.label}>
              <dt className="label-mono text-ink-100">{stat.label}</dt>
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
  mediaClassName,
  sizes,
}: {
  frame: (typeof facilityShowcase)[number];
  className?: string;
  mediaClassName: string;
  sizes: string;
}) {
  const image = images[frame.image];

  return (
    <figure
      className={`flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-deep-raised ${className ?? ""}`}
    >
      <div className={`relative overflow-hidden ${mediaClassName}`}>
        <SpecimenPlate
          src={image.src}
          alt={image.alt}
          position={image.position}
          sizes={sizes}
        />
      </div>
      <figcaption className="px-4 py-3.5 sm:px-5 sm:py-4">
        <span className="block font-display text-h3 text-white">{frame.title}</span>
        <span className="mt-1 block text-small leading-snug text-ink-100">{frame.caption}</span>
      </figcaption>
    </figure>
  );
}
