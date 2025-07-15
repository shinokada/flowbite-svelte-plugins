<script lang="ts">
  import { LayoutButton, type LayoutButtonGroupProps } from '$lib';

  let { editor, showToolbar = true, blockquote = true, codeblock = true, hr = true }: LayoutButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if blockquote}
    <LayoutButton {editor} format="blockquote" />
  {/if}
  {#if codeblock}
    <LayoutButton {editor} format="codeblock" />
  {/if}
  {#if hr}
    <LayoutButton {editor} format="hr" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[LayoutButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L375)
## Props
@prop editor
@prop showToolbar = true
@prop blockquote = true
@prop codeblock = true
@prop hr = true
-->
