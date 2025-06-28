<script lang="ts">
  import { type GroupEditorBasicProps, AlignmentButton, FontButton, FormatButton, ImageButton } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <AlignmentButton {editor} alignment="left" />
  <AlignmentButton {editor} alignment="right" />
  <ImageButton {editor} />
  <FontButton {editor} format="fontSize" />
  <FormatButton {editor} format="italic" />
  <FormatButton {editor} format="link" />
  <FormatButton {editor} format="removeLink" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L280)
## Props
@prop editor
@prop showToolbar = true
-->
