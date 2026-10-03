"use client";

import { useState } from "react";
import CategorySelector from "@/components/CategorySelector";
import Converter from "@/components/Converter";
import Header from "@/components/Header";
import { categories, type Category } from "@/lib/conversions";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <Header />

        {!selectedCategory ? (
          <main className="flex flex-1 items-start justify-center pt-2 sm:pt-4">
            <CategorySelector
              categories={categories}
              onSelect={setSelectedCategory}
            />
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
