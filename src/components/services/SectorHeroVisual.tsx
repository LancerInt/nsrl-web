/**
 * Backdrop for a sector hero: graticule, an ink wash pushed off the right edge
 * and a hairline horizon. No plate — the plate lives in the hero aside, so the
 * two never compete for the same corner.
 */
export function SectorHeroVisual() {
  return (
    <>
      <div
        className="graticule absolute inset-0 opacity-40"
        style={
          {
            "--graticule-color": "color-mix(in oklab, var(--color-ink-900) 2.5%, transparent)",
            "--graticule-size": "5.5rem",
          } as React.CSSProperties
        }
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--rule-invert)]" />
    </>
  );
}
