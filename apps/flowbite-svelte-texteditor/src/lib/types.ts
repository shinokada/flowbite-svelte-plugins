import type { Editor } from '@tiptap/core';
import { type ClassValue } from 'clsx';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

// TextEditor
export interface EditorProviderProps {
  children?: Snippet;
  footer?: Snippet;
  element?: HTMLDivElement | null;
  content?: string;
  editorClass?: string;
  editor?: Editor | null;
  showSourceButton?: boolean;
  emoji?: boolean;
  class?: ClassValue;
  mentions?: string[];
  bubbleMenu?: boolean;
  floatingMenu?: boolean;
  math?: boolean;
  limit?: number;
  file?: boolean;
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

// Floating menu
export interface TiptapNodeViewContext {
  onDragStart: (event: DragEvent) => void;
}

export type ComponentInputProps<T> = Partial<T> & {
  editor: Editor;
  class?: string;
  children?: Snippet;
};

// alignment
export type AlignmentAction = 'left' | 'center' | 'right' | 'justify';

export interface AlignmentButtonProps extends EditorBasicProps {
  alignment: AlignmentAction;
}

export interface AlignmentButtonGroupProps extends GroupFormatProps {
  left?: boolean;
  right?: boolean;
  center?: boolean;
  justify?: boolean;
}

// character count
export interface CharacterCountProps {
  editor: Editor | null;
  limit: number;
  showWords?: boolean;
  showCircle?: boolean;
  class?: string;
}

// details
export type DetailsAction = 'set' | 'unset';

export interface DetailsButtonProps extends EditorBasicProps {
  action: DetailsAction;
}

export interface DetailsButtonGroupProps extends GroupFormatProps {
  set?: boolean;
  unset?: boolean;
}

// export
export type ExportAction = 'json' | 'html';
export interface ExportButtonProps extends EditorBasicProps {
  format?: ExportAction;
}

export interface ExportButtonGroupProps extends GroupFormatProps {
  json?: boolean;
  html?: boolean;
}

// font
export type FontFormat = 'fontFamily' | 'fontSize' | 'textColor';
export interface FontButtonProps extends EditorBasicProps {
  format: FontFormat;
  colorValue?: string;
}

export interface FontButtonGroupProps extends GroupFormatProps {
  fontFamily?: boolean;
  fontSize?: boolean;
  textColor?: boolean;
}

// format
export type FormatAction = 'bold' | 'code' | 'highlight' | 'italic' | 'link' | 'removeLink' | 'strike' | 'subscript' | 'superscript' | 'underline' | 'br';
export interface FormatButtonProps extends EditorBasicProps {
  format: FormatAction;
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

// heading
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingButtonGroupProps extends GroupFormatProps {
  fontFamily?: boolean;
  fontSize?: boolean;
  textColor?: boolean;
}

// image
export type ImageFormat = 'basic' | 'advanced';
export interface ImageOptions {
  src: string;
  alt?: string;
  title?: string;
}

export interface ImageButtonsProps extends EditorBasicProps {
  format?: ImageFormat;
  imageOptions?: Partial<ImageOptions>;
  onAdvancedClick?: () => void;
}

export interface ImageButtonGroupProps extends GroupFormatProps {
  basic?: boolean;
  advanced?: boolean;
}

// invisible
export type InvisibleAction = 'toggle' | 'show' | 'hide';

export interface InvisibleButtonProps extends EditorBasicProps {
  action: InvisibleAction;
}

export interface InvisibleButtonGroupProps extends GroupFormatProps {
  toggle?: boolean;
  show?: boolean;
  hide?: boolean;
}

// layout
export type LayoutAction = 'blockquote' | 'codeblock' | 'hr';
export interface LayoutButtonProps extends EditorBasicProps {
  format: LayoutAction;
}
export interface LayoutButtonGroupProps extends GroupFormatProps {
  blockquote?: boolean;
  codeblock?: boolean;
  hr?: boolean;
}

// list
export type ListAction = 'bullet' | 'ordered';
export interface ListButtonProps extends EditorBasicProps {
  format: ListAction;
}

export interface ListButtonGroupProps extends GroupFormatProps {
  bullet?: boolean;
  ordered?: boolean;
}

// source
export interface SourceButtonGroupProps extends GroupFormatProps {
  source?: boolean;
  html?: boolean;
}

// table
export type TableAction =
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
  | 'fixTables'
  | 'goToPreviousCell'
  | 'goToNextCell';

export interface TableButtonProps extends EditorBasicProps {
  action?: TableAction;
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
export type TaskAction = 'toggle' | 'split' | 'sink' | 'lift';
export interface TaskListButtonProps extends EditorBasicProps {
  action: TaskAction;
}

export interface TaskListButtonGroupProps extends GroupFormatProps {
  toggle?: boolean;
  split?: boolean;
  sink?: boolean;
  lift?: boolean;
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

// video
export interface VideoOptions {
  url?: string;
  width?: number;
  height?: number;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
}
export type VideoAction = 'default' | 'advanced';
export interface VideoButtonProps extends EditorBasicProps {
  format?: VideoAction;
  onAdvancedClick?: () => void;
  modalTitle?: string;
  modalSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  formId?: string;
  modalChildren?: Snippet;
  videoOptions?: VideoOptions;
}

export interface VideoButtonGroupProps extends GroupFormatProps {
  basic?: boolean;
  advanced?: boolean;
}

// groupcustom
export interface GroupEditorBasicProps {
  editor: Editor | null;
  showToolbar?: boolean;
}
