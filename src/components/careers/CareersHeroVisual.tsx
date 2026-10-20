import { cn, pad } from "@/lib/utils";
import { departmentGroups, departments } from "@/content/careers";

/**
 * Hero backdrop for /careers: a calibration scale with one tick per department.
 *
 * The long ticks fall exactly on the four group boundaries, so the artwork is a
 * drawing of the page's own content rather than decoration applied on top of it.
 */
export function CareersHeroVisual() {
  const boundaries = new Set<number>();
  let cursor = 0;
  for (const group of departmentGroups) {
    boundaries.add(cursor);
    cursor += group.items.length;
  }

  return (
    <>
      <div
        className="graticule absolute inset-0 opacity-40"
        style={
          {
            "--graticule-color": "color-mix(in oklab, var(--color-ink-900) 2.5%, transparent)",
            "--graticule-size": "6rem",
          } as React.CSSProperties
        }
      />

      {/* Department scale */}
      <div className="absolute inset-y-0 right-[var(--shell-pad)] hidden items-center xl:flex">
        <div className="flex items-stretch gap-4">
          <div className="flex flex-col justify-center gap-[0.85rem]">
            {departments.map((department, i) => {
              const major = boundaries.has(i);
              return (
                <span key={department} className="flex items-center justify-end gap-3">
                  {major ? (
                    <span className="label-mono tabular-nums text-ink-200">{pad(i + 1)}</span>
                  ) : null}
                  <span
                    className={cn(
                      "block h-px",
                      major ? "w-24 bg-ink-900/70" : "w-12 bg-white/18",
                    )}
                  />
                </span>
              );
            })}
          </div>
          <span className="w-px bg-white/12" />
        </div>
      </div>

      {/* Keeps the display type off the artwork. */}
      <div className="absolute inset-0 bg-[linear-gradient(96deg,var(--color-canvas)_38%,transparent_88%)]" />
    </>
  );
}
