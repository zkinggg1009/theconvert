import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://theconvert.online/" },
    { url: "https://theconvert.online/length" },
  ];
}