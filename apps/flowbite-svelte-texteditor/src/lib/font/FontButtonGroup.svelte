<script lang="ts">
  import { FontButton, type GroupFormatProps } from '$lib';

  let { editor, showToolbar = true }: GroupFormatProps = $props();
</script>

{#if editor && showToolbar}
  <FontButton {editor} format="fontFamily" />
  <FontButton {editor} format="fontSize" />
  <FontButton {editor} format="textColor" />
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
