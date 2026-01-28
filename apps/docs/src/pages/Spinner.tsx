import { useState, useEffect, useRef } from 'react';
import { Spinner, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/Spinner.css';
import '@as-design-system/core/Icon.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './Spinner.css';

export default function SpinnerPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [progressValue, setProgressValue] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startProgress = () => {
    setProgressValue(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const variantsCode = `import { Spinner } from '@/design-system/components/Spinner';

// Default — rotating arc icon
<Spinner variant="default" />

// Dots — 8 dots that light up in sequence
<Spinner variant="dots" />

// Arc — growing/shrinking arc (Material Design style)
<Spinner variant="arc" />

// Progress — determinate arc from 0% to 100%
<Spinner variant="progress" value={65} />`;

  const sizesCode = `import { Spinner } from '@/design-system/components/Spinner';

<Spinner size={16} />
<Spinner size={24} />
<Spinner size={32} />
<Spinner size={48} />`;

  const colorsCode = `import { Spinner } from '@/design-system/components/Spinner';

<Spinner color="var(--primary-default, #063b9e)" />
<Spinner color="var(--feedback-error-default, #e4002b)" />
<Spinner color="var(--text-tertiary, #b3bbc8)" />
<Spinner color="#ffc929" />`;

  const progressCode = `import { useState, useEffect } from 'react';
import { Spinner } from '@/design-system/components/Spinner';

const [progress, setProgress] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
  }, 50);
  return () => clearInterval(interval);
}, []);

<Spinner variant="progress" value={progress} size={48} />`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        Spinner
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A loading indicator with multiple animation styles: rotating arc, sequential dots,
        Material Design arc, and determinate progress.
      </p>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="example-container">
          <div style={{ display: 'flex', gap: '0' }}>
          <Tab
            label="Examples"
            size="M"
            status={activeTab === 'examples' ? 'Active' : 'Default'}
            onClick={() => setActiveTab('examples')}
          />
          <Tab
            label="Props"
            size="M"
            status={activeTab === 'props' ? 'Active' : 'Default'}
            onClick={() => setActiveTab('props')}
          />
        </div>
      </div>
      </div>

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <>
          {/* Variants */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Variants
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('variants')}
              />
            </div>
            <div className="example-container">
              <div className="spinner-demo">
                <div className="spinner-demo__item">
                  <Spinner variant="default" size={32} />
                  <span className="spinner-demo__label">default</span>
                </div>
                <div className="spinner-demo__item">
                  <Spinner variant="dots" size={32} />
                  <span className="spinner-demo__label">dots</span>
                </div>
                <div className="spinner-demo__item">
                  <Spinner variant="arc" size={32} />
                  <span className="spinner-demo__label">arc</span>
                </div>
                <div className="spinner-demo__item">
                  <Spinner variant="progress" value={65} size={32} />
                  <span className="spinner-demo__label">progress (65%)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Sizes */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Sizes
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('sizes')}
              />
            </div>
            <div className="example-container">
              <div className="spinner-demo">
                <div className="spinner-demo__item">
                  <Spinner size={16} />
                  <span className="spinner-demo__label">16px</span>
                </div>
                <div className="spinner-demo__item">
                  <Spinner size={24} />
                  <span className="spinner-demo__label">24px</span>
                </div>
                <div className="spinner-demo__item">
                  <Spinner size={32} />
                  <span className="spinner-demo__label">32px</span>
                </div>
                <div className="spinner-demo__item">
                  <Spinner size={48} />
                  <span className="spinner-demo__label">48px</span>
                </div>
              </div>
            </div>
          </section>

          {/* Colors */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Colors
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('colors')}
              />
            </div>
            <div className="example-container">
              <div className="spinner-demo">
                <div className="spinner-demo__item">
                  <Spinner size={24} color="var(--primary-default, #063b9e)" />
                  <span className="spinner-demo__label">Primary</span>
                </div>
                <div className="spinner-demo__item">
                  <Spinner size={24} color="var(--feedback-error-default, #e4002b)" />
                  <span className="spinner-demo__label">Error</span>
                </div>
                <div className="spinner-demo__item">
                  <Spinner size={24} color="var(--text-tertiary, #b3bbc8)" />
                  <span className="spinner-demo__label">Tertiary</span>
                </div>
                <div className="spinner-demo__item">
                  <Spinner size={24} color="#ffc929" />
                  <span className="spinner-demo__label">Custom</span>
                </div>
              </div>
            </div>
          </section>

          {/* Progress demo */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Progress Animation
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('progress')}
              />
            </div>
            <div className="example-container">
              <div className="spinner-demo">
                <div className="spinner-demo__item">
                  <Spinner variant="progress" value={progressValue} size={48} />
                  <span className="spinner-demo__label">{progressValue}%</span>
                </div>
                <div className="spinner-demo__item">
                  <Button
                    label={progressValue > 0 && progressValue < 100 ? 'Running...' : 'Start'}
                    size="S"
                    onClick={startProgress}
                    disabled={progressValue > 0 && progressValue < 100}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
        <section className="component-section">
          <h2
            className="heading-6"
            style={{
              marginTop: '32px',
              marginBottom: '16px',
              color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
            }}
          >
            Props
          </h2>
          <div className="props-table">
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>variant</code></td>
                  <td><code>'default' | 'dots' | 'arc' | 'progress'</code></td>
                  <td><code>'default'</code></td>
                  <td>Animation style</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>number</code></td>
                  <td><code>24</code></td>
                  <td>Size of the spinner in pixels</td>
                </tr>
                <tr>
                  <td><code>color</code></td>
                  <td><code>string</code></td>
                  <td><code>'var(--primary-default, #063b9e)'</code></td>
                  <td>Color of the spinner</td>
                </tr>
                <tr>
                  <td><code>value</code></td>
                  <td><code>number</code></td>
                  <td><code>0</code></td>
                  <td>Progress value 0–100 (only for variant="progress")</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Additional CSS class names</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'variants'}
        onClose={() => setOpenModal(null)}
        title="Spinner — Variants"
        code={variantsCode}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Spinner — Sizes"
        code={sizesCode}
      />
      <CodeModal
        isOpen={openModal === 'colors'}
        onClose={() => setOpenModal(null)}
        title="Spinner — Colors"
        code={colorsCode}
      />
      <CodeModal
        isOpen={openModal === 'progress'}
        onClose={() => setOpenModal(null)}
        title="Spinner — Progress Animation"
        code={progressCode}
      />
    </div>
  );
}
