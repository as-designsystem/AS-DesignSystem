import './Tokens.css';
import { CodeBlock } from '../components/CodeBlock';

const setupAccess = `# Configure private registry access (one-time setup)
npm config set @as-designsystem:registry https://npm.pkg.github.com --location=project
npm config set //npm.pkg.github.com/:_authToken YOUR_TOKEN --location=project`;

const installGlobal = `# Install the CLI globally
npm install -g @as-designsystem/cli`;

const installSteps = `# 1. Initialize your project
cd your-react-project
asds init

# 2. Add components
asds add button icon-button

# 3. List available components
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

export default function Installation() {
  return (
    <div className="tokens-page">
      <h1>Installation</h1>

      <section className="tokens-section">
        <h2>Prerequisites</h2>
        <ul>
          <li>Node.js 18+</li>
          <li>React 18+ project (Vite, CRA, or Next.js)</li>
          <li>pnpm, npm, or yarn</li>
          <li>Access token provided by the design system administrator</li>
        </ul>
      </section>

      <section className="tokens-section">
        <h2>1. Configure Access</h2>
        <p>The AS Design System is distributed as a private package via GitHub Packages. You need to configure npm to access it (one-time setup).</p>
        <CodeBlock code={setupAccess} language="bash" />
        <p style={{ marginTop: '16px' }}>
          Replace <code>YOUR_TOKEN</code> with the access token provided by your team administrator.
        </p>
      </section>

      <section className="tokens-section">
        <h2>2. Install the CLI</h2>
        <CodeBlock code={installGlobal} language="bash" />
        <p style={{ marginTop: '16px' }}>
          This gives you access to the <code>asds</code> command globally. To update the CLI later, run the same command.
        </p>
      </section>

      <section className="tokens-section">
        <h2>3. Use the CLI</h2>
        <CodeBlock code={installSteps} language="bash" />
        <p style={{ marginTop: '24px' }}>The CLI will automatically:</p>
        <ul>
          <li>Create <code>src/design-system/</code> directory</li>
          <li>Copy component files to your project</li>
          <li>Resolve dependencies automatically</li>
          <li>Update your global CSS with token imports</li>
        </ul>
      </section>

      <section className="tokens-section">
        <h2>4. Update the CLI</h2>
        <p>Updating the CLI does not update the components already installed in your project. After updating the CLI, run <code>asds update</code> to sync your project with the latest component versions.</p>
        <CodeBlock code={updateCli} language="bash" />
      </section>

      <section className="tokens-section">
        <h2>5. Project Structure</h2>
        <CodeBlock code={projectStructure} language="bash" />
      </section>
    </div>
  );
}
