import { scaleStats } from "@/content/organisation";
import { images } from "@/content/imagery";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";
import { ActionLink } from "@/components/ui/ActionLink";
import { CountUp } from "@/components/ui/CountUp";

/**
 * The cinematic opening: a full-bleed laboratory photograph carrying an
 * elegant scrim, the thesis set large in the serif display voice, and the
 * recorded figures floating along the base as a quiet glass rail. One
 * confident image, one confident statement — the site's focal moment.
 */
export function HomeHero() {
  return (
    <section
      data-theme="deep"
      className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-deep text-white"
    >
      {/* Photograph */}
      <div className="absolute inset-0 -z-10">
        <SpecimenPlate
          src={images.chemistryBench.src}
          alt={images.chemistryBench.alt}
          sizes="100vw"
          priority
          className="scale-105 [animation:hero-drift_24s_var(--ease-in-out-expo)_infinite_alternate] motion-reduce:animate-none"
        />
        <div aria-hidden className="scrim" />
      </div>

      <div className="shell w-full pb-[clamp(2.5rem,4vw,3.5rem)] pt-[clamp(9rem,18vh,14rem)]">
        <div className="max-w-[52rem]">
          <p
            data-reveal
            className="label-mono text-white/70"
          >
            Contract research organisation · Tamil Nadu, India
          </p>

          <h1
            data-reveal
            style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
            className="mt-6 font-display font-[450] leading-[1.02] tracking-[-0.02em] text-[clamp(2.75rem,6.4vw,6.25rem)]"
          >
            Complete preclinical research,
            <br className="hidden sm:block" /> start to finish.
          </h1>

          <p
            data-reveal
            style={{ "--reveal-delay": "0.18s" } as React.CSSProperties}
            className="mt-7 max-w-[40rem] text-lead text-white/80"
          >
            One accredited laboratory. Thirteen scientific divisions. A molecule that arrives for
            chemistry can move through toxicology, pathology and radiolabelled fate work without
            once leaving our custody.
          </p>

          <div
            data-reveal
            style={{ "--reveal-delay": "0.28s" } as React.CSSProperties}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ActionLink href="/contact" variant="solid" tone="deep">
              Request a proposal
            </ActionLink>
            <ActionLink href="/research" variant="outline" tone="deep">
              Explore the divisions
            </ActionLink>
          </div>
        </div>
      </div>

      {/* Recorded figures — a quiet glass rail on the photograph. */}
      <div
        data-reveal
        style={{ "--reveal-delay": "0.36s" } as React.CSSProperties}
        className="shell w-full pb-[clamp(1.5rem,3vw,2.5rem)]"
      >
        <dl className="glass grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] lg:grid-cols-4">
          {scaleStats.map((stat) => (
            <div key={stat.label} className="bg-white/[0.03] px-6 py-5 backdrop-blur-md">
              <dd className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-[450] leading-none text-white">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="label-mono mt-2 text-white/60">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
