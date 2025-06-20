<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="mergeCells"
	tooltipText="Toggle mergeCells"
	buttonId="toggleMergeCellsButton"
	ariaLabel="Merge cells"
	class={className}
/>