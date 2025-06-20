<script lang="ts">
	import { type GroupEditorBasicProps, FixTables, GoToNextCell, GoToPreviousCell, MergeCells, MergeOrSplit, SplitCell, ToggleHeaderCell, ToggleHeaderColumn, ToggleHeaderRow, Divider } from '$lib';
	
	let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
	<MergeCells {editor} />
	<SplitCell {editor} />
  <MergeOrSplit {editor} />
  <Divider />
	<ToggleHeaderColumn {editor} />
	<ToggleHeaderRow {editor} />
  <ToggleHeaderCell {editor} />
  <Divider />
  <FixTables {editor} />
  <GoToPreviousCell {editor} />
  <GoToNextCell {editor} />
{/if}