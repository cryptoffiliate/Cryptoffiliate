import { MetadataRoute } from "next";
import { EXCHANGES } from "@/data/exchanges";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cryptoffiliate.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                             lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${baseUrl}/compare`,                lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${baseUrl}/reviews`,                lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/bonuses`,                lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${baseUrl}/quiz`,                   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/alerts`,                 lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tools/fee-calculator`,   lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/tools/fee-breakdown`,    lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
  ];

  const reviewPages: MetadataRoute.Sitemap = EXCHANGES.map((e) => ({
    url: `${baseUrl}/reviews/${e.slug}`,
    lastModified: new Date(e.lastUpdated),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...reviewPages];
}
