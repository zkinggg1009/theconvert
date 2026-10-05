"use client";

import { useEffect, useRef, useState } from "react";

type UnitSelectorProps = {
  label?: string;
  value: string;
  options: string[];
  onChange?: (value: string) => void;
};

export default function UnitSelector({
  label,
  value,
  options,
  onChange,
}: UnitSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDownOutside(event: Event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDownOutside, {
      passive: true,
    });
    return () => document.removeEventListener("pointerdown", handlePointerDownOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full text-left">
      {label ? (
        <span className="mb-2 block text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
          {label}
        </span>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="relative flex w-full items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--input)] px-3.5 py-3 pr-9 text-base text-[var(--foreground)] outline-none transition-all duration-200 hover:border-[var(--border-strong)] focus-visible:border-[var(--border-strong)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{value}</span>
        <span aria-hidden="true" className="text-sm text-[var(--muted)] transition-transform duration-200">
          {isOpen ? "▴" : "▾"}
        </span>
      </button>

      {isOpen ? (
        <div className="selector-enter absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-auto rounded-2xl border border-[var(--border)] bg-[var(--panel)] shadow-[0_12px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange?.(option);
                setIsOpen(false);
              }}
              className={[
                "block w-full px-3.5 py-2.5 text-left text-base text-[var(--foreground)] transition-colors duration-150",
                option === value ? "bg-[var(--surface)]" : "hover:bg-[var(--surface)]",
              ].join(" ")}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
