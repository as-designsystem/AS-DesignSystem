import { useState } from 'react';
import {
  AppHeader,
  ProductBanner,
  HomePageActionBar,
  Button,
  IconButton,
  TextInput,
  type HomePageTab,
} from '@as-designsystem/core';
import '@as-designsystem/core/AppHeader.css';
import '@as-designsystem/core/ProductBanner.css';
import '@as-designsystem/core/HomePageActionBar.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/TextInput.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/IconButton.css';
import '@as-designsystem/core/ToolIcons.css';
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
        appName="Product Name"
        actions={
          <>
            <IconButton icon="notifications" size="M" variant="Ghost" alt="Notifications" />
            <IconButton icon="settings" size="M" variant="Ghost" alt="Settings" />
            <IconButton icon="apps" size="M" variant="Ghost" alt="Apps" />
            <Button
              label="Mark Thompson"
              rightIcon="account_circle"
              variant="Ghost"
              size="M"
              onClick={() => console.log('User clicked')}
            />
          </>
        }
      />

      {/* Product Panel - Hero section */}
      <ProductBanner
        tool="maintenance"
        productName="Product Name"
        productDescription="Here need to add a long description of the tool to make it understandable by the user. You can put the goal of the tool, the target users and the business. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"
        backgroundImage="/backgrounds/Maintenance.png"
        links={[
          { label: 'DOCUMENTATION', href: '#documentation', icon: 'info' },
          { label: 'APIs', href: '#apis', icon: 'code' },
          { label: 'CONTACT & SUPPORT', href: '#support', icon: 'notifications' },
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
