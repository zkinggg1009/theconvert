"use client";

import { useEffect, useRef, useState } from "react";
import Calculator from "@/components/Calculator";
import {
  calculateConversion,
  type CurrencyMetadata,
  type ExchangeRate,
} from "@/lib/currency";

type CurrencyResponse = {
  currencies?: CurrencyMetadata[];
  exchangeRate?: ExchangeRate;
  error?: "currencies" | "rates";
};

type CurrencySide = "base" | "quote";

type CurrencySelectorProps = {
  side: CurrencySide;
  selectedCode: string;
  currencies: CurrencyMetadata[];
  onSelect: (code: string) => void;
};

const regionOverrides: Record<string, string> = {
  EUR: "EU",
  GBP: "GB",
  ANG: "",
  XAF: "",
  XCD: "",
  XCG: "",
  XOF: "",
  XPF: "",
  XAG: "",
  XAU: "",
  XDR: "",
  XPD: "",
  XPT: "",
};

function getCurrencyFlag(code: string): string | null {
  const region = Object.hasOwn(regionOverrides, code)
    ? regionOverrides[code]
    : code.slice(0, 2);
  if (!/^[A-Z]{2}$/.test(region)) {
    return null;
  }

  return [...region]
    .map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)))
    .join("");
}

function CurrencySelector({
  side,
  selectedCode,
  currencies,
  onSelect,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectedCurrency = currencies.find(
    (currency) => currency.code === selectedCode,
  );
  const flag = getCurrencyFlag(selectedCode);
  const filteredCurrencies = currencies.filter((currency) => {
    const normalizedSearch = search.trim().toLowerCase();
    return (
      currency.code.toLowerCase().includes(normalizedSearch) ||
      currency.name.toLowerCase().includes(normalizedSearch)
    );
  });

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setSearch("");
    triggerRef.current?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="relative shrink-0"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) {
          closeMenu();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${side === "base" ? "From" : "To"} currency: ${selectedCode}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`currency-options-${side}`}
        onClick={() => {
          setSearch("");
          setIsOpen((open) => !open);
        }}
        className="inline-flex min-h-11 max-w-[13rem] min-w-0 items-center gap-1.5 rounded-xl px-1.5 text-[var(--foreground)] transition-colors hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] sm:max-w-[16rem] sm:gap-2 sm:px-2.5"
      >
        <span
          aria-hidden="true"
          className="grid size-6 shrink-0 place-items-center text-lg leading-none"
        >
          {flag ?? "¤"}
        </span>
        <span className="min-w-0 max-w-[4.75rem] flex-1 truncate text-left text-[0.78rem] font-medium min-[380px]:max-w-[7rem] sm:max-w-[9rem]">
          {selectedCurrency?.name ?? selectedCode}
        </span>
        <span className="shrink-0 text-xs font-semibold text-[var(--muted)]">
          {selectedCode}
        </span>
        <span aria-hidden="true" className="shrink-0 text-sm text-[var(--muted)]">
          ⌄
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-30 mt-2 w-[min(21rem,calc(100vw-2.5rem))] rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-2 shadow-xl backdrop-blur-xl">
          <label className="sr-only" htmlFor={`currency-search-${side}`}>
            Search currencies
          </label>
          <input
            ref={searchRef}
            id={`currency-search-${side}`}
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search currency..."
            autoComplete="off"
            className="mb-2 min-h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--input)] px-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--ring)]"
          />
          <div
            id={`currency-options-${side}`}
            role="listbox"
            aria-label={`${side === "base" ? "From" : "To"} currencies`}
            className="max-h-64 overflow-y-auto overscroll-contain"
          >
            {filteredCurrencies.length ? (
              filteredCurrencies.map((currency) => (
                <button
                  key={currency.code}
                  type="button"
                  role="option"
                  aria-selected={currency.code === selectedCode}
                  onClick={() => {
                    onSelect(currency.code);
                    closeMenu();
                  }}
                  className="grid min-h-12 w-full grid-cols-[1.5rem_minmax(0,1fr)_2.5rem] items-center gap-2 rounded-xl px-3 py-2 text-left transition-colors hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] aria-selected:bg-[var(--surface)]"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-6 place-items-center text-lg leading-none"
                  >
                    {getCurrencyFlag(currency.code) ?? "¤"}
                  </span>
                  <span className="min-w-0 truncate text-sm font-medium text-[var(--foreground)]">
                    {currency.name}
                  </span>
                  <span className="text-right text-xs font-semibold text-[var(--muted)]">
                    {currency.code}
                  </span>
                </button>
              ))
            ) : (
              <p className="px-3 py-4 text-sm text-[var(--muted)]">
                {currencies.length ? "No currencies found." : "Currency list unavailable."}
              </p>
            )}
          </div>
          {selectedCurrency && (
            <p className="sr-only" aria-live="polite">
              Selected {selectedCurrency.name}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function formatAmount(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
    minimumFractionDigits: 2,
  }).format(value);
}

function formatRate(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 8,
    minimumSignificantDigits: 2,
  }).format(value);
}

function formatRateDate(value: string): string {
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en", {
        dateStyle: "long",
        timeZone: "UTC",
      }).format(date);
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [base, setBase] = useState("USD");
  const [quote, setQuote] = useState("MYR");
  const [currencies, setCurrencies] = useState<CurrencyMetadata[]>([]);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<"currencies" | "rates" | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const currenciesLoaded = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const searchParams = new URLSearchParams({ base, quote });
    if (!currenciesLoaded.current) {
      searchParams.set("includeCurrencies", "true");
    }

    const loadCurrencyData = async () => {
      try {
        const response = await fetch(`/api/currency?${searchParams}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as CurrencyResponse;

        if (data.currencies) {
          setCurrencies(data.currencies);
          currenciesLoaded.current = true;
        }
        if (data.exchangeRate) {
          setExchangeRate(data.exchangeRate);
        }
        if (!response.ok || data.error || !data.exchangeRate) {
          setError(data.error ?? "rates");
          return;
        }

        setError(null);
      } catch {
        if (!controller.signal.aborted) {
          setError("rates");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadCurrencyData();
    return () => controller.abort();
  }, [base, quote, retryCount]);

  const matchingRate =
    exchangeRate?.base === base && exchangeRate.quote === quote
      ? exchangeRate
      : null;
  const numericAmount = amount === "" ? Number.NaN : Number(amount);
  const convertedAmount =
    matchingRate && Number.isFinite(numericAmount)
      ? calculateConversion(numericAmount, matchingRate.rate)
      : null;

  const updateAmount = (value: string) => {
    if (value.length <= 24 && /^(?:\d+\.?\d*|\.\d*)?$/.test(value)) {
      setAmount(value);
    }
  };

  const selectBase = (code: string) => {
    if (code !== base) {
      setError(null);
      setIsLoading(true);
      setBase(code);
    }
  };

  const selectQuote = (code: string) => {
    if (code !== quote) {
      setError(null);
      setIsLoading(true);
      setQuote(code);
    }
  };

  const swapCurrencies = () => {
    if (base !== quote) {
      setError(null);
      setIsLoading(true);
      setBase(quote);
      setQuote(base);
    }
  };

  const applyCalculatorResult = (value: string) => {
    const cleaned = value.trim();
    if (cleaned && /^-?\d*\.?\d+$/.test(cleaned)) {
      setAmount(cleaned);
    }
    setIsCalculatorOpen(false);
  };

  return (
    <section
      aria-label="Currency converter"
      className="w-full rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_1px_0_rgba(0,0,0,0.02)] sm:p-6"
    >
      <div className="space-y-3">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--input)] p-4 sm:p-5">
          <label
            htmlFor="currency-amount"
            className="mb-2 block text-xs font-medium uppercase text-[var(--muted)]"
          >
            You send
          </label>
          <div className="flex min-w-0 flex-col gap-1.5 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
            <div className="flex w-full min-w-0 items-center gap-2 min-[400px]:flex-1">
              <input
                id="currency-amount"
                aria-label={`Amount in ${base}`}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                maxLength={24}
                value={amount}
                onChange={(event) => updateAmount(event.target.value)}
                className="w-full min-w-0 border-0 bg-transparent py-1 text-3xl! font-medium tabular-nums text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] sm:text-4xl!"
                placeholder="0"
              />
              <button
                type="button"
                aria-label="Open calculator"
                onClick={() => setIsCalculatorOpen(true)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
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
              </button>
            </div>
            <div className="flex justify-end min-[400px]:contents">
              <CurrencySelector
                side="base"
                selectedCode={base}
                currencies={currencies}
                onSelect={selectBase}
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 -my-1 flex justify-center">
          <button
            type="button"
            aria-label={`Swap ${base} and ${quote}`}
            title="Swap currencies"
            onClick={swapCurrencies}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-xl text-[var(--foreground)] transition-colors hover:bg-[var(--input)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            <span aria-hidden="true">⇅</span>
          </button>
        </div>

        <div
          aria-busy={isLoading}
          className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5"
        >
          <div className="mb-2 flex min-h-4 items-center justify-between gap-3">
            <span className="text-xs font-medium uppercase text-[var(--muted)]">
              You receive
            </span>
            {isLoading && (
              <span className="text-xs text-[var(--muted)]" role="status">
                Updating rate...
              </span>
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-1.5 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
            <output
              aria-label={`Converted amount in ${quote}`}
              aria-live="polite"
              className="w-full min-w-0 truncate py-1 text-3xl font-medium tabular-nums text-[var(--foreground)] min-[400px]:flex-1 sm:text-4xl"
            >
              {convertedAmount === null ? "—" : formatAmount(convertedAmount)}
            </output>
            <div className="flex justify-end min-[400px]:contents">
              <CurrencySelector
                side="quote"
                selectedCode={quote}
                currencies={currencies}
                onSelect={selectQuote}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-[var(--border)] pt-4">
        {matchingRate ? (
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-sm font-medium text-[var(--foreground)]">
              1 {base} = {formatRate(matchingRate.rate)} {quote}
            </p>
            <p className="text-xs text-[var(--muted)]">
              Rate updated: {formatRateDate(matchingRate.date)}
            </p>
          </div>
        ) : (
          <p className="min-h-5 text-xs text-[var(--muted)]">
            Latest available exchange rate
          </p>
        )}
        <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
          Reference rates are the latest available, not real-time trading prices.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] px-3 py-2.5 text-sm text-[var(--muted)]"
        >
          <span>
            {error === "currencies"
              ? "Currency data is temporarily unavailable."
              : "Exchange rates are temporarily unavailable."}
          </span>
          <button
            type="button"
            onClick={() => {
              setError(null);
              setIsLoading(true);
              setRetryCount((count) => count + 1);
            }}
            className="min-h-10 px-2 font-medium text-[var(--foreground)] underline decoration-[var(--border-strong)] underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            Try again
          </button>
        </div>
      )}

      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,19,21,0.34)] p-4 backdrop-blur-[2px]">
          <Calculator
            initialValue={amount}
            onUseResult={applyCalculatorResult}
            onClose={() => setIsCalculatorOpen(false)}
          />
        </div>
      )}
    </section>
  );
}
