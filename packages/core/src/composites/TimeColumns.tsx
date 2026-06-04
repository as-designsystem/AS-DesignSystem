// @ts-ignore - React import needed for JSX in non-TypeScript projects
import React, { useRef, useEffect } from 'react';
import './TimePicker.css';

export interface TimeColumnsProps {
  /**
   * Currently selected hour (0-23), or -1 when none is selected.
   */
  hours: number;
  /**
   * Currently selected minute (0-59), or -1 when none is selected.
   */
  minutes: number;
  /**
   * Minute increment step.
   * @default 1
   */
  step?: number;
  /**
   * Called when an hour is picked.
   */
  onHourSelect: (hours: number) => void;
  /**
   * Called when a minute is picked.
   */
  onMinuteSelect: (minutes: number) => void;
  /**
   * When this value changes to a truthy value, the selected hour/minute are
   * scrolled to the center of their columns. Pass the popover `open` state.
   */
  scrollSignal?: unknown;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * TimeColumns
 *
 * The reusable scrollable hour/minute columns extracted from `TimePicker`.
 * Used by both `TimePicker` (inside its popover) and `DateTimePicker`
 * (beside the `CalendarGrid`).
 */
export function TimeColumns({
  hours,
  minutes,
  step = 1,
  onHourSelect,
  onMinuteSelect,
  scrollSignal,
}: TimeColumnsProps) {
  const hourListRef = useRef<HTMLDivElement>(null);
  const minuteListRef = useRef<HTMLDivElement>(null);

  const hourValues = Array.from({ length: 24 }, (_, i) => i);
  const minuteValues = Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);

  // Scroll selected items into center when the signal changes (e.g. on open)
  useEffect(() => {
    if (!scrollSignal) return;
    setTimeout(() => {
      [hourListRef.current, minuteListRef.current].forEach((list) => {
        if (!list) return;
        const selected = list.querySelector('.time-picker-item--selected');
        if (selected) {
          selected.scrollIntoView({ block: 'center', behavior: 'instant' });
        }
      });
    }, 0);
  }, [scrollSignal]);

  return (
    <div className="time-picker-columns">
      {/* Hours column */}
      <div className="time-picker-column" ref={hourListRef}>
        {hourValues.map((h) => (
          <button
            key={h}
            type="button"
            tabIndex={-1}
            className={[
              'time-picker-item',
              h === hours && 'time-picker-item--selected',
            ].filter(Boolean).join(' ')}
            onClick={() => onHourSelect(h)}
          >
            {pad(h)}
          </button>
        ))}
      </div>

      {/* Minutes column */}
      <div className="time-picker-column" ref={minuteListRef}>
        {minuteValues.map((m) => (
          <button
            key={m}
            type="button"
            tabIndex={-1}
            className={[
              'time-picker-item',
              m === minutes && 'time-picker-item--selected',
            ].filter(Boolean).join(' ')}
            onClick={() => onMinuteSelect(m)}
          >
            {pad(m)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TimeColumns;
