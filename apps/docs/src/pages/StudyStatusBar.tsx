import { useState } from 'react';
import { StudyStatusBar, Tab, Button, Icon } from '@as-designsystem/core';
import '@as-designsystem/core/StudyStatusBar.css';
import '@as-designsystem/core/Spinner.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/Tab.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './StudyStatusBar.css';

export default function StudyStatusBarPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { StudyStatusBar } from '@/design-system/composites/StudyStatusBar';
import { Button } from '@/design-system/components/Button';

{/* Ready */}
<StudyStatusBar
  status="Ready"
  title="Inputs ready"
  description="You can compute the study."
  actions={<Button label="COMPUTE STUDY" size="M" onClick={() => computeStudy()} />}
/>

{/* Not Ready */}
<StudyStatusBar
  status="NotReady"
  title="Inputs not ready"
  description="Check and fix the errors."
  actions={<Button label="COMPUTE STUDY" size="M" disabled />}
/>

{/* Computing */}
<StudyStatusBar
  status="Computing"
  title="Computing..."
  description="Study is being computed."
  actions={<Button label="CANCEL COMPUTATION" variant="Ghost" size="M" />}
/>

{/* Modified */}
<StudyStatusBar
  status="Modified"
  title="Inputs modified"
  description="Results may be outdated."
  actions={
    <>
      <Button label="CANCEL MODIFICATION" variant="Ghost" size="M" />
      <Button label="RECOMPUTE" leftIcon="autorenew" size="M" />
    </>
  }
/>

{/* Failed */}
<StudyStatusBar
  status="Failed"
  title="Computation failed"
  description="An error occurred during computation."
  actions={
    <>
      <Button label="VIEW LOGS" variant="Ghost" size="M" />
      <Button label="RECOMPUTE" leftIcon="autorenew" size="M" />
    </>
  }
/>`;

  const customIconCode = `import { StudyStatusBar } from '@/design-system/composites/StudyStatusBar';
import { Button } from '@/design-system/components/Button';

<StudyStatusBar
  status="Ready"
  icon="flight"
  title="Flight plan ready"
  description="All parameters are set."
  actions={<Button label="COMPUTE STUDY" size="M" onClick={() => computeStudy()} />}
/>`;

  const customContentCode = `import { StudyStatusBar } from '@/design-system/composites/StudyStatusBar';
import { Button, Icon } from '@/design-system/components';

{/* showStatusIcon=false: the custom children carry their own icons */}
<StudyStatusBar
  status="Ready"
  showStatusIcon={false}
  actions={<Button label="RECOMPUTE PERFORMANCE" size="M" />}
>
  <span className="status-item">
    <Icon name="check" size={20} color="var(--primary-default)" />
    500/537 Flights succeeded
  </span>
  <span className="status-item">
    <Icon name="close" size={20} color="var(--feedback-error-default)" />
    37 Flights failed
  </span>
</StudyStatusBar>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          StudyStatusBar
        </h1>
        <InstallCommand componentName="study-status-bar" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A horizontal status bar that indicates the current state of a study computation.
        Displays a colored left border, status icon, title/description, and action buttons.
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
                All Statuses
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="example-container">
              <div className="study-status-bar-demo">
                <StudyStatusBar
                  status="Ready"
                  title="Inputs ready"
                  description="You can compute the study."
                  actions={<Button label="COMPUTE STUDY" size="M" onClick={() => console.log('Compute study')} />}
                />
                <StudyStatusBar
                  status="NotReady"
                  title="Inputs not ready"
                  description="Check and fix the errors."
                  actions={<Button label="COMPUTE STUDY" size="M" disabled />}
                />
                <StudyStatusBar
                  status="Computing"
                  title="Computing..."
                  description="Study is being computed."
                  actions={<Button label="CANCEL COMPUTATION" variant="Ghost" size="M" onClick={() => console.log('Cancel')} />}
                />
                <StudyStatusBar
                  status="Modified"
                  title="Inputs modified"
                  description="Results may be outdated."
                  actions={
                    <>
                      <Button label="CANCEL MODIFICATION" variant="Ghost" size="M" onClick={() => console.log('Cancel')} />
                      <Button label="RECOMPUTE" leftIcon="autorenew" size="M" onClick={() => console.log('Recompute')} />
                    </>
                  }
                />
                <StudyStatusBar
                  status="Failed"
                  title="Computation failed"
                  description="An error occurred during computation."
                  actions={
                    <>
                      <Button label="VIEW LOGS" variant="Ghost" size="M" onClick={() => console.log('View logs')} />
                      <Button label="RECOMPUTE" leftIcon="autorenew" size="M" onClick={() => console.log('Recompute')} />
                    </>
                  }
                />
              </div>
            </div>
          </section>

          {/* Custom Icon */}
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
                Custom Icon
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('customIcon')}
              />
            </div>
            <div className="example-container">
              <div className="study-status-bar-demo">
                <StudyStatusBar
                  status="Ready"
                  icon="flight"
                  title="Flight plan ready"
                  description="All parameters are set."
                  actions={<Button label="COMPUTE STUDY" size="M" onClick={() => console.log('Compute')} />}
                />
              </div>
            </div>
          </section>

          {/* Custom Content */}
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
                Custom Content
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('customContent')}
              />
            </div>
            <div className="example-container">
              <div className="study-status-bar-demo">
                <StudyStatusBar
                  status="Ready"
                  showStatusIcon={false}
                  actions={<Button label="RECOMPUTE PERFORMANCE" size="M" onClick={() => console.log('Recompute')} />}
                >
                  <span className="status-item label-regular-s">
                    <Icon name="check" size={20} color="var(--primary-default, #063b9e)" />
                    500/537 Flights succeeded
                  </span>
                  <span className="status-item label-regular-s">
                    <Icon name="close" size={20} color="var(--feedback-error-default, #e4002b)" />
                    37 Flights failed
                  </span>
                </StudyStatusBar>
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
                  <td><code>status</code></td>
                  <td><code>'Ready' | 'NotReady' | 'Computing' | 'Modified' | 'Failed'</code></td>
                  <td>-</td>
                  <td>Current status of the study (required)</td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Title text displayed in the bar. Ignored when <code>children</code> is provided.</td>
                </tr>
                <tr>
                  <td><code>description</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Description text displayed below the title. Ignored when <code>children</code> is provided.</td>
                </tr>
                <tr>
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Free-form content that replaces the default title/description block.</td>
                </tr>
                <tr>
                  <td><code>showStatusIcon</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether to display the default status icon. Set to <code>false</code> when custom content carries its own icons.</td>
                </tr>
                <tr>
                  <td><code>actions</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Action elements displayed on the right (Button, IconButton, etc.)</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Custom icon name to override the default status icon. No effect on Computing status.</td>
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
        title="StudyStatusBar — All Statuses"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'customIcon'}
        onClose={() => setOpenModal(null)}
        title="StudyStatusBar — Custom Icon"
        code={customIconCode}
      />
      <CodeModal
        isOpen={openModal === 'customContent'}
        onClose={() => setOpenModal(null)}
        title="StudyStatusBar — Custom Content"
        code={customContentCode}
      />
    </div>
  );
}
