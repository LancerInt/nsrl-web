"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReveal } from "@/hooks/useReveal";

let registered = false;

/**
 * Owns scroll housekeeping for the site on top of the browser's native scroll:
 * the reveal observer, return-to-top on navigation, and re-measuring GSAP's
 * pinned sections after a route change.
 *
 * Native scroll is a deliberate choice — a laboratory's site should scroll the
 * way the visitor's machine scrolls. Anchor offset under the fixed header is
 * handled in CSS with `scroll-margin-top`, not by intercepting clicks.
 */
export function ScrollManager({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The first run is the initial load: the browser has already placed the
  // viewport (deep link with a hash, or a restored back/forward position) and
  // we must not fight it.
  const firstRun = useRef(true);
  useReveal();

  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
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
      // Cross-page hash link: the new page has committed but not necessarily
      // settled, so measure on the next frame. `scroll-margin-top` on the
      // target keeps it clear of the fixed header.
      frame = requestAnimationFrame(() => {
        const raw = window.location.hash.slice(1);
        let id = raw;
        try {
          id = decodeURIComponent(raw);
        } catch {
          id = raw;
        }
        document.getElementById(id)?.scrollIntoView();
      });
    } else {
      window.scrollTo(0, 0);
    }

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(id);
    };
  }, [pathname]);

  return <>{children}</>;
}
