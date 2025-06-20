<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton 
	{editor}
	format="removeLink"
	tooltipText="Remove link"
	buttonId="removeLinkButton"
	ariaLabel="Remove link"
	class={className}
/>