import { useState } from 'react';
import { Button, Tab } from '@as-design-system/core';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/Tab.css';
import CodeModal from '../components/CodeModal';
import './AboutTemplates.css';

export default function AboutTemplatesPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'usage'>('overview');

  const homePageCode = `import { useState } from 'react';
import { AppHeader } from '../composites/AppHeader';
import { ProductPanel } from '../composites/ProductPanel';
import { HomePageActionBar } from '../composites/HomePageActionBar';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import type { HomePageTab } from '../composites/HomePageActionBar';
import './HomePage.css';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<HomePageTab>('my-studies');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="home-page">
      <AppHeader
        appName="Tool name here"
        showNotifications
        showSettings
        showApps
        showUserSelector
        userName="Mark Thompson"
      />

      <ProductPanel
        tool="maintenance"
        productName="Product Name"
        productDescription="Here need to add a long description of the tool..."
        links={[
          { label: 'DOCUMENTATION', href: '#documentation' },
          { label: 'APIs', href: '#apis' },
          { label: 'CONTACT & SUPPORT', href: '#support' },
        ]}
      />

      <main className="home-page__content">
        <HomePageActionBar activeTab={activeTab} onTabChange={setActiveTab}>
          <Button
            label="SORT BY"
            leftIcon="filter_row"
            rightIcon="dropdown"
            variant="Ghost"
            size="M"
          />
          <TextInput
            placeholder="Search for study"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            showLabel={false}
            showLeftIcon
            leftIcon="search"
            size="M"
            className="home-page__search"
          />
          <Button label="NEW STUDY" leftIcon="add" size="M" />
        </HomePageActionBar>

        <section className="home-page__tab-content">
          {/* Replace with your actual content rows */}
          <div className="home-page__row home-page__row--placeholder" />
          <div className="home-page__row home-page__row--placeholder" />
        </section>
      </main>
    </div>
  );
}`;

  const installCode = `# Install the HomePage template
asds add home-page

# This will:
# 1. Install all required dependencies (AppHeader, ProductPanel, etc.)
# 2. Copy HomePage.tsx and HomePage.css to src/pages/
# 3. You can then customize the template for your needs`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        About Templates
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        Page templates are pre-built page layouts that you can install directly into your project. Unlike components that go into your design system folder, templates are installed into your project pages and are meant to be customized.
      </p>

      {/* Tabs */}
      <div className="tabs-container">
        <div style={{ display: 'flex', gap: '0' }}>
          <Tab
            label="Overview"
            size="M"
            status={activeTab === 'overview' ? 'Active' : 'Default'}
            onClick={() => setActiveTab('overview')}
          />
          <Tab
            label="Usage"
            size="M"
            status={activeTab === 'usage' ? 'Active' : 'Default'}
            onClick={() => setActiveTab('usage')}
          />
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* HomePage Template */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                HomePage
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('homePage')}
              />
            </div>
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              A complete home page template with AppHeader, ProductPanel, HomePageActionBar, and a content area for listing items.
            </p>

            {/* Preview Image/Description */}
            <div className="template-preview">
              <div className="template-preview__card">
                <div className="template-preview__header">
                  <span className="template-preview__icon">📄</span>
                  <div>
                    <h3 className="heading-6">HomePage Template</h3>
                    <p className="label-regular-s" style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                      home-page
                    </p>
                  </div>
                </div>
                <div className="template-preview__content">
                  <p className="label-regular-m">Includes:</p>
                  <ul className="template-preview__list">
                    <li>AppHeader with logo, app name, and user controls</li>
                    <li>ProductPanel hero section with tool description</li>
                    <li>HomePageActionBar with tabs, sort, search, and primary action</li>
                    <li>Content area with placeholder rows (max-width: 1600px)</li>
                    <li>Responsive layout</li>
                  </ul>
                </div>
                <div className="template-preview__footer">
                  <code className="template-preview__command">asds add home-page</code>
                </div>
              </div>
            </div>
          </section>

          {/* More templates coming soon */}
          <section className="component-section">
            <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
              Coming Soon
            </h2>
            <p className="label-regular-m" style={{ color: 'var(--text-secondary)' }}>
              More templates will be added in future releases, including:
            </p>
            <ul style={{ marginTop: '12px', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
              <li className="label-regular-m">Dashboard page template</li>
              <li className="label-regular-m">Settings page template</li>
              <li className="label-regular-m">Detail page template</li>
              <li className="label-regular-m">Form page template</li>
            </ul>
          </section>
        </>
      )}

      {/* Usage Tab */}
      {activeTab === 'usage' && (
        <>
          <section className="component-section">
            <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
              Installing Templates
            </h2>
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-main, #14171d)' }}>
              Use the CLI to install templates into your project:
            </p>
            <div className="code-block">
              <pre><code>{installCode}</code></pre>
            </div>
          </section>

          <section className="component-section">
            <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
              Key Differences from Components
            </h2>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th>Components</th>
                    <th>Templates</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>Location</code></td>
                    <td><code>src/design-system/</code></td>
                    <td><code>src/pages/</code></td>
                  </tr>
                  <tr>
                    <td><code>Purpose</code></td>
                    <td>Reusable UI primitives</td>
                    <td>Full page layouts</td>
                  </tr>
                  <tr>
                    <td><code>Customization</code></td>
                    <td>Props-based configuration</td>
                    <td>Direct code modification</td>
                  </tr>
                  <tr>
                    <td><code>Updates</code></td>
                    <td>Can be updated via CLI</td>
                    <td>One-time installation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="component-section">
            <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
              Customization
            </h2>
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-main, #14171d)' }}>
              After installing a template, you own the code. Feel free to:
            </p>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-main, #14171d)' }}>
              <li className="label-regular-m">Modify the layout structure</li>
              <li className="label-regular-m">Add or remove sections</li>
              <li className="label-regular-m">Connect to your data sources</li>
              <li className="label-regular-m">Adjust styles to match your brand</li>
              <li className="label-regular-m">Rename files as needed</li>
            </ul>
          </section>
        </>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'homePage'}
        onClose={() => setOpenModal(null)}
        title="HomePage Template"
        code={homePageCode}
      />
    </div>
  );
}
