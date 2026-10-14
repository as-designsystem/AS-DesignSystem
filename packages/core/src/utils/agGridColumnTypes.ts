/**
 * agGridColumnTypes.ts — AG-Grid column types built on numberFormat.ts.
 * A column only declares its type (plus options in `context`);
 * the type owns format, alignment and header unit.
 *
 * Usage: <AgGridReact columnTypes={agGridColumnTypes} ... />
 */
import { formatNumber, formatCurrency, formatRate, unitLabel } from './numberFormat';

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

  // context: { decimals?: number }
  number: {
    ...numeric,
    valueFormatter: (p) => formatNumber(p.value, p.colDef.context?.decimals),
  },

  // Unit goes up in the header: "Range (km)", cells show the number only.
  // context: { unit: 'kilometer' | 'percent' | 'pax' | …, decimals?: number }
  unit: {
    ...numeric,
    headerValueGetter: (p) => `${p.colDef?.headerName} (${unitLabel(p.colDef?.context.unit)})`,
    valueFormatter: (p) => formatNumber(p.value, p.colDef.context?.decimals),
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
