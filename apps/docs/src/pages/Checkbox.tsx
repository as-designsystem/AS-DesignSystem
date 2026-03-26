import { useState } from 'react';
import { Checkbox, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/Checkbox.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Checkbox.css';

export default function CheckboxPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const [sizeS, setSizeS] = useState(false);
  const [sizeM, setSizeM] = useState(false);
  const [sizeL, setSizeL] = useState(false);

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  const sizesCode = `import { Checkbox } from '@/design-system/components/Checkbox';

<Checkbox label="Size S" size="S" />
<Checkbox label="Size M" size="M" />
<Checkbox label="Size L" size="L" />`;

  const statusCode = `import { Checkbox } from '@/design-system/components/Checkbox';

// Default (unchecked)
<Checkbox label="Default" status="Default" />

// Checked
<Checkbox label="Checked" status="Checked" />

// Indeterminate
<Checkbox label="Indeterminate" status="Indeterminate" />`;

  const statesCode = `import { Checkbox } from '@/design-system/components/Checkbox';

<Checkbox label="Default" state="Default" />
<Checkbox label="Disabled" state="Disabled" />
<Checkbox label="Disabled Checked" state="Disabled" status="Checked" />
<Checkbox label="Read-only" state="Read-only" status="Checked" />`;

  const controlledCode = `import { useState } from 'react';
import { Checkbox } from '@/design-system/components/Checkbox';

function MyComponent() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={checked}
      onCheckedChange={(value) => setChecked(value === true)}
    />
  );
}`;

  const withoutLabelCode = `import { Checkbox } from '@/design-system/components/Checkbox';

<Checkbox showLabel={false} size="S" />
<Checkbox showLabel={false} size="M" status="Checked" />
<Checkbox showLabel={false} size="L" status="Indeterminate" />`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        Checkbox
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Accessible checkbox component built on Radix UI with support for indeterminate state.
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
              <div className="checkbox-examples">
                <Checkbox
                  label="Size S"
                  size="S"
                  checked={sizeS}
                  onCheckedChange={(value) => setSizeS(value === true)}
                />
                <Checkbox
                  label="Size M"
                  size="M"
                  checked={sizeM}
                  onCheckedChange={(value) => setSizeM(value === true)}
                />
                <Checkbox
                  label="Size L"
                  size="L"
                  checked={sizeL}
                  onCheckedChange={(value) => setSizeL(value === true)}
                />
              </div>
            </div>
          </section>

          {/* Status */}
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
                Status
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('status')}
              />
            </div>
            <div className="example-container">
              <div className="checkbox-examples">
                <Checkbox label="Default (unchecked)" status="Default" />
                <Checkbox label="Checked" status="Checked" />
                <Checkbox label="Indeterminate" status="Indeterminate" />
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
              <div className="checkbox-examples">
                <Checkbox label="Default" state="Default" />
                <Checkbox label="Disabled" state="Disabled" />
                <Checkbox label="Disabled Checked" state="Disabled" status="Checked" />
                <Checkbox label="Read-only" state="Read-only" status="Checked" />
              </div>
            </div>
          </section>

          {/* Interactive Examples */}
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
                Interactive Examples
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
              <div className="checkbox-examples">
                <Checkbox
                  label="Accept terms and conditions"
                  checked={checked1}
                  onCheckedChange={(value) => setChecked1(value === true)}
                />
                <Checkbox
                  label="Subscribe to newsletter"
                  checked={checked2}
                  onCheckedChange={(value) => setChecked2(value === true)}
                />
                <Checkbox
                  label="Remember me"
                  checked={checked3}
                  onCheckedChange={(value) => setChecked3(value === true)}
                />
              </div>
            </div>
          </section>

          {/* Without Label */}
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
                Without Label
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('withoutLabel')}
              />
            </div>
            <div className="example-container">
              <div className="checkbox-examples">
                <Checkbox showLabel={false} size="S" />
                <Checkbox showLabel={false} size="M" status="Checked" />
                <Checkbox showLabel={false} size="L" status="Indeterminate" />
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
                  <td>Checkbox label text</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'S' | 'M' | 'L'</code></td>
                  <td><code>'M'</code></td>
                  <td>Checkbox size</td>
                </tr>
                <tr>
                  <td><code>state</code></td>
                  <td><code>'Default' | 'Hover' | 'Disabled' | 'Read-only'</code></td>
                  <td><code>'Default'</code></td>
                  <td>Checkbox state</td>
                </tr>
                <tr>
                  <td><code>status</code></td>
                  <td><code>'Default' | 'Checked' | 'Indeterminate'</code></td>
                  <td><code>'Default'</code></td>
                  <td>Checkbox checked status (uncontrolled)</td>
                </tr>
                <tr>
                  <td><code>showLabel</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show label next to checkbox</td>
                </tr>
                <tr>
                  <td><code>checked</code></td>
                  <td><code>boolean | 'indeterminate'</code></td>
                  <td><code>undefined</code></td>
                  <td>Controlled checked state</td>
                </tr>
                <tr>
                  <td><code>onCheckedChange</code></td>
                  <td><code>(checked: boolean | 'indeterminate') =&gt; void</code></td>
                  <td><code>undefined</code></td>
                  <td>Callback when checked state changes</td>
                </tr>
                <tr>
                  <td><code>name</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Name attribute for form submission</td>
                </tr>
                <tr>
                  <td><code>value</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Value attribute for form submission</td>
                </tr>
                <tr>
                  <td><code>required</code></td>
                  <td><code>boolean</code></td>
                  <td><code>undefined</code></td>
                  <td>Required attribute</td>
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
      <CodeModal isOpen={openModal === 'status'} onClose={() => setOpenModal(null)} title="Status" code={statusCode} />
      <CodeModal isOpen={openModal === 'states'} onClose={() => setOpenModal(null)} title="States" code={statesCode} />
      <CodeModal isOpen={openModal === 'controlled'} onClose={() => setOpenModal(null)} title="Controlled Checkbox" code={controlledCode} />
      <CodeModal isOpen={openModal === 'withoutLabel'} onClose={() => setOpenModal(null)} title="Without Label" code={withoutLabelCode} />
    </div>
  );
}
