import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://theconvert.app/";
const pageTitle = "TheConverT — Simple & Fast Unit Conversion";
const metaDescription =
  "Free online unit converter for length, weight, temperature, area, volume and more. Fast, simple and accurate conversions on any device.";
const socialDescription =
  "Free online unit converter for length, weight, temperature, area, volume and more.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description: metaDescription,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: pageTitle,
    description: socialDescription,
    siteName: "TheConverT",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: socialDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://theconvert.app/#website",
      url: siteUrl,
      name: "TheConverT",
      description: metaDescription,
    },
    {
      "@type": "WebApplication",
      "@id": "https://theconvert.app/#webapplication",
      url: siteUrl,
      name: "TheConverT",
      description: metaDescription,
      applicationCategory: "UtilitiesApplication",
      isPartOf: {
        "@id": "https://theconvert.app/#website",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
