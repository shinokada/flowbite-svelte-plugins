<script lang="ts">
  import { AlignmentButton, type GroupEditorBasicProps } from '$lib';
  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <AlignmentButton {editor} alignment="left" />
  <AlignmentButton {editor} alignment="center" />
  <AlignmentButton {editor} alignment="right" />
  <AlignmentButton {editor} alignment="justify" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L90)
## Props
@prop editor
@prop showToolbar = true
-->
