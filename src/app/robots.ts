import type { MetadataRoute } from "next";
import { business } from "@/lib/services";

const AI_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Amazonbot",
  "Applebot-Extended",
] as const;

const GOOGLE_USER_AGENTS = [
  "Googlebot",
  "Googlebot-Image",
  "GoogleOther",
] as const;

export default function robots(): MetadataRoute.Robots {
  const base = business.url.replace(/\/$/, "");
  const hostname = new URL(business.url).host;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [...GOOGLE_USER_AGENTS],
        allow: "/",
      },
      {
        userAgent: [...AI_USER_AGENTS],
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: hostname,
  };
}
