import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  Tab,
  Button,
  IconButton,
} from '@as-design-system/core';
import '@as-design-system/core/DropdownMenu.css';
import '@as-design-system/core/Icon.css';
import '@as-design-system/core/IconButton.css';
import '@as-design-system/core/Tab.css';
import '@as-design-system/core/Button.css';
import CodeModal from '../components/CodeModal';
import './DropdownMenu.css';

export default function DropdownMenuPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  // Checkbox states
  const [showGrid, setShowGrid] = useState(true);
  const [showRulers, setShowRulers] = useState(false);
  const [showGuides, setShowGuides] = useState(true);

  const basicCode = `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/design-system/components/DropdownMenu';
import { IconButton } from '@/design-system/components/IconButton';

<DropdownMenu>
  <DropdownMenuTrigger>
    <IconButton icon="more_horiz" size="S" variant="Ghost" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem icon="open_in_new">Open Results</DropdownMenuItem>
    <DropdownMenuItem icon="content_copy">Duplicate</DropdownMenuItem>
    <DropdownMenuItem icon="edit">Rename</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon="delete" destructive>Delete Study</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

  const checkboxCode = `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from '@/design-system/components/DropdownMenu';

const [showGrid, setShowGrid] = useState(true);
const [showRulers, setShowRulers] = useState(false);
const [showGuides, setShowGuides] = useState(true);

<DropdownMenu>
  <DropdownMenuTrigger>
    <IconButton icon="settings" size="S" variant="Ghost" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Display</DropdownMenuLabel>
    <DropdownMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
      Show Grid
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked={showRulers} onCheckedChange={setShowRulers}>
      Show Rulers
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked={showGuides} onCheckedChange={setShowGuides}>
      Show Guides
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`;

  const submenuCode = `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from '@/design-system/components/DropdownMenu';

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button label="Actions" rightIcon="keyboard_arrow_down" variant="Outlined" size="S" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem icon="open_in_new">Open</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger icon="content_copy">Export as...</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>PDF</DropdownMenuItem>
        <DropdownMenuItem>CSV</DropdownMenuItem>
        <DropdownMenuItem>Excel</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon="delete" destructive>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

  const sectionsCode = `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/design-system/components/DropdownMenu';

<DropdownMenu>
  <DropdownMenuTrigger>
    <IconButton icon="more_horiz" size="S" variant="Ghost" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Study</DropdownMenuLabel>
    <DropdownMenuItem icon="open_in_new">Open Results</DropdownMenuItem>
    <DropdownMenuItem icon="content_copy">Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
    <DropdownMenuItem icon="delete" destructive>Delete Study</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        DropdownMenu
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        An accessible dropdown menu based on Radix UI. Supports action items, checkbox items,
        section labels, separators, and sub-menus.
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
          {/* Basic Action Menu */}
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
                Action Menu
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
              <div className="dropdown-demo">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IconButton icon="more_horiz" size="S" variant="Ghost" alt="More options" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem icon="open_in_new">Open Results</DropdownMenuItem>
                    <DropdownMenuItem icon="content_copy">Duplicate</DropdownMenuItem>
                    <DropdownMenuItem icon="edit">Rename</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem icon="delete" destructive>
                      Delete Study
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </section>

          {/* Checkbox Menu */}
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
                Checkbox Items
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('checkbox')}
              />
            </div>
            <div className="example-container">
              <div className="dropdown-demo">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IconButton icon="settings" size="S" variant="Ghost" alt="Display settings" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Display</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={showGrid}
                      onCheckedChange={setShowGrid}
                    >
                      Show Grid
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={showRulers}
                      onCheckedChange={setShowRulers}
                    >
                      Show Rulers
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={showGuides}
                      onCheckedChange={setShowGuides}
                    >
                      Show Guides
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <span
                  className="label-regular-s"
                  style={{ color: 'var(--text-secondary, #63728a)' }}
                >
                  Grid: {showGrid ? 'On' : 'Off'} | Rulers: {showRulers ? 'On' : 'Off'} | Guides:{' '}
                  {showGuides ? 'On' : 'Off'}
                </span>
              </div>
            </div>
          </section>

          {/* Sub-menu */}
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
                Sub-menu
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('submenu')}
              />
            </div>
            <div className="example-container">
              <div className="dropdown-demo">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      label="Actions"
                      rightIcon="keyboard_arrow_down"
                      variant="Outlined"
                      size="S"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem icon="open_in_new">Open</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger icon="content_copy">
                        Export as...
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>PDF</DropdownMenuItem>
                        <DropdownMenuItem>CSV</DropdownMenuItem>
                        <DropdownMenuItem>Excel</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem icon="delete" destructive>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </section>

          {/* Sections */}
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
                With Sections
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('sections')}
              />
            </div>
            <div className="example-container">
              <div className="dropdown-demo">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IconButton icon="more_horiz" size="S" variant="Ghost" alt="More options" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Study</DropdownMenuLabel>
                    <DropdownMenuItem icon="open_in_new">Open Results</DropdownMenuItem>
                    <DropdownMenuItem icon="content_copy">Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Danger Zone</DropdownMenuLabel>
                    <DropdownMenuItem icon="delete" destructive>
                      Delete Study
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
            Components
          </h2>
          <p
            className="label-regular-m"
            style={{
              marginBottom: '24px',
              color: 'var(--text-secondary, #63728a)',
            }}
          >
            DropdownMenu is a compound component. Each sub-component has its own props.
          </p>

          {/* DropdownMenuItem Props */}
          <h3
            className="heading-7"
            style={{
              marginTop: '24px',
              marginBottom: '12px',
              color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
            }}
          >
            DropdownMenuItem
          </h3>
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
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Label text of the menu item</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Icon name displayed before the label</td>
                </tr>
                <tr>
                  <td><code>destructive</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Applies destructive (red) styling to the icon</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether the item is disabled</td>
                </tr>
                <tr>
                  <td><code>onSelect</code></td>
                  <td><code>(event: Event) =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback when the item is selected</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* DropdownMenuCheckboxItem Props */}
          <h3
            className="heading-7"
            style={{
              marginTop: '24px',
              marginBottom: '12px',
              color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
            }}
          >
            DropdownMenuCheckboxItem
          </h3>
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
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Label text of the checkbox item</td>
                </tr>
                <tr>
                  <td><code>checked</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether the item is checked</td>
                </tr>
                <tr>
                  <td><code>onCheckedChange</code></td>
                  <td><code>(checked: boolean) =&gt; void</code></td>
                  <td>-</td>
                  <td>Callback when the checked state changes</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether the item is disabled</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* DropdownMenuContent Props */}
          <h3
            className="heading-7"
            style={{
              marginTop: '24px',
              marginBottom: '12px',
              color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
            }}
          >
            DropdownMenuContent
          </h3>
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
                  <td><code>side</code></td>
                  <td><code>'top' | 'right' | 'bottom' | 'left'</code></td>
                  <td><code>'bottom'</code></td>
                  <td>Side to open the menu on</td>
                </tr>
                <tr>
                  <td><code>sideOffset</code></td>
                  <td><code>number</code></td>
                  <td><code>4</code></td>
                  <td>Distance from the trigger in pixels</td>
                </tr>
                <tr>
                  <td><code>align</code></td>
                  <td><code>'start' | 'center' | 'end'</code></td>
                  <td><code>'start'</code></td>
                  <td>Alignment relative to the trigger</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* DropdownMenuSubTrigger Props */}
          <h3
            className="heading-7"
            style={{
              marginTop: '24px',
              marginBottom: '12px',
              color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
            }}
          >
            DropdownMenuSubTrigger
          </h3>
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
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Label text</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Icon name displayed before the label</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether the sub-trigger is disabled</td>
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
        title="DropdownMenu — Action Menu"
        sections={[{ title: 'DropdownMenu.tsx', language: 'tsx', code: basicCode }]}
      />
      <CodeModal
        isOpen={openModal === 'checkbox'}
        onClose={() => setOpenModal(null)}
        title="DropdownMenu — Checkbox Items"
        sections={[{ title: 'DropdownMenu.tsx', language: 'tsx', code: checkboxCode }]}
      />
      <CodeModal
        isOpen={openModal === 'submenu'}
        onClose={() => setOpenModal(null)}
        title="DropdownMenu — Sub-menu"
        sections={[{ title: 'DropdownMenu.tsx', language: 'tsx', code: submenuCode }]}
      />
      <CodeModal
        isOpen={openModal === 'sections'}
        onClose={() => setOpenModal(null)}
        title="DropdownMenu — With Sections"
        sections={[{ title: 'DropdownMenu.tsx', language: 'tsx', code: sectionsCode }]}
      />
    </div>
  );
}
