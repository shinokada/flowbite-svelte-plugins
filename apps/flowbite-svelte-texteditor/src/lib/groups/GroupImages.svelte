<script lang="ts">
  import { type GroupEditorBasicProps, ImageButtons } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <ImageButtons {editor} />
  <ImageButtons {editor} format="advanced" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L144)
## Props
@prop editor
@prop showToolbar = true
-->
