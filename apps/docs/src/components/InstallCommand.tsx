import { useState } from 'react';
import { Icon } from '@as-designsystem/core';
import '@as-designsystem/core/Icon.css';
import './InstallCommand.css';

interface InstallCommandProps {
  componentName: string;
}

export default function InstallCommand({ componentName }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);
  const command = `asds add ${componentName}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="install-command">
      <code className="install-command__code">{command}</code>
      <button className="install-command__copy" onClick={handleCopy} aria-label="Copy command">
        {copied ? (
          <Icon name="check" size={16} />
        ) : (
          <Icon name="content_copy" size={16} />
        )}
      </button>
    </div>
  );
}
