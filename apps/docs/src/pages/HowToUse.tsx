import './Tokens.css';
import { CodeBlock } from '../components/CodeBlock';

const componentsCode = `import { Button } from '@/design-system/components/Button';
import { Icon } from '@/design-system/components/Icon';

function MyComponent() {
  return (
    <Button
      variant="primary"
      size="M"
      leftIcon="add"
    >
      Add Item
    </Button>
  );
}`;

const colorsCode = `/* CSS Variables (in your .css files) */
.my-element {
  color: var(--text-main);
  background-color: var(--primary-default);
}

/* TypeScript Constants (in your .tsx files) */
import { colors } from '@/design-system/tokens/colors';

const MyComponent = () => (
  <div style={{ color: colors.primary.default }}>
    Content
  </div>
);`;

const textStylesCode = `function MyComponent() {
  return (
    <div>
      <h1 className="heading-1">Main Title</h1>
      <p className="body-large">This is body text</p>
      <span className="legend-bold">Legend text</span>
    </div>
  );
}`;

export default function HowToUse() {
  return (
    <div className="tokens-page">
      <h1>How to Use</h1>

      <section className="tokens-section">
        <h2>Using Components</h2>
        <p>Import components from your local design-system directory:</p>
        <CodeBlock code={componentsCode} language="tsx" />
      </section>

      <section className="tokens-section">
        <h2>Using Colors</h2>
        <p>Use colors as CSS variables or TypeScript constants:</p>
        <CodeBlock code={colorsCode} language="tsx" />
      </section>

      <section className="tokens-section">
        <h2>Using Text Styles</h2>
        <p>Apply pre-defined text style classes directly in your JSX:</p>
        <CodeBlock code={textStylesCode} language="tsx" />
        <p className="tokens-note">
          See the <strong>Text Styles</strong> page for all available classes.
        </p>
      </section>
    </div>
  );
}
