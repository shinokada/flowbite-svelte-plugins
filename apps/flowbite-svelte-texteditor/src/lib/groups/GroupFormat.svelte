<script lang="ts">
	import { Bold, Italic, Underline, Strike, Highlight, Code, Link, RemoveLink, Subscript, Superscript, type GroupFormatProps } from '$lib';

	let {	editor, showToolbar = true }: GroupFormatProps = $props();
</script>

{#if editor && showToolbar}
	<Bold {editor} />
	<Italic {editor} />
	<Underline {editor} />
	<Strike {editor} />
  <Subscript {editor} />
	<Superscript {editor} />
	<Highlight {editor} />
	<Code {editor} />
	<Link {editor} />
	<RemoveLink {editor} />
{/if}
