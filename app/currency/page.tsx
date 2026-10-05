import type { Metadata } from "next";
import CurrencyConverter from "@/components/CurrencyConverter";
import Header from "@/components/Header";

const pageTitle = "Currency Converter — Convert USD, EUR, GBP & More | TheConverT";
const pageDescription =
  "Free online currency converter. Convert USD, MYR, EUR, GBP, JPY and more using the latest available exchange rates.";
const pageUrl = "https://theconvert.online/currency";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    siteName: "TheConverT",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

const faqs = [
  {
    question: "How does the currency converter work?",
    answer:
      "Choose two currencies and enter an amount. The result is calculated from the latest available rate returned for that pair.",
  },
  {
    question: "How often are exchange rates updated?",
    answer:
      "Frankfurter provides the latest available reference rates. The date shown is the rate date returned for your selected pair; rates are not real-time trading prices.",
  },
  {
    question: "Is TheConverT currency converter free?",
    answer:
      "Yes. The converter is free to use and does not require an account or an API key.",
  },
  {
    question: "Which currencies are supported?",
    answer:
      "The searchable selector uses the currencies published by Frankfurter. Rate availability can vary by currency pair.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Currency Converter | TheConverT",
      url: pageUrl,
      description: pageDescription,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
};

export default function CurrencyPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
        <Header showTagline={false} />

        <main className="w-full flex-1 py-8 sm:py-12">
          <header className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-medium text-[var(--foreground)] sm:text-4xl">
              Currency
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Convert with the latest available exchange rates, with the date
              shown for every selected pair.
            </p>
          </header>

          <div className="mx-auto mt-7 w-full max-w-2xl">
            <CurrencyConverter />
          </div>

          <div className="mx-auto mt-12 max-w-3xl border-t border-[var(--border)] pt-8 sm:mt-14">
            <section aria-labelledby="current-rate-heading">
              <h2
                id="current-rate-heading"
                className="text-lg font-medium text-[var(--foreground)]"
              >
                Current Exchange Rate
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Conversions use the latest available rate for the selected pair.
                Rates are for reference and are not real-time trading prices.
              </p>
            </section>

            <section
              aria-labelledby="popular-pairs-heading"
              className="mt-8 border-t border-[var(--border)] pt-6"
            >
              <h2
                id="popular-pairs-heading"
                className="text-lg font-medium text-[var(--foreground)]"
              >
                Popular Currency Pairs
              </h2>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
                {["USD → MYR", "MYR → USD", "USD → SGD", "USD → EUR", "USD → GBP", "USD → JPY"].map(
                  (pair) => (
                    <li key={pair}>{pair}</li>
                  ),
                )}
              </ul>
            </section>

            <section
              aria-labelledby="about-heading"
              className="mt-8 border-t border-[var(--border)] pt-6"
            >
              <h2
                id="about-heading"
                className="text-lg font-medium text-[var(--foreground)]"
              >
                About Currency Conversion
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
                <p>
                  TheConverT calculates the converted amount from the selected
                  currencies and the latest available Frankfurter rate.
                </p>
                <p>
                  Exchange rates can change and may not reflect a rate available
                  for a transaction. Use the displayed rate date as a reference.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="faq-heading"
              className="mt-8 border-t border-[var(--border)] pt-6"
            >
              <h2
                id="faq-heading"
                className="text-lg font-medium text-[var(--foreground)]"
              >
                Frequently Asked Questions
              </h2>
              <div className="mt-3 divide-y divide-[var(--border)]">
                {faqs.map(({ question, answer }) => (
                  <details key={question} className="group py-3">
                    <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
                      {question}
                      <span
                        aria-hidden="true"
                        className="text-lg font-normal text-[var(--muted)] transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="pb-2 pr-8 text-sm leading-relaxed text-[var(--muted)]">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </main>

        <footer className="mt-auto px-2 pt-3 pb-2 text-center text-xs leading-relaxed text-[var(--muted)]">
          © 2026 TheConverT · Built by King Tai · Privacy · Terms · Contact
        </footer>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
