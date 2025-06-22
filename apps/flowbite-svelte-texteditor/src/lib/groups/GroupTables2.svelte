<script lang="ts">
  import { type GroupEditorBasicProps, TableButtons, Divider } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <TableButtons {editor} action="mergeCells" />
  <TableButtons {editor} action="splitCell" />
  <TableButtons {editor} action="mergeOrSplit" />
  <Divider />
  <TableButtons {editor} action="toggleHeaderColumn" />
  <TableButtons {editor} action="toggleHeaderRow" />
  <TableButtons {editor} action="toggleHeaderCell" />
  <Divider />
  <TableButtons {editor} action="fixTables" />
  <TableButtons {editor} action="goToPreviousCell" />
  <TableButtons {editor} action="goToNextCell" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L86)
## Props
@prop editor
@prop showToolbar = true
-->
