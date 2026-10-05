"use client";

import { useEffect, useMemo, useState } from "react";
import Calculator from "@/components/Calculator";
import DecimalSelector from "@/components/DecimalSelector";
import UnitSelector from "@/components/UnitSelector";
import {
  categoryUnits,
  convertValue,
  getDefaultUnits,
  getShortUnitLabel,
  type Category,
} from "@/lib/conversions";

type ConverterProps = {
  category: Category;
  onBack: () => void;
};

export default function Converter({ category, onBack }: ConverterProps) {
  const units = categoryUnits[category];
  const defaultUnits = getDefaultUnits(category);
  const [fromUnit, setFromUnit] = useState(defaultUnits[0]);
  const [toUnit, setToUnit] = useState(defaultUnits[1]);
  const [inputValue, setInputValue] = useState("10");
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  useEffect(() => {
    const nextDefaults = getDefaultUnits(category);
    setFromUnit(nextDefaults[0]);
    setToUnit(nextDefaults[1]);
    setInputValue("10");
    setDecimalPlaces(2);
  }, [category]);

  const numericValue = useMemo(() => {
    if (inputValue === "") {
      return 0;
    }

    const parsed = Number.parseFloat(inputValue);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [inputValue]);

  const convertedValue = useMemo(
    () => convertValue(numericValue, fromUnit, toUnit, category),
    [numericValue, fromUnit, toUnit, category],
  );

  const formattedResult = Number.isFinite(convertedValue)
    ? convertedValue.toFixed(decimalPlaces)
    : "0";

  const handleInputChange = (value: string) => {
    if (value === "") {
      setInputValue("");
      return;
    }

    if (/^-?\d*\.?\d*$/.test(value) && !Number.isNaN(Number(value))) {
      setInputValue(value);
    }
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const applyCalculatorResult = (value: string) => {
    const cleaned = value.trim();
    if (cleaned && /^-?\d*\.?\d+$/.test(cleaned)) {
      setInputValue(cleaned);
    }
    setIsCalculatorOpen(false);
  };

  return (
    <section className="w-full max-w-xl rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 ease-out sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)] transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="min-w-0 truncate text-[2.1rem] font-medium tracking-[-0.05em] text-[var(--foreground)] sm:text-[2.5rem]">
          {category}
        </h2>

        <button
          type="button"
          aria-label="Open calculator"
          onClick={() => setIsCalculatorOpen(true)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 text-[0.74rem] font-medium text-[var(--foreground)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] sm:px-3 sm:text-sm"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="3" width="16" height="18" rx="3" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
          <span>Calculator</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <div className="relative">
              <input
                aria-label={`${category} input`}
                type="number"
                placeholder="Enter value"
                value={inputValue}
                onChange={(event) => {
                  handleInputChange(event.target.value);
                }}
                className="w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--input)] px-4 py-3.5 pr-24 text-xl text-[var(--foreground)] outline-none transition-all duration-200 placeholder:text-[var(--muted)] focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
              />
              <div className="pointer-events-none absolute inset-y-1 right-1 flex items-center rounded-xl bg-[var(--surface)] px-3 text-sm font-medium text-[var(--muted)]">
                {getShortUnitLabel(fromUnit, category)}
              </div>
            </div>
          </div>

          <div className="w-full sm:max-w-[190px]">
            <select
              aria-label="Select source unit"
              value={fromUnit}
              onChange={(event) => setFromUnit(event.target.value)}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--input)] px-3.5 py-3 text-base text-[var(--foreground)]"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            aria-label="Swap units"
            title="Swap units"
            onClick={handleSwap}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-lg text-[var(--foreground)] transition-colors hover:bg-[var(--input)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            <span aria-hidden="true">⇅</span>
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <div className="relative">
              <input
                aria-label={`${category} result`}
                type="text"
                value={formattedResult}
                readOnly
                className="w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--input)] px-4 py-3.5 pr-24 text-xl text-[var(--foreground)] outline-none"
              />
              <div className="pointer-events-none absolute inset-y-1 right-1 flex items-center rounded-xl bg-[var(--surface)] px-3 text-sm font-medium text-[var(--muted)]">
                {getShortUnitLabel(toUnit, category)}
              </div>
            </div>
          </div>

          <div className="w-full sm:max-w-[190px]">
            <select
              aria-label="Select target unit"
              value={toUnit}
              onChange={(event) => setToUnit(event.target.value)}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--input)] px-3.5 py-3 text-base text-[var(--foreground)]"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
          Decimal places
        </p>
        <DecimalSelector
          value={decimalPlaces}
          options={[0, 1, 2, 3, 4]}
          onChange={setDecimalPlaces}
        />
      </div>

      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,19,21,0.34)] p-4 backdrop-blur-[2px]">
          <Calculator
            initialValue={inputValue}
            onUseResult={applyCalculatorResult}
            onClose={() => setIsCalculatorOpen(false)}
          />
        </div>
      )}
    </section>
  );
}
