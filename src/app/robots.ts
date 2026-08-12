import type { MetadataRoute } from "next";
import { business } from "@/lib/services";

export default function robots(): MetadataRoute.Robots {
  const base = business.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
