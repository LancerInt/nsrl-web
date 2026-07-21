import { cn } from "@/lib/utils";

/**
 * The recurring calibration label. A monospace tag preceded by a tick mark —
 * the detail that ties the whole site to the instrument metaphor.
 */
export function Eyebrow({
  children,
  index,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  /** Optional section number, rendered before the label. */
  index?: string;
  tone?: "light" | "deep";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "label-mono flex items-center gap-3",
        tone === "deep" ? "text-ink-200" : "text-ink-600",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block h-px w-8 shrink-0",
          tone === "deep" ? "bg-signal-400" : "bg-signal-500",
        )}
      />
      {index ? (
        <span className={tone === "deep" ? "text-ink-300" : "text-neutral-550"}>
          {index}
        </span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
