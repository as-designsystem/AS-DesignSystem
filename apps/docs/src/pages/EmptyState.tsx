import { useState } from 'react';
import { EmptyState, Button, Tab, Icon, emptyStateIllustrations, type EmptyStateIllustration } from '@as-designsystem/core';
import '@as-designsystem/core/EmptyState.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Icon.css';
import CodeModal from '../components/CodeModal';

const illustrationNames: EmptyStateIllustration[] = ['Box', 'Folder', 'Mail', 'Bell', 'Document', 'Image'];

export default function EmptyStatePage() {
  const [activeTab, setActiveTab] = useState<'examples' | 'usage'>('examples');
  const [openModal, setOpenModal] = useState<string | null>(null);

  const basicCode = `import { EmptyState, Button } from '@as-designsystem/core';
import '@as-designsystem/core/EmptyState.css';
import '@as-designsystem/core/Button.css';

<EmptyState
  illustration="Box"  // 'Box' | 'Folder' | 'Mail' | 'Bell' | 'Document' | 'Image'
  title="Your Fleet is empty"
  description="Please add flights or import a fleet"
  actions={
    <>
      <Button variant="Outlined" label="ADD AIRCRAFT" leftIcon="add" />
      <Button variant="Default" label="IMPORT FLEET" leftIcon="download" />
    </>
  }
/>`;

  const customIconCode = `import { EmptyState, Button, Icon } from '@as-designsystem/core';
import '@as-designsystem/core/EmptyState.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/Icon.css';

<EmptyState
  icon={<Icon name="search" size={80} />}
  title="No results found"
  description="Try adjusting your search or filters"
  actions={
    <Button variant="Outlined" label="CLEAR FILTERS" leftIcon="close" />
  }
/>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        EmptyState
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A placeholder component displayed when content is empty or unavailable.
        Shows an illustrative icon, title, description, and optional action buttons.
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
              label="Usage"
              size="M"
              status={activeTab === 'usage' ? 'Active' : 'Default'}
              onClick={() => setActiveTab('usage')}
            />
          </div>
        </div>
      </div>

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
            <div
              className="example-container"
              style={{
                padding: '48px 24px',
                backgroundColor: 'var(--background-main, #ffffff)',
                border: '1px solid var(--border-minimal, #eff1f4)',
              }}
            >
              <EmptyState
                illustration="Box"
                title="Your Fleet is empty"
                description="Please add flights or import a fleet"
                actions={
                  <>
                    <Button variant="Outlined" label="ADD AIRCRAFT" leftIcon="add" />
                    <Button variant="Default" label="IMPORT FLEET" leftIcon="download" />
                  </>
                }
              />
            </div>
          </section>

          {/* Sizes */}
          <section className="component-section">
            <h2
              className="heading-6"
              style={{
                marginTop: '32px',
                marginBottom: '16px',
                color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
              }}
            >
              Sizes
            </h2>
            <div
              className="example-container"
              style={{
                padding: '24px',
                backgroundColor: 'var(--background-main, #ffffff)',
                border: '1px solid var(--border-minimal, #eff1f4)',
                display: 'flex',
                gap: '48px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              {/* Size M */}
              <div style={{ flex: '1', minWidth: '280px', maxWidth: '400px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', textAlign: 'center' }}>Size M (default)</p>
                <EmptyState
                  size="M"
                  illustration="Folder"
                  title="No files yet"
                  description="Upload your first file to get started"
                  actions={
                    <Button variant="Default" label="UPLOAD" leftIcon="add" size="M" />
                  }
                />
              </div>
              {/* Size S */}
              <div style={{ flex: '1', minWidth: '240px', maxWidth: '320px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', textAlign: 'center' }}>Size S</p>
                <EmptyState
                  size="S"
                  illustration="Mail"
                  title="No messages"
                  description="Your inbox is empty"
                  actions={
                    <Button variant="Default" label="COMPOSE" leftIcon="add" size="S" />
                  }
                />
              </div>
              {/* Size XS */}
              <div style={{ flex: '1', minWidth: '200px', maxWidth: '260px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', textAlign: 'center' }}>Size XS</p>
                <EmptyState
                  size="XS"
                  illustration="Bell"
                  title="No notifications"
                  description="You're all caught up"
                  actions={
                    <Button variant="Outlined" label="SETTINGS" size="XS" />
                  }
                />
              </div>
            </div>
          </section>

          {/* Custom Icon Example */}
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
                onClick={() => setOpenModal('custom')}
              />
            </div>
            <div
              className="example-container"
              style={{
                padding: '48px 24px',
                backgroundColor: 'var(--background-main, #ffffff)',
                border: '1px solid var(--border-minimal, #eff1f4)',
              }}
            >
              <EmptyState
                icon={<Icon name="search" size={80} />}
                title="No results found"
                description="Try adjusting your search or filters"
                actions={
                  <Button variant="Outlined" label="CLEAR FILTERS" leftIcon="close" />
                }
              />
            </div>
          </section>

          {/* Available Illustrations */}
          <section className="component-section">
            <h2
              className="heading-6"
              style={{
                marginTop: '32px',
                marginBottom: '16px',
                color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
              }}
            >
              Available Illustrations
            </h2>
            <div
              className="example-container"
              style={{
                padding: '24px',
                backgroundColor: 'var(--background-main, #ffffff)',
                border: '1px solid var(--border-minimal, #eff1f4)',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'center', alignItems: 'flex-end' }}>
                {illustrationNames.map((name) => (
                  <div key={name} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        color: 'var(--text-tertiary, #8e99ab)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      className="illustration-preview"
                    >
                      {emptyStateIllustrations[name]}
                    </div>
                    <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>{name}</p>
                  </div>
                ))}
              </div>
              <style>{`
                .illustration-preview svg {
                  width: 100%;
                  height: 100%;
                }
              `}</style>
            </div>
            <p
              className="label-regular-s"
              style={{
                marginTop: '12px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Use the <code>illustration</code> prop with one of these values, or provide your own custom image via the <code>icon</code> prop.
            </p>
          </section>
        </>
      )}

      {activeTab === 'usage' && (
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
                Basic Usage
              </h2>
            </div>
            <div className="example-container">
              <pre
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--background-tertiary, #eff1f4)',
                  borderRadius: '4px',
                  fontSize: '13px',
                  overflow: 'auto',
                }}
              >
                <code>{basicCode}</code>
              </pre>
            </div>
          </section>

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
            <div className="example-container">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Prop</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Default</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', fontWeight: 600 }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>size</code></td>
                    <td style={{ padding: '12px 8px' }}>'M' | 'S' | 'XS'</td>
                    <td style={{ padding: '12px 8px' }}>'M'</td>
                    <td style={{ padding: '12px 8px' }}>Size variant</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>illustration</code></td>
                    <td style={{ padding: '12px 8px' }}>'Box' | 'Folder' | 'Mail' | 'Bell' | 'Document' | 'Image'</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Built-in illustration name</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>icon</code></td>
                    <td style={{ padding: '12px 8px' }}>ReactNode</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Custom icon or image (use this OR illustration)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>title</code></td>
                    <td style={{ padding: '12px 8px' }}>string</td>
                    <td style={{ padding: '12px 8px' }}>required</td>
                    <td style={{ padding: '12px 8px' }}>Title text</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>description</code></td>
                    <td style={{ padding: '12px 8px' }}>string</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Description text</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-minimal)' }}>
                    <td style={{ padding: '12px 8px' }}><code>actions</code></td>
                    <td style={{ padding: '12px 8px' }}>ReactNode</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Action buttons or any custom content</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 8px' }}><code>className</code></td>
                    <td style={{ padding: '12px 8px' }}>string</td>
                    <td style={{ padding: '12px 8px' }}>-</td>
                    <td style={{ padding: '12px 8px' }}>Additional CSS class</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="EmptyState"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'custom'}
        onClose={() => setOpenModal(null)}
        title="EmptyState with Custom Icon"
        code={customIconCode}
      />
    </div>
  );
}
