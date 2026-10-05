export type UnitPageDefinition = {
  slug: string;
  type: "unit";
  category: "Length" | "Weight" | "Temperature" | "Area" | "Volume";
  fromUnit: string;
  toUnit: string;
  tableValues: number[];
};

export type CurrencyPageDefinition = {
  slug: string;
  type: "currency";
  fromCode: string;
  toCode: string;
  tableValues: number[];
};

export type ConversionPageDefinition =
  | UnitPageDefinition
  | CurrencyPageDefinition;

const unitPageDefinitions: UnitPageDefinition[] = [
  { slug: "cm-to-inches", type: "unit", category: "Length", fromUnit: "Centimeter", toUnit: "Inch", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "inches-to-cm", type: "unit", category: "Length", fromUnit: "Inch", toUnit: "Centimeter", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "km-to-miles", type: "unit", category: "Length", fromUnit: "Kilometer", toUnit: "Mile", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "miles-to-km", type: "unit", category: "Length", fromUnit: "Mile", toUnit: "Kilometer", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "feet-to-meters", type: "unit", category: "Length", fromUnit: "Foot", toUnit: "Meter", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "meters-to-feet", type: "unit", category: "Length", fromUnit: "Meter", toUnit: "Foot", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "feet-to-cm", type: "unit", category: "Length", fromUnit: "Foot", toUnit: "Centimeter", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "cm-to-feet", type: "unit", category: "Length", fromUnit: "Centimeter", toUnit: "Foot", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "inches-to-feet", type: "unit", category: "Length", fromUnit: "Inch", toUnit: "Foot", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "feet-to-inches", type: "unit", category: "Length", fromUnit: "Foot", toUnit: "Inch", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "meters-to-yards", type: "unit", category: "Length", fromUnit: "Meter", toUnit: "Yard", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "yards-to-meters", type: "unit", category: "Length", fromUnit: "Yard", toUnit: "Meter", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "mm-to-inches", type: "unit", category: "Length", fromUnit: "Millimeter", toUnit: "Inch", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "inches-to-mm", type: "unit", category: "Length", fromUnit: "Inch", toUnit: "Millimeter", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "km-to-meters", type: "unit", category: "Length", fromUnit: "Kilometer", toUnit: "Meter", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "meters-to-km", type: "unit", category: "Length", fromUnit: "Meter", toUnit: "Kilometer", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "miles-to-feet", type: "unit", category: "Length", fromUnit: "Mile", toUnit: "Foot", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "feet-to-miles", type: "unit", category: "Length", fromUnit: "Foot", toUnit: "Mile", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "yards-to-feet", type: "unit", category: "Length", fromUnit: "Yard", toUnit: "Foot", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "feet-to-yards", type: "unit", category: "Length", fromUnit: "Foot", toUnit: "Yard", tableValues: [1, 5, 10, 25, 50, 100] },

  { slug: "kg-to-lbs", type: "unit", category: "Weight", fromUnit: "Kilogram", toUnit: "Pound", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "lbs-to-kg", type: "unit", category: "Weight", fromUnit: "Pound", toUnit: "Kilogram", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "grams-to-ounces", type: "unit", category: "Weight", fromUnit: "Gram", toUnit: "Ounce", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "ounces-to-grams", type: "unit", category: "Weight", fromUnit: "Ounce", toUnit: "Gram", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "kg-to-grams", type: "unit", category: "Weight", fromUnit: "Kilogram", toUnit: "Gram", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "grams-to-kg", type: "unit", category: "Weight", fromUnit: "Gram", toUnit: "Kilogram", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "ounces-to-lbs", type: "unit", category: "Weight", fromUnit: "Ounce", toUnit: "Pound", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "lbs-to-ounces", type: "unit", category: "Weight", fromUnit: "Pound", toUnit: "Ounce", tableValues: [1, 5, 10, 25, 50, 100] },

  { slug: "celsius-to-fahrenheit", type: "unit", category: "Temperature", fromUnit: "Celsius", toUnit: "Fahrenheit", tableValues: [-20, -10, 0, 10, 20, 37, 100] },
  { slug: "fahrenheit-to-celsius", type: "unit", category: "Temperature", fromUnit: "Fahrenheit", toUnit: "Celsius", tableValues: [-4, 32, 50, 68, 86, 104, 212] },
  { slug: "celsius-to-kelvin", type: "unit", category: "Temperature", fromUnit: "Celsius", toUnit: "Kelvin", tableValues: [-273, -50, 0, 25, 50, 100, 200] },
  { slug: "kelvin-to-celsius", type: "unit", category: "Temperature", fromUnit: "Kelvin", toUnit: "Celsius", tableValues: [173, 273, 300, 350, 500, 1000] },
  { slug: "fahrenheit-to-kelvin", type: "unit", category: "Temperature", fromUnit: "Fahrenheit", toUnit: "Kelvin", tableValues: [-40, 32, 68, 212, 392] },

  { slug: "square-feet-to-square-meters", type: "unit", category: "Area", fromUnit: "Square foot", toUnit: "Square meter", tableValues: [1, 10, 25, 50, 100, 500] },
  { slug: "square-meters-to-square-feet", type: "unit", category: "Area", fromUnit: "Square meter", toUnit: "Square foot", tableValues: [1, 10, 25, 50, 100, 500] },
  { slug: "acres-to-hectares", type: "unit", category: "Area", fromUnit: "Acre", toUnit: "Hectare", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "hectares-to-acres", type: "unit", category: "Area", fromUnit: "Hectare", toUnit: "Acre", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "acres-to-square-feet", type: "unit", category: "Area", fromUnit: "Acre", toUnit: "Square foot", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "square-feet-to-acres", type: "unit", category: "Area", fromUnit: "Square foot", toUnit: "Acre", tableValues: [1, 10, 100, 500, 1000] },
  { slug: "square-yards-to-square-meters", type: "unit", category: "Area", fromUnit: "Square yard", toUnit: "Square meter", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "square-meters-to-square-yards", type: "unit", category: "Area", fromUnit: "Square meter", toUnit: "Square yard", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "square-miles-to-square-kilometers", type: "unit", category: "Area", fromUnit: "Square mile", toUnit: "Square kilometer", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "square-kilometers-to-square-miles", type: "unit", category: "Area", fromUnit: "Square kilometer", toUnit: "Square mile", tableValues: [1, 5, 10, 25, 50, 100] },

  { slug: "liters-to-gallons", type: "unit", category: "Volume", fromUnit: "Liter", toUnit: "Gallon", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "gallons-to-liters", type: "unit", category: "Volume", fromUnit: "Gallon", toUnit: "Liter", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "ml-to-oz", type: "unit", category: "Volume", fromUnit: "Milliliter", toUnit: "Ounce", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "oz-to-ml", type: "unit", category: "Volume", fromUnit: "Ounce", toUnit: "Milliliter", tableValues: [1, 5, 10, 25, 50, 100] },
  { slug: "cups-to-ml", type: "unit", category: "Volume", fromUnit: "Cup", toUnit: "Milliliter", tableValues: [1, 2, 4, 8, 12, 16] },
  { slug: "ml-to-cups", type: "unit", category: "Volume", fromUnit: "Milliliter", toUnit: "Cup", tableValues: [250, 500, 750, 1000, 1500, 2000] },
  { slug: "cubic-feet-to-cubic-meters", type: "unit", category: "Volume", fromUnit: "Cubic foot", toUnit: "Cubic meter", tableValues: [1, 5, 10, 25, 50, 100] },
];

const currencyPageDefinitions: CurrencyPageDefinition[] = [
  { slug: "usd-to-myr", type: "currency", fromCode: "USD", toCode: "MYR", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "myr-to-usd", type: "currency", fromCode: "MYR", toCode: "USD", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "usd-to-eur", type: "currency", fromCode: "USD", toCode: "EUR", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "eur-to-usd", type: "currency", fromCode: "EUR", toCode: "USD", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "usd-to-gbp", type: "currency", fromCode: "USD", toCode: "GBP", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "gbp-to-usd", type: "currency", fromCode: "GBP", toCode: "USD", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "usd-to-jpy", type: "currency", fromCode: "USD", toCode: "JPY", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "jpy-to-usd", type: "currency", fromCode: "JPY", toCode: "USD", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "eur-to-gbp", type: "currency", fromCode: "EUR", toCode: "GBP", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "gbp-to-eur", type: "currency", fromCode: "GBP", toCode: "EUR", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "usd-to-sgd", type: "currency", fromCode: "USD", toCode: "SGD", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "sgd-to-myr", type: "currency", fromCode: "SGD", toCode: "MYR", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "myr-to-sgd", type: "currency", fromCode: "MYR", toCode: "SGD", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "usd-to-cny", type: "currency", fromCode: "USD", toCode: "CNY", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
  { slug: "aud-to-myr", type: "currency", fromCode: "AUD", toCode: "MYR", tableValues: [1, 10, 25, 50, 100, 500, 1000] },
];

const allPageDefinitions = [...unitPageDefinitions, ...currencyPageDefinitions];

const pageDefinitionMap = new Map(allPageDefinitions.map((page) => [page.slug, page]));

export function getAllConversionPageSlugs(): string[] {
  return allPageDefinitions.map((page) => page.slug);
}

export function getConversionPageDefinition(slug: string): ConversionPageDefinition | undefined {
  return pageDefinitionMap.get(slug);
}

export function getRelatedSlugs(slug: string): string[] {
  const definition = pageDefinitionMap.get(slug);
  if (!definition) {
    return [];
  }

  const sameTypeMatches = allPageDefinitions.filter((page) => {
    if (page.type !== definition.type) {
      return false;
    }

    if (definition.type === "unit" && page.type === "unit") {
      return page.category === definition.category && page.slug !== definition.slug;
    }

    return page.slug !== definition.slug;
  });

  return sameTypeMatches.slice(0, 4).map((page) => page.slug);
}

export function getPageTitle(definition: ConversionPageDefinition): string {
  if (definition.type === "unit") {
    return `${definition.fromUnit} to ${definition.toUnit} Converter`;
  }

  return `${definition.fromCode} to ${definition.toCode} Converter`;
}

export function getPageDescription(definition: ConversionPageDefinition): string {
  if (definition.type === "unit") {
    return `Convert ${definition.fromUnit.toLowerCase()} to ${definition.toUnit.toLowerCase()} quickly and accurately with TheConverT.`;
  }

  return `Convert ${definition.fromCode} to ${definition.toCode} quickly and easily with TheConverT.`;
}

export function getPageIntro(definition: ConversionPageDefinition): string {
  if (definition.type === "unit") {
    return `Convert ${definition.fromUnit.toLowerCase()} to ${definition.toUnit.toLowerCase()} with a fast, reliable calculator built for everyday use.`;
  }

  return `Convert ${definition.fromCode} to ${definition.toCode} with the latest available exchange rate and a clean, mobile-friendly calculator.`;
}

export function getPageFormula(definition: ConversionPageDefinition): string {
  if (definition.type === "unit") {
    if (definition.category === "Temperature") {
      const formulas: Record<string, string> = {
        "Celsius:Fahrenheit": "°F = (°C × 9/5) + 32",
        "Fahrenheit:Celsius": "°C = (°F − 32) × 5/9",
        "Celsius:Kelvin": "K = °C + 273.15",
        "Kelvin:Celsius": "°C = K − 273.15",
        "Fahrenheit:Kelvin": "K = (°F − 32) × 5/9 + 273.15",
      };
      return formulas[`${definition.fromUnit}:${definition.toUnit}`] ??
        `Use the converter to convert ${definition.fromUnit} to ${definition.toUnit}.`;
    }

    const ounceFactor = definition.category === "Volume"
      ? 0.0295735295625
      : 0.028349523125;
    const baseFactors: Record<string, number> = {
      Centimeter: 0.01, Inch: 0.0254, Kilometer: 1000, Mile: 1609.344,
      Foot: 0.3048, Meter: 1, Yard: 0.9144, Millimeter: 0.001,
      Kilogram: 1, Gram: 0.001, Pound: 0.45359237, Ounce: ounceFactor,
      "Square foot": 0.09290304, "Square meter": 1, Hectare: 10000,
      Acre: 4046.8564224, "Square yard": 0.83612736,
      "Square kilometer": 1000000, "Square mile": 2589988.110336,
      Liter: 1, Gallon: 3.785411784, Milliliter: 0.001,
      Cup: 0.2365882365, "Cubic foot": 28.316846592, "Cubic meter": 1000,
    };
    const fromFactor = baseFactors[definition.fromUnit];
    const toFactor = baseFactors[definition.toUnit];
    if (fromFactor !== undefined && toFactor !== undefined) {
      const factor = fromFactor / toFactor;
      return `${definition.toUnit} = ${definition.fromUnit} × ${Number(factor.toPrecision(12)).toString()}`;
    }
    return `Use the converter to convert ${definition.fromUnit} to ${definition.toUnit}.`;
  }

  return `Converted amount = ${definition.fromCode} amount × the latest available ${definition.fromCode}/${definition.toCode} reference rate.`;
}

export function buildFaqs(definition: ConversionPageDefinition) {
  if (definition.type === "unit") {
    return [
      {
        question: `How do I convert ${definition.fromUnit.toLowerCase()} to ${definition.toUnit.toLowerCase()}?`,
        answer: `Enter the value in ${definition.fromUnit.toLowerCase()} and the calculator will convert it to ${definition.toUnit.toLowerCase()} using the standard conversion factor for this pair.`,
      },
      {
        question: `Is this conversion accurate?`,
        answer: `Yes. TheConverT uses the standard conversion formulas used for everyday measurement and unit conversion across the platform.`,
      },
      {
        question: `Where can I find other related conversions?`,
        answer: `Use the related converter links below to switch between related pairs in the same category without leaving the page.`,
      },
    ];
  }

  return [
    {
      question: `How does the ${definition.fromCode} to ${definition.toCode} converter work?`,
      answer: `The app uses the latest available exchange rate for this pair and multiplies your entered amount to calculate the converted value.`,
    },
    {
      question: `Is the displayed rate live?`,
      answer: `The rate shown in the converter is the latest available reference rate returned by the data source at the time the page loads.`,
    },
    {
      question: `Can I compare related currency pairs?`,
      answer: `Yes. The related currency links below make it easy to switch to similar conversions without starting over.`,
    },
  ];
}
