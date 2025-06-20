<script lang="ts">
	import { type GroupEditorBasicProps, AlignLeft, AlignCenter, AlignRight, AlignJustify } from '$lib';
	
	let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
	<AlignLeft {editor} />
	<AlignCenter {editor} />
	<AlignRight {editor} />
	<AlignJustify {editor} />
{/if}