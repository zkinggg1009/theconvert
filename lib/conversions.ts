export const categories = [
  "Length",
  "Weight",
  "Temperature",
  "Area",
  "Volume",
  "Time",
  "Speed",
  "Pressure",
  "Energy",
  "Power",
] as const;

export type Category = (typeof categories)[number];

export const categoryUnits: Record<Category, string[]> = {
  Length: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Mile", "Yard", "Foot", "Inch"],
  Weight: ["Kilogram", "Gram", "Milligram", "Pound", "Ounce"],
  Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  Area: ["Square meter", "Square kilometer", "Square foot", "Square inch", "Acre", "Hectare"],
  Volume: ["Liter", "Milliliter", "Cubic meter", "Gallon", "Quart", "Pint"],
  Time: ["Second", "Minute", "Hour", "Day", "Week"],
  Speed: ["km/h", "mph", "m/s", "knot"],
  Pressure: ["Pascal", "kPa", "MPa", "bar", "psi", "atm"],
  Energy: ["Joule", "Kilojoule", "Calorie", "Kilocalorie", "kWh"],
  Power: ["Watt", "Kilowatt", "Megawatt", "Horsepower"],
};

export const defaultUnitPairs: Record<Category, [string, string]> = {
  Length: ["Kilometer", "Mile"],
  Weight: ["Kilogram", "Pound"],
  Temperature: ["Celsius", "Fahrenheit"],
  Area: ["Square meter", "Square foot"],
  Volume: ["Liter", "Gallon"],
  Time: ["Hour", "Minute"],
  Speed: ["km/h", "mph"],
  Pressure: ["kPa", "psi"],
  Energy: ["Joule", "kWh"],
  Power: ["Watt", "Horsepower"],
};

export function getDefaultUnits(category: Category): [string, string] {
  return defaultUnitPairs[category];
}

export function getShortUnitLabel(unit: string, category: Category): string {
  const shortUnitMap: Record<Category, Record<string, string>> = {
    Length: {
      Meter: "m",
      Kilometer: "km",
      Centimeter: "cm",
      Millimeter: "mm",
      Mile: "mi",
      Yard: "yd",
      Foot: "ft",
      Inch: "in",
    },
    Weight: {
      Kilogram: "kg",
      Gram: "g",
      Milligram: "mg",
      Pound: "lb",
      Ounce: "oz",
    },
    Temperature: {
      Celsius: "°C",
      Fahrenheit: "°F",
      Kelvin: "K",
    },
    Area: {
      "Square meter": "m²",
      "Square kilometer": "km²",
      "Square foot": "ft²",
      "Square inch": "in²",
      Acre: "ac",
      Hectare: "ha",
    },
    Volume: {
      Liter: "L",
      Milliliter: "mL",
      "Cubic meter": "m³",
      Gallon: "gal",
      Quart: "qt",
      Pint: "pt",
    },
    Time: {
      Second: "s",
      Minute: "min",
      Hour: "h",
      Day: "d",
      Week: "wk",
    },
    Speed: {
      "km/h": "km/h",
      "mph": "mph",
      "m/s": "m/s",
      knot: "kn",
    },
    Pressure: {
      Pascal: "Pa",
      "kPa": "kPa",
      "MPa": "MPa",
      bar: "bar",
      psi: "psi",
      atm: "atm",
    },
    Energy: {
      Joule: "J",
      Kilojoule: "kJ",
      Calorie: "cal",
      Kilocalorie: "kcal",
      kWh: "kWh",
    },
    Power: {
      Watt: "W",
      Kilowatt: "kW",
      Megawatt: "MW",
      Horsepower: "hp",
    },
  };

  return shortUnitMap[category]?.[unit] ?? unit;
}

const unitToBase: Record<Category, Record<string, number>> = {
  Length: {
    Meter: 1,
    Kilometer: 1000,
    Centimeter: 0.01,
    Millimeter: 0.001,
    Mile: 1609.344,
    Yard: 0.9144,
    Foot: 0.3048,
    Inch: 0.0254,
  },
  Weight: {
    Kilogram: 1,
    Gram: 0.001,
    Milligram: 0.000001,
    Pound: 0.45359237,
    Ounce: 0.028349523125,
  },
  Temperature: {
    Celsius: 1,
    Fahrenheit: 1,
    Kelvin: 1,
  },
  Area: {
    "Square meter": 1,
    "Square kilometer": 1000000,
    "Square foot": 0.09290304,
    "Square inch": 0.00064516,
    Acre: 4046.8564224,
    Hectare: 10000,
  },
  Volume: {
    Liter: 1,
    Milliliter: 0.001,
    "Cubic meter": 1000,
    Gallon: 3.785411784,
    Quart: 0.946352946,
    Pint: 0.473176473,
  },
  Time: {
    Second: 1,
    Minute: 60,
    Hour: 3600,
    Day: 86400,
    Week: 604800,
  },
  Speed: {
    "km/h": 0.2777777778,
    "mph": 0.44704,
    "m/s": 1,
    knot: 0.5144444444,
  },
  Pressure: {
    Pascal: 1,
    "kPa": 1000,
    "MPa": 1000000,
    bar: 100000,
    psi: 6894.757293168,
    atm: 101325,
  },
  Energy: {
    Joule: 1,
    Kilojoule: 1000,
    Calorie: 4.184,
    Kilocalorie: 4184,
    kWh: 3600000,
  },
  Power: {
    Watt: 1,
    Kilowatt: 1000,
    Megawatt: 1000000,
    Horsepower: 745.6998715823,
  },
};

export function convertValue(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: Category,
): number {
  if (category === "Temperature") {
    return celsiusToTarget(toCelsius(value, fromUnit), toUnit);
  }

  const fromFactor = unitToBase[category][fromUnit];
  const toFactor = unitToBase[category][toUnit];

  if (!fromFactor || !toFactor) {
    return value;
  }

  return (value * fromFactor) / toFactor;
}

function toCelsius(value: number, unit: string): number {
  switch (unit) {
    case "Celsius":
      return value;
    case "Fahrenheit":
      return ((value - 32) * 5) / 9;
    case "Kelvin":
      return value - 273.15;
    default:
      return value;
  }
}

function celsiusToTarget(value: number, unit: string): number {
  switch (unit) {
    case "Celsius":
      return value;
    case "Fahrenheit":
      return (value * 9) / 5 + 32;
    case "Kelvin":
      return value + 273.15;
    default:
      return value;
  }
}
