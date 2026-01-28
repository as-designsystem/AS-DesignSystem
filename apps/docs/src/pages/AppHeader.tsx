import { useState } from 'react';
import { AppHeader, IconButton, Button, Tab } from '@as-design-system/core';
import '@as-design-system/core/AppHeader.css';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/Tab.css';
import CodeModal from '../components/CodeModal';
import './AppHeader.css';

export default function AppHeaderPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { AppHeader } from '@/design-system/composites/AppHeader';
import { IconButton } from '@/design-system/components/IconButton';
import { Button } from '@/design-system/components/Button';

function Example() {
  return (
    <AppHeader
      appName="Maintenance Scheduler"
      actions={
        <>
          <IconButton icon="notifications" variant="Ghost" />
          <IconButton icon="settings" variant="Ghost" />
          <IconButton icon="apps" variant="Ghost" />
          <Button
            label="Mark Thompson"
            rightIcon="account_circle"
            variant="Ghost"
            size="M"
          />
        </>
      }
    />
  );
}`;

  const minimalCode = `import { AppHeader } from '@/design-system/composites/AppHeader';

// Minimal AppHeader with just app name
// Logo (Airbus) and subtitle (By Airline Sciences) are always displayed
<AppHeader appName="My Application" />`;

  const customActionsCode = `import { AppHeader } from '@/design-system/composites/AppHeader';
import { IconButton } from '@/design-system/components/IconButton';
import { Button } from '@/design-system/components/Button';

// Custom actions with different buttons
<AppHeader
  appName="Fleet Manager"
  actions={
    <>
      <IconButton icon="dark_mode" variant="Ghost" onClick={toggleTheme} />
      <IconButton icon="notifications" variant="Ghost" />
      <IconButton icon="settings" variant="Ghost" />
      <Button
        label="John Doe"
        rightIcon="account_circle"
        variant="Ghost"
        size="M"
        onClick={handleUserClick}
      />
    </>
  }
/>`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        AppHeader
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        Application header component with Airbus logo, app name, and action buttons.
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
          {/* Basic Usage */}
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
            <div className="example-container">
              <div className="appheader-example">
                <AppHeader
                  appName="Maintenance Scheduler"
                  actions={
                    <>
                      <IconButton icon="notifications" variant="Ghost" size="M" />
                      <IconButton icon="settings" variant="Ghost" size="M" />
                      <IconButton icon="apps" variant="Ghost" size="M" />
                      <Button
                        label="Mark Thompson"
                        rightIcon="account_circle"
                        variant="Ghost"
                        size="M"
                      />
                    </>
                  }
                />
              </div>
            </div>
          </section>

          {/* Minimal */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Minimal
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('minimal')}
              />
            </div>
            <div className="example-container">
              <div className="appheader-example">
                <AppHeader appName="My Application" />
              </div>
            </div>
          </section>

          {/* With Custom Actions */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                With Custom Actions
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('customActions')}
              />
            </div>
            <div className="example-container">
              <div className="appheader-example">
                <AppHeader
                  appName="Fleet Manager"
                  actions={
                    <>
                      <IconButton icon="dark_mode" variant="Ghost" size="M" />
                      <IconButton icon="notifications" variant="Ghost" size="M" />
                      <IconButton icon="settings" variant="Ghost" size="M" />
                      <Button
                        label="John Doe"
                        rightIcon="account_circle"
                        variant="Ghost"
                        size="M"
                      />
                    </>
                  }
                />
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
                  <td><code>appName</code></td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                  <td>Application name displayed in the header (required)</td>
                </tr>
                <tr>
                  <td><code>logoHref</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>URL to navigate when clicking the Airbus logo</td>
                </tr>
                <tr>
                  <td><code>actions</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>undefined</code></td>
                  <td>Action buttons displayed on the right side (IconButtons, Buttons, etc.)</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Additional class name for customization</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Fixed Elements
          </h2>
          <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-main, #14171d)' }}>
            The following elements are fixed and cannot be customized:
          </p>
          <ul style={{ marginLeft: '20px', color: 'var(--text-main, #14171d)' }}>
            <li><strong>Airbus Logo</strong> - Always displayed on the left</li>
            <li><strong>"By Airline Sciences"</strong> - Always displayed below the app name</li>
            <li><strong>Dark mode styling</strong> - Header always uses corporate blue background (#00205b)</li>
          </ul>

          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Styling Actions
          </h2>
          <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-main, #14171d)' }}>
            Components inside <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>actions</code> are automatically styled with light colors for visibility on the dark background. Use <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>variant="Ghost"</code> for IconButtons and Buttons.
          </p>
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Basic Usage"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'minimal'}
        onClose={() => setOpenModal(null)}
        title="Minimal AppHeader"
        code={minimalCode}
      />
      <CodeModal
        isOpen={openModal === 'customActions'}
        onClose={() => setOpenModal(null)}
        title="With Custom Actions"
        code={customActionsCode}
      />
    </div>
  );
}
