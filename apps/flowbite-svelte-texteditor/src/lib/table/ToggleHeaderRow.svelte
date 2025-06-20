<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="toggleHeaderRow"
	tooltipText="Toggle toggleHeaderRow"
	buttonId="toggleToggleHeaderRowButton"
	ariaLabel="Toggle header row"
	class={className}
/>