"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A two-part cursor: a precise dot that tracks exactly, and a lagging ring that
 * gives the motion weight. The ring expands and labels itself over anything
 * carrying `data-cursor`.
 *
 * Hidden entirely on coarse pointers (see globals.css) and never used to convey
 * information that isn't also in the DOM.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "hover" | "hidden">("hidden");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      const dot = dotRef.current;
      if (dot) {
        dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }

      setState((current) => (current === "hidden" ? "idle" : current));
    };

    const onOver = (event: PointerEvent) => {
      const el = (event.target as HTMLElement | null)?.closest?.(
        "[data-cursor], a, button",
      ) as HTMLElement | null;

      if (!el) {
        setState("idle");
        setLabel(null);
        return;
      }

      setState("hover");
      setLabel(el.dataset.cursor && el.dataset.cursor !== "true" ? el.dataset.cursor : null);
    };

    const onLeave = () => setState("hidden");

    const tick = () => {
      // Critically-damped follow: the ring never overshoots the dot.
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;

      const el = ringRef.current;
      if (el) {
        el.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div data-cursor-root aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <div
        ref={ringRef}
        className={[
          "fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color,opacity] duration-500",
          "border-ink-900/25 [transition-timing-function:var(--ease-out-expo)]",
          state === "hidden" ? "opacity-0" : "opacity-100",
          state === "hover"
            ? "h-20 w-20 border-signal-500/60 bg-signal-500/10 backdrop-blur-[2px]"
            : "h-9 w-9 bg-transparent",
        ].join(" ")}
      >
        {label ? (
          <span className="label-mono whitespace-nowrap text-[9px] text-ink-900">
            {label}
          </span>
        ) : null}
      </div>

      <div
        ref={dotRef}
        className={[
          "fixed left-0 top-0 h-[5px] w-[5px] rounded-full bg-signal-500 transition-opacity duration-300",
          state === "hidden" || state === "hover" ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
    </div>
  );
}
