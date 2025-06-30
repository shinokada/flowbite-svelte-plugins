<script lang="ts">
  import { type Snippet, onDestroy, onMount } from 'svelte';
  import type { Editor } from '@tiptap/core';

  interface Props {
    editor: Editor;
    class?: string;
    children?: Snippet;
  }

  let { editor, class: className = 'drag-handle', children }: Props = $props();

  let element: HTMLDivElement | null = null;

  onMount(() => {
    // The DragHandle extension should be added to the editor extensions in TextEditor.svelte
    // This component is just the visual element that the plugin will position
    console.log('[DragHandle] Component mounted with element:', element);

    // Make sure the drag handle element is available to the editor
    if (element && editor) {
      // Store reference for the drag handle plugin to use
      (editor as any).dragHandleElement = element;
      console.log('[DragHandle] Element reference stored on editor');
    }
  });

  onDestroy(() => {
    if (editor && (editor as any).dragHandleElement) {
      delete (editor as any).dragHandleElement;
    }
  });
</script>

<!-- Drag handle element that the TipTap plugin will position and show/hide -->
<div class={className} bind:this={element} data-drag-handle>
  {#if children}
    {@render children()}
  {:else}
    <!-- Default drag handle content -->
    <div class="drag-handle-icon">⠿</div>
  {/if}
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
Props
## Props
@prop editor
@prop class: className = 'drag-handle'
@prop children
-->
