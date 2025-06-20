<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton 
	{editor}
	format="highlight"
	tooltipText="Toggle highlight"
	buttonId="toggleHighlightButton"
	ariaLabel="Highlight"
	class={className}
/>
