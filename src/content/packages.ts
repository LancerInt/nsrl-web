/**
 * Study packages.
 *
 * Each package is an assembly of studies the laboratory already lists as
 * individual capabilities, grouped by the submission they support. Nothing
 * here is a new capability claim — it is the existing catalogue, arranged the
 * way a regulatory affairs team actually buys it.
 */

export type StudyPackage = {
  slug: string;
  index: string;
  name: string;
  audience: string;
  summary: string;
  body: string;
  /** Frameworks the package is assembled against. */
  frameworks: string[];
  /** Discipline slugs that execute the package. */
  divisions: string[];
  /** The studies included, grouped as they appear in a protocol schedule. */
  includes: { title: string; items: string[] }[];
  featured?: boolean;
};

export const studyPackages: StudyPackage[] = [
  {
    slug: "agrochemical-registration",
    index: "01",
    name: "Agrochemical Registration Dossier",
    audience: "Crop protection & fertiliser registrants",
    summary:
      "Ecotoxicity, residue, environmental fate and efficacy assembled as one submission",
    body: "Built for registrants filing into several jurisdictions at once. Aquatic, terrestrial and avian ecotoxicity run alongside residue analysis, environmental fate and field efficacy, assembled as one body of evidence rather than a stack of unrelated studies.",
    frameworks: ["OECD", "CIBRC", "EPA", "EFSA"],
    divisions: ["ecotoxicology", "chemistry", "entomology", "toxicology"],
    includes: [
      {
        title: "Aquatic ecotoxicity",
        items: [
          "Fish acute toxicity (OECD 203)",
          "Daphnia acute immobilisation (OECD 202)",
          "Daphnia reproduction (OECD 211)",
          "Algal growth inhibition (OECD 201)",
          "Bioaccumulation in fish (OECD 305)",
        ],
      },
      {
        title: "Terrestrial ecotoxicity",
        items: [
          "Earthworm acute toxicity (OECD 207)",
          "Earthworm reproduction (OECD 222)",
          "Honeybee toxicity (OECD 213)",
          "Terrestrial plant seedling growth (OECD 208)",
          "OECD 218",
          "Avian oral toxicity",
        ],
      },
      {
        title: "Environmental fate",
        items: [
          "Ready biodegradability (OECD 301)",
          "Aerobic and anaerobic soil transformation (OECD 307)",
          "Adsorption/desorption batch equilibrium (OECD 106)",
          "Adsorption coefficient by HPLC (OECD 121)",
          "Photodegradation, leaching and volatility",
        ],
      },
      {
        title: "Residue & metabolism",
        items: [
          "Pesticide residue analysis in crops and soil",
          "Multi-residue analytical method development",
          "Plant metabolism pathway identification",
          "Metabolite profiling and identification",
        ],
      },
      {
        title: "Efficacy & crop safety",
        items: [
          "Field efficacy trials",
          "Crop tolerance studies",
          "Phytotoxicity assessment",
          "Seed germination and seedling emergence",
        ],
      },
    ],
    featured: true,
  },

  {
    slug: "reach-compliance",
    index: "02",
    name: "REACH & Chemical Compliance",
    audience: "Industrial chemical manufacturers & importers",
    summary:
      "Physicochemical, toxicological and environmental data for multi-market declarations",
    body: "One evidence base supporting REACH, RoHS, CLP, GHS and California Proposition 65 declarations, including the specialist testing — Chromium VI, SVHC, packaging compatibility — that generic packages leave out.",
    frameworks: ["REACH", "RoHS", "CLP", "GHS", "California Proposition 65", "SVHC", "CE"],
    divisions: ["chemistry", "toxicology", "ecotoxicology"],
    includes: [
      {
        title: "Physicochemical",
        items: [
          "Chemical characterisation and identification",
          "Physicochemical property determination",
          "Stability and shelf life",
          "Packaging and container compatibility",
          "Transport worthiness",
        ],
      },
      {
        title: "Human health",
        items: [
          "Acute toxicity",
          "Skin and eye irritation / serious damage",
          "Skin sensitisation",
          "Subacute, subchronic and chronic toxicity",
          "Developmental and reproductive toxicity",
          "Endocrine disruptor screening",
          "Carcinogenicity",
        ],
      },
      {
        title: "Environmental",
        items: [
          "Biodegradation",
          "Bioaccumulation potential",
          "Adsorption, desorption and mobility",
          "Aquatic and terrestrial toxicity",
          "Environmental risk assessment",
        ],
      },
      {
        title: "Specialist declarations",
        items: [
          "Chromium VI testing",
          "SVHC declarations",
          "CE label support",
          "Occupational exposure assessment",
        ],
      },
    ],
  },

  {
    slug: "food-safety-panel",
    index: "03",
    name: "Food & Feed Safety Panel",
    audience: "Food, feed & nutraceutical manufacturers",
    summary:
      "Nutrition, microbiology, allergens, contaminants and shelf-life in one panel",
    body: "Release-and-label testing for additives and finished products, extended with the toxicological and stability work that a new additive approval requires.",
    frameworks: ["GLP", "FSSAI", "Codex", "ISO"],
    divisions: ["chemistry", "microbiology", "toxicology"],
    includes: [
      {
        title: "Nutritional analysis",
        items: [
          "Proximate analysis — moisture, ash, fat, protein, carbohydrate",
          "Vitamin and mineral content",
          "Dietary fibre",
          "Fatty acid profile",
          "Caloric value",
        ],
      },
      {
        title: "Microbiology",
        items: [
          "Total viable count",
          "Pathogen detection — Salmonella, E. coli, Listeria",
          "Yeast and mould count",
          "Coliform and Enterobacteriaceae count",
        ],
      },
      {
        title: "Allergens & contaminants",
        items: [
          "Allergen-specific ELISA and PCR",
          "Gluten testing",
          "Mycotoxins — aflatoxins, ochratoxin",
          "Heavy metals — lead, mercury, cadmium, arsenic",
          "Pesticide and veterinary drug residues",
          "PAH analysis",
          "Gamma radiation level measurement",
        ],
      },
      {
        title: "Stability & shelf life",
        items: [
          "Microbiological stability",
          "Oxidative stability",
          "Nutrient degradation",
          "Sensory and organoleptic evaluation",
          "Temperature and light stress testing",
          "Packaging integrity",
        ],
      },
    ],
  },
];

export function getPackage(slug: string) {
  return studyPackages.find((p) => p.slug === slug);
}
