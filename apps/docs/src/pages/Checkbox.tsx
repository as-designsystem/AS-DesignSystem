import { useState } from 'react';
import { Checkbox, VCheckbox, Tab, Button, ButtonGroup } from '@as-design-system/core';
import '@as-design-system/core/Checkbox.css';
import '@as-design-system/core/VCheckbox.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/ButtonGroup.css';
import CodeModal from '../components/CodeModal';
import './Checkbox.css';

export default function CheckboxPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [componentType, setComponentType] = useState<'checkbox' | 'vcheckbox'>(
    'checkbox'
  );

  // State for sizes examples
  const [sizeS, setSizeS] = useState(false);
  const [sizeM, setSizeM] = useState(false);
  const [sizeL, setSizeL] = useState(false);

  // State for interactive examples
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

  // Code examples - Checkbox (Radix)
  const sizesCodeCheckbox = `import { Checkbox } from '@/design-system/components/Checkbox';

<Checkbox label="Size S" size="S" />
<Checkbox label="Size M" size="M" />
<Checkbox label="Size L" size="L" />`;

  // Code examples - VCheckbox (Vanilla)
  const sizesCodeVCheckbox = `import { VCheckbox } from '@/design-system/components/VCheckbox';

<VCheckbox label="Size S" size="S" />
<VCheckbox label="Size M" size="M" />
<VCheckbox label="Size L" size="L" />`;

  const statusCodeCheckbox = `import { Checkbox } from '@/design-system/components/Checkbox';

// Default (unchecked)
<Checkbox label="Default" status="Default" />

// Checked
<Checkbox label="Checked" status="Checked" />

// Indeterminate
<Checkbox label="Indeterminate" status="Indeterminate" />`;

  const statusCodeVCheckbox = `import { VCheckbox } from '@/design-system/components/VCheckbox';

// Default (unchecked)
<VCheckbox label="Default" status="Default" />

// Checked
<VCheckbox label="Checked" status="Checked" />

// Indeterminate
<VCheckbox label="Indeterminate" status="Indeterminate" />`;

  const statesCodeCheckbox = `import { Checkbox } from '@/design-system/components/Checkbox';

<Checkbox label="Default" state="Default" />
<Checkbox label="Disabled" state="Disabled" />
<Checkbox label="Disabled Checked" state="Disabled" status="Checked" />
<Checkbox label="Read-only" state="Read-only" status="Checked" />`;

  const statesCodeVCheckbox = `import { VCheckbox } from '@/design-system/components/VCheckbox';

<VCheckbox label="Default" state="Default" />
<VCheckbox label="Disabled" state="Disabled" />
<VCheckbox label="Disabled Checked" state="Disabled" status="Checked" />
<VCheckbox label="Read-only" state="Read-only" status="Checked" />`;

  const controlledCodeCheckbox = `import { useState } from 'react';
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

  const controlledCodeVCheckbox = `import { useState } from 'react';
import { VCheckbox } from '@/design-system/components/VCheckbox';

function MyComponent() {
  const [checked, setChecked] = useState(false);

  return (
    <VCheckbox
      label="Accept terms and conditions"
      checked={checked}
      onChange={setChecked}
    />
  );
}`;

  const withoutLabelCodeCheckbox = `import { Checkbox } from '@/design-system/components/Checkbox';

// Checkbox without visible label
<Checkbox showLabel={false} size="S" />
<Checkbox showLabel={false} size="M" status="Checked" />
<Checkbox showLabel={false} size="L" status="Indeterminate" />`;

  const withoutLabelCodeVCheckbox = `import { VCheckbox } from '@/design-system/components/VCheckbox';

// VCheckbox without visible label
<VCheckbox showLabel={false} size="S" />
<VCheckbox showLabel={false} size="M" status="Checked" />
<VCheckbox showLabel={false} size="L" status="Indeterminate" />`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Checkbox
        </h1>
        <ButtonGroup
          options={[
            { label: 'Radix UI', value: 'checkbox' },
            { label: 'Vanilla', value: 'vcheckbox' },
          ]}
          value={componentType}
          onChange={(value) => setComponentType(value as 'checkbox' | 'vcheckbox')}
          size="S"
        />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Checkbox components with two implementations: Checkbox (Radix UI) and
        VCheckbox (Vanilla React).
      </p>

      {/* Main Tabs */}
      <div className="tabs-container">
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
            <div className="checkbox-examples">
              {componentType === 'checkbox' ? (
                <>
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
                </>
              ) : (
                <>
                  <VCheckbox
                    label="Size S"
                    size="S"
                    checked={sizeS}
                    onChange={setSizeS}
                  />
                  <VCheckbox
                    label="Size M"
                    size="M"
                    checked={sizeM}
                    onChange={setSizeM}
                  />
                  <VCheckbox
                    label="Size L"
                    size="L"
                    checked={sizeL}
                    onChange={setSizeL}
                  />
                </>
              )}
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
            <div className="checkbox-examples">
              {componentType === 'checkbox' ? (
                <>
                  <Checkbox label="Default (unchecked)" status="Default" />
                  <Checkbox label="Checked" status="Checked" />
                  <Checkbox label="Indeterminate" status="Indeterminate" />
                </>
              ) : (
                <>
                  <VCheckbox label="Default (unchecked)" status="Default" />
                  <VCheckbox label="Checked" status="Checked" />
                  <VCheckbox label="Indeterminate" status="Indeterminate" />
                </>
              )}
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
            <div className="checkbox-examples">
              {componentType === 'checkbox' ? (
                <>
                  <Checkbox label="Default" state="Default" />
                  <Checkbox label="Disabled" state="Disabled" />
                  <Checkbox
                    label="Disabled Checked"
                    state="Disabled"
                    status="Checked"
                  />
                  <Checkbox
                    label="Read-only"
                    state="Read-only"
                    status="Checked"
                  />
                </>
              ) : (
                <>
                  <VCheckbox label="Default" state="Default" />
                  <VCheckbox label="Disabled" state="Disabled" />
                  <VCheckbox
                    label="Disabled Checked"
                    state="Disabled"
                    status="Checked"
                  />
                  <VCheckbox
                    label="Read-only"
                    state="Read-only"
                    status="Checked"
                  />
                </>
              )}
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
            <div className="checkbox-examples">
              {componentType === 'checkbox' ? (
                <>
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
                </>
              ) : (
                <>
                  <VCheckbox
                    label="Accept terms and conditions"
                    checked={checked1}
                    onChange={setChecked1}
                  />
                  <VCheckbox
                    label="Subscribe to newsletter"
                    checked={checked2}
                    onChange={setChecked2}
                  />
                  <VCheckbox
                    label="Remember me"
                    checked={checked3}
                    onChange={setChecked3}
                  />
                </>
              )}
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
            <div className="checkbox-examples">
              {componentType === 'checkbox' ? (
                <>
                  <Checkbox showLabel={false} size="S" />
                  <Checkbox showLabel={false} size="M" status="Checked" />
                  <Checkbox showLabel={false} size="L" status="Indeterminate" />
                </>
              ) : (
                <>
                  <VCheckbox showLabel={false} size="S" />
                  <VCheckbox showLabel={false} size="M" status="Checked" />
                  <VCheckbox showLabel={false} size="L" status="Indeterminate" />
                </>
              )}
            </div>
          </section>

          {/* Comparison Section */}
          {componentType === 'checkbox' && (
            <section className="component-section">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Checkbox vs VCheckbox
              </h2>
              <div className="comparison-box">
                <p className="label-regular-m" style={{ marginBottom: '12px' }}>
                  <strong>Checkbox</strong> uses Radix UI for better
                  accessibility and keyboard navigation.
                </p>
                <p className="label-regular-m" style={{ marginBottom: '12px' }}>
                  <strong>VCheckbox</strong> is a vanilla React implementation
                  with no external dependencies (except React).
                </p>
                <p className="label-regular-m">
                  Both components have the same API and visual appearance.
                  Choose based on your needs.
                </p>
              </div>
            </section>
          )}
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
                  <td>
                    <code>label</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>'Label'</code>
                  </td>
                  <td>Checkbox label text</td>
                </tr>
                <tr>
                  <td>
                    <code>size</code>
                  </td>
                  <td>
                    <code>'S' | 'M' | 'L'</code>
                  </td>
                  <td>
                    <code>'M'</code>
                  </td>
                  <td>Checkbox size</td>
                </tr>
                <tr>
                  <td>
                    <code>state</code>
                  </td>
                  <td>
                    <code>'Default' | 'Hover' | 'Disabled' | 'Read-only'</code>
                  </td>
                  <td>
                    <code>'Default'</code>
                  </td>
                  <td>Checkbox state</td>
                </tr>
                <tr>
                  <td>
                    <code>status</code>
                  </td>
                  <td>
                    <code>'Default' | 'Checked' | 'Indeterminate'</code>
                  </td>
                  <td>
                    <code>'Default'</code>
                  </td>
                  <td>Checkbox checked status (uncontrolled)</td>
                </tr>
                <tr>
                  <td>
                    <code>showLabel</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>true</code>
                  </td>
                  <td>Show label next to checkbox</td>
                </tr>
                <tr>
                  <td>
                    <code>checked</code>
                  </td>
                  <td>
                    <code>boolean | 'indeterminate'</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>Controlled checked state</td>
                </tr>
                <tr>
                  <td>
                    <code>onCheckedChange</code> (Checkbox)
                    <br />
                    <code>onChange</code> (VCheckbox)
                  </td>
                  <td>
                    <code>(checked: boolean) =&gt; void</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>Callback when checked state changes</td>
                </tr>
                <tr>
                  <td>
                    <code>name</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>Name attribute for form submission</td>
                </tr>
                <tr>
                  <td>
                    <code>value</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>Value attribute for form submission</td>
                </tr>
                <tr>
                  <td>
                    <code>required</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>Required attribute</td>
                </tr>
                <tr>
                  <td>
                    <code>className</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>''</code>
                  </td>
                  <td>Additional CSS class</td>
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
        code={componentType === 'checkbox' ? sizesCodeCheckbox : sizesCodeVCheckbox}
      />
      <CodeModal
        isOpen={openModal === 'status'}
        onClose={() => setOpenModal(null)}
        title="Status Implementation"
        code={componentType === 'checkbox' ? statusCodeCheckbox : statusCodeVCheckbox}
      />
      <CodeModal
        isOpen={openModal === 'states'}
        onClose={() => setOpenModal(null)}
        title="States Implementation"
        code={componentType === 'checkbox' ? statesCodeCheckbox : statesCodeVCheckbox}
      />
      <CodeModal
        isOpen={openModal === 'controlled'}
        onClose={() => setOpenModal(null)}
        title={componentType === 'checkbox' ? 'Controlled Checkbox' : 'Controlled VCheckbox'}
        code={componentType === 'checkbox' ? controlledCodeCheckbox : controlledCodeVCheckbox}
      />
      <CodeModal
        isOpen={openModal === 'withoutLabel'}
        onClose={() => setOpenModal(null)}
        title="Without Label Implementation"
        code={componentType === 'checkbox' ? withoutLabelCodeCheckbox : withoutLabelCodeVCheckbox}
      />
    </div>
  );
}
