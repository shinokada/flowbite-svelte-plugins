<script lang="ts">
  import { type GroupEditorBasicProps, Blockquote, CodeBlock, HorizontalRule } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <Blockquote {editor} />
  <CodeBlock {editor} />
  <HorizontalRule {editor} />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L65)
## Props
@prop editor
@prop showToolbar = true
-->
