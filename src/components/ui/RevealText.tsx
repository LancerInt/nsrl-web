"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

let registered = false;

/**
 * Line-by-line masked reveal for display headings.
 *
 * SplitType rewrites the DOM, so the original text is restored on unmount and
 * the split is re-run on resize — otherwise line boxes measured at one width
 * stay frozen when the viewport changes.
 */
export function RevealText({
  as: Tag = "span",
  children,
  className,
  delay = 0,
  stagger = 0.085,
  trigger = "scroll",
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  /** `mount` plays immediately — for above-the-fold headings. */
  trigger?: "scroll" | "mount";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    let split: SplitType | null = null;
    let tween: gsap.core.Tween | null = null;
    let resizeTimer = 0;

    const build = () => {
      split?.revert();
      tween?.scrollTrigger?.kill();
      tween?.kill();

      split = new SplitType(el, { types: "lines", lineClass: "rt-line" });

      // Each line needs its own overflow-hidden parent to mask the slide.
      split.lines?.forEach((line) => {
        const mask = document.createElement("span");
        mask.className = "block overflow-hidden [padding-block:0.08em] [margin-block:-0.08em]";
        line.parentNode?.insertBefore(mask, line);
        mask.appendChild(line);
        (line as HTMLElement).style.display = "block";
      });

      const lines = split.lines ?? [];
      if (!lines.length) return;

      gsap.set(lines, { yPercent: 112 });

      tween = gsap.to(lines, {
        yPercent: 0,
        duration: 1.15,
        ease: "expo.out",
        stagger,
        delay,
        ...(trigger === "scroll"
          ? {
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            }
          : {}),
      });
    };

    build();

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 220);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [children, delay, stagger, trigger]);

  return (
    <Tag ref={ref} className={cn("[&_.rt-line]:will-change-transform", className)}>
      {children}
    </Tag>
  );
}
