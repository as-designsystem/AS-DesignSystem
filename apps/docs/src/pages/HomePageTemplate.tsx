import { useState } from 'react';
import {
  AppHeader,
  ProductPanel,
  HomePageActionBar,
  Button,
  TextInput,
  type HomePageTab,
} from '@as-design-system/core';
import '@as-design-system/core/AppHeader.css';
import '@as-design-system/core/ProductPanel.css';
import '@as-design-system/core/HomePageActionBar.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/TextInput.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/ToolIcons.css';
import './HomePageTemplate.css';

/**
 * HomePage Template Preview
 *
 * This page renders the HomePage template as it would appear in a real application.
 * The template takes the full width of the content area.
 */
export default function HomePageTemplatePage() {
  const [activeTab, setActiveTab] = useState<HomePageTab>('my-studies');
  const [searchValue, setSearchValue] = useState('');

  const handleNewStudy = () => {
    console.log('Create new study');
  };

  const handleTabChange = (tab: HomePageTab) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
  };

  return (
    <div className="home-page-template-preview">
      {/* Application Header */}
      <AppHeader
        appName="Tool name here"
        showNotifications
        showSettings
        showApps
        showUserSelector
        userName="Mark Thompson"
        onNotificationsClick={() => console.log('Notifications clicked')}
        onSettingsClick={() => console.log('Settings clicked')}
        onAppsClick={() => console.log('Apps clicked')}
      />

      {/* Product Panel - Hero section */}
      <ProductPanel
        tool="maintenance"
        productName="Product Name"
        productDescription="Here need to add a long description of the tool to make it understandable by the user. You can put the goal of the tool, the target users and the business. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
        links={[
          { label: 'DOCUMENTATION', href: '#documentation' },
          { label: 'APIs', href: '#apis' },
          { label: 'CONTACT & SUPPORT', href: '#support' },
        ]}
      />

      {/* Main Content Area */}
      <main className="home-page-template-preview__content">
        {/* Action Bar with Tabs and Actions */}
        <HomePageActionBar activeTab={activeTab} onTabChange={handleTabChange}>
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
            showRightIconButton={searchValue.length > 0}
            rightIconButton="close"
            onRightIconButtonClick={() => setSearchValue('')}
            size="M"
            className="home-page-template-preview__search"
          />
          <Button
            label="NEW STUDY"
            leftIcon="add"
            size="M"
            onClick={handleNewStudy}
          />
        </HomePageActionBar>

        {/* Tab Content - List of items */}
        <section className="home-page-template-preview__tab-content">
          <div className="home-page-template-preview__row" />
          <div className="home-page-template-preview__row" />
          <div className="home-page-template-preview__row" />
          <div className="home-page-template-preview__row" />
          <div className="home-page-template-preview__row" />
          <div className="home-page-template-preview__row" />
          <div className="home-page-template-preview__row" />
          <div className="home-page-template-preview__row" />
        </section>
      </main>
    </div>
  );
}
