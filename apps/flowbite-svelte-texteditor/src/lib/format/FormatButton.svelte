<script lang="ts">
  import { runFormatCommand, type FormatAction, type FormatButtonProps, generateButtonId, useEditableContext } from '$lib';
  import { Tooltip } from 'flowbite-svelte';

  let { editor, format, tooltipText, ariaLabel, id, class: className }: FormatButtonProps = $props();

  const { editableContext, createEditableHandlerWithParams, getDefaultButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);

  const defaults = {
    bold: { tooltip: 'Toggle bold', aria: 'Bold' },
    code: { tooltip: 'Format code', aria: 'Code' },
    highlight: { tooltip: 'Toggle highlight', aria: 'Highlight' },
    italic: { tooltip: 'Toggle italic', aria: 'Italic' },
    link: { tooltip: 'Add link', aria: 'Link' },
    removeLink: { tooltip: 'Remove link', aria: 'Remove link' },
    strike: { tooltip: 'Toggle strike', aria: 'Strike' },
    subscript: { tooltip: 'Toggle subscript', aria: 'Subscript' },
    superscript: { tooltip: 'Toggle superscript', aria: 'Superscript' },
    underline: { tooltip: 'Toggle underline', aria: 'Underline' },
    br: { tooltip: 'Set <br>', aria: '<br>' }
  };

  // const finalTooltipText = tooltipText ?? defaults[format].tooltip;
  const displayTooltipText = $derived.by(() => {
    const base = tooltipText ?? defaults[format].tooltip;
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });
  const finalAriaLabel = ariaLabel ?? defaults[format].aria;
  const uniqueId = id ?? generateButtonId(`Align${format.charAt(0).toUpperCase() + format.slice(1)}`);

  const handleClick = $derived(
    createEditableHandlerWithParams((format: FormatAction) => {
      if (format === 'link') {
        const url = window.prompt('Enter a URL');
        if (url) runFormatCommand(editor, format, { href: url });
      } else {
        runFormatCommand(editor, format);
      }
    }, isEditableCtx)
  );

  const svgPaths = {
    bold: 'M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6',
    italic: 'm8.874 19 6.143-14M6 19h6.33m-.66-14H18',
    underline: 'M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4',
    strike: 'M7 6.2V5h12v1.2M7 19h6m.2-14-1.677 6.523M9.6 19l1.029-4M5 5l6.523 6.523M19 19l-7.477-7.477',
    highlight: 'M9 19.2H5.5c-.3 0-.5-.2-.5-.5V16c0-.2.2-.4.5-.4h13c.3 0 .5.2.5.4v2.7c0 .3-.2.5-.5.5H18m-6-1 1.4 1.8h.2l1.4-1.7m-7-5.4L12 4c0-.1 0-.1 0 0l4 8.8m-6-2.7h4m-7 2.7h2.5m5 0H17',
    code: 'm8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14',
    link: 'M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961',
    removeLink: 'M13.2 9.8a3.4 3.4 0 0 0-4.8 0L5 13.2A3.4 3.4 0 0 0 9.8 18l.3-.3m-.3-4.5a3.4 3.4 0 0 0 4.8 0L18 9.8A3.4 3.4 0 0 0 13.2 5l-1 1m7.4 14-1.8-1.8m0 0L16 16.4m1.8 1.8 1.8-1.8m-1.8 1.8L16 20',
    subscript: 'M19.9999 21h-4v-.5c1.0989-1.0329 3.75-2.5 3.75-3.5v-1.0001c0-.5523-.4477-.9999-1-.9999h-1.75c-.5523 0-1 .4477-1 1M3.99986 6l9.26894 11.5765M13.1219 6 3.85303 17.5765',
    superscript: 'M21.0002 11h-4l-.0001-.5C18.099 9.46711 20.7502 8 20.7502 7V5.99989c0-.55228-.4478-.99989-1-.99989h-1.75c-.5523 0-1 .44772-1 1M5.37837 7.98274 14.6473 19.5593m-.5251-11.25583L4.85547 19.8773',
    br: 'M3 7v10m0-5h18m-3-3 3 3-3 3'
  };

  let btnCls = $derived(getDefaultButtonClass(isEditableCtx, className));
</script>

<button onclick={() => handleClick(format)} id={uniqueId} type="button" class={btnCls}>
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
[FormatButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L312)
## Props
@prop editor
@prop format
@prop tooltipText
@prop ariaLabel
@prop id
@prop class: className
-->
