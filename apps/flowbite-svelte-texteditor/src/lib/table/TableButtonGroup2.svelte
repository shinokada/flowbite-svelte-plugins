<script lang="ts">
  import { type GroupEditorBasicProps, TableButton, Divider } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <TableButton {editor} action="mergeCells" />
  <TableButton {editor} action="splitCell" />
  <TableButton {editor} action="mergeOrSplit" />
  <Divider />
  <TableButton {editor} action="toggleHeaderColumn" />
  <TableButton {editor} action="toggleHeaderRow" />
  <TableButton {editor} action="toggleHeaderCell" />
  <Divider />
  <TableButton {editor} action="fixTables" />
  <TableButton {editor} action="goToPreviousCell" />
  <TableButton {editor} action="goToNextCell" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L89)
## Props
@prop editor
@prop showToolbar = true
-->
