// @ts-ignore - React import needed for JSX in non-TypeScript projects
import React, { useState, useRef, useLayoutEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Icon } from './Icon';
import { Chip, type ChipSize } from './Chip';
import { Checkbox, type CheckboxSize } from './Checkbox';
import { ScrollableContent } from './ScrollableContent';
import { FieldLabel, type FieldAction } from './FieldLabel';
import './MultiSelect.css';

export type MultiSelectSize = 'XS' | 'S' | 'M' | 'L';
export type MultiSelectState = 'Default' | 'Error' | 'Valid' | 'Disabled' | 'Read-only';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectGroup {
  /**
   * Small title shown above the group's options
   */
  label: string;
  options: MultiSelectOption[];
}

export interface MultiSelectProps {
  /**
   * Label of the multi-select
   */
  label?: string;
  /**
   * Helper text displayed below the field
   */
  legend?: string;
  /**
   * Placeholder shown when nothing is selected
   * @default 'Select options'
   */
  placeholder?: string;
  /**
   * Size of the multi-select
   * @default 'M'
   */
  size?: MultiSelectSize;
  /**
   * Validation state
   * @default 'Default'
   */
  state?: MultiSelectState;
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
   * Flat list of options (ignored when `groups` is provided)
   */
  options?: MultiSelectOption[];
  /**
   * Options grouped under small titles
   */
  groups?: MultiSelectGroup[];
  /**
   * Selected values
   */
  value: string[];
  /**
   * Callback when the selection changes (values are kept in option order)
   */
  onValueChange?: (value: string[]) => void;
  /**
   * Show the "All" row at the top of the dropdown (selects or clears every option)
   * @default true
   */
  showSelectAll?: boolean;
  /**
   * Label of the "All" row
   * @default 'All'
   */
  selectAllLabel?: string;
  /**
   * Make "All" an exclusive choice instead of a select / clear-all shortcut:
   * an empty `value` means "All" (shown as an "All" chip, the default),
   * picking an option replaces "All", picking "All" clears the options, and
   * clearing the last option goes back to "All". The field is never empty.
   * @default false
   */
  exclusiveAll?: boolean;
  /**
   * Text shown under a group that has no option
   * @default 'No option'
   */
  emptyGroupText?: string;
  /**
   * Position of the label relative to the field
   * @default 'top'
   */
  labelPosition?: 'top' | 'left';
  /**
   * Additional CSS class
   */
  className?: string;
}

const CHIP_SIZES: Record<MultiSelectSize, ChipSize> = { XS: 'XS', S: 'S', M: 'M', L: 'M' };
const CHECKBOX_SIZES: Record<MultiSelectSize, CheckboxSize> = { XS: 'S', S: 'M', M: 'M', L: 'L' };
const ICON_SIZES: Record<MultiSelectSize, number> = { XS: 12, S: 12, M: 16, L: 20 };

/**
 * MultiSelect Component
 *
 * Multiple selection field: the selected options are shown as removable chips
 * inside the field (as many as fit on one line, then a "+X" counter). The
 * dropdown lists every option with a checkbox, an optional "All" row and
 * optional groups. A field with no option at all is disabled.
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   label="Runways"
 *   options={[
 *     { value: '08L', label: '08L' },
 *     { value: '26R', label: '26R' },
 *   ]}
 *   value={runways}
 *   onValueChange={setRunways}
 * />
 * ```
 */
export function MultiSelect({
  label = 'Label',
  legend = 'Legend',
  placeholder = 'Select options',
  size = 'M',
  state = 'Default',
  showLabel = true,
  showLegend = false,
  showOptional = false,
  showInfo = false,
  infoText = '',
  actions,
  options = [],
  groups,
  value,
  onValueChange,
  showSelectAll = true,
  selectAllLabel = 'All',
  exclusiveAll = false,
  emptyGroupText = 'No option',
  labelPosition = 'top',
  className = '',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(value.length);

  const allOptions = groups ? groups.flatMap((g) => g.options) : options;
  const labelOf = (v: string) => allOptions.find((o) => o.value === v)?.label ?? v;

  const isReadOnly = state === 'Read-only';
  const isDisabled = state === 'Disabled' || allOptions.length === 0;
  const isError = state === 'Error';
  const isValid = state === 'Valid';
  const chipSize = CHIP_SIZES[size];
  const checkboxSize = CHECKBOX_SIZES[size];

  const selected = new Set(value);
  const selectedCount = allOptions.filter((o) => selected.has(o.value)).length;
  // Exclusive mode: an empty selection stands for "All".
  const isAll = exclusiveAll && value.length === 0;
  const allState: boolean | 'indeterminate' = exclusiveAll
    ? isAll
    : selectedCount === 0 ? false : selectedCount === allOptions.length ? true : 'indeterminate';

  // Keep the selection in option order, whatever the click order.
  const commit = (next: Set<string>) =>
    onValueChange?.(allOptions.filter((o) => next.has(o.value)).map((o) => o.value));
  const toggle = (v: string, checked: boolean) => {
    const next = new Set(selected);
    if (checked) next.add(v);
    else next.delete(v);
    commit(next);
  };
  const toggleAll = () => {
    if (exclusiveAll) {
      if (!isAll) onValueChange?.([]);
    } else {
      onValueChange?.(allState === true ? [] : allOptions.map((o) => o.value));
    }
  };
  // The whole row is the hit area: clicks outside the checkbox / its label toggle too.
  const onRow = (e: React.MouseEvent, fn: () => void) => {
    if (!(e.target as Element).closest('button, label')) fn();
  };

  // The field stays on one line: show as many chips as fit, then a "+X" counter.
  // Widths come from an invisible copy of every chip (+ a counter sample).
  useLayoutEffect(() => {
    const box = chipsRef.current;
    const measure = measureRef.current;
    if (!box || !measure) return;
    const fit = () => {
      const items = Array.from(measure.children) as HTMLElement[];
      const counterWidth = items.pop()?.offsetWidth ?? 0;
      const gap = parseFloat(getComputedStyle(measure).columnGap) || 0;
      let used = 0;
      let count = 0;
      for (let i = 0; i < items.length; i++) {
        const next = used + (i ? gap : 0) + items[i].offsetWidth;
        const reserve = i < items.length - 1 ? gap + counterWidth : 0;
        if (next + reserve > box.clientWidth) break;
        used = next;
        count = i + 1;
      }
      setVisibleCount(Math.max(1, count));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [value, size]);
  const hiddenCount = value.length - visibleCount;

  const containerClasses = [
    'multi-select-container',
    isError && 'multi-select-container--error',
    isValid && 'multi-select-container--valid',
    labelPosition === 'left' && 'multi-select-container--label-left',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const triggerClasses = [
    'multi-select-trigger',
    `multi-select-trigger--${size.toLowerCase()}`,
    isError && 'multi-select-trigger--error',
    isValid && 'multi-select-trigger--valid',
    isDisabled && 'multi-select-trigger--disabled',
    isReadOnly && 'multi-select-trigger--read-only',
    open && 'multi-select-trigger--open',
  ]
    .filter(Boolean)
    .join(' ');

  const renderOption = (o: MultiSelectOption) => (
    <div key={o.value} className="multi-select-option" onClick={(e) => onRow(e, () => toggle(o.value, !selected.has(o.value)))}>
      <Checkbox
        label={o.label}
        size={checkboxSize}
        checked={selected.has(o.value)}
        onCheckedChange={(c) => toggle(o.value, c === true)}
      />
    </div>
  );

  return (
    <div className={containerClasses}>
      <FieldLabel
        classPrefix="multi-select"
        label={label}
        showLabel={showLabel}
        showOptional={showOptional}
        showInfo={showInfo}
        infoText={infoText}
        actions={actions}
        disabled={isDisabled}
        labelPosition={labelPosition}
      />

      <Popover.Root open={open} onOpenChange={(o) => setOpen(o && !isDisabled && !isReadOnly)} modal={false}>
        <Popover.Trigger asChild>
          <div
            className={triggerClasses}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-label={label}
            aria-disabled={isDisabled || undefined}
            tabIndex={isDisabled || isReadOnly ? -1 : 0}
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return;
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                setOpen(!isDisabled && !isReadOnly);
              }
            }}
          >
            <div className="multi-select-chips" ref={chipsRef}>
              {isAll ? (
                <Chip label={selectAllLabel} size={chipSize} type="ReadOnly" />
              ) : value.length === 0 ? (
                <span className="multi-select-placeholder">{placeholder}</span>
              ) : (
                <>
                  {value.slice(0, visibleCount).map((v) => (
                    <Chip
                      key={v}
                      label={labelOf(v)}
                      size={chipSize}
                      type={isReadOnly ? 'ReadOnly' : 'Removable'}
                      onRemove={() => toggle(v, false)}
                    />
                  ))}
                  {hiddenCount > 0 && <Chip label={`+${hiddenCount}`} size={chipSize} type="ReadOnly" />}
                </>
              )}
              <div className="multi-select-measure" ref={measureRef} aria-hidden>
                {value.map((v) => (
                  <Chip key={v} label={labelOf(v)} size={chipSize} type={isReadOnly ? 'ReadOnly' : 'Removable'} />
                ))}
                <Chip label={`+${value.length}`} size={chipSize} type="ReadOnly" />
              </div>
            </div>

            {!isReadOnly && (
              <span className="multi-select-icon multi-select-icon--chevron">
                <Icon name="keyboard_arrow_down" size={ICON_SIZES[size]} color="var(--primary-default, #063b9e)" />
              </span>
            )}
          </div>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content className="multi-select-content" align="start" sideOffset={4}>
            <ScrollableContent className="multi-select-list">
              {showSelectAll && (
                <div className="multi-select-option multi-select-option--all" onClick={(e) => onRow(e, toggleAll)}>
                  <Checkbox label={selectAllLabel} size={checkboxSize} checked={allState} onCheckedChange={toggleAll} />
                </div>
              )}
              {groups
                ? groups.map((g) => (
                    <div key={g.label} role="group" aria-label={g.label}>
                      <span className="multi-select-group label-medium-xs">{g.label}</span>
                      {g.options.length === 0 ? (
                        <span className="multi-select-group-empty label-regular-s">{emptyGroupText}</span>
                      ) : (
                        g.options.map(renderOption)
                      )}
                    </div>
                  ))
                : options.map(renderOption)}
            </ScrollableContent>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {showLegend && legend && (
        <span className="multi-select-legend label-regular-xs">{legend}</span>
      )}
    </div>
  );
}

export default MultiSelect;
