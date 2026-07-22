import { formatCount } from "@/lib/utils";

/**
 * A recorded figure. Rendered static and server-side: a laboratory reports its
 * numbers, it does not perform them. The name is kept so call sites read the
 * same as when the value animated.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Accepted for call-site compatibility; no longer used. */
  duration?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      {prefix}
      <span className="tabular-nums">{formatCount(value, decimals)}</span>
      {suffix}
    </span>
  );
}
