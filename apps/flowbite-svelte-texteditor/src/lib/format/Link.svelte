<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton 
	{editor}
	format="link"
	tooltipText="Add link"
	buttonId="toggleLinkButton"
	ariaLabel="Link"
	class={className}
/>