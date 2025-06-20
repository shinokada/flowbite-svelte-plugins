<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="addColumnAfter"
	tooltipText="Toggle addColumnAfter"
	buttonId="toggleAddColumnAfterButton"
	ariaLabel="Add column after"
	class={className}
/>