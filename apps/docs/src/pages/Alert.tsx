import { useState, useCallback } from 'react';
import { Alert, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/Alert.css';
import '@as-designsystem/core/Icon.css';
import '@as-designsystem/core/IconButton.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './Alert.css';

export default function AlertPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [loaderKey, setLoaderKey] = useState(0);
  const [visibleAlerts, setVisibleAlerts] = useState<Record<string, boolean>>({
    error: true,
    warning: true,
    validated: true,
    info: true,
    loaderError: true,
    loaderWarning: true,
    loaderValidated: true,
    loaderInfo: true,
    actionBottom: true,
    actionRight: true,
  });

  const resetAlerts = () => {
    setVisibleAlerts({
      error: true,
      warning: true,
      validated: true,
      info: true,
      loaderError: true,
      loaderWarning: true,
      loaderValidated: true,
      loaderInfo: true,
      actionBottom: true,
      actionRight: true,
    });
    setLoaderKey((k) => k + 1);
  };

  const variantsCode = `import { Alert } from '@/design-system/components/Alert';

<Alert
  variant="Error"
  title="Error alert"
  description="Something went wrong. Please try again."
  onClose={() => {}}
/>
<Alert
  variant="Warning"
  title="Warning alert"
  description="This action may have unexpected consequences."
  onClose={() => {}}
/>
<Alert
  variant="Validated"
  title="Success alert"
  description="Your changes have been saved successfully."
  onClose={() => {}}
/>
<Alert
  variant="Info"
  title="Info alert"
  description="This is an informational message."
  onClose={() => {}}
/>`;

  const loaderCode = `import { Alert } from '@/design-system/components/Alert';

{/* Animated loader — completes in 5 seconds */}
<Alert
  variant="Error"
  title="Uploading file..."
  description="An error occurred during the upload."
  showLoader
  loaderDuration={5}
  onClose={() => {}}
/>

{/* Animated loader — completes in 10 seconds */}
<Alert
  variant="Warning"
  title="Processing data..."
  description="This may take a moment."
  showLoader
  loaderDuration={10}
  onClose={() => {}}
/>

{/* Animated loader — completes in 50 seconds */}
<Alert
  variant="Validated"
  title="Synchronizing..."
  description="Syncing your changes with the server."
  showLoader
  loaderDuration={50}
  onClose={() => {}}
/>

{/* Static progress — manual control */}
<Alert
  variant="Info"
  title="Downloading update..."
  description="100 seconds estimated."
  showLoader
  loaderDuration={100}
  onClose={() => {}}
/>`;

  const actionsCode = `import { Alert } from '@/design-system/components/Alert';

{/* Action bottom */}
<Alert
  variant="Warning"
  title="Session expiring"
  description="Your session will expire in 5 minutes."
  actionBottom={<button onClick={() => {}}>EXTEND SESSION</button>}
  onClose={() => {}}
/>

{/* Action right */}
<Alert
  variant="Info"
  title="New version available"
  description="A new version of the application is available."
  actionRight={<button onClick={() => {}}>UPDATE</button>}
  onClose={() => {}}
/>`;

  const noCloseCode = `import { Alert } from '@/design-system/components/Alert';

<Alert
  variant="Validated"
  title="Auto-saved"
  description="Your progress has been saved automatically."
  showCloseButton={false}
/>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Alert
        </h1>
        <InstallCommand componentName="alert" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Feedback banner for displaying contextual messages. Supports Error, Warning, Validated,
        and Info variants with optional loader, actions, and close button.
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
          {/* Variants */}
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
                Variants
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('variants')}
              />
            </div>
            <div className="example-container">
              <div className="alert-demo">
                {visibleAlerts.error && (
                  <Alert
                    variant="Error"
                    title="Error alert"
                    description="Something went wrong. Please try again."
                    onClose={() => setVisibleAlerts((prev) => ({ ...prev, error: false }))}
                  />
                )}
                {visibleAlerts.warning && (
                  <Alert
                    variant="Warning"
                    title="Warning alert"
                    description="This action may have unexpected consequences."
                    onClose={() => setVisibleAlerts((prev) => ({ ...prev, warning: false }))}
                  />
                )}
                {visibleAlerts.validated && (
                  <Alert
                    variant="Validated"
                    title="Success alert"
                    description="Your changes have been saved successfully."
                    onClose={() => setVisibleAlerts((prev) => ({ ...prev, validated: false }))}
                  />
                )}
                {visibleAlerts.info && (
                  <Alert
                    variant="Info"
                    title="Info alert"
                    description="This is an informational message."
                    onClose={() => setVisibleAlerts((prev) => ({ ...prev, info: false }))}
                  />
                )}
              </div>
            </div>
          </section>

          {/* With Loader */}
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
                With Loader
              </h2>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  label="Restart"
                  leftIcon="refresh"
                  size="S"
                  variant="Ghost"
                  onClick={() => setLoaderKey((k) => k + 1)}
                />
                <Button
                  label="Code"
                  leftIcon="code"
                  size="S"
                  variant="Outlined"
                  onClick={() => setOpenModal('loader')}
                />
              </div>
            </div>
            <div className="example-container">
              <div className="alert-demo" key={loaderKey}>
                {visibleAlerts.loaderError && (
                  <Alert
                    variant="Error"
                    title="Uploading file..."
                    description="An error occurred during the upload. (5s)"
                    showLoader
                    loaderDuration={5}
                    onClose={() =>
                      setVisibleAlerts((prev) => ({ ...prev, loaderError: false }))
                    }
                  />
                )}
                {visibleAlerts.loaderWarning && (
                  <Alert
                    variant="Warning"
                    title="Processing data..."
                    description="This may take a moment. (10s)"
                    showLoader
                    loaderDuration={10}
                    onClose={() =>
                      setVisibleAlerts((prev) => ({ ...prev, loaderWarning: false }))
                    }
                  />
                )}
                {visibleAlerts.loaderValidated && (
                  <Alert
                    variant="Validated"
                    title="Synchronizing..."
                    description="Syncing your changes with the server. (50s)"
                    showLoader
                    loaderDuration={50}
                    onClose={() =>
                      setVisibleAlerts((prev) => ({ ...prev, loaderValidated: false }))
                    }
                  />
                )}
                {visibleAlerts.loaderInfo && (
                  <Alert
                    variant="Info"
                    title="Downloading update..."
                    description="100 seconds estimated. (100s)"
                    showLoader
                    loaderDuration={100}
                    onClose={() =>
                      setVisibleAlerts((prev) => ({ ...prev, loaderInfo: false }))
                    }
                  />
                )}
              </div>
            </div>
          </section>

          {/* With Actions */}
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
                With Actions
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('actions')}
              />
            </div>
            <div className="example-container">
              <div className="alert-demo">
                {visibleAlerts.actionBottom && (
                  <Alert
                    variant="Warning"
                    title="Session expiring"
                    description="Your session will expire in 5 minutes."
                    actionBottom={<button>EXTEND SESSION</button>}
                    onClose={() =>
                      setVisibleAlerts((prev) => ({ ...prev, actionBottom: false }))
                    }
                  />
                )}
                {visibleAlerts.actionRight && (
                  <Alert
                    variant="Info"
                    title="New version available"
                    description="A new version of the application is available."
                    actionRight={<button>UPDATE</button>}
                    onClose={() =>
                      setVisibleAlerts((prev) => ({ ...prev, actionRight: false }))
                    }
                  />
                )}
              </div>
            </div>
          </section>

          {/* Without Close Button */}
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
                Without Close Button
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('noClose')}
              />
            </div>
            <div className="example-container">
              <div className="alert-demo">
                <Alert
                  variant="Validated"
                  title="Auto-saved"
                  description="Your progress has been saved automatically."
                  showCloseButton={false}
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
                  <td><code>variant</code></td>
                  <td><code>'Error' | 'Warning' | 'Validated' | 'Info'</code></td>
                  <td><code>'Info'</code></td>
                  <td>Alert variant determining color scheme and default icon</td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Alert title (required)</td>
                </tr>
                <tr>
                  <td><code>description</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Alert description text</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td><code>string</code></td>
                  <td>Per variant</td>
                  <td>Custom icon name override</td>
                </tr>
                <tr>
                  <td><code>showLoader</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether to show the loader bar at top</td>
                </tr>
                <tr>
                  <td><code>loaderProgress</code></td>
                  <td><code>number</code></td>
                  <td>-</td>
                  <td>Loader progress (0 to 100)</td>
                </tr>
                <tr>
                  <td><code>actionBottom</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Action element rendered below the description</td>
                </tr>
                <tr>
                  <td><code>actionRight</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Action element rendered on the right side</td>
                </tr>
                <tr>
                  <td><code>showCloseButton</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether to show the close button</td>
                </tr>
                <tr>
                  <td><code>onClose</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback when close button is clicked</td>
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
        isOpen={openModal === 'variants'}
        onClose={() => setOpenModal(null)}
        title="Alert — Variants"
        sections={[{ title: 'Alert.tsx', language: 'tsx', code: variantsCode }]}
      />
      <CodeModal
        isOpen={openModal === 'loader'}
        onClose={() => setOpenModal(null)}
        title="Alert — With Loader"
        sections={[{ title: 'Alert.tsx', language: 'tsx', code: loaderCode }]}
      />
      <CodeModal
        isOpen={openModal === 'actions'}
        onClose={() => setOpenModal(null)}
        title="Alert — With Actions"
        sections={[{ title: 'Alert.tsx', language: 'tsx', code: actionsCode }]}
      />
      <CodeModal
        isOpen={openModal === 'noClose'}
        onClose={() => setOpenModal(null)}
        title="Alert — Without Close Button"
        sections={[{ title: 'Alert.tsx', language: 'tsx', code: noCloseCode }]}
      />
    </div>
  );
}
