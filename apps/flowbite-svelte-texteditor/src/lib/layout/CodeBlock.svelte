<script lang="ts">
	import LayoutButton from './LayoutButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<LayoutButton 
	{editor}
	format="codeblock"
	tooltipText="Toggle code block"
	buttonId="toggleCodeBlockButton"
	ariaLabel="Code block"
	class={className}
/>