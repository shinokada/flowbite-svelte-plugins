import type { Editor } from '@tiptap/core';
import type { AlignmentAction, DetailsAction, ExportAction } from './types';

// alignment
export function runAlignmentCommand(
  editor: Editor | null,
  alignment: AlignmentAction
) {
  if (!editor) return;
  editor.chain().focus().setTextAlign(alignment).run();
}

// details
const detailsCommands: Record<DetailsAction, (editor: Editor) => void> = {
  set: (editor) => editor.chain().focus().setDetails().run(),
  unset: (editor) => editor.chain().focus().unsetDetails().run(),
};

export function runDetailsCommand(
  editor: Editor | null,
  action: DetailsAction
) {
  if (!editor) return;
  detailsCommands[action](editor);
}

// export
export function exportEditorContent(editor: Editor | null, format: ExportAction): string {
  if (!editor) return 'No content available';

  switch (format) {
    case 'json': {
      const jsonData = editor.getJSON();
      return escapeHTML(JSON.stringify(jsonData, null, 2));
    }
    case 'html': {
      const htmlData = editor.getHTML();
      return escapeHTML(htmlData);
    }
    default:
      return 'Unsupported format';
  }
}

function escapeHTML(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// font
export function setFontFamily(editor: Editor | null, fontFamily: string) {
  if (!editor) return;
  if (fontFamily === 'Inter, ui-sans-serif, system-ui, sans-serif') {
    editor.chain().focus().unsetFontFamily().run();
  } else {
    editor.chain().focus().setFontFamily(fontFamily).run();
  }
}

export function setFontSize(editor: Editor | null, fontSize: string) {
  if (!editor) return;
  editor.chain().focus().setMark('textStyle', { fontSize }).run();
}

export function removeFontSizeFormatting(editor: Editor | null) {
  if (!editor) return;
  editor.chain().focus().unsetMark('textStyle').run();
}

export function setTextColor(editor: Editor | null, color: string) {
  if (!editor) return;
  editor.chain().focus().setColor(color).run();
}

export function removeTextColorFormatting(editor: Editor | null) {
  if (!editor) return;
  editor.chain().focus().unsetColor().run();
}

// format
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

type FormatCommand = (editor: Editor, options?: any) => void;

export const formatCommands: Record<FormatAction, FormatCommand> = {
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

export function runFormatCommand(
  editor: Editor | null,
  format: FormatAction,
  options?: any
) {
  if (!editor) return;
  const command = formatCommands[format];
  if (command) {
    command(editor, options);
  }
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
