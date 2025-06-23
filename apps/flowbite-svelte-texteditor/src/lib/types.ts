import type { Editor } from '@tiptap/core';
import { type ClassValue } from 'clsx';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

// TextEditor
export interface EditorProviderProps {
  children?: Snippet;
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

// group
export interface GroupFormatProps {
  editor: Editor | null;
  showToolbar?: boolean;
}

// alignment
export interface AlignmentButtonProps extends EditorBasicProps {
  alignment: 'left' | 'center' | 'right' | 'justify';
}

export interface AlignmentButtonGroupProps extends GroupFormatProps {
  left?: boolean;
  right?: boolean;
  center?: boolean;
  justify?: boolean;
}

// details
export interface DetailsButtonProps extends EditorBasicProps {
  action: 'set' | 'unset';
}

export interface DetailsButtonGroupProps extends GroupFormatProps {
  set?: boolean;
  unset?: boolean;
}

// export
export interface ExportButtonProps extends EditorBasicProps {
  format?: 'json' | 'html';
}

export interface ExportButtonGroupProps extends GroupFormatProps {
  json?: boolean;
  html?: boolean;
}

// format
export interface FormatButtonProps extends EditorBasicProps {
  format: 'bold' | 'code' | 'highlight' | 'italic' | 'link' | 'removeLink' | 'strike' | 'subscript' | 'superscript' | 'underline' | 'br';
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
  br?: boolean;
}

// font
export interface FontButtonProps extends EditorBasicProps {
  format: 'fontFamily' | 'fontSize' | 'textColor';
  colorValue?: string;
}

export interface FontButtonGroupProps extends GroupFormatProps {
  fontFamily?: boolean;
  fontSize?: boolean;
  textColor?: boolean;
}

// heading
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingButtonGroupProps extends GroupFormatProps {
  fontFamily?: boolean;
  fontSize?: boolean;
  textColor?: boolean;
}

// image
export interface ImageButtonsProps extends EditorBasicProps {
  format?: 'basic' | 'advanced';
  imageUrl?: string;
  imageAlt?: string;
  imageTitle?: string;
  onAdvancedClick?: () => void;
}

export interface ImageButtonGroupProps extends GroupFormatProps {
  basic?: boolean;
  advanced?: boolean;
}

// list
export interface ListButtonProps extends EditorBasicProps {
  format: 'bullet' | 'ordered';
}

export interface ListButtonGroupProps extends GroupFormatProps {
  bullet?: boolean;
  ordered?: boolean;
}

// table
export interface TableButtonProps extends EditorBasicProps {
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

// task list
export interface TaskListButtonProps extends EditorBasicProps {
  action: 'toggle' | 'split' | 'sink' | 'lift';
}

export interface TaskListButtonGroupProps extends GroupFormatProps {
  toggle?: boolean;
  split?: boolean;
  sink?: boolean;
  lift?: boolean;
}

// video
export interface VideoButtonProps extends EditorBasicProps {
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

export interface VideoButtonGroupProps extends GroupFormatProps {
  basic?: boolean;
  advanced?: boolean;
}

// undoredo
export interface UndoRedoProps extends HTMLButtonAttributes {
  editor: Editor | null;
  action: 'undo' | 'redo';
  buttonClass?: ClassValue;
  iconClass?: ClassValue;
}

export interface UndoRedoButtonGroupProps extends GroupFormatProps {
  undo?: boolean;
  redo?: boolean;
}

// groupcustom
export interface GroupEditorBasicProps {
  editor: Editor | null;
  showToolbar?: boolean;
}

// layout
export interface LayoutButtonGroupProps extends GroupFormatProps {
  blockquote?: boolean;
  codeblock?: boolean;
  hr?: boolean;
}

export interface LayoutButtonProps extends EditorBasicProps {
  format: 'blockquote' | 'codeblock' | 'hr';
}

// source
export interface SourceButtonGroupProps extends GroupFormatProps {
  source?: boolean;
  html?: boolean;
}
