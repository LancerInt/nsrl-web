import { Motif } from "@/components/visuals/Motif";

/**
 * The index hero backdrop.
 *
 * This was a bar chart: one column per division, each drawn to the number
 * of methods that division lists. It was honest — the heights came from the
 * data — and it was still the wrong thing on the page. Nobody can read a
 * value off an unlabelled, unaxised chart sitting at 16% opacity behind a
 * headline, so it carried the *look* of measurement without any of the use,
 * which is the definition of a decorative chart.
 *
 * The counts it encoded are stated in type a few hundred pixels below,
 * where they can actually be read. The backdrop is now the kit's sample-tray
 * motif, which is decoration that admits to being decoration.
 */
export function RegisterHeroField() {
  return <Motif name="motif-sample-grid" fade="start" opacity={0.75} />;
}
