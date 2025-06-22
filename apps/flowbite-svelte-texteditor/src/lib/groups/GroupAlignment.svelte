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

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L110)
## Props
@prop editor
@prop showToolbar = true
-->
