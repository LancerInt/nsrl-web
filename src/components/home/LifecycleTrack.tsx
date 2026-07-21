import { studyLifecycle } from "@/content/organisation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The seven stages a study passes through, drawn as a calibrated track.
 *
 * A process timeline rather than a company history: the source material carries
 * no founding dates, and a fabricated one would undermine the very credibility
 * the section exists to build.
 */
export function LifecycleTrack() {
  return (
    <section
      data-theme="deep"
      className="relative isolate overflow-hidden bg-deep-raised py-[var(--section-y)] text-ink-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[30rem] w-[30rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-ink-400) 40%, transparent), transparent 70%)",
        }}
      />

      <div className="shell relative">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="05" tone="deep">
              How a study runs
            </Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
              Seven stages. One unbroken record.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-ink-200">
              From the first scoping conversation to the tenth year of archival, every stage is
              documented, audited and traceable back to the instrument that produced the number.
            </p>
            <ActionLink href="/about#quality-system" variant="text" tone="deep" className="mt-5">
              The quality system
            </ActionLink>
          </div>
        </div>

        {/* Calibrated track */}
        <ol className="mt-20 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {studyLifecycle.map((stage, i) => (
            <li
              key={stage.index}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}
              className="group relative"
            >
              {/* Tick + rule */}
              <div className="relative mb-7 h-px w-full bg-white/15">
                <span className="absolute -top-1.5 left-0 h-3.5 w-px bg-signal-400" />
                <span className="absolute -top-[3px] left-0 h-[7px] w-[7px] -translate-x-[3px] rounded-full bg-signal-400 transition-transform duration-500 group-hover:scale-150" />
              </div>

              <p className="label-mono text-signal-400">{stage.index}</p>
              {/*
                Seven tracks across at xl leave roughly 170px per stage, which a
                single long word like "Characterise" cannot hold at text-h1. The
                heading steps down one rung of the scale where the track narrows,
                and hyphenation is the backstop for any title longer still — so a
                stage title can never spill into its neighbour's column.
              */}
              <h3 className="mt-4 font-display text-h1 hyphens-auto break-words text-white xl:text-h2">
                {stage.title}
              </h3>
              <p className="mt-4 text-small text-ink-200">{stage.body}</p>
              {stage.detail ? (
                <p className="label-mono mt-5 leading-relaxed text-ink-200">{stage.detail}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
