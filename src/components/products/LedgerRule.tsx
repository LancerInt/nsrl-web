/**
 * Hero backdrop for the study packages page: a ruled schedule sheet.
 *
 * The facilities page opens on a site plan; this one opens on the document that
 * plan produces — column rules, a margin line and a run of row ticks, drawn in
 * ink at the weight of a printed form.
 */
export function LedgerRule() {
  return (
    <div className="absolute inset-0">
      <svg
        viewBox="0 0 1200 700"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="prod-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-ink-900)" stopOpacity="0" />
            <stop offset="55%" stopColor="var(--color-ink-900)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--color-ink-900)" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="prod-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-meniscus-300)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-meniscus-300)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="1010" cy="220" r="330" fill="url(#prod-glow)" />

        {/* Column rules — the schedule's fields. */}
        <g stroke="url(#prod-fade)" strokeWidth="1">
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M ${640 + i * 96} 0 V 700`} />
          ))}
        </g>

        {/* Row ticks in the right margin. */}
        <g stroke="var(--color-ink-900)" strokeWidth="1" opacity="0.16">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={`M ${1148 - (i % 3) * 16} ${96 + i * 44} h ${(i % 3) * 16 + 14}`} />
          ))}
        </g>

        {/* Margin line and its six entry marks. */}
        <path d="M 604 0 V 700" stroke="var(--color-signal-500)" strokeWidth="1.2" opacity="0.45" />
        <g fill="var(--color-signal-500)" opacity="0.75">
          {Array.from({ length: 6 }, (_, i) => (
            <circle key={i} cx="604" cy={126 + i * 88} r={i % 3 === 0 ? 5 : 3} />
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(96deg,var(--color-canvas)_30%,transparent_92%)]" />
    </div>
  );
}
