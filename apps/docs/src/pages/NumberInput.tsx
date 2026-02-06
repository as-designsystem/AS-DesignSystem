import { useState } from 'react';
import { NumberInput, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/NumberInput.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './NumberInput.css';

export default function NumberInputPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const [quantity, setQuantity] = useState(5);
  const [temperature, setTemperature] = useState(20);

  const sizesCode = `import { NumberInput } from '@/design-system/components/NumberInput';

<NumberInput label="Size XS" value={0} size="XS" onChange={(v) => console.log(v)} />
<NumberInput label="Size S" value={0} size="S" onChange={(v) => console.log(v)} />
<NumberInput label="Size M" value={0} size="M" onChange={(v) => console.log(v)} />
<NumberInput label="Size L" value={0} size="L" onChange={(v) => console.log(v)} />`;

  const stepperCode = `import { NumberInput } from '@/design-system/components/NumberInput';

// Stepper variant: up/down buttons stacked on right, text left-aligned
<NumberInput label="Stepper XS" value={0} size="XS" variant="Stepper" onChange={(v) => console.log(v)} />
<NumberInput label="Stepper S" value={0} size="S" variant="Stepper" onChange={(v) => console.log(v)} />
<NumberInput label="Stepper M" value={0} size="M" variant="Stepper" onChange={(v) => console.log(v)} />
<NumberInput label="Stepper L" value={0} size="L" variant="Stepper" onChange={(v) => console.log(v)} />`;

  const statesCode = `import { NumberInput } from '@/design-system/components/NumberInput';

<NumberInput label="Default" value={5} state="Default" onChange={(v) => console.log(v)} />
<NumberInput label="Error" value={0} state="Error" legend="Value must be greater than 0" showLegend onChange={(v) => console.log(v)} />
<NumberInput label="Valid" value={10} state="Valid" legend="Value accepted" showLegend onChange={(v) => console.log(v)} />
<NumberInput label="Disabled" value={3} disabled />
<NumberInput label="Read-only" value={42} readOnly />`;

  const optionsCode = `import { NumberInput } from '@/design-system/components/NumberInput';

// With min/max constraints
<NumberInput label="Quantity" value={5} min={0} max={99} onChange={(v) => setValue(v)} />

// With step
<NumberInput label="Temperature" value={20} step={5} min={-40} max={50} onChange={(v) => setValue(v)} />

// With optional text
<NumberInput label="Count" value={0} showOptional onChange={(v) => setValue(v)} />

// With legend
<NumberInput label="Items" value={1} legend="Max 10 items allowed" showLegend onChange={(v) => setValue(v)} />

// With info tooltip
<NumberInput label="Passengers" value={1} showInfo infoText="Including children" onChange={(v) => setValue(v)} />`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        NumberInput
      </h1>
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
              <div className="numberinput-examples">
              <NumberInput
                label="Size XS"
                value={0}
                size="XS"
                onChange={() => {}}
              />
              <NumberInput
                label="Size S"
                value={0}
                size="S"
                onChange={() => {}}
              />
              <NumberInput
                label="Size M"
                value={0}
                size="M"
                onChange={() => {}}
              />
              <NumberInput
                label="Size L"
                value={0}
                size="L"
                onChange={() => {}}
              />
              </div>
            </div>
          </section>

          {/* Stepper Variant */}
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
                Stepper Variant
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('stepper')}
              />
            </div>
            <div className="example-container">
              <div className="numberinput-examples">
                <NumberInput
                  label="Stepper XS"
                  value={0}
                  size="XS"
                  variant="Stepper"
                  onChange={() => {}}
                />
                <NumberInput
                  label="Stepper S"
                  value={0}
                  size="S"
                  variant="Stepper"
                  onChange={() => {}}
                />
                <NumberInput
                  label="Stepper M"
                  value={0}
                  size="M"
                  variant="Stepper"
                  onChange={() => {}}
                />
                <NumberInput
                  label="Stepper L"
                  value={0}
                  size="L"
                  variant="Stepper"
                  onChange={() => {}}
                />
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
              <div className="numberinput-examples">
              <NumberInput
                label="Default"
                value={5}
                state="Default"
                onChange={() => {}}
              />
              <NumberInput
                label="Error"
                value={0}
                state="Error"
                legend="Value must be greater than 0"
                showLegend
                onChange={() => {}}
              />
              <NumberInput
                label="Valid"
                value={10}
                state="Valid"
                legend="Value accepted"
                showLegend
                onChange={() => {}}
              />
              <NumberInput
                label="Disabled"
                value={3}
                disabled
              />
              <NumberInput
                label="Read-only"
                value={42}
                readOnly
              />
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
              <div className="numberinput-examples">
              <NumberInput
                label="With optional"
                value={0}
                showOptional
                onChange={() => {}}
              />
              <NumberInput
                label="With legend"
                value={1}
                legend="Max 10 items allowed"
                showLegend
                onChange={() => {}}
              />
              <NumberInput
                label="With info tooltip"
                value={1}
                showInfo
                infoText="Including children"
                onChange={() => {}}
              />
              <NumberInput
                label="With min/max"
                value={5}
                min={0}
                max={10}
                onChange={() => {}}
              />
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
              <div className="numberinput-examples">
              <NumberInput
                label="Quantity"
                value={quantity}
                min={0}
                max={99}
                onChange={setQuantity}
              />
              <NumberInput
                label="Temperature (step 5)"
                value={temperature}
                step={5}
                min={-40}
                max={50}
                onChange={setTemperature}
                legend={`Current: ${temperature}°C`}
                showLegend
              />
              <div
                style={{
                  padding: '16px',
                  background: 'var(--background-tertiary)',
                  borderRadius: '4px',
                  alignSelf: 'center',
                }}
              >
                <p className="label-regular-s" style={{ margin: 0 }}>
                  Quantity: <strong>{quantity}</strong>
                  <br />
                  Temperature: <strong>{temperature}°C</strong>
                </p>
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
                  <td>Stepper variant puts up/down buttons on the right side</td>
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
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Sizes Implementation"
        code={sizesCode}
      />
      <CodeModal
        isOpen={openModal === 'stepper'}
        onClose={() => setOpenModal(null)}
        title="Stepper Variant Implementation"
        code={stepperCode}
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
