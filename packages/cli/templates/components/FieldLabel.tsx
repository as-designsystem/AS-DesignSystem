// @ts-ignore - React import needed for JSX in non-TypeScript projects
import React from 'react';
import { Icon, type IconName } from './Icon';
import { IconButton } from './IconButton';
import { SimpleTooltip } from './Tooltip';
import './FieldLabel.css';

/**
 * A single action rendered on the right side of a field label row
 * (Ghost icon button, optionally wrapped in a tooltip).
 */
export interface FieldAction {
  /**
   * Icon name to display in the action button
   */
  icon: IconName;
  /**
   * Tooltip text shown on hover (wraps the action in a SimpleTooltip)
   */
  tooltip?: string;
  /**
   * Callback when the action is clicked
   */
  onClick?: () => void;
  /**
   * Whether this action is disabled
   */
  disabled?: boolean;
  /**
   * Accessible label. Falls back to `tooltip`, then `icon`.
   */
  'aria-label'?: string;
}

/**
 * Class prefix used to preserve the exact, per-input label class names.
 * This is a contract: existing products rely on these class names.
 */
export type FieldLabelClassPrefix = 'text-input' | 'combobox' | 'select' | 'number-input';

export interface FieldLabelProps {
  /**
   * Class prefix used to emit the exact existing label class names
   * (e.g. `text-input-label-container`, `combobox-label`, ...). Required.
   */
  classPrefix: FieldLabelClassPrefix;
  /**
   * Label text
   */
  label?: string;
  /**
   * `htmlFor` target. Only emitted when provided (no auto-generated id),
   * to avoid changing existing click-to-focus behaviour.
   */
  htmlFor?: string;
  /**
   * Show the label
   * @default true
   */
  showLabel?: boolean;
  /**
   * Show "(Optional)" after the label
   * @default false
   */
  showOptional?: boolean;
  /**
   * Show the info icon with tooltip
   * @default false
   */
  showInfo?: boolean;
  /**
   * Tooltip text for the info icon
   */
  infoText?: string;
  /**
   * Ghost action icons aligned to the right edge of the field
   */
  actions?: FieldAction[];
  /**
   * Whether the parent field is disabled. Disables the actions.
   * Note: the label text itself is never greyed (preserves current rendering).
   */
  disabled?: boolean;
}

/**
 * Shared props mixin for inputs that render a FieldLabel.
 * Lets every field expose the same label + actions API without duplication.
 */
export interface WithFieldLabel {
  label?: string;
  showLabel?: boolean;
  showOptional?: boolean;
  showInfo?: boolean;
  infoText?: string;
  actions?: FieldAction[];
}

/**
 * FieldLabel Component
 *
 * Shared "label row" for all input components (TextInput, Combobox, Select,
 * NumberInput). Centralizes the label + "(Optional)" + info icon markup and
 * adds an optional right-aligned `actions` slot (Ghost XS icon buttons).
 *
 * Zero-regression: emits the exact same class names as the previous inline
 * markup (via `classPrefix`). When no `actions` are provided the DOM, classes
 * and spacing are identical to before.
 */
export function FieldLabel({
  classPrefix,
  label,
  htmlFor,
  showLabel = true,
  showOptional = false,
  showInfo = false,
  infoText = '',
  actions,
  disabled = false,
}: FieldLabelProps) {
  const showLeft = showLabel && !!label;
  const hasActions = !!actions && actions.length > 0;

  // Nothing to render: identical to the previous `showLabel && label` gate.
  if (!showLeft && !hasActions) return null;

  return (
    <div className={`${classPrefix}-label-container`}>
      {showLeft && (
        <>
          <label className={`${classPrefix}-label label-bold-s`} htmlFor={htmlFor}>
            {label}
            {showOptional && (
              <span className={`${classPrefix}-optional label-regular-s`}> (Optional)</span>
            )}
          </label>
          {showInfo && infoText ? (
            <SimpleTooltip label={infoText} delayDuration={0}>
              <span className={`${classPrefix}-info-icon`}>
                <Icon name="info" size={16} />
              </span>
            </SimpleTooltip>
          ) : showInfo ? (
            <span className={`${classPrefix}-info-icon`}>
              <Icon name="info" size={16} />
            </span>
          ) : null}
        </>
      )}

      {hasActions && (
        <div className={`${classPrefix}-label-actions`}>
          {actions!.map((action, index) => {
            const ariaLabel = action['aria-label'] ?? action.tooltip ?? action.icon;
            const button = (
              <IconButton
                icon={action.icon}
                size="XS"
                variant="Ghost"
                onClick={action.onClick}
                disabled={disabled || action.disabled}
                alt={ariaLabel}
              />
            );

            return action.tooltip ? (
              <SimpleTooltip key={index} label={action.tooltip} delayDuration={0}>
                {button}
              </SimpleTooltip>
            ) : (
              <React.Fragment key={index}>{button}</React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FieldLabel;
