<script lang="ts">
  import { TaskListButton, type TaskListButtonGroupProps } from '$lib';
  let { editor, showToolbar = true, toggle = true, split = true, sink = true, lift = true }: TaskListButtonGroupProps = $props();
</script>

{#if editor && showToolbar}
  {#if toggle}
    <TaskListButton {editor} action="toggle" />
  {/if}
  {#if split}
    <TaskListButton {editor} action="split" />
  {/if}
  {#if sink}
    <TaskListButton {editor} action="sink" />
  {/if}
  {#if lift}
    <TaskListButton {editor} action="lift" />
  {/if}
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[TaskListButtonGroupProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L234)
## Props
@prop editor
@prop showToolbar = true
@prop toggle = true
@prop split = true
@prop sink = true
@prop lift = true
-->
