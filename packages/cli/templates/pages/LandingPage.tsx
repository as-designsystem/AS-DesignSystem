import { useState } from 'react';
import { AppHeader } from '@/design-system/composites/AppHeader';
import { ToolTile } from '@/design-system/composites/ToolTile';
import { Button } from '@/design-system/components/Button';
import { IconButton } from '@/design-system/components/IconButton';
import { Chip } from '@/design-system/components/Chip';
import { TextInput } from '@/design-system/components/TextInput';
import { Select } from '@/design-system/components/Select';
import type { ToolName } from '@/design-system/components/ToolIcons';
import type { PlatformName } from '@/design-system/composites/ToolTile';
import landingBackground from '@/design-system/assets/backgrounds/LandingPage.png';
import './LandingPage.css';

/**
 * LandingPage Template
 *
 * A complete landing page layout with:
 * - AppHeader navigation bar
 * - Hero section with background image overlay
 * - Favourite tools section
 * - Tool catalog with category chip filters and ToolTile grids
 * - Contact Us form
 * - Footer with privacy link and copyright
 *
 * Customize this template by:
 * 1. Updating appName, hero content, and descriptions
 * 2. Replacing the tool data with your actual tools
 * 3. Updating the contact form action
 * 4. Adjusting styles as needed
 */

// ---------------------------------------------------------------------------
// Tool data — replace with your actual tools
// ---------------------------------------------------------------------------

interface ToolData {
  tool: ToolName;
  title: string;
  description: string;
  category: string;
  platforms?: PlatformName[];
}

const ALL_TOOLS: ToolData[] = [
  // Simulation Apps
  {
    tool: 'airline-business-planner',
    title: 'Airline Business Planner',
    description: 'A tool that models an airline\'s future performance to project economic and business outcomes.',
    category: 'Simulation Apps',
    platforms: ['web'],
  },
  {
    tool: 'airline-simulator',
    title: 'Airline Simulator',
    description: 'Simulate a complete Airline scenario and exploit the full capacity of Airline Digital Twin simulations.',
    category: 'Simulation Apps',
    platforms: ['web'],
  },
  {
    tool: 'cabin-crew',
    title: 'Cabin Crew Manager',
    description: 'Simulate your missions with FMS model and optimise your flights considering weather.',
    category: 'Simulation Apps',
    platforms: ['web'],
  },
  {
    tool: 'economics',
    title: 'Economics Analyser',
    description: 'Analyse historical market demand and forecast future demand and revenue.',
    category: 'Simulation Apps',
    platforms: ['web'],
  },
  {
    tool: 'economicslite',
    title: 'Economics Lite',
    description: 'A lite version of Economic Analyser to analyse traffic and yield quickly.',
    category: 'Simulation Apps',
    platforms: ['web'],
  },
  {
    tool: 'maintenance',
    title: 'Maintenance Ops Simulator',
    description: 'Manage your fleet maintenance, considering impact on cost and time.',
    category: 'Simulation Apps',
    platforms: ['web'],
  },
  {
    tool: 'network-fam',
    title: 'Network Builder - FAM',
    description: 'Allocates aircraft type or fleet to each scheduled flight.',
    category: 'Simulation Apps',
    platforms: ['web'],
  },
  {
    tool: 'network-rotation',
    title: 'Network Builder - Rotation',
    description: 'Assigns each FAM flight to a specific aircraft (tail/MSN).',
    category: 'Simulation Apps',
    platforms: ['web'],
  },
  {
    tool: 'network-tam',
    title: 'Network Builder - TAM',
    description: 'Plans and assigns rotations to individual crew members.',
    category: 'Simulation Apps',
    platforms: ['web'],
  },
  {
    tool: 'trajopt',
    title: 'Trajectory Optimiser',
    description: 'Simulate your missions with FMS model and optimise your flights considering weather.',
    category: 'Simulation Apps',
    platforms: ['web'],
  },
  {
    tool: 'weight-builder',
    title: 'Weight Builder',
    description: 'Simulate your missions with FMS model and optimise your flights considering weather.',
    category: 'Simulation Apps',
    platforms: ['web'],
  },
  // Other Apps
  {
    tool: 'aoa',
    title: 'Airline Operations Intelligence Portal',
    description: 'Create studies on Skywise platform to analyse airlines operations.',
    category: 'Other Apps',
    platforms: ['skywise'],
  },
  {
    tool: 'fellofly',
    title: 'Pairiscope',
    description: 'Get insight into the Pairing Assistance Tool, explore and analyse found pairing in real world traffic',
    category: 'Other Apps',
    platforms: ['web'],
  },
  {
    tool: 'skyfinesse',
    title: 'SkyFinesse',
    description: 'Optimise your flight plan in real mission condition and compare cost index options.',
    category: 'Other Apps',
    platforms: ['web', 'windows'],
  },
  {
    tool: 'lopaexplorer',
    title: 'Lopa Explorer',
    description: 'Explore different LOPA configuration for new aircraft and see economics estimations.',
    category: 'Other Apps',
    platforms: ['ios'],
  },
  {
    tool: 'missionlite',
    title: 'Mission Lite',
    description: 'Quick Simulator in your pocket. Analyse missions performance and revenue, view range circle and compare aircraft.',
    category: 'Other Apps',
    platforms: ['android', 'ios'],
  },
  // Data Management Tools
  {
    tool: 'atmosphere',
    title: 'Atmosphere Editor',
    description: 'Description here',
    category: 'Data Management Tools',
    platforms: ['web'],
  },
  {
    tool: 'ac-config',
    title: 'Aircraft Configurator',
    description: 'Description here',
    category: 'Data Management Tools',
    platforms: ['web'],
  },
  {
    tool: 'navdb-editor',
    title: 'Navigation Editor',
    description: 'Customize Airac Cycles dataset to define default data that need to be used in our simulations.',
    category: 'Data Management Tools',
    platforms: ['web'],
  },
];

const CATEGORIES = [
  'All',
  'Flight Operations',
  'Commercial Operations',
  'Maintenance Operations',
  'Network Operations',
  'Admin',
];

// Categories in the tool catalog view
const TOOL_SECTIONS = ['Simulation Apps', 'Other Apps', 'Data Management Tools'];

// Favourite tools (by title)
const FAVOURITE_TITLES = ['Trajectory Optimiser'];

// ---------------------------------------------------------------------------
// Airbus Logo (inline SVG for footer)
// ---------------------------------------------------------------------------

function AirbusLogoWhite() {
  return (
    <svg width="86" height="16" viewBox="0 0 86 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M39.637 5.45725C39.637 2.54223 37.7305 0.32666 33.8017 0.32666H25.8975V15.6484H29.6172V3.63801H33.825C35.3827 3.63801 35.9403 4.5245 35.9403 5.55044C35.9403 6.59996 35.3592 7.46288 33.8015 7.46288H30.1981L35.3126 15.6484H39.5439C39.5439 15.6484 36.0565 10.1446 36.0799 10.1446C38.2422 9.63174 39.637 8.11585 39.637 5.45725" fill="white"/>
      <rect x="19.668" y="0.32666" width="3.71977" height="15.3219" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.78806 0.32666L0 15.6484H4.18447L5.44602 13.0832H11.7167L10.1592 9.86482H7.02894L9.34533 5.15412H9.39211L14.5995 15.6484H18.8771L11.089 0.32666H7.78806Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M53.2145 7.69617C54.4004 7.04298 55.0281 5.99369 55.0281 4.45444C55.0281 1.98244 53.1915 0.32666 50.0996 0.32666H41.4043V15.6484H50.4483C53.6098 15.6484 55.679 13.9459 55.679 11.3574C55.6788 9.5619 54.6793 8.20925 53.2145 7.69617V7.69617ZM45.1245 3.56817H50.0996C50.8436 3.56817 51.4247 4.15109 51.4247 4.92082C51.4247 5.69055 50.8436 6.27347 50.0761 6.27347H45.1243V3.56817H45.1245ZM50.1922 12.43H45.1243V9.30504H50.1922C51.099 9.30504 51.7965 9.95823 51.7965 10.8443C51.7967 11.7537 51.099 12.43 50.1922 12.43V12.43Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M67.4197 8.88536C67.4197 11.211 66.3502 12.5001 64.2349 12.5001C62.1427 12.5001 61.0732 11.211 61.0732 8.88536V0.32666H57.2607V8.60558C57.2607 13.3398 59.7483 15.9751 64.2349 15.9751C68.7216 15.9751 71.2324 13.3398 71.2324 8.60558V0.32666H67.4197V8.88536Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M81.1589 6.41341C77.6277 5.55092 76.8582 5.46854 76.8582 4.45427C76.8582 3.66962 77.7415 3.28822 79.2294 3.28822C81.2054 3.28822 83.3097 3.78551 84.5066 4.52432L85.6923 1.39935C84.1581 0.583135 81.9029 0 79.2759 0C75.3469 0 73.1382 1.95914 73.1382 4.59416C73.1382 7.42962 74.788 8.58162 78.5782 9.39827C81.5289 10.0508 82.1581 10.4579 82.1581 11.2871C82.1581 12.1879 81.3447 12.5933 79.7406 12.5933C77.4158 12.5933 75.3117 12.0268 73.6264 11.1008L72.4873 14.3656C74.3239 15.3451 77.0671 15.9749 79.8335 15.9749C83.6927 15.9749 85.994 14.179 85.994 11.1706C85.9945 8.75697 84.4379 7.20649 81.1589 6.41341" fill="white"/>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter tools based on selected category chip
  const filteredTools = activeCategory === 'All'
    ? ALL_TOOLS
    : ALL_TOOLS.filter((t) => {
        // Map chip categories to tool categories — customize this mapping
        const mapping: Record<string, string[]> = {
          'Flight Operations': ['Simulation Apps'],
          'Commercial Operations': ['Other Apps'],
          'Maintenance Operations': ['Other Apps'],
          'Network Operations': ['Data Management Tools'],
          'Admin': [],
        };
        return (mapping[activeCategory] || []).includes(t.category);
      });

  // Group filtered tools by section
  const toolsBySection = TOOL_SECTIONS.map((section) => ({
    title: section,
    tools: filteredTools.filter((t) => t.category === section),
  })).filter((s) => s.tools.length > 0);

  // Favourite tools
  const favouriteTools = ALL_TOOLS.filter((t) => FAVOURITE_TITLES.includes(t.title));

  const handleToolClick = (title: string) => {
    console.log('Tool clicked:', title);
  };

  const handleMoreOptions = (e: React.MouseEvent, title: string) => {
    console.log('More options:', title);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Contact form submitted');
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <AppHeader
        appName="Airline Digital Twin"
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

      {/* Hero Section */}
      <section
        className="landing-page__hero"
        style={{ backgroundImage: `url(${landingBackground})` }}
      >
        <div className="landing-page__hero-overlay" />
        <div className="landing-page__hero-content">
          <h1 className="landing-page__hero-title">Airline Digital Twin</h1>
          <p className="landing-page__hero-subtitle">
            A virtual copy of the skies, a playground for the future of aviation
          </p>
          <p className="landing-page__hero-description">
            Welcome to Airline Digital Twin, our platform to craft a virtual replica of the skies, providing airlines with a digital playground dedicated to the analysis of aviation. Explore our cutting-edge aeronautical simulation tools, propelling the industry towards new heights of innovation and efficiency.
          </p>
          <div className="landing-page__hero-actions">
            <Button
              label="LEARN MORE"
              variant="Ghost"
              size="M"
              onClick={() => console.log('Learn more')}
            />
            <Button
              label="OUR TOOLS"
              rightIcon="arrow_downward"
              size="M"
              onClick={() => {
                document.querySelector('.landing-page__tools')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="landing-page__main">
        {/* Favourite Tools */}
        {favouriteTools.length > 0 && (
          <section className="landing-page__favourites">
            <h2 className="landing-page__section-title">Your Favourite</h2>
            <div className="landing-page__favourites-container">
              <div className="landing-page__favourites-grid">
                {favouriteTools.map((tool) => (
                  <ToolTile
                    key={tool.title}
                    tool={tool.tool}
                    title={tool.title}
                    description={tool.description}
                    platforms={tool.platforms}
                    onClick={() => handleToolClick(tool.title)}
                    onMoreOptions={(e) => handleMoreOptions(e, tool.title)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Our Tools */}
        <section className="landing-page__tools">
          <h2 className="landing-page__section-title">Our Tools</h2>

          {/* Category Chip Filters */}
          <div className="landing-page__filters">
            {CATEGORIES.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                size="S"
                type="Selectable"
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          {/* Tool Categories */}
          {toolsBySection.map((section) => (
            <div key={section.title} className="landing-page__category">
              <h3 className="landing-page__category-title">{section.title}</h3>
              <div className="landing-page__category-grid">
                {section.tools.map((tool) => (
                  <ToolTile
                    key={tool.title}
                    tool={tool.tool}
                    title={tool.title}
                    description={tool.description}
                    platforms={tool.platforms}
                    onClick={() => handleToolClick(tool.title)}
                    onMoreOptions={(e) => handleMoreOptions(e, tool.title)}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Contact Us */}
      <section className="landing-page__contact">
        <form className="landing-page__contact-inner" onSubmit={handleContactSubmit}>
          <h2 className="landing-page__contact-title">CONTACT US</h2>

          <div className="landing-page__contact-row">
            <TextInput
              label="Name"
              placeholder="Jane doe"
              size="M"
            />
            <Select
              label="Department"
              placeholder="Choose your department"
              size="M"
              options={[
                { value: 'engineering', label: 'Engineering' },
                { value: 'operations', label: 'Operations' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'support', label: 'Support' },
              ]}
            />
            <TextInput
              label="email"
              placeholder="jane.doe@airbus.com"
              size="M"
              type="email"
            />
          </div>

          <div className="landing-page__contact-field">
            <label className="landing-page__contact-label">Message</label>
            <textarea
              className="landing-page__contact-textarea"
              placeholder="Write your message here"
            />
          </div>

          <Button
            label="SEND MESSAGE"
            variant="Outlined"
            size="M"
            className="landing-page__contact-button"
            onClick={() => {}}
          />
        </form>
      </section>

      {/* Footer */}
      <footer className="landing-page__footer">
        <a href="#privacy" className="landing-page__footer-link">Privacy policy</a>
        <div className="landing-page__footer-right">
          <span className="landing-page__footer-copyright">&copy;Airbus 2024</span>
          <div className="landing-page__footer-logo">
            <AirbusLogoWhite />
          </div>
        </div>
      </footer>
    </div>
  );
}
