<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { runAlignmentCommand, type AlignmentAction, generateButtonId, type AlignmentButtonProps, useEditableContext } from '$lib';

  let { editor, alignment, tooltipText, ariaLabel, id, class: className }: AlignmentButtonProps = $props();

  const { editableContext, createEditableHandler, getDefaultButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);
 
  const defaults = {
    left: { tooltip: 'Align left', aria: 'Align left' },
    center: { tooltip: 'Align center', aria: 'Align center' },
    right: { tooltip: 'Align right', aria: 'Align right' },
    justify: { tooltip: 'Justify text', aria: 'Justify' }
  };

  const displayTooltipText = $derived.by(() => {
    const base = tooltipText ?? defaults[alignment].tooltip;
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });
  const finalAriaLabel = ariaLabel ?? defaults[alignment].aria;
  const uniqueId = id ?? generateButtonId(`Align${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`);

  const handleClick = $derived(createEditableHandler(() => {
    runAlignmentCommand(editor, alignment as AlignmentAction);
  }, isEditableCtx));

  const svgPaths = {
    left: 'M6 6h8m-8 4h12M6 14h8m-8 4h12',
    center: 'M8 6h8M6 10h12M8 14h8M6 18h12',
    right: 'M18 6h-8m8 4H6m12 4h-8m8 4H6',
    justify: 'M18 6H6m12 4H6m12 4H6m12 4H6'
  };

  let btnCls = $derived(getDefaultButtonClass(isEditableCtx, className));
</script>

<button onclick={handleClick} id={uniqueId} type="button" class={btnCls}>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths[alignment]} />
  </svg>
  <span class="sr-only">{finalAriaLabel}</span>
</button>
<Tooltip>{displayTooltipText}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[AlignmentButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L141)
## Props
@prop editor
@prop alignment
@prop tooltipText
@prop ariaLabel
@prop id
@prop class: className
-->
