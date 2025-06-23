import type { Editor } from '@tiptap/core';
import { type ClassValue } from 'clsx';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

export interface AlignmentButtonsProps extends EditorBasicProps {
  alignment: 'left' | 'center' | 'right' | 'justify';
}

export interface ExportButtonsProps extends EditorBasicProps {
  format?: 'json' | 'html';
}

export interface FomatButtonsProps extends EditorBasicProps {
  format: 'bold' | 'code' | 'highlight' | 'italic' | 'link' | 'removeLink' | 'strike' | 'subscript' | 'superscript' | 'underline';
}

export interface FontButtonsProps extends EditorBasicProps {
  format: 'fontFamily' | 'fontSize' | 'textColor';
  colorValue?: string;
}

export interface ImageButtonsProps extends EditorBasicProps {
  format?: 'default' | 'advanced';
  imageUrl?: string;
  imageAlt?: string;
  imageTitle?: string;
  onAdvancedClick?: () => void;
}

export interface ListButtonsProps extends EditorBasicProps {
  format: 'bullet' | 'ordered';
}

export interface LayoutButtonsProps extends EditorBasicProps {
  format: 'blockquote' | 'codeblock' | 'hr';
}

export interface TableButtonsProps extends EditorBasicProps {
  action?:
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
    // | 'cellattribute'
    | 'fixTables'
    | 'goToPreviousCell'
    | 'goToNextCell';
}

export interface VideoButtonsProps extends EditorBasicProps {
  format?: 'default' | 'advanced';
  onAdvancedClick?: () => void;
  videoUrl?: string;
  videoWidth?: number | undefined;
  videoHeight?: number | undefined;
  modalTitle?: string;
  modalSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  formId?: string;
  modalChildren?: Snippet;
}

//  defaults
export interface EditorProviderProps {
  element?: HTMLDivElement | null;
  content?: string;
  editorClass?: string;
  editor?: Editor | null;
  showSourceButton?: boolean;
}

export interface EditorBasicProps extends Omit<HTMLButtonAttributes, 'class'> {
  editor: Editor | null;
  class?: ClassValue;
  tooltipText?: string;
  ariaLabel?: string;
  id?: string;
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
