<script lang="ts">
  import { Tooltip, Modal, Label, Input, Button } from 'flowbite-svelte';
  import { runImageCommand, generateButtonId, type ImageButtonsProps, useEditableContext } from '$lib';

  let { editor, format = 'basic', tooltipText, ariaLabel, id, imageOptions = { src: 'https://placehold.co/600x400', alt: 'image alt', title: 'image title' }, onAdvancedClick, class: className, ...restProps }: ImageButtonsProps = $props();

  const { editableContext, createEditableHandler, getDefaultButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);

  let defaultModal = $state(false);

  const defaults = {
    basic: { tooltip: 'Add image', aria: 'Add image' },
    advanced: { tooltip: 'Image with settings', aria: 'Add image with settings' }
  };

  const displayTooltipText = $derived.by(() => {
    const base = tooltipText ?? defaults[format].tooltip;
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });
  const finalAriaLabel = ariaLabel ?? defaults[format].aria;
  const uniqueId = id ?? generateButtonId(`Image${format.charAt(0).toUpperCase() + format.slice(1)}`);

  const handleClick = $derived(
    createEditableHandler(() => {
      if (format === 'basic') {
        if (imageOptions.src) {
          runImageCommand(editor, 'basic', { src: imageOptions.src });
        }
      } else {
        defaultModal = true;
      }
    }, isEditableCtx)
  );

  const svgPaths = {
    basic: [
      'M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z',
      'M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z'
    ],
    advanced:
      'M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm.394 9.553a1 1 0 0 0-1.817.062l-2.5 6A1 1 0 0 0 8 19h8a1 1 0 0 0 .894-1.447l-2-4A1 1 0 0 0 13.2 13.4l-.53.706-1.276-2.553ZM13 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z'
  };

  function handleSubmit(event: Event) {
    event.preventDefault();
    if (editor && imageOptions.src) {
      runImageCommand(editor, 'advanced', { src: imageOptions.src, alt: imageOptions.alt, title: imageOptions.title });
    }
    defaultModal = false;
    imageOptions.src = 'https://placehold.co/600x400';
    imageOptions.alt = '';
    imageOptions.title = '';
  }

  let btnCls = $derived(getDefaultButtonClass(isEditableCtx, className));
</script>

<button onclick={handleClick} {...restProps} id={uniqueId} type="button" class={btnCls}>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    {#if typeof svgPaths[format] === 'string'}
      <path fill-rule="evenodd" d={svgPaths[format]} clip-rule="evenodd" />
    {:else}
      <path fill-rule="evenodd" d={svgPaths[format][0]} clip-rule="evenodd" />
      <path fill-rule="evenodd" d={svgPaths[format][1]} clip-rule="evenodd" />
    {/if}
  </svg>
  <span class="sr-only">{finalAriaLabel}</span>
</button>
<Tooltip>{displayTooltipText}</Tooltip>

{#if isEditableCtx}
  <Modal title="Insert advanced image" bind:open={defaultModal} autoclose size="xs">
    <form class="flex flex-col space-y-6" onsubmit={handleSubmit}>
      <Label class="space-y-2">
        <span>Image URL</span>
        <Input type="url" bind:value={imageOptions.src} required />
      </Label>
      <Label class="space-y-2">
        <span>Image alt</span>
        <Input type="text" bind:value={imageOptions.alt} />
      </Label>
      <Label class="space-y-2">
        <span>Image title</span>
        <Input type="text" bind:value={imageOptions.title} />
      </Label>
      <Button type="submit" class="w-full">Add image</Button>
    </form>
  </Modal>
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[ImageButtonsProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L106)
## Props
@prop editor
@prop format = 'basic'
@prop tooltipText
@prop ariaLabel
@prop id
@prop imageUrl = 'https:
-->
