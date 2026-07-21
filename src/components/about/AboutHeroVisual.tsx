import { OrbitalField } from "@/components/visuals/OrbitalField";

/**
 * Hero backdrop for the About page.
 *
 * The homepage hangs the orbital field to the right of the type; here it is
 * pushed low and left, cropped by the section edge, so the same motif produces a
 * different picture rather than a repeat of the opening screen.
 */
export function AboutHeroVisual() {
  return (
    <>
      <div className="absolute inset-0 opacity-[0.55]">
        <div className="absolute -bottom-[38%] left-1/2 h-[min(120vh,120vw)] w-[min(120vh,120vw)] -translate-x-1/2 lg:left-[16%] lg:-bottom-[46%]">
          <OrbitalField intensity={0.75} />
        </div>
      </div>

      <div
        className="graticule absolute inset-0 opacity-70"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.035)",
            "--graticule-size": "6rem",
          } as React.CSSProperties
        }
      />

      {/* Keeps the display type legible where it crosses the field. */}
      <div className="absolute inset-0 bg-[linear-gradient(255deg,var(--color-deep)_16%,transparent_82%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--color-deep),transparent)]" />
    </>
  );
}
