"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

export default function Header() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

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
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="w-10" aria-hidden="true" />

        <div className="flex items-baseline text-[2.1rem] font-semibold tracking-[-0.08em] text-[var(--foreground)] leading-none sm:text-[2.7rem]">
          <span>TheConverT</span>
        </div>

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
              <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
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

      <div className="mt-3 text-center">
        <p className="text-sm font-medium tracking-[0.08em] text-[var(--muted)] sm:text-base">
          Simple. Precise. Fast.
        </p>
      </div>
    </header>
  );
}
