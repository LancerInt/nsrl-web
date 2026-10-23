import { capacityStats } from "@/content/organisation";
import { facilityShowcase, images } from "@/content/imagery";
import { formatCount, pad } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActionLink } from "@/components/ui/ActionLink";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";
import { ConceptualLabel } from "@/components/visuals/ConceptualLabel";

/**
 * The facility, shown rather than described.
 *
 * ── What this replaces ─────────────────────────────────────────────────
 *
 * A 58/42 split: one tall lead frame beside two stacked ones, each sized
 * by flex rather than by a ratio. Three problems, all of them structural.
 *
 * The three images are the same kind of thing — one environment each —
 * and the layout rendered them at three different weights and three
 * different aspect ratios, so they read as a hierarchy that does not
 * exist. Equal frames at one ratio say what is true: here are three
 * environments.
 *
 * The lead frame had no ratio at all. `aspect-auto` with `flex-1` let its
 * height come from whatever the other column happened to be, which made
 * the crop unpredictable and, at wide viewports, enormous.
 *
 * And the conceptual disclaimer appeared three times, once per card,
 * directly under three captions that were already two lines each. Stated
 * once beneath the set it covers, it is clearer and it stops competing
 * with the captions for the same reading.
 *
 * ── What is deliberate ─────────────────────────────────────────────────
 *
 * No card chrome. The images are the objects; captions sit under them on
 * the section's own navy rather than inside a raised panel, which was
 * putting a box around a box.
 *
 * Two type levels per caption, not three: a title and one line. The index
 * is a label, in the same mono register the rest of the site uses for
 * reference marks.
 *
 * This is the one section on the homepage that names the Salem site, which
 * is exactly why its artwork has to disclaim being a record of it.
 * ASSET_MANIFEST.csv marks all three slots REAL PHOTO NEEDED.
 */
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

        {/*
          One column, then three. Never two: there are three frames, and a
          two-column grid leaves the third alone beside an empty cell —
          the same orphan the sector and accreditation grids had to be
          made count-aware to avoid.

          The ratio changes with the column count and that is deliberate.
          A full-width 4:3 frame at 768px is 576px tall, so three of them
          is a lot of scrolling for a showcase; 16:10 keeps the single
          column in proportion. What matters is that the three are
          identical to each other at any one width, which was the actual
          fault in what this replaces.
        */}
        <ul
          data-reveal
          className="mt-[clamp(2rem,3.4vw,3rem)] grid gap-x-6 gap-y-8 lg:grid-cols-3"
        >
          {facilityShowcase.map((frame, i) => {
            const image = images[frame.image];
            return (
              <li key={frame.title}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-deep-raised lg:aspect-[4/3]">
                    <SpecimenPlate
                      src={image.src}
                      alt={image.alt}
                      position={image.position}
                      /* The real rendered width at each breakpoint. Left to
                         default this slot asked for a 3840px file to fill
                         about 380px. */
                      sizes="(min-width: 1024px) 31vw, 100vw"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <span className="label-mono text-meniscus-300">{pad(i + 1)}</span>
                    <span className="mt-2 block font-display text-h2 text-white">
                      {frame.title}
                    </span>
                    <span className="mt-1.5 block text-small leading-snug text-ink-100">
                      {frame.caption}
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        {/* Said once, for the set, immediately beneath it — rather than
            three times, once under each caption. */}
        <ConceptualLabel tone="deep" className="mt-6">
          All three are conceptual illustrations — not photographs of NSRL premises or
          equipment.
        </ConceptualLabel>

        {/* Recorded capacity. */}
        <dl
          data-reveal
          className="mt-10 grid gap-x-8 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4"
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
