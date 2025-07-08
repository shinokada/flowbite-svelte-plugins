<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { runTaskCommand, generateButtonId, useEditableContext, type TaskListButtonProps } from '$lib';

  let { editor, action, ariaLabel, id, class: className }: TaskListButtonProps = $props();

  const { editableContext, createEditableHandler, getDefaultButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);

  const defaults = {
    toggle: { tooltip: 'Toggle task list', aria: 'Toggle task list' },
    split: { tooltip: 'Split list item', aria: 'Split list item' },
    sink: { tooltip: 'Sink list item', aria: 'Sink list item' },
    lift: { tooltip: 'Lift list item', aria: 'Lift list item' }
  };

  const displayTooltipText = $derived.by(() => {
    const base = ariaLabel ?? defaults[action].aria;
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });
  const uniqueId = id ?? generateButtonId(`TaskList${action.charAt(0).toUpperCase() + action.slice(1)}`);

  const handleClick = $derived(
    createEditableHandler(() => {
      runTaskCommand(editor, action);
    }, isEditableCtx)
  );

  const titles = {
    toggle: 'Toggle task list',
    split: 'Split list item',
    sink: 'Sink list item',
    lift: 'Lift list item'
  };

  let btnCls = $derived(getDefaultButtonClass(isEditableCtx, className));
</script>

<button onclick={handleClick} id={uniqueId} type="button" class={btnCls}>
  <span class="text-sm font-medium">{titles[action]}</span>
  <span class="sr-only">{displayTooltipText}</span>
</button>

<Tooltip>{displayTooltipText}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[TaskListButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L464)
## Props
@prop editor
@prop action
@prop ariaLabel
@prop id
@prop class: className
-->
