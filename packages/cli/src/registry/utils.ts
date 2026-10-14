import type { RegistryItem } from './schema';

export const utils: RegistryItem[] = [
  {
    name: 'number-format',
    type: 'util',
    displayName: 'numberFormat',
    description: 'Number, currency and unit formatting built on Intl.NumberFormat',
    files: [
      { path: 'templates/utils/numberFormat.ts', target: 'utils/numberFormat.ts', type: 'util' },
    ],
  },
  {
    name: 'ag-grid-column-types',
    type: 'util',
    displayName: 'agGridColumnTypes',
    description: 'AG-Grid column types (text, number, unit, currency) using numberFormat',
    files: [
      { path: 'templates/utils/agGridColumnTypes.ts', target: 'utils/agGridColumnTypes.ts', type: 'util' },
    ],
    dependencies: ['number-format', 'ag-grid-theme'],
  },
];
