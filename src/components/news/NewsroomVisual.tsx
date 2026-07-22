/**
 * Hero backdrop for the newsroom index: a soft, off-centre wash in the brand
 * blues that gives the title page depth without drawing a single rule.
 */
export function NewsroomVisual() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        className="absolute -right-[10%] -top-[30%] h-[42rem] w-[42rem] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-meniscus-200) 55%, transparent), transparent)",
        }}
      />
    </div>
  );
}
