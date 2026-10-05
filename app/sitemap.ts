import type { MetadataRoute } from "next";
import { getAllConversionPageSlugs } from "@/lib/seo/conversion-pages";

const baseUrl = "https://theconvert.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "units",
    "length",
    "currency",
    "about",
    "mission",
    "contact",
    "how-it-works",
    "faq",
    "feedback",
    "privacy",
    "terms",
  ];

  const allRoutes = [...staticRoutes, ...getAllConversionPageSlugs()];

  return allRoutes.map((route) => ({
    url: route ? `${baseUrl}/${route}` : baseUrl,
  }));
}