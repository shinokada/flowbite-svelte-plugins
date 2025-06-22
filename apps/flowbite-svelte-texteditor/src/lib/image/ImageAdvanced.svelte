<script lang="ts">
  import { Modal, Label, Input, Button } from 'flowbite-svelte';
  import { type EditorBasicProps, ImageButton, generateButtonId } from '$lib';

  let { editor, class: className }: EditorBasicProps = $props();

  const uniqueId = generateButtonId('ImageAdvanced');

  let imageUrl = $state('https://placehold.co/600x400');
  let imageAlt = $state('');
  let imageTitle = $state('');
  let defaultModal = $state(false);

  function openModal() {
    defaultModal = true;
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    if (imageUrl && editor) {
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
          alt: imageAlt || '',
          title: imageTitle || ''
        })
        .run();
    }

    // Close modal and reset form
    defaultModal = false;
    imageUrl = 'https://placehold.co/600x400';
    imageAlt = '';
    imageTitle = '';
  }
</script>

<ImageButton {editor} format="advanced" tooltipText="Image with settings" buttonId={uniqueId} ariaLabel="Add image with settings" class={className} onAdvancedClick={openModal} />

<Modal title="Insert advanced image" bind:open={defaultModal} autoclose size="xs">
  <form class="flex flex-col space-y-6" onsubmit={handleSubmit}>
    <Label class="space-y-2">
      <span>Image URL</span>
      <Input type="url" bind:value={imageUrl} required />
    </Label>
    <Label class="space-y-2">
      <span>Image alt</span>
      <Input type="text" bind:value={imageAlt} />
    </Label>
    <Label class="space-y-2">
      <span>Image title</span>
      <Input type="text" bind:value={imageTitle} />
    </Label>
    <Button type="submit" class="w-full">Add image</Button>
  </form>
</Modal>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L44)
## Props
@prop editor
@prop class: className
-->
