<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="mergeOrSplit"
	tooltipText="Toggle mergeOrSplit"
	buttonId="toggleMergeOrSplitButton"
	ariaLabel="Merge or split"
	class={className}
/>