import { useState } from 'react';
import { Combobox, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/Combobox.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'br', label: 'Brazil' },
  { value: 'mx', label: 'Mexico' },
];

const airports = [
  { value: 'CDG', label: 'Paris Charles de Gaulle (CDG)' },
  { value: 'ORY', label: 'Paris Orly (ORY)' },
  { value: 'LHR', label: 'London Heathrow (LHR)' },
  { value: 'LGW', label: 'London Gatwick (LGW)' },
  { value: 'JFK', label: 'New York JFK (JFK)' },
  { value: 'LAX', label: 'Los Angeles (LAX)' },
  { value: 'FRA', label: 'Frankfurt (FRA)' },
  { value: 'AMS', label: 'Amsterdam Schiphol (AMS)' },
  { value: 'MAD', label: 'Madrid Barajas (MAD)' },
  { value: 'BCN', label: 'Barcelona El Prat (BCN)' },
];

export default function ComboboxPage() {
  const [activeTab, setActiveTab] = useState<'examples' | 'usage'>('examples');
  const [openModal, setOpenModal] = useState<string | null>(null);

  // Example states
  const [country, setCountry] = useState<string>('');
  const [airport, setAirport] = useState<string>('');
  const [sizeXS, setSizeXS] = useState<string>('');
  const [sizeS, setSizeS] = useState<string>('');
  const [sizeM, setSizeM] = useState<string>('');
  const [sizeL, setSizeL] = useState<string>('');

  const basicCode = `import { Combobox } from '@as-design-system/core';
import '@as-design-system/core/Combobox.css';

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'es', label: 'Spain' },
  // ...
];

<Combobox
  label="Country"
  placeholder="Search country..."
  options={countries}
  value={country}
  onValueChange={setCountry}
/>`;

  const withIconCode = `import { Combobox } from '@as-design-system/core';
import '@as-design-system/core/Combobox.css';

<Combobox
  label="Departure Airport"
  placeholder="Search airport..."
  options={airports}
  value={airport}
  onValueChange={setAirport}
  showLeftIcon
  leftIcon="AIR_airport"
/>`;

  const sizesCode = `import { Combobox } from '@as-design-system/core';

{/* Size XS */}
<Combobox size="XS" label="Size XS" options={options} />

{/* Size S */}
<Combobox size="S" label="Size S" options={options} />

{/* Size M (default) */}
<Combobox size="M" label="Size M" options={options} />

{/* Size L */}
<Combobox size="L" label="Size L" options={options} />`;

  const statesCode = `import { Combobox } from '@as-design-system/core';

{/* Default */}
<Combobox state="Default" label="Default" options={options} />

{/* Error */}
<Combobox state="Error" label="Error" legend="Invalid selection" showLegend options={options} />

{/* Valid */}
<Combobox state="Valid" label="Valid" legend="Valid selection" showLegend options={options} />

{/* Disabled */}
<Combobox state="Disabled" label="Disabled" options={options} />

{/* Read-only */}
<Combobox state="Read-only" label="Read-only" value="fr" options={options} />`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        Combobox
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        An autocomplete input with dropdown suggestions. Combines the functionality of TextInput
        and Select, allowing users to type to filter options or select from a list.
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
          {/* Basic Example */}
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
            <div className="example-container" style={{ maxWidth: '320px' }}>
              <Combobox
                label="Country"
                placeholder="Search country..."
                options={countries}
                value={country}
                onValueChange={setCountry}
              />
            </div>
          </section>

          {/* With Icon */}
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
                With Left Icon
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('withIcon')}
              />
            </div>
            <div className="example-container" style={{ maxWidth: '320px' }}>
              <Combobox
                label="Departure Airport"
                placeholder="Search airport..."
                options={airports}
                value={airport}
                onValueChange={setAirport}
                showLeftIcon
                leftIcon="AIR_airport"
              />
            </div>
          </section>

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
            <div
              className="example-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
              }}
            >
              <Combobox
                size="XS"
                label="Size XS"
                placeholder="Search..."
                options={countries}
                value={sizeXS}
                onValueChange={setSizeXS}
              />
              <Combobox
                size="S"
                label="Size S"
                placeholder="Search..."
                options={countries}
                value={sizeS}
                onValueChange={setSizeS}
              />
              <Combobox
                size="M"
                label="Size M"
                placeholder="Search..."
                options={countries}
                value={sizeM}
                onValueChange={setSizeM}
              />
              <Combobox
                size="L"
                label="Size L"
                placeholder="Search..."
                options={countries}
                value={sizeL}
                onValueChange={setSizeL}
              />
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
            <div
              className="example-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
              }}
            >
              <Combobox
                state="Default"
                label="Default"
                placeholder="Search..."
                options={countries}
              />
              <Combobox
                state="Error"
                label="Error"
                legend="Invalid selection"
                showLegend
                placeholder="Search..."
                options={countries}
              />
              <Combobox
                state="Valid"
                label="Valid"
                legend="Valid selection"
                showLegend
                placeholder="Search..."
                options={countries}
                value="fr"
              />
              <Combobox
                state="Disabled"
                label="Disabled"
                placeholder="Search..."
                options={countries}
              />
              <Combobox
                state="Read-only"
                label="Read-only"
                options={countries}
                value="fr"
              />
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
                    <td style={{ padding: '12px 8px' }}><code>options</code></td>
                    <td style={{ padding: '12px 8px' }}><code>ComboboxOption[]</code></td>
                    <td style={{ padding: '12px 8px' }}>required</td>
                    <td style={{ padding: '12px 8px' }}>Array of options with value and label</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>value</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string</code></td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Selected value</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>onValueChange</code></td>
                    <td style={{ padding: '12px 8px' }}><code>(value: string) =&gt; void</code></td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Callback when value changes</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>onInputChange</code></td>
                    <td style={{ padding: '12px 8px' }}><code>(inputValue: string) =&gt; void</code></td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Callback when input text changes (for async filtering)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>size</code></td>
                    <td style={{ padding: '12px 8px' }}><code>'XS' | 'S' | 'M' | 'L'</code></td>
                    <td style={{ padding: '12px 8px' }}>'M'</td>
                    <td style={{ padding: '12px 8px' }}>Size of the combobox</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>state</code></td>
                    <td style={{ padding: '12px 8px' }}><code>'Default' | 'Error' | 'Valid' | 'Disabled' | 'Read-only'</code></td>
                    <td style={{ padding: '12px 8px' }}>'Default'</td>
                    <td style={{ padding: '12px 8px' }}>Validation state</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>placeholder</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string</code></td>
                    <td style={{ padding: '12px 8px' }}>'Search...'</td>
                    <td style={{ padding: '12px 8px' }}>Placeholder text</td>
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
                    <td style={{ padding: '12px 8px' }}><code>legend</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string</code></td>
                    <td style={{ padding: '12px 8px' }}>'Legend'</td>
                    <td style={{ padding: '12px 8px' }}>Helper text below the input</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>showLegend</code></td>
                    <td style={{ padding: '12px 8px' }}><code>boolean</code></td>
                    <td style={{ padding: '12px 8px' }}>false</td>
                    <td style={{ padding: '12px 8px' }}>Show the legend</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>showLeftIcon</code></td>
                    <td style={{ padding: '12px 8px' }}><code>boolean</code></td>
                    <td style={{ padding: '12px 8px' }}>false</td>
                    <td style={{ padding: '12px 8px' }}>Show the left icon</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>leftIcon</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string</code></td>
                    <td style={{ padding: '12px 8px' }}>'search'</td>
                    <td style={{ padding: '12px 8px' }}>Name of the left icon</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>allowCustomValue</code></td>
                    <td style={{ padding: '12px 8px' }}><code>boolean</code></td>
                    <td style={{ padding: '12px 8px' }}>false</td>
                    <td style={{ padding: '12px 8px' }}>Allow values not in options list</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px' }}><code>emptyText</code></td>
                    <td style={{ padding: '12px 8px' }}><code>string</code></td>
                    <td style={{ padding: '12px 8px' }}>'No results found'</td>
                    <td style={{ padding: '12px 8px' }}>Text shown when no options match</td>
                  </tr>
                </tbody>
              </table>
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
              Keyboard Navigation
            </h2>
            <div className="example-container">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Key</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>Arrow Down</code></td>
                    <td style={{ padding: '12px 8px' }}>Move to next option / Open dropdown</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>Arrow Up</code></td>
                    <td style={{ padding: '12px 8px' }}>Move to previous option / Open dropdown</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>Enter</code></td>
                    <td style={{ padding: '12px 8px' }}>Select highlighted option</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>Escape</code></td>
                    <td style={{ padding: '12px 8px' }}>Close dropdown</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px' }}><code>Tab</code></td>
                    <td style={{ padding: '12px 8px' }}>Close dropdown and move focus</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Basic Combobox"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'withIcon'}
        onClose={() => setOpenModal(null)}
        title="Combobox with Icon"
        code={withIconCode}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Combobox Sizes"
        code={sizesCode}
      />
      <CodeModal
        isOpen={openModal === 'states'}
        onClose={() => setOpenModal(null)}
        title="Combobox States"
        code={statesCode}
      />
    </div>
  );
}
