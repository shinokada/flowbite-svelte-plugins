<script lang="ts">
	import AlignmentButton from './AlignmentButton.svelte';
	import type { Editor } from '@tiptap/core';
	import { type ClassValue } from 'clsx';

	let { editor, class: className }: { editor: Editor | null; class?:ClassValue } = $props();
</script>

<AlignmentButton 
	{editor}
	alignment="left"
	tooltipText="Align left"
	buttonId="toggleLeftAlignButton"
	ariaLabel="Align left"
	class={className}
/>