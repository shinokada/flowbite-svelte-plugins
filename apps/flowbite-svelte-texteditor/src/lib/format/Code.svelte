<script lang="ts">
	import FormatButton from './FormatButton.svelte';
	import type { Editor } from '@tiptap/core';
	import { type ClassValue } from 'clsx';

	let { editor, class: className }: { editor: Editor | null; class?: ClassValue } = $props();
</script>

<FormatButton 
	{editor}
	format="code"
	tooltipText="Format code"
	buttonId="toggleCodeButton"
	ariaLabel="Code"
	class={className}
/>