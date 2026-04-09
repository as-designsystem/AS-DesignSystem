import './Installation.css';
import { Icon } from '@as-designsystem/core';
import '@as-designsystem/core/Icon.css';
import { CodeBlock } from '../components/CodeBlock';

const configureAccess = `# Configure private registry access (one-time setup per project)
npm config set @as-designsystem:registry https://npm.pkg.github.com --location=project
npm config set //npm.pkg.github.com/:_authToken YOUR_TOKEN --location=project`;

const initProject = `# Navigate to your React project
cd your-react-project

# Initialize the design system
npx @as-designsystem/cli init`;

const addComponents = `# Add a single component
npx @as-designsystem/cli add button

# Add multiple components at once
npx @as-designsystem/cli add button icon-button select

# List all available components
npx @as-designsystem/cli list`;

const updateComponents = `# Update components already installed in your project
npx @as-designsystem/cli update`;

const projectStructure = `your-project/
├── src/
│   ├── design-system/
│   │   ├── components/    # React components
│   │   ├── tokens/        # Design tokens (CSS + TS)
│   │   └── icons/         # Icon components
│   └── index.css          # Updated with imports
├── .npmrc                 # Registry configuration
├── asds.config.json       # CLI configuration
└── tsconfig.json          # Updated with aliases`;

export default function LocalInstallation() {
  return (
    <div className="install-page">
      <div className="install-header">
        <div className="install-badge">Recommended</div>
        <h1>Local Installation</h1>
        <p className="install-subtitle">
          Use <code>npx</code> to run the CLI directly from your project without installing it globally.
          This is the recommended approach for teams where each project manages its own dependencies.
        </p>
      </div>

      <section className="install-section">
        <div className="install-step">
          <span className="install-step__number">1</span>
          <h2>Prerequisites</h2>
        </div>
        <ul className="install-list">
          <li>Node.js 18 or higher</li>
          <li>A React 18+ project (Vite, Next.js, or Create React App)</li>
          <li>An access token provided by the design system administrator</li>
        </ul>
      </section>

      <section className="install-section">
        <div className="install-step">
          <span className="install-step__number">2</span>
          <h2>Configure Registry Access</h2>
        </div>
        <p>
          The AS Design System is distributed as a private package via GitHub Packages.
          Configure npm to access it by running these commands at the root of your project:
        </p>
        <CodeBlock code={configureAccess} language="bash" />
        <div className="install-note">
          <Icon name="info" size={16} />
          <span>Replace <code>YOUR_TOKEN</code> with the access token provided by your team administrator. This creates a <code>.npmrc</code> file in your project.</span>
        </div>
      </section>

      <section className="install-section">
        <div className="install-step">
          <span className="install-step__number">3</span>
          <h2>Initialize Your Project</h2>
        </div>
        <p>
          Run the CLI with <code>npx</code> to set up the design system structure in your project:
        </p>
        <CodeBlock code={initProject} language="bash" />
        <p style={{ marginTop: '16px' }}>The CLI will automatically:</p>
        <ul className="install-list">
          <li>Create the <code>src/design-system/</code> directory</li>
          <li>Install design tokens (colors, typography, spacing)</li>
          <li>Update your global CSS with token imports</li>
          <li>Configure path aliases in <code>tsconfig.json</code></li>
        </ul>
      </section>

      <section className="install-section">
        <div className="install-step">
          <span className="install-step__number">4</span>
          <h2>Add Components</h2>
        </div>
        <p>Add the components you need to your project:</p>
        <CodeBlock code={addComponents} language="bash" />
      </section>

      <section className="install-section">
        <div className="install-step">
          <span className="install-step__number">5</span>
          <h2>Update Components</h2>
        </div>
        <p>
          When new versions are available, update your installed components to the latest version:
        </p>
        <CodeBlock code={updateComponents} language="bash" />
        <div className="install-note">
          <Icon name="info" size={16} />
          <span>Since you're using <code>npx</code>, it will always fetch the latest version of the CLI automatically.</span>
        </div>
      </section>

      <section className="install-section">
        <div className="install-step">
          <span className="install-step__number">6</span>
          <h2>Project Structure</h2>
        </div>
        <p>After initialization, your project will look like this:</p>
        <CodeBlock code={projectStructure} language="bash" />
      </section>
    </div>
  );
}
