import { useState } from 'react';
import { Modal, Button, Tab } from '@as-design-system/core';
import '@as-design-system/core/Modal.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/Tab.css';
import CodeModal from '../components/CodeModal';
import './Modal.css';

export default function ModalPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  // Demo modal states
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [fullscreenModalOpen, setFullscreenModalOpen] = useState(false);
  const [hugContentModalOpen, setHugContentModalOpen] = useState(false);
  const [noFooterModalOpen, setNoFooterModalOpen] = useState(false);

  const basicCode = `import { useState } from 'react';
import { Modal } from '@/design-system/composites/Modal';
import { Button } from '@/design-system/components/Button';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button label="Open Modal" onClick={() => setIsOpen(true)} />

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmation"
        footer={
          <>
            <Button
              variant="Ghost"
              label="CANCEL"
              onClick={() => setIsOpen(false)}
            />
            <Button
              variant="Default"
              label="CONTINUE"
              onClick={() => {
                // Handle confirm action
                setIsOpen(false);
              }}
            />
          </>
        }
      >
        <p>Are you sure you want to continue with this action?</p>
      </Modal>
    </>
  );
}`;

  const customSizeCode = `import { Modal } from '@/design-system/composites/Modal';
import { Button } from '@/design-system/components/Button';
import './my-styles.css';

// Fullscreen modal (with margin)
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Fullscreen Modal"
  className="modal--fullscreen"
  footer={<Button label="CLOSE" onClick={() => setIsOpen(false)} />}
>
  <p>This modal fills the entire screen with a small margin.</p>
</Modal>

// CSS (my-styles.css)
.modal--fullscreen {
  width: calc(100vw - 48px);
  height: calc(100vh - 48px);
  max-width: none;
  max-height: none;
}

// Hug content modal (adapts to content)
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Compact Modal"
  className="modal--hug"
  footer={<Button label="OK" onClick={() => setIsOpen(false)} />}
>
  <p>Small content</p>
</Modal>

// CSS
.modal--hug {
  width: fit-content;
  min-width: 280px;
}`;

  const customFooterCode = `import { Modal } from '@/design-system/composites/Modal';
import { Button } from '@/design-system/components/Button';

// Custom footer with different actions
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete Item"
  footer={
    <>
      <Button variant="Ghost" label="CANCEL" onClick={() => setIsOpen(false)} />
      <Button variant="Default" label="DELETE" onClick={handleDelete} />
    </>
  }
>
  <p>This action cannot be undone.</p>
</Modal>

// No footer (content only)
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Information"
>
  <p>This modal has no footer actions.</p>
  <p>Click the X button or press Escape to close.</p>
</Modal>`;

  return (
    <div className="component-page">
      <h1 className="heading-5" style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
        Modal
      </h1>
      <p className="label-regular-m" style={{ marginTop: '12px', marginBottom: '24px', color: 'var(--text-secondary, var(--cool-grey-70, #63728a))' }}>
        A dialog component that displays content in a layer above the page with customizable header, content, and footer.
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
          {/* Basic Usage */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Basic Usage
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('basic')}
              />
            </div>
            <div className="modal-examples">
              <Button
                label="Open Modal"
                variant="Default"
                size="M"
                onClick={() => setBasicModalOpen(true)}
              />
            </div>
          </section>

          {/* Custom Sizes */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Custom Sizes (via className)
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('customSize')}
              />
            </div>
            <div className="modal-examples">
              <Button
                label="Fullscreen"
                variant="Outlined"
                size="M"
                onClick={() => setFullscreenModalOpen(true)}
              />
              <Button
                label="Hug Content"
                variant="Outlined"
                size="M"
                onClick={() => setHugContentModalOpen(true)}
              />
            </div>
          </section>

          {/* Custom Footer */}
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
                Custom Footer
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('customFooter')}
              />
            </div>
            <div className="modal-examples">
              <Button
                label="Modal without Footer"
                variant="Outlined"
                size="M"
                onClick={() => setNoFooterModalOpen(true)}
              />
            </div>
          </section>

          {/* Demo Modals */}
          <Modal
            isOpen={basicModalOpen}
            onClose={() => setBasicModalOpen(false)}
            title="Confirmation"
            footer={
              <>
                <Button
                  variant="Ghost"
                  label="CANCEL"
                  onClick={() => setBasicModalOpen(false)}
                />
                <Button
                  variant="Default"
                  label="CONTINUE"
                  onClick={() => setBasicModalOpen(false)}
                />
              </>
            }
          >
            <p className="label-regular-m" style={{ color: 'var(--text-main, #14171d)' }}>
              Are you sure you want to continue with this action? This is an example of a basic modal with a title, content, and footer buttons.
            </p>
          </Modal>

          <Modal
            isOpen={fullscreenModalOpen}
            onClose={() => setFullscreenModalOpen(false)}
            title="Fullscreen Modal"
            className="modal--fullscreen"
            footer={
              <Button
                variant="Default"
                label="CLOSE"
                onClick={() => setFullscreenModalOpen(false)}
              />
            }
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p className="label-regular-m" style={{ color: 'var(--text-main, #14171d)' }}>
                This modal fills the entire screen with a 24px margin on all sides.
              </p>
              <p className="label-regular-m" style={{ color: 'var(--text-secondary, #63728a)' }}>
                Use the className <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>modal--fullscreen</code> to achieve this effect.
              </p>
              <div style={{
                flex: 1,
                background: 'var(--background-tertiary)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px'
              }}>
                <p className="label-regular-m" style={{ color: 'var(--text-tertiary)' }}>
                  Content area expands to fill available space
                </p>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={hugContentModalOpen}
            onClose={() => setHugContentModalOpen(false)}
            title="Compact Modal"
            className="modal--hug"
            footer={
              <Button
                variant="Default"
                label="OK"
                onClick={() => setHugContentModalOpen(false)}
              />
            }
          >
            <p className="label-regular-m" style={{ color: 'var(--text-main, #14171d)' }}>
              This modal adapts to its content.
            </p>
          </Modal>

          <Modal
            isOpen={noFooterModalOpen}
            onClose={() => setNoFooterModalOpen(false)}
            title="Information"
          >
            <p className="label-regular-m" style={{ color: 'var(--text-main, #14171d)', marginBottom: '12px' }}>
              This modal has no footer. You can close it by:
            </p>
            <ul className="label-regular-m" style={{ color: 'var(--text-main, #14171d)', paddingLeft: '20px' }}>
              <li>Clicking the X button</li>
              <li>Pressing the Escape key</li>
              <li>Clicking outside the modal</li>
            </ul>
          </Modal>
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
        <section className="component-section">
          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Props
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
                  <td><code>isOpen</code></td>
                  <td><code>boolean</code></td>
                  <td><code>-</code></td>
                  <td>Controls the visibility of the modal (required)</td>
                </tr>
                <tr>
                  <td><code>onClose</code></td>
                  <td><code>() =&gt; void</code></td>
                  <td><code>-</code></td>
                  <td>Callback when the modal is closed (required)</td>
                </tr>
                <tr>
                  <td><code>title</code></td>
                  <td><code>string</code></td>
                  <td><code>-</code></td>
                  <td>Title displayed in the modal header (required)</td>
                </tr>
                <tr>
                  <td><code>children</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>-</code></td>
                  <td>Content to display inside the modal (required)</td>
                </tr>
                <tr>
                  <td><code>footer</code></td>
                  <td><code>ReactNode</code></td>
                  <td><code>undefined</code></td>
                  <td>Custom footer content (buttons, etc.)</td>
                </tr>
                <tr>
                  <td><code>closeOnOverlayClick</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether clicking the overlay closes the modal</td>
                </tr>
                <tr>
                  <td><code>closeOnEscape</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Whether pressing Escape closes the modal</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td><code>''</code></td>
                  <td>Additional class name to customize size and styles</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="heading-6" style={{ marginTop: '32px', marginBottom: '16px', color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}>
            Customizing Size
          </h2>
          <p className="label-regular-m" style={{ marginBottom: '16px', color: 'var(--text-main, #14171d)' }}>
            The modal has a default width of 471px. Use the <code style={{ background: 'var(--background-tertiary)', padding: '2px 6px', borderRadius: '3px' }}>className</code> prop to customize the size:
          </p>
          <div className="props-table">
            <table>
              <thead>
                <tr>
                  <th>Effect</th>
                  <th>CSS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fixed width</td>
                  <td><code>width: 600px;</code></td>
                </tr>
                <tr>
                  <td>Fixed height</td>
                  <td><code>height: 400px;</code></td>
                </tr>
                <tr>
                  <td>Hug content</td>
                  <td><code>width: fit-content;</code></td>
                </tr>
                <tr>
                  <td>Fullscreen</td>
                  <td><code>width: calc(100vw - 48px); height: calc(100vh - 48px); max-width: none; max-height: none;</code></td>
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
        title="Basic Usage"
        code={basicCode}
      />
      <CodeModal
        isOpen={openModal === 'customSize'}
        onClose={() => setOpenModal(null)}
        title="Custom Sizes Implementation"
        code={customSizeCode}
      />
      <CodeModal
        isOpen={openModal === 'customFooter'}
        onClose={() => setOpenModal(null)}
        title="Custom Footer Implementation"
        code={customFooterCode}
      />
    </div>
  );
}
