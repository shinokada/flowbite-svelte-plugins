<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="toggleHeaderCell"
	tooltipText="Toggle toggleHeaderCell"
	buttonId="toggleToggleHeaderCellButton"
	ariaLabel="Toggle header cell"
	class={className}
/>