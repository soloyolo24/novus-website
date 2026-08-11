import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The chat endpoint isn't a page and should never be indexed.
      disallow: "/api/",
    },
    sitemap: "https://novussolutions.co/sitemap.xml",
  };
}
