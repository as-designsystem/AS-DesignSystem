/**
 * agGridColumnTypes.ts — AG-Grid column types built on numberFormat.ts.
 * A column only declares its type (plus options in `context`);
 * the type owns format, alignment and header unit.
 *
 * Usage: <AgGridReact columnTypes={agGridColumnTypes} ... />
 */
import { SCALE_FACTOR, formatNumber, formatCurrency, formatRate, unitLabel, type Scale } from './numberFormat';

// Minimal AG-Grid shapes, so this file needs no ag-grid import
interface ColumnContext {
  colDef?: { headerName?: string; context?: any } | null;
}
interface CellParams {
  value: any;
  colDef: { context?: any };
}
interface ColumnType {
  headerClass?: string;
  cellClass?: string;
  headerValueGetter?: (params: ColumnContext) => string;
  valueFormatter?: (params: CellParams) => string;
}

// Same classes as AG-Grid's built-in rightAligned type; ag-grid-theme.css adds tabular-nums
const numeric: ColumnType = {
  headerClass: 'ag-right-aligned-header',
  cellClass: 'ag-right-aligned-cell',
};

export const agGridColumnTypes: Record<string, ColumnType> = {
  // Left-aligned (AG-Grid default)
  text: {},

  // context: { decimals?: number, scale?: 'none' | 'k' | 'M' }
  number: {
    ...numeric,
    valueFormatter: (p) =>
      formatNumber(p.value, p.colDef.context?.decimals, { scale: p.colDef.context?.scale }),
  },

  // Unit goes up in the header: "Range (km)", cells show the number only.
  // A scale goes up with it: "Flight hours (M FH)".
  // context: { unit: 'kilometer' | 'percent' | 'pax' | …, decimals?: number, scale?: 'none' | 'k' | 'M' }
  unit: {
    ...numeric,
    headerValueGetter: (p) => {
      const scale = p.colDef?.context.scale;
      const prefix = scale && scale !== 'none' ? `${scale} ` : '';
      return `${p.colDef?.headerName} (${prefix}${unitLabel(p.colDef?.context.unit)})`;
    },
    valueFormatter: (p) =>
      formatNumber(p.value / SCALE_FACTOR[(p.colDef.context?.scale ?? 'none') as Scale], p.colDef.context?.decimals),
  },

  // Currency stays in every cell, one scale + decimals per column, minus sign for negatives.
  // context: { currency?: string, scale?: 'none' | 'k' | 'M', decimals?: number,
  //            accounting?: boolean } — accounting: parentheses, for financial tables only
  currency: {
    ...numeric,
    valueFormatter: (p) =>
      formatCurrency(p.value, { scale: 'k', decimals: 1, ...p.colDef.context }),
  },

  // Amount per unit (yield, RASK, CASK…), the full rate in every cell: "$0.12/RPK".
  // context: { per: 'rpk' | 'ask' | 'flightHours' | …, currency?: string, decimals?: number }
  rate: {
    ...numeric,
    valueFormatter: (p) =>
      formatRate(p.value, p.colDef.context.per, { decimals: 2, ...p.colDef.context }),
  },
};
