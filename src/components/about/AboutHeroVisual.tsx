import { Motif } from "@/components/visuals/Motif";

/**
 * Hero backdrop for the About page.
 *
 * Was the orbital field — an atom diagram behind a page about a laboratory
 * that runs toxicology and residue chemistry. The brief's instruction for
 * this slot is to replace the generic atom illustration with the shared
 * quality network, a real photograph or a focused editorial panel; the
 * shared quality network is used at full size on the homepage, so repeating
 * it here as wallpaper would weaken it in both places.
 *
 * The tissue-contour motif is the quieter answer: drawn from the stained
 * sections the toxicology division actually reads, and content to sit
 * behind type.
 */
export function AboutHeroVisual() {
  return <Motif name="motif-tissue-contours" fade="both" opacity={0.8} />;
}
