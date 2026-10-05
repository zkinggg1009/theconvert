"use client";

import { useState } from "react";
import CategorySelector from "@/components/CategorySelector";
import Converter from "@/components/Converter";
import Header from "@/components/Header";
import { categories, type Category } from "@/lib/conversions";

export default function UnitsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <Header />

        {!selectedCategory ? (
          <main className="flex flex-1 flex-col items-center justify-center py-8 sm:py-12">
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
          <main className="flex flex-1 items-center justify-center py-6 sm:py-10">
            <Converter
              category={selectedCategory}
              onBack={() => setSelectedCategory(null)}
            />
          </main>
        )}

        <footer className="mt-auto px-2 pt-3 pb-2 text-center text-xs leading-relaxed text-[var(--muted)]">
          © 2026 TheConverT · Built by King Tai · Privacy · Terms · Contact
        </footer>
      </div>
    </div>
  );
}
