import { useState } from 'react';
import {
  SimpleTooltip,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Tab,
  Button,
  IconButton,
} from '@as-design-system/core';
import '@as-design-system/core/Tooltip.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/IconButton.css';
import CodeModal from '../components/CodeModal';
import './Tooltip.css';

export default function TooltipPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const simpleCode = `import { SimpleTooltip } from '@/design-system/components/Tooltip';
import { Button } from '@/design-system/components/Button';

<SimpleTooltip label="Delete item" side="top">
  <Button label="Delete" variant="Outlined" size="M" />
</SimpleTooltip>`;

  const sidesCode = `import { SimpleTooltip } from '@/design-system/components/Tooltip';
import { Button } from '@/design-system/components/Button';

<SimpleTooltip label="Top tooltip" side="top">
  <Button label="Top" variant="Outlined" size="S" />
</SimpleTooltip>

<SimpleTooltip label="Right tooltip" side="right">
  <Button label="Right" variant="Outlined" size="S" />
</SimpleTooltip>

<SimpleTooltip label="Bottom tooltip" side="bottom">
  <Button label="Bottom" variant="Outlined" size="S" />
</SimpleTooltip>

<SimpleTooltip label="Left tooltip" side="left">
  <Button label="Left" variant="Outlined" size="S" />
</SimpleTooltip>`;

  const compoundCode = `import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/design-system/components/Tooltip';
import { Button } from '@/design-system/components/Button';

<Tooltip delayDuration={500}>
  <TooltipTrigger>
    <Button label="Advanced" variant="Outlined" size="M" />
  </TooltipTrigger>
  <TooltipContent side="top" align="start">
    <div style={{ maxWidth: '200px' }}>
      Custom content with <strong>formatting</strong>
    </div>
  </TooltipContent>
</Tooltip>`;

  const iconButtonCode = `import { IconButton } from '@/design-system/components/IconButton';

// IconButton has built-in tooltip support
<IconButton
  icon="settings"
  size="M"
  variant="Ghost"
  tooltip="Settings"
/>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        Tooltip
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Radix UI-based tooltip with proper positioning and hover behavior. Use SimpleTooltip for simple cases or the compound components for advanced control.
      </p>

      {/* Main Tabs */}
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
          {/* SimpleTooltip */}
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
                SimpleTooltip
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('simple')}
              />
            </div>
            <div className="example-container">
              <div className="tooltip-examples" style={{ gap: '24px' }}>
                <SimpleTooltip label="Delete item" side="top">
                  <Button label="Delete" variant="Outlined" size="M" />
                </SimpleTooltip>
                <SimpleTooltip label="Save changes" side="bottom">
                  <Button label="Save" variant="Default" size="M" />
                </SimpleTooltip>
              </div>
            </div>
          </section>

          {/* Sides */}
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
                Tooltip Sides
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('sides')}
              />
            </div>
            <div className="example-container">
              <div className="tooltip-examples" style={{ gap: '12px' }}>
                <SimpleTooltip label="Top tooltip" side="top">
                  <Button label="Top" variant="Outlined" size="S" />
                </SimpleTooltip>
                <SimpleTooltip label="Right tooltip" side="right">
                  <Button label="Right" variant="Outlined" size="S" />
                </SimpleTooltip>
                <SimpleTooltip label="Bottom tooltip" side="bottom">
                  <Button label="Bottom" variant="Outlined" size="S" />
                </SimpleTooltip>
                <SimpleTooltip label="Left tooltip" side="left">
                  <Button label="Left" variant="Outlined" size="S" />
                </SimpleTooltip>
              </div>
            </div>
          </section>

          {/* IconButton Integration */}
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
                IconButton with Tooltip
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('iconbutton')}
              />
            </div>
            <div className="example-container">
              <div className="tooltip-examples" style={{ gap: '12px' }}>
                <IconButton icon="settings" size="M" variant="Ghost" tooltip="Settings" />
                <IconButton icon="delete" size="M" variant="Ghost" tooltip="Delete" />
                <IconButton icon="edit" size="M" variant="Ghost" tooltip="Edit" />
                <IconButton icon="search" size="M" variant="Ghost" tooltip="Search" />
              </div>
            </div>
          </section>

          {/* Compound Components */}
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
                Advanced: Compound Components
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('compound')}
              />
            </div>
            <div className="example-container">
              <div className="tooltip-examples" style={{ gap: '24px' }}>
                <Tooltip delayDuration={500}>
                  <TooltipTrigger>
                    <Button label="Custom Content" variant="Outlined" size="M" />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="start">
                    <div style={{ maxWidth: '200px' }}>
                      Custom content with <strong>formatting</strong>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Button label="No Delay" variant="Outlined" size="M" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" arrow={false}>
                    Instant tooltip without arrow
                  </TooltipContent>
                </Tooltip>
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
            SimpleTooltip Props
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
                  <td><code>label</code></td>
                  <td><code>string</code></td>
                  <td>—</td>
                  <td>Tooltip text content</td>
                </tr>
                <tr>
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td>—</td>
                  <td>Element that triggers the tooltip</td>
                </tr>
                <tr>
                  <td><code>side</code></td>
                  <td><code>'top' | 'right' | 'bottom' | 'left'</code></td>
                  <td><code>'top'</code></td>
                  <td>Side of the trigger to place the tooltip</td>
                </tr>
                <tr>
                  <td><code>delayDuration</code></td>
                  <td><code>number</code></td>
                  <td><code>300</code></td>
                  <td>Delay in ms before showing tooltip</td>
                </tr>
                <tr>
                  <td><code>arrow</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether to show arrow</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2
            className="heading-6"
            style={{
              marginTop: '32px',
              marginBottom: '16px',
              color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
            }}
          >
            Tooltip (Root) Props
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
                  <td><code>ReactNode</code></td>
                  <td>—</td>
                  <td>TooltipTrigger and TooltipContent</td>
                </tr>
                <tr>
                  <td><code>delayDuration</code></td>
                  <td><code>number</code></td>
                  <td><code>300</code></td>
                  <td>Delay in ms before showing tooltip</td>
                </tr>
                <tr>
                  <td><code>skipDelayDuration</code></td>
                  <td><code>number</code></td>
                  <td><code>300</code></td>
                  <td>Skip delay when moving between tooltips</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2
            className="heading-6"
            style={{
              marginTop: '32px',
              marginBottom: '16px',
              color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
            }}
          >
            TooltipContent Props
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
                  <td><code>ReactNode</code></td>
                  <td>—</td>
                  <td>Content to display in tooltip</td>
                </tr>
                <tr>
                  <td><code>side</code></td>
                  <td><code>'top' | 'right' | 'bottom' | 'left'</code></td>
                  <td><code>'top'</code></td>
                  <td>Side of the trigger to place the tooltip</td>
                </tr>
                <tr>
                  <td><code>align</code></td>
                  <td><code>'start' | 'center' | 'end'</code></td>
                  <td><code>'center'</code></td>
                  <td>Alignment relative to the trigger</td>
                </tr>
                <tr>
                  <td><code>sideOffset</code></td>
                  <td><code>number</code></td>
                  <td><code>4</code></td>
                  <td>Offset from the trigger in pixels</td>
                </tr>
                <tr>
                  <td><code>arrow</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether to show arrow</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'simple'}
        onClose={() => setOpenModal(null)}
        title="SimpleTooltip"
        code={simpleCode}
      />
      <CodeModal
        isOpen={openModal === 'sides'}
        onClose={() => setOpenModal(null)}
        title="Tooltip Sides"
        code={sidesCode}
      />
      <CodeModal
        isOpen={openModal === 'iconbutton'}
        onClose={() => setOpenModal(null)}
        title="IconButton with Tooltip"
        code={iconButtonCode}
      />
      <CodeModal
        isOpen={openModal === 'compound'}
        onClose={() => setOpenModal(null)}
        title="Compound Components"
        code={compoundCode}
      />
    </div>
  );
}
