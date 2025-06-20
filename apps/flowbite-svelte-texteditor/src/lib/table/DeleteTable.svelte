<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="deleteTable"
	tooltipText="Toggle Delete table"
	buttonId="toggleDeleteTableButton"
	ariaLabel="Delete table"
	class={className}
/>