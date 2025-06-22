<script lang="ts">
  import { FontButtons, type GroupFormatProps } from '$lib';

  let { editor, showToolbar = true }: GroupFormatProps = $props();
</script>

{#if editor && showToolbar}
  <FontButtons {editor} format="fontFamily" />
  <FontButtons {editor} format="fontSize" />
  <FontButtons {editor} format="textColor" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupFormatProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L158)
## Props
@prop editor
@prop showToolbar = true
-->
