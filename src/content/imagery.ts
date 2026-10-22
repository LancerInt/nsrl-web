/**
 * The site's artwork, mapped one record per placement.
 *
 * Two sets live here, and the difference matters:
 *
 * - **Editorial stills** from the redesign kit
 *   (`assets/NSRL_Redesign_Kit/`), served from `public/images/editorial/`.
 *   Warm-white staged still lifes: the homepage hero, Toxicology and
 *   Ecotoxicology. Three files, and the manifest marks them DELIVERED.
 * - **Conceptual illustrations** commissioned earlier
 *   (`assets/NSRL-All-29-Image-Replacements/`), served from
 *   `public/images/nsrl/`, holding every slot the kit marks PROMPT ONLY or
 *   REAL PHOTO NEEDED.
 *
 * ── What these images are ──────────────────────────────────────────────
 *
 * All of them are **conceptual**. None is a photograph, and nothing on the
 * site may caption one as a photograph of NSRL's premises, staff,
 * equipment, certificates or results. `kind` below is what makes that
 * enforceable rather than a convention: a frame can read it and decide for
 * itself whether a visible label is required, instead of every call site
 * having to remember. The day a verified NSRL photograph arrives, it is
 * entered as `kind: "photograph"` and the label disappears on its own.
 *
 * The kit's note, worth keeping: artwork does not document NSRL premises,
 * real equipment, clinical data or test outcomes. The earlier supplier's:
 * "Review all species and method depictions with the scientific owner."
 *
 * ── Conventions ────────────────────────────────────────────────────────
 *
 * `width`/`height` are the delivered export dimensions — the real ones. The
 * kit is explicit that its bitmaps are 1672×941 and 1122×1402, have not
 * been upscaled, and must not be relabelled as larger masters. A call site
 * reads these to pick `sizes` and to avoid asking a 1122px file to fill
 * 1600px.
 *
 * `position` is set only where the subject is off-centre and a crop would
 * otherwise cut it.
 */
export type SiteImage = {
  src: string;
  alt: string;
  /** Delivered export width in pixels. The real one — never a target. */
  width: number;
  /** Delivered export height in pixels. */
  height: number;
  /** `object-position`, where the subject is not centred. */
  position?: string;
  /**
   * What the viewer is actually looking at.
   *
   * `editorial` and `illustration` are both conceptual and both require a
   * visible label wherever the surrounding copy could be read as a claim
   * about NSRL's premises or equipment. `photograph` is reserved for
   * verified NSRL photography and is currently unused — see
   * ASSET_MANIFEST.csv for the slots waiting on it.
   */
  kind: "editorial" | "illustration" | "photograph";
};

const nsrl = (file: string) => `/images/nsrl/${file}`;
const editorial = (file: string) => `/images/editorial/${file}`;

const library = {
  /* ── Homepage ─────────────────────────────────────────────────────── */
  homeHero: {
    src: editorial("hero-editorial.webp"),
    alt: "Still life on a warm white bench: a labelled amber sample bottle beside a rack of capped clear vials, a shallow glass dish holding seed and a single leaf, in daylight.",
    /* 1672×941, the delivered size. The kit's manifest names 2560×1440 as a
       preferred future master and is explicit that no such file was
       supplied, so this is what the frame is allowed to assume. */
    width: 1672,
    height: 941,
    /* The composition keeps its left third nearly empty and groups the
       focal objects right of centre. Holding the crop there is what
       protects them as the frame narrows; the empty third is for the
       headline on a desktop, and is cropped away on a phone where the
       artwork sits under the copy instead of behind it. */
    position: "72% 50%",
  },
  homeAgrochemical: {
    src: nsrl("home-agrochemical.webp"),
    alt: "NSRL illustration: seedlings rooted in glass cylinders on a dark laboratory bench, with a microscope and sample vials behind.",
    width: 1600,
    height: 1000,
  },
  homeIndustrialChemicals: {
    src: nsrl("home-industrial-chemicals.webp"),
    alt: "NSRL illustration: an amber reagent bottle, a glass prism splitting light and graduated vessels arranged on a dark bench beside an analytical balance.",
    width: 1600,
    height: 1000,
  },
  homeFoodFeed: {
    src: nsrl("home-food-feed.webp"),
    alt: "NSRL illustration: dishes of cereal grain, feed pellets, white powder and amber oil set around a sample vial marked NSRL.",
    width: 1600,
    height: 1000,
  },
  homeIntegratedResearch: {
    src: nsrl("home-integrated-research.webp"),
    alt: "NSRL illustration: eight glass spheres holding different specimens — a seedling, a culture dish, a flask, a sample plate — linked by teal filaments to one central module.",
    width: 1200,
    height: 1910,
  },
  homeInstrumentOperation: {
    src: nsrl("home-instrument-operation.webp"),
    alt: "NSRL illustration: an automated analytical instrument with a carousel of sample vials beneath a sampling head.",
    width: 1600,
    height: 1336,
  },
  homeContainment: {
    src: nsrl("home-containment.webp"),
    alt: "NSRL illustration: a glass-fronted containment cabinet lit from within, holding sample plates and pipettes on a stainless deck.",
    width: 1964,
    height: 896,
  },
  homeMicroscopy: {
    src: nsrl("home-microscopy.webp"),
    alt: "NSRL illustration: a microscope objective above a stage-mounted culture dish, beside a magnified circular field of stained cells.",
    width: 1964,
    height: 936,
  },

  /* ── Downloads ────────────────────────────────────────────────────── */
  downloadsEvidence: {
    src: nsrl("downloads-evidence.webp"),
    alt: "NSRL illustration: a stack of documents under a magnifier on a pale surface, with a single sample vial beside it.",
    width: 1200,
    height: 1600,
  },

  /* ── Facilities ───────────────────────────────────────────────────── */
  facilitiesOverview: {
    src: nsrl("facilities-overview.webp"),
    alt: "NSRL illustration: a cutaway model of a single laboratory site, its glass-walled units lit in teal and set out side by side on one base marked NSRL.",
    width: 2400,
    height: 1350,
  },
  facilitiesIntegratedSite: {
    src: nsrl("facilities-integrated-site.webp"),
    alt: "NSRL illustration: a stacked rack of glass laboratory modules, each tier holding sample trays and culture plates under teal light.",
    width: 1200,
    height: 1684,
  },
  facilitiesEcotoxicology: {
    src: nsrl("facilities-ecotoxicology.webp"),
    alt: "NSRL illustration: a planted aquatic test tank linked by tubing to a sealed terrestrial growth chamber on a laboratory bench.",
    width: 1800,
    height: 1200,
  },
  facilitiesMicrobiology: {
    src: nsrl("facilities-microbiology.webp"),
    alt: "NSRL illustration: culture dishes and a microplate laid out on the stainless deck of a glass-fronted containment cabinet.",
    width: 1800,
    height: 1200,
  },
  facilitiesMicroscopy: {
    src: nsrl("facilities-microscopy.webp"),
    alt: "NSRL illustration: a microscope objective and a row of optical lenses resolving into a magnified circular field of stained cells.",
    width: 1800,
    height: 1200,
  },
  facilitiesChemistry: {
    src: nsrl("facilities-chemistry.webp"),
    alt: "NSRL illustration: a bank of sample vials beneath an automated dispensing arm, beside glass reservoir bottles on a dark bench.",
    width: 1800,
    height: 1200,
  },

  /* ── Newsroom ─────────────────────────────────────────────────────── */
  newsResearch: {
    src: nsrl("news-research.webp"),
    alt: "NSRL illustration: a navy bound notebook, a magnifying lens, a microscope slide and an amber vial arranged on a pale surface.",
    width: 1200,
    height: 1500,
  },

  /* ── Study packages ───────────────────────────────────────────────── */
  studyPackages: {
    src: nsrl("study-packages.webp"),
    alt: "NSRL illustration: three lit glass trays on one base marked NSRL, holding a seedling in soil, an amber liquid sample and a dish of grain.",
    width: 1600,
    height: 1000,
  },

  /* ── Division pages ───────────────────────────────────────────────── */
  divisionChemistry: {
    src: nsrl("division-chemistry.webp"),
    alt: "NSRL illustration: an analytical instrument tracing a chromatogram on screen, above a carousel of sample vials.",
    width: 1200,
    height: 1500,
  },
  divisionCustomStudies: {
    src: nsrl("division-custom-studies.webp"),
    alt: "NSRL illustration: modular glass blocks holding different sample formats, assembled into one configurable stack.",
    width: 1200,
    height: 1500,
  },
  divisionEcotoxicology: {
    src: editorial("ecotoxicology-editorial.webp"),
    /* The kit is specific that this depicts two separate research themes
       side by side — aquatic and terrestrial — and is not a study protocol
       in which one feeds the other. The alt text is written to match. */
    alt: "Still life on a warm white bench: a glass tank of water holding two small fish, beside a separate glass box of soil with a rooted seedling, a pipette and a sample pot in front.",
    width: 1122,
    height: 1402,
  },
  divisionEntomology: {
    src: nsrl("division-entomology.webp"),
    alt: "NSRL illustration: a ventilated observation chamber holding leaf sections, beneath a stereo microscope.",
    width: 1200,
    height: 1500,
  },
  divisionMicrobiology: {
    src: nsrl("division-microbiology.webp"),
    alt: "NSRL illustration: a culture dish and a rack of tubes inside a glass containment enclosure, with a pipette above.",
    width: 1200,
    height: 1500,
  },
  divisionToxicology: {
    src: editorial("toxicology-editorial.webp"),
    alt: "Still life on a warm white bench: a light microscope with a stained tissue section on the stage, two further stained slides on a ceramic tray, an amber vial, and an enlarged view of the section alongside.",
    width: 1122,
    height: 1402,
  },
  divisionVivarium: {
    src: nsrl("division-vivarium.webp"),
    alt: "NSRL illustration: a glass-walled animal enclosure with bedding, shelter and a water bottle, on a base marked NSRL.",
    width: 1200,
    height: 1500,
  },

  /* ── Services ─────────────────────────────────────────────────────── */
  servicesIntegrated: {
    src: nsrl("services-integrated.webp"),
    alt: "NSRL illustration: a seedling under glass on a circular base marked NSRL, with dishes of grain, powder and seed set around it.",
    width: 1600,
    height: 1200,
  },
  serviceAgrochemical: {
    src: nsrl("service-agrochemical.webp"),
    alt: "NSRL illustration: a row of seedlings rooted in glass cylinders above visible soil layers, flanked by flasks and a dosing vial.",
    width: 1600,
    height: 1200,
  },
  serviceFoodFeed: {
    src: nsrl("service-food-feed.webp"),
    alt: "NSRL illustration: wheat ears, feed pellets, a dish of white powder and a bowl of amber oil beside a sample vial marked NSRL.",
    width: 1600,
    height: 1200,
  },
  serviceIndustrialChemicals: {
    src: nsrl("service-industrial-chemicals.webp"),
    alt: "NSRL illustration: an amber reagent vial and graduated glassware before an instrument screen showing a spectral trace.",
    width: 1600,
    height: 1200,
  },
} satisfies Record<string, Omit<SiteImage, "kind">>;

export type ImageKey = keyof typeof library;

/**
 * Declared in two steps on purpose. `satisfies` on the literal is what keeps
 * `ImageKey` to the real key names; re-exporting it as a `Record` is what
 * gives every entry the full `SiteImage` shape, so a call site can read
 * `.position` on an image that happens not to declare one.
 *
 * `kind` is derived from the path rather than written out per entry. Written
 * by hand it would be twenty-eight copies of one fact, and the copy that
 * drifts is the one that matters: an illustration mislabelled `photograph`
 * silently drops the visible conceptual caption. Derivation cannot drift —
 * a file either lives in the editorial directory or it does not. When
 * verified NSRL photography arrives it gets its own directory and its own
 * branch here, and every frame serving it stops captioning itself.
 */
export const images: Record<ImageKey, SiteImage> = Object.fromEntries(
  Object.entries(library).map(([key, image]) => [
    key,
    { ...image, kind: image.src.startsWith("/images/editorial/") ? "editorial" : "illustration" },
  ]),
) as Record<ImageKey, SiteImage>;

/** True for anything the site must visibly label as not a photograph. */
export function isConceptual(image: SiteImage): boolean {
  return image.kind !== "photograph";
}

/* -------------------------------------------------------------------------- */
/*  Placements                                                                */
/* -------------------------------------------------------------------------- */

/** The homepage hero. */
export const heroImage: ImageKey = "homeHero";

/**
 * The sector cards on the homepage and the heroes on the sector pages are
 * **different images of the same sector**, which is why these are two maps
 * and not one. The card is a 16:10 landscape read at a glance in a grid; the
 * page hero is a 4:3 aside read beside the scope copy. Sharing one file
 * between them was the single most visible repetition on the old site.
 */
export const sectorCardImage: Record<string, ImageKey> = {
  agrochemical: "homeAgrochemical",
  "industrial-chemicals": "homeIndustrialChemicals",
  "food-and-feed-additives": "homeFoodFeed",
};

export const sectorPageImage: Record<string, ImageKey> = {
  agrochemical: "serviceAgrochemical",
  "industrial-chemicals": "serviceIndustrialChemicals",
  "food-and-feed-additives": "serviceFoodFeed",
};

/** The photograph shown on each division page, by slug. One each. */
export const divisionImage: Record<string, ImageKey> = {
  toxicology: "divisionToxicology",
  ecotoxicology: "divisionEcotoxicology",
  chemistry: "divisionChemistry",
  microbiology: "divisionMicrobiology",
  entomology: "divisionEntomology",
  vivarium: "divisionVivarium",
  "custom-studies": "divisionCustomStudies",
};

/** Single-slot placements, named so a call site never guesses. */
export const downloadsImage: ImageKey = "downloadsEvidence";
export const newsImage: ImageKey = "newsResearch";
export const studyPackagesImage: ImageKey = "studyPackages";
export const servicesOverviewImage: ImageKey = "servicesIntegrated";

/* -------------------------------------------------------------------------- */

export type ShowcaseFrame = {
  image: ImageKey;
  title: string;
  caption: string;
};

/**
 * The homepage facility showcase: one lead frame and two stacked beside it.
 *
 * Captions describe the activity, not a room. These are illustrations, and
 * naming a room would be the point at which an illustration became a false
 * statement about the site.
 */
export const facilityShowcase: ShowcaseFrame[] = [
  {
    image: "homeInstrumentOperation",
    title: "Instrument operation",
    caption:
      "Every instrument qualified, calibrated and logged against the study that used it.",
  },
  {
    image: "homeContainment",
    title: "Containment work",
    caption: "Clean-room procedures under continuous environmental monitoring.",
  },
  {
    image: "homeMicroscopy",
    title: "Microscopy",
    caption: "Optical examination and whole-slide scanning.",
  },
];

/**
 * The facilities page: one lead frame, the integrated-site portrait inside
 * the unit walk, then a gallery of four environments.
 *
 * The gallery covers four of the five environments specified in
 * `content/facilities.ts`; the inhalation suites have no illustration in the
 * set. See README.md.
 */
export const facilityLead: ImageKey = "facilitiesOverview";
export const facilityUnitImage: ImageKey = "facilitiesIntegratedSite";

export const facilityGallery: ShowcaseFrame[] = [
  {
    image: "facilitiesEcotoxicology",
    title: "Aquatic & terrestrial systems",
    caption:
      "Plant growth chambers, flow-through aquatic systems and micro-applicators supporting twenty-six ecotoxicology species.",
  },
  {
    image: "facilitiesMicrobiology",
    title: "Microbiology",
    caption:
      "Sterility, endotoxin and environmental monitoring against ISO, USP and OECD methods.",
  },
  {
    image: "facilitiesMicroscopy",
    title: "Microscopy & cell analysis",
    caption:
      "Fluorescence microscopes, cell sorters, whole-slide scanners and automated tissue processors.",
  },
  {
    image: "facilitiesChemistry",
    title: "Chemistry & bioanalysis",
    caption:
      "Identity, purity, concentration and stability established before a single dose is prepared.",
  },
];

/* -------------------------------------------------------------------------- */

/** Resolve a slug to its image, falling back to the hero so an unmapped slug
    degrades to real artwork rather than crashing the render. */
export function imageFor(map: Record<string, ImageKey>, slug: string): SiteImage {
  return images[map[slug] ?? heroImage];
}
