import type { Editor } from '@tiptap/core';
import { type ClassValue } from 'clsx';
  
export interface EditorProviderProps {
  element?: HTMLDivElement | null;
  content?: string;
  editorClass?: string;
  editor?: Editor | null;
}

export interface EditorBasicProps {
  editor: Editor | null;
  class?: ClassValue
}

export interface AlignmentButtonProps {
  editor: Editor | null;
  alignment: 'left' | 'center' | 'right' | 'justify';
  tooltipText: string;
  buttonId: string;
  ariaLabel: string;
  class?: ClassValue;
}

export interface GroupEditorBasicProps {
  editor: Editor | null;
  showToolbar?: boolean;
}

// format
export interface FormatButtonProps {
  editor: Editor | null;
  format: 'bold' | 'italic' | 'underline' | 'strike' | 'highlight' | 'code' | 'link' | 'removeLink' | 'subscript' | 'superscript';
  tooltipText: string;
  buttonId: string;
  ariaLabel: string;
  class?: ClassValue;
}

// layout
export interface LayoutButtonProps {
  editor: Editor | null;
  format: 'blockquote' | 'codeblock' | 'horizontalrule' ;
  tooltipText: string;
  buttonId: string;
  ariaLabel: string;
  class?: ClassValue;
}

// table
export interface TableButtonProps {
  editor: Editor | null;
  format: 'table' | 'deleteTable' | 'addColumnBefore' | 'addColumnAfter' | 'deleteColumn' | 'addRowBefore' | 'addRowAfter' | 'deleteRow' | 'mergeCells' | 'splitCell' | 'mergeOrSplit' | 'toggleHeaderColumn' | 'toggleHeaderRow' | 'toggleHeaderCell' | 'cellattribute' | 'fixTables' | 'goToPreviousCell' | 'goToNextCell';
  tooltipText: string;
  buttonId: string;
  ariaLabel: string;
  class?: ClassValue;
}

// undoredo
export interface UndoRedoProps {
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