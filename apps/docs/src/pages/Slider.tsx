import { useState } from 'react';
import { Slider, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/Slider.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './Slider.css';

export default function SliderPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const [sizeM, setSizeM] = useState(60);
  const [sizeS, setSizeS] = useState(40);
  const [volume, setVolume] = useState(50);
  const [stepsValue, setStepsValue] = useState(50);

  const sizesCode = `import { Slider } from '@/design-system/components/Slider';

<Slider label="Size M" showLabel size="M" defaultValue={60} />
<Slider label="Size S" showLabel size="S" defaultValue={40} />`;

  const labelCode = `import { Slider } from '@/design-system/components/Slider';

// With label
<Slider label="Volume" showLabel defaultValue={50} />

// Without label
<Slider defaultValue={50} />`;

  const stepsCode = `import { Slider } from '@/design-system/components/Slider';

// Derive marks from min / max / step
<Slider min={0} max={100} step={25} steps defaultValue={50} />

// Or pass an explicit number of marks
<Slider steps={5} defaultValue={50} />`;

  const statesCode = `import { Slider } from '@/design-system/components/Slider';

<Slider label="Default" showLabel defaultValue={50} />
<Slider label="Disabled" showLabel disabled defaultValue={50} />`;

  const controlledCode = `import { useState } from 'react';
import { Slider } from '@/design-system/components/Slider';

function MyComponent() {
  const [value, setValue] = useState(50);

  return (
    <Slider
      label="Volume"
      showLabel
      value={value}
      onValueChange={setValue}
    />
  );
}`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Slider
        </h1>
        <InstallCommand componentName="slider" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Accessible range slider built on Radix UI Slider with keyboard navigation, sizes and step marks.
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
              <div className="slider-examples">
                <Slider label="Size M" showLabel size="M" value={sizeM} onValueChange={setSizeM} />
                <Slider label="Size S" showLabel size="S" value={sizeS} onValueChange={setSizeS} />
              </div>
            </div>
          </section>

          {/* Label */}
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
                Label
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('label')}
              />
            </div>
            <div className="example-container">
              <div className="slider-examples">
                <Slider label="Volume" showLabel defaultValue={50} />
                <Slider defaultValue={50} />
              </div>
            </div>
          </section>

          {/* Steps */}
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
                Step Marks
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('steps')}
              />
            </div>
            <div className="example-container">
              <div className="slider-examples">
                <Slider
                  label="With steps"
                  showLabel
                  min={0}
                  max={100}
                  step={25}
                  steps
                  value={stepsValue}
                  onValueChange={setStepsValue}
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
              <div className="slider-examples">
                <Slider label="Default" showLabel defaultValue={50} />
                <Slider label="Disabled" showLabel disabled defaultValue={50} />
              </div>
            </div>
          </section>

          {/* Interactive */}
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
                Interactive Example
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('controlled')}
              />
            </div>
            <div className="example-container">
              <div className="slider-examples">
                <Slider label="Volume" showLabel value={volume} onValueChange={setVolume} />
                <span className="label-regular-s slider-value">Value: {volume}</span>
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
                  <td><code>value</code></td>
                  <td><code>number</code></td>
                  <td><code>undefined</code></td>
                  <td>Controlled value</td>
                </tr>
                <tr>
                  <td><code>defaultValue</code></td>
                  <td><code>number</code></td>
                  <td><code>0</code></td>
                  <td>Initial value when uncontrolled</td>
                </tr>
                <tr>
                  <td><code>onValueChange</code></td>
                  <td><code>(value: number) =&gt; void</code></td>
                  <td><code>undefined</code></td>
                  <td>Fired as the value changes while dragging</td>
                </tr>
                <tr>
                  <td><code>onValueCommit</code></td>
                  <td><code>(value: number) =&gt; void</code></td>
                  <td><code>undefined</code></td>
                  <td>Fired when the user finishes setting a value</td>
                </tr>
                <tr>
                  <td><code>min</code></td>
                  <td><code>number</code></td>
                  <td><code>0</code></td>
                  <td>Minimum value</td>
                </tr>
                <tr>
                  <td><code>max</code></td>
                  <td><code>number</code></td>
                  <td><code>100</code></td>
                  <td>Maximum value</td>
                </tr>
                <tr>
                  <td><code>step</code></td>
                  <td><code>number</code></td>
                  <td><code>1</code></td>
                  <td>Step increment</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'S' | 'M'</code></td>
                  <td><code>'M'</code></td>
                  <td>Slider size</td>
                </tr>
                <tr>
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Label text shown above the slider</td>
                </tr>
                <tr>
                  <td><code>showLabel</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show the label above the slider</td>
                </tr>
                <tr>
                  <td><code>steps</code></td>
                  <td><code>boolean | number</code></td>
                  <td><code>false</code></td>
                  <td>Show step marks (derive from step, or a fixed count)</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Disabled state</td>
                </tr>
                <tr>
                  <td><code>name</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Name attribute for form submission</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Additional CSS class</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      <CodeModal isOpen={openModal === 'sizes'} onClose={() => setOpenModal(null)} title="Sizes" code={sizesCode} />
      <CodeModal isOpen={openModal === 'label'} onClose={() => setOpenModal(null)} title="Label" code={labelCode} />
      <CodeModal isOpen={openModal === 'steps'} onClose={() => setOpenModal(null)} title="Step Marks" code={stepsCode} />
      <CodeModal isOpen={openModal === 'states'} onClose={() => setOpenModal(null)} title="States" code={statesCode} />
      <CodeModal isOpen={openModal === 'controlled'} onClose={() => setOpenModal(null)} title="Controlled Slider" code={controlledCode} />
    </div>
  );
}
