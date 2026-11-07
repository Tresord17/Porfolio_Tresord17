import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/i18n";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = locales.map((l) => ({ url: `${siteUrl}/${l}`, changeFrequency: "monthly" as const, priority: 1 }));
  const pages = locales.flatMap((l) =>
    projects.map((p) => ({ url: `${siteUrl}/${l}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  );
  return [...home, ...pages];
}
