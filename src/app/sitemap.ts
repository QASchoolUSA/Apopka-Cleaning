import type { MetadataRoute } from "next";
import { business, services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.url.replace(/\/$/, "");
  // Stable release dates prevent sitemap timestamps from shifting on every request.
  const siteUpdated = new Date("2026-10-31T00:00:00.000Z");
  const guideUpdated = new Date("2026-10-19T00:00:00.000Z");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/services`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/quote`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/guides`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const guideRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/guides/how-much-does-house-cleaning-cost-apopka-fl`,
      lastModified: guideUpdated,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: siteUpdated,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...guideRoutes, ...serviceRoutes];
}
