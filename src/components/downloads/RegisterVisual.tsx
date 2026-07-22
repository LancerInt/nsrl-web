/**
 * Hero backdrop for the downloads page: a soft brand wash. The register's
 * structure lives in the records below, not in ruled lines behind the title.
 */
export function RegisterVisual() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="absolute -right-[6%] -top-[24%] h-[40rem] w-[40rem] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-meniscus-200) 50%, transparent), transparent)",
        }}
      />
    </div>
  );
}
