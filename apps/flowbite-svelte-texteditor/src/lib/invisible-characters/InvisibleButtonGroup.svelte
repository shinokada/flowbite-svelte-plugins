<script lang="ts">
  import { InvisibleButton, type InvisibleButtonGroupProps } from '$lib';
  let { editor, showToolbar = true, toggle = true, show = true, hide = true }: InvisibleButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if toggle}
    <InvisibleButton {editor} action="toggle" />
  {/if}
  {#if show}
    <InvisibleButton {editor} action="show" />
  {/if}
  {#if hide}
    <InvisibleButton {editor} action="hide" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[InvisibleButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L191)
## Props
@prop editor
@prop showToolbar = true
@prop toggle = true
@prop show = true
@prop hide = true
-->
