import type { MetadataRoute } from "next";
import { services, projects, posts } from "./lib/data";

const BASE = "https://novussolutions.co";

/**
 * Generated from the same data the pages render from, so new services,
 * projects, or posts appear in the sitemap without a second edit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: BASE, changeFrequency: "monthly", priority: 1 },
      { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${BASE}/pricing`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${BASE}/book`, changeFrequency: "yearly", priority: 0.9 },
      { url: `${BASE}/work`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${BASE}/about`, changeFrequency: "yearly", priority: 0.6 },
      { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.6 },
      { url: `${BASE}/insights`, changeFrequency: "weekly", priority: 0.5 },
    ] as const
  ).map((r) => ({ ...r, lastModified: now }));

  return [
    ...staticRoutes,
    ...services.map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${BASE}/insights/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
