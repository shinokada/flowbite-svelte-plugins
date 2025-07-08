<script lang="ts">
  import { type YoutubeButtonGroupProps, YoutubeButton } from '$lib';

  let { editor, showToolbar = true, basic = true, advanced = true }: YoutubeButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if basic}
    <YoutubeButton {editor} />
  {/if}
  {#if advanced}
    <YoutubeButton {editor} format="advanced" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[YoutubeButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L508)
## Props
@prop editor
@prop showToolbar = true
@prop basic = true
@prop advanced = true
-->
