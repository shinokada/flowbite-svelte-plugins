<script lang="ts">
	import AlignmentButton from './AlignmentButton.svelte';
	import type { Editor } from '@tiptap/core';
	import { type ClassValue } from 'clsx';

	let { editor, class: className }: { editor: Editor | null; class?:ClassValue } = $props();
</script>

<AlignmentButton 
	{editor}
	alignment="right"
	tooltipText="Align right"
	buttonId="toggleRightAlignButton"
	ariaLabel="Align right"
	class={className}
/>