import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../components/DropdownMenu';
import { IconButton } from '../components/IconButton';
import './StudyContextMenu.css';

export type StudyContextMenuState = 'Draft' | 'Computed' | 'Computing' | 'ComputingWithCancel';

export interface StudyContextMenuProps {
  /**
   * Study state — determines which menu items are shown
   */
  state: StudyContextMenuState;
  /**
   * Callback when "Edit Inputs" is clicked (Draft, Computing)
   */
  onEditInputs?: () => void;
  /**
   * Callback when "View Inputs" is clicked (ComputingWithCancel)
   */
  onViewInputs?: () => void;
  /**
   * Callback when "Open Results" is clicked (Computed)
   */
  onOpenResults?: () => void;
  /**
   * Callback when "Download Results" is clicked (Computed)
   */
  onDownloadResults?: () => void;
  /**
   * Callback when "Duplicate Study" is clicked (all states)
   */
  onDuplicateStudy?: () => void;
  /**
   * Callback when "Cancel Computation" is clicked (ComputingWithCancel)
   */
  onCancelComputation?: () => void;
  /**
   * Callback when "Delete Study" is clicked (all states)
   */
  onDeleteStudy?: () => void;
  /**
   * Custom trigger element. Defaults to a ghost IconButton with more_horiz icon.
   */
  children?: React.ReactNode;
  /**
   * Dropdown alignment
   * @default 'end'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * StudyContextMenu Composite
 *
 * A dropdown context menu for study actions. Renders different menu items
 * based on the study computation state.
 *
 * @example
 * ```tsx
 * <StudyContextMenu
 *   state="Draft"
 *   onEditInputs={() => navigate('/edit')}
 *   onDuplicateStudy={() => duplicateStudy()}
 *   onDeleteStudy={() => deleteStudy()}
 * />
 *
 * <StudyContextMenu
 *   state="Computed"
 *   onOpenResults={() => openResults()}
 *   onDownloadResults={() => downloadResults()}
 *   onDuplicateStudy={() => duplicateStudy()}
 *   onDeleteStudy={() => deleteStudy()}
 * />
 * ```
 */
export function StudyContextMenu({
  state,
  onEditInputs,
  onViewInputs,
  onOpenResults,
  onDownloadResults,
  onDuplicateStudy,
  onCancelComputation,
  onDeleteStudy,
  children,
  align = 'end',
  className = '',
}: StudyContextMenuProps) {
  const trigger = children || (
    <IconButton
      icon="more_horiz"
      size="XS"
      variant="Ghost"
    />
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={className}>
        {renderMenuItems(state, {
          onEditInputs,
          onViewInputs,
          onOpenResults,
          onDownloadResults,
          onDuplicateStudy,
          onCancelComputation,
          onDeleteStudy,
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function renderMenuItems(
  state: StudyContextMenuState,
  callbacks: {
    onEditInputs?: () => void;
    onViewInputs?: () => void;
    onOpenResults?: () => void;
    onDownloadResults?: () => void;
    onDuplicateStudy?: () => void;
    onCancelComputation?: () => void;
    onDeleteStudy?: () => void;
  },
) {
  switch (state) {
    case 'Draft':
      return (
        <>
          <DropdownMenuItem icon="edit" onSelect={callbacks.onEditInputs}>
            Edit Inputs
          </DropdownMenuItem>
          <DropdownMenuItem icon="content_copy" onSelect={callbacks.onDuplicateStudy}>
            Duplicate Study
          </DropdownMenuItem>
          <DropdownMenuItem icon="delete" destructive onSelect={callbacks.onDeleteStudy}>
            Delete Study
          </DropdownMenuItem>
        </>
      );

    case 'Computed':
      return (
        <>
          <DropdownMenuItem icon="open_in_new" onSelect={callbacks.onOpenResults}>
            Open Results
          </DropdownMenuItem>
          <DropdownMenuItem icon="download" onSelect={callbacks.onDownloadResults}>
            Download Results
          </DropdownMenuItem>
          <DropdownMenuItem icon="content_copy" onSelect={callbacks.onDuplicateStudy}>
            Duplicate Study
          </DropdownMenuItem>
          <DropdownMenuItem icon="delete" destructive onSelect={callbacks.onDeleteStudy}>
            Delete Study
          </DropdownMenuItem>
        </>
      );

    case 'Computing':
      return (
        <>
          <DropdownMenuItem icon="edit" onSelect={callbacks.onEditInputs}>
            Edit Inputs
          </DropdownMenuItem>
          <DropdownMenuItem icon="content_copy" onSelect={callbacks.onDuplicateStudy}>
            Duplicate Study
          </DropdownMenuItem>
          <DropdownMenuItem icon="delete" destructive onSelect={callbacks.onDeleteStudy}>
            Delete Study
          </DropdownMenuItem>
        </>
      );

    case 'ComputingWithCancel':
      return (
        <>
          <DropdownMenuItem icon="visibility" onSelect={callbacks.onViewInputs}>
            View Inputs
          </DropdownMenuItem>
          <DropdownMenuItem icon="content_copy" onSelect={callbacks.onDuplicateStudy}>
            Duplicate Study
          </DropdownMenuItem>
          <DropdownMenuItem icon="cancel" onSelect={callbacks.onCancelComputation}>
            Cancel Computation
          </DropdownMenuItem>
          <DropdownMenuItem icon="delete" destructive onSelect={callbacks.onDeleteStudy}>
            Delete Study
          </DropdownMenuItem>
        </>
      );
  }
}

StudyContextMenu.displayName = 'StudyContextMenu';

export default StudyContextMenu;
