import { useState } from 'react';
import { NumberInput, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/NumberInput.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './NumberInput.css';

export default function NumberInputPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const [quantity, setQuantity] = useState(5);
  const [quantityStepper, setQuantityStepper] = useState(5);
  const [temperature, setTemperature] = useState(20);
  const [temperatureStepper, setTemperatureStepper] = useState(20);

  // Prefix & Suffix examples
  const [percentage, setPercentage] = useState(12);
  const [percentageStepper, setPercentageStepper] = useState(12);
  const [price, setPrice] = useState(250);
  const [priceStepper, setPriceStepper] = useState(250);
  const [weight, setWeight] = useState(75);
  const [weightStepper, setWeightStepper] = useState(75);
  const [tempC, setTempC] = useState(20);
  const [tempCStepper, setTempCStepper] = useState(20);

  const variantsCode = `import { NumberInput } from '@/design-system/components/NumberInput';

// Default variant: buttons on both sides, text centered
<NumberInput label="Default" value={0} onChange={(v) => console.log(v)} />

// Stepper variant: up/down buttons stacked on right (appear on hover), text left-aligned
<NumberInput label="Stepper" value={0} variant="Stepper" onChange={(v) => console.log(v)} />`;

  const sizesCode = `import { NumberInput } from '@/design-system/components/NumberInput';

// Default variant sizes
<NumberInput label="XS" value={0} size="XS" onChange={(v) => console.log(v)} />
<NumberInput label="S" value={0} size="S" onChange={(v) => console.log(v)} />
<NumberInput label="M" value={0} size="M" onChange={(v) => console.log(v)} />
<NumberInput label="L" value={0} size="L" onChange={(v) => console.log(v)} />

// Stepper variant sizes
<NumberInput label="XS" value={0} size="XS" variant="Stepper" onChange={(v) => console.log(v)} />
<NumberInput label="S" value={0} size="S" variant="Stepper" onChange={(v) => console.log(v)} />
<NumberInput label="M" value={0} size="M" variant="Stepper" onChange={(v) => console.log(v)} />
<NumberInput label="L" value={0} size="L" variant="Stepper" onChange={(v) => console.log(v)} />`;

  const statesCode = `import { NumberInput } from '@/design-system/components/NumberInput';

// Default variant states
<NumberInput label="Default" value={5} state="Default" onChange={(v) => console.log(v)} />
<NumberInput label="Error" value={0} state="Error" legend="Error message" showLegend onChange={(v) => console.log(v)} />
<NumberInput label="Valid" value={10} state="Valid" legend="Valid" showLegend onChange={(v) => console.log(v)} />
<NumberInput label="Disabled" value={3} disabled />
<NumberInput label="Read-only" value={42} readOnly />

// Stepper variant states
<NumberInput label="Default" value={5} variant="Stepper" state="Default" onChange={(v) => console.log(v)} />
<NumberInput label="Error" value={0} variant="Stepper" state="Error" legend="Error message" showLegend onChange={(v) => console.log(v)} />
<NumberInput label="Valid" value={10} variant="Stepper" state="Valid" legend="Valid" showLegend onChange={(v) => console.log(v)} />
<NumberInput label="Disabled" value={3} variant="Stepper" disabled />
<NumberInput label="Read-only" value={42} variant="Stepper" readOnly />`;

  const prefixSuffixCode = `import { NumberInput } from '@/design-system/components/NumberInput';

// Percentage (suffix)
<NumberInput label="Discount" value={12} suffix="%" min={0} max={100} onChange={(v) => setValue(v)} />

// Currency (prefix)
<NumberInput label="Price" value={250} prefix="$" min={0} onChange={(v) => setValue(v)} />

// Weight (suffix with space)
<NumberInput label="Weight" value={75} suffix=" kg" min={0} max={500} onChange={(v) => setValue(v)} />

// Temperature (suffix)
<NumberInput label="Temperature" value={20} suffix="°C" min={-40} max={50} step={5} onChange={(v) => setValue(v)} />

// Prefix + Suffix combined
<NumberInput label="Budget" value={1000} prefix="$" suffix=" USD" onChange={(v) => setValue(v)} />`;

  const optionsCode = `import { NumberInput } from '@/design-system/components/NumberInput';

// With optional text
<NumberInput label="Optional" value={0} showOptional onChange={(v) => console.log(v)} />

// With legend
<NumberInput label="With legend" value={1} legend="Max 10 items" showLegend onChange={(v) => console.log(v)} />

// With info tooltip
<NumberInput label="With info" value={1} showInfo infoText="Tooltip text" onChange={(v) => console.log(v)} />

// With min/max constraints
<NumberInput label="Min/Max" value={5} min={0} max={10} onChange={(v) => console.log(v)} />`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          NumberInput
        </h1>
        <InstallCommand componentName="number-input" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Numeric stepper input with increment/decrement buttons, supporting
        different sizes, states, and min/max constraints.
      </p>

      {/* Main Tabs */}
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

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <>
          {/* Variants */}
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
                Variants
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('variants')}
              />
            </div>
            <div className="example-container">
              <div className="numberinput-variants-row">
                <div className="numberinput-variant-column">
                  <span className="variant-label">Default</span>
                  <NumberInput
                    label="Quantity"
                    value={0}
                    onChange={() => {}}
                  />
                </div>
                <div className="numberinput-variant-column">
                  <span className="variant-label">Stepper</span>
                  <NumberInput
                    label="Quantity"
                    value={0}
                    variant="Stepper"
                    onChange={() => {}}
                  />
                </div>
              </div>
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
            <div className="example-container">
              <div className="numberinput-dual-columns">
                <div className="numberinput-column">
                  <span className="variant-label">Default</span>
                  <NumberInput label="XS" value={0} size="XS" onChange={() => {}} />
                  <NumberInput label="S" value={0} size="S" onChange={() => {}} />
                  <NumberInput label="M" value={0} size="M" onChange={() => {}} />
                  <NumberInput label="L" value={0} size="L" onChange={() => {}} />
                </div>
                <div className="numberinput-column">
                  <span className="variant-label">Stepper</span>
                  <NumberInput label="XS" value={0} size="XS" variant="Stepper" onChange={() => {}} />
                  <NumberInput label="S" value={0} size="S" variant="Stepper" onChange={() => {}} />
                  <NumberInput label="M" value={0} size="M" variant="Stepper" onChange={() => {}} />
                  <NumberInput label="L" value={0} size="L" variant="Stepper" onChange={() => {}} />
                </div>
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
              <div className="numberinput-dual-columns">
                <div className="numberinput-column">
                  <span className="variant-label">Default</span>
                  <NumberInput label="Default" value={5} state="Default" onChange={() => {}} />
                  <NumberInput label="Error" value={0} state="Error" legend="Error message" showLegend onChange={() => {}} />
                  <NumberInput label="Valid" value={10} state="Valid" legend="Valid" showLegend onChange={() => {}} />
                  <NumberInput label="Disabled" value={3} disabled />
                  <NumberInput label="Read-only" value={42} readOnly />
                </div>
                <div className="numberinput-column">
                  <span className="variant-label">Stepper</span>
                  <NumberInput label="Default" value={5} variant="Stepper" state="Default" onChange={() => {}} />
                  <NumberInput label="Error" value={0} variant="Stepper" state="Error" legend="Error message" showLegend onChange={() => {}} />
                  <NumberInput label="Valid" value={10} variant="Stepper" state="Valid" legend="Valid" showLegend onChange={() => {}} />
                  <NumberInput label="Disabled" value={3} variant="Stepper" disabled />
                  <NumberInput label="Read-only" value={42} variant="Stepper" readOnly />
                </div>
              </div>
            </div>
          </section>

          {/* Prefix & Suffix */}
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
                Prefix & Suffix
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('prefixSuffix')}
              />
            </div>
            <p
              className="label-regular-m"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Add prefix and/or suffix text to the value. On focus, the formatting is removed for easier editing.
            </p>
            <div className="example-container">
              <div className="numberinput-dual-columns">
                <div className="numberinput-column">
                  <span className="variant-label">Default</span>
                  <NumberInput
                    label="Discount"
                    value={percentage}
                    suffix="%"
                    min={0}
                    max={100}
                    onChange={setPercentage}
                  />
                  <NumberInput
                    label="Price"
                    value={price}
                    prefix="$"
                    min={0}
                    onChange={setPrice}
                  />
                  <NumberInput
                    label="Weight"
                    value={weight}
                    suffix=" kg"
                    min={0}
                    max={500}
                    onChange={setWeight}
                  />
                  <NumberInput
                    label="Temperature"
                    value={tempC}
                    suffix="°C"
                    min={-40}
                    max={50}
                    step={5}
                    onChange={setTempC}
                  />
                </div>
                <div className="numberinput-column">
                  <span className="variant-label">Stepper</span>
                  <NumberInput
                    label="Discount"
                    value={percentageStepper}
                    variant="Stepper"
                    suffix="%"
                    min={0}
                    max={100}
                    onChange={setPercentageStepper}
                  />
                  <NumberInput
                    label="Price"
                    value={priceStepper}
                    variant="Stepper"
                    prefix="$"
                    min={0}
                    onChange={setPriceStepper}
                  />
                  <NumberInput
                    label="Weight"
                    value={weightStepper}
                    variant="Stepper"
                    suffix=" kg"
                    min={0}
                    max={500}
                    onChange={setWeightStepper}
                  />
                  <NumberInput
                    label="Temperature"
                    value={tempCStepper}
                    variant="Stepper"
                    suffix="°C"
                    min={-40}
                    max={50}
                    step={5}
                    onChange={setTempCStepper}
                  />
                </div>
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
              <div className="numberinput-dual-columns">
                <div className="numberinput-column">
                  <span className="variant-label">Default</span>
                  <NumberInput label="Optional" value={0} showOptional onChange={() => {}} />
                  <NumberInput label="With legend" value={1} legend="Max 10 items" showLegend onChange={() => {}} />
                  <NumberInput label="With info" value={1} showInfo infoText="Tooltip text" onChange={() => {}} />
                  <NumberInput label="Min/Max (0-10)" value={5} min={0} max={10} onChange={() => {}} />
                </div>
                <div className="numberinput-column">
                  <span className="variant-label">Stepper</span>
                  <NumberInput label="Optional" value={0} variant="Stepper" showOptional onChange={() => {}} />
                  <NumberInput label="With legend" value={1} variant="Stepper" legend="Max 10 items" showLegend onChange={() => {}} />
                  <NumberInput label="With info" value={1} variant="Stepper" showInfo infoText="Tooltip text" onChange={() => {}} />
                  <NumberInput label="Min/Max (0-10)" value={5} variant="Stepper" min={0} max={10} onChange={() => {}} />
                </div>
              </div>
            </div>
          </section>

          {/* Controlled Input Example */}
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
                Controlled Input
              </h2>
            </div>
            <div className="example-container">
              <div className="numberinput-dual-columns">
                <div className="numberinput-column">
                  <span className="variant-label">Default</span>
                  <NumberInput
                    label="Quantity"
                    value={quantity}
                    min={0}
                    max={99}
                    onChange={setQuantity}
                  />
                  <NumberInput
                    label="Temperature"
                    value={temperature}
                    step={5}
                    min={-40}
                    max={50}
                    onChange={setTemperature}
                    legend={`Current: ${temperature}°C`}
                    showLegend
                  />
                </div>
                <div className="numberinput-column">
                  <span className="variant-label">Stepper</span>
                  <NumberInput
                    label="Quantity"
                    value={quantityStepper}
                    variant="Stepper"
                    min={0}
                    max={99}
                    onChange={setQuantityStepper}
                  />
                  <NumberInput
                    label="Temperature"
                    value={temperatureStepper}
                    variant="Stepper"
                    step={5}
                    min={-40}
                    max={50}
                    onChange={setTemperatureStepper}
                    legend={`Current: ${temperatureStepper}°C`}
                    showLegend
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Props Tab */}
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
                  <td>Input label text</td>
                </tr>
                <tr>
                  <td><code>legend</code></td>
                  <td><code>string</code></td>
                  <td><code>'Legend'</code></td>
                  <td>Helper text below input</td>
                </tr>
                <tr>
                  <td><code>value</code></td>
                  <td><code>number</code></td>
                  <td><code>undefined</code></td>
                  <td>Current numeric value</td>
                </tr>
                <tr>
                  <td><code>onChange</code></td>
                  <td><code>{'(value: number) => void'}</code></td>
                  <td><code>undefined</code></td>
                  <td>Callback when value changes</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'XS' | 'S' | 'M' | 'L'</code></td>
                  <td><code>'M'</code></td>
                  <td>Input size</td>
                </tr>
                <tr>
                  <td><code>state</code></td>
                  <td><code>'Default' | 'Error' | 'Valid'</code></td>
                  <td><code>'Default'</code></td>
                  <td>Validation state</td>
                </tr>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>'Stepper'</code></td>
                  <td><code>undefined</code></td>
                  <td>Stepper variant puts up/down buttons on the right side (appear on hover)</td>
                </tr>
                <tr>
                  <td><code>prefix</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Text displayed before the value (e.g. "$", "€"). Hidden on focus for editing.</td>
                </tr>
                <tr>
                  <td><code>suffix</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Text displayed after the value (e.g. "%", "°C", " kg"). Hidden on focus for editing.</td>
                </tr>
                <tr>
                  <td><code>min</code></td>
                  <td><code>number</code></td>
                  <td><code>undefined</code></td>
                  <td>Minimum allowed value</td>
                </tr>
                <tr>
                  <td><code>max</code></td>
                  <td><code>number</code></td>
                  <td><code>undefined</code></td>
                  <td>Maximum allowed value</td>
                </tr>
                <tr>
                  <td><code>step</code></td>
                  <td><code>number</code></td>
                  <td><code>1</code></td>
                  <td>Step increment/decrement value</td>
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
                  <td>Tooltip text for info icon</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Disable the input</td>
                </tr>
                <tr>
                  <td><code>readOnly</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Make input read-only (hides stepper buttons)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'prefixSuffix'}
        onClose={() => setOpenModal(null)}
        title="Prefix & Suffix Implementation"
        code={prefixSuffixCode}
      />
      <CodeModal
        isOpen={openModal === 'variants'}
        onClose={() => setOpenModal(null)}
        title="Variants Implementation"
        code={variantsCode}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Sizes Implementation"
        code={sizesCode}
      />
      <CodeModal
        isOpen={openModal === 'states'}
        onClose={() => setOpenModal(null)}
        title="States Implementation"
        code={statesCode}
      />
      <CodeModal
        isOpen={openModal === 'options'}
        onClose={() => setOpenModal(null)}
        title="Options Implementation"
        code={optionsCode}
      />
    </div>
  );
}
