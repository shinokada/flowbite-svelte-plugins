<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { type UndoRedoProps, generateButtonId } from '$lib';
  import { cn } from '$lib';

  let { editor, action, buttonClass, iconClass, ...restProps }: UndoRedoProps = $props();

  function handleAction() {
    if (editor) {
      if (action === 'undo') {
        editor.chain().focus().undo().run();
      } else {
        editor.chain().focus().redo().run();
      }
    }
  }

  const config = {
    undo: {
      id: generateButtonId('Undo'),
      label: 'Undo',
      path: 'M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4'
    },
    redo: {
      id: generateButtonId('Redo'),
      label: 'Redo',
      path: 'M21 9H8a5 5 0 0 0 0 10h9m4-10-4-4m4 4-4 4'
    }
  };

  const currentConfig = $derived(config[action]);
</script>

<button
  onclick={handleAction}
  {...restProps}
  id={currentConfig.id}
  type="button"
  class={cn('cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', buttonClass)}
>
  <svg class={cn('h-5 w-5', iconClass)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={currentConfig.path} />
  </svg>
  <span class="sr-only">{currentConfig.label}</span>
</button>
<Tooltip>{currentConfig.label}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[UndoRedoProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L92)
## Props
@prop editor
@prop action
@prop buttonClass
@prop iconClass
@prop ...restProps
-->
