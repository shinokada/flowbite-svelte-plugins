<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton 
	{editor}
	format="superscript"
	tooltipText="Toggle superscript"
	buttonId="toggleSuperscriptButton"
	ariaLabel="Subscirpt"
	class={className}
/>