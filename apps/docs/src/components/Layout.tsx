import { ReactNode, useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Icon, IconButton, TextInput } from '@as-design-system/core';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/TextInput.css';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  path: string;
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

function NavSection({ title, children, defaultOpen = true, icon, forceOpen }: NavSectionProps) {
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
      { label: 'Text Styles', path: '/tokens/text-styles' },
      { label: 'Colors', path: '/tokens/colors' },
      { label: 'Icons', path: '/tokens/icons' },
    ],
  },
  {
    title: 'Components',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    items: [
      { label: 'Button', path: '/components/button' },
      { label: 'ButtonGroup', path: '/components/button-group' },
      { label: 'IconButton', path: '/components/icon-button' },
      { label: 'ToolIcons', path: '/components/tool-icons' },
      { label: 'Tab', path: '/components/tab' },
      { label: 'Select', path: '/components/select' },
      { label: 'Checkbox', path: '/components/checkbox' },
      { label: 'Toggle', path: '/components/toggle' },
      { label: 'TextInput', path: '/components/text-input' },
    ],
  },
  {
    title: 'Composites',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    items: [
      { label: 'AppHeader', path: '/composites/app-header' },
      { label: 'HomePageActionBar', path: '/composites/home-page-action-bar' },
      { label: 'Modal', path: '/composites/modal' },
      { label: 'ProductPanel', path: '/composites/product-panel' },
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
    ],
  },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
        </div>
        <nav className="sidebar-nav">
          {filteredSections.map((section) => (
            <NavSection
              key={section.title}
              title={section.title}
              icon={section.icon}
              forceOpen={isSearching ? true : undefined}
            >
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link nav-link-sub ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </NavSection>
          ))}
          {isSearching && filteredSections.length === 0 && (
            <div className="search-no-results">No results found</div>
          )}
        </nav>
      </aside>
      <main className={`content ${isTemplatePreview ? 'content--template-preview' : ''}`}>{children}</main>
    </div>
  );
}
