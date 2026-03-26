import { useState } from 'react';
import { Avatar, AvatarStack, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/Avatar.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import InstallCommand from '../components/InstallCommand';
import './Avatar.css';

export default function AvatarPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const sizesCode = `import { Avatar } from '@/design-system/components/Avatar';

<Avatar initials="MT" size="XS" />
<Avatar initials="MT" size="S" />
<Avatar initials="MT" size="M" />
<Avatar initials="MT" size="L" />`;

  const autoColorCode = `import { Avatar } from '@/design-system/components/Avatar';

{/* Each set of initials produces a deterministic color */}
<Avatar initials="MT" />
<Avatar initials="JD" />
<Avatar initials="AB" />
<Avatar initials="KL" />
<Avatar initials="RP" />
<Avatar initials="SG" />
<Avatar initials="WN" />
<Avatar initials="FE" />`;

  const customColorCode = `import { Avatar } from '@/design-system/components/Avatar';

<Avatar initials="MT" color="#e4002b" />
<Avatar initials="JD" color="#08875b" />`;

  const stackCode = `import { Avatar, AvatarStack } from '@/design-system/components/Avatar';

<AvatarStack size="M">
  <Avatar initials="MT" />
  <Avatar initials="JD" />
  <Avatar initials="AB" />
</AvatarStack>`;

  const stackOverflowCode = `import { Avatar, AvatarStack } from '@/design-system/components/Avatar';

<AvatarStack max={3} size="M">
  <Avatar initials="MT" />
  <Avatar initials="JD" />
  <Avatar initials="AB" />
  <Avatar initials="KL" />
  <Avatar initials="RP" />
</AvatarStack>`;

  return (
    <div className="component-page">
      <div className="page-header">
        <h1
          className="heading-5"
          style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
        >
          Avatar
        </h1>
        <InstallCommand componentName="avatar" />
      </div>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Circular user initials indicator with deterministic auto-colored background.
        Supports stacking with overlap and "+N" overflow.
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
              <div className="avatar-demo">
                <div className="avatar-demo__item">
                  <Avatar initials="MT" size="XS" />
                  <span className="avatar-demo__label">XS (16px)</span>
                </div>
                <div className="avatar-demo__item">
                  <Avatar initials="MT" size="S" />
                  <span className="avatar-demo__label">S (24px)</span>
                </div>
                <div className="avatar-demo__item">
                  <Avatar initials="MT" size="M" />
                  <span className="avatar-demo__label">M (32px)</span>
                </div>
                <div className="avatar-demo__item">
                  <Avatar initials="MT" size="L" />
                  <span className="avatar-demo__label">L (40px)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Auto Color */}
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
                Auto Color
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('autoColor')}
              />
            </div>
            <div className="example-container">
              <div className="avatar-demo">
                {['MT', 'JD', 'AB', 'KL', 'RP', 'SG', 'WN', 'FE'].map((initials) => (
                  <div className="avatar-demo__item" key={initials}>
                    <Avatar initials={initials} size="M" />
                    <span className="avatar-demo__label">{initials}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Custom Color */}
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
                Custom Color
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('customColor')}
              />
            </div>
            <div className="example-container">
              <div className="avatar-demo">
                <div className="avatar-demo__item">
                  <Avatar initials="MT" size="M" color="#e4002b" />
                  <span className="avatar-demo__label">#e4002b</span>
                </div>
                <div className="avatar-demo__item">
                  <Avatar initials="JD" size="M" color="#08875b" />
                  <span className="avatar-demo__label">#08875b</span>
                </div>
              </div>
            </div>
          </section>

          {/* Stack */}
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
                AvatarStack
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('stack')}
              />
            </div>
            <div className="example-container">
              <div className="avatar-demo">
                <AvatarStack size="M">
                  <Avatar initials="MT" />
                  <Avatar initials="JD" />
                  <Avatar initials="AB" />
                </AvatarStack>
              </div>
            </div>
          </section>

          {/* Stack with Overflow */}
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
                Stack with Overflow
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('stackOverflow')}
              />
            </div>
            <div className="example-container">
              <div className="avatar-demo" style={{ gap: '48px' }}>
                <div className="avatar-demo__item">
                  <AvatarStack max={3} size="S">
                    <Avatar initials="MT" size="S" />
                    <Avatar initials="JD" size="S" />
                    <Avatar initials="AB" size="S" />
                    <Avatar initials="KL" size="S" />
                    <Avatar initials="RP" size="S" />
                  </AvatarStack>
                  <span className="avatar-demo__label">max=3, size S</span>
                </div>
                <div className="avatar-demo__item">
                  <AvatarStack max={3} size="M">
                    <Avatar initials="MT" />
                    <Avatar initials="JD" />
                    <Avatar initials="AB" />
                    <Avatar initials="KL" />
                    <Avatar initials="RP" />
                  </AvatarStack>
                  <span className="avatar-demo__label">max=3, size M</span>
                </div>
                <div className="avatar-demo__item">
                  <AvatarStack max={2} size="L">
                    <Avatar initials="MT" size="L" />
                    <Avatar initials="JD" size="L" />
                    <Avatar initials="AB" size="L" />
                    <Avatar initials="KL" size="L" />
                  </AvatarStack>
                  <span className="avatar-demo__label">max=2, size L</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
        <>
          <section className="component-section">
            <h2
              className="heading-6"
              style={{
                marginTop: '32px',
                marginBottom: '16px',
                color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
              }}
            >
              Avatar Props
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
                    <td><code>initials</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>1-2 character initials (e.g. "MT", "JD")</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'XS' | 'S' | 'M' | 'L'</code></td>
                    <td><code>'M'</code></td>
                    <td>Size variant</td>
                  </tr>
                  <tr>
                    <td><code>color</code></td>
                    <td><code>string</code></td>
                    <td>auto</td>
                    <td>Override the auto-generated background color</td>
                  </tr>
                  <tr>
                    <td><code>className</code></td>
                    <td><code>string</code></td>
                    <td><code>''</code></td>
                    <td>Additional CSS class</td>
                  </tr>
                  <tr>
                    <td><code>ariaLabel</code></td>
                    <td><code>string</code></td>
                    <td>initials</td>
                    <td>Accessible label</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="component-section">
            <h2
              className="heading-6"
              style={{
                marginTop: '32px',
                marginBottom: '16px',
                color: 'var(--text-corporate, var(--sea-blue-90, #00205b))',
              }}
            >
              AvatarStack Props
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
                    <td><code>children</code></td>
                    <td><code>ReactNode</code></td>
                    <td>-</td>
                    <td>Avatar children</td>
                  </tr>
                  <tr>
                    <td><code>max</code></td>
                    <td><code>number</code></td>
                    <td>-</td>
                    <td>Maximum visible avatars before "+N" overflow</td>
                  </tr>
                  <tr>
                    <td><code>size</code></td>
                    <td><code>'XS' | 'S' | 'M' | 'L'</code></td>
                    <td><code>'M'</code></td>
                    <td>Size for overlap spacing and overflow indicator</td>
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
        </>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Avatar — Sizes"
        sections={[{ title: 'Avatar.tsx', language: 'tsx', code: sizesCode }]}
      />
      <CodeModal
        isOpen={openModal === 'autoColor'}
        onClose={() => setOpenModal(null)}
        title="Avatar — Auto Color"
        sections={[{ title: 'Avatar.tsx', language: 'tsx', code: autoColorCode }]}
      />
      <CodeModal
        isOpen={openModal === 'customColor'}
        onClose={() => setOpenModal(null)}
        title="Avatar — Custom Color"
        sections={[{ title: 'Avatar.tsx', language: 'tsx', code: customColorCode }]}
      />
      <CodeModal
        isOpen={openModal === 'stack'}
        onClose={() => setOpenModal(null)}
        title="AvatarStack"
        sections={[{ title: 'Avatar.tsx', language: 'tsx', code: stackCode }]}
      />
      <CodeModal
        isOpen={openModal === 'stackOverflow'}
        onClose={() => setOpenModal(null)}
        title="AvatarStack — Overflow"
        sections={[{ title: 'Avatar.tsx', language: 'tsx', code: stackOverflowCode }]}
      />
    </div>
  );
}
