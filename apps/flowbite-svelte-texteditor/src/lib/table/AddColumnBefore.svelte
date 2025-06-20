<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="addColumnBefore"
	tooltipText="Toggle addColumnBefore"
	buttonId="toggleAddColumnBeforeButton"
	ariaLabel="Add column before"
	class={className}
/>