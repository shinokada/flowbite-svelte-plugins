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

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface ImageButtonsProps extends EditorBasicProps {
  format?: 'basic' | 'advanced';
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

// undoredo
export interface UndoRedoProps extends HTMLButtonAttributes {
  editor: Editor | null;
  action: 'undo' | 'redo';
  buttonClass?: ClassValue;
  iconClass?: ClassValue;
}

// groups
export interface GroupEditorBasicProps {
  editor: Editor | null;
  showToolbar?: boolean;
}
export interface GroupFormatProps {
  editor: Editor | null;
  showToolbar?: boolean;
}

export interface AlignmentButtonGroupProps extends GroupFormatProps {
  left?: boolean;
  right?: boolean;
  center?: boolean;
  justify?: boolean;
}

export interface ExportButtonGroupProps extends GroupFormatProps {
  json?: boolean;
  html?: boolean;
}

export interface FormatButtonGroupProps extends GroupFormatProps {
  bold?: boolean;
  code?: boolean;
  highlight?: boolean;
  italic?: boolean;
  link?: boolean;
  removeLink?: boolean;
  strike?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  underline?: boolean;
}

export interface ImageButtonGroupProps extends GroupFormatProps {
  basic?: boolean;
  advanced?: boolean;
}

export interface HeadingButtonGroupProps extends GroupFormatProps {
  fontFamily?: boolean;
  fontSize?: boolean;
  textColor?: boolean;
}

export interface LayoutButtonGroupProps extends GroupFormatProps {
  blockquote?: boolean;
  codeblock?: boolean;
  hr?: boolean;
}

export interface ListButtonGroupProps extends GroupFormatProps {
  bullet?: boolean;
  ordered?: boolean;
}

export interface SourceButtonGroupProps extends GroupFormatProps {
  source?: boolean;
  html?: boolean;
}

export interface TableButtonGroupProps extends GroupFormatProps {
  table?: boolean;
  deleteTable?: boolean;
  addColumnBefore?: boolean;
  addColumnAfter?: boolean;
  deleteColumn?: boolean;
  addRowBefore?: boolean;
  addRowAfter?: boolean;
  deleteRow?: boolean;
  mergeCells?: boolean;
  splitCell?: boolean;
  mergeOrSplit?: boolean;
  toggleHeaderColumn?: boolean;
  toggleHeaderRow?: boolean;
  toggleHeaderCell?: boolean;
  fixTables?: boolean;
  goToPreviousCell?: boolean;
  goToNextCell?: boolean;
}

export interface UndoRedoButtonGroupProps extends GroupFormatProps {
  undo?: boolean;
  redo?: boolean;
}

export interface VideoButtonGroupProps extends GroupFormatProps {
  basic?: boolean;
  advanced?: boolean;
}
