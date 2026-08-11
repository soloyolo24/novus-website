import { tiers } from "../lib/data";

const BASE = "https://novussolutions.co";

/**
 * JSON-LD for Google. ProfessionalService is the right type here rather than
 * plain Organization — it carries areaServed and the service catalogue, which
 * is what local search actually reads.
 *
 * Deliberately omitted: `telephone` and `sameAs`. Both would need real values,
 * and wrong structured data is worse than none — Google penalises mismatches
 * against what's on the page.
 */
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${BASE}/#business`,
        name: "Novus Solutions",
        url: BASE,
        image: `${BASE}/opengraph-image.png`,
        logo: `${BASE}/novus-logo.png`,
        email: "contact@novussolutions.co",
        description:
          "Technology and business growth for auto shops — websites, AI chatbots, phone assistants, and automated lead follow-up. Based in Chicago.",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chicago",
          addressRegion: "IL",
          addressCountry: "US",
        },
        areaServed: {
          "@type": "City",
          name: "Chicago",
        },
        knowsAbout: [
          "Auto repair shop marketing",
          "AI phone answering",
          "Missed call text back",
          "Lead follow-up automation",
          "Local SEO",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Packages",
          itemListElement: tiers.map((tier) => ({
            "@type": "Offer",
            name: tier.name,
            description: tier.goal,
            priceCurrency: "USD",
            price: tier.setup.replace(/[^0-9.]/g, ""),
            category: "Setup fee",
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: BASE,
        name: "Novus Solutions",
        publisher: { "@id": `${BASE}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from a trusted local object, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
