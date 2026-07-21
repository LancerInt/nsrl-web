"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Hero backdrop: nested orbitals that drift with the pointer.
 *
 * Rendered as one SVG with transforms applied on rAF rather than per-element
 * React state — the whole field costs a single compositor layer.
 */
export function OrbitalField({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      const layers = rootRef.current?.querySelectorAll<SVGGElement>("[data-depth]");
      layers?.forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 1) * intensity;
        layer.style.transform = `translate3d(${current.x * depth * 22}px, ${
          current.y * depth * 22
        }px, 0)`;
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [intensity]);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 1000 1000"
      fill="none"
      aria-hidden
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="of-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-signal-400)" stopOpacity="0.28" />
          <stop offset="55%" stopColor="var(--color-ink-400)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="of-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-ink-300)" />
          <stop offset="55%" stopColor="var(--color-ink-400)" />
          <stop offset="100%" stopColor="var(--color-signal-400)" />
        </linearGradient>
      </defs>

      <circle cx="500" cy="500" r="420" fill="url(#of-core)" />

      <g data-depth="0.35" style={{ willChange: "transform" }}>
        <g
          stroke="url(#of-ring)"
          strokeWidth="1"
          opacity="0.5"
          className="origin-center motion-safe:animate-[orbit_120s_linear_infinite]"
          style={{ transformOrigin: "500px 500px" }}
        >
          <ellipse cx="500" cy="500" rx="180" ry="400" transform="rotate(-30 500 500)" />
          <ellipse cx="500" cy="500" rx="180" ry="400" transform="rotate(30 500 500)" />
          <ellipse cx="500" cy="500" rx="400" ry="180" />
        </g>
      </g>

      <g data-depth="0.7" style={{ willChange: "transform" }}>
        <g
          stroke="url(#of-ring)"
          strokeWidth="1.25"
          opacity="0.75"
          className="origin-center motion-safe:animate-[orbit_84s_linear_infinite_reverse]"
          style={{ transformOrigin: "500px 500px" }}
        >
          <ellipse cx="500" cy="500" rx="118" ry="286" transform="rotate(-34 500 500)" />
          <ellipse cx="500" cy="500" rx="118" ry="286" transform="rotate(34 500 500)" />
        </g>
      </g>

      <g data-depth="1.15" style={{ willChange: "transform" }}>
        <g fill="var(--color-signal-400)">
          <circle cx="500" cy="214" r="6" />
          <circle cx="742" cy="612" r="4.5" opacity="0.75" />
          <circle cx="272" cy="418" r="3.5" opacity="0.55" />
        </g>
        <g fill="var(--color-ink-300)">
          <circle cx="500" cy="786" r="5" opacity="0.7" />
          <circle cx="268" cy="640" r="3.5" opacity="0.5" />
          <circle cx="736" cy="376" r="4" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}
