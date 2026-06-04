import { useState } from 'react';
import { TimePicker, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/TimePicker.css';
import '@as-designsystem/core/TextInput.css';
import '@as-designsystem/core/Icon.css';
import '@as-designsystem/core/Tooltip.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './TimePicker.css';

export default function TimePickerPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const [basicTime, setBasicTime] = useState<string>('');
  const [stepTime, setStepTime] = useState<string>('09:00');
  const [stateTime, setStateTime] = useState<string>('');

  const basicCode = `import { TimePicker } from '@/design-system/composites/TimePicker';
import '@/design-system/composites/TimePicker.css';

const [time, setTime] = useState('');

<TimePicker
  label="Start time"
  value={time}
  onChange={setTime}
/>`;

  const optionsCode = `import { TimePicker } from '@as-designsystem/core';

<TimePicker label="Optional" showOptional />
<TimePicker label="With legend" legend="Max 10 items" showLegend />
<TimePicker label="With info" showInfo infoText="Tooltip text" />
<TimePicker label="With actions" actions={[{ icon: 'tune', tooltip: 'Suggestion settings' }]} />
<TimePicker label="All combined" showOptional legend="Max 10 items" showLegend showInfo infoText="Tooltip text" actions={[{ icon: 'tune', tooltip: 'Suggestion settings' }, { icon: 'edit', tooltip: 'Edit' }, { icon: 'swap_horiz', tooltip: 'Swap' }]} />`;

  const stepCode = `import { TimePicker } from '@/design-system/composites/TimePicker';

const [time, setTime] = useState('09:00');

// 15-minute intervals
<TimePicker
  label="Meeting time"
  value={time}
  onChange={setTime}
  step={15}
/>

// 30-minute intervals
<TimePicker
  label="Slot duration"
  value={time}
  onChange={setTime}
  step={30}
/>`;

  const statesCode = `<TimePicker label="Default" />
<TimePicker label="Error" state="Error" legend="Required field" showLegend />
<TimePicker label="Valid" state="Valid" legend="Time confirmed" showLegend />
<TimePicker label="Disabled" disabled />
<TimePicker label="Read-only" readOnly value="14:30" />`;

  const sizesCode = `<TimePicker label="XS" size="XS" />
<TimePicker label="S" size="S" />
<TimePicker label="M" size="M" />
<TimePicker label="L" size="L" />`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          TimePicker
        </h1>
        <InstallCommand componentName="time-picker" />
      </div>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        Time picker with a text input trigger and a scrollable hour/minute dropdown. Supports direct typing in HH:MM format and minute step intervals.
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

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <>
          {/* Basic usage */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
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
                <div style={{ width: '250px' }}>
                  <TimePicker
                    label="Start time"
                    value={basicTime}
                    onChange={setBasicTime}
                  />
                </div>
                <div style={{ width: '250px' }}>
                  <TimePicker
                    label="End time"
                    value={basicTime}
                    onChange={setBasicTime}
                    placeholder="--:--"
                  />
                </div>
                <div style={{ width: '250px' }}>
                  <TimePicker
                    label="Start time"
                    value={basicTime}
                    onChange={setBasicTime}
                    labelPosition="left"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Step intervals */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Step intervals
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('step')}
              />
            </div>
            <div className="example-container">
              <div className="time-picker-examples">
                <TimePicker
                  label="15-min steps"
                  value={stepTime}
                  onChange={setStepTime}
                  step={15}
                />
                <TimePicker
                  label="30-min steps"
                  value={stepTime}
                  onChange={setStepTime}
                  step={30}
                />
              </div>
            </div>
          </section>

          {/* States */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', columnGap: '48px', rowGap: '28px', alignItems: 'start' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary, #63728a)' }}>Vertical</span>
                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary, #63728a)' }}>Horizontal</span>
                <TimePicker label="Default" value={stateTime} onChange={setStateTime} />
                <TimePicker label="Default" value={stateTime} onChange={setStateTime} labelPosition="left" />
                <TimePicker label="Error" state="Error" legend="Required field" showLegend />
                <TimePicker label="Error" state="Error" legend="Required field" showLegend labelPosition="left" />
                <TimePicker label="Valid" state="Valid" value="14:30" legend="Time confirmed" showLegend />
                <TimePicker label="Valid" state="Valid" value="14:30" legend="Time confirmed" showLegend labelPosition="left" />
                <TimePicker label="Disabled" disabled value="08:00" />
                <TimePicker label="Disabled" disabled value="08:00" labelPosition="left" />
                <TimePicker label="Read-only" readOnly value="14:30" />
                <TimePicker label="Read-only" readOnly value="14:30" labelPosition="left" />
              </div>
            </div>
          </section>

          {/* Sizes */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
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
              <div className="time-picker-examples">
                <TimePicker label="XS" size="XS" />
                <TimePicker label="S" size="S" />
                <TimePicker label="M" size="M" />
                <TimePicker label="L" size="L" />
              </div>
            </div>
          </section>

          {/* Other Options */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', columnGap: '48px', rowGap: '28px', alignItems: 'start' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary, #63728a)' }}>Vertical</span>
                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary, #63728a)' }}>Horizontal</span>
                <TimePicker label="Optional" showOptional />
                <TimePicker label="Optional" showOptional labelPosition="left" />
                <TimePicker label="With legend" legend="Max 10 items" showLegend />
                <TimePicker label="With legend" legend="Max 10 items" showLegend labelPosition="left" />
                <TimePicker label="With info" showInfo infoText="Tooltip text" />
                <TimePicker label="With info" showInfo infoText="Tooltip text" labelPosition="left" />
                <TimePicker label="With actions" actions={[{ icon: 'tune', tooltip: 'Suggestion settings' }]} />
                <TimePicker label="With actions" actions={[{ icon: 'tune', tooltip: 'Suggestion settings' }]} labelPosition="left" />
                <TimePicker label="All combined" showOptional legend="Max 10 items" showLegend showInfo infoText="Tooltip text" actions={[{ icon: 'tune', tooltip: 'Suggestion settings' }, { icon: 'edit', tooltip: 'Edit' }, { icon: 'swap_horiz', tooltip: 'Swap' }]} />
                <TimePicker label="All combined" showOptional legend="Max 10 items" showLegend showInfo infoText="Tooltip text" actions={[{ icon: 'tune', tooltip: 'Suggestion settings' }, { icon: 'edit', tooltip: 'Edit' }, { icon: 'swap_horiz', tooltip: 'Swap' }]} labelPosition="left" />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
        <section className="component-section">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
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
                  <td><code>string</code></td>
                  <td><code>—</code></td>
                  <td>Selected time in "HH:MM" format (24h)</td>
                </tr>
                <tr>
                  <td><code>onChange</code></td>
                  <td><code>(value: string) =&gt; void</code></td>
                  <td><code>—</code></td>
                  <td>Callback when the value changes</td>
                </tr>
                <tr>
                  <td><code>step</code></td>
                  <td><code>number</code></td>
                  <td><code>1</code></td>
                  <td>Minute increment (e.g. 15 for quarter-hour steps)</td>
                </tr>
                <tr>
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td><code>"Label"</code></td>
                  <td>Label text above the input</td>
                </tr>
                <tr>
                  <td><code>legend</code></td>
                  <td><code>string</code></td>
                  <td><code>"Legend"</code></td>
                  <td>Helper text below the input</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>"XS" | "S" | "M" | "L"</code></td>
                  <td><code>"M"</code></td>
                  <td>Size of the input</td>
                </tr>
                <tr>
                  <td><code>state</code></td>
                  <td><code>"Default" | "Error" | "Valid"</code></td>
                  <td><code>"Default"</code></td>
                  <td>Validation state</td>
                </tr>
                <tr>
                  <td><code>placeholder</code></td>
                  <td><code>string</code></td>
                  <td><code>"--:--"</code></td>
                  <td>Input placeholder text</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Disables the picker</td>
                </tr>
                <tr>
                  <td><code>readOnly</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Makes the input read-only, prevents all interaction</td>
                </tr>
                <tr>
                  <td><code>showLabel</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show/hide the label</td>
                </tr>
                <tr>
                  <td><code>actions</code></td>
                  <td><code>FieldAction[]</code></td>
                  <td><code>—</code></td>
                  <td>Ghost icon buttons aligned to the right edge of the label row</td>
                </tr>
                <tr>
                  <td><code>showLegend</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show/hide the legend</td>
                </tr>
                <tr>
                  <td><code>showOptional</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show "(Optional)" after the label</td>
                </tr>
                <tr>
                  <td><code>showInfo</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show info icon with tooltip</td>
                </tr>
                <tr>
                  <td><code>infoText</code></td>
                  <td><code>string</code></td>
                  <td><code>""</code></td>
                  <td>Tooltip text for the info icon</td>
                </tr>
                <tr>
                  <td><code>open</code></td>
                  <td><code>boolean</code></td>
                  <td><code>—</code></td>
                  <td>Controlled open state for the popover</td>
                </tr>
                <tr>
                  <td><code>onOpenChange</code></td>
                  <td><code>(open: boolean) =&gt; void</code></td>
                  <td><code>—</code></td>
                  <td>Callback when popover open state changes</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>""</code></td>
                  <td>Additional CSS class on the container</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Basic usage"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'options'}
        onClose={() => setOpenModal(null)}
        title="Other Options"
        code={optionsCode}
      />
      <CodeModal
        isOpen={openModal === 'step'}
        onClose={() => setOpenModal(null)}
        title="Step intervals"
        code={stepCode}
      />
      <CodeModal
        isOpen={openModal === 'states'}
        onClose={() => setOpenModal(null)}
        title="States"
        code={statesCode}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Sizes"
        code={sizesCode}
      />
    </div>
  );
}
