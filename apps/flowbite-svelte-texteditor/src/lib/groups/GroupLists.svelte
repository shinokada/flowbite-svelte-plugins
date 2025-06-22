<script lang="ts">
  import { ListButtons, type GroupFormatProps } from '$lib';

  let { editor, showToolbar = true }: GroupFormatProps = $props();
</script>

{#if editor && showToolbar}
  <ListButtons {editor} format="bullet" />
  <ListButtons {editor} format="ordered" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupFormatProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L100)
## Props
@prop editor
@prop showToolbar = true
-->
