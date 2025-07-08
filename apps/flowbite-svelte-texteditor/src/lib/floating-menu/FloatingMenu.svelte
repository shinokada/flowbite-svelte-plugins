<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { runHeadingCommand, runListCommand, runLayoutsCommand, runTableCommand, runTaskCommand, runImageCommand, type FloatingMenuProps } from '$lib';

  let { 
    editor, 
    headingsOnly = false, 
    showHeadings = true, 
    showList = true, 
    showCodeBlock = true, 
    showQuote = true, 
    showHorizontalRule = true, 
    showTable = true, 
    showTasks = true, 
    showImage = true,
    autoSetup = true
  }: FloatingMenuProps & { autoSetup?: boolean } = $props();

  let isHeading1Active = $state(false);
  let isHeading2Active = $state(false);
  let isHeading3Active = $state(false);
  let isBulletListActive = $state(false);
  let isOrderedListActive = $state(false);
  let isCodeBlockActive = $state(false);
  let isBlockquoteActive = $state(false);
  let isSetup = $state(false);

  // Track active states
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

  // SVG paths for icons
  const svgPaths = {
    bullet: 'M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5',
    ordered: 'M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4'
  };

  // Setup method for SvelteRenderer integration
  export function setup(): boolean {
    if (isSetup || !editor) return false;
    
    try {
      // Any setup logic specific to floating menu
      isSetup = true;
      return true;
    } catch (error) {
      console.error('Error setting up FloatingMenu:', error);
      return false;
    }
  }

  // Cleanup method for SvelteRenderer integration
  export function cleanup(): boolean {
    if (!isSetup) return false;
    
    try {
      // Any cleanup logic
      isSetup = false;
      return true;
    } catch (error) {
      console.error('Error cleaning up FloatingMenu:', error);
      return false;
    }
  }

  // Auto-setup if enabled
  onMount(() => {
    if (autoSetup) {
      setup();
    }
  });

  onDestroy(() => {
    cleanup();
  });
</script>

<div class="floating-menu" data-testid="floating-menu">
  {#if showHeadings}
    <button 
      onclick={() => runHeadingCommand(editor, 1)} 
      class:is-active={isHeading1Active} 
      title="Heading 1"
      type="button"
    > 
      H1 
    </button>
    <button 
      onclick={() => runHeadingCommand(editor, 2)} 
      class:is-active={isHeading2Active} 
      title="Heading 2"
      type="button"
    > 
      H2 
    </button>
    <button 
      onclick={() => runHeadingCommand(editor, 3)} 
      class:is-active={isHeading3Active} 
      title="Heading 3"
      type="button"
    > 
      H3 
    </button>
  {/if}

  {#if !headingsOnly && showList}
    <button 
      onclick={() => runListCommand(editor, 'bullet')} 
      class:is-active={isBulletListActive} 
      title="Bullet list" 
      aria-label="Bullet list"
      type="button"
    >
      <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths['bullet']} />
      </svg>
    </button>
    <button 
      onclick={() => runListCommand(editor, 'ordered')} 
      class:is-active={isOrderedListActive} 
      title="Ordered List" 
      aria-label="Ordered list"
      type="button"
    >
      <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths['ordered']} />
      </svg>
    </button>
  {/if}

  {#if !headingsOnly && showCodeBlock}
    <button 
      onclick={() => runLayoutsCommand(editor, 'codeblock')} 
      class:is-active={isCodeBlockActive} 
      title="Code Block"
      type="button"
    > 
      Code 
    </button>
  {/if}

  {#if !headingsOnly && showQuote}
    <button 
      onclick={() => runLayoutsCommand(editor, 'blockquote')} 
      class:is-active={isBlockquoteActive} 
      title="Blockquote"
      type="button"
    > 
      Quote 
    </button>
  {/if}

  {#if !headingsOnly && showHorizontalRule}
    <button 
      onclick={() => runLayoutsCommand(editor, 'hr')} 
      title="Horizontal Rule"
      type="button"
    > 
      HR 
    </button>
  {/if}

  {#if !headingsOnly && showTasks}
    <button 
      onclick={() => runTaskCommand(editor, 'toggle')} 
      title="Task List"
      type="button"
    > 
      Tasks 
    </button>
  {/if}

  {#if !headingsOnly && showTable}
    <button 
      onclick={() => runTableCommand(editor, 'table')} 
      title="Insert Table"
      type="button"
    > 
      Table 
    </button>
  {/if}

  {#if !headingsOnly && showImage}
    <button 
      onclick={() => runImageCommand(editor, 'basic')} 
      title="Insert Image"
      type="button"
    > 
      Image 
    </button>
  {/if}
</div>
