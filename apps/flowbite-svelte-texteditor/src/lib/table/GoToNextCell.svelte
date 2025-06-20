<script lang="ts">
	import TableButton from './TableButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<TableButton 
	{editor}
	format="goToNextCell"
	tooltipText="Toggle goToNextCell"
	buttonId="toggleGoToNextCellButton"
	ariaLabel="Go to next cell"
	class={className}
/>