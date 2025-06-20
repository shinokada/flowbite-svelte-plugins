<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="toggleHeaderColumn"
	tooltipText="Toggle toggleHeaderColumn"
	buttonId="toggleToggleHeaderColumnButton"
	ariaLabel="Toggle header column"
	class={className}
/>