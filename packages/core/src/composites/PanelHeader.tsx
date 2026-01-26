import React from 'react';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { PanelStudyName } from '../components/PanelStudyName';
import { IconButton } from '../components/IconButton';
import { Tooltip } from '../components/Tooltip';
import './PanelHeader.css';

export interface PanelHeaderProps {
  /**
   * Study name displayed in the header
   */
  studyName: string;
  /**
   * Number of visible lines before truncation for study name
   * @default 1
   */
  studyNameLines?: number;
  /**
   * Callback when the study name is clicked (e.g., to rename)
   */
  onStudyNameClick?: () => void;
  /**
   * Callback when the duplicate button is clicked
   */
  onDuplicate?: () => void;
  /**
   * Callback when the "Back Home" button is clicked
   */
  onBackHome?: () => void;
  /**
   * Background image URL (optional)
   * If not provided, a solid dark blue background is used
   */
  backgroundImage?: string;
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Additional action buttons to display next to the duplicate button
   */
  actions?: React.ReactNode;
}

/**
 * PanelHeader Composite
 *
 * A dark corporate panel header with background image, "Back Home" navigation,
 * study name with edit capability, and a duplicate action button.
 * Used as the top section of a study page side panel.
 *
 * @example
 * ```tsx
 * <PanelHeader
 *   studyName="My Study"
 *   onBackHome={() => navigate('/')}
 *   onStudyNameClick={() => openRenameDialog()}
 *   onDuplicate={() => duplicateStudy()}
 *   backgroundImage="/assets/backgrounds/study.png"
 * />
 * ```
 */
export function PanelHeader({
  studyName,
  studyNameLines = 1,
  onStudyNameClick,
  onDuplicate,
  onBackHome,
  backgroundImage,
  className = '',
  actions,
}: PanelHeaderProps) {
  const containerClasses = ['panel-header', className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Background with gradient overlay */}
      <div className="panel-header__background">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            className="panel-header__background-image"
          />
        )}
        <div className="panel-header__overlay" />
      </div>

      {/* Content */}
      <div className="panel-header__content">
        {/* Back Home button */}
        <Button
          label="BACK HOME"
          leftIconComponent={<Icon name="arrow_back" size={12} color="var(--primary-light, #cfddf8)" />}
          variant="Ghost"
          size="S"
          className="panel-header__back-button"
          onClick={onBackHome}
        />

        {/* Study Info section */}
        <div className="panel-header__study-info">
          <span className="panel-header__legend">Study Name</span>
          <div className="panel-header__study-row">
            <PanelStudyName
              name={studyName}
              lines={studyNameLines}
              onClick={onStudyNameClick}
            />
            <div className="panel-header__actions">
              <span className="panel-header__action-wrapper">
                <IconButton
                  icon="content_copy"
                  size="XS"
                  variant="Ghost"
                  onClick={onDuplicate}
                  alt="Duplicate Study"
                  className="panel-header__icon-button"
                />
                <Tooltip label="Duplicate Study" arrow="Bottom" className="panel-header__tooltip" />
              </span>
              {actions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelHeader;
