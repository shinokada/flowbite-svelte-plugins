<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="deleteColumn"
	tooltipText="Toggle deleteColumn"
	buttonId="toggleDeleteColumnButton"
	ariaLabel="Delete column"
	class={className}
/>