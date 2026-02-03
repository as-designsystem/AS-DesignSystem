import { useState } from 'react';
import './Tokens.css';

// --- Size tokens ---

interface SizeDef {
  token: string;
  cssVar: string;
  value: string;
  components: string[];
}

const sizeTokens: SizeDef[] = [
  {
    token: '2XS',
    cssVar: '--size-2xs',
    value: '20px',
    components: ['Chip (XS)'],
  },
  {
    token: 'XS',
    cssVar: '--size-xs',
    value: '24px',
    components: ['Button', 'IconButton', 'TextInput', 'NumberInput', 'Select', 'Chip (S)'],
  },
  {
    token: 'S',
    cssVar: '--size-s',
    value: '32px',
    components: ['Button', 'IconButton', 'TextInput', 'NumberInput', 'Select', 'Tab', 'Toggle', 'Checkbox', 'Chip (M)'],
  },
  {
    token: 'M',
    cssVar: '--size-m',
    value: '40px',
    components: ['Button', 'IconButton', 'TextInput', 'NumberInput', 'Select', 'Tab', 'Toggle', 'Checkbox', 'Chip (L)'],
  },
  {
    token: 'L',
    cssVar: '--size-l',
    value: '48px',
    components: ['Button', 'IconButton', 'TextInput', 'NumberInput', 'Select', 'Tab', 'Chip (XL)'],
  },
  {
    token: 'XL',
    cssVar: '--size-xl',
    value: '56px',
    components: ['Button', 'IconButton', 'Tab', 'ButtonGroup'],
  },
];

// --- Radius tokens ---

interface RadiusDef {
  token: string;
  cssVar: string;
  value: string;
}

const radiusTokens: RadiusDef[] = [
  {
    token: 'XS',
    cssVar: '--radius-xs',
    value: '3px',
  },
];

export default function SizeRadius() {
  const [copiedVar, setCopiedVar] = useState<string | null>(null);

  const copyVar = (cssVar: string) => {
    navigator.clipboard.writeText(`var(${cssVar})`);
    setCopiedVar(cssVar);
    setTimeout(() => setCopiedVar(null), 2000);
  };

  return (
    <div className="tokens-page tokens-page--full-width">
      <h1 className="heading-5">Size & Radius</h1>
      <p
        className="label-regular-m"
        style={{ marginTop: '12px', color: 'var(--text-secondary)' }}
      >
        Standard height scale and border-radius tokens used across all components.
      </p>

      {/* ===== SIZES ===== */}
      <section className="tokens-section">
        <h2
          className="heading-6"
          style={{
            marginTop: '32px',
            marginBottom: '8px',
            color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
          }}
        >
          Sizes
        </h2>
        <p
          className="label-regular-s"
          style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}
        >
          Height scale for interactive components. Follows an 8px increment (except 2XS).
        </p>

        <div className="size-radius-table">
          <div className="size-radius-table__header">
            <span className="size-radius-table__col size-radius-table__col--token">Token</span>
            <span className="size-radius-table__col size-radius-table__col--var">CSS Variable</span>
            <span className="size-radius-table__col size-radius-table__col--value">Value</span>
            <span className="size-radius-table__col size-radius-table__col--preview">Preview</span>
            <span className="size-radius-table__col size-radius-table__col--components">Components</span>
          </div>
          {sizeTokens.map((size) => (
            <div
              key={size.token}
              className="size-radius-table__row clickable"
              onClick={() => copyVar(size.cssVar)}
              title={`Click to copy var(${size.cssVar})`}
              style={{ cursor: 'pointer' }}
            >
              <span className="size-radius-table__col size-radius-table__col--token">
                <span className="size-radius-table__token-badge">{size.token}</span>
              </span>
              <span className="size-radius-table__col size-radius-table__col--var">
                <code className="token-code">
                  {copiedVar === size.cssVar ? '✓ Copied!' : size.cssVar}
                </code>
              </span>
              <span className="size-radius-table__col size-radius-table__col--value">
                <span className="size-radius-table__value">{size.value}</span>
              </span>
              <span className="size-radius-table__col size-radius-table__col--preview">
                <span
                  className="size-radius-table__size-bar"
                  style={{ height: size.value }}
                />
              </span>
              <span className="size-radius-table__col size-radius-table__col--components">
                <span className="size-radius-table__components">{size.components.join(', ')}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== RADIUS ===== */}
      <section className="tokens-section">
        <h2
          className="heading-6"
          style={{
            marginTop: '32px',
            marginBottom: '8px',
            color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
          }}
        >
          Radius
        </h2>
        <p
          className="label-regular-s"
          style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}
        >
          Border-radius tokens for component corners.
        </p>

        <div className="size-radius-table">
          <div className="size-radius-table__header">
            <span className="size-radius-table__col size-radius-table__col--token">Token</span>
            <span className="size-radius-table__col size-radius-table__col--var">CSS Variable</span>
            <span className="size-radius-table__col size-radius-table__col--value">Value</span>
            <span className="size-radius-table__col size-radius-table__col--preview">Preview</span>
          </div>
          {radiusTokens.map((r) => (
            <div
              key={r.token}
              className="size-radius-table__row clickable"
              onClick={() => copyVar(r.cssVar)}
              title={`Click to copy var(${r.cssVar})`}
              style={{ cursor: 'pointer' }}
            >
              <span className="size-radius-table__col size-radius-table__col--token">
                <span className="size-radius-table__token-badge">{r.token}</span>
              </span>
              <span className="size-radius-table__col size-radius-table__col--var">
                <code className="token-code">
                  {copiedVar === r.cssVar ? '✓ Copied!' : r.cssVar}
                </code>
              </span>
              <span className="size-radius-table__col size-radius-table__col--value">
                <span className="size-radius-table__value">{r.value}</span>
              </span>
              <span className="size-radius-table__col size-radius-table__col--preview">
                <span
                  className="size-radius-table__radius-box"
                  style={{ borderRadius: r.value }}
                />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== USAGE ===== */}
      <section className="tokens-section">
        <h2
          className="heading-6"
          style={{
            marginTop: '32px',
            marginBottom: '16px',
            color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
          }}
        >
          Usage
        </h2>
        <div className="code-block">
          <code>{`/* Import in your CSS */
@import '@/design-system/tokens/sizes.css';
@import '@/design-system/tokens/radius.css';

/* Use in your styles */
.my-component {
  height: var(--size-m);          /* 40px */
  border-radius: var(--radius-xs); /* 3px */
}

/* Also available as JS constants */
import { sizes, radius } from '@as-design-system/core';
console.log(sizes.m);    // "40px"
console.log(radius.xs);  // "3px"`}</code>
        </div>
      </section>
    </div>
  );
}
