import { disciplines } from "@/content/disciplines";
import { methodCount } from "./variation";

/**
 * The index hero backdrop: one column per division, each drawn to
 * the number of methods that division actually lists.
 *
 * It is decorative — the same counts are stated in type further down the page —
 * but it is drawn from the data rather than invented, so the silhouette of the
 * laboratory is honest.
 */
export function RegisterHeroField() {
  const bars = disciplines.map((discipline) => ({
    key: discipline.slug,
    value: methodCount(discipline),
  }));
  const max = Math.max(...bars.map((bar) => bar.value));

  return (
    <div aria-hidden className="absolute inset-0">
      <div
        className="graticule absolute inset-0 opacity-40"
        style={
          {
            "--graticule-color": "color-mix(in oklab, var(--color-ink-900) 2.5%, transparent)",
            "--graticule-size": "5rem",
          } as React.CSSProperties
        }
      />

      <svg
        viewBox="0 0 1200 640"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        // `slice` scales the 1200-wide artboard to cover a narrow phone, so the
        // column geometry extends well past the viewport. It is clipped
        // visually, but the bare <svg> still reports that width to the
        // document's scrollWidth; overflow-hidden keeps the measurement honest.
        className="absolute inset-0 h-full w-full overflow-hidden"
      >
        <defs>
          <linearGradient id="rf-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-meniscus-500)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--color-meniscus-500)" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {bars.map((bar, i) => {
          const h = Number((70 + (bar.value / max) * 400).toFixed(1));
          const x = 466 + i * 54;
          return (
            <g key={bar.key}>
              <rect x={x} y={600 - h} width="26" height={h} fill="url(#rf-bar)" />
              <line
                x1={x}
                y1={600 - h}
                x2={x + 26}
                y2={600 - h}
                stroke="var(--color-meniscus-500)"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
              <line
                x1={x}
                y1="600"
                x2={x}
                y2={i % 4 === 0 ? 622 : 612}
                stroke="rgba(8,21,43,0.18)"
                strokeWidth="1"
              />
            </g>
          );
        })}

        <line
          x1="430"
          y1="600"
          x2="1200"
          y2="600"
          stroke="rgba(8,21,43,0.26)"
          strokeWidth="1"
        />
        <line
          x1="430"
          y1="120"
          x2="1200"
          y2="120"
          stroke="rgba(8,21,43,0.08)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-canvas)_30%,transparent_92%)]" />
    </div>
  );
}
