import { useState } from 'react';
import { Toggle, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/Toggle.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Toggle.css';

export default function TogglePage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const [sizeS, setSizeS] = useState(false);
  const [sizeM, setSizeM] = useState(false);
  const [sizeL, setSizeL] = useState(false);

  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  const sizesCode = `import { Toggle } from '@/design-system/components/Toggle';

<Toggle label="Size S" size="S" />
<Toggle label="Size M" size="M" />
<Toggle label="Size L" size="L" />`;

  const checkedCode = `import { Toggle } from '@/design-system/components/Toggle';

// Unchecked
<Toggle label="Unchecked" checked={false} />

// Checked
<Toggle label="Checked" checked={true} />`;

  const statesCode = `import { Toggle } from '@/design-system/components/Toggle';

<Toggle label="Default" state="Default" />
<Toggle label="Disabled" state="Disabled" />
<Toggle label="Disabled Checked" state="Disabled" checked />`;

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

  const withoutLabelCode = `import { Toggle } from '@/design-system/components/Toggle';

// Toggle without visible label (label is still used for accessibility)
<Toggle showLabel={false} size="S" label="Small toggle" />
<Toggle showLabel={false} size="M" checked label="Medium toggle" />
<Toggle showLabel={false} size="L" label="Large toggle" />`;

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
        Accessible toggle switch built on Radix UI Switch with keyboard navigation.
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
              <div className="toggle-examples">
                <Toggle label="Size S" size="S" checked={sizeS} onCheckedChange={setSizeS} />
                <Toggle label="Size M" size="M" checked={sizeM} onCheckedChange={setSizeM} />
                <Toggle label="Size L" size="L" checked={sizeL} onCheckedChange={setSizeL} />
              </div>
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
                onClick={() => setOpenModal('checked')}
              />
            </div>
            <div className="example-container">
              <div className="toggle-examples">
                <Toggle label="Unchecked" checked={false} />
                <Toggle label="Checked" checked={true} />
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
              <div className="toggle-examples">
                <Toggle label="Default" state="Default" />
                <Toggle label="Disabled" state="Disabled" />
                <Toggle label="Disabled Checked" state="Disabled" checked />
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
              <div className="toggle-examples">
                <Toggle label="Enable notifications" checked={notifications} onCheckedChange={setNotifications} />
                <Toggle label="Dark mode" checked={darkMode} onCheckedChange={setDarkMode} />
                <Toggle label="Auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
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
              <div className="toggle-examples toggle-examples--no-label">
                <Toggle showLabel={false} size="S" label="Small toggle" />
                <Toggle showLabel={false} size="M" checked label="Medium toggle" />
                <Toggle showLabel={false} size="L" label="Large toggle" />
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
                  <td><code>checked</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether the toggle is on</td>
                </tr>
                <tr>
                  <td><code>onCheckedChange</code></td>
                  <td><code>(value: boolean) =&gt; void</code></td>
                  <td><code>undefined</code></td>
                  <td>Callback when state changes</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'S' | 'M' | 'L'</code></td>
                  <td><code>'M'</code></td>
                  <td>Toggle size</td>
                </tr>
                <tr>
                  <td><code>state</code></td>
                  <td><code>'Default' | 'Hover' | 'Disabled'</code></td>
                  <td><code>'Default'</code></td>
                  <td>Toggle state</td>
                </tr>
                <tr>
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td><code>'Label'</code></td>
                  <td>Toggle label text</td>
                </tr>
                <tr>
                  <td><code>showLabel</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show label next to toggle</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Disabled state (alternative to state="Disabled")</td>
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
      <CodeModal isOpen={openModal === 'checked'} onClose={() => setOpenModal(null)} title="Checked States" code={checkedCode} />
      <CodeModal isOpen={openModal === 'states'} onClose={() => setOpenModal(null)} title="States" code={statesCode} />
      <CodeModal isOpen={openModal === 'controlled'} onClose={() => setOpenModal(null)} title="Controlled Toggle" code={controlledCode} />
      <CodeModal isOpen={openModal === 'withoutLabel'} onClose={() => setOpenModal(null)} title="Without Label" code={withoutLabelCode} />
    </div>
  );
}
