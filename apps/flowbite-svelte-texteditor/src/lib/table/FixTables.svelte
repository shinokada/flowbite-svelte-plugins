<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="fixTables"
	tooltipText="Toggle fixTables"
	buttonId="toggleFixTablesButton"
	ariaLabel="Fix tables"
	class={className}
/>