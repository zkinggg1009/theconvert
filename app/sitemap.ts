import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://theconvert.online/" },
    { url: "https://theconvert.online/units" },
    { url: "https://theconvert.online/length" },
    { url: "https://theconvert.online/currency" },
    { url: "https://theconvert.online/about" },
    { url: "https://theconvert.online/mission" },
    { url: "https://theconvert.online/contact" },
    { url: "https://theconvert.online/how-it-works" },
    { url: "https://theconvert.online/faq" },
    { url: "https://theconvert.online/feedback" },
    { url: "https://theconvert.online/privacy" },
    { url: "https://theconvert.online/terms" },
  ];
}