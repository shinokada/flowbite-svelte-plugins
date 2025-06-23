<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { cn, generateButtonId } from '$lib';
  import { type DetailsButtonProps } from '$lib/types';
  
  let { 
    editor, 
    action, 
    tooltipText, 
    ariaLabel, 
    id, 
    class: className 
  }: DetailsButtonProps = $props();

  const defaults = {
    set: { tooltip: 'Add details', aria: 'Add details' },
    unset: { tooltip: 'Remove details', aria: 'Remove details' }
  };

  const finalTooltipText = tooltipText ?? defaults[action].tooltip;
  const finalAriaLabel = ariaLabel ?? defaults[action].aria;
  const uniqueId = id ?? generateButtonId(`Details${action.charAt(0).toUpperCase() + action.slice(1)}`);

  function handleClick() {
    if (action === 'set') {
      editor?.chain().focus().setDetails().run();
    } else {
      editor?.chain().focus().unsetDetails().run();
    }
  }

  const svgPaths = {
    set: 'M12 6v6m0 0v6m0-6h6m-6 0H6', // Plus icon for adding details
    unset: 'M6 18L18 6M6 6l12 12' // X icon for removing details
  };

  // Alternative SVG for details (you can choose which one you prefer)
  const detailsSvgPaths = {
    set: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', // Code block style
    unset: 'M6 18L18 6M6 6l12 12'
  };
</script>

<button 
  onclick={handleClick} 
  id={uniqueId} 
  type="button" 
  class={cn(
    'cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', 
    className
  )}
>
  <svg 
    class="h-5 w-5" 
    aria-hidden="true" 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <path 
      stroke="currentColor" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="2" 
      d={svgPaths[action]} 
    />
  </svg>
  <span class="sr-only">{finalAriaLabel}</span>
</button>
<Tooltip>{finalTooltipText}</Tooltip>