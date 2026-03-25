import { useState } from 'react';
import { Accordion, Tab, Button, Checkbox, Select } from '@as-design-system/core';
import '@as-design-system/core/Accordion.css';
import '@as-design-system/core/Icon.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Checkbox.css';
import '@as-design-system/core/Select.css';
import CodeModal from '../components/CodeModal';
import './Accordion.css';

export default function AccordionPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { Accordion } from '@/design-system/composites/Accordion';

<Accordion title="Filters">
  <p>Filter content here...</p>
</Accordion>`;

  const openCode = `import { Accordion } from '@/design-system/composites/Accordion';

<Accordion title="Filters" defaultOpen>
  <Checkbox label="Calendar" status="Checked" />
  <Select
    label="Aircraft Type"
    options={[{ value: 'all', label: 'ALL AIRCRAFT TYPE' }]}
    value="all"
  />
</Accordion>`;

  const sizesCode = `import { Accordion } from '@/design-system/composites/Accordion';

{/* Small — 32px header */}
<Accordion title="Filters" size="S">
  <p>Small accordion content</p>
</Accordion>

{/* Medium (default) — 40px header */}
<Accordion title="Filters" size="M">
  <p>Medium accordion content</p>
</Accordion>

{/* Large — 48px header */}
<Accordion title="Filters" size="L">
  <p>Large accordion content</p>
</Accordion>`;

  const controlledCode = `import { Accordion } from '@/design-system/composites/Accordion';

const [isOpen, setIsOpen] = useState(false);

<Accordion
  title="Advanced Settings"
  open={isOpen}
  onToggle={setIsOpen}
>
  <p>Controlled content...</p>
</Accordion>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        Accordion
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A collapsible panel with a corporate-styled header and expandable content area.
        Features a left accent border, title, and chevron toggle icon.
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
          {/* Collapsed (Default) */}
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
                Collapsed (Default)
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
              <div className="accordion-demo">
                <Accordion title="Filters">
                  <p>Filter content here...</p>
                </Accordion>
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
              <div className="accordion-demo" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Accordion title="Filters" size="S">
                  <p className="label-regular-s" style={{ color: 'var(--text-main, #14171d)' }}>Small (S) — 32px header</p>
                </Accordion>
                <Accordion title="Filters" size="M">
                  <p className="label-regular-s" style={{ color: 'var(--text-main, #14171d)' }}>Medium (M) — 40px header (default)</p>
                </Accordion>
                <Accordion title="Filters" size="L">
                  <p className="label-regular-s" style={{ color: 'var(--text-main, #14171d)' }}>Large (L) — 48px header</p>
                </Accordion>
              </div>
            </div>
          </section>

          {/* Expanded */}
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
                Expanded
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('open')}
              />
            </div>
            <div className="example-container">
              <div className="accordion-demo">
                <Accordion title="Filters" defaultOpen>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span className="label-bold-s" style={{ color: 'var(--text-secondary, #63728a)' }}>
                      Interval Yield
                    </span>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', height: '40px' }}>
                      <Checkbox label="Calendar" status="Checked" size="S" />
                      <Checkbox label="FC" status="Checked" size="S" />
                      <Checkbox label="FH" status="Checked" size="S" />
                    </div>
                  </div>
                  <div style={{ width: '240px' }}>
                    <Select
                      label="Aircraft Type"
                      options={[
                        { value: 'all', label: 'ALL AIRCRAFT TYPE' },
                        { value: 'a320', label: 'A320' },
                        { value: 'a330', label: 'A330' },
                      ]}
                      value="all"
                      size="M"
                    />
                  </div>
                </Accordion>
              </div>
            </div>
          </section>

          {/* Controlled */}
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
                Controlled
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('controlled')}
              />
            </div>
            <div className="example-container">
              <div className="accordion-demo">
                <ControlledAccordionExample />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
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
                <td><code>title</code></td>
                <td><code>string</code></td>
                <td>-</td>
                <td>Title displayed in the accordion header</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>'S' | 'M' | 'L'</code></td>
                <td><code>'M'</code></td>
                <td>Size variant</td>
              </tr>
              <tr>
                <td><code>children</code></td>
                <td><code>ReactNode</code></td>
                <td>-</td>
                <td>Content displayed when the accordion is open</td>
              </tr>
              <tr>
                <td><code>defaultOpen</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Whether the accordion is initially open</td>
              </tr>
              <tr>
                <td><code>open</code></td>
                <td><code>boolean</code></td>
                <td>-</td>
                <td>Controlled open state (overrides internal state)</td>
              </tr>
              <tr>
                <td><code>onToggle</code></td>
                <td><code>(open: boolean) =&gt; void</code></td>
                <td>-</td>
                <td>Callback when the accordion is toggled</td>
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
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Collapsed Accordion"
        sections={[{ title: 'Accordion.tsx', language: 'tsx', code: basicCode }]}
      />
      <CodeModal
        isOpen={openModal === 'open'}
        onClose={() => setOpenModal(null)}
        title="Expanded Accordion"
        sections={[{ title: 'Accordion.tsx', language: 'tsx', code: openCode }]}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Accordion Sizes"
        sections={[{ title: 'Accordion.tsx', language: 'tsx', code: sizesCode }]}
      />
      <CodeModal
        isOpen={openModal === 'controlled'}
        onClose={() => setOpenModal(null)}
        title="Controlled Accordion"
        sections={[{ title: 'Accordion.tsx', language: 'tsx', code: controlledCode }]}
      />
    </div>
  );
}

function ControlledAccordionExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button
        label={isOpen ? 'CLOSE' : 'OPEN'}
        size="S"
        variant="Outlined"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Accordion
        title="Advanced Settings"
        open={isOpen}
        onToggle={setIsOpen}
      >
        <p className="label-regular-s" style={{ color: 'var(--text-main, #14171d)' }}>
          This accordion is controlled externally via the button above.
        </p>
      </Accordion>
    </div>
  );
}
