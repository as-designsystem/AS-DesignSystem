import React, { useState } from 'react';
import { Tab } from '../components/Tab';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import './HomePageActionBar.css';

export type HomePageTab = 'my-studies' | 'all-studies';

export interface ActionButtonConfig {
  /**
   * Label of the button
   */
  label: string;
  /**
   * Left icon name
   */
  leftIcon?: string;
  /**
   * Right icon name
   */
  rightIcon?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
}

export interface HomePageActionBarProps {
  /**
   * Currently active tab
   * @default 'my-studies'
   */
  activeTab?: HomePageTab;
  /**
   * Callback when tab changes
   */
  onTabChange?: (tab: HomePageTab) => void;
  /**
   * Sort button configuration
   * @default { label: 'SORT BY', leftIcon: 'filter_list', rightIcon: 'keyboard_arrow_down' }
   */
  sortButton?: ActionButtonConfig;
  /**
   * Search input placeholder
   * @default 'Search for study'
   */
  searchPlaceholder?: string;
  /**
   * Search input value (controlled)
   */
  searchValue?: string;
  /**
   * Callback when search value changes
   */
  onSearchChange?: (value: string) => void;
  /**
   * Show clear button in search when there's text
   * @default true
   */
  showSearchClear?: boolean;
  /**
   * Primary action button configuration
   * @default { label: 'NEW STUDY', leftIcon: 'add' }
   */
  primaryButton?: ActionButtonConfig;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * HomePageActionBar Composite Component
 *
 * A navigation bar with tabs, sort button, search input, and primary action button.
 *
 * @example
 * ```tsx
 * <HomePageActionBar
 *   activeTab="my-studies"
 *   onTabChange={(tab) => console.log(tab)}
 *   onSearchChange={(value) => console.log(value)}
 *   primaryButton={{
 *     label: 'NEW STUDY',
 *     leftIcon: 'add',
 *     onClick: () => console.log('New study clicked'),
 *   }}
 * />
 * ```
 */
export function HomePageActionBar({
  activeTab: controlledActiveTab,
  onTabChange,
  sortButton = {
    label: 'SORT BY',
    leftIcon: 'filter_list',
    rightIcon: 'keyboard_arrow_down',
  },
  searchPlaceholder = 'Search for study',
  searchValue: controlledSearchValue,
  onSearchChange,
  showSearchClear = true,
  primaryButton = {
    label: 'NEW STUDY',
    leftIcon: 'add',
  },
  className = '',
}: HomePageActionBarProps) {
  // Internal state for uncontrolled mode
  const [internalActiveTab, setInternalActiveTab] = useState<HomePageTab>('my-studies');
  const [internalSearchValue, setInternalSearchValue] = useState('');

  // Use controlled or uncontrolled values
  const activeTab = controlledActiveTab ?? internalActiveTab;
  const searchValue = controlledSearchValue ?? internalSearchValue;

  const handleTabChange = (tab: HomePageTab) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tab);
    }
    onTabChange?.(tab);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (controlledSearchValue === undefined) {
      setInternalSearchValue(value);
    }
    onSearchChange?.(value);
  };

  const handleSearchClear = () => {
    if (controlledSearchValue === undefined) {
      setInternalSearchValue('');
    }
    onSearchChange?.('');
  };

  const containerClasses = ['home-page-action-bar', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {/* Left side - Tabs */}
      <div className="home-page-action-bar__tabs">
        <Tab
          label="My Studies"
          size="M"
          status={activeTab === 'my-studies' ? 'Active' : 'Default'}
          onClick={() => handleTabChange('my-studies')}
        />
        <Tab
          label="All studies"
          size="M"
          status={activeTab === 'all-studies' ? 'Active' : 'Default'}
          onClick={() => handleTabChange('all-studies')}
        />
      </div>

      {/* Right side - Actions */}
      <div className="home-page-action-bar__actions">
        {/* Sort Button */}
        <Button
          label={sortButton.label}
          variant="Ghost"
          size="M"
          leftIcon={sortButton.leftIcon}
          rightIcon={sortButton.rightIcon}
          onClick={sortButton.onClick}
          className="home-page-action-bar__sort-button"
        />

        {/* Search Input */}
        <TextInput
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={handleSearchChange}
          size="M"
          showLabel={false}
          showLeftIcon
          leftIcon="search"
          showRightIconButton={showSearchClear && searchValue.length > 0}
          rightIconButton="close"
          onRightIconButtonClick={handleSearchClear}
          className="home-page-action-bar__search"
        />

        {/* Primary Action Button */}
        <Button
          label={primaryButton.label}
          variant="Default"
          size="M"
          leftIcon={primaryButton.leftIcon}
          rightIcon={primaryButton.rightIcon}
          onClick={primaryButton.onClick}
        />
      </div>
    </div>
  );
}

export default HomePageActionBar;
