// @ts-ignore - React import needed for JSX in non-TypeScript projects
import React, { useState, useRef } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { TextInput, type TextInputState } from '../components/TextInput';
import { Button } from '../components/Button';
import type { WithFieldLabel } from '../components/FieldLabel';
import { CalendarGrid, type CalendarGridView } from './CalendarGrid';
import { TimeColumns } from './TimeColumns';
import './DateTimePicker.css';

export type DateTimePickerSize = 'XS' | 'S' | 'M' | 'L';
export type DateTimePickerState = 'Default' | 'Error' | 'Valid' | 'Disabled' | 'Read-only';

export interface DateTimePickerProps extends WithFieldLabel {
  /**
   * Selected date and time.
   */
  value?: Date;
  /**
   * Called with the chosen date+time when the selection is committed (OK or
   * click outside). Not called on Cancel / Esc.
   */
  onChange?: (value: Date) => void;
  /**
   * Helper text displayed below the input.
   */
  legend?: string;
  /**
   * Show the legend.
   * @default false
   */
  showLegend?: boolean;
  /**
   * Size of the field.
   * @default 'M'
   */
  size?: DateTimePickerSize;
  /**
   * Validation / interaction state.
   * @default 'Default'
   */
  state?: DateTimePickerState;
  /**
   * Minute increment for the time columns.
   * @default 1
   */
  minuteStep?: number;
  /**
   * Minimum selectable date.
   */
  minDate?: Date;
  /**
   * Maximum selectable date.
   */
  maxDate?: Date;
  /**
   * Placeholder shown when no value is selected.
   * @default 'dd/mm/yyyy, --:--'
   */
  placeholder?: string;
  /**
   * Position of the label relative to the input.
   * @default 'top'
   */
  labelPosition?: 'top' | 'left';
  /**
   * Called when the popover opens or closes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Custom portal container for the popover.
   */
  popupContainer?: HTMLElement | null;
  /**
   * Additional CSS class on the container.
   */
  className?: string;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatFieldValue(d: Date): string {
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatHeaderDate(d: Date): string {
  return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES_SHORT[d.getMonth()]} ${d.getDate()}`;
}

/**
 * DateTimePicker Composite
 *
 * Unified date + time picker: a single read-only field opens one popover that
 * combines the reusable `CalendarGrid` (left) and `TimeColumns` (right) under a
 * shared header, with a draft model committed via OK / cancelled via Cancel.
 *
 * Picking a day or a time updates the draft but keeps the popover open — both a
 * date AND a time can be chosen before committing. Nothing is committed on the
 * first click.
 *
 * @example
 * ```tsx
 * const [when, setWhen] = useState<Date>();
 *
 * <DateTimePicker
 *   label="Departure"
 *   value={when}
 *   onChange={setWhen}
 *   minuteStep={5}
 * />
 * ```
 */
export function DateTimePicker({
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
  value,
  onChange,
  minuteStep = 1,
  minDate,
  maxDate,
  placeholder = 'dd/mm/yyyy, --:--',
  labelPosition = 'top',
  onOpenChange,
  popupContainer,
  className = '',
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<Date | null>(value ?? null);
  // Which calendar sub-view is showing; the time columns are hidden unless 'days'.
  const [gridView, setGridView] = useState<CalendarGridView>('days');
  // Set just before a close that must NOT commit (Cancel button / Esc).
  const cancelNextCloseRef = useRef(false);

  const isDisabled = state === 'Disabled';
  const isReadOnly = state === 'Read-only';
  const canOpen = !isDisabled && !isReadOnly;
  const textInputState: TextInputState =
    state === 'Error' || state === 'Valid' ? state : 'Default';

  // Single source of truth for opening/closing. Closing commits the draft
  // (OK / click outside) unless a cancel was flagged (Cancel button / Esc).
  const applyOpen = (open: boolean) => {
    if (open) {
      cancelNextCloseRef.current = false;
      setDraft(value ?? null);
      setIsOpen(true);
      onOpenChange?.(true);
      return;
    }
    if (!cancelNextCloseRef.current && draft) onChange?.(draft);
    cancelNextCloseRef.current = false;
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const openPicker = () => applyOpen(true);
  const closeCommit = () => applyOpen(false);
  const closeCancel = () => {
    cancelNextCloseRef.current = true;
    applyOpen(false);
  };

  // Draft helpers — picking a day keeps the time, picking a time keeps the day.
  const draftHours = draft ? draft.getHours() : -1;
  const draftMinutes = draft ? draft.getMinutes() : -1;

  const handleDaySelect = (date: Date) => {
    const baseH = draft ? draft.getHours() : value ? value.getHours() : 0;
    const baseM = draft ? draft.getMinutes() : value ? value.getMinutes() : 0;
    setDraft(new Date(date.getFullYear(), date.getMonth(), date.getDate(), baseH, baseM, 0, 0));
  };

  const withTime = (h: number, m: number): Date => {
    const base = draft ?? value ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, 0, 0);
  };

  const handleHourSelect = (h: number) => {
    setDraft(withTime(h, draftMinutes >= 0 ? draftMinutes : 0));
  };

  const handleMinuteSelect = (m: number) => {
    setDraft(withTime(draftHours >= 0 ? draftHours : 0, m));
  };

  const headerDate = draft ?? value ?? new Date();
  const fieldValue = value ? formatFieldValue(value) : '';

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (canOpen) applyOpen(open);
      }}
    >
      <div className={`date-time-picker-container ${className}`}>
        <Popover.Anchor asChild>
          <div
            className="date-time-picker-trigger-wrapper"
            onClick={() => {
              if (canOpen && !isOpen) openPicker();
            }}
            style={canOpen ? { cursor: 'pointer' } : undefined}
          >
            <TextInput
              label={label}
              legend={legend}
              size={size}
              state={textInputState}
              showLabel={showLabel}
              showLegend={showLegend}
              showOptional={showOptional}
              showInfo={showInfo}
              infoText={infoText}
              actions={actions}
              labelPosition={labelPosition}
              placeholder={placeholder}
              value={fieldValue}
              readOnly
              disabled={isDisabled}
              onChange={() => {}}
              showRightIconButton
              rightIconButton="event"
              onRightIconButtonClick={(e) => {
                e.preventDefault();
                if (!canOpen) return;
                if (isOpen) closeCommit();
                else openPicker();
              }}
            />
          </div>
        </Popover.Anchor>

        <Popover.Portal container={popupContainer ?? undefined}>
          <Popover.Content
            className="date-time-picker-popover"
            side="bottom"
            sideOffset={4}
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onEscapeKeyDown={() => {
              // Flag cancel, then let Radix close → Root onOpenChange(false).
              cancelNextCloseRef.current = true;
            }}
          >
            {/* Header: year (light) + long selected-date title */}
            <div className="date-time-picker-header">
              <span className="date-time-picker-header-year legend-regular-m">
                {headerDate.getFullYear()}
              </span>
              <span className="date-time-picker-header-date heading-5">
                {formatHeaderDate(headerDate)}
              </span>
            </div>

            <div className="date-time-picker-body">
              {/* Left: month grid */}
              <div className="date-time-picker-calendar">
                <CalendarGrid
                  value={draft ?? value}
                  onSelect={handleDaySelect}
                  mode="date"
                  minDate={minDate}
                  maxDate={maxDate}
                  showHeader={false}
                  onViewChange={setGridView}
                />
              </div>

              {/* Right: scrollable hour / minute columns (hidden in month/year view) */}
              <div
                className={`date-time-picker-time${gridView !== 'days' ? ' date-time-picker-time--hidden' : ''}`}
              >
                <div className="date-time-picker-time-headers">
                  <span className="date-time-picker-time-header legend-regular-m">HH</span>
                  <span className="date-time-picker-time-header legend-regular-m">MM</span>
                </div>
                <TimeColumns
                  hours={draftHours}
                  minutes={draftMinutes}
                  step={minuteStep}
                  onHourSelect={handleHourSelect}
                  onMinuteSelect={handleMinuteSelect}
                  scrollSignal={isOpen}
                />
              </div>
            </div>

            {/* Footer: Cancel / OK */}
            <div className="date-time-picker-footer">
              <Button label="Cancel" size="S" variant="Ghost" onClick={closeCancel} />
              <Button label="OK" size="S" variant="Default" onClick={closeCommit} />
            </div>
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
}

export default DateTimePicker;
