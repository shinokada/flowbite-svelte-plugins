<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="addRowAfter"
	tooltipText="Toggle addRowAfter"
	buttonId="toggleAddRowAfterButton"
	ariaLabel="Add row after"
	class={className}
/>