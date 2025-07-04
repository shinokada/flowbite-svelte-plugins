<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { runLayoutsCommand, generateButtonId, type LayoutButtonProps, useEditableContext } from '$lib';

  let { editor, format, tooltipText, ariaLabel, id, class: className }: LayoutButtonProps = $props();

  const { editableContext, createEditableHandler, getDefaultButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);

  const defaults = {
    blockquote: { tooltip: 'Toggle blockquote', aria: 'Blockquote' },
    codeblock: { tooltip: 'Toggle code block', aria: 'Code block' },
    hr: { tooltip: 'Toggle horizontal rule', aria: 'Horizontal rule' }
  };

  const displayTooltipText = $derived.by(() => {
    const base = tooltipText ?? defaults[format].tooltip;
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });
  const finalAriaLabel = ariaLabel ?? defaults[format].aria;
  const uniqueId = id ?? generateButtonId(`List${format.charAt(0).toUpperCase() + format.slice(1)}`);

  const svgPaths = {
    blockquote: 'M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z',
    codeblock: 'M4 4h16v16H4zM9 9l-2 2 2 2m6 0l2-2-2-2',
    hr: ['M5 12h14', 'M6 9.5h12m-12 9h12M6 7.5h12m-12 9h12M6 5.5h12m-12 9h12']
  };

  const handleClick = $derived(
    createEditableHandler(() => {
      runLayoutsCommand(editor, format);
    }, isEditableCtx)
  );

  let btnCls = $derived(getDefaultButtonClass(isEditableCtx, className));
</script>

<button onclick={handleClick} id={uniqueId} type="button" class={btnCls}>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    {#if typeof svgPaths[format] === 'string'}
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths[format]} />
    {:else}
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths[format][0]} />
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d={svgPaths[format][1]} />
    {/if}
  </svg>
  <span class="sr-only">{finalAriaLabel}</span>
</button>

<Tooltip>{displayTooltipText}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[LayoutButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L265)
## Props
@prop editor
@prop format
@prop tooltipText
@prop ariaLabel
@prop id
@prop class: className
-->
