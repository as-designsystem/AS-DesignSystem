import { useState } from 'react';
import { ProductBanner, Button, Tab } from '@as-designsystem/core';
import '@as-designsystem/core/ProductBanner.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/ToolIcons.css';
import CodeModal from '../components/CodeModal';
import './ProductBanner.css';

export default function ProductBannerPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { ProductBanner } from '@/design-system/composites/ProductBanner';

function Example() {
  return (
    <ProductBanner
      productName="Maintenance"
      productDescription="Tool for aircraft maintenance management and scheduling."
      tool="maintenance"
      links={[
        { label: 'DOCUMENTATION', href: '/docs', icon: 'info' },
        { label: 'APIs', href: '/api', icon: 'code' },
        { label: 'CONTACT & SUPPORT', href: '/support', icon: 'notifications' },
      ]}
    />
  );
}`;

  const minimalCode = `import { ProductBanner } from '@/design-system/composites/ProductBanner';

// Minimal ProductBanner with just name, description and tool icon
<ProductBanner
  productName="TrajOpt"
  productDescription="Comprehensive trajectory optimization solution."
  tool="trajopt"
/>`;

  const backgroundImageCode = `import { ProductBanner } from '@/design-system/composites/ProductBanner';

// ProductBanner with custom background image
<ProductBanner
  productName="SkyFinesse"
  productDescription="Data platform for aviation analytics and insights."
  tool="skyfinesse"
  backgroundImage="/path/to/background.jpg"
  links={[
    { label: 'LEARN MORE', href: '/learn', icon: 'info' },
  ]}
/>`;

  const spaNavigationCode = `import { ProductBanner } from '@/design-system/composites/ProductBanner';
import { useNavigate } from 'react-router-dom';

function Example() {
  const navigate = useNavigate();

  return (
    <ProductBanner
      productName="AirScout"
      productDescription="Real-time flight operations management."
      tool="airscout"
      links={[
        {
          label: 'DASHBOARD',
          href: '/dashboard',
          icon: 'apps',
          onClick: (e) => {
            e.preventDefault();
            navigate('/dashboard');
          },
        },
        {
          label: 'SETTINGS',
          href: '/settings',
          icon: 'settings',
          onClick: (e) => {
            e.preventDefault();
            navigate('/settings');
          },
        },
      ]}
    />
  );
}`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        ProductBanner
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        A banner component for displaying product/tool information with a dark overlay, icon, title, description, and action links.
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
              <div className="productbanner-example">
                <ProductBanner
                  productName="Maintenance"
                  productDescription="Tool for aircraft maintenance management and scheduling. Provides comprehensive solutions for tracking maintenance tasks, scheduling inspections, and ensuring aircraft safety compliance."
                  tool="maintenance"
                  links={[
                    { label: 'DOCUMENTATION', href: '#', icon: 'info' },
                    { label: 'APIs', href: '#', icon: 'code' },
                    { label: 'CONTACT & SUPPORT', href: '#', icon: 'notifications' },
                  ]}
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
              <div className="productbanner-example">
                <ProductBanner
                  productName="TrajOpt"
                  productDescription="Comprehensive trajectory optimization solution for flight planning and operations."
                  tool="trajopt"
                />
              </div>
            </div>
          </section>

          {/* With Background Image */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                With Background Image
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('backgroundImage')}
              />
            </div>
            <div className="example-container">
              <div className="productbanner-example">
                <ProductBanner
                  productName="SkyFinesse"
                  productDescription="Data platform for aviation analytics and insights. Transform your data into actionable intelligence."
                  tool="skyfinesse"
                  backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&auto=format&fit=crop"
                  links={[
                    { label: 'LEARN MORE', href: '#', icon: 'info' },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* SPA Navigation */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                SPA Navigation
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('spaNavigation')}
              />
            </div>
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Use the <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>onClick</code> handler on links for SPA navigation with React Router.
            </p>
            <div className="example-container">
              <div className="productbanner-example">
                <ProductBanner
                  productName="AirScout"
                  productDescription="Real-time flight operations management and monitoring dashboard."
                  tool="airscout"
                  links={[
                    {
                      label: 'DASHBOARD',
                      href: '#',
                      icon: 'apps',
                      onClick: (e) => {
                        e.preventDefault();
                        console.log('Navigate to dashboard');
                      },
                    },
                    {
                      label: 'SETTINGS',
                      href: '#',
                      icon: 'settings',
                      onClick: (e) => {
                        e.preventDefault();
                        console.log('Navigate to settings');
                      },
                    },
                  ]}
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
            ProductBanner Props
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
                  <td><code>productName</code></td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                  <td>Product/tool name displayed as title (required)</td>
                </tr>
                <tr>
                  <td><code>productDescription</code></td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                  <td>Description text displayed below the title (required)</td>
                </tr>
                <tr>
                  <td><code>tool</code></td>
                  <td><code>ToolName</code></td>
                  <td><code>-</code></td>
                  <td>Tool icon to display from ToolIcons component (required)</td>
                </tr>
                <tr>
                  <td><code>links</code></td>
                  <td><code>ProductBannerLink[]</code></td>
                  <td><code>[]</code></td>
                  <td>Array of link buttons to display</td>
                </tr>
                <tr>
                  <td><code>backgroundImage</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Background image URL. If not provided, uses solid dark blue background</td>
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
            ProductBannerLink Props
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
                  <td>Label displayed on the link button (required)</td>
                </tr>
                <tr>
                  <td><code>href</code></td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                  <td>URL the link points to (required)</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td><code>IconName</code></td>
                  <td><code>undefined</code></td>
                  <td>Icon displayed after the label</td>
                </tr>
                <tr>
                  <td><code>onClick</code></td>
                  <td><code>(e: MouseEvent) =&gt; void</code></td>
                  <td><code>undefined</code></td>
                  <td>Click handler for SPA navigation</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Styling
          </h2>
          <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-main, #14171d)' }}>
            The component features:
          </p>
          <ul style={{ marginLeft: '20px', color: 'var(--text-main, #14171d)' }}>
            <li><strong>Dark Overlay</strong> - Semi-transparent dark blue overlay (rgba(0, 32, 91, 0.8)) over the background image</li>
            <li><strong>Solid Background</strong> - When no background image is provided, uses solid corporate blue (#00205b)</li>
            <li><strong>Responsive</strong> - Adapts padding and typography for mobile screens</li>
            <li><strong>Link Hover Effect</strong> - Links have subtle hover background and color transition</li>
          </ul>
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
        title="Minimal ProductBanner"
        code={minimalCode}
      />
      <CodeModal
        isOpen={openModal === 'backgroundImage'}
        onClose={() => setOpenModal(null)}
        title="With Background Image"
        code={backgroundImageCode}
      />
      <CodeModal
        isOpen={openModal === 'spaNavigation'}
        onClose={() => setOpenModal(null)}
        title="SPA Navigation"
        code={spaNavigationCode}
      />
    </div>
  );
}
