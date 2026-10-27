import { useState } from 'react';
import { Breadcrumb, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/Breadcrumb.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './Breadcrumb.css';

const sectionTitleStyle = {
  marginTop: '32px',
  marginBottom: '16px',
  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
};

export default function BreadcrumbPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [path, setPath] = useState(['MRO Network', 'Default_MRO_Network', 'MRO Station']);

  const sizesCode = `import { Breadcrumb } from '@/design-system/components/Breadcrumb';

<Breadcrumb size="M" items={[{ label: 'MRO Network', onClick: goBack }, { label: 'Default_MRO_Network' }]} />
<Breadcrumb size="S" items={[{ label: 'MRO Network', onClick: goBack }, { label: 'Default_MRO_Network' }]} />`;

  const interactiveCode = `import { Breadcrumb } from '@/design-system/components/Breadcrumb';

// Ancestors navigate back, the last item is the current page
<Breadcrumb
  items={path.map((label, index) => ({
    label,
    onClick: () => setPath(path.slice(0, index + 1)),
  }))}
/>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
          Breadcrumb
        </h1>
        <InstallCommand componentName="breadcrumb" />
      </div>
      <p
        className="label-regular-m"
        style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}
      >
        Navigation trail from a root page to the current page. Ancestors are links back, the last item is the current page.
      </p>

      <div className="tabs-container">
        <div className="example-container">
          <div style={{ display: 'flex', gap: '0' }}>
            <Tab label="Examples" size="M" status={activeTab === 'examples' ? 'Active' : 'Default'} onClick={() => setActiveTab('examples')} />
            <Tab label="Props" size="M" status={activeTab === 'props' ? 'Active' : 'Default'} onClick={() => setActiveTab('props')} />
          </div>
        </div>
      </div>

      {activeTab === 'examples' && (
        <>
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={sectionTitleStyle}>Sizes</h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('sizes')} />
            </div>
            <div className="example-container">
              <div className="breadcrumb-examples">
                <Breadcrumb size="M" items={[{ label: 'MRO Network', onClick: () => {} }, { label: 'Default_MRO_Network' }]} />
                <Breadcrumb size="S" items={[{ label: 'MRO Network', onClick: () => {} }, { label: 'Default_MRO_Network' }]} />
              </div>
            </div>
          </section>

          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={sectionTitleStyle}>Interactive</h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('interactive')} />
            </div>
            <div className="example-container">
              <div className="breadcrumb-examples">
                <Breadcrumb
                  items={path.map((label, index) => ({ label, onClick: () => setPath(path.slice(0, index + 1)) }))}
                />
                <Button
                  label="Reset"
                  size="S"
                  variant="Ghost"
                  onClick={() => setPath(['MRO Network', 'Default_MRO_Network', 'MRO Station'])}
                />
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'props' && (
        <section className="component-section">
          <h2 className="heading-6" style={sectionTitleStyle}>Props</h2>
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
                  <td><code>items</code></td>
                  <td><code>{'{ label: string; onClick?: () => void }[]'}</code></td>
                  <td><code>required</code></td>
                  <td>Path from the root to the current page. The last item is the current page and is never clickable.</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'S' | 'M'</code></td>
                  <td><code>'M'</code></td>
                  <td>M works as a page title (20px), S as a secondary trail (14px)</td>
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

      <CodeModal isOpen={openModal === 'sizes'} onClose={() => setOpenModal(null)} title="Sizes" code={sizesCode} />
      <CodeModal isOpen={openModal === 'interactive'} onClose={() => setOpenModal(null)} title="Interactive" code={interactiveCode} />
    </div>
  );
}
