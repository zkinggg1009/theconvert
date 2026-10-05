import Link from "next/link";
import type { ReactNode } from "react";
import type { ConversionPageDefinition } from "@/lib/seo/conversion-pages";
import { getConversionPageDefinition, getPageFormula, getPageIntro, getRelatedSlugs, buildFaqs, getPageDescription, getPageTitle } from "@/lib/seo/conversion-pages";
import { formatNumber } from "@/lib/seo/format";
import { convertValue } from "@/lib/conversions";
import { calculateConversion } from "@/lib/currency";

export function ConversionPageLayout({
  definition,
  value,
  convertedValue,
  pageSlug,
  breadcrumbTitle,
  liveRate,
  converter,
}: {
  definition: ConversionPageDefinition;
  value: number;
  convertedValue: number;
  pageSlug: string;
  breadcrumbTitle: string;
  liveRate?: number | null;
  converter?: ReactNode;
}) {
  const title = getPageTitle(definition);
  const description = getPageDescription(definition);
  const intro = getPageIntro(definition);
  const formula = getPageFormula(definition);
  const relatedSlugs = getRelatedSlugs(pageSlug);
  const faqs = buildFaqs(definition);
  const unitTableValues = definition.type === "unit"
    ? (definition.tableValues.length ? definition.tableValues : [1, 5, 10, 20, 50, 100])
    : [];
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://theconvert.online/" },
      { "@type": "ListItem", position: 2, name: definition.type === "unit" ? "Units" : "Currency", item: `https://theconvert.online/${definition.type === "unit" ? "units" : "currency"}` },
      { "@type": "ListItem", position: 3, name: breadcrumbTitle, item: `https://theconvert.online/${pageSlug}` },
    ],
  };
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }} />
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData).replace(/</g, "\\u003c") }} />}
      <header className="mb-8 text-center">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--muted)]">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
            <span>›</span>
            <Link href={definition.type === "unit" ? "/units" : "/currency"} className="hover:text-[var(--foreground)]">
              {definition.type === "unit" ? "Units" : "Currency"}
            </Link>
            <span>›</span>
            <span className="text-[var(--foreground)]">{title}</span>
          </div>
        </nav>

        <h1 className="text-3xl font-medium tracking-[-0.05em] text-[var(--foreground)] sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {intro}
        </p>
      </header>

      {converter && (
        <section className="mb-10 flex justify-center">
          {converter}
        </section>
      )}

      <section className="mb-10 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
          {definition.type === "unit"
            ? definition.category === "Temperature" ? "Example conversion" : "Conversion factor"
            : "Latest available exchange rate"}
        </p>

        {definition.type === "unit" ? (
          <div className="text-sm text-[var(--muted)]">
            <p>
              1 {definition.fromUnit} = {formatNumber(convertedValue / value || 1, 4)} {definition.toUnit}
            </p>
          </div>
        ) : (
          <div className="text-sm text-[var(--muted)]">
            <p>
              {liveRate != null
                ? <>1 {definition.fromCode} = {formatNumber(liveRate, 4)} {definition.toCode}</>
                : "The latest available exchange rate is currently unavailable."}
            </p>
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl">
          {definition.type === "unit" ? `${definition.fromUnit} to ${definition.toUnit} Conversion` : `${definition.fromCode} to ${definition.toCode} Exchange Rate`}
        </h2>
        <p className="text-base leading-relaxed text-[var(--muted)]">
          {description}
        </p>

        {definition.type === "unit" ? (
          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[var(--panel)]">
                <tr>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]">{definition.fromUnit}</th>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]">{definition.toUnit}</th>
                </tr>
              </thead>
              <tbody>
                {unitTableValues.map((amount) => (
                  <tr key={amount} className="border-t border-[var(--border)]">
                    <td className="px-4 py-3 text-[var(--foreground)]">{amount}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{formatNumber(convertValue(amount, definition.fromUnit, definition.toUnit, definition.category), 4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[var(--panel)]">
                <tr>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]">{definition.fromCode}</th>
                  <th className="px-4 py-3 font-medium text-[var(--foreground)]">{definition.toCode}</th>
                </tr>
              </thead>
              {liveRate != null && (
              <tbody>
                {definition.tableValues.map((amount) => (
                  <tr key={amount} className="border-t border-[var(--border)]">
                    <td className="px-4 py-3 text-[var(--foreground)]">{amount}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{formatNumber(calculateConversion(amount, liveRate), 4)}</td>
                  </tr>
                ))}
              </tbody>
              )}
            </table>
            {liveRate == null && <p className="p-4 text-sm text-[var(--muted)]">The exchange rate is currently unavailable, so conversion values cannot be displayed.</p>}
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl">
          How to Convert
        </h2>
        <p className="text-base leading-relaxed text-[var(--muted)]">
          Use the formula below to calculate the answer manually:
        </p>
        <div className="mt-4 rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-4 text-base font-medium text-[var(--foreground)]">
          {formula}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl">
          Related Converters
        </h2>
        <div className="flex flex-wrap gap-3">
          {relatedSlugs.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--panel)]"
            >
              {getPageTitle(getConversionPageDefinition(slug) ?? definition)}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.04em] text-[var(--foreground)] sm:text-3xl">
          FAQ
        </h2>
        <div className="divide-y divide-[var(--border)] rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group px-5 py-4">
              <summary className="cursor-pointer list-none text-base font-medium text-[var(--foreground)]">
                {question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}
