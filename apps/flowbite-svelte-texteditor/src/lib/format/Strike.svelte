<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import { type EditorBasicProps } from "$lib";

	let { editor, class: className }: EditorBasicProps = $props();
</script>

<FormatButton 
	{editor}
	format="strike"
	tooltipText="Toggle strike"
	buttonId="toggleStrikeButton"
	ariaLabel="Strike"
	class={className}
/>