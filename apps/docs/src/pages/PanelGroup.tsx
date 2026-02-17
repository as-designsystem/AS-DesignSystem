import { useState } from 'react';
import { PanelGroup, IconButton, Tab, Button, PanelSectionTitle, PanelButton } from '@as-design-system/core';
import '@as-design-system/core/PanelGroup.css';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/PanelSectionTitle.css';
import '@as-design-system/core/PanelButton.css';
import '@as-design-system/core/Tooltip.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './PanelGroup.css';

export default function PanelGroupPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  // Demo states
  const [openGroup1, setOpenGroup1] = useState(true);
  const [openGroup2, setOpenGroup2] = useState(false);
  const [openGroupCtx1, setOpenGroupCtx1] = useState(true);
  const [openGroupCtx2, setOpenGroupCtx2] = useState(false);

  const basicCode = `import { PanelGroup } from '@/design-system/components/PanelGroup';

const [isOpen, setIsOpen] = useState(true);

<PanelGroup
  label="Inputs"
  open={isOpen}
  onClick={() => setIsOpen(!isOpen)}
/>`;

  const sizesCode = `import { PanelGroup } from '@/design-system/components/PanelGroup';

<PanelGroup label="Size M" size="M" open={true} />
<PanelGroup label="Size S" size="S" open={true} />
<PanelGroup label="Size XS" size="XS" open={true} />`;

  const iconCode = `import { PanelGroup } from '@/design-system/components/PanelGroup';

<PanelGroup
  label="Scenario 1"
  icon="database"
  open={isOpen}
  size="S"
  onClick={() => setIsOpen(!isOpen)}
/>`;

  const actionsCode = `import { PanelGroup } from '@/design-system/components/PanelGroup';
import { IconButton } from '@/design-system/components/IconButton';

<PanelGroup
  label="Scenario 1"
  open={isOpen}
  onClick={() => setIsOpen(!isOpen)}
  actions={
    <>
      <IconButton icon="edit" size="XS" variant="Ghost" />
      <IconButton icon="content_copy" size="XS" variant="Ghost" />
      <IconButton icon="delete" size="XS" variant="Ghost" />
    </>
  }
/>`;

  const contextCode = `import { PanelGroup } from '@/design-system/components/PanelGroup';
import { PanelSectionTitle } from '@/design-system/components/PanelSectionTitle';
import { PanelButton } from '@/design-system/components/PanelButton';
import { IconButton } from '@/design-system/components/IconButton';

<PanelSectionTitle label="Inputs" size="S" />
<PanelGroup
  label="Fleet"
  open={openFleet}
  onClick={() => setOpenFleet(!openFleet)}
  actions={
    <>
      <IconButton icon="edit" size="XS" variant="Ghost" />
      <IconButton icon="content_copy" size="XS" variant="Ghost" />
    </>
  }
/>
{openFleet && (
  <>
    <PanelButton label="A320" icon="AIR_fleet" size="S" />
    <PanelButton label="A330" icon="AIR_fleet" size="S" />
  </>
)}

<PanelGroup
  label="Mission"
  open={openMission}
  onClick={() => setOpenMission(!openMission)}
/>`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        PanelGroup
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        A collapsible group header for dark corporate panels. Displays an arrow indicator, a label,
        and optional action buttons visible on hover.
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
            <div className="example-container--dark">
              <div className="panel-group-demo-area panel-group-demo-area--narrow">
                <PanelGroup
                  label="Inputs"
                  open={openGroup1}
                  onClick={() => setOpenGroup1(!openGroup1)}
                />
                <PanelGroup
                  label="Results"
                  open={openGroup2}
                  onClick={() => setOpenGroup2(!openGroup2)}
                />
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
            <div className="example-container--dark">
              <div className="panel-group-demo-area">
                <div className="panel-group-demo-row">
                  <div className="panel-group-demo-item">
                    <span className="demo-label">M (40px)</span>
                    <PanelGroup label="Size M" size="M" open={true} />
                  </div>
                  <div className="panel-group-demo-item">
                    <span className="demo-label">S (32px)</span>
                    <PanelGroup label="Size S" size="S" open={true} />
                  </div>
                  <div className="panel-group-demo-item">
                    <span className="demo-label">XS (24px)</span>
                    <PanelGroup label="Size XS" size="XS" open={true} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* With Icon */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                With Icon
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('icon')}
              />
            </div>
            <div className="example-container--dark">
              <div className="panel-group-demo-area panel-group-demo-area--narrow">
                <PanelGroup
                  label="Scenario 1"
                  icon="database"
                  open={true}
                  size="S"
                />
                <PanelGroup
                  label="Scenario 2"
                  icon="database"
                  open={false}
                  size="S"
                />
              </div>
            </div>
          </section>

          {/* With Actions */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                With Actions (hover to reveal)
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('actions')}
              />
            </div>
            <div className="example-container--dark">
              <div className="panel-group-demo-area panel-group-demo-area--narrow">
                <PanelGroup
                  label="Scenario 1"
                  open={true}
                  size="S"
                  actions={
                    <>
                      <IconButton icon="edit" size="XS" variant="Ghost" />
                      <IconButton icon="content_copy" size="XS" variant="Ghost" />
                      <IconButton icon="delete" size="XS" variant="Ghost" />
                    </>
                  }
                />
                <PanelGroup
                  label="Scenario 2"
                  open={false}
                  size="S"
                  actions={
                    <>
                      <IconButton icon="edit" size="XS" variant="Ghost" />
                      <IconButton icon="content_copy" size="XS" variant="Ghost" />
                      <IconButton icon="delete" size="XS" variant="Ghost" />
                    </>
                  }
                />
              </div>
            </div>
          </section>

          {/* In Panel Context */}
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
            <div className="example-container--dark">
              <div className="panel-group-demo-area panel-group-demo-area--narrow">
                <PanelSectionTitle label="Inputs" size="S" />
                <PanelGroup
                  label="Fleet"
                  open={openGroupCtx1}
                  onClick={() => setOpenGroupCtx1(!openGroupCtx1)}
                  size="S"
                  actions={
                    <>
                      <IconButton icon="edit" size="XS" variant="Ghost" />
                      <IconButton icon="content_copy" size="XS" variant="Ghost" />
                    </>
                  }
                />
                {openGroupCtx1 && (
                  <>
                    <PanelButton label="A320" icon="AIR_fleet" size="S" />
                    <PanelButton label="A330" icon="AIR_fleet" size="S" />
                  </>
                )}
                <PanelGroup
                  label="Mission"
                  open={openGroupCtx2}
                  onClick={() => setOpenGroupCtx2(!openGroupCtx2)}
                  size="S"
                />
                {openGroupCtx2 && (
                  <>
                    <PanelButton label="Route 1" icon="AIR_side" size="S" />
                    <PanelButton label="Route 2" icon="AIR_side" size="S" />
                  </>
                )}
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
                  <td>Group label text (required)</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                  <td>Optional icon name displayed before the label</td>
                </tr>
                <tr>
                  <td><code>open</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether the group is expanded</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'XS' | 'S' | 'M'</code></td>
                  <td><code>'S'</code></td>
                  <td>Size of the header row (M: 40px, S: 32px, XS: 24px)</td>
                </tr>
                <tr>
                  <td><code>actions</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>-</code></td>
                  <td>Action elements shown on hover (IconButton, etc.)</td>
                </tr>
                <tr>
                  <td><code>onClick</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td><code>-</code></td>
                  <td>Click handler for toggling open/close</td>
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
        title="PanelGroup — Basic Usage"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="PanelGroup — Sizes"
        code={sizesCode}
      />
      <CodeModal
        isOpen={openModal === 'icon'}
        onClose={() => setOpenModal(null)}
        title="PanelGroup — With Icon"
        code={iconCode}
      />
      <CodeModal
        isOpen={openModal === 'actions'}
        onClose={() => setOpenModal(null)}
        title="PanelGroup — With Actions"
        code={actionsCode}
      />
      <CodeModal
        isOpen={openModal === 'context'}
        onClose={() => setOpenModal(null)}
        title="PanelGroup — In Panel Context"
        code={contextCode}
      />
    </div>
  );
}
