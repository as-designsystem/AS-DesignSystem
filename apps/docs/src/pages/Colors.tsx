import { useState, createContext, useContext } from 'react';
import './Tokens.css';
import './Colors.css';
import { colors, Tab, ButtonGroup } from '@as-design-system/core';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/ButtonGroup.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/colors.css';

// Color format types
type ColorFormat = 'hex' | 'rgb' | 'variable';

// Context to share format across components
const ColorFormatContext = createContext<{
  format: ColorFormat;
  setFormat: (format: ColorFormat) => void;
}>({
  format: 'hex',
  setFormat: () => {},
});

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Helper function to format color based on selected format
function formatColor(
  hexValue: string,
  variableName: string,
  format: ColorFormat
): string {
  switch (format) {
    case 'hex':
      return hexValue;
    case 'rgb': {
      // Handle rgba values
      if (hexValue.startsWith('rgba') || hexValue.startsWith('rgb')) {
        return hexValue;
      }
      const rgb = hexToRgb(hexValue);
      if (rgb) {
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      }
      return hexValue;
    }
    case 'variable':
      return `var(${variableName})`;
    default:
      return hexValue;
  }
}

// Primitive color variable name mapping
function getPrimitiveVariableName(paletteName: string, shade: string): string {
  const nameMap: Record<string, string> = {
    'Sea Blue': 'sea-blue',
    'Sky Blue': 'sky-blue',
    'Cool Grey': 'cool-grey',
    'Warm Grey': 'warm-grey',
    Red: 'red',
    Green: 'green',
    Yellow: 'yellow',
  };
  return `--${nameMap[paletteName] || paletteName.toLowerCase()}-${shade}`;
}

// Semantic color variable name mapping
function getSemanticVariableName(groupTitle: string, key: string): string {
  const groupMap: Record<string, string> = {
    Primary: 'primary',
    Text: 'text',
    Background: 'background',
    Border: 'border',
    Success: 'feedback-success',
    Error: 'feedback-error',
    Warning: 'feedback-warning',
  };

  const prefix = groupMap[groupTitle] || groupTitle.toLowerCase();

  // Handle special cases for key names
  const keyMap: Record<string, string> = {
    tHover: 't-hover',
    tActive: 't-active',
    tBackground: 't-background',
  };

  const formattedKey = keyMap[key] || key;
  return `--${prefix}-${formattedKey}`;
}

// Get CSS variable reference for semantic colors
function getSemanticCssVariable(groupTitle: string, key: string): string {
  const varName = getSemanticVariableName(groupTitle, key);
  return `var(${varName})`;
}

// Helper component to display a color palette
function ColorPalette({
  name,
  palette,
}: {
  name: string;
  palette: Record<string, string>;
}) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { format } = useContext(ColorFormatContext);
  const shades = Object.keys(palette).reverse(); // From lightest to darkest

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="color-category">
      <h3
        className="label-bold-m"
        style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}
      >
        {name}
      </h3>
      <div className="color-palette">
        {shades.map((shade) => {
          const shadeValue = parseInt(shade);
          // High shades (100-60) = dark colors -> white text
          // Low shades (50-10) = light colors -> black text
          const textColor = shadeValue >= 60 ? '#fff' : '#000';
          const isDark = shadeValue >= 60;
          const variableName = getPrimitiveVariableName(name, shade);
          const displayValue = formatColor(palette[shade], variableName, format);

          return (
            <div
              key={shade}
              className="color-tile clickable"
              style={{
                backgroundColor: palette[shade],
                color: textColor,
                cursor: 'pointer',
              }}
              onClick={() => copyColor(displayValue)}
              title={`Click to copy ${displayValue}`}
            >
              <span className="color-shade">
                {copiedColor === displayValue ? '✓ Copied!' : shade}
              </span>
              <code
                className="color-value"
                style={{
                  backgroundColor: isDark
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'rgba(255, 255, 255, 0.1)',
                }}
              >
                {displayValue}
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper component to display semantic colors
function SemanticColorGroup({
  title,
  colors: semanticColors,
  reference,
}: {
  title: string;
  colors: Record<string, string | Record<string, string>>;
  reference?: string;
}) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { format } = useContext(ColorFormatContext);
  const flattenColors: Array<{ key: string; value: string; fullKey: string }> =
    [];

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  Object.entries(semanticColors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      flattenColors.push({ key, value, fullKey: key });
    } else if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (typeof subValue === 'string') {
          flattenColors.push({
            key: subKey,
            value: subValue,
            fullKey: `${key}.${subKey}`,
          });
        }
      });
    }
  });

  return (
    <div className="semantic-color-group">
      <h3
        className="label-bold-m"
        style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}
      >
        {title}
        {reference && (
          <span className="label-regular-s" style={{ marginLeft: '8px' }}>
            (reference: {reference})
          </span>
        )}
      </h3>
      <div className="semantic-colors-grid">
        {flattenColors.map(({ key, value, fullKey }) => {
          // Use CSS variable for background so it changes with theme
          const cssVariable = getSemanticCssVariable(title, key);

          // Determine text color based on the semantic color type
          // Colors that are dark in light mode but light in dark mode need dynamic text
          const isTextColor = title === 'Text';
          const isPrimaryState = title === 'Primary' && (key === 'default' || key === 'hover' || key === 'active');
          const isFeedbackState = (title === 'Success' || title === 'Error') && (key === 'default' || key === 'hover' || key === 'active');

          // Corporate background is always dark in both modes
          const isAlwaysDark = title === 'Background' && key === 'corporate';

          // For colors that flip (dark in light mode, light in dark mode),
          // use --background-main which is white in light mode and dark in dark mode
          let textColor: string;
          if (isAlwaysDark) {
            textColor = '#fff'; // Always white on corporate
          } else if (isPrimaryState || isFeedbackState || isTextColor) {
            textColor = 'var(--background-main)'; // Flips with theme
          } else {
            textColor = 'var(--text-main)';
          }

          const variableName = getSemanticVariableName(title, key);
          const displayValue = formatColor(value, variableName, format);

          return (
            <div key={fullKey} className="semantic-color-item">
              <div
                className="semantic-color-tile clickable"
                style={{
                  backgroundColor: cssVariable,
                  color: textColor,
                  cursor: 'pointer',
                }}
                onClick={() => copyColor(displayValue)}
                title={`Click to copy ${displayValue}`}
              >
                <span className="semantic-color-name">
                  {copiedColor === displayValue ? '✓ Copied!' : key}
                </span>
              </div>
              <code className="semantic-color-value">{displayValue}</code>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Format selector component
function FormatSelector() {
  const { format, setFormat } = useContext(ColorFormatContext);

  const formatOptions = [
    { value: 'hex', label: 'HEX' },
    { value: 'rgb', label: 'RGB' },
    { value: 'variable', label: 'Variable' },
  ];

  return (
    <div className="color-format-selector">
      <span className="color-format-label">Format</span>
      <ButtonGroup
        options={formatOptions}
        value={format}
        onChange={(value) => setFormat(value as ColorFormat)}
        size="S"
      />
    </div>
  );
}

export default function Colors() {
  const [activeTab, setActiveTab] = useState<'primitives' | 'semantics'>(
    'primitives'
  );
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [format, setFormat] = useState<ColorFormat>('hex');

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Format white/black colors
  const formatWhiteBlack = (hex: string, varName: string) => {
    return formatColor(hex, varName, format);
  };

  return (
    <ColorFormatContext.Provider value={{ format, setFormat }}>
      <div className="tokens-page tokens-page--full-width">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Colors
        </h1>
        <p
          className="label-regular-m"
          style={{ marginTop: '12px', color: 'var(--text-secondary)' }}
        >
          Color tokens generated from Figma.
        </p>

        {/* Controls */}
        <div className="colors-controls">
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0' }}>
            <Tab
              label="Primitives"
              size="M"
              status={activeTab === 'primitives' ? 'Active' : 'Default'}
              onClick={() => setActiveTab('primitives')}
            />
            <Tab
              label="Semantics"
              size="M"
              status={activeTab === 'semantics' ? 'Active' : 'Default'}
              onClick={() => setActiveTab('semantics')}
            />
          </div>

          {/* Format Selector */}
          <FormatSelector />
        </div>

        {/* ========================================================================
          PRIMITIVES TAB
          ======================================================================== */}
        {activeTab === 'primitives' && (
          <section className="tokens-section">
            <div className="primitives-grid">
              <ColorPalette name="Sea Blue" palette={colors.seaBlue} />
              <ColorPalette name="Sky Blue" palette={colors.skyBlue} />
              <ColorPalette name="Cool Grey" palette={colors.coolGrey} />
              <ColorPalette name="Warm Grey" palette={colors.warmGrey} />
              <ColorPalette name="Red" palette={colors.red} />
              <ColorPalette name="Green" palette={colors.green} />
              <ColorPalette name="Yellow" palette={colors.yellow} />
              <div className="color-category">
                <h3
                  className="label-bold-m"
                  style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}
                >
                  White & Black
                </h3>
                <div className="color-palette">
                  <div
                    className="color-tile clickable"
                    style={{
                      backgroundColor: colors.white,
                      color: '#000',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      copyColor(formatWhiteBlack(colors.white, '--white'))
                    }
                    title={`Click to copy ${formatWhiteBlack(colors.white, '--white')}`}
                  >
                    <span className="color-shade">
                      {copiedColor === formatWhiteBlack(colors.white, '--white')
                        ? '✓ Copied!'
                        : 'White'}
                    </span>
                    <code
                      className="color-value"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {formatWhiteBlack(colors.white, '--white')}
                    </code>
                  </div>
                  <div
                    className="color-tile clickable"
                    style={{
                      backgroundColor: colors.black,
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      copyColor(formatWhiteBlack(colors.black, '--black'))
                    }
                    title={`Click to copy ${formatWhiteBlack(colors.black, '--black')}`}
                  >
                    <span className="color-shade">
                      {copiedColor === formatWhiteBlack(colors.black, '--black')
                        ? '✓ Copied!'
                        : 'Black'}
                    </span>
                    <code
                      className="color-value"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      {formatWhiteBlack(colors.black, '--black')}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================
          SEMANTICS TAB
          ======================================================================== */}
        {activeTab === 'semantics' && (
          <section className="tokens-section">
            <div className="semantics-container">
              <SemanticColorGroup
                title="Primary"
                colors={colors.primary}
                reference="Sea Blue"
              />
              <SemanticColorGroup
                title="Text"
                colors={colors.text}
                reference="Cool Grey, Sea Blue"
              />
              <SemanticColorGroup
                title="Background"
                colors={colors.background}
                reference="White, Cool Grey, Sea Blue"
              />
              <SemanticColorGroup
                title="Border"
                colors={colors.border}
                reference="Cool Grey, White"
              />
              <div>
                <h3
                  className="label-bold-l"
                  style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}
                >
                  Feedback
                </h3>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                  <SemanticColorGroup
                    title="Success"
                    colors={colors.feedback.success}
                    reference="Green"
                  />
                  <SemanticColorGroup
                    title="Error"
                    colors={colors.feedback.error}
                    reference="Red"
                  />
                  <SemanticColorGroup
                    title="Warning"
                    colors={colors.feedback.warning}
                    reference="Yellow"
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </ColorFormatContext.Provider>
  );
}
