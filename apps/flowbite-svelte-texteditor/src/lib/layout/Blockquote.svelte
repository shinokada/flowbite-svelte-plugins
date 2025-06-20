<script lang="ts">
	import LayoutButton from './LayoutButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<LayoutButton 
	{editor}
	format="blockquote"
	tooltipText="Toggle blockquote"
	buttonId="toggleBlockquoteButton"
	ariaLabel="Blockquote"
	class={className}
/>