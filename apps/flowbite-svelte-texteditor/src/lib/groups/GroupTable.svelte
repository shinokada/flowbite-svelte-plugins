<script lang="ts">
	import { type GroupEditorBasicProps, AddColumnAfter, AddColumnBefore, AddRowAfter, AddRowBefore, DeleteColumn, DeleteRow, DeleteTable, Table, Divider } from '$lib';
	
	let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
	<Table {editor} />
	<DeleteTable {editor} />
  <Divider />
	<AddColumnBefore {editor} />
	<AddColumnAfter {editor} />
  <DeleteColumn {editor} />
  <Divider />
  <AddRowBefore {editor} />
  <AddRowAfter {editor} />
  <DeleteRow {editor} />
{/if}