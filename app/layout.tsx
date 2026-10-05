import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://theconvert.online";
const metaDescription =
  "Explore TheConverT's unit and currency converters: simple, precise tools for everyday conversions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TheConverT | Unit and Currency Converters",
    template: "%s | TheConverT",
  },
  description: metaDescription,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "TheConverT | Unit and Currency Converters",
    description: metaDescription,
    siteName: "TheConverT",
  },
  twitter: {
    card: "summary",
    title: "TheConverT | Unit and Currency Converters",
    description: metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "TheConverT",
      description: metaDescription,
    },
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#webapplication`,
      url: siteUrl,
      name: "TheConverT",
      description: metaDescription,
      applicationCategory: "UtilitiesApplication",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
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
