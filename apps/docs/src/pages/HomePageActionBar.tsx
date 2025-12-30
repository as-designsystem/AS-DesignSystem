import { useState } from 'react';
import { HomePageActionBar, Button, Tab, TextInput } from '@as-design-system/core';
import '@as-design-system/core/HomePageActionBar.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/TextInput.css';
import CodeModal from '../components/CodeModal';
import './HomePageActionBar.css';

export default function HomePageActionBarPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { HomePageActionBar, Button, TextInput } from '@as-design-system/core';
import '@as-design-system/core/HomePageActionBar.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/TextInput.css';

function Example() {
  return (
    <HomePageActionBar onTabChange={(tab) => console.log(tab)}>
      <Button
        label="SORT BY"
        leftIcon="filter_list"
        rightIcon="keyboard_arrow_down"
        variant="Ghost"
        size="M"
      />
      <TextInput
        placeholder="Search for study"
        showLabel={false}
        showLeftIcon
        leftIcon="search"
        size="M"
        className="home-page-action-bar__search"
      />
      <Button
        label="NEW STUDY"
        leftIcon="add"
        size="M"
      />
    </HomePageActionBar>
  );
}`;

  const controlledTabsCode = `import { useState } from 'react';
import { HomePageActionBar, Button, type HomePageTab } from '@as-design-system/core';

function Example() {
  const [activeTab, setActiveTab] = useState<HomePageTab>('my-studies');

  return (
    <HomePageActionBar activeTab={activeTab} onTabChange={setActiveTab}>
      <Button label="NEW STUDY" leftIcon="add" size="M" />
    </HomePageActionBar>
  );
}`;

  const customActionsCode = `import { HomePageActionBar, Button, TextInput } from '@as-design-system/core';

// Mix any components: buttons, selects, inputs, etc.
<HomePageActionBar>
  <Button
    label="SORT BY"
    leftIcon="filter_row"
    rightIcon="dropdown"
    variant="Ghost"
    size="M"
  />
  <TextInput
    placeholder="Search projects..."
    showLabel={false}
    showLeftIcon
    leftIcon="search"
    size="M"
    className="home-page-action-bar__search"
  />
  <Button label="FILTER" leftIcon="filter" variant="Outlined" size="M" />
  <Button label="CREATE" leftIcon="add" size="M" />
</HomePageActionBar>`;

  const minimalCode = `import { HomePageActionBar, Button } from '@as-design-system/core';

// Minimal with just a primary action
<HomePageActionBar onTabChange={(tab) => console.log(tab)}>
  <Button label="NEW STUDY" leftIcon="add" size="M" />
</HomePageActionBar>`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        HomePageActionBar
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        A navigation bar with tabs on the left and fully customizable actions on the right. Pass any components as children (buttons, inputs, selects, etc.).
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
              <BasicExample />
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
                onClick={() => setOpenModal('controlledTabs')}
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
              Mix any components: buttons, selects, inputs, icon buttons, etc.
            </p>
            <div className="homepageactionbar-example">
              <HomePageActionBar>
                <Button
                  label="SORT BY"
                  leftIcon="filter_row"
                  rightIcon="dropdown"
                  variant="Ghost"
                  size="M"
                />
                <TextInput
                  placeholder="Search projects..."
                  showLabel={false}
                  showLeftIcon
                  leftIcon="search"
                  size="M"
                  className="home-page-action-bar__search"
                />
                <Button label="FILTER" leftIcon="filter" variant="Outlined" size="M" />
                <Button label="CREATE" leftIcon="add" size="M" />
              </HomePageActionBar>
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
            <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Just tabs and a single action button.
            </p>
            <div className="homepageactionbar-example">
              <HomePageActionBar>
                <Button label="NEW STUDY" leftIcon="add" size="M" />
              </HomePageActionBar>
            </div>
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
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>-</code></td>
                  <td>Actions to display on the right side (buttons, inputs, selects, etc.)</td>
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
            HomePageTab Type
          </h2>
          <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-main, #14171d)' }}>
            <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>'my-studies' | 'all-studies'</code>
          </p>

          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Styling Tips
          </h2>
          <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-main, #14171d)' }}>
            Use the <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>home-page-action-bar__search</code> class on TextInput components to give them a fixed width of 240px.
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
        isOpen={openModal === 'controlledTabs'}
        onClose={() => setOpenModal(null)}
        title="Controlled Tabs"
        code={controlledTabsCode}
      />
      <CodeModal
        isOpen={openModal === 'customActions'}
        onClose={() => setOpenModal(null)}
        title="Custom Actions"
        code={customActionsCode}
      />
      <CodeModal
        isOpen={openModal === 'minimal'}
        onClose={() => setOpenModal(null)}
        title="Minimal"
        code={minimalCode}
      />
    </div>
  );
}

// Helper component for basic example with search state
function BasicExample() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <HomePageActionBar onTabChange={(tab) => console.log(tab)}>
      <Button
        label="SORT BY"
        leftIcon="filter_list"
        rightIcon="keyboard_arrow_down"
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
        showRightIconButton={searchValue.length > 0}
        rightIconButton="close"
        onRightIconButtonClick={() => setSearchValue('')}
        size="M"
        className="home-page-action-bar__search"
      />
      <Button
        label="NEW STUDY"
        leftIcon="add"
        size="M"
      />
    </HomePageActionBar>
  );
}

// Helper component for controlled tabs example
function ControlledTabsExample() {
  const [activeTab, setActiveTab] = useState<'my-studies' | 'all-studies'>('my-studies');

  return (
    <div className="homepageactionbar-example">
      <HomePageActionBar activeTab={activeTab} onTabChange={setActiveTab}>
        <Button label="NEW STUDY" leftIcon="add" size="M" />
      </HomePageActionBar>
    </div>
  );
}
