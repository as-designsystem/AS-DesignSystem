import { useState } from 'react';
import { Workspace, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/Workspace.css';
import '@as-design-system/core/Avatar.css';
import '@as-design-system/core/Spinner.css';
import '@as-design-system/core/Icon.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Workspace.css';

export default function WorkspacePage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { Workspace } from '@/design-system/composites/Workspace';

<Workspace
  title="My Workspace"
  studyCount={12}
  lastModified="Jan 15, 2025"
  users={[
    { initials: 'MT', name: 'Mark Thompson' },
    { initials: 'JD', name: 'Jane Doe' },
    { initials: 'AB', name: 'Alice Brown' },
  ]}
>
  <p>Folder content here...</p>
</Workspace>`;

  const expandedCode = `import { Workspace } from '@/design-system/composites/Workspace';

<Workspace
  title="My Workspace"
  studyCount={8}
  lastModified="Dec 20, 2024"
  users={[{ initials: 'MT', name: 'Mark Thompson' }, { initials: 'JD', name: 'Jane Doe' }]}
  defaultOpen
>
  <div>Study 1 — A320 Fleet Analysis</div>
  <div>Study 2 — Route Optimization</div>
  <div>Study 3 — Maintenance Forecast</div>
</Workspace>`;

  const computingCode = `import { Workspace } from '@/design-system/composites/Workspace';

<Workspace
  title="Production Workspace"
  studyCount={5}
  computingText="3 Computing"
  isComputing
  lastModified="Jan 27, 2025"
  users={[
    { initials: 'MT', name: 'Mark Thompson' },
    { initials: 'JD', name: 'Jane Doe' },
    { initials: 'AB', name: 'Alice Brown' },
    { initials: 'KL', name: 'Kevin Lee' },
  ]}
  maxAvatars={3}
  defaultOpen
>
  <div>Study content...</div>
</Workspace>`;

  const controlledCode = `import { useState } from 'react';
import { Workspace } from '@/design-system/composites/Workspace';

const [isOpen, setIsOpen] = useState(false);

<Workspace
  title="Controlled Workspace"
  studyCount={3}
  open={isOpen}
  onToggle={setIsOpen}
>
  <div>Controlled content...</div>
</Workspace>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        Workspace
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A collapsible workspace card with folder icon, study count chip, computing state,
        last modified date, and user avatar stack.
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
          {/* Collapsed (Default) */}
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
                Collapsed (Default)
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="workspace-demo">
              <Workspace
                title="My Workspace"
                studyCount={12}
                lastModified="Jan 15, 2025"
                users={[
                  { initials: 'MT', name: 'Mark Thompson' },
                  { initials: 'JD', name: 'Jane Doe' },
                  { initials: 'AB', name: 'Alice Brown' },
                ]}
              >
                <p className="label-regular-s" style={{ color: 'var(--text-main, #14171d)' }}>
                  Folder content here...
                </p>
              </Workspace>
            </div>
          </section>

          {/* Expanded */}
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
                Expanded
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('expanded')}
              />
            </div>
            <div className="workspace-demo">
              <Workspace
                title="My Workspace"
                studyCount={8}
                lastModified="Dec 20, 2024"
                users={[{ initials: 'MT', name: 'Mark Thompson' }, { initials: 'JD', name: 'Jane Doe' }]}
                defaultOpen
              >
                <div className="workspace-demo__study-item">Study 1 — A320 Fleet Analysis</div>
                <div className="workspace-demo__study-item">Study 2 — Route Optimization</div>
                <div className="workspace-demo__study-item">Study 3 — Maintenance Forecast</div>
              </Workspace>
            </div>
          </section>

          {/* Computing State */}
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
                Computing State
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('computing')}
              />
            </div>
            <div className="workspace-demo">
              <Workspace
                title="Production Workspace"
                studyCount={5}
                computingText="3 Computing"
                isComputing
                lastModified="Jan 27, 2025"
                users={[
                  { initials: 'MT', name: 'Mark Thompson' },
                  { initials: 'JD', name: 'Jane Doe' },
                  { initials: 'AB', name: 'Alice Brown' },
                  { initials: 'KL', name: 'Kevin Lee' },
                ]}
                maxAvatars={3}
                defaultOpen
              >
                <div className="workspace-demo__study-item">Study 1 — Running simulation...</div>
                <div className="workspace-demo__study-item">Study 2 — Processing data...</div>
              </Workspace>
            </div>
          </section>

          {/* Controlled */}
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
                Controlled
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('controlled')}
              />
            </div>
            <div className="workspace-demo">
              <ControlledWorkspaceExample />
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
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Workspace title</td>
                </tr>
                <tr>
                  <td><code>studyCount</code></td>
                  <td><code>number</code></td>
                  <td>-</td>
                  <td>Number of studies (renders "N Studies" chip)</td>
                </tr>
                <tr>
                  <td><code>computingText</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Computing label (e.g. "3 Computing")</td>
                </tr>
                <tr>
                  <td><code>isComputing</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether to show the spinner</td>
                </tr>
                <tr>
                  <td><code>lastModified</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Last modified date/time string</td>
                </tr>
                <tr>
                  <td><code>users</code></td>
                  <td><code>WorkspaceUser[]</code></td>
                  <td>-</td>
                  <td>Users to display as avatar stack. Each user has <code>initials</code>, optional <code>name</code> (shown on hover), and optional <code>color</code>.</td>
                </tr>
                <tr>
                  <td><code>maxAvatars</code></td>
                  <td><code>number</code></td>
                  <td><code>3</code></td>
                  <td>Maximum visible avatars</td>
                </tr>
                <tr>
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Collapsible content</td>
                </tr>
                <tr>
                  <td><code>defaultOpen</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether initially open</td>
                </tr>
                <tr>
                  <td><code>open</code></td>
                  <td><code>boolean</code></td>
                  <td>-</td>
                  <td>Controlled open state</td>
                </tr>
                <tr>
                  <td><code>onToggle</code></td>
                  <td><code>(open: boolean) =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback when toggled</td>
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

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Workspace — Collapsed"
        sections={[{ title: 'Workspace.tsx', language: 'tsx', code: basicCode }]}
      />
      <CodeModal
        isOpen={openModal === 'expanded'}
        onClose={() => setOpenModal(null)}
        title="Workspace — Expanded"
        sections={[{ title: 'Workspace.tsx', language: 'tsx', code: expandedCode }]}
      />
      <CodeModal
        isOpen={openModal === 'computing'}
        onClose={() => setOpenModal(null)}
        title="Workspace — Computing State"
        sections={[{ title: 'Workspace.tsx', language: 'tsx', code: computingCode }]}
      />
      <CodeModal
        isOpen={openModal === 'controlled'}
        onClose={() => setOpenModal(null)}
        title="Workspace — Controlled"
        sections={[{ title: 'Workspace.tsx', language: 'tsx', code: controlledCode }]}
      />
    </div>
  );
}

function ControlledWorkspaceExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button
        label={isOpen ? 'CLOSE' : 'OPEN'}
        size="S"
        variant="Outlined"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Workspace
        title="Controlled Workspace"
        studyCount={3}
        open={isOpen}
        onToggle={setIsOpen}
      >
        <p className="label-regular-s" style={{ color: 'var(--text-main, #14171d)' }}>
          This workspace is controlled externally via the button above.
        </p>
      </Workspace>
    </div>
  );
}
