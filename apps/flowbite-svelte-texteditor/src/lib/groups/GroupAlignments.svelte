<script lang="ts">
  import { AlignmentButtons, type GroupEditorBasicProps } from '$lib';
  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <AlignmentButtons {editor} alignment="left" />
  <AlignmentButtons {editor} alignment="center" />
  <AlignmentButtons {editor} alignment="right" />
  <AlignmentButtons {editor} alignment="justify" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L110)
## Props
@prop editor
@prop showToolbar = true
-->
