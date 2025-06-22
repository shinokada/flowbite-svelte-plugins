<script lang="ts">
  import { FormatButtons, type GroupFormatProps } from '$lib';

  let { editor, showToolbar = true }: GroupFormatProps = $props();
</script>

{#if editor && showToolbar}
  <FormatButtons {editor} format="bold" />
  <FormatButtons {editor} format="code" />
  <FormatButtons {editor} format="highlight" />
  <FormatButtons {editor} format="italic" />
  <FormatButtons {editor} format="link" />
  <FormatButtons {editor} format="removeLink" />
  <FormatButtons {editor} format="strike" />
  <FormatButtons {editor} format="subscript" />
  <FormatButtons {editor} format="superscript" />
  <FormatButtons {editor} format="underline" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupFormatProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L158)
## Props
@prop editor
@prop showToolbar = true
-->
