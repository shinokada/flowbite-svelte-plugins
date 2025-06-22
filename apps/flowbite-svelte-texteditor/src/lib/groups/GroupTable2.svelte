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

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L94)
## Props
@prop editor
@prop showToolbar = true
-->
