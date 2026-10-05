import Header from "@/components/Header";
import Calculator from "@/components/Calculator";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <Header />

        <main className="flex flex-1 items-center justify-center py-8 sm:py-12">
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

        <footer className="mt-auto px-2 pt-3 pb-2 text-center text-xs leading-relaxed text-[var(--muted)]">
          © 2026 TheConverT · Built by King Tai · Privacy · Terms · Contact
        </footer>
      </div>
    </div>
  );
}
