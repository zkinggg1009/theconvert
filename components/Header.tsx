"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavigationPanel from "@/components/NavigationPanel";

type ThemeMode = "light" | "dark";
type HeaderProps = {
  showTagline?: boolean;
  brandVariant?: "default" | "home";
};

export default function Header({
  showTagline = true,
  brandVariant = "default",
}: HeaderProps) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("convert-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const nextTheme = saved === "light" || saved === "dark" ? saved : preferred;

    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("convert-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header className="w-full pt-5 sm:pt-6">
      <div className="mx-auto hidden max-w-5xl items-center justify-between gap-4 px-4 max-[360px]:-mx-4 max-[360px]:gap-2 sm:flex sm:px-6 lg:px-8">
        <div className="w-10 sm:w-[5.5rem]" aria-hidden="true" />

        <Link
          href="/"
          className={`flex items-baseline leading-none text-[var(--foreground)] ${
            brandVariant === "home"
              ? "text-[2rem] font-semibold tracking-[-0.06em] sm:text-[2.55rem]"
              : "text-[2.1rem] font-semibold tracking-[-0.08em] sm:text-[2.7rem]"
          }`}
        >
          <span>TheConverT</span>
        </Link>

        <div className="flex items-center justify-self-end gap-2">
          <button
            type="button"
            aria-label="Toggle color theme"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-base text-[var(--foreground)] transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            {theme === "light" ? (
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19.2 15.4A8.5 8.5 0 0 1 8.6 4.8a8.5 8.5 0 1 0 10.6 10.6Z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            aria-label={isNavigationOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isNavigationOpen}
            aria-controls="global-navigation-panel"
            onClick={() => setIsNavigationOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            <svg
              aria-hidden="true"
              className={`h-5 w-5 transition-transform duration-200 ${
                isNavigationOpen ? "rotate-90" : "rotate-0"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              {isNavigationOpen ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className="relative mx-auto flex h-10 max-w-5xl items-center justify-center px-4 sm:hidden">
        <button
          type="button"
          aria-label={isNavigationOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isNavigationOpen}
          aria-controls="global-navigation-panel"
          onClick={() => setIsNavigationOpen((open) => !open)}
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          <svg
            aria-hidden="true"
            className={`h-5 w-5 transition-transform duration-200 ${
              isNavigationOpen ? "rotate-90" : "rotate-0"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          >
            {isNavigationOpen ? (
              <path d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <Link
          href="/"
          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 leading-none text-[var(--foreground)] ${
            brandVariant === "home"
              ? "text-[1.8rem] font-semibold tracking-[-0.06em]"
              : "text-[1.9rem] font-semibold tracking-[-0.08em]"
          }`}
        >
          <span>TheConverT</span>
        </Link>

        <button
          type="button"
          aria-label="Toggle color theme"
          onClick={toggleTheme}
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-base text-[var(--foreground)] transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          {theme === "light" ? (
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19.2 15.4A8.5 8.5 0 0 1 8.6 4.8a8.5 8.5 0 1 0 10.6 10.6Z" />
            </svg>
          )}
        </button>
      </div>

      <NavigationPanel
        open={isNavigationOpen}
        onClose={() => setIsNavigationOpen(false)}
      />

      {showTagline && (
        <div className="mt-3 text-center">
          <p
            className={`text-[var(--muted)] ${
              brandVariant === "home"
                ? "text-[0.82rem] font-medium leading-[1.4] tracking-[0.035em] sm:text-sm"
                : "text-sm font-medium tracking-[0.08em] sm:text-base"
            }`}
          >
            Simple. Precise. Fast.
          </p>
        </div>
      )}
    </header>
  );
}
