"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";

type NavigationPanelProps = {
  open: boolean;
  onClose: () => void;
};

type NavigationLink = {
  href: string;
  label: string;
  detail?: string;
};

type NavigationSection = {
  id: string;
  label: string;
  links: NavigationLink[];
};

const navigationSections: NavigationSection[] = [
  {
    id: "explore",
    label: "Explore",
    links: [{ href: "/", label: "Products", detail: "Explore all tools" }],
  },
  {
    id: "company",
    label: "Company",
    links: [
      { href: "/about", label: "About TheConverT" },
      { href: "/mission", label: "Our Mission" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    id: "information",
    label: "Information",
    links: [
      { href: "/how-it-works", label: "How It Works" },
      { href: "/faq", label: "FAQ" },
      { href: "/feedback", label: "Feedback" },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
    ],
  },
];

export default function NavigationPanel({
  open,
  onClose,
}: NavigationPanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const requestClose = () => {
    setIsVisible(false);
    onClose();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
        closeButtonRef.current?.focus();
      });
      return () => window.cancelAnimationFrame(frame);
    }

    if (dialog.open) {
      const closeDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260;
      const timer = window.setTimeout(() => {
        if (dialog.open) {
          dialog.close();
        }
      }, closeDelay);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const closeOnBackdropClick = (
    event: MouseEvent<HTMLDialogElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      requestClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="global-navigation-panel"
      aria-labelledby="navigation-brand"
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          requestClose();
        }
      }}
      onClose={onClose}
      onClick={closeOnBackdropClick}
      className={`fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(26rem,100vw)] max-w-none overflow-y-auto border-0 border-l border-[var(--border)] bg-[var(--background)] p-0 text-[var(--foreground)] shadow-[-20px_0_60px_rgba(0,0,0,0.16)] outline-none transition-transform duration-[260ms] ease-out motion-reduce:transition-none backdrop:bg-[rgba(17,19,21,0.3)] backdrop:backdrop-blur-[2px] ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } ${isVisible ? "panel-visible" : ""}`}
    >
      <div className="flex min-h-full flex-col px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <Link
              id="navigation-brand"
              href="/"
              onClick={requestClose}
              className="text-[1.8rem] font-semibold leading-none tracking-[-0.06em] text-[var(--foreground)]"
            >
              TheConverT
            </Link>
            <p className="mt-2 text-[0.82rem] font-medium leading-[1.4] tracking-[0.035em] text-[var(--muted)]">
              Simple. Precise. Fast.
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close navigation"
            onClick={requestClose}
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="my-8 h-px bg-[var(--border)]" />

        <nav aria-label="Global navigation" className="flex-1">
          <div className="space-y-5">
            {navigationSections.map((section) => (
              <section
                key={section.id}
                aria-labelledby={`navigation-${section.id}`}
              >
                <h2
                  id={`navigation-${section.id}`}
                  className="mb-1.5 text-[0.68rem] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-[var(--muted)]"
                >
                  {section.label}
                </h2>
                <ul className="divide-y divide-[var(--border)]">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={requestClose}
                        className="group flex min-h-11 items-center justify-between gap-4 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                      >
                        <span>
                          <span className="block text-[0.98rem] font-medium leading-[1.35] tracking-[-0.015em] text-[var(--foreground)]">
                            {link.label}
                          </span>
                          {link.detail && (
                            <span className="mt-1 block text-xs leading-relaxed text-[var(--muted)]">
                              {link.detail}
                            </span>
                          )}
                        </span>
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </nav>

        <p className="mt-6 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--muted)]">
          © 2026 TheConverT
        </p>
      </div>
    </dialog>
  );
}
