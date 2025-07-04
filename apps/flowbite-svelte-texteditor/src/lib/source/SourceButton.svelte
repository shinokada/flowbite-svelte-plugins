<script lang="ts">
  import { Tooltip, Modal } from 'flowbite-svelte';
  import { generateButtonId, type SourceToggleButtonProps, useEditableContext } from '$lib';

  let { editor, tooltipText, ariaLabel = 'Toggle Source View', id, class: className }: SourceToggleButtonProps = $props();

  const { editableContext, getDefaultButtonClass } = useEditableContext();
  const isEditableCtx = $derived(editableContext?.isEditable ?? true);

  let isSourceView = $state(false);
  let sourceContent = $state('');
  let sourceError = $state('');
  let showModal = $state(false);

  const displayTooltipText = $derived.by(() => {
    const base = tooltipText ?? 'Toggle Source View';
    return !isEditableCtx ? `${base} (Editing disabled)` : base;
  });

  const uniqueId = id ?? generateButtonId('SourceToggle');

  function toggleSourceView() {
    if (!isEditableCtx || !editor) return;

    if (isSourceView) {
      // Switch back to visual editor
      try {
        if (sourceContent.trim()) {
          editor.commands.setContent(sourceContent);
        }
        sourceError = '';
        isSourceView = false;
        showModal = false;
      } catch (error) {
        sourceError = 'Invalid HTML content. Please check your markup.';
      }
    } else {
      // Switch to source view
      const currentContent = editor.getHTML();
      sourceContent = currentContent;
      sourceError = '';
      isSourceView = true;
      showModal = true;
    }
  }

  function handleSourceInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    sourceContent = target.value;
    sourceError = '';
  }

  function handleModalClose() {
    if (isSourceView) {
      // Apply changes and switch back to visual editor
      toggleSourceView();
    }
    showModal = false;
  }

  function handleCancel() {
    if (isSourceView && editor) {
      // Reset to original content without applying changes
      sourceContent = editor.getHTML();
      isSourceView = false;
    }
    showModal = false;
  }

  let btnCls = $derived(getDefaultButtonClass(isEditableCtx, className));
</script>

<button onclick={toggleSourceView} id={uniqueId} type="button" class={btnCls}>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z" />
  </svg>
  <span class="sr-only">{ariaLabel}</span>
</button>
<Tooltip>{displayTooltipText}</Tooltip>

{#if isEditableCtx}
  <Modal title="Edit HTML Source" bind:open={showModal} autoclose={false} size="md">
    <div class="space-y-4">
      <div class="relative">
        <textarea bind:value={sourceContent} oninput={handleSourceInput} class="focus:ring-primary-500 h-96 w-full resize-y rounded-md border p-4 font-mono text-sm focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white" placeholder="Edit HTML source code..."
        ></textarea>

        {#if sourceError}
          <div class="mt-2 rounded bg-red-50 p-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {sourceError}
          </div>
        {/if}
      </div>
    </div>

    {#snippet footer()}
      <div class="flex justify-end space-x-2">
        <button
          type="button"
          onclick={handleCancel}
          class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          Cancel
        </button>
        <button type="button" onclick={handleModalClose} class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg px-4 py-2 text-sm font-medium text-white focus:ring-4 focus:outline-none">
          Apply Changes
        </button>
      </div>
    {/snippet}
  </Modal>
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
[SourceToggleButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L294)
## Props
@prop editor
@prop tooltipText
@prop ariaLabel = 'Toggle Source View'
@prop id
@prop class: className
-->
