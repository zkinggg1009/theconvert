export type CurrencyMetadata = {
  code: string;
  name: string;
  symbol?: string;
};

export type ExchangeRate = {
  base: string;
  quote: string;
  rate: number;
  date: string;
};

type FrankfurterCurrency = {
  iso_code?: unknown;
  name?: unknown;
  symbol?: unknown;
};

type FrankfurterRate = {
  base?: unknown;
  quote?: unknown;
  rate?: unknown;
  date?: unknown;
};

const apiBase = "https://api.frankfurter.dev/v2";

export async function getCurrencyMetadata(): Promise<CurrencyMetadata[]> {
  const response = await fetch(`${apiBase}/currencies`, {
    next: { revalidate: 86_400 },
  });

  if (!response.ok) {
    throw new Error("Currency metadata unavailable");
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("Invalid currency metadata response");
  }

  return (payload as FrankfurterCurrency[])
    .filter(
      (currency) =>
        typeof currency.iso_code === "string" &&
        /^[A-Z]{3}$/.test(currency.iso_code) &&
        typeof currency.name === "string",
    )
    .map((currency) => ({
      code: currency.iso_code as string,
      name: currency.name as string,
      ...(typeof currency.symbol === "string" && currency.symbol
        ? { symbol: currency.symbol }
        : {}),
    }))
    .sort((left, right) => left.code.localeCompare(right.code));
}

export async function getExchangeRate(
  base: string,
  quote: string,
): Promise<ExchangeRate> {
  if (!/^[A-Z]{3}$/.test(base) || !/^[A-Z]{3}$/.test(quote)) {
    throw new Error("Invalid currency pair");
  }

  const url = new URL(`${apiBase}/rates`);
  url.searchParams.set("base", base);
  if (base !== quote) {
    url.searchParams.set("quotes", quote);
  }

  const response = await fetch(url, {
    next: { revalidate: 3_600 },
  });

  if (!response.ok) {
    throw new Error("Exchange rate unavailable");
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("Invalid exchange rate response");
  }

  const records = (payload as FrankfurterRate[]).filter(
    (record) =>
      typeof record.base === "string" &&
      typeof record.quote === "string" &&
      typeof record.rate === "number" &&
      Number.isFinite(record.rate) &&
      record.rate > 0 &&
      typeof record.date === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(record.date),
  );

  if (base === quote) {
    const latestRecord = records
      .filter((record) => record.base === base)
      .sort((left, right) =>
        String(right.date).localeCompare(String(left.date)),
      )[0];

    if (!latestRecord) {
      throw new Error("Exchange rate unavailable");
    }

    return { base, quote, rate: 1, date: latestRecord.date as string };
  }

  const matchingRecord = records.find(
    (record) => record.base === base && record.quote === quote,
  );

  if (!matchingRecord) {
    throw new Error("Exchange rate unavailable");
  }

  return {
    base,
    quote,
    rate: matchingRecord.rate as number,
    date: matchingRecord.date as string,
  };
}

export function calculateConversion(amount: number, rate: number): number {
  return amount * rate;
}
