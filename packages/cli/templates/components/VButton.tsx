import React from 'react';
import { Icon } from './Icon';
import './VButton.css';

export type VButtonSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type VButtonState = 'Default' | 'Hover' | 'Active' | 'Disabled';
export type VButtonVariant = 'Default' | 'Outlined' | 'Ghost';

export interface VButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Label du bouton
   */
  label?: string;
  /**
   * Taille du bouton
   * @default 'M'
   */
  size?: VButtonSize;
  /**
   * État du bouton
   * @default 'Default'
   */
  state?: VButtonState;
  /**
   * Variante du bouton
   * @default 'Default'
   */
  variant?: VButtonVariant;
  /**
   * Nom de l'icône à afficher
   */
  icon?: string;
  /**
   * Composant React personnalisé pour l'icône
   */
  iconComponent?: React.ReactNode;
  /**
   * Afficher le label
   * @default true
   */
  showLabel?: boolean;
  /**
   * Afficher l'icône
   * @default true
   */
  showIcon?: boolean;
  /**
   * Surcharge optionnelle de la taille de la font du label (en px)
   */
  fontSize?: number;
  /**
   * Surcharge optionnelle de la taille de l'icône (en px)
   */
  iconSize?: number;
}

/**
 * Composant VButton (Vertical Button)
 *
 * Bouton vertical avec icône au-dessus du label.
 *
 * @example
 * ```tsx
 * <VButton label="Click me" icon="add" size="M" variant="Default" />
 * <VButton label="Settings" icon="construction" size="L" variant="Outlined" />
 * ```
 */
export const VButton = React.forwardRef<HTMLButtonElement, VButtonProps>(({
  label = 'BUTTON LABEL',
  size = 'M',
  state = 'Default',
  variant = 'Default',
  icon,
  iconComponent,
  showLabel = true,
  showIcon = true,
  fontSize,
  iconSize,
  className = '',
  disabled,
  style,
  ...props
}, ref) => {
  const isDisabled = state === 'Disabled' || disabled;

  const defaultIconSizes: Record<VButtonSize, number> = {
    XS: 16,
    S: 20,
    M: 24,
    L: 32,
    XL: 40,
  };

  const resolvedIconSize = iconSize ?? defaultIconSizes[size];

  // Typography classes based on size
  const typographyClasses: Record<VButtonSize, string> = {
    XS: 'legend-bold-m',
    S: 'label-bold-xs',
    M: 'label-bold-s',
    L: 'label-bold-m',
    XL: 'label-bold-l',
  };

  const typographyClass = typographyClasses[size];

  const buttonClasses = [
    'vbutton',
    `vbutton--${size.toLowerCase()}`,
    `vbutton--${state.toLowerCase()}`,
    `vbutton--${variant.toLowerCase()}`,
    typographyClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getIconColor = () => {
    if (variant === 'Default') {
      return 'var(--text-negative, #ffffff)';
    } else {
      return 'var(--primary-default, #063b9e)';
    }
  };

  const iconColor = getIconColor();

  const labelStyle: React.CSSProperties | undefined = fontSize
    ? { fontSize: `${fontSize}px` }
    : undefined;

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={isDisabled}
      data-size={size}
      data-state={state}
      data-variant={variant}
      style={style}
      {...props}
    >
      {showIcon && icon && (
        <span className="vbutton__icon">
          <Icon name={icon} size={resolvedIconSize} color={iconColor} />
        </span>
      )}
      {showIcon && !icon && iconComponent && (
        <span className="vbutton__icon">
          {iconComponent}
        </span>
      )}

      {showLabel && label && (
        <span className="vbutton__label" style={labelStyle}>{label}</span>
      )}
    </button>
  );
});

VButton.displayName = 'VButton';

export default VButton;
