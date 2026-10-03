"use client";

import type { Category } from "@/lib/conversions";

type CategorySelectorProps = {
  categories: readonly Category[];
  onSelect: (category: Category) => void;
};

export default function CategorySelector({
  categories,
  onSelect,
}: CategorySelectorProps) {
  return (
    <section className="w-full max-w-md text-center">
      <select
        defaultValue=""
        aria-label="Select a category"
        onChange={(e) => {
          const value = e.currentTarget.value;
          onSelect(value as Category);
        }}
        className="mt-5 block w-full rounded-2xl border border-[var(--border)] bg-[var(--panel)] text-left text-base text-[var(--foreground)] shadow-[0_1px_0_rgba(0,0,0,0.02)] outline-none focus-visible:border-[var(--border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        style={{
          display: "block",
          width: "100%",
          minHeight: "56px",
          padding: "12px",
          fontSize: "18px",
          pointerEvents: "auto",
          touchAction: "manipulation",
          position: "relative",
          zIndex: 9999
        }}
      >
        <option value="" disabled>Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </section>
  );
}
