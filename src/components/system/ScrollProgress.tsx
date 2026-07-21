"use client";

import { useEffect, useRef } from "react";

/**
 * Reading progress. A single hairline at the top of the viewport, scaled on the
 * compositor rather than re-laid out.
 *
 * Purely decorative — `aria-hidden`, because the same information is already
 * available from the scrollbar.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      el.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[99] h-[2px]">
      <div
        ref={ref}
        className="h-full origin-left bg-gradient-to-r from-ink-500 via-ink-400 to-signal-500"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
