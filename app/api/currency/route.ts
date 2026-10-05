import {
  getCurrencyMetadata,
  getExchangeRate,
  type CurrencyMetadata,
  type ExchangeRate,
} from "@/lib/currency";

type CurrencyResponse = {
  currencies?: CurrencyMetadata[];
  exchangeRate?: ExchangeRate;
  error?: "currencies" | "rates";
};

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const base = searchParams.get("base")?.toUpperCase() ?? "";
  const quote = searchParams.get("quote")?.toUpperCase() ?? "";
  const includeCurrencies = searchParams.get("includeCurrencies") === "true";

  if (!/^[A-Z]{3}$/.test(base) || !/^[A-Z]{3}$/.test(quote)) {
    return Response.json({ error: "Invalid currency pair." }, { status: 400 });
  }

  const currenciesPromise: Promise<CurrencyMetadata[] | undefined> =
    includeCurrencies ? getCurrencyMetadata() : Promise.resolve(undefined);
  const [currenciesResult, rateResult] = await Promise.allSettled([
    currenciesPromise,
    getExchangeRate(base, quote),
  ]);

  const currencies =
    currenciesResult.status === "fulfilled"
      ? currenciesResult.value
      : undefined;
  const exchangeRate =
    rateResult.status === "fulfilled" ? rateResult.value : undefined;
  const error: CurrencyResponse["error"] =
    rateResult.status === "rejected"
      ? "rates"
      : currenciesResult.status === "rejected"
        ? "currencies"
        : undefined;

  const body: CurrencyResponse = {
    ...(currencies ? { currencies } : {}),
    ...(exchangeRate ? { exchangeRate } : {}),
    ...(error ? { error } : {}),
  };

  return Response.json(body, { status: error ? 502 : 200 });
}
