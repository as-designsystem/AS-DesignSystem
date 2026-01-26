import { useState } from 'react';
import { Tooltip, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/Tooltip.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Tooltip.css';

export default function TooltipPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const arrowsCode = `import { Tooltip } from '@/design-system/components/Tooltip';

<Tooltip label="No arrow" arrow="None" />
<Tooltip label="Arrow bottom" arrow="Bottom" />
<Tooltip label="Arrow top" arrow="Top" />
<Tooltip label="Arrow right" arrow="Right" />
<Tooltip label="Arrow left" arrow="Left" />`;

  const usageCode = `import { Tooltip } from '@/design-system/components/Tooltip';
import { Button } from '@/design-system/components/Button';

// Wrap a Button and position the tooltip with CSS
<div style={{ position: 'relative', display: 'inline-flex' }}>
  <Button label="Hover me" variant="Outlined" size="M" />
  <Tooltip label="Helpful info" arrow="Top" />
</div>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        Tooltip
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A lightweight tooltip used to display contextual information, with
        configurable arrow direction.
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
          {/* Arrow Variants */}
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
                Arrow Variants
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('arrows')}
              />
            </div>
            <div className="tooltip-examples">
              <div className="tooltip-example-item">
                <span className="tooltip-example-label label-regular-xs">None</span>
                <Tooltip label="Tooltip label" arrow="None" />
              </div>
              <div className="tooltip-example-item">
                <span className="tooltip-example-label label-regular-xs">Bottom</span>
                <Tooltip label="Tooltip label" arrow="Bottom" />
              </div>
              <div className="tooltip-example-item">
                <span className="tooltip-example-label label-regular-xs">Top</span>
                <Tooltip label="Tooltip label" arrow="Top" />
              </div>
              <div className="tooltip-example-item">
                <span className="tooltip-example-label label-regular-xs">Right</span>
                <Tooltip label="Tooltip label" arrow="Right" />
              </div>
              <div className="tooltip-example-item">
                <span className="tooltip-example-label label-regular-xs">Left</span>
                <Tooltip label="Tooltip label" arrow="Left" />
              </div>
            </div>
          </section>

          {/* Usage Example */}
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
                Usage Example
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('usage')}
              />
            </div>
            <div className="tooltip-examples">
              <div className="tooltip-usage-wrapper">
                <Button label="Hover me" variant="Outlined" size="M" />
                <div className="tooltip-usage-popup">
                  <Tooltip label="Helpful information" arrow="Top" />
                </div>
              </div>
              <div className="tooltip-usage-wrapper tooltip-usage-wrapper--right">
                <Button label="Hover me" variant="Outlined" size="M" />
                <div className="tooltip-usage-popup tooltip-usage-popup--right">
                  <Tooltip label="Side tooltip" arrow="Left" />
                </div>
              </div>
            </div>
          </section>

          {/* Custom Labels */}
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
                Custom Labels
              </h2>
            </div>
            <div className="tooltip-examples">
              <Tooltip label="Save document" arrow="Bottom" />
              <Tooltip label="Delete item" arrow="Bottom" />
              <Tooltip label="Open settings" arrow="Bottom" />
              <Tooltip label="View details" arrow="None" />
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
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td><code>'Tooltip label'</code></td>
                  <td>Text content of the tooltip</td>
                </tr>
                <tr>
                  <td><code>arrow</code></td>
                  <td><code>'None' | 'Top' | 'Bottom' | 'Left' | 'Right'</code></td>
                  <td><code>'None'</code></td>
                  <td>Arrow direction (points to the trigger element side)</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Additional CSS class names</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'arrows'}
        onClose={() => setOpenModal(null)}
        title="Arrow Variants"
        code={arrowsCode}
      />
      <CodeModal
        isOpen={openModal === 'usage'}
        onClose={() => setOpenModal(null)}
        title="Usage Example"
        code={usageCode}
      />
    </div>
  );
}
