import type { Metadata } from "next";
import Converter from "@/components/Converter";
import Header from "@/components/Header";
import { ConversionPageLayout } from "@/components/seo/ConversionPageLayout";
import { getAllConversionPageSlugs, getConversionPageDefinition } from "@/lib/seo/conversion-pages";
import { buildSeoMetadata } from "@/lib/seo/metadata";
import { convertValue } from "@/lib/conversions";
import { getExchangeRate, type ExchangeRate } from "@/lib/currency";
import CurrencyConverter from "@/components/CurrencyConverter";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return getAllConversionPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!getConversionPageDefinition(slug)) notFound();
  return buildSeoMetadata(slug);
}

export default async function SeoConversionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const definition = getConversionPageDefinition(slug);

  if (!definition) {
    notFound();
  }

  const value = definition.type === "unit" ? 1 : 1;
  const convertedValue = definition.type === "unit"
    ? convertValue(value, definition.fromUnit, definition.toUnit, definition.category)
    : 1;

  let initialExchangeRate: ExchangeRate | null = null;
  if (definition.type === "currency") {
    try {
      initialExchangeRate = await getExchangeRate(definition.fromCode, definition.toCode);
    } catch {
      initialExchangeRate = null;
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header showTagline={false} />
      <main className="page-enter">
        <ConversionPageLayout
          definition={definition}
          value={value}
          convertedValue={convertedValue}
          pageSlug={slug}
          breadcrumbTitle={definition.type === "unit"
            ? `${definition.fromUnit} to ${definition.toUnit} Converter`
            : `${definition.fromCode} to ${definition.toCode} Converter`}
          liveRate={initialExchangeRate?.rate ?? null}
          converter={
            definition.type === "unit" ? (
              <Converter
                category={definition.category}
                initialFromUnit={definition.fromUnit}
                initialToUnit={definition.toUnit}
                initialInputValue="1"
                embedded
              />
            ) : (
              <CurrencyConverter
                key={slug}
                initialBase={definition.fromCode}
                initialQuote={definition.toCode}
                initialAmount="1"
                initialRate={initialExchangeRate}
              />
            )
          }
        />
      </main>
      <Footer className="pb-2 pt-3" />
    </div>
  );
}
