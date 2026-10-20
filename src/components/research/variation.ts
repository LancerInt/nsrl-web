import type { Discipline } from "@/content/disciplines";
import type { PlateVariant } from "@/components/visuals/SpecimenPlate";

/**
 * The division pages share one template. Without a rule, they would read
 * as repeated printings of the same page.
 *
 * Everything here is derived from the division's own index, so the variation is
 * deterministic (identical on server and client, stable across builds) while
 * still giving each page its own figure, its own hero field, its own claim
 * composition and its own reading order.
 */

const PLATES: PlateVariant[] = [
  "orbital",
  "lattice",
  "chromatogram",
  "titration",
  "gradient-well",
  "wave",
];

export const HERO_FIELDS = ["rings", "column", "trace", "arc", "mesh"] as const;
export type HeroFieldKind = (typeof HERO_FIELDS)[number];

const CLAIM_ALIGNS = ["left", "split", "right"] as const;
export type ClaimAlign = (typeof CLAIM_ALIGNS)[number];

export type DivisionVariation = {
  /** 1-based division number, parsed from `index`. */
  n: number;
  seed: number;
  plate: PlateVariant;
  field: HeroFieldKind;
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
    plate: PLATES[i % PLATES.length],
    field: HERO_FIELDS[i % HERO_FIELDS.length],
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
