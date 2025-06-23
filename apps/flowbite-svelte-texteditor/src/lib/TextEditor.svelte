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

  // const finalEditorClass = $derived(editorClass?.includes('tiptap') ? editorClass : `tiptap ${editorClass || 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none'}`);

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
          TaskItem,
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

<style>
  :global(.tiptap :first-child) {
    margin-top: 0;
  }

  /* Details */
  :global(.tiptap .details) {
    display: flex;
    gap: 0.25rem;
    margin: 1.5rem 0;
    border: 1px solid var(--gray-3);
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  /* Details */
  :global(.tiptap details) {
    margin: 1.5rem 0;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  :global(.tiptap details summary) {
    font-weight: 700;
    cursor: pointer;
    padding: 0.5rem;
    margin: -0.5rem -0.5rem 0.5rem -0.5rem;
    border-radius: 0.5rem 0.5rem 0 0;
    background-color: #f9fafb;
    list-style: none; /* Remove default marker */
  }

  /* Remove default triangle/arrow in all browsers */
  :global(.tiptap details summary::-webkit-details-marker) {
    display: none;
  }

  :global(.tiptap details summary::marker) {
    display: none;
  }

  :global(.tiptap details summary:hover) {
    background-color: #f3f4f6;
  }

  :global(.tiptap details[open] summary) {
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 0.5rem;
  }

  :global(.tiptap details div[data-type="detailsContent"] ){
    padding: 0.5rem 0;
  }

 :global( .tiptap details div[data-type="detailsContent"] > :last-child ){
    margin-bottom: 0;
  }

  :global(.tiptap details>button::before ){
    content: '▶';
    display: inline-block;
    margin-right: 0.5rem;
    transition: transform 0.2s ease;
  }

  :global(.tiptap details[open] summary::before) {
    transform: rotate(90deg);
  }
  /* ... rest of the CSS styles with :global() wrapper */
</style>
