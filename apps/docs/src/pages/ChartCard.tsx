import { useState } from 'react';
import { ChartCard, Tab, Button, IconButton, Select, Icon } from '@as-design-system/core';
import '@as-design-system/core/ChartCard.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/Select.css';
import '@as-design-system/core/Icon.css';
import CodeModal from '../components/CodeModal';
import './ChartCard.css';

export default function ChartCardPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { ChartCard, IconButton } from '@/design-system';

<ChartCard
  title="Chart Title"
  actions={
    <>
      <IconButton icon="download" size="S" variant="Ghost" alt="Download" />
      <IconButton icon="open_in_full" size="S" variant="Ghost" alt="Fullscreen" />
    </>
  }
>
  {/* Your chart, map, or table here */}
  <div className="chart-placeholder">Chart Content</div>
</ChartCard>`;

  const withHeaderCenterCode = `import { ChartCard, IconButton, Select } from '@/design-system';

<ChartCard
  title="Network Map"
  headerCenter={
    <>
      <span className="label-regular-s">Year</span>
      <div style={{ width: '120px' }}>
        <Select
          options={[
            { value: 'all', label: 'All' },
            { value: '2024', label: '2024' },
            { value: '2023', label: '2023' },
          ]}
          value="all"
          size="XS"
          showLabel={false}
        />
      </div>
    </>
  }
  actions={
    <IconButton icon="open_in_full" size="S" variant="Ghost" alt="Fullscreen" />
  }
>
  {/* Map content */}
</ChartCard>`;

  const withFiltersCode = `import { ChartCard, IconButton, Select } from '@/design-system';

<ChartCard
  title="Revenue Overview"
  actions={
    <>
      <IconButton icon="download" size="S" variant="Ghost" alt="Download" />
      <IconButton icon="open_in_full" size="S" variant="Ghost" alt="Fullscreen" />
    </>
  }
  filters={
    <div style={{ width: '150px' }}>
      <Select
        options={[
          { value: '2024', label: '2024' },
          { value: '2023', label: '2023' },
          { value: '2022', label: '2022' },
        ]}
        value="2024"
        size="XS"
        showLabel={false}
      />
    </div>
  }
>
  <div className="chart-placeholder">Chart with Filters</div>
</ChartCard>`;

  const withFooterCode = `import { ChartCard, IconButton, Select } from '@/design-system';

<ChartCard
  title="Financial Metrics"
  actions={
    <>
      <IconButton icon="download" size="S" variant="Ghost" alt="Download" />
      <IconButton icon="open_in_full" size="S" variant="Ghost" alt="Fullscreen" />
    </>
  }
  filters={
    <div style={{ width: '150px' }}>
      <Select
        options={[{ value: 'all', label: 'All Regions' }]}
        value="all"
        size="XS"
        showLabel={false}
      />
    </div>
  }
  footer={
    <div className="chart-legend">
      <div className="chart-legend__item">
        <span className="chart-legend__color" style={{ backgroundColor: '#255fcc' }} />
        <span>Total Revenues</span>
      </div>
      <div className="chart-legend__item">
        <span className="chart-legend__line" style={{ backgroundColor: '#919cb0' }} />
        <span>EBITDAR Margin %</span>
      </div>
      <div className="chart-legend__item">
        <span className="chart-legend__line" style={{ backgroundColor: '#16d4f0' }} />
        <span>Profit Before Tax Margin</span>
      </div>
    </div>
  }
>
  <div className="chart-placeholder">Chart with Footer Legend</div>
</ChartCard>`;

  const customSizeCode = `import { ChartCard, IconButton } from '@/design-system';

{/* Fixed height */}
<ChartCard
  title="Small Chart"
  style={{ height: '200px' }}
>
  <div className="chart-placeholder">200px height</div>
</ChartCard>

{/* Fill container height */}
<ChartCard
  title="Full Height Chart"
  style={{ height: '100%' }}
>
  <div className="chart-placeholder">100% height</div>
</ChartCard>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        ChartCard
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A flexible card container for displaying charts, maps, tables, or any data visualization.
        Features customizable header with title, center content, and actions, optional filter section, and optional footer for legends.
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
          {/* Basic Example */}
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
            <div className="chart-card-demo">
              <ChartCard
                title="Chart Title"
                actions={
                  <>
                    <IconButton icon="download" size="S" variant="Ghost" alt="Download" />
                    <IconButton icon="open_in_full" size="S" variant="Ghost" alt="Fullscreen" />
                  </>
                }
              >
                <div className="chart-placeholder">
                  <Icon name="broken_image" size={32} color="var(--cool-grey-70, #63728a)" />
                  <span>Sorry. No Data to display.</span>
                </div>
              </ChartCard>
            </div>
          </section>

          {/* With Header Center */}
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
                With Header Center
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('headerCenter')}
              />
            </div>
            <div className="chart-card-demo">
              <ChartCard
                title="Network Map"
                headerCenter={
                  <>
                    <span className="label-regular-s" style={{ color: 'var(--text-secondary, #63728a)' }}>Year</span>
                    <div style={{ width: '120px' }}>
                      <Select
                        options={[
                          { value: 'all', label: 'All' },
                          { value: '2024', label: '2024' },
                          { value: '2023', label: '2023' },
                        ]}
                        value="all"
                        size="XS"
                        showLabel={false}
                      />
                    </div>
                  </>
                }
                actions={
                  <IconButton icon="open_in_full" size="S" variant="Ghost" alt="Fullscreen" />
                }
              >
                <div className="chart-placeholder">
                  <Icon name="broken_image" size={32} color="var(--cool-grey-70, #63728a)" />
                  <span>Sorry. No Data to display.</span>
                </div>
              </ChartCard>
            </div>
          </section>

          {/* With Filters */}
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
                With Filters
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('filters')}
              />
            </div>
            <div className="chart-card-demo">
              <ChartCard
                title="Revenue Overview"
                actions={
                  <>
                    <IconButton icon="download" size="S" variant="Ghost" alt="Download" />
                    <IconButton icon="open_in_full" size="S" variant="Ghost" alt="Fullscreen" />
                  </>
                }
                filters={
                  <div style={{ width: '150px' }}>
                    <Select
                      options={[
                        { value: '2024', label: '2024' },
                        { value: '2023', label: '2023' },
                        { value: '2022', label: '2022' },
                      ]}
                      value="2024"
                      size="XS"
                      showLabel={false}
                    />
                  </div>
                }
              >
                <div className="chart-placeholder">
                  <Icon name="broken_image" size={32} color="var(--cool-grey-70, #63728a)" />
                  <span>Sorry. No Data to display.</span>
                </div>
              </ChartCard>
            </div>
          </section>

          {/* With Footer */}
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
                With Footer (Legend)
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('footer')}
              />
            </div>
            <div className="chart-card-demo">
              <ChartCard
                title="Financial Metrics"
                actions={
                  <>
                    <IconButton icon="download" size="S" variant="Ghost" alt="Download" />
                    <IconButton icon="open_in_full" size="S" variant="Ghost" alt="Fullscreen" />
                  </>
                }
                filters={
                  <div style={{ width: '150px' }}>
                    <Select
                      options={[{ value: 'all', label: 'All Regions' }]}
                      value="all"
                      size="XS"
                      showLabel={false}
                    />
                  </div>
                }
                footer={
                  <div className="chart-legend">
                    <div className="chart-legend__item">
                      <span className="chart-legend__color" style={{ backgroundColor: '#255fcc' }} />
                      <span>Total Revenues</span>
                    </div>
                    <div className="chart-legend__item">
                      <span className="chart-legend__line" style={{ backgroundColor: '#919cb0' }} />
                      <span>EBITDAR Margin %</span>
                    </div>
                    <div className="chart-legend__item">
                      <span className="chart-legend__line" style={{ backgroundColor: '#16d4f0' }} />
                      <span>Profit Before Tax Margin</span>
                    </div>
                  </div>
                }
              >
                <div className="chart-placeholder">
                  <Icon name="broken_image" size={32} color="var(--cool-grey-70, #63728a)" />
                  <span>Sorry. No Data to display.</span>
                </div>
              </ChartCard>
            </div>
          </section>

          {/* Custom Size */}
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
                Custom Size
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('size')}
              />
            </div>
            <div className="chart-card-demo" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <ChartCard
                title="Small Chart"
                style={{ height: '200px', width: '300px' }}
              >
                <div className="chart-placeholder">
                  <span>200px height</span>
                </div>
              </ChartCard>
              <ChartCard
                title="Medium Chart"
                style={{ height: '280px', width: '400px' }}
              >
                <div className="chart-placeholder">
                  <span>280px height</span>
                </div>
              </ChartCard>
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
                <td><code>ReactNode</code></td>
                <td>-</td>
                <td>Title displayed in the card header. Can be a string or any React node.</td>
              </tr>
              <tr>
                <td><code>headerCenter</code></td>
                <td><code>ReactNode</code></td>
                <td>-</td>
                <td>Content displayed in the center of the header, between title and actions (labels, filters, etc.)</td>
              </tr>
              <tr>
                <td><code>actions</code></td>
                <td><code>ReactNode</code></td>
                <td>-</td>
                <td>Action buttons/icons on the right side of the header (IconButton, Button, etc.)</td>
              </tr>
              <tr>
                <td><code>filters</code></td>
                <td><code>ReactNode</code></td>
                <td>-</td>
                <td>Optional filter section below the header (Select, DatePicker, etc.)</td>
              </tr>
              <tr>
                <td><code>children</code></td>
                <td><code>ReactNode</code></td>
                <td>-</td>
                <td>Main content of the card (chart, map, table, etc.)</td>
              </tr>
              <tr>
                <td><code>footer</code></td>
                <td><code>ReactNode</code></td>
                <td>-</td>
                <td>Optional footer content (typically used for legends)</td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td><code>''</code></td>
                <td>Additional CSS class for the card container</td>
              </tr>
              <tr>
                <td><code>style</code></td>
                <td><code>CSSProperties</code></td>
                <td>-</td>
                <td>Inline styles for the card (use for custom width/height)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Basic ChartCard"
        sections={[{ title: 'ChartCard.tsx', language: 'tsx', code: basicCode }]}
      />
      <CodeModal
        isOpen={openModal === 'headerCenter'}
        onClose={() => setOpenModal(null)}
        title="ChartCard with Header Center"
        sections={[{ title: 'ChartCard.tsx', language: 'tsx', code: withHeaderCenterCode }]}
      />
      <CodeModal
        isOpen={openModal === 'filters'}
        onClose={() => setOpenModal(null)}
        title="ChartCard with Filters"
        sections={[{ title: 'ChartCard.tsx', language: 'tsx', code: withFiltersCode }]}
      />
      <CodeModal
        isOpen={openModal === 'footer'}
        onClose={() => setOpenModal(null)}
        title="ChartCard with Footer"
        sections={[{ title: 'ChartCard.tsx', language: 'tsx', code: withFooterCode }]}
      />
      <CodeModal
        isOpen={openModal === 'size'}
        onClose={() => setOpenModal(null)}
        title="ChartCard Custom Size"
        sections={[{ title: 'ChartCard.tsx', language: 'tsx', code: customSizeCode }]}
      />
    </div>
  );
}
