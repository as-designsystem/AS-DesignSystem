import { ReactNode, useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Icon, IconButton, TextInput, ScrollableContent } from '@as-designsystem/core';
import '@as-designsystem/core/IconButton.css';
import '@as-designsystem/core/TextInput.css';
import '@as-designsystem/core/ScrollableContent.css';
import './Layout.css';
import CodeModal, { CodeSection } from './CodeModal';

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  path: string;
  separator?: boolean;
}

interface NavSectionData {
  title: string;
  icon: ReactNode;
  items: NavItem[];
}

interface NavSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
  forceOpen?: boolean;
}

function NavSection({ title, children, defaultOpen = false, icon, forceOpen }: NavSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const open = forceOpen !== undefined ? forceOpen : isOpen;

  return (
    <div className="nav-section">
      <button
        className="nav-section-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={open}
      >
        <div className="nav-section-title-wrapper">
          {icon && <span className="nav-section-icon">{icon}</span>}
          <h2 className="nav-section-title legend-bold">{title}</h2>
        </div>
        <span className={`nav-section-chevron ${open ? 'open' : ''}`}>
          <Icon name="keyboard_arrow_down" size={16} color="var(--text-secondary, #63728a)" />
        </span>
      </button>
      <div className={`nav-section-links ${open ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}

const navSections: NavSectionData[] = [
  {
    title: 'Getting Started',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    items: [
      { label: 'Welcome', path: '/getting-started/welcome' },
      { label: 'Installation', path: '/getting-started/installation' },
      { label: 'How to Use', path: '/getting-started/how-to-use' },
      { label: 'Supported Platforms', path: '/getting-started/supported-platforms' },
    ],
  },
  {
    title: 'Tokens',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    items: [
      { label: 'Colors', path: '/tokens/colors' },
      { label: 'Icons', path: '/tokens/icons' },
      { label: 'Text Styles', path: '/tokens/text-styles' },
      { label: 'Others', path: '/tokens/others' },
    ],
  },
  {
    title: 'Basic Components',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    items: [
      { label: 'Accordion', path: '/composites/accordion' },
      { label: 'Alert', path: '/components/alert' },
      { label: 'Avatar', path: '/components/avatar' },
      { label: 'Button', path: '/components/button' },
      { label: 'ButtonGroup', path: '/components/button-group' },
      { label: 'VButton', path: '/components/vbutton' },
      { label: 'Calendar', path: '/composites/calendar' },
      { label: 'Checkbox', path: '/components/checkbox' },
      { label: 'Chip', path: '/components/chip' },
      { label: 'Combobox', path: '/components/combobox' },
      { label: 'DropdownMenu', path: '/components/dropdown-menu' },
      { label: 'EmptyState', path: '/components/empty-state' },
      { label: 'IconButton', path: '/components/icon-button' },
      { label: 'Modal', path: '/composites/modal' },
      { label: 'NumberInput', path: '/components/number-input' },
      { label: 'ScrollableContent', path: '/components/scrollable-content' },
      { label: 'Select', path: '/components/select' },
      { label: 'Spinner', path: '/components/spinner' },
      { label: 'Tab', path: '/components/tab' },
      { label: 'TextInput', path: '/components/text-input' },
      { label: 'TimePicker', path: '/composites/time-picker' },
      { label: 'Toggle', path: '/components/toggle' },
      { label: 'Tooltip', path: '/components/tooltip' },
    ],
  },
  {
    title: 'AS Components',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    items: [
      { label: 'AircraftSelector', path: '/composites/aircraft-selector' },
      { label: 'AppHeader', path: '/composites/app-header' },
      { label: 'ChartCard', path: '/composites/chart-card' },
      { label: 'StudyContent', path: '/components/study-content' },
      { label: 'StudyStatusBar', path: '/composites/study-status-bar' },
      { label: 'ToolIcons', path: '/components/tool-icons' },
      { label: 'ToolTile', path: '/composites/tool-tile' },
      { label: 'Home Page', path: '', separator: true },
      { label: 'HomePageActionBar', path: '/composites/home-page-action-bar' },
      { label: 'ProductBanner', path: '/composites/product-banner' },
      { label: 'StudyRow', path: '/components/study-row' },
      { label: 'StudyStatus', path: '/components/study-status' },
      { label: 'StudyTableHeader', path: '/components/study-table-header' },
      { label: 'Workspace', path: '/composites/workspace' },
      { label: 'StudyPanel', path: '', separator: true },
      { label: 'LeftPanel', path: '/composites/left-panel' },
      { label: 'PanelButton', path: '/components/panel-button' },
      { label: 'PanelGroup', path: '/components/panel-group' },
      { label: 'PanelHeader', path: '/composites/panel-header' },
      { label: 'PanelSectionTitle', path: '/components/panel-section-title' },
      { label: 'PanelStudyName', path: '/components/panel-study-name' },
    ],
  },
  {
    title: 'Data Grid',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
      </svg>
    ),
    items: [
      { label: 'AG-Grid Tables', path: '/components/ag-grid-table' },
    ],
  },
  {
    title: 'Templates',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    items: [
      { label: 'About Templates', path: '/templates/about' },
      { label: 'HomePage', path: '/templates/home-page' },
      { label: 'LandingPage', path: '/templates/landing-page' },
    ],
  },
];

// Template code snippets for the code modal
const templateCodes: Record<string, CodeSection[]> = {
  '/templates/home-page': [
    {
      title: 'HomePage.tsx',
      language: 'tsx',
      code: `// Install with: asds add home-page

import { useState, useEffect } from 'react';
import { AppHeader } from './composites/AppHeader';
import { ProductBanner } from './composites/ProductBanner';
import { HomePageActionBar } from './composites/HomePageActionBar';
import { Button } from './components/Button';
import { IconButton } from './components/IconButton';
import { TextInput } from './components/TextInput';
import type { HomePageTab } from './composites/HomePageActionBar';
import './HomePage.css';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<HomePageTab>('my-studies');
  const [searchValue, setSearchValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <div className="home-page">
      <AppHeader
        appName="Tool name here"
        actions={
          <>
            <IconButton
              icon={isDarkMode ? 'light_mode' : 'dark_mode'}
              size="S"
              variant="Ghost"
              onClick={toggleDarkMode}
              alt="Toggle dark mode"
            />
            <Button
              label="Mark Thompson"
              rightIcon="account_circle"
              variant="Ghost"
              size="M"
            />
          </>
        }
      />

      <ProductBanner
        tool="maintenance"
        productName="Product Name"
        productDescription="Your product description here..."
        backgroundImage="assets/backgrounds/Maintenance.png"
        links={[
          { label: 'DOCUMENTATION', href: '#documentation', icon: 'info' },
          { label: 'APIs', href: '#apis', icon: 'code' },
          { label: 'CONTACT & SUPPORT', href: '#support', icon: 'notifications' },
        ]}
      />

      <main className="home-page__content">
        <HomePageActionBar activeTab={activeTab} onTabChange={setActiveTab}>
          <Button label="SORT BY" leftIcon="filter_row" rightIcon="dropdown" variant="Ghost" size="M" />
          <TextInput
            placeholder="Search for study"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            showLabel={false}
            showLeftIcon
            leftIcon="search"
            size="M"
          />
          <Button label="NEW STUDY" leftIcon="add" size="M" />
        </HomePageActionBar>

        <section className="home-page__tab-content">
          {/* Your content here */}
        </section>
      </main>
    </div>
  );
}`,
    },
    {
      title: 'HomePage.css',
      language: 'css',
      code: `.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background-secondary, #fafafa);
}

.home-page__content {
  flex: 1;
  padding: 24px 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.home-page__tab-content {
  flex: 1;
  background-color: var(--background-main, #ffffff);
  border-radius: 8px;
  border: 1px solid var(--border-minimal, #e0e3e9);
  padding: 24px;
}`,
    },
  ],
  '/templates/landing-page': [
    {
      title: 'LandingPage.tsx',
      language: 'tsx',
      code: `// Install with: asds add landing-page

import { useState } from 'react';
import { AppHeader } from './composites/AppHeader';
import { ToolTile } from './composites/ToolTile';
import { Button } from './components/Button';
import { IconButton } from './components/IconButton';
import { Chip } from './components/Chip';
import './LandingPage.css';

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="landing-page">
      <AppHeader appName="Airline Digital Twin" actions={...} />

      {/* Hero Section */}
      <section className="landing-page__hero">
        <div className="landing-page__hero-overlay" />
        <div className="landing-page__hero-content">
          <h1 className="landing-page__hero-title">Airline Digital Twin</h1>
          <p className="landing-page__hero-subtitle">By Airline Sciences</p>
          <p className="landing-page__hero-description">...</p>
          <div className="landing-page__hero-actions">
            <Button label="LEARN MORE" variant="Ghost" size="M" />
            <Button label="OUR TOOLS" rightIcon="arrow_downward" size="M" />
          </div>
        </div>
      </section>

      {/* Tool Catalog with Chip Filters */}
      <main className="landing-page__main">
        <section className="landing-page__tools">
          <div className="landing-page__filters">
            {categories.map(cat => (
              <Chip key={cat} label={cat} size="S" active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)} />
            ))}
          </div>
          {sections.map(section => (
            <div key={section.title} className="landing-page__category">
              <h3 className="landing-page__category-title">{section.title}</h3>
              <div className="landing-page__category-grid">
                {section.tools.map(tool => (
                  <ToolTile key={tool.title} tool={tool.tool} title={tool.title}
                    description={tool.description} platforms={tool.platforms} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Contact Us + Footer */}
      ...
    </div>
  );
}`,
    },
  ],
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Check if current page is a template preview (not the "about" page)
  const isTemplatePreview = location.pathname.startsWith('/templates/') && location.pathname !== '/templates/about';

  // Initialize dark mode from localStorage (default to light mode)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // Filter nav sections based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return navSections;

    const query = searchQuery.toLowerCase();
    return navSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.separator ||
            item.label.toLowerCase().includes(query) ||
            section.title.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Logo />
          <div className="search-row">
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="XS"
              showLabel={false}
              showLeftIcon
              leftIcon="search"
              showRightIconButton={searchQuery.length > 0}
              rightIconButton="close"
              onRightIconButtonClick={() => setSearchQuery('')}
              className="sidebar-search"
            />
          </div>
        </div>
        <nav className="sidebar-nav">
          <ScrollableContent>
            {filteredSections.map((section) => (
              <NavSection
                key={section.title}
                title={section.title}
                icon={section.icon}
                forceOpen={isSearching ? true : undefined}
              >
                {section.items.map((item) =>
                  item.separator ? (
                    <div key={item.label} className="nav-subsection-title legend-bold">
                      {item.label}
                    </div>
                  ) : (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`nav-link nav-link-sub ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </NavSection>
            ))}
            {isSearching && filteredSections.length === 0 && (
              <div className="search-no-results">No results found</div>
            )}
          </ScrollableContent>
        </nav>
        <div className="sidebar-version">
          <span>v{__DS_VERSION__}</span>
          <IconButton
            icon={isDarkMode ? 'light_mode' : 'dark_mode'}
            size="XS"
            variant="Ghost"
            onClick={() => {
              const newMode = !isDarkMode;
              setIsDarkMode(newMode);
              document.documentElement.classList.toggle('dark', newMode);
              localStorage.setItem('theme', newMode ? 'dark' : 'light');
            }}
            alt={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          />
        </div>
      </aside>
      <main className={`content ${isTemplatePreview ? 'content--template-preview' : ''}`}>
        {isTemplatePreview ? (
          <>
            <div className="browser-chrome">
              <div className="browser-chrome__header">
                <div className="browser-chrome__buttons">
                  <span className="browser-chrome__button browser-chrome__button--close" />
                  <span className="browser-chrome__button browser-chrome__button--minimize" />
                  <span className="browser-chrome__button browser-chrome__button--maximize" />
                </div>
              </div>
              <div className="browser-chrome__content">
                <ScrollableContent>
                  {children}
                </ScrollableContent>
              </div>
              <div className="template-floating-actions">
                <span className="tooltip-wrapper" data-tooltip="View code">
                  <IconButton
                    icon="code"
                    size="S"
                    variant="Ghost"
                    onClick={() => setIsCodeModalOpen(true)}
                    alt="View template code"
                  />
                </span>
                <span className="tooltip-wrapper" data-tooltip="Open fullscreen">
                  <IconButton
                    icon="open_in_new"
                    size="S"
                    variant="Ghost"
                    onClick={() => window.open(`${location.pathname}/fullscreen`, '_blank')}
                    alt="Open fullscreen"
                  />
                </span>
              </div>
            </div>
            <CodeModal
              isOpen={isCodeModalOpen}
              onClose={() => setIsCodeModalOpen(false)}
              title="HomePage Template"
              sections={templateCodes[location.pathname]}
            />
          </>
        ) : (
          <ScrollableContent>
            {children}
          </ScrollableContent>
        )}
      </main>
    </div>
  );
}
