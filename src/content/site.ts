/**
 * Single source of truth for organisation identity, contact points and
 * navigation. Every fact here was extracted from the reference site supplied
 * by the client; swap the values in this file to re-point the whole site.
 */

export const site = {
  name: "NSRL",
  legalName: "NSRL Research Laboratories",
  shortDescription:
    "A one-stop, fully equipped and accredited preclinical research laboratory serving agrochemical, pharmaceutical, medical device, discovery and radioisotope regulatory needs.",
  tagline: "Complete preclinical research, start to finish.",
  url: "https://nsrl.co.in",
  locale: "en_IN",
  linkedin: "https://www.linkedin.com/company/nsrl",
} as const;

export const contact = {
  phoneDisplay: "+91 427 2430833",
  phoneHref: "+914272430833",
  mobileDisplay: "+91 90470 35686",
  mobileHref: "+919047035686",
  email: "info@nsrl.co.in",
  formNote: "Please complete the enquiry form, or write to us directly.",
} as const;

export type Location = {
  id: string;
  label: string;
  role: string;
  lines: string[];
  /** Structured fields for schema.org PostalAddress. */
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  note?: string;
};

export const locations: Location[] = [
  {
    id: "salem",
    label: "Office & laboratory",
    role: "Registered office, laboratories & client services",
    lines: [
      "472/3, SS Towers",
      "Annapuram, Junction Main Road",
      "Salem 636 004",
      "Tamil Nadu, India",
    ],
    street: "472/3, SS Towers, Annapuram, Junction Main Road",
    locality: "Salem",
    region: "Tamil Nadu",
    postalCode: "636004",
  },
];

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  /** Rendered as a mega-menu panel when present. */
  panel?: {
    intro: { eyebrow: string; title: string; body: string; cta: NavLink };
    columns: { heading: string; links: NavLink[] }[];
  };
};

export const primaryNav: NavGroup[] = [
  { label: "About", href: "/about" },
  {
    label: "Research",
    href: "/research",
    panel: {
      intro: {
        eyebrow: "Scientific divisions",
        title: "Thirteen divisions. One chain of custody.",
        body: "Chemistry through pathology, run under a single quality system so a molecule never leaves our care between studies.",
        cta: { label: "All research divisions", href: "/research" },
      },
      columns: [
        {
          heading: "Safety & toxicology",
          links: [
            { label: "Toxicology", href: "/research/toxicology" },
            { label: "Genetic Toxicology", href: "/research/genetic-toxicology" },
            { label: "Ecotoxicology", href: "/research/ecotoxicology" },
            { label: "Safety Pharmacology", href: "/research/safety-pharmacology" },
            { label: "Pathology", href: "/research/pathology" },
          ],
        },
        {
          heading: "Analytical & discovery",
          links: [
            { label: "Chemistry", href: "/research/chemistry" },
            { label: "Pharmacology & Drug Discovery", href: "/research/pharmacology-drug-discovery" },
            { label: "Microbiology", href: "/research/microbiology" },
            { label: "Radioisotope Laboratory", href: "/research/radioisotope-laboratory" },
          ],
        },
        {
          heading: "Applied & specialist",
          links: [
            { label: "Entomology", href: "/research/entomology" },
            { label: "Medical Device Testing", href: "/research/medical-device-testing" },
            { label: "Vivarium", href: "/research/vivarium" },
            { label: "Custom Studies", href: "/research/custom-studies" },
          ],
        },
      ],
    },
  },
  { label: "Facilities", href: "/facilities" },
  {
    label: "Services",
    href: "/services",
    panel: {
      intro: {
        eyebrow: "Sectors we serve",
        title: "Regulatory dossiers, five industries deep.",
        body: "Study programmes shaped around the authority that will read them — from CIBRC and CDSCO to EPA, EFSA, FDA and EMA.",
        cta: { label: "How we work", href: "/services" },
      },
      columns: [
        {
          heading: "Industries",
          links: [
            { label: "Agrochemical", href: "/services/agrochemical" },
            { label: "Pharmaceutical", href: "/services/pharmaceutical" },
            { label: "Medical Devices & Healthcare", href: "/services/medical-devices" },
            { label: "Industrial Chemicals", href: "/services/industrial-chemicals" },
            { label: "Food & Feed Additives", href: "/services/food-and-feed-additives" },
          ],
        },
        {
          heading: "Programmes",
          links: [
            {
              label: "Study Packages",
              href: "/products",
              description: "Pre-assembled, guideline-mapped study sets",
            },
            { label: "Custom Studies", href: "/research/custom-studies" },
            { label: "Request a proposal", href: "/contact" },
          ],
        },
      ],
    },
  },
  {
    label: "Resources",
    href: "/downloads",
    panel: {
      intro: {
        eyebrow: "Evidence on file",
        title: "Every certificate, open for inspection.",
        body: "Accreditation certificates, capability statements and the quality system that governs all of it.",
        cta: { label: "Downloads", href: "/downloads" },
      },
      columns: [
        {
          heading: "Documents",
          links: [
            { label: "Accreditations & certificates", href: "/downloads" },
            { label: "Quality system", href: "/about#quality-system" },
            { label: "Study packages", href: "/products" },
          ],
        },
        {
          heading: "Newsroom",
          links: [
            { label: "News & events", href: "/news" },
            { label: "Careers", href: "/careers" },
          ],
        },
      ],
    },
  },
  { label: "Careers", href: "/careers" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Organisation",
    links: [
      { label: "About NSRL", href: "/about" },
      { label: "Quality system", href: "/about#quality-system" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Facilities", href: "/facilities" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Research",
    links: [
      { label: "All divisions", href: "/research" },
      { label: "Toxicology", href: "/research/toxicology" },
      { label: "Genetic toxicology", href: "/research/genetic-toxicology" },
      { label: "Ecotoxicology", href: "/research/ecotoxicology" },
      { label: "Chemistry", href: "/research/chemistry" },
      { label: "Medical device testing", href: "/research/medical-device-testing" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Agrochemical", href: "/services/agrochemical" },
      { label: "Pharmaceutical", href: "/services/pharmaceutical" },
      { label: "Medical devices & healthcare", href: "/services/medical-devices" },
      { label: "Industrial chemicals", href: "/services/industrial-chemicals" },
      { label: "Food & feed additives", href: "/services/food-and-feed-additives" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Study packages", href: "/products" },
      { label: "Downloads", href: "/downloads" },
      { label: "News & events", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
