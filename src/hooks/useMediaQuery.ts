"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query.
 *
 * Uses `useSyncExternalStore` rather than state-in-an-effect: the browser's
 * MediaQueryList *is* an external store, so reading it directly avoids the
 * extra render pass — and the false-then-true flash — that the effect version
 * causes on first paint.
 *
 * Returns `false` during server rendering, so it must only drive enhancement,
 * never gate content.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");

export const useHasFinePointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");
