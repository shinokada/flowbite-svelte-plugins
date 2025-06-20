<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import TextAlign from '@tiptap/extension-text-align';
  import Underline from '@tiptap/extension-underline';
  import Highlight from '@tiptap/extension-highlight';
  import Link from '@tiptap/extension-link';
  import { type EditorProviderProps, EditorWrapper, ContentWrapper, ToolbarWrapper } from '$lib';
  import Subscript from '@tiptap/extension-subscript';
  import Superscript from '@tiptap/extension-superscript';
  import TextStyle from '@tiptap/extension-text-style';
  import Color from '@tiptap/extension-color';
  import TaskList from '@tiptap/extension-task-list';
  import TaskItem from '@tiptap/extension-task-item';
  import Image from '@tiptap/extension-image';
  import Youtube from '@tiptap/extension-youtube';
  import Table from '@tiptap/extension-table';
  import TableRow from '@tiptap/extension-table-row';
  import TableHeader from '@tiptap/extension-table-header';
  import TableCell from '@tiptap/extension-table-cell';
  import Placeholder from '@tiptap/extension-placeholder';
  import CharacterCount from '@tiptap/extension-character-count';
  import Focus from '@tiptap/extension-focus';
  import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
  import { common, createLowlight } from 'lowlight';

  let {
    element = $bindable<HTMLDivElement | null>(null),
    content = '<p>Start typing...</p>',
    editorClass = 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none',
    editor = $bindable<Editor | null>(null),
    children
  }: EditorProviderProps & { children?: import('svelte').Snippet } = $props();

  let editorElement = $state<HTMLDivElement | null>(null);

  const lowlight = createLowlight(common);

  // Use effect to watch for element changes only
  $effect(() => {
    if (editorElement && !editor) {
      editor = new Editor({
        element: editorElement,
        extensions: [
          StarterKit,
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
          TextStyle,
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
          Placeholder.configure({
            placeholder: 'Write something...'
          }),
          CharacterCount,
          Focus,
          CodeBlockLowlight.configure({
            lowlight
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