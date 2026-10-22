import { scaleStats } from "@/content/organisation";
import { disciplines } from "@/content/disciplines";
import { heroImage, images } from "@/content/imagery";
import { numberWord } from "@/lib/utils";
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
 * that used to fight a yellow-cast stock photograph are all gone. What is
 * left is `object-fit: cover` and a crop held right of centre, which keeps
 * the platforms and the wordmark in frame as the band narrows.
 *
 * The overlay is now the lightest it can be while still guaranteeing text
 * contrast. The image is already the right navy; darkening it further would
 * only bury the artwork the set was commissioned for. Below `sm` the copy
 * sits on a stronger vertical wash instead, because at that width the
 * platforms run under the text rather than beside it.
 *
 * The recorded figures sit *below* the image on their own band rather than
 * floating on it in a glass panel: the numbers are evidence, and evidence is
 * easier to trust when it is set on paper.
 */
export function HomeHero() {
  return (
    <>
      <section
        data-theme="deep"
        className="relative isolate flex flex-col overflow-hidden bg-deep text-white sm:min-h-[min(44rem,82svh)] sm:justify-end"
      >
        {/*
          Two layouts, because one crop cannot serve both.

          From `sm` up the artwork is the background and the copy sits on its
          empty left half, which is the composition it was drawn for.

          Below `sm` the frame is portrait and the artwork is a 1.9:1
          landscape, so `cover` would show roughly a quarter of its width —
          a blurred slice of platforms with no plinth, no wordmark and no
          subject, sitting under the headline. Stacking instead gives the
          copy a clean navy field and the artwork its own 16:10 band where
          the whole composition is visible. `order` does the swap, so the
          markup keeps the heading first either way.
        */}
        <div className="relative order-2 aspect-[16/10] w-full overflow-hidden sm:absolute sm:inset-0 sm:order-none sm:-z-10 sm:aspect-auto">
          <SpecimenPlate
            src={hero.src}
            alt={hero.alt}
            position={hero.position}
            sizes="100vw"
            priority
          />
          <div aria-hidden className="scrim hidden sm:block" />
        </div>

        <div className="shell order-1 w-full pb-[clamp(2.5rem,5vw,4.5rem)] pt-[clamp(7.5rem,17vh,13rem)] sm:order-none">
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
              className="mt-5 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-[450] leading-[1.08] tracking-[-0.018em]"
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
              className="mt-6 max-w-[40rem] text-lead text-ink-100"
            >
              One accredited laboratory, {numberWord(disciplines.length)} scientific divisions.
              A substance that arrives for chemistry moves through toxicology, ecotoxicology
              and entomology without leaving our custody.
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}
              className="mt-9 flex flex-wrap items-center gap-3"
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
      </section>

      {/* Recorded figures. A crisp strip, ruled into four, sitting on the
          navy so it reads as the base of the hero rather than the top of the
          page. */}
      <section aria-label="NSRL in numbers" data-theme="deep" className="bg-deep-raised">
        <div className="shell">
          {/* gap-px over a lit background rather than `divide-*`: in a grid
              that reflows from four columns to two, divide utilities leave
              rules on the wrong edges. */}
          <dl className="grid grid-cols-2 gap-px bg-white/12 lg:grid-cols-4">
            {scaleStats.map((stat) => (
              <div key={stat.label} className="bg-deep-raised px-5 py-6 sm:px-7 sm:py-7">
                <dt className="label-mono text-ink-200">{stat.label}</dt>
                <dd className="mt-2 font-display text-[clamp(1.75rem,2.4vw,2.375rem)] font-[450] leading-none text-white">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <p className="mt-2.5 text-micro leading-relaxed text-ink-200">{stat.caption}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
