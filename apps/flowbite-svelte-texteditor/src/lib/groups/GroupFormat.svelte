<script lang="ts">
  import { Bold, Italic, Underline, Strike, Highlight, Code, Link, RemoveLink, Subscript, Superscript, FontFamily, type GroupFormatProps } from '$lib';

  let { editor, showToolbar = true }: GroupFormatProps = $props();
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
  <FontFamily {editor} />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupFormatProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L69)
## Props
@prop editor
@prop showToolbar = true
-->
