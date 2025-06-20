<script lang="ts">
	import AlignmentButton from './AlignmentButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<AlignmentButton 
	{editor}
	alignment="center"
	tooltipText="Align center"
	buttonId="toggleCenterAlignButton"
	ariaLabel="Align center"
	class={className}
/>