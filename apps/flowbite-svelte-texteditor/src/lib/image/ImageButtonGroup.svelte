<script lang="ts">
  import { type ImageButtonGroupProps, ImageButton } from '$lib';

  let { editor, showToolbar = true, basic = true, advanced = true }: ImageButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if basic}
    <ImageButton {editor} />
  {/if}
  {#if advanced}
    <ImageButton {editor} format="advanced" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[ImageButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L113)
## Props
@prop editor
@prop showToolbar = true
@prop basic = true
@prop advanced = true
-->
