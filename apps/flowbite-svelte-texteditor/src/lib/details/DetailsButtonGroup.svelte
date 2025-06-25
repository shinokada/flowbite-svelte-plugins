<script lang="ts">
  import { DetailsButton, type DetailsButtonGroupProps } from '$lib';

  let { editor, showToolbar = true, set = true, unset = true }: DetailsButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if set}
    <DetailsButton {editor} action="set" />
  {/if}
  {#if unset}
    <DetailsButton {editor} action="unset" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[DetailsButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L49)
## Props
@prop editor
@prop showToolbar = true
@prop set = true
@prop unset = true
-->
