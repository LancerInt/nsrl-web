import type { Metadata } from "next";

import { JsonLd, pageMetadata } from "@/lib/seo";
import { contact, locations, site } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { ContactHeroVisual } from "@/components/contact/ContactHeroVisual";
import { EnquirySection } from "@/components/contact/EnquirySection";
import { LocationDirectory } from "@/components/contact/LocationDirectory";

export const metadata: Metadata = pageMetadata({
  title: "Contact — talk to NSRL about a study",
  description: `Call ${contact.phoneDisplay}, write to ${contact.email}, or send an enquiry. NSRL's office and laboratory are in Salem, Tamil Nadu, India.`,
  path: "/contact",
  keywords: [
    "contact NSRL",
    "preclinical CRO enquiry",
    "GLP laboratory Tamil Nadu",
    "request a study proposal",
  ],
});

/** ContactPage node, with the organisation's reachable contact points attached. */
function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${site.url}/contact#page`,
    url: `${site.url}/contact`,
    name: `Contact ${site.name}`,
    description: `Telephone, email and the ${site.name} office in Salem, Tamil Nadu, India.`,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organisation` },
    mainEntity: {
      "@type": ["Organization", "ResearchOrganization"],
      "@id": `${site.url}/#organisation`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      telephone: contact.phoneDisplay,
      email: contact.email,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          name: "Study enquiries",
          telephone: contact.phoneDisplay,
          email: contact.email,
          areaServed: "Worldwide",
          availableLanguage: ["en"],
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          name: "Client services",
          telephone: contact.phoneDisplay,
          email: contact.email,
          areaServed: "Worldwide",
          availableLanguage: ["en"],
        },
      ],
      location: locations.map((location) => ({
        "@type": "Place",
        name: location.label,
        description: location.role,
        address: {
          "@type": "PostalAddress",
          streetAddress: location.lines.join(", "),
          addressCountry: "IN",
        },
      })),
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd()} />

      <PageHero
        tone="light"
        eyebrow="Contact"
        title="Discuss your study requirements."
        lead="Tell us the test item, the sector and the authority that has to accept the dossier."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        visual={<ContactHeroVisual />}
      />

      {/* The "Direct lines" panel that stood in the hero is gone. It
          carried the phone, the mobile and the email, and the enquiry
          section below carries the same three beside the form — the place
          a reader is actually deciding how to get in touch. One supporting
          column, not two, and the form moves up by the height of the panel
          that was duplicating it. The full address stays in the location
          directory, which is the one place it is not a repeat. */}

      <EnquirySection />
      <LocationDirectory />
    </>
  );
}
