import './StudyContent.css';

export type StudyContentVariant = 'Scrollable' | 'Fixed';

export interface StudyContentProps {
  variant?: StudyContentVariant;
  children?: React.ReactNode;
  className?: string;
}

/**
 * StudyContent Component
 *
 * A layout container for study page content. Provides consistent padding and gap
 * depending on the content type.
 *
 * - **Scrollable**: More padding (32px) and gap (24px), content scrolls vertically.
 *   Use for pages with stacked cards, forms, or charts.
 * - **Fixed**: Less padding (16px) and gap (8px), children fill available space.
 *   Use for tables, maps, or full-size charts.
 *
 * @example
 * ```tsx
 * <StudyContent variant="Scrollable">
 *   <ChartCard title="Revenue" />
 *   <ChartCard title="Costs" />
 * </StudyContent>
 *
 * <StudyContent variant="Fixed">
 *   <DataTable />
 * </StudyContent>
 * ```
 */
export function StudyContent({
  variant = 'Scrollable',
  children,
  className = '',
}: StudyContentProps) {
  const classes = [
    'study-content',
    `study-content--${variant.toLowerCase()}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}

export default StudyContent;
