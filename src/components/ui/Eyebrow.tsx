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
        "label-mono flex items-center gap-2.5",
        /* A defined token, not `white/70`. A percentage of white resolves
           against whatever the band happens to be, so the same label was
           5.1:1 on one dark surface and less on the next; `ink-100` is
           7.3:1 on every one of them. */
        deep ? "text-ink-100" : "text-ink-700",
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
