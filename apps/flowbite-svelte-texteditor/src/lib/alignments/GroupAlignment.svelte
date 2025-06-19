<script lang="ts">
	import type { Editor } from '@tiptap/core';
	
	import AlignLeft from './AlignLeft.svelte';
	import AlignCenter from './AlignCenter.svelte';
	import AlignRight from './AlignRight.svelte';
	import AlignJustify from './AlignJustify.svelte';

	let {
		editor,
		showToolbar = true
	}: {
		editor: Editor | null;
		showToolbar?: boolean;
	} = $props();
</script>

{#if editor && showToolbar}
	<AlignLeft {editor} />
	<AlignCenter {editor} />
	<AlignRight {editor} />
	<AlignJustify {editor} />
{/if}