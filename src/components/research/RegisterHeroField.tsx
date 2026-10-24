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
  /*
    Barely there.

    At 0.75 the sample-tray motif's outlined boxes sat directly behind the
    statistics row, the search field and the family chips — three sets of
    rectangles competing with three real controls, so the eye had to work
    out which outlines it was allowed to click. The decoration stays
    because the band is otherwise a flat field, but at 0.18 it is texture
    rather than a second set of boxes.
  */
  return <Motif name="motif-sample-grid" fade="start" opacity={0.18} />;
}
