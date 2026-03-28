import { MetadataRoute } from "next";
import { packs } from "@/lib/packs";
import { LOCALES } from "@/lib/locales";

const BASE = "https://mojii.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const packPages = LOCALES.flatMap((lang) =>
    packs.map((pack) => ({
      url: `${BASE}/${lang}/packs/${pack.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const homePages = LOCALES.map((lang) => ({
    url: `${BASE}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const legalPages = LOCALES.flatMap((lang) =>
    ["license", "privacy"].map((page) => ({
      url: `${BASE}/${lang}/${page}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  );

  return [...homePages, ...packPages, ...legalPages];
}
