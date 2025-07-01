<script lang="ts">
  import { HtmlCodeButton, SourceButton, type SourceButtonGroupProps } from '$lib';

  let { editor, showToolbar = true, source = true, html = true }: SourceButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if source}
    <SourceButton {editor} />
  {/if}
  {#if html}
    <HtmlCodeButton {editor} />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[SourceButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L223)
## Props
@prop editor
@prop showToolbar = true
@prop source = true
@prop html = true
-->
