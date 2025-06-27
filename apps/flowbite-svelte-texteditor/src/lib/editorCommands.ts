import type { Editor } from '@tiptap/core';

export function runFormatCommand(
  editor: Editor | null,
  format: FormatAction,
  options?: any
) {
  if (!editor) return;
  const command = editorCommands[format];
  if (command) {
    command(editor, options);
  }
}

export type FormatAction =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'highlight'
  | 'code'
  | 'subscript'
  | 'superscript'
  | 'br'
  | 'link'
  | 'removeLink'
  | 'blockquote'
  | 'codeblock'
  | 'hr';

type EditorCommand = (editor: Editor, options?: any) => void;

export const editorCommands: Record<FormatAction, EditorCommand> = {
  bold: (editor) => editor.chain().focus().toggleBold().run(),
  italic: (editor) => editor.chain().focus().toggleItalic().run(),
  underline: (editor) => editor.chain().focus().toggleUnderline().run(),
  strike: (editor) => editor.chain().focus().toggleStrike().run(),
  highlight: (editor) => editor.chain().focus().toggleHighlight().run(),
  code: (editor) => editor.chain().focus().toggleCode().run(),
  subscript: (editor) => editor.chain().focus().toggleSubscript().run(),
  superscript: (editor) => editor.chain().focus().toggleSuperscript().run(),
  br: (editor) => editor.chain().focus().setHardBreak().run(),
  link: (editor, options) =>
    editor.chain().focus().toggleLink({ href: options?.href }).run(),
  removeLink: (editor) => editor.chain().focus().unsetLink().run(),
  blockquote: (editor) => editor.chain().focus().toggleBlockquote().run(),
  codeblock: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  hr: (editor) => editor.chain().focus().setHorizontalRule().run(),
};

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

type TableCommand = (editor: Editor) => void;

export const tableCommands: Record<TableAction, TableCommand> = {
  table: (editor) =>
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  deleteTable: (editor) => editor.chain().focus().deleteTable().run(),
  addColumnBefore: (editor) => editor.chain().focus().addColumnBefore().run(),
  addColumnAfter: (editor) => editor.chain().focus().addColumnAfter().run(),
  deleteColumn: (editor) => editor.chain().focus().deleteColumn().run(),
  addRowBefore: (editor) => editor.chain().focus().addRowBefore().run(),
  addRowAfter: (editor) => editor.chain().focus().addRowAfter().run(),
  deleteRow: (editor) => editor.chain().focus().deleteRow().run(),
  mergeCells: (editor) => editor.chain().focus().mergeCells().run(),
  splitCell: (editor) => editor.chain().focus().splitCell().run(),
  mergeOrSplit: (editor) => editor.chain().focus().mergeOrSplit().run(),
  toggleHeaderColumn: (editor) => editor.chain().focus().toggleHeaderColumn().run(),
  toggleHeaderRow: (editor) => editor.chain().focus().toggleHeaderRow().run(),
  toggleHeaderCell: (editor) => editor.chain().focus().toggleHeaderCell().run(),
  fixTables: (editor) => editor.chain().focus().fixTables().run(),
  goToPreviousCell: (editor) => editor.chain().focus().goToPreviousCell().run(),
  goToNextCell: (editor) => editor.chain().focus().goToNextCell().run(),
};

export function runTableCommand(
  editor: Editor | null,
  action: TableAction
) {
  if (!editor) return;
  const command = tableCommands[action];
  command?.(editor);
}

// undoredo

export type UndoRedoAction = 'undo' | 'redo';

export const undoRedoCommands: Record<UndoRedoAction, (editor: Editor) => void> = {
  undo: (editor) => editor.chain().focus().undo().run(),
  redo: (editor) => editor.chain().focus().redo().run(),
};

export function runUndoRedoCommand(
  editor: Editor | null,
  action: UndoRedoAction
) {
  if (!editor) return;
  const command = undoRedoCommands[action];
  command?.(editor);
}
