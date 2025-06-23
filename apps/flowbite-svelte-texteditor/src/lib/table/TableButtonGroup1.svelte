<script lang="ts">
  import { type GroupEditorBasicProps, TableButton, Divider } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <TableButton {editor} />
  <TableButton {editor} action="deleteTable" />
  <Divider />
  <TableButton {editor} action="addColumnBefore" />
  <TableButton {editor} action="addColumnAfter" />
  <TableButton {editor} action="deleteColumn" />
  <Divider />
  <TableButton {editor} action="addRowBefore" />
  <TableButton {editor} action="addRowAfter" />
  <TableButton {editor} action="deleteRow" />
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
