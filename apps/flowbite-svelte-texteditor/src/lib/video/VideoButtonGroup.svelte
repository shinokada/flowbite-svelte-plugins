<script lang="ts">
  import { type VideoButtonGroupProps, VideoButton } from '$lib';

  let { editor, showToolbar = true, basic = true, advanced = true }: VideoButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if basic}
    <VideoButton {editor} />
  {/if}
  {#if advanced}
    <VideoButton {editor} format="advanced" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[VideoButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L315)
## Props
@prop editor
@prop showToolbar = true
@prop basic = true
@prop advanced = true
-->
