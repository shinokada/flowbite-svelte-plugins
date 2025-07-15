<script lang="ts">
  import { ExportButton, type ExportButtonGroupProps } from '$lib';
  let { editor, showToolbar = true, json = true, html = true }: ExportButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if json}
    <ExportButton {editor} />
  {/if}
  {#if html}
    <ExportButton {editor} format="html" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[ExportButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L292)
## Props
@prop editor
@prop showToolbar = true
@prop json = true
@prop html = true
-->
