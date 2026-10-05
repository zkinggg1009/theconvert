import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Length Converter",
  description: "Convert meters, kilometers, miles, feet, inches, and other length units with TheConverT's length converter.",
  alternates: { canonical: "https://theconvert.online/length" },
  openGraph: {
    type: "website",
    url: "https://theconvert.online/length",
    title: "Length Converter | TheConverT",
    description: "Convert common metric and imperial length units with TheConverT.",
    siteName: "TheConverT",
  },
  twitter: {
    card: "summary",
    title: "Length Converter | TheConverT",
    description: "Convert common metric and imperial length units with TheConverT.",
  },
};

export default function LengthLayout({ children }: LayoutProps<"/length">) {
  return children;
}
