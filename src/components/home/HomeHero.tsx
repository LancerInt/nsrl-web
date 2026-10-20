import { scaleStats } from "@/content/organisation";
import { heroImage, images } from "@/content/imagery";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";
import { ActionLink } from "@/components/ui/ActionLink";
import { CountUp } from "@/components/ui/CountUp";

const hero = images[heroImage];

/**
 * The opening.
 *
 * The source is a 3:2 room photograph, and a full-bleed band is far wider
 * than that — so `object-fit: cover` always shows its *entire* width and the
 * frame becomes the whole busy room, with the eye landing nowhere. The scale
 * below is the fix: enlarging past the frame and holding the origin
 * right-of-centre crops the cluttered near bench out of shot altogether and
 * brings the instrument stack and its monitor up to a size where they read
 * as the subject. It is a crop, not a motion effect — the still holds
 * perfectly still while it is read.
 *
 * The grade is heavier than the site default for the same reason: the
 * original is lit by ageing fluorescent tubes and carries a yellow-green
 * cast that fights the navy. Desaturating hard and letting the overlay
 * supply the colour is what makes the photograph belong to this palette.
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
        className="relative isolate flex min-h-[min(44rem,82svh)] flex-col justify-end overflow-hidden bg-deep text-white"
      >
        {/* Photograph */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <SpecimenPlate
            src={hero.src}
            alt={hero.alt}
            position={hero.position}
            sizes="100vw"
            priority
            className="origin-[72%_46%] scale-[1.45] [--photo-grade:saturate(0.42)_contrast(1.14)_brightness(0.9)] sm:scale-[1.32]"
          />
          <div aria-hidden className="scrim" />
        </div>

        <div className="shell w-full pb-[clamp(3rem,5vw,4.5rem)] pt-[clamp(9rem,17vh,13rem)]">
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
              One accredited laboratory, thirteen scientific divisions. A molecule that arrives
              for chemistry moves through toxicology, pathology and radiolabelled fate work
              without leaving our custody.
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
