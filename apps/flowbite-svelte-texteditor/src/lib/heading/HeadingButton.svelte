<script lang="ts">
  import { Tooltip, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { runHeadingCommand, cn, generateButtonId } from '$lib';
  import { type EditorBasicProps, type HeadingLevel } from '$lib/types';

  let { editor, tooltipText, ariaLabel, id, class: className }: EditorBasicProps = $props();

  let isOpen = $state(false);

  const finalTooltipText = tooltipText ?? 'Heading';
  const finalAriaLabel = ariaLabel ?? 'Heading';
  const uniqueId = id ?? generateButtonId('Heading');

  const headingOptions = [
    { name: 'Paragraph', value: null, level: 0 },
    { name: 'Heading 1', value: 1 as HeadingLevel, level: 1 },
    { name: 'Heading 2', value: 2 as HeadingLevel, level: 2 },
    { name: 'Heading 3', value: 3 as HeadingLevel, level: 3 },
    { name: 'Heading 4', value: 4 as HeadingLevel, level: 4 },
    { name: 'Heading 5', value: 5 as HeadingLevel, level: 5 },
    { name: 'Heading 6', value: 6 as HeadingLevel, level: 6 }
  ];

  function setHeading(level: HeadingLevel | null) {
    runHeadingCommand(editor, level);
    isOpen = false;
  }

  function getHeadingStyle(level: number) {
    const styles = {
      1: 'font-size: 2.25rem; font-weight: 800; line-height: 1.1;', // text-4xl font-extrabold
      2: 'font-size: 1.875rem; font-weight: 700; line-height: 1.2;', // text-3xl font-bold
      3: 'font-size: 1.5rem; font-weight: 600; line-height: 1.3;', // text-2xl font-semibold
      4: 'font-size: 1.25rem; font-weight: 600; line-height: 1.4;', // text-xl font-semibold
      5: 'font-size: 1.125rem; font-weight: 500; line-height: 1.5;', // text-lg font-medium
      6: 'font-size: 1rem; font-weight: 500; line-height: 1.5;' // text-base font-medium
    };
    return styles[level as keyof typeof styles] || '';
  }

  // SVG path for heading icon (H1/H2 style icon)
  const svgPath = 'M3 7h18M3 12h12M3 17h8';

  function handleClick() {
    // The dropdown will handle the interaction
  }
</script>

<button onclick={handleClick} id={uniqueId} type="button" class={cn('cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', className)}>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPath} />
  </svg>
  <span class="sr-only">{finalAriaLabel}</span>
</button>

<Tooltip>{finalTooltipText}</Tooltip>

<Dropdown bind:isOpen simple triggeredBy="#{uniqueId}">
  {#each headingOptions as heading}
    <DropdownItem onclick={() => setHeading(heading.value)} style={heading.level > 0 ? getHeadingStyle(heading.level) : ''}>
      {heading.name}
    </DropdownItem>
  {/each}
</Dropdown>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[EditorBasicProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L23)
## Props
@prop editor
@prop tooltipText
@prop ariaLabel
@prop id
@prop class: className
-->
