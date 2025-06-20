<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton 
	{editor}
	format="italic"
	tooltipText="Toggle italic"
	buttonId="toggleItalicButton"
	ariaLabel="Italic"
	class={className}
/>