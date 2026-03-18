import { useState } from 'react';
import { Select, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/Select.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Select.css';

export default function SelectPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [selectValue, setSelectValue] = useState<string>();

  const countryOptions = [
    { value: 'fr', label: 'France' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'es', label: 'Spain' },
  ];

  const sizesCode = `import { Select } from '@/design-system/components/Select';

const options = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
];

<Select label="Size XS" options={options} size="XS" />
<Select label="Size S" options={options} size="S" />
<Select label="Size M" options={options} size="M" />
<Select label="Size L" options={options} size="L" />`;

  const statesCode = `import { Select } from '@/design-system/components/Select';

const options = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'United States' },
];

<Select label="Default" options={options} state="Default" />
<Select label="Error" options={options} state="Error" legend="This field is required" showLegend />
<Select label="Valid" options={options} state="Valid" legend="Selection confirmed" showLegend />
<Select label="Disabled" options={options} state="Disabled" />
<Select label="Read-only" options={options} state="Read-only" value="fr" />`;

  const optionsCode = `import { Select } from '@/design-system/components/Select';

const options = [
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'United States' },
];

// With optional text
<Select label="Country" options={options} showOptional />

// With legend
<Select label="Country" options={options} legend="Select your country" showLegend />

// With left icon
<Select label="Country" options={options} showLeftIcon leftIcon="AIR_engine" />

// With info icon and tooltip
<Select label="Country" options={options} showInfo infoText="Select your country of residence" />`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        Select
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Accessible select component built on Radix UI with keyboard navigation and full customization.
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
              label="Props"
              size="M"
              status={activeTab === 'props' ? 'Active' : 'Default'}
              onClick={() => setActiveTab('props')}
            />
          </div>
        </div>
      </div>

      {activeTab === 'examples' && (
        <>
          {/* Sizes */}
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
            <div className="example-container">
              <div className="select-examples">
                <Select label="Size XS" options={countryOptions} size="XS" value={selectValue} onValueChange={setSelectValue} />
                <Select label="Size S" options={countryOptions} size="S" value={selectValue} onValueChange={setSelectValue} />
                <Select label="Size M" options={countryOptions} size="M" value={selectValue} onValueChange={setSelectValue} />
                <Select label="Size L" options={countryOptions} size="L" value={selectValue} onValueChange={setSelectValue} />
              </div>
            </div>
          </section>

          {/* States */}
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
              <div className="select-examples">
                <Select label="Default" options={countryOptions} state="Default" />
                <Select label="Error" options={countryOptions} state="Error" legend="This field is required" showLegend />
                <Select label="Valid" options={countryOptions} state="Valid" legend="Selection confirmed" showLegend />
                <Select label="Disabled" options={countryOptions} state="Disabled" />
                <Select label="Read-only" options={countryOptions} state="Read-only" value="fr" />
              </div>
            </div>
          </section>

          {/* Other Options */}
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
              <div className="select-examples">
                <Select label="With optional" options={countryOptions} showOptional />
                <Select label="With legend" options={countryOptions} legend="Select your country" showLegend />
                <Select label="With left icon" options={countryOptions} showLeftIcon leftIcon="AIR_engine" />
                <Select label="With info tooltip" options={countryOptions} showInfo infoText="Select your country of residence" />
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'props' && (
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
          <div className="props-table">
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td><code>'Label'</code></td>
                  <td>Select label text</td>
                </tr>
                <tr>
                  <td><code>legend</code></td>
                  <td><code>string</code></td>
                  <td><code>'Legend'</code></td>
                  <td>Helper text below select</td>
                </tr>
                <tr>
                  <td><code>placeholder</code></td>
                  <td><code>string</code></td>
                  <td><code>'Select an option'</code></td>
                  <td>Placeholder text</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'XS' | 'S' | 'M' | 'L'</code></td>
                  <td><code>'M'</code></td>
                  <td>Select size</td>
                </tr>
                <tr>
                  <td><code>state</code></td>
                  <td><code>'Default' | 'Hover' | 'Active' | 'Disabled' | 'Error' | 'Valid' | 'Read-only'</code></td>
                  <td><code>'Default'</code></td>
                  <td>Select state</td>
                </tr>
                <tr>
                  <td><code>showLabel</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show label</td>
                </tr>
                <tr>
                  <td><code>showLegend</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show legend</td>
                </tr>
                <tr>
                  <td><code>showOptional</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show "(Optional)" text</td>
                </tr>
                <tr>
                  <td><code>showInfo</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show info icon</td>
                </tr>
                <tr>
                  <td><code>infoText</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Tooltip text on info icon hover</td>
                </tr>
                <tr>
                  <td><code>showLeftIcon</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show left icon</td>
                </tr>
                <tr>
                  <td><code>leftIcon</code></td>
                  <td><code>string</code></td>
                  <td><code>'AIR_fleet'</code></td>
                  <td>Left icon name</td>
                </tr>
                <tr>
                  <td><code>options</code></td>
                  <td><code>{'SelectOption[]'}</code></td>
                  <td><code>[]</code></td>
                  <td>Array of options</td>
                </tr>
                <tr>
                  <td><code>value</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Selected value</td>
                </tr>
                <tr>
                  <td><code>onValueChange</code></td>
                  <td><code>(value: string) =&gt; void</code></td>
                  <td><code>undefined</code></td>
                  <td>Value change callback</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      <CodeModal isOpen={openModal === 'sizes'} onClose={() => setOpenModal(null)} title="Sizes" code={sizesCode} />
      <CodeModal isOpen={openModal === 'states'} onClose={() => setOpenModal(null)} title="States" code={statesCode} />
      <CodeModal isOpen={openModal === 'options'} onClose={() => setOpenModal(null)} title="Other Options" code={optionsCode} />
    </div>
  );
}
