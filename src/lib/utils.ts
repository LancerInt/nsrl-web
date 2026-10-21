export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

/**
 * Minimal class joiner. Deliberately not `clsx` + `tailwind-merge`: this
 * codebase composes classes from fixed sets rather than overriding them, so
 * conflict resolution would be dead weight in the bundle.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (value: ClassValue) => {
    if (!value) return;
    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    for (const [key, enabled] of Object.entries(value)) {
      if (enabled) out.push(key);
    }
  };

  inputs.forEach(walk);
  return out.join(" ");
}

/** Zero-padded index used throughout the editorial layouts (01, 02, …). */
export function pad(n: number, width = 2): string {
  return String(n).padStart(width, "0");
}

/**
 * Formats a large integer with thousands separators.
 *
 * `en-GB`, not `en-IN`. The Indian grouping renders 150000 as "1,50,000",
 * which is correct in India and unreadable to the sponsors this site is
 * written for — the same figure appeared as both "1,50,000 sq ft" and
 * "150,000 sq ft" on neighbouring pages depending on whether it had gone
 * through this function. One grouping, the international one, everywhere.
 */
export function formatCount(value: number, decimals = 0): string {
  return value.toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
];

/**
 * Spell a small count, for headings that read it as a word.
 *
 * This exists so no heading hardcodes "thirteen". Divisions and sectors have
 * been added and withdrawn, and every time one was, a dozen headings, page
 * titles and meta descriptions quietly became wrong. Counts in prose now come
 * from the same arrays the pages render.
 */
export function numberWord(n: number, { capitalise = false } = {}): string {
  const word = WORDS[n] ?? String(n);
  return capitalise ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
