<script lang="ts">
  import { type GroupEditorBasicProps, TableButtons, Divider } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <TableButtons {editor} />
  <TableButtons {editor} action="deleteTable"/>
  <Divider />
  <TableButtons {editor} action='addColumnBefore' />
  <TableButtons {editor} action='addColumnAfter'/>
  <TableButtons {editor} action='deleteColumn'/>
  <Divider />
  <TableButtons {editor} action='addRowBefore'/>
  <TableButtons {editor} action='addRowAfter' />
  <TableButtons {editor} action='deleteRow'/>
{/if}
