import Image from "next/image";

import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Deterministic pseudo-randomness.

   Every figure derives its geometry from `seed` through these helpers rather
   than from Math.random, so the server and the client draw byte-identical SVG
   and two plates with different seeds are genuinely different drawings.
   -------------------------------------------------------------------------- */

/** 32-bit integer hash of (seed, index). Math.imul keeps the arithmetic exact. */
function hash(seed: number, index: number): number {
  let h = Math.imul((seed | 0) + 0x9e3779b9, 0x85ebca6b);
  h ^= Math.imul((index | 0) + 0x165667b1, 0xc2b2ae35);
  h = Math.imul(h ^ (h >>> 15), 0x27d4eb2f);
  h ^= h >>> 13;
  return h >>> 0;
}

/** Deterministic value in [0, 1). */
function rand(seed: number, index: number): number {
  return hash(seed, index) / 0x100000000;
}

/** Deterministic offset in [-span, +span). */
function jitter(seed: number, index: number, span: number): number {
  return (rand(seed, index) - 0.5) * 2 * span;
}

/** Two decimals is plenty for a 400×300 viewBox and keeps the markup short. */
function r2(n: number): number {
  return Math.round(n * 100) / 100;
}

type Point = { x: number; y: number };

/** Catmull-Rom through the points, emitted as cubic béziers. */
function smoothPath(points: Point[]): string {
  let d = `M ${r2(points[0].x)} ${r2(points[0].y)}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${r2(c1.x)} ${r2(c1.y)} ${r2(c2.x)} ${r2(c2.y)} ${r2(p2.x)} ${r2(p2.y)}`;
  }
  return d;
}

/** Point at parameter `t` (0–1) on an ellipse rotated by `rotation` degrees. */
function onEllipse(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rotation: number,
  t: number,
): Point {
  const a = t * Math.PI * 2;
  const x = rx * Math.cos(a);
  const y = ry * Math.sin(a);
  const r = (rotation * Math.PI) / 180;
  return {
    x: cx + x * Math.cos(r) - y * Math.sin(r),
    y: cy + x * Math.sin(r) + y * Math.cos(r),
  };
}

export type PlateVariant =
  | "orbital"
  | "chromatogram"
  | "gradient-well"
  | "titration"
  | "lattice"
  | "wave";

/**
 * Generative scientific figures, used wherever photography would otherwise go.
 *
 * Deliberate art direction rather than a stopgap: stock imagery of laboratories
 * reads as generic no matter how well it is shot, and these are deterministic,
 * weightless, theme-aware and never mismatched to the copy beside them.
 *
 * When NSRL supplies real photography, pass `src` and the figure becomes an
 * image without any change to the calling layout.
 */
export function SpecimenPlate({
  variant = "orbital",
  seed = 0,
  className,
  tone = "light",
  src,
  alt = "",
  position,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
}: {
  variant?: PlateVariant;
  seed?: number;
  className?: string;
  tone?: "light" | "deep";
  /** When set, the figure is a real photograph instead of a drawing. */
  src?: string;
  alt?: string;
  /** `object-position` for the crop — comes from the image's own record. */
  position?: string;
  sizes?: string;
  priority?: boolean;
}) {
  // Supplied artwork takes the drawing's place, filling the same frame. The
  // caller owns the aspect ratio via its positioned wrapper; the image's own
  // record owns the crop.
  //
  // No colour grade. The old `photo` filter — desaturate, lift, hold
  // contrast — existed to make a dozen free-licence photographs taken on
  // different cameras under different light read as one set. The artwork
  // that replaced them is commissioned to the NSRL palette and already *is*
  // one set, so filtering it would only pull it off-brand.
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={position ? { objectPosition: position } : undefined}
        className={cn("object-cover", className)}
      />
    );
  }

  const id = `${variant}-${seed}`;
  const stroke = tone === "deep" ? "rgba(255,255,255,0.5)" : "var(--color-ink-600)";
  const faint = tone === "deep" ? "rgba(255,255,255,0.12)" : "rgba(8,21,43,0.12)";
  /* Traces plot in the meniscus blue: on paper the figures read as drawn ink,
     and the green stays reserved for certification marks elsewhere. */
  const accent = "var(--color-meniscus-500)";

  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      aria-hidden
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0%"
            stopColor={tone === "deep" ? "var(--color-ink-700)" : "var(--color-ink-100)"}
            stopOpacity={tone === "deep" ? 0.65 : 0.9}
          />
          <stop
            offset="100%"
            stopColor={tone === "deep" ? "var(--color-deep)" : "var(--color-meniscus-100)"}
            stopOpacity={tone === "deep" ? 0.9 : 0.7}
          />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.16" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="300" fill={`url(#${id}-fill)`} />

      {/* Shared graticule — the calibration grid every figure sits on. */}
      <g stroke={faint} strokeWidth="0.5">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 40} y1="0" x2={(i + 1) * 40} y2="300" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 43} x2="400" y2={(i + 1) * 43} />
        ))}
      </g>

      {variant === "orbital" && (
        <OrbitalFigure stroke={stroke} accent={accent} id={id} seed={seed} />
      )}
      {variant === "chromatogram" && (
        <ChromatogramFigure stroke={stroke} accent={accent} seed={seed} />
      )}
      {variant === "gradient-well" && <WellFigure stroke={stroke} accent={accent} seed={seed} />}
      {variant === "titration" && (
        <TitrationFigure stroke={stroke} accent={accent} seed={seed} />
      )}
      {variant === "lattice" && <LatticeFigure stroke={stroke} accent={accent} seed={seed} />}
      {variant === "wave" && <WaveFigure stroke={stroke} accent={accent} id={id} seed={seed} />}
    </svg>
  );
}

function OrbitalFigure({
  stroke,
  accent,
  id,
  seed,
}: {
  stroke: string;
  accent: string;
  id: string;
  seed: number;
}) {
  const cx = 200;
  const cy = 150;

  /* Three shells. The seed rotates each one and breathes its radii, so the
     assembly is recognisably the same instrument at a different attitude. */
  const rings = [
    { rx: 52, ry: 112, rotation: -32 },
    { rx: 52, ry: 112, rotation: 32 },
    { rx: 112, ry: 52, rotation: 0 },
  ].map((ring, i) => ({
    rx: r2(ring.rx * (1 + jitter(seed, i, 0.1))),
    ry: r2(ring.ry * (1 + jitter(seed, i + 3, 0.1))),
    rotation: r2(ring.rotation + jitter(seed, i + 6, 26)),
  }));

  /* One marker riding each shell, at a phase the seed decides. */
  const markers = rings.map((ring, i) => ({
    ...onEllipse(cx, cy, ring.rx, ring.ry, ring.rotation, rand(seed, i + 9)),
    r: i === 0 ? 3.5 : 3 - i * 0.5,
  }));

  return (
    <g>
      <circle cx={cx} cy={cy} r="120" fill={`url(#${id}-glow)`} />
      <g stroke={stroke} strokeWidth="0.9" opacity="0.7">
        {rings.map((ring, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={ring.rx}
            ry={ring.ry}
            transform={`rotate(${ring.rotation} ${cx} ${cy})`}
          />
        ))}
      </g>
      <circle cx={cx} cy={cy} r="7" fill={accent} />
      {markers.map((marker, i) => (
        <circle
          key={i}
          cx={r2(marker.x)}
          cy={r2(marker.y)}
          r={marker.r}
          fill={i === 0 ? accent : stroke}
          opacity={i === 0 ? 0.8 : 0.6 - i * 0.1}
        />
      ))}
    </g>
  );
}

function ChromatogramFigure({
  stroke,
  accent,
  seed,
}: {
  stroke: string;
  accent: string;
  seed: number;
}) {
  // Deterministic peak set — same seed always draws the same trace.
  const peaks = [
    { x: 74, h: 44 + (seed % 3) * 12, w: 13 },
    { x: 128, h: 118 + (seed % 4) * 9, w: 10 },
    { x: 176, h: 62, w: 15 },
    { x: 232, h: 158 - (seed % 3) * 14, w: 9 },
    { x: 286, h: 82, w: 17 },
    { x: 336, h: 36, w: 11 },
  ];

  const baseline = 250;
  let d = `M 24 ${baseline}`;
  for (const p of peaks) {
    d += ` L ${p.x - p.w} ${baseline} Q ${p.x} ${baseline - p.h} ${p.x + p.w} ${baseline}`;
  }
  d += ` L 380 ${baseline}`;

  return (
    <g>
      <line x1="24" y1={baseline} x2="380" y2={baseline} stroke={stroke} strokeWidth="1" opacity="0.5" />
      <path d={d} stroke={accent} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <path d={`${d} L 24 ${baseline} Z`} fill={accent} opacity="0.1" />
      {peaks.map((p) => (
        <line
          key={p.x}
          x1={p.x}
          y1={baseline}
          x2={p.x}
          y2={baseline + 7}
          stroke={stroke}
          strokeWidth="0.9"
          opacity="0.55"
        />
      ))}
    </g>
  );
}

function WellFigure({ stroke, accent, seed }: { stroke: string; accent: string; seed: number }) {
  const rows = 4;
  const cols = 6;
  return (
    <g>
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        // Deterministic pseudo-random intensity from index + seed.
        const v = ((i * 37 + seed * 13) % 100) / 100;
        return (
          <circle
            key={i}
            cx={70 + c * 52}
            cy={68 + r * 55}
            r="19"
            fill={accent}
            fillOpacity={0.08 + v * 0.42}
            stroke={stroke}
            strokeWidth="0.7"
            strokeOpacity="0.45"
          />
        );
      })}
    </g>
  );
}

function TitrationFigure({
  stroke,
  accent,
  seed,
}: {
  stroke: string;
  accent: string;
  seed: number;
}) {
  /* The curve is defined by where it turns over and how sharply, both of which
     the seed sets — a different titrand, not a different drawing style. */
  const equivalenceX = r2(200 + jitter(seed, 1, 34));
  const equivalenceY = r2(134 + jitter(seed, 2, 32));
  const startY = r2(256 + jitter(seed, 3, 8));
  const endY = r2(50 + jitter(seed, 4, 14));
  const rise = r2(44 + rand(seed, 5) * 28);

  const curve = smoothPath([
    { x: 30, y: startY },
    { x: equivalenceX - rise * 1.6, y: startY - 6 },
    { x: equivalenceX - rise * 0.5, y: equivalenceY + rise },
    { x: equivalenceX, y: equivalenceY },
    { x: equivalenceX + rise * 0.5, y: equivalenceY - rise },
    { x: equivalenceX + rise * 1.6, y: endY + 8 },
    { x: 372, y: endY },
  ]);

  return (
    <g>
      <path d={curve} stroke={accent} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <line x1="30" y1="272" x2="376" y2="272" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="28" x2="30" y2="272" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <circle cx={equivalenceX} cy={equivalenceY} r="5" fill={accent} />
      <circle
        cx={equivalenceX}
        cy={equivalenceY}
        r="14"
        stroke={accent}
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <line
        x1={equivalenceX}
        y1={equivalenceY}
        x2={equivalenceX}
        y2="272"
        stroke={accent}
        strokeWidth="0.7"
        strokeDasharray="3 4"
        opacity="0.6"
      />
    </g>
  );
}

function LatticeFigure({
  stroke,
  accent,
  seed,
}: {
  stroke: string;
  accent: string;
  seed: number;
}) {
  const anchors: readonly (readonly [number, number])[] = [
    [110, 92],
    [200, 62],
    [290, 100],
    [148, 168],
    [246, 176],
    [200, 244],
    [86, 214],
    [318, 208],
  ];

  /* Nodes drift within their cell; edges are a seeded subset of the candidate
     set, so the connectivity — not just the positions — changes with the seed. */
  /* Every third node is an accent hub; the seed only decides which third, so a
     plate can never come out with the accent missing entirely. */
  const hubPhase = hash(seed, 16) % 3;
  const nodes = anchors.map(([x, y], i) => ({
    x: r2(x + jitter(seed, i, 18)),
    y: r2(y + jitter(seed, i + 8, 15)),
    hub: (i + hubPhase) % 3 === 0,
  }));

  const candidates: readonly (readonly [number, number])[] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [2, 4],
    [3, 4],
    [3, 5],
    [4, 5],
    [3, 6],
    [4, 7],
    [1, 3],
    [1, 4],
    [0, 6],
    [2, 7],
    [5, 6],
    [5, 7],
  ];

  const edges = candidates.filter((_, i) => hash(seed, i + 32) % 5 > 1);

  return (
    <g>
      <g stroke={stroke} strokeWidth="0.9" opacity="0.55">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>
      {nodes.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={node.hub ? 7 : 4.5}
          fill={node.hub ? accent : stroke}
          fillOpacity={node.hub ? 1 : 0.65}
        />
      ))}
    </g>
  );
}

/** One seeded trace: two summed sinusoids sampled across the full width. */
function waveTrace(seed: number, channel: number, baseline: number, amplitude: number): Point[] {
  const phase = rand(seed, channel * 7 + 1) * Math.PI * 2;
  const frequency = 1.1 + rand(seed, channel * 7 + 2) * 1.4;
  const amp = amplitude * (0.65 + rand(seed, channel * 7 + 3) * 0.7);
  const tilt = jitter(seed, channel * 7 + 4, 18);

  return Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    const x = t * 400;
    const y =
      baseline +
      tilt * (t - 0.5) +
      Math.sin(phase + t * frequency * Math.PI * 2) * amp +
      Math.sin(phase * 1.9 + t * frequency * Math.PI * 4.6) * amp * 0.28;
    return { x, y };
  });
}

function WaveFigure({
  stroke,
  accent,
  id,
  seed,
}: {
  stroke: string;
  accent: string;
  id: string;
  seed: number;
}) {
  const lead = waveTrace(seed, 0, 186 + jitter(seed, 40, 14), 22);
  const trail = waveTrace(seed, 1, 218 + jitter(seed, 41, 12), 16);

  const leadPath = smoothPath(lead);
  const glow = {
    x: r2(200 + jitter(seed, 42, 90)),
    y: r2(96 + jitter(seed, 43, 34)),
  };

  return (
    <g>
      <path d={`${leadPath} L 400 300 L 0 300 Z`} fill={accent} fillOpacity="0.16" />
      <path d={leadPath} stroke={accent} strokeWidth="1.6" fill="none" />
      <path
        d={smoothPath(trail)}
        stroke={stroke}
        strokeWidth="1"
        fill="none"
        opacity="0.45"
      />
      <circle cx={glow.x} cy={glow.y} r="40" fill={`url(#${id}-glow)`} />
    </g>
  );
}
