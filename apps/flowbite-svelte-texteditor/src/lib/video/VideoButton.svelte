<script lang="ts">
  import { getContext } from 'svelte';
  import { Tooltip, Modal, Label, Input, Button } from 'flowbite-svelte';
  import { runVideoCommand, generateButtonId, generateUniqueId, type VideoButtonProps, useEditableContext, type EditorExtensionConfigs } from '$lib';

  let {
    modalChildren,
    editor,
    format = 'default',
    tooltipText,
    id,
    ariaLabel,
    videoOptions = {
      url: 'https://www.youtube.com/watch?v=KaLxCiilHns',
      width: undefined,
      height: undefined
    },
    modalTitle = 'Insert advanced video',
    modalSize = 'xs',
    formId,
    class: className,
    onAdvancedClick,
    ...restProps
  }: VideoButtonProps = $props();

  let defaultModal = $state(false);

  const extensionConfigs = getContext<EditorExtensionConfigs>('editorExtensionConfigs') || {};

  const { youtubeOptions } = extensionConfigs;

  const { editableContext, createEditableHandler, getDefaultButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);

  const defaults = {
    default: { tooltip: 'Add video', aria: 'Add video' },
    advanced: { tooltip: 'Video with settings', aria: 'Add video with settings' }
  };

  const displayTooltipText = $derived.by(() => {
    const base = tooltipText ?? defaults[format].tooltip;
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });
  const finalAriaLabel = ariaLabel ?? defaults[format].aria;
  const uniqueId = id ?? generateButtonId(`Image${format.charAt(0).toUpperCase() + format.slice(1)}`);
  const uniqueFormId = formId ?? generateUniqueId('Form');
  const urlId = generateButtonId('VideoUrl');
  const widthId = generateButtonId('width');
  const heightId = generateButtonId('height');

  const handleClick = $derived(
    createEditableHandler(() => {
      if (!isEditableCtx) return;
      switch (format) {
        case 'default':
          const url = window.prompt('Enter YouTube URL:', 'https://www.youtube.com/watch?v=KaLxCiilHns');
          if (url) {
            runVideoCommand(editor, 'default', { 
              src: url,
              width: youtubeOptions?.width,
              height: youtubeOptions?.height
            });
          }
          break;
        case 'advanced':
          defaultModal = true;
          break;
      }
    }, isEditableCtx)
  );

  function handleSubmit(event: Event) {
    event.preventDefault();
    if (videoOptions.url && editor) {
      runVideoCommand(editor, 'advanced', {
        src: videoOptions.url,
        width: videoOptions.width ?? youtubeOptions?.width,
        height: videoOptions.height ?? youtubeOptions?.height,
      });
    }

    defaultModal = false;
    videoOptions.url = 'https://www.youtube.com/watch?v=KaLxCiilHns';
    videoOptions.width = undefined;
    videoOptions.height = undefined;
  }

  // SVG paths for different formats
  const svgPaths = {
    default: ['M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Zm2 9.387 4.684 1.562A1 1 0 0 0 22 17V7a1 1 0 0 0-1.316-.949L16 7.613v8.774Z'],
    advanced:
      'M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-2 4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H9Zm0 2h2v2H9v-2Zm7.965-.557a1 1 0 0 0-1.692-.72l-1.268 1.218a1 1 0 0 0-.308.721v.733a1 1 0 0 0 .37.776l1.267 1.032a1 1 0 0 0 1.631-.776v-2.984Z'
  };

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
  <Modal title={modalTitle} bind:open={defaultModal} autoclose size={modalSize}>
    {#if modalChildren}
      {@render modalChildren()}
    {:else}
      <form id={uniqueFormId} class="flex flex-col space-y-6" onsubmit={handleSubmit}>
        <div>
          <Label for="URL" class="space-y-2">
            <span>Video URL</span>
            <Input type="url" name="url" id={urlId} bind:value={videoOptions.url} required />
          </Label>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <Label for="width" class="space-y-2">
            <span>Video width</span>
            <Input type="number" name="width" id={widthId} bind:value={videoOptions.width} />
          </Label>
          <Label for="height" class="space-y-2">
            <span>Video height</span>
            <Input type="number" name="height" id={heightId} bind:value={videoOptions.height} />
          </Label>
        </div>
        <Button type="submit" class="w-full">Add video</Button>
      </form>
    {/if}
  </Modal>
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[VideoButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L185)
## Props
@prop modalChildren
@prop editor
@prop format = 'default'
@prop tooltipText
@prop id
@prop ariaLabel
@prop videoUrl = 'https:
    videoWidth,
    videoHeight,
    modalTitle
-->
