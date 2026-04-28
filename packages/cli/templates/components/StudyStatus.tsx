import { Icon } from './Icon';
import { Spinner } from './Spinner';
import './StudyStatus.css';

export type StudyStatusState = 'Computed' | 'Computing' | 'Failed' | 'Draft' | 'Warning';

export interface StudyStatusProps {
  /**
   * Status state
   */
  state: StudyStatusState;
  /**
   * Optional custom label (defaults to state name)
   */
  label?: string;
  /**
   * Optional custom icon name to override the default state icon.
   * Has no effect when state is 'Computing' (always shows Spinner).
   */
  icon?: string;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * StudyStatus Component
 *
 * Displays the computation status of a study with icon and label.
 * Used in study lists and study details.
 *
 * @example
 * ```tsx
 * <StudyStatus state="Computed" />
 * <StudyStatus state="Computing" />
 * <StudyStatus state="Failed" />
 * <StudyStatus state="Draft" />
 * <StudyStatus state="Warning" />
 * ```
 */
const stateIconMap: Record<Exclude<StudyStatusState, 'Computing'>, { name: string; color: string }> = {
  Computed: { name: 'check', color: 'var(--primary-default, #063b9e)' },
  Failed: { name: 'close', color: 'var(--feedback-error-default, #e4002b)' },
  Draft: { name: 'edit', color: 'var(--text-secondary, #63728a)' },
  Warning: { name: 'warning', color: 'var(--feedback-warning-default, #ffc929)' },
};

export function StudyStatus({
  state,
  label,
  icon,
  className = '',
}: StudyStatusProps) {
  const displayLabel = label || state;

  const classes = [
    'study-status',
    `study-status--${state.toLowerCase()}`,
    className,
  ].filter(Boolean).join(' ');

  const renderIcon = () => {
    if (state === 'Computing') {
      return <Spinner size={16} variant="arc" color="var(--text-tertiary, #8e99ab)" />;
    }
    const { name, color } = stateIconMap[state];
    return <Icon name={icon || name} size={16} color={color} />;
  };

  return (
    <div className={classes}>
      <span className="study-status__icon">
        {renderIcon()}
      </span>
      <span className="study-status__label legend-regular-m">{displayLabel}</span>
    </div>
  );
}

export default StudyStatus;
