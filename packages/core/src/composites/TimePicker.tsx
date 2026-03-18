// @ts-ignore - React import needed for JSX in non-TypeScript projects
import React, { useState, useRef, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { TextInput, type TextInputSize, type TextInputState } from '../components/TextInput';
import './TimePicker.css';

export interface TimePickerProps {
  /**
   * Label of the input
   */
  label?: string;
  /**
   * Helper text displayed below the input
   */
  legend?: string;
  /**
   * Size of the input
   * @default 'M'
   */
  size?: TextInputSize;
  /**
   * Validation state
   * @default 'Default'
   */
  state?: TextInputState;
  /**
   * Show the label
   * @default true
   */
  showLabel?: boolean;
  /**
   * Show the legend
   * @default false
   */
  showLegend?: boolean;
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
   * Placeholder text
   * @default '--:--'
   */
  placeholder?: string;
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the input is read-only
   * @default false
   */
  readOnly?: boolean;
  /**
   * Selected time value in "HH:MM" format (24h)
   */
  value?: string;
  /**
   * Callback when the value changes
   */
  onChange?: (value: string) => void;
  /**
   * Minute increment step
   * @default 1
   */
  step?: number;
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Additional CSS class
   */
  className?: string;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function parseTime(text: string): { hours: number; minutes: number } | null {
  const match = text.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return { hours: h, minutes: m };
}

/**
 * TimePicker Component
 *
 * Time picker with TextInput trigger and scrollable hour/minute columns dropdown.
 *
 * @example
 * ```tsx
 * <TimePicker
 *   label="Start time"
 *   value={time}
 *   onChange={setTime}
 * />
 *
 * // With 15-minute steps
 * <TimePicker
 *   label="Duration"
 *   value={time}
 *   onChange={setTime}
 *   step={15}
 * />
 * ```
 */
export function TimePicker({
  label = 'Label',
  legend = 'Legend',
  size = 'M',
  state = 'Default',
  showLabel = true,
  showLegend = false,
  showOptional = false,
  showInfo = false,
  infoText = '',
  placeholder = '--:--',
  disabled = false,
  readOnly = false,
  value,
  onChange,
  step = 1,
  open: controlledOpen,
  onOpenChange,
  className = '',
}: TimePickerProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const [inputText, setInputText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const hourListRef = useRef<HTMLDivElement>(null);
  const minuteListRef = useRef<HTMLDivElement>(null);

  const parsedValue = value ? parseTime(value) : null;
  const currentHours = parsedValue?.hours ?? -1;
  const currentMinutes = parsedValue?.minutes ?? -1;

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  // Scroll selected items into center when popover opens
  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => {
      if (hourListRef.current) {
        const selected = hourListRef.current.querySelector('.time-picker-item--selected');
        if (selected) {
          selected.scrollIntoView({ block: 'center', behavior: 'instant' });
        }
      }
      if (minuteListRef.current) {
        const selected = minuteListRef.current.querySelector('.time-picker-item--selected');
        if (selected) {
          selected.scrollIntoView({ block: 'center', behavior: 'instant' });
        }
      }
    }, 0);
  }, [isOpen]);

  const handleHourSelect = (h: number) => {
    const m = currentMinutes >= 0 ? currentMinutes : 0;
    onChange?.(`${pad(h)}:${pad(m)}`);
  };

  const handleMinuteSelect = (m: number) => {
    const h = currentHours >= 0 ? currentHours : 0;
    onChange?.(`${pad(h)}:${pad(m)}`);
  };

  const formattedValue = parsedValue
    ? `${pad(parsedValue.hours)}:${pad(parsedValue.minutes)}`
    : '';

  const displayValue = isEditing ? inputText : formattedValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    setIsEditing(true);
    setInputText(e.target.value);
  };

  const commitInput = () => {
    if (!isEditing) return;
    setIsEditing(false);
    if (inputText === '') {
      onChange?.('');
      return;
    }
    const parsed = parseTime(inputText);
    if (parsed) {
      onChange?.(`${pad(parsed.hours)}:${pad(parsed.minutes)}`);
    } else {
      setInputText('');
    }
  };

  const handleInputBlur = () => {
    commitInput();
  };

  const handleInputFocus = () => {
    if (!disabled && !readOnly) {
      handleOpenChange(true);
    }
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
      <div className={`time-picker-container ${className}`}>
        <Popover.Anchor asChild>
          <div
            className="time-picker-trigger-wrapper"
            onClick={() => {
              if (!disabled) handleOpenChange(true);
            }}
          >
            <TextInput
              label={label}
              legend={legend}
              size={size}
              state={state}
              showLabel={showLabel}
              showLegend={showLegend}
              showOptional={showOptional}
              showInfo={showInfo}
              infoText={infoText}
              placeholder={placeholder}
              value={displayValue}
              disabled={disabled}
              readOnly={readOnly}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              showRightIcon
              rightIcon="schedule"
            />
          </div>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            className="time-picker-popover"
            side="bottom"
            sideOffset={4}
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="time-picker-columns">
              {/* Hours column */}
              <div className="time-picker-column" ref={hourListRef}>
                {hours.map((h) => (
                  <button
                    key={h}
                    type="button"
                    tabIndex={-1}
                    className={[
                      'time-picker-item',
                      h === currentHours && 'time-picker-item--selected',
                    ].filter(Boolean).join(' ')}
                    onClick={() => handleHourSelect(h)}
                  >
                    {pad(h)}
                  </button>
                ))}
              </div>

              {/* Minutes column */}
              <div className="time-picker-column" ref={minuteListRef}>
                {minutes.map((m) => (
                  <button
                    key={m}
                    type="button"
                    tabIndex={-1}
                    className={[
                      'time-picker-item',
                      m === currentMinutes && 'time-picker-item--selected',
                    ].filter(Boolean).join(' ')}
                    onClick={() => handleMinuteSelect(m)}
                  >
                    {pad(m)}
                  </button>
                ))}
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
}

export default TimePicker;
