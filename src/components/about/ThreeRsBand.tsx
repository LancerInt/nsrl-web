import { threeRs } from "@/content/organisation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/** A wave of offsets, so the four columns never read as a card grid. */
const offset = ["lg:mt-0", "lg:mt-16", "lg:mt-7", "lg:mt-24"];

/**
 * The 3Rs, extended with rehabilitation.
 *
 * Four outlined display letters carry the band; the fourth is filled in signal
 * green because it is the one that goes past the standard framework. The letters
 * are decorative duplicates of the words beneath them, so they are hidden from
 * assistive technology rather than read out four times as "R".
 */
export function ThreeRsBand() {
  return (
    <section
      data-theme="deep"
      className="relative isolate overflow-hidden bg-deep py-[var(--section-y)] text-ink-50"
    >
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-70"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.035)",
            "--graticule-size": "7rem",
          } as React.CSSProperties
        }
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-signal-500) 22%, transparent), transparent 70%)",
        }}
      />

      <div className="shell relative">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="04" tone="deep">
              Animal welfare
            </Eyebrow>
            <RevealText as="h2" className="mt-8 font-display text-d3 text-white">
              Three Rs. And a fourth.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-ink-200">
              Welfare is treated as a data-quality question, not a compliance
              overlay. A stressed animal is a poor model — the programme exists
              because the science depends on it.
            </p>
            <ActionLink
              href="/research/vivarium"
              variant="text"
              tone="deep"
              className="mt-5"
            >
              Inside the vivarium
            </ActionLink>
          </div>
        </div>

        <ol className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {threeRs.map((item, i) => {
            const extended = i === threeRs.length - 1;
            return (
              <li
                key={item.word}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.09}s` } as React.CSSProperties}
                className={`relative border-t pt-8 ${offset[i]} ${
                  extended ? "border-signal-400/60" : "border-white/15"
                }`}
              >
                <span
                  aria-hidden
                  className="block select-none font-display text-[clamp(6rem,12vw,11rem)] font-bold leading-[0.78] tracking-[-0.06em]"
                  style={
                    extended
                      ? { color: "var(--color-signal-400)" }
                      : {
                          color: "transparent",
                          WebkitTextStroke: "1px var(--color-ink-300)",
                        }
                  }
                >
                  {item.letter}
                </span>

                <h3 className="mt-6 font-display text-h1 text-white">{item.word}</h3>
                <p className="mt-4 text-small text-ink-200">{item.body}</p>

                {extended ? (
                  <p className="label-mono mt-6 text-signal-400">
                    Beyond the three · CPCSEA
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
