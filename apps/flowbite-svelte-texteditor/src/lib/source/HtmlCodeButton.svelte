<script lang="ts">
  import { Tooltip, Modal } from 'flowbite-svelte';
  import { cn, generateButtonId } from '$lib';
  import type { Editor } from '@tiptap/core';

  interface InsertHtmlCodeButtonProps {
    editor: Editor | null;
    tooltipText?: string;
    ariaLabel?: string;
    id?: string;
    class?: string;
  }

  let { editor, tooltipText = 'Insert HTML Code Block', ariaLabel = 'Insert HTML Code Block', id, class: className }: InsertHtmlCodeButtonProps = $props();

  let showModal = $state(false);
  let htmlInput = $state('');

  const uniqueId = id ?? generateButtonId('InsertHtmlCode');

  function escapeHtml(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function openModal() {
    htmlInput = '';
    showModal = true;
  }

  function insertHtmlCode() {
    if (!editor || !htmlInput.trim()) return;

    const escapedHtml = escapeHtml(htmlInput);

    // Insert a code block with escaped HTML
    editor.chain().focus().insertContent(`<pre><code class="language-html">${escapedHtml}</code></pre>`).run();

    showModal = false;
    htmlInput = '';
  }

  function handleCancel() {
    showModal = false;
    htmlInput = '';
  }
</script>

<button
  onclick={openModal}
  id={uniqueId}
  type="button"
  class={cn('cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', className)}
>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.5 6L6 8.5 8.5 11l1.4-1.4L8.2 8.5l1.7-1.1L8.5 6zm7 0l-1.4 1.5L15.8 8.5l-1.7 1.1L15.5 11L18 8.5 15.5 6z" />
    <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z" />
  </svg>
  <span class="sr-only">{ariaLabel}</span>
</button>
<Tooltip>{tooltipText}</Tooltip>

<Modal title="Insert HTML Code Block" bind:open={showModal} autoclose={false} size="lg">
  <div class="space-y-4">
    <div>
      <label for="html-input" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"> HTML Code: </label>
      <textarea
        id="html-input"
        bind:value={htmlInput}
        class="focus:ring-primary-500 h-48 w-full resize-y rounded-md border p-3 font-mono text-sm focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        placeholder="Paste your HTML code here..."
      ></textarea>
    </div>

    <div class="text-sm text-gray-600 dark:text-gray-400">
      <p><strong>Preview:</strong></p>
      <pre class="mt-2 overflow-x-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-800"><code class="language-html">{escapeHtml(htmlInput)}</code></pre>
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
      <button
        type="button"
        onclick={insertHtmlCode}
        disabled={!htmlInput.trim()}
        class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg px-4 py-2 text-sm font-medium text-white focus:ring-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        Insert Code Block
      </button>
    </div>
  {/snippet}
</Modal>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
InsertHtmlCodeButtonProps
## Props
@prop editor
@prop tooltipText = 'Insert HTML Code Block'
@prop ariaLabel = 'Insert HTML Code Block'
@prop id
@prop class: className
-->
