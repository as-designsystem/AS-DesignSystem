import React from 'react';
import './Toggle.css';

export type ToggleSize = 'S' | 'M' | 'L';
export type ToggleState = 'Default' | 'Hover' | 'Disabled';

export interface ToggleProps {
  /**
   * Whether the toggle is selected (on)
   * @default false
   */
  selected?: boolean;
  /**
   * Callback when selected state changes
   */
  onChange?: (selected: boolean) => void;
  /**
   * Toggle size
   * @default 'M'
   */
  size?: ToggleSize;
  /**
   * Toggle state
   * @default 'Default'
   */
  state?: ToggleState;
  /**
   * Label text
   * @default 'Label'
   */
  label?: string;
  /**
   * Show label
   * @default true
   */
  showLabel?: boolean;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Name attribute for form submission
   */
  name?: string;
  /**
   * ID attribute
   */
  id?: string;
}

/**
 * Toggle Component
 *
 * A toggle switch for boolean selections.
 *
 * @example
 * ```tsx
 * <Toggle label="Enable notifications" selected={true} onChange={(v) => console.log(v)} />
 * <Toggle label="Dark mode" size="L" />
 * ```
 */
export function Toggle({
  selected = false,
  onChange,
  size = 'M',
  state = 'Default',
  label = 'Label',
  showLabel = true,
  disabled,
  className = '',
  name,
  id,
}: ToggleProps) {
  const isDisabled = state === 'Disabled' || disabled;

  const handleClick = () => {
    if (!isDisabled && onChange) {
      onChange(!selected);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onChange?.(!selected);
    }
  };

  const toggleClasses = [
    'toggle',
    `toggle--${size.toLowerCase()}`,
    `toggle--${state.toLowerCase()}`,
    selected ? 'toggle--selected' : '',
    isDisabled ? 'toggle--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={toggleClasses}>
      <button
        type="button"
        role="switch"
        aria-checked={selected}
        aria-label={!showLabel ? label : undefined}
        disabled={isDisabled}
        className="toggle__track"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        name={name}
        id={id}
      >
        <span className="toggle__thumb" />
      </button>
      {showLabel && (
        <span className="toggle__label">{label}</span>
      )}
    </label>
  );
}

export default Toggle;
