import { cn } from "@/lib/utils";

/**
 * The section label. A small monospace tag with a short accent tick — quiet
 * orientation, no rule and no section counter (the running 01/02/03 numbering
 * read as templated). `index` is still accepted so call sites need not change.
 */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  /** Accepted for call-site compatibility; no longer rendered. */
  index?: string;
  tone?: "light" | "deep";
  className?: string;
}) {
  const deep = tone === "deep";

  return (
    <p
      className={cn(
        "label-mono flex items-center gap-3",
        deep ? "text-white/70" : "text-ink-700",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          deep ? "bg-meniscus-400" : "bg-meniscus-500",
        )}
      />
      <span>{children}</span>
    </p>
  );
}
