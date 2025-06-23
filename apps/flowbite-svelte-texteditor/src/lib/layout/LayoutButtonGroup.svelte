<script lang="ts">
  import { LayoutButton, type GroupFormatProps } from '$lib';

  let { editor, showToolbar = true }: GroupFormatProps = $props();
</script>

{#if editor && showToolbar}
  <LayoutButton {editor} format="blockquote" />
  <LayoutButton {editor} format="codeblock" />
  <LayoutButton {editor} format="hr" />
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[GroupFormatProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L104)
## Props
@prop editor
@prop showToolbar = true
-->
