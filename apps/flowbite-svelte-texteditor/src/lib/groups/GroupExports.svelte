<script lang="ts">
  import { ExportButtons, type GroupEditorBasicProps } from '$lib';
  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <ExportButtons {editor} />
  <ExportButtons {editor} format="html" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L89)
## Props
@prop editor
@prop showToolbar = true
-->
