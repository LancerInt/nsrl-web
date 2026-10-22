import type { Discipline } from "@/content/disciplines";

/**
 * The division pages share one template. Without a rule, they would read
 * as repeated printings of the same page.
 *
 * Everything here is derived from the division's own index, so the variation
 * is deterministic — identical on server and client, stable across builds.
 *
 * Two of the old axes have gone. `plate` chose one of six generated SVG
 * figures and `field` chose one of five generated hero backdrops; both sets
 * led with an orbital, and neither varied anything a reader could attach
 * meaning to. The backdrop now follows the division's family instead, which
 * is variation that carries information. What remains here is layout
 * variation — where the claim sits, which side the rail takes — which is
 * about rhythm and is the thing this module was for.
 */

const CLAIM_ALIGNS = ["left", "split", "right"] as const;
export type ClaimAlign = (typeof CLAIM_ALIGNS)[number];

export type DivisionVariation = {
  /** 1-based division number, parsed from `index`. */
  n: number;
  seed: number;
  claimAlign: ClaimAlign;
  /** Long capability sets collapse; short ones stay open as a ruled spec. */
  capabilityMode: "disclosure" | "ruled";
  capabilityTone: "canvas" | "sunken";
  specTone: "canvas" | "sunken";
  /** Which side the sticky orientation rail sits on in the overview band. */
  railSide: "left" | "right";
};

export function divisionVariation(discipline: Discipline): DivisionVariation {
  const n = Number.parseInt(discipline.index, 10) || 1;
  const i = Math.max(0, n - 1);
  const groups = discipline.capabilities.length;
  const even = i % 2 === 0;

  return {
    n,
    seed: n * 3 + 1,
    claimAlign: CLAIM_ALIGNS[i % CLAIM_ALIGNS.length],
    capabilityMode: groups >= 6 ? "disclosure" : "ruled",
    capabilityTone: even ? "canvas" : "sunken",
    specTone: even ? "sunken" : "canvas",
    railSide: even ? "left" : "right",
  };
}

/** Total number of individually listed methods across every capability group. */
export function methodCount(discipline: Discipline): number {
  return discipline.capabilities.reduce((total, group) => total + group.items.length, 0);
}

/**
 * The claim values range from "8" to "GLP · NABL". One display size
 * cannot serve both, so the size steps down as the string grows.
 */
export function claimSizeClass(value: string): string {
  if (value.length > 13) return "text-d3";
  if (value.length > 8) return "text-d2";
  return "text-d1";
}

/** Deterministic 0–1 noise for the generative hero fields. */
export function noise(i: number, seed: number): number {
  return ((i * 37 + seed * 53) % 97) / 97;
}
