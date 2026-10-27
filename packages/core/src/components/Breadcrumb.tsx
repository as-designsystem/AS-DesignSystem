// @ts-ignore - React import needed for JSX in non-TypeScript projects
import React from 'react';
import './Breadcrumb.css';
import { Icon } from './Icon';

export type BreadcrumbSize = 'S' | 'M';

export interface BreadcrumbItem {
  /**
   * Item label
   */
  label: string;
  /**
   * Click handler — ancestors navigate back, the last item is the current page and is never clickable
   */
  onClick?: () => void;
}

export interface BreadcrumbProps {
  /**
   * Path from the root to the current page (last item)
   * @required
   */
  items: BreadcrumbItem[];
  /**
   * Breadcrumb size
   * @default 'M'
   */
  size?: BreadcrumbSize;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Breadcrumb - Navigation trail from a root page to the current page
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'MRO Network', onClick: () => setView('list') },
 *     { label: 'Default_MRO_Network' },
 *   ]}
 * />
 * ```
 */
export function Breadcrumb({ items, size = 'M', className = '' }: BreadcrumbProps) {
  const sizeClass = size.toLowerCase();
  const iconSize = size === 'S' ? 16 : 20;

  return (
    <nav aria-label="Breadcrumb" className={['breadcrumb', `breadcrumb--${sizeClass}`, className].filter(Boolean).join(' ')}>
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="breadcrumb__item">
              {isCurrent ? (
                <span className="breadcrumb__current" aria-current="page">
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button type="button" className="breadcrumb__link" onClick={item.onClick}>
                  {item.label}
                </button>
              ) : (
                <span className="breadcrumb__ancestor">{item.label}</span>
              )}
              {!isCurrent && (
                <span className="breadcrumb__separator" aria-hidden="true">
                  <Icon name="chevron_right" size={iconSize} color="currentColor" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
