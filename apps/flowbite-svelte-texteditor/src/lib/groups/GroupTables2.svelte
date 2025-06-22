<script lang="ts">
  import { type GroupEditorBasicProps, TableButtons, Divider } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <TableButtons {editor} action='mergeCells'/>
  <TableButtons {editor} action='splitCell' />
  <TableButtons {editor} action='mergeOrSplit' />
  <Divider />
  <TableButtons {editor} action='toggleHeaderColumn' />
  <TableButtons {editor} action='toggleHeaderRow' />
  <TableButtons {editor} action='toggleHeaderCell' />
  <Divider />
  <TableButtons {editor} action='fixTables' />
  <TableButtons {editor} action='goToPreviousCell' />
  <TableButtons {editor} action='goToNextCell' />
{/if}
