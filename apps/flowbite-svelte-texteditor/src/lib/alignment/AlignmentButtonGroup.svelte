<script lang="ts">
  import { AlignmentButton, type AlignmentButtonGroupProps } from '$lib';
  let { editor, showToolbar = true, left = true, center = true, right = true, justify = true }: AlignmentButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if left}
    <AlignmentButton {editor} alignment="left" />
  {/if}
  {#if center}
    <AlignmentButton {editor} alignment="center" />
  {/if}
  {#if right}
    <AlignmentButton {editor} alignment="right" />
  {/if}
  {#if justify}
    <AlignmentButton {editor} alignment="justify" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[AlignmentButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L150)
## Props
@prop editor
@prop showToolbar = true
@prop left = true
@prop center = true
@prop right = true
@prop justify = true
-->
