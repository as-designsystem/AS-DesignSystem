import { useState } from 'react';
import { VButton, Button, Tab } from '@as-designsystem/core';
import '@as-designsystem/core/VButton.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/Tab.css';
import CodeModal from '../components/CodeModal';
import './VButton.css';

export default function VButtonPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const variantsCode = `import { VButton } from '@/design-system/components/VButton';

// Default variant
<VButton label="BUTTON LABEL" icon="flight" variant="Default" size="M" />
<VButton label="BUTTON LABEL" icon="flight" variant="Default" size="M" disabled />

// Outlined variant
<VButton label="BUTTON LABEL" icon="flight" variant="Outlined" size="M" />
<VButton label="BUTTON LABEL" icon="flight" variant="Outlined" size="M" disabled />

// Ghost variant
<VButton label="BUTTON LABEL" icon="flight" variant="Ghost" size="M" />
<VButton label="BUTTON LABEL" icon="flight" variant="Ghost" size="M" disabled />`;

  const sizesCode = `import { VButton } from '@/design-system/components/VButton';

<VButton label="BUTTON LABEL" icon="flight" size="XS" />
<VButton label="BUTTON LABEL" icon="flight" size="S" />
<VButton label="BUTTON LABEL" icon="flight" size="M" />
<VButton label="BUTTON LABEL" icon="flight" size="L" />
<VButton label="BUTTON LABEL" icon="flight" size="XL" />`;

  const overridesCode = `import { VButton } from '@/design-system/components/VButton';

// Custom font size override
<VButton label="BUTTON LABEL" icon="flight" size="M" fontSize={18} />

// Custom icon size override
<VButton label="BUTTON LABEL" icon="flight" size="M" iconSize={40} />

// Both overrides
<VButton label="BUTTON LABEL" icon="flight" size="S" fontSize={16} iconSize={32} />`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        VButton
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        Vertical button component with icon above label. Supports the same variants, sizes and states as Button but in a vertical layout.
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
          {/* Variants */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Variants
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('variants')}
              />
            </div>
            <div className="example-container">
              <div className="vbutton-examples">
                <VButton label="BUTTON LABEL" icon="flight" variant="Default" size="M" />
                <VButton label="BUTTON LABEL" icon="flight" variant="Outlined" size="M" />
                <VButton label="BUTTON LABEL" icon="flight" variant="Ghost" size="M" />
                <VButton label="BUTTON LABEL" icon="flight" variant="Default" size="M" disabled />
                <VButton label="BUTTON LABEL" icon="flight" variant="Outlined" size="M" disabled />
                <VButton label="BUTTON LABEL" icon="flight" variant="Ghost" size="M" disabled />
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
              <div className="vbutton-examples">
                <VButton label="BUTTON LABEL" icon="flight" size="XS" />
                <VButton label="BUTTON LABEL" icon="flight" size="S" />
                <VButton label="BUTTON LABEL" icon="flight" size="M" />
                <VButton label="BUTTON LABEL" icon="flight" size="L" />
                <VButton label="BUTTON LABEL" icon="flight" size="XL" />
              </div>
            </div>
          </section>

          {/* Font/Icon Size Overrides */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Font & Icon Size Overrides
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('overrides')}
              />
            </div>
            <div className="example-container">
              <div className="vbutton-examples">
                <VButton label="fontSize=18" icon="flight" size="M" fontSize={18} />
                <VButton label="iconSize=40" icon="flight" size="M" iconSize={40} />
                <VButton label="Both" icon="flight" size="S" fontSize={16} iconSize={32} />
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
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td><code>'BUTTON LABEL'</code></td>
                  <td>Button label text</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                  <td>Icon name to display</td>
                </tr>
                <tr>
                  <td><code>iconComponent</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>-</code></td>
                  <td>Custom React icon component</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'XS' | 'S' | 'M' | 'L' | 'XL'</code></td>
                  <td><code>'M'</code></td>
                  <td>Button size</td>
                </tr>
                <tr>
                  <td><code>state</code></td>
                  <td><code>'Default' | 'Hover' | 'Active' | 'Disabled'</code></td>
                  <td><code>'Default'</code></td>
                  <td>Button state</td>
                </tr>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>'Default' | 'Outlined' | 'Ghost'</code></td>
                  <td><code>'Default'</code></td>
                  <td>Button variant</td>
                </tr>
                <tr>
                  <td><code>showLabel</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show/hide the label</td>
                </tr>
                <tr>
                  <td><code>showIcon</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show/hide the icon</td>
                </tr>
                <tr>
                  <td><code>fontSize</code></td>
                  <td><code>number</code></td>
                  <td><code>-</code></td>
                  <td>Override label font size (px)</td>
                </tr>
                <tr>
                  <td><code>iconSize</code></td>
                  <td><code>number</code></td>
                  <td><code>-</code></td>
                  <td>Override icon size (px)</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Disables the button</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'variants'}
        onClose={() => setOpenModal(null)}
        title="Variants Implementation"
        code={variantsCode}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Sizes Implementation"
        code={sizesCode}
      />
      <CodeModal
        isOpen={openModal === 'overrides'}
        onClose={() => setOpenModal(null)}
        title="Font & Icon Size Overrides"
        code={overridesCode}
      />
    </div>
  );
}
