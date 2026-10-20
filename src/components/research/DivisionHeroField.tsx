import { cn } from "@/lib/utils";
import { noise, type HeroFieldKind } from "./variation";

/**
 * The hero backdrop for a division page.
 *
 * Five drawn fields, selected by the division's index, so the division pages
 * never open with the same image. Purely decorative: the SVG is inert, the
 * orbit animation is gated behind `motion-safe`, and no information lives here
 * that is not also stated in type.
 */

const HAIR = "rgba(8,21,43,0.16)";
const HAIR_STRONG = "rgba(8,21,43,0.26)";
const ACCENT = "var(--color-meniscus-500)";

export function DivisionHeroField({
  kind,
  seed,
  className,
}: {
  kind: HeroFieldKind;
  seed: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("absolute inset-0", className)}>
      <div
        className="graticule absolute inset-0 opacity-40"
        style={
          {
            "--graticule-color": "color-mix(in oklab, var(--color-ink-900) 2.5%, transparent)",
            "--graticule-size": "5.5rem",
          } as React.CSSProperties
        }
      />

      <svg
        viewBox="0 0 1200 640"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="hf-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.24" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
        </defs>

        {kind === "rings" ? <RingsField /> : null}
        {kind === "column" ? <ColumnField seed={seed} /> : null}
        {kind === "trace" ? <TraceField seed={seed} /> : null}
        {kind === "arc" ? <ArcField /> : null}
        {kind === "mesh" ? <MeshField seed={seed} /> : null}
      </svg>

      {/* Keeps the display type legible wherever the field runs bright. */}
      <div className="absolute inset-0 bg-[linear-gradient(102deg,var(--color-canvas)_26%,transparent_88%)]" />
    </div>
  );
}

function RingsField() {
  return (
    <g>
      <circle cx="940" cy="290" r="320" fill="url(#hf-glow)" />
      <g stroke={HAIR} strokeWidth="1">
        <ellipse cx="940" cy="290" rx="132" ry="292" transform="rotate(-30 940 290)" />
        <ellipse cx="940" cy="290" rx="132" ry="292" transform="rotate(30 940 290)" />
        <ellipse cx="940" cy="290" rx="292" ry="132" />
      </g>
      <circle cx="940" cy="290" r="6" fill={ACCENT} />
      <circle cx="940" cy="-2" r="4" fill={ACCENT} opacity="0.65" />
      <circle cx="1232" cy="290" r="3.5" fill={HAIR_STRONG} />
    </g>
  );
}

function ColumnField({ seed }: { seed: number }) {
  const bands = Array.from({ length: 15 }, (_, i) => ({
    x: 560 + i * 44,
    h: Number((110 + noise(i, seed) * 400).toFixed(1)),
    o: Number((0.035 + noise(i + 4, seed) * 0.06).toFixed(3)),
  }));

  return (
    <g>
      {bands.map((band) => (
        <g key={band.x}>
          <rect
            x={band.x}
            y={620 - band.h}
            width="20"
            height={band.h}
            fill="var(--color-ink-900)"
            fillOpacity={band.o}
          />
          <line
            x1={band.x}
            y1={620 - band.h}
            x2={band.x + 20}
            y2={620 - band.h}
            stroke={ACCENT}
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <line x1={band.x} y1="620" x2={band.x} y2="632" stroke={HAIR} strokeWidth="1" />
        </g>
      ))}
      <line x1="520" y1="620" x2="1200" y2="620" stroke={HAIR_STRONG} strokeWidth="1" />
    </g>
  );
}

function TraceField({ seed }: { seed: number }) {
  const line = (offset: number, amp: number) =>
    Array.from({ length: 41 }, (_, i) => {
      const x = i * 30;
      const y = offset - Math.sin(i * 0.52 + seed) * amp - noise(i, seed) * amp * 0.9;
      return `${x},${y.toFixed(2)}`;
    }).join(" ");

  return (
    <g>
      <circle cx="880" cy="250" r="260" fill="url(#hf-glow)" />
      <polyline points={line(430, 78)} stroke={ACCENT} strokeOpacity="0.45" strokeWidth="1.6" />
      <polyline points={line(520, 46)} stroke={HAIR} strokeWidth="1.1" />
      <line x1="0" y1="576" x2="1200" y2="576" stroke={HAIR_STRONG} strokeWidth="1" />
      {Array.from({ length: 25 }, (_, i) => (
        <line
          key={i}
          x1={i * 50}
          y1="576"
          x2={i * 50}
          y2={i % 5 === 0 ? 596 : 586}
          stroke={HAIR}
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

function ArcField() {
  return (
    <g>
      <circle cx="1150" cy="620" r="360" fill="url(#hf-glow)" />
      {[200, 320, 440, 560, 680, 800].map((r, i) => (
        <path
          key={r}
          d={`M ${1240 - r} 690 A ${r} ${r} 0 0 1 1240 ${690 - r}`}
          stroke={i === 3 ? ACCENT : HAIR}
          strokeOpacity={i === 3 ? 0.4 : 1}
          strokeWidth="1"
        />
      ))}
      <circle cx="1240" cy="690" r="7" fill={ACCENT} opacity="0.7" />
    </g>
  );
}

function MeshField({ seed }: { seed: number }) {
  const cols = 6;
  const nodes = Array.from({ length: 18 }, (_, i) => ({
    x: Number((600 + (i % cols) * 112 + noise(i, seed) * 44).toFixed(1)),
    y: Number((80 + Math.floor(i / cols) * 190 + noise(i + 7, seed) * 78).toFixed(1)),
  }));

  const edges: [number, number][] = [];
  nodes.forEach((_, i) => {
    if (i % cols !== cols - 1) edges.push([i, i + 1]);
    if (i + cols < nodes.length) edges.push([i, i + cols]);
  });

  return (
    <g>
      <circle cx="900" cy="300" r="300" fill="url(#hf-glow)" />
      <g stroke={HAIR} strokeWidth="1">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      {nodes.map((node, i) => (
        <circle
          key={`${node.x}-${node.y}`}
          cx={node.x}
          cy={node.y}
          r={i % 4 === 0 ? 5.5 : 3}
          fill={i % 4 === 0 ? ACCENT : HAIR_STRONG}
          fillOpacity={i % 4 === 0 ? 0.85 : 1}
        />
      ))}
    </g>
  );
}
