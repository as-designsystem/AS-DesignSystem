import { useState } from 'react';
import './Tokens.css';

interface TextStyleDef {
  className: string;
  label: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  fontFamily?: string;
}

const WEIGHT_LABELS: Record<string, string> = {
  '700': 'Bold',
  '500': 'Medium',
  '400': 'Regular',
  '300': 'Light',
};

const sections: { title: string; styles: TextStyleDef[] }[] = [
  {
    title: 'Headings',
    styles: [
      { className: 'heading-1', label: 'Heading 1', fontSize: '56', lineHeight: '80', fontWeight: '700' },
      { className: 'subheading-1', label: 'Subheading 1', fontSize: '56', lineHeight: '80', fontWeight: '300' },
      { className: 'heading-2', label: 'Heading 2', fontSize: '48', lineHeight: '72', fontWeight: '700' },
      { className: 'subheading-2', label: 'Subheading 2', fontSize: '48', lineHeight: '72', fontWeight: '300' },
      { className: 'heading-3', label: 'Heading 3', fontSize: '36', lineHeight: '56', fontWeight: '700' },
      { className: 'subheading-3', label: 'Subheading 3', fontSize: '36', lineHeight: '56', fontWeight: '300' },
      { className: 'heading-4', label: 'Heading 4', fontSize: '32', lineHeight: '48', fontWeight: '700' },
      { className: 'subheading-4', label: 'Subheading 4', fontSize: '32', lineHeight: '48', fontWeight: '300' },
      { className: 'heading-5', label: 'Heading 5', fontSize: '24', lineHeight: '40', fontWeight: '700' },
      { className: 'subheading-5', label: 'Subheading 5', fontSize: '24', lineHeight: '40', fontWeight: '300' },
      { className: 'heading-6', label: 'Heading 6', fontSize: '20', lineHeight: '32', fontWeight: '700' },
      { className: 'subheading-6', label: 'Subheading 6', fontSize: '20', lineHeight: '32', fontWeight: '300' },
    ],
  },
  {
    title: 'Labels - Large',
    styles: [
      { className: 'label-bold-l', label: 'Label Bold L', fontSize: '18', lineHeight: '32', fontWeight: '700' },
      { className: 'label-medium-l', label: 'Label Medium L', fontSize: '18', lineHeight: '32', fontWeight: '500' },
      { className: 'label-regular-l', label: 'Label Regular L', fontSize: '18', lineHeight: '32', fontWeight: '400' },
      { className: 'label-light-l', label: 'Label Light L', fontSize: '18', lineHeight: '32', fontWeight: '300' },
    ],
  },
  {
    title: 'Labels - Medium',
    styles: [
      { className: 'label-bold-m', label: 'Label Bold M', fontSize: '16', lineHeight: '24', fontWeight: '700' },
      { className: 'label-medium-m', label: 'Label Medium M', fontSize: '16', lineHeight: '24', fontWeight: '500' },
      { className: 'label-regular-m', label: 'Label Regular M', fontSize: '16', lineHeight: '24', fontWeight: '400' },
      { className: 'label-light-m', label: 'Label Light M', fontSize: '16', lineHeight: '24', fontWeight: '300' },
    ],
  },
  {
    title: 'Labels - Small',
    styles: [
      { className: 'label-bold-s', label: 'Label Bold S', fontSize: '14', lineHeight: '20', fontWeight: '700' },
      { className: 'label-medium-s', label: 'Label Medium S', fontSize: '14', lineHeight: '20', fontWeight: '500' },
      { className: 'label-regular-s', label: 'Label Regular S', fontSize: '14', lineHeight: '20', fontWeight: '400' },
      { className: 'label-light-s', label: 'Label Light S', fontSize: '14', lineHeight: '20', fontWeight: '300' },
    ],
  },
  {
    title: 'Labels - Extra Small',
    styles: [
      { className: 'label-bold-xs', label: 'Label Bold XS', fontSize: '12', lineHeight: '20', fontWeight: '700' },
      { className: 'label-medium-xs', label: 'Label Medium XS', fontSize: '12', lineHeight: '20', fontWeight: '500' },
      { className: 'label-regular-xs', label: 'Label Regular XS', fontSize: '12', lineHeight: '20', fontWeight: '400' },
      { className: 'label-light-xs', label: 'Label Light XS', fontSize: '12', lineHeight: '20', fontWeight: '300' },
    ],
  },
  {
    title: 'Legends',
    styles: [
      { className: 'legend-bold', label: 'Legend Bold', fontSize: '11', lineHeight: '20', fontWeight: '700' },
      { className: 'legend-medium', label: 'Legend Medium', fontSize: '11', lineHeight: '20', fontWeight: '500' },
    ],
  },
  {
    title: 'System (Monospace)',
    styles: [
      { className: 'system-l', label: 'System L', fontSize: '18', lineHeight: '28', fontWeight: '400', fontFamily: 'Roboto Mono' },
      { className: 'system-m', label: 'System M', fontSize: '16', lineHeight: '24', fontWeight: '400', fontFamily: 'Roboto Mono' },
      { className: 'system-s', label: 'System S', fontSize: '14', lineHeight: '20', fontWeight: '400', fontFamily: 'Roboto Mono' },
      { className: 'system-xs', label: 'System XS', fontSize: '12', lineHeight: '20', fontWeight: '400', fontFamily: 'Roboto Mono' },
    ],
  },
];

function formatSpecs(style: TextStyleDef) {
  const weight = WEIGHT_LABELS[style.fontWeight] || style.fontWeight;
  const parts = [`${style.fontSize}/${style.lineHeight}px`, weight];
  if (style.fontFamily) parts.push(style.fontFamily);
  return parts.join(' · ');
}

export default function TextStyles() {
  const [copiedClass, setCopiedClass] = useState<string | null>(null);

  const copyClassName = (className: string) => {
    navigator.clipboard.writeText(className);
    setCopiedClass(className);
    setTimeout(() => setCopiedClass(null), 2000);
  };

  return (
    <div className="tokens-page tokens-page--full-width">
      <h1 className="heading-5">Text Styles</h1>
      <p className="label-regular-m" style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
        Les styles de texte (typographie) générés depuis Figma.
      </p>

      {sections.map((section) => (
        <section key={section.title} className="tokens-section">
          <h2
            className="heading-6"
            style={{
              marginTop: '32px',
              marginBottom: '16px',
              color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
            }}
          >
            {section.title}
          </h2>
          <div className="text-styles-list">
            {section.styles.map((style) => (
              <div
                key={style.className}
                className="token-item clickable"
                onClick={() => copyClassName(style.className)}
                style={{ cursor: 'pointer' }}
                title="Click to copy class name"
              >
                <p className={style.className}>{style.label}</p>
                <div className="token-item__right">
                  <code className="token-code">
                    {copiedClass === style.className ? '✓ Copied!' : `.${style.className}`}
                  </code>
                  <span className="token-specs">{formatSpecs(style)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
