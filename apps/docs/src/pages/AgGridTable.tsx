import { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ICellRendererParams } from 'ag-grid-community';
import { Tab, Button, NumberInput, Select } from '@as-design-system/core';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/NumberInput.css';
import '@as-design-system/core/Select.css';
import '@as-design-system/core/ag-grid-theme.css';
import CodeModal from '../components/CodeModal';

// Register AG-Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  aircraft: string;
  manufacturer: string;
  range: number;
  capacity: number;
  price: number;
}

interface EditableRowData {
  aircraft: string;
  manufacturer: string;
  range: number;
  status: string;
}

// Custom cell renderer for NumberInput
const NumberInputCellRenderer = (props: ICellRendererParams) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (newValue: number | null) => {
    setValue(newValue);
    if (props.node && props.colDef?.field) {
      props.node.setDataValue(props.colDef.field, newValue);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0 4px' }}>
      <NumberInput
        value={value}
        onChange={handleChange}
        size="S"
        min={0}
        max={20000}
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
    { value: 'retired', label: 'Retired' },
  ];

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (props.node && props.colDef?.field) {
      props.node.setDataValue(props.colDef.field, newValue);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0 4px' }}>
      <Select
        value={value}
        onChange={handleChange}
        options={options}
        size="S"
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default function AgGridTablePage() {
  const [activeTab, setActiveTab] = useState<'examples' | 'usage'>('examples');
  const [openModal, setOpenModal] = useState<string | null>(null);

  // Sample data
  const rowData = useMemo<RowData[]>(() => [
    { aircraft: 'A320-200', manufacturer: 'Airbus', range: 6100, capacity: 180, price: 101000000 },
    { aircraft: 'A321neo', manufacturer: 'Airbus', range: 7400, capacity: 244, price: 129500000 },
    { aircraft: 'B737-800', manufacturer: 'Boeing', range: 5765, capacity: 189, price: 106100000 },
    { aircraft: 'B787-9', manufacturer: 'Boeing', range: 14140, capacity: 296, price: 292500000 },
    { aircraft: 'A350-900', manufacturer: 'Airbus', range: 15000, capacity: 325, price: 317400000 },
    { aircraft: 'B777-300ER', manufacturer: 'Boeing', range: 13650, capacity: 396, price: 375500000 },
  ], []);

  // Column definitions for default table
  const defaultColDefs = useMemo(() => [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 50, maxWidth: 50, suppressSizeToFit: true, resizable: false },
    { field: 'aircraft', headerName: 'Aircraft', flex: 1 },
    { field: 'manufacturer', headerName: 'Manufacturer', flex: 1 },
    { field: 'range', headerName: 'Range (km)', flex: 1 },
    { field: 'capacity', headerName: 'Capacity', flex: 1 },
    { field: 'price', headerName: 'Price (USD)', flex: 1, valueFormatter: (p: { value: number }) => p.value?.toLocaleString() },
  ], []);

  // Column definitions for small table (with checkboxes)
  const smallColDefs = useMemo(() => [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 44, maxWidth: 44, suppressSizeToFit: true, resizable: false },
    { field: 'aircraft', headerName: 'Aircraft', flex: 1 },
    { field: 'manufacturer', headerName: 'Manufacturer', flex: 1 },
    { field: 'range', headerName: 'Range (km)', flex: 1 },
  ], []);

  // Editable data with DS components
  const [editableData, setEditableData] = useState<EditableRowData[]>([
    { aircraft: 'A320-200', manufacturer: 'Airbus', range: 6100, status: 'active' },
    { aircraft: 'A321neo', manufacturer: 'Airbus', range: 7400, status: 'maintenance' },
    { aircraft: 'B737-800', manufacturer: 'Boeing', range: 5765, status: 'active' },
    { aircraft: 'B787-9', manufacturer: 'Boeing', range: 14140, status: 'retired' },
  ]);

  // Column definitions with custom DS components
  const editableColDefs = useMemo(() => [
    { field: 'aircraft', headerName: 'Aircraft', flex: 1 },
    { field: 'manufacturer', headerName: 'Manufacturer', flex: 1 },
    { field: 'range', headerName: 'Range (km)', flex: 1, cellRenderer: NumberInputCellRenderer },
    { field: 'status', headerName: 'Status', flex: 1, cellRenderer: SelectCellRenderer },
  ], []);

  const installCode = `# Install AG-Grid
npm install ag-grid-community ag-grid-react

# The AS Design System theme is included in @as-design-system/core`;

  const basicUsageCode = `import { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import '@as-design-system/core/ag-grid-theme.css';

// Register AG-Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const MyTable = () => {
  const rowData = useMemo(() => [
    { aircraft: 'A320-200', manufacturer: 'Airbus', range: 6100 },
    { aircraft: 'B737-800', manufacturer: 'Boeing', range: 5765 },
    { aircraft: 'A350-900', manufacturer: 'Airbus', range: 15000 },
  ], []);

  const colDefs = useMemo(() => [
    { field: 'aircraft', headerCheckboxSelection: true, checkboxSelection: true },
    { field: 'manufacturer' },
    { field: 'range' },
  ], []);

  return (
    <div style={{ height: 300 }}>
      <AgGridReact
        className="as-ag-grid"
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection="multiple"
        suppressRowClickSelection={true}
      />
    </div>
  );
};`;

  const smallSizeCode = `<AgGridReact
  className="as-ag-grid as-ag-grid--small"
  rowData={rowData}
  columnDefs={colDefs}
/>`;

  const componentsCode = `import { NumberInput, Select } from '@as-design-system/core';
import { ICellRendererParams } from 'ag-grid-community';

// Custom cell renderer for NumberInput
const NumberInputCellRenderer = (props: ICellRendererParams) => {
  const [value, setValue] = useState(props.value);

  const handleChange = (newValue: number | null) => {
    setValue(newValue);
    props.node.setDataValue(props.colDef.field, newValue);
  };

  return (
    <NumberInput
      value={value}
      onChange={handleChange}
      size="S"
    />
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
    <Select
      value={value}
      onChange={setValue}
      options={options}
      size="S"
    />
  );
};

// Column definitions
const colDefs = [
  { field: 'aircraft', headerName: 'Aircraft' },
  { field: 'range', headerName: 'Range', cellRenderer: NumberInputCellRenderer },
  { field: 'status', headerName: 'Status', cellRenderer: SelectCellRenderer },
];`;

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
  --ag-row-hover-color: var(--primary-t-hover);
  --ag-selected-row-background-color: var(--primary-t-active);

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
              Default table with 40px row height. Use the class <code>as-ag-grid</code>.
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
              Compact table with 32px row height. Add the class <code>as-ag-grid--small</code>.
            </p>
          </section>

          {/* With DS Components */}
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
                With DS Components
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('components')}
              />
            </div>
            <div className="example-container" style={{ height: 220 }}>
              <AgGridReact
                className="as-ag-grid"
                rowData={editableData}
                columnDefs={editableColDefs}
                rowHeight={48}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginTop: '12px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Use custom cell renderers with DS components like <code>NumberInput</code> and <code>Select</code>.
            </p>
          </section>

          {/* Row States */}
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
                Row States
              </h2>
            </div>
            <div className="example-container">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '16px',
                  backgroundColor: 'var(--background-secondary, #fafafa)',
                  borderRadius: '4px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span
                    style={{
                      width: '100px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Default
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '40px',
                      backgroundColor: '#ffffff',
                      borderBottom: '1px solid var(--border-minimal)',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span
                    style={{
                      width: '100px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Hover
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '40px',
                      backgroundColor: 'rgba(0, 45, 128, 0.05)',
                      borderBottom: '1px solid var(--border-minimal)',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span
                    style={{
                      width: '100px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Selected
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '40px',
                      backgroundColor: 'rgba(0, 45, 128, 0.1)',
                      borderBottom: '1px solid var(--border-minimal)',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span
                    style={{
                      width: '100px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Alternating
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '40px',
                      backgroundColor: '#fafafa',
                      borderBottom: '1px solid var(--border-minimal)',
                    }}
                  />
                </div>
              </div>
            </div>
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
        isOpen={openModal === 'variables'}
        onClose={() => setOpenModal(null)}
        title="CSS Variables"
        code={cssVariablesCode}
      />
      <CodeModal
        isOpen={openModal === 'components'}
        onClose={() => setOpenModal(null)}
        title="With DS Components"
        code={componentsCode}
      />
    </div>
  );
}
