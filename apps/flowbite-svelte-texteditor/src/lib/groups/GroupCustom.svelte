<script lang="ts">
  import { type GroupEditorBasicProps, AlignmentButtons, FontButtons, FormatButtons, ImageButtons } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <AlignmentButtons {editor} alignment="left" />
  <AlignmentButtons {editor} alignment="right" />
  <ImageButtons {editor} />
  <FontButtons {editor} format="fontSize" />
  <FormatButtons {editor} format="italic" />
  <FormatButtons {editor} format="link" />
  <FormatButtons {editor} format="removeLink" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L86)
## Props
@prop editor
@prop showToolbar = true
-->
