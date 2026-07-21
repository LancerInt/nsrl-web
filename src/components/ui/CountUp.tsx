"use client";

import { useEffect, useRef, useState } from "react";

import { formatCount } from "@/lib/utils";

/**
 * Counts to `value` once, when it first enters the viewport.
 *
 * The final value is rendered on the server so the number is present for
 * crawlers and for anyone whose JavaScript never arrives.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1900,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  // A ref, not state: starting the animation must not re-run (and therefore
  // tear down) the very effect that is running it.
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Owned by the effect, so the effect's own cleanup can cancel it. Returning
    // a cleanup from the observer callback would simply discard it, and the
    // frame chain would keep calling setDisplay after unmount.
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        started.current = true;

        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };

        setDisplay(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span className="tabular-nums">{formatCount(display, decimals)}</span>
      {suffix}
    </span>
  );
}
