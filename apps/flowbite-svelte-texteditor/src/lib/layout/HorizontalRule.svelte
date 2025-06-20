<script lang="ts">
	import LayoutButton from './LayoutButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<LayoutButton 
	{editor}
	format="horizontalrule"
	tooltipText="Toggle horizontal rule"
	buttonId="toggleHorizontalRuleButton"
	ariaLabel="Horizontal rule"
	class={className}
/>