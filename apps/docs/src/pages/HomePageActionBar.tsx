import { useState } from 'react';
import { HomePageActionBar, Button, Tab } from '@as-design-system/core';
import '@as-design-system/core/HomePageActionBar.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/TextInput.css';
import CodeModal from '../components/CodeModal';
import './HomePageActionBar.css';

export default function HomePageActionBarPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { HomePageActionBar } from '@as-design-system/core';
import '@as-design-system/core/HomePageActionBar.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/TextInput.css';

function Example() {
  return (
    <HomePageActionBar
      onTabChange={(tab) => console.log('Tab changed:', tab)}
      onSearchChange={(value) => console.log('Search:', value)}
      primaryButton={{
        label: 'NEW STUDY',
        leftIcon: 'add',
        onClick: () => console.log('New study clicked'),
      }}
    />
  );
}`;

  const customTabsCode = `import { HomePageActionBar, type HomePageTab } from '@as-design-system/core';

function Example() {
  const [activeTab, setActiveTab] = useState<HomePageTab>('my-studies');

  return (
    <HomePageActionBar
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  );
}`;

  const customActionsCode = `import { HomePageActionBar } from '@as-design-system/core';

// Custom sort button and primary action
<HomePageActionBar
  sortButton={{
    label: 'FILTER',
    leftIcon: 'tune',
    rightIcon: 'keyboard_arrow_down',
    onClick: () => console.log('Filter clicked'),
  }}
  primaryButton={{
    label: 'CREATE PROJECT',
    leftIcon: 'add',
    onClick: () => console.log('Create project'),
  }}
  searchPlaceholder="Search projects..."
/>`;

  const controlledSearchCode = `import { useState } from 'react';
import { HomePageActionBar } from '@as-design-system/core';

function Example() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // Debounce and call API...
  };

  return (
    <HomePageActionBar
      searchValue={searchValue}
      onSearchChange={handleSearch}
      showSearchClear={true}
    />
  );
}`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        HomePageActionBar
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        A navigation bar with tabs, sort button, search input, and primary action button. Used for home page layouts with study/project lists.
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
            <div className="homepageactionbar-example">
              <HomePageActionBar
                onTabChange={(tab) => console.log('Tab changed:', tab)}
                onSearchChange={(value) => console.log('Search:', value)}
                primaryButton={{
                  label: 'NEW STUDY',
                  leftIcon: 'add',
                  onClick: () => console.log('New study clicked'),
                }}
              />
            </div>
          </section>

          {/* Controlled Tabs */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Controlled Tabs
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('customTabs')}
              />
            </div>
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Control the active tab externally using <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>activeTab</code> and <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>onTabChange</code>.
            </p>
            <ControlledTabsExample />
          </section>

          {/* Custom Actions */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Custom Actions
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('customActions')}
              />
            </div>
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Customize the sort button, primary button, and search placeholder.
            </p>
            <div className="homepageactionbar-example">
              <HomePageActionBar
                sortButton={{
                  label: 'FILTER',
                  leftIcon: 'tune',
                  rightIcon: 'keyboard_arrow_down',
                  onClick: () => console.log('Filter clicked'),
                }}
                primaryButton={{
                  label: 'CREATE PROJECT',
                  leftIcon: 'add',
                  onClick: () => console.log('Create project'),
                }}
                searchPlaceholder="Search projects..."
              />
            </div>
          </section>

          {/* Controlled Search */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Controlled Search
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('controlledSearch')}
              />
            </div>
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Control the search input externally with <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>searchValue</code> and <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>onSearchChange</code>.
            </p>
            <ControlledSearchExample />
          </section>
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
        <section className="component-section">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            HomePageActionBar Props
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
                  <td><code>activeTab</code></td>
                  <td><code>HomePageTab</code></td>
                  <td><code>'my-studies'</code></td>
                  <td>Currently active tab ('my-studies' | 'all-studies')</td>
                </tr>
                <tr>
                  <td><code>onTabChange</code></td>
                  <td><code>(tab: HomePageTab) =&gt; void</code></td>
                  <td><code>-</code></td>
                  <td>Callback when tab changes</td>
                </tr>
                <tr>
                  <td><code>sortButton</code></td>
                  <td><code>ActionButtonConfig</code></td>
                  <td><code>{'{ label: "SORT BY", leftIcon: "filter_list", rightIcon: "keyboard_arrow_down" }'}</code></td>
                  <td>Sort button configuration</td>
                </tr>
                <tr>
                  <td><code>searchPlaceholder</code></td>
                  <td><code>string</code></td>
                  <td><code>'Search for study'</code></td>
                  <td>Search input placeholder text</td>
                </tr>
                <tr>
                  <td><code>searchValue</code></td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                  <td>Search input value (controlled mode)</td>
                </tr>
                <tr>
                  <td><code>onSearchChange</code></td>
                  <td><code>(value: string) =&gt; void</code></td>
                  <td><code>-</code></td>
                  <td>Callback when search value changes</td>
                </tr>
                <tr>
                  <td><code>showSearchClear</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show clear button in search when there's text</td>
                </tr>
                <tr>
                  <td><code>primaryButton</code></td>
                  <td><code>ActionButtonConfig</code></td>
                  <td><code>{'{ label: "NEW STUDY", leftIcon: "add" }'}</code></td>
                  <td>Primary action button configuration</td>
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
            ActionButtonConfig Props
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
                  <td>Button label text (required)</td>
                </tr>
                <tr>
                  <td><code>leftIcon</code></td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                  <td>Left icon name</td>
                </tr>
                <tr>
                  <td><code>rightIcon</code></td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                  <td>Right icon name</td>
                </tr>
                <tr>
                  <td><code>onClick</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td><code>-</code></td>
                  <td>Click handler</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            HomePageTab Type
          </h2>
          <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-main, #14171d)' }}>
            <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>'my-studies' | 'all-studies'</code>
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
        isOpen={openModal === 'customTabs'}
        onClose={() => setOpenModal(null)}
        title="Controlled Tabs"
        code={customTabsCode}
      />
      <CodeModal
        isOpen={openModal === 'customActions'}
        onClose={() => setOpenModal(null)}
        title="Custom Actions"
        code={customActionsCode}
      />
      <CodeModal
        isOpen={openModal === 'controlledSearch'}
        onClose={() => setOpenModal(null)}
        title="Controlled Search"
        code={controlledSearchCode}
      />
    </div>
  );
}

// Helper component for controlled tabs example
function ControlledTabsExample() {
  const [activeTab, setActiveTab] = useState<'my-studies' | 'all-studies'>('my-studies');

  return (
    <div className="homepageactionbar-example">
      <HomePageActionBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}

// Helper component for controlled search example
function ControlledSearchExample() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="homepageactionbar-example">
      <HomePageActionBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        showSearchClear={true}
      />
      <p className="label-regular-s" style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>
        Current value: "{searchValue}"
      </p>
    </div>
  );
}
