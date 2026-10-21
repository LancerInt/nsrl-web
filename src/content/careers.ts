/**
 * Careers: departments open to application and the working proposition.
 */

export const careersIntro = {
  eyebrow: "Join us",
  title: "Be part of our scientific team",
  lead: "As a contract research organisation working across agrochemicals, industrial chemicals and food and feed additives, we offer diverse opportunities for talented people at every stage of a scientific career.",
  body: [
    "A collaborative and diverse team fosters innovation, creativity and continuous learning. Employees have access to state-of-the-art facilities and advanced technologies from the first week, not after a probation period.",
    "Professional development runs through training programmes, workshops and industry conferences, so that the people conducting the studies stay current with the guidelines and methods those studies are judged against.",
  ],
};

export const careerPillars = [
  {
    index: "01",
    title: "Facilities you can actually use",
    body: "450+ instruments across chromatography, mass spectrometry, spectroscopy and microscopy, in a 150,000 sq ft estate. Access is part of the job description.",
  },
  {
    index: "02",
    title: "Work that leaves the building",
    body: "Reports from these divisions have been accepted by the FDA, the EMA and agencies across six countries. The studies you run become regulatory record.",
  },
  {
    index: "03",
    title: "Continuous development",
    body: "Training programmes, workshops and industry conferences to stay current with the latest advancements in a field where the guidelines move every year.",
  },
  {
    index: "04",
    title: "A team, not a silo",
    body: "Every division sits in one quality system, which means a chemist and a toxicologist talk about the same study. Careers here tend to widen rather than narrow.",
  },
];

/** Departments that accept applications, as listed on the application form. */
export const departments = [
  "Chemistry",
  "Toxicology",
  "Ecotoxicology",
  "Entomology",
  "AHF",
  "Veterinarian",
  "Bio-Chemistry",
  "Microbiology",
  "Administration",
  "Senior Management",
  "Database",
  "Quality Assurance",
  "Unit Quality Control",
  "Electrical",
  "Archivist",
  "Others",
] as const;

export type Department = (typeof departments)[number];

/** Grouping used to give the department list visual structure. */
export const departmentGroups: { heading: string; items: string[] }[] = [
  {
    heading: "Scientific divisions",
    items: [
      "Chemistry",
      "Toxicology",
      "Ecotoxicology",
      "Entomology",
      "Bio-Chemistry",
      "Microbiology",
    ],
  },
  {
    heading: "Animal science",
    items: ["AHF", "Veterinarian"],
  },
  {
    heading: "Quality & records",
    items: ["Quality Assurance", "Unit Quality Control", "Archivist", "Database"],
  },
  {
    heading: "Operations",
    items: ["Administration", "Senior Management", "Electrical", "Others"],
  },
];
