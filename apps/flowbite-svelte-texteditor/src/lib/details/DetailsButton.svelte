<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { runDetailsCommand, type DetailsAction, generateButtonId, type DetailsButtonProps, useEditableContext } from '$lib';

  let { editor, action, ariaLabel, id, tooltipText, class: className }: DetailsButtonProps = $props();

  const { editableContext, createEditableHandler, getDefaultButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);

  const defaults = {
    set: { tooltip: 'Add details', aria: 'Add details' },
    unset: { tooltip: 'Remove details', aria: 'Remove details' }
  };

  const displayTooltipText = $derived.by(() => {
    const base = tooltipText ?? defaults[action].tooltip;
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });
  const finalAriaLabel = ariaLabel ?? defaults[action].aria;
  const uniqueId = id ?? generateButtonId(`Details${action.charAt(0).toUpperCase() + action.slice(1)}`);

  const handleClick = $derived(
    createEditableHandler(() => {
      runDetailsCommand(editor, action as DetailsAction);
    }, isEditableCtx)
  );

  const titles = {
    set: 'Set details',
    unset: 'Unset details'
  };

  let btnCls = $derived(getDefaultButtonClass(isEditableCtx, className));
</script>

<button onclick={handleClick} id={uniqueId} type="button" class={btnCls}>
  <span class="text-sm font-medium">{titles[action]}</span>
  <span class="sr-only">{finalAriaLabel}</span>
</button>

<Tooltip>{displayTooltipText}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[DetailsButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L169)
## Props
@prop editor
@prop action
@prop ariaLabel
@prop id
@prop tooltipText
@prop class: className
-->
