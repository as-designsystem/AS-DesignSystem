import { forwardRef } from 'react';
import './ScrollableContent.css';

export interface ScrollableContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Scroll container with discrete hover-reveal scrollbar.
 * The outer div uses display:contents so it has zero layout impact —
 * height, flex, etc. in className work relative to the grandparent.
 * The parent-hover CSS pattern (.scrollable-content-host:hover .scrollable-content)
 * is more reliable than self-hover in Chrome.
 * The ref points to the inner scrollable div (useful for scrollTop manipulation).
 */
export const ScrollableContent = forwardRef<HTMLDivElement, ScrollableContentProps>(
  ({ children, className, style }, ref) => {
    const classes = ['scrollable-content', className].filter(Boolean).join(' ');

    return (
      <div className="scrollable-content-host">
        <div ref={ref} className={classes} style={style}>
          {children}
        </div>
      </div>
    );
  }
);

ScrollableContent.displayName = 'ScrollableContent';
