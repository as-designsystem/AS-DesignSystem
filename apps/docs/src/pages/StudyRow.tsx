import { useState } from 'react';
import { StudyRow, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/StudyRow.css';
import '@as-designsystem/core/StudyStatus.css';
import '@as-designsystem/core/Checkbox.css';
import '@as-designsystem/core/IconButton.css';
import '@as-designsystem/core/Icon.css';
import '@as-designsystem/core/Spinner.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import '@as-designsystem/core/Tooltip.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './StudyRow.css';

export default function StudyRowPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const basicCode = `import { StudyRow } from '@/design-system/components/StudyRow';

<StudyRow
  status="Computed"
  columns={[
    { key: 'name', value: 'Flight Analysis 2024' },
    { key: 'description', value: 'Comprehensive flight performance study' },
    { key: 'author', value: 'John Doe' },
    { key: 'date', value: '2024-01-15', align: 'right' },
  ]}
/>`;

  const withCheckboxCode = `import { StudyRow } from '@/design-system/components/StudyRow';

<StudyRow
  status="Computing"
  columns={[
    { key: 'name', value: 'Network Optimization' },
    { key: 'description', value: 'Route optimization analysis' },
  ]}
  selectable
  selected={isSelected}
  onSelectionChange={(selected) => setIsSelected(selected)}
/>`;

  const withActionsCode = `import { StudyRow } from '@/design-system/components/StudyRow';

<StudyRow
  status="Computed"
  columns={[
    { key: 'name', value: 'Maintenance Planning' },
    { key: 'description', value: 'Annual maintenance schedule' },
  ]}
  showMoreOptions
  onMoreOptionsClick={(e) => console.log('More options clicked')}
/>`;

  const allStatesCode = `import { StudyRow } from '@/design-system/components/StudyRow';

<StudyRow status="Computed" columns={[...]} />
<StudyRow status="Computing" columns={[...]} />
<StudyRow status="Failed" columns={[...]} />
<StudyRow status="Draft" columns={[...]} />
<StudyRow status="Warning" columns={[...]} />`;

  const columnSizingCode = `import { StudyRow } from '@/design-system/components/StudyRow';

// Mix fixed widths and flex proportional columns
<StudyRow
  status="Computed"
  columns={[
    { key: 'name', value: 'Flight Analysis 2024', width: '200px' },
    { key: 'description', value: 'Comprehensive flight performance study', flex: 2 },
    { key: 'author', value: 'John Doe', flex: 1 },
    { key: 'date', value: '2024-01-15', width: '120px', align: 'right' },
  ]}
/>`;

  const statusTooltipCode = `import { StudyRow } from '@/design-system/components/StudyRow';

// With statusLabel and statusTooltip
<StudyRow
  status="Draft"
  statusLabel="2 Draft"
  statusTooltip={
    <div>
      <div>Flight Analysis — Draft</div>
      <div>Network Optimization — Draft</div>
    </div>
  }
  columns={[
    { key: 'name', value: 'Multi-Study Batch' },
    { key: 'description', value: 'Grouped studies overview' },
  ]}
/>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          StudyRow
        </h1>
        <InstallCommand componentName="study-row" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Table row for displaying study information with status, configurable columns, optional checkbox, and hover-revealed actions.
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
                style={{
                  marginTop: '32px',
                  marginBottom: '16px',
                  color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
                }}
              >
                Basic
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
              <div className="study-row-demo">
                <StudyRow
                  status="Computed"
                  columns={[
                    { key: 'name', value: 'Flight Analysis 2024' },
                    { key: 'description', value: 'Comprehensive flight performance study' },
                    { key: 'author', value: 'John Doe' },
                    { key: 'date', value: '2024-01-15', align: 'right' },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* With Checkbox */}
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
                With Checkbox
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('withCheckbox')}
              />
            </div>
            <div className="example-container">
              <div className="study-row-demo">
                <StudyRow
                  status="Computing"
                  columns={[
                    { key: 'name', value: 'Network Optimization' },
                    { key: 'description', value: 'Route optimization analysis' },
                    { key: 'author', value: 'Jane Smith' },
                  ]}
                  selectable
                  selected={selectedRows['row1']}
                  onSelectionChange={(selected) => toggleRow('row1')}
                />
              </div>
            </div>
          </section>

          {/* With Actions */}
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
                With More Options (hover to reveal)
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('withActions')}
              />
            </div>
            <div className="example-container">
              <div className="study-row-demo">
                <StudyRow
                  status="Computed"
                  columns={[
                    { key: 'name', value: 'Maintenance Planning' },
                    { key: 'description', value: 'Annual maintenance schedule' },
                  ]}
                  showMoreOptions
                  onMoreOptionsClick={(e) => console.log('More options clicked')}
                />
              </div>
            </div>
          </section>

          {/* All States */}
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
                Status States
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('allStates')}
              />
            </div>
            <div className="example-container">
              <div className="study-row-demo">
                <StudyRow
                  status="Computed"
                  columns={[
                    { key: 'name', value: 'Computed Study' },
                    { key: 'description', value: 'Successfully completed' },
                  ]}
                />
                <StudyRow
                  status="Computing"
                  columns={[
                    { key: 'name', value: 'Computing Study' },
                    { key: 'description', value: 'In progress...' },
                  ]}
                />
                <StudyRow
                  status="Failed"
                  columns={[
                    { key: 'name', value: 'Failed Study' },
                    { key: 'description', value: 'Error during computation' },
                  ]}
                />
                <StudyRow
                  status="Draft"
                  columns={[
                    { key: 'name', value: 'Draft Study' },
                    { key: 'description', value: 'Not yet computed' },
                  ]}
                />
                <StudyRow
                  status="Warning"
                  columns={[
                    { key: 'name', value: 'Warning Study' },
                    { key: 'description', value: 'Completed with warnings' },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Column Sizing */}
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
                Column Sizing
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('columnSizing')}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Columns support fixed widths and flex proportional sizing. Use <code>width</code> for a fixed size (e.g. '200px') or <code>flex</code> for a proportional grow factor. By default, all columns use <code>flex: 1</code>.
            </p>
            <div className="example-container">
              <div className="study-row-demo">
                <StudyRow
                  status="Computed"
                  columns={[
                    { key: 'name', value: 'Flight Analysis 2024', width: '200px' },
                    { key: 'description', value: 'Comprehensive flight performance study', flex: 2 },
                    { key: 'author', value: 'John Doe', flex: 1 },
                    { key: 'date', value: '2024-01-15', width: '120px', align: 'right' },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Status Label & Tooltip */}
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
                Status Label & Tooltip
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('statusTooltip')}
              />
            </div>
            <p
              className="label-regular-s"
              style={{
                marginBottom: '16px',
                color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
              }}
            >
              Use <code>statusLabel</code> to display a custom label next to the status icon, and <code>statusTooltip</code> to wrap the status in a tooltip with custom content. Hover the status to see the tooltip.
            </p>
            <div className="example-container">
              <div className="study-row-demo">
                <StudyRow
                  status="Draft"
                  statusLabel="2 Draft"
                  statusTooltip={
                    <div>
                      <div>Flight Analysis — Draft</div>
                      <div>Network Optimization — Draft</div>
                    </div>
                  }
                  columns={[
                    { key: 'name', value: 'Multi-Study Batch' },
                    { key: 'description', value: 'Grouped studies overview' },
                  ]}
                />
                <StudyRow
                  status="Computed"
                  statusLabel="3 Computed"
                  statusTooltip={
                    <div>
                      <div>Flight Analysis — Computed</div>
                      <div>Network Optimization — Computed</div>
                      <div>Maintenance Planning — Computed</div>
                    </div>
                  }
                  columns={[
                    { key: 'name', value: 'Completed Batch' },
                    { key: 'description', value: 'All studies computed' },
                  ]}
                />
                <StudyRow
                  status="Failed"
                  statusLabel="1 Failed"
                  columns={[
                    { key: 'name', value: 'Without Tooltip' },
                    { key: 'description', value: 'statusLabel without statusTooltip' },
                  ]}
                />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
        <section className="props-section">
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
                <td><code>status</code></td>
                <td><code>StudyStatusState</code></td>
                <td>-</td>
                <td>Study status (required)</td>
              </tr>
              <tr>
                <td><code>statusLabel</code></td>
                <td><code>string</code></td>
                <td>-</td>
                <td>Custom label next to the status icon (e.g. "2 Draft")</td>
              </tr>
              <tr>
                <td><code>statusTooltip</code></td>
                <td><code>React.ReactNode</code></td>
                <td>-</td>
                <td>Custom tooltip content. When provided, the status is wrapped in a Tooltip.</td>
              </tr>
              <tr>
                <td><code>columns</code></td>
                <td><code>StudyRowColumn[]</code></td>
                <td>-</td>
                <td>Column data (required)</td>
              </tr>
              <tr>
                <td><code>selectable</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Show checkbox for selection</td>
              </tr>
              <tr>
                <td><code>selected</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Checkbox selected state</td>
              </tr>
              <tr>
                <td><code>onSelectionChange</code></td>
                <td><code>(selected: boolean) =&gt; void</code></td>
                <td>-</td>
                <td>Callback when selection changes</td>
              </tr>
              <tr>
                <td><code>showMoreOptions</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Show more options button on hover</td>
              </tr>
              <tr>
                <td><code>onMoreOptionsClick</code></td>
                <td><code>(e: MouseEvent) =&gt; void</code></td>
                <td>-</td>
                <td>Callback when more options clicked</td>
              </tr>
              <tr>
                <td><code>onClick</code></td>
                <td><code>() =&gt; void</code></td>
                <td>-</td>
                <td>Row click handler</td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td><code>''</code></td>
                <td>Additional CSS class</td>
              </tr>
            </tbody>
          </table>

          <h3
            className="heading-6"
            style={{
              marginTop: '24px',
              marginBottom: '12px',
              color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
            }}
          >
            StudyRowColumn
          </h3>
          <table className="props-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>key</code></td>
                <td><code>string</code></td>
                <td>Unique key for the column</td>
              </tr>
              <tr>
                <td><code>value</code></td>
                <td><code>React.ReactNode</code></td>
                <td>Column content</td>
              </tr>
              <tr>
                <td><code>align</code></td>
                <td><code>'left' | 'center' | 'right'</code></td>
                <td>Text alignment (default: 'left')</td>
              </tr>
              <tr>
                <td><code>width</code></td>
                <td><code>string</code></td>
                <td>Fixed width (e.g. '200px', '30%'). Disables flex.</td>
              </tr>
              <tr>
                <td><code>flex</code></td>
                <td><code>number</code></td>
                <td>Flex grow factor (default: 1)</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Basic"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'withCheckbox'}
        onClose={() => setOpenModal(null)}
        title="With Checkbox"
        code={withCheckboxCode}
      />
      <CodeModal
        isOpen={openModal === 'withActions'}
        onClose={() => setOpenModal(null)}
        title="With More Options"
        code={withActionsCode}
      />
      <CodeModal
        isOpen={openModal === 'allStates'}
        onClose={() => setOpenModal(null)}
        title="Status States"
        code={allStatesCode}
      />
      <CodeModal
        isOpen={openModal === 'columnSizing'}
        onClose={() => setOpenModal(null)}
        title="Column Sizing"
        code={columnSizingCode}
      />
      <CodeModal
        isOpen={openModal === 'statusTooltip'}
        onClose={() => setOpenModal(null)}
        title="Status Label & Tooltip"
        code={statusTooltipCode}
      />
    </div>
  );
}
