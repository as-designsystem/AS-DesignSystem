import { useState } from 'react';
import { Chip, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/Chip.css';
import '@as-designsystem/core/Icon.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './Chip.css';

export default function ChipPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');
  const [selectedChips, setSelectedChips] = useState<Record<string, boolean>>({});

  const toggleChip = (id: string) => {
    setSelectedChips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectableCode = `import { useState } from 'react';
import { Chip } from '@/design-system/components/Chip';

const [selectedChips, setSelectedChips] = useState<Record<string, boolean>>({});

const toggleChip = (id: string) => {
  setSelectedChips((prev) => ({ ...prev, [id]: !prev[id] }));
};

<Chip
  label="Option A"
  size="M"
  type="Selectable"
  active={!!selectedChips['a']}
  onClick={() => toggleChip('a')}
/>
<Chip
  label="Option B"
  size="M"
  type="Selectable"
  active={!!selectedChips['b']}
  onClick={() => toggleChip('b')}
/>
<Chip
  label="Option C"
  size="M"
  type="Selectable"
  active={!!selectedChips['c']}
  onClick={() => toggleChip('c')}
/>`;

  const sizesCode = `import { Chip } from '@/design-system/components/Chip';

<Chip label="XS Chip" size="XS" onClick={() => {}} />
<Chip label="S Chip" size="S" onClick={() => {}} />
<Chip label="M Chip" size="M" onClick={() => {}} />
<Chip label="L Chip" size="L" onClick={() => {}} />
<Chip label="XL Chip" size="XL" onClick={() => {}} />`;

  const withIconCode = `import { Chip } from '@/design-system/components/Chip';

<Chip label="Fleet" size="S" icon="AIR_fleet" onClick={() => {}} />
<Chip label="Fleet" size="M" icon="AIR_fleet" onClick={() => {}} />
<Chip label="Fleet" size="L" icon="AIR_fleet" onClick={() => {}} />
<Chip
  label="Fleet Active"
  size="M"
  icon="AIR_fleet"
  active
  onClick={() => {}}
/>`;

  const removableCode = `import { Chip } from '@/design-system/components/Chip';

<Chip label="XS" size="XS" type="Removable" onRemove={() => console.log('removed')} />
<Chip label="Small" size="S" type="Removable" onRemove={() => console.log('removed')} />
<Chip label="Medium" size="M" type="Removable" onRemove={() => console.log('removed')} />
<Chip label="Large" size="L" type="Removable" onRemove={() => console.log('removed')} />
<Chip label="XL" size="XL" type="Removable" onRemove={() => console.log('removed')} />
<Chip label="Active" size="M" type="Removable" active onRemove={() => console.log('removed')} />`;

  const readonlyCode = `import { Chip } from '@/design-system/components/Chip';

<Chip label="Read Only" size="S" type="ReadOnly" />
<Chip label="Read Only" size="M" type="ReadOnly" />
<Chip label="With Icon" size="M" type="ReadOnly" icon="AIR_fleet" />`;

  const richLabelCode = `import { Chip } from '@/design-system/components/Chip';

<Chip
  label={
    <>
      <span style={{ fontWeight: 400 }}>Maintenance Profile</span>{' '}
      <span style={{ fontWeight: 700 }}>Heavy MRP, +2</span>
    </>
  }
  size="M"
  type="Removable"
  active
  ariaLabel="Remove Maintenance Profile filter"
  onRemove={() => {}}
  onClick={() => {}}
/>

<Chip
  label={
    <>
      <span style={{ fontWeight: 400 }}>Status</span>{' '}
      <span style={{ fontWeight: 700 }}>Active</span>
    </>
  }
  size="M"
  type="Removable"
  ariaLabel="Remove Status filter"
  onRemove={() => {}}
  onClick={() => {}}
/>

<Chip
  label={
    <>
      <span style={{ fontWeight: 400 }}>Airport</span>{' '}
      <span style={{ fontWeight: 700 }}>CDG, +3</span>
    </>
  }
  size="S"
  type="Selectable"
  active
  onClick={() => {}}
/>`;

  const disabledCode = `import { Chip } from '@/design-system/components/Chip';

<Chip label="Disabled" size="M" disabled onClick={() => {}} />
<Chip label="Disabled Active" size="M" active disabled onClick={() => {}} />
<Chip
  label="Disabled Removable"
  size="M"
  type="Removable"
  disabled
  onRemove={() => {}}
/>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Chip
        </h1>
        <InstallCommand componentName="chip" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        A pill-shaped badge used for selections, filters, or tags. Supports Selectable,
        ReadOnly, and Removable types with optional icon.
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
          {/* Selectable */}
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
                Selectable
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('selectable')}
              />
            </div>
            <div className="example-container">
              <div className="chip-demo__row">
                <Chip
                  label="Option A"
                  size="M"
                  type="Selectable"
                  active={!!selectedChips['a']}
                  onClick={() => toggleChip('a')}
                />
                <Chip
                  label="Option B"
                  size="M"
                  type="Selectable"
                  active={!!selectedChips['b']}
                  onClick={() => toggleChip('b')}
                />
                <Chip
                  label="Option C"
                  size="M"
                  type="Selectable"
                  active={!!selectedChips['c']}
                  onClick={() => toggleChip('c')}
                />
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
              <div className="chip-demo">
                <div className="chip-demo__row chip-demo__row--align-center">
                  <Chip label="XS Chip" size="XS" onClick={() => {}} />
                  <Chip label="S Chip" size="S" onClick={() => {}} />
                  <Chip label="M Chip" size="M" onClick={() => {}} />
                  <Chip label="L Chip" size="L" onClick={() => {}} />
                  <Chip label="XL Chip" size="XL" onClick={() => {}} />
                </div>
              </div>
            </div>
          </section>

          {/* With Icon */}
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
                With Icon
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('withIcon')}
              />
            </div>
            <div className="example-container">
              <div className="chip-demo">
                <div className="chip-demo__row chip-demo__row--align-center">
                  <Chip label="Fleet" size="S" icon="AIR_fleet" onClick={() => {}} />
                  <Chip label="Fleet" size="M" icon="AIR_fleet" onClick={() => {}} />
                  <Chip label="Fleet" size="L" icon="AIR_fleet" onClick={() => {}} />
                  <Chip
                    label="Fleet Active"
                    size="M"
                    icon="AIR_fleet"
                    active
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Removable */}
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
                Removable
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('removable')}
              />
            </div>
            <div className="example-container">
              <div className="chip-demo">
                <div className="chip-demo__row chip-demo__row--align-center">
                  <Chip
                    label="XS"
                    size="XS"
                    type="Removable"
                    onRemove={() => console.log('removed')}
                  />
                  <Chip
                    label="Small"
                    size="S"
                    type="Removable"
                    onRemove={() => console.log('removed')}
                  />
                  <Chip
                    label="Medium"
                    size="M"
                    type="Removable"
                    onRemove={() => console.log('removed')}
                  />
                  <Chip
                    label="Large"
                    size="L"
                    type="Removable"
                    onRemove={() => console.log('removed')}
                  />
                  <Chip
                    label="XL"
                    size="XL"
                    type="Removable"
                    onRemove={() => console.log('removed')}
                  />
                  <Chip
                    label="Active"
                    size="M"
                    type="Removable"
                    active
                    onRemove={() => console.log('removed')}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Read Only */}
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
                Read Only
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('readonly')}
              />
            </div>
            <div className="example-container">
              <div className="chip-demo">
                <div className="chip-demo__row chip-demo__row--align-center">
                  <Chip label="Read Only" size="S" type="ReadOnly" />
                  <Chip label="Read Only" size="M" type="ReadOnly" />
                  <Chip label="With Icon" size="M" type="ReadOnly" icon="AIR_fleet" />
                </div>
              </div>
            </div>
          </section>

          {/* Rich Label */}
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
                Rich Label
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('richLabel')}
              />
            </div>
            <div className="example-container">
              <div className="chip-demo">
                <div className="chip-demo__row chip-demo__row--align-center">
                  <Chip
                    label={
                      <>
                        <span style={{ fontWeight: 400 }}>Maintenance Profile</span>{' '}
                        <span style={{ fontWeight: 700 }}>Heavy MRP, +2</span>
                      </>
                    }
                    size="M"
                    type="Removable"
                    active
                    ariaLabel="Remove Maintenance Profile filter"
                    onRemove={() => console.log('removed')}
                    onClick={() => {}}
                  />
                  <Chip
                    label={
                      <>
                        <span style={{ fontWeight: 400 }}>Status</span>{' '}
                        <span style={{ fontWeight: 700 }}>Active</span>
                      </>
                    }
                    size="M"
                    type="Removable"
                    ariaLabel="Remove Status filter"
                    onRemove={() => console.log('removed')}
                    onClick={() => {}}
                  />
                  <Chip
                    label={
                      <>
                        <span style={{ fontWeight: 400 }}>Airport</span>{' '}
                        <span style={{ fontWeight: 700 }}>CDG, +3</span>
                      </>
                    }
                    size="S"
                    type="Selectable"
                    active
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Disabled */}
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
                Disabled
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('disabled')}
              />
            </div>
            <div className="example-container">
              <div className="chip-demo">
                <div className="chip-demo__row chip-demo__row--align-center">
                  <Chip label="Disabled" size="M" disabled onClick={() => {}} />
                  <Chip label="Disabled Active" size="M" active disabled onClick={() => {}} />
                  <Chip
                    label="Disabled Removable"
                    size="M"
                    type="Removable"
                    disabled
                    onRemove={() => {}}
                  />
                </div>
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
                  <td><code>label</code></td>
                  <td><code>ReactNode</code></td>
                  <td>-</td>
                  <td>Content displayed in the chip. Accepts a string or JSX for mixed content.</td>
                </tr>
                <tr>
                  <td><code>ariaLabel</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Accessible label override for the remove button. Required when label is JSX.</td>
                </tr>
                <tr>
                  <td><code>size</code></td>
                  <td><code>'XS' | 'S' | 'M' | 'L' | 'XL'</code></td>
                  <td><code>'M'</code></td>
                  <td>Size of the chip</td>
                </tr>
                <tr>
                  <td><code>type</code></td>
                  <td><code>'Selectable' | 'ReadOnly' | 'Removable'</code></td>
                  <td><code>'Selectable'</code></td>
                  <td>Type of chip behavior</td>
                </tr>
                <tr>
                  <td><code>active</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether the chip is in active/selected state</td>
                </tr>
                <tr>
                  <td><code>disabled</code></td>
                  <td><code>boolean</code></td>
                  <td><code>false</code></td>
                  <td>Whether the chip is disabled</td>
                </tr>
                <tr>
                  <td><code>icon</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Icon name to display before the label</td>
                </tr>
                <tr>
                  <td><code>onClick</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td>-</td>
                  <td>Click handler for the chip</td>
                </tr>
                <tr>
                  <td><code>onRemove</code></td>
                  <td><code>(e: MouseEvent) =&gt; void</code></td>
                  <td>-</td>
                  <td>Click handler for the remove button (Removable type)</td>
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
        isOpen={openModal === 'selectable'}
        onClose={() => setOpenModal(null)}
        title="Chip — Selectable"
        sections={[{ title: 'Chip.tsx', language: 'tsx', code: selectableCode }]}
      />
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Chip — Sizes"
        sections={[{ title: 'Chip.tsx', language: 'tsx', code: sizesCode }]}
      />
      <CodeModal
        isOpen={openModal === 'withIcon'}
        onClose={() => setOpenModal(null)}
        title="Chip — With Icon"
        sections={[{ title: 'Chip.tsx', language: 'tsx', code: withIconCode }]}
      />
      <CodeModal
        isOpen={openModal === 'removable'}
        onClose={() => setOpenModal(null)}
        title="Chip — Removable"
        sections={[{ title: 'Chip.tsx', language: 'tsx', code: removableCode }]}
      />
      <CodeModal
        isOpen={openModal === 'readonly'}
        onClose={() => setOpenModal(null)}
        title="Chip — Read Only"
        sections={[{ title: 'Chip.tsx', language: 'tsx', code: readonlyCode }]}
      />
      <CodeModal
        isOpen={openModal === 'richLabel'}
        onClose={() => setOpenModal(null)}
        title="Chip — Rich Label"
        sections={[{ title: 'Chip.tsx', language: 'tsx', code: richLabelCode }]}
      />
      <CodeModal
        isOpen={openModal === 'disabled'}
        onClose={() => setOpenModal(null)}
        title="Chip — Disabled"
        sections={[{ title: 'Chip.tsx', language: 'tsx', code: disabledCode }]}
      />
    </div>
  );
}
