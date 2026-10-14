import { useState, ReactNode } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';
import {
  Button,
  Icon,
  formatNumber,
  formatCurrency,
  formatUnit,
  formatBusinessUnit,
  agGridColumnTypes,
} from '@as-designsystem/core';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/Icon.css';
import '@as-designsystem/core/ag-grid-theme.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import numberFormatSource from '../../../../packages/core/src/utils/numberFormat.ts?raw';
import agGridColumnTypesSource from '../../../../packages/core/src/utils/agGridColumnTypes.ts?raw';
import './NumberFormatting.css';

ModuleRegistry.registerModules([AllCommunityModule]);

// --- Live example data ---

const formatterApi = [
  {
    call: 'formatNumber(1234567)',
    intl: 'new Intl.NumberFormat(locale)',
    output: formatNumber(1234567),
  },
  {
    call: 'formatCurrency(1234.5, { decimals: 2 })',
    intl: "new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' })",
    output: formatCurrency(1234.5, { decimals: 2 }),
  },
  {
    call: "formatUnit(1234.5, 'kilogram', 1)",
    intl: "new Intl.NumberFormat(locale, { style: 'unit', unit: 'kilogram' })",
    output: formatUnit(1234.5, 'kilogram', 1),
  },
  {
    call: "formatBusinessUnit(186, 'pax')",
    intl: 'new Intl.NumberFormat(locale) + BUSINESS_UNITS.pax',
    output: formatBusinessUnit(186, 'pax'),
  },
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

const currencyCode = `import { formatCurrency } from '@/design-system/utils/numberFormat';

formatCurrency(1234.5);                                // "${formatCurrency(1234.5)}"
formatCurrency(842300, { scale: 'k', decimals: 1 });   // "${formatCurrency(842300, { scale: 'k', decimals: 1 })}"
formatCurrency(2310000, { scale: 'M', decimals: 2 });  // "${formatCurrency(2310000, { scale: 'M', decimals: 2 })}"
formatCurrency(-45210, { accounting: true });          // "${formatCurrency(-45210, { accounting: true })}"`;

const unitsCode = `import { formatUnit, formatBusinessUnit } from '@/design-system/utils/numberFormat';

// Standard units: Intl style 'unit'
formatUnit(1234.5, 'kilogram', 1);  // "${formatUnit(1234.5, 'kilogram', 1)}"
formatUnit(87.3, 'percent', 1);     // "${formatUnit(87.3, 'percent', 1)}"

// Business units: Intl number + label from BUSINESS_UNITS
formatBusinessUnit(186, 'pax');            // "${formatBusinessUnit(186, 'pax')}"
formatBusinessUnit(3200, 'nauticalMiles'); // "${formatBusinessUnit(3200, 'nauticalMiles')}"

// A new business unit is added to BUSINESS_UNITS — never inlined`;

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
  { field: 'margin', headerName: 'Margin', type: 'currency' },
];

<AgGridReact
  className="as-ag-grid"
  columnTypes={agGridColumnTypes}
  columnDefs={colDefs}
  rowData={rows}
/>`;

// --- Page building blocks ---

function Rule({ title, onCode, children }: { title: string; onCode: () => void; children: ReactNode }) {
  return (
    <>
      <div className="section-header">
        <h2
          className="heading-6"
          style={{
            marginTop: '32px',
            marginBottom: '16px',
            color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
          }}
        >
          {title}
        </h2>
        <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={onCode} />
      </div>
      <ul className="number-formatting__rules label-regular-s">{children}</ul>
    </>
  );
}

function Sample({ call, output }: { call: string; output: string }) {
  return (
    <div className="number-formatting__sample">
      <code>{call}</code>
      <span className="number-formatting__output label-medium-s">{output}</span>
    </div>
  );
}

export default function NumberFormattingPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="component-page number-formatting">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Number Formatting
        </h1>
        <InstallCommand componentName="number-format" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        How ASDS apps display numbers, currencies and units. Install the{' '}
        <code>number-format</code> util, then format every number with its functions. Every
        value on this page is produced by it.
      </p>

      {/* 1. Formatter */}
      <section className="component-section">
        <Rule title="1. One formatter" onCode={() => setOpenModal('formatter')}>
          <li>
            Every number is turned into text by <code>numberFormat.ts</code> (
            <code>asds add number-format</code>). Each of its functions wraps{' '}
            <code>Intl.NumberFormat</code>.
          </li>
          <li>
            Never <code>toFixed()</code>, string concatenation or a hardcoded symbol: separators,
            symbols and their position depend on the locale.
          </li>
          <li>The locale is the browser's (<code>LOCALE</code> constant).</li>
        </Rule>
        <div className="example-container">
          <div className="number-formatting__api label-regular-s">
            <span className="label-bold-s">Function</span>
            <span className="label-bold-s">Built on</span>
            <span className="label-bold-s">Output</span>
            {formatterApi.map((row) => (
              <div key={row.call} className="number-formatting__api-row">
                <code>{row.call}</code>
                <code>{row.intl}</code>
                <span className="number-formatting__value label-medium-s">{row.output}</span>
              </div>
            ))}
            <div className="number-formatting__api-row">
              <code>{"(1234.5).toFixed(2) + ' €'"}</code>
              <span className="number-formatting__dont label-bold-s">
                <Icon name="cancel" size={16} color="var(--feedback-error-default, #e4002b)" />
                Don't — ignores the locale
              </span>
              <span className="number-formatting__value label-medium-s">{(1234.5).toFixed(2) + ' €'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Currencies */}
      <section className="component-section">
        <Rule title="2. Currencies" onCode={() => setOpenModal('currency')}>
          <li>
            Use <code>formatCurrency</code> (Intl style <code>currency</code>): the symbol is
            always shown, placed by the locale.
          </li>
          <li>
            For large amounts, set the scale explicitly (<code>scale: 'k'</code> or{' '}
            <code>'M'</code>). Never Intl's compact notation: it changes scale from one value to
            the next.
          </li>
          <li>Negatives use a minus sign, or parentheses with <code>accounting: true</code>.</li>
        </Rule>
        <div className="example-container">
          <div className="number-formatting__samples">
            <Sample call="formatCurrency(1234.5)" output={formatCurrency(1234.5)} />
            <Sample call="formatCurrency(842300, { scale: 'k', decimals: 1 })" output={formatCurrency(842300, { scale: 'k', decimals: 1 })} />
            <Sample call="formatCurrency(2310000, { scale: 'M', decimals: 2 })" output={formatCurrency(2310000, { scale: 'M', decimals: 2 })} />
            <Sample call="formatCurrency(-45210, { accounting: true })" output={formatCurrency(-45210, { accounting: true })} />
          </div>
        </div>
      </section>

      {/* 3. Units */}
      <section className="component-section">
        <Rule title="3. Units" onCode={() => setOpenModal('units')}>
          <li>
            Standard units (kg, L, km, h, %): <code>formatUnit</code>, Intl style{' '}
            <code>unit</code>.
          </li>
          <li>
            Business units (pax, movements, t, NM…): <code>formatBusinessUnit</code>, a number
            formatted by Intl plus a label from the <code>BUSINESS_UNITS</code> constant.
          </li>
        </Rule>
        <div className="example-container">
          <div className="number-formatting__compare">
            <div className="number-formatting__samples">
              <span className="number-formatting__group label-bold-s">Standard</span>
              <Sample call="formatUnit(1234.5, 'kilogram', 1)" output={formatUnit(1234.5, 'kilogram', 1)} />
              <Sample call="formatUnit(12, 'liter')" output={formatUnit(12, 'liter')} />
              <Sample call="formatUnit(850, 'kilometer')" output={formatUnit(850, 'kilometer')} />
              <Sample call="formatUnit(2.5, 'hour', 1)" output={formatUnit(2.5, 'hour', 1)} />
              <Sample call="formatUnit(87.3, 'percent', 1)" output={formatUnit(87.3, 'percent', 1)} />
            </div>
            <div className="number-formatting__samples">
              <span className="number-formatting__group label-bold-s">Business</span>
              <Sample call="formatBusinessUnit(186, 'pax')" output={formatBusinessUnit(186, 'pax')} />
              <Sample call="formatBusinessUnit(1240, 'movements')" output={formatBusinessUnit(1240, 'movements')} />
              <Sample call="formatBusinessUnit(12.4, 'tonnes', 1)" output={formatBusinessUnit(12.4, 'tonnes', 1)} />
              <Sample call="formatBusinessUnit(3200, 'nauticalMiles')" output={formatBusinessUnit(3200, 'nauticalMiles')} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tables */}
      <section className="component-section">
        <Rule title="4. Tables" onCode={() => setOpenModal('table')}>
          <li>
            AG-Grid tables use <code>agGridColumnTypes</code> (
            <code>asds add ag-grid-column-types</code>). The column type (<code>text</code>,{' '}
            <code>number</code>, <code>unit</code>, <code>currency</code>) sets format and
            alignment. Columns only declare a type.
          </li>
          <li>Text is left-aligned. Numbers are right-aligned with <code>tabular-nums</code>.</li>
          <li>Units go up in the header (Distance (km)); cells show the number only.</li>
          <li>
            Currencies stay in every cell, with one scale and one decimal count per column, and
            negatives in parentheses.
          </li>
        </Rule>
        {/* position: relative contains the grid's absolute elements (autoHeight layout) */}
        <div className="example-container" style={{ position: 'relative' }}>
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
        isOpen={openModal === 'formatter'}
        onClose={() => setOpenModal(null)}
        title="numberFormat.ts"
        sections={[{ title: 'numberFormat.ts', language: 'typescript', code: numberFormatSource }]}
      />
      <CodeModal
        isOpen={openModal === 'currency'}
        onClose={() => setOpenModal(null)}
        title="Currencies"
        code={currencyCode}
      />
      <CodeModal
        isOpen={openModal === 'units'}
        onClose={() => setOpenModal(null)}
        title="Units"
        code={unitsCode}
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
