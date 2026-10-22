import { useState } from 'react';
import { MultiSelect, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/MultiSelect.css';
import '@as-designsystem/core/Chip.css';
import '@as-designsystem/core/Checkbox.css';
import '@as-designsystem/core/ScrollableContent.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';

const runways = ['08L', '08R', '09L', '09R', '26L', '26R', '27L', '27R'].map((r) => ({ value: r, label: r }));

const sid = (names: string[]) => names.map((n) => ({ value: n, label: n }));
const sidGroups = [
  { label: '08L', options: sid(['ATREX 6B', 'BUBLI 6B', 'NURMO 6B']) },
  { label: '08R', options: [] },
  { label: '26R', options: sid(['ATREX 6A', 'BUBLI 6A', 'NURMO 6A', 'RANUX 6A']) },
];

export default function MultiSelectPage() {
  const [activeTab, setActiveTab] = useState<'examples' | 'usage'>('examples');
  const [openModal, setOpenModal] = useState<string | null>(null);

  const [basic, setBasic] = useState<string[]>(runways.map((r) => r.value));
  const [sids, setSids] = useState<string[]>([]);
  const [exclusive, setExclusive] = useState<string[]>([]);
  const [sizeXS, setSizeXS] = useState<string[]>(['08L', '26R']);
  const [sizeS, setSizeS] = useState<string[]>(['08L', '26R']);
  const [sizeM, setSizeM] = useState<string[]>(['08L', '26R']);
  const [sizeL, setSizeL] = useState<string[]>(['08L', '26R']);

  const basicCode = `import { MultiSelect } from '@as-designsystem/core';
import '@as-designsystem/core/MultiSelect.css';

const runways = [
  { value: '08L', label: '08L' },
  { value: '08R', label: '08R' },
  // ...
];

<MultiSelect
  label="Runways"
  placeholder="Select runways"
  options={runways}
  value={selected}
  onValueChange={setSelected}
/>`;

  const groupedCode = `<MultiSelect
  label="SIDs"
  placeholder="Select SIDs"
  groups={[
    { label: '08L', options: [{ value: 'ATREX 6B', label: 'ATREX 6B' }] },
    { label: '08R', options: [] },
  ]}
  emptyGroupText="No SID for this runway"
  value={sids}
  onValueChange={setSids}
/>`;

  const exclusiveCode = `// An empty value means "All" — the field is never empty
<MultiSelect
  label="Runways"
  exclusiveAll
  options={runways}
  value={runways}
  onValueChange={setRunways}
/>`;

  const sizesCode = `<MultiSelect size="XS" label="Size XS" options={options} value={value} onValueChange={setValue} />
<MultiSelect size="S" label="Size S" options={options} value={value} onValueChange={setValue} />
<MultiSelect size="M" label="Size M" options={options} value={value} onValueChange={setValue} />
<MultiSelect size="L" label="Size L" options={options} value={value} onValueChange={setValue} />`;

  const statesCode = `<MultiSelect state="Default" label="Default" options={options} value={[]} />
<MultiSelect state="Error" label="Error" legend="This field is required" showLegend options={options} value={[]} />
<MultiSelect state="Valid" label="Valid" legend="Valid selection" showLegend options={options} value={['08L']} />
<MultiSelect state="Disabled" label="Disabled" options={options} value={[]} />
<MultiSelect state="Read-only" label="Read-only" options={options} value={['08L']} />`;

  const optionsCode = `<MultiSelect label="Optional" showOptional options={options} value={[]} />
<MultiSelect label="With legend" legend="Max 4 runways" showLegend options={options} value={[]} />
<MultiSelect label="With info" showInfo infoText="Long explanation…" options={options} value={[]} />
<MultiSelect label="With actions" actions={[{ icon: 'tune', tooltip: 'Settings' }]} options={options} value={[]} />
<MultiSelect label="Without select all" showSelectAll={false} options={options} value={[]} />`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          MultiSelect
        </h1>
        <InstallCommand componentName="multi-select" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A multiple selection field. Selected options are shown as removable chips inside the field —
        as many as fit on one line, then a "+X" counter. The dropdown lists every option with a
        checkbox, an "All" row (selects or clears every option) and optional groups.
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

      {activeTab === 'examples' && (
        <>
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
                Basic
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
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
                <div style={{ width: '300px' }}>
                  <MultiSelect label="Runways" placeholder="Select runways" options={runways} value={basic} onValueChange={setBasic} />
                </div>
                <div style={{ width: '300px' }}>
                  <MultiSelect label="Runways" placeholder="Select runways" options={runways} value={basic} onValueChange={setBasic} labelPosition="left" />
                </div>
              </div>
            </div>
          </section>
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
                Grouped Options
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('grouped')}
              />
            </div>
            <div className="example-container" style={{ maxWidth: '320px' }}>
              <MultiSelect
                label="SIDs"
                placeholder="Select SIDs"
                groups={sidGroups}
                emptyGroupText="No SID for this runway"
                value={sids}
                onValueChange={setSids}
              />
            </div>
          </section>
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
                Exclusive All
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('exclusive')}
              />
            </div>
            <p className="label-regular-s" style={{ marginBottom: '16px', color: 'var(--text-secondary, #63728a)' }}>
              With <code>exclusiveAll</code>, "All" is a choice of its own: an empty value means All (the default),
              picking an option replaces All, picking All clears the options and removing the last option goes back to All.
            </p>
            <div className="example-container" style={{ maxWidth: '320px' }}>
              <MultiSelect label="Runways" exclusiveAll options={runways} value={exclusive} onValueChange={setExclusive} />
            </div>
          </section>
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
                Sizes
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('sizes')}
              />
            </div>
            <div
              className="example-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
              }}
            >
              <MultiSelect size="XS" label="Size XS" options={runways} value={sizeXS} onValueChange={setSizeXS} />
              <MultiSelect size="S" label="Size S" options={runways} value={sizeS} onValueChange={setSizeS} />
              <MultiSelect size="M" label="Size M" options={runways} value={sizeM} onValueChange={setSizeM} />
              <MultiSelect size="L" label="Size L" options={runways} value={sizeL} onValueChange={setSizeL} />
            </div>
          </section>
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
                States
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('states')}
              />
            </div>
            <div className="example-container">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                  columnGap: '48px',
                  rowGap: '28px',
                  alignItems: 'start',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary, #63728a)' }}>Vertical</span>
                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary, #63728a)' }}>Horizontal</span>
                <MultiSelect state="Default" label="Default" options={runways} value={[]} />
                <MultiSelect state="Default" label="Default" options={runways} value={[]} labelPosition="left" />
                <MultiSelect state="Error" label="Error" legend="This field is required" showLegend options={runways} value={[]} />
                <MultiSelect state="Error" label="Error" legend="This field is required" showLegend options={runways} value={[]} labelPosition="left" />
                <MultiSelect state="Valid" label="Valid" legend="Valid selection" showLegend options={runways} value={['08L', '26R']} />
                <MultiSelect state="Valid" label="Valid" legend="Valid selection" showLegend options={runways} value={['08L', '26R']} labelPosition="left" />
                <MultiSelect state="Disabled" label="Disabled" options={runways} value={[]} />
                <MultiSelect state="Disabled" label="Disabled" options={runways} value={[]} labelPosition="left" />
                <MultiSelect state="Read-only" label="Read-only" options={runways} value={['08L', '26R']} />
                <MultiSelect state="Read-only" label="Read-only" options={runways} value={['08L', '26R']} labelPosition="left" />
              </div>
            </div>
          </section>
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
                Other Options
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('options')}
              />
            </div>
            <div className="example-container">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                  columnGap: '48px',
                  rowGap: '28px',
                  alignItems: 'start',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary, #63728a)' }}>Vertical</span>
                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary, #63728a)' }}>Horizontal</span>
                <MultiSelect label="Optional" showOptional options={runways} value={[]} />
                <MultiSelect label="Optional" showOptional options={runways} value={[]} labelPosition="left" />
                <MultiSelect label="With legend" legend="Max 4 runways" showLegend options={runways} value={[]} />
                <MultiSelect label="With legend" legend="Max 4 runways" showLegend options={runways} value={[]} labelPosition="left" />
                <MultiSelect label="With info" showInfo infoText="Runways taken into account to determine the most optimal flight. A single runway is selected among them in the end." options={runways} value={[]} />
                <MultiSelect label="With info" showInfo infoText="Runways taken into account to determine the most optimal flight. A single runway is selected among them in the end." options={runways} value={[]} labelPosition="left" />
                <MultiSelect label="With actions" actions={[{ icon: 'tune', tooltip: 'Settings' }]} options={runways} value={[]} />
                <MultiSelect label="With actions" actions={[{ icon: 'tune', tooltip: 'Settings' }]} options={runways} value={[]} labelPosition="left" />
                <MultiSelect label="Without select all" showSelectAll={false} options={runways} value={[]} />
                <MultiSelect label="Without select all" showSelectAll={false} options={runways} value={[]} labelPosition="left" />
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'usage' && (
        <>
          <section className="component-section">
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
                <code>{basicCode}</code>
              </pre>
            </div>
          </section>

          <section className="component-section">
            <h2
              className="heading-6"
              style={{
                marginTop: '32px',
                marginBottom: '16px',
                color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
              }}
            >
              Props
            </h2>
            <div className="example-container">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Prop</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Default</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>value</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string[]</code></td>
                    <td style={{ padding: '12px 8px' }}>required</td>
                    <td style={{ padding: '12px 8px' }}>Selected values</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>onValueChange</code></td>
                    <td style={{ padding: '12px 8px' }}><code>(value: string[]) =&gt; void</code></td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Callback when the selection changes (values kept in option order)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>options</code></td>
                    <td style={{ padding: '12px 8px' }}><code>MultiSelectOption[]</code></td>
                    <td style={{ padding: '12px 8px' }}>[]</td>
                    <td style={{ padding: '12px 8px' }}>Flat list of options with value and label</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>groups</code></td>
                    <td style={{ padding: '12px 8px' }}><code>MultiSelectGroup[]</code></td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Options grouped under small titles (replaces options)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>emptyGroupText</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string</code></td>
                    <td style={{ padding: '12px 8px' }}>'No option'</td>
                    <td style={{ padding: '12px 8px' }}>Text shown under a group that has no option</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>showSelectAll</code></td>
                    <td style={{ padding: '12px 8px' }}><code>boolean</code></td>
                    <td style={{ padding: '12px 8px' }}>true</td>
                    <td style={{ padding: '12px 8px' }}>Show the "All" row (checked, empty or indeterminate)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>exclusiveAll</code></td>
                    <td style={{ padding: '12px 8px' }}><code>boolean</code></td>
                    <td style={{ padding: '12px 8px' }}>false</td>
                    <td style={{ padding: '12px 8px' }}>"All" becomes an exclusive choice: an empty value means All and the field is never empty</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>selectAllLabel</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string</code></td>
                    <td style={{ padding: '12px 8px' }}>'All'</td>
                    <td style={{ padding: '12px 8px' }}>Label of the "All" row</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>size</code></td>
                    <td style={{ padding: '12px 8px' }}><code>'XS' | 'S' | 'M' | 'L'</code></td>
                    <td style={{ padding: '12px 8px' }}>'M'</td>
                    <td style={{ padding: '12px 8px' }}>Size of the field</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>state</code></td>
                    <td style={{ padding: '12px 8px' }}><code>'Default' | 'Error' | 'Valid' | 'Disabled' | 'Read-only'</code></td>
                    <td style={{ padding: '12px 8px' }}>'Default'</td>
                    <td style={{ padding: '12px 8px' }}>Validation state. A field with no option is disabled</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>placeholder</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string</code></td>
                    <td style={{ padding: '12px 8px' }}>'Select options'</td>
                    <td style={{ padding: '12px 8px' }}>Text shown when nothing is selected</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>label</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string</code></td>
                    <td style={{ padding: '12px 8px' }}>'Label'</td>
                    <td style={{ padding: '12px 8px' }}>Label text</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>showLabel</code></td>
                    <td style={{ padding: '12px 8px' }}><code>boolean</code></td>
                    <td style={{ padding: '12px 8px' }}>true</td>
                    <td style={{ padding: '12px 8px' }}>Show the label</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>showOptional</code></td>
                    <td style={{ padding: '12px 8px' }}><code>boolean</code></td>
                    <td style={{ padding: '12px 8px' }}>false</td>
                    <td style={{ padding: '12px 8px' }}>Show "(Optional)" after the label</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>showInfo</code></td>
                    <td style={{ padding: '12px 8px' }}><code>boolean</code></td>
                    <td style={{ padding: '12px 8px' }}>false</td>
                    <td style={{ padding: '12px 8px' }}>Show the info icon</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>infoText</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string</code></td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Info tooltip text (wraps past 280px)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>actions</code></td>
                    <td style={{ padding: '12px 8px' }}><code>FieldAction[]</code></td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Ghost icon buttons aligned to the right edge of the label row</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>legend</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string</code></td>
                    <td style={{ padding: '12px 8px' }}>'Legend'</td>
                    <td style={{ padding: '12px 8px' }}>Helper text below the field</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>showLegend</code></td>
                    <td style={{ padding: '12px 8px' }}><code>boolean</code></td>
                    <td style={{ padding: '12px 8px' }}>false</td>
                    <td style={{ padding: '12px 8px' }}>Show the legend</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px' }}><code>labelPosition</code></td>
                    <td style={{ padding: '12px 8px' }}><code>'top' | 'left'</code></td>
                    <td style={{ padding: '12px 8px' }}>'top'</td>
                    <td style={{ padding: '12px 8px' }}>Position of the label</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* Modals */}
      <CodeModal isOpen={openModal === 'basic'} onClose={() => setOpenModal(null)} title="Basic MultiSelect" code={basicCode} />
      <CodeModal isOpen={openModal === 'grouped'} onClose={() => setOpenModal(null)} title="Grouped Options" code={groupedCode} />
      <CodeModal isOpen={openModal === 'exclusive'} onClose={() => setOpenModal(null)} title="Exclusive All" code={exclusiveCode} />
      <CodeModal isOpen={openModal === 'sizes'} onClose={() => setOpenModal(null)} title="MultiSelect Sizes" code={sizesCode} />
      <CodeModal isOpen={openModal === 'states'} onClose={() => setOpenModal(null)} title="MultiSelect States" code={statesCode} />
      <CodeModal isOpen={openModal === 'options'} onClose={() => setOpenModal(null)} title="Other Options" code={optionsCode} />
    </div>
  );
}
