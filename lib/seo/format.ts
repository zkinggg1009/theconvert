export function formatNumber(value: number, digits = 2): string {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : digits,
    maximumFractionDigits: digits,
  });
}

export function convertUnitValue(value: number, fromUnit: string, toUnit: string): number {
  const lookup = new Map<string, number>([
    ["Centimeter", 0.01],
    ["Inch", 0.0254],
    ["Kilometer", 1000],
    ["Mile", 1609.344],
    ["Foot", 0.3048],
    ["Meter", 1],
    ["Yard", 0.9144],
    ["Millimeter", 0.001],
    ["Kilogram", 1],
    ["Gram", 0.001],
    ["Pound", 0.45359237],
    ["Ounce", 0.028349523125],
    ["Celsius", 1],
    ["Fahrenheit", 1],
    ["Kelvin", 1],
    ["Square foot", 0.09290304],
    ["Square meter", 1],
    ["Hectare", 10000],
    ["Acre", 4046.8564224],
    ["Square yard", 0.83612736],
    ["Square kilometer", 1000000],
    ["Square mile", 2589988.110336],
    ["Liter", 1],
    ["Gallon", 3.785411784],
    ["Milliliter", 0.001],
    ["Cup", 0.2365882365],
    ["Cubic foot", 28.316846592],
    ["Cubic meter", 1000],
  ]);

  const toBase = lookup.get(fromUnit);
  const fromBase = lookup.get(toUnit);

  if (toBase === undefined || fromBase === undefined) {
    return value;
  }

  return (value * toBase) / fromBase;
}
