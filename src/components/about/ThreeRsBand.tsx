import { threeRs } from "@/content/organisation";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The 3Rs, extended with rehabilitation — a plain four-column ruled list.
 * The fourth column carries a stronger rule and a mono tag because it is the
 * one commitment that goes past the standard framework.
 */
export function ThreeRsBand() {
  return (
    <section
      className="relative isolate overflow-hidden bg-canvas-sunken py-[var(--section-y)] text-ink-950"
    >
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-40"
        style={
          {
            "--graticule-color": "color-mix(in oklab, var(--color-ink-900) 2.5%, transparent)",
            "--graticule-size": "7rem",
          } as React.CSSProperties
        }
      />
      <div className="shell relative">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="04">
              Animal welfare
            </Eyebrow>
            <RevealText as="h2" className="mt-6 font-display text-d3 text-ink-950">
              Three Rs. And a fourth.
            </RevealText>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-small text-neutral-600">
              Welfare is treated as a data-quality question, not a compliance
              overlay. A stressed animal is a poor model — the programme exists
              because the science depends on it.
            </p>
            <ActionLink
              href="/research/vivarium"
              variant="text"
              className="mt-5"
            >
              Inside the vivarium
            </ActionLink>
          </div>
        </div>

        <ol className="mt-6 grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {threeRs.map((item, i) => {
            const extended = i === threeRs.length - 1;
            return (
              <li
                key={item.word}
                className={`border-t pt-5 ${
                  extended ? "border-ink-900/45" : "border-[var(--rule)]"
                }`}
              >
                <span className="label-mono text-neutral-550">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-h2 text-ink-950">{item.word}</h3>
                <p className="mt-2 text-small text-neutral-600">{item.body}</p>

                {extended ? (
                  <p className="label-mono mt-4 text-signal-700">Beyond the three · CPCSEA</p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
