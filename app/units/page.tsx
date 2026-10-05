"use client";

import { useState } from "react";
import CategorySelector from "@/components/CategorySelector";
import Converter from "@/components/Converter";
import Header from "@/components/Header";
import { categories, type Category } from "@/lib/conversions";
import Footer from "@/components/Footer";

export default function UnitsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <Header />

        {!selectedCategory ? (
          <main className="page-enter flex flex-1 flex-col items-center justify-start pt-8 pb-8 sm:pt-[clamp(3rem,10vh,6rem)] sm:pb-12">
            <div className="w-full max-w-md text-center">
              <h1 className="text-3xl font-medium text-[var(--foreground)] sm:text-4xl">
                Unit Converter
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Convert everyday units simply and precisely.
              </p>
            </div>
            <div className="mt-5 w-full max-w-md">
              <CategorySelector
                categories={categories}
                onSelect={setSelectedCategory}
              />
            </div>
          </main>
        ) : (
          <main className="page-enter flex flex-1 items-center justify-center py-6 sm:py-10">
            <Converter
              category={selectedCategory}
              onBack={() => setSelectedCategory(null)}
            />
          </main>
        )}

        <Footer />
      </div>
    </div>
  );
}
