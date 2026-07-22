/**
 * Hero backdrop for the facilities page: a soft brand wash. The estate's real
 * structure is walked through in the units below, not sketched in lines here.
 */
export function SitePlanField() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="absolute -right-[8%] -top-[26%] h-[42rem] w-[42rem] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-meniscus-200) 52%, transparent), transparent)",
        }}
      />
    </div>
  );
}
