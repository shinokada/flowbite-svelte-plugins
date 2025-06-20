<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="deleteRow"
	tooltipText="Toggle deleteRow"
	buttonId="toggleDeleteRowButton"
	ariaLabel="Delete row"
	class={className}
/>