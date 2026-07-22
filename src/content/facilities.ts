/**
 * Physical infrastructure: the site, its environments and the instrument estate.
 */

export type Unit = {
  id: string;
  label: string;
  title: string;
  body: string;
  houses: string[];
};

/** One accredited site houses everything. */
export const units: Unit[] = [
  {
    id: "salem",
    label: "The facility",
    title: "Salem, Tamil Nadu",
    body: "A single accredited site houses everything — study direction, regulatory strategy and client services alongside the laboratories, the vivarium and the archive. Because chemistry, toxicology, pathology and the radioisotope laboratory sit under one roof, a study moves between divisions without ever leaving our custody.",
    houses: [
      "Study direction",
      "Regulatory strategy",
      "Client services",
      "Toxicology",
      "Chemistry",
      "Ecotoxicology",
      "Entomology",
      "Pathology",
      "Microbiology",
      "Vivarium",
      "Radioisotope laboratory",
      "Drug discovery",
      "Safety pharmacology",
      "Bioanalysis",
      "Archive",
    ],
  },
];

export type Environment = {
  index: string;
  title: string;
  spec: string;
  body: string;
};

export const environments: Environment[] = [
  {
    index: "01",
    title: "Animal housing",
    spec: "70+ clean rooms",
    body: "Controlled temperature, humidity, lighting and ventilation, with continuous health and body-weight monitoring. AAALAC-accredited and CPCSEA-registered, supporting rodents through livestock.",
  },
  {
    index: "02",
    title: "Inhalation suites",
    spec: "Multiple chambers",
    body: "State-of-the-art inhalation chambers for acute and repeat-dose inhalation toxicity in small animals — the capability that decides whether an airborne chemical or inhaled drug can be evaluated at all.",
  },
  {
    index: "03",
    title: "Radioisotope facility",
    spec: "AERB Type 2",
    body: "Certified handling of radioactive material with liquid scintillation counters, biological oxidisers and a full detector complement, across soil, water, biological and animal matrices.",
  },
  {
    index: "04",
    title: "Aquatic & terrestrial systems",
    spec: "Flow-through",
    body: "Flow-through aquatic systems, plant growth chambers, cold rooms and micro-applicators supporting twenty-six species across the ecotoxicology programme.",
  },
  {
    index: "05",
    title: "Insect rearing",
    spec: "In-house colonies",
    body: "Breeding programmes maintained for every entomology test species, from cockroaches and mosquitoes to termites and stored-product insects, removing the variability of field-collected populations.",
  },
  {
    index: "06",
    title: "Archive",
    spec: "10-year retention",
    body: "Secure storage for raw data, blocks, slides and specimens, with RAID-server redundancy held both on-site and off-site.",
  },
];

export type InstrumentGroup = {
  title: string;
  caption: string;
  instruments: string[];
};

export const instrumentEstate: InstrumentGroup[] = [
  {
    title: "Chromatography & mass spectrometry",
    caption: "Separation and identification at trace concentration",
    instruments: ["HPLC", "GC-MS", "GC-MS/MS", "LC-MS/MS", "ICP-MS"],
  },
  {
    title: "Spectroscopy & thermal analysis",
    caption: "Structure, composition and thermal behaviour",
    instruments: ["FTIR", "NMR", "DSC", "TGA", "Spectrophotometers", "Plate readers"],
  },
  {
    title: "Microscopy & cell analysis",
    caption: "Reading the biology directly",
    instruments: [
      "Advanced fluorescence microscopes",
      "Fluorescence-activated cell sorters",
      "Whole-slide scanners",
      "Automated microtomes",
      "Automatic stainers",
      "Fully automated tissue processors",
    ],
  },
  {
    title: "Radiometric",
    caption: "Radiolabelled fate and metabolism",
    instruments: [
      "Liquid Scintillation Counters (LSC)",
      "Biological oxidisers",
      "Alpha, beta and gamma detectors",
    ],
  },
  {
    title: "In-life & environmental",
    caption: "Exposure, housing and environmental control",
    instruments: [
      "Inhalation chambers",
      "Plant growth chambers",
      "Flow-through aquatic systems",
      "Cold rooms",
      "Micro-applicators",
      "High-Throughput Screening platform",
    ],
  },
];
