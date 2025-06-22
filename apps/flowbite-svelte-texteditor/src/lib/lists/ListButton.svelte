<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { type ListButtonProps } from '$lib';
  import { cn } from '$lib';

  let { editor, format, tooltipText, buttonId, ariaLabel, class: className, onAdvancedClick, ...restProps }: ListButtonProps = $props();

  function handleClick() {
    switch (format) {
      case 'bullet':
        editor?.chain().focus().toggleBulletList().run();
        break;
      case 'ordered':
        editor?.chain().focus().toggleOrderedList().run();
        break;
    }
  }

  // SVG paths for different formats
  const svgPaths = {
    bullet: ['M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5'],
    ordered: 'M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4'
  };
</script>

<button
  onclick={handleClick}
  {...restProps}
  id={buttonId}
  type="button"
  class={cn('cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', className)}
>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    {#if typeof svgPaths[format] === 'string'}
      <path fill-rule="evenodd" d={svgPaths[format]} clip-rule="evenodd" />
    {:else}
      <path fill-rule="evenodd" d={svgPaths[format][0]} clip-rule="evenodd" />
      <path fill-rule="evenodd" d={svgPaths[format][1]} clip-rule="evenodd" />
    {/if}
  </svg>
  <span class="sr-only">{ariaLabel}</span>
</button>
<Tooltip>{tooltipText}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[ListButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L56)
## Props
@prop editor
@prop format
@prop tooltipText
@prop buttonId
@prop ariaLabel
@prop class: className
@prop onAdvancedClick
@prop ...restProps
-->
