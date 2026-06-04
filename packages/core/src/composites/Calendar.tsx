// @ts-ignore - React import needed for JSX in non-TypeScript projects
import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { TextInput, type TextInputSize, type TextInputState } from '../components/TextInput';
import type { FieldAction } from '../components/FieldLabel';
import { CalendarGrid } from './CalendarGrid';
import './Calendar.css';

export type CalendarMode = 'date' | 'month';

export interface CalendarProps {
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
   * Ghost action icons aligned to the right edge of the label row
   */
  actions?: FieldAction[];
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the input is read-only (no typing, no calendar opening)
   * @default false
   */
  readOnly?: boolean;
  /**
   * Pick-only mode: input is read-only but the calendar icon still opens the picker
   * @default false
   */
  pickOnly?: boolean;
  /**
   * Picker mode: 'date' for day selection, 'month' for month+year selection
   * @default 'date'
   */
  mode?: CalendarMode;
  /**
   * Selected date value
   */
  value?: Date;
  /**
   * Callback when the value changes
   */
  onChange?: (date: Date) => void;
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  /**
   * Default date to display when the calendar opens with no value selected.
   * Defaults to today.
   */
  defaultDate?: Date;
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Position of the label relative to the input
   * @default 'top'
   */
  labelPosition?: 'top' | 'left';
  /**
   * Additional CSS class
   */
  className?: string;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatMonth(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${year}`;
}

function parseDate(text: string): Date | null {
  const match = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  if (month < 1 || month > 12 || day < 1 || day > getDaysInMonth(year, month - 1)) return null;
  return new Date(year, month - 1, day);
}

function parseMonth(text: string): Date | null {
  const match = text.match(/^(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10);
  if (month < 1 || month > 12) return null;
  return new Date(year, month - 1, 1);
}

/**
 * Calendar Component
 *
 * Date and month picker with TextInput trigger and calendar dropdown.
 * The month grid itself lives in the reusable `CalendarGrid` sub-component.
 *
 * @example
 * ```tsx
 * // Date picker
 * <Calendar
 *   label="Start date"
 *   mode="date"
 *   value={date}
 *   onChange={setDate}
 * />
 *
 * // Month picker
 * <Calendar
 *   label="Period"
 *   mode="month"
 *   value={month}
 *   onChange={setMonth}
 * />
 * ```
 */
export function Calendar({
  label = 'Label',
  legend = 'Legend',
  size = 'M',
  state = 'Default',
  showLabel = true,
  showLegend = false,
  showOptional = false,
  showInfo = false,
  infoText = '',
  actions,
  placeholder,
  disabled = false,
  readOnly = false,
  pickOnly = false,
  mode = 'date',
  value,
  onChange,
  minDate,
  maxDate,
  defaultDate,
  open: controlledOpen,
  onOpenChange,
  labelPosition = 'top',
  className = '',
}: CalendarProps) {
  // Popover state
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  // Manual input state
  const [inputText, setInputText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Selection handler (from the grid)
  const handleSelect = (selected: Date) => {
    onChange?.(selected);
    handleOpenChange(false);
  };

  // Display value
  const formattedValue = value
    ? (mode === 'date' ? formatDate(value) : formatMonth(value))
    : '';

  const displayValue = isEditing ? inputText : formattedValue;

  const defaultPlaceholder = placeholder || (mode === 'date' ? 'dd/mm/yyyy' : 'mm/yyyy');

  // Manual input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly || pickOnly) return;
    const raw = e.target.value;
    setIsEditing(true);
    setInputText(raw);
  };

  const commitInput = () => {
    if (!isEditing) return;
    setIsEditing(false);
    if (inputText === '') return;
    const parsed = mode === 'date' ? parseDate(inputText) : parseMonth(inputText);
    if (parsed) {
      if (minDate && parsed < minDate) { setInputText(''); return; }
      if (maxDate && parsed > maxDate) { setInputText(''); return; }
      onChange?.(parsed);
    } else {
      setInputText('');
    }
  };

  const handleInputBlur = () => {
    commitInput();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitInput();
    }
  };

  const isInputReadOnly = readOnly || pickOnly;
  const canOpenPicker = !disabled && !readOnly;

  return (
    <Popover.Root open={isOpen} onOpenChange={(open) => { if (canOpenPicker) handleOpenChange(open); }}>
      <div className={`calendar-container${readOnly ? ' calendar-container--readonly' : ''} ${className}`}>
        <Popover.Anchor asChild>
          <div
            className="calendar-trigger-wrapper"
            onClick={() => {
              if (pickOnly && canOpenPicker) {
                handleOpenChange(!isOpen);
              }
            }}
            style={pickOnly && canOpenPicker ? { cursor: 'pointer' } : undefined}
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
              actions={actions}
              labelPosition={labelPosition}
              placeholder={defaultPlaceholder}
              value={displayValue}
              readOnly={isInputReadOnly}
              disabled={disabled}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              showRightIconButton
              rightIconButton="event"
              onRightIconButtonClick={(e) => {
                e.preventDefault();
                if (canOpenPicker) {
                  handleOpenChange(!isOpen);
                }
              }}
            />
          </div>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            className="calendar-popover"
            side="bottom"
            sideOffset={4}
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <CalendarGrid
              value={value}
              onSelect={handleSelect}
              mode={mode}
              minDate={minDate}
              maxDate={maxDate}
              defaultDate={defaultDate}
            />
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
}

export default Calendar;
