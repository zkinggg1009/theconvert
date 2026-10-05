import type { Metadata } from "next";
import { getConversionPageDefinition, getPageDescription, getPageTitle } from "@/lib/seo/conversion-pages";

export function buildSeoMetadata(slug: string): Metadata {
  const definition = getConversionPageDefinition(slug);

  if (!definition) {
    return {
      title: "TheConverT",
      description: "Conversion tools for everyday use.",
    };
  }

  const title = `${getPageTitle(definition)} — TheConverT`;
  const description = getPageDescription(definition);
  const canonical = `https://theconvert.online/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "TheConverT",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
