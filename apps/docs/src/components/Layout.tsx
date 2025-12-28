import { ReactNode, useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Icon, IconButton } from '@as-design-system/core';
import '@as-design-system/core/IconButton.css';
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
      { label: 'Modal', path: '/composites/modal' },
      { label: 'ProductPanel', path: '/composites/product-panel' },
    ],
  },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
          <div className="search-container">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z" fill="var(--text-secondary)"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <Icon name="close" size={14} color="var(--text-secondary)" />
              </button>
            )}
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
        <div className="sidebar-footer">
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
      <main className="content">{children}</main>
    </div>
  );
}
