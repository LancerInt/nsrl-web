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
        title="Start with a conversation, not a quotation."
        lead="Tell us the test item, the sector and the authority that has to accept the dossier. We will tell you which studies that implies, which of our divisions run them, and what the programme looks like end to end."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        visual={<ContactHeroVisual />}
        aside={
          <div className="rounded-[var(--radius-card)] border border-ink-900/12 bg-canvas-raised p-8">
            <p className="label-mono text-neutral-600">Direct lines</p>

            <a
              href={`tel:${contact.phoneHref}`}
              className="mt-6 block font-display text-h1 text-ink-950 transition-colors duration-400 hover:text-meniscus-600"
            >
              {contact.phoneDisplay}
            </a>
            <a
              href={`tel:${contact.mobileHref}`}
              className="mt-2 block font-display text-h2 text-ink-950 transition-colors duration-400 hover:text-meniscus-600"
            >
              {contact.mobileDisplay}
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="mt-7 block break-words font-display text-h2 text-ink-950 underline decoration-ink-900/20 underline-offset-[6px] transition-colors duration-400 hover:text-meniscus-600 hover:decoration-meniscus-500"
            >
              {contact.email}
            </a>

            <ul className="mt-6 border-t border-ink-900/12">
              {locations.map((location) => (
                <li key={location.id} className="border-b border-ink-900/10 py-4 last:border-b-0">
                  <p className="text-small font-medium text-ink-900">{location.label}</p>
                  <p className="mt-1 text-micro text-neutral-500">{location.role}</p>
                </li>
              ))}
            </ul>

            <a
              href="#locations"
              className="label-mono mt-5 inline-flex min-h-9 items-center text-ink-700 underline decoration-ink-900/25 underline-offset-4 transition-colors duration-200 hover:text-meniscus-600 hover:decoration-meniscus-500"
            >
              Full address
            </a>
          </div>
        }
      />

      <EnquirySection />
      <LocationDirectory />
    </>
  );
}
