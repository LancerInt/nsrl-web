import { scaleStats } from "@/content/organisation";
import { disciplines } from "@/content/disciplines";
import { heroImage, images } from "@/content/imagery";
import { cn, numberWord } from "@/lib/utils";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";
import { ActionLink } from "@/components/ui/ActionLink";
import { CountUp } from "@/components/ui/CountUp";

const hero = images[heroImage];

/**
 * The opening.
 *
 * The artwork is composed for this slot: a 2560×1332 field whose left half
 * is empty navy and whose right half carries the rising ribbon of sample
 * platforms and the NSRL plinth. So there is no crop to engineer and no
 * grade to apply — the enlargement, the hard desaturation and the overlay
 * that used to fight a yellow-cast stock photograph are all gone.
 *
 * The image is shown whole and dropped to the floor of the section, with the
 * headline on the empty upper-left. The overlay is the lightest it can be
 * while still guaranteeing text contrast: the image is already the right
 * navy, and darkening it further would only bury the artwork the set was
 * commissioned for.
 *
 * The recorded figures are a frosted rail along the foot, so the blur has
 * the plinth and the lower platforms to work on.
 */
export function HomeHero() {
  return (
    <>
      <section
        data-theme="deep"
        className="relative isolate flex flex-col overflow-hidden bg-deep text-white xl:min-h-[min(30rem,64svh)] xl:justify-end"
      >
        {/*
          Two layouts, because one composition cannot serve both.

          From `xl` up the artwork is the background and the copy sits on its
          empty left half, which is what it was drawn for.

          Below `xl` there is not enough width for that: the lead runs past
          the empty half and onto the ribbon of platforms, which is the
          busiest, lightest part of the image. Stacking instead gives the
          copy a clean navy field and the artwork its own 16:10 band where
          the whole composition is visible. `order` does the swap, so the
          markup keeps the heading first either way.

          `xl` is measured, not guessed. Sampling the declared ink against
          the pixel each glyph actually lands on: at 1024 the lead crosses
          the petri dish at 1.62:1, and at 1280 its worst backdrop is still
          the navy field, at 13.7:1. The boundary is where the copy stops
          colliding with the subject — nowhere near where a device stops
          being a tablet, which is why the obvious `sm` and `lg` are both
          wrong here.
        */}
        <div className="relative order-2 aspect-[16/10] w-full overflow-hidden xl:absolute xl:inset-0 xl:order-none xl:-z-10 xl:aspect-auto">
          {/*
            `contain`, not `cover`, from `xl` up — so the illustration is
            shown entire rather than cropped top and bottom, which is what
            was clipping the sample plate under the header and shearing the
            NSRL plinth at the foot.

            It works here only because the artwork's own background is this
            navy: anchored bottom-right on a `bg-deep` section, the fill
            either side of it is the same colour as the field it is drawn
            on, so there is no letterbox to see. Bottom anchoring is what
            drops the artwork clear of the navigation and leaves the quiet
            upper-left for the headline.
          */}
          <SpecimenPlate
            src={hero.src}
            alt={hero.alt}
            position={hero.position}
            sizes="100vw"
            priority
            className="xl:object-contain xl:[object-position:100%_100%]"
          />
          <div aria-hidden className="scrim hidden xl:block" />
        </div>

        {/* The top padding clears the bar rather than composing against it:
            the bar is 5.25rem tall before it condenses, so the floor is that
            plus enough air that the eyebrow does not look wedged under it.
            Everything above that floor is discretionary, which is where the
            height came out of. */}
        <div className="shell order-1 w-full pb-[clamp(1.5rem,3vw,2.25rem)] pt-[clamp(6.75rem,11vh,7.5rem)] xl:order-none">
          {/* Sized to hold "Complete preclinical research," on one line at
              every width above `sm`, which is the whole point of setting the
              break by hand. */}
          <div className="max-w-[56rem]">
            <p data-reveal className="label-mono text-meniscus-200">
              Contract research organisation · Salem, Tamil Nadu
            </p>

            {/* Two lines on a desktop, three on a phone, and never a widow:
                the break is set, not left to the measure. */}
            <h1
              data-reveal
              style={{ "--reveal-delay": "0.06s" } as React.CSSProperties}
              className="mt-4 font-display text-[clamp(2.125rem,3.5vw,3.25rem)] font-[450] leading-[1.06] tracking-[-0.018em]"
            >
              Complete preclinical research,
              {/* Below `sm` the first line will not fit whatever the size, so
                  the hard break is dropped and the measure takes over. */}
              <br className="hidden sm:inline" />{" "}
              start to finish.
            </h1>

            <p
              data-reveal
              style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
              className="mt-5 max-w-[42rem] text-lead text-ink-100"
            >
              One accredited laboratory, {numberWord(disciplines.length)} scientific divisions.
              A substance that arrives for chemistry moves through toxicology, ecotoxicology
              and entomology without leaving our custody.
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <ActionLink href="/contact" variant="solid" tone="deep">
                Request a proposal
              </ActionLink>
              <ActionLink href="/research" variant="outline" tone="deep">
                Explore divisions
              </ActionLink>
            </div>
          </div>
        </div>

        {/*
          Recorded figures, as a frosted rail along the foot of the hero.

          It sits *inside* the section rather than in a band beneath it, so
          the blur has the artwork to work on — glass over a flat colour is
          just a lighter flat colour. `order-3` keeps it last in the stacked
          layout, under the artwork; from `xl` it is the final flex child
          and the section's `justify-end` brings it to the floor.
        */}
        <section
          aria-label="NSRL in numbers"
          className="glass-deep relative order-3 border-t border-white/15 xl:order-none"
        >
          <div className="shell">
            {/*
              Rules are drawn per cell, not by a lit background behind a
              `gap-px` grid. That trick needs the grid to carry a colour, and
              the grid is shell-width while the frosted rail is full-bleed —
              so the colour showed as a brighter band with a hard vertical
              seam at each gutter. Explicit borders keep the frosting
              uniform edge to edge.

              The indices are doing real work: no left rule at the start of
              a row, and a top rule only on the second row, which is two
              columns below `lg` and four at and above it.
            */}
            <dl className="grid grid-cols-2 lg:grid-cols-4">
              {scaleStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "border-white/12 px-5 py-4 sm:px-7 sm:py-5",
                    i % 2 !== 0 && "border-l",
                    i % 4 !== 0 && "lg:border-l",
                    i % 4 === 0 && "lg:border-l-0",
                    i >= 2 && "border-t lg:border-t-0",
                  )}
                >
                  <dt className="label-mono text-ink-100">{stat.label}</dt>
                  <dd className="mt-1 font-display text-[clamp(1.5rem,1.9vw,1.875rem)] font-[450] leading-none text-white">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <p className="mt-1.5 text-micro leading-relaxed text-ink-100">{stat.caption}</p>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </section>
    </>
  );
}
