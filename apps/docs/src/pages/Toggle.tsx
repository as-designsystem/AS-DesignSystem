import { useState } from 'react';
import { Toggle, VToggle, Tab, Button, ButtonGroup } from '@as-design-system/core';
import '@as-design-system/core/Toggle.css';
import '@as-design-system/core/VToggle.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/ButtonGroup.css';
import CodeModal from '../components/CodeModal';
import './Toggle.css';

export default function TogglePage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [componentType, setComponentType] = useState<'toggle' | 'vtoggle'>(
    'toggle'
  );

  // State for sizes examples
  const [sizeS, setSizeS] = useState(false);
  const [sizeM, setSizeM] = useState(false);
  const [sizeL, setSizeL] = useState(false);

  // State for interactive examples
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  // Code examples - Toggle (Radix)
  const sizesCodeToggle = `import { Toggle } from '@as-design-system/core';
import '@as-design-system/core/Toggle.css';

<Toggle label="Size S" size="S" />
<Toggle label="Size M" size="M" />
<Toggle label="Size L" size="L" />`;

  // Code examples - VToggle (Vanilla)
  const sizesCodeVToggle = `import { VToggle } from '@as-design-system/core';
import '@as-design-system/core/VToggle.css';

<VToggle label="Size S" size="S" />
<VToggle label="Size M" size="M" />
<VToggle label="Size L" size="L" />`;

  const selectedCodeToggle = `import { Toggle } from '@as-design-system/core';
import '@as-design-system/core/Toggle.css';

// Unchecked
<Toggle label="Unchecked" checked={false} />

// Checked
<Toggle label="Checked" checked={true} />`;

  const selectedCodeVToggle = `import { VToggle } from '@as-design-system/core';
import '@as-design-system/core/VToggle.css';

// Unselected
<VToggle label="Unselected" selected={false} />

// Selected
<VToggle label="Selected" selected={true} />`;

  const statesCodeToggle = `import { Toggle } from '@as-design-system/core';
import '@as-design-system/core/Toggle.css';

<Toggle label="Default" state="Default" />
<Toggle label="Disabled" state="Disabled" />
<Toggle label="Disabled Checked" state="Disabled" checked />`;

  const statesCodeVToggle = `import { VToggle } from '@as-design-system/core';
import '@as-design-system/core/VToggle.css';

<VToggle label="Default" state="Default" />
<VToggle label="Disabled" state="Disabled" />
<VToggle label="Disabled Selected" state="Disabled" selected />`;

  const controlledCodeToggle = `import { useState } from 'react';
import { Toggle } from '@as-design-system/core';
import '@as-design-system/core/Toggle.css';

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

  const controlledCodeVToggle = `import { useState } from 'react';
import { VToggle } from '@as-design-system/core';
import '@as-design-system/core/VToggle.css';

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

  const withoutLabelCodeToggle = `import { Toggle } from '@as-design-system/core';
import '@as-design-system/core/Toggle.css';

// Toggle without visible label (label is still used for accessibility)
<Toggle showLabel={false} size="S" />
<Toggle showLabel={false} size="M" checked />
<Toggle showLabel={false} size="L" />`;

  const withoutLabelCodeVToggle = `import { VToggle } from '@as-design-system/core';
import '@as-design-system/core/VToggle.css';

// VToggle without visible label (label is still used for accessibility)
<VToggle showLabel={false} size="S" />
<VToggle showLabel={false} size="M" selected />
<VToggle showLabel={false} size="L" />`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Toggle
        </h1>
        <ButtonGroup
          options={[
            { label: 'Radix UI', value: 'toggle' },
            { label: 'Vanilla', value: 'vtoggle' },
          ]}
          value={componentType}
          onChange={(value) => setComponentType(value as 'toggle' | 'vtoggle')}
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
        Toggle components with two implementations: Toggle (Radix UI) and
        VToggle (Vanilla React).
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
            <div className="toggle-examples">
              {componentType === 'toggle' ? (
                <>
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
                </>
              ) : (
                <>
                  <VToggle
                    label="Size S"
                    size="S"
                    selected={sizeS}
                    onChange={setSizeS}
                  />
                  <VToggle
                    label="Size M"
                    size="M"
                    selected={sizeM}
                    onChange={setSizeM}
                  />
                  <VToggle
                    label="Size L"
                    size="L"
                    selected={sizeL}
                    onChange={setSizeL}
                  />
                </>
              )}
            </div>
          </section>

          {/* Selected/Checked States */}
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
                {componentType === 'toggle' ? 'Checked States' : 'Selected States'}
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
              {componentType === 'toggle' ? (
                <>
                  <Toggle label="Unchecked" checked={false} />
                  <Toggle label="Checked" checked={true} />
                </>
              ) : (
                <>
                  <VToggle label="Unselected" selected={false} />
                  <VToggle label="Selected" selected={true} />
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
            <div className="toggle-examples">
              {componentType === 'toggle' ? (
                <>
                  <Toggle label="Default" state="Default" />
                  <Toggle label="Disabled" state="Disabled" />
                  <Toggle label="Disabled Checked" state="Disabled" checked />
                </>
              ) : (
                <>
                  <VToggle label="Default" state="Default" />
                  <VToggle label="Disabled" state="Disabled" />
                  <VToggle label="Disabled Selected" state="Disabled" selected />
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
            <div className="toggle-examples">
              {componentType === 'toggle' ? (
                <>
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
                </>
              ) : (
                <>
                  <VToggle
                    label="Enable notifications"
                    selected={notifications}
                    onChange={setNotifications}
                  />
                  <VToggle
                    label="Dark mode"
                    selected={darkMode}
                    onChange={setDarkMode}
                  />
                  <VToggle
                    label="Auto-save"
                    selected={autoSave}
                    onChange={setAutoSave}
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
            <div className="toggle-examples toggle-examples--no-label">
              {componentType === 'toggle' ? (
                <>
                  <Toggle showLabel={false} size="S" label="Small toggle" />
                  <Toggle showLabel={false} size="M" checked label="Medium toggle" />
                  <Toggle showLabel={false} size="L" label="Large toggle" />
                </>
              ) : (
                <>
                  <VToggle showLabel={false} size="S" label="Small toggle" />
                  <VToggle showLabel={false} size="M" selected label="Medium toggle" />
                  <VToggle showLabel={false} size="L" label="Large toggle" />
                </>
              )}
            </div>
          </section>

          {/* Comparison Section */}
          {componentType === 'toggle' && (
            <section className="component-section">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Toggle vs VToggle
              </h2>
              <div className="comparison-box">
                <p className="label-regular-m" style={{ marginBottom: '12px' }}>
                  <strong>Toggle</strong> uses Radix UI Switch for better
                  accessibility and keyboard navigation.
                </p>
                <p className="label-regular-m" style={{ marginBottom: '12px' }}>
                  <strong>VToggle</strong> is a vanilla React implementation
                  with no external dependencies (except React).
                </p>
                <p className="label-regular-m">
                  Both components have the same visual appearance.
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
                    <code>checked</code> (Toggle)
                    <br />
                    <code>selected</code> (VToggle)
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>Whether the toggle is on</td>
                </tr>
                <tr>
                  <td>
                    <code>onCheckedChange</code> (Toggle)
                    <br />
                    <code>onChange</code> (VToggle)
                  </td>
                  <td>
                    <code>(value: boolean) =&gt; void</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>Callback when state changes</td>
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
        code={componentType === 'toggle' ? sizesCodeToggle : sizesCodeVToggle}
      />
      <CodeModal
        isOpen={openModal === 'selected'}
        onClose={() => setOpenModal(null)}
        title={componentType === 'toggle' ? 'Checked States Implementation' : 'Selected States Implementation'}
        code={componentType === 'toggle' ? selectedCodeToggle : selectedCodeVToggle}
      />
      <CodeModal
        isOpen={openModal === 'states'}
        onClose={() => setOpenModal(null)}
        title="States Implementation"
        code={componentType === 'toggle' ? statesCodeToggle : statesCodeVToggle}
      />
      <CodeModal
        isOpen={openModal === 'controlled'}
        onClose={() => setOpenModal(null)}
        title={componentType === 'toggle' ? 'Controlled Toggle' : 'Controlled VToggle'}
        code={componentType === 'toggle' ? controlledCodeToggle : controlledCodeVToggle}
      />
      <CodeModal
        isOpen={openModal === 'withoutLabel'}
        onClose={() => setOpenModal(null)}
        title="Without Label Implementation"
        code={componentType === 'toggle' ? withoutLabelCodeToggle : withoutLabelCodeVToggle}
      />
    </div>
  );
}
