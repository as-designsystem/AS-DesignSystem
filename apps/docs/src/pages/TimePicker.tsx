import { useState } from 'react';
import { TimePicker, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/TimePicker.css';
import '@as-design-system/core/TextInput.css';
import '@as-design-system/core/Icon.css';
import '@as-design-system/core/Tooltip.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
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

  const propsData = [
    { name: 'value', type: 'string', default: '—', description: 'Selected time in "HH:MM" format (24h)' },
    { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Callback when the value changes' },
    { name: 'step', type: 'number', default: '1', description: 'Minute increment (e.g. 15 for quarter-hour steps)' },
    { name: 'label', type: 'string', default: '"Label"', description: 'Label text above the input' },
    { name: 'legend', type: 'string', default: '"Legend"', description: 'Helper text below the input' },
    { name: 'size', type: '"XS" | "S" | "M" | "L"', default: '"M"', description: 'Size of the input' },
    { name: 'state', type: '"Default" | "Error" | "Valid"', default: '"Default"', description: 'Validation state' },
    { name: 'placeholder', type: 'string', default: '"--:--"', description: 'Input placeholder text' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker' },
    { name: 'readOnly', type: 'boolean', default: 'false', description: 'Makes the input read-only, prevents all interaction' },
    { name: 'showLabel', type: 'boolean', default: 'true', description: 'Show/hide the label' },
    { name: 'showLegend', type: 'boolean', default: 'false', description: 'Show/hide the legend' },
    { name: 'showOptional', type: 'boolean', default: 'false', description: 'Show "(Optional)" after the label' },
    { name: 'showInfo', type: 'boolean', default: 'false', description: 'Show info icon with tooltip' },
    { name: 'infoText', type: 'string', default: '""', description: 'Tooltip text for the info icon' },
    { name: 'open', type: 'boolean', default: '—', description: 'Controlled open state for the popover' },
    { name: 'onOpenChange', type: '(open: boolean) => void', default: '—', description: 'Callback when popover open state changes' },
    { name: 'className', type: 'string', default: '""', description: 'Additional CSS class on the container' },
  ];

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        TimePicker
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Time picker with a text input trigger and a scrollable hour/minute dropdown. Supports direct typing in HH:MM format and minute step intervals.
      </p>

      <Tab
        label="Examples"
        size="M"
        status="Active"
        state={activeTab === 'examples' ? 'Selected' : 'Default'}
        onClick={() => setActiveTab('examples')}
        style={{ marginRight: '8px' }}
      />
      <Tab
        label="Props"
        size="M"
        status="Active"
        state={activeTab === 'props' ? 'Selected' : 'Default'}
        onClick={() => setActiveTab('props')}
      />

      {activeTab === 'examples' && (
        <div className="time-picker-showcase">

          {/* Basic usage */}
          <div className="component-section">
            <div className="component-section-header">
              <h2 className="heading-6" style={{ color: 'var(--text-main, #14171d)' }}>Basic</h2>
              <Button
                label="View code"
                size="S"
                variant="Ghost"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="time-picker-examples">
              <TimePicker
                label="Start time"
                value={basicTime}
                onChange={setBasicTime}
              />
              <TimePicker
                label="End time"
                value={basicTime}
                onChange={setBasicTime}
                placeholder="--:--"
              />
            </div>
          </div>

          {/* Step intervals */}
          <div className="component-section">
            <div className="component-section-header">
              <h2 className="heading-6" style={{ color: 'var(--text-main, #14171d)' }}>Step intervals</h2>
              <Button
                label="View code"
                size="S"
                variant="Ghost"
                onClick={() => setOpenModal('step')}
              />
            </div>
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

          {/* States */}
          <div className="component-section">
            <div className="component-section-header">
              <h2 className="heading-6" style={{ color: 'var(--text-main, #14171d)' }}>States</h2>
              <Button
                label="View code"
                size="S"
                variant="Ghost"
                onClick={() => setOpenModal('states')}
              />
            </div>
            <div className="time-picker-examples">
              <TimePicker label="Default" value={stateTime} onChange={setStateTime} />
              <TimePicker label="Error" state="Error" legend="Required field" showLegend />
              <TimePicker label="Valid" state="Valid" value="14:30" legend="Time confirmed" showLegend />
              <TimePicker label="Disabled" disabled value="08:00" />
              <TimePicker label="Read-only" readOnly value="14:30" />
            </div>
          </div>

          {/* Sizes */}
          <div className="component-section">
            <div className="component-section-header">
              <h2 className="heading-6" style={{ color: 'var(--text-main, #14171d)' }}>Sizes</h2>
              <Button
                label="View code"
                size="S"
                variant="Ghost"
                onClick={() => setOpenModal('sizes')}
              />
            </div>
            <div className="time-picker-examples">
              <TimePicker label="XS" size="XS" />
              <TimePicker label="S" size="S" />
              <TimePicker label="M" size="M" />
              <TimePicker label="L" size="L" />
            </div>
          </div>

        </div>
      )}

      {activeTab === 'props' && (
        <div className="props-table-wrapper" style={{ marginTop: '24px' }}>
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {propsData.map((prop) => (
                <tr key={prop.name}>
                  <td><code>{prop.name}</code></td>
                  <td><code>{prop.type}</code></td>
                  <td><code>{prop.default}</code></td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Basic usage"
        sections={[{ code: basicCode, language: 'tsx' }]}
      />
      <CodeModal
        isOpen={openModal === 'step'}
        onClose={() => setOpenModal(null)}
        title="Step intervals"
        sections={[{ code: stepCode, language: 'tsx' }]}
      />
      <CodeModal
        isOpen={openModal === 'states'}
        onClose={() => setOpenModal(null)}
        title="States"
        sections={[{ code: statesCode, language: 'tsx' }]}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Sizes"
        sections={[{ code: sizesCode, language: 'tsx' }]}
      />
    </div>
  );
}
