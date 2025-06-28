<script lang="ts">
  import { runTaskCommand, cn, generateButtonId } from '$lib';
  import { type TaskListButtonProps } from '$lib/types';
  let { editor, action, ariaLabel, id, class: className }: TaskListButtonProps = $props();

  const defaults = {
    toggle: { tooltip: 'Toggle task list', aria: 'Toggle task list' },
    split: { tooltip: 'Split list item', aria: 'Split list item' },
    sink: { tooltip: 'Sink list item', aria: 'Sink list item' },
    lift: { tooltip: 'Lift list item', aria: 'Lift list item' }
  };

  const finalAriaLabel = ariaLabel ?? defaults[action].aria;
  const uniqueId = id ?? generateButtonId(`TaskList${action.charAt(0).toUpperCase() + action.slice(1)}`);

  function handleClick() {
    runTaskCommand(editor, action);
  }

  const titles = {
    toggle: 'Toggle task list',
    split: 'Split list item',
    sink: 'Sink list item',
    lift: 'Lift list item'
  };
</script>

<button onclick={handleClick} id={uniqueId} type="button" class={cn('cursor-pointer rounded-sm bg-gray-50 p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed  disabled:opacity-50 dark:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-white', className)}>
  <span class="text-sm font-medium">{titles[action]}</span>
  <span class="sr-only">{finalAriaLabel}</span>
</button>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[TaskListButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L230)
## Props
@prop editor
@prop action
@prop ariaLabel
@prop id
@prop class: className
-->
