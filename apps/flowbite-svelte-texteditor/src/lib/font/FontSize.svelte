<script lang="ts">
  import FormatButton from '../format/FormatButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';
  import { Dropdown, DropdownItem } from 'flowbite-svelte';

  let { editor, class: className }: EditorBasicProps = $props();
  let isOpen = $state(false);

  // Generate unique ID for this component instance
  const uniqueId = generateButtonId('FontSize');

  // Font sizes with proper values
  const fontSizes = [
    { name: '12px (Tiny)', value: '12px' },
    { name: '14px (Small)', value: '14px' },
    { name: '16px (Default)', value: '16px' },
    { name: '18px (Lead)', value: '18px' },
    { name: '24px (Large)', value: '24px' },
    { name: '36px (Huge)', value: '36px' }
  ];

  function setFont(fontSize: string) {
    editor?.chain().focus().setMark('textStyle', { fontSize }).run();
    isOpen = false;
  }

  function removeFormat() {
    editor?.chain().focus().unsetMark('textStyle').run();
    isOpen = false;
  }
</script>

<FormatButton {editor} format="fontSize" tooltipText="Font size" buttonId={uniqueId} ariaLabel="Font size" class={className} />

<Dropdown bind:isOpen simple triggeredBy="#{uniqueId}">
  {#each fontSizes as font}
    <DropdownItem onclick={() => setFont(font.value)} style="font-size: {font.value};">
      {font.name}
    </DropdownItem>
  {/each}
  <DropdownItem onclick={removeFormat}>Remove formatting</DropdownItem>
</Dropdown>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L44)
## Props
@prop editor
@prop class: className
-->
