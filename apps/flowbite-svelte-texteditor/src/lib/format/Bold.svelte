<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton 
	{editor}
	format="bold"
	tooltipText="Toggle bold"
	buttonId="toggleBoldButton"
	ariaLabel="Bold"
	class={className}
/>