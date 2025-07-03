<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { cn, generateButtonId } from '$lib';
  import type { Editor } from '@tiptap/core';

  interface EditableButtonProps {
    editor: Editor | null;
    lockEditor?: string;
    unlockEditor?: string;
    ariaLabel?: string;
    id?: string;
    class?: string;
    isEditable?: boolean;
    onToggle?: (isEditable: boolean) => void;
  }

  let { 
    editor, 
    lockEditor = 'Lock editor',
    unlockEditor = 'Unlock editor',
    ariaLabel = 'Toggle editor editable state', 
    id, 
    class: className,
    isEditable = $bindable(true),
    onToggle
  }: EditableButtonProps = $props();

  const uniqueId = id ?? generateButtonId('EditableToggle');

  function handleClick() {
    if (!editor) return;
    const newEditableState = !isEditable;
    isEditable = newEditableState;
    editor.setEditable(newEditableState);
    onToggle?.(newEditableState);
  }

  const svgPath = $derived(isEditable 
    ? 'M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L6.75 19.963l-4.682 1.167 1.167-4.682L16.862 3.487z' 
    : 'M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-6V9a6 6 0 1 0-12 0v2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2zm-8-2a4 4 0 0 1 8 0v2H10V9z'
); 
</script>

<button 
  onclick={handleClick} 
  id={uniqueId} 
  type="button" 
  class={cn(
    'cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white',
    !isEditable && 'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white',
    className
  )}
  aria-pressed={!isEditable}
  title={isEditable ? lockEditor : unlockEditor}
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
<Tooltip>{isEditable ? lockEditor : unlockEditor}</Tooltip>