"use client";

import { usePathname } from "next/navigation";

/**
 * Page transition. A template (not a layout) so it remounts on every route
 * change and the animation actually replays.
 *
 * Deliberately restrained — a short lift and fade. A full curtain wipe between
 * every page reads as impatience once you have visited three of them, and it
 * delays first paint on the page the visitor actually asked for.
 *
 * The animation is CSS, gated on `html.js`, exactly like `[data-reveal]`: a
 * JS-driven `initial={{ opacity: 0 }}` would be serialised into the server HTML
 * as `style="opacity:0"`, which hides the LCP element until hydration and
 * leaves the whole site blank on every route if the bundle never arrives.
 * The key makes React recreate the element per navigation, which is what
 * restarts the keyframes.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
