/**
 * The thirteen scientific divisions.
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
  /** Two to four paragraphs of body copy. */
  body: string[];
  /** Headline claim rendered large on the division page. */
  claim: { value: string; unit?: string; caption: string };
  capabilities: CapabilityGroup[];
  instruments?: string[];
  guidelines?: string[];
  species?: string[];
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
      "Acute through multi-year carcinogenicity, run in GLP- and AAALAC-accredited vivaria",
    body: [
      "Toxicology is the division the rest of the laboratory is built around. It holds GLP and AAALAC accreditation, operates multiple vivaria, and is staffed by toxicologists holding DABT credentials — the board certification that regulators outside India look for first.",
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
      {
        title: "Genetic toxicology",
        items: [
          "Ames test",
          "In vitro mammalian cell gene mutation assay",
          "Chromosomal aberration assay",
          "In vivo micronucleus assay",
          "Comet assay",
          "Mouse lymphoma assay",
          "Sister chromatid exchange assay",
        ],
      },
      {
        title: "Safety pharmacology",
        items: [
          "Cardiovascular assessment",
          "Central nervous system assessment",
          "Respiratory assessment",
          "Renal assessment",
          "Gastrointestinal assessment",
          "Immunotoxicity evaluation",
          "Hepatotoxicity evaluation",
        ],
      },
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
    accreditationRefs: ["glp", "aaalac", "cpcsea"],
    adjacent: ["pathology", "genetic-toxicology", "vivarium"],
    seo: {
      title: "Toxicology Studies | GLP Acute, Chronic & Carcinogenicity",
      description:
        "GLP and AAALAC-accredited toxicology: acute, subchronic, chronic and carcinogenicity studies, inhalation chambers, DABT-credentialed toxicologists and LC-MS/MS, ICP-MS and GC-MS support.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "genetic-toxicology",
    index: "02",
    name: "Genetic Toxicology",
    shortName: "Genetic Tox",
    family: "Safety & toxicology",
    summary:
      "Mutagenicity and DNA-damage batteries whose reports are accepted by the FDA and EMA",
    body: [
      "The genetic toxicology division answers a single question with unusual rigour: does this substance damage the genome? The standard battery — Ames, chromosomal aberration, in vitro micronucleus, in vivo comet and mouse lymphoma — runs under OECD GLP guidelines.",
      "Reports from this division have been submitted to and accepted by regulatory agencies worldwide, including the United States Food and Drug Administration and the European Medicines Agency. That acceptance history is the division's real deliverable.",
      "Beyond the required battery, the laboratory carries the mechanistic work that explains a positive result rather than merely recording it: DNA repair studies, genomic instability assessment, epigenetic analysis, and in silico SAR and QSAR modelling that can redirect a programme before an animal is enrolled.",
    ],
    claim: {
      value: "FDA · EMA",
      caption: "Agencies that have accepted reports issued by this division",
    },
    capabilities: [
      {
        title: "Mutagenicity",
        blurb: "The core regulatory battery, across four OECD guidelines.",
        items: [
          "Bacterial reverse mutation — Ames test",
          "Salmonella typhimurium reverse mutation assay",
          "Escherichia coli reverse mutation assay",
          "Mammalian cell gene mutation assay (OECD 476)",
          "Chromosome aberration test (OECD 473)",
          "In vitro micronucleus test (OECD 487)",
          "In vivo micronucleus assay (OECD 474)",
          "Mouse lymphoma assay",
        ],
      },
      {
        title: "Genotoxicity & carcinogenicity",
        items: [
          "In vitro unscheduled DNA synthesis (UDS) assay",
          "In vitro alkaline and neutral comet assay",
          "In vivo comet assay",
          "Sister chromatid exchange (SCE) assay",
          "In vivo chromosomal aberration assay",
          "In vivo gene mutation assay",
          "DNA adduct formation analysis",
          "Chromosomal breakage assay",
        ],
      },
      {
        title: "Mechanistic & predictive",
        items: [
          "DNA repair assays",
          "Genomic instability assessment",
          "Telomere length analysis",
          "Structure–activity relationship (SAR) analysis",
          "QSAR modelling",
          "Epigenetic analysis",
          "Gene expression profiling and microarray analysis",
          "DNA sequencing and mutation analysis",
          "Cytogenetic analysis (karyotyping)",
        ],
      },
    ],
    instruments: [
      "Advanced fluorescence microscopes",
      "Fluorescence-activated cell sorters",
      "Spectrophotometers",
      "Plate readers",
    ],
    guidelines: [
      "OECD 473",
      "OECD 474",
      "OECD 476",
      "OECD 477",
      "OECD 482",
      "OECD 487",
      "OECD 488",
      "OECD 489",
      "OECD 495",
    ],
    species: [
      "Salmonella typhimurium",
      "Escherichia coli",
      "Drosophila melanogaster",
      "Transgenic rodents",
      "Mammalian cells",
      "Stem cells",
    ],
    accreditationRefs: ["glp"],
    adjacent: ["toxicology", "microbiology", "pathology"],
    seo: {
      title: "Genotoxicity Testing | Ames, Micronucleus, Comet & Mouse Lymphoma",
      description:
        "OECD GLP genotoxicity testing across OECD 473, 474, 476, 487 and more. Ames, chromosomal aberration, comet and mouse lymphoma assays with reports accepted by the FDA and EMA.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "ecotoxicology",
    index: "03",
    name: "Ecotoxicology",
    family: "Safety & toxicology",
    summary:
      "India's largest ecotoxicology department — 26 species across water, soil and air",
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
    accreditationRefs: ["glp", "nabl"],
    adjacent: ["entomology", "chemistry", "radioisotope-laboratory"],
    seo: {
      title: "Ecotoxicology Testing | Aquatic, Terrestrial & Environmental Fate",
      description:
        "India's largest ecotoxicology department. 26 species, GLP and NABL accredited, covering OECD 201–314 aquatic, terrestrial and environmental fate studies.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "safety-pharmacology",
    index: "04",
    name: "Safety Pharmacology",
    family: "Safety & toxicology",
    summary:
      "Organ-system safety evaluation before a candidate is given to a human being",
    body: [
      "Safety pharmacology evaluates the safety of new drugs before they are administered to humans. It is the discipline that asks what a compound does to the systems it was never intended to touch.",
      "The division works from AAALAC-affiliated animal facilities with board-certified pathologists and veterinarians on staff. Cardiovascular telemetry, CNS functional observational batteries, respiratory function and hERG screening form the core; reports conform to pharmacopeia standards and are accepted worldwide.",
      "Discovery-stage capability sits alongside the regulatory battery — high-throughput screening, in vitro ADME, in vivo pharmacokinetic and pharmacodynamic research, and bioanalytical method development and validation. Organ systems can also be assessed in combination, which compresses timelines without compressing the evidence.",
    ],
    claim: {
      value: "9",
      unit: "organ systems",
      caption: "Assessed individually, or paired in combination studies",
    },
    capabilities: [
      {
        title: "Cardiovascular safety",
        items: [
          "Drug effects evaluation",
          "Telemetry studies",
          "ECG assessment",
          "Blood pressure monitoring",
          "hERG screening",
        ],
      },
      {
        title: "Central nervous system safety",
        items: [
          "Functional observational battery",
          "Neurobehavioural assessments",
          "Cognitive function testing",
        ],
      },
      {
        title: "Respiratory safety",
        items: [
          "Pulmonary function assessment",
          "Respiratory rate and pattern assessment",
          "Bronchoconstriction studies",
        ],
      },
      {
        title: "Renal & urinary safety",
        items: ["Urine analysis", "Renal clearance studies", "Kidney histopathology"],
      },
      {
        title: "Gastrointestinal safety",
        items: [
          "Gastric emptying studies",
          "GI motility assessment",
          "Intestinal permeability studies",
        ],
      },
      {
        title: "Hepatic & metabolic safety",
        items: [
          "Liver function assessment",
          "Enzyme induction and inhibition studies",
          "Metabolic profiling",
        ],
      },
      {
        title: "Ocular safety",
        items: [
          "Ophthalmic examinations",
          "Intraocular pressure measurement",
          "Ocular histopathology",
        ],
      },
      {
        title: "Immunotoxicity",
        items: ["Immune cell profiling", "Cytokine analysis", "Immunophenotyping"],
      },
      {
        title: "Reproductive & developmental safety",
        items: ["Fertility studies", "Embryo-foetal development", "Teratology studies"],
      },
      {
        title: "Combination studies",
        blurb: "Two systems, one animal cohort, one report.",
        items: [
          "Cardiovascular and CNS",
          "Respiratory and gastrointestinal",
          "Renal and hepatic",
        ],
      },
    ],
    accreditationRefs: ["aaalac", "glp"],
    adjacent: ["pharmacology-drug-discovery", "toxicology", "pathology"],
    seo: {
      title: "Safety Pharmacology | Cardiovascular, CNS, Respiratory & hERG",
      description:
        "Core battery and follow-up safety pharmacology across ten organ systems, with telemetry, hERG screening and board-certified veterinary oversight in AAALAC-affiliated facilities.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "pathology",
    index: "05",
    name: "Pathology",
    family: "Safety & toxicology",
    summary:
      "GLP histology, digital pathology and certified pathologists reading every slide",
    body: [
      "Pathology is where a study stops being numbers and becomes evidence. The GLP-certified division provides the full histology chain for preclinical research — automated microtomes, automatic stainers and fully automated tissue processing, so section quality does not drift across a long study.",
      "Certified pathologists meeting international standards read the material. Whole-slide scanning and telepathology mean a sponsor's own pathologist can review the same slide from anywhere in the world without the material leaving our archive.",
      "Blocks, slides and raw data are held in secure archives for up to ten years, which is what makes a study defensible long after the report has been filed.",
    ],
    claim: {
      value: "10",
      unit: "years",
      caption: "Secure archival of blocks, slides and raw study data",
    },
    capabilities: [
      {
        title: "Histopathology",
        items: [
          "Tissue processing, embedding, sectioning and staining",
          "Microscopic examination for morphological change",
          "Cellular abnormality and inflammation evaluation",
          "Tumour identification and grading",
        ],
      },
      {
        title: "Immunohistochemistry",
        items: ["Antigen detection using antibodies", "Protein expression and biomarker assessment"],
      },
      {
        title: "Cytology",
        items: [
          "Individual cell examination from fluids and aspirates",
          "Cancer and infection diagnosis",
        ],
      },
      {
        title: "Molecular pathology",
        items: [
          "DNA and RNA analysis",
          "PCR assays",
          "FISH for chromosomal abnormalities",
          "Next-generation sequencing",
        ],
      },
      {
        title: "Clinical pathology",
        items: ["Haematology", "Clinical chemistry", "Serology", "Urinalysis"],
      },
      {
        title: "Special stains & digital pathology",
        items: [
          "PAS staining for glycogen",
          "Masson's trichrome for connective tissue",
          "Whole slide scanning and digitisation",
          "Telepathology services",
        ],
      },
    ],
    instruments: [
      "Automated microtomes",
      "Automatic stainers",
      "Fully automated tissue processors",
      "Whole-slide scanners",
    ],
    accreditationRefs: ["glp"],
    adjacent: ["toxicology", "vivarium", "safety-pharmacology"],
    seo: {
      title: "Preclinical Pathology | Histology, IHC & Digital Pathology",
      description:
        "GLP-certified preclinical pathology: histopathology, immunohistochemistry, cytology, molecular and clinical pathology, digital whole-slide scanning and ten-year archival.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "chemistry",
    index: "06",
    name: "Chemistry",
    family: "Analytical & discovery",
    summary:
      "Analytical chemistry that underwrites every other division's numbers",
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
    adjacent: ["toxicology", "radioisotope-laboratory", "ecotoxicology"],
    seo: {
      title: "Analytical Chemistry Services | HPLC, LC-MS/MS, ICP-MS & NMR",
      description:
        "GLP analytical chemistry: identity, purity, impurity profiling, method development and validation, five-batch analysis and stability studies on HPLC, GC-MS/MS, LC-MS/MS, ICP-MS, FTIR, NMR, DSC and TGA.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "pharmacology-drug-discovery",
    index: "07",
    name: "Pharmacology & Drug Discovery",
    shortName: "Drug Discovery",
    family: "Analytical & discovery",
    summary:
      "Target to candidate, with in vitro and in vivo models up to large animals",
    body: [
      "The drug discovery division supports pharmaceutical and biotechnology programmes from target identification through to preclinical development, using bioinformatics and medicinal chemistry alongside conventional screening.",
      "In vitro and in vivo work runs across the full model range — small animals through canine, swine and livestock — which means efficacy, pharmacokinetics and safety can be read in the species a regulator will expect rather than the species that happened to be available.",
      "ADME, metabolic stability, transporter interaction and mechanism-of-action work are handled under GLP, and pharmacokinetic modelling and simulation turn the resulting data into the dose predictions a development team actually needs.",
    ],
    claim: {
      value: "Target → IND",
      caption: "A single custodian across the entire discovery chain",
    },
    capabilities: [
      {
        title: "Discovery",
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
          "Absorption, distribution, metabolism and excretion profiling",
          "Plasma protein binding",
          "Metabolite identification and characterisation",
          "Bioavailability and bioequivalence studies",
          "Drug–drug interaction studies",
          "Pharmacokinetic modelling and simulation",
        ],
      },
      {
        title: "In vitro & in vivo pharmacology",
        items: [
          "Receptor binding assays",
          "Enzyme inhibition assays",
          "Cell-based assays",
          "In vitro ADME assays",
          "Animal models for efficacy testing",
          "Safety pharmacology assessment",
        ],
      },
      {
        title: "Metabolic stability",
        items: [
          "Cytochrome P450 inhibition and induction assays",
          "Metabolite profiling",
          "Tissue distribution studies",
          "Pharmacokinetic modelling",
        ],
      },
      {
        title: "Enzyme & mechanism studies",
        items: [
          "Transporter interaction studies",
          "Drug–drug interaction assessment",
          "Biomarker analysis",
          "Cellular signalling pathway analysis",
          "Dose–response studies",
        ],
      },
      {
        title: "Integrated safety",
        items: [
          "Cardiovascular, CNS, respiratory, gastrointestinal, renal and hepatic safety evaluation",
          "Integrated risk assessment",
          "Drug metabolism profiling",
        ],
      },
    ],
    species: ["Rodents", "Canine", "Swine", "Mini pig", "Livestock"],
    accreditationRefs: ["glp", "aaalac"],
    adjacent: ["safety-pharmacology", "chemistry", "pathology"],
    seo: {
      title: "Drug Discovery & Pharmacology CRO | ADME, PK/PD & Screening",
      description:
        "Preclinical pharmacology and drug discovery: target identification, high-throughput screening, lead optimisation, ADME, PK/PD modelling and efficacy models from rodents to large animals.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "microbiology",
    index: "08",
    name: "Microbiology",
    family: "Analytical & discovery",
    summary:
      "Sterility, endotoxin and environmental monitoring against ISO, USP and OECD methods",
    body: [
      "The microbiology division is accredited by NGCMA for GLP, by NABL, and by AAALAC International, and operates under Good Laboratory Practice with recognition from the FDA and EMA.",
      "Its method set is deliberately standard-anchored. Sterility runs to ISO 11737-1:2018 and USP 71; endotoxin to USP 85; microbial limits to ISO 4833-1:2013; susceptibility to ISO 20776-1:2019. Naming the method is how a result travels across borders intact.",
      "Alongside routine release testing, the division carries preservation efficacy challenge testing, biofilm and water testing, cleanroom monitoring, and cleaning and sanitisation validation — the work that keeps a manufacturing site inside its own specification.",
    ],
    claim: {
      value: "GLP · NABL · AAALAC",
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
    accreditationRefs: ["glp", "nabl", "aaalac"],
    adjacent: ["medical-device-testing", "genetic-toxicology", "chemistry"],
    seo: {
      title: "Microbiology Testing | Sterility, Endotoxin & Environmental Monitoring",
      description:
        "GLP, NABL and AAALAC-accredited microbiology. Sterility to ISO 11737-1 and USP 71, endotoxin to USP 85, microbial limits, susceptibility testing, biofilm, water and cleanroom monitoring.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "radioisotope-laboratory",
    index: "09",
    name: "Radioisotope Laboratory",
    shortName: "Radioisotope",
    family: "Analytical & discovery",
    summary:
      "A Type 2 AERB-certified facility for radiolabelled fate and metabolism work",
    body: [
      "Radiolabelling answers questions no other technique can: where a molecule actually goes, in what form, and how much of it remains. The division is a Type 2 laboratory certified by the Atomic Energy Regulatory Board.",
      "Liquid scintillation counters, biological oxidisers and a full complement of detectors handle soil, water, biological and animal matrices — the four compartments an environmental fate dossier has to close.",
      "The capability is used most heavily in agrochemical research, where radiolabelled studies underpin residue, metabolism and degradation conclusions that regulators will not accept from indirect evidence.",
    ],
    claim: {
      value: "Type 2",
      caption: "AERB certification class held by the radioisotope facility",
    },
    capabilities: [
      {
        title: "Counting & detection",
        items: [
          "Alpha counting",
          "Beta counting",
          "Liquid scintillation counting",
          "Gamma radiation detection",
        ],
      },
      {
        title: "Radiochemical studies",
        items: [
          "Radiochemical purity testing",
          "Radiotracer studies",
          "Radioisotope stability testing",
          "Radiopharmaceutical quality control",
        ],
      },
      {
        title: "Safety & environmental",
        items: ["Radiation safety analysis", "Radon detection", "Uranium detection"],
      },
    ],
    instruments: [
      "Liquid Scintillation Counters (LSC)",
      "Biological oxidisers",
      "Alpha, beta and gamma detectors",
    ],
    accreditationRefs: ["aerb", "glp"],
    adjacent: ["chemistry", "ecotoxicology", "pharmacology-drug-discovery"],
    seo: {
      title: "Radioisotope Laboratory | AERB Type 2 Radiolabelled Studies",
      description:
        "AERB Type 2 certified radioisotope laboratory: liquid scintillation counting, biological oxidisers, radiotracer studies, radiochemical purity and radiation safety analysis across soil, water and biological matrices.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "entomology",
    index: "10",
    name: "Entomology",
    family: "Applied & specialist",
    summary:
      "Insecticide efficacy and resistance work on colonies we breed ourselves",
    body: [
      "Efficacy data is only as good as the insects behind it. This division maintains in-house breeding programmes for its test species, which removes the variability that makes field-collected populations unreliable as a baseline.",
      "Contact, residual and knockdown efficacy, repellency, larvicidal and adulticidal activity and fumigant testing all run under Good Laboratory Practice, across cockroaches, bed bugs, mosquitoes, ants, termites, fleas, ticks, flies and stored-product insects.",
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
      {
        title: "Taxonomy & fractionation",
        items: ["Insect taxonomy and identification", "Bioassay-guided fractionation"],
      },
    ],
    species: [
      "Cockroaches",
      "Bed bugs",
      "Mosquitoes",
      "Ants",
      "Termites",
      "Fleas",
      "Ticks",
      "Flies",
      "Stored product insects",
    ],
    accreditationRefs: ["glp"],
    adjacent: ["ecotoxicology", "chemistry", "custom-studies"],
    seo: {
      title: "Entomology Testing | Insecticide Efficacy, Repellency & Resistance",
      description:
        "GLP entomology: contact, residual and knockdown efficacy, repellency, larvicidal and fumigant testing, insecticide resistance monitoring and vector competence, on in-house bred colonies.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "medical-device-testing",
    index: "11",
    name: "Medical Device Testing",
    shortName: "Medical Device",
    family: "Applied & specialist",
    summary:
      "Biocompatibility, hemocompatibility and E&L for every device class",
    body: [
      "The medical device division is a dedicated facility covering the development and testing of devices across all classes, built around the regulatory requirements and technical constraints that make device work different from pharmaceutical work.",
      "Biocompatibility follows ISO 10993 — cytotoxicity, sensitisation, irritation and systemic toxicity — with implantation testing in rodents, rabbits and mini-pigs. Blood-contacting devices go through a full hemocompatibility suite: haemolysis, coagulation, platelet activation and complement activation.",
      "Reprocessing and sterilisation validation, shelf-life and accelerated ageing, functional and biomechanical testing, and extractables and leachables studies complete the picture. Testing is conducted to ASTM, ISO and FDA guidance under GLP, with a quality management system carrying the traceability that CDSCO and EU MDR submissions depend on.",
    ],
    claim: {
      value: "ISO 10993",
      caption: "The biological evaluation standard the whole division is built to",
    },
    capabilities: [
      {
        title: "Biocompatibility",
        items: [
          "Cytotoxicity testing",
          "Sensitisation testing",
          "Irritation and intracutaneous reactivity testing",
          "Systemic toxicity testing",
          "Genotoxicity testing",
          "Implantation testing — rodents, rabbits and mini-pigs",
        ],
      },
      {
        title: "Hemocompatibility",
        items: [
          "Haemolysis",
          "Coagulation",
          "Platelet activation",
          "Complement activation assays",
        ],
      },
      {
        title: "Sterility & sterilisation",
        items: [
          "Sterility assurance testing",
          "Microbial limits testing",
          "Bacterial endotoxin testing",
          "Bioburden determination",
          "Sterilisation process validation",
          "Ethylene oxide (EO) sterilisation studies",
          "Steam sterilisation studies",
          "Virus inactivation testing",
        ],
      },
      {
        title: "Reprocessing",
        blurb: "For reusable devices that must survive their own cleaning cycle.",
        items: [
          "Cleaning, disinfection and sterilisation resilience",
          "Device integrity evaluation",
          "Material compatibility",
          "Microbial contamination assessment",
          "Revalidation studies",
        ],
      },
      {
        title: "Shelf-life & ageing",
        items: [
          "Accelerated ageing studies",
          "Stability testing",
          "Package integrity testing",
          "Material degradation analysis",
          "Environmental testing — temperature and humidity",
        ],
      },
      {
        title: "Functional & performance",
        items: [
          "Tensile strength and elongation testing",
          "Compression testing",
          "Flexibility and fatigue testing",
          "Wear and friction testing",
          "Load and stress testing",
          "Biomechanical testing",
          "Usability evaluation",
          "Xenograft testing",
        ],
      },
      {
        title: "Extractables & leachables",
        items: [
          "Study design and protocol development",
          "Extractables testing",
          "Leachables testing",
          "Method development and validation",
          "Material characterisation",
          "Risk assessment",
          "Compatibility testing",
          "Container closure systems testing",
        ],
      },
      {
        title: "Packaging & labelling",
        items: [
          "Package integrity testing",
          "Labelling verification and validation",
          "Shelf-life assessment of packaged products",
          "Environmental impact analysis — recyclability and sustainability",
        ],
      },
    ],
    guidelines: ["ISO 10993", "ASTM", "FDA guidance", "EU MDR", "CDSCO"],
    accreditationRefs: ["glp", "nabl"],
    adjacent: ["microbiology", "chemistry", "pathology"],
    seo: {
      title: "Medical Device Testing | ISO 10993 Biocompatibility, E&L & Sterility",
      description:
        "Medical device testing for all classes: ISO 10993 biocompatibility, hemocompatibility, sterilisation validation, reprocessing, shelf-life, functional testing and extractables and leachables for FDA, EU MDR and CDSCO submissions.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "vivarium",
    index: "12",
    name: "Vivarium",
    family: "Applied & specialist",
    summary:
      "Over 70 clean rooms under AAALAC accreditation and full-time veterinary care",
    body: [
      "Animal welfare and data quality are the same problem viewed from two directions. A stressed animal is a poor model, which is why the vivarium is run to AAALAC standards with in-house veterinarians and pathologists rather than visiting consultants.",
      "More than 70 clean rooms hold small and large animal models under controlled temperature, humidity, lighting and ventilation, with continuous health monitoring, body weight checks and feed and water quality evaluation.",
      "The facility supports in vivo work from rodents and guinea pigs through canine, porcine, mini pig and livestock models, and maintains its own husbandry and breeding programmes including strain maintenance, genetic modification and genetic monitoring.",
    ],
    claim: {
      value: "70+",
      unit: "clean rooms",
      caption: "Under continuous environmental control and veterinary oversight",
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
      {
        title: "Large animal studies",
        items: [
          "Canine, porcine, mini pig and livestock models",
          "Pharmacokinetic and pharmacodynamic studies",
          "Surgical technique and medical device evaluation",
        ],
      },
      {
        title: "Veterinary care",
        items: [
          "Medical treatment and health monitoring",
          "Direct collaboration with study directors",
          "In-house veterinarians and pathologists",
        ],
      },
      {
        title: "Husbandry & breeding",
        items: [
          "Strain maintenance and genetic modification",
          "Reproductive studies",
          "Genetic monitoring",
        ],
      },
    ],
    species: [
      "Mice",
      "Rats",
      "Guinea pigs",
      "Rabbits",
      "Canine",
      "Porcine",
      "Mini pig",
      "Livestock",
    ],
    accreditationRefs: ["aaalac", "cpcsea", "glp"],
    adjacent: ["toxicology", "pathology", "safety-pharmacology"],
    seo: {
      title: "Vivarium | AAALAC-Accredited Animal Facility & Veterinary Care",
      description:
        "AAALAC-accredited vivarium with over 70 clean rooms, in-house veterinarians and pathologists, supporting small and large animal models from rodents to livestock under CPCSEA oversight.",
    },
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "custom-studies",
    index: "13",
    name: "Custom Studies",
    family: "Applied & specialist",
    summary:
      "For the programme no standard guideline was written to cover",
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
    adjacent: ["pharmacology-drug-discovery", "toxicology", "chemistry"],
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
