"use client";

import { useRouter } from "next/navigation";
import Converter from "@/components/Converter";
import Header from "@/components/Header";

export default function LengthPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <Header />

        <main className="flex flex-1 items-center justify-center py-6 sm:py-10">
          <Converter category="Length" onBack={() => router.push("/")} />
        </main>

        <footer className="mt-auto px-2 pt-3 pb-2 text-center text-xs leading-relaxed text-[var(--muted)]">
          © 2026 TheConverT · Built by King Tai · Privacy · Terms · Contact
        </footer>
      </div>
    </div>
  );
}
