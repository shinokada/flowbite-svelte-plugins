<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="addRowBefore"
	tooltipText="Toggle addRowBefore"
	buttonId="toggleAddRowBeforeButton"
	ariaLabel="Add row before"
	class={className}
/>