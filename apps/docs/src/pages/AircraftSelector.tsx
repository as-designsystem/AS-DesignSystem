import { useState } from 'react';
import {
  AircraftSelector,
  Tab,
  Button,
} from '@as-design-system/core';
import type {
  AircraftSource,
  AircraftTreeNode,
  AircraftSummary,
  AircraftConfigData,
  AircraftPerformanceData,
  PerformanceSource,
} from '@as-design-system/core';
import '@as-design-system/core/AircraftSelector.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/TextInput.css';
import '@as-design-system/core/NumberInput.css';
import '@as-design-system/core/ButtonGroup.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/Icon.css';
import CodeModal from '../components/CodeModal';
import './AircraftSelector.css';

// --- Mock tree data ---

const rdmTree: AircraftTreeNode[] = [
  {
    id: 'airbus',
    label: 'Airbus',
    type: 'manufacturer',
    children: [
      {
        id: 'a320',
        label: 'A320',
        type: 'family',
        children: [
          {
            id: 'a320-100',
            label: 'A320-100',
            type: 'type',
            children: [
              {
                id: 'cfm56-5a1',
                label: 'CFM56-5A1',
                type: 'engine',
                children: [
                  { id: 'a320-100-5a1-y150', label: 'Y150', type: 'layout' },
                  { id: 'a320-100-5a1-y164', label: 'Y164', type: 'layout' },
                ],
              },
            ],
          },
          {
            id: 'a320-200',
            label: 'A320-200',
            type: 'type',
            children: [
              {
                id: 'cfm56-5a',
                label: 'CFM56-5A (Default)',
                type: 'engine',
                isDefault: true,
                children: [
                  { id: 'a320-200-5a-f12y138', label: 'F12 - Y138 (Default)', type: 'layout', isDefault: true },
                  { id: 'a320-200-5a-y140', label: 'Y140', type: 'layout' },
                  { id: 'a320-200-5a-f12b20y32y90', label: 'F12 - B20 - Y+32 - Y90', type: 'layout' },
                  { id: 'a320-200-5a-y128', label: 'Y128', type: 'layout' },
                  { id: 'a320-200-5a-y36y120', label: 'Y+36 Y120', type: 'layout' },
                ],
              },
              {
                id: 'cfm56-5b4',
                label: 'CFM56-5B4/2P',
                type: 'engine',
                children: [
                  { id: 'a320-200-5b4-y150', label: 'Y150', type: 'layout' },
                ],
              },
            ],
          },
          {
            id: 'a320-300',
            label: 'A320-300',
            type: 'type',
            children: [
              {
                id: 'cfm56-5b6',
                label: 'CFM56-5B6',
                type: 'engine',
                children: [
                  { id: 'a320-300-5b6-y180', label: 'Y180', type: 'layout' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'a330',
        label: 'A330',
        type: 'family',
        children: [
          {
            id: 'a330-200',
            label: 'A330-200',
            type: 'type',
            children: [
              {
                id: 'cf6-80e1',
                label: 'CF6-80E1',
                type: 'engine',
                children: [
                  { id: 'a330-200-cf6-f30b24y198', label: 'F30 - B24 - Y198', type: 'layout' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'a340',
        label: 'A340',
        type: 'family',
        children: [
          {
            id: 'a340-300',
            label: 'A340-300',
            type: 'type',
            children: [
              {
                id: 'cfm56-5c4',
                label: 'CFM56-5C4',
                type: 'engine',
                children: [
                  { id: 'a340-300-5c4-c30y263', label: 'C30 - Y263', type: 'layout' },
                  { id: 'a340-300-5c4-f12c42y203', label: 'F12 - C42 - Y203', type: 'layout' },
                ],
              },
            ],
          },
          {
            id: 'a340-600',
            label: 'A340-600',
            type: 'type',
            children: [
              {
                id: 'trent556',
                label: 'Trent 556',
                type: 'engine',
                children: [
                  { id: 'a340-600-trent-c58y262', label: 'C58 - Y262', type: 'layout' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'boeing',
    label: 'Boeing',
    type: 'manufacturer',
    children: [
      {
        id: 'b737',
        label: 'B737',
        type: 'family',
        children: [
          {
            id: 'b737-800',
            label: 'B737-800',
            type: 'type',
            children: [
              {
                id: 'cfm56-7b26',
                label: 'CFM56-7B26',
                type: 'engine',
                isDefault: true,
                children: [
                  { id: 'b737-800-7b26-y189', label: 'Y189 (Default)', type: 'layout', isDefault: true },
                  { id: 'b737-800-7b26-c16y144', label: 'C16 - Y144', type: 'layout' },
                  { id: 'b737-800-7b26-y162', label: 'Y162', type: 'layout' },
                ],
              },
              {
                id: 'cfm56-7b27',
                label: 'CFM56-7B27',
                type: 'engine',
                children: [
                  { id: 'b737-800-7b27-y189', label: 'Y189', type: 'layout' },
                ],
              },
            ],
          },
          {
            id: 'b737-900',
            label: 'B737-900',
            type: 'type',
            children: [
              {
                id: 'cfm56-7b26-900',
                label: 'CFM56-7B26',
                type: 'engine',
                children: [
                  { id: 'b737-900-7b26-y215', label: 'Y215', type: 'layout' },
                  { id: 'b737-900-7b26-c20y159', label: 'C20 - Y159', type: 'layout' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'b777',
        label: 'B777',
        type: 'family',
        children: [
          {
            id: 'b777-200',
            label: 'B777-200',
            type: 'type',
            children: [
              {
                id: 'ge90-94b',
                label: 'GE90-94B',
                type: 'engine',
                children: [
                  { id: 'b777-200-ge90-f42c52y227', label: 'F42 - C52 - Y227', type: 'layout' },
                  { id: 'b777-200-ge90-c70y210', label: 'C70 - Y210', type: 'layout' },
                ],
              },
              {
                id: 'pw4090',
                label: 'PW4090',
                type: 'engine',
                children: [
                  { id: 'b777-200-pw-y440', label: 'Y440', type: 'layout' },
                ],
              },
            ],
          },
          {
            id: 'b777-300er',
            label: 'B777-300ER',
            type: 'type',
            children: [
              {
                id: 'ge90-115b',
                label: 'GE90-115B',
                type: 'engine',
                children: [
                  { id: 'b777-300er-ge90-f8c42y306', label: 'F8 - C42 - Y306', type: 'layout' },
                  { id: 'b777-300er-ge90-c60y296', label: 'C60 - Y296', type: 'layout' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'b787',
        label: 'B787',
        type: 'family',
        children: [
          {
            id: 'b787-8',
            label: 'B787-8',
            type: 'type',
            children: [
              {
                id: 'genx-1b',
                label: 'GEnx-1B',
                type: 'engine',
                children: [
                  { id: 'b787-8-genx-c42y198', label: 'C42 - Y198', type: 'layout' },
                  { id: 'b787-8-genx-y335', label: 'Y335', type: 'layout' },
                ],
              },
              {
                id: 'trent1000',
                label: 'Trent 1000',
                type: 'engine',
                children: [
                  { id: 'b787-8-trent-c30y210', label: 'C30 - Y210', type: 'layout' },
                ],
              },
            ],
          },
          {
            id: 'b787-9',
            label: 'B787-9',
            type: 'type',
            children: [
              {
                id: 'genx-1b-9',
                label: 'GEnx-1B',
                type: 'engine',
                children: [
                  { id: 'b787-9-genx-c48y216', label: 'C48 - Y216', type: 'layout' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const customTree: AircraftTreeNode[] = [
  {
    id: 'custom-1',
    label: 'Custom Fleet',
    type: 'manufacturer',
    children: [
      {
        id: 'custom-a320neo',
        label: 'A320neo Custom',
        type: 'type',
        children: [
          {
            id: 'custom-leap1a',
            label: 'LEAP-1A26',
            type: 'engine',
            children: [
              { id: 'custom-layout-1', label: 'F8 - Y162', type: 'layout' },
              { id: 'custom-layout-2', label: 'Y180', type: 'layout' },
            ],
          },
        ],
      },
    ],
  },
];

const mockSources: AircraftSource[] = [
  { label: 'RDM', tree: rdmTree },
  { label: 'Custom', tree: customTree },
];

// Helper to build summary from path
function buildSummaryFromPath(path: AircraftTreeNode[]): AircraftSummary | undefined {
  if (path.length === 0) return undefined;

  const typeNode = path.find(n => n.type === 'type');
  const engineNode = path.find(n => n.type === 'engine');
  const layoutNode = path.find(n => n.type === 'layout');

  if (!typeNode || !engineNode || !layoutNode) return undefined;

  // Remove "(Default)" suffix for cleaner display
  const cleanLabel = (label: string) => label.replace(/\s*\(Default\)/i, '');

  return {
    family: cleanLabel(typeNode.label),
    engine: cleanLabel(engineNode.label),
    layout: cleanLabel(layoutNode.label),
  };
}

const mockConfigData: AircraftConfigData = {
  weights: {
    weightVariant: 'Basic WV',
    basic: 3000,
    mtw: 45000,
    mtow: 50000,
    mlw: 10000,
    mzfw: 10000,
    mfc: 10000,
  },
  cabin: {
    totalSeats: 156,
    firstSeats: 12,
    businessSeats: 0,
    premiumSeats: 24,
    ecoSeats: 120,
  },
  cg: {
    centerOfGravity: 50,
  },
};

const mockPerformanceData: AircraftPerformanceData = {
  source: 'FMS',
  model: 'A320-212-VC10 / 0%',
  globalDeterioration: 0,
  deteriorationPerPhase: {
    taxi: 0,
    takeOff: 0,
    climb: 0,
    cruise: 0,
    descent: 0,
    holding: 0,
    approachAndLanding: 0,
  },
};

// --- Page component ---

export default function AircraftSelectorPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>('a320-200-5a-f12y138');
  const [selectedSummary, setSelectedSummary] = useState<AircraftSummary | undefined>({
    family: 'A320-200',
    engine: 'CFM56-5A',
    layout: 'F12 - Y138',
  });
  const [activeDemoTab, setActiveDemoTab] = useState(0);
  const [perfSource, setPerfSource] = useState<PerformanceSource>('FMS');

  const handleSelect = (nodeId: string, path: AircraftTreeNode[]) => {
    setSelectedNodeId(nodeId);
    setSelectedSummary(buildSummaryFromPath(path));
  };

  const basicCode = `import { AircraftSelector } from '@/design-system/composites/AircraftSelector';
import type {
  AircraftSource,
  AircraftSummary,
  AircraftConfigData,
  AircraftPerformanceData,
} from '@/design-system/composites/AircraftSelector';

const [selectedNodeId, setSelectedNodeId] = useState<string>();
const [activeTab, setActiveTab] = useState(0);
const [perfSource, setPerfSource] = useState<'FMS' | 'BADA'>('FMS');

<AircraftSelector
  sources={sources}
  selectedNodeId={selectedNodeId}
  onSelect={(nodeId) => setSelectedNodeId(nodeId)}
  summary={summary}
  configData={configData}
  performanceData={performanceData}
  onSourceChange={setPerfSource}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>`;

  const emptyCode = `<AircraftSelector
  sources={sources}
  emptyStateText="Select an Aircraft"
/>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        AircraftSelector
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A split-panel component for selecting aircraft configurations. The left panel provides
        tree navigation with search. The right panel has two fixed tabs: Configuration (weights, cabin, CG)
        and Performance Model (source, model, deterioration).
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
          {/* Full Example */}
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
                Full Example
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="aircraft-selector-demo">
              <AircraftSelector
                sources={mockSources}
                selectedNodeId={selectedNodeId}
                onSelect={handleSelect}
                summary={selectedSummary}
                configData={selectedNodeId ? mockConfigData : undefined}
                performanceData={selectedNodeId ? { ...mockPerformanceData, source: perfSource } : undefined}
                onSourceChange={setPerfSource}
                activeTab={activeDemoTab}
                onTabChange={setActiveDemoTab}
              />
            </div>
          </section>

          {/* Empty State */}
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
                Empty State
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('empty')}
              />
            </div>
            <div className="aircraft-selector-demo">
              <AircraftSelector
                sources={mockSources}
                emptyStateText="Select an Aircraft"
              />
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
                <td><code>sources</code></td>
                <td><code>AircraftSource[]</code></td>
                <td>-</td>
                <td>Array of data sources (e.g. RDM, Custom), each with a label and tree</td>
              </tr>
              <tr>
                <td><code>selectedNodeId</code></td>
                <td><code>string</code></td>
                <td>-</td>
                <td>ID of the currently selected tree node</td>
              </tr>
              <tr>
                <td><code>onSelect</code></td>
                <td><code>(nodeId, path) =&gt; void</code></td>
                <td>-</td>
                <td>Callback when a leaf node is selected</td>
              </tr>
              <tr>
                <td><code>summary</code></td>
                <td><code>AircraftSummary</code></td>
                <td>-</td>
                <td>Header summary (family, engine, layout)</td>
              </tr>
              <tr>
                <td><code>configData</code></td>
                <td><code>AircraftConfigData</code></td>
                <td>-</td>
                <td>Configuration tab data (weights, cabin, CG)</td>
              </tr>
              <tr>
                <td><code>performanceData</code></td>
                <td><code>AircraftPerformanceData</code></td>
                <td>-</td>
                <td>Performance Model tab data (source, model, deterioration)</td>
              </tr>
              <tr>
                <td><code>onSourceChange</code></td>
                <td><code>(source: 'FMS' | 'BADA') =&gt; void</code></td>
                <td>-</td>
                <td>Callback when performance source changes</td>
              </tr>
              <tr>
                <td><code>activeTab</code></td>
                <td><code>number</code></td>
                <td><code>0</code></td>
                <td>Controlled active tab index (0=Configuration, 1=Performance)</td>
              </tr>
              <tr>
                <td><code>onTabChange</code></td>
                <td><code>(index: number) =&gt; void</code></td>
                <td>-</td>
                <td>Callback when detail tab changes</td>
              </tr>
              <tr>
                <td><code>searchPlaceholder</code></td>
                <td><code>string</code></td>
                <td><code>'Search'</code></td>
                <td>Placeholder text for the search input</td>
              </tr>
              <tr>
                <td><code>emptyStateText</code></td>
                <td><code>string</code></td>
                <td><code>'Select an Aircraft'</code></td>
                <td>Text displayed when no aircraft is selected</td>
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
        title="AircraftSelector - Full Example"
        sections={[{ title: 'AircraftSelector.tsx', language: 'tsx', code: basicCode }]}
      />
      <CodeModal
        isOpen={openModal === 'empty'}
        onClose={() => setOpenModal(null)}
        title="AircraftSelector - Empty State"
        sections={[{ title: 'AircraftSelector.tsx', language: 'tsx', code: emptyCode }]}
      />
    </div>
  );
}
