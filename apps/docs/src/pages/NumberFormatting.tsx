import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';
import {
  Button,
  formatNumber,
  formatCurrency,
  formatUnit,
  formatBusinessUnit,
  formatRate,
  unitLabel,
  agGridColumnTypes,
  BUSINESS_UNITS,
  type BusinessUnit,
} from '@as-designsystem/core';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/ag-grid-theme.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import numberFormatSource from '../../../../packages/core/src/utils/numberFormat.ts?raw';
import agGridColumnTypesSource from '../../../../packages/core/src/utils/agGridColumnTypes.ts?raw';
import './NumberFormatting.css';

ModuleRegistry.registerModules([AllCommunityModule]);

// --- Rules: one line each, a correct output (live) and what to avoid ---

const rules: { rule: string; detail: string; good: string; bad: string }[] = [
  {
    rule: 'One formatter',
    detail: 'Every number goes through numberFormat. Never toFixed() or a hardcoded symbol.',
    good: formatCurrency(1234.5, { decimals: 2 }),
    bad: '1234.50 €',
  },
  {
    rule: 'Currency always shown',
    detail: 'Every amount shows its currency, placed by the locale.',
    good: formatCurrency(1235),
    bad: '1,235',
  },
  {
    rule: 'One scale per column',
    detail: 'Pick k or M once, same decimals on every row. Never compact notation.',
    good: `${formatCurrency(842300, { scale: 'k', decimals: 1 })} · ${formatCurrency(2310000, { scale: 'k', decimals: 1 })}`,
    bad: '€842K · €2.3M',
  },
  {
    rule: 'Negative amounts',
    detail: 'Minus sign by default, parentheses in financial tables.',
    good: `${formatCurrency(-45210, { scale: 'k', decimals: 1 })} · ${formatCurrency(-45210, { scale: 'k', decimals: 1, accounting: true })}`,
    bad: '45.2k- · −45 210',
  },
  {
    rule: 'Units',
    detail: 'Standard units as Intl writes them; business units from BUSINESS_UNITS only.',
    good: `${formatUnit(5, 'minute')} · ${formatBusinessUnit(186, 'pax')}`,
    bad: '5 m · 186 PAX',
  },
  {
    rule: 'Rates',
    detail: 'Amount per unit, written amount/unit (yield, RASK, CASK, cost per FH).',
    good: formatRate(0.12, 'rpk', { currency: 'USD', decimals: 2 }),
    bad: '0.12 $/pax km',
  },
  {
    rule: 'Tables',
    detail: 'Text left, numbers right (tabular-nums). Unit in the header, currency in each cell.',
    good: `Distance (${unitLabel('kilometer')}) → ${formatNumber(5837)}`,
    bad: 'Distance → 5837 km',
  },
];

// --- Functions ---

const api: { fn: string; use: string; call: string; output: string }[] = [
  { fn: 'formatNumber', use: 'Plain number', call: 'formatNumber(1234567)', output: formatNumber(1234567) },
  { fn: 'formatCurrency', use: 'Amount', call: "formatCurrency(842300, { scale: 'k', decimals: 1 })", output: formatCurrency(842300, { scale: 'k', decimals: 1 }) },
  { fn: 'formatRate', use: 'Amount per unit', call: "formatRate(0.12, 'rpk', { currency: 'USD', decimals: 2 })", output: formatRate(0.12, 'rpk', { currency: 'USD', decimals: 2 }) },
  { fn: 'formatUnit', use: 'Standard unit', call: "formatUnit(2.5, 'hour', 1)", output: formatUnit(2.5, 'hour', 1) },
  { fn: 'formatBusinessUnit', use: 'Business unit', call: "formatBusinessUnit(350, 'flightLevel')", output: formatBusinessUnit(350, 'flightLevel') },
  { fn: 'unitLabel', use: 'Unit alone (headers)', call: "unitLabel('kilometer')", output: unitLabel('kilometer') },
];

// --- Units reference ---

// A selection: formatUnit accepts any unit Intl knows (about 45)
const COMMON_UNITS = [
  'second', 'minute', 'hour', 'day', 'week', 'month', 'year',
  'gram', 'kilogram', 'milliliter', 'liter',
  'millimeter', 'centimeter', 'meter', 'kilometer', 'foot', 'mile', 'kilometer-per-hour',
  'percent', 'celsius',
];

// Reference only: shows both languages side by side, whatever the browser's
const unitIn = (locale: string, unit: string) =>
  new Intl.NumberFormat(locale, { style: 'unit', unit }).format(2);

const BUSINESS_SAMPLES: Record<BusinessUnit, [value: number, decimals?: number]> = {
  pax: [186], seats: [180], nauticalMiles: [3200], knots: [250], flightLevel: [350],
  mach: [0.78, 2], tonnes: [12.4, 1], flightHours: [1250], blockHours: [3400],
  flightCycles: [820], engineCycles: [15000], ask: [4500000], rpk: [3900000], aircraft: [12],
};

// --- Rates (amount per unit) ---

const rates: { metric: string; means: string; call: string; output: string }[] = [
  { metric: 'Yield', means: 'Revenue per passenger-km', call: "formatRate(0.12, 'rpk', { currency: 'USD', decimals: 2 })", output: formatRate(0.12, 'rpk', { currency: 'USD', decimals: 2 }) },
  { metric: 'RASK', means: 'Revenue per available seat-km', call: "formatRate(0.095, 'ask', { currency: 'USD', decimals: 3 })", output: formatRate(0.095, 'ask', { currency: 'USD', decimals: 3 }) },
  { metric: 'CASK', means: 'Cost per available seat-km', call: "formatRate(0.084, 'ask', { currency: 'USD', decimals: 3 })", output: formatRate(0.084, 'ask', { currency: 'USD', decimals: 3 }) },
  { metric: 'Cost per flight hour', means: 'Maintenance or operating cost per FH', call: "formatRate(1250, 'flightHours', { currency: 'USD' })", output: formatRate(1250, 'flightHours', { currency: 'USD' }) },
  { metric: 'Cost per block hour', means: 'Crew or operating cost per BH', call: "formatRate(3200, 'blockHours', { currency: 'USD' })", output: formatRate(3200, 'blockHours', { currency: 'USD' }) },
  { metric: 'Revenue per passenger', means: 'Average revenue per pax', call: "formatRate(185, 'pax', { currency: 'USD' })", output: formatRate(185, 'pax', { currency: 'USD' }) },
  { metric: 'Fuel price', means: 'Price per kilogram of fuel', call: "formatRate(0.85, 'kilogram', { currency: 'USD', decimals: 2 })", output: formatRate(0.85, 'kilogram', { currency: 'USD', decimals: 2 }) },
];

// --- Tables ---

const columnTypes: { type: string; shows: string; context: string }[] = [
  { type: 'text', shows: 'Left-aligned text', context: '—' },
  { type: 'number', shows: formatNumber(1234567), context: '{ decimals? }' },
  { type: 'unit', shows: `Header "Distance (km)", cells ${formatNumber(5837)}`, context: "{ unit, decimals? }" },
  { type: 'currency', shows: `${formatCurrency(381200, { scale: 'k', decimals: 1 })} · ${formatCurrency(-32080, { scale: 'k', decimals: 1 })}`, context: '{ currency?, scale?, decimals?, accounting? }' },
  { type: 'rate', shows: formatRate(0.12, 'rpk', { currency: 'USD', decimals: 2 }), context: '{ per, currency?, decimals? }' },
];

const tableColDefs: ColDef[] = [
  { field: 'route', headerName: 'Route', type: 'text', flex: 1 },
  { field: 'distance', headerName: 'Distance', type: 'unit', context: { unit: 'kilometer' }, flex: 1 },
  { field: 'flights', headerName: 'Flights', type: 'number', flex: 1 },
  { field: 'loadFactor', headerName: 'Load factor', type: 'unit', context: { unit: 'percent', decimals: 1 }, flex: 1 },
  { field: 'revenue', headerName: 'Revenue', type: 'currency', flex: 1 },
  { field: 'margin', headerName: 'Margin', type: 'currency', flex: 1 },
];

const tableRows = [
  { route: 'CDG – JFK', distance: 5837, flights: 62, loadFactor: 87.3, revenue: 4123500, margin: 381200 },
  { route: 'ORY – FDF', distance: 6858, flights: 31, loadFactor: 91.8, revenue: 1189000, margin: 74150 },
  { route: 'NCE – LHR', distance: 1035, flights: 186, loadFactor: 76.4, revenue: 964100, margin: -32080 },
  { route: 'TLS – AMS', distance: 1076, flights: 93, loadFactor: 69.1, revenue: 417700, margin: -114500 },
];

// --- Code snippets ---

const usageCode = `// asds add number-format
import {
  formatNumber, formatCurrency, formatRate, formatUnit, formatBusinessUnit, unitLabel,
} from '@/design-system/utils/numberFormat';

formatNumber(1234567);                                     // "${formatNumber(1234567)}"
formatCurrency(1234.5, { decimals: 2 });                   // "${formatCurrency(1234.5, { decimals: 2 })}"
formatCurrency(842300, { scale: 'k', decimals: 1 });       // "${formatCurrency(842300, { scale: 'k', decimals: 1 })}"
formatCurrency(-45210, { scale: 'k', decimals: 1, accounting: true }); // "${formatCurrency(-45210, { scale: 'k', decimals: 1, accounting: true })}"
formatRate(0.12, 'rpk', { currency: 'USD', decimals: 2 }); // "${formatRate(0.12, 'rpk', { currency: 'USD', decimals: 2 })}"
formatUnit(5, 'minute');                                   // "${formatUnit(5, 'minute')}"
formatBusinessUnit(186, 'pax');                            // "${formatBusinessUnit(186, 'pax')}"
unitLabel('kilometer');                                    // "${unitLabel('kilometer')}"

// Currency options: { currency = 'EUR', scale = 'none' | 'k' | 'M', decimals = 0, accounting = false }
// Locale: the browser's language (LOCALE constant in numberFormat.ts)`;

const tableCode = `// asds add ag-grid-column-types
import { AgGridReact } from 'ag-grid-react';
import { agGridColumnTypes } from '@/design-system/utils/agGridColumnTypes';

// Columns only declare a type (+ options in context)
const colDefs: ColDef[] = [
  { field: 'route', headerName: 'Route', type: 'text' },
  { field: 'distance', headerName: 'Distance', type: 'unit', context: { unit: 'kilometer' } },
  { field: 'flights', headerName: 'Flights', type: 'number' },
  { field: 'loadFactor', headerName: 'Load factor', type: 'unit', context: { unit: 'percent', decimals: 1 } },
  { field: 'revenue', headerName: 'Revenue', type: 'currency' },
  { field: 'yield', headerName: 'Yield', type: 'rate', context: { per: 'rpk', currency: 'USD' } },
];

<AgGridReact
  className="as-ag-grid"
  columnTypes={agGridColumnTypes}
  columnDefs={colDefs}
  rowData={rows}
/>`;

// --- Page building blocks ---

function SectionTitle({ title, onCode }: { title: string; onCode?: () => void }) {
  return (
    <div className="section-header">
      <h2
        className="heading-6"
        style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        {title}
      </h2>
      {onCode && <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={onCode} />}
    </div>
  );
}

export default function NumberFormattingPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="component-page number-formatting">
      <div className="page-header">
        <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Number Formatting
        </h1>
        <InstallCommand componentName="number-format" />
      </div>
      <p className="number-formatting__intro label-regular-m">
        Every number is formatted by <code>numberFormat</code>, built on the browser's{' '}
        <code>Intl.NumberFormat</code> standard: separators, symbols and abbreviations follow the
        user's language automatically. Outputs below are shown in your browser's language.
      </p>

      {/* Rules */}
      <section className="component-section">
        <SectionTitle title="Rules" />
        <div className="example-container">
          <table className="nf-table label-regular-s">
            <thead>
              <tr className="label-bold-s">
                <th>Rule</th>
                <th>Do</th>
                <th>Don't</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((r) => (
                <tr key={r.rule}>
                  <td>
                    <span className="label-bold-s">{r.rule}</span>
                    <span className="nf-table__detail">{r.detail}</span>
                  </td>
                  <td className="nf-table__value nf-table__value--do">{r.good}</td>
                  <td className="nf-table__value nf-table__value--dont">{r.bad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Functions */}
      <section className="component-section">
        <SectionTitle title="Functions" onCode={() => setOpenModal('api')} />
        <div className="example-container">
          <table className="nf-table label-regular-s">
            <thead>
              <tr className="label-bold-s">
                <th>Use for</th>
                <th>Call</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {api.map((a) => (
                <tr key={a.fn}>
                  <td>{a.use}</td>
                  <td><code>{a.call}</code></td>
                  <td className="nf-table__value">{a.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="nf-note label-regular-s">
            Currency options: <code>currency</code> (default <code>'EUR'</code>), <code>scale</code>{' '}
            (<code>'k'</code>, <code>'M'</code>), <code>decimals</code>, <code>accounting</code>{' '}
            (parentheses for negatives).
          </p>
        </div>
      </section>

      {/* Units */}
      <section className="component-section">
        <SectionTitle title="Units" />
        <div className="nf-units">
          <div className="example-container">
            <h3 className="label-bold-m nf-units__title">Standard units</h3>
            <p className="nf-note label-regular-s">
              <code>formatUnit</code> accepts any unit Intl knows (about 45). Common ones, written
              by Intl:
            </p>
            <table className="nf-table nf-table--compact label-regular-s">
              <thead>
                <tr className="label-bold-s">
                  <th>Unit</th>
                  <th className="nf-right">English (US)</th>
                  <th className="nf-right">French (FR)</th>
                </tr>
              </thead>
              <tbody>
                {COMMON_UNITS.map((unit) => (
                  <tr key={unit}>
                    <td><code>{unit}</code></td>
                    <td className="nf-right">{unitIn('en-US', unit)}</td>
                    <td className="nf-right">{unitIn('fr-FR', unit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="example-container">
            <h3 className="label-bold-m nf-units__title">Business units</h3>
            <p className="nf-note label-regular-s">
              Units Intl doesn't know, defined in <code>BUSINESS_UNITS</code>. Add new ones there,
              never in a screen.
            </p>
            <table className="nf-table nf-table--compact label-regular-s">
              <thead>
                <tr className="label-bold-s">
                  <th>Key</th>
                  <th>Label</th>
                  <th className="nf-right">Example</th>
                </tr>
              </thead>
              <tbody>
                {(Object.keys(BUSINESS_UNITS) as BusinessUnit[]).map((unit) => (
                  <tr key={unit}>
                    <td><code>{unit}</code></td>
                    <td>{BUSINESS_UNITS[unit]}</td>
                    <td className="nf-right">
                      {formatBusinessUnit(BUSINESS_SAMPLES[unit][0], unit, BUSINESS_SAMPLES[unit][1])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Rates */}
      <section className="component-section">
        <SectionTitle title="Rates" />
        <div className="example-container">
          <p className="nf-note label-regular-s" style={{ margin: '0 0 12px' }}>
            An amount per unit is written <b>amount/unit</b> with <code>formatRate</code>: the
            amount follows the currency rules, the unit comes from the unit lists above.
          </p>
          <table className="nf-table label-regular-s">
            <thead>
              <tr className="label-bold-s">
                <th>Metric</th>
                <th>Call</th>
                <th className="nf-right">Output</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((r) => (
                <tr key={r.metric}>
                  <td>
                    <span className="label-bold-s">{r.metric}</span>
                    <span className="nf-table__detail">{r.means}</span>
                  </td>
                  <td><code>{r.call}</code></td>
                  <td className="nf-table__value nf-right">{r.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tables */}
      <section className="component-section">
        <SectionTitle title="Tables" onCode={() => setOpenModal('table')} />
        <div className="example-container">
          <p className="nf-note label-regular-s" style={{ margin: '0 0 12px' }}>
            With AG-Grid, install <code>asds add ag-grid-column-types</code>. Each column only
            declares a <code>type</code>; the type sets format, alignment and header unit. Add{' '}
            <code>accounting: true</code> to a currency column only in financial tables.
          </p>
          <table className="nf-table label-regular-s">
            <thead>
              <tr className="label-bold-s">
                <th>Type</th>
                <th>Shows</th>
                <th>Options (context)</th>
              </tr>
            </thead>
            <tbody>
              {columnTypes.map((c) => (
                <tr key={c.type}>
                  <td><code>{c.type}</code></td>
                  <td className="nf-table__value">{c.shows}</td>
                  <td><code>{c.context}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* position: relative contains the grid's absolute elements (autoHeight layout) */}
        <div className="example-container" style={{ position: 'relative', marginTop: 16 }}>
          <AgGridReact
            className="as-ag-grid"
            columnTypes={agGridColumnTypes}
            columnDefs={tableColDefs}
            rowData={tableRows}
            domLayout="autoHeight"
            cellSelection={false}
          />
        </div>
      </section>

      <CodeModal
        isOpen={openModal === 'api'}
        onClose={() => setOpenModal(null)}
        title="numberFormat"
        sections={[
          { title: 'Usage', language: 'typescript', code: usageCode },
          { title: 'numberFormat.ts', language: 'typescript', code: numberFormatSource },
        ]}
      />
      <CodeModal
        isOpen={openModal === 'table'}
        onClose={() => setOpenModal(null)}
        title="Tables"
        sections={[
          { title: 'Usage', language: 'tsx', code: tableCode },
          { title: 'agGridColumnTypes.ts', language: 'typescript', code: agGridColumnTypesSource },
        ]}
      />
    </div>
  );
}
