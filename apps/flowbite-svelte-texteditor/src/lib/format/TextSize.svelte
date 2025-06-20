<script lang="ts">
  import FormatButton from './FormatButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';
  import { Dropdown, DropdownItem } from 'flowbite-svelte';

  let { editor, class: className }: EditorBasicProps = $props();
  let isOpen = $state(false);

  // Generate unique ID for this component instance
  const uniqueId = generateButtonId('FontSize');

  // Font families with their display names and CSS values
  const fontSizes = [
    { name: '16px (Default)', value: 'Inter, ui-sans-serif, system-ui, sans-serif' },
    { name: '12px (Tiny)', value: '12px' },
    { name: '14px (Small)', value: '14px' },
    { name: '18px (Lead)', value: '18px' },
    { name: '24px (Large)', value: '24px' },
    { name: '36px (Huge)', value: '36px' }
  ];

  function setFont(fontSize: string) {
    editor?.chain().focus().setMark('textStyle', { fontSize }).run();
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
</Dropdown>
