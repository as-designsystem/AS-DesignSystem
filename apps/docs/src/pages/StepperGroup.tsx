import { useState } from 'react';
import { StepperGroup, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/Stepper.css';
import '@as-designsystem/core/StepperGroup.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/Icon.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './StepperGroup.css';

export default function StepperGroupPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [interactiveStep, setInteractiveStep] = useState(1);

  const basicSteps = [
    { label: 'Setup', iconName: 'settings' },
    { label: 'Build', iconName: 'construction' },
    { label: 'Review', iconName: 'check_circle' },
    { label: 'Deploy', iconName: 'flight_takeoff' },
  ];

  const basicCode = `import { StepperGroup } from '@/design-system/composites/StepperGroup';

<StepperGroup
  size="M"
  currentStep={1}
  steps={[
    { label: 'Setup',  iconName: 'settings' },
    { label: 'Build',  iconName: 'construction' },
    { label: 'Review', iconName: 'check_circle' },
    { label: 'Deploy', iconName: 'flight_takeoff' },
  ]}
/>`;

  const numberCode = `import { StepperGroup } from '@/design-system/composites/StepperGroup';

<StepperGroup
  size="L"
  content="Number"
  currentStep={1}
  steps={[
    { label: 'Account' },
    { label: 'Profile' },
    { label: 'Review' },
  ]}
/>`;

  const sizesCode = `import { StepperGroup } from '@/design-system/composites/StepperGroup';

const steps = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
];

<StepperGroup size="XL" currentStep={1} steps={steps} />
<StepperGroup size="L"  currentStep={1} steps={steps} />
<StepperGroup size="M"  currentStep={1} steps={steps} />
<StepperGroup size="S"  currentStep={1} steps={steps} />
<StepperGroup size="XS" currentStep={1} steps={steps} />`;

  const interactiveCode = `import { useState } from 'react';
import { StepperGroup } from '@/design-system/composites/StepperGroup';

function Example() {
  const [step, setStep] = useState(1);

  return (
    <StepperGroup
      size="M"
      currentStep={step}
      onStepClick={setStep}
      steps={[
        { label: 'Setup',  iconName: 'settings' },
        { label: 'Build',  iconName: 'construction' },
        { label: 'Review', iconName: 'check_circle' },
        { label: 'Deploy', iconName: 'flight_takeoff' },
      ]}
    />
  );
}`;

  const disabledCode = `import { StepperGroup } from '@/design-system/composites/StepperGroup';

<StepperGroup
  size="M"
  currentStep={1}
  disabled
  steps={[
    { label: 'Step 1', iconName: 'settings' },
    { label: 'Step 2', iconName: 'construction' },
    { label: 'Step 3', iconName: 'check_circle' },
  ]}
/>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          StepperGroup
        </h1>
        <InstallCommand componentName="stepper-group" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Renders a horizontal sequence of <code>Stepper</code> indicators. Steps
        up to and including <code>currentStep</code> are filled (done/current);
        steps after are outlined (upcoming). The first/last steps automatically
        hide their outer connector line.
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
          {/* Basic */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
              >
                Basic
              </h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('basic')} />
            </div>
            <div className="example-container">
              <div className="stepper-group-demo">
                <StepperGroup size="M" currentStep={1} steps={basicSteps} />
              </div>
            </div>
          </section>

          {/* Number content */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
              >
                Number content
              </h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('number')} />
            </div>
            <div className="example-container">
              <div className="stepper-group-demo">
                <StepperGroup
                  size="L"
                  content="Number"
                  currentStep={1}
                  steps={[
                    { label: 'Account' },
                    { label: 'Profile' },
                    { label: 'Review' },
                  ]}
                />
              </div>
            </div>
          </section>

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
              <div className="stepper-group-demo stepper-group-demo--column">
                <StepperGroup size="XL" currentStep={1} steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]} />
                <StepperGroup size="L" currentStep={1} steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]} />
                <StepperGroup size="M" currentStep={1} steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]} />
                <StepperGroup size="S" currentStep={1} steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]} />
                <StepperGroup size="XS" currentStep={1} steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]} />
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
                Interactive (click a step)
              </h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('interactive')} />
            </div>
            <div className="example-container">
              <div className="stepper-group-demo">
                <StepperGroup
                  size="M"
                  currentStep={interactiveStep}
                  onStepClick={setInteractiveStep}
                  steps={basicSteps}
                />
              </div>
            </div>
          </section>

          {/* Disabled */}
          <section className="component-section">
            <div className="section-header">
              <h2
                className="heading-6"
                style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
              >
                Disabled
              </h2>
              <Button label="Code" leftIcon="code" size="S" variant="Outlined" onClick={() => setOpenModal('disabled')} />
            </div>
            <div className="example-container">
              <div className="stepper-group-demo">
                <StepperGroup
                  size="M"
                  currentStep={1}
                  disabled
                  steps={[
                    { label: 'Step 1', iconName: 'settings' },
                    { label: 'Step 2', iconName: 'construction' },
                    { label: 'Step 3', iconName: 'check_circle' },
                  ]}
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
                <td><code>steps</code></td>
                <td><code>StepperGroupStep[]</code></td>
                <td>-</td>
                <td>Ordered list of steps. Each item has a <code>label</code>, optional <code>iconName</code> and optional <code>value</code>.</td>
              </tr>
              <tr>
                <td><code>currentStep</code></td>
                <td><code>number</code></td>
                <td><code>0</code></td>
                <td>Zero-based index of the current step. Items at and before this index are filled.</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td><code>'XS' | 'S' | 'M' | 'L' | 'XL'</code></td>
                <td><code>'M'</code></td>
                <td>Size applied to every step</td>
              </tr>
              <tr>
                <td><code>content</code></td>
                <td><code>'Icon' | 'Number'</code></td>
                <td><code>'Icon'</code></td>
                <td>Whether dots show icons or numbers</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Disables every step</td>
              </tr>
              <tr>
                <td><code>onStepClick</code></td>
                <td><code>(index: number) =&gt; void</code></td>
                <td>-</td>
                <td>Called when a step is clicked. Steps become interactive only when provided.</td>
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
      <CodeModal isOpen={openModal === 'basic'} onClose={() => setOpenModal(null)} title="Basic StepperGroup" sections={[{ title: 'StepperGroup.tsx', language: 'tsx', code: basicCode }]} />
      <CodeModal isOpen={openModal === 'number'} onClose={() => setOpenModal(null)} title="Number content" sections={[{ title: 'StepperGroup.tsx', language: 'tsx', code: numberCode }]} />
      <CodeModal isOpen={openModal === 'sizes'} onClose={() => setOpenModal(null)} title="StepperGroup Sizes" sections={[{ title: 'StepperGroup.tsx', language: 'tsx', code: sizesCode }]} />
      <CodeModal isOpen={openModal === 'interactive'} onClose={() => setOpenModal(null)} title="Interactive StepperGroup" sections={[{ title: 'StepperGroup.tsx', language: 'tsx', code: interactiveCode }]} />
      <CodeModal isOpen={openModal === 'disabled'} onClose={() => setOpenModal(null)} title="Disabled StepperGroup" sections={[{ title: 'StepperGroup.tsx', language: 'tsx', code: disabledCode }]} />
    </div>
  );
}
