/**
 * numberFormat.ts — the single place where numbers become strings.
 * Everything goes through Intl.NumberFormat: no toFixed(), no hardcoded symbols.
 */

/**
 * User's locale (browser language): fr-FR → "1,3 k€", en-US → "€1.3k".
 * To force one locale for the whole app, set it here (e.g. 'fr-FR').
 */
export const LOCALE: string | undefined =
  typeof navigator !== 'undefined' ? navigator.language : undefined;

export type Scale = 'none' | 'k' | 'M';
const SCALE_FACTOR: Record<Scale, number> = { none: 1, k: 1e3, M: 1e6 };

/** Standard units, formatted by Intl (style: 'unit'). */
export type StandardUnit =
  | 'kilogram' | 'liter' | 'meter' | 'kilometer' | 'kilometer-per-hour' | 'hour' | 'percent';

/** Business units unknown to Intl: label only, the number is still formatted by Intl. */
export const BUSINESS_UNITS = {
  pax: 'pax',
  movements: { one: 'movement', other: 'movements' },
  tonnes: 't',
  nauticalMiles: 'NM',
} satisfies Record<string, string | { one: string; other: string }>;
export type BusinessUnit = keyof typeof BUSINESS_UNITS;

const formatters = new Map<string, Intl.NumberFormat>();
function getFormatter(options: Intl.NumberFormatOptions): Intl.NumberFormat {
  const key = JSON.stringify(options);
  if (!formatters.has(key)) formatters.set(key, new Intl.NumberFormat(LOCALE, options));
  return formatters.get(key)!;
}

const fixed = (decimals: number) => ({
  minimumFractionDigits: decimals,
  maximumFractionDigits: decimals,
});

export function formatNumber(value: number, decimals = 0): string {
  return getFormatter(fixed(decimals)).format(value);
}

export interface CurrencyOptions {
  currency?: string;
  /** Same scale for every cell of a column */
  scale?: Scale;
  /** Same decimals for every cell of a column */
  decimals?: number;
  /** Negatives in parentheses, for financial tables */
  accounting?: boolean;
}

export function formatCurrency(
  value: number,
  { currency = 'EUR', scale = 'none', decimals = 0, accounting = false }: CurrencyOptions = {}
): string {
  const parts = getFormatter({
    style: 'currency',
    currency,
    currencySign: accounting ? 'accounting' : 'standard',
    ...fixed(decimals),
  }).formatToParts(value / SCALE_FACTOR[scale]);
  if (scale === 'none') return parts.map((p) => p.value).join('');

  // Attach the scale to the symbol, wherever the locale puts it: "1 250 k€" / "€1,250k"
  let lastDigit = -1;
  parts.forEach((p, i) => {
    if (p.type === 'integer' || p.type === 'fraction') lastDigit = i;
  });
  const symbolFirst = parts.findIndex((p) => p.type === 'currency') < lastDigit;
  return parts
    .map((p, i) => {
      if (!symbolFirst && p.type === 'currency') return scale + p.value;
      if (symbolFirst && i === lastDigit) return p.value + scale;
      return p.value;
    })
    .join('');
}

export function formatUnit(value: number, unit: StandardUnit, decimals = 0): string {
  return getFormatter({ style: 'unit', unit, ...fixed(decimals) }).format(value);
}

export function formatBusinessUnit(value: number, unit: BusinessUnit, decimals = 0): string {
  const label = BUSINESS_UNITS[unit];
  const text =
    typeof label === 'string'
      ? label
      : new Intl.PluralRules(LOCALE).select(value) === 'one' ? label.one : label.other;
  return `${formatNumber(value, decimals)} ${text}`;
}

/** Unit label alone, for a table header: "km", "%", "pax"… */
export function unitLabel(unit: StandardUnit | BusinessUnit): string {
  if (unit in BUSINESS_UNITS) {
    const label = BUSINESS_UNITS[unit as BusinessUnit];
    return typeof label === 'string' ? label : label.other;
  }
  const parts = getFormatter({ style: 'unit', unit }).formatToParts(2);
  return parts.find((p) => p.type === 'unit')?.value ?? unit;
}
