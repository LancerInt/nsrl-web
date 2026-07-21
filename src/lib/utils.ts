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

/** Formats a large integer with thin thousands separators. */
export function formatCount(value: number, decimals = 0): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
