// @ts-ignore - React import needed for JSX in non-TypeScript projects
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IconButton } from '../components/IconButton';
import './Calendar.css';

export type CalendarGridMode = 'date' | 'month';

export type CalendarGridView = 'days' | 'months' | 'years';

export interface CalendarGridProps {
  /**
   * Currently selected value (used to highlight the day/month).
   */
  value?: Date;
  /**
   * Called when a day (date mode) or a month (month mode) is selected.
   * The returned Date is the fully resolved selection.
   */
  onSelect: (date: Date) => void;
  /**
   * Picker mode: 'date' for day selection, 'month' for month+year selection.
   * @default 'date'
   */
  mode?: CalendarGridMode;
  /**
   * Minimum selectable date.
   */
  minDate?: Date;
  /**
   * Maximum selectable date.
   */
  maxDate?: Date;
  /**
   * Default date to display when no value is selected. Defaults to today.
   */
  defaultDate?: Date;
  /**
   * Render the top header (year + long selected-date title).
   * @default true
   */
  showHeader?: boolean;
  /**
   * Called whenever the internal view changes (days / months / years).
   * Lets a parent (e.g. DateTimePicker) react — for instance hiding its time
   * columns while the month or year picker is shown.
   */
  onViewChange?: (view: CalendarGridView) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const YEAR_MIN = 1990;
const YEAR_MAX = 2040;

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatHeaderDate(date: Date): string {
  const dayName = DAY_NAMES[date.getDay()];
  const monthName = MONTH_NAMES_SHORT[date.getMonth()];
  return `${dayName}, ${monthName} ${date.getDate()}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

/**
 * CalendarGrid
 *
 * The reusable month grid extracted from `Calendar`: month/year navigation,
 * day grid, month grid and year list, plus an optional header. Owns its own
 * navigation state (resets whenever it is remounted, e.g. when a popover opens).
 *
 * Used by both `Calendar` (wrapped with a TextInput trigger + popover) and
 * `DateTimePicker` (placed beside `TimeColumns` in a single popover).
 */
export function CalendarGrid({
  value,
  onSelect,
  mode = 'date',
  minDate,
  maxDate,
  defaultDate,
  showHeader = true,
  onViewChange,
}: CalendarGridProps) {
  const today = new Date();
  const initialDate = value || defaultDate || today;

  const [displayMonth, setDisplayMonth] = useState(initialDate.getMonth());
  const [displayYear, setDisplayYear] = useState(initialDate.getFullYear());
  const [currentView, setCurrentView] = useState<CalendarGridView>(mode === 'month' ? 'months' : 'days');
  const [previousView, setPreviousView] = useState<CalendarGridView>(mode === 'month' ? 'months' : 'days');

  const yearListRef = useRef<HTMLDivElement>(null);

  // Notify the parent whenever the view changes (incl. the initial value).
  useEffect(() => {
    onViewChange?.(currentView);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentView]);

  // Auto-scroll year list to selected year
  useEffect(() => {
    if (currentView === 'years' && yearListRef.current) {
      const selectedYearEl = yearListRef.current.querySelector('.calendar-year--selected');
      if (selectedYearEl) {
        selectedYearEl.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    }
  }, [currentView]);

  // Navigation handlers
  const handlePrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const handlePrevYear = () => setDisplayYear(displayYear - 1);
  const handleNextYear = () => setDisplayYear(displayYear + 1);

  // Selection handlers
  const handleDaySelect = (day: number) => {
    onSelect(new Date(displayYear, displayMonth, day));
  };

  const handleMonthSelect = (monthIndex: number) => {
    if (mode === 'month') {
      onSelect(new Date(displayYear, monthIndex, 1));
    } else {
      setDisplayMonth(monthIndex);
      setCurrentView('days');
    }
  };

  const handleYearSelect = (year: number) => {
    setDisplayYear(year);
    setCurrentView(previousView);
  };

  const handleYearClick = () => {
    setPreviousView(currentView);
    setCurrentView('years');
  };

  // Date validation
  const isDayDisabled = useCallback((day: number): boolean => {
    const date = new Date(displayYear, displayMonth, day);
    if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  }, [displayYear, displayMonth, minDate, maxDate]);

  const isMonthDisabled = useCallback((monthIndex: number): boolean => {
    if (minDate && (displayYear < minDate.getFullYear() || (displayYear === minDate.getFullYear() && monthIndex < minDate.getMonth()))) return true;
    if (maxDate && (displayYear > maxDate.getFullYear() || (displayYear === maxDate.getFullYear() && monthIndex > maxDate.getMonth()))) return true;
    return false;
  }, [displayYear, minDate, maxDate]);

  // Build day grid
  const renderDaysGrid = () => {
    const daysInMonth = getDaysInMonth(displayYear, displayMonth);
    const firstDay = getFirstDayOfMonth(displayYear, displayMonth);
    const rows: React.ReactNode[] = [];
    let cells: React.ReactNode[] = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div key={`empty-${i}`} className="calendar-day calendar-day--empty" />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(displayYear, displayMonth, day);
      const isSelected = value && isSameDay(date, value);
      const isDisabled = isDayDisabled(day);

      const dayClasses = [
        'calendar-day',
        isSelected && 'calendar-day--selected',
        isDisabled && 'calendar-day--disabled',
      ].filter(Boolean).join(' ');

      cells.push(
        <button
          key={day}
          type="button"
          className={`${dayClasses} label-regular-s`}
          onClick={() => !isDisabled && handleDaySelect(day)}
          disabled={isDisabled}
          tabIndex={-1}
        >
          {day}
        </button>
      );

      if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
        rows.push(
          <div key={`row-${rows.length}`} className="calendar-day-row">
            {cells}
          </div>
        );
        cells = [];
      }
    }

    return rows;
  };

  // Build month grid
  const renderMonthsGrid = () => {
    const rows: React.ReactNode[] = [];
    for (let row = 0; row < 4; row++) {
      const cells: React.ReactNode[] = [];
      for (let col = 0; col < 3; col++) {
        const monthIndex = row * 3 + col;
        const isSelected = value && value.getFullYear() === displayYear && value.getMonth() === monthIndex;
        const isDisabled = isMonthDisabled(monthIndex);

        const monthClasses = [
          'calendar-month-cell',
          isSelected && 'calendar-month-cell--selected',
          isDisabled && 'calendar-month-cell--disabled',
        ].filter(Boolean).join(' ');

        cells.push(
          <button
            key={monthIndex}
            type="button"
            className={`${monthClasses} label-regular-s`}
            onClick={() => !isDisabled && handleMonthSelect(monthIndex)}
            disabled={isDisabled}
            tabIndex={-1}
          >
            {MONTH_NAMES_SHORT[monthIndex]}
          </button>
        );
      }
      rows.push(
        <div key={`month-row-${row}`} className="calendar-month-row">
          {cells}
        </div>
      );
    }
    return rows;
  };

  // Navigation boundary checks
  const yearMin = minDate ? minDate.getFullYear() : YEAR_MIN;
  const yearMax = maxDate ? maxDate.getFullYear() : YEAR_MAX;

  const canGoPrevMonth = !(minDate && displayYear === yearMin && displayMonth <= minDate.getMonth());
  const canGoNextMonth = !(maxDate && displayYear === yearMax && displayMonth >= maxDate.getMonth());
  const canGoPrevYear = displayYear > yearMin;
  const canGoNextYear = displayYear < yearMax;

  const renderYearList = () => {
    const years: React.ReactNode[] = [];
    for (let year = yearMin; year <= yearMax; year++) {
      const isSelected = year === displayYear;
      const yearClasses = [
        'calendar-year',
        isSelected && 'calendar-year--selected',
      ].filter(Boolean).join(' ');

      years.push(
        <button
          key={year}
          type="button"
          className={`${yearClasses} label-regular-s`}
          onClick={() => handleYearSelect(year)}
          tabIndex={-1}
        >
          {year}
        </button>
      );
    }
    return years;
  };

  // Header date display
  const headerFallback = defaultDate || today;
  const headerYear = value ? value.getFullYear() : displayYear;
  const headerDate = value
    ? (mode === 'date' ? formatHeaderDate(value) : `${MONTH_NAMES_SHORT[value.getMonth()]} ${value.getFullYear()}`)
    : (mode === 'date' ? formatHeaderDate(headerFallback) : `${MONTH_NAMES_SHORT[headerFallback.getMonth()]} ${headerFallback.getFullYear()}`);

  return (
    <>
      {showHeader && (
        <div className="calendar-header">
          <button
            type="button"
            className="calendar-header-year legend-regular-m"
            onClick={handleYearClick}
            tabIndex={-1}
          >
            {headerYear}
          </button>
          <div className="calendar-header-date heading-5">
            {headerDate}
          </div>
        </div>
      )}

      {/* Days view */}
      {currentView === 'days' && (
        <div className="calendar-body">
          <div className="calendar-nav">
            <IconButton
              icon="navigate_before"
              size="XS"
              variant="Ghost"
              onClick={handlePrevMonth}
              disabled={!canGoPrevMonth}
              aria-label="Previous month"
              tabIndex={-1}
            />
            <button
              type="button"
              className="calendar-nav-label calendar-nav-label--clickable label-regular-s"
              onClick={() => setCurrentView('months')}
              tabIndex={-1}
            >
              {MONTH_NAMES[displayMonth]} {displayYear}
            </button>
            <IconButton
              icon="navigate_next"
              size="XS"
              variant="Ghost"
              onClick={handleNextMonth}
              disabled={!canGoNextMonth}
              aria-label="Next month"
              tabIndex={-1}
            />
          </div>

          <div className="calendar-day-headers">
            {DAY_NAMES.map((day) => (
              <span key={day} className="calendar-day-header legend-regular-m">{day}</span>
            ))}
          </div>

          <div className="calendar-day-grid">
            {renderDaysGrid()}
          </div>
        </div>
      )}

      {/* Months view */}
      {currentView === 'months' && (
        <div className="calendar-body">
          <div className="calendar-nav">
            <IconButton
              icon="navigate_before"
              size="XS"
              variant="Ghost"
              onClick={handlePrevYear}
              disabled={!canGoPrevYear}
              aria-label="Previous year"
              tabIndex={-1}
            />
            <button
              type="button"
              className="calendar-nav-label calendar-nav-label--clickable label-regular-s"
              onClick={handleYearClick}
              tabIndex={-1}
            >
              {displayYear}
            </button>
            <IconButton
              icon="navigate_next"
              size="XS"
              variant="Ghost"
              disabled={!canGoNextYear}
              onClick={handleNextYear}
              aria-label="Next year"
              tabIndex={-1}
            />
          </div>

          <div className="calendar-month-grid">
            {renderMonthsGrid()}
          </div>
        </div>
      )}

      {/* Years view */}
      {currentView === 'years' && (
        <div className="calendar-years-body" ref={yearListRef}>
          {renderYearList()}
        </div>
      )}
    </>
  );
}

export default CalendarGrid;
