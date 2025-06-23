<script lang="ts">
  import { type GroupEditorBasicProps, ImageButton } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <ImageButton {editor} />
  <ImageButton {editor} format="advanced" />
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
