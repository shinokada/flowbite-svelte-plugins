<script lang="ts">
  import { onDestroy } from 'svelte';
  import { cn } from '$lib';
  import { type EditorProviderProps, EditorWrapper, ContentWrapper, ToolbarWrapper, SvelteRenderer, BubbleMenu } from '$lib';
  import { Editor } from '@tiptap/core';
  import type { Extensions } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import CharacterCount from '@tiptap/extension-character-count';
  import Color from '@tiptap/extension-color';
  import Details from '@tiptap/extension-details';
  import DetailsContent from '@tiptap/extension-details-content';
  import DetailsSummary from '@tiptap/extension-details-summary';
  import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
  import Focus from '@tiptap/extension-focus';
  import FontFamily from '@tiptap/extension-font-family';
  import HardBreak from '@tiptap/extension-hard-break';
  import Highlight from '@tiptap/extension-highlight';
  import InvisibleCharacters from '@tiptap/extension-invisible-characters';
  import Link from '@tiptap/extension-link';
  import Image from '@tiptap/extension-image';
  import { Mathematics } from '@tiptap/extension-mathematics';
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
  import css from 'highlight.js/lib/languages/css';
  import js from 'highlight.js/lib/languages/javascript';
  import ts from 'highlight.js/lib/languages/typescript';
  import xml from 'highlight.js/lib/languages/xml';
  import emojiSuggestion from './emoji/emojiSuggestion';
  import Mention from '@tiptap/extension-mention';
  import { createMentionSuggestion } from './mention/mentionSuggestion';
  import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';

  let {
    content = '<p>Start typing...</p>',
    editorClass = 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none',
    editor = $bindable<Editor | null>(null),
    children,
    footer,
    emoji = true,
    class: className,
    mentions,
    bubbleMenu = false,
    math = false,
    limit
  }: EditorProviderProps = $props();

  let editorElement = $state<HTMLDivElement | null>(null);
  // for bubble menu
  let bubbleElement: HTMLDivElement | null = null;
  let bubbleMenuRenderer: SvelteRenderer | null = null;

  const lowlight = createLowlight(common);
  lowlight.register('html', xml);
  lowlight.register('xml', xml);
  lowlight.register('css', css);
  lowlight.register('js', js);
  lowlight.register('javascript', js);
  lowlight.register('ts', ts);
  lowlight.register('typescript', ts);

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
        Placeholder.configure({
          includeChildren: true,
          placeholder: ({ node }) => {
            if (node.type.name === 'detailsSummary') {
              return 'Summary';
            }
            return 'Write something...';
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

      // Conditionally add Emoji extension
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
        bubbleElement = document.createElement('div');
        document.body.appendChild(bubbleElement);

        const plugin = BubbleMenuPlugin({
          editor,
          element: bubbleElement,
          pluginKey: 'bubbleMenu',
          tippyOptions: {
            duration: 150,
            theme: 'light'
          }
        });

        editor.registerPlugin(plugin);

        bubbleMenuRenderer = new SvelteRenderer(BubbleMenu, {
          target: bubbleElement,
          props: { editor }
        });
      }
    }
  });

  onDestroy(() => {
    editor?.destroy();
    bubbleMenuRenderer?.destroy();
    bubbleElement?.remove();
  });
</script>

<EditorWrapper class={cn(className)}>
  {#if children && editor}
    <ToolbarWrapper>
      {@render children()}
    </ToolbarWrapper>
  {/if}

  <!-- Editor container -->
  <ContentWrapper>
    <div bind:this={editorElement}></div>
    {#if footer}
      {@render footer()}
    {/if}
  </ContentWrapper>
</EditorWrapper>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[EditorProviderProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L7)
## Props
@prop content = '<p>Start typing...</p>'
@prop editorClass = 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none'
@prop editor = $bindable<Editor | null>(null)
@prop children
@prop footer
@prop emoji = true
@prop class: className
@prop mentions
@prop bubbleMenu = false
@prop math = false
@prop limit
-->
