<script lang="ts">
  import { runFormatCommand } from '$lib';
  import type { Editor } from '@tiptap/core';
  import { expoIn } from 'svelte/easing';
  interface BubbleMenuProps {
    editor: Editor | null;
    underline?: boolean;
    highlight?: boolean;
  }
  let { editor, underline = true, highlight = true }: BubbleMenuProps = $props();

  let isBoldActive = $state(false);
  let isItalicActive = $state(false);
  let isStrikeActive = $state(false);
  let isUnderlineActive = $state(false);
  let isHighlightActive = $state(false);

  $effect(() => {
    if (!editor) return;

    const update = () => {
      isBoldActive = editor.isActive('bold');
      isItalicActive = editor.isActive('italic');
      isStrikeActive = editor.isActive('strike');
      isUnderlineActive = editor.isActive('underline');
      isHighlightActive = editor.isActive('highlight');
    };

    update();
    // use Tiptap's Editor class, which extends ProseMirror’s event system
    // the Editor instance is an EventEmitter — meaning it has .on(), .off(), and .emit() methods
    editor.on('transaction', update);

    return () => {
      editor.off('transaction', update);
    };
  });
</script>

<div class="bubble-menu">
  <button onclick={() => runFormatCommand(editor, 'bold')} class:is-active={isBoldActive}> Bold </button>
  <button onclick={() => runFormatCommand(editor, 'italic')} class:is-active={isItalicActive}> Italic </button>
  <button onclick={() => runFormatCommand(editor, 'strike')} class:is-active={isStrikeActive}> Strike </button>
  {#if underline}
    <button onclick={() => runFormatCommand(editor, 'underline')} class:is-active={isUnderlineActive}> Underline </button>
  {/if}
  {#if highlight}
    <button onclick={() => runFormatCommand(editor, 'highlight')} class:is-active={isHighlightActive}> Highlight </button>
  {/if}
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
BubbleMenuProps
## Props
@prop editor
@prop underline = true
@prop highlight = true
-->
