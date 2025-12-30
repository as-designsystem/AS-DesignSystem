import { useState } from 'react';
import { AppHeader } from '../composites/AppHeader';
import { ProductPanel } from '../composites/ProductPanel';
import { HomePageActionBar } from '../composites/HomePageActionBar';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import type { HomePageTab } from '../composites/HomePageActionBar';
import './HomePage.css';

/**
 * HomePage Template
 *
 * A complete home page layout with:
 * - AppHeader with navigation and user controls
 * - ProductPanel hero section
 * - HomePageActionBar with tabs and search
 * - Content area for study/item list
 *
 * Customize this template by:
 * 1. Updating the appName, toolName, and descriptions
 * 2. Replacing the placeholder rows with your actual data
 * 3. Adjusting styles as needed
 */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<HomePageTab>('my-studies');
  const [searchValue, setSearchValue] = useState('');

  const handleNewStudy = () => {
    // TODO: Implement new study creation
    console.log('Create new study');
  };

  const handleTabChange = (tab: HomePageTab) => {
    setActiveTab(tab);
    // TODO: Load different data based on tab
    console.log('Tab changed to:', tab);
  };

  return (
    <div className="home-page">
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
      <main className="home-page__content">
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
            className="home-page__search"
          />
          <Button
            label="NEW STUDY"
            leftIcon="add"
            size="M"
            onClick={handleNewStudy}
          />
        </HomePageActionBar>

        {/* Tab Content - List of items */}
        <section className="home-page__tab-content">
          {/*
            Replace these placeholder rows with your actual content.
            Each row represents a study/item in the list.

            Example:
            {studies.map((study) => (
              <StudyRow key={study.id} study={study} />
            ))}
          */}
          <div className="home-page__row home-page__row--placeholder" />
          <div className="home-page__row home-page__row--placeholder" />
          <div className="home-page__row home-page__row--placeholder" />
          <div className="home-page__row home-page__row--placeholder" />
          <div className="home-page__row home-page__row--placeholder" />
          <div className="home-page__row home-page__row--placeholder" />
          <div className="home-page__row home-page__row--placeholder" />
          <div className="home-page__row home-page__row--placeholder" />
        </section>
      </main>
    </div>
  );
}
