"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { easing } from "@/lib/motion";
import { OrbitalMark } from "@/components/visuals/OrbitalMark";

const SESSION_KEY = "nsrl:introduced";

/**
 * First-visit intro. Counts real elapsed progress to 100, draws the orbital
 * mark, then lifts as two panels.
 *
 * Shown once per session — a preloader on every navigation is theatre at the
 * visitor's expense. Skipped entirely under reduced motion.
 */
export function Preloader() {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const startedAt = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY);

    if (reduced || seen) {
      document.documentElement.classList.remove("lenis-stopped");
      return;
    }

    // Whether to play the intro depends on sessionStorage and matchMedia,
    // neither of which exists during server rendering. Deciding in a lazy
    // initialiser instead would render `true` on the client against `false`
    // from the server and break hydration, so the extra render is the correct
    // trade here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(true);
    startedAt.current = performance.now();
    // A class, not `body.style.overflow`: the header owns a lock of its own for
    // the mobile sheet, and two components writing the same inline property
    // means whichever writes last releases the other's lock (see globals.css).
    document.body.classList.add("is-locked-intro");

    let frame = 0;
    const MIN_MS = 1500;

    const tick = () => {
      const elapsed = performance.now() - startedAt.current;
      // Ease toward 100 so the number decelerates rather than ticking linearly.
      const linear = Math.min(elapsed / MIN_MS, 1);
      const eased = 1 - Math.pow(1 - linear, 2.4);
      setProgress(Math.round(eased * 100));

      if (linear < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      sessionStorage.setItem(SESSION_KEY, "1");
      window.setTimeout(() => {
        setActive(false);
        document.body.classList.remove("is-locked-intro");
      }, 260);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("is-locked-intro");
    };
  }, []);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col"
          aria-hidden
          exit={{ transition: { staggerChildren: 0.06 } }}
        >
          {/* Two panels that part vertically, revealing the page beneath. */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="relative flex-1 overflow-hidden bg-deep"
              initial={{ y: 0 }}
              exit={{
                y: i === 0 ? "-101%" : "101%",
                transition: { duration: 1, ease: easing.inOutExpo },
              }}
            >
              <div
                className="graticule absolute inset-0 opacity-[0.35]"
                style={
                  {
                    "--graticule-color": "rgba(255,255,255,0.05)",
                    "--graticule-size": "4rem",
                  } as React.CSSProperties
                }
              />
            </motion.div>
          ))}

          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-8"
            exit={{ opacity: 0, transition: { duration: 0.4, ease: easing.expo } }}
          >
            <OrbitalMark className="h-24 w-24 text-signal-400" animate />

            <div className="flex flex-col items-center gap-3">
              <span className="label-mono text-ink-200">NSRL</span>
              <span className="font-mono text-[clamp(2.5rem,7vw,5rem)] font-medium leading-none tracking-tight text-white tabular-nums">
                {String(progress).padStart(3, "0")}
              </span>
            </div>

            <div className="h-px w-[min(22rem,60vw)] overflow-hidden bg-white/12">
              <div
                className="h-full bg-signal-400 transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
