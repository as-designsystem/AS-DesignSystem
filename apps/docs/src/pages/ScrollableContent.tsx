import { useState, useRef } from 'react';
import { ScrollableContent, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/ScrollableContent.css';
import '@as-designsystem/core/Icon.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import './ScrollableContent.css';

export default function ScrollableContentPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const scrollRef = useRef<HTMLDivElement>(null);

  const basicCode = `import { ScrollableContent } from '@/design-system/components/ScrollableContent';
import '@/design-system/components/ScrollableContent.css';

<div style={{ height: '200px' }}>
  <ScrollableContent>
    {/* Your scrollable content here */}
  </ScrollableContent>
</div>`;

  const refCode = `import { useRef } from 'react';
import { ScrollableContent } from '@/design-system/components/ScrollableContent';
import '@/design-system/components/ScrollableContent.css';

const scrollRef = useRef<HTMLDivElement>(null);

const scrollToTop = () => {
  scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
};

<div style={{ height: '200px' }}>
  <ScrollableContent ref={scrollRef}>
    {/* Content */}
  </ScrollableContent>
</div>
<button onClick={scrollToTop}>Scroll to top</button>`;

  const sampleItems = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        ScrollableContent
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A scroll container with a discrete hover-reveal scrollbar for consistent UX across browsers
        and operating systems. The scrollbar thumb appears on hover and disappears when idle.
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
          {/* Basic Usage */}
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
                Basic Usage
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="example-container">
              <p
                className="label-regular-s"
                style={{
                  marginBottom: '12px',
                  color: 'var(--text-secondary, #63728a)',
                }}
              >
                Hover the list below to reveal the scrollbar.
              </p>
              <div className="scrollable-demo">
                <ScrollableContent>
                  <div className="scrollable-demo__list">
                    {sampleItems.map((item) => (
                      <div key={item} className="scrollable-demo__item">
                        {item}
                      </div>
                    ))}
                  </div>
                </ScrollableContent>
              </div>
            </div>
          </section>

          {/* With Ref */}
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
                With Ref (scrollTo)
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('ref')}
              />
            </div>
            <div className="example-container">
              <p
                className="label-regular-s"
                style={{
                  marginBottom: '12px',
                  color: 'var(--text-secondary, #63728a)',
                }}
              >
                Scroll down, then click the button to scroll back to top.
              </p>
              <div className="scrollable-demo">
                <ScrollableContent ref={scrollRef}>
                  <div className="scrollable-demo__list">
                    {sampleItems.map((item) => (
                      <div key={item} className="scrollable-demo__item">
                        {item}
                      </div>
                    ))}
                  </div>
                </ScrollableContent>
              </div>
              <div style={{ marginTop: '12px' }}>
                <Button
                  label="Scroll to top"
                  size="S"
                  variant="Outlined"
                  onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                />
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
                  <td><code>children</code></td>
                  <td><code>React.ReactNode</code></td>
                  <td>—</td>
                  <td>Content to render inside the scrollable area</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>undefined</code></td>
                  <td>Additional CSS class names for the inner scrollable div</td>
                </tr>
                <tr>
                  <td><code>style</code></td>
                  <td><code>React.CSSProperties</code></td>
                  <td><code>undefined</code></td>
                  <td>Inline styles for the inner scrollable div</td>
                </tr>
                <tr>
                  <td><code>ref</code></td>
                  <td><code>React.Ref&lt;HTMLDivElement&gt;</code></td>
                  <td><code>undefined</code></td>
                  <td>Ref to the inner scrollable div (useful for scrollTop manipulation)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="ScrollableContent — Basic Usage"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'ref'}
        onClose={() => setOpenModal(null)}
        title="ScrollableContent — With Ref"
        code={refCode}
      />
    </div>
  );
}
