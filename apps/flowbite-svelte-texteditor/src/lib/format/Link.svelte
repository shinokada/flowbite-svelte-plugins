<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import type { Editor } from '@tiptap/core';
	import { type ClassValue } from 'clsx';

	let { editor, class: className }: { editor: Editor | null; class?: ClassValue } = $props();
</script>

<FormatButton 
	{editor}
	format="link"
	tooltipText="Add link"
	buttonId="toggleLinkButton"
	ariaLabel="Link"
	class={className}
/>