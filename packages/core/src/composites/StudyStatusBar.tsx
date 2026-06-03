import { ReactNode } from 'react';
import { Icon } from '../components/Icon';
import { Spinner, type SpinnerVariant } from '../components/Spinner';
import './StudyStatusBar.css';

export type StudyStatusBarStatus = 'Ready' | 'NotReady' | 'Computing' | 'Modified' | 'Failed';

export interface StudyStatusBarProps {
  /**
   * Current status of the study. Always drives the colored left border.
   */
  status: StudyStatusBarStatus;
  /**
   * Title text displayed in the bar.
   * Optional: ignored when `children` is provided.
   */
  title?: string;
  /**
   * Description text displayed below the title.
   * Optional: ignored when `children` is provided.
   */
  description?: string;
  /**
   * Free-form content that replaces the default title/description block.
   * Use it to compose custom layouts (e.g. several inline status items,
   * each with its own icon and color) while keeping the bar chrome.
   */
  children?: ReactNode;
  /**
   * Whether to display the default status icon (or Spinner when Computing).
   * Set to `false` when the custom `children` carry their own icons.
   * @default true
   */
  showStatusIcon?: boolean;
  /**
   * Action elements displayed on the right side (Button, IconButton, etc.)
   */
  actions?: ReactNode;
  /**
   * Optional custom icon name to override the default status icon.
   * Has no effect when status is 'Computing' (always shows Spinner).
   */
  icon?: string;
  /**
   * Spinner variant used when status is 'Computing'
   * @default 'arc'
   */
  spinnerVariant?: SpinnerVariant;
  /**
   * Progress value (0–100). Only used when spinnerVariant is 'progress'.
   */
  spinnerValue?: number;
  /**
   * Additional CSS class
   */
  className?: string;
}

const statusIconMap: Record<Exclude<StudyStatusBarStatus, 'Computing'>, { name: string; color: string }> = {
  Ready: { name: 'check', color: 'var(--primary-default, #063b9e)' },
  NotReady: { name: 'error', color: 'var(--feedback-error-default, #e4002b)' },
  Modified: { name: 'warning', color: 'var(--feedback-warning-default, #ffc929)' },
  Failed: { name: 'broken_image', color: 'var(--feedback-error-default, #e4002b)' },
};

/**
 * StudyStatusBar Composite
 *
 * A horizontal status bar that indicates the current state of a study computation.
 * Displays a colored left border, status icon, title/description, and customizable actions.
 *
 * @example
 * ```tsx
 * <StudyStatusBar
 *   status="Ready"
 *   title="Inputs ready"
 *   description="You can compute the study."
 *   actions={<Button label="COMPUTE STUDY" size="M" onClick={() => computeStudy()} />}
 * />
 * ```
 *
 * @example Custom content with its own icons
 * ```tsx
 * <StudyStatusBar status="Ready" showStatusIcon={false} actions={<Button label="RECOMPUTE" />}>
 *   <div className="status-items">
 *     <span><Icon name="check" color="var(--primary-default)" /> 500/537 succeeded</span>
 *     <span><Icon name="close" color="var(--feedback-error-default)" /> 37 failed</span>
 *   </div>
 * </StudyStatusBar>
 * ```
 */
export function StudyStatusBar({
  status,
  title,
  description,
  children,
  showStatusIcon = true,
  actions,
  icon,
  spinnerVariant = 'arc',
  spinnerValue,
  className = '',
}: StudyStatusBarProps) {
  const containerClasses = [
    'study-status-bar',
    `study-status-bar--${status.toLowerCase()}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} role="status">
      {/* Status icon */}
      {showStatusIcon && (
        <div className="study-status-bar__icon">
          {status === 'Computing' ? (
            <Spinner variant={spinnerVariant} value={spinnerValue} size={24} color="var(--text-secondary, #63728a)" />
          ) : (
            <Icon name={icon || statusIconMap[status].name} size={24} color={statusIconMap[status].color} />
          )}
        </div>
      )}

      {/* Content */}
      {children ? (
        <div className="study-status-bar__content study-status-bar__content--custom">
          {children}
        </div>
      ) : (
        <div className="study-status-bar__content">
          {title && <span className="study-status-bar__title label-bold-s">{title}</span>}
          {description && <span className="study-status-bar__description label-regular-s">{description}</span>}
        </div>
      )}

      {/* Actions */}
      {actions && (
        <div className="study-status-bar__actions">
          {actions}
        </div>
      )}
    </div>
  );
}

export default StudyStatusBar;
