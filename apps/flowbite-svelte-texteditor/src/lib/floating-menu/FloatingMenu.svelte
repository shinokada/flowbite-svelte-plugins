<script lang="ts">
  import { runHeadingCommand, runListCommand, runLayoutsCommand, runTableCommand, runTaskCommand, runImageCommand, runVideoCommand } from '$lib';
  import type { Editor } from '@tiptap/core';

  interface FloatingMenuProps {
    editor: Editor | null;
    showHeadings?: boolean;
    showList?: boolean;
    showCode?: boolean;
    showQuote?: boolean;
    showHorizontalRule?: boolean;
    showTable?: boolean;
    showTasks?: boolean;
    showImage?: boolean;
  }

  let { editor, showHeadings = true, showList = true, showCode = true, showQuote = true, showHorizontalRule = true, showTable = true, showTasks = true, showImage = true }: FloatingMenuProps = $props();

  let isHeading1Active = $state(false);
  let isHeading2Active = $state(false);
  let isHeading3Active = $state(false);
  let isBulletListActive = $state(false);
  let isOrderedListActive = $state(false);
  let isCodeBlockActive = $state(false);
  let isBlockquoteActive = $state(false);

  $effect(() => {
    if (!editor) return;

    const update = () => {
      isHeading1Active = editor.isActive('heading', { level: 1 });
      isHeading2Active = editor.isActive('heading', { level: 2 });
      isHeading3Active = editor.isActive('heading', { level: 3 });
      isBulletListActive = editor.isActive('bulletList');
      isOrderedListActive = editor.isActive('orderedList');
      isCodeBlockActive = editor.isActive('codeBlock');
      isBlockquoteActive = editor.isActive('blockquote');
    };

    update();
    editor.on('transaction', update);

    return () => {
      editor.off('transaction', update);
    };
  });
  const svgPaths = {
    bullet: 'M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5',
    ordered: 'M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4'
  };
</script>

<div class="floating-menu">
  {#if showHeadings}
    <button onclick={() => runHeadingCommand(editor, 1)} class:is-active={isHeading1Active} title="Heading 1"> H1 </button>
    <button onclick={() => runHeadingCommand(editor, 2)} class:is-active={isHeading2Active} title="Heading 2"> H2 </button>
    <button onclick={() => runHeadingCommand(editor, 3)} class:is-active={isHeading3Active} title="Heading 3"> H3 </button>
  {/if}

  {#if showList}
    <button onclick={() => runListCommand(editor, 'bullet')} class:is-active={isBulletListActive} title="Bullet list" aria-label="Bullet list">
      <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths['bullet']} />
      </svg>
    </button>
    <button onclick={() => runListCommand(editor, 'ordered')} class:is-active={isOrderedListActive} title="Ordered List" aria-label="Ordered list">
      <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths['ordered']} />
      </svg>
    </button>
  {/if}

  {#if showCode}
    <button onclick={() => runLayoutsCommand(editor, 'codeblock')} class:is-active={isCodeBlockActive} title="Code Block"> Code </button>
  {/if}

  {#if showQuote}
    <button onclick={() => runLayoutsCommand(editor, 'blockquote')} class:is-active={isBlockquoteActive} title="Blockquote"> Quote </button>
  {/if}

  {#if showHorizontalRule}
    <button onclick={() => runLayoutsCommand(editor, 'hr')} title="Horizontal Rule"> HR </button>
  {/if}

  {#if showTasks}
    <button onclick={() => runTaskCommand(editor, 'toggle')} title="Task List"> Tasks </button>
  {/if}

  {#if showTable}
    <button onclick={() => runTableCommand(editor, 'table')} title="Insert Table"> Table </button>
  {/if}

  {#if showImage}
    <button onclick={() => runImageCommand(editor, 'basic')} title="Insert Image"> Image </button>
  {/if}
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/wysiwyg)
## Type
FloatingMenuProps
## Props
@prop editor
@prop showHeadings = true
@prop showList = true
@prop showCode = true
@prop showQuote = true
@prop showHorizontalRule = true
@prop showTable = true
@prop showTasks = true
@prop showImage = true
-->
