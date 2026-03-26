import { useState } from 'react';
import { Calendar, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/Calendar.css';
import '@as-designsystem/core/TextInput.css';
import '@as-designsystem/core/IconButton.css';
import '@as-designsystem/core/Icon.css';
import '@as-designsystem/core/Tooltip.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Calendar.css';

export default function CalendarPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [monthValue, setMonthValue] = useState<Date | undefined>(undefined);
  const [dateWithMin, setDateWithMin] = useState<Date | undefined>(undefined);
  const [editableDate, setEditableDate] = useState<Date | undefined>(undefined);
  const [readOnlyDate, setReadOnlyDate] = useState<Date | undefined>(undefined);

  // Code examples
  const datePickerCode = `import { Calendar } from '@/design-system/composites/Calendar';
import '@/design-system/composites/Calendar.css';

const [date, setDate] = useState<Date>();

<Calendar
  label="Start date"
  mode="date"
  value={date}
  onChange={setDate}
/>`;

  const monthPickerCode = `import { Calendar } from '@/design-system/composites/Calendar';

const [month, setMonth] = useState<Date>();

<Calendar
  label="Period"
  mode="month"
  value={month}
  onChange={setMonth}
/>`;

  const minMaxCode = `import { Calendar } from '@/design-system/composites/Calendar';

const [date, setDate] = useState<Date>();

<Calendar
  label="Booking date"
  mode="date"
  value={date}
  onChange={setDate}
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2025, 11, 31)}
  defaultDate={new Date(2025, 0, 1)}
/>`;

  const statesCode = `<Calendar label="Default" mode="date" />
<Calendar label="Error" mode="date" state="Error" legend="Required" showLegend />
<Calendar label="Valid" mode="date" state="Valid" legend="Confirmed" showLegend />
<Calendar label="Disabled" mode="date" disabled />`;

  const sizesCode = `<Calendar label="XS" mode="date" size="XS" />
<Calendar label="S" mode="date" size="S" />
<Calendar label="M" mode="date" size="M" />
<Calendar label="L" mode="date" size="L" />`;

  const inputModeCode = `// Editable (default) — type dd/mm/yyyy or use the calendar icon
<Calendar
  label="Editable"
  mode="date"
  value={date}
  onChange={setDate}
/>

// Read-only — only the calendar icon opens the picker
<Calendar
  label="Read-only"
  mode="date"
  value={date}
  onChange={setDate}
  readOnly
/>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Calendar
        </h1>
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Date and month picker with TextInput trigger and calendar dropdown.
        Supports date selection (pick a day) and month selection (pick month + year).
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
          {/* Date Picker */}
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
                Date Picker
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('datePicker')}
              />
            </div>
            <p
              className="label-regular-m"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Select a specific date. Displays as dd/mm/yyyy.
            </p>
            <div className="example-container">
              <div className="calendar-examples">
                <Calendar
                  label="Start date"
                  mode="date"
                  value={dateValue}
                  onChange={setDateValue}
                  placeholder="Pick a date"
                />
              </div>
            </div>
          </section>

          {/* Input Mode */}
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
                Input Mode
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('inputMode')}
              />
            </div>
            <p
              className="label-regular-m"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              By default, the input is editable: type a date manually (dd/mm/yyyy) or use the calendar icon.
              Set readOnly to restrict to calendar-only selection.
            </p>
            <div className="example-container">
              <div className="calendar-examples">
                <Calendar
                  label="Editable"
                  mode="date"
                  value={editableDate}
                  onChange={setEditableDate}
                  placeholder="Type or pick"
                />
                <Calendar
                  label="Read-only"
                  mode="date"
                  value={readOnlyDate}
                  onChange={setReadOnlyDate}
                  readOnly
                  placeholder="Pick only"
                />
              </div>
            </div>
          </section>

          {/* Month Picker */}
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
                Month Picker
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('monthPicker')}
              />
            </div>
            <p
              className="label-regular-m"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Select a month and year. Displays as mm/yyyy.
            </p>
            <div className="example-container">
              <div className="calendar-examples">
                <Calendar
                  label="Period"
                  mode="month"
                  value={monthValue}
                  onChange={setMonthValue}
                  placeholder="Pick a month"
                />
              </div>
            </div>
          </section>

          {/* Min/Max */}
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
                With Min/Max Date
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('minMax')}
              />
            </div>
            <p
              className="label-regular-m"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Restrict selectable dates to a range (2024-2025).
            </p>
            <div className="example-container">
              <div className="calendar-examples">
                <Calendar
                  label="Booking date"
                  mode="date"
                  value={dateWithMin}
                  onChange={setDateWithMin}
                  minDate={new Date(2024, 0, 1)}
                  maxDate={new Date(2025, 11, 31)}
                  defaultDate={new Date(2025, 0, 1)}
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
              <div className="calendar-examples">
                <Calendar label="Default" mode="date" />
                <Calendar label="Error" mode="date" state="Error" legend="Required field" showLegend />
                <Calendar label="Valid" mode="date" state="Valid" legend="Date confirmed" showLegend />
                <Calendar label="Disabled" mode="date" disabled />
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
              <div className="calendar-examples">
                <Calendar label="XS" mode="date" size="XS" />
                <Calendar label="S" mode="date" size="S" />
                <Calendar label="M" mode="date" size="M" />
                <Calendar label="L" mode="date" size="L" />
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
                  <td><code>mode</code></td>
                  <td><code>'date' | 'month'</code></td>
                  <td><code>'date'</code></td>
                  <td>Picker mode: date for day selection, month for month+year</td>
                </tr>
                <tr>
                  <td><code>value</code></td>
                  <td><code>Date</code></td>
                  <td><code>undefined</code></td>
                  <td>Selected date value</td>
                </tr>
                <tr>
                  <td><code>onChange</code></td>
                  <td><code>(date: Date) =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback when the value changes</td>
                </tr>
                <tr>
                  <td><code>minDate</code></td>
                  <td><code>Date</code></td>
                  <td><code>undefined</code></td>
                  <td>Minimum selectable date</td>
                </tr>
                <tr>
                  <td><code>maxDate</code></td>
                  <td><code>Date</code></td>
                  <td><code>undefined</code></td>
                  <td>Maximum selectable date</td>
                </tr>
                <tr>
                  <td><code>defaultDate</code></td>
                  <td><code>Date</code></td>
                  <td><code>undefined</code></td>
                  <td>Default date to display when the calendar opens with no value selected. Defaults to today.</td>
                </tr>
                <tr>
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td><code>'Label'</code></td>
                  <td>Label of the input</td>
                </tr>
                <tr>
                  <td><code>legend</code></td>
                  <td><code>string</code></td>
                  <td><code>'Legend'</code></td>
                  <td>Helper text below the input</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'XS' | 'S' | 'M' | 'L'</code></td>
                  <td><code>'M'</code></td>
                  <td>Size of the input</td>
                </tr>
                <tr>
                  <td><code>state</code></td>
                  <td><code>'Default' | 'Error' | 'Valid'</code></td>
                  <td><code>'Default'</code></td>
                  <td>Validation state</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether the input is disabled</td>
                </tr>
                <tr>
                  <td><code>readOnly</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>When true, the user can only pick via the calendar icon (no manual typing)</td>
                </tr>
                <tr>
                  <td><code>placeholder</code></td>
                  <td><code>string</code></td>
                  <td><code>'dd/mm/yyyy'</code></td>
                  <td>Placeholder text</td>
                </tr>
                <tr>
                  <td><code>showLabel</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show the label</td>
                </tr>
                <tr>
                  <td><code>showLegend</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show the legend</td>
                </tr>
                <tr>
                  <td><code>showOptional</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show "(Optional)" after label</td>
                </tr>
                <tr>
                  <td><code>showInfo</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show the info icon</td>
                </tr>
                <tr>
                  <td><code>open</code></td>
                  <td><code>boolean</code></td>
                  <td><code>undefined</code></td>
                  <td>Controlled open state</td>
                </tr>
                <tr>
                  <td><code>onOpenChange</code></td>
                  <td><code>(open: boolean) =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback when open state changes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'inputMode'}
        onClose={() => setOpenModal(null)}
        title="Input Mode"
        code={inputModeCode}
      />
      <CodeModal
        isOpen={openModal === 'datePicker'}
        onClose={() => setOpenModal(null)}
        title="Date Picker"
        code={datePickerCode}
      />
      <CodeModal
        isOpen={openModal === 'monthPicker'}
        onClose={() => setOpenModal(null)}
        title="Month Picker"
        code={monthPickerCode}
      />
      <CodeModal
        isOpen={openModal === 'minMax'}
        onClose={() => setOpenModal(null)}
        title="With Min/Max Date"
        code={minMaxCode}
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
