import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter",
  description: "Convert length, weight, temperature, area, volume, time, speed, pressure, energy, and power with TheConverT.",
  alternates: { canonical: "https://theconvert.online/units" },
  openGraph: {
    type: "website",
    url: "https://theconvert.online/units",
    title: "Unit Converter | TheConverT",
    description: "Choose a measurement category and convert everyday units with TheConverT.",
    siteName: "TheConverT",
  },
  twitter: {
    card: "summary",
    title: "Unit Converter | TheConverT",
    description: "Choose a measurement category and convert everyday units with TheConverT.",
  },
};

export default function UnitsLayout({ children }: LayoutProps<"/units">) {
  return children;
}
