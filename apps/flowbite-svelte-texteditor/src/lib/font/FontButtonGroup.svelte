<script lang="ts">
  import { FontButton, type FontButtonGroupProps } from '$lib';

  let { editor, showToolbar = true, fontFamily = true, fontSize = true, textColor = true }: FontButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
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
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[FontButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L86)
## Props
@prop editor
@prop showToolbar = true
@prop fontFamily = true
@prop fontSize = true
@prop textColor = true
-->
