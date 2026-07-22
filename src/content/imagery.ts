/**
 * The site's photography, mapped to where it is used.
 *
 * Every file lives in `public/images/` and is a free-licence laboratory
 * photograph (CC0, public domain, or CC-BY/BY-SA with attribution recorded in
 * `public/images/credits.json` and the site README). One record per image so
 * the `alt` text is written once and never drifts from the file.
 *
 * When NSRL supplies its own photography of the units, vivarium and
 * instruments, replace the `src` values here — no component changes needed.
 */
export type SiteImage = { src: string; alt: string };

export const images = {
  microscope: {
    src: "/images/microscope-1.jpg",
    alt: "Compound microscope objective turret over a specimen stage",
  },
  microscopeDark: {
    src: "/images/microscope-2.jpg",
    alt: "Microscope eyepieces and objectives in a research laboratory",
  },
  chemistryBench: {
    src: "/images/chemistry-w1.jpg",
    alt: "A row of high-performance liquid chromatography instruments on an analytical bench",
  },
  scientistVials: {
    src: "/images/chemistry-2.jpg",
    alt: "A scientist in a laboratory holding a tray of sample vials",
  },
  scientistFlask: {
    src: "/images/glassware-2.jpg",
    alt: "A scientist in safety glasses examining a laboratory flask",
  },
  pipetting: {
    src: "/images/pipette-1.jpg",
    alt: "A gloved researcher pipetting a sample into a microplate",
  },
  petri: {
    src: "/images/petri-1.jpg",
    alt: "A bacterial culture growing on a petri dish against a dark background",
  },
  cleanroom: {
    src: "/images/cleanroom-w2.jpg",
    alt: "A technician working at a Class II biological safety cabinet",
  },
  greenhouse: {
    src: "/images/greenhouse-1.jpg",
    alt: "Plant seedlings raised in trays at a research nursery",
  },
  vials: {
    src: "/images/pharma-w2.jpg",
    alt: "A tray of labelled pharmaceutical injection ampoules",
  },
  notebook: {
    src: "/images/documents-w3.jpg",
    alt: "An open handwritten laboratory record book with calculations",
  },
  team: {
    src: "/images/team-1.jpg",
    alt: "Two scientists working together at laboratory instrumentation",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

/**
 * The photograph shown on each division page, by slug. Chosen for subject
 * relevance; every division resolves to a real image, none repeats awkwardly.
 */
export const divisionImage: Record<string, ImageKey> = {
  toxicology: "scientistVials",
  "genetic-toxicology": "pipetting",
  ecotoxicology: "greenhouse",
  "safety-pharmacology": "vials",
  pathology: "microscopeDark",
  chemistry: "chemistryBench",
  "pharmacology-drug-discovery": "scientistFlask",
  microbiology: "petri",
  "radioisotope-laboratory": "cleanroom",
  entomology: "greenhouse",
  "medical-device-testing": "cleanroom",
  vivarium: "team",
  "custom-studies": "chemistryBench",
};

/** The five sector pages, by slug. */
export const sectorImage: Record<string, ImageKey> = {
  agrochemical: "greenhouse",
  pharmaceutical: "vials",
  "medical-devices": "cleanroom",
  "industrial-chemicals": "chemistryBench",
  "food-and-feed-additives": "petri",
};

/** Resolve a slug to its image, falling back to the analytical bench so an
    unmapped slug degrades to a real photo rather than crashing the render. */
export function imageFor(map: Record<string, ImageKey>, slug: string): SiteImage {
  return images[map[slug] ?? "chemistryBench"];
}
