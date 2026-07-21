"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { scaleStats } from "@/content/organisation";
import { OrbitalField } from "@/components/visuals/OrbitalField";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";
import { CountUp } from "@/components/ui/CountUp";

let registered = false;

/**
 * The homepage opening. Full-height, left-weighted, with the orbital field
 * parallaxing behind the type as the visitor scrolls away from it.
 */
export function HomeHero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const ctx = gsap.context(() => {
      gsap.to("[data-hero-field]", {
        yPercent: 22,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.to("[data-hero-copy]", {
        yPercent: -8,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-theme="deep"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-deep text-white"
    >
      {/* Field */}
      <div
        aria-hidden
        data-hero-field
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.62]"
      >
        <div className="absolute left-1/2 top-1/2 h-[min(140vh,140vw)] w-[min(140vh,140vw)] -translate-x-1/2 -translate-y-[54%] lg:left-[68%]">
          <OrbitalField />
        </div>
      </div>

      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.035)",
            "--graticule-size": "6rem",
          } as React.CSSProperties
        }
      />

      {/* Vignette keeps the display type legible over the field. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--color-deep)_18%,transparent_78%)]"
      />

      <div className="shell flex flex-1 flex-col justify-center pb-16 pt-[clamp(9rem,16vh,12rem)]">
        <div data-hero-copy className="max-w-[min(64rem,100%)]">
          <p className="label-mono flex items-center gap-3 text-signal-400">
            <span aria-hidden className="inline-block h-px w-10 bg-signal-400" />
            Contract research organisation · Tamil Nadu, India
          </p>

          <h1 className="mt-9 font-display text-d1 text-white">
            <RevealText as="span" trigger="mount" className="block">
              Complete preclinical
            </RevealText>
            <RevealText as="span" trigger="mount" delay={0.1} className="block">
              research,{" "}
              {/* The stop sits inside the accent run: Manrope's full stop at
                  display size is a heavy square, and left white beside the
                  serif italic it reads as a stray glyph. */}
              <span className="font-editorial font-normal italic tracking-[-0.02em] text-signal-300">
                start to finish.
              </span>
            </RevealText>
          </h1>

          <p
            data-reveal
            style={{ "--reveal-delay": "0.55s" } as React.CSSProperties}
            className="measure mt-10 text-lead text-ink-200"
          >
            One accredited laboratory. Thirteen scientific divisions. A molecule that arrives for
            chemistry can move through toxicology, pathology and radiolabelled fate work without
            once leaving our custody — or breaking its chain of evidence.
          </p>

          <div
            data-reveal
            style={{ "--reveal-delay": "0.7s" } as React.CSSProperties}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <ActionLink href="/contact" variant="solid" tone="deep" cursorLabel="Enquire">
              Request a proposal
            </ActionLink>
            <ActionLink href="/research" variant="outline" tone="deep">
              Explore the divisions
            </ActionLink>
          </div>
        </div>
      </div>

      {/* Baseline instrument strip */}
      <div className="relative border-t border-white/10 bg-deep/60 backdrop-blur-sm">
        <div className="shell">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {scaleStats.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  "flex flex-col gap-1 py-7 pr-6",
                  i > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : "",
                  i === 1 ? "border-l border-white/10 pl-6 lg:pl-8" : "",
                  i === 3 ? "border-l border-white/10 pl-6 lg:pl-8" : "",
                  i >= 2 ? "border-t border-white/10 lg:border-t-0" : "",
                ].join(" ")}
              >
                <dd className="font-display text-h1 text-white">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="label-mono text-ink-200">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute -top-14 right-[var(--shell-pad)] hidden items-center gap-3 lg:flex"
        >
          <span className="label-mono text-ink-200">Scroll</span>
          <span className="relative block h-12 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-4 bg-signal-400 motion-safe:animate-[scan_2.6s_var(--ease-in-out-expo)_infinite]" />
          </span>
        </span>
      </div>
    </section>
  );
}
