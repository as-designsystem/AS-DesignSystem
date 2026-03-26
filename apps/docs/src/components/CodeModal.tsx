import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Modal, Button } from '@as-designsystem/core';
import '@as-designsystem/core/Modal.css';
import '@as-designsystem/core/Button.css';
import './CodeModal.css';

export interface CodeSection {
  title: string;
  code: string;
  language: 'tsx' | 'css' | 'typescript' | 'javascript';
}

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code?: string; // Single code string (backward compatible)
  sections?: CodeSection[]; // Multiple code sections
}

export default function CodeModal({ isOpen, onClose, title, code, sections }: CodeModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  // Reset active tab and copied state when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(0);
      setCopied(false);
    }
  }, [isOpen]);

  // Reset copied state when changing tabs
  useEffect(() => {
    setCopied(false);
  }, [activeTab]);

  // Handle backward compatibility - single code string
  const codeSections: CodeSection[] = sections || [
    { title: 'Code', code: code || '', language: 'tsx' }
  ];

  const activeSection = codeSections[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSection.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="code-modal"
      footer={
        <Button
          label={copied ? 'Copied!' : `Copy ${codeSections.length > 1 ? activeSection.title : 'code'}`}
          size="S"
          onClick={handleCopy}
        />
      }
    >
      {codeSections.length > 1 && (
        <div className="code-modal-tabs">
          {codeSections.map((section, index) => (
            <button
              key={index}
              className={`code-modal-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {section.title}
            </button>
          ))}
        </div>
      )}

      <div className="code-modal-content">
        <SyntaxHighlighter
          language={activeSection.language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '6px',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
        >
          {activeSection.code}
        </SyntaxHighlighter>
      </div>
    </Modal>
  );
}
