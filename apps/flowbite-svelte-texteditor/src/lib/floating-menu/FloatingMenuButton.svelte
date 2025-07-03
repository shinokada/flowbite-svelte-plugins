<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { cn, generateButtonId } from '$lib';
  import type { Editor } from '@tiptap/core';

  interface FloatingButtonProps {
    editor: Editor | null;
    tooltipText?: string;
    ariaLabel?: string;
    id?: string;
    class?: string;
    isActive?: boolean;
    onToggle?: (isActive: boolean) => void;
  }

  let { 
    editor, 
    tooltipText = 'Toggle floating menu', 
    ariaLabel = 'Toggle floating menu', 
    id, 
    class: className,
    isActive = $bindable(false),
    onToggle
  }: FloatingButtonProps = $props();

  const uniqueId = id ?? generateButtonId('FloatingMenu');

  function handleClick() {
    if (!editor) return;
    
    const newActiveState = !isActive;
    isActive = newActiveState;
    
    // Call the optional callback to handle the actual menu toggling
    onToggle?.(newActiveState);
  }

  // SVG for floating menu icon (using a plus/add icon which is common for floating menus)
  const svgPath = 'M12 6v12m6-6H6';
</script>

<button 
  onclick={handleClick} 
  id={uniqueId} 
  type="button" 
  class={cn(
    'cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white',
    isActive && 'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white',
    className
  )}
  aria-pressed={isActive}
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
      d={svgPath} 
    />
  </svg>
  <span class="sr-only">{ariaLabel}</span>
</button>
<Tooltip>{tooltipText}</Tooltip>
