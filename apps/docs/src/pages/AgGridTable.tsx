import { useState, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ICellRendererParams, ColDef } from 'ag-grid-community';
import {
  Tab,
  Button,
  NumberInput,
  Select,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@as-designsystem/core';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/NumberInput.css';
import '@as-designsystem/core/Select.css';
import '@as-designsystem/core/DropdownMenu.css';
import '@as-designsystem/core/ag-grid-theme.css';
import CodeModal from '../components/CodeModal';

// Register AG-Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  aircraft: string;
  manufacturer: string;
  range: number;
  capacity: number;
  status: string;
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'retired', label: 'Retired' },
];

// Custom cell renderer for NumberInput - Size S (Default table)
const NumberInputCellRendererS = (props: ICellRendererParams) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (newValue: number | null) => {
    setValue(newValue);
    if (props.node && props.colDef?.field) {
      props.node.setDataValue(props.colDef.field, newValue);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
      <NumberInput
        value={value}
        onChange={handleChange}
        size="S"
        min={0}
        max={20000}
        showLabel={false}
        style={{ width: '100%' }}
      />
    </div>
  );
};

// Custom cell renderer for Select - Size S (Default table)
const SelectCellRendererS = (props: ICellRendererParams) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (props.node && props.colDef?.field) {
      props.node.setDataValue(props.colDef.field, newValue);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
      <Select
        value={value}
        onChange={handleChange}
        options={statusOptions}
        size="S"
        showLabel={false}
        style={{ width: '100%' }}
      />
    </div>
  );
};

// Custom cell renderer for NumberInput - Size XS (Small table)
const NumberInputCellRendererXS = (props: ICellRendererParams) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (newValue: number | null) => {
    setValue(newValue);
    if (props.node && props.colDef?.field) {
      props.node.setDataValue(props.colDef.field, newValue);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
      <NumberInput
        value={value}
        onChange={handleChange}
        size="XS"
        min={0}
        max={20000}
        showLabel={false}
        style={{ width: '100%' }}
      />
    </div>
  );
};

// Custom cell renderer for Select - Size XS (Small table)
const SelectCellRendererXS = (props: ICellRendererParams) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (props.node && props.colDef?.field) {
      props.node.setDataValue(props.colDef.field, newValue);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
      <Select
        value={value}
        onChange={handleChange}
        options={statusOptions}
        size="XS"
        showLabel={false}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default function AgGridTablePage() {
  const [activeTab, setActiveTab] = useState<'examples' | 'usage'>('examples');
  const [openModal, setOpenModal] = useState<string | null>(null);

  // Column visibility for the scrollable example (community-friendly: driven
  // through the grid API since the Columns tool panel is an enterprise feature)
  const scrollableGridRef = useRef<AgGridReact>(null);
  const toggleableColumns = useMemo(
    () => [
      { field: 'manufacturer', label: 'Manufacturer' },
      { field: 'firstFlight', label: 'First Flight' },
      { field: 'engines', label: 'Engines' },
      { field: 'wingspan', label: 'Wingspan' },
      { field: 'length', label: 'Length' },
      { field: 'range', label: 'Range' },
      { field: 'capacity', label: 'Capacity' },
      { field: 'mtow', label: 'MTOW' },
      { field: 'cruiseSpeed', label: 'Cruise' },
    ],
    []
  );
  const [visibleCols, setVisibleCols] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(toggleableColumns.map((c) => [c.field, true]))
  );
  const toggleColumn = (field: string, visible: boolean) => {
    setVisibleCols((prev) => ({ ...prev, [field]: visible }));
    scrollableGridRef.current?.api?.setColumnsVisible([field], visible);
  };

  // Sample data
  const rowData = useMemo<RowData[]>(() => [
    { aircraft: 'A320-200', manufacturer: 'Airbus', range: 6100, capacity: 180, status: 'active' },
    { aircraft: 'A321neo', manufacturer: 'Airbus', range: 7400, capacity: 244, status: 'maintenance' },
    { aircraft: 'B737-800', manufacturer: 'Boeing', range: 5765, capacity: 189, status: 'active' },
    { aircraft: 'B787-9', manufacturer: 'Boeing', range: 14140, capacity: 296, status: 'retired' },
    { aircraft: 'A350-900', manufacturer: 'Airbus', range: 15000, capacity: 325, status: 'active' },
    { aircraft: 'B777-300ER', manufacturer: 'Boeing', range: 13650, capacity: 396, status: 'maintenance' },
  ], []);

  // Larger dataset with extra columns for the scrollable example
  const scrollRowData = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => {
        const base = rowData[i % rowData.length];
        return {
          ...base,
          id: i + 1,
          firstFlight: 1990 + ((i * 2) % 30),
          engines: i % 2 === 0 ? 2 : 4,
          wingspan: 30 + ((i * 3) % 30),
          length: 35 + ((i * 4) % 40),
          mtow: 70000 + i * 5000,
          cruiseSpeed: 800 + ((i * 7) % 120),
        };
      }),
    [rowData]
  );

  // Column definitions for default table (size S components)
  const defaultColDefs = useMemo(() => [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 50, maxWidth: 50, suppressSizeToFit: true, resizable: false, filter: false },
    { field: 'aircraft', headerName: 'Aircraft', flex: 1 },
    { field: 'manufacturer', headerName: 'Manufacturer', flex: 1 },
    { field: 'range', headerName: 'Range (km)', flex: 1, cellRenderer: NumberInputCellRendererS },
    { field: 'status', headerName: 'Status', flex: 1, cellRenderer: SelectCellRendererS },
  ], []);

  // Column definitions for pinned columns table
  const pinnedColDefs = useMemo(() => [
    { field: 'aircraft', headerName: 'Aircraft', pinned: 'left' as const, width: 150 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 150 },
    { field: 'range', headerName: 'Range (km)', width: 150 },
    { field: 'capacity', headerName: 'Capacity', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ], []);

  // Column definitions for the scrollable table (wide + many rows)
  const scrollableColDefs = useMemo<ColDef[]>(() => [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 50, minWidth: 50, maxWidth: 50, suppressSizeToFit: true, resizable: false, filter: false },
    { field: 'aircraft', headerName: 'Aircraft', width: 160 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 160 },
    { field: 'firstFlight', headerName: 'First Flight', width: 140 },
    { field: 'engines', headerName: 'Engines', width: 130 },
    { field: 'wingspan', headerName: 'Wingspan (m)', width: 150 },
    { field: 'length', headerName: 'Length (m)', width: 150 },
    { field: 'range', headerName: 'Range (km)', width: 150 },
    { field: 'capacity', headerName: 'Capacity', width: 140 },
    { field: 'mtow', headerName: 'MTOW (kg)', width: 150 },
    { field: 'cruiseSpeed', headerName: 'Cruise (km/h)', width: 150 },
  ], []);

  // Column definitions for small table (size XS components)
  const smallColDefs = useMemo(() => [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 44, maxWidth: 44, suppressSizeToFit: true, resizable: false, filter: false },
    { field: 'aircraft', headerName: 'Aircraft', flex: 1 },
    { field: 'manufacturer', headerName: 'Manufacturer', flex: 1 },
    { field: 'range', headerName: 'Range (km)', flex: 1, cellRenderer: NumberInputCellRendererXS },
    { field: 'status', headerName: 'Status', flex: 1, cellRenderer: SelectCellRendererXS },
  ], []);

  // Column definitions for column filters example
  const filterColDefs = useMemo(() => [
    { field: 'aircraft', headerName: 'Aircraft', flex: 1 },
    { field: 'manufacturer', headerName: 'Manufacturer', flex: 1 },
    { field: 'range', headerName: 'Range (km)', flex: 1 },
    { field: 'capacity', headerName: 'Capacity', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ], []);

  const filterColFilterCode = `// Enable filters - the ASDS theme styles the filter popup automatically
import '@as-designsystem/core/ag-grid-theme.css';

const colDefs = [
  { field: 'aircraft', headerName: 'Aircraft', flex: 1 },
  { field: 'manufacturer', headerName: 'Manufacturer', flex: 1 },
  { field: 'range', headerName: 'Range (km)', flex: 1, filter: 'agNumberColumnFilter' },
  { field: 'capacity', headerName: 'Capacity', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
];

<AgGridReact
  className="as-ag-grid"
  rowData={rowData}
  columnDefs={colDefs}
  defaultColDef={{ filter: true }}
/>`;

  const installCode = `# Install AG-Grid
npm install ag-grid-community ag-grid-react

# The AS Design System theme is included in @as-designsystem/core`;

  const basicUsageCode = `import { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ICellRendererParams } from 'ag-grid-community';
import { NumberInput, Select } from '@as-designsystem/core';
import '@as-designsystem/core/ag-grid-theme.css';

// Register AG-Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Custom cell renderer for NumberInput
const NumberInputCellRenderer = (props: ICellRendererParams) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (newValue: number | null) => {
    setValue(newValue);
    props.node.setDataValue(props.colDef.field, newValue);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
      <NumberInput
        value={value}
        onChange={handleChange}
        size="S"
        showLabel={false}
        style={{ width: '100%' }}
      />
    </div>
  );
};

// Custom cell renderer for Select
const SelectCellRenderer = (props: ICellRendererParams) => {
  const [value, setValue] = useState(props.value);
  const options = [
    { value: 'active', label: 'Active' },
    { value: 'maintenance', label: 'Maintenance' },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
      <Select
        value={value}
        onChange={setValue}
        options={options}
        size="S"
        showLabel={false}
        style={{ width: '100%' }}
      />
    </div>
  );
};

const MyTable = () => {
  const rowData = useMemo(() => [
    { aircraft: 'A320-200', manufacturer: 'Airbus', range: 6100, status: 'active' },
    { aircraft: 'B737-800', manufacturer: 'Boeing', range: 5765, status: 'maintenance' },
  ], []);

  // Enable filtering on all columns by default
  const defaultColDef = useMemo(() => ({
    filter: true,
  }), []);

  const colDefs = useMemo(() => [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 50, filter: false },
    { field: 'aircraft', headerName: 'Aircraft', flex: 1 },
    { field: 'manufacturer', headerName: 'Manufacturer', flex: 1 },
    { field: 'range', headerName: 'Range', flex: 1, cellRenderer: NumberInputCellRenderer, filter: 'agNumberColumnFilter' },
    { field: 'status', headerName: 'Status', flex: 1, cellRenderer: SelectCellRenderer },
  ], []);

  return (
    <div style={{ height: 300 }}>
      <AgGridReact
        className="as-ag-grid"
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
      />
    </div>
  );
};`;

  const smallSizeCode = `// For small tables, use size="XS" for DS components
const NumberInputCellRendererXS = (props: ICellRendererParams) => {
  // ... same as above but with size="XS"
  return (
    <NumberInput size="XS" showLabel={false} ... />
  );
};

const SelectCellRendererXS = (props: ICellRendererParams) => {
  // ... same as above but with size="XS"
  return (
    <Select size="XS" showLabel={false} ... />
  );
};

<AgGridReact
  className="as-ag-grid as-ag-grid--small"
  rowData={rowData}
  columnDefs={colDefs}
/>`;

  const pinnedCode = `const colDefs = [
  { field: 'aircraft', headerName: 'Aircraft', pinned: 'left', width: 150 },
  { field: 'manufacturer', headerName: 'Manufacturer', width: 150 },
  { field: 'range', headerName: 'Range (km)', width: 150 },
  { field: 'capacity', headerName: 'Capacity', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
];

<AgGridReact
  className="as-ag-grid"
  rowData={rowData}
  columnDefs={colDefs}
/>`;

  const scrollableCode = `import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, Button,
} from '@as-designsystem/core';
import '@as-designsystem/core/DropdownMenu.css';

// A wide table scrolls horizontally; many rows scroll vertically.
// Give the grid a fixed height and let the columns overflow its width.
const colDefs = [
  {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    width: 50, minWidth: 50, maxWidth: 50, // locked width
    suppressSizeToFit: true,               // excluded from sizeColumnsToFit()
    resizable: false,
    filter: false,
  },
  { field: 'aircraft', headerName: 'Aircraft', width: 160 },
  { field: 'manufacturer', headerName: 'Manufacturer', width: 160 },
  { field: 'firstFlight', headerName: 'First Flight', width: 140 },
  { field: 'engines', headerName: 'Engines', width: 130 },
  { field: 'wingspan', headerName: 'Wingspan (m)', width: 150 },
  { field: 'length', headerName: 'Length (m)', width: 150 },
  { field: 'range', headerName: 'Range (km)', width: 150 },
  { field: 'capacity', headerName: 'Capacity', width: 140 },
  { field: 'mtow', headerName: 'MTOW (kg)', width: 150 },
  { field: 'cruiseSpeed', headerName: 'Cruise (km/h)', width: 150 },
];

// Column visibility: the Columns tool panel is enterprise-only, so in the
// community edition drive visibility through the grid API.
const gridRef = useRef(null);
const [visibleCols, setVisibleCols] = useState({ manufacturer: true, range: true /* ... */ });

const toggleColumn = (field, visible) => {
  setVisibleCols((prev) => ({ ...prev, [field]: visible }));
  gridRef.current?.api?.setColumnsVisible([field], visible);
};

<>
  {/* Show/hide controls in a dropdown */}
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button label="Columns" leftIcon="view_column" rightIcon="expand_more" size="S" variant="Outlined" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuCheckboxItem
        checked={visibleCols.manufacturer}
        onCheckedChange={(checked) => toggleColumn('manufacturer', checked)}>
        Manufacturer
      </DropdownMenuCheckboxItem>
      {/* ...one DropdownMenuCheckboxItem per toggleable column */}
    </DropdownMenuContent>
  </DropdownMenu>

  {/* Fixed-height wrapper => the grid body scrolls instead of growing */}
  <div style={{ height: 320 }}>
    <AgGridReact
      ref={gridRef}
      className="as-ag-grid"
      rowData={rowData}        // 20+ rows -> vertical scroll
      columnDefs={colDefs}     // total width > container -> horizontal scroll
      rowSelection="multiple"
      suppressRowClickSelection={true}
    />
  </div>
</>`;

  const cssVariablesCode = `/* Available CSS variables for customization */

.as-ag-grid {
  /* Typography */
  --ag-font-family: 'Inter', sans-serif;
  --ag-font-size: 14px;

  /* Sizing */
  --ag-row-height: 40px;
  --ag-header-height: 40px;

  /* Colors */
  --ag-background-color: var(--background-main, #ffffff);
  --ag-foreground-color: var(--text-primary, #333d47);
  --ag-border-color: var(--border-minimal, #eff1f4);

  /* Header */
  --ag-header-background-color: var(--primary-default, #00205b);
  --ag-header-foreground-color: var(--text-negative, #ffffff);

  /* Rows */
  --ag-row-hover-color: rgba(0, 45, 128, 0.02);
  --ag-selected-row-background-color: rgba(0, 45, 128, 0.05);

  /* Checkbox */
  --ag-checkbox-checked-color: var(--primary-default, #063b9e);
}`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        AG-Grid Tables
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        For complex data tables, we recommend using AG-Grid with our custom theme.
        The AS Design System provides a CSS file that styles AG-Grid to match our design language.
      </p>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="example-container">
          <div style={{ display: 'flex', gap: '0' }}>
            <Tab
              label="Examples"
              size="M"
              status={activeTab === 'examples' ? 'Active' : 'Default'}
              onClick={() => setActiveTab('examples')}
            />
            <Tab
              label="Usage"
              size="M"
              status={activeTab === 'usage' ? 'Active' : 'Default'}
              onClick={() => setActiveTab('usage')}
            />
          </div>
        </div>
      </div>

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <>
          {/* Default Size */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Default Size
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="example-container" style={{ height: 300 }}>
              <AgGridReact
                className="as-ag-grid"
                rowData={rowData}
                columnDefs={defaultColDefs}
                defaultColDef={{ filter: true }}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                cellSelection={false}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginTop: '12px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Default table with 40px row height. Use <code>as-ag-grid</code> class and size <code>S</code> for DS components.
            </p>
          </section>

          {/* Small Size */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Small Size
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('small')}
              />
            </div>
            <div className="example-container" style={{ height: 220 }}>
              <AgGridReact
                className="as-ag-grid as-ag-grid--small"
                rowData={rowData.slice(0, 4)}
                columnDefs={smallColDefs}
                defaultColDef={{ filter: true }}
                rowSelection="multiple"
                suppressRowClickSelection={true}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginTop: '12px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Compact table with 32px row height. Use <code>as-ag-grid--small</code> class and size <code>XS</code> for DS components.
            </p>
          </section>

          {/* Pinned Columns */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Pinned Columns
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('pinned')}
              />
            </div>
            <div className="example-container" style={{ height: 300, maxWidth: 500 }}>
              <AgGridReact
                className="as-ag-grid"
                rowData={rowData}
                columnDefs={pinnedColDefs}
                defaultColDef={{ filter: true }}
                cellSelection={false}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginTop: '12px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Use <code>pinned: 'left'</code> or <code>pinned: 'right'</code> on a column definition to fix it while the rest scrolls horizontally.
            </p>
          </section>

          {/* Scrollable Table */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Scrollable Table
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('scrollable')}
              />
            </div>
            <div
              className="example-container"
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <div style={{ display: 'flex' }}>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button label="Columns" leftIcon="view_column" rightIcon="expand_more" size="S" variant="Outlined" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {toggleableColumns.map((col) => (
                      <DropdownMenuCheckboxItem
                        key={col.field}
                        checked={visibleCols[col.field]}
                        onCheckedChange={(checked) => toggleColumn(col.field, checked)}
                      >
                        {col.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div style={{ height: 320 }}>
                <AgGridReact
                  ref={scrollableGridRef}
                  className="as-ag-grid"
                  rowData={scrollRowData}
                  columnDefs={scrollableColDefs}
                  defaultColDef={{ filter: true }}
                  rowSelection="multiple"
                  suppressRowClickSelection={true}
                  cellSelection={false}
                />
              </div>
            </div>
            <p
              className="label-regular-s"
              style={{
                marginTop: '12px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Give the grid a fixed height so the body scrolls vertically, and let the columns
              overflow the container width to scroll horizontally. Use the <code>Columns</code>
              dropdown to show or hide columns via the grid API (<code>setColumnsVisible</code>)
              &mdash; the built-in Columns tool panel is an AG-Grid enterprise feature.
            </p>
          </section>

          {/* Column Filters */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Column Filters
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('filter')}
              />
            </div>
            <div className="example-container" style={{ height: 300 }}>
              <AgGridReact
                className="as-ag-grid"
                rowData={rowData}
                columnDefs={filterColDefs}
                defaultColDef={{ filter: true }}
                cellSelection={false}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginTop: '12px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Enable filters with <code>defaultColDef={`{{ filter: true }}`}</code>. The ASDS theme automatically styles the filter popup to match the design system.
            </p>
          </section>

        </>
      )}

      {/* Usage Tab */}
      {activeTab === 'usage' && (
        <>
          {/* Installation */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Installation
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('install')}
              />
            </div>
            <div className="example-container">
              <pre
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--background-tertiary, #eff1f4)',
                  borderRadius: '4px',
                  fontSize: '13px',
                  overflow: 'auto',
                }}
              >
                <code>{installCode}</code>
              </pre>
            </div>
          </section>

          {/* Basic Usage */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Basic Usage
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="example-container">
              <pre
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--background-tertiary, #eff1f4)',
                  borderRadius: '4px',
                  fontSize: '13px',
                  overflow: 'auto',
                  maxHeight: '400px',
                }}
              >
                <code>{basicUsageCode}</code>
              </pre>
            </div>
          </section>

          {/* CSS Variables */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                CSS Variables
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('variables')}
              />
            </div>
            <div className="example-container">
              <pre
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--background-tertiary, #eff1f4)',
                  borderRadius: '4px',
                  fontSize: '13px',
                  overflow: 'auto',
                  maxHeight: '400px',
                }}
              >
                <code>{cssVariablesCode}</code>
              </pre>
            </div>
            <p
              className="label-regular-s"
              style={{
                marginTop: '12px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              You can override these variables to customize the table appearance while maintaining
              consistency with the design system.
            </p>
          </section>
        </>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'install'}
        onClose={() => setOpenModal(null)}
        title="Installation"
        code={installCode}
      />
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Basic Usage"
        code={basicUsageCode}
      />
      <CodeModal
        isOpen={openModal === 'small'}
        onClose={() => setOpenModal(null)}
        title="Small Size"
        code={smallSizeCode}
      />
      <CodeModal
        isOpen={openModal === 'pinned'}
        onClose={() => setOpenModal(null)}
        title="Pinned Columns"
        code={pinnedCode}
      />
      <CodeModal
        isOpen={openModal === 'scrollable'}
        onClose={() => setOpenModal(null)}
        title="Scrollable Table"
        code={scrollableCode}
      />
      <CodeModal
        isOpen={openModal === 'variables'}
        onClose={() => setOpenModal(null)}
        title="CSS Variables"
        code={cssVariablesCode}
      />
      <CodeModal
        isOpen={openModal === 'filter'}
        onClose={() => setOpenModal(null)}
        title="Column Filters"
        code={filterColFilterCode}
      />
    </div>
  );
}
