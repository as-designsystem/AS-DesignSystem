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
export const SCALE_FACTOR: Record<Scale, number> = { none: 1, k: 1e3, M: 1e6 };

/** Any unit Intl knows (style: 'unit'): 'minute', 'kilogram', 'percent'… Intl rejects unknown ones. */
export type StandardUnit = string;

/** Business units unknown to Intl: label only, the number is still formatted by Intl. */
export const BUSINESS_UNITS = {
  pax: 'pax',
  seats: 'seats',
  nauticalMiles: 'NM',
  knots: 'kt',
  flightLevel: 'FL',
  mach: 'Mach',
  tonnes: 't',
  flightHours: 'FH',
  blockHours: 'BH',
  flightCycles: 'FC',
  engineCycles: 'cycles',
  ask: 'ASK',
  rpk: 'RPK',
  aircraft: 'A/C',
} as const;
export type BusinessUnit = keyof typeof BUSINESS_UNITS;

/** Labels written before the number: FL350 (no space), Mach 0.78 */
const PREFIX_UNITS: Partial<Record<BusinessUnit, { spaced: boolean }>> = {
  flightLevel: { spaced: false },
  mach: { spaced: true },
};

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

export interface ScaleOptions {
  /** Same scale for every value of a column, axis or KPI group */
  scale?: Scale;
}

/** Separator the locale puts between a number and its scale: "4.3M" / "4,3 M" */
function scaleSeparator(): string {
  return (
    getFormatter({ notation: 'compact' })
      .formatToParts(1e6)
      .find((p) => p.type === 'literal')?.value ?? ''
  );
}

export function formatNumber(value: number, decimals = 0, { scale = 'none' }: ScaleOptions = {}): string {
  const number = getFormatter(fixed(decimals)).format(value / SCALE_FACTOR[scale]);
  return scale === 'none' ? number : `${number}${scaleSeparator()}${scale}`;
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

/** Amount per unit, e.g. yield $0.12/RPK, CASK $0.08/ASK, cost $1,250/FH */
export function formatRate(
  value: number,
  per: StandardUnit | BusinessUnit,
  options: CurrencyOptions = {}
): string {
  return `${formatCurrency(value, options)}/${unitLabel(per)}`;
}

export function formatUnit(
  value: number,
  unit: StandardUnit,
  decimals = 0,
  { scale = 'none' }: ScaleOptions = {}
): string {
  const parts = getFormatter({ style: 'unit', unit, ...fixed(decimals) }).formatToParts(
    value / SCALE_FACTOR[scale]
  );
  if (scale === 'none') return parts.map((p) => p.value).join('');

  // Attach the scale to the number, before the unit: "12.4k kg" / "12,4 k kg"
  let lastDigit = -1;
  parts.forEach((p, i) => {
    if (p.type === 'integer' || p.type === 'fraction') lastDigit = i;
  });
  return parts
    .map((p, i) => (i === lastDigit ? `${p.value}${scaleSeparator()}${scale}` : p.value))
    .join('');
}

export function formatBusinessUnit(
  value: number,
  unit: BusinessUnit,
  decimals = 0,
  options: ScaleOptions = {}
): string {
  // Same separator Intl puts before a standard unit for this locale
  const separator =
    getFormatter({ style: 'unit', unit: 'kilogram' })
      .formatToParts(1)
      .find((p) => p.type === 'literal')?.value ?? '\u00A0';
  const number = formatNumber(value, decimals, options);
  const label = BUSINESS_UNITS[unit];
  const prefix = PREFIX_UNITS[unit];
  if (prefix) return `${label}${prefix.spaced ? separator : ''}${number}`;
  return `${number}${separator}${label}`;
}

/**
 * Currency label alone, for a chart axis title: "Revenue ($M)" / "Revenue (M$US)".
 * Charts put the currency up in the axis title like a unit; tables keep it in every cell.
 */
export function currencyLabel({ currency = 'EUR', scale = 'none' }: Pick<CurrencyOptions, 'currency' | 'scale'> = {}): string {
  const parts = getFormatter({ style: 'currency', currency, ...fixed(0) }).formatToParts(1);
  const symbol = parts.find((p) => p.type === 'currency')?.value ?? currency;
  if (scale === 'none') return symbol;
  const symbolFirst = parts.findIndex((p) => p.type === 'currency') < parts.findIndex((p) => p.type === 'integer');
  return symbolFirst ? `${symbol}${scale}` : `${scale}${symbol}`;
}

/** Rate label alone, for a chart axis title: "$/RPK", "k$US/FH" */
export function rateLabel(
  per: StandardUnit | BusinessUnit,
  options: Pick<CurrencyOptions, 'currency' | 'scale'> = {}
): string {
  return `${currencyLabel(options)}/${unitLabel(per)}`;
}

/** Unit label alone, for a table header: "km", "%", "pax"… */
export function unitLabel(unit: StandardUnit | BusinessUnit): string {
  if (unit in BUSINESS_UNITS) return BUSINESS_UNITS[unit as BusinessUnit];
  const parts = getFormatter({ style: 'unit', unit }).formatToParts(2);
  return parts.find((p) => p.type === 'unit')?.value ?? unit;
}
