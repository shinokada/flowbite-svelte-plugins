<script module>
  import { writable } from 'svelte/store';
  import type { TableOfContentData } from '@tiptap/extension-table-of-contents';

  export const tocItems = writable<TableOfContentData>([]);
</script>

<script lang="ts">
  import { onDestroy, setContext, getContext } from 'svelte';
  import { type EditorProviderProps, EditorWrapper, ContentWrapper, ToolbarWrapper, SvelteRenderer, FloatingMenu, getMenuConfig, Toc, cn, type EditableContext, type EditorExtensionConfigs } from '$lib';
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
  import { BulletList, ListItem, ListKeymap, OrderedList } from '@tiptap/extension-list';
  import { Paragraph } from '@tiptap/extension-paragraph';
  import { Strike } from '@tiptap/extension-strike';
  import { Text } from '@tiptap/extension-text';
  import { Underline } from '@tiptap/extension-underline';
  import { TrailingNode, UndoRedo } from '@tiptap/extensions';
  // end of starter-kit

  // functionality
  import CharacterCount from '@tiptap/extension-character-count';
  import Color from '@tiptap/extension-color';
  import { Details, DetailsSummary, DetailsContent } from '@tiptap/extension-details';
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
    floatingMenu = false,
    math = false,
    file,
    placeholder = 'Write something ...',
    summary = 'Summary',
    detailsPlaceholder = 'Add details content...',
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
    strikeOptions,
    subscriptOptions,
    superscriptOptions,
    underlineOptions,
    // functionality
    characterCountOptions,
    backgroundColorOptions,
    colorOptions,
    focusOptions,
    fontFamilyOptions,
    invisibleCharactersOptions,
    lineHeightOptions,
    listKeymapOptions,
    placeholderOptions,
    trailingNodeOptions,
    typographyOptions,
    undoRedoOptions
  } = extensionConfigs;

  let editorElement = $state<HTMLDivElement | null>(null);
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
          HTMLAttributes: {
            class: 'details'
          },
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
        ...(math
          ? [
              Mathematics.configure({
                inlineOptions: {
                  onClick: (node, pos) => {
                    const katex = prompt('Enter new calculation:', node.attrs.latex);
                    if (katex) {
                      editor?.chain().setNodeSelection(pos).updateInlineMath({ latex: katex }).focus().run();
                    }
                  }
                },
                blockOptions: {
                  onClick: (node, pos) => {
                    const katex = prompt('Enter new calculation:', node.attrs.latex);
                    if (katex) {
                      editor?.chain().setNodeSelection(pos).updateBlockMath({ latex: katex }).focus().run();
                    }
                  }
                },
                katexOptions: {
                  throwOnError: false, // don't throw an error if the LaTeX code is invalid
                  macros: {
                    '\\R': '\\mathbb{R}', // add a macro for the real numbers
                    '\\N': '\\mathbb{N}' // add a macro for the natural numbers
                  }
                },
                ...(mathematicsOptions || {})
              })
            ]
          : []),
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

      if (floatingMenu && editor) {
        setupFloatingMenu();
      }
    }
  });

  function setupFloatingMenu() {
    if (!editor || floatingMenuRenderer) return;

    setTimeout(() => {
      const floatingConfig = getMenuConfig(floatingMenu);
      floatingElement = document.createElement('div');
      floatingElement.style.zIndex = '50';
      floatingElement.style.position = 'absolute';
      floatingElement.style.visibility = 'hidden';
      floatingElement.style.opacity = '0';
      floatingElement.style.transition = 'opacity 0.2s ease-in-out';

      // Add to body initially
      document.body.appendChild(floatingElement);

      // Create the floating menu plugin
      const floatingPlugin = FloatingMenuPlugin({
        editor: editor!,
        element: floatingElement,
        pluginKey: 'floatingMenu',
        shouldShow: ({ editor, view, state, oldState, from, to }) => {
          const { selection } = state;
          const { empty } = selection;
          const anchor = selection.$anchor;
          const isRootDepth = anchor.depth === 1;
          const isEmptyTextBlock = anchor.parent.isTextblock && !anchor.parent.type.spec.code && !anchor.parent.textContent && anchor.parent.childCount === 0;

          if (!view.hasFocus() || !empty || !isRootDepth || !isEmptyTextBlock || !editor.isEditable) {
            return false;
          }

          return true;
        },
        options: {
          strategy: 'absolute',
          placement: 'right',
          offset: 8,
          flip: true,
          shift: true,
          onShow: () => {
            if (floatingElement) {
              floatingElement.style.visibility = 'visible';
              floatingElement.style.opacity = '1';
            }
          },
          onHide: () => {
            if (floatingElement) {
              floatingElement.style.visibility = 'hidden';
              floatingElement.style.opacity = '0';
            }
          }
        }
      });

      // Register the plugin with the editor
      editor!.registerPlugin(floatingPlugin);

      // Create the Svelte renderer
      floatingMenuRenderer = new SvelteRenderer(FloatingMenu, {
        target: floatingElement,
        props: {
          editor: editor!,
          autoSetup: false, // We'll call setup manually
          ...floatingConfig
        }
      });

      // Setup the floating menu
      floatingMenuRenderer.setup();
    }, 100);
  }

  onDestroy(() => {
    editor?.destroy();
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
          {#if footer}
            {@render footer()}
          {/if}
        </div>
        {#if editor}
          <Toc {editor} />
        {:else}
          <p class="text-gray-500 select-none">Loading editor...</p>
        {/if}
      </div>
    {:else}
      <div bind:this={editorElement}></div>
      {#if footer}
        {@render footer()}
      {/if}
    {/if}
  </ContentWrapper>
</EditorWrapper>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[EditorProviderProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L139)
## Props
@prop content
@prop editorClass = 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none'
@prop editor = $bindable<Editor | null>(null)
@prop children
@prop footer
@prop emoji = true
@prop class: className
@prop mentions
@prop floatingMenu = false
@prop math = false
@prop file
@prop placeholder = 'Write something ...'
@prop summary = 'Summary'
@prop detailsPlaceholder = 'Add details content...'
@prop toc
@prop contentprops
@prop isEditable = true
@prop autofocusPosition = false
-->
