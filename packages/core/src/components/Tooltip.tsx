import React, { forwardRef } from 'react';
import './Tooltip.css';

export type TooltipArrow = 'None' | 'Top' | 'Bottom' | 'Left' | 'Right';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text content of the tooltip
   * @default 'Tooltip label'
   */
  label?: string;
  /**
   * Arrow direction — indicates which side the arrow points to
   * (i.e., the side where the trigger element is)
   * @default 'None'
   */
  arrow?: TooltipArrow;
}

/**
 * Tooltip Component
 *
 * A lightweight tooltip used to display contextual information.
 * Supports arrow positioning on any side.
 *
 * @example
 * ```tsx
 * <Tooltip label="Helpful info" arrow="Bottom" />
 * <Tooltip label="No arrow" />
 * ```
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ label = 'Tooltip label', arrow = 'None', className = '', ...props }, ref) => {
    const classes = [
      'tooltip',
      arrow !== 'None' ? `tooltip--arrow-${arrow.toLowerCase()}` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} role="tooltip" {...props}>
        <div className="tooltip__content">
          <span className="tooltip__label">{label}</span>
        </div>
        {arrow !== 'None' && <span className="tooltip__arrow" />}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
