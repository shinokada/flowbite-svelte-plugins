<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton 
	{editor}
	format="code"
	tooltipText="Format code"
	buttonId="toggleCodeButton"
	ariaLabel="Code"
	class={className}
/>