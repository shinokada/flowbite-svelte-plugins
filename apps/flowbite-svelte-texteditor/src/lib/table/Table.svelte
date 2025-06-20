<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="table"
	tooltipText="Toggle Table"
	buttonId="toggleTableButton"
	ariaLabel="Table"
	class={className}
/>