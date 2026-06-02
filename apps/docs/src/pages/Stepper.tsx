import { useState } from 'react';
import { Stepper, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/Stepper.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/Icon.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './Stepper.css';

export default function StepperPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const sizesCode = `import { Stepper } from '@/design-system/components/Stepper';

<Stepper label="Step 1" size="XL" />
<Stepper label="Step 1" size="L" />
<Stepper label="Step 1" size="M" />
<Stepper label="Step 1" size="S" />
<Stepper label="Step 1" size="XS" />`;

  const contentCode = `import { Stepper } from '@/design-system/components/Stepper';

// Icon content (default)
<Stepper label="Step 1" iconName="settings" size="L" />
<Stepper label="Step 2" iconName="construction" size="L" current={false} />

// Number content
<Stepper label="Step 1" content="Number" value={1} size="L" />
<Stepper label="Step 2" content="Number" value={2} size="L" current={false} />`;

  const statesCode = `import { Stepper } from '@/design-system/components/Stepper';

<Stepper label="Step 1" state="Default" size="L" />
<Stepper label="Step 1" state="Hover" size="L" />
<Stepper label="Step 1" state="Disabled" size="L" />`;

  const currentCode = `import { Stepper } from '@/design-system/components/Stepper';

// Filled (done / current)
<Stepper label="Step 1" current={true} size="L" />

// Outlined (upcoming)
<Stepper label="Step 1" current={false} size="L" />`;

  const dashesCode = `import { Stepper } from '@/design-system/components/Stepper';

// First step — no left dash
<Stepper label="Start" showLeftDash={false} size="M" />

// Last step — no right dash
<Stepper label="End" showRightDash={false} size="M" />

// Standalone — no dashes
<Stepper label="Alone" showLeftDash={false} showRightDash={false} size="M" />`;

  const interactiveCode = `import { Stepper } from '@/design-system/components/Stepper';

<Stepper
  label="Step 1"
  size="L"
  onClick={() => console.log('clicked')}
/>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Stepper
        </h1>
        <InstallCommand componentName="stepper" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A single step indicator: connector line on each side, a dot containing
        an icon or a number, and a label below. Use it standalone or chain
        several with the <code>StepperGroup</code> composite.
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
          {/* Sizes */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
              >
                Sizes
              </h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('sizes')} />
            </div>
            <div className="example-container">
              <div className="stepper-demo">
                <Stepper label="Step 1" size="XL" />
                <Stepper label="Step 1" size="L" />
                <Stepper label="Step 1" size="M" />
                <Stepper label="Step 1" size="S" />
                <Stepper label="Step 1" size="XS" />
              </div>
            </div>
          </section>

          {/* Content: Icon vs Number */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
              >
                Content
              </h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('content')} />
            </div>
            <div className="example-container">
              <div className="stepper-demo stepper-demo--column">
                <div className="stepper-demo__row">
                  <h3 className="label-bold-s" style={{ color: 'var(--text-main, #14171d)', marginRight: '12px' }}>
                    Icon
                  </h3>
                  <Stepper label="Step 1" iconName="settings" size="L" />
                  <Stepper label="Step 2" iconName="construction" size="L" current={false} />
                </div>
                <div className="stepper-demo__row">
                  <h3 className="label-bold-s" style={{ color: 'var(--text-main, #14171d)', marginRight: '12px' }}>
                    Number
                  </h3>
                  <Stepper label="Step 1" content="Number" value={1} size="L" />
                  <Stepper label="Step 2" content="Number" value={2} size="L" current={false} />
                </div>
              </div>
            </div>
          </section>

          {/* Current vs Upcoming */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
              >
                Current vs Upcoming
              </h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('current')} />
            </div>
            <div className="example-container">
              <div className="stepper-demo">
                <Stepper label="Done" current={true} size="L" />
                <Stepper label="Upcoming" current={false} size="L" />
              </div>
            </div>
          </section>

          {/* States */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
              >
                States
              </h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('states')} />
            </div>
            <div className="example-container">
              <div className="stepper-demo">
                <Stepper label="Default" state="Default" size="L" />
                <Stepper label="Hover" state="Hover" size="L" />
                <Stepper label="Disabled" state="Disabled" size="L" />
              </div>
            </div>
          </section>

          {/* Dashes */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
              >
                Hiding connector lines
              </h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('dashes')} />
            </div>
            <div className="example-container">
              <div className="stepper-demo">
                <Stepper label="Start" showLeftDash={false} size="M" />
                <Stepper label="Middle" size="M" />
                <Stepper label="End" showRightDash={false} size="M" />
                <Stepper label="Alone" showLeftDash={false} showRightDash={false} size="M" />
              </div>
            </div>
          </section>

          {/* Interactive */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
              >
                Interactive
              </h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('interactive')} />
            </div>
            <div className="example-container">
              <div className="stepper-demo">
                <Stepper
                  label="Hover me"
                  size="L"
                  onClick={() => {
                    // eslint-disable-next-line no-console
                    console.log('Stepper clicked');
                  }}
                />
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
                <td><code>label</code></td>
                <td><code>string</code></td>
                <td>-</td>
                <td>Text rendered under the dot</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>'XS' | 'S' | 'M' | 'L' | 'XL'</code></td>
                <td><code>'XL'</code></td>
                <td>Size variant</td>
              </tr>
              <tr>
                <td><code>state</code></td>
                <td><code>'Default' | 'Hover' | 'Disabled'</code></td>
                <td><code>'Default'</code></td>
                <td>Visual state of the whole stepper</td>
              </tr>
              <tr>
                <td><code>content</code></td>
                <td><code>'Icon' | 'Number'</code></td>
                <td><code>'Icon'</code></td>
                <td>What is rendered inside the dot</td>
              </tr>
              <tr>
                <td><code>iconName</code></td>
                <td><code>string</code></td>
                <td><code>'settings'</code></td>
                <td>Any DS icon name — used when content is 'Icon'</td>
              </tr>
              <tr>
                <td><code>value</code></td>
                <td><code>string | number</code></td>
                <td><code>1</code></td>
                <td>Value displayed inside the dot — used when content is 'Number'</td>
              </tr>
              <tr>
                <td><code>current</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Filled dot (done / current) vs outlined dot (upcoming)</td>
              </tr>
              <tr>
                <td><code>showLeftDash</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Show the connector line on the left of the dot</td>
              </tr>
              <tr>
                <td><code>showRightDash</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Show the connector line on the right of the dot</td>
              </tr>
              <tr>
                <td><code>showLabel</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Show the label under the dot</td>
              </tr>
              <tr>
                <td><code>onClick</code></td>
                <td><code>() =&gt; void</code></td>
                <td>-</td>
                <td>When provided, the stepper renders as a button and reacts to hover</td>
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
      <CodeModal isOpen={openModal === 'sizes'} onClose={() => setOpenModal(null)} title="Stepper Sizes" sections={[{ title: 'Stepper.tsx', language: 'tsx', code: sizesCode }]} />
      <CodeModal isOpen={openModal === 'content'} onClose={() => setOpenModal(null)} title="Stepper Content" sections={[{ title: 'Stepper.tsx', language: 'tsx', code: contentCode }]} />
      <CodeModal isOpen={openModal === 'current'} onClose={() => setOpenModal(null)} title="Current vs Upcoming" sections={[{ title: 'Stepper.tsx', language: 'tsx', code: currentCode }]} />
      <CodeModal isOpen={openModal === 'states'} onClose={() => setOpenModal(null)} title="Stepper States" sections={[{ title: 'Stepper.tsx', language: 'tsx', code: statesCode }]} />
      <CodeModal isOpen={openModal === 'dashes'} onClose={() => setOpenModal(null)} title="Hiding Connector Lines" sections={[{ title: 'Stepper.tsx', language: 'tsx', code: dashesCode }]} />
      <CodeModal isOpen={openModal === 'interactive'} onClose={() => setOpenModal(null)} title="Interactive Stepper" sections={[{ title: 'Stepper.tsx', language: 'tsx', code: interactiveCode }]} />
    </div>
  );
}
