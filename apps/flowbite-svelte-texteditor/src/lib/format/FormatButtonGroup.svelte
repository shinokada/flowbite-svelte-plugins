<script lang="ts">
  import { FormatButton, type GroupFormatProps } from '$lib';

  let { editor, showToolbar = true }: GroupFormatProps = $props();
</script>

{#if editor && showToolbar}
  <FormatButton {editor} format="bold" />
  <FormatButton {editor} format="code" />
  <FormatButton {editor} format="highlight" />
  <FormatButton {editor} format="italic" />
  <FormatButton {editor} format="link" />
  <FormatButton {editor} format="removeLink" />
  <FormatButton {editor} format="strike" />
  <FormatButton {editor} format="subscript" />
  <FormatButton {editor} format="superscript" />
  <FormatButton {editor} format="underline" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupFormatProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L104)
## Props
@prop editor
@prop showToolbar = true
-->
