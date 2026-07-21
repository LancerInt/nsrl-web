import type { Transition, Variants } from "framer-motion";

/**
 * One motion vocabulary for the whole site. Components import from here rather
 * than declaring their own curves, which is what keeps the site feeling like a
 * single object rather than a set of pages.
 */

export const easing = {
  /** Default. Fast departure, long settle — reads as weight without lag. */
  expo: [0.16, 1, 0.3, 1],
  /** Symmetrical. For things that leave and return, like menus. */
  inOutExpo: [0.87, 0, 0.13, 1],
  quart: [0.25, 1, 0.5, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const;

export const duration = {
  fast: 0.32,
  base: 0.6,
  slow: 0.9,
  editorial: 1.2,
} as const;

export const transition = {
  base: { duration: duration.base, ease: easing.expo },
  slow: { duration: duration.slow, ease: easing.expo },
  editorial: { duration: duration.editorial, ease: easing.expo },
  menu: { duration: 0.7, ease: easing.inOutExpo },
} satisfies Record<string, Transition>;

/** Container that staggers its children. */
export const stagger = (amount = 0.06, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: amount, delayChildren: delay },
  },
});

/** Rises into place. The workhorse. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
};

/** For text lines sitting inside an `overflow: hidden` mask. */
export const maskLine: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: transition.editorial },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.slow },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition.slow },
};

/** Viewport config shared by every scroll-triggered Framer animation. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
export const viewportEarly = { once: true, amount: 0.1 } as const;

/** True when the visitor has asked for reduced motion. Safe on the server. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
