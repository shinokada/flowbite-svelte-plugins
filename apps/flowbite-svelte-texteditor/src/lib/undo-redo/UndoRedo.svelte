<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { runUndoRedoCommand, cn, type UndoRedoProps, generateButtonId, useEditableContext } from '$lib';

  let { editor, action, class: className, iconClass, ...restProps }: UndoRedoProps = $props();

  const { editableContext, createEditableHandler, getDefaultButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);

  const handleClick = $derived(
    createEditableHandler(() => {
      runUndoRedoCommand(editor, action);
    }, isEditableCtx)
  );

  const config = {
    undo: {
      id: generateButtonId('Undo'),
      label: 'Undo',
      path: 'M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4'
    },
    redo: {
      id: generateButtonId('Redo'),
      label: 'Redo',
      path: 'M21 9H8a5 5 0 0 0 0 10h9m4-10-4-4m4 4-4 4'
    }
  };

  const currentConfig = $derived(config[action]);

  const displayTooltipText = $derived.by(() => {
    const base = currentConfig.label ?? currentConfig.label;
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });

  let btnCls = $derived(getDefaultButtonClass(isEditableCtx, className));
</script>

<button onclick={handleClick} {...restProps} id={currentConfig.id} type="button" class={btnCls}>
  <svg class={cn('h-5 w-5', iconClass)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={currentConfig.path} />
  </svg>
  <span class="sr-only">{currentConfig.label}</span>
</button>
<Tooltip>{displayTooltipText}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[UndoRedoProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L364)
## Props
@prop editor
@prop action
@prop class: className
@prop iconClass
@prop ...restProps
-->
