/**
 * Hero backdrop for the downloads page.
 *
 * A ruled ledger sheet rather than a figure: twelve hairline columns aligned to
 * the editorial grid, a calibration graticule and a margin of tick marks — the
 * page is a document register, and the backdrop should already say so before a
 * single record is read.
 */
export function RegisterVisual() {
  return (
    <div className="absolute inset-0">
      <div
        className="graticule absolute inset-0 opacity-70"
        style={
          {
            "--graticule-color": "rgba(255,255,255,0.035)",
            "--graticule-size": "4.5rem",
          } as React.CSSProperties
        }
      />

      {/* Ledger columns, locked to the same 12-column grid the copy sits on. */}
      <div className="absolute inset-0">
        <div className="shell h-full">
          <div className="egrid h-full">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="col-span-1 h-full border-l border-white/[0.055] last:border-r last:border-r-white/[0.055]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Margin ticks — the ruled edge of a register page. */}
      <div className="absolute inset-y-0 right-[calc(var(--shell-pad)/2)] hidden flex-col justify-center gap-5 lg:flex">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className="block h-px bg-white/20"
            style={{ width: i % 5 === 0 ? "2.25rem" : "1.125rem" }}
          />
        ))}
      </div>

      <div
        className="absolute -right-40 top-[-12rem] h-[38rem] w-[38rem] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-ink-500) 48%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklab, var(--color-deep) 88%, transparent), transparent)",
        }}
      />
    </div>
  );
}
