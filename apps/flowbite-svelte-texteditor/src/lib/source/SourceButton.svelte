<script lang="ts">
  import { Tooltip, Modal } from 'flowbite-svelte';
  import { cn, generateButtonId } from '$lib';
  import type { Editor } from '@tiptap/core';

  interface SourceToggleButtonProps {
    editor: Editor | null;
    tooltipText?: string;
    ariaLabel?: string;
    id?: string;
    class?: string;
  }

  let { 
    editor, 
    tooltipText = 'Toggle Source View', 
    ariaLabel = 'Toggle Source View', 
    id, 
    class: className 
  }: SourceToggleButtonProps = $props();

  let isSourceView = $state(false);
  let sourceContent = $state('');
  let sourceError = $state('');
  let showModal = $state(false);

  const uniqueId = id ?? generateButtonId('SourceToggle');

  function toggleSourceView() {
    if (!editor) return;

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
</script>

<button
  onclick={toggleSourceView}
  id={uniqueId}
  type="button"
  class={cn('cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', 
    isSourceView ? 'bg-gray-200 text-gray-900 dark:bg-gray-500 dark:text-white' : '', 
    className)}
>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1z"/>
</svg>
  <span class="sr-only">{ariaLabel}</span>
</button>
<Tooltip>{tooltipText}</Tooltip>

<Modal 
  title="Edit HTML Source" 
  bind:open={showModal} 
  autoclose={false}
  size="xl"
>
  <div class="space-y-4">
    <div class="relative">
      <textarea
        bind:value={sourceContent}
        oninput={handleSourceInput}
        class="w-full h-96 p-4 font-mono text-sm border rounded-md resize-y focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        placeholder="Edit HTML source code..."
      ></textarea>
      
      {#if sourceError}
        <div class="mt-2 p-2 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded">
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
        class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
      >
        Cancel
      </button>
      <button
        type="button"
        onclick={handleModalClose}
        class="px-4 py-2 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Apply Changes
      </button>
    </div>
 {/snippet}
</Modal>
