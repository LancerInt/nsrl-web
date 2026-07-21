/**
 * The five sectors served. Each maps a regulatory context onto the scientific
 * divisions that generate the data for it.
 */

export type Industry = {
  slug: string;
  index: string;
  name: string;
  /** Displayed under the sector name across the site. */
  promise: string;
  summary: string;
  body: string[];
  /** Frameworks and authorities a dossier in this sector is written for. */
  frameworks: string[];
  serviceGroups: { title: string; items: string[] }[];
  /** Discipline slugs that carry the work. */
  divisions: string[];
  proofPoint?: { value: string; caption: string };
  seo: { title: string; description: string };
};

export const industries: Industry[] = [
  {
    slug: "agrochemical",
    index: "01",
    name: "Agrochemical",
    promise: "Growing a sustainable future through innovative solutions.",
    summary:
      "Full registration packages — ecotoxicity, residue, environmental fate, metabolism and field efficacy",
    body: [
      "An agrochemical dossier is one of the hardest submissions in regulatory science: it has to satisfy authorities in several countries at once, each with a different view of which endpoints matter. We build the package as a single body of evidence rather than a stack of unrelated studies.",
      "Reports from this programme have been accepted by regulatory agencies in the USA, UK, Japan, China, Brazil and India, and the laboratory is recognised by the Central Insecticides Board and Registration Committee.",
      "The division's registration history includes India's first nano-fertiliser — a submission with no domestic precedent, assembled from the ground up.",
    ],
    frameworks: ["OECD", "CIBRC", "EPA", "EFSA", "SENASA", "SENAVE"],
    serviceGroups: [
      {
        title: "Ecotoxicity studies",
        items: [
          "Aquatic organisms — fish, invertebrates and algae",
          "Terrestrial species — earthworms and bees",
          "Higher plants",
          "Sediment toxicity assessment",
        ],
      },
      {
        title: "Residue analysis",
        items: [
          "Pesticide residue analysis in crops and soil",
          "Multi-residue analytical method development",
        ],
      },
      {
        title: "Environmental fate",
        items: [
          "Degradation studies",
          "Soil adsorption",
          "Leaching",
          "Volatility",
          "Photodegradation",
        ],
      },
      {
        title: "Field efficacy",
        items: ["Crop protection effectiveness", "Crop tolerance studies"],
      },
      {
        title: "Plant metabolism",
        items: ["Metabolism pathway identification", "Metabolite profiling and identification"],
      },
      {
        title: "Crop safety",
        items: ["Phytotoxicity assessment", "Seed germination and seedling emergence studies"],
      },
    ],
    divisions: ["ecotoxicology", "chemistry", "entomology", "radioisotope-laboratory", "toxicology"],
    proofPoint: {
      value: "India's first",
      caption: "Nano-fertiliser registration, taken through from first study to approval",
    },
    seo: {
      title: "Agrochemical Testing | Ecotoxicity, Residue & Environmental Fate",
      description:
        "GLP agrochemical registration studies: ecotoxicity, residue analysis, environmental fate, plant metabolism, crop safety and field efficacy. CIBRC recognised, with reports accepted in the USA, UK, Japan, China, Brazil and India.",
    },
  },

  {
    slug: "pharmaceutical",
    index: "02",
    name: "Pharmaceutical",
    promise: "Unlocking possibilities for healthier lives through groundbreaking research.",
    summary:
      "Discovery through IND-enabling safety, under one GLP quality system",
    body: [
      "Pharmaceutical programmes fail on handover as often as they fail on science. Keeping discovery, ADME, safety pharmacology and toxicology inside one laboratory removes the transfer points where context and material get lost.",
      "The work runs from target identification and high-throughput screening through lead optimisation and into IND-enabling safety packages, using bioinformatics and medicinal chemistry alongside conventional assays.",
      "Efficacy and pharmacokinetics can be read in the species a regulator expects — small animal through canine, swine and livestock models — with bioanalytical method development and validation supporting every dose measurement.",
    ],
    frameworks: ["OECD GLP", "ICH", "US FDA", "EMA", "CDSCO", "Pharmacopeia standards"],
    serviceGroups: [
      {
        title: "Drug discovery",
        items: [
          "Target identification and validation",
          "High-throughput screening",
          "Lead optimisation",
          "Preclinical development",
          "Bioinformatics and medicinal chemistry",
        ],
      },
      {
        title: "Pharmacokinetics & ADME",
        items: [
          "Absorption profiling",
          "Plasma protein binding",
          "Metabolite identification",
          "Bioavailability and bioequivalence",
          "Drug–drug interaction studies",
        ],
      },
      {
        title: "In vitro & in vivo pharmacology",
        items: [
          "Receptor binding assays",
          "Enzyme inhibition tests",
          "Cell-based assays",
          "Animal efficacy models",
          "Safety pharmacology assessment",
        ],
      },
      {
        title: "Safety & mechanism",
        items: [
          "Cardiovascular safety studies",
          "Metabolic stability testing",
          "Enzyme inhibition and induction assays",
          "Mechanism of action research",
        ],
      },
    ],
    divisions: [
      "pharmacology-drug-discovery",
      "safety-pharmacology",
      "toxicology",
      "genetic-toxicology",
      "pathology",
      "chemistry",
    ],
    seo: {
      title: "Pharmaceutical CRO | Drug Discovery to IND-Enabling Safety",
      description:
        "Preclinical pharmaceutical services: target identification, high-throughput screening, lead optimisation, ADME, PK/PD, safety pharmacology and GLP toxicology under one quality system.",
    },
  },

  {
    slug: "medical-devices",
    index: "03",
    name: "Medical Devices & Healthcare",
    promise:
      "Advancing healthcare with cutting-edge technologies and rigorous safety evaluations.",
    summary:
      "ISO 10993 biocompatibility, hemocompatibility, sterilisation validation and E&L",
    body: [
      "Device evaluation is a materials problem wearing a biology costume. What matters is what the material releases, how the body answers, and whether the device still performs after the cleaning cycle it was sold with.",
      "Biocompatibility runs to ISO 10993 across cytotoxicity, sensitisation, irritation and systemic toxicity, with implantation in rodents, rabbits and mini-pigs. Blood-contacting devices go through haemolysis, coagulation, platelet activation and complement activation.",
      "Reprocessing, sterilisation validation, shelf-life, functional and biomechanical testing and extractables and leachables complete a submission built for FDA, EU MDR and CDSCO review, conducted to ASTM, ISO and FDA guidance under GLP.",
    ],
    frameworks: ["ISO 10993", "ASTM", "US FDA", "EU MDR", "CDSCO"],
    serviceGroups: [
      {
        title: "Biocompatibility",
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
        title: "Hemocompatibility",
        items: ["Haemolysis", "Coagulation", "Platelet activation", "Complement activation"],
      },
      {
        title: "Sterilisation & reprocessing",
        items: [
          "Ethylene oxide sterilisation validation",
          "Steam sterilisation validation",
          "Bioburden and sterility assurance",
          "Cleaning, disinfection and reprocessing resilience",
          "Virus inactivation testing",
        ],
      },
      {
        title: "Performance & lifetime",
        items: [
          "Mechanical and biomechanical testing",
          "Tensile, compression, fatigue and wear testing",
          "Accelerated ageing and shelf-life",
          "Package integrity",
          "Usability evaluation",
        ],
      },
      {
        title: "Extractables & leachables",
        items: [
          "Study design and protocol development",
          "Extractables and leachables testing",
          "Material characterisation",
          "Container closure systems testing",
          "Risk assessment",
        ],
      },
    ],
    divisions: ["medical-device-testing", "microbiology", "chemistry", "pathology", "toxicology"],
    seo: {
      title: "Medical Device Testing Services | ISO 10993, EU MDR & CDSCO",
      description:
        "Medical device and healthcare testing: ISO 10993 biocompatibility, hemocompatibility, sterilisation validation, reprocessing, shelf-life, functional testing and extractables and leachables.",
    },
  },

  {
    slug: "industrial-chemicals",
    index: "04",
    name: "Industrial Chemicals",
    promise: "Driving industrial progress with quality and compliance at the forefront.",
    summary:
      "REACH, RoHS, CLP, GHS and California Proposition 65 compliance data",
    body: [
      "Chemical compliance regimes are proliferating faster than most manufacturers can track. We generate the data behind REACH, RoHS, CLP, GHS and California Proposition 65 declarations, so a single substance can be placed on several markets from one evidence base.",
      "The programme covers toxicological studies, physicochemical property assessment, environmental fate, and specialist testing including Chromium VI and product packaging.",
      "Gas and liquid chromatography, mass spectrometry and elemental analysis support the work, conducted under GLP and international guidelines for clients in pharmaceuticals, agrochemicals, cosmetics, household products and industrial manufacturing.",
    ],
    frameworks: [
      "REACH",
      "RoHS",
      "CLP",
      "GHS",
      "California Proposition 65",
      "SVHC",
      "CE marking",
    ],
    serviceGroups: [
      {
        title: "Toxicology",
        items: [
          "Acute toxicity",
          "Skin and eye irritation / serious damage",
          "Skin sensitisation",
          "Inhalation toxicity",
          "Subacute and subchronic toxicity",
          "Chronic toxicity",
          "Neurotoxicity",
          "Immunotoxicity",
          "Developmental and reproductive toxicity",
          "Endocrine disruptor screening",
          "Carcinogenicity",
        ],
      },
      {
        title: "Chemistry",
        items: [
          "Chemical characterisation and identification",
          "Physicochemical property determination",
          "Stability and shelf life",
          "Packaging, container compatibility and transport worthiness",
          "Environmental fate studies",
          "Adsorption and desorption",
          "Mobility",
          "Biodegradation",
          "Bioaccumulation potential",
          "Environmental monitoring and analytical services",
        ],
      },
      {
        title: "Genetic toxicology",
        items: [
          "Bacterial reverse mutation — Ames test",
          "Chromosomal aberration test",
          "Micronucleus test",
          "HPRT mammalian cell gene mutation test",
        ],
      },
      {
        title: "Skin & mucous membrane",
        items: [
          "Dermal absorption studies",
          "Skin penetration studies",
          "Skin irritation testing",
          "Skin corrosion testing",
          "Skin sensitisation testing",
          "Mucous membrane irritation testing",
        ],
      },
      {
        title: "Environmental monitoring",
        items: [
          "Soil and water analysis for chemical contaminants",
          "Air quality monitoring",
          "Environmental risk assessment",
          "Environmental fate and behaviour studies",
        ],
      },
      {
        title: "Occupational health & safety",
        items: [
          "Occupational exposure assessment and monitoring",
          "Hazard identification and risk assessment",
          "SVHC declarations",
          "REACH registration support",
          "CE label support",
          "Chromium VI testing",
        ],
      },
    ],
    divisions: ["chemistry", "toxicology", "genetic-toxicology", "ecotoxicology"],
    seo: {
      title: "Industrial Chemical Testing | REACH, RoHS, SVHC & Prop 65",
      description:
        "Industrial chemical compliance testing: REACH, RoHS, CLP, GHS and California Proposition 65 data, toxicology, physicochemical properties, environmental fate, Chromium VI and occupational exposure assessment.",
    },
  },

  {
    slug: "food-and-feed-additives",
    index: "05",
    name: "Food & Feed Additives",
    promise:
      "Safeguarding food integrity and enhancing nutritional value for a healthier world.",
    summary:
      "Nutritional, microbiological, allergen and contaminant analysis with shelf-life support",
    body: [
      "The food and feed additives division evaluates preservatives, flavour enhancers, antioxidants, emulsifiers and nutritional supplements through combined safety and efficacy assessment.",
      "Analysis covers ingredient identity, contaminant identification, nutritional content and stability, alongside toxicological work spanning acute and chronic toxicity, genotoxicity and allergenicity.",
      "Formulation support addresses ingredient compatibility, formulation stability and dosage optimisation, and gamma radiation detection instrumentation measures radiation levels in food and feed additives directly. Scientists and regulatory specialists track current industry regulation, working to GLP and international standards.",
    ],
    frameworks: ["GLP", "FSSAI", "Codex", "ISO", "International food standards"],
    serviceGroups: [
      {
        title: "Microbiological testing",
        items: [
          "Total viable count",
          "Pathogen detection — Salmonella, E. coli, Listeria and others",
          "Yeast and mould count",
          "Coliform count",
          "Enterobacteriaceae count",
          "Spoilage organism detection",
        ],
      },
      {
        title: "Allergen testing",
        items: [
          "Allergen-specific ELISA and PCR",
          "Gluten testing for gluten-free labelling",
          "Milk, egg, soy, peanut and tree nut detection",
          "Cross-contamination assessment",
        ],
      },
      {
        title: "Nutritional analysis",
        items: [
          "Proximate analysis — moisture, ash, fat, protein, carbohydrate",
          "Vitamin and mineral content",
          "Dietary fibre analysis",
          "Fatty acid profile",
          "Caloric value determination",
        ],
      },
      {
        title: "Contaminant analysis",
        items: [
          "Mycotoxin testing — aflatoxins, ochratoxin and others",
          "Heavy metals — lead, mercury, cadmium, arsenic",
          "Pesticide residue analysis",
          "Veterinary drug residue analysis",
          "Polycyclic aromatic hydrocarbon (PAH) analysis",
          "Gamma radiation level measurement",
        ],
      },
      {
        title: "Shelf-life determination",
        items: [
          "Microbiological stability testing",
          "Sensory and organoleptic evaluation",
          "Nutrient degradation analysis",
          "Oxidative stability testing",
          "Packaging integrity assessment",
        ],
      },
      {
        title: "Stability testing",
        items: [
          "Physical stability — phase separation and sedimentation",
          "Chemical stability and degradation kinetics",
          "Temperature stress testing",
          "Light exposure testing",
        ],
      },
    ],
    divisions: ["chemistry", "microbiology", "toxicology", "radioisotope-laboratory"],
    seo: {
      title: "Food & Feed Additive Testing | Nutrition, Allergens & Contaminants",
      description:
        "GLP food and feed additive testing: microbiological, allergen, nutritional and contaminant analysis, mycotoxins, heavy metals, shelf-life and stability studies with formulation support.",
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
