// @ts-ignore - React import needed for JSX in non-TypeScript projects
import React from 'react';
import { Icon } from './Icon';
import './Stepper.css';

export type StepperSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type StepperState = 'Default' | 'Hover' | 'Disabled';
export type StepperContent = 'Icon' | 'Number';

export interface StepperProps {
  /**
   * Text rendered under the dot (e.g. "Step 1")
   */
  label?: string;
  /**
   * Size variant
   * @default 'XL'
   */
  size?: StepperSize;
  /**
   * Visual state of the whole stepper
   * @default 'Default'
   */
  state?: StepperState;
  /**
   * What is rendered inside the dot
   * @default 'Icon'
   */
  content?: StepperContent;
  /**
   * Icon name (any DS icon) — used when content is 'Icon'
   * @default 'settings'
   */
  iconName?: string;
  /**
   * Value rendered inside the dot — used when content is 'Number'
   * @default 1
   */
  value?: string | number;
  /**
   * Whether this step is the current/done one (filled dot vs outlined dot)
   * @default true
   */
  current?: boolean;
  /**
   * Show the connector line on the left of the dot
   * @default true
   */
  showLeftDash?: boolean;
  /**
   * Show the connector line on the right of the dot
   * @default true
   */
  showRightDash?: boolean;
  /**
   * Show the label under the dot
   * @default true
   */
  showLabel?: boolean;
  /**
   * Render the label in bold (used to emphasize the current/active step).
   * When false, the label uses a regular weight.
   * @default true
   */
  labelStrong?: boolean;
  /**
   * Click handler. When provided, the stepper renders as a button and the
   * Hover background also reacts to mouse hover.
   */
  onClick?: () => void;
  /**
   * Additional CSS class
   */
  className?: string;
}

const iconSizeMap: Record<StepperSize, number> = {
  XS: 0,
  S: 16,
  M: 16,
  L: 24,
  XL: 32,
};

// Typography classes from the DS that match the Figma specs
const valueTypographyClass: Record<StepperSize, string> = {
  XS: '',
  S: 'label-bold-xs', // 12px
  M: 'label-bold-s',  // 14px
  L: 'label-bold-m',  // 16px
  XL: 'label-bold-l', // 18px
};

// Bold label, used for the current/active step
const labelTypographyClass: Record<StepperSize, string> = {
  XS: 'label-bold-s',
  S: 'label-bold-s',
  M: 'label-bold-s',
  L: 'label-bold-s',
  XL: 'label-bold-m',
};

// Regular label, used for non-current steps
const labelRegularTypographyClass: Record<StepperSize, string> = {
  XS: 'label-regular-s',
  S: 'label-regular-s',
  M: 'label-regular-s',
  L: 'label-regular-s',
  XL: 'label-regular-m',
};

/**
 * Stepper Component
 *
 * A single step indicator: connector line on each side, a dot containing an
 * icon or a number, and a label below. Combine several with `<StepperGroup>`
 * to build a multi-step flow.
 *
 * @example
 * ```tsx
 * <Stepper label="Step 1" size="L" iconName="settings" />
 * <Stepper label="Step 2" size="M" content="Number" value={2} current={false} />
 * <Stepper label="Step 3" size="M" state="Disabled" />
 * ```
 */
export function Stepper({
  label,
  size = 'XL',
  state = 'Default',
  content = 'Icon',
  iconName = 'settings',
  value = 1,
  current = true,
  showLeftDash = true,
  showRightDash = true,
  showLabel = true,
  labelStrong = true,
  onClick,
  className = '',
}: StepperProps) {
  const isInteractive = Boolean(onClick) && state !== 'Disabled';
  const showDotContent = size !== 'XS';

  const containerClasses = [
    'stepper',
    `stepper--${size.toLowerCase()}`,
    `stepper--${state.toLowerCase()}`,
    isInteractive ? 'stepper--interactive' : '',
    className,
  ].filter(Boolean).join(' ');

  const dotClasses = [
    'stepper__dot',
    `stepper__dot--${size.toLowerCase()}`,
    current ? 'stepper__dot--filled' : 'stepper__dot--outlined',
  ].filter(Boolean).join(' ');

  const iconColor = current
    ? 'var(--text-negative, #ffffff)'
    : 'var(--primary-active, #002d80)';

  const dashLeftClasses = [
    'stepper__dash',
    'stepper__dash--left',
    showLeftDash ? '' : 'stepper__dash--hidden',
  ].filter(Boolean).join(' ');

  const dashRightClasses = [
    'stepper__dash',
    'stepper__dash--right',
    showRightDash ? '' : 'stepper__dash--hidden',
  ].filter(Boolean).join(' ');

  const inner = (
    <>
      <div className="stepper__line">
        <span className={dashLeftClasses} />
        <div className={dotClasses}>
          {showDotContent && content === 'Icon' && iconName && (
            <Icon name={iconName} size={iconSizeMap[size]} color={iconColor} />
          )}
          {showDotContent && content === 'Number' && (
            <span className={`stepper__value ${valueTypographyClass[size]}`}>
              {value}
            </span>
          )}
        </div>
        <span className={dashRightClasses} />
      </div>
      {showLabel && label && (
        <span
          className={`stepper__label ${
            labelStrong ? labelTypographyClass[size] : labelRegularTypographyClass[size]
          }`}
        >
          {label}
        </span>
      )}
    </>
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        className={containerClasses}
        onClick={onClick}
        aria-current={current ? 'step' : undefined}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className={containerClasses} aria-current={current ? 'step' : undefined}>
      {inner}
    </div>
  );
}

export default Stepper;
