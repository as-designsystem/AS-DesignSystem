import { useState } from 'react';
import { TextInput, Tab, Button } from '@as-designsystem/core';
import '@as-designsystem/core/TextInput.css';
import '@as-designsystem/core/Tab.css';
import '@as-designsystem/core/Button.css';
import CodeModal from '../components/CodeModal';
import './TextInput.css';

export default function TextInputPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  const [inputValue, setInputValue] = useState('');

  const sizesCode = `import { TextInput } from '@/design-system/components/TextInput';

<TextInput label="Size XS" placeholder="Enter text..." size="XS" />
<TextInput label="Size S" placeholder="Enter text..." size="S" />
<TextInput label="Size M" placeholder="Enter text..." size="M" />
<TextInput label="Size L" placeholder="Enter text..." size="L" />`;

  const statesCode = `import { TextInput } from '@/design-system/components/TextInput';

<TextInput label="Default" placeholder="Enter text..." state="Default" />
<TextInput label="Error" placeholder="Enter text..." state="Error" legend="This field is required" showLegend />
<TextInput label="Valid" placeholder="Enter text..." state="Valid" legend="Input validated" showLegend />
<TextInput label="Disabled" placeholder="Enter text..." disabled />
<TextInput label="Read-only" value="Read-only value" readOnly />`;

  const optionsCode = `import { TextInput } from '@/design-system/components/TextInput';

// With optional text
<TextInput label="Email" placeholder="Enter your email" showOptional />

// With legend
<TextInput label="Email" placeholder="Enter your email" legend="We'll never share your email" showLegend />

// With left icon
<TextInput label="Search" placeholder="Search..." showLeftIcon leftIcon="search" />

// With right icon
<TextInput label="Username" placeholder="Enter username" showRightIcon rightIcon="check" />

// With both icons
<TextInput label="Password" placeholder="Enter password" showLeftIcon leftIcon="lock" showRightIcon rightIcon="visibility" />

// With info tooltip
<TextInput label="API Key" placeholder="Enter your API key" showInfo infoText="Find your API key in settings" />

// With right icon button (clickable)
<TextInput label="Search" placeholder="Search..." showRightIconButton rightIconButton="close" onRightIconButtonClick={() => console.log('Clear!')} />`;

  return (
    <div className="component-page">
      <h1
        className="heading-5"
        style={{ color: 'var(--text-corporate, var(--sea-blue-90, #00205b))' }}
      >
        TextInput
      </h1>
      <p
        className="label-regular-m"
        style={{
          marginTop: '12px',
          marginBottom: '24px',
          color: 'var(--text-secondary, var(--cool-grey-70, #63728a))',
        }}
      >
        Text input component with support for different sizes, states, icons,
        and validation feedback.
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
              <div className="textinput-examples">
              <TextInput
                label="Size XS"
                placeholder="Enter text..."
                size="XS"
              />
              <TextInput
                label="Size S"
                placeholder="Enter text..."
                size="S"
              />
              <TextInput
                label="Size M"
                placeholder="Enter text..."
                size="M"
              />
              <TextInput
                label="Size L"
                placeholder="Enter text..."
                size="L"
              />
              </div>
            </div>
          </section>

          {/* States */}
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
                States
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('states')}
              />
            </div>
            <div className="example-container">
              <div className="textinput-examples">
              <TextInput
                label="Default"
                placeholder="Enter text..."
                state="Default"
              />
              <TextInput
                label="Error"
                placeholder="Enter text..."
                state="Error"
                legend="This field is required"
                showLegend
              />
              <TextInput
                label="Valid"
                placeholder="Enter text..."
                state="Valid"
                legend="Input validated"
                showLegend
              />
              <TextInput
                label="Disabled"
                placeholder="Enter text..."
                disabled
              />
              <TextInput
                label="Read-only"
                value="Read-only value"
                readOnly
              />
              </div>
            </div>
          </section>

          {/* Other Options */}
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
                Other Options
              </h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('options')}
              />
            </div>
            <div className="example-container">
              <div className="textinput-examples">
              <TextInput
                label="With optional"
                placeholder="Enter your email"
                showOptional
              />
              <TextInput
                label="With legend"
                placeholder="Enter your email"
                legend="We'll never share your email"
                showLegend
              />
              <TextInput
                label="With left icon"
                placeholder="Search..."
                showLeftIcon
                leftIcon="search"
              />
              <TextInput
                label="With right icon"
                placeholder="Enter username"
                showRightIcon
                rightIcon="check"
              />
              <TextInput
                label="With info tooltip"
                placeholder="Enter your API key"
                showInfo
                infoText="Find your API key in settings"
              />
              <TextInput
                label="With icon button"
                placeholder="Search..."
                showLeftIcon
                leftIcon="search"
                showRightIconButton
                rightIconButton="close"
                onRightIconButtonClick={() => alert('Clear clicked!')}
              />
              </div>
            </div>
          </section>

          {/* Controlled Input Example */}
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
                Controlled Input
              </h2>
            </div>
            <div className="example-container">
              <div className="textinput-examples">
              <TextInput
                label="Controlled input"
                placeholder="Type something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div
                style={{
                  padding: '16px',
                  background: 'var(--background-tertiary)',
                  borderRadius: '4px',
                }}
              >
                <p className="label-regular-s" style={{ margin: 0 }}>
                  Current value: <strong>{inputValue || '(empty)'}</strong>
                </p>
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
                  <td>
                    <code>label</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>'Label'</code>
                  </td>
                  <td>Input label text</td>
                </tr>
                <tr>
                  <td>
                    <code>legend</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>'Legend'</code>
                  </td>
                  <td>Helper text below input</td>
                </tr>
                <tr>
                  <td>
                    <code>placeholder</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>'Placeholder'</code>
                  </td>
                  <td>Placeholder text</td>
                </tr>
                <tr>
                  <td>
                    <code>size</code>
                  </td>
                  <td>
                    <code>'XS' | 'S' | 'M' | 'L'</code>
                  </td>
                  <td>
                    <code>'M'</code>
                  </td>
                  <td>Input size</td>
                </tr>
                <tr>
                  <td>
                    <code>state</code>
                  </td>
                  <td>
                    <code>'Default' | 'Error' | 'Valid'</code>
                  </td>
                  <td>
                    <code>'Default'</code>
                  </td>
                  <td>Validation state</td>
                </tr>
                <tr>
                  <td>
                    <code>showLabel</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>true</code>
                  </td>
                  <td>Show label</td>
                </tr>
                <tr>
                  <td>
                    <code>showLegend</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>Show legend</td>
                </tr>
                <tr>
                  <td>
                    <code>showOptional</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>Show "(Optional)" text</td>
                </tr>
                <tr>
                  <td>
                    <code>showInfo</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>Show info icon</td>
                </tr>
                <tr>
                  <td>
                    <code>infoText</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>''</code>
                  </td>
                  <td>Tooltip text for info icon</td>
                </tr>
                <tr>
                  <td>
                    <code>showLeftIcon</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>Show left icon</td>
                </tr>
                <tr>
                  <td>
                    <code>leftIcon</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>'search'</code>
                  </td>
                  <td>Left icon name</td>
                </tr>
                <tr>
                  <td>
                    <code>showRightIcon</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>Show right icon</td>
                </tr>
                <tr>
                  <td>
                    <code>rightIcon</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>'saving'</code>
                  </td>
                  <td>Right icon name</td>
                </tr>
                <tr>
                  <td>
                    <code>showRightIconButton</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>Show clickable icon button on the right</td>
                </tr>
                <tr>
                  <td>
                    <code>rightIconButton</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>'close'</code>
                  </td>
                  <td>Icon name for right icon button</td>
                </tr>
                <tr>
                  <td>
                    <code>onRightIconButtonClick</code>
                  </td>
                  <td>
                    <code>{'(e: MouseEvent) => void'}</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>Click handler for right icon button</td>
                </tr>
                <tr>
                  <td>
                    <code>disabled</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>Disable the input</td>
                </tr>
                <tr>
                  <td>
                    <code>readOnly</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>Make input read-only</td>
                </tr>
                <tr>
                  <td>
                    <code>value</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>Input value (controlled)</td>
                </tr>
                <tr>
                  <td>
                    <code>onChange</code>
                  </td>
                  <td>
                    <code>{'(e: ChangeEvent) => void'}</code>
                  </td>
                  <td>
                    <code>undefined</code>
                  </td>
                  <td>Change event handler</td>
                </tr>
                <tr>
                  <td>
                    <code>...props</code>
                  </td>
                  <td>
                    <code>InputHTMLAttributes</code>
                  </td>
                  <td>-</td>
                  <td>All native input attributes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modals */}
      <CodeModal
        isOpen={openModal === 'sizes'}
        onClose={() => setOpenModal(null)}
        title="Sizes Implementation"
        code={sizesCode}
      />
      <CodeModal
        isOpen={openModal === 'states'}
        onClose={() => setOpenModal(null)}
        title="States Implementation"
        code={statesCode}
      />
      <CodeModal
        isOpen={openModal === 'options'}
        onClose={() => setOpenModal(null)}
        title="Options Implementation"
        code={optionsCode}
      />
    </div>
  );
}
