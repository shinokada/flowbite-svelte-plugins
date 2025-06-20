<script lang="ts">
  import FormatButton from './FormatButton.svelte';
  import { type EditorBasicProps, generateButtonId } from '$lib';
  import { Dropdown, DropdownItem } from 'flowbite-svelte';

  let { editor, class: className }: EditorBasicProps = $props();
  let isOpen = $state(false);

  // Generate unique ID for this component instance
  const uniqueId = generateButtonId('AlignJustify');

  // Font families with their display names and CSS values
  const fontFamilies = [
    { name: 'Default', value: 'Inter, ui-sans-serif, system-ui, sans-serif' },
    { name: 'Arial', value: 'Arial, sans-serif' },
    { name: 'Courier New', value: '"Courier New", monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Lucida Sans Unicode', value: '"Lucida Sans Unicode", sans-serif' },
    { name: 'Tahoma', value: 'Tahoma, sans-serif' },
    { name: 'Times New Roman', value: '"Times New Roman", serif' },
    { name: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
    { name: 'Verdana', value: 'Verdana, sans-serif' }
  ];

  function setFont(fontFamily: string) {
    console.log('set font');
    if (fontFamily === 'Inter, ui-sans-serif, system-ui, sans-serif') {
      console.log('default so unset');
      // For default font, unset the font family
      editor?.chain().focus().unsetFontFamily().run();
    } else {
      console.log('fontFamily: ', fontFamily);
      editor?.chain().focus().setFontFamily(fontFamily).run();
    }

    isOpen = false;
  }
</script>

<FormatButton {editor} format="fontFamily" tooltipText="Toggle font family" buttonId={uniqueId} ariaLabel="Font family" class={className} />

<Dropdown bind:isOpen simple triggeredBy="#{uniqueId}">
  {#each fontFamilies as font}
    <DropdownItem onclick={() => setFont(font.value)} style="font-family: {font.value};">
      {font.name}
    </DropdownItem>
  {/each}
</Dropdown>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L12)
## Props
@prop editor
@prop class: className
-->
