import './Installation.css';
import { CodeBlock } from '../components/CodeBlock';

const configureAccess = `# Configure private registry access (one-time setup)
npm config set @as-designsystem:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken YOUR_TOKEN`;

const installGlobal = `# Install the CLI globally
npm install -g @as-designsystem/cli`;

const useCli = `# Navigate to your React project
cd your-react-project

# Initialize the design system
asds init

# Add components
asds add button icon-button select

# List all available components
asds list`;

const updateCli = `# Update the CLI to the latest version
npm install -g @as-designsystem/cli@latest

# Then update components already installed in your project
asds update`;

const projectStructure = `your-project/
├── src/
│   ├── design-system/
│   │   ├── components/    # React components
│   │   ├── tokens/        # Design tokens (CSS + TS)
│   │   └── icons/         # Icon components
│   └── index.css          # Updated with imports
├── asds.config.json       # CLI configuration
└── tsconfig.json          # Updated with aliases`;

export default function GlobalInstallation() {
  return (
    <div className="install-page">
      <div className="install-header">
        <h1>Global Installation</h1>
        <p className="install-subtitle">
          Install the CLI globally on your machine to use the <code>asds</code> command directly
          from any project, without needing <code>npx</code>.
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
          Configure npm to access it globally on your machine:
        </p>
        <CodeBlock code={configureAccess} language="bash" />
        <div className="install-note">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>Replace <code>YOUR_TOKEN</code> with the access token provided by your team administrator. This saves the configuration to your user-level <code>.npmrc</code>.</span>
        </div>
      </section>

      <section className="install-section">
        <div className="install-step">
          <span className="install-step__number">3</span>
          <h2>Install the CLI</h2>
        </div>
        <p>Install the CLI globally so the <code>asds</code> command is available from anywhere:</p>
        <CodeBlock code={installGlobal} language="bash" />
      </section>

      <section className="install-section">
        <div className="install-step">
          <span className="install-step__number">4</span>
          <h2>Use the CLI</h2>
        </div>
        <p>Navigate to your React project and use the <code>asds</code> command:</p>
        <CodeBlock code={useCli} language="bash" />
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
          <span className="install-step__number">5</span>
          <h2>Update</h2>
        </div>
        <p>
          Updating the CLI does not update the components already installed in your project.
          After updating the CLI, run <code>asds update</code> to sync your project with the latest component versions.
        </p>
        <CodeBlock code={updateCli} language="bash" />
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
