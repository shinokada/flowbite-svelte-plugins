<script module>
  import { writable } from 'svelte/store';
  import type { TableOfContentData } from '@tiptap/extension-table-of-contents';

  export const tocItems = writable<TableOfContentData>([]);
</script>

<script lang="ts">
  import { onDestroy, setContext } from 'svelte';
  import { cn } from '$lib';
  import { type EditorProviderProps, EditorWrapper, ContentWrapper, ToolbarWrapper, SvelteRenderer, BubbleMenu, FloatingMenu, getMenuConfig, DragHandle, Toc, type EditableContext } from '$lib';
  import { Editor } from '@tiptap/core';
  import type { Extensions } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import CharacterCount from '@tiptap/extension-character-count';
  import Color from '@tiptap/extension-color';
  import Details from '@tiptap/extension-details';
  import DetailsContent from '@tiptap/extension-details-content';
  import DetailsSummary from '@tiptap/extension-details-summary';
  import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
  import FileHandler from '@tiptap/extension-file-handler';
  import Focus from '@tiptap/extension-focus';
  import FontFamily from '@tiptap/extension-font-family';
  import HardBreak from '@tiptap/extension-hard-break';
  import Highlight from '@tiptap/extension-highlight';
  import InvisibleCharacters from '@tiptap/extension-invisible-characters';
  import Link from '@tiptap/extension-link';
  import Image from '@tiptap/extension-image';
  import { Mathematics } from '@tiptap/extension-mathematics';
  import NodeRange from '@tiptap/extension-node-range';
  import Placeholder from '@tiptap/extension-placeholder';
  import Subscript from '@tiptap/extension-subscript';
  import Superscript from '@tiptap/extension-superscript';
  import TaskList from '@tiptap/extension-task-list';
  import TaskItem from '@tiptap/extension-task-item';
  import TextStyle from '@tiptap/extension-text-style';
  import Table from '@tiptap/extension-table';
  import TableRow from '@tiptap/extension-table-row';
  import TableHeader from '@tiptap/extension-table-header';
  import TableCell from '@tiptap/extension-table-cell';
  import TextAlign from '@tiptap/extension-text-align';
  import Underline from '@tiptap/extension-underline';
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
    isEditable = true
  }: EditorProviderProps = $props();

  const editableContext: EditableContext = {
    get isEditable() { return isEditable }
  }
  setContext('isEditable', editableContext)

  let editorElement = $state<HTMLDivElement | null>(null);
  // for bubble menu
  let bubbleElement: HTMLDivElement | null = null;
  let bubbleMenuRenderer: SvelteRenderer | null = null;
  // for floating menu
  let floatingElement: HTMLDivElement | null = null;
  let floatingMenuRenderer: SvelteRenderer | null = null;

  const lowlight = createLowlight(common);

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
    $inspect('isEdiatble in TextEditor: ', isEditable)
    if (editorElement && !editor) {
      const extensions: Extensions = [
        StarterKit.configure({ codeBlock: false }),
        CharacterCount.configure({
          limit
        }),
        CodeBlockLowlight.configure({ lowlight }),
        Color,
        Details.configure({ persist: true, HTMLAttributes: { class: 'details' } }),
        DetailsSummary,
        DetailsContent,
        Focus,
        FontFamily.configure({ types: ['textStyle'] }),
        FontSizeTextStyle,
        HardBreak,
        Highlight,
        Image,
        InvisibleCharacters.configure({
          visible: false
        }),
        Link.configure({ openOnClick: false }),
        NodeRange.configure({
          // allow to select only on depth 0
          // depth: 0,
          key: null
        }),
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
          }
        }),
        Subscript,
        Superscript,
        TaskList,
        TaskItem.configure({ nested: true }),
        Table.configure({ resizable: true }),
        TableRow,
        TableHeader,
        TableCell,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Underline,
        Youtube
      ];

      if (toc) {
        extensions.push(
          TableOfContents.configure({
            getIndex: getHierarchicalIndexes,
            onUpdate(content) {
              tocItems.set(content);
            }
          })
        );
      }

      if (emoji) {
        extensions.push(
          Emoji.configure({
            emojis: gitHubEmojis,
            enableEmoticons: true,
            suggestion: emojiSuggestion
          })
        );
      }
      if (mentions) {
        extensions.push(
          Mention.configure({
            suggestion: createMentionSuggestion(mentions)
          })
        );
      }
      if (math) {
        extensions.push(Mathematics);
      }
      if (file) {
        extensions.push(
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
        );
      }

      editor = new Editor({
        element: editorElement,
        extensions,
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
          tippyOptions: {
            duration: 150,
            theme: 'light'
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
          tippyOptions: {
            duration: 150,
            theme: 'light'
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
          <p class="text-gray-500 select-none">Loading editor...</p>
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

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[EditorProviderProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L31)
## Props
@prop content
@prop editorClass = 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none'
@prop editor = $bindable<Editor | null>(null)
@prop children
@prop footer
@prop emoji = true
@prop class: className
@prop mentions
@prop bubbleMenu = false
@prop floatingMenu = false
@prop math = false
@prop limit
@prop file
@prop placeholder = 'Write something ...'
@prop summary = 'Summary'
@prop detailsPlaceholder = 'Add details content...'
@prop draghandle
@prop draghandleprops
@prop toc
@prop contentprops
-->
