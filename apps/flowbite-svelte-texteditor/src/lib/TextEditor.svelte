<script lang="ts">
  import { onDestroy } from 'svelte';
  import { type EditorProviderProps, EditorWrapper, ContentWrapper, ToolbarWrapper } from '$lib';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import CharacterCount from '@tiptap/extension-character-count';
  import Color from '@tiptap/extension-color';
  import Details from '@tiptap/extension-details';
  import DetailsContent from '@tiptap/extension-details-content';
  import DetailsSummary from '@tiptap/extension-details-summary';
  import Focus from '@tiptap/extension-focus';
  import FontFamily from '@tiptap/extension-font-family';
  import Highlight from '@tiptap/extension-highlight';
  import Link from '@tiptap/extension-link';
  import Image from '@tiptap/extension-image';
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

  let { element = $bindable<HTMLDivElement | null>(null), content = '<p>Start typing...</p>', editorClass = 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none', editor = $bindable<Editor | null>(null), children }: EditorProviderProps = $props();

  let editorElement = $state<HTMLDivElement | null>(null);

  const lowlight = createLowlight(common);
  // languages
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

  // Use effect to watch for element changes only
  $effect(() => {
    if (editorElement && !editor) {
      editor = new Editor({
        element: editorElement,
        extensions: [
          StarterKit.configure({
            codeBlock: false
          }),
          TextAlign.configure({
            types: ['heading', 'paragraph']
          }),
          Underline,
          Highlight,
          Link.configure({
            openOnClick: false
          }),
          Subscript,
          Superscript,
          FontSizeTextStyle,
          FontFamily.configure({
            types: ['textStyle']
          }),
          Color,
          TaskList,
          TaskItem.configure({
            nested: true
          }),
          Image,
          Youtube,
          Table.configure({
            resizable: true
          }),
          TableRow,
          TableHeader,
          TableCell,
          CharacterCount,
          Focus,
          CodeBlockLowlight.configure({
            lowlight
          }),
          Details.configure({
            persist: true,
            HTMLAttributes: {
              class: 'details'
            }
          }),
          DetailsSummary,
          DetailsContent,
          Placeholder.configure({
            includeChildren: true,
            placeholder: ({ node }) => {
              if (node.type.name === 'detailsSummary') {
                return 'Summary';
              }

              return 'Write something...';
            }
          })
        ],
        content,
        editorProps: {
          attributes: {
            class: editorClass
          }
        }
      });

      // Bind the element for external access if needed
      element = editorElement;
    }
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<EditorWrapper>
  {#if children && editor}
    <ToolbarWrapper>
      {@render children()}
    </ToolbarWrapper>
  {/if}

  <!-- Editor container -->
  <ContentWrapper>
    <div bind:this={editorElement}></div>
  </ContentWrapper>
</EditorWrapper>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorProviderProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L7)
## Props
@prop element = $bindable<HTMLDivElement | null>(null)
@prop content = '<p>Start typing...</p>'
@prop editorClass = 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none'
@prop editor = $bindable<Editor | null>(null)
@prop children
-->

<style>
  /* List styles */
  :global(.tiptap ul),
  :global(.tiptap ol) {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;
  }

  :global(.tiptap ul li p),
  :global(.tiptap ol li p) {
    margin-bottom: 0.15em;
  }

  /* Task list specific styles */
  :global(.tiptap ul[data-type='taskList']) {
    list-style: none;
    margin-left: 0;
    padding: 0;
  }

  :global(.tiptap ul[data-type='taskList'] li) {
    align-items: flex-start;
    display: flex;
    margin: 0;
    gap: 0.5rem;
  }

  :global(.tiptap ul[data-type='taskList'] li > label) {
    flex: 0 0 auto;
    user-select: none;
    margin-top: -0.1em;
  }

  :global(.tiptap ul[data-type='taskList'] li > div) {
    flex: 1 1 auto;
    margin: 0;
    padding: 0;
    /* Prevent content from overflowing */
    min-width: 0;
  }

  :global(.tiptap ul[data-type='taskList'] input[type='checkbox']) {
    cursor: pointer;
    /* Ensure consistent checkbox sizing */
    margin: 0;
    flex-shrink: 0;
  }

  :global(.tiptap ul[data-type='taskList'] ul[data-type='taskList']) {
    margin: 0;
  }

  /* Optional: Handle the span element in your label if it's for custom styling */
  :global(.tiptap ul[data-type='taskList'] li > label span) {
    display: inline-block;
    /* Add custom checkbox styles here if needed */
  }

  /* Ensure paragraphs in task list items don't add extra spacing */
  :global(.tiptap ul[data-type='taskList'] li p) {
    margin: 0;
  }

  /* Details */
  :global(.tiptap .details) {
    display: flex;
    gap: 0.25rem;
    margin: 1.5rem 0;
    border: 1px solid #d4ccc7cf;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  :global(.tiptap .details summary) {
    font-weight: 700;
    list-style: none;
  }

  :global(.tiptap .details > button) {
    align-items: center;
    background: transparent;
    border-radius: 4px;
    display: flex;
    font-size: 0.625rem;
    height: 1.25rem;
    justify-content: center;
    line-height: 1;
    margin-top: 0.1rem;
    padding: 0;
    width: 1.25rem;
  }

  :global(.tiptap .details > button:hover) {
    background-color: #dedad8d8;
  }

  :global(.tiptap .details > button::before) {
    content: '\25B6';
    display: inline-block;
    position: relative;
    top: 3px;
  }

  :global(.tiptap .details.is-open > button::before) {
    transform: rotate(90deg);
  }

  :global(.tiptap .details > div) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  :global(.tiptap .details > div > [data-type='detailsContent']) > :last-child {
    margin-bottom: 0.5rem;
  }

  :global(.tiptap .details .details) {
    margin: 0.5rem 0;
  }
</style>
