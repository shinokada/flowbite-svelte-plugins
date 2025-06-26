<script lang="ts">
  import { ListButton, type ListButtonGroupProps } from '$lib';

  let { editor, showToolbar = true, bullet = true, ordered = true }: ListButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if bullet}
    <ListButton {editor} format="bullet" />
  {/if}
  {#if ordered}
    <ListButton {editor} format="ordered" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[ListButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L124)
## Props
@prop editor
@prop showToolbar = true
@prop bullet = true
@prop ordered = true
-->
