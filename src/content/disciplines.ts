/**
 * The scientific divisions.
 *
 * Test names, OECD/ISO/ASTM/USP guideline numbers, species, cell lines and
 * instrument names are reproduced exactly as published by the laboratory.
 * Prose is editorial; the specifications are not.
 */

export type CapabilityGroup = {
  title: string;
  blurb?: string;
  items: string[];
};

export type Discipline = {
  slug: string;
  index: string;
  name: string;
  /** Short label used in dense listings and the nav. */
  shortName?: string;
  family: "Safety & toxicology" | "Analytical & discovery" | "Applied & specialist";
  /** One line, sentence case, no full stop — used under headings. */
  summary: string;
  /**
   * The plain-language description, for a reader who has not yet decided
   * which division owns their question.
   *
   * Separate from `summary` because the two answer different questions.
   * `summary` is the division's distinguishing claim — "acute through
   * multi-year carcinogenicity, run under GLP in our own vivaria" — which
   * is what a toxicologist already scanning for capability wants, and is
   * what the division page, the register and the relationship panel show.
   * `overview` says what the division *does*, which is what the homepage
   * index needs: someone arriving there may not know whether their
   * question is toxicology or ecotoxicology, and a claim about study
   * duration does not help them choose.
   *
   * Full sentences with a full stop, unlike `summary`.
   */
  overview: string;
  /** Two to four paragraphs of body copy. */
  body: string[];
  /** Headline claim rendered large on the division page. */
  claim: { value: string; unit?: string; caption: string };
  capabilities: CapabilityGroup[];
  instruments?: string[];
  guidelines?: string[];
  species?: string[];
  /**
   * What the `species` entries actually are, where "species" would be wrong.
   *
   * Ecotoxicology's twelve entries are taxonomic groups — "Birds",
   * "Crustaceans" — covering the 26 species the division claims, so calling
   * them species both understated the programme and contradicted the
   * headline figure. Defaults to "Test species" where it is left unset,
   * which is every other division.
   */
  speciesLabel?: string;
  accreditationRefs: string[];
  /** Divisions whose work most often runs alongside this one. */
  adjacent: string[];
  seo: { title: string; description: string };
};

export const disciplines: Discipline[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "toxicology",
    index: "01",
    name: "Toxicology",
    family: "Safety & toxicology",
    summary:
      "Acute through multi-year carcinogenicity, run under GLP in our own vivaria",
    overview:
      "Safety assessments to evaluate toxicity, irritation, sensitisation and potential health effects.",
    body: [
      "Toxicology is the division the rest of the laboratory is built around. It runs under GLP certification, operates multiple vivaria, and is staffed by toxicologists holding DABT credentials — the board certification that regulators outside India look for first.",
      "The work spans the full duration axis. Acute studies resolve in days; subchronic and chronic programmes run for months; carcinogenicity bioassays run for years without a gap in the record. Multiple state-of-the-art inhalation chambers let us run inhalation toxicity studies on small animals, which is essential for evaluating airborne chemicals and inhaled drug products.",
      "Trace-level analytical support sits inside the division rather than beside it. LC-MS/MS, ICP-MS and GC-MS detect chemicals at the concentrations that matter for dose confirmation and tissue distribution, and a High-Throughput Screening platform front-loads the decisions that would otherwise cost a full study to answer.",
    ],
    claim: {
      value: "Multi-year",
      caption: "Carcinogenicity bioassays carried without a break in the chain of custody",
    },
    capabilities: [
      {
        title: "General toxicology",
        items: [
          "Acute toxicity — oral, dermal and inhalation",
          "Subchronic and chronic toxicity",
          "NOEL and NOAEL determination",
          "Developmental and reproductive toxicity",
          "Carcinogenicity",
          "Immunotoxicity",
          "Neurotoxicity",
          "Endocrine disruptor studies",
          "Histopathological examination",
        ],
      },
      /* The genetic toxicology and safety pharmacology groups were removed
         with their divisions. Leaving the method lists here would have gone
         on offering Ames tests and cardiovascular safety assessment from
         inside the toxicology page after the departments that run them had
         been withdrawn. */
      {
        title: "Dermal toxicology",
        items: [
          "Acute dermal testing",
          "Skin sensitisation — LLNA and GPMT",
          "Irritation and corrosion testing",
          "Dermal penetration studies",
        ],
      },
      {
        title: "Inhalation toxicology",
        items: [
          "Acute inhalation testing",
          "Respiratory sensitisation",
          "Lung function assessment",
          "Histopathological examination",
        ],
      },
      {
        title: "Systemic toxicity",
        items: [
          "Liver, kidney, lung and heart organ toxicity",
          "Specialised staining techniques",
        ],
      },
    ],
    instruments: [
      "Liquid chromatography–tandem mass spectrometry (LC-MS/MS)",
      "Inductively coupled plasma mass spectrometry (ICP-MS)",
      "Gas chromatography–mass spectrometry (GC-MS)",
      "High-Throughput Screening (HTS) platform",
      "Multiple inhalation chambers",
      "Advanced microscopy",
    ],
    accreditationRefs: ["glp"],
    adjacent: ["vivarium", "chemistry", "custom-studies"],
    seo: {
      title: "Toxicology Studies | GLP Acute, Chronic & Carcinogenicity",
      description:
        "GLP-certified toxicology: acute, subchronic, chronic and carcinogenicity studies, inhalation chambers, DABT-credentialed toxicologists and LC-MS/MS, ICP-MS and GC-MS support.",
    },
  },

  {
    slug: "ecotoxicology",
    index: "02",
    name: "Ecotoxicology",
    family: "Safety & toxicology",
    summary:
      "India's largest ecotoxicology department — 26 species across water, soil and air",
    overview:
      "Environmental safety studies assessing effects on aquatic organisms, terrestrial species and beneficial insects.",
    body: [
      "This is India's largest ecotoxicology department, and the breadth is the point: 26 species spanning birds, fish, algae, plants, honeybees, earthworms, crustaceans, molluscs, collembolans, ladybugs and lacewings. An environmental risk assessment is only as credible as the number of trophic levels behind it.",
      "The division works to GLP and NABL standards, and its regulatory history includes registering India's first nano-fertiliser — a dossier with no domestic precedent to follow.",
      "Aquatic, terrestrial and environmental-fate work runs in parallel rather than in sequence. Flow-through systems, plant growth chambers, cold rooms and micro-applicators let a single substance be characterised for acute aquatic toxicity, soil degradation and adsorption behaviour inside one programme.",
    ],
    claim: {
      value: "26",
      unit: "species",
      caption: "Across birds, fish, algae, plants, pollinators and soil fauna",
    },
    capabilities: [
      {
        title: "Aquatic toxicity",
        items: [
          "Fish acute toxicity (OECD 203)",
          "Daphnia acute immobilisation (OECD 202)",
          "Daphnia reproduction (OECD 211)",
          "Algal growth inhibition (OECD 201)",
          "Bioaccumulation in fish (OECD 305)",
          "Marine and freshwater mollusc toxicity",
        ],
      },
      {
        title: "Terrestrial toxicity",
        items: [
          "Earthworm acute toxicity (OECD 207)",
          "Earthworm reproduction (OECD 222)",
          "Honeybee toxicity (OECD 213)",
          "Terrestrial plant seedling growth (OECD 208)",
          "Vegetative vigour (OECD 227)",
          // The source cites the bare number with no test title, so none is
          // published. Do not guess: TG 218 is not the nitrogen-transformation
          // test it is easily mistaken for.
          "OECD 218",
          "Avian oral toxicity",
        ],
      },
      {
        title: "Environmental fate",
        items: [
          "Ready biodegradability (OECD 301)",
          "Biodegradation simulation (OECD 314)",
          "Aerobic and anaerobic soil transformation (OECD 307)",
          "Adsorption/desorption using a batch equilibrium method (OECD 106)",
          "Estimation of adsorption coefficient by HPLC (OECD 121)",
        ],
      },
    ],
    instruments: [
      "Plant growth chambers",
      "Cold rooms",
      "Flow-through systems",
      "Micro-applicators",
    ],
    guidelines: [
      "OECD 106",
      "OECD 121",
      "OECD 201",
      "OECD 202",
      "OECD 203",
      "OECD 207",
      "OECD 208",
      "OECD 211",
      "OECD 213",
      "OECD 218",
      "OECD 222",
      "OECD 227",
      "OECD 301",
      "OECD 305",
      "OECD 307",
      "OECD 314",
    ],
    species: [
      "Birds",
      "Fish",
      "Algae",
      "Higher plants",
      "Honeybees",
      "Earthworms",
      "Crustaceans",
      "Molluscs",
      "Collembolans",
      "Ladybugs",
      "Lacewings",
      "Mussels and snails",
    ],
    speciesLabel: "Organism groups",
    accreditationRefs: ["glp", "nabl"],
    adjacent: ["entomology", "chemistry", "microbiology"],
    seo: {
      title: "Ecotoxicology Testing | Aquatic, Terrestrial & Environmental Fate",
      description:
        "India's largest ecotoxicology department. 26 species, GLP and NABL accredited, covering OECD 201–314 aquatic, terrestrial and environmental fate studies.",
    },
  },

  {
    slug: "chemistry",
    index: "03",
    name: "Chemistry",
    family: "Analytical & discovery",
    summary:
      "Analytical chemistry that underwrites every other division's numbers",
    overview:
      "Analytical testing for composition, purity, residues, physicochemical properties and storage stability.",
    body: [
      "Chemistry is the division no study can proceed without. Identity, purity, concentration and stability are established here, and every dose administered anywhere in the laboratory traces back to a chemistry result.",
      "The GLP-certified laboratory runs HPLC, GC-MS/MS, LC-MS/MS, ICP-MS, FTIR, NMR, DSC and TGA — a spread that covers organic and inorganic, volatile and involatile, thermal and spectroscopic characterisation without outsourcing a step.",
      "Method development and validation, impurity profiling and characterisation, five-batch analysis and stability programmes are handled end to end, with samples and data archived for ten years.",
    ],
    claim: {
      value: "8",
      unit: "platforms",
      caption: "Chromatographic, spectroscopic, elemental and thermal, all in-house",
    },
    capabilities: [
      {
        title: "Chemical analysis",
        items: [
          "Identification",
          "Elemental analysis",
          "Spectroscopic analysis",
          "Chromatographic techniques",
          "Thermal analysis",
          "Particle size analysis",
        ],
      },
      {
        title: "Method development & validation",
        items: [
          "Analytical method development",
          "Method validation to international standards",
          "Method transfer",
        ],
      },
      {
        title: "Impurity & stability",
        items: [
          "Impurity profiling and characterisation",
          "Five-batch analysis",
          "Stability studies",
          "Shelf-life determination",
        ],
      },
      {
        title: "Quality & materials",
        items: [
          "Quality control and quality assurance",
          "Material testing and characterisation",
        ],
      },
    ],
    instruments: [
      "HPLC",
      "GC-MS/MS",
      "LC-MS/MS",
      "ICP-MS",
      "FTIR",
      "NMR",
      "DSC",
      "TGA",
    ],
    accreditationRefs: ["glp", "nabl"],
    adjacent: ["toxicology", "ecotoxicology", "microbiology"],
    seo: {
      title: "Analytical Chemistry Services | HPLC, LC-MS/MS, ICP-MS & NMR",
      description:
        "GLP analytical chemistry: identity, purity, impurity profiling, method development and validation, five-batch analysis and stability studies on HPLC, GC-MS/MS, LC-MS/MS, ICP-MS, FTIR, NMR, DSC and TGA.",
    },
  },

  {
    slug: "microbiology",
    index: "04",
    name: "Microbiology",
    family: "Analytical & discovery",
    summary:
      "Sterility, endotoxin and environmental monitoring against ISO, USP and OECD methods",
    overview:
      "Microbial identification, viable counts, contamination testing and evaluation of biological activity.",
    body: [
      "The microbiology division is certified by NGCMA for GLP and accredited by NABL to ISO/IEC 17025, and operates under Good Laboratory Practice with recognition from the FDA and EMA.",
      "Its method set is deliberately standard-anchored. Sterility runs to ISO 11737-1:2018 and USP 71; endotoxin to USP 85; microbial limits to ISO 4833-1:2013; susceptibility to ISO 20776-1:2019. Naming the method is how a result travels across borders intact.",
      "Alongside routine release testing, the division carries preservation efficacy challenge testing, biofilm and water testing, cleanroom monitoring, and cleaning and sanitisation validation — the work that keeps a manufacturing site inside its own specification.",
    ],
    claim: {
      value: "GLP · NABL",
      caption: "Three independent accreditations governing one method set",
    },
    capabilities: [
      {
        title: "Identification & characterisation",
        items: [
          "Culture-based identification of bacteria, fungi and yeast",
          "Molecular techniques — PCR and DNA sequencing",
          "Phenotypic and biochemical characterisation",
          "OECD Guideline 107",
          "ISO 7218:2007",
        ],
      },
      {
        title: "Antimicrobial susceptibility",
        items: [
          "Susceptibility determination",
          "Minimum inhibitory concentration (MIC) testing",
          "Disk diffusion — Kirby-Bauer",
          "Broth dilution method",
          "Etest method",
          "ISO 20776-1:2019",
        ],
      },
      {
        title: "Sterility & microbial limits",
        items: [
          "Membrane filtration method",
          "Direct inoculation method",
          "Growth promotion testing",
          "Viable microorganism enumeration",
          "Total aerobic microbial count",
          "Total yeast and mould count",
          "ISO 11737-1:2018",
          "USP 71",
          "ISO 4833-1:2013",
        ],
      },
      {
        title: "Endotoxin",
        items: [
          "Bacterial endotoxin detection and quantification",
          "LAL assay",
          "Chromogenic and turbidimetric methods",
          "USP 85",
        ],
      },
      {
        title: "Environmental monitoring",
        items: [
          "Air, water, surface and equipment testing",
          "Total viable count",
          "Indicator organism detection",
          "Cleanroom monitoring",
          "Cleaning and sanitisation validation",
          "ISO 14698 series",
        ],
      },
      {
        title: "Challenge, biofilm & water",
        items: [
          "Preservation efficacy evaluation",
          "Product inoculation studies",
          "ISO 14698-1:2003 and ISO 14698-2:2003",
          "OECD Guideline 471",
          "ISO 10993-1:2018",
          "ASTM E2111-18",
          "ASTM E2562-20",
          "ISO 22196:2011",
          "ISO 6222:1999",
        ],
      },
      {
        title: "Environmental microbiology",
        items: [
          "ASTM D5465-21",
          "ISO 10381-1:2002",
          "OECD Guideline 473",
          "ISO 10993-3:2014",
        ],
      },
    ],
    guidelines: [
      "USP 71",
      "USP 85",
      "ISO 7218:2007",
      "ISO 4833-1:2013",
      "ISO 6222:1999",
      "ISO 11737-1:2018",
      "ISO 20776-1:2019",
      "ISO 22196:2011",
      "ISO 14698-1:2003",
      "ISO 14698-2:2003",
      "ISO 10993-1:2018",
      "ISO 10993-3:2014",
      "ISO 10381-1:2002",
      "ASTM E2111-18",
      "ASTM E2562-20",
      "ASTM D5465-21",
      "OECD 107",
      "OECD 471",
      "OECD 473",
    ],
    accreditationRefs: ["glp", "nabl"],
    adjacent: ["chemistry", "toxicology", "custom-studies"],
    seo: {
      title: "Microbiology Testing | Sterility, Endotoxin & Environmental Monitoring",
      description:
        "GLP- and NABL-accredited microbiology. Sterility to ISO 11737-1 and USP 71, endotoxin to USP 85, microbial limits, susceptibility testing, biofilm, water and cleanroom monitoring.",
    },
  },

  {
    slug: "entomology",
    index: "05",
    name: "Entomology",
    family: "Applied & specialist",
    summary:
      "Insecticide efficacy and resistance work on colonies we breed ourselves",
    overview:
      "Laboratory and field studies evaluating pest control efficacy and effects on beneficial arthropods.",
    body: [
      "Efficacy data is only as good as the insects behind it. This division maintains in-house breeding programmes for its test species, which removes the variability that makes field-collected populations unreliable as a baseline.",
      "Contact, residual and knockdown efficacy, repellency, larvicidal and adulticidal activity and fumigant testing all run under Good Laboratory Practice, against the agriculturally and economically important pest species a product has to be effective on.",
      "Resistance is treated as a first-class question rather than an afterthought: molecular assays detect insecticide resistance directly, and resistance monitoring, vector competence studies and pest risk assessment place a single product inside a longer epidemiological picture.",
    ],
    claim: {
      value: "In-house",
      caption: "Breeding programmes for every test species, controlling the baseline",
    },
    capabilities: [
      {
        title: "Efficacy",
        items: [
          "Contact toxicity test",
          "Residual efficacy test",
          "Knockdown efficacy test",
          "Larvicidal activity test",
          "Adulticidal activity test",
          "Fumigant activity test",
          "Biopesticide efficacy testing",
        ],
      },
      {
        title: "Repellency & exposure",
        items: [
          "Repellency test",
          "Direct application exposure testing",
          "Impregnated material testing",
          "Dose–response assays",
          "Mortality and fecundity assays",
        ],
      },
      {
        title: "Resistance & surveillance",
        items: [
          "Insecticide susceptibility testing",
          "Molecular assays for insecticide resistance detection",
          "Resistance monitoring",
          "Vector competence studies",
          "Pest risk assessment",
        ],
      },
    ],
    /* The species list is deliberately a single general statement rather
       than an enumeration: the colonies maintained are the agriculturally
       and economically significant pests a product has to be tested
       against, and naming nine of them read as a closed list when it is
       not one. */
    species: ["Agriculturally and economically important pest species"],
    accreditationRefs: ["glp"],
    adjacent: ["ecotoxicology", "chemistry", "custom-studies"],
    seo: {
      title: "Entomology Testing | Insecticide Efficacy, Repellency & Resistance",
      description:
        "GLP entomology: contact, residual and knockdown efficacy, repellency, larvicidal and fumigant testing, insecticide resistance monitoring and vector competence, on in-house bred colonies.",
    },
  },

  {
    slug: "vivarium",
    index: "06",
    name: "Vivarium",
    family: "Applied & specialist",
    summary:
      "Over 70 environmentally controlled clean rooms for small animal models",
    overview:
      "Controlled animal housing and husbandry supporting research, welfare and reliable study outcomes.",
    body: [
      "Animal welfare and data quality are the same problem viewed from two directions. A stressed animal is a poor model, which is why environmental control and health monitoring are treated as study parameters rather than as housekeeping.",
      "More than 70 clean rooms hold small animal models under controlled temperature, humidity, lighting and ventilation, with continuous health monitoring, body weight checks and feed and water quality evaluation.",
      "The facility supports in vivo work in mice, rats, guinea pigs and rabbits — pharmacokinetic studies, and toxicity and efficacy assessments — alongside the toxicology programme that depends on it.",
    ],
    claim: {
      value: "70+",
      unit: "clean rooms",
      caption: "Under continuous environmental control and health monitoring",
    },
    capabilities: [
      {
        title: "Housing & care",
        items: [
          "Environmental control — temperature, humidity, lighting, ventilation",
          "Health monitoring and body weight checks",
          "Feed and water quality evaluation",
        ],
      },
      {
        title: "Small animal studies",
        items: [
          "In vivo experiments — mice, rats, guinea pigs",
          "Pharmacokinetic studies",
          "Toxicity and efficacy assessments",
        ],
      },
    ],
    species: ["Mice", "Rats", "Guinea pigs", "Rabbits"],
    accreditationRefs: ["glp"],
    adjacent: ["toxicology", "custom-studies", "chemistry"],
    seo: {
      title: "Vivarium | Environmentally Controlled Animal Facility",
      description:
        "A vivarium of over 70 environmentally controlled clean rooms supporting in vivo work in mice, rats, guinea pigs and rabbits, with continuous health monitoring under GLP.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "custom-studies",
    index: "07",
    name: "Custom Studies",
    family: "Applied & specialist",
    summary:
      "For the programme no standard guideline was written to cover",
    overview:
      "Tailored study designs addressing specific product, research and regulatory requirements.",
    body: [
      "Custom Services exists to bridge the gaps in research and development — the studies that fall between guidelines, combine two disciplines, or need a model that does not yet exist.",
      "Because the design work happens inside the same GLP quality system that runs our routine studies, a bespoke protocol carries the same defensibility as a standard one. That is the difference between a custom study and an improvised one.",
      "Support runs across the whole product lifecycle: study design, assay development and validation, biomarker analysis, formulation development, biostatistics and regulatory support, through to data analysis and reporting.",
    ],
    claim: {
      value: "Bespoke",
      caption: "Protocols designed to order, inside the same GLP quality system",
    },
    capabilities: [
      {
        title: "Design & development",
        items: [
          "Customised study design",
          "Assay development and validation",
          "Formulation development",
          "Customised animal models",
        ],
      },
      {
        title: "Analysis",
        items: [
          "Biomarker analysis",
          "Genomic and proteomic analysis",
          "Pharmacogenomics",
          "Pharmacokinetic studies",
        ],
      },
      {
        title: "Evaluation",
        items: [
          "Toxicology evaluations",
          "Efficacy assessments",
          "In vitro and in vivo studies",
        ],
      },
      {
        title: "Reporting & regulatory",
        items: ["Data analysis and reporting", "Biostatistics", "Regulatory support"],
      },
    ],
    accreditationRefs: ["glp"],
    adjacent: ["toxicology", "chemistry", "microbiology"],
    seo: {
      title: "Custom Preclinical Studies | Bespoke GLP Study Design",
      description:
        "Custom study design, assay development and validation, biomarker and genomic analysis, formulation development, biostatistics and regulatory support, delivered under GLP.",
    },
  },
];

export const disciplineFamilies = [
  "Safety & toxicology",
  "Analytical & discovery",
  "Applied & specialist",
] as const;

export function getDiscipline(slug: string) {
  return disciplines.find((d) => d.slug === slug);
}

export function disciplinesByFamily(family: (typeof disciplineFamilies)[number]) {
  return disciplines.filter((d) => d.family === family);
}
