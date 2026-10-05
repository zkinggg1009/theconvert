"use client";

import { useRouter } from "next/navigation";
import Converter from "@/components/Converter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LengthPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <Header />

        <main className="page-enter flex flex-1 items-center justify-center py-6 sm:py-10">
          <Converter category="Length" onBack={() => router.push("/")} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
