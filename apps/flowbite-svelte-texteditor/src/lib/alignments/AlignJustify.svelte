<script lang="ts">
	import AlignmentButton from './AlignmentButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<AlignmentButton 
	{editor}
	alignment="justify"
	tooltipText="Justify text"
	buttonId="toggleJustifyButton"
	ariaLabel="Justify"
	class={className}
/>