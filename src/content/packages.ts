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
    body: "Built for registrants filing into several jurisdictions at once. Aquatic, terrestrial and avian ecotoxicity run alongside residue analysis and environmental fate, with radiolabelled metabolism work available where indirect evidence will not be accepted.",
    frameworks: ["OECD", "CIBRC", "EPA", "EFSA", "SENASA", "SENAVE"],
    divisions: ["ecotoxicology", "chemistry", "radioisotope-laboratory", "entomology", "toxicology"],
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
          "Radiolabelled tracer studies",
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
    slug: "genotoxicity-battery",
    index: "02",
    name: "Standard Genotoxicity Battery",
    audience: "Pharmaceutical, chemical & device sponsors",
    summary:
      "The three-test regulatory core, with mechanistic follow-up when a result turns positive",
    body: "The battery regulators expect, run under OECD GLP by a division whose reports the FDA and EMA have already accepted. Where a test returns positive, the mechanistic follow-up needed to interpret it is available in the same laboratory rather than after a three-month vendor search.",
    frameworks: ["OECD 471", "OECD 473", "OECD 474", "OECD 476", "OECD 487", "ICH S2(R1)"],
    divisions: ["genetic-toxicology", "microbiology", "pathology"],
    includes: [
      {
        title: "Core battery",
        items: [
          "Bacterial reverse mutation — Ames test (OECD 471)",
          "In vitro chromosome aberration test (OECD 473)",
          "In vitro micronucleus test (OECD 487)",
          "In vivo micronucleus assay (OECD 474)",
          "Mammalian cell gene mutation assay (OECD 476)",
        ],
      },
      {
        title: "Mechanistic follow-up",
        items: [
          "In vivo comet assay",
          "Mouse lymphoma assay",
          "Unscheduled DNA synthesis (UDS) assay",
          "Sister chromatid exchange assay",
          "DNA adduct formation analysis",
          "DNA repair assays",
        ],
      },
      {
        title: "Predictive & in silico",
        items: [
          "Structure–activity relationship (SAR) analysis",
          "QSAR modelling",
          "Gene expression profiling",
          "Cytogenetic analysis (karyotyping)",
        ],
      },
    ],
    featured: true,
  },

  {
    slug: "device-biocompatibility",
    index: "03",
    name: "Device Biocompatibility Programme",
    audience: "Medical device manufacturers",
    summary:
      "ISO 10993 biological evaluation scaled to device class and contact duration",
    body: "Scoped from the device's contact category and duration rather than from a fixed test list, so a surface-contact device is not paying for implantation work it does not need. Blood-contacting devices add the full hemocompatibility suite.",
    frameworks: ["ISO 10993", "ASTM", "US FDA", "EU MDR", "CDSCO"],
    divisions: ["medical-device-testing", "microbiology", "chemistry", "pathology"],
    includes: [
      {
        title: "Biological evaluation",
        items: [
          "Cytotoxicity",
          "Sensitisation",
          "Irritation and intracutaneous reactivity",
          "Systemic toxicity",
          "Genotoxicity",
          "Implantation — rodents, rabbits, mini-pigs",
        ],
      },
      {
        title: "Blood contact",
        items: [
          "Haemolysis",
          "Coagulation",
          "Platelet activation",
          "Complement activation",
        ],
      },
      {
        title: "Chemical characterisation",
        items: [
          "Extractables testing",
          "Leachables testing",
          "Material characterisation",
          "Container closure systems testing",
          "Toxicological risk assessment",
        ],
      },
      {
        title: "Sterility & lifetime",
        items: [
          "Bioburden determination",
          "Sterility assurance testing",
          "Bacterial endotoxin testing",
          "EO and steam sterilisation validation",
          "Accelerated ageing and shelf-life",
          "Package integrity testing",
        ],
      },
    ],
    featured: true,
  },

  {
    slug: "ind-enabling-safety",
    index: "04",
    name: "IND-Enabling Safety Package",
    audience: "Pharmaceutical & biotech developers",
    summary:
      "Repeat-dose toxicology, safety pharmacology core battery, genotoxicity and toxicokinetics",
    body: "The evidence a first-in-human application rests on, generated inside one laboratory so that toxicokinetic sampling, pathology and bioanalysis are not three separate schedules trying to meet.",
    frameworks: ["OECD GLP", "ICH M3(R2)", "ICH S7A", "US FDA", "EMA", "CDSCO"],
    divisions: [
      "toxicology",
      "safety-pharmacology",
      "genetic-toxicology",
      "pathology",
      "chemistry",
      "pharmacology-drug-discovery",
    ],
    includes: [
      {
        title: "Repeat-dose toxicology",
        items: [
          "Subchronic and chronic toxicity",
          "NOEL and NOAEL determination",
          "Rodent and non-rodent species",
          "Histopathological examination",
        ],
      },
      {
        title: "Safety pharmacology core battery",
        items: [
          "Cardiovascular — telemetry, ECG, blood pressure",
          "hERG screening",
          "Central nervous system — functional observational battery",
          "Respiratory — pulmonary function assessment",
        ],
      },
      {
        title: "Genotoxicity",
        items: [
          "Ames test",
          "In vitro chromosome aberration or micronucleus",
          "In vivo micronucleus assay",
        ],
      },
      {
        title: "Toxicokinetics & bioanalysis",
        items: [
          "Bioanalytical method development and validation",
          "Plasma protein binding",
          "Metabolite identification",
          "Tissue distribution studies",
          "Pharmacokinetic modelling and simulation",
        ],
      },
    ],
  },

  {
    slug: "reach-compliance",
    index: "05",
    name: "REACH & Chemical Compliance",
    audience: "Industrial chemical manufacturers & importers",
    summary:
      "Physicochemical, toxicological and environmental data for multi-market declarations",
    body: "One evidence base supporting REACH, RoHS, CLP, GHS and California Proposition 65 declarations, including the specialist testing — Chromium VI, SVHC, packaging compatibility — that generic packages leave out.",
    frameworks: ["REACH", "RoHS", "CLP", "GHS", "California Proposition 65", "SVHC", "CE"],
    divisions: ["chemistry", "toxicology", "genetic-toxicology", "ecotoxicology"],
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
    index: "06",
    name: "Food & Feed Safety Panel",
    audience: "Food, feed & nutraceutical manufacturers",
    summary:
      "Nutrition, microbiology, allergens, contaminants and shelf-life in one panel",
    body: "Release-and-label testing for additives and finished products, extended with the toxicological and stability work that a new additive approval requires.",
    frameworks: ["GLP", "FSSAI", "Codex", "ISO"],
    divisions: ["chemistry", "microbiology", "toxicology", "radioisotope-laboratory"],
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
