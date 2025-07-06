<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { runInvisibleCommand, type InvisibleAction, generateButtonId, type InvisibleButtonProps, cn, useEditableContext } from '$lib';
  import Paragraph from './Paragraph.svelte';
  import { onMount } from 'svelte';

  let { editor, action, tooltipText, ariaLabel, id, class: className }: InvisibleButtonProps = $props();

  const { editableContext, createEditableHandler, getEditableButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);

  const defaults = {
    toggle: { tooltip: 'Toggle invisible characters', aria: 'Toggle invisible characters' },
    show: { tooltip: 'Show invisible characters', aria: 'Show invisible characters' },
    hide: { tooltip: 'Hide invisible characters', aria: 'Hide invisible characters' }
  };

  const displayTooltipText = $derived.by(() => {
    const base = tooltipText ?? defaults[action].tooltip;
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });
  const finalAriaLabel = ariaLabel ?? defaults[action].aria;
  const uniqueId = id ?? generateButtonId(`Invisible${action.charAt(0).toUpperCase() + action.slice(1)}`);

  let isVisible = $state(false);

  

  function updateVisibility() {
    const invisibleCharactersStorage = (editor?.storage as any).invisibleCharacters;
    if(!invisibleCharactersStorage?.visibility){
      return ;
    }
    if (invisibleCharactersStorage.visibility) {
      isVisible = invisibleCharactersStorage.visibility();
    }
  }

  // Set up editor listeners for reactivity
  onMount(() => {
    if (editor) {
      updateVisibility();

      const handleTransaction = () => {
        updateVisibility();
      };

      editor.on('transaction', handleTransaction);

      return () => {
        editor.off('transaction', handleTransaction);
      };
    }
  });

  // Only show active state for toggle button when visible
  const isActive = $derived(action === 'toggle' && isVisible);

  const handleClick = $derived(
    createEditableHandler(() => {
      runInvisibleCommand(editor, action as InvisibleAction);
    }, isEditableCtx)
  );

  const svgPaths = {
    show: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    hide: 'm3 3 18 18M10.584 10.587a2 2 0 0 0 2.828 2.83M9.363 5.365A9.466 9.466 0 0 1 12 5c7 0 10 7 10 7a13.229 13.229 0 0 1-1.297 2.035M6.073 6.073A9.466 9.466 0 0 0 2 12s3 7 10 7a9.466 9.466 0 0 0 5.927-2.073'
  };

  const baseClass = $derived(cn('cursor-pointer rounded-sm p-1.5', isActive ? 'bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white'));

  let btnCls = $derived(getEditableButtonClass(isEditableCtx, baseClass, className));
</script>

<button onclick={handleClick} id={uniqueId} type="button" class={btnCls}>
  {#if action === 'toggle'}
    <Paragraph class="h-4 w-4" />
  {:else}
    <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths[action]} />
    </svg>
  {/if}
  <span class="sr-only">{finalAriaLabel}</span>
</button>
<Tooltip>{displayTooltipText}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[InvisibleButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L253)
## Props
@prop editor
@prop action
@prop tooltipText
@prop ariaLabel
@prop id
@prop class: className
-->
