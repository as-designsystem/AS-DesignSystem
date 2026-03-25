import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import './Alert.css';

export type AlertVariant = 'Error' | 'Warning' | 'Validated' | 'Info';

export interface AlertProps {
  /**
   * Alert variant determining color scheme and default icon
   * @default 'Info'
   */
  variant?: AlertVariant;
  /**
   * Alert title
   */
  title: string;
  /**
   * Alert description text
   */
  description?: string;
  /**
   * Custom icon name override (defaults based on variant)
   */
  icon?: string;
  /**
   * Whether to show the loader bar at top
   * @default false
   */
  showLoader?: boolean;
  /**
   * Loader progress (0 to 100). Controls the width of the filled portion.
   * Ignored when loaderDuration is set.
   */
  loaderProgress?: number;
  /**
   * Duration in seconds for the loader to animate from 0% to 100%.
   * When set, the loader auto-animates and calls onLoaderComplete when done.
   */
  loaderDuration?: number;
  /**
   * Callback when the animated loader reaches 100%
   */
  onLoaderComplete?: () => void;
  /**
   * Action element rendered below the description
   */
  actionBottom?: React.ReactNode;
  /**
   * Action element rendered on the right side
   */
  actionRight?: React.ReactNode;
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Callback when close button is clicked
   */
  onClose?: () => void;
  /**
   * Additional CSS class
   */
  className?: string;
}

const defaultIcons: Record<AlertVariant, string> = {
  Error: 'error_outline',
  Warning: 'warning_outline',
  Validated: 'check_circle',
  Info: 'info',
};

const iconColors: Record<AlertVariant, string> = {
  Error: 'var(--feedback-error-text, #6a0014)',
  Warning: 'var(--feedback-warning-text, #554000)',
  Validated: 'var(--feedback-success-text, #005e3e)',
  Info: 'var(--feedback-info-text, #14171d)',
};

export function Alert({
  variant = 'Info',
  title,
  description,
  icon,
  showLoader = false,
  loaderProgress,
  loaderDuration,
  onLoaderComplete,
  actionBottom,
  actionRight,
  showCloseButton = true,
  onClose,
  className = '',
}: AlertProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const loaderBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showLoader || loaderDuration === undefined) return;

    // Start at 0, then trigger transition to 100% on next frame
    setAnimatedProgress(0);
    const raf = requestAnimationFrame(() => {
      setAnimatedProgress(100);
    });

    const timer = setTimeout(() => {
      onLoaderComplete?.();
    }, loaderDuration * 1000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [showLoader, loaderDuration]);

  const alertClasses = [
    'alert',
    `alert--${variant.toLowerCase()}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconName = icon || defaultIcons[variant];
  const iconColor = iconColors[variant];

  // Determine loader width and transition
  const getLoaderStyle = (): React.CSSProperties => {
    if (loaderDuration !== undefined) {
      return {
        width: `${animatedProgress}%`,
        transition: animatedProgress > 0 ? `width ${loaderDuration}s linear` : 'none',
      };
    }
    if (loaderProgress !== undefined) {
      return { width: `${loaderProgress}%` };
    }
    return {};
  };

  return (
    <div className={alertClasses} role="alert">
      {showLoader && (
        <div className="alert__loader">
          <div
            ref={loaderBarRef}
            className="alert__loader-bar"
            style={getLoaderStyle()}
          />
        </div>
      )}

      <div className="alert__icon">
        <Icon name={iconName} size={24} color={iconColor} />
      </div>

      <div className="alert__content">
        <p className="alert__title">{title}</p>
        {description && <p className="alert__description">{description}</p>}
        {actionBottom && (
          <div className="alert__action-bottom">{actionBottom}</div>
        )}
      </div>

      {actionRight && (
        <div className="alert__action-right">{actionRight}</div>
      )}

      {showCloseButton && (
        <div className="alert__close">
          <IconButton
            icon="close"
            size="XS"
            variant="Ghost"
            onClick={onClose}
            alt="Close alert"
          />
        </div>
      )}
    </div>
  );
}

export default Alert;
