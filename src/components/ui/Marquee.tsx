import { cn } from "@/lib/utils";

/**
 * Seamless ticker. The children are rendered twice and the track translates by
 * exactly -50%, so the loop has no visible seam at any speed.
 *
 * Marked `aria-hidden` on the duplicate half only — the first pass stays in the
 * accessibility tree so the content is still announced once.
 */
export function Marquee({
  children,
  speed = 42,
  reverse = false,
  className,
  fade = true,
  tone = "light",
}: {
  children: React.ReactNode;
  /** Seconds for one full cycle. Longer is calmer. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  fade?: boolean;
  tone?: "light" | "deep";
}) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }
          : undefined
      }
      data-tone={tone}
    >
      <div
        className={cn(
          "flex w-max motion-safe:animate-[marquee_var(--marquee-speed)_linear_infinite] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
          "hover:[animation-play-state:paused]",
        )}
        style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
