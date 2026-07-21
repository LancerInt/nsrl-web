import { cn } from "@/lib/utils";

/**
 * A drawn locator panel: graticule, approach lines and a sighting reticle.
 *
 * Deliberately not an embedded map. A third-party map costs a script, a set of
 * cookies and a request to another company on every page view, and buys nothing
 * a linked address does not — the address text beside this figure opens the
 * visitor's own map application instead. The geometry here is abstract: it is a
 * plate in the same family as the rest of the site's figures, not a survey.
 */
export function MapPlate({
  seed = 0,
  className,
  tone = "deep",
}: {
  seed?: number;
  className?: string;
  tone?: "light" | "deep";
}) {
  const deep = tone === "deep";
  const line = deep ? "rgba(255,255,255,0.16)" : "rgba(8,21,43,0.12)";
  const strong = deep ? "rgba(255,255,255,0.34)" : "rgba(8,21,43,0.3)";
  const accent = "var(--color-signal-500)";

  // Deterministic: the same unit always draws the same plate.
  const cx = 150 + ((seed * 47) % 5) * 22;
  const cy = 120 + ((seed * 29) % 4) * 18;

  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      aria-hidden
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect
        width="400"
        height="300"
        fill={deep ? "var(--color-deep-sunken)" : "var(--color-canvas-sunken)"}
      />

      {/* Fine graticule */}
      <g stroke={line} strokeWidth="0.5">
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 25} y1="0" x2={(i + 1) * 25} y2="300" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 25} x2="400" y2={(i + 1) * 25} />
        ))}
      </g>

      {/* Approach lines */}
      <g stroke={strong} strokeWidth="1.1" strokeLinecap="square">
        <polyline points={`0,${cy + 66} ${cx - 78},${cy + 66} ${cx - 78},${cy - 12} 400,${cy - 12}`} />
        <polyline
          points={`${cx + 96},300 ${cx + 96},${cy + 34} ${cx - 20},${cy + 34} ${cx - 20},0`}
          opacity="0.55"
        />
      </g>

      {/* Sighting reticle */}
      <g>
        <circle cx={cx} cy={cy} r="34" stroke={accent} strokeWidth="0.9" opacity="0.45" />
        <circle cx={cx} cy={cy} r="18" stroke={accent} strokeWidth="1.1" opacity="0.8" />
        <circle cx={cx} cy={cy} r="4.5" fill={accent} />
        <line x1={cx - 52} y1={cy} x2={cx - 40} y2={cy} stroke={accent} strokeWidth="1.1" />
        <line x1={cx + 40} y1={cy} x2={cx + 52} y2={cy} stroke={accent} strokeWidth="1.1" />
        <line x1={cx} y1={cy - 52} x2={cx} y2={cy - 40} stroke={accent} strokeWidth="1.1" />
        <line x1={cx} y1={cy + 40} x2={cx} y2={cy + 52} stroke={accent} strokeWidth="1.1" />
      </g>

      {/* Corner registration marks */}
      <g stroke={strong} strokeWidth="1.2">
        <path d="M 14 30 L 14 14 L 30 14" />
        <path d="M 370 14 L 386 14 L 386 30" />
        <path d="M 386 270 L 386 286 L 370 286" />
        <path d="M 30 286 L 14 286 L 14 270" />
      </g>
    </svg>
  );
}
