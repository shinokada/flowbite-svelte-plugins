<script lang="ts">
  import { Modal, Label, Input, Button } from 'flowbite-svelte';
  import { type VideoAdvancedProps, VideoButton, generateButtonId, generateUniqueId } from '$lib';

  let {
    modalChildren,
    editor,
    tooltipText = 'Video with settings',
    ariaLabel = 'Add video with settings',
    id,
    modalTitle = 'Insert advanced video',
    modalSize = 'xs',
    formId,
    videoUrl = 'https://www.youtube.com/watch?v=KaLxCiilHns',
    videoWidth,
    videoHeight,
    class: className
  }: VideoAdvancedProps = $props();

  const uniqueId = id ?? generateButtonId('Video');
  const uniqueFormId = formId ?? generateUniqueId('Form');

  const urlId = generateButtonId('VideoUrl');
  const widthId = generateButtonId('width');
  const heightId = generateButtonId('height');

  let defaultModal = $state(false);

  function openModal() {
    defaultModal = true;
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    if (videoUrl && editor) {
      editor
        .chain()
        .focus()
        .setYoutubeVideo({
          src: videoUrl,
          width: videoWidth,
          height: videoHeight
        })
        .run();
    }

    // Close modal and reset form
    defaultModal = false;
    videoUrl = '';
    videoWidth;
    videoHeight;
  }
</script>

<VideoButton {editor} format="advanced" {tooltipText} buttonId={uniqueId} {ariaLabel} class={className} onAdvancedClick={openModal} />

<Modal title={modalTitle} bind:open={defaultModal} autoclose size={modalSize}>
  {#if modalChildren}
    {@render modalChildren()}
  {:else}
    <form id={uniqueFormId} class="flex flex-col space-y-6" onsubmit={handleSubmit}>
      <div>
        <Label for="URL" class="space-y-2">
          <span>Video URL</span>
          <Input type="url" name="url" id={urlId} bind:value={videoUrl} required />
        </Label>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <Label for="width" class="space-y-2">
          <span>Video width</span>
          <Input type="number" name="width" id={widthId} bind:value={videoWidth} />
        </Label>
        <Label for="height" class="space-y-2">
          <span>Video height</span>
          <Input type="number" name="height" id={heightId} bind:value={videoHeight} />
        </Label>
      </div>
      <Button type="submit" class="w-full">Add video</Button>
    </form>
  {/if}
</Modal>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[VideoAdvancedProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L118)
## Props
@prop modalChildren
@prop editor
@prop tooltipText = 'Video with settings'
@prop ariaLabel = 'Add video with settings'
@prop id
@prop modalTitle = 'Insert advanced video'
@prop modalSize = 'xs'
@prop formId
@prop videoUrl = 'https:
    videoWidth,
    videoHeight,
    class: className
-->
