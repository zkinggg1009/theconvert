import type { Metadata } from "next";

type InformationMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createInformationMetadata({
  title,
  description,
  path,
}: InformationMetadataInput): Metadata {
  const pageTitle = `${title} | TheConverT`;
  const pageUrl = `https://theconvert.online${path}`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title: pageTitle,
      description,
      siteName: "TheConverT",
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description,
    },
  };
}
