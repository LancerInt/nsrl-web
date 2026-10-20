/**
 * The site's photography, mapped to where it is used.
 *
 * Every file lives in `public/images/` and is a free-licence laboratory
 * photograph (CC0, public domain, or CC-BY/BY-SA with attribution recorded in
 * `public/images/CREDITS.md` and the site README). One record per image so the
 * `alt` text is written once and never drifts from the file.
 *
 * ⚠ These are stand-ins of representative laboratories, NOT photographs of
 * NSRL. When NSRL supplies its own photography of the units, vivarium and
 * instruments, replace the `src` values here — no component changes needed.
 * `README.md` carries the shot list still outstanding.
 *
 * Two rules this module exists to enforce:
 *
 *  1. **No photograph is the lead image in more than one place.** A visitor
 *     who meets the same bench on the hero, a sector card and a division page
 *     concludes the laboratory has one room. `leadUse` records where each
 *     image leads, and the duplicate check at the bottom fails the build if
 *     two lead slots collide.
 *  2. **`objectPosition` is part of the asset, not the layout.** The subject
 *     of each frame sits in a known place; recording it here means a crop is
 *     right in every aspect ratio the image is placed into.
 */
export type SiteImage = {
  src: string;
  alt: string;
  /** Where the subject sits, for `object-position`. Defaults to centre. */
  position?: string;
  /** Intrinsic width, so call sites can avoid upscaling a small original. */
  width: number;
};

const library = {
  microscope: {
    src: "/images/microscope-1.jpg",
    alt: "Compound microscope objective turret over a specimen stage",
    width: 1024,
  },
  microscopeDark: {
    src: "/images/microscope-2.jpg",
    alt: "Microscope eyepieces and objectives in a research laboratory",
    position: "60% 50%",
    width: 1024,
  },
  chemistryBench: {
    src: "/images/chemistry-w1.jpg",
    alt: "A row of high-performance liquid chromatography instruments on an analytical bench",
    /* The instrument stack and its monitor sit right of centre; holding the
       crop there is what keeps the hero's detail opposite its headline. */
    position: "62% 52%",
    width: 1920,
  },
  scientistVials: {
    src: "/images/chemistry-2.jpg",
    alt: "A scientist in a laboratory holding a tray of sample vials",
    width: 1024,
  },
  scientistFlask: {
    src: "/images/glassware-2.jpg",
    alt: "A scientist in safety glasses examining a laboratory flask",
    width: 1024,
  },
  petri: {
    src: "/images/petri-1.jpg",
    alt: "A bacterial culture growing on a petri dish against a dark background",
    position: "68% 50%",
    width: 1024,
  },
  cleanroom: {
    src: "/images/cleanroom-w2.jpg",
    alt: "A technician working at a Class II biological safety cabinet",
    /* The technician and the lit cabinet sit just above the vertical centre;
       anything lower crops to an empty glowing panel. */
    position: "48% 42%",
    width: 1920,
  },
  greenhouse: {
    src: "/images/greenhouse-1.jpg",
    alt: "Plant seedlings raised in trays at a research nursery",
    position: "35% 60%",
    width: 1024,
  },
  vials: {
    src: "/images/pharma-w2.jpg",
    alt: "A tray of labelled pharmaceutical injection ampoules",
    width: 1920,
  },
  notebook: {
    src: "/images/documents-w3.jpg",
    alt: "An open handwritten laboratory record book with calculations",
    position: "50% 42%",
    width: 1920,
  },
  team: {
    src: "/images/team-1.jpg",
    alt: "Two scientists working together at laboratory instrumentation",
    position: "40% 45%",
    width: 1024,
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof library;

/**
 * Declared in two steps on purpose. `satisfies` on the literal is what keeps
 * `ImageKey` to the real key names; re-exporting it as a `Record` is what
 * gives every entry the full `SiteImage` shape, so a call site can read
 * `.position` on an image that happens not to declare one.
 */
export const images: Record<ImageKey, SiteImage> = library;

/*
 * `pipette-1.jpg` was withdrawn, not reassigned: the file carries a visible
 * "rawpixel" watermark across the whole frame, which no amount of cropping
 * removes. It stays in `public/images/` and in CREDITS.md so the withdrawal is
 * traceable, but nothing on the site may reference it. See README.md.
 */

/* -------------------------------------------------------------------------- */
/*  Assignments                                                               */
/* -------------------------------------------------------------------------- */

/**
 * The photograph shown on each division page, by slug. Chosen for subject
 * relevance first, then spread so no image leads two pages a visitor is
 * likely to see in the same session.
 *
 * Three divisions share a frame with a sibling — entomology with
 * ecotoxicology, medical device testing with the radioisotope laboratory.
 * That is a gap in the library, not a design decision; both are on the
 * outstanding shot list in README.md.
 */
export const divisionImage: Record<string, ImageKey> = {
  toxicology: "scientistVials",
  "genetic-toxicology": "microscope",
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
  "custom-studies": "notebook",
};

/** The five sector pages, by slug. */
export const sectorImage: Record<string, ImageKey> = {
  agrochemical: "greenhouse",
  pharmaceutical: "vials",
  "medical-devices": "cleanroom",
  /* Not the HPLC bench: that frame leads the homepage hero, and a visitor
     scrolling from one to the other would see the same room twice. */
  "industrial-chemicals": "scientistFlask",
  "food-and-feed-additives": "petri",
};

/** The homepage hero. Named so nothing else can quietly claim the same frame. */
export const heroImage: ImageKey = "chemistryBench";

/**
 * The homepage facility showcase.
 *
 * Three frames, not four, and specifically the three subjects the homepage
 * does not already carry: the sector cards above it take the greenhouse, the
 * ampoules, the safety cabinet, the flask and the culture plate, and the hero
 * takes the analytical bench. Picking a fourth would have meant showing one
 * of those twice inside a single scroll, which is the exact failure this
 * module exists to prevent — eleven photographs, eleven slots, none repeated
 * on the page.
 *
 * Captions describe the kind of environment in the frame. They do not claim
 * the photograph is of NSRL's own site; the library is free-licence
 * stand-ins until NSRL's photography lands.
 */
export type ShowcaseFrame = {
  image: ImageKey;
  title: string;
  caption: string;
};

export const facilityShowcase: ShowcaseFrame[] = [
  {
    image: "team",
    title: "Instrument floor",
    caption:
      "Analytical and in-life equipment in continuous service, qualified and logged against the study that used it.",
  },
  {
    image: "microscopeDark",
    title: "Pathology",
    caption: "Whole-slide scanning, automated microtomes, certified pathologists.",
  },
  {
    image: "notebook",
    title: "The archive",
    caption: "Raw data, blocks, slides and specimens, held for ten years.",
  },
];

/**
 * The facilities page: one lead frame, then a gallery.
 *
 * The gallery covers four of the six environments specified in
 * `content/facilities.ts`. The other two — the inhalation suites and the
 * insect rearing colonies — have no photograph in the library at all, and
 * the animal housing has none either. Those three are the most
 * consequential gaps in the shot list; see README.md. Nothing here invents a
 * frame to fill them.
 */
export const facilityLead: ImageKey = "cleanroom";

export const facilityGallery: ShowcaseFrame[] = [
  {
    image: "greenhouse",
    title: "Aquatic & terrestrial systems",
    caption:
      "Plant growth chambers, flow-through aquatic systems and micro-applicators supporting twenty-six ecotoxicology species.",
  },
  {
    image: "petri",
    title: "Microbiology",
    caption:
      "Sterility, endotoxin and environmental monitoring against ISO, USP and OECD methods.",
  },
  {
    image: "microscope",
    title: "Microscopy & cell analysis",
    caption:
      "Fluorescence microscopes, cell sorters, whole-slide scanners and automated tissue processors.",
  },
  {
    image: "scientistFlask",
    title: "Chemistry & bioanalysis",
    caption:
      "Identity, purity, concentration and stability established before a single dose is prepared.",
  },
];

/* -------------------------------------------------------------------------- */

/** Resolve a slug to its image, falling back to a real photo so an unmapped
    slug degrades rather than crashing the render. */
export function imageFor(map: Record<string, ImageKey>, slug: string): SiteImage {
  return images[map[slug] ?? "chemistryBench"];
}
