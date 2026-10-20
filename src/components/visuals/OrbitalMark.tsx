import { cn } from "@/lib/utils";

/**
 * The identity reduced to its geometry: two crossed orbitals and the electrons
 * that ride them. Taken directly from the NSRL mark so the motif carries the
 * brand without ever reproducing the logo at decorative sizes.
 */
export function OrbitalMark({
  className,
  strokeWidth = 1.5,
}: {
  className?: string;
  /** Accepted for call-site compatibility; the mark no longer rotates. */
  animate?: boolean;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
      className={cn("overflow-visible", className)}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth}>
        <ellipse cx="60" cy="60" rx="26" ry="52" transform="rotate(-32 60 60)" opacity="0.75" />
        <ellipse cx="60" cy="60" rx="26" ry="52" transform="rotate(32 60 60)" opacity="0.45" />
      </g>

      <circle cx="60" cy="60" r="9" fill="currentColor" opacity="0.14" />
      <circle cx="60" cy="60" r="3.5" fill="currentColor" />

      <g fill="currentColor">
        <circle cx="60" cy="8" r="3.2" opacity="0.9" />
        <circle cx="60" cy="112" r="2.4" opacity="0.55" />
        <circle cx="14" cy="42" r="2.2" opacity="0.4" />
        <circle cx="106" cy="78" r="2.6" opacity="0.65" />
      </g>
    </svg>
  );
}
