import React from 'react';
import './EmptyState.css';

export interface EmptyStateProps {
  /**
   * Illustrative icon or image to display at the top
   */
  icon?: React.ReactNode;
  /**
   * Title text displayed below the icon
   */
  title: string;
  /**
   * Description text displayed below the title
   */
  description?: string;
  /**
   * Action buttons or custom content for the footer
   */
  actions?: React.ReactNode;
  /**
   * Additional class name for custom styling
   */
  className?: string;
}

/**
 * EmptyState Component
 *
 * A placeholder component displayed when content is empty or unavailable.
 * Shows an illustrative icon, title, description, and optional action buttons.
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<Icon name="broken_image" size={64} />}
 *   title="Your Fleet is empty"
 *   description="Please add flights or import a fleet"
 *   actions={
 *     <>
 *       <Button variant="Outlined" label="ADD AIRCRAFT" leftIcon="add" />
 *       <Button variant="Default" label="IMPORT FLEET" leftIcon="download" />
 *     </>
 *   }
 * />
 * ```
 */
export function EmptyState({
  icon,
  title,
  description,
  actions,
  className,
}: EmptyStateProps) {
  const classes = ['empty-state', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {icon && <div className="empty-state__icon">{icon}</div>}

      <div className="empty-state__content">
        <h5 className="empty-state__title">{title}</h5>
        {description && (
          <p className="empty-state__description">{description}</p>
        )}
      </div>

      {actions && <div className="empty-state__actions">{actions}</div>}
    </div>
  );
}
