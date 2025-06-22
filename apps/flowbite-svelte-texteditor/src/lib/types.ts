import type { Editor } from '@tiptap/core';
import { type ClassValue } from 'clsx';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

export interface EditorProviderProps {
  element?: HTMLDivElement | null;
  content?: string;
  editorClass?: string;
  editor?: Editor | null;
}

export interface EditorBasicProps extends Omit<HTMLButtonAttributes, 'class'> {
  editor: Editor | null;
  class?: ClassValue;
}

// buttons
export interface EditorButtonProps extends EditorBasicProps {
  tooltipText: string;
  buttonId: string;
  ariaLabel: string;
}

export interface AlignmentButtonProps extends EditorButtonProps {
  alignment: 'left' | 'center' | 'right' | 'justify';
}

export interface FormatButtonProps extends EditorButtonProps {
  format: 'bold' | 'italic' | 'underline' | 'strike' | 'highlight' | 'code' | 'link' | 'removeLink' | 'subscript' | 'superscript' | 'fontFamily' | 'textColor' | 'fontSize';
}

export interface ImageButtonProps extends EditorButtonProps {
  format: 'default' | 'advanced';
  onAdvancedClick?: () => void;
}

export interface VideoButtonProps extends EditorButtonProps {
  format: 'default' | 'advanced';
  onAdvancedClick?: () => void;
}
// layout
export interface LayoutButtonProps extends EditorButtonProps {
  format: 'blockquote' | 'codeblock' | 'horizontalrule';
}

// table
export interface TableButtonProps extends EditorButtonProps {
  format:
    | 'table'
    | 'deleteTable'
    | 'addColumnBefore'
    | 'addColumnAfter'
    | 'deleteColumn'
    | 'addRowBefore'
    | 'addRowAfter'
    | 'deleteRow'
    | 'mergeCells'
    | 'splitCell'
    | 'mergeOrSplit'
    | 'toggleHeaderColumn'
    | 'toggleHeaderRow'
    | 'toggleHeaderCell'
    | 'cellattribute'
    | 'fixTables'
    | 'goToPreviousCell'
    | 'goToNextCell';
}

export interface GroupEditorBasicProps {
  editor: Editor | null;
  showToolbar?: boolean;
}

// undoredo
export interface UndoRedoProps extends HTMLButtonAttributes {
  editor: Editor | null;
  action: 'undo' | 'redo';
  buttonClass?: ClassValue;
  iconClass?: ClassValue;
}

// groups
export interface GroupFormatProps {
  editor: Editor | null;
  showToolbar?: boolean;
}

// video
export interface VideoProps extends EditorBasicProps {
  tooltipText?: string;
  ariaLabel?: string;
  id?: string;
}

// videoadvanced
export interface VideoAdvancedProps extends VideoProps {
  videoUrl?: string;
  videoWidth?: number | undefined;
  videoHeight?: number | undefined;
  modalTitle?: string;
  modalSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  formId?: string;
  modalChildren?: Snippet;
}
