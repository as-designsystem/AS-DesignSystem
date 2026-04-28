import type { ReactNode } from 'react';
import './PanelSectionTitle.css';

export type PanelSectionTitleSize = 'XS' | 'S' | 'M';

export interface PanelSectionTitleProps {
  /**
   * Section title text
   */
  label: string;
  /**
   * Size of the title
   * @default 'S'
   */
  size?: PanelSectionTitleSize;
  /**
   * Action elements (Button, IconButton, etc.) displayed on the right.
   * Buttons are automatically styled for dark mode.
   */
  actions?: ReactNode;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * PanelSectionTitle Component
 *
 * A section title label for dark corporate panels. Used to group
 * panel content into named sections (e.g., "Inputs", "Results").
 * Includes top spacing to visually separate from the previous section.
 * Supports optional action buttons on the right side.
 *
 * @example
 * ```tsx
 * <PanelSectionTitle label="Inputs" />
 * <PanelSectionTitle label="Results" size="M" />
 * <PanelSectionTitle label="Results" actions={<Button label="Download" leftIcon="download" size="XS" />} />
 * ```
 */
const labelClasses: Record<PanelSectionTitleSize, string> = {
  M: 'label-medium-s',
  S: 'label-medium-xs',
  XS: 'legend-medium-s',
};

export function PanelSectionTitle({
  label,
  size = 'S',
  actions,
  className = '',
}: PanelSectionTitleProps) {
  const classes = [
    'panel-section-title',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <span className={`panel-section-title__label ${labelClasses[size]}`}>{label}</span>
      {actions && <div className="panel-section-title__actions dark">{actions}</div>}
    </div>
  );
}

export default PanelSectionTitle;
