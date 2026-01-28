import { useState } from 'react';
import {
  StudyContextMenu,
  Tab,
  Button,
} from '@as-design-system/core';
import '@as-design-system/core/DropdownMenu.css';
import '@as-design-system/core/Icon.css';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/StudyContextMenu.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './StudyContextMenu.css';

export default function StudyContextMenuPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const draftCode = `import { StudyContextMenu } from '@/design-system/composites/StudyContextMenu';

<StudyContextMenu
  state="Draft"
  onEditInputs={() => console.log('Edit Inputs')}
  onDuplicateStudy={() => console.log('Duplicate Study')}
  onDeleteStudy={() => console.log('Delete Study')}
/>`;

  const computedCode = `import { StudyContextMenu } from '@/design-system/composites/StudyContextMenu';

<StudyContextMenu
  state="Computed"
  onOpenResults={() => console.log('Open Results')}
  onDownloadResults={() => console.log('Download Results')}
  onDuplicateStudy={() => console.log('Duplicate Study')}
  onDeleteStudy={() => console.log('Delete Study')}
/>`;

  const computingCode = `import { StudyContextMenu } from '@/design-system/composites/StudyContextMenu';

<StudyContextMenu
  state="Computing"
  onEditInputs={() => console.log('Edit Inputs')}
  onDuplicateStudy={() => console.log('Duplicate Study')}
  onDeleteStudy={() => console.log('Delete Study')}
/>`;

  const computingCancelCode = `import { StudyContextMenu } from '@/design-system/composites/StudyContextMenu';

<StudyContextMenu
  state="ComputingWithCancel"
  onViewInputs={() => console.log('View Inputs')}
  onDuplicateStudy={() => console.log('Duplicate Study')}
  onCancelComputation={() => console.log('Cancel Computation')}
  onDeleteStudy={() => console.log('Delete Study')}
/>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        StudyContextMenu
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A context menu for study actions. Displays different menu items based on the study
        computation state (Draft, Computed, Computing, ComputingWithCancel).
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
          {/* Draft */}
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
                Draft
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('draft')}
              />
            </div>
            <div className="example-container">
              <div className="study-context-menu-demo">
                <span className="label-regular-s" style={{ color: 'var(--text-secondary, #63728a)' }}>
                  Edit Inputs, Duplicate Study, Delete Study
                </span>
                <StudyContextMenu
                  state="Draft"
                  onEditInputs={() => console.log('Edit Inputs')}
                  onDuplicateStudy={() => console.log('Duplicate Study')}
                  onDeleteStudy={() => console.log('Delete Study')}
                />
              </div>
            </div>
          </section>

          {/* Computed */}
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
                Computed
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('computed')}
              />
            </div>
            <div className="example-container">
              <div className="study-context-menu-demo">
                <span className="label-regular-s" style={{ color: 'var(--text-secondary, #63728a)' }}>
                  Open Results, Download Results, Duplicate Study, Delete Study
                </span>
                <StudyContextMenu
                  state="Computed"
                  onOpenResults={() => console.log('Open Results')}
                  onDownloadResults={() => console.log('Download Results')}
                  onDuplicateStudy={() => console.log('Duplicate Study')}
                  onDeleteStudy={() => console.log('Delete Study')}
                />
              </div>
            </div>
          </section>

          {/* Computing */}
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
                Computing
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('computing')}
              />
            </div>
            <div className="example-container">
              <div className="study-context-menu-demo">
                <span className="label-regular-s" style={{ color: 'var(--text-secondary, #63728a)' }}>
                  Edit Inputs, Duplicate Study, Delete Study
                </span>
                <StudyContextMenu
                  state="Computing"
                  onEditInputs={() => console.log('Edit Inputs')}
                  onDuplicateStudy={() => console.log('Duplicate Study')}
                  onDeleteStudy={() => console.log('Delete Study')}
                />
              </div>
            </div>
          </section>

          {/* Computing with Cancel */}
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
                Computing with Cancel
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('computing-cancel')}
              />
            </div>
            <div className="example-container">
              <div className="study-context-menu-demo">
                <span className="label-regular-s" style={{ color: 'var(--text-secondary, #63728a)' }}>
                  View Inputs, Duplicate Study, Cancel Computation, Delete Study
                </span>
                <StudyContextMenu
                  state="ComputingWithCancel"
                  onViewInputs={() => console.log('View Inputs')}
                  onDuplicateStudy={() => console.log('Duplicate Study')}
                  onCancelComputation={() => console.log('Cancel Computation')}
                  onDeleteStudy={() => console.log('Delete Study')}
                />
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
            StudyContextMenu Props
          </h2>
          <div className="props-table-container">
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
                  <td><code>'Draft' | 'Computed' | 'Computing' | 'ComputingWithCancel'</code></td>
                  <td>-</td>
                  <td>Study state — determines which menu items are shown</td>
                </tr>
                <tr>
                  <td><code>onEditInputs</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback for "Edit Inputs" (Draft, Computing)</td>
                </tr>
                <tr>
                  <td><code>onViewInputs</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback for "View Inputs" (ComputingWithCancel)</td>
                </tr>
                <tr>
                  <td><code>onOpenResults</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback for "Open Results" (Computed)</td>
                </tr>
                <tr>
                  <td><code>onDownloadResults</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback for "Download Results" (Computed)</td>
                </tr>
                <tr>
                  <td><code>onDuplicateStudy</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback for "Duplicate Study" (all states)</td>
                </tr>
                <tr>
                  <td><code>onCancelComputation</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback for "Cancel Computation" (ComputingWithCancel)</td>
                </tr>
                <tr>
                  <td><code>onDeleteStudy</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback for "Delete Study" (all states, destructive)</td>
                </tr>
                <tr>
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td>IconButton (more_horiz)</td>
                  <td>Custom trigger element</td>
                </tr>
                <tr>
                  <td><code>align</code></td>
                  <td><code>'start' | 'center' | 'end'</code></td>
                  <td><code>'end'</code></td>
                  <td>Dropdown alignment relative to trigger</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'draft'}
        onClose={() => setOpenModal(null)}
        title="StudyContextMenu — Draft"
        sections={[{ title: 'StudyContextMenu.tsx', language: 'tsx', code: draftCode }]}
      />
      <CodeModal
        isOpen={openModal === 'computed'}
        onClose={() => setOpenModal(null)}
        title="StudyContextMenu — Computed"
        sections={[{ title: 'StudyContextMenu.tsx', language: 'tsx', code: computedCode }]}
      />
      <CodeModal
        isOpen={openModal === 'computing'}
        onClose={() => setOpenModal(null)}
        title="StudyContextMenu — Computing"
        sections={[{ title: 'StudyContextMenu.tsx', language: 'tsx', code: computingCode }]}
      />
      <CodeModal
        isOpen={openModal === 'computing-cancel'}
        onClose={() => setOpenModal(null)}
        title="StudyContextMenu — Computing with Cancel"
        sections={[{ title: 'StudyContextMenu.tsx', language: 'tsx', code: computingCancelCode }]}
      />
    </div>
  );
}
