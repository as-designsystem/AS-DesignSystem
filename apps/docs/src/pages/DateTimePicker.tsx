import { useState } from 'react';
import { DateTimePicker, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/DateTimePicker.css';
import '@as-designsystem/core/Calendar.css';
import '@as-designsystem/core/TimePicker.css';
import '@as-designsystem/core/TextInput.css';
import '@as-designsystem/core/Icon.css';
import '@as-designsystem/core/IconButton.css';
import '@as-designsystem/core/Tooltip.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './DateTimePicker.css';

export default function DateTimePickerPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const [basic, setBasic] = useState<Date | undefined>(undefined);
  const [stepValue, setStepValue] = useState<Date | undefined>(new Date(2026, 5, 3, 12, 20));
  const [stateValue, setStateValue] = useState<Date | undefined>(undefined);

  const basicCode = `import { DateTimePicker } from '@/design-system/composites/DateTimePicker';
import '@/design-system/composites/DateTimePicker.css';

const [when, setWhen] = useState<Date>();

<DateTimePicker
  label="Departure"
  value={when}
  onChange={setWhen}
/>`;

  const stepCode = `import { DateTimePicker } from '@/design-system/composites/DateTimePicker';

const [when, setWhen] = useState<Date>(new Date(2026, 5, 3, 12, 20));

// 5-minute increments in the minute column
<DateTimePicker
  label="Slot"
  value={when}
  onChange={setWhen}
  minuteStep={5}
/>`;

  const statesCode = `<DateTimePicker label="Default" />
<DateTimePicker label="Error" state="Error" legend="Required field" showLegend />
<DateTimePicker label="Valid" state="Valid" legend="Confirmed" showLegend />
<DateTimePicker label="Disabled" state="Disabled" />
<DateTimePicker label="Read-only" state="Read-only" value={new Date(2026, 5, 3, 14, 30)} />`;

  const sizesCode = `<DateTimePicker label="XS" size="XS" />
<DateTimePicker label="S" size="S" />
<DateTimePicker label="M" size="M" />
<DateTimePicker label="L" size="L" />`;

  const optionsCode = `import { DateTimePicker } from '@as-designsystem/core';

<DateTimePicker label="Optional" showOptional />
<DateTimePicker label="With legend" legend="Max range 30 days" showLegend />
<DateTimePicker label="With info" showInfo infoText="Tooltip text" />
<DateTimePicker label="With actions" actions={[{ icon: 'tune', tooltip: 'Settings' }]} />
<DateTimePicker label="All combined" showOptional legend="Helper" showLegend showInfo infoText="Tooltip" actions={[{ icon: 'tune', tooltip: 'Settings' }, { icon: 'edit', tooltip: 'Edit' }]} />`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          DateTimePicker
        </h1>
        <InstallCommand componentName="date-time-picker" />
      </div>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        Unified date + time picker. A single field opens one popover combining a calendar grid and scrollable hour/minute columns.
        Pick a day and a time, then confirm with OK (clicking outside also commits, Cancel/Esc discards). Formats as <code>DD/MM/YYYY, HH:MM</code>.
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
                <div style={{ width: '280px' }}>
                  <DateTimePicker
                    label="Departure"
                    value={basic}
                    onChange={setBasic}
                  />
                </div>
                <div style={{ width: '280px' }}>
                  <DateTimePicker
                    label="Departure"
                    value={basic}
                    onChange={setBasic}
                    labelPosition="left"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Minute step */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Minute step
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
              <div className="date-time-picker-examples">
                <DateTimePicker
                  label="5-min steps"
                  value={stepValue}
                  onChange={setStepValue}
                  minuteStep={5}
                />
                <DateTimePicker
                  label="15-min steps"
                  value={stepValue}
                  onChange={setStepValue}
                  minuteStep={15}
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
                <DateTimePicker label="Default" value={stateValue} onChange={setStateValue} />
                <DateTimePicker label="Default" value={stateValue} onChange={setStateValue} labelPosition="left" />
                <DateTimePicker label="Error" state="Error" legend="Required field" showLegend />
                <DateTimePicker label="Error" state="Error" legend="Required field" showLegend labelPosition="left" />
                <DateTimePicker label="Valid" state="Valid" value={new Date(2026, 5, 3, 14, 30)} legend="Confirmed" showLegend />
                <DateTimePicker label="Valid" state="Valid" value={new Date(2026, 5, 3, 14, 30)} legend="Confirmed" showLegend labelPosition="left" />
                <DateTimePicker label="Disabled" state="Disabled" value={new Date(2026, 5, 3, 8, 0)} />
                <DateTimePicker label="Disabled" state="Disabled" value={new Date(2026, 5, 3, 8, 0)} labelPosition="left" />
                <DateTimePicker label="Read-only" state="Read-only" value={new Date(2026, 5, 3, 14, 30)} />
                <DateTimePicker label="Read-only" state="Read-only" value={new Date(2026, 5, 3, 14, 30)} labelPosition="left" />
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
              <div className="date-time-picker-examples">
                <DateTimePicker label="XS" size="XS" />
                <DateTimePicker label="S" size="S" />
                <DateTimePicker label="M" size="M" />
                <DateTimePicker label="L" size="L" />
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
                <DateTimePicker label="Optional" showOptional />
                <DateTimePicker label="Optional" showOptional labelPosition="left" />
                <DateTimePicker label="With legend" legend="Max range 30 days" showLegend />
                <DateTimePicker label="With legend" legend="Max range 30 days" showLegend labelPosition="left" />
                <DateTimePicker label="With info" showInfo infoText="Tooltip text" />
                <DateTimePicker label="With info" showInfo infoText="Tooltip text" labelPosition="left" />
                <DateTimePicker label="With actions" actions={[{ icon: 'tune', tooltip: 'Settings' }]} />
                <DateTimePicker label="With actions" actions={[{ icon: 'tune', tooltip: 'Settings' }]} labelPosition="left" />
                <DateTimePicker label="All combined" showOptional legend="Helper" showLegend showInfo infoText="Tooltip text" actions={[{ icon: 'tune', tooltip: 'Settings' }, { icon: 'edit', tooltip: 'Edit' }]} />
                <DateTimePicker label="All combined" showOptional legend="Helper" showLegend showInfo infoText="Tooltip text" actions={[{ icon: 'tune', tooltip: 'Settings' }, { icon: 'edit', tooltip: 'Edit' }]} labelPosition="left" />
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
                  <td><code>Date</code></td>
                  <td><code>—</code></td>
                  <td>Selected date and time</td>
                </tr>
                <tr>
                  <td><code>onChange</code></td>
                  <td><code>(value: Date) =&gt; void</code></td>
                  <td><code>—</code></td>
                  <td>Called when the selection is committed (OK or click outside)</td>
                </tr>
                <tr>
                  <td><code>minuteStep</code></td>
                  <td><code>number</code></td>
                  <td><code>1</code></td>
                  <td>Minute increment for the time column</td>
                </tr>
                <tr>
                  <td><code>minDate</code></td>
                  <td><code>Date</code></td>
                  <td><code>—</code></td>
                  <td>Earliest selectable day</td>
                </tr>
                <tr>
                  <td><code>maxDate</code></td>
                  <td><code>Date</code></td>
                  <td><code>—</code></td>
                  <td>Latest selectable day</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>"XS" | "S" | "M" | "L"</code></td>
                  <td><code>"M"</code></td>
                  <td>Size of the field</td>
                </tr>
                <tr>
                  <td><code>state</code></td>
                  <td><code>"Default" | "Error" | "Valid" | "Disabled" | "Read-only"</code></td>
                  <td><code>"Default"</code></td>
                  <td>Validation / interaction state</td>
                </tr>
                <tr>
                  <td><code>placeholder</code></td>
                  <td><code>string</code></td>
                  <td><code>"dd/mm/yyyy, --:--"</code></td>
                  <td>Placeholder when no value is set</td>
                </tr>
                <tr>
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td><code>"Label"</code></td>
                  <td>Label text above the field</td>
                </tr>
                <tr>
                  <td><code>legend</code></td>
                  <td><code>string</code></td>
                  <td><code>"Legend"</code></td>
                  <td>Helper text below the field</td>
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
                  <td><code>actions</code></td>
                  <td><code>FieldAction[]</code></td>
                  <td><code>—</code></td>
                  <td>Ghost icon buttons on the right of the label row</td>
                </tr>
                <tr>
                  <td><code>labelPosition</code></td>
                  <td><code>"top" | "left"</code></td>
                  <td><code>"top"</code></td>
                  <td>Label position relative to the field</td>
                </tr>
                <tr>
                  <td><code>onOpenChange</code></td>
                  <td><code>(open: boolean) =&gt; void</code></td>
                  <td><code>—</code></td>
                  <td>Called when the popover opens or closes</td>
                </tr>
                <tr>
                  <td><code>popupContainer</code></td>
                  <td><code>HTMLElement | null</code></td>
                  <td><code>—</code></td>
                  <td>Custom portal container for the popover</td>
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
        isOpen={openModal === 'step'}
        onClose={() => setOpenModal(null)}
        title="Minute step"
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
      <CodeModal
        isOpen={openModal === 'options'}
        onClose={() => setOpenModal(null)}
        title="Other Options"
        code={optionsCode}
      />
    </div>
  );
}
