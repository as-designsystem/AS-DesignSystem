import { useState } from 'react';
import { PanelSectionTitle, PanelButton, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/PanelSectionTitle.css';
import '@as-design-system/core/PanelButton.css';
import '@as-design-system/core/Tooltip.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './PanelSectionTitle.css';

export default function PanelSectionTitlePage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { PanelSectionTitle } from '@/design-system/components/PanelSectionTitle';

<PanelSectionTitle label="Inputs" />
<PanelSectionTitle label="Results" />
<PanelSectionTitle label="Options" />`;

  const sizesCode = `import { PanelSectionTitle } from '@/design-system/components/PanelSectionTitle';

<PanelSectionTitle label="Size M" size="M" />
<PanelSectionTitle label="Size S" size="S" />
<PanelSectionTitle label="Size XS" size="XS" />`;

  const contextCode = `import { PanelSectionTitle } from '@/design-system/components/PanelSectionTitle';
import { PanelButton } from '@/design-system/components/PanelButton';

{/* First section - no top spacing */}
<PanelSectionTitle label="Inputs" size="S" />
<PanelButton label="Fleet" icon="AIR_fleet" variant="Selected" size="S" />
<PanelButton label="Mission" icon="AIR_side" size="S" />

{/* Second section - top spacing separates from above */}
<PanelSectionTitle label="Results" size="S" />
<PanelButton label="Economics" icon="apps" size="S" />
<PanelButton label="Charts" icon="info" size="S" />`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        PanelSectionTitle
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        A section title label for dark corporate panels. Used to group panel content into named sections
        (e.g., "Inputs", "Results") with top spacing to separate from the previous section.
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
          {/* Basic */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Basic Usage
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="panel-section-title-demo-area">
              <PanelSectionTitle label="Inputs" />
              <PanelSectionTitle label="Results" />
              <PanelSectionTitle label="Options" />
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
            <div className="panel-section-title-demo-area">
              <div className="panel-section-title-demo-row">
                <div className="panel-section-title-demo-item">
                  <PanelSectionTitle label="Size M (14px)" size="M" />
                </div>
                <div className="panel-section-title-demo-item">
                  <PanelSectionTitle label="Size S (12px)" size="S" />
                </div>
                <div className="panel-section-title-demo-item">
                  <PanelSectionTitle label="Size XS (11px)" size="XS" />
                </div>
              </div>
            </div>
          </section>

          {/* In Context */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                In Panel Context
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('context')}
              />
            </div>
            <div className="panel-section-title-demo-area panel-section-title-demo-area--narrow">
              <PanelSectionTitle label="Inputs" size="S" />
              <PanelButton label="Fleet" icon="AIR_fleet" variant="Selected" size="S" />
              <PanelButton label="Mission" icon="AIR_side" size="S" />
              <PanelSectionTitle label="Results" size="S" />
              <PanelButton label="Economics" icon="apps" size="S" />
              <PanelButton label="Charts" icon="info" size="S" />
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
                  <td>Section title text (required)</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'XS' | 'S' | 'M'</code></td>
                  <td><code>'S'</code></td>
                  <td>Title size (M: 14px, S: 12px, XS: 11px)</td>
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
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="PanelSectionTitle — Basic Usage"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="PanelSectionTitle — Sizes"
        code={sizesCode}
      />
      <CodeModal
        isOpen={openModal === 'context'}
        onClose={() => setOpenModal(null)}
        title="PanelSectionTitle — In Panel Context"
        code={contextCode}
      />
    </div>
  );
}
