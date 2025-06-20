<script lang="ts">
	import { type GroupEditorBasicProps, Blockquote, CodeBlock, HorizontalRule } from '$lib';
	
	let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
	<Blockquote {editor} />
	<CodeBlock {editor} />
	<HorizontalRule {editor} />
{/if}