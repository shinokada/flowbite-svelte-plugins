<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="goToPreviousCell"
	tooltipText="Toggle goToPreviousCell"
	buttonId="toggleGoToPreviousCellButton"
	ariaLabel="Go to previous cell"
	class={className}
/>