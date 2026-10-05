import type { Metadata } from "next";
import Header from "@/components/Header";
import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Online Calculator",
  description: "Use TheConverT's simple online calculator for quick everyday arithmetic on desktop or mobile.",
  alternates: { canonical: "https://theconvert.online/calculator" },
  openGraph: {
    type: "website",
    url: "https://theconvert.online/calculator",
    title: "Online Calculator | TheConverT",
    description: "Perform quick everyday arithmetic with TheConverT's online calculator.",
    siteName: "TheConverT",
  },
  twitter: {
    card: "summary",
    title: "Online Calculator | TheConverT",
    description: "Perform quick everyday arithmetic with TheConverT's online calculator.",
  },
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <Header />

        <main className="page-enter flex flex-1 items-center justify-center py-8 sm:py-12">
          <div className="w-full max-w-lg text-center">
            <div className="mb-6 text-center">
              <h1 className="text-[2.2rem] font-medium tracking-[-0.06em] text-[var(--foreground)] sm:text-[2.7rem]">
                Calculator
              </h1>
              <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
                Simple, precise calculations.
              </p>
            </div>

            <div className="flex justify-center">
              <Calculator />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
