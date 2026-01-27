import { useState } from 'react';
import { PanelButton } from '@as-design-system/core';
import { Tab } from '@as-design-system/core';
import { Button } from '@as-design-system/core';
import '@as-design-system/core/PanelButton.css';
import '@as-design-system/core/Tooltip.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './PanelButton.css';

export default function PanelButtonPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const variantsCode = `import { PanelButton } from '@/design-system/components/PanelButton';

// Default
<PanelButton label="Dashboard" icon="apps" variant="Default" />

// Selected
<PanelButton label="Dashboard" icon="apps" variant="Selected" />

// Disabled
<PanelButton label="Dashboard" icon="apps" variant="Disabled" />`;

  const sizesCode = `import { PanelButton } from '@/design-system/components/PanelButton';

<PanelButton label="Size XS" icon="apps" size="XS" />
<PanelButton label="Size S" icon="apps" size="S" />
<PanelButton label="Size M" icon="apps" size="M" />`;

  const collapsedCode = `import { PanelButton } from '@/design-system/components/PanelButton';

// Collapsed mode (icon-only with tooltip on hover)
<PanelButton label="Dashboard" icon="apps" panelOpen={false} />
<PanelButton label="Settings" icon="settings" panelOpen={false} variant="Selected" />
<PanelButton label="Admin" icon="account_circle" panelOpen={false} variant="Disabled" />`;

  const badgesCode = `import { PanelButton } from '@/design-system/components/PanelButton';

// Error badge with tooltip
<PanelButton
  label="With Error"
  icon="info"
  showError
  errorCount={2}
  errorTooltip="2 inputs missing"
/>

// Warning indicator with tooltip
<PanelButton
  label="With Warning"
  icon="construction"
  showWarning
  warningTooltip="Outdated configuration"
/>

// Both with tooltips
<PanelButton
  label="Both"
  icon="apps"
  showError
  errorCount={5}
  showWarning
  errorTooltip="5 inputs missing"
  warningTooltip="Outdated configuration"
/>`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        PanelButton
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        Navigation button for dark side panels. Supports expanded (with label) and collapsed (icon-only with tooltip) modes.
      </p>

      {/* Tabs */}
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
            <div className="panel-button-demo-area">
              <PanelButton label="Default" icon="apps" variant="Default" />
              <PanelButton label="Selected" icon="apps" variant="Selected" />
              <PanelButton label="Disabled" icon="apps" variant="Disabled" />
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
            <div className="panel-button-demo-area">
              <PanelButton label="Size XS" icon="apps" size="XS" variant="Selected" />
              <PanelButton label="Size S" icon="apps" size="S" variant="Selected" />
              <PanelButton label="Size M" icon="apps" size="M" variant="Selected" />
            </div>
          </section>

          {/* Collapsed Mode */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Collapsed Mode
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('collapsed')}
              />
            </div>
            <div className="panel-button-demo-area">
              <div className="panel-button-demo-row">
                <PanelButton label="Dashboard" icon="apps" panelOpen={false} />
                <PanelButton label="Settings" icon="settings" panelOpen={false} variant="Selected" />
                <PanelButton label="Admin" icon="account_circle" panelOpen={false} variant="Disabled" />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: 0 }}>
                Hover over the buttons to see the tooltip
              </p>
            </div>
          </section>

          {/* Badges */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Error & Warning Indicators
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('badges')}
              />
            </div>
            <div className="panel-button-showcase">
              <div className="panel-button-group">
                <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>Expanded</h3>
                <div className="panel-button-demo-area">
                  <PanelButton label="With Error" icon="info" showError errorCount={2} variant="Selected" errorTooltip="2 inputs missing" />
                  <PanelButton label="With Warning" icon="construction" showWarning variant="Selected" warningTooltip="Outdated configuration" />
                  <PanelButton label="Both" icon="apps" showError errorCount={5} showWarning errorTooltip="5 inputs missing" warningTooltip="Outdated configuration" />
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: 0 }}>
                    Hover over the error or warning indicators to see the tooltip
                  </p>
                </div>
              </div>
              <div className="panel-button-group">
                <h3 className="label-bold-m" style={{ marginBottom: '12px', color: 'var(--text-main, #14171d)' }}>Collapsed</h3>
                <div className="panel-button-demo-area">
                  <div className="panel-button-demo-row">
                    <PanelButton label="Errors" icon="info" panelOpen={false} showError variant="Selected" errorTooltip="2 inputs missing" />
                    <PanelButton label="Warnings" icon="construction" panelOpen={false} showWarning variant="Selected" warningTooltip="Outdated configuration" />
                  </div>
                </div>
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
                  <td><code>-</code></td>
                  <td>Button label text (required)</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Icon name to display</td>
                </tr>
                <tr>
                  <td><code>iconComponent</code></td>
                  <td><code>React.ReactNode</code></td>
                  <td><code>undefined</code></td>
                  <td>Custom icon component (overrides icon prop)</td>
                </tr>
                <tr>
                  <td><code>panelOpen</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether the panel is expanded (label visible) or collapsed (icon-only)</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'XS' | 'S' | 'M'</code></td>
                  <td><code>'M'</code></td>
                  <td>Button size</td>
                </tr>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>'Default' | 'Selected' | 'Disabled'</code></td>
                  <td><code>'Default'</code></td>
                  <td>Button variant</td>
                </tr>
                <tr>
                  <td><code>showError</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show error badge (chip in expanded, dot in collapsed)</td>
                </tr>
                <tr>
                  <td><code>errorCount</code></td>
                  <td><code>number</code></td>
                  <td><code>0</code></td>
                  <td>Number displayed in error chip (expanded mode only)</td>
                </tr>
                <tr>
                  <td><code>showWarning</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Show warning indicator</td>
                </tr>
                <tr>
                  <td><code>errorTooltip</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Tooltip text shown on hover over the error badge</td>
                </tr>
                <tr>
                  <td><code>warningTooltip</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Tooltip text shown on hover over the warning indicator</td>
                </tr>
                <tr>
                  <td><code>onClick</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td><code>undefined</code></td>
                  <td>Click handler</td>
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
        isOpen={openModal === 'collapsed'}
        onClose={() => setOpenModal(null)}
        title="Collapsed Mode Implementation"
        code={collapsedCode}
      />
      <CodeModal
        isOpen={openModal === 'badges'}
        onClose={() => setOpenModal(null)}
        title="Error & Warning Indicators"
        code={badgesCode}
      />
    </div>
  );
}
