<script lang="ts">
  import { onMount } from 'svelte';
  import { runFormatCommand, type BubbleMenuProps } from '$lib';

  let { editor, showUnderline = true, showHighlight = true, showBold = true, showItalic = true, showStrike = true }: BubbleMenuProps = $props();

  let bubbleMenuEl: HTMLDivElement | null = null;
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

  onMount(() => {
    if (!bubbleMenuEl || !editor) return;
    const stop: EventListener = (e) => e.preventDefault();

    bubbleMenuEl.addEventListener('pointerdown', stop, { passive: false });
    bubbleMenuEl.addEventListener('touchstart', stop, { passive: false });

    // Method 1: Prevent context menu on the editor's DOM element
    const editorElement = editor.view.dom;
    if (editorElement) {
      // Prevent context menu (right-click menu and long-press menu on mobile)
      editorElement.addEventListener('contextmenu', stop, { passive: false });

      // Prevent selection start on mobile devices
      editorElement.addEventListener('selectstart', stop, { passive: false });

      // Additional mobile-specific events
      editorElement.addEventListener(
        'touchstart',
        (e) => {
          // Only prevent if it's a long press (you might want to adjust this logic)
          // This prevents the mobile selection popup while still allowing scrolling
          if (e.touches.length === 1) {
            // You can add additional logic here to detect long press
            // For now, we'll let touchstart through but prevent contextmenu
          }
        },
        { passive: true }
      );
    }
  });
</script>

<div bind:this={bubbleMenuEl} class="bubble-menu">
  {#if showBold}
    <button onclick={() => runFormatCommand(editor, 'bold')} class:is-active={isBoldActive}> Bold </button>
  {/if}
  {#if showItalic}
    <button onclick={() => runFormatCommand(editor, 'italic')} class:is-active={isItalicActive}> Italic </button>
  {/if}
  {#if showStrike}
    <button onclick={() => runFormatCommand(editor, 'strike')} class:is-active={isStrikeActive}> Strike </button>
  {/if}
  {#if showUnderline}
    <button onclick={() => runFormatCommand(editor, 'underline')} class:is-active={isUnderlineActive}> Underline </button>
  {/if}
  {#if showHighlight}
    <button onclick={() => runFormatCommand(editor, 'highlight')} class:is-active={isHighlightActive}> Highlight </button>
  {/if}
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[BubbleMenuProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L110)
## Props
@prop editor
@prop showUnderline = true
@prop showHighlight = true
@prop showBold = true
@prop showItalic = true
@prop showStrike = true
-->
