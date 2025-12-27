import { useState } from 'react';
import { Toggle, VToggle, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/Toggle.css';
import '@as-design-system/core/VToggle.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Toggle.css';

export default function TogglePage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [componentTab, setComponentTab] = useState<'radix' | 'vanilla'>('radix');

  // State for sizes examples (Radix)
  const [sizeS, setSizeS] = useState(false);
  const [sizeM, setSizeM] = useState(false);
  const [sizeL, setSizeL] = useState(false);

  // State for sizes examples (Vanilla)
  const [vsizeS, setVSizeS] = useState(false);
  const [vsizeM, setVSizeM] = useState(false);
  const [vsizeL, setVSizeL] = useState(false);

  // State for interactive examples
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  // State for interactive examples (Vanilla)
  const [vnotifications, setVNotifications] = useState(false);
  const [vdarkMode, setVDarkMode] = useState(true);
  const [vautoSave, setVAutoSave] = useState(false);

  const sizesCode = `import { Toggle } from '@/design-system/components/Toggle';

<Toggle label="Size S" size="S" />
<Toggle label="Size M" size="M" />
<Toggle label="Size L" size="L" />`;

  const vsizesCode = `import { VToggle } from '@/design-system/components/VToggle';

<VToggle label="Size S" size="S" />
<VToggle label="Size M" size="M" />
<VToggle label="Size L" size="L" />`;

  const statesCode = `import { Toggle } from '@/design-system/components/Toggle';

// Default
<Toggle label="Default" state="Default" />

// Disabled (unchecked)
<Toggle label="Disabled" state="Disabled" />

// Disabled (checked)
<Toggle label="Disabled Checked" state="Disabled" checked />`;

  const vstatesCode = `import { VToggle } from '@/design-system/components/VToggle';

// Default
<VToggle label="Default" state="Default" />

// Disabled (unselected)
<VToggle label="Disabled" state="Disabled" />

// Disabled (selected)
<VToggle label="Disabled Selected" state="Disabled" selected />`;

  const selectedCode = `import { Toggle } from '@/design-system/components/Toggle';

// Unchecked
<Toggle label="Unchecked" checked={false} />

// Checked
<Toggle label="Checked" checked={true} />`;

  const vselectedCode = `import { VToggle } from '@/design-system/components/VToggle';

// Unselected
<VToggle label="Unselected" selected={false} />

// Selected
<VToggle label="Selected" selected={true} />`;

  const controlledCode = `import { useState } from 'react';
import { Toggle } from '@/design-system/components/Toggle';

function MyComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Toggle
      label="Enable notifications"
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  );
}`;

  const vcontrolledCode = `import { useState } from 'react';
import { VToggle } from '@/design-system/components/VToggle';

function MyComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <VToggle
      label="Enable notifications"
      selected={enabled}
      onChange={setEnabled}
    />
  );
}`;

  const withoutLabelCode = `import { Toggle } from '@/design-system/components/Toggle';

// Toggle without visible label (label is still used for accessibility)
<Toggle showLabel={false} size="S" />
<Toggle showLabel={false} size="M" checked />
<Toggle showLabel={false} size="L" />`;

  const vwithoutLabelCode = `import { VToggle } from '@/design-system/components/VToggle';

// Toggle without visible label (label is still used for accessibility)
<VToggle showLabel={false} size="S" />
<VToggle showLabel={false} size="M" selected />
<VToggle showLabel={false} size="L" />`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        Toggle
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A toggle switch component for boolean selections. Available in two versions: Toggle (Radix UI) and VToggle (Vanilla).
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
          {/* Component Version Tabs */}
          <div style={{ marginTop: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                label="Toggle (Radix)"
                size="S"
                variant={componentTab === 'radix' ? 'Default' : 'Outlined'}
                onClick={() => setComponentTab('radix')}
              />
              <Button
                label="VToggle (Vanilla)"
                size="S"
                variant={componentTab === 'vanilla' ? 'Default' : 'Outlined'}
                onClick={() => setComponentTab('vanilla')}
              />
            </div>
          </div>

          {/* Radix Toggle Examples */}
          {componentTab === 'radix' && (
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
                <div className="toggle-examples">
                  <Toggle
                    label="Size S"
                    size="S"
                    checked={sizeS}
                    onCheckedChange={setSizeS}
                  />
                  <Toggle
                    label="Size M"
                    size="M"
                    checked={sizeM}
                    onCheckedChange={setSizeM}
                  />
                  <Toggle
                    label="Size L"
                    size="L"
                    checked={sizeL}
                    onCheckedChange={setSizeL}
                  />
                </div>
              </section>

              {/* Checked States */}
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
                    Checked States
                  </h2>
                  <Button
                    label="Code"
                    leftIcon="code"
                    size="S"
                    variant="Outlined"
                    onClick={() => setOpenModal('selected')}
                  />
                </div>
                <div className="toggle-examples">
                  <Toggle label="Unchecked" checked={false} />
                  <Toggle label="Checked" checked={true} />
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
                <div className="toggle-examples">
                  <Toggle label="Default" state="Default" />
                  <Toggle label="Disabled" state="Disabled" />
                  <Toggle label="Disabled Checked" state="Disabled" checked />
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
                <div className="toggle-examples">
                  <Toggle
                    label="Enable notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                  <Toggle
                    label="Dark mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                  <Toggle
                    label="Auto-save"
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                  />
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
                <div className="toggle-examples toggle-examples--no-label">
                  <Toggle showLabel={false} size="S" label="Small toggle" />
                  <Toggle showLabel={false} size="M" checked label="Medium toggle" />
                  <Toggle showLabel={false} size="L" label="Large toggle" />
                </div>
              </section>
            </>
          )}

          {/* Vanilla Toggle Examples */}
          {componentTab === 'vanilla' && (
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
                    onClick={() => setOpenModal('vsizes')}
                  />
                </div>
                <div className="toggle-examples">
                  <VToggle
                    label="Size S"
                    size="S"
                    selected={vsizeS}
                    onChange={setVSizeS}
                  />
                  <VToggle
                    label="Size M"
                    size="M"
                    selected={vsizeM}
                    onChange={setVSizeM}
                  />
                  <VToggle
                    label="Size L"
                    size="L"
                    selected={vsizeL}
                    onChange={setVSizeL}
                  />
                </div>
              </section>

              {/* Selected States */}
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
                    Selected States
                  </h2>
                  <Button
                    label="Code"
                    leftIcon="code"
                    size="S"
                    variant="Outlined"
                    onClick={() => setOpenModal('vselected')}
                  />
                </div>
                <div className="toggle-examples">
                  <VToggle label="Unselected" selected={false} />
                  <VToggle label="Selected" selected={true} />
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
                    onClick={() => setOpenModal('vstates')}
                  />
                </div>
                <div className="toggle-examples">
                  <VToggle label="Default" state="Default" />
                  <VToggle label="Disabled" state="Disabled" />
                  <VToggle label="Disabled Selected" state="Disabled" selected />
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
                    onClick={() => setOpenModal('vcontrolled')}
                  />
                </div>
                <div className="toggle-examples">
                  <VToggle
                    label="Enable notifications"
                    selected={vnotifications}
                    onChange={setVNotifications}
                  />
                  <VToggle
                    label="Dark mode"
                    selected={vdarkMode}
                    onChange={setVDarkMode}
                  />
                  <VToggle
                    label="Auto-save"
                    selected={vautoSave}
                    onChange={setVAutoSave}
                  />
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
                    onClick={() => setOpenModal('vwithoutLabel')}
                  />
                </div>
                <div className="toggle-examples toggle-examples--no-label">
                  <VToggle showLabel={false} size="S" label="Small toggle" />
                  <VToggle showLabel={false} size="M" selected label="Medium toggle" />
                  <VToggle showLabel={false} size="L" label="Large toggle" />
                </div>
              </section>
            </>
          )}
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
        <>
          {/* Component Version Tabs */}
          <div style={{ marginTop: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                label="Toggle (Radix)"
                size="S"
                variant={componentTab === 'radix' ? 'Default' : 'Outlined'}
                onClick={() => setComponentTab('radix')}
              />
              <Button
                label="VToggle (Vanilla)"
                size="S"
                variant={componentTab === 'vanilla' ? 'Default' : 'Outlined'}
                onClick={() => setComponentTab('vanilla')}
              />
            </div>
          </div>

          {/* Radix Toggle Props */}
          {componentTab === 'radix' && (
            <section className="component-section">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Toggle Props (Radix UI)
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
                        <code>checked</code>
                      </td>
                      <td>
                        <code>boolean</code>
                      </td>
                      <td>
                        <code>false</code>
                      </td>
                      <td>Whether the toggle is checked (on)</td>
                    </tr>
                    <tr>
                      <td>
                        <code>onCheckedChange</code>
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
                        <code>size</code>
                      </td>
                      <td>
                        <code>'S' | 'M' | 'L'</code>
                      </td>
                      <td>
                        <code>'M'</code>
                      </td>
                      <td>Toggle size</td>
                    </tr>
                    <tr>
                      <td>
                        <code>state</code>
                      </td>
                      <td>
                        <code>'Default' | 'Hover' | 'Disabled'</code>
                      </td>
                      <td>
                        <code>'Default'</code>
                      </td>
                      <td>Toggle state</td>
                    </tr>
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
                      <td>Toggle label text</td>
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
                      <td>Show label next to toggle</td>
                    </tr>
                    <tr>
                      <td>
                        <code>disabled</code>
                      </td>
                      <td>
                        <code>boolean</code>
                      </td>
                      <td>
                        <code>false</code>
                      </td>
                      <td>Disabled state (alternative to state="Disabled")</td>
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
                      <td>Required attribute for form validation</td>
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

          {/* Vanilla Toggle Props */}
          {componentTab === 'vanilla' && (
            <section className="component-section">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                VToggle Props (Vanilla)
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
                        <code>selected</code>
                      </td>
                      <td>
                        <code>boolean</code>
                      </td>
                      <td>
                        <code>false</code>
                      </td>
                      <td>Whether the toggle is selected (on)</td>
                    </tr>
                    <tr>
                      <td>
                        <code>onChange</code>
                      </td>
                      <td>
                        <code>(selected: boolean) =&gt; void</code>
                      </td>
                      <td>
                        <code>undefined</code>
                      </td>
                      <td>Callback when selected state changes</td>
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
                      <td>Toggle size</td>
                    </tr>
                    <tr>
                      <td>
                        <code>state</code>
                      </td>
                      <td>
                        <code>'Default' | 'Hover' | 'Disabled'</code>
                      </td>
                      <td>
                        <code>'Default'</code>
                      </td>
                      <td>Toggle state</td>
                    </tr>
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
                      <td>Toggle label text</td>
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
                      <td>Show label next to toggle</td>
                    </tr>
                    <tr>
                      <td>
                        <code>disabled</code>
                      </td>
                      <td>
                        <code>boolean</code>
                      </td>
                      <td>
                        <code>false</code>
                      </td>
                      <td>Disabled state (alternative to state="Disabled")</td>
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
                        <code>id</code>
                      </td>
                      <td>
                        <code>string</code>
                      </td>
                      <td>
                        <code>undefined</code>
                      </td>
                      <td>ID attribute</td>
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
        </>
      )}

      {/* Modals - Radix */}
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Sizes Implementation"
        code={sizesCode}
      />
      <CodeModal
        isOpen={openModal === 'selected'}
        onClose={() => setOpenModal(null)}
        title="Checked States Implementation"
        code={selectedCode}
      />
      <CodeModal
        isOpen={openModal === 'states'}
        onClose={() => setOpenModal(null)}
        title="States Implementation"
        code={statesCode}
      />
      <CodeModal
        isOpen={openModal === 'controlled'}
        onClose={() => setOpenModal(null)}
        title="Controlled Toggle"
        code={controlledCode}
      />
      <CodeModal
        isOpen={openModal === 'withoutLabel'}
        onClose={() => setOpenModal(null)}
        title="Without Label Implementation"
        code={withoutLabelCode}
      />

      {/* Modals - Vanilla */}
      <CodeModal
        isOpen={openModal === 'vsizes'}
        onClose={() => setOpenModal(null)}
        title="VToggle Sizes Implementation"
        code={vsizesCode}
      />
      <CodeModal
        isOpen={openModal === 'vselected'}
        onClose={() => setOpenModal(null)}
        title="VToggle Selected States Implementation"
        code={vselectedCode}
      />
      <CodeModal
        isOpen={openModal === 'vstates'}
        onClose={() => setOpenModal(null)}
        title="VToggle States Implementation"
        code={vstatesCode}
      />
      <CodeModal
        isOpen={openModal === 'vcontrolled'}
        onClose={() => setOpenModal(null)}
        title="Controlled VToggle"
        code={vcontrolledCode}
      />
      <CodeModal
        isOpen={openModal === 'vwithoutLabel'}
        onClose={() => setOpenModal(null)}
        title="VToggle Without Label Implementation"
        code={vwithoutLabelCode}
      />
    </div>
  );
}
