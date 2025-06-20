<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { type LayoutButtonProps } from '$lib';
  import { cn } from '$lib';

  let { editor, format, tooltipText, buttonId, ariaLabel, class: className }: LayoutButtonProps = $props();

  function handleClick() {
    switch (format) {
      case 'blockquote':
        editor?.chain().focus().toggleBlockquote().run();
        break;
      case 'codeblock':
        editor?.chain().focus().toggleCodeBlock().run();
        break;
      case 'horizontalrule':
        editor?.chain().focus().setHorizontalRule().run();
        break;
    }
  }

  // SVG paths for different formats
  const svgPaths = {
    blockquote:
      'M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z',
    codeblock: 'm8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14',
    horizontalrule: ['M5 12h14', 'M6 9.5h12m-12 9h12M6 7.5h12m-12 9h12M6 5.5h12m-12 9h12']
  };
</script>

<button
  onclick={handleClick}
  id={buttonId}
  type="button"
  class={cn('cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', className)}
>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    {#if !Array.isArray(svgPaths[format])}
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths[format]} />
    {:else}
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths[format][0]} />
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d={svgPaths[format][1]} />
    {/if}
  </svg>
  <span class="sr-only">{ariaLabel}</span>
</button>
<Tooltip>{tooltipText}</Tooltip>
