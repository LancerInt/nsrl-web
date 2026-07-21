/**
 * Backdrop for a sector hero: graticule, an ink wash pushed off the right edge
 * and a hairline horizon. No plate — the plate lives in the hero aside, so the
 * two never compete for the same corner.
 */
export function SectorHeroVisual() {
  return (
    <>
      <div
        className="graticule absolute inset-0 opacity-70"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.032)",
            "--graticule-size": "5.5rem",
          } as React.CSSProperties
        }
      />
      <div
        className="absolute -right-[10%] top-[-30%] h-[44rem] w-[44rem] rounded-full opacity-45 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-ink-400) 55%, transparent), transparent 68%)",
        }}
      />
      <div
        className="absolute -left-[14%] bottom-[-24%] h-[26rem] w-[26rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-signal-700) 60%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--rule-invert)]" />
    </>
  );
}
