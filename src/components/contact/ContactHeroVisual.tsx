/**
 * Hero backdrop for /contact: a drawn coordinate frame.
 *
 * The page opens light — most interior pages open deep — so the artwork is a
 * fine graticule with a single sighting reticle rather than the dense field the
 * darker heroes carry. Purely geometric: it locates nothing real.
 */
export function ContactHeroVisual() {
  return (
    <>
      <div
        className="graticule absolute inset-0 opacity-90"
        style={{ "--graticule-size": "4rem" } as React.CSSProperties}
      />

      <svg
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden
        className="absolute -right-[10%] top-[6%] h-[min(46rem,90vw)] w-[min(46rem,90vw)] text-ink-400/45"
      >
        <g stroke="currentColor" strokeWidth="0.7">
          <circle cx="210" cy="190" r="164" opacity="0.35" />
          <circle cx="210" cy="190" r="112" opacity="0.5" />
          <circle cx="210" cy="190" r="60" opacity="0.7" />
          <line x1="210" y1="0" x2="210" y2="400" opacity="0.3" />
          <line x1="0" y1="190" x2="400" y2="190" opacity="0.3" />
        </g>

        {/* Bearing ticks around the outer ring. */}
        <g stroke="currentColor" strokeWidth="1">
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const inner = i % 6 === 0 ? 150 : 158;
            return (
              <line
                key={i}
                x1={210 + Math.cos(angle) * inner}
                y1={190 + Math.sin(angle) * inner}
                x2={210 + Math.cos(angle) * 164}
                y2={190 + Math.sin(angle) * 164}
                opacity={i % 6 === 0 ? 0.7 : 0.35}
              />
            );
          })}
        </g>

        <circle cx="210" cy="190" r="5" className="fill-meniscus-500" />
        <circle
          cx="210"
          cy="190"
          r="18"
          stroke="var(--color-meniscus-500)"
          strokeWidth="0.9"
          opacity="0.55"
        />
      </svg>

      {/* Keeps the display type clear of the reticle. */}
      <div className="absolute inset-0 bg-[linear-gradient(96deg,var(--color-canvas)_34%,transparent_86%)]" />
    </>
  );
}
