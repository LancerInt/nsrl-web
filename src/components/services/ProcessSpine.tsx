"use client";

import { useEffect, useRef, useState } from "react";

import { cn, pad } from "@/lib/utils";
import { studyLifecycle } from "@/content/organisation";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The seven stages of a study, read as a vertical spine rather than the
 * homepage's horizontal calibrated track.
 *
 * A single IntersectionObserver marks whichever stage is crossing the middle of
 * the viewport, and a sticky readout beside the spine reports it the way an
 * instrument would. Nothing moves: the observer only changes colour and the
 * width of a progress rule, so the section is complete and legible with
 * JavaScript off, and inert under reduced motion.
 */
export function ProcessSpine() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const total = studyLifecycle.length;

  useEffect(() => {
    const el = list.current;
    if (!el) return;

    const stages = Array.from(el.querySelectorAll<HTMLElement>("[data-stage]"));
    if (!stages.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.stage);
          if (Number.isFinite(index)) setActive(index);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    stages.forEach((stage) => observer.observe(stage));
    return () => observer.disconnect();
  }, []);

  const current = studyLifecycle[active];

  return (
    <Section tone="deep" bleed className="overflow-hidden">
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-60"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.03)",
            "--graticule-size": "4.5rem",
          } as React.CSSProperties
        }
      />

      <div className="shell relative py-[var(--section-y)]">
        <div className="egrid gap-y-16">
          {/* Sticky readout */}
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:rail-sticky">
              <Eyebrow index="01" tone="deep">
                The working method
              </Eyebrow>

              <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
                What happens between your first call and your report.
              </RevealText>

              <p className="measure-tight mt-8 text-small text-ink-200">
                We start from the authority that will read the dossier, not from a study list.
                Divisions run in parallel wherever the science allows, and the record stays
                unbroken from receipt through to the tenth year of archival.
              </p>

              {/* Instrument readout — decorative duplication of the spine below. */}
              <div aria-hidden className="mt-12 border-t border-white/12 pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-d4 tabular-nums text-white">
                    {current.index}
                    <span className="ml-2 text-h3 font-medium text-ink-200">
                      / {pad(total)}
                    </span>
                  </p>
                  <p className="label-mono text-signal-400">{current.title}</p>
                </div>

                <div className="mt-5 h-px w-full bg-white/12">
                  <div
                    className="h-px bg-signal-400 transition-[width] duration-700 [transition-timing-function:var(--ease-out-expo)]"
                    style={{ width: `${((active + 1) / total) * 100}%` }}
                  />
                </div>
              </div>

              <ActionLink
                href="/about#quality-system"
                variant="text"
                tone="deep"
                className="mt-8"
              >
                How the quality system governs it
              </ActionLink>
            </div>
          </div>

          {/* The spine */}
          <ol
            ref={list}
            className="col-span-12 border-l border-white/12 lg:col-span-7 lg:col-start-6"
          >
            {studyLifecycle.map((stage, i) => {
              const on = i === active;
              return (
                <li
                  key={stage.index}
                  data-stage={i}
                  className="relative pb-[clamp(3rem,6vw,5.5rem)] pl-[clamp(1.5rem,3.5vw,3.25rem)] last:pb-0"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-[0.55rem] h-[7px] w-[7px] -translate-x-1/2 rounded-full transition-colors duration-500",
                      on ? "bg-signal-400" : "bg-white/25",
                    )}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-[0.55rem] h-px w-[clamp(0.75rem,2vw,1.75rem)] transition-colors duration-500",
                      on ? "bg-signal-400/70" : "bg-white/12",
                    )}
                  />

                  <div
                    style={{ "--stage-indent": `${i * 0.85}rem` } as React.CSSProperties}
                    className="lg:ml-[var(--stage-indent)]"
                  >
                    <p
                      className={cn(
                        "label-mono tabular-nums transition-colors duration-500",
                        on ? "text-signal-400" : "text-ink-300",
                      )}
                    >
                      {stage.index}
                    </p>

                    <h3
                      className={cn(
                        "mt-4 font-display text-d4 transition-colors duration-500",
                        on ? "text-white" : "text-ink-200",
                      )}
                    >
                      {stage.title}
                    </h3>

                    <p className="measure mt-5 text-lead text-ink-200">{stage.body}</p>

                    {stage.detail ? (
                      <p className="label-mono mt-6 leading-relaxed text-ink-200">
                        {stage.detail}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
