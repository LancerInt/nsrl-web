/**
 * Hero backdrop for the facilities page: a surveyor's site plan rather than the
 * orbital field used on the homepage.
 *
 * Three plotted blocks joined by a dashed traverse, drawn without a single word
 * so it stays decorative — the estate's real names and addresses belong in the
 * document, not in an SVG a screen reader cannot navigate.
 */
export function SitePlanField() {
  return (
    <div className="absolute inset-0">
      <div
        className="graticule absolute inset-0 opacity-80"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.035)",
            "--graticule-size": "4.5rem",
          } as React.CSSProperties
        }
      />

      <svg
        viewBox="0 0 1200 700"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="fac-plan-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-signal-400)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-signal-400)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="880" cy="300" r="300" fill="url(#fac-plan-glow)" />

        {/* Traverse between the three plotted units. */}
        <path
          d="M 604 512 L 742 268 L 1046 214"
          stroke="var(--color-signal-400)"
          strokeWidth="1.1"
          strokeDasharray="7 9"
          opacity="0.55"
        />

        {/* Plot blocks. */}
        <g stroke="white" strokeWidth="1.1" opacity="0.24">
          <rect x="512" y="450" width="184" height="124" rx="6" />
          <rect x="660" y="196" width="240" height="150" rx="6" />
          <rect x="700" y="222" width="240" height="150" rx="6" opacity="0.55" />
          <rect x="968" y="150" width="156" height="112" rx="6" />
        </g>

        {/* Registration ticks at each plot origin. */}
        <g stroke="var(--color-signal-400)" strokeWidth="1.4" opacity="0.9">
          <path d="M 604 500 v 24 M 592 512 h 24" />
          <path d="M 742 256 v 24 M 730 268 h 24" />
          <path d="M 1046 202 v 24 M 1034 214 h 24" />
        </g>

        {/* Survey scale bar. */}
        <g stroke="white" opacity="0.3" strokeWidth="1">
          <path d="M 512 634 h 300" />
          {Array.from({ length: 7 }, (_, i) => (
            <path key={i} d={`M ${512 + i * 50} 634 v ${i % 2 === 0 ? -12 : -7}`} />
          ))}
        </g>

        {/* Long section lines running off the plate. */}
        <g stroke="white" opacity="0.1" strokeWidth="1">
          <path d="M 0 574 H 1200" />
          <path d="M 0 122 H 1200" />
        </g>
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(102deg,var(--color-deep)_22%,transparent_86%)]" />
    </div>
  );
}
