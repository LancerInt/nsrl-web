import { Motif, type MotifName } from "@/components/visuals/Motif";
import type { Discipline } from "@/content/disciplines";

/**
 * The backdrop behind a division page's hero.
 *
 * Was five generated fields — rings, column, trace, arc, mesh — selected by
 * the division's index so that no two pages repeated. The variety was real
 * and the premise was not: "rings" was an atom diagram behind Chemistry and
 * Entomology alike, and the rest were abstract enough that which page you
 * were on made no difference to what you saw.
 *
 * Now the motif follows the division's *family*, so the backdrop carries a
 * little information instead of a little noise: the safety divisions get
 * tissue contours, the applied ones an environmental gradient, the
 * analytical ones a sample tray. Three families, three motifs, and a reader
 * moving between two toxicology pages sees the same ground under both —
 * which is the truthful signal, since they are the same kind of work.
 */
const BY_FAMILY: Record<Discipline["family"], MotifName> = {
  "Safety & toxicology": "motif-tissue-contours",
  "Analytical & discovery": "motif-sample-grid",
  "Applied & specialist": "motif-environment",
};

export function DivisionHeroField({ family }: { family: Discipline["family"] }) {
  return <Motif name={BY_FAMILY[family]} fade="both" opacity={0.75} />;
}
