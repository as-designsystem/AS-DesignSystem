// @ts-ignore - React import needed for JSX in non-TypeScript projects
import React from 'react';
import {
  Stepper,
  type StepperSize,
  type StepperContent,
  type StepperState,
} from '../components/Stepper';
import './StepperGroup.css';

export interface StepperGroupStep {
  /**
   * Label rendered under the dot
   */
  label: string;
  /**
   * Icon name when the group renders content as 'Icon'.
   * Falls back to the group-level default ('settings').
   */
  iconName?: string;
  /**
   * Value rendered inside the dot when the group renders content as 'Number'.
   * Defaults to the 1-based step index.
   */
  value?: string | number;
}

export interface StepperGroupProps {
  /**
   * Ordered list of steps to display
   */
  steps: StepperGroupStep[];
  /**
   * Zero-based index of the current step. Steps before and at this index are
   * rendered with a filled dot ("done" / "current"); steps after with an
   * outlined dot ("upcoming").
   * @default 0
   */
  currentStep?: number;
  /**
   * Size applied to all steps
   * @default 'M'
   */
  size?: StepperSize;
  /**
   * Whether dots show icons or numbers
   * @default 'Icon'
   */
  content?: StepperContent;
  /**
   * Disables every step
   * @default false
   */
  disabled?: boolean;
  /**
   * Called with the step index when a step is clicked. Steps become
   * interactive (button + hover background) only when this is provided.
   */
  onStepClick?: (index: number) => void;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * StepperGroup Composite
 *
 * Renders a horizontal sequence of `<Stepper>` indicators. Each step before
 * and at `currentStep` is filled (done/current); steps after are outlined
 * (upcoming). The first step hides its left connector and the last step
 * hides its right connector so the line spans only between dots.
 *
 * @example
 * ```tsx
 * <StepperGroup
 *   size="M"
 *   currentStep={1}
 *   steps={[
 *     { label: 'Setup', iconName: 'settings' },
 *     { label: 'Build',  iconName: 'construction' },
 *     { label: 'Deploy', iconName: 'rocket_launch' },
 *   ]}
 * />
 *
 * <StepperGroup
 *   size="L"
 *   content="Number"
 *   currentStep={0}
 *   onStepClick={(i) => setStep(i)}
 *   steps={[
 *     { label: 'Account' },
 *     { label: 'Profile' },
 *     { label: 'Review' },
 *   ]}
 * />
 * ```
 */
export function StepperGroup({
  steps,
  currentStep = 0,
  size = 'M',
  content = 'Icon',
  disabled = false,
  onStepClick,
  className = '',
}: StepperGroupProps) {
  const containerClasses = ['stepper-group', className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} role="list" aria-label="Progress">
      {steps.map((step, index) => {
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;
        const isFilled = index <= currentStep;
        const value = step.value ?? index + 1;
        const state: StepperState = disabled ? 'Disabled' : 'Default';
        const handleClick = onStepClick && !disabled ? () => onStepClick(index) : undefined;

        return (
          <div key={index} role="listitem" className="stepper-group__item">
            <Stepper
              label={step.label}
              size={size}
              state={state}
              content={content}
              iconName={step.iconName}
              value={value}
              current={isFilled}
              showLeftDash={!isFirst}
              showRightDash={!isLast}
              onClick={handleClick}
            />
          </div>
        );
      })}
    </div>
  );
}

export default StepperGroup;
