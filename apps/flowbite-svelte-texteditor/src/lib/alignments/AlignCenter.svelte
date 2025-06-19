<script lang="ts">
	import AlignmentButton from './AlignmentButton.svelte';
	import type { Editor } from '@tiptap/core';
	import { type ClassValue } from 'clsx';

	let { editor, class: className }: { editor: Editor | null; class?:ClassValue } = $props();
</script>

<AlignmentButton 
	{editor}
	alignment="center"
	tooltipText="Align center"
	buttonId="toggleCenterAlignButton"
	ariaLabel="Align center"
	class={className}
/>