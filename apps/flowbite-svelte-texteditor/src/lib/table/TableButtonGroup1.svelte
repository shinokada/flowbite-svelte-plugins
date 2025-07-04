<script lang="ts">
  import { type TableButtonGroupProps, TableButton, Divider } from '$lib';

  let { editor, showToolbar = true, table = true, deleteTable = true, addColumnBefore = true, addColumnAfter = true, deleteColumn = true, addRowBefore = true, addRowAfter = true, deleteRow = true }: TableButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if table}
    <TableButton {editor} />
  {/if}
  {#if deleteTable}
    <TableButton {editor} action="deleteTable" />
  {/if}

  <Divider />
  {#if addColumnBefore}
    <TableButton {editor} action="addColumnBefore" />
  {/if}
  {#if addColumnAfter}
    <TableButton {editor} action="addColumnAfter" />
  {/if}
  {#if deleteColumn}
    <TableButton {editor} action="deleteColumn" />
  {/if}

  <Divider />
  {#if addRowBefore}
    <TableButton {editor} action="addRowBefore" />
  {/if}
  {#if addRowAfter}
    <TableButton {editor} action="addRowAfter" />
  {/if}
  {#if deleteRow}
    <TableButton {editor} action="deleteRow" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[TableButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L330)
## Props
@prop editor
@prop showToolbar = true
@prop table = true
@prop deleteTable = true
@prop addColumnBefore = true
@prop addColumnAfter = true
@prop deleteColumn = true
@prop addRowBefore = true
@prop addRowAfter = true
@prop deleteRow = true
-->
