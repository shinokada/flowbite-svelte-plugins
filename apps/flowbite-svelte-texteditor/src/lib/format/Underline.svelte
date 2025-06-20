<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton 
	{editor}
	format="underline"
	tooltipText="Toggle underline"
	buttonId="toggleUnderlineButton"
	ariaLabel="Underline"
	class={className}
/>