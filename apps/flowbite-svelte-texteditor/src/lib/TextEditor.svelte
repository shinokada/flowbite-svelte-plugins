<script module>
  import { writable } from 'svelte/store';
  import type { TableOfContentData } from '@tiptap/extension-table-of-contents';

  export const tocItems = writable<TableOfContentData>([]);
</script>

<script lang="ts">
  import { onDestroy, setContext, getContext } from 'svelte';
  import { type EditorProviderProps, EditorWrapper, ContentWrapper, ToolbarWrapper, SvelteRenderer, BubbleMenu, FloatingMenu, getMenuConfig, DragHandle, Toc, cn, type EditableContext, type EditorExtensionConfigs } from '$lib';
  import { Editor } from '@tiptap/core';
  import type { Extensions } from '@tiptap/core';
  import { Blockquote } from '@tiptap/extension-blockquote';
  import { Bold } from '@tiptap/extension-bold';
  import { Code } from '@tiptap/extension-code';
  import { Document } from '@tiptap/extension-document';
  import { HardBreak } from '@tiptap/extension-hard-break';
  import { Heading } from '@tiptap/extension-heading';
  import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
  import { Italic } from '@tiptap/extension-italic';
  import { Link } from '@tiptap/extension-link';
  import { BulletList, ListItem, ListKeymap, ListKit, OrderedList } from '@tiptap/extension-list';
  import { Paragraph } from '@tiptap/extension-paragraph';
  import { Strike } from '@tiptap/extension-strike';
  import { Text } from '@tiptap/extension-text';
  import { Underline } from '@tiptap/extension-underline';
  import { TrailingNode, UndoRedo } from '@tiptap/extensions';
  // end of starter-kit

  // functionality
  import CharacterCount from '@tiptap/extension-character-count';
  import Color from '@tiptap/extension-color';
  import Details from '@tiptap/extension-details';
  import DetailsContent from '@tiptap/extension-details-content';
  import DetailsSummary from '@tiptap/extension-details-summary';
  import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
  import FileHandler from '@tiptap/extension-file-handler';
  import Focus from '@tiptap/extension-focus';
  import FontFamily from '@tiptap/extension-font-family';
  import Typography from '@tiptap/extension-typography';
  // import HardBreak from '@tiptap/extension-hard-break';
  import Highlight from '@tiptap/extension-highlight';
  import InvisibleCharacters from '@tiptap/extension-invisible-characters';
  // import Link from '@tiptap/extension-link';
  import Image from '@tiptap/extension-image';
  import { Mathematics } from '@tiptap/extension-mathematics';
  import NodeRange from '@tiptap/extension-node-range';
  import Placeholder from '@tiptap/extension-placeholder';
  import Subscript from '@tiptap/extension-subscript';
  import Superscript from '@tiptap/extension-superscript';
  import TaskList from '@tiptap/extension-task-list';
  import TaskItem from '@tiptap/extension-task-item';
  import { BackgroundColor, LineHeight, TextStyle } from '@tiptap/extension-text-style';
  import { TableKit } from '@tiptap/extension-table';
  import TextAlign from '@tiptap/extension-text-align';
  import Youtube from '@tiptap/extension-youtube';
  import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
  import { common, createLowlight } from 'lowlight';
  import emojiSuggestion from './emoji/emojiSuggestion';
  import Mention from '@tiptap/extension-mention';
  import { createMentionSuggestion } from './mention/mentionSuggestion';
  import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
  import { FloatingMenuPlugin } from '@tiptap/extension-floating-menu';
  import TableOfContents, { getHierarchicalIndexes } from '@tiptap/extension-table-of-contents';

  let {
    content,
    editorClass = 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none',
    editor = $bindable<Editor | null>(null),
    children,
    footer,
    emoji = true,
    class: className,
    mentions,
    bubbleMenu = false,
    floatingMenu = false,
    math = false,
    limit,
    file,
    placeholder = 'Write something ...',
    summary = 'Summary',
    detailsPlaceholder = 'Add details content...',
    draghandle,
    draghandleprops,
    toc,
    contentprops,
    isEditable = true,
    autofocusPosition = false
  }: EditorProviderProps = $props();

  const editableContext: EditableContext = {
    get isEditable() {
      return isEditable;
    }
  };
  setContext('isEditable', editableContext);

  const extensionConfigs = getContext<EditorExtensionConfigs>('editorExtensionConfigs') || {};

  const {
    blockquoteOptions,
    bulletListOptions,
    codeBlockLowlightOptions,
    detailsOptions,
    detailsContentOptions,
    detailsSummaryOptions,
    emojiOptions,
    hardBreakOptions,
    headingOptions,
    horizontalRuleOptions,
    imageOptions,
    listItemOptions,
    mathematicsOptions,
    mentionOptions,
    orderedListOptions,
    paragraphOptions,
    tableKitOptions,
    taskListOptions,
    taskItemOptions,
    youtubeOptions,
    // marks
    boldOptions,
    codeOptions,
    highlightOptions,
    italicOptions,
    linkOptions,
    strikeOptions,
    subscriptOptions,
    superscriptOptions,
    underlineOptions,
    // functionality
    bubbleMenuOptions,
    characterCountOptions,
    backgroundColorOptions,
    colorOptions,
    dragHandleOptions,
    dropcursorOptions,
    fileHandlerOptions,
    floatingMenuOptions,
    focusOptions,
    fontFamilyOptions,
    fontSizeOptions,
    invisibleCharactersOptions,
    lineHeightOptions,
    listKeymapOptions,
    placeholderOptions,
    selectionOptions,
    tableOfContentsOptions,
    textStyleKitOptions,
    textAlignOptions,
    trailingNodeOptions,
    typographyOptions,
    undoRedoOptions
  } = extensionConfigs;

  let editorElement = $state<HTMLDivElement | null>(null);
  // for bubble menu
  let bubbleElement: HTMLDivElement | null = null;
  let bubbleMenuRenderer: SvelteRenderer | null = null;
  // for floating menu
  let floatingElement: HTMLDivElement | null = null;
  let floatingMenuRenderer: SvelteRenderer | null = null;

  const lowlight = createLowlight(common);

  // custom for fontsize dropdown
  const FontSizeTextStyle = TextStyle.extend({
    addAttributes() {
      return {
        fontSize: {
          default: null,
          parseHTML: (element) => element.style.fontSize,
          renderHTML: (attributes) => {
            if (!attributes.fontSize) {
              return {};
            }
            return { style: 'font-size: ' + attributes.fontSize };
          }
        }
      };
    }
  });

  $effect(() => {
    $inspect('isEdiatble in TextEditor: ', isEditable);
    if (editorElement && !editor) {
      const extensions: Extensions = [
        Document,
        // nodes
        Blockquote.configure(blockquoteOptions || {}),
        BulletList.configure(bulletListOptions || {}),
        CodeBlockLowlight.configure({
          lowlight,
          ...(codeBlockLowlightOptions || {})
        }),
        Details.configure({
          persist: true,
          ...(detailsOptions || {})
        }),
        DetailsSummary.configure(detailsSummaryOptions || {}),
        DetailsContent.configure(detailsContentOptions || {}),
        ...(emoji
          ? [
              Emoji.configure({
                emojis: gitHubEmojis,
                enableEmoticons: true,
                suggestion: emojiSuggestion,
                ...(emojiOptions || {})
              })
            ]
          : []),
        HardBreak.configure(hardBreakOptions || {}),
        Heading.configure(headingOptions || {}),
        HorizontalRule.configure(horizontalRuleOptions || {}),
        Image.configure(imageOptions || {}),
        ListItem.configure(listItemOptions || {}),
        ...(math ? [Mathematics.configure(mathematicsOptions || {})] : []),
        ...(mentions
          ? [
              Mention.configure({
                suggestion: createMentionSuggestion(mentions),
                ...(mentionOptions || {})
              })
            ]
          : []),
        OrderedList.configure(orderedListOptions || {}),
        Paragraph.configure(paragraphOptions || {}),
        TableKit.configure({
          table: { resizable: true },
          ...(tableKitOptions || {})
        }),
        TaskList.configure(taskListOptions || {}),
        TaskItem.configure({
          nested: true,
          ...(taskItemOptions || {})
        }),
        Text,
        Youtube.configure(youtubeOptions || {}),
        // marks
        Bold.configure(boldOptions || {}),
        Code.configure(codeOptions || {}),
        Highlight.configure(highlightOptions || {}),
        Italic.configure(italicOptions || {}),
        Link.configure({
          openOnClick: false,
          ...(italicOptions || {})
        }),
        Strike.configure(strikeOptions || {}),
        Subscript.configure(subscriptOptions || {}),
        Superscript.configure(superscriptOptions || {}),
        FontSizeTextStyle,
        Underline.configure(underlineOptions || {}),
        // functionality
        CharacterCount.configure(characterCountOptions || {}),
        BackgroundColor.configure(backgroundColorOptions || {}),
        Color.configure(colorOptions || {}),

        ...(file
          ? [
              FileHandler.configure({
                allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
                onDrop: (currentEditor, files, pos) => {
                  files.forEach((file) => {
                    const fileReader = new FileReader();

                    fileReader.readAsDataURL(file);
                    fileReader.onload = () => {
                      currentEditor
                        .chain()
                        .insertContentAt(pos, {
                          type: 'image',
                          attrs: {
                            src: fileReader.result
                          }
                        })
                        .focus()
                        .run();
                    };
                  });
                },
                onPaste: (currentEditor, files) => {
                  files.forEach((file) => {
                    const fileReader = new FileReader();

                    fileReader.readAsDataURL(file);
                    fileReader.onload = () => {
                      currentEditor
                        .chain()
                        .insertContentAt(currentEditor.state.selection.anchor, {
                          type: 'image',
                          attrs: {
                            src: fileReader.result
                          }
                        })
                        .focus()
                        .run();
                    };
                  });
                }
              })
            ]
          : []),
        Focus.configure(focusOptions || {}),
        FontFamily.configure({
          types: ['textStyle'],
          ...(fontFamilyOptions || {})
        }),
        InvisibleCharacters.configure({
          visible: false,
          ...(invisibleCharactersOptions || {})
        }),
        LineHeight.configure(lineHeightOptions || {}),
        ListKeymap.configure(listKeymapOptions || {}),
        Placeholder.configure({
          includeChildren: true,
          placeholder: ({ node }) => {
            if (node.type.name === 'detailsSummary') {
              return summary;
            }
            if (node.type.name === 'detailsContent') {
              return detailsPlaceholder;
            }
            return placeholder;
          },
          ...(placeholderOptions || {})
        }),
        NodeRange.configure({
          // allow to select only on depth 0
          // depth: 0,
          key: null
        }),
        ...(toc
          ? [
              TableOfContents.configure({
                getIndex: getHierarchicalIndexes,
                onUpdate(content) {
                  tocItems.set(content);
                }
              })
            ]
          : []),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        TrailingNode.configure(trailingNodeOptions || {}),
        Typography.configure(typographyOptions || {}),
        UndoRedo.configure(undoRedoOptions || {})
      ];

      editor = new Editor({
        element: editorElement,
        extensions,
        autofocus: autofocusPosition,
        content,
        editorProps: {
          attributes: {
            class: editorClass
          }
        }
      });

      if (bubbleMenu) {
        const bubbleConfig = getMenuConfig(bubbleMenu);
        bubbleElement = document.createElement('div');
        document.body.appendChild(bubbleElement);

        const bubblePlugin = BubbleMenuPlugin({
          editor,
          element: bubbleElement,
          pluginKey: 'bubbleMenu',
          shouldShow: null, // Use default behavior
          options: {
            offset: 8,
            flip: true,
            shift: true
          }
        });

        editor.registerPlugin(bubblePlugin);

        bubbleMenuRenderer = new SvelteRenderer(BubbleMenu, {
          target: bubbleElement,
          props: { editor, ...bubbleConfig }
        });
      }

      if (floatingMenu) {
        const floatingConfig = getMenuConfig(floatingMenu);
        floatingElement = document.createElement('div');
        document.body.appendChild(floatingElement);

        const floatingPlugin = FloatingMenuPlugin({
          editor,
          element: floatingElement,
          pluginKey: 'floatingMenu',
          shouldShow: null, // Use default behavior
          options: {
            placement: 'right',
            offset: 8,
            flip: true,
            shift: true
          }
        });

        editor.registerPlugin(floatingPlugin);

        floatingMenuRenderer = new SvelteRenderer(FloatingMenu, {
          target: floatingElement,
          props: { editor, ...floatingConfig }
        });
      }
    }
  });

  onDestroy(() => {
    editor?.destroy();
    bubbleMenuRenderer?.destroy();
    bubbleElement?.remove();
    floatingMenuRenderer?.destroy();
    floatingElement?.remove();
  });
</script>

<EditorWrapper class={cn(className)}>
  {#if children && editor}
    <ToolbarWrapper>
      {@render children()}
    </ToolbarWrapper>
  {/if}
  <!-- Editor container -->
  <ContentWrapper {contentprops}>
    {#if toc}
      <div class="col-group">
        <div class="main">
          <div bind:this={editorElement}></div>
          {#if draghandle && editor}
            <DragHandle {editor} {draghandleprops} />
          {/if}
          {#if footer}
            {@render footer()}
          {/if}
        </div>
        {#if editor}
          <Toc {editor} />
        {:else}
          <p class="select-none text-gray-500">Loading editor...</p>
        {/if}
      </div>
    {:else}
      <div bind:this={editorElement}></div>
      {#if draghandle && editor}
        <DragHandle {editor} {draghandleprops} />
      {/if}
      {#if footer}
        {@render footer()}
      {/if}
    {/if}
  </ContentWrapper>
</EditorWrapper>
