<script lang="ts">
  import { Editor } from '@tiptap/core';
  import UndoRedo from '../undo-redo/UndoRedo.svelte';

  let {
		editor,
		showToolbar = true
	}: {
		editor: Editor | null;
		showToolbar?: boolean;
	} = $props();
</script>

{#if editor && showToolbar}
  <UndoRedo {editor} action="undo" />
  <UndoRedo {editor} action="redo" />
{/if}
