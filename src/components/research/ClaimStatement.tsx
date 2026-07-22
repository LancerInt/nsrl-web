import { cn } from "@/lib/utils";
import type { Discipline } from "@/content/disciplines";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { claimSizeClass, type ClaimAlign } from "./variation";

/**
 * The division's headline claim, set full-bleed as a typographic statement.
 *
 * Three compositions — left, split and right — chosen by the division index, so
 * the band lands differently on consecutive pages while the type scale, the
 * rules and the colour stay identical.
 */
export function ClaimStatement({
  claim,
  align,
  index,
}: {
  claim: Discipline["claim"];
  align: ClaimAlign;
  index: string;
}) {
  const size = claimSizeClass(claim.value);

  const value = (
    <span className={cn("block font-display text-ink-950", size)}>
      {claim.value}
      {claim.unit ? (
        <span className="ml-4 align-baseline font-display text-h1 font-medium tracking-[-0.02em] text-ink-800">
          {claim.unit}
        </span>
      ) : null}
    </span>
  );

  const caption = (
    <p className="measure-tight text-lead text-neutral-600">{claim.caption}</p>
  );

  return (
    <section
      aria-labelledby="claim"
      className="relative isolate overflow-hidden bg-canvas-sunken text-ink-950"
    >
      <div
        aria-hidden
        className="graticule pointer-events-none absolute inset-0 opacity-40"
        style={
          {
            "--graticule-color": "color-mix(in oklab, var(--color-ink-900) 2.5%, transparent)",
            "--graticule-size": "4rem",
          } as React.CSSProperties
        }
      />
      <div className="shell relative py-[var(--section-y)]">
        {align === "split" ? (
          <div className="egrid items-end gap-y-7">
            <div className="col-span-12 lg:col-span-7">
              <Eyebrow index={index}>
                The headline
              </Eyebrow>
              <h2 id="claim" className="mt-7">
                <RevealText as="span" className="block">
                  {value}
                </RevealText>
              </h2>
            </div>
            <div className="col-span-12 border-t border-[var(--rule)] pt-8 lg:col-span-4 lg:col-start-9">
              {caption}
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "max-w-[46rem]",
              align === "right" && "ml-auto text-right",
            )}
          >
            <Eyebrow
              index={index}
              className={align === "right" ? "justify-end" : undefined}
            >
              The headline
            </Eyebrow>

            <h2 id="claim" className="mt-7">
              <RevealText as="span" className="block">
                {value}
              </RevealText>
            </h2>

            <div
              className={cn(
                "mt-7 border-t border-[var(--rule)] pt-8",
                align === "right" && "ml-auto",
              )}
            >
              {caption}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
