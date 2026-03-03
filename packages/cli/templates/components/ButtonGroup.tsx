import React from 'react';
import './ButtonGroup.css';
import { Button, type ButtonSize } from './Button';
import { IconButton } from './IconButton';
import type { IconName } from './Icon';
import { SimpleTooltip } from './Tooltip';

export type ButtonGroupLayout = 'horizontal' | 'vertical';
export type ButtonGroupSize = 'S' | 'M' | 'L' | 'XL';
export type ButtonGroupVariant = 'Default' | 'Outlined';

// Map ButtonGroup size to internal Button size (one level smaller)
// Used only for Default variant to ensure ButtonGroup height matches Button height of the same size
const sizeToButtonSize: Record<ButtonGroupSize, ButtonSize> = {
  S: 'XS',
  M: 'S',
  L: 'M',
  XL: 'L',
};

export interface ButtonGroupOption {
  /**
   * Unique identifier for the option
   */
  value: string;
  /**
   * Display label for the button (optional if iconName is provided)
   */
  label?: string;
  /**
   * Icon name to display (optional, can be used alone or with label)
   */
  iconName?: IconName;
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
  /**
   * Tooltip label to display on hover
   */
  tooltip?: string;
}

export interface ButtonGroupProps {
  /**
   * Array of options to display
   */
  options: ButtonGroupOption[];
  /**
   * Currently selected value
   */
  value: string;
  /**
   * Callback when selection changes
   */
  onChange: (value: string) => void;
  /**
   * Layout direction: horizontal (default) or vertical
   */
  layout?: ButtonGroupLayout;
  /**
   * Size of the ButtonGroup (S, M, L, XL)
   * @default 'M'
   */
  size?: ButtonGroupSize;
  /**
   * Variant of the ButtonGroup
   * - Default: background container with ghost/default toggle buttons
   * - Outlined: no background, outlined buttons joined together
   * @default 'Default'
   */
  variant?: ButtonGroupVariant;
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Disable all buttons
   */
  disabled?: boolean;
}

/**
 * ButtonGroup Component
 *
 * A group of toggle buttons where one option can be selected at a time.
 * Uses Button and IconButton components internally.
 *
 * @example
 * ```tsx
 * const [selected, setSelected] = useState('option1');
 *
 * <ButtonGroup
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *     { value: 'option3', label: 'Option 3' },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 *   size="M"
 *   layout="horizontal"
 * />
 * ```
 */
export function ButtonGroup({
  options,
  value,
  onChange,
  layout = 'horizontal',
  size = 'M',
  variant = 'Default',
  className = '',
  disabled = false,
}: ButtonGroupProps) {
  const isOutlined = variant === 'Outlined';

  const containerClasses = [
    'button-group',
    `button-group--${layout}`,
    isOutlined ? 'button-group--outlined' : '',
    disabled ? 'button-group--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Default variant: buttons are one size smaller so the container matches the target size
  // Outlined variant: buttons match the size directly (no container padding)
  const buttonSize = isOutlined ? size as ButtonSize : sizeToButtonSize[size];

  return (
    <div className={containerClasses} role="group">
      {options.map((option, index) => {
        const isActive = option.value === value;
        const isDisabled = disabled || option.disabled;
        const hasIconOnly = option.iconName && !option.label;

        // For Outlined variant: active = Default (filled), inactive = Outlined
        // For Default variant: active = Default (filled), inactive = Ghost
        const buttonVariant = isActive
          ? 'Default'
          : isOutlined ? 'Outlined' : 'Ghost';

        // Position classes for Outlined variant (border-radius control)
        const positionClass = isOutlined
          ? index === 0
            ? 'button-group__item--first'
            : index === options.length - 1
              ? 'button-group__item--last'
              : 'button-group__item--middle'
          : '';

        let button: React.ReactNode;

        if (hasIconOnly) {
          button = (
            <IconButton
              key={option.value}
              icon={option.iconName as string}
              size={buttonSize}
              variant={buttonVariant}
              disabled={isDisabled}
              onClick={() => !isDisabled && onChange(option.value)}
              aria-pressed={isActive}
              className={['button-group__item button-group__item--icon-only', positionClass].filter(Boolean).join(' ')}
            />
          );
        } else {
          button = (
            <Button
              key={option.value}
              label={option.label}
              leftIcon={option.iconName}
              size={buttonSize}
              variant={buttonVariant}
              disabled={isDisabled}
              onClick={() => !isDisabled && onChange(option.value)}
              aria-pressed={isActive}
              className={['button-group__item', positionClass].filter(Boolean).join(' ')}
            />
          );
        }

        if (option.tooltip) {
          return (
            <SimpleTooltip key={option.value} label={option.tooltip}>
              {button}
            </SimpleTooltip>
          );
        }

        return button;
      })}
    </div>
  );
}

export default ButtonGroup;
