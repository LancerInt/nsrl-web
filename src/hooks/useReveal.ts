"use client";

import { useEffect } from "react";

/** Reveal anything still waiting after this long, whatever the observer did. */
const SAFETY_MS = 1200;

/**
 * Drives every `[data-reveal]` element on the page with a single
 * IntersectionObserver, rather than one observer per component.
 *
 * The contract is *visible by default, animated only as enhancement*, and it
 * is enforced in three places:
 *
 *  1. The CSS hides nothing until this hook marks an element `data-armed`,
 *     so a visitor with no JavaScript, a blocked bundle or a failed
 *     hydration reads the whole page.
 *  2. Only elements that start **below the fold** are ever armed. An element
 *     already on screen is marked revealed immediately and never hides — the
 *     previous version armed everything, so a section the browser restored
 *     mid-page, or one the observer was slow to report, sat blank until a
 *     scroll nudged it.
 *  3. A safety timer resolves anything still armed after `SAFETY_MS`. If the
 *     observer never fires — a layout shift that moves an element out of its
 *     own root margin, a browser that throttles callbacks in a background
 *     tab — the content appears anyway. Blank is never a resting state.
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const reveal = (el: Element) => {
      el.classList.add("is-inview");
      el.removeAttribute("data-armed");
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // A *positive* bottom margin, which is the whole trick. The old
      // `-12%` meant an element had to be well inside the viewport before
      // it was allowed to start appearing, so the visitor watched it arrive
      // — that is the "briefly blank" symptom. Extending the root a fifth
      // of a screen past the fold starts the fade while the element is
      // still below it, and at any ordinary scroll speed it has finished by
      // the time there is anything to look at.
      { rootMargin: "0px 0px 20% 0px", threshold: 0 },
    );

    let timer = 0;

    const scan = () => {
      const fold = window.innerHeight;
      for (const el of document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not(.is-inview):not([data-armed])",
      )) {
        // Anything on screen, above it, or just below the fold is either
        // already being looked at or about to be. Arming it would hide
        // something the visitor can see. The 1.2 matches the observer's
        // root margin, so an element is never armed on load only to be
        // released again in the same frame.
        if (el.getBoundingClientRect().top < fold * 1.2) {
          reveal(el);
          continue;
        }
        el.dataset.armed = "";
        observer.observe(el);
      }

      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        document
          .querySelectorAll<HTMLElement>("[data-reveal][data-armed]")
          .forEach((el) => {
            reveal(el);
            observer.unobserve(el);
          });
      }, SAFETY_MS);
    };

    scan();

    // Client-side navigation swaps the tree without remounting this hook's
    // host in some layouts; a mutation observer keeps late nodes covered.
    // Coalesced to one scan per frame — React commits arrive in bursts, and
    // measuring every node on each of them would be the jank this is
    // supposed to avoid. (`scan` only touches classes and attributes, so it
    // cannot re-trigger a childList observer and loop.)
    let frame = 0;
    const mutations = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}
