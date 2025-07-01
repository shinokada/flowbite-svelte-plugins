<!-- In your FontButtonGroup.svelte or wherever you want to use it -->
<script lang="ts">
  import { FontButton, HeadingButton, type HeadingButtonGroupProps } from '$lib';

  let { editor, showToolbar = true, fontFamily = true, fontSize = true, textColor = true }: HeadingButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  <HeadingButton {editor} />
  {#if fontFamily}
    <FontButton {editor} format="fontFamily" />
  {/if}
  {#if fontSize}
    <FontButton {editor} format="fontSize" />
  {/if}
  {#if textColor}
    <FontButton {editor} format="textColor" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[HeadingButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L162)
## Props
@prop editor
@prop showToolbar = true
@prop fontFamily = true
@prop fontSize = true
@prop textColor = true
-->
