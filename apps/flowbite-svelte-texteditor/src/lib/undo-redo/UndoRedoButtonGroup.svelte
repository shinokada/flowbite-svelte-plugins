<script lang="ts">
  import { type UndoRedoButtonGroupProps, UndoRedo } from '$lib';

  let { editor, showToolbar = true, undo = true, redo = true }: UndoRedoButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if undo}
    <UndoRedo {editor} action="undo" />
  {/if}
  {#if redo}
    <UndoRedo {editor} action="redo" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[UndoRedoButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L209)
## Props
@prop editor
@prop showToolbar = true
@prop undo = true
@prop redo = true
-->
