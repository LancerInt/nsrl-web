"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { SpecimenPlate, type PlateVariant } from "@/components/visuals/SpecimenPlate";

let registered = false;

const PLATES: PlateVariant[] = ["wave", "chromatogram", "lattice", "titration", "gradient-well"];

/**
 * The shallow projection of an industry this section renders.
 *
 * Declared here and built on the server in `app/page.tsx`. The industry module
 * carries body copy, service group trees and SEO strings none of which this
 * card needs, and a client import would send the whole module to the browser.
 * `frameworks` arrives already trimmed to what the card displays.
 */
export type SectorCard = {
  slug: string;
  index: string;
  name: string;
  promise: string;
  summary: string;
  frameworks: string[];
};

/**
 * Five sectors, moved through horizontally while the section is pinned.
 *
 * The pin is desktop-only: on a phone, hijacking vertical scroll to drive
 * horizontal movement fights the visitor's thumb, so the same content becomes
 * an ordinary scroll-snapping rail.
 */
export function SectorScroll({ sectors }: { sectors: SectorCard[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    /*
      The pin is a conditional piece of behaviour, not a one-time decision.
      `gsap.matchMedia` re-evaluates the query on every resize and orientation
      change: the pin is built when the conditions are met and fully reverted —
      transform, ScrollTrigger and pin spacer alike — the moment they stop
      being met. Reading the viewport once in a `[]` effect left the pin alive
      over the mobile scroll-rail layout after a resize down, which jammed the
      section. Reduced motion sits inside the same query, so the pin is never
      created for anyone who has asked for less movement.
    */
    const mm = gsap.matchMedia(root);

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const el = track.current;
        if (!el) return;

        const distance = () => el.scrollWidth - window.innerWidth + 96;

        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden bg-canvas-sunken">
      <div className="shell pb-14 pt-[var(--section-y)]">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="03">Sectors served</Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-ink-950">
              Written for the authority that will read it.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              A dossier is not a pile of studies. We scope from the regulator backwards — the
              endpoints, guidelines and species follow from who has to approve it.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--shell-pad)] pb-[var(--section-y)] lg:snap-none lg:overflow-visible lg:pb-24"
        style={{ scrollbarWidth: "none" }}
      >
        {sectors.map((industry, i) => (
          <Link
            key={industry.slug}
            href={`/services/${industry.slug}`}
            className="group relative flex w-[min(86vw,30rem)] shrink-0 snap-center flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink-900/10 bg-canvas-raised transition-colors duration-500 hover:border-signal-500/50"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <SpecimenPlate variant={PLATES[i % PLATES.length]} seed={i + 2} />
              <span className="label-mono absolute left-6 top-6 rounded-full bg-canvas-raised/85 px-3 py-1.5 text-ink-700 backdrop-blur-sm">
                {industry.index}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-8">
              <h3 className="font-display text-h1 text-ink-950">{industry.name}</h3>
              {/* Sans, not the editorial serif: the accent is a once-per-page
                  gesture, and inside a repeating card it stops being an accent. */}
              <p className="mt-3 text-lead text-neutral-700">{industry.promise}</p>
              <p className="mt-5 flex-1 text-small text-neutral-600">{industry.summary}</p>

              <ul className="mt-7 flex flex-wrap gap-1.5">
                {industry.frameworks.map((framework) => (
                  <li
                    key={framework}
                    className="label-mono rounded-full border border-ink-900/12 px-2.5 py-1.5 text-ink-600"
                  >
                    {framework}
                  </li>
                ))}
              </ul>

              <span className="mt-8 inline-flex items-center gap-2 border-t border-ink-900/10 pt-6 text-small font-medium text-ink-900 transition-colors duration-400 group-hover:text-signal-700">
                Sector detail
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
