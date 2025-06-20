<script lang="ts">
	import AlignmentButton from './AlignmentButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<AlignmentButton 
	{editor}
	alignment="right"
	tooltipText="Align right"
	buttonId="toggleRightAlignButton"
	ariaLabel="Align right"
	class={className}
/>