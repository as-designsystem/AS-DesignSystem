import './Tokens.css';
import { CodeBlock } from '../components/CodeBlock';

const installSteps = `# 1. Initialize your project
cd your-react-project
npx @as-designsystem/cli init

# 2. Add components
asds add button icon-button

# 3. List available components
asds list`;

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
        </ul>
      </section>

      <section className="tokens-section">
        <h2>Installation Steps</h2>
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
        <h2>Project Structure</h2>
        <CodeBlock code={projectStructure} language="bash" />
      </section>
    </div>
  );
}
