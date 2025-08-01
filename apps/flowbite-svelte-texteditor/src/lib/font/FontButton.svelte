<script lang="ts">
  import { Tooltip, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { setFontFamily, setFontSize, removeFontSizeFormatting, setTextColor, removeTextColorFormatting, generateButtonId, useEditableContext } from '$lib';
  import { type FontButtonProps } from '$lib/types';

  let { editor, format, tooltipText, ariaLabel, colorValue = '#e66465', id, class: className }: FontButtonProps = $props();

  let isOpen = $state(false);

  const { editableContext, createEditableHandler, getDefaultButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);

  const defaults = {
    fontFamily: { tooltip: 'Font family', aria: 'Font family' },
    fontSize: { tooltip: 'Font size', aria: 'Font size' },
    textColor: { tooltip: 'Font color', aria: 'Font color' }
  };

  const displayTooltipText = $derived.by(() => {
    const base = tooltipText ?? defaults[format].tooltip;
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });
  const finalAriaLabel = ariaLabel ?? defaults[format].aria;
  const uniqueId = id ?? generateButtonId(`Font${format.charAt(0).toUpperCase() + format.slice(1)}`);

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

  // Font sizes with proper values
  const fontSizes = [
    { name: '12px (Tiny)', value: '12px' },
    { name: '14px (Small)', value: '14px' },
    { name: '16px (Default)', value: '16px' },
    { name: '18px (Lead)', value: '18px' },
    { name: '24px (Large)', value: '24px' },
    { name: '36px (Huge)', value: '36px' }
  ];

  const textColors = [
    { name: 'Blue', value: '#1A56DB' },
    { name: 'Green', value: '#0E9F6E' },
    { name: 'Yellow', value: '#FACA15' },
    { name: 'Red', value: '#F05252' },
    { name: 'Orange', value: '#FF8A4C' },
    { name: 'Teal', value: '#0694A2' },
    { name: 'Light indigo', value: '#B4C6FC' },
    { name: 'Indigo', value: '#8DA2FB' },
    { name: 'Purple', value: '#5145CD' },
    { name: 'Brown', value: '#771D1D' },
    { name: 'Light orange', value: '#FCD9BD' },
    { name: 'Bordo', value: '#99154B' },
    { name: 'Dark Purple', value: '#7E3AF2' },
    { name: 'Light', value: '#CABFFD' },
    { name: 'Dark Pink', value: '#D61F69' },
    { name: 'Pink', value: '#F8B4D9' },
    { name: 'Cream', value: '#F6C196' },
    { name: 'Light Blue', value: '#A4CAFE' },
    { name: 'Dark Blue', value: '#5145CD' },
    { name: 'Orange Brown', value: '#B43403' },
    { name: 'Light Yellow', value: '#FCE96A' },
    { name: 'Navy Blue', value: '#1E429F' },
    { name: 'Light Purple', value: '#768FFD' },
    { name: 'Light Green', value: '#BCF0DA' },
    { name: 'Sky Blue', value: '#EBF5FF' },
    { name: 'Cyan', value: '#16BDCA' },
    { name: 'Pink', value: '#E74694' },
    { name: 'Darker Sky Blue', value: '#83B0ED' },
    { name: 'Forest Green', value: '#03543F' },
    { name: 'Black', value: '#111928' },
    { name: 'Stone', value: '#4B5563' },
    { name: 'Gray', value: '#6B7280' },
    { name: 'Light Gray', value: '#D1D5DB' },
    { name: 'Cloud Gray', value: '#F3F4F6' },
    { name: 'Heaven Gray', value: '#F9FAFB' }
  ];

  const svgPaths = {
    fontFamily: 'm10.6 19 4.298-10.93a.11.11 0 0 1 .204 0L19.4 19m-8.8 0H9.5m1.1 0h1.65m7.15 0h-1.65m1.65 0h1.1m-7.7-3.985h4.4M3.021 16l1.567-3.985m0 0L7.32 5.07a.11.11 0 0 1 .205 0l2.503 6.945h-5.44Z',
    fontSize: 'M3 6.2V5h11v1.2M8 5v14m-3 0h6m2-6.8V11h8v1.2M17 11v8m-1.5 0h3',
    textColor: 'm6.532 15.982 1.573-4m-1.573 4h-1.1m1.1 0h1.65m-.077-4 2.725-6.93a.11.11 0 0 1 .204 0l2.725 6.93m-5.654 0H8.1m.006 0h5.654m0 0 .617 1.569m5.11 4.453c0 1.102-.854 1.996-1.908 1.996-1.053 0-1.907-.894-1.907-1.996 0-1.103 1.907-4.128 1.907-4.128s1.909 3.025 1.909 4.128Z'
  };

  let btnCls = $derived(getDefaultButtonClass(isEditableCtx, className));
</script>

<button id={uniqueId} type="button" class={btnCls}>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths[format]} />
  </svg>
  <span class="sr-only">{finalAriaLabel}</span>
</button>

<Tooltip>{displayTooltipText}</Tooltip>

{#if isEditableCtx}
  <Dropdown bind:isOpen simple triggeredBy="#{uniqueId}">
    {#if format === 'fontFamily'}
      {#each fontFamilies as font}
        <DropdownItem onclick={() => setFontFamily(editor, font.value)} style="font-family: {font.value};">
          {font.name}
        </DropdownItem>
      {/each}
    {:else if format === 'fontSize'}
      {#each fontSizes as font}
        <DropdownItem onclick={() => setFontSize(editor, font.value)} style="font-size: {font.value};">
          {font.name}
        </DropdownItem>
      {/each}
      <DropdownItem onclick={() => removeFontSizeFormatting(editor)}>Remove formatting</DropdownItem>
    {:else if format === 'textColor'}
      <div class="p-2">
        <div class="group mb-3 grid grid-cols-6 items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600">
          <input
            type="color"
            id="color"
            bind:value={colorValue}
            onchange={() => setTextColor(editor, colorValue)}
            class="col-span-3 h-8 w-full rounded-md border border-gray-200 bg-gray-50 p-px px-1 group-hover:bg-gray-50 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:group-hover:bg-gray-700"
          />
          <label for="color" class="col-span-3 text-sm font-medium text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">Pick a color</label>
        </div>
        <div class="mb-3 grid grid-cols-6 gap-1">
          {#each textColors as color}
            <button type="button" onclick={() => setTextColor(editor, color.value)} style="background-color: {color.value}" class="h-6 w-6 rounded-md transition-transform duration-150 hover:scale-110" title={color.name}>
              <span class="sr-only">{color.name}</span>
            </button>
          {/each}
        </div>
        <DropdownItem onclick={() => removeTextColorFormatting(editor)} class="text-center">Remove color</DropdownItem>
      </div>
    {/if}
  </Dropdown>
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[FontButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L299)
## Props
@prop editor
@prop format
@prop tooltipText
@prop ariaLabel
@prop colorValue = '#e66465'
@prop id
@prop class: className
-->
