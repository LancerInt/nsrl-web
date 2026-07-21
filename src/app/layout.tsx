import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Instrument_Serif, Manrope } from "next/font/google";

import "./globals.css";

import { site } from "@/content/site";
import { JsonLd, organisationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/system/MotionProvider";
import { SmoothScroll } from "@/components/system/SmoothScroll";
import { ScrollProgress } from "@/components/system/ScrollProgress";
import { Preloader } from "@/components/system/Preloader";
import { Cursor } from "@/components/system/Cursor";

/* Four families, four jobs: display, body, instrument label, editorial accent. */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Complete Preclinical Research, Start to Finish`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  applicationName: site.name,
  keywords: [
    "contract research organisation",
    "preclinical CRO India",
    "GLP laboratory",
    "OECD GLP",
    "toxicology testing",
    "genotoxicity testing",
    "ecotoxicology",
    "medical device testing",
    "ISO 10993",
    "agrochemical registration",
    "NABL ISO/IEC 17025",
    "AAALAC accredited",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: true, address: false, email: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Complete Preclinical Research, Start to Finish`,
    description: site.shortDescription,
    locale: site.locale,
    // No `images` here: Next only uses app/opengraph-image.tsx when the
    // metadata object leaves openGraph.images unset.
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Complete Preclinical Research, Start to Finish`,
    description: site.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/brand/nsrl-logo.png", type: "image/png" }],
    apple: [{ url: "/brand/nsrl-logo.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfcfd" },
    { media: "(prefers-color-scheme: dark)", color: "#050b16" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${manrope.variable} ${inter.variable} ${plexMono.variable} ${instrument.variable}`}
    >
      <head>
        {/*
          Marks the document as script-capable before the first paint.

          Everything that hides itself to animate in — [data-reveal] and the
          page transition — is gated on `html.js`, so the server ships the page
          fully visible and a failed or blocked bundle still renders it. Setting
          the class from an effect instead would paint the content once and then
          hide it, producing a visible flash of the whole page on every load.
          This must stay a blocking inline script in <head> for that reason.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body className="antialiased">
        <JsonLd data={organisationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        {/* Wraps everything that can animate, including app/template.tsx, so
            `prefers-reduced-motion` reaches Framer's JS-driven inline styles. */}
        <MotionProvider>
          <Preloader />
          <ScrollProgress />
          <Cursor />

          <SmoothScroll>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
