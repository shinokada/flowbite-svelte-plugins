<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { runListCommand, type ListAction, generateButtonId, type ListButtonProps, useEditableContext } from '$lib';

  let { editor, format, tooltipText, ariaLabel, id, class: className }: ListButtonProps = $props();

  const { editableContext, createEditableHandler, getDefaultButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);

  const defaults = {
    bullet: { tooltip: 'Toggle list', aria: 'Toggle list' },
    ordered: { tooltip: 'Create ordered list', aria: 'Create ordered list' }
  };

  const displayTooltipText = $derived.by(() => {
    const base = tooltipText ?? defaults[format].tooltip;
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });
  const finalAriaLabel = ariaLabel ?? defaults[format].aria;
  const uniqueId = id ?? generateButtonId(`List${format.charAt(0).toUpperCase() + format.slice(1)}`);

  const svgPaths = {
    bullet: 'M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5',
    ordered: 'M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4'
  };

  const handleClick = $derived(
    createEditableHandler(() => {
      runListCommand(editor, format as ListAction);
    }, isEditableCtx)
  );

  let btnCls = $derived(getDefaultButtonClass(isEditableCtx, className));
</script>

<button onclick={handleClick} id={uniqueId} type="button" class={btnCls}>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths[format]} />
  </svg>
  <span class="sr-only">{finalAriaLabel}</span>
</button>

<Tooltip>{displayTooltipText}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[ListButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L387)
## Props
@prop editor
@prop format
@prop tooltipText
@prop ariaLabel
@prop id
@prop class: className
-->
