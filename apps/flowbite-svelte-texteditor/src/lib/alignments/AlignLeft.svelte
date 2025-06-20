<script lang="ts">
	import AlignmentButton from './AlignmentButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<AlignmentButton 
	{editor}
	alignment="left"
	tooltipText="Align left"
	buttonId="toggleLeftAlignButton"
	ariaLabel="Align left"
	class={className}
/>