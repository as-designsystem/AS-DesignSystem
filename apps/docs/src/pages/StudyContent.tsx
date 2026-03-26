import { useState } from 'react';
import { StudyContent, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/StudyContent.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './StudyContent.css';

export default function StudyContentPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const scrollableCode = `import { StudyContent } from '@/design-system/components/StudyContent';

<StudyContent variant="Scrollable">
  <div className="my-card">Card 1</div>
  <div className="my-card">Card 2</div>
  <div className="my-card">Card 3</div>
</StudyContent>`;

  const fixedCode = `import { StudyContent } from '@/design-system/components/StudyContent';

<StudyContent variant="Fixed">
  <div className="my-table-header">Header</div>
  <div className="my-table-body">Table content fills remaining space</div>
</StudyContent>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          StudyContent
        </h1>
        <InstallCommand componentName="study-content" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A layout container for study page content. Use <strong>Scrollable</strong> for
        stacked cards or forms (more padding, scrollable), and <strong>Fixed</strong> for
        tables, maps, or full-size charts (compact, non-scrollable).
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
          {/* Scrollable */}
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
                Scrollable
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('scrollable')}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Padding: 32px, Gap: 24px. Content scrolls vertically when it overflows.
            </p>
            <div className="study-content-demo">
              <StudyContent variant="Scrollable">
                <div className="study-content-demo__block">Card 1</div>
                <div className="study-content-demo__block">Card 2</div>
                <div className="study-content-demo__block">Card 3</div>
                <div className="study-content-demo__block">Card 4</div>
                <div className="study-content-demo__block">Card 5</div>
              </StudyContent>
            </div>
          </section>

          {/* Fixed */}
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
                Fixed
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('fixed')}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Padding: 16px, Gap: 8px. Children fill the available space (no scroll).
            </p>
            <div className="study-content-demo">
              <StudyContent variant="Fixed">
                <div className="study-content-demo__header">Table Header</div>
                <div className="study-content-demo__fill">
                  Table / Chart / Map — fills remaining space
                </div>
              </StudyContent>
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
          <div className="props-table-container">
            <table className="props-table">
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
                  <td><code>'Scrollable' | 'Fixed'</code></td>
                  <td><code>'Scrollable'</code></td>
                  <td>Layout variant — Scrollable for stacked content, Fixed for full-size content</td>
                </tr>
                <tr>
                  <td><code>children</code></td>
                  <td><code>React.ReactNode</code></td>
                  <td>-</td>
                  <td>Content to render inside the layout</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Additional CSS class</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'scrollable'}
        onClose={() => setOpenModal(null)}
        title="StudyContent — Scrollable"
        sections={[{ title: 'StudyContent.tsx', language: 'tsx', code: scrollableCode }]}
      />
      <CodeModal
        isOpen={openModal === 'fixed'}
        onClose={() => setOpenModal(null)}
        title="StudyContent — Fixed"
        sections={[{ title: 'StudyContent.tsx', language: 'tsx', code: fixedCode }]}
      />
    </div>
  );
}
