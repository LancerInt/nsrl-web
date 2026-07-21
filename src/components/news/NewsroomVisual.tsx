/**
 * Hero backdrop for the newsroom index.
 *
 * Where the downloads register is ruled vertically like a ledger, the newsroom
 * is ruled horizontally like a manuscript sheet — same hairline vocabulary,
 * rotated ninety degrees, so the two pages read as siblings and not as copies.
 */
export function NewsroomVisual() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-y-0 right-0 w-full lg:w-[62%]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--rule) 0px, var(--rule) 1px, transparent 1px, transparent 2.5rem)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 22%, black 74%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 22%, black 74%, transparent)",
        }}
      />

      {/* The single vertical rule — a margin line down the sheet. */}
      <div className="absolute inset-y-0 right-[38%] hidden w-px bg-signal-500/25 lg:block" />

      <div
        className="absolute -left-32 top-1/4 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-meniscus-200) 55%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}
