import type { Editor, FocusPosition } from '@tiptap/core';
import { type ClassValue } from 'clsx';
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes, HTMLAttributes } from 'svelte/elements';
import type { BlockquoteOptions } from '@tiptap/extension-blockquote';
import type { BulletListOptions } from '@tiptap/extension-list';
import type { CodeBlockLowlightOptions } from '@tiptap/extension-code-block-lowlight';
import type { DetailsOptions } from '@tiptap/extension-details';
import type { DetailsContentOptions } from '@tiptap/extension-details';
import type { DetailsSummaryOptions } from '@tiptap/extension-details';
import type { EmojiOptions } from '@tiptap/extension-emoji';
import type { HardBreakOptions } from '@tiptap/extension-hard-break';
import type { HeadingOptions } from '@tiptap/extension-heading';
import type { HorizontalRuleOptions } from '@tiptap/extension-horizontal-rule';
import type { ImageOptions, SetImageOptions } from '@tiptap/extension-image';
import type { ListItemOptions } from '@tiptap/extension-list';
import type { MathematicsOptions } from '@tiptap/extension-mathematics';
import type { MentionOptions } from '@tiptap/extension-mention';
import type { OrderedListOptions } from '@tiptap/extension-list';
import type { ParagraphOptions } from '@tiptap/extension-paragraph';
import type { TableKitOptions } from '@tiptap/extension-table';
import type { TaskListOptions, TaskItemOptions } from '@tiptap/extension-list';
import type { YoutubeOptions } from '@tiptap/extension-youtube';
// marks
import type { BoldOptions } from '@tiptap/extension-bold';
import type { CodeOptions } from '@tiptap/extension-code';
import type { HighlightOptions } from '@tiptap/extension-highlight';
import type { ItalicOptions } from '@tiptap/extension-italic';
import type { LinkOptions } from '@tiptap/extension-link';
import type { StrikeOptions } from '@tiptap/extension-strike';
import type { SubscriptExtensionOptions } from '@tiptap/extension-subscript';
import type { SuperscriptExtensionOptions } from '@tiptap/extension-superscript';
import type { UnderlineOptions } from '@tiptap/extension-underline';
// functionality
import type { BubbleMenuOptions } from '@tiptap/extension-bubble-menu';
import type { CharacterCountOptions } from '@tiptap/extension-character-count';
import type { DragHandlePluginProps } from '@tiptap/extension-drag-handle';
import type { BackgroundColorOptions } from '@tiptap/extension-text-style';
import type { ColorOptions } from '@tiptap/extension-text-style';
import type { DragHandleOptions } from '@tiptap/extension-drag-handle';
import type { DropcursorOptions } from '@tiptap/extensions';
import type { FileHandlerOptions } from '@tiptap/extension-file-handler';
import type { FloatingMenuOptions } from '@tiptap/extension-floating-menu';
import type { FocusOptions } from '@tiptap/extensions';
import type { FontFamilyOptions } from '@tiptap/extension-text-style';
import type { FontSizeOptions } from '@tiptap/extension-text-style';
import type { InvisibleCharactersOptions } from '@tiptap/extension-invisible-characters';
import type { LineHeightOptions } from '@tiptap/extension-text-style';
import type { ListKeymapOptions } from '@tiptap/extension-list';
import type { PlaceholderOptions } from '@tiptap/extensions';
import type { SelectionOptions } from '@tiptap/extensions';
import type { TableOfContentsOptions } from '@tiptap/extension-table-of-contents';
import type { TextStyleKitOptions } from '@tiptap/extension-text-style';
import type { TextAlignOptions } from '@tiptap/extension-text-align';
import type { TrailingNodeOptions } from '@tiptap/extensions';
import type { TypographyOptions } from '@tiptap/extension-typography';
import type { UndoRedoOptions } from '@tiptap/extensions';

// TextEditor
export interface BubbleMenuConfig {
  showUnderline?: boolean;
  showHighlight?: boolean;
  showBold?: boolean;
  showItalic?: boolean;
  showStrike?: boolean;
}

export interface FloatingMenuConfig {
  headingsOnly?: boolean;
  showHeadings?: boolean;
  showList?: boolean;
  showCodeBlock?: boolean;
  showQuote?: boolean;
  showHorizontalRule?: boolean;
  showTable?: boolean;
  showTasks?: boolean;
  showImage?: boolean;
}

// EditorConfig
export interface EditorExtensionConfigs {
  // nodes
  blockquoteOptions?: Partial<BlockquoteOptions>;
  bulletListOptions?: Partial<BulletListOptions>;
  codeBlockLowlightOptions?: Partial<CodeBlockLowlightOptions>;
  detailsOptions?: Partial<DetailsOptions>;
  detailsContentOptions?: Partial<DetailsContentOptions>;
  detailsSummaryOptions?: Partial<DetailsSummaryOptions>;
  emojiOptions?: Partial<EmojiOptions>;
  hardBreakOptions?: Partial<HardBreakOptions>;
  headingOptions?: Partial<HeadingOptions>;
  horizontalRuleOptions?: Partial<HorizontalRuleOptions>;
  imageOptions?: Partial<ImageOptions>;
  listItemOptions?: Partial<ListItemOptions>;
  mathematicsOptions?: Partial<MathematicsOptions>;
  mentionOptions?: Partial<MentionOptions>;
  orderedListOptions?: Partial<OrderedListOptions>;
  paragraphOptions?: Partial<ParagraphOptions>;
  tableKitOptions?: Partial<TableKitOptions>;
  taskListOptions?: Partial<TaskListOptions>;
  taskItemOptions?: Partial<TaskItemOptions>;
  youtubeOptions?: Partial<YoutubeOptions>;
  // marks
  boldOptions?: Partial<BoldOptions>;
  codeOptions?: Partial<CodeOptions>;
  highlightOptions?: Partial<HighlightOptions>;
  italicOptions?: Partial<ItalicOptions>;
  linkOptions?: Partial<LinkOptions>;
  strikeOptions?: Partial<StrikeOptions>;
  subscriptOptions?: Partial<SubscriptExtensionOptions>;
  superscriptOptions?: Partial<SuperscriptExtensionOptions>;
  underlineOptions?: Partial<UnderlineOptions>;
  // functionality
  bubbleMenuOptions?: Partial<BubbleMenuOptions>;
  characterCountOptions?: Partial<CharacterCountOptions>;
  backgroundColorOptions?: Partial<BackgroundColorOptions>;
  colorOptions?: Partial<ColorOptions>;
  dragHandleOptions?: Partial<DragHandleOptions>;
  dropcursorOptions?: Partial<DropcursorOptions>;
  fileHandlerOptions?: Partial<FileHandlerOptions>;
  floatingMenuOptions?: Partial<FloatingMenuOptions>;
  focusOptions?: Partial<FocusOptions>;
  fontFamilyOptions?: Partial<FontFamilyOptions>;
  fontSizeOptions?: Partial<FontSizeOptions>;
  invisibleCharactersOptions?: Partial<InvisibleCharactersOptions>;
  lineHeightOptions?: Partial<LineHeightOptions>;
  listKeymapOptions?: Partial<ListKeymapOptions>;
  placeholderOptions?: Partial<PlaceholderOptions>;
  selectionOptions?: Partial<SelectionOptions>;
  tableOfContentsOptions?: Partial<TableOfContentsOptions>;
  textStyleKitOptions?: Partial<TextStyleKitOptions>;
  textAlignOptions?: Partial<TextAlignOptions>;
  trailingNodeOptions?: Partial<TrailingNodeOptions>;
  typographyOptions?: Partial<TypographyOptions>;
  undoRedoOptions?: Partial<UndoRedoOptions>;
}

// TextEditor
export interface EditorProviderProps {
  children?: Snippet;
  footer?: Snippet;
  element?: HTMLDivElement | null;
  content?: string;
  editorClass?: string;
  editor?: Editor | null;
  emoji?: boolean;
  class?: ClassValue;
  mentions?: string[];
  math?: boolean;
  limit?: number;
  file?: boolean;
  bubbleMenu?: boolean | BubbleMenuConfig;
  floatingMenu?: boolean | FloatingMenuConfig;
  placeholder?: string;
  summary?: string;
  detailsPlaceholder?: string;
  draghandle?: boolean;
  draghandleprops?: DragHandleProps;
  toc?: boolean;
  contentprops?: ContentProps;
  isEditable?: boolean;
  autofocusPosition?: FocusPosition;
}

type ContentProps = {
  containerClass?: ClassValue;
  contentClass?: ClassValue;
  id?: string;
  dataToc?: string;
};

// wrappers
export interface ContentWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
  contentprops?: ContentProps;
}

type ToolbarRawProps = {
  containerClass?: ClassValue;
  contentClass?: ClassValue;
  id?: string;
  top?: boolean;
};
export interface ToolbarRowWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: Snippet;
  toolbarrawprops?: ToolbarRawProps;
}

export interface EditorWrapperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
  id?: string;
  children: Snippet;
  class?: ClassValue;
}

export interface ToolbarWrapperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
  children: Snippet;
  class?: ClassValue;
}

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  divClass?: ClassValue;
  spanClass?: ClassValue;
}
// end of wrappers

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
// Bubble menu
export interface BubbleMenuProps extends BubbleMenuConfig {
  editor: Editor | null;
}

// drag handle
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type DragHandleProps = (Omit<Optional<DragHandlePluginProps, 'pluginKey'>, 'element'> & {
  class?: string;
  onNodeChange?: (data: { node: Node | null; editor: Editor; pos: number }) => void;
  ariaLabel?: string;
}) &
  Omit<HTMLAttributes<HTMLDivElement>, 'class'>;

// editable
export type EditableContext = {
  isEditable: boolean;
};

// Floating menu
export interface FloatingMenuProps extends FloatingMenuConfig {
  editor: Editor | null;
}

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

export interface ImageButtonsProps extends EditorBasicProps {
  format?: ImageFormat;
  imageOptions?: Partial<SetImageOptions>;
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
// import type { LayoutStateConfigType } from './layout/layoutState.svelte';
export type LayoutAction = 'blockquote' | 'codeblock' | 'hr';

export interface LayoutButtonProps extends EditorBasicProps {
  blockquoteOptions?: BlockquoteOptions;
  codeblockOptions?: CodeBlockLowlightOptions;
  hrOptions?: HorizontalRuleOptions;
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
export interface InsertHtmlCodeButtonProps {
  editor: Editor | null;
  tooltipText?: string;
  ariaLabel?: string;
  id?: string;
  class?: string;
}

export interface SourceToggleButtonProps {
  editor: Editor | null;
  tooltipText?: string;
  ariaLabel?: string;
  id?: string;
  class?: string;
}

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
export interface YoutubeButtonProps extends EditorBasicProps {
  format?: VideoAction;
  onAdvancedClick?: () => void;
  modalTitle?: string;
  modalSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  formId?: string;
  modalChildren?: Snippet;
  videoOptions?: VideoOptions;
}

export interface YoutubeButtonGroupProps extends GroupFormatProps {
  basic?: boolean;
  advanced?: boolean;
}

// groupcustom
export interface GroupEditorBasicProps {
  editor: Editor | null;
  showToolbar?: boolean;
}
