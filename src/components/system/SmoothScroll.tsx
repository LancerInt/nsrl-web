"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReveal } from "@/hooks/useReveal";

let registered = false;

/** The fixed header would otherwise sit on top of whatever we scrolled to. */
const HEADER_OFFSET = -96;

/** Resolve `#quality-system` to its element without risking an invalid selector. */
function hashTarget(hash: string): HTMLElement | null {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw) return null;
  let id = raw;
  try {
    id = decodeURIComponent(raw);
  } catch {
    id = raw;
  }
  return document.getElementById(id);
}

/**
 * Owns the scroll for the entire site: Lenis drives it, GSAP ScrollTrigger
 * reads from it, and the reveal observer rides along.
 *
 * Mounted once in the root layout. Never mount a second instance — two Lenis
 * loops fight each other and the page stutters.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  // The first run is the initial load: the browser has already placed the
  // viewport (deep link with a hash, or a restored back/forward position) and
  // we must not fight it.
  const firstRun = useRef(true);
  useReveal();

  const scrollToElement = useCallback((target: HTMLElement) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: HEADER_OFFSET });
      return;
    }
    // Reduced motion: no Lenis instance exists, so place it directly.
    window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links have to go through Lenis or they jump past the target.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = hashTarget(href);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: HEADER_OFFSET });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Route changes re-measure every pinned section, and — unless the visitor
  // asked for a specific place on the page — return them to the top.
  useEffect(() => {
    let frame = 0;

    if (firstRun.current) {
      // Leave the initial load alone: a cold `/about#leadership` and browser
      // scroll restoration both own the position at this point.
      firstRun.current = false;
    } else if (window.location.hash) {
      // Cross-page hash link. The new page has committed but not necessarily
      // settled, so measure on the next frame, and go through Lenis so the
      // fixed header does not cover the heading we landed on.
      frame = requestAnimationFrame(() => {
        const target = hashTarget(window.location.hash);
        if (target) scrollToElement(target);
      });
    } else {
      window.scrollTo(0, 0);
    }

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(id);
    };
  }, [pathname, scrollToElement]);

  return <>{children}</>;
}
