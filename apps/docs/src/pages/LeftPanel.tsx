import { useState } from 'react';
import { LeftPanel, PanelHeader, PanelButton, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/LeftPanel.css';
import '@as-design-system/core/PanelHeader.css';
import '@as-design-system/core/PanelStudyName.css';
import '@as-design-system/core/PanelButton.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/Tooltip.css';
import '@as-design-system/core/Tab.css';
import CodeModal from '../components/CodeModal';
import './LeftPanel.css';

export default function LeftPanelPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { LeftPanel } from '@/design-system/composites/LeftPanel';
import { PanelHeader } from '@/design-system/composites/PanelHeader';
import { PanelButton } from '@/design-system/components/PanelButton';

<LeftPanel
  header={
    <PanelHeader
      studyName="My Study"
      onBackHome={() => navigate('/')}
      onStudyNameClick={() => openRenameDialog()}
      onDuplicate={() => duplicateStudy()}
    />
  }
  footer={
    <>
      <PanelButton icon="info" label="Need Help?" />
      <PanelButton icon="construction" label="Glossary" />
    </>
  }
>
  {/* Your panel content here */}
</LeftPanel>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        LeftPanel
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A full-height side panel with a dark corporate background. Contains a header
        (typically PanelHeader), a scrollable content body, and an optional footer
        separated by a border.
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
          {/* Example */}
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
                Example
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="left-panel-demo">
              <LeftPanel
                header={
                  <PanelHeader
                    studyName="My Study"
                    onBackHome={() => console.log('Back home')}
                    onStudyNameClick={() => console.log('Edit study name')}
                    onDuplicate={() => console.log('Duplicate study')}
                    backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop"
                  />
                }
                footer={
                  <>
                    <PanelButton icon="info" label="Need Help?" />
                    <PanelButton icon="construction" label="Glossary" />
                  </>
                }
              >
                <div className="left-panel-body-section">
                  <span className="left-panel-section-title">Inputs</span>
                  <div className="left-panel-section-items">
                    <PanelButton icon="settings" label="Input Page 1" variant="Selected" />
                    <PanelButton icon="AIR_fleet" label="Input Page 2" showError errorCount={2} />
                    <PanelButton icon="AIR_engine" label="Input Page 3" />
                    <PanelButton icon="AIR_side" label="Input Page 4" />
                  </div>
                </div>
                <div className="left-panel-body-section">
                  <span className="left-panel-section-title left-panel-section-title--disabled">Results</span>
                  <div className="left-panel-section-items">
                    <PanelButton icon="AIR_airport" label="Results Page 1" variant="Disabled" />
                    <PanelButton icon="AIR_departure" label="Results Page 2" variant="Disabled" />
                  </div>
                </div>
              </LeftPanel>
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
                  <td><code>header</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Header content, typically a PanelHeader composite</td>
                </tr>
                <tr>
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Main scrollable content area</td>
                </tr>
                <tr>
                  <td><code>footer</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Optional footer content with top border separator</td>
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
        title="LeftPanel Example"
        code={basicCode}
      />
    </div>
  );
}
