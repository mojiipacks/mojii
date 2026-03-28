import { MetadataRoute } from "next";
import { packs } from "@/lib/packs";

const BASE = "https://mojii.com";
const locales = ["en", "uk"];

export default function sitemap(): MetadataRoute.Sitemap {
  const packPages = locales.flatMap((lang) =>
    packs.map((pack) => ({
      url: `${BASE}/${lang}/packs/${pack.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const homePages = locales.map((lang) => ({
    url: `${BASE}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const legalPages = locales.flatMap((lang) =>
    ["license", "privacy"].map((page) => ({
      url: `${BASE}/${lang}/${page}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  );

  return [...homePages, ...packPages, ...legalPages];
}
