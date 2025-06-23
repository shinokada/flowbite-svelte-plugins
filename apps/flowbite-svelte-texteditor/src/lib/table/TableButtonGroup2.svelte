<script lang="ts">
  import { type TableButtonGroupProps, TableButton, Divider } from '$lib';

  let { editor, showToolbar = true, mergeCells = true, splitCell = true, mergeOrSplit = true, toggleHeaderColumn = true, toggleHeaderRow = true, toggleHeaderCell = true, fixTables = true, goToPreviousCell = true, goToNextCell = true }: TableButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if mergeCells}
    <TableButton {editor} action="mergeCells" />
  {/if}
  {#if splitCell}
    <TableButton {editor} action="splitCell" />
  {/if}
  {#if mergeOrSplit}
    <TableButton {editor} action="mergeOrSplit" />
  {/if}
  <Divider />
  {#if toggleHeaderColumn}
    <TableButton {editor} action="toggleHeaderColumn" />
  {/if}
  {#if toggleHeaderRow}
    <TableButton {editor} action="toggleHeaderRow" />
  {/if}
  {#if toggleHeaderCell}
    <TableButton {editor} action="toggleHeaderCell" />
  {/if}
  <Divider />
  {#if fixTables}
    <TableButton {editor} action="fixTables" />
  {/if}
  {#if goToPreviousCell}
    <TableButton {editor} action="goToPreviousCell" />
  {/if}
  {#if goToNextCell}
    <TableButton {editor} action="goToNextCell" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[TableButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L148)
## Props
@prop editor
@prop showToolbar = true
@prop mergeCells = true
@prop splitCell = true
@prop mergeOrSplit = true
@prop toggleHeaderColumn = true
@prop toggleHeaderRow = true
@prop toggleHeaderCell = true
@prop fixTables = true
@prop goToPreviousCell = true
@prop goToNextCell = true
-->
