import { useState } from 'react';
import { ToolTile, Tab, Button } from '@as-design-system/core';
import '@as-design-system/core/ToolTile.css';
import '@as-design-system/core/ToolIcons.css';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/Icon.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './ToolTile.css';

export default function ToolTilePage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const basicCode = `import { ToolTile } from '@/design-system/composites/ToolTile';

<ToolTile
  tool="maintenance"
  title="Maintenance"
  description="Aircraft maintenance management and forecasting tool"
  platforms={['web', 'ios', 'android']}
  onClick={() => console.log('tile clicked')}
  onMoreOptions={() => console.log('more options')}
/>`;

  const gridCode = `import { ToolTile } from '@/design-system/composites/ToolTile';

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
  <ToolTile
    tool="trajopt"
    title="TrajOpt"
    description="Trajectory optimization and flight planning tool"
    platforms={['web', 'windows']}
    onClick={() => {}}
    onMoreOptions={(e) => {}}
  />
  <ToolTile
    tool="economics"
    title="Economics"
    description="Aircraft operating cost analysis and financial modelling"
    platforms={['web', 'android', 'ios', 'windows', 'skywise']}
    onClick={() => {}}
    onMoreOptions={(e) => {}}
  />
  <ToolTile
    tool="network"
    title="Network"
    description="Airline network planning and route analysis tool"
    platforms={['web', 'skywise']}
    onClick={() => {}}
    onMoreOptions={(e) => {}}
  />
</div>`;

  const noPlatformsCode = `import { ToolTile } from '@/design-system/composites/ToolTile';

<ToolTile
  tool="airscout"
  title="AirScout"
  description="Flight data monitoring and analysis platform"
  onClick={() => console.log('tile clicked')}
/>`;

  const noDescriptionCode = `import { ToolTile } from '@/design-system/composites/ToolTile';

<ToolTile
  tool="skyfinesse"
  title="SkyFInesse"
  platforms={['web', 'ios']}
  onClick={() => console.log('tile clicked')}
  onMoreOptions={() => console.log('more options')}
/>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        ToolTile
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A card component displaying a product/tool with its icon, name, platform badges,
        description, and a hover-revealed "more options" button.
      </p>

      {/* Tabs */}
      <div className="tabs-container">
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

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <>
          {/* Default */}
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
                Default
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="tool-tile-demo">
              <ToolTile
                tool="maintenance"
                title="Maintenance"
                description="Aircraft maintenance management and forecasting tool"
                platforms={['web', 'ios', 'android']}
                onClick={() => console.log('tile clicked')}
                onMoreOptions={() => console.log('more options')}
              />
            </div>
          </section>

          {/* Grid */}
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
                Multiple Tiles (Grid)
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('grid')}
              />
            </div>
            <div className="tool-tile-demo">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <ToolTile
                  tool="trajopt"
                  title="TrajOpt"
                  description="Trajectory optimization and flight planning tool"
                  platforms={['web', 'windows']}
                  onClick={() => {}}
                  onMoreOptions={() => {}}
                />
                <ToolTile
                  tool="economics"
                  title="Economics"
                  description="Aircraft operating cost analysis and financial modelling"
                  platforms={['web', 'android', 'ios', 'windows', 'skywise']}
                  onClick={() => {}}
                  onMoreOptions={() => {}}
                />
                <ToolTile
                  tool="network"
                  title="Network"
                  description="Airline network planning and route analysis tool"
                  platforms={['web', 'skywise']}
                  onClick={() => {}}
                  onMoreOptions={() => {}}
                />
              </div>
            </div>
          </section>

          {/* No Platforms */}
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
                Without Platforms
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('noPlatforms')}
              />
            </div>
            <div className="tool-tile-demo">
              <ToolTile
                tool="airscout"
                title="AirScout"
                description="Flight data monitoring and analysis platform"
                onClick={() => console.log('tile clicked')}
              />
            </div>
          </section>

          {/* No Description */}
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
                Without Description
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('noDescription')}
              />
            </div>
            <div className="tool-tile-demo">
              <ToolTile
                tool="skyfinesse"
                title="SkyFInesse"
                platforms={['web', 'ios']}
                onClick={() => console.log('tile clicked')}
                onMoreOptions={() => console.log('more options')}
              />
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
                  <td><code>tool</code></td>
                  <td><code>ToolName</code></td>
                  <td>-</td>
                  <td>Tool icon to display (from ToolIcons component)</td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Product display name</td>
                </tr>
                <tr>
                  <td><code>description</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Short description text (max 2 lines)</td>
                </tr>
                <tr>
                  <td><code>platforms</code></td>
                  <td><code>PlatformName[]</code></td>
                  <td><code>[]</code></td>
                  <td>Platform badges: 'web' | 'android' | 'ios' | 'windows' | 'skywise'</td>
                </tr>
                <tr>
                  <td><code>onClick</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Click handler for the entire tile</td>
                </tr>
                <tr>
                  <td><code>onMoreOptions</code></td>
                  <td><code>(e: MouseEvent) =&gt; void</code></td>
                  <td>-</td>
                  <td>Click handler for the three-dots button (only renders when provided)</td>
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
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="ToolTile — Default"
        sections={[{ title: 'ToolTile.tsx', language: 'tsx', code: basicCode }]}
      />
      <CodeModal
        isOpen={openModal === 'grid'}
        onClose={() => setOpenModal(null)}
        title="ToolTile — Grid"
        sections={[{ title: 'ToolTile.tsx', language: 'tsx', code: gridCode }]}
      />
      <CodeModal
        isOpen={openModal === 'noPlatforms'}
        onClose={() => setOpenModal(null)}
        title="ToolTile — Without Platforms"
        sections={[{ title: 'ToolTile.tsx', language: 'tsx', code: noPlatformsCode }]}
      />
      <CodeModal
        isOpen={openModal === 'noDescription'}
        onClose={() => setOpenModal(null)}
        title="ToolTile — Without Description"
        sections={[{ title: 'ToolTile.tsx', language: 'tsx', code: noDescriptionCode }]}
      />
    </div>
  );
}
