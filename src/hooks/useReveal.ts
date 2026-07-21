"use client";

import { useEffect } from "react";

/**
 * Drives every `[data-reveal]` element on the page with a single
 * IntersectionObserver, rather than one observer per component.
 *
 * The `js` class on <html> is what arms the CSS: until it is set, nothing is
 * hidden, so a visitor whose JavaScript failed still reads the whole page.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-inview"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-inview");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const observeAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-inview)")
        .forEach((el) => observer.observe(el));
    };

    observeAll();

    // Client-side navigation swaps the tree without remounting this hook's
    // host in some layouts; a mutation observer keeps late nodes covered.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}
