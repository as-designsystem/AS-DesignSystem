import { useState } from 'react';
import { StudyStatus, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/StudyStatus.css';
import '@as-design-system/core/Icon.css';
import '@as-design-system/core/Spinner.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './StudyStatus.css';

export default function StudyStatusPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const allStatesCode = `import { StudyStatus } from '@/design-system/components/StudyStatus';

<StudyStatus state="Computed" />
<StudyStatus state="Computing" />
<StudyStatus state="Failed" />
<StudyStatus state="Draft" />
<StudyStatus state="Warning" />`;

  const customLabelCode = `import { StudyStatus } from '@/design-system/components/StudyStatus';

<StudyStatus state="Computed" label="Terminé" />
<StudyStatus state="Computing" label="En cours..." />`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        StudyStatus
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Displays the computation status of a study with an icon and label. Used in study lists and study details.
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
          {/* All States */}
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
                onClick={() => setOpenModal('allStates')}
              />
            </div>
            <div className="example-container">
              <div className="study-status-demo-grid">
                <StudyStatus state="Computed" />
                <StudyStatus state="Computing" />
                <StudyStatus state="Failed" />
                <StudyStatus state="Draft" />
                <StudyStatus state="Warning" />
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
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('customLabel')}
              />
            </div>
            <div className="example-container">
              <div className="study-status-demo-grid">
                <StudyStatus state="Computed" label="Terminé" />
                <StudyStatus state="Computing" label="En cours..." />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
        <section className="props-section">
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
          <table className="props-table">
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
                <td><code>state</code></td>
                <td><code>'Computed' | 'Computing' | 'Failed' | 'Draft' | 'Warning'</code></td>
                <td>-</td>
                <td>Status state (required)</td>
              </tr>
              <tr>
                <td><code>label</code></td>
                <td><code>string</code></td>
                <td>state name</td>
                <td>Optional custom label</td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td><code>''</code></td>
                <td>Additional CSS class</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'allStates'}
        onClose={() => setOpenModal(null)}
        title="States"
        code={allStatesCode}
      />
      <CodeModal
        isOpen={openModal === 'customLabel'}
        onClose={() => setOpenModal(null)}
        title="Custom Labels"
        code={customLabelCode}
      />
    </div>
  );
}
