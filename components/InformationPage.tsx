import type { ReactNode } from "react";
import Header from "@/components/Header";

type InformationPageProps = {
  section: "Company" | "Information" | "Legal";
  title: string;
  description: string;
  children: ReactNode;
};

type InformationSectionProps = {
  title: string;
  children: ReactNode;
};

export function InformationSection({
  title,
  children,
}: InformationSectionProps) {
  return (
    <section className="border-t border-[var(--border)] pt-5 first:border-0 first:pt-0">
      <h2 className="text-base font-semibold leading-[1.4] text-[var(--foreground)]">
        {title}
      </h2>
      <div className="mt-2 space-y-3 text-sm leading-[1.7] text-[var(--muted)]">
        {children}
      </div>
    </section>
  );
}

export default function InformationPage({
  section,
  title,
  description,
  children,
}: InformationPageProps) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <Header />

        <main className="mx-auto w-full max-w-3xl flex-1 py-10 sm:py-14">
          <header className="mb-8 sm:mb-10">
            <p className="mb-3 text-[0.68rem] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-[var(--muted)]">
              {section}
            </p>
            <h1 className="text-3xl font-medium leading-tight tracking-[-0.025em] text-[var(--foreground)] sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {description}
            </p>
          </header>

          <article className="space-y-7">{children}</article>
        </main>

        <footer className="mt-auto px-2 pt-3 pb-2 text-center text-xs leading-relaxed text-[var(--muted)]">
          © 2026 TheConverT · Built by King Tai · Privacy · Terms · Contact
        </footer>
      </div>
    </div>
  );
}
