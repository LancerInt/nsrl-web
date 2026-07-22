import { cn } from "@/lib/utils";

/**
 * The specification list: a numbered, ruled column used wherever the content is
 * an enumeration of tests, guidelines or species.
 *
 * It is deliberately not a card grid. These are catalogues, and a catalogue
 * reads better as a ruled list than as a field of boxes.
 */
export function SpecList({
  items,
  columns = 1,
  numbered = true,
  tone = "light",
  className,
}: {
  items: string[];
  columns?: 1 | 2 | 3;
  numbered?: boolean;
  tone?: "light" | "deep";
  className?: string;
}) {
  const deep = tone === "deep";

  return (
    <ul
      className={cn(
        "grid gap-x-[clamp(1.5rem,3vw,3.5rem)]",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, i) => (
        <li
          key={item}
          className={cn(
            "group flex items-baseline gap-4 border-t py-3.5 transition-colors duration-400",
            deep
              ? "border-white/10 text-ink-100 hover:border-ink-900/40"
              : "border-ink-900/10 text-ink-800 hover:border-ink-900/60/50",
          )}
        >
          {numbered ? (
            <span
              className={cn(
                "label-mono shrink-0 pt-1 tabular-nums transition-colors duration-400",
                deep
                  ? "text-ink-300 group-hover:text-ink-700"
                  : "text-neutral-550 group-hover:text-ink-700",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : (
            <span
              aria-hidden
              className={cn(
                "mt-2.5 h-1 w-1 shrink-0 rounded-full transition-colors duration-400",
                deep
                  ? "bg-ink-300/50 group-hover:bg-signal-300"
                  : "bg-neutral-400 group-hover:bg-signal-600",
              )}
            />
          )}
          <span className="text-small">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Compact chip row for guideline numbers, frameworks and standards. */
export function SpecChips({
  items,
  tone = "light",
  className,
}: {
  items: string[];
  tone?: "light" | "deep";
  className?: string;
}) {
  const deep = tone === "deep";
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "label-mono rounded-full border px-3.5 py-2 transition-colors duration-400",
            deep
              ? "border-white/18 text-ink-100 hover:border-signal-400 hover:text-white"
              : "border-ink-900/14 text-ink-700 hover:border-ink-900/60 hover:text-ink-950",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
