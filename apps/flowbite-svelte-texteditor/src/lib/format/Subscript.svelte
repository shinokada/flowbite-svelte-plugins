<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton 
	{editor}
	format="subscript"
	tooltipText="Toggle subscript"
	buttonId="toggleSubscriptButton"
	ariaLabel="Subscirpt"
	class={className}
/>