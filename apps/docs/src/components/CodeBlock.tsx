import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeBlock.css';

export interface CodeBlockProps {
  code: string;
  language?: 'typescript' | 'tsx' | 'javascript' | 'jsx' | 'css' | 'bash' | 'json';
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
  return (
    <div className="code-block code-block--highlighted">
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          margin: 0,
          padding: '20px',
          background: 'transparent',
          fontSize: '13px',
          lineHeight: '1.6',
        }}
        codeTagProps={{
          style: {
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Roboto Mono', monospace",
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
