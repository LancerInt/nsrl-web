"use client";

import { MotionConfig } from "framer-motion";

/**
 * Teaches Framer Motion to respect `prefers-reduced-motion`.
 *
 * The reduced-motion block in globals.css can only clamp CSS `animation` and
 * `transition` durations. Framer writes its transforms and opacities as inline
 * styles from a JS ticker, so CSS never sees them — every `motion.*` component
 * on the site kept sliding for visitors who had asked it not to.
 * `reducedMotion="user"` makes Framer drop transform/layout animation for those
 * visitors while still cross-fading opacity, so content arrives rather than
 * appearing to be missing.
 *
 * This is a client wrapper rather than a bare `<MotionConfig>` in the root
 * layout because framer-motion's ESM entry is a plain barrel with no top-level
 * `"use client"` — importing it from a server component would pull the whole
 * package into the server graph. The root layout stays a Server Component.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
