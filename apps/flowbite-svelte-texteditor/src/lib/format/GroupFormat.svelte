<script lang="ts">
	import type { Editor } from '@tiptap/core';
	
	import FormatBold from './Bold.svelte';
	import FormatItalic from './Italic.svelte';
	import FormatUnderline from './Underline.svelte';
	import FormatStrike from './Strike.svelte';
	import FormatHighlight from './Highlight.svelte';
	import FormatCode from './Code.svelte';
	import FormatLink from './Link.svelte';
	import FormatRemoveLink from './RemoveLink.svelte';

	let {
		editor,
		showToolbar = true
	}: {
		editor: Editor | null;
		showToolbar?: boolean;
	} = $props();
</script>

{#if editor && showToolbar}
	<FormatBold {editor} />
	<FormatItalic {editor} />
	<FormatUnderline {editor} />
	<FormatStrike {editor} />
	<FormatHighlight {editor} />
	<FormatCode {editor} />
	<FormatLink {editor} />
	<FormatRemoveLink {editor} />
{/if}
