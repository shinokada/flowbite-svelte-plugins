<script lang="ts">
  import { type GroupEditorBasicProps, Link, RemoveLink } from '$lib';

  let { editor, showToolbar = true }: GroupEditorBasicProps = $props();
</script>

{#if editor && showToolbar}
  <Link {editor} />
  <RemoveLink {editor} />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupEditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L98)
## Props
@prop editor
@prop showToolbar = true
-->
