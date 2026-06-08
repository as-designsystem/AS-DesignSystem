// @ts-ignore - React import needed for JSX in non-TypeScript projects
import React, { useId } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import './Slider.css';

export type SliderSize = 'S' | 'M';

export interface SliderProps {
  /**
   * Controlled value
   */
  value?: number;
  /**
   * Initial value when uncontrolled
   * @default 0
   */
  defaultValue?: number;
  /**
   * Callback fired as the value changes (while dragging)
   */
  onValueChange?: (value: number) => void;
  /**
   * Callback fired when the user finishes setting a value (on release)
   */
  onValueCommit?: (value: number) => void;
  /**
   * Minimum value
   * @default 0
   */
  min?: number;
  /**
   * Maximum value
   * @default 100
   */
  max?: number;
  /**
   * Step increment
   * @default 1
   */
  step?: number;
  /**
   * Slider size
   * @default 'M'
   */
  size?: SliderSize;
  /**
   * Label text shown above the slider
   */
  label?: string;
  /**
   * Show the label above the slider
   * @default false
   */
  showLabel?: boolean;
  /**
   * Show step marks along the track. Pass `true` to derive marks from
   * `min`/`max`/`step`, or a number to render that many evenly spaced marks.
   * @default false
   */
  steps?: boolean | number;
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
   * Id of the slider (defaults to an auto-generated id)
   */
  id?: string;
}

/**
 * Slider Component (based on Radix UI Slider)
 *
 * Accessible single-value range slider with two sizes, an optional label and
 * optional step marks. Fully keyboard navigable.
 *
 * @example
 * ```tsx
 * <Slider label="Volume" showLabel value={value} onValueChange={setValue} />
 * <Slider size="S" min={0} max={100} step={25} steps />
 * ```
 */
export function Slider({
  value,
  defaultValue = 0,
  onValueChange,
  onValueCommit,
  min = 0,
  max = 100,
  step = 1,
  size = 'M',
  label,
  showLabel = false,
  steps = false,
  disabled = false,
  className = '',
  name,
  id,
}: SliderProps) {
  const uniqueId = useId();
  const sliderId = id ?? `slider-${uniqueId}`;

  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as number) : defaultValue;
  const fraction = max > min ? (currentValue - min) / (max - min) : 0;

  // Resolve the number of step marks to render.
  let markCount = 0;
  if (typeof steps === 'number') {
    markCount = Math.max(0, Math.floor(steps));
  } else if (steps === true && step > 0) {
    markCount = Math.floor((max - min) / step) + 1;
  }

  const marks =
    markCount > 1
      ? Array.from({ length: markCount }, (_, i) => i / (markCount - 1))
      : [];

  const rootClasses = [
    'slider',
    `slider--${size.toLowerCase()}`,
    disabled ? 'slider--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses}>
      {showLabel && label && (
        <label htmlFor={sliderId} className="slider__label label-bold-s">
          {label}
        </label>
      )}
      <RadixSlider.Root
        id={sliderId}
        className="slider__root"
        value={isControlled ? [value as number] : undefined}
        defaultValue={isControlled ? undefined : [defaultValue]}
        onValueChange={onValueChange ? (vals) => onValueChange(vals[0]) : undefined}
        onValueCommit={onValueCommit ? (vals) => onValueCommit(vals[0]) : undefined}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        name={name}
      >
        <RadixSlider.Track className="slider__track">
          <RadixSlider.Range className="slider__range" />
          {marks.length > 0 && (
            <div className="slider__marks" aria-hidden="true">
              {marks.map((markFraction, index) => (
                <span
                  key={index}
                  className={[
                    'slider__mark',
                    markFraction <= fraction
                      ? 'slider__mark--filled'
                      : 'slider__mark--empty',
                  ].join(' ')}
                />
              ))}
            </div>
          )}
        </RadixSlider.Track>
        <RadixSlider.Thumb className="slider__thumb" aria-label={label || 'Slider'} />
      </RadixSlider.Root>
    </div>
  );
}

export default Slider;
