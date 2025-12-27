import { useState } from 'react';
import { Toggle, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/Toggle.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Toggle.css';

export default function TogglePage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  // State for sizes examples
  const [sizeS, setSizeS] = useState(false);
  const [sizeM, setSizeM] = useState(false);
  const [sizeL, setSizeL] = useState(false);

  // State for interactive examples
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  const sizesCode = `import { Toggle } from '@/design-system/components/Toggle';

<Toggle label="Size S" size="S" />
<Toggle label="Size M" size="M" />
<Toggle label="Size L" size="L" />`;

  const statesCode = `import { Toggle } from '@/design-system/components/Toggle';

// Default
<Toggle label="Default" state="Default" />

// Disabled (unselected)
<Toggle label="Disabled" state="Disabled" />

// Disabled (selected)
<Toggle label="Disabled Selected" state="Disabled" selected />`;

  const selectedCode = `import { Toggle } from '@/design-system/components/Toggle';

// Unselected
<Toggle label="Unselected" selected={false} />

// Selected
<Toggle label="Selected" selected={true} />`;

  const controlledCode = `import { useState } from 'react';
import { Toggle } from '@/design-system/components/Toggle';

function MyComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Toggle
      label="Enable notifications"
      selected={enabled}
      onChange={setEnabled}
    />
  );
}`;

  const withoutLabelCode = `import { Toggle } from '@/design-system/components/Toggle';

// Toggle without visible label (label is still used for accessibility)
<Toggle showLabel={false} size="S" />
<Toggle showLabel={false} size="M" selected />
<Toggle showLabel={false} size="L" />`;

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
        A toggle switch component for boolean selections.
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
              <Toggle
                label="Size S"
                size="S"
                selected={sizeS}
                onChange={setSizeS}
              />
              <Toggle
                label="Size M"
                size="M"
                selected={sizeM}
                onChange={setSizeM}
              />
              <Toggle
                label="Size L"
                size="L"
                selected={sizeL}
                onChange={setSizeL}
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
                onClick={() => setOpenModal('selected')}
              />
            </div>
            <div className="toggle-examples">
              <Toggle label="Unselected" selected={false} />
              <Toggle label="Selected" selected={true} />
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
              <Toggle label="Disabled Selected" state="Disabled" selected />
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
                selected={notifications}
                onChange={setNotifications}
              />
              <Toggle
                label="Dark mode"
                selected={darkMode}
                onChange={setDarkMode}
              />
              <Toggle
                label="Auto-save"
                selected={autoSave}
                onChange={setAutoSave}
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
              <Toggle showLabel={false} size="M" selected label="Medium toggle" />
              <Toggle showLabel={false} size="L" label="Large toggle" />
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

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Sizes Implementation"
        code={sizesCode}
      />
      <CodeModal
        isOpen={openModal === 'selected'}
        onClose={() => setOpenModal(null)}
        title="Selected States Implementation"
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
    </div>
  );
}
