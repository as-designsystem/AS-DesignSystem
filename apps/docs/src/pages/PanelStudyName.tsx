import { useState } from 'react';
import { PanelStudyName, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/PanelStudyName.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './PanelStudyName.css';

export default function PanelStudyNamePage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { PanelStudyName } from '@/design-system/components/PanelStudyName';

<PanelStudyName name="Study Name" onClick={() => console.log('Edit clicked')} />`;

  const multiLineCode = `import { PanelStudyName } from '@/design-system/components/PanelStudyName';

{/* Allow 2 lines before truncation */}
<div style={{ width: 238 }}>
  <PanelStudyName
    name="Very Long Study Name That Overflows Onto Multiple Lines"
    lines={2}
  />
</div>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        PanelStudyName
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A clickable study name label with an edit icon, designed for use inside dark corporate panels.
        The edit icon appears faded by default and becomes fully visible on hover.
        When the text overflows, a tooltip shows the full name on prolonged hover.
      </p>

      {/* Main Tabs */}
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
          {/* Default */}
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
                Default
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="example-container--dark">
              <div className="panel-study-name-demo">
                <div style={{ width: 238 }}>
                  <PanelStudyName name="Study Name" />
                </div>
                <div style={{ width: 238 }}>
                  <PanelStudyName name="Very Long Study Name That Overflows The Container" />
                </div>
              </div>
            </div>
          </section>

          {/* Multi-line */}
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
                Multi-line
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('multiline')}
              />
            </div>
            <div className="example-container--dark">
              <div className="panel-study-name-demo">
                <div style={{ width: 238 }}>
                  <PanelStudyName name="Very Long Study Name That Overflows Onto Multiple Lines In The Container" lines={2} />
                </div>
                <div style={{ width: 238 }}>
                  <PanelStudyName name="Very Long Study Name That Overflows Onto Multiple Lines In The Container" lines={3} />
                </div>
              </div>
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
                  <td><code>name</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>The study name to display (required)</td>
                </tr>
                <tr>
                  <td><code>lines</code></td>
                  <td><code>number</code></td>
                  <td><code>1</code></td>
                  <td>Number of visible lines before truncation with ellipsis</td>
                </tr>
                <tr>
                  <td><code>onClick</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Click handler (e.g., to open rename dialog)</td>
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
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Default"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'multiline'}
        onClose={() => setOpenModal(null)}
        title="Multi-line"
        code={multiLineCode}
      />
    </div>
  );
}
